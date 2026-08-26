# LuxDot v4.18.23

Date: 2026-08-24
Release: FULL REPLACE

## Changes
- Expanded `brabant-sacred-memory-atlas.html` with nine narrative-transformation trees: Alphen fever tree, Ulicoten Bernardus, Baarle Loreto, Nijhoven Sint-Salvator, Chaam–Werbeek Our Lady of the Snows, Minderhout O.L.V. van den Akker, Alphen Willibrord well, Gilze Verhoven wartime chapel, and Meersel-Dreef foundation legend.
- Each tree separates documented chronology from later folklore and explicitly marks the mutation point in the story.
- Replaced the ten landing-page language buttons with a dedicated dropdown selector so language selection is visually and functionally distinct from the Receive the Signal action.
- Updated `intro.js` to persist and react to dropdown language changes.
- Fixed stale public version display: `build-meta.json` had remained at `4.18.19b`; it now reports `4.18.23`.
- Cache-busted all `live-development.js` references to `v=41823` so clients do not reuse an old status script.
