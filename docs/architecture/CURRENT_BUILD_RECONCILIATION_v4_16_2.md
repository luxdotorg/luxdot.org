# LuxDot v4.16.2 --- Architecture Reconciliation Baseline

## Source build

User-supplied full replacement package:
`LuxDot_v4_16_1_NOQTAT_NOUR_ARABIC_PULSE_CALENDARS_RADIO_SKY_FULL_REPLACE.zip`

## Purpose

This release does **not** blindly redesign the live site. It establishes
the durable project-memory and architecture layer first, so later
migrations can be tested against the actual site instead of
reconstructed from chat history.

## Current-build inventory

-   Files inspected: **708**
-   HTML/research HTML surfaces sampled: **182**
-   Existing top-level architecture note:
    `LUXDOT_INFORMATION_ARCHITECTURE_v4_4_1.md`
-   Existing Arabic audit: `ARABIC_SURFACE_AUDIT_v4_16_1.md`
-   Existing research taxonomy: `data/research-taxonomy.json`
-   Existing research manifest: `research-manifest.json`

### File types

-   `.md`: 243
-   `.html`: 197
-   `.js`: 69
-   `.css`: 44
-   `.jpg`: 30
-   `.svg`: 26
-   `.json`: 24
-   `.png`: 21
-   `.webp`: 19
-   `.wav`: 13
-   `.txt`: 11
-   `.mp3`: 6
-   `.py`: 2
-   `[no extension]`: 2
-   `.jpeg`: 1

### Feature presence

-   YES --- Research Sky
-   YES --- Savior Atlas
-   YES --- Living Memory
-   YES --- Radio
-   YES --- Library
-   YES --- Projects
-   YES --- Timeline
-   YES --- World Calendar
-   YES --- Signal data
-   YES --- Research taxonomy

### Language-signature scan

This is a presence scan, not proof of complete translation: - `ar`
signatures found on 172 sampled HTML surfaces - `en` signatures found on
129 sampled HTML surfaces - `nl` signatures found on 115 sampled HTML
surfaces - `jv` signatures found on 92 sampled HTML surfaces - `he`
signatures found on 94 sampled HTML surfaces

## Important reconciliation findings

1.  The uploaded package name says **v4.16.1**, while its pre-existing
    `VERSION.txt` still said **4.13.0**. This baseline corrects the
    internal version marker to **4.16.2**.
2.  The current website already contains a meaningful information
    architecture (`LIVE RESEARCH`, `SIGNAL`, `VALUES`, `PRAXIS`,
    `MEMORY`, `PULSE`). The recovered Obsidian architecture should
    therefore be **merged**, not substituted wholesale.
3.  The current build already has research taxonomy and graph
    infrastructure. The Obsidian mapping should extend these with stable
    metadata/provenance rather than create a second graph system.
4.  The current build contains extensive historical changelogs/test
    reports. They are retained intact and should be indexed, not
    discarded.
5.  Translation presence is broad, but presence alone does not prove
    parity. Existing Arabic audit reports zero likely untranslated UI
    headings; content-level multilingual QA remains a VERIFY item.
6.  SLS remains deliberately deferred from site-wide activation.
7.  Biography/personal-history evidence must remain a separate
    provenance layer from historical/religious research claims.

## Files added by this baseline

-   `/LUXDOT_MASTER_BACKLOG.md`
-   `/DOCUMENT_REGISTRY.md`
-   `/docs/architecture/Architecture.md`
-   `/docs/architecture/Roadmap.md`
-   `/docs/architecture/CURRENT_BUILD_RECONCILIATION_v4_16_2.md`
-   `/CHANGELOG_v4_16_2.md`

## Next implementation gate

Before structural UI changes: 1. Parse current research graph/manifest
into an inventory. 2. Compare recovered Obsidian concepts against
existing canonical nodes. 3. Assign KEEP / MERGE / MIGRATE / UPGRADE /
ARCHIVE / MISSING / ALREADY IMPLEMENTED / VERIFY. 4. Only then modify
visible navigation/Research Sky.
