# LuxDot Master Backlog

**Status:** Active canonical project register\
**Purpose:** Prevent ideas, fixes, research nodes, architectural
decisions, and deferred experiments from being lost across conversations
or versions.

## Status vocabulary

-   **PENDING** --- requested but not implemented
-   **IMPLEMENTED** --- implemented in a known build, verification still
    useful
-   **VERIFY** --- believed implemented; verify against latest build
-   **DEFERRED** --- deliberately not active yet
-   **RECOVERED** --- recovered from older LuxDot/Obsidian architecture
-   **CANONICAL** --- standing rule/decision

## Canonical build rules

-   **CANONICAL** Full clean replacement ZIP for major website releases.
-   **CANONICAL** Preserve Arabic Kufic typography where applicable.
-   **CANONICAL** Multilingual parity: new pages/nodes must not silently
    fall back to Arabic in other languages.
-   **CANONICAL** Personal-name forms that were declared fixed remain
    fixed and are not machine-translated.
-   **CANONICAL** SLS uses compositional cartouches; do not activate
    site-wide until explicitly requested.
-   **CANONICAL** Keep UI coherent and low-noise; use
    hierarchy/clustering rather than uncontrolled node accumulation.
-   **CANONICAL** Every major release reconciles this backlog against
    the actual build before items are marked verified.

## A. Obsidian / Vault → Web Knowledge Architecture

-   **RECOVERED** Treat Obsidian notes as source knowledge objects, not
    merely documents.
-   **PENDING** Map `Note → Node`, `Folder → Galaxy/Domain`,
    `Tags → Filters`, `Backlinks → Connections`,
    `Frontmatter → Metadata`, `Graph → Research Sky`,
    `dated notes → Timeline`, `attachments → Evidence`.
-   **PENDING** Introduce hierarchy:
    `Universe → Galaxy → Cluster → Node → Cartridge → Evidence`.
-   **PENDING** Permit one canonical node to appear in multiple clusters
    without duplication.
-   **PENDING** Add provenance/status metadata to research nodes: source
    type, evidence status, confidence, last update, version introduced,
    relationships.
-   **PENDING** Keep Biography Layer distinct from Research Evidence;
    use provenance types such as recollection, contemporaneous notebook,
    message, photo, official document, externally verified.
-   **PENDING** Reconcile the recovered 100-node Cognitive Map prototype
    with current Research Sky and retain useful concepts rather than
    rebuilding duplicates.

## B. Institutional architecture recovered from Vault

-   **RECOVERED** Foundation corpus: Manifesto, Mission, Vision, Values,
    Principles, Lexicon, First Guardian, Founding Entity, Who/Why
    LuxDot.
-   **RECOVERED** Constitutional corpus: Governance Charter, Governance
    Structure, Decision-Making, Financial Governance, IP, Succession,
    Appointment/Removal, Amendments, Constitutional Roles.
-   **PENDING** Expose appropriate public institutional material on the
    website without exposing private/internal material.
-   **PENDING** Convert Institutional Memory principle into an
    operational website/project rule.
-   **PENDING** Evaluate `Return on Mission (ROM)` /
    `Mission before Margin` as a project/research prioritization metric.

## C. Research architecture

-   **PENDING** Continue conversion from flat Research Sky into
    galaxies/clusters/planets/moons/asteroids where useful.
-   **PENDING** Create/maintain literary-intellectual clusters,
    including `الكلمة والشام`, while keeping Taha Hussein and Naguib
    Mahfouz in appropriate non-Sham clusters.
-   **PENDING** Add a critical comparison layer: textual similarity,
    difference, provenance, alternative explanation, falsifiability.
-   **PENDING** Preserve separation between historical fact,
    interpretation, personal symbolism, and hypothesis.

## D. Languages / i18n / books

-   **VERIFY** Hebrew language availability and full-page parity.
-   **VERIFY** Arabic pages use intended Kufic typography.
-   **VERIFY** Research pages translate completely rather than retaining
    Arabic body text.
-   **VERIFY** Religious books open the correct text and reader language
    is distinct from source/original language.
-   **VERIFY** Druze Wisdom Epistles appear as a proper library book,
    not only under an Islam/tradition branch.
-   **VERIFY** Language switcher/header/navigation remain consistent
    across pages.
-   **PENDING** Extend additional languages only through the robust
    shared i18n architecture, not page-by-page patches.

## E. UI / navigation / visualization

-   **VERIFY** Fixed header and stable word-based navigation.
-   **VERIFY** Forward/back floating navigation.
-   **VERIFY** Research Sky names/filters and alternative visualization
    modes.
-   **PENDING** Preserve `Universe / Sky / Chips-Circuits` as
    visualization concepts to reconcile with the current implementation.
