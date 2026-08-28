# LuxDot v4.18.50 — Shared Shell Bridge

Phase B continues the navigation architecture cleanup without removing the persistent player/radio shell yet.

## Changes

- Added `luxdot-shell-bridge.js` as the single shared page-to-shell navigation bridge.
- Replaced duplicated inline redirect/postMessage bridge code in **522 HTML pages** with one root-absolute shared script reference.
- Removed roughly 10,440 duplicated lines of shell-navigation code from individual pages.
- Kept clean public URL synchronization and the existing persistent radio/player behavior.
- Added an idempotent repository migration utility at `tools/migrate_shell_bridge.py` for auditing or future controlled migrations.
- Removed the one-shot migration workflow after it completed; no write-enabled migration workflow is retained on main.
- Added a blocking QA contract that fails if duplicated inline shell redirects return or if shared-bridge coverage unexpectedly falls below the established baseline.

## Architectural effect

Page content no longer owns a private copy of the shell-routing implementation. Navigation behavior can now be corrected once in `luxdot-shell-bridge.js`, which is a prerequisite for the later Phase B step that progressively removes the iframe shell itself.

This release does not change research content or conclusions.
