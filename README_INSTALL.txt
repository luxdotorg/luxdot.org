VERSION HOTFIX — v4.18.30

Root cause:
The live badge reads /build-meta.json. Main already contains the v4.18.30 code,
but build-meta.json was still declaring 4.18.28.

Replace ONLY:
- build-meta.json

After push/deploy the existing live-development.js fetches build-meta.json with cache:no-store,
so the badge should update to LuxDot · v4.18.30 automatically.
