# LuxDot Development Autonomy Policy

This document defines what routine repository work may proceed without a separate production approval and what must stop for human approval.

## May proceed through normal PR workflow
LOW-risk work may be prepared, checked, reviewed and merged when repository policy and required checks permit it.

## Requires deliberate review
MEDIUM-risk work may be implemented autonomously on a branch, but its diff and checks must be reviewed before production merge.

## Must stop before production merge
HIGH-risk work may be researched and prepared on a branch, but production merge requires explicit human approval. This includes authentication, database authorization/schema, DNS, Cloudflare/deployment configuration, secrets, destructive bulk operations and major architecture changes.

## Never do silently
- Force-push `main`.
- Commit private credentials.
- Disable safety/QA controls merely to make a check pass.
- Convert a hypothesis, symbolic association or coincidence into a documented fact.
- Delete substantial research/history solely for repository tidiness.

## Principle
Automation should reduce repetitive work while preserving auditability, reversibility, factual discipline and human control over consequential changes.
