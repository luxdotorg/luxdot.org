# LuxDot v4.3.63 QA — UX Stabilization

## Scope
Content expansion frozen. This pass is limited to language, navigation, interface, reading experience, images and link integrity.

## Automated integrity audit
- HTML pages scanned: 118
- Missing local HTML/script/stylesheet/image references: **0**
- Missing local `<img>` assets: **0**
- Missing local `.html` targets referenced by JavaScript: **0**
- Content pages missing shared shell: **0**
- Pages still using stale v4.3.44 shell/cache key: **0**

## Requested items rechecked
- Shared header: generated from one `site-shell.js`, fixed to viewport, complete seven-link menu plus five-language selector.
- Page controls: only two fixed, icon-only browser-history arrows remain.
- Arabic: final CSS prevents mid-word breaks and disables hyphenation on Arabic prose/UI.
- Landing: fixed vertical language order AR / EN / NL / JV / HE; English default and default destination.
- Landing audio: Morse sequence is `SOS GOD`; one-second pause between complete repetitions; stops when the signal is received.
- Landing background: green belief/religion/philosophy symbols twinkle behind the matrix with pointer events disabled.
- Library human-book covers: recorded OpenLibrary real-edition cover URLs are used. Failed covers intentionally render as a clean blank surface. Arabic title and author labels remain below.
- Sacred books: shelf click navigates immediately; Quran, Tanakh and New Testament auto-open the reading spread, removing the redundant second click. Hikma reader also auto-opens.
- Reading contrast: source-reader text contrast increased. Current section gains a Quran-style glow while spoken and while scrolling; Hikma paragraphs gain equivalent viewport highlighting.
- Images: every local `<img>` path referenced by the site exists in this build.
- Links: local href/src targets and JavaScript `.html` targets pass the static integrity scan.

## JavaScript syntax
Validated with `node --check`: `site-shell.js`, `intro.js`, `sacred-book.js`, `source-reader-v2.js`, `hikma-reader.js`.
