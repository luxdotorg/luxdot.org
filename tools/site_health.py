#!/usr/bin/env python3
"""Static site health audit for LuxDot.

Checks HTML structure, duplicate IDs, local links/assets, document metadata,
and basic language/accessibility signals without requiring third-party packages.
"""
from __future__ import annotations

import argparse
import re
from collections import Counter
from dataclasses import dataclass
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
SKIP_DIRS = {'.git', 'node_modules'}
IGNORE_SCHEMES = ('http:', 'https:', 'mailto:', 'tel:', 'data:', 'javascript:')

@dataclass
class Issue:
    severity: str
    path: str
    code: str
    detail: str

class AuditParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids=[]; self.refs=[]; self.tags=[]; self.lang=None; self.title=[]
        self.meta_description=False; self.body_seen=False; self.head_open=False
        self.elements_before_body=[]; self.images=[]; self.controls=[]
    def handle_starttag(self, tag, attrs):
        a=dict(attrs); self.tags.append(tag)
        if tag == 'html': self.lang=a.get('lang')
        if tag == 'head': self.head_open=True
        if tag == 'body': self.body_seen=True
        elif not self.body_seen and not self.head_open and tag not in {'html','head'}:
            self.elements_before_body.append(tag)
        if 'id' in a: self.ids.append(a['id'])
        if tag in {'a','link'} and a.get('href'): self.refs.append((tag,a['href']))
        if tag in {'script','img','iframe','source','video','audio'} and a.get('src'): self.refs.append((tag,a['src']))
        if tag == 'meta' and a.get('name','').lower() == 'description' and a.get('content','').strip(): self.meta_description=True
        if tag == 'img': self.images.append(a)
        if tag in {'button','input','select','textarea'}: self.controls.append((tag,a))
    def handle_endtag(self, tag):
        if tag == 'head': self.head_open=False
    def handle_data(self, data):
        if self.tags and self.tags[-1] == 'title': self.title.append(data)

def iter_html():
    for p in ROOT.rglob('*.html'):
        if not any(part in SKIP_DIRS for part in p.parts):
            yield p

def local_target(source: Path, raw: str):
    raw=raw.strip()
    if not raw or raw.startswith('#') or raw.lower().startswith(IGNORE_SCHEMES): return None
    split=urlsplit(raw)
    if split.netloc: return None
    path=unquote(split.path)
    if not path: return None
    if path.startswith('/'):
        target=ROOT/path.lstrip('/')
    else:
        target=source.parent/path
    return target

def main():
    ap=argparse.ArgumentParser()
    ap.add_argument('--fail-on', choices=['none','error','warning'], default='error')
    args=ap.parse_args()
    issues=[]; pages=0; refs=0
    for p in iter_html():
        pages += 1
        rel=p.relative_to(ROOT).as_posix()
        try: text=p.read_text(encoding='utf-8')
        except Exception as e:
            issues.append(Issue('error',rel,'read-failure',str(e))); continue
        parser=AuditParser()
        try: parser.feed(text)
        except Exception as e:
            issues.append(Issue('error',rel,'html-parse',str(e))); continue
        if '<html' not in text.lower(): issues.append(Issue('error',rel,'missing-html','Missing <html> element'))
        if '<head' not in text.lower(): issues.append(Issue('error',rel,'missing-head','Missing <head> element'))
        if '<body' not in text.lower(): issues.append(Issue('error',rel,'missing-body','Missing <body> element'))
        if parser.elements_before_body:
            issues.append(Issue('warning',rel,'content-before-body','Element(s) outside <body>: '+', '.join(parser.elements_before_body[:5])))
        dups=[k for k,v in Counter(parser.ids).items() if v>1]
        if dups: issues.append(Issue('error',rel,'duplicate-id','Duplicate id(s): '+', '.join(dups[:10])))
        title=''.join(parser.title).strip()
        if not title: issues.append(Issue('warning',rel,'missing-title','Missing or empty <title>'))
        if not parser.lang: issues.append(Issue('warning',rel,'missing-lang','Missing html[lang]'))
        if not parser.meta_description: issues.append(Issue('info',rel,'missing-description','No meta description'))
        for attrs in parser.images:
            if 'alt' not in attrs: issues.append(Issue('warning',rel,'img-alt','Image missing alt attribute'))
        for tag,attrs in parser.controls:
            if tag == 'input' and attrs.get('type','text').lower() == 'hidden': continue
            if not (attrs.get('aria-label') or attrs.get('aria-labelledby') or attrs.get('title') or attrs.get('id')):
                issues.append(Issue('info',rel,'control-label',f'{tag} may lack an accessible label'))
        for tag,raw in parser.refs:
            refs += 1
            target=local_target(p,raw)
            if target is None: continue
            try: resolved=target.resolve()
            except Exception: resolved=target
            try: resolved.relative_to(ROOT.resolve())
            except ValueError:
                issues.append(Issue('warning',rel,'path-escape',f'{tag}: {raw}')); continue
            if not target.exists():
                # Pretty/extensionless routes may be handled externally; LuxDot is static, so flag them.
                issues.append(Issue('error',rel,'missing-local-target',f'{tag}: {raw} -> {target.relative_to(ROOT)}'))
    counts=Counter(i.severity for i in issues)
    print(f'LuxDot site-health: {pages} HTML pages, {refs} local/external references inspected')
    print(f"Issues: {counts['error']} error(s), {counts['warning']} warning(s), {counts['info']} info")
    for i in issues:
        print(f'{i.severity.upper():7} {i.path} [{i.code}] {i.detail}')
    if args.fail_on == 'none': return 0
    if args.fail_on == 'error' and counts['error']: return 1
    if args.fail_on == 'warning' and (counts['error'] or counts['warning']): return 1
    return 0

if __name__ == '__main__':
    raise SystemExit(main())
