# QA v4.3.72 — Navigation and maps

## Root cause fixed
`language-core.js` previously rewrote every internal HTML link to `u.pathname.split('/').pop()`, stripping directory names. Thus `research/circle-of-care-25km-original.html` became `circle-of-care-25km-original.html` at the site root.

## Checks
- Projects AR link: `/research/circle-of-care-25km-original.html?lang=ar`
- Projects EN link: `/research/circle-of-care-25km-original.html?lang=en`
- Projects NL link: `/research/circle-of-care-25km-original.html?lang=nl`
- Target file exists.
- Reiderland map cartridge is a native `<a href="#reiderInteractiveMap">`; no JS is required for the click.
- OpenStreetMap iframe is present in the DOM after localization and is always visible.
- Node syntax checks pass for `language-core.js` and `reiderland-i18n.js`.