-   **PENDING** Reduce visual congestion using semantic hierarchy and
    clustering.

## F. Savior / prophecy research

-   **VERIFY** Savior Atlas fixed name forms and non-translated name
    cartridges.
-   **PENDING** Keep affirmative and critical/falsification treatments
    separate and equally inspectable.
-   **PENDING** Claims should carry evidence/interpretation status and
    alternative explanations.

## G. Living Memory / Radio / Signal

-   **VERIFY** Living Memory multilingual parity and cartridge behavior.
-   **VERIFY** Radio identity and special-program architecture.
-   **VERIFY** Signal/media sections update correctly rather than
    leaving stale fixed content.
-   **PENDING** Maintain dated remembrance cartridges and
    evidence/source links.

## H. Projects / experimental systems

-   **DEFERRED** SLS site-wide activation.
-   **PENDING** Project cartridges for Cognitive Operating System,
    Lexicon, and SLS where not yet present.
-   **PENDING** Reconcile older Cognitive Map concepts with current
    project architecture.

## I. Legal / governance evidence

-   **PENDING** Unified Legal Binder with A1--A10 dividers/attachments.
-   **PENDING** Evidence chain including A3+A6 / Git / domain / version
    history.
-   **PENDING** Preserve document approval/version/provenance workflow.

## J. Release reconciliation protocol

For every major build: 1. Inventory actual build. 2. Compare against
this backlog. 3. Mark each touched item IMPLEMENTED or VERIFY. 4. Test
affected routes/languages. 5. Record version/build identifier. 6. Keep
unresolved items PENDING. 7. Never mark an item complete solely because
it was discussed.


## K. v4.16.1 current-build reconciliation
- **IMPLEMENTED** Existing information architecture: LIVE RESEARCH / SIGNAL / VALUES / PRAXIS / MEMORY / PULSE.
- **IMPLEMENTED** Existing research taxonomy and graph infrastructure.
- **VERIFY** Merge recovered Obsidian 100-node Cognitive Map into current graph without duplicating canonical nodes.
- **VERIFY** Content-level multilingual parity despite successful Arabic UI audit.
- **PENDING** Build machine-readable registry for current research nodes/routes and map them to the canonical hierarchy.
- **PENDING** Index historical changelogs/test reports into institutional memory rather than deleting them.
- **PENDING** Reconcile `VERSION.txt`, package naming, changelog lineage and release metadata on every future build.

## L. Commons / intellectual-property direction
- **PENDING REVIEW** Replace ownership-maximization posture with a commons/stewardship model.
- **DRAFTED** `docs/governance/LUXDOT_COMMONS_STEWARDSHIP_POLICY_DRAFT_v0_1.md`.
- **DRAFTED** `docs/governance/SOCIAL_RETURN_PLEDGE_DRAFT.md`.
- **PENDING LEGAL REVIEW** Candidate content license: CC BY-SA 4.0.
- **PENDING COMPATIBILITY/LEGAL REVIEW** Candidate software license: GNU AGPLv3.
- **CANONICAL INTENT** Attribution and provenance must be preserved.
- **CANONICAL INTENT** Open licensing does not authorize impersonation or false claims of official LuxDot provenance.
- **CANONICAL INTENT** LuxDot should not receive/custody donations; social-return funds should flow directly from benefactor to independent beneficiary/organization.
- **PENDING** Audit third-party assets before any blanket public license notice.
- **PENDING** Draft separate Identity/Trademark & Provenance Policy.

## M. IP / asset audit v4.16.4
- **IMPLEMENTED** Static audit of 715 repository files.
- **IMPLEMENTED** Machine-readable JSON and CSV audit registries.
- **IMPLEMENTED** Pre-activation licensing notice; no blanket license falsely applied.
- **DRAFTED** Identity & Provenance Policy.
- **PENDING MANUAL REVIEW** Resolve 116 media/binary assets requiring provenance.
- **PENDING MANUAL REVIEW** Review 194 text/code files with external references.
- **PENDING** Generate final THIRD_PARTY_NOTICES after provenance resolution.
- **PENDING** Dependency compatibility review before AGPL activation.

## N. Provenance / dependency pass v4.16.5
- **IMPLEMENTED** Fingerprinted and classified all 116 previously unresolved media/binary assets.
- **IMPLEMENTED** Media provenance registry CSV/JSON.
- **IMPLEMENTED** Dependency/CDN/library static scan.
- **IMPLEMENTED** Asset-rights JSON schema.
- **IMPLEMENTED** Working third-party notices registry.
- **PENDING EVIDENCE** Resolve creator/source/license/permission for unresolved media fingerprints.
- **PENDING** Confirm authorship/license of local source code before AGPL activation.
- **PENDING** Generate final THIRD_PARTY_NOTICES and scoped LICENSE files only after evidence resolution.
