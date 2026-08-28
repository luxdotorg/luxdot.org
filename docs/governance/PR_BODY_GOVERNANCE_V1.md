# Governance v1 PR Summary

Risk: MEDIUM (repository process/CI; no production site content or runtime code changed).

## Adds
- repository governance and contribution policy;
- safe autonomy boundary;
- release/rollback and production checklist;
- canonical `VERSION` source;
- pull-request risk template and ownership baseline;
- static QA and credential guard workflows;
- GitHub Actions dependency maintenance;
- intended `main` branch-protection policy.

## Does not change
- production HTML/CSS/JavaScript behavior;
- Cloudflare configuration;
- DNS;
- Supabase schema/RLS/authentication;
- existing research/content.

## Rollback
Close without merge, or revert the governance merge if it is later merged.
