# LuxDot v4.18.16
- Fixed landing translations for all 10 language buttons; Turkish/Spanish/French/German/Indonesian now change RECEIVE THE SIGNAL and all landing labels immediately.
- Landing restores selected/query language instead of forcing English.
- Rebuilt nested-page header routing and CSS loading.
- Header is compact and stable in RTL/LTR; mobile/menu breakpoint raised to prevent collisions.
- Removed duplicate/legacy top language bars where present.
- Fixed nested navigation so prophet pages link to root pages, not /prophets/home.html.
- Translation fallback now uses full page-path coverage keys and retries the translation selector instead of failing after 650 ms.
- Prophet pages load language-core before page content and use cache-busted v4.18.16 runtime.
