# LuxDot v4.1.0 — QA report

Date: 14 August 2026
Base: LuxDot v4.0.0 Research Graph

## Passed
- JavaScript syntax: app.js, intro.js, research-graph.js, research-context.js, five-lang-site.js.
- Static local reference scan: 0 missing href/src files.
- Language-selector scan: every page carrying a selector exposes ar / en / nl / jv / he.
- HTTP smoke: index, home, research, Burckhardt, African Association, Memory, Library, Projects returned HTTP 200.
- New graph nodes 010 and 011 present and linked.
- Intro language dictionaries present for all five core languages.
- ZIP integrity checked after packaging.

## Language coverage note
The core shell, entrance, navigation, Research Graph, and new dossiers 010/011 are five-language. Older dossiers originally authored with ar/en/nl/id remain functional in jv/he through an explicit English fallback rather than blank or mixed hidden states. Their full-content jv/he translation remains a future content pass, not a runtime failure.
