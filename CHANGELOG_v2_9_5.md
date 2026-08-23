# LuxDot v2.9.5 — Arabic Master Polish Round

Built on v2.9.4. No research expansion. This release applies the consolidated Arabic UX/visual QA notes.

## Implemented
1. Home phrase “إنسانية واحدة • تقاليد متعددة” kept on one line where viewport permits.
2. Home cartouches use semantic line-art SVG symbols instead of photographic thumbnails.
3. All book readers use a clear close-book action; automatic audio/explanation starts after 3 seconds where available; closing stops audio. Tanakh/New Testament/readers receive high-contrast reading surfaces.
4. “استمع إلى الشرح” logic hardened for source readers with start/stop state and TTS fallback.
5. Arabic header/navigation normalized across pages with the complete primary section list.
6. Sacred shelf books use one-click, ~2-second extraction/opening transition before reader navigation.
7. Existing Arabic naming conventions preserved, including سلوك جاوة and current سيرات usage.
8. Ten shared-library books now request real Open Library edition covers, with local fallback images when a cover is unavailable or cannot load.
9. Faith/Wisdom forest receives content-specific tradition symbols with reserved icon space to prevent text overlap.
10. Memory dossier images now use contain-style presentation to avoid destructive cropping.
11. Memory map event dialog is forced above the map stack and animates in front of the map.
12. Living Research cartouches receive research-specific semantic SVG symbols.
13. Projects cartouches receive project-specific semantic SVG symbols.
14. Circle of Care categories are Arabic; cards show an Arabic/transliterated display name plus the official Dutch/original name.
15. Circle of Care now uses a real Leaflet/OpenStreetMap geographic base map with a distinct deterministic pin color for every exact category, plus Arabic category labels and a legend.

## Deployment note
Leaflet/OpenStreetMap tiles and real Open Library cover images are network resources. Local content/fallbacks remain available if these services fail, but the real geographic tiles/covers require internet access in the visitor browser.
