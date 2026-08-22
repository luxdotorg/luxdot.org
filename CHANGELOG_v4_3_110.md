# LuxDot v4.3.110 — Language Menu Visibility Repair
- Fixed the actual visible language selector, not only the language registry.
- Forced every HTML page to load language-core.js?v=43110, eliminating stale per-page cache versions.
- Added self-healing language selector logic: if a legacy page/script rewrites the menu back to four languages, the central core restores all ten.
- Menu now exposes AR / EN / NL / HE / JV / ID / FR / ES / DE / TR.
