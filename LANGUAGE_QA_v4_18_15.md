# LuxDot Language QA — v4.18.15

## Scope
- HTML pages audited: 523
- Nested HTML pages audited: 312
- Supported languages: ar, en, nl, he, jv, id, fr, es, de, tr
- Prophet pages explicitly cleaned: 51
- Pages receiving the language-polish layer: 523

## What was repaired
1. Fixed relative CSS/JS/data/assets paths on nested pages (especially `/prophets/...`).
2. Added `language-core.js`, `content-language-core.js`, and `luxdot-language-polish.js` to every HTML page that lacked them.
3. Made the language core aware of nested-page root prefixes.
4. Made translation coverage loading work from nested folders.
5. Preserved `?lang=` across internal navigation.
6. Added RTL/LTR handling for all supported languages.
7. Added an Arabic-first UI cleanup dictionary so unnecessary English labels do not remain on Arabic pages.
8. Protected proper names, original scripts, transliterations, code, and scientific notation from destructive translation.
9. Kept original Hebrew/Syriac/etc. text only where meaningful, with Arabic context on Arabic pages.
10. Generated coverage records for every HTML page; non-native target languages use the translation fallback.

## Native/static language coverage detected
- ar: 443
- en: 122
- nl: 46
- he: 26
- jv: 26
- id: 5
- fr: 0
- es: 0
- de: 0
- tr: 0

## Automated QA
- Remaining structural issues: 0
- JavaScript syntax errors: 0

### Remaining structural issue sample
- None detected by structural audit.

### JS syntax
- All checked language/runtime JS files pass `node --check`.

## Editorial rule
For Arabic pages, Arabic is primary. A non-Arabic form stays only when it is a proper name, original-script evidence, transliteration, scientific symbol, or otherwise meaningful to the research; when needed it should appear beside an Arabic label/explanation. The same principle is applied language-by-language through native content where available and fallback translation otherwise.
