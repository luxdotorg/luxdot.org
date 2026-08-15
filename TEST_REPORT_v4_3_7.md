# LuxDot v4.3.7 QA

Date: 2026-08-15

## Scope
- Parent research: Shaam–Brabant Historical Network
- Research radius: 50 km detailed core / 120 km principal network / documented external root nodes
- Legacy research 009 rebuilt as 120 km network atlas

## Checks
- HTML files scanned: 42
- Missing local href/src targets: 0
- New parent page locale blocks: AR / EN / NL / JV / HE present
- New 120 km atlas locale blocks: AR / EN / NL / JV / HE present
- `research-graph.js`: Node syntax check passed
- `research-context.js`: Node syntax check passed
- `site-shell.js`: Node syntax check passed
- `brabant-network-context.js`: Node syntax check passed
- Old `sacred-25km-atlas.html` preserved as redirect compatibility URL
- Circle of Care remains 25 km intentionally; it is a field project, not the historical research radius

## Browser note
A direct Chromium headless render attempt in the execution environment timed out. No browser-render pass is claimed. Static link, locale and JavaScript syntax checks are clean.
