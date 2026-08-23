# LuxDot v4.3.11

- Rebuilt from the stable v4.3.9 package rather than patching the broken entry build.
- Entry gate is now isolated from `language-core.js`; saved site language can no longer partially render or collapse the gate before the user chooses.
- Language choice on the gate only changes the gate UI and persists the selection.
- Enter always opens plain `home.html`; the home page then reads the explicitly saved language.
- Arabic language button uses the Kufi font stack directly, independent of current document language.
- Critical entry/home asset cache keys bumped to 4.3.11.
