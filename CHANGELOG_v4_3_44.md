# LuxDot v4.3.44 — Full Replace Clean Build

- Rebuilt from v4.3.42 as a complete replacement package.
- Added a dedicated last-loaded UI lock to all HTML pages recursively, including nested research pages.
- Noto Kufi Arabic is loaded from Google Fonts; no font binaries are bundled.
- Arabic UI and all header/navigation typography are forced to the same Kufi family with !important.
- Persistent header, breadcrumbs, Close & return, Back, Top, and section-return controls are injected on every page recursively.
- Shell refreshes on LuxDot language-change events.
- Recursive integrity checks cover 100 HTML pages and all JS files.
