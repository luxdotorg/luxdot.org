#!/usr/bin/env python3
"""Audit LuxDot HTML pages for their dominant static editorial language.

Arabic is the canonical editorial source. Other languages are translations
or overlays of that Arabic master, not the other way around.
"""
from __future__ import annotations
import argparse, csv, html, re
from pathlib import Path

AR=re.compile(r"[\u0600-\u06FF]"); LAT=re.compile(r"[A-Za-z]")
TAG=re.compile(r"<[^>]+>",re.S)
DROP=re.compile(r"<(script|style|svg|template|noscript)\b[^>]*>.*?</\1\s*>",re.I|re.S)
COMMENT=re.compile(r"<!--.*?-->",re.S)
LANG=re.compile(r"<html\b[^>]*\blang=[\"']?([^\"'\s>]+)",re.I)
TITLE=re.compile(r"<title\b[^>]*>(.*?)</title\s*>",re.I|re.S)
CANON_AR=re.compile(r"data-canonical=[\"']ar[\"']",re.I)
MIN_LETTERS=120

def visible_text(raw):
    raw=COMMENT.sub(" ",raw); raw=DROP.sub(" ",raw); raw=TAG.sub(" ",raw)
    return re.sub(r"\s+"," ",html.unescape(raw)).strip()

def classify(ar,lat,declared,explicit_ar=False):
    if explicit_ar: return "arabic-master-explicit"
    total=ar+lat
    if total<MIN_LETTERS: return "low-text"
    if ar/total>=.60: return "arabic-master"
    if lat/total>=.75: return "english/latin-origin"
    if ar>=80 and lat>=80: return "mixed"
    if declared.lower().startswith("ar") and lat>ar: return "arabic-declared-but-latin-heavy"
    return "review"

def audit(root):
    rows=[]; ignored={"node_modules",".git","vendor"}
    for path in sorted(root.rglob("*.html")):
        if any(p in ignored for p in path.parts): continue
        try: raw=path.read_text(encoding="utf-8",errors="replace")
        except OSError: continue
        text=visible_text(raw); ar=len(AR.findall(text)); lat=len(LAT.findall(text))
        lm=LANG.search(raw); tm=TITLE.search(raw); declared=lm.group(1) if lm else ""
        rows.append({"page":path.relative_to(root).as_posix(),"declared_lang":declared,
          "arabic_letters":ar,"latin_letters":lat,
          "classification":classify(ar,lat,declared,bool(CANON_AR.search(raw))),
          "title":visible_text(tm.group(1))[:160] if tm else ""})
    return rows

def write_csv(rows,dest):
    dest.parent.mkdir(parents=True,exist_ok=True)
    with dest.open("w",encoding="utf-8",newline="") as f:
        w=csv.DictWriter(f,fieldnames=rows[0].keys() if rows else ["page"]); w.writeheader(); w.writerows(rows)

def write_md(rows,dest):
    dest.parent.mkdir(parents=True,exist_ok=True); groups={}
    for r in rows: groups.setdefault(r["classification"],[]).append(r)
    priority=["english/latin-origin","arabic-declared-but-latin-heavy","mixed","review","arabic-master-explicit","arabic-master","low-text"]
    with dest.open("w",encoding="utf-8") as f:
        f.write("# LuxDot Arabic Master Audit\n\nCanonical editorial policy: **Arabic is the master source; other locales are translations.**\n\n")
        f.write(f"Scanned **{len(rows)}** HTML pages. Visible static text only; scripts/styles/SVG are excluded.\n\n## Summary\n\n| Classification | Pages |\n|---|---:|\n")
        for k in priority: f.write(f"| {k} | {len(groups.get(k,[]))} |\n")
        for k in priority:
            items=groups.get(k,[])
            if not items: continue
            f.write(f"\n## {k}\n\n| Page | declared | Arabic | Latin | Title |\n|---|---|---:|---:|---|\n")
            for r in items:
                title=r['title'].replace('|','\\|')
                f.write(f"| `{r['page']}` | {r['declared_lang']} | {r['arabic_letters']} | {r['latin_letters']} | {title} |\n")

def main():
    ap=argparse.ArgumentParser(); ap.add_argument("--root",default="."); ap.add_argument("--md",default="artifacts/arabic-master-audit.md"); ap.add_argument("--csv",default="artifacts/arabic-master-audit.csv")
    a=ap.parse_args(); rows=audit(Path(a.root).resolve()); write_md(rows,Path(a.md)); write_csv(rows,Path(a.csv))
    counts={}
    for r in rows: counts[r['classification']]=counts.get(r['classification'],0)+1
    print(f"Scanned {len(rows)} HTML pages")
    for k in sorted(counts): print(f"{k}: {counts[k]}")
    print(f"Markdown report: {a.md}\nCSV report: {a.csv}")
if __name__=="__main__": main()
