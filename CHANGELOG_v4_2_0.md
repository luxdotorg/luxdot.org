# LuxDot v4.2.0 — Language Core + Cross-Platform QA

- English is now the canonical default language for users without an explicit language choice.
- Legacy stored language values from earlier builds are ignored unless an explicit-choice marker exists.
- Explicit user choice persists across pages for Arabic, English, Dutch, Javanese and Hebrew.
- Unified language bootstrap is loaded before page i18n scripts on every HTML page.
- Common brand/header navigation is localized by the canonical language core.
- RTL is limited to Arabic and Hebrew; English, Dutch and Javanese are LTR.
- Legacy 4-language locale blocks map Javanese to the existing Indonesian source layer only when a true Javanese block is absent, and never fall back to Arabic for non-Arabic readers.
- Deep legacy research scripts no longer default to Arabic when an unsupported language key is encountered.
- Added responsive compatibility layer: safe areas, touch targets, responsive nav/cards/drawers/tables, reduced-motion handling, viewport-fit=cover.
- All local JS/CSS references cache-busted to v420 to avoid stale GitHub Pages/browser assets.
