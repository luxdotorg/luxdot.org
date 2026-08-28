# Contributing to LuxDot

## Development workflow
1. Start from current `main`.
2. Create a narrowly scoped `luxdot/*` branch.
3. Make the smallest coherent change.
4. Run repository QA.
5. Open a pull request describing scope, risk, verification and rollback.
6. Merge only when required checks and review conditions are satisfied.

## Commit convention
Use concise prefixes:
- `content:` research/text/calendar
- `fix:` bug correction
- `feat:` feature
- `i18n:` language/translation
- `ui:` visual/interface
- `governance:` CI/repository policy
- `security:` security hardening
- `release:` release/version work

## Pull request checklist
- [ ] Scope is narrow and described.
- [ ] Risk is LOW, MEDIUM or HIGH.
- [ ] No credentials or private secrets are introduced.
- [ ] HTML/JavaScript/basic repository QA passes.
- [ ] Links and navigation affected by the change were checked.
- [ ] Research claims separate fact, tradition, symbolism and hypothesis.
- [ ] Rollback is possible.
- [ ] HIGH-risk changes have explicit human approval before production merge.

## Production rule
Routine work should not be committed directly to `main`. Force-pushes to `main` are prohibited by project policy even if an account technically has permission.
