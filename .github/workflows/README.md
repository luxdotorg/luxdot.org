# LuxDot Workflows

- `luxdot-qa-v2.yml` is the baseline static sanity gate.
- `security-guard.yml` is the focused private-credential gate.
- `luxdot-qa.yml` is the initial comprehensive baseline and may be consolidated after the first governance PR demonstrates which checks are stable on the legacy repository.

Workflow changes are governance changes and should be reviewed as MEDIUM or HIGH risk depending on whether they alter production/deployment behavior.
