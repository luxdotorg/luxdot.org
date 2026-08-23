# TEST REPORT — LuxDot v4.3.45

- Base: v4.3.44 full-replace Kufi/navigation-clean package.
- New dossier `chaam-midwives.html` parses successfully.
- Locale blocks present: AR / EN / NL; unsupported dossier locales safely fall back to EN.
- `research-graph.js` passes `node --check`.
- New `chaam-midwives` graph node is present and linked to `shaam`, `chaamgene`, and `janssen`.
- All local CSS/JS/navigation references used by the new dossier resolve to files in the package.
- Arabic dossier uses Arabic display names; archival Latin names remain confined to source URLs/metadata where needed.
- Claims are visually separated as documented / strongly inferred / open.
