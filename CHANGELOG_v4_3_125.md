# LuxDot v4.3.125 — LuxDot Pulse
- Global ⓘ panel upgraded to LuxDot Pulse: Status + Traffic + Changes + NOW/NEXT.
- Added secure Cloudflare Pages Function at /api/transparency.
- Live public metrics: last 15m, 24h, 7d visits, 24h trend, and top paths.
- Metrics are aggregated; visitor identities, IP addresses, and individual histories are not exposed.
- Cloudflare API token remains an encrypted server-side secret; it is never shipped to browser JavaScript.
- Honest failure mode: the panel displays SETUP / DEGRADED rather than inventing numbers.
- Added public methodology page and machine-readable transparency manifest.
