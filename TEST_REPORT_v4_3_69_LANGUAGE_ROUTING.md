# LuxDot v4.3.69 — Language Routing QA
- Research Sky Open Node now appends the active `lang` query parameter.
- `language-core.js` now carries the active language across all internal `.html` links.
- All HTML pages cache-bust `language-core.js` at `v=4369`; Research Sky cache-busts `research-graph.js` at `v=4369`.
- Research node target audit: **41/41 target files exist**.
- Research node target language-query audit: **41/41 targets support query/local language routing**.
- Supported public languages remain Arabic, English and Dutch.
