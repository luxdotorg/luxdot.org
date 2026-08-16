# LuxDot v4.3.9 — QA Report

## Scope
Deep archival node-registry enrichment plus language and interaction stabilization.

## Static integrity
- HTML files checked: 60
- Missing local references: 0
- JavaScript syntax failures: 0
- `site-quality.js` loaded by every HTML page: yes
- Version marker: 4.3.9

## Language fixes
- Faith & Wisdom: full AR / EN / NL / JV / HE renderer added.
- Memory: non-Arabic fallback prevents untranslated Arabic master fields from leaking into EN / NL / JV / HE.
- Legacy dossier safety: if substantial untranslated Arabic remains in a non-Arabic view, it is hidden behind a language-safe localized dossier view rather than mixed into the page.
- Arabic and Hebrew entry views bypass the fragile clip-path arrival animation and include a hard fail-safe to prevent a frozen landing page.
- Intro passes the selected language explicitly to `home.html?lang=...`.

## Interaction parity
- Home cartridges are fully clickable and keyboard accessible in every language.
- All `[data-href]` cartridges receive the same click behavior independent of locale.

## Name policy
- Arabic: رافي الحجي
- English / Dutch / Javanese: Rafi  Alhaji
- Hebrew: ראפי עבד אל-סמיע אל-חאג'י

## Archival registry enrichment
Added evidence routes for the Alphen–Chaam schepenbank, vestbrieven, DTB registers, poor-relief records, appeals through Breda, and tracked person/family examples including Weghen → Van Asten → De Roy, Laureis van Asten, Hugo van den Kerckhoven, Van Gils × Van den Kieboom and related inheritance/property records.

## Browser automation note
Chromium is installed in the execution environment but headless Chromium did not complete even for a minimal `data:` page and timed out. Therefore no browser-render claim is made. Static integrity and JavaScript syntax checks passed; runtime safeguards were added for the previously reported failure modes.
