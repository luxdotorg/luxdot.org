#!/usr/bin/env python3
"""Audit likely English UI/prose leakage inside Arabic surfaces.

This is intentionally conservative: it reports Latin-heavy text in Arabic locale
blocks and Arabic-dominant pages, while ignoring URLs, code, language selectors,
and short proper-name-like labels. The report is a review queue, not an automatic
translator.
"""
from __future__ import annotations

import argparse
import re
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
AR = re.compile(r'[\u0600-\u06ff]')
LAT = re.compile(r'[A-Za-z]')
WORDS = re.compile(r"[A-Za-z][A-Za-z'’.-]*")
UI_WORDS = {
    'active','archive','atlas','audio','audiovisual','back','claim','commons','core',
    'current','detail','developing','draft','evidence','expanded','galaxy','global',
    'graph','hypothesis','inactive','identity','interactive','lab','layer','live',
    'living','media','method','network','new','news','next','open','preview','read',
    'research','rule','sources','standard','start','status','stream','visual','world',
}
IGNORE_EXACT = {
    'LuxDot','English','Nederlands','Basa Jawa','Bahasa Indonesia','Français','Español',
    'Deutsch','Türkçe','Wikimedia Commons','Human Rights Watch',
}

class Parser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.stack=[]; self.items=[]; self.page_lang=''
    def handle_starttag(self, tag, attrs):
        a=dict(attrs); self.stack.append((tag,a))
        if tag=='html': self.page_lang=a.get('lang','').lower()
        if self.in_arabic_surface():
            for key in ('aria-label','title','placeholder'):
                if a.get(key): self.items.append((f'@{key}',a[key]))
    def handle_startendtag(self, tag, attrs): self.handle_starttag(tag,attrs); self.handle_endtag(tag)
    def handle_endtag(self, tag):
        for i in range(len(self.stack)-1,-1,-1):
            if self.stack[i][0]==tag: del self.stack[i:]; break
    def handle_data(self,data):
        if not data.strip() or any(t in {'script','style','code','pre','kbd','samp'} for t,_ in self.stack): return
        if self.in_arabic_surface(): self.items.append(('text',data.strip()))
    def in_arabic_surface(self):
        locales=[a.get('data-locale','').lower() for _,a in self.stack if a.get('data-locale')]
        if locales: return locales[-1]=='ar'
        return self.page_lang=='ar'

def suspicious(s:str)->bool:
    t=' '.join(s.split()).strip(' ·|/–—→←↗')
    if not t or t in IGNORE_EXACT or t.startswith(('http:','https:','www.')): return False
    lat=len(LAT.findall(t)); ar=len(AR.findall(t)); words=WORDS.findall(t)
    if lat<4: return False
    low={w.lower().strip('.-') for w in words}
    if low & UI_WORDS: return True
    # Full Latin phrases are suspicious; one/two title-cased tokens are usually names/places.
    if ar==0 and len(words)>=4: return True
    if ar>0 and lat>=12 and len(words)>=2: return True
    return False

def main():
    ap=argparse.ArgumentParser(); ap.add_argument('--fail-on-findings',action='store_true'); args=ap.parse_args()
    findings=[]; pages=0
    for p in sorted(ROOT.rglob('*.html')):
        if '.git' in p.parts or 'node_modules' in p.parts: continue
        text=p.read_text(encoding='utf-8',errors='replace')
        parser=Parser()
        try: parser.feed(text)
        except Exception: continue
        if parser.page_lang!='ar' and 'data-locale="ar"' not in text and "data-locale='ar'" not in text: continue
        pages+=1
        seen=set()
        for kind,s in parser.items:
            norm=' '.join(s.split())
            if suspicious(norm) and norm not in seen:
                seen.add(norm); findings.append((str(p.relative_to(ROOT)),kind,norm[:220]))
    print(f'Arabic surface audit: {pages} Arabic-capable HTML pages inspected')
    print(f'Likely translation leakage: {len(findings)} item(s)')
    for path,kind,text in findings: print(f'{path}\t{kind}\t{text}')
    if args.fail_on_findings and findings: raise SystemExit(1)
if __name__=='__main__': main()
