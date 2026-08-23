# LuxDot v4.3.115 — Language Content Core

- Added `content-language-core.js` as a site-wide body-content translation layer.
- Added page-by-page translation coverage manifest: `data/i18n-coverage.json`.
- Native/curated translations always take priority.
- When a requested language is missing from a page, the content layer now triggers a full-page translation fallback instead of translating only the header.
- Fallback supports all ten configured languages: ar, en, nl, he, jv, id, fr, es, de, tr.
- Fixed identities `Rafy Alhajji`, `Rafi Alhaji`, `رافي الحجي`, `رافي الحاجي`, and LuxDot branding are protected from automatic translation.
- Unified cache version for `language-core.js`, `site-shell.js`, and the new content core to 43115.
- Added `I18N_COVERAGE_v4_3_115.md` with native-vs-fallback coverage counts.
