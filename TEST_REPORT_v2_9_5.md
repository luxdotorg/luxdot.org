# LuxDot v2.9.5 QA

- JavaScript syntax: PASS for all .js files via `node --check`
- Local href/src dependency scan: PASS, 0 missing local files
- HTML parse scan: PASS across 51 HTML files
- Cache-bust for active Arabic UI references: v=295
- Quran opening audio delay: 3 seconds
- Tanakh opening audio delay: 3 seconds
- New Testament opening audio delay: 3 seconds
- Source-reader explanation auto-start: 3 seconds where browser TTS is available
- Book shelf navigation transition: 2 seconds, one click
- Memory dialog stacking: z-index 20000, above Leaflet map panes
- Circle of Care: Leaflet map + OSM tiles + category-specific colored pin generation
- Circle of Care: Arabic category map + official original institution name retained
- Shared-library covers: Open Library real-cover URLs with local fallback

## Browser QA limitation
Automated pixel-perfect Chromium rendering is not claimed in this build environment. The package has structural/syntax QA and should be checked once after deployment on desktop Chrome and mobile for final visual spacing.
