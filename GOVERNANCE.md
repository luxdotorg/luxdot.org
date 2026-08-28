# LuxDot Repository Governance v1

Status: Active after merge to `main`.

## Purpose
LuxDot uses a protected, reviewable development flow so that research and content can evolve quickly without putting the production site at unnecessary risk.

## Branch model
- `main` — production branch. Do not use for routine direct edits.
- `luxdot/content-*` — text, translations, calendar and research content.
- `luxdot/fix-*` — bug fixes.
- `luxdot/feature-*` — new pages, UI and behavior.
- `luxdot/research-*` — structured research additions.
- `luxdot/governance-*` — repository, CI and release engineering.

Normal flow: branch → QA → pull request → review/checks → merge → deployment.

## Risk classes
### LOW
Text corrections, translations, sourced research records, metadata, non-functional documentation.
May be merged after automated checks pass and the diff is reviewed.

### MEDIUM
CSS, navigation, JavaScript behavior, new pages, shared language logic, calendar code.
Requires a pull request, automated checks, and explicit diff review before merge.

### HIGH
Authentication, Supabase policies/schema, DNS, Cloudflare/deployment configuration, destructive file moves/deletions, security controls, or major architecture changes.
Requires explicit human approval before production merge.

## Evidence discipline
Research content must distinguish:
1. documented/verifiable fact;
2. religious or cultural tradition;
3. symbolic resemblance/interpretation;
4. hypothesis or speculation.

Coincidence or calendrical synchrony is not evidence of supernatural causation or a person's special status.

## Security
- Never commit passwords, private keys, access tokens, service-role keys, recovery codes, or credentials.
- Browser-exposed publishable/anonymous client keys are not treated as secrets; server-side authorization must rely on appropriate access controls such as Supabase RLS.
- High-risk security or infrastructure changes require human approval.

## Releases
- Use one canonical release identifier for future releases.
- Major structural releases should have a recoverable Git reference/tag or equivalent backup before production changes.
- Avoid force-pushing `main`.
- Prefer small, auditable commits and pull requests.

## Merge policy
Automated checks are a minimum gate, not proof that a change is correct. Content accuracy and research claims require source review; functional changes require diff review; HIGH-risk changes require explicit approval.
