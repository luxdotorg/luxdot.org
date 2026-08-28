# Versioning

`VERSION` stores the canonical human-readable LuxDot release version using `X.Y.Z`.

Legacy `?v=` query parameters on CSS/JavaScript assets currently function as cache-busting identifiers and may have different historical numbers. Governance v1 does not rewrite them. A later migration should make cache busting derive from a build/release identifier without conflating it with research/content version semantics.
