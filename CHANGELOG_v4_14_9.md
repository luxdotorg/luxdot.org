# LuxDot v4.14.9 — Live Deployment Version Fix

- `live-development.js` now reads both deployed `/build-meta.json` and repository `main/build-meta.json`.
- It compares semantic versions and displays the newest known version.
- If production is older than `main`, it displays a visible deployment/cache warning.
- Added Cloudflare Pages `_headers` rules to prevent stale caching of critical status files.
- Added `deploy-marker.json` for simple production-vs-main verification.
- FULL_REPLACE package preserving the complete site.
