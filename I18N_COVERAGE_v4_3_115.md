# LuxDot i18n Coverage · v4.3.115

Pages audited: 144

| Language | Native pages | Auto-fallback pages |
|---|---:|---:|
| ar | 98 | 46 |
| en | 100 | 44 |
| nl | 100 | 44 |
| he | 72 | 72 |
| jv | 72 | 72 |
| id | 59 | 85 |
| fr | 47 | 97 |
| es | 47 | 97 |
| de | 47 | 97 |
| tr | 47 | 97 |

## Architecture

- `language-core.js`: language state, direction, navigation and URL carry-through.
- `app.js` / page i18n scripts: curated/native translations.
- `content-language-core.js`: detects missing native coverage and activates whole-page translation fallback for any of the ten languages.
- `data/i18n-coverage.json`: page-by-page native/fallback manifest.
- Protected names and LuxDot branding are marked `translate=no` before fallback translation.

## Translation policy

Native translations always win. Automatic full-page fallback runs only when the requested language is absent from that page’s native coverage. This prevents the old failure mode where only the header changed while the body remained Arabic or English.

Automatic fallback is a continuity layer; human-reviewed locale packs can replace it page by page without changing the architecture.