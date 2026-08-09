LUXDOT v5.1-STABLE — CLEAN DEPLOY
=================================
This build was made specifically to eliminate the mixed-version/cache problem observed on luxdot.org.

IMPORTANT DEPLOYMENT PROCEDURE
1. Back up the current public web root.
2. DELETE the old public files from the root, especially:
   index.html, home.html, library.html, quran.html, assets/, data/, audio/, sw.js
3. Upload the CONTENTS of this ZIP directly into the public root.
   Do not upload a parent folder around them.
4. After upload, open:
   https://luxdot.org/version.html
   It MUST say: BUILD: v5.1-STABLE
5. Then open:
   https://luxdot.org/home.html?v=5.1
   and confirm a tiny 'v5.1' marker appears at the bottom-right.
6. Then open:
   https://luxdot.org/quran.html?v=5.1&s=2&a=2

STABILITY CHANGES
- Service Worker removed during active development to prevent stale builds.
- Old LuxDot caches are automatically unregistered/deleted.
- CSS/JS links use ?v=5.1 cache busting.
- Quran text has TWO sources:
  jsDelivr quran-json 3.1.2, then unpkg quran-json 3.1.2.
- Quran audio has TWO sources:
  Islamic Network / Al Quran Cloud first, then EveryAyah Alafasy_128kbps fallback.
- Built-in fallback retains Al-Fatihah and Al-Baqarah 1–5 if both text CDNs are unavailable.
- No unused audio folder is included.

LANGUAGES
Arabic + English are supported from the Matrix entry and across active pages.
The architecture in assets/i18n.js is ready for more languages later.
