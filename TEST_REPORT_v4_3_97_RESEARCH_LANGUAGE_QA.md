# LuxDot v4.3.97 — Research Language QA

Date: 2026-08-19
Scope: Research Sky and linked research dossiers; Arabic / English / Dutch only.
Hebrew remains disabled in the active language selector.

## Final gates

- LANGUAGE INTEGRITY: PASS (`QA_LANGUAGE_INTEGRITY.py`)
- Research Graph HTML targets: 78 checked, 0 missing
- Relative HTML links site-wide: 0 broken
- Top-level JavaScript syntax: 38 files checked, 0 failures
- Jewish Research dynamic pages: 18 checked; all have AR/EN/NL detailed sections and localized related-node labels
- Static research localization module: 11 pages wired and checked
- Legacy incomplete locale dossiers repaired: 8
- `pet-goat-apocalypse-media.html`: converted from Arabic-only source fallback to full AR/EN/NL locale content
- Non-Arabic `data-locale` blocks: no unexplained Arabic residue. Remaining Arabic strings in `name-date-matrix.html` are intentional fixed Arabic name spellings used as source forms.
- `research-graph.js`: English and Dutch string fields contain no Arabic-script fallback strings.
- Active language core: `SUP=['ar','en','nl']`; Hebrew is not enabled in this release.

## Proper-name policy

Names are localized by established historical/public forms rather than literal retransliteration from Arabic. Examples used in this release:

- Maimonides / Moses Maimonides
- Abraham Abulafia
- Joseph Karo
- Ovadia Yosef
- Yitzhak Yosef
- Isaac Luria
- Hayyim Vital
- Sabbatai Zevi
- Nathan of Gaza
- Jan van Velthoven
- Jochem van Velthoven
- Grote Kerk Breda
- Hof ter Brake / Prinsenhoef

Arabic fixed source spellings in the name/date research remain unchanged where the research explicitly compares spellings.

## Major repairs in v4.3.97

1. Jewish/Messianic cluster: translated detailed sections, not only title/lead; localized related-node buttons.
2. Added `research-static-i18n.js` for older/static research pages and translated page titles.
3. Savior Atlas: per-tradition EN/NL summaries instead of a generic non-Arabic summary.
4. Repaired 1127 Watch and Templars Master localization, including nested inline text.
5. Repaired eight legacy dossiers that previously exposed only an EN/NL shell while saying the Arabic master translation was queued:
   - hank-raamsdonk-war-memory.html
   - jan-van-velthoven.html
   - jochem-van-velthoven.html
   - grote-kerk-north-transept.html
   - van-velthoven-family.html
   - thijs-loss-consolation.html
   - van-velthoven-grote-kerk.html
   - polleke-mummy-cat.html
6. Converted `pet-goat-apocalypse-media.html` to real AR/EN/NL locale blocks covering all twenty research sections and the comparison matrices.
7. `page-translations.js` now localizes the browser document title from the active locale's H1.

## Hebrew readiness

This release is the baseline before Hebrew activation. Recommended Hebrew phase:
1. Add `he` to active `SUP` only after complete Hebrew content is present.
2. Build a Hebrew proper-name glossary first (native Hebrew spellings + accepted scholarly Latin forms).
3. Verify RTL at component level, especially matrices, calculators, source cards and mixed Hebrew/Latin numeric expressions.
4. Run the same no-fallback gate: no Arabic/English body content may masquerade as Hebrew.
