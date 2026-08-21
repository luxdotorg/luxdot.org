# TEST REPORT — v4.3.31.1 Research Sky

Scope is intentionally isolated to the research atlas visual layer.

## Passed
- Base: LuxDot v4.3.31 stable archive.
- Modified runtime files only: `research.html`, `research-graph.js`, `research-graph.css`.
- `node --check research-graph.js`: PASS.
- Every dossier `href` referenced by the graph points to an existing local HTML file: PASS.
- Existing detail drawer and native dossier `<a href>` retained: PASS.
- Existing family filtering retained: PASS.
- Existing search retained: PASS.
- Existing confidence toggles retained: PASS.
- Existing multilingual data model retained: PASS.
- No home, entry, library, memory, projects, language-core or shell runtime files changed.

## Visual model
- Node = star.
- Star size = graph degree / centrality.
- Star glow = confidence.
- Star hue = research family/type.
- Default labels limited to a small set of major hubs.
- Hover/selected/near-zoom reveals labels.
- Constellation lines retain confidence styles.
- Zoom in/reset/out acts only on the research SVG viewBox.
