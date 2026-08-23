# LuxDot v4.3.29 — clean language rollback/fix
- Built from the complete v4.3.28 package.
- Removed `localizedLegacy()` behavior that deleted the original page and generated substitute language-summary pages.
- Removed `languageSafety()` behavior that replaced original page content with a language-safe placeholder.
- `language-core.js` is now the single owner of language selection and same-page navigation.
- Selecting a language reloads the exact same pathname with `?lang=<code>`; no redirect to a different dossier/page.
- Existing page-native translation systems (`data-locale`, `data-t`, page-specific i18n JS) remain intact and own page content.
- `five-lang-site.js` is retained only as a no-op compatibility shim to prevent duplicate language rewrites.
- Removed research-graph forced language reload listeners.
- Site shell now rebuilds only the header; it never removes/replaces `<main>` or `.hero` content.
