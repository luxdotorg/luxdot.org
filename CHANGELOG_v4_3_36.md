# LuxDot v4.3.36
- Bypasses the cached `home.html` route with a new standalone `start-ar-v436.html`.
- New start page has zero external CSS and zero JavaScript dependencies.
- All primary navigation is native HTML with explicit `./page.html?v=4360` URLs.
- `home.html` is now only a tiny redirect/fallback to the unique start page.
- Intro transition now targets the unique start page directly.
- Visible v4.3.36 cache-bypass badge added for deployment verification.
