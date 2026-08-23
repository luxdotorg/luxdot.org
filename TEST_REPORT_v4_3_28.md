# LuxDot v4.3.28 — QA Report

## Build source
Rebuilt from the complete LuxDot v4.3.27 ZIP, not from the previously incomplete extracted working folder.

## Requested fixes
- Removed Elon Musk and all Elon variants package-wide.
- Removed the old long Arabic name package-wide.
- Number lab now tests only `Rafy Alhajji` with the Gematrix-compatible local ciphers and `رافي الحجي` with Arabic abjad.
- Independent calculation QA: `Rafy Alhajji` = 1726 / 606 / 101; `رافي الحجي` = 343 large / 28 small.
- Landing language default is English; Receive Signal routes to English home unless a language is explicitly selected.
- Landing language controls, Receive Signal button and FROM NOISE INTO MEMORY typography enlarged/refined.
- Matrix vocabulary expanded across Arabic, English, Dutch, Javanese and Hebrew plus LuxDot/noise/signal/coding concepts.
- Background concept words remain readable for roughly one second before fading.
- Morse SOS (`... --- ...`) added; browser audio begins after the first user gesture because autoplay audio is browser-restricted.
- Language selector unified through `language-core.js`; switching language preserves the current page path and immediately navigates with the selected `?lang=`.
- Duplicate reload handlers removed from `five-lang-site.js` and `site-shell.js`.
- Header spacing increased to reduce overlap.
- Every HTML page except the landing page is connected to `language-core.js`.
- Non-Arabic locale-block scan found no Arabic leakage. `رافي الحجي` is intentionally allowed only in the Ibn-Arabi/abjad context of the Number & Letter Lab.
- Legacy pages without a complete hand-translated target-language body use the target-language safe research view instead of leaking Arabic.

## Automated QA
- JavaScript syntax: PASS (`node --check` across all JS files).
- Forbidden-name scan: PASS.
- Non-Arabic locale Arabic-leak scan: PASS.
- HTML language-core coverage: PASS.
- Same-page language navigation logic: PASS (static code inspection).
- ZIP integrity: checked after packaging.

## Browser runtime note
A Chromium headless smoke test was attempted, but the sandbox Chromium process failed to return a DOM because its local D-Bus/runtime environment did not initialize correctly. No browser-runtime PASS is claimed. Static and syntax checks above did pass.
