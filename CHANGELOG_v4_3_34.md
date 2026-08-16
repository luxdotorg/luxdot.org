# LuxDot v4.3.34 — Arabic Navigation Hardening

- Arabic-only navigation shell; removed runtime language selector and `?lang=` rewriting.
- Added ArabicMaster compatibility bridge (`window.LuxLang.get() => ar`) for legacy modules.
- Arabic Master is now loaded on all 76 HTML pages, including nested research branches.
- Home section cards are real `<a href>` elements and no longer depend on JavaScript for navigation.
- Preserved real internal anchors/buttons inside enhanced cartouches instead of deleting them.
- Normalized all internal links to remove legacy language query parameters.
- Navigation audit: 1231 HTML internal references checked, 0 missing.
- JavaScript literal navigation targets checked, 0 missing.
- JavaScript syntax audit passed.
