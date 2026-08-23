# LuxDot v4.0.0 — Research Graph QA

## Structural checks
- Base build: LuxDot v3.0.0 Sacred 25 km Atlas.
- JavaScript syntax: PASS (`research-graph.js`, `research-context.js`).
- Local HTML href/src scan: PASS, 0 missing local references.
- Context backlink/classification injected into all 9 current research dossiers: PASS.
- Legacy research IDs 001–009 preserved: PASS.
- Five research families present: PASS.
- 1648 and 1944 time hubs present: PASS.
- A–E confidence metadata present on graph relationships: PASS.
- Four interface languages from base build preserved: Arabic, English, Dutch, Indonesian.

## Design / method checks
- Research, Living Memory, Library and Projects are explicitly separated.
- Knowledge Journeys is marked as a planned family; unfinished Burckhardt/African Association dossiers are not presented as completed research pages.
- No existing research dossier was deleted or renamed.
- Graph uses no external JS visualization library and remains compatible with static GitHub Pages hosting.

## Limitation
Static, syntax and reference QA passed. Pixel-perfect rendering was not claimed because no supported browser renderer is available in this environment.
