# LuxDot v4.18.18 — Continuous Live Radio

- Reworked the radio as a wall-clock live station instead of a per-page playlist.
- Every page tunes to the same track and position for the current Chaam/Damascus program block.
- Quick page navigation resumes the exact track position from persisted state instead of restarting at 0:00.
- Added radio runtime to all HTML pages, including nested prophet/transformer pages.
- Local audio asset paths are now root-safe on nested pages.
- Removed the spoken Andalusian archive clip from normal broadcast rotation.
- Added public-domain Samai/Maqam/Hijaz/Sika material from Wikimedia Commons to reduce repetition.
- Added available local memory tracks to daytime rotation.
- Failed remote sources are skipped for the session instead of dropping into an endless fallback loop.
- After Gong Ageng station IDs or adhan, the player rejoins the current live position rather than resuming stale audio.
- Saved playback state on pagehide/visibility changes and every few seconds.
