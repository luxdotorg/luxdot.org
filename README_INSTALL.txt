LuxDot v4.18.32 — SAFE HOME SIGNAL FIX

Base: latest main after Revert 41831.

REPLACE:
- home.html
- build-meta.json

ADD:
- luxdot-signal-header-v41832.css
- luxdot-signal-header-v41832.js

This does NOT replace site-shell.js or player-shell.html.
The new layer is deliberately bounded to 38px controls and repeatedly normalizes the header after legacy/deferred scripts run.
