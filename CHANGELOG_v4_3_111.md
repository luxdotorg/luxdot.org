# LuxDot v4.3.111 — Hard-coded Ten-language Menu Repair

This release fixes the visible selector at the HTML source level rather than relying on a post-load JavaScript repair.

- Rewrote every `data-lang-select` menu to contain ten static options.
- Expanded `app.js` CORE_LANGS and LANG_META to AR/EN/NL/HE/JV/ID/FR/ES/DE/TR.
- Prevented app.js from relabeling/removing the new menu entries.
- Cache-busted app.js and language-core.js across the site.
- Retained English fallback for long-form page bodies that do not yet have authored translations.
