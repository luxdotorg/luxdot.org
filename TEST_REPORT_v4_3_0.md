# LuxDot v4.3.0 — QA Report
Date: 15 August 2026

## Structural checks
- HTML pages: 57
- JavaScript files checked with `node --check`: 28
- JavaScript syntax failures: 0
- Missing local href/src assets: 0
- HTML pages whose static default is not English: 0
- Internal pages missing universal header shell: 0
- Pages missing v4.3 compatibility/Kufi stylesheet: 0
- Internal pages missing pre-render language guard: 0

## Language integrity checks
- Shared `data-t` keys without explicit Javanese translation: 0
- Shared `data-t` keys without explicit Hebrew translation: 0
- English/Dutch `data-locale` blocks containing Arabic/Hebrew script: 0
- Active files still using an Arabic default fallback (`|| 'ar'`): 0
- Landing intro explicitly initializes `lang='en'` and calls `setLang('en', false)` before any visitor selection.
- Legacy Javanese/Hebrew pages without full body translation are language-gated: no silent English/Indonesian/Arabic fallback is displayed.

## Arabic typography
- Every HTML page loads `platform-v43.css`.
- Final cascade forces Noto Kufi Arabic for Arabic UI/body text, with RTL/right alignment.
- Explicit source-script elements (Hebrew/Greek/Latin originals) are excluded from the forced Arabic font where preservation of the source script is intentional.

## Mobile/platform checks
Static compatibility audit passed for:
- responsive one-column collapse under 600px;
- universal header with horizontal nav scrolling on narrow screens;
- minimum 44px coarse-pointer targets;
- viewport-fit / safe-area handling;
- 100vh + 100dvh fallback strategy;
- WebKit-prefixed backdrop filter;
- reduced-motion handling;
- media max-width and overflow controls.

## Browser execution limitation
The container includes Chromium only; Firefox/WebKit binaries are not installed. Chromium headless itself fails to terminate even on a trivial local HTML page because the container lacks the DBus/zygote runtime it expects. Therefore this report does **not** claim pixel-level execution testing in Chrome, Safari or Firefox. Cross-browser work here is standards/static compatibility review plus syntax/link validation. Final visual confirmation should still be done on the deployed GitHub Pages URL in real browsers.

## Result
Structural/language static QA: PASS
Local-link QA: PASS
JavaScript syntax QA: PASS
Language-default audit: PASS
Mobile/cross-browser compatibility review: PASS (static; runtime limitation noted above)
