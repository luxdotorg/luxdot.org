# LuxDot Arabic Master Policy

## Canonical editorial language

Arabic is the canonical editorial source for LuxDot pages. The meaning, structure, caveats, evidence labels and calls to action are authored and maintained first in Arabic. Other language surfaces are translations of that Arabic master.

This policy applies to editorial/static content. Proper names, source titles, quotations that must remain in an original language, archival inscriptions, code identifiers and externally licensed text may remain in their original language where appropriate.

## Rules for migrated pages

1. A page must have a complete Arabic master surface; `?lang=ar` must never depend on translating hard-coded English prose at runtime.
2. English, Dutch and other locales may be rendered from locale dictionaries/overlays, but they must map to the Arabic master structure rather than silently becoming the canonical source.
3. A missing translation falls back to Arabic, not English.
4. RTL/LTR direction follows the active locale. Arabic uses LuxDot's Arabic typography rules.
5. Translation must preserve uncertainty labels, source distinctions, counter-evidence and methodological caveats; localization must not strengthen claims.
6. New editorial pages should not be introduced as English-origin pages.
7. Migration must preserve existing content. Do not shorten or replace a substantive page merely to make it bilingual.
8. Child-facing editorial surfaces, including `kids-galaxy.html`, follow the same Arabic-master rule while keeping language simple, age-appropriate and free of mixed-language UI except for proper names or intentionally bilingual branding.

## Migration order

Priority is given to public-facing identity, method and navigation hubs, then research/memory/library hubs, then individual dossiers. `tools/arabic_master_audit.py` inventories static HTML and identifies pages whose visible source text is still Latin/English dominant.

## Definition of done for a page

A migrated page has a complete Arabic master, Arabic is the fallback locale, all visible controls and internal links respect the active locale, non-Arabic versions are explicit translations, and the page passes LuxDot static QA/site-health checks.
