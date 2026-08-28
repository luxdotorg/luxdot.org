# Production Merge Checklist

Before merging to `main`:

1. Confirm the PR scope and risk class.
2. Confirm required automated checks passed.
3. Review the changed-file diff.
4. Confirm no private credentials are introduced.
5. For research/content, verify source quality and epistemic labeling.
6. For UI/behavior changes, verify affected navigation and primary user path.
7. For HIGH-risk changes, obtain explicit human approval.
8. Confirm a practical rollback path exists.
9. After deployment, verify the production entry page and affected feature.

If production verification fails, prefer a normal Git revert/rollback over rewriting branch history.
