# LuxDot v4.3.126

- Fixed LuxDot Pulse Cloudflare Analytics queries for plans with a 24-hour maximum analytics query window.
- Seven-day totals are now assembled from seven sub-24-hour slices instead of one seven-day dataset request.
- Added safe public diagnostic codes when Cloudflare rejects an analytics query; secrets and visitor-level data remain hidden.
- Kept the existing transparency, privacy, radio, timeline, memory, and research-view behavior unchanged.
