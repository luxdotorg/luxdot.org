# LuxDot v4.18.51 — Direct Core Pages

Phase B now removes the iframe compatibility shell from the four primary navigation surfaces:

- `home.html`
- `research.html`
- `projects.html`
- `memory.html`

## Behavior

- Direct-native pages load as top-level documents and keep clean public URLs.
- The legacy `player-shell.html` detects these pages and exits the iframe instead of embedding them.
- Pages not yet migrated still use the compatibility shell, preserving the existing persistent radio/player behavior during the transition.
- Core pages use the cache-busted shared bridge reference `luxdot-shell-bridge.js?v=41851`.

No research content or conclusions are changed in this release.
