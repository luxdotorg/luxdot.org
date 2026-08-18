# v4.3.69

## Fix
- Fixed Research Sky `Open node` links so the selected language is preserved (`?lang=ar|en|nl`).
- Added site-wide propagation of the active language to internal HTML links.
- Bumped language-routing script cache versions to prevent old cached routing code from surviving deployment.
- Audited all 41 Research Sky page targets: no missing local targets and all have language-query support.
