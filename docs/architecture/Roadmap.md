# LuxDot Architecture & Recovery Roadmap

## Phase 1 --- Preserve

-   Keep the uploaded Vault unchanged as historical source.
-   Maintain `LUXDOT_MASTER_BACKLOG.md`.
-   Maintain `DOCUMENT_REGISTRY.md`.
-   Do not delete or overwrite recovered institutional documents during
    migration.

## Phase 2 --- Inventory current website

When the latest website ZIP is supplied: - enumerate
routes/pages/assets/data stores - inventory research nodes and
clusters - inventory languages and translation coverage - inventory
books, radio, Living Memory, Savior Atlas, Signal/media, projects -
identify dead routes, duplicate concepts, stale content, and
local-vs-deployed differences

## Phase 3 --- Reconcile

For each recovered Vault concept and backlog item assign: - KEEP -
MERGE - MIGRATE - UPGRADE - ARCHIVE - MISSING - ALREADY IMPLEMENTED -
VERIFY

## Phase 4 --- Knowledge model

Implement canonical node metadata and typed relationships. Separate
data/model from visualization so Research Sky, Universe, timeline, maps,
and future chip/circuit views can use the same source objects.

## Phase 5 --- i18n hardening

Move translation behavior to a shared architecture. Add automated checks
for untranslated Arabic leakage, missing Hebrew, broken book-language
behavior, and inconsistent headers.

## Phase 6 --- Research quality

Add evidence/provenance states and a
falsification/alternative-explanation layer for claims and symbolic
correlations.

## Phase 7 --- Release discipline

Every full replacement build includes: - updated Master Backlog -
updated Document Registry - architecture notes - version/changelog - QA
results - unresolved known issues
