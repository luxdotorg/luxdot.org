# TEST REPORT v4.3.108

## Static integration
- PASS — 142 internal HTML pages include exactly one shared `site-shell.js?v=43108`.
- PASS — No internal HTML page is missing the centralized shell.
- PASS — Global shell no longer creates back/forward history controls.
- PASS — Header language selector is limited to AR / EN / NL / HE.
- PASS — Language menu is part of the header shell, not a floating control.

## JavaScript
- PASS — `site-shell.js` syntax.
- PASS — `language-core.js` syntax.
- PASS — `scripture-reader-v43108.js` syntax.
- PASS — `hikma-reader.js` syntax.
- PASS — `hikma-i18n-v43108.js` syntax.

## Sacred readers
- PASS — Tanakh has Arabic/English/Dutch/Hebrew reader-language editions plus independent Hebrew original.
- PASS — New Testament has Arabic/English/Dutch/Hebrew reader-language editions plus independent Greek original.
- PASS — Tanakh and New Testament book labels localize to AR/EN/NL/HE.
- PASS — Hikma reader interface localizes to AR/EN/NL/HE.
- PASS — Hikma Arabic source body is explicitly marked `lang="ar" dir="rtl"` and is not confused with reader UI language.

## Local references
- PASS — No missing local refs found in key pages: library, faith, research, Tanakh, New Testament, Hikma reader.

## Network-source note
The Bible/Tanakh edition pages are loaded from eBible.org inside the reader and therefore require network access. Source editions used are open/public-domain or openly licensed and are linked from each reader. The Hikma OCR/scans likewise require the Internet Archive connection already used by the prior reader.

## Visual smoke-test note
A Chromium headless screenshot attempt could not complete in this container because the browser process stalled on the environment's D-Bus/runtime layer. Static DOM/CSS integration and JavaScript syntax checks passed; no claim is made that the headless screenshot completed.
