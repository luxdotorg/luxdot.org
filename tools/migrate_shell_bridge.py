#!/usr/bin/env python3
from pathlib import Path
import argparse

ROOT=Path(__file__).resolve().parents[1]
MARKER="parent.postMessage({type:'luxdot:navigate'"
REDIRECT="location.replace('/player-shell.html?page='"
REPLACEMENT='<script src="/luxdot-shell-bridge.js?v=41850"></script>'


def migrate(write=False):
    changed=[]
    skipped=[]
    for path in ROOT.rglob('*.html'):
        if '.git' in path.parts or path.name=='player-shell.html':
            continue
        text=path.read_text(encoding='utf-8')
        if MARKER not in text or REDIRECT not in text:
            continue
        marker_at=text.find(MARKER)
        start=text.rfind('<script',0,marker_at)
        end=text.find('</script>',marker_at)
        if start<0 or end<0:
            skipped.append(str(path.relative_to(ROOT)))
            continue
        end += len('</script>')
        block=text[start:end]
        if 'window.top===window.self' not in block or 'player-shell.html' not in block:
            skipped.append(str(path.relative_to(ROOT)))
            continue
        new=text[:start]+REPLACEMENT+text[end:]
        if new!=text:
            changed.append(str(path.relative_to(ROOT)))
            if write:
                path.write_text(new,encoding='utf-8')
    return changed, skipped

if __name__=='__main__':
    ap=argparse.ArgumentParser()
    ap.add_argument('--write',action='store_true')
    args=ap.parse_args()
    changed,skipped=migrate(args.write)
    print(f'Shared shell bridge migration: {len(changed)} page(s) {"updated" if args.write else "would update"}.')
    if skipped:
        print(f'WARNING: {len(skipped)} candidate(s) skipped:')
        for p in skipped: print(' -',p)
        raise SystemExit(2)
    if len(changed)<300:
        print('ERROR: expected at least 300 duplicated bridge blocks; refusing incomplete migration.')
        raise SystemExit(3)
