# QA — v4.3.71 Map Reliability

## Static checks
- Reiderland local map asset: assets/reiderland-map-1842.jpg (2602×2147 JPEG).
- Reiderland AR/EN/NL templates reference the local historical map.
- Reiderland map opener is native `<details><summary>` and therefore click/open does not depend on JS listeners.
- Reiderland map iframe is present with OpenStreetMap embed URL.
- Projects AR/EN/NL Circle of Care links point to existing `research/circle-of-care-25km-original.html` and include language query.
- Circle of Care has no Leaflet CDN dependency.
- Circle of Care uses local `data/care-points.js` and local dependency-free `circle-of-care-live-map.js`.
- JavaScript syntax checks pass for repaired scripts.

## Note
External map tiles/embeds still require normal internet access in the visitor browser, but the page, map cartridge, navigation, historical image and interaction logic no longer depend on third-party JS libraries.
