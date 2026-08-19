# LuxDot v4.3.101 — Four-language Research + Kufi QA

Date: 2026-08-19

## Scope

Full replacement build based on v4.3.100. The audit covers all HTML pages for the global language/Kufi layer and every page referenced by `research-graph.js` for AR / EN / NL / HE availability.

## Root-cause repairs

1. `language-core.js` is now the single global language authority for `ar`, `en`, `nl`, `he`.
2. Both historic storage keys (`luxdot.lang` and `luxdot_lang`) are synchronized.
3. `?lang=he` sets `html[lang=he]`, RTL, `body.lang-he`, and content-language metadata.
4. A four-language fixed picker is injected on every HTML page. The landing page also contains an explicit `עברית` control.
5. `page-translations.js` no longer forces a requested non-Arabic locale back to Arabic.
6. Explicit `[data-locale]` blocks are selected by the requested locale; safe non-Arabic fallback is EN rather than silently relabelling Arabic.
7. Arabic typography is globally locked to Noto Kufi Arabic. Arabic fragments embedded inside EN/NL/HE pages are marked and rendered in Kufi as well.

## Research Sky audit

- Research pages referenced by `research-graph.js`: **78**
- Missing research files: **0**
- Research pages without a Hebrew content path: **0**
- Research pages with four explicit locale blocks: **37**
- Jewish research pages with full four-language data objects: **18**
- Legacy/static research pages supplied with a dedicated full Hebrew body layer: **15**
- Existing dynamic pages with Hebrew-aware page-specific i18n: **8**
- Legacy placeholder phrases such as “Arabic dossier is the primary layer”: **0**
- Unintended Arabic leakage inside explicit Hebrew research blocks: **0**

The two fixed Arabic name spellings in `name-date-matrix.html` remain intentionally present as source/evidence strings and are rendered with the Kufi rule rather than treated as untranslated prose.

## Specific pages repaired in this pass

- `messianic-names-numbers-atlas.html`: Hebrew visibility now follows `body.lang-he`; no local language system can override the core.
- `1127-watch.html`
- `abulafia-comparative-lab.html`
- `christian-apocalyptic-numbers-newton.html`
- `hurufism-fazlallah-nasimi.html`
- `jafr-ilm-huruf.html`
- `luria-vital-redemption.html`
- `messianic-method-comparison.html`
- `sabbatai-nathan-test.html`
- `savior-atlas.html`
- `templars-master.html`
- `druze-hikma.html`
- `hallaj.html`
- `kees-van-wanrooij.html`
- `mahdi-matrix.html`
- `reiderland-live.html`
- `grote-kerk-north-transept.html`
- `hank-raamsdonk-war-memory.html`
- `jan-van-velthoven.html`
- `jochem-van-velthoven.html`
- `polleke-mummy-cat.html`
- `thijs-loss-consolation.html`
- `van-velthoven-family.html`
- `van-velthoven-grote-kerk.html`
- `jansen-de-koning-network.html`
- `sacred-120km-network.html`
- `janssen-family.html`
- `chaam-deep-history.html`
- `name-date-matrix.html`
- `willibrord-echternach.html`

## Global QA

- HTML files scanned: **140**
- HTML pages missing `language-core.js`: **0**
- HTML pages missing `luxdot-global-language.css`: **0**
- Landing-page Hebrew control present: **PASS**
- Internal HTML links broken: **0**
- JavaScript files syntax-checked with Node: **40**
- JavaScript syntax failures: **0**

## Note on browser automation

The container's Chromium process could not complete a headless DOM dump because its DBus environment is unavailable. Therefore the release gate used deterministic source/DOM-structure checks, JavaScript syntax validation, locale-path auditing, and internal-link validation rather than claiming a successful Chromium visual run.
