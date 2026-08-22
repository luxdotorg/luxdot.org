# v4.3.73 targeted repair QA

Base verified: copied from v4.3.71 before edits.

## Scope only
- projects.html: Circle of Care local direct-route handler only
- research/circle-of-care-25km-original.html: Leaflet map container restored + Leaflet CDN refs
- research/circle-of-care-live-map.js: known-good multi-pin renderer restored, query-language aware
- reiderland-live.html / reiderland-i18n.js: native clickable map anchor + map always visible
- language-core.js unchanged from v4.3.71

## Static checks
- 70/70 care data points contain lat/lon
- Reiderland map is injected as a section with native anchor #reider-map-launch
- Circle of Care map target is a DIV (required by Leaflet), not an iframe
- No v4.3.72 global router changes are present
