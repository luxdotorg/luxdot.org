# TEST REPORT v4.3.115

## Static QA
- HTML pages audited: 144
- All HTML pages include `content-language-core.js?v=43115`
- `content-language-core.js`: JavaScript syntax PASS
- `language-core.js`: JavaScript syntax PASS
- `site-shell.js`: JavaScript syntax PASS
- `data/i18n-coverage.json`: JSON parse PASS
- Ten language codes present in central language core: PASS
- Fixed identity protection present: PASS

## Runtime note
The automatic body-translation fallback uses Google Translate's web element and therefore requires client internet access to `translate.google.com`. Native LuxDot translations do not depend on that fallback. If the external service is blocked, the page remains usable and records `data-lux-translation-mode="fallback-failed"` rather than breaking navigation.
