# LuxDot v4.2.0 — Final Language & Platform QA

## Coverage
- HTML pages checked: 57
- Canonical language core loaded: 57/57
- Responsive viewport metadata: 57/57
- Broken local href/src references: 0
- JavaScript syntax failures: 0
- Static default markup: English / LTR on 57/57 pages

## Language-state tests
- Fresh profile / no explicit choice → English
- Legacy `luxdot.lang=he` without explicit-choice marker → English
- Explicit Dutch selection → Dutch persists across pages
- Explicit Arabic/Hebrew → RTL
- English/Dutch/Javanese → LTR
- Non-Arabic legacy locale fallback never defaults to Arabic

## Cache protection
All local JS/CSS references are cache-busted to v420 so GitHub Pages and browsers do not reuse the previous language scripts.

## Responsive/cross-platform hardening
- `viewport-fit=cover` on every page
- safe-area handling for iOS-style notches
- responsive header/navigation wrapping
- 44px coarse-pointer/touch targets
- 2-column → 1-column card collapse on smaller screens
- responsive drawers and research panels
- horizontal scrolling for wide toolbars/tables instead of page overflow
- images/SVG/video/canvas constrained to viewport
- reduced-motion preference respected
- `100dvh` fallback behavior added

## Render limitation
Automated Chromium is installed, but this environment blocks browser navigation to both localhost and file URLs by administrator policy. Therefore pixel-level screenshots in Chrome/Safari/Firefox emulation could not be executed here. Structural HTML/CSS, JavaScript syntax, link resolution, language-state logic, viewport coverage and responsive rules were tested directly.
