# LuxDot v4.3.11 — Clean Entry QA

## Rebuild basis
- Rebuilt from the stable `LuxDot_v4_3_9_ARCHIVE_LANGUAGE_STABLE.zip` package.
- The broken v4.3.10 entry package was not used as the base.

## Root-cause isolation
The entry gate previously loaded shared site language/UI scripts before the gate finished initializing. A saved Arabic state could therefore affect the entry document before the gate-specific script took control.

## Fix
- `index.html` is now isolated and loads only:
  - `intro.css?v=4311`
  - `intro.js?v=4311`
- No `language-core.js`, `luxdot-arabic-ui.js`, `site-quality.js`, `platform-v43.css`, or other inner-site runtime is loaded on the gate.
- Choosing a language changes only the gate UI and persists the explicit selection.
- Choosing Arabic does **not** navigate.
- Pressing the receive-signal button persists the current language and navigates to plain `home.html`.
- `home.html` then reads the explicit saved language through the normal site language core.
- The Arabic gate label uses the Kufi stack directly: `Noto Kufi Arabic`, `Kufam`, then safe fallbacks.

## Static QA
- HTML pages checked: 60
- Missing local script/style/image references: 0
- JavaScript files checked with `node --check`: 32
- JavaScript syntax failures: 0
- Entry gate external site scripts: 0
- Entry page scripts: `intro.js` only
- Entry page stylesheet: `intro.css` only
- `home.html?lang=` entry redirects: 0
- Arabic language button present: yes
- Kufi rule for Arabic language button: yes

## Browser-run limitation
A Chromium headless smoke test was attempted in the execution environment, but Chromium itself timed out while initializing due to environment/DBus constraints. This is recorded as an environment limitation, not counted as a successful browser test.
