# Required `main` Protection

Repository settings should enforce the following on `main` after Governance v1 is merged and the checks have produced stable status names:

- require a pull request before merging;
- require successful LuxDot QA/status checks;
- block force pushes;
- block branch deletion;
- keep administrator bypass limited to documented emergencies;
- require conversation resolution when review threads exist.

Branch protection is a GitHub repository setting, not merely a file in this repository. This document records the intended policy so the configured rules can be audited against it.
