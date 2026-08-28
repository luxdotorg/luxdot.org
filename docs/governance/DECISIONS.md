# Governance Decisions

## GD-001 — Production is PR-first
Routine changes reach `main` through pull requests rather than direct edits.

## GD-002 — Risk controls scale with consequence
LOW, MEDIUM and HIGH risk classes determine the review/approval boundary.

## GD-003 — Static-first QA
The baseline uses lightweight checks compatible with the existing static HTML/CSS/JavaScript architecture before introducing heavier build tooling.

## GD-004 — One canonical human release version
`VERSION` becomes the canonical human-readable release identifier. Legacy cache-busting query versions are migrated separately to avoid breaking production behavior.

## GD-005 — Epistemic labels are governance
Research publishing distinguishes documented fact, tradition, symbolic interpretation and hypothesis/speculation. This is treated as a content-quality control, not merely editorial style.
