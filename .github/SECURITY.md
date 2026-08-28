# Security Policy

Do not publish private credentials in issues, pull requests, commits, research records or website content.

Security-sensitive changes involving authentication, database authorization, DNS, deployment configuration or secret handling are HIGH-risk under `GOVERNANCE.md` and require explicit human approval before production merge.

If a private credential is accidentally committed, treat it as exposed: revoke or rotate it at the provider and remove its use from the project. Git history cleanup alone is not credential rotation.
