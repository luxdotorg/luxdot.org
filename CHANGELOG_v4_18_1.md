# LuxDot v4.18.1 — Radio/TV audio hotfix

- Added a 3-minute original local LuxDot audio fallback (`assets/audio/system/point-of-light-fallback.wav`).
- Removed anonymous CORS mode from HTMLAudioElement; it was unnecessary for playback and could make redirected media fail.
- Radio explicitly sets `muted=false` and `volume=1`.
- Any failed or stalled remote source falls back to the local source instead of rotating through the playlist.
- A failed local source stops and reports an error instead of creating a loop.
- Updated all HTML radio script URLs to `luxdot-radio.js?v=4181` to invalidate browser cache. Replaced 156 old radio cache references.
- Updated TV script URLs to `luxdot-tv.js?v=4181`. Replaced 1 old TV cache references.
- TV minimum scene duration increased to 60 seconds; still images to 90 seconds.
- TV synchronization now keys only on the actual radio track, reducing visual churn.
