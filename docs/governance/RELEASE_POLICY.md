# LuxDot Release & Rollback Policy

## Canonical version
`VERSION` is the canonical human-readable release identifier. Existing asset query-string versions remain legacy cache identifiers until migrated deliberately; they are not the canonical release number.

## Release sequence
1. Sync feature branch from current `main` when needed.
2. Classify risk.
3. Make scoped changes.
4. Run LuxDot QA.
5. Review the pull-request diff.
6. Obtain explicit approval for HIGH-risk changes.
7. Merge to `main`.
8. Verify production after deployment.

## Rollback
Prefer reverting the merge commit or restoring the last known-good Git reference. Do not rewrite `main` history except for a documented emergency where normal revert cannot restore service.

## Infrastructure boundary
DNS, Cloudflare, database authorization/policies and credentials are HIGH-risk. Repository automation must not silently modify them.
