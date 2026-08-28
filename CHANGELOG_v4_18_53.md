# LuxDot v4.18.53 — Multilingual Surface Cleanup

- Expanded the translation cleanup campaign from Arabic to every supported LuxDot locale: Arabic, English, Dutch, Hebrew, Javanese, Indonesian, French, Spanish, German, and Turkish.
- Added `tools/multilingual_surface_audit.py` to measure likely cross-language leakage and per-language page coverage.
- CI now generates a multilingual translation/parity report on every branch/PR run.
- The audit remains deliberately report-only: it does not auto-translate research prose or overwrite names, places, works, institutions, source titles, or technical notation.
- Expanded the shared Arabic UI dictionary for recurring labels across home, research, media, audiovisual, calendar, evidence, witness, and archive surfaces.
- Cleaned confirmed Arabic-only status and hypothesis labels on `luxdot-hypotheses.html` while preserving proper names such as LuxDot, USS Eldridge, and Nikola Tesla.
- Subsequent cleanup batches can now be prioritized by locale and by pages with the highest detected leakage rather than by manual discovery.
