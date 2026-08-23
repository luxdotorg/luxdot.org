# LuxDot v4.3.99 — Language Core Repair

## Fixed
- Hebrew is now visible on the landing page (`עברית`).
- `he` is enabled in the global language core and hard-coded three-language gates were removed from the main top-level files.
- All top-level HTML files load the same language core and the same global language typography lock.
- Arabic typography is forced to `Noto Kufi Arabic` for the Arabic document and for Arabic locale blocks even when embedded in another language page.
- Hebrew is RTL and uses a separate Hebrew font stack; it no longer inherits Arabic/Kufi typography.
- The legacy `page-translations.js` behavior that deliberately forced Arabic source text when EN/NL was requested has been removed.
- All 78 Research Sky pages load the Hebrew research overlay; the research graph already contains Hebrew node labels/descriptions for many nodes.
- Where a page still lacks a dedicated Hebrew body, Hebrew no longer silently falls back to Arabic. The safe fallback is English plus the Hebrew research title/summary.

## Remaining translation debt
Twelve Research Sky pages still lack a dedicated full Hebrew `data-locale="he"` body and currently use the safe English-body fallback under Hebrew. They are:
- border-chapels-route.html
- burial-settlement-layers.html
- chaam-midwives.html
- hendrick-busman.html
- hoogstraten.html
- java-script.html
- kevelaer-chaam-timeline.html
- pet-goat-apocalypse-media.html
- ter-brake-cadastral-investigation.html
- urania-nassau.html
- war-reconstruction-memory.html
- willibrord-echternach.html

This build fixes the structural language bugs and Arabic typography bug. It should not yet be described as 100% Hebrew-complete until those twelve long-form bodies are translated.
