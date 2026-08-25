LuxDot LIVE incremental patch — Kalki / 25 Aug 2026

BASE
- Checked against current GitHub main on 25 Aug 2026.
- Current main commit checked: 96273a4a61127d9d789dd62c3e7d97f4aaf974f8
- The live code is newer than the earlier v4.3.118 package; this patch does NOT replace the site.

WHAT IT CHANGES
- calendar.html only, in-place.
- Adds the 25 Aug Kalki research/calendar card.
- Preserves all existing live calendar content.
- Idempotent: running twice will not duplicate the card.

HOW TO APPLY
1. Put APPLY_KALKI_UPDATE.py in the repository root (same folder as calendar.html).
2. Run: python APPLY_KALKI_UPDATE.py
3. GitHub Desktop will show calendar.html as the only site file changed.
4. Review the diff, commit, and push main.

Do not upload an older full-replace ZIP for this patch.
