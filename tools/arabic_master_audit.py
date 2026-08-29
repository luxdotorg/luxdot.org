#!/usr/bin/env python3
"""Audit LuxDot HTML pages for their dominant static editorial language.

Policy goal: Arabic is the canonical editorial source. Other languages are
translations/overlays of that Arabic master, not the other way around.

The audit intentionally analyses visible static text only. It strips scripts,
styles, SVG and markup so JavaScript dictionaries and CSS do not hide an
English-origin page. Output is both human-readable Markdown and CSV.
"""
from __future__ import annotations

import argparse
import csv
import html
import re
from pathlib import Path

AR = re.compile(r"[\u0600-\u06FF]")
LAT = re.compile(r"[A-Za-z]")
TAG = re.compile(r"<[^>]+>", re.S)
DROP = re.compile(r"<(script|style|svg|template|noscript)\b[^>]*>.*?</\1\s*>", re.I | re.S)
COMMENT = re.compile(r"<!--.*?-->", re.S)
LANG = re.compile(r"<html\b[^>]*\blang=[\"']?([^\"'\s>]+)", re.I)
TITLE = re.compile(r"<title\b[^>]*>(.*?)</title\s*>", re.I | re.S)

# Tiny fragments are usually controls/brand labels, not editorial prose.
MIN_LETTERS = 120


def visible_text(raw: str) -> str:
    raw = COMMENT.sub(" ", raw)
    raw = DROP.sub(" ", raw)
    raw = TAG.sub(" ", raw)
    raw = html.unescape(raw)
    return re.sub(r"\s+", " ", raw).strip()


def classify(ar: int, lat: int, declared: str) -> str:
    total = ar + lat
    if total < MIN_LETTERS:
        return "low-text"
    ar_ratio = ar / total
    lat_ratio = lat / total
    if ar_ratio >= 0.60:
        return "arabic-master"
    if lat_ratio >= 0.75:
        return "english/latin-origin"
    if ar >= 80 and lat >= 80:
        return "mixed"
    if declared.lower().startswith("ar") and lat > ar:
        return "arabic-declared-but-latin-heavy"
    return "review"


def audit(root: Path):
    rows = []
    ignored = {"node_modules", ".git", "vendor"}
    for path in sorted(root.rglob("*.html")):
        if any(p in ignored for p in path.parts):
            continue
        try:
            raw = path.read_text(encoding="utf-8", errors="replace")
        except OSError:
            continue
        text = visible_text(raw)
        ar = len(AR.findall(text))
        lat = len(LAT.findall(text))
        lm = LANG.search(raw)
        tm = TITLE.search(raw)
        declared = lm.group(1) if lm else ""
        title = visible_text(tm.group(1)) if tm else ""
        rows.append({
            "page": path.relative_to(root).as_posix(),
            "declared_lang": declared,
            "arabic_letters": ar,
            "latin_letters": lat,
            "classification": classify(ar, lat, declared),
            "title": title[:160],
        })
    return rows


def write_csv(rows, dest: Path):
    dest.parent.mkdir(parents=True, exist_ok=True)
    with dest.open("w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=rows[0].keys() if rows else ["page"])
        w.writeheader(); w.writerows(rows)


def write_md(rows, dest: Path):
    dest.parent.mkdir(parents=True, exist_ok=True)
    groups = {}
    for r in rows:
        groups.setdefault(r["classification"], []).append(r)
    priority = ["english/latin-origin", "arabic-declared-but-latin-heavy", "mixed", "review", "arabic-master", "low-text"]
    with dest.open("w", encoding="utf-8") as f:
        f.write("# LuxDot Arabic Master Audit\n\n")
        f.write("Canonical editorial policy: **Arabic is the master source; other locales are translations.**\n\n")
        f.write(f"Scanned **{len(rows)}** HTML pages. This report measures visible static text, excluding scripts/styles/SVG.\n\n")
        f.write("## Summary\n\n| Classification | Pages |\n|---|---:|\n")
        for key in priority:
            f.write(f"| {key} | {len(groups.get(key, []))} |\n")
        for key in priority:
            items = groups.get(key, [])
            if not items: continue
            f.write(f"\n## {key}\n\n| Page | declared | Arabic | Latin | Title |\n|---|---|---:|---:|---|\n")
            for r in items:
                title = r['title'].replace('|', '\\|')
                f.write(f"| `{r['page']}` | {r['declared_lang']} | {r['arabic_letters']} | {r['latin_letters']} | {title} |\n")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--root", default=".")
    ap.add_argument("--md", default="artifacts/arabic-master-audit.md")
    ap.add_argument("--csv", default="artifacts/arabic-master-audit.csv")
    args = ap.parse_args()
    root = Path(args.root).resolve()
    rows = audit(root)
    write_md(rows, Path(args.md))
    write_csv(rows, Path(args.csv))
    counts = {}
    for r in rows: counts[r['classification']] = counts.get(r['classification'], 0) + 1
    print(f"Scanned {len(rows)} HTML pages")
    for k in sorted(counts): print(f"{k}: {counts[k]}")
    print(f"Markdown report: {args.md}")
    print(f"CSV report: {args.csv}")

if __name__ == "__main__":
    main()
