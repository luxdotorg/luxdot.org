# LuxDot v4.3.0 — Language Integrity + Universal Header + Mobile Master
Date: 15 August 2026

## Language architecture
- English is the landing default on every fresh visit to `index.html`; a language changes only after the visitor explicitly selects it.
- Added one universal header shell for all internal pages. Pages that previously had partial/minimal headers now receive the same Home / Library / Memory / Research / Projects / Language navigation.
- Removed remaining `|| 'ar'` silent fallbacks from active research pages and moved language lookup to `LuxLang`.
- Added complete Javanese and Hebrew values for every `data-t` key used by the shared application UI.
- Added Javanese and Hebrew localization to the active library-shelf layer.
- Legacy dossiers that do not yet contain a full Javanese/Hebrew body no longer fall back to English, Indonesian or Arabic. They render a selected-language editorial research summary instead.
- Corrected Arabic text that had leaked into the English blocks of Urania–Nassau, Kevelaer–Chaam timeline and Hendrick Busman.
- Added a pre-render language guard so raw Arabic legacy HTML cannot flash before the selected-language renderer finishes.

## Arabic visual system
- Added a final global Arabic rule using Noto Kufi Arabic and loaded it from the universal compatibility stylesheet.
- Arabic layout is RTL and right-aligned; Latin/Hebrew/Greek source text can retain its original script where explicitly marked as source material.

## Mobile and platform layer
- Universal header becomes a two-row shell on tablet/mobile and a horizontally scrollable navigation strip on narrow screens, preventing clipped header items.
- Cards, research grids and two-column content collapse to one column on small screens.
- Drawers are capped to the viewport, tab/tool strips scroll horizontally, touch targets are at least 44px on coarse pointers.
- Safe-area support, dynamic viewport fallback, reduced-motion support, image/media max-width rules and iOS text-size adjustment retained.
- `backdrop-filter` includes the WebKit-prefixed form; layout does not depend on it for usability.

## Cache
- Site assets bumped to v430 so GitHub Pages/browser caches do not reuse the previous language scripts.
