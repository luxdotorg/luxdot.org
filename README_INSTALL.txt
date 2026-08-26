LuxDot v4.18.31 — Homepage Signal Header Hotfix

REPLACE:
- home.html
- build-meta.json

No other files need replacement.

Reason:
site-shell.js still loads the old symbol UI with the old cache key.
home.html now explicitly loads luxdot-symbol-ui.js?v=41831 AFTER site-shell.js,
so the Calendar icon and icon-only Pulse state are applied on the homepage immediately.
