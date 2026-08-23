# TEST REPORT — LuxDot v4.3.15

## Automated checks
- Arabic master QA: PASS.
- JSON parse validation: PASS.
- JavaScript syntax validation: PASS for site and research JS files.
- Genealogy dataset: 51 nodes / 69 edges / 22 extracted dated records.
- Source separation retained: parent, spouse, witness/archive co-occurrence and land relations are distinct.
- Local-reference scan: no new missing static assets; two pre-existing dynamic template expressions in Burckhardt/African Association are intentionally not filesystem paths.

## Faith & Wisdom Arabic UI repair
- Arabic faith grid minimum card width increased from 210px to 280px.
- Arabic religion titles are kept on one line at normal desktop/tablet widths.
- Long Javanese/Indonesian title receives responsive type scaling rather than clipping.
- Mobile fallbacks reduce type size only when viewport width requires it.
- `luxdot-arabic-ui.css` cache version bumped on `faith.html`.

## Genealogy safeguards
- Similar surnames are not merged automatically.
- Secondary genealogical reconstruction remains confidence B until original scan verification.
- Parish baptism/marriage entries remain confidence A as indexed transcriptions, while interpretation beyond the entry is not promoted to A.
