# LuxDot v4.18.53 — Arabic Surface Cleanup

- Started a repository-wide Arabic translation leakage campaign.
- Added `tools/arabic_surface_audit.py` to identify likely English UI/prose leaking into Arabic surfaces while conservatively excluding names, URLs, code, and language names.
- Added the Arabic audit report to CI artifacts so future cleanup can be measured instead of handled ad hoc.
- Expanded the shared Arabic language-polish dictionary for recurring UI labels across home, research, media, audiovisual, calendar, evidence, witness, and archive surfaces.
- Cleaned Arabic-only status and hypothesis labels on `luxdot-hypotheses.html`, while preserving proper names such as LuxDot, USS Eldridge, and Nikola Tesla.
- This campaign treats names of people, places, works, institutions, scientific notation, and source titles separately from genuine untranslated interface/prose.
