# LuxDot v4.18.48 — Stability Foundation

Phase A establishes a measurable static-site health baseline without changing research conclusions or editorial claims.

## Changes

- Added `tools/site_health.py`, a repository-wide static audit for HTML structure, duplicate IDs, local references, metadata, language signals, image alternatives, and basic control-label signals.
- Added the site-health audit to protected GitHub QA and retained its report as a CI artifact.
- Conservatively repaired 500 HTML documents across the repository.
- Repaired missing page titles, missing HTML language attributes, missing meta descriptions, duplicate IDs, and markup placed between `</head>` and `<body>` where detected.
- Removed the generated repair report from source control; reports now belong to CI artifacts.
- Established a clean blocking baseline of **0 errors and 0 warnings** across 541 HTML pages.
- Changed CI enforcement so any future site-health warning or error blocks the pull request.

## Scope

This release is an infrastructure and document-health pass. It does **not** validate historical, religious, scientific, geographical, symbolic, or other research conclusions, and it intentionally avoids rewriting research prose.

Informational accessibility signals remain non-blocking and will be handled in subsequent focused accessibility work rather than through unsafe bulk content edits.
