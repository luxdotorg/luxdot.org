# LuxDot v4.3.85 — Language Integrity + Signal Shell

- Replaced the misleading page translation compatibility behavior with a Language Integrity Layer.
- Arabic-rich pages are never relabeled as English/Dutch when a full translation is absent; source Arabic remains RTL + Kufi.
- Added a mandatory QA language gate for future pages: new Arabic-rich pages must ship with AR/EN/NL localization coverage or a page-specific i18n module.
- Added LANGUAGE_LEGACY_BASELINE.json to separate legacy backlog from future additions.
- Landing Morse signal now attempts autoplay immediately and otherwise starts on the earliest allowed pointer movement / pointerdown / touch / key activation, before language selection.
- Converted the global header from an opaque/sticky bar to fixed floating words with transparent background; navigation remains stationary while the page scrolls.
- Preserved v4.3.84 sacred-library link corrections and v4.3.83 cadastral work.
