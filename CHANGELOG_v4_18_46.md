# LuxDot v4.18.46 — Removing Harm CSP Hotfix

- Allows `removing-harm-way.html`, `harm-dashboard.html`, and `harm-map.html` to connect to the configured Supabase project origin through the Cloudflare Pages `_headers` file.
- Keeps the permission narrowly scoped to `https://zcjzhiyogexmbcsgbcwk.supabase.co`; no wildcard external `connect-src` was added.
- No database schema, RLS policy, private data, or other LuxDot page behavior was changed.
- Built from v4.18.45.
