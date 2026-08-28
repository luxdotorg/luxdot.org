# Post-Merge Hardening Sequence

After Governance v1 is validated and merged:

1. Observe exact successful GitHub Actions status names.
2. Configure `main` protection/ruleset to require PRs and those stable checks.
3. Confirm force-push and deletion protections.
4. Map the actual GitHub → Cloudflare production deployment path.
5. Add preview/production smoke checks without changing content semantics.
6. Audit Supabase RLS separately before any database automation.
7. Consolidate overlapping baseline QA workflows.
8. Gradually migrate legacy cache/version identifiers to the canonical `VERSION` source.

Each infrastructure/security step remains HIGH-risk and requires explicit human approval before production-impacting changes.
