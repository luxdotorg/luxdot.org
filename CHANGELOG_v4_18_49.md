# LuxDot v4.18.49 — Shell Navigation Phase B

This release starts the architectural cleanup of the `player-shell` navigation layer while preserving the radio and existing page content.

## Changes

- Keeps `player-shell.html` as the persistent runtime container for now, but stops exposing `player-shell.html?page=...` as the visible browser URL after startup.
- Rewrites browser history to the actual LuxDot page path, so copied/shared URLs remain clean and stable.
- Makes iframe targets root-absolute, preventing nested pages from resolving to duplicated paths such as `/research/research/...`.
- Synchronizes the outer document title, language and direction with the active inner page.
- Validates `postMessage` navigation by same-origin checks.
- Removes the temporary `luxembed` parameter from public URLs.
- Marks the shell itself `noindex,follow` so the container is not intended as a search result page.
- Adds a CI regression contract for the shell navigation behavior.

## Scope

This is the first Phase B step, not the final removal of the iframe architecture. The current goal is to make navigation, history, copied URLs, nested paths and language metadata stable before progressively moving shared shell behavior out of individual pages.
