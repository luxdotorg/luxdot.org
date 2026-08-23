LuxDot v4.16.7 — Research Visual Rebuild PATCH

Replace in repository root:
- research-graph.js
- research-views-v4.js
- language-core.js

Add in repository root:
- luxdot-global-compact-v4167.css
- luxdot-research-visual-v4167.css

What this patch implements:
1. Renames Research navigation/heading to Live Research / الأبحاث الحيّة.
2. Reduces global typography and UI scale.
3. Moves research lenses directly above the visualization and simplifies them.
4. Adds Google-Maps-style node hover cards near the pointer with confidence, source count, link count, galaxy, and direct Open Research action.
5. Rebuilds the four research lenses:
   - Sky: nodes concentrate along a Milky Way band.
   - Universe: spiral galaxy clusters over a JWST deep-field background.
   - Neural: human-brain-like bilateral silhouette with branching neural paths.
   - Motherboard: board grid, chips, and orthogonal traces.
6. Reduces research cartridge sizes and prevents corner marks from covering text.

After Commit + Push, use Ctrl+Shift+R once because research.html still references legacy query-string version numbers.
