# LuxDot v4.18.52 — Direct Secondary Surfaces

Phase B expands native top-level navigation beyond the first four core pages.

## Changes

- Added six more direct-native pages: `library.html`, `faith.html`, `humanity.html`, `media.html`, `audiovisual.html`, and `praxis.html`.
- These pages now run outside `player-shell.html` and expose their real URL directly.
- `player-shell.html` exits cleanly to these pages when navigation reaches them from a still-embedded legacy page.
- Updated the six pages to `luxdot-shell-bridge.js?v=41852` to avoid stale cached bridge behavior.
- Retained the compatibility iframe shell only for pages not yet migrated.
- Added a blocking QA contract that verifies all ten direct-native pages are represented consistently in both the shared bridge and compatibility shell.
- Generalized the shared-bridge QA check so cache-busting version changes do not reduce coverage counts artificially.
- Removed the temporary write-enabled migration workflow after the controlled migration completed.

No research content or conclusions were changed.
