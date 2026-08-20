# LuxDot v4.3.77 QA report

## Package integrity
- HTML pages scanned: 119
- Local HTML/CSS/JS/image references scanned: 1860
- Missing local targets: 0
- JavaScript files syntax-checked with Node: 41
- JavaScript syntax failures: 0

## Target route checks
HTTP 200 was confirmed locally for AR / EN / NL query routes for:
- `memory.html`
- `research.html`
- `reiderland-live.html`
- `savior-atlas.html`
- `savior-deepening.html`
- `guardian-benefactor.html`
- `kees-van-wanrooij.html`
- `number-letter-lab.html`

## Memory / Research cards
- Living Memory dataset: 18 nodes.
- English effective translation coverage: 18/18 nodes.
- Dutch effective translation coverage: 18/18 nodes (page I18N and/or Dutch fallback).
- Memory full-dossier links now carry the active language query.
- Research Sky: 48 nodes.
- Every Research Sky node has EN and NL `label`, `sub`, and `desc` fields.
- Research node opening links retain the active language.

## Fixed identity spelling policy
The canonical display order is locked as:
1. رافي الحجي
2. رافي الحاجي
3. Rafy Alhajji
4. Rafi Alhaji

- Savior Atlas: fixed chips use `translate="no"` and explicit script language attributes.
- Savior Deepening: fixed chips preserved in AR / EN / NL; Arabic abjad forms are never transliterated for calculation.
- Guardian / Benefactor: fixed chips preserved across languages.
- Number & Letter Lab: Arabic and Latin forms are calculated separately; site-language switching does not rewrite them.
- `site-quality.js` no longer performs cross-script name replacement.

## Reiderland media
Local assets verified:
- `assets/reiderland/directors.jpg`
- `assets/reiderland/kees.jpg`
- `assets/reiderland/anton.jpg`

The same local media section is rendered by the AR / EN / NL Reiderland templates.

## Arabic typography
- HTML pages with `luxdot-ui-lock.css`: 119/119
- `luxdot-ui-lock.css` contains `Noto Kufi Arabic` and enforced Arabic font rules.
