# LuxDot v4.18.47 — Harm CSP shell hotfix

- Adds an explicit `Content-Security-Policy` header for `/player-shell.html` allowing `connect-src` to the configured Supabase project origin.
- Keeps the permission narrowly scoped to `https://zcjzhiyogexmbcsgbcwk.supabase.co`; no wildcard network permission was added.
- Adds no-cache headers to the shell and Removing Harm routes so the browser does not keep the old CSP during testing.
- No database schema or Supabase credentials were changed.
