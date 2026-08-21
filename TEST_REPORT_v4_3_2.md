# LuxDot v4.3.2 — Projects Javanese/Hebrew Functional QA

## Root cause
`site-shell.js` treated `projects.html` and `research/circle-of-care-25km-original.html` as legacy pages only when the selected language was Javanese (`jv`) or Hebrew (`he`). Its `localizedLegacy()` routine removed the real `<main>` content and replaced it with a summary, which removed the actual project card / interactive map experience.

## Fixes
- Added `projects.html` to the full multilingual page allow-list.
- Added `circle-of-care-25km-original.html` to the same allow-list.
- The real HTML link to the Circle of Care map remains present in both Javanese and Hebrew project blocks.
- The full interactive map remains present in both Javanese and Hebrew instead of being replaced by a legacy summary.
- Hebrew Chaam label now includes Hebrew transliteration plus the official Latin spelling.
- Cache key for `site-shell.js` and the live map script bumped to `v432` on the affected pages.

## Static checks
- `site-shell.js`: Node syntax PASS
- `circle-of-care-live-map.js`: Node syntax PASS
- Javanese project block: Circle of Care href PASS
- Hebrew project block: Circle of Care href PASS
- Javanese map localization: PASS
- Hebrew map localization: PASS
- FULL5 protection for projects and map: PASS
- ZIP integrity: PASS

## Language note
The site's fifth Southeast Asian interface language remains **Basa Jawa (Javanese)**, as selected in the current site architecture. It is not silently replaced with Bahasa Indonesia.
