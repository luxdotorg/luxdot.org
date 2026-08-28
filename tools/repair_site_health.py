#!/usr/bin/env python3
"""Conservative, repository-wide repairs for LuxDot static HTML health.

The script intentionally avoids changing research prose. It repairs structural/metadata
issues that can be derived safely: missing titles/lang/descriptions, content placed
between </head> and <body>, and duplicate IDs by suffixing later duplicates.
"""
from __future__ import annotations

import html
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SKIP_DIRS = {'.git', 'node_modules'}

TAG_RE = re.compile(r'<[^>]+>')
SPACE_RE = re.compile(r'\s+')


def pages():
    for p in ROOT.rglob('*.html'):
        if not any(part in SKIP_DIRS for part in p.parts):
            yield p


def plain(fragment: str) -> str:
    fragment = re.sub(r'<script\b[^>]*>.*?</script>', ' ', fragment, flags=re.I | re.S)
    fragment = re.sub(r'<style\b[^>]*>.*?</style>', ' ', fragment, flags=re.I | re.S)
    return SPACE_RE.sub(' ', html.unescape(TAG_RE.sub(' ', fragment))).strip()


def derive_title(text: str, path: Path) -> str:
    m = re.search(r'<h1\b[^>]*>(.*?)</h1>', text, re.I | re.S)
    if m:
        t = plain(m.group(1))
        if t:
            return f'{t} · LuxDot'
    stem = path.stem.replace('-', ' ').replace('_', ' ').strip()
    return f'{stem.title()} · LuxDot' if stem else 'LuxDot'


def derive_description(text: str, title: str) -> str:
    for m in re.finditer(r'<p\b[^>]*>(.*?)</p>', text, re.I | re.S):
        candidate = plain(m.group(1))
        if len(candidate) >= 35:
            if len(candidate) > 155:
                candidate = candidate[:152].rsplit(' ', 1)[0].rstrip(' ,;:.') + '…'
            return candidate
    clean_title = title.replace(' · LuxDot', '').strip()
    return f'{clean_title} — a LuxDot living research, memory and knowledge page.'


def insert_in_head(text: str, addition: str) -> str:
    m = re.search(r'<head\b[^>]*>', text, re.I)
    if not m:
        return text
    return text[:m.end()] + '\n' + addition + text[m.end():]


def fix_between_head_body(text: str) -> str:
    # Browsers repair this implicitly; move only genuine markup between </head> and <body>.
    m = re.search(r'</head>(?P<middle>\s*(?:<!--.*?-->\s*)?(?:<[^!][\s\S]*?)?)<body(?P<bodyattrs>[^>]*)>', text, re.I)
    if not m:
        return text
    middle = m.group('middle')
    if not middle.strip() or not re.search(r'<(?:div|main|section|header|footer|nav|aside|span)\b', middle, re.I):
        return text
    body_open = '<body' + m.group('bodyattrs') + '>'
    replacement = '</head>' + body_open + middle
    return text[:m.start()] + replacement + text[m.end():]


def fix_duplicate_ids(text: str) -> str:
    seen: dict[str, int] = {}
    pat = re.compile(r'\bid\s*=\s*(["\'])([^"\']+)\1', re.I)
    def repl(m: re.Match[str]) -> str:
        quote, value = m.group(1), m.group(2)
        seen[value] = seen.get(value, 0) + 1
        if seen[value] == 1:
            return m.group(0)
        return f'id={quote}{value}--{seen[value]}{quote}'
    return pat.sub(repl, text)


def repair(path: Path) -> bool:
    text = path.read_text(encoding='utf-8')
    original = text

    text = fix_between_head_body(text)
    text = fix_duplicate_ids(text)

    html_open = re.search(r'<html\b([^>]*)>', text, re.I)
    if html_open and not re.search(r'\blang\s*=', html_open.group(1), re.I):
        attrs = html_open.group(1)
        replacement = '<html' + attrs + ' lang="en">'
        text = text[:html_open.start()] + replacement + text[html_open.end():]

    title_match = re.search(r'<title\b[^>]*>(.*?)</title>', text, re.I | re.S)
    if not title_match or not plain(title_match.group(1)):
        title = derive_title(text, path)
        title_tag = f'<title>{html.escape(title)}</title>'
        if title_match:
            text = text[:title_match.start()] + title_tag + text[title_match.end():]
        else:
            text = insert_in_head(text, title_tag)
    else:
        title = plain(title_match.group(1))

    if not re.search(r'<meta\b[^>]*\bname\s*=\s*(["\'])description\1', text, re.I):
        desc = derive_description(text, title)
        meta = f'<meta name="description" content="{html.escape(desc, quote=True)}">'
        text = insert_in_head(text, meta)

    if text != original:
        path.write_text(text, encoding='utf-8')
        return True
    return False


def main() -> int:
    changed = []
    for p in pages():
        if repair(p):
            changed.append(p.relative_to(ROOT).as_posix())
    print(f'Repaired {len(changed)} HTML file(s).')
    for p in changed:
        print(p)
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
