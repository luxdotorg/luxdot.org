# Phase B — Direct Core Pages

This step removes the iframe shell from the four primary navigation surfaces while preserving the legacy shell as a compatibility boundary for the rest of the site.

Direct-native pages:

- `home.html`
- `research.html`
- `projects.html`
- `memory.html`

Behavior:

- Opening a direct-native page loads it as the top-level document.
- Navigating from the legacy shell to a direct-native page exits the iframe shell and exposes the clean public URL.
- Navigating from a direct-native page to a page not yet migrated continues through `player-shell.html`, preserving the persistent radio/player behavior for legacy pages.
- No research content is changed.

This is an incremental compatibility transition, not the final removal of `player-shell.html`.
