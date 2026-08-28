#!/usr/bin/env python3
"""Audit translation leakage/parity across LuxDot supported locales.

Supported: ar, en, nl, he, jv, id, fr, es, de, tr.
Conservative by design: this creates a review queue and never auto-translates prose.
"""
from __future__ import annotations
import argparse,re
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
SUPPORTED=('ar','en','nl','he','jv','id','fr','es','de','tr')
AR=re.compile(r'[\u0600-\u06ff]'); HE=re.compile(r'[\u0590-\u05ff]'); LAT=re.compile(r'[A-Za-zÀ-ž]')
WORDS=re.compile(r"[A-Za-zÀ-ž][A-Za-zÀ-ž'’.-]*")
EN_UI={'active','archive','atlas','audio','audiovisual','back','claim','commons','core','current','detail','developing','draft','evidence','expanded','galaxy','global','graph','hypothesis','inactive','identity','interactive','lab','layer','live','living','media','method','network','new','news','next','open','preview','read','research','rule','sources','standard','start','status','stream','visual','world'}
IGNORE={'LuxDot','English','Nederlands','Basa Jawa','Bahasa Indonesia','Français','Español','Deutsch','Türkçe','Wikimedia Commons','Human Rights Watch'}
class P(HTMLParser):
 def __init__(self): super().__init__(convert_charrefs=True);self.stack=[];self.page='';self.items=[];self.locales=set()
 def handle_starttag(self,t,attrs):
  a=dict(attrs);self.stack.append((t,a));
  if t=='html':self.page=a.get('lang','').lower()
  if a.get('data-locale'):self.locales.add(a['data-locale'].lower())
  l=self.locale()
  if l in SUPPORTED:
   for k in ('aria-label','title','placeholder'):
    if a.get(k):self.items.append((l,'@'+k,a[k]))
 def handle_startendtag(self,t,a):self.handle_starttag(t,a);self.handle_endtag(t)
 def handle_endtag(self,t):
  for i in range(len(self.stack)-1,-1,-1):
   if self.stack[i][0]==t:del self.stack[i:];break
 def handle_data(self,d):
  if not d.strip() or any(t in {'script','style','code','pre','kbd','samp'} for t,_ in self.stack):return
  l=self.locale()
  if l in SUPPORTED:self.items.append((l,'text',d.strip()))
 def locale(self):
  ls=[a.get('data-locale','').lower() for _,a in self.stack if a.get('data-locale')]
  return ls[-1] if ls else self.page

def suspicious(l,s):
 t=' '.join(s.split()).strip(' ·|/–—→←↗')
 if not t or t in IGNORE or t.startswith(('http:','https:','www.')):return False
 ar=len(AR.findall(t));he=len(HE.findall(t));lat=len(LAT.findall(t));words=WORDS.findall(t);low={w.lower().strip('.-') for w in words}
 if l=='ar':return lat>=4 and (bool(low&EN_UI) or (ar==0 and len(words)>=4) or (ar>0 and lat>=12 and len(words)>=2))
 if l=='he':return (lat>=4 and (bool(low&EN_UI) or (he==0 and len(words)>=4))) or ar>=8
 if l in {'nl','jv','id','fr','es','de','tr'}:return ar>=8 or he>=8 or (len(words)>=3 and bool(low&EN_UI))
 if l=='en':return ar>=8 or he>=8
 return False

def main():
 ap=argparse.ArgumentParser();ap.add_argument('--fail-on-findings',action='store_true');args=ap.parse_args();find=[];coverage=Counter();pages=0
 for p in sorted(ROOT.rglob('*.html')):
  if '.git' in p.parts or 'node_modules' in p.parts:continue
  try:text=p.read_text(encoding='utf-8',errors='replace');q=P();q.feed(text)
  except Exception:continue
  present=set(q.locales);present.add(q.page) if q.page in SUPPORTED else None
  if not present:continue
  pages+=1
  for l in present:coverage[l]+=1
  seen=set()
  for l,k,s in q.items:
   n=' '.join(s.split());key=(l,n)
   if key not in seen and suspicious(l,n):seen.add(key);find.append((str(p.relative_to(ROOT)),l,k,n[:220]))
 print(f'Multilingual surface audit: {pages} localized HTML pages inspected')
 print('Coverage: '+' · '.join(f'{l}={coverage[l]}' for l in SUPPORTED))
 c=Counter(x[1] for x in find);print('Likely leakage: '+' · '.join(f'{l}={c[l]}' for l in SUPPORTED)+f' · total={len(find)}')
 for path,l,k,text in find:print(f'{path}\t{l}\t{k}\t{text}')
 if args.fail_on_findings and find:raise SystemExit(1)
if __name__=='__main__':main()
