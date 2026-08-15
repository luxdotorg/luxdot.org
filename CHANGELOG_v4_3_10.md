# LuxDot v4.3.10

- Fixed entry-gate Arabic routing: after choosing Arabic, the signal now opens the canonical `home.html` and relies on the already-persisted language state instead of a query-string route.
- Entry gate now restores an explicitly saved language instead of hard-resetting visually to English on load.
- Forced the native Arabic language label `العربية` to use Noto Kufi Arabic on the entry gate even before the document language switches to Arabic.
- No research structure changes.
