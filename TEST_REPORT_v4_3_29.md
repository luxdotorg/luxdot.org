# TEST REPORT — LuxDot v4.3.29

## Root cause fixed
- v4.3.28 `site-shell.js` contained `localizedLegacy()` which removed the original `<main>` / `.hero` and generated substitute summary pages for non-Arabic languages.
- v4.3.28 `site-quality.js` contained `languageSafety()` which could replace a page's main content with a language-safe placeholder.
- Both mechanisms are removed.

## Language architecture
- `language-core.js` is now the sole language-selection owner.
- Language changes keep the exact same pathname and only change `?lang=...`.
- Existing translation mechanisms inside each page are preserved: `data-locale`, `data-t`, and page-specific i18n scripts.
- `five-lang-site.js` is a no-op compatibility shim and no longer competes with `language-core.js`.
- `site-shell.js` only rebuilds the header; it never modifies page content.

## Static QA
- All JavaScript syntax checks: PASS.
- No `localizedLegacy`, `languageSafety`, or main-content deletion logic in live JS: PASS.
- No Elon Musk variants in live HTML/JS/JSON/CSS: PASS.
- All non-index HTML pages include `language-core.js`: PASS.

## Browser QA limitation
A Chromium runtime test was attempted with the system Chromium, but this execution environment blocks navigation to both localhost and file URLs with `ERR_BLOCKED_BY_ADMINISTRATOR`. Therefore browser runtime behavior could not be honestly marked PASS here; the package was validated statically instead.
