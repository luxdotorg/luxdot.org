#!/usr/bin/env python3
from __future__ import annotations

from html.parser import HTMLParser
from pathlib import Path
import re
from collections import defaultdict

ROOT = Path(__file__).resolve().parents[1]
AR_RE = re.compile(r'[\u0600-\u06FF]')
LATIN_WORD_RE = re.compile(r"\b[A-Za-z][A-Za-z'-]{1,}\b")
SPACE_RE = re.compile(r'\s+')

# UI/content words that are very likely translation leaks when visible on an Arabic surface.
UI_WORDS = {
    'home','research','projects','project','library','memory','media','news','faith','wisdom',
    'sources','source','method','methods','timeline','search','filter','filters','all','start','open',
    'close','more','read','view','explore','learn','back','next','previous','loading','status','evidence',
    'map','maps','live','about','contact','submit','download','share','menu','language','languages',
    'today','calendar','archive','archives','audio','visual','listen','watch','article','articles',
    'people','person','history','story','stories','notes','note','summary','overview','introduction',
    'chapter','chapters','section','sections','updated','update','new','featured','latest','related',
    'results','result','category','categories','topic','topics','details','detail','information',
    'humanity','meaning','values','practice','practices','ways','common','commons','identity','layer',
    'reader','lab','galaxy','atlas','network','route','correction','corrections','overview','index',
    'english','dutch','arabic','hebrew','french','spanish','german','turkish','indonesian','javanese'
}

# Frequent English function words: useful for finding full untranslated sentences.
EN_STOP = {
    'the','and','or','of','to','in','for','with','from','by','on','at','as','is','are','was','were',
    'this','that','these','those','a','an','be','can','will','not','into','between','through','about',
    'how','what','why','when','where','who','which','your','our','their','its','more','than','only'
}

# Proper names / project identity / abbreviations that are allowed to remain Latin-script.
ALLOW = {
    'luxdot','chaam','breda','petra','nassau','kevelaer','busman','urania','venlo','brabant','java',
    'javanese','nusantara','maimonides','einstein','darwin','tesla','picasso','beethoven','erasmus',
    'kolbe','shambhala','sela','bozrah','github','cloudflare','unesco','qr','pdf','html','css','js',
    'rtl','ltr','id','ar','en','nl','he','fr','es','de','tr','www','http','https','v','lux','dot'
}

SKIP_TAGS = {'script','style','code','pre','svg','path','noscript'}

class VisibleTextParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.stack=[]
        self.lang_stack=[]
        self.items=[]
        self.page_lang=''
        self.page_dir=''

    def handle_starttag(self, tag, attrs):
        attrs=dict(attrs)
        self.stack.append(tag)
        inherited = self.lang_stack[-1] if self.lang_stack else ''
        lang=(attrs.get('lang') or inherited or '').lower()
        self.lang_stack.append(lang)
        if tag=='html':
            self.page_lang=(attrs.get('lang') or '').lower()
            self.page_dir=(attrs.get('dir') or '').lower()
        for key in ('placeholder','title','aria-label','alt'):
            val=attrs.get(key)
            if val and not any(t in SKIP_TAGS for t in self.stack):
                self.items.append((f'@{key}', lang, val))

    def handle_startendtag(self, tag, attrs):
        attrs=dict(attrs)
        inherited = self.lang_stack[-1] if self.lang_stack else ''
        lang=(attrs.get('lang') or inherited or '').lower()
        for key in ('placeholder','title','aria-label','alt'):
            val=attrs.get(key)
            if val:
                self.items.append((f'@{key}', lang, val))

    def handle_endtag(self, tag):
        if self.stack:
            self.stack.pop()
        if self.lang_stack:
            self.lang_stack.pop()

    def handle_data(self, data):
        if not data.strip():
            return
        if any(t in SKIP_TAGS for t in self.stack):
            return
        tag=self.stack[-1] if self.stack else '#text'
        lang=self.lang_stack[-1] if self.lang_stack else ''
        self.items.append((tag, lang, data))


def clean(s:str)->str:
    return SPACE_RE.sub(' ', s).strip()


def arabic_ratio(s:str)->float:
    letters=[c for c in s if c.isalpha()]
    if not letters:
        return 0.0
    return sum(1 for c in letters if AR_RE.match(c))/len(letters)


def latin_words(s:str):
    return [m.group(0) for m in LATIN_WORD_RE.finditer(s)]


def classify(text:str, page_arabic:bool, item_lang:str):
    txt=clean(text)
    words=latin_words(txt)
    if not words:
        return None
    lowers=[w.lower() for w in words]
    meaningful=[w for w in lowers if w not in ALLOW and len(w)>1]
    if not meaningful:
        return None

    ar=bool(AR_RE.search(txt))
    explicit_ar=(item_lang=='ar')
    ui_hits=sorted(set(w for w in meaningful if w in UI_WORDS))
    stop_hits=sum(1 for w in meaningful if w in EN_STOP)
    englishish=len(meaningful)>=4 and stop_hits>=2
    mixed_sentence=ar and len(meaningful)>=3 and (stop_hits>=1 or ui_hits)

    # Only consider Arabic contexts: explicit Arabic element/page, RTL page, or Arabic-heavy visible text.
    if not (page_arabic or explicit_ar or ar):
        return None

    score=0
    reasons=[]
    if ui_hits:
        score += 3 + min(3,len(ui_hits))
        reasons.append('UI:'+','.join(ui_hits[:8]))
    if englishish:
        score += 4
        reasons.append('English sentence')
    if mixed_sentence:
        score += 3
        reasons.append('mixed Arabic/English')
    if txt.isascii() and page_arabic and len(meaningful)>=2:
        score += 2
        reasons.append('English-only visible text on Arabic page')

    if score < 3:
        return None
    return score, '; '.join(reasons), txt


def main():
    findings=[]
    page_stats=defaultdict(int)
    scanned=0
    arabic_pages=0

    for path in sorted(ROOT.rglob('*.html')):
        if '.git' in path.parts:
            continue
        try:
            src=path.read_text(encoding='utf-8')
        except Exception:
            continue
        p=VisibleTextParser()
        try:
            p.feed(src)
        except Exception:
            continue
        scanned+=1
        visible=' '.join(clean(t) for _,_,t in p.items)
        page_arabic=(p.page_lang=='ar' or p.page_dir=='rtl' or arabic_ratio(visible)>=0.35)
        if not page_arabic:
            continue
        arabic_pages+=1
        rel=str(path.relative_to(ROOT))
        seen=set()
        for tag,lang,text in p.items:
            result=classify(text,page_arabic,lang)
            if not result:
                continue
            score,reason,txt=result
            key=(tag,txt)
            if key in seen:
                continue
            seen.add(key)
            findings.append((score,rel,tag,reason,txt[:360]))
            page_stats[rel]+=1

    findings.sort(key=lambda x:(-x[0],x[1],x[2],x[4]))
    print(f'SCANNED_HTML={scanned}')
    print(f'ARABIC_SURFACES={arabic_pages}')
    print(f'CANDIDATE_PAGES={len(page_stats)}')
    print(f'CANDIDATE_STRINGS={len(findings)}')
    print('\n=== PAGE SUMMARY ===')
    for rel,count in sorted(page_stats.items(), key=lambda x:(-x[1],x[0])):
        print(f'{count:3d}  {rel}')
    print('\n=== CANDIDATES ===')
    for score,rel,tag,reason,txt in findings:
        print(f'[{score:02d}] {rel} :: {tag} :: {reason} :: {txt}')

if __name__=='__main__':
    main()
