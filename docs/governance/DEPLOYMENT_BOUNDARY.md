# Deployment Boundary

Governance v1 does not alter deployment configuration.

Cloudflare, DNS and any production deployment trigger are treated as HIGH-risk until the actual production path is independently mapped and tested. Repository changes that merely add documentation or non-deployment QA must not be assumed to modify production infrastructure.

Before automating deployment decisions, document:
- which service deploys `main`;
- whether preview deployments exist for pull requests;
- what health check confirms a successful deployment;
- the rollback mechanism;
- who/what can bypass production protections.
