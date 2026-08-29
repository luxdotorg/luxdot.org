# Nabd Nuqtat Noor 2.0.0

Standalone living pulse surface for LuxDot.

## Included
- Arabic-first standalone `nabd.html`.
- Living pulse visual with reduced-motion support.
- Chaam/Netherlands live clock and date.
- Central typed feed at `data/pulse-feed.json`.
- Time ranges: now, today, week, archive.
- Filters for research, memory, world, hypotheses, coincidences and safety.
- Seven pulse circles: radio, research, human, memory, world, nature, learning.
- Explicit epistemic labels separating documented material, research, hypotheses and symbolic/coincidence readings.
- Radio status/entry surface ready for deeper live-state integration.
- Header pulse activation: legacy pulse control now navigates to Nabd 2.0; a pulse entry is created when none exists.
- Home card injection on pages using the stabilized LuxDot header layer.
- Keyboard focus, skip link, semantic regions and `prefers-reduced-motion` support.
- Independent Nabd versioning (`2.0.0`) so the pulse is not tied to stale LuxDot UI version badges.

## Feed contract
Each item has an id, timestamp, range, type, circle, evidence/status label, title, summary and optional URL. New LuxDot modules can publish into this contract without redesigning the pulse UI.

## Next integrations
The architecture intentionally leaves adapters for actual radio now-playing state, automated project/research events and curated external-world sources. External material must carry source provenance before it is promoted as documented content.