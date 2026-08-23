# Provenance & Dependency Audit --- v4.16.5

## Media/binary provenance

Reviewed the **116** assets previously flagged for provenance.

-   **UNKNOWN_IMAGE_PROVENANCE**: 71
-   **REVIEW_VECTOR_SOURCE**: 26
-   **UNKNOWN_AUDIO_PROVENANCE**: 19

Each asset now has a stable SHA-256 fingerprint in: -
`data/media-provenance-registry-v4.16.5.csv` -
`data/media-provenance-registry-v4.16.5.json`

A fingerprint prevents accidental substitution and lets later
source/permission evidence attach to the exact file.

## Dependency scan

Package/dependency manifests found: - No standard npm/python/composer
dependency manifest found.

CDN/font domains detected: - `fonts.googleapis.com` --- 7 references -
`cdn.jsdelivr.net` --- 3 references - `unpkg.com` --- 2 references -
`fonts.gstatic.com` --- 1 references - `cdn.islamic.network` --- 1
references - `{s}.basemaps.cartocdn.com` --- 1 references

Library API signatures: - **Leaflet** --- 3 file(s)

## Licensing gate

The project is **not yet safe for a blanket repository-wide
relicensing** because binary media provenance remains unresolved and
static code scanning cannot establish authorship/license compatibility
for every snippet.

What is now safe: - publish the **policy direction**; - publish
attribution/provenance requirements; - keep a file-level rights
registry; - license individually confirmed LuxDot-owned content later.

What remains: 1. attach source URL/creator/license/permission to each
media fingerprint; 2. identify any copied/vendor JS/CSS and its upstream
license; 3. create final `THIRD_PARTY_NOTICES`; 4. confirm which source
files are original LuxDot work; 5. activate license headers only for
confirmed scopes.
