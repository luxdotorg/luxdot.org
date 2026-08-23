# IP / Asset Audit --- v4.16.4

## Scope

Static audit of **715 files** in the supplied LuxDot project. This is a
conservative triage for licensing work, not a legal determination of
ownership.

## Classification

-   **LIKELY_PROJECT_AUTHORED**: 401
-   **REVIEW_EXTERNAL_REFERENCES**: 194
-   **REVIEW**: 4
-   **NEEDS_PROVENANCE**: 116

## What the categories mean

-   **LIKELY_PROJECT_AUTHORED** --- local text/code with no external URL
    detected; still needs authorship confirmation before blanket
    relicensing.
-   **REVIEW_EXTERNAL_REFERENCES** --- contains external
    URLs/references; does not mean the file is third-party, only that
    rights/provenance should be checked.
-   **NEEDS_PROVENANCE** --- media/binary asset; source and license
    cannot safely be inferred from the file alone.
-   **REVIEW** --- other file type requiring manual classification.

## License markers found in repository text

-   CC: 17 file(s)
-   MIT: 4 file(s)
-   AGPL: 3 file(s)

## Most common external domains

-   `www.un.org` --- 160 occurrence-bearing file references
-   `alphenserfgoed.nl` --- 159 occurrence-bearing file references
-   `www.google.com` --- 116 occurrence-bearing file references
-   `commons.wikimedia.org` --- 114 occurrence-bearing file references
-   `westbrabantsarchief.nl` --- 100 occurrence-bearing file references
-   `vanvelthoven-vanrijt.nl` --- 80 occurrence-bearing file references
-   `www.dbnl.org` --- 60 occurrence-bearing file references
-   `www.grotekerkbreda.nl` --- 60 occurrence-bearing file references
-   `deoranjeboom.nl` --- 51 occurrence-bearing file references
-   `www.youtube.com` --- 45 occurrence-bearing file references
-   `www.unesco.org` --- 43 occurrence-bearing file references
-   `inventaris.onroerenderfgoed.be` --- 40 occurrence-bearing file
    references
-   `www.alphen-chaam.nl` --- 38 occurrence-bearing file references
-   `www.w3.org` --- 35 occurrence-bearing file references
-   `bergen-op-zoom.nieuws.nl` --- 30 occurrence-bearing file references
-   `www.iis.ac.uk` --- 28 occurrence-bearing file references
-   `www.sefaria.org` --- 26 occurrence-bearing file references
-   `www.heliofant.com` --- 24 occurrence-bearing file references
-   `amarant.nl` --- 24 occurrence-bearing file references
-   `www.bhic.nl` --- 23 occurrence-bearing file references
-   `www.oorlogsbronnen.nl` --- 22 occurrence-bearing file references
-   `drukkersmerken.stcv.be` --- 20 occurrence-bearing file references
-   `erfgoed.breda.nl` --- 20 occurrence-bearing file references
-   `www.vv-raamsdonk.nl` --- 20 occurrence-bearing file references
-   `www.omroepbrabant.nl` --- 20 occurrence-bearing file references
-   `bisdombreda.nl` --- 20 occurrence-bearing file references
-   `www.thebe.nl` --- 20 occurrence-bearing file references
-   `ebible.org` --- 20 occurrence-bearing file references
-   `covers.openlibrary.org` --- 20 occurrence-bearing file references
-   `www.koninklijkhuis.nl` --- 19 occurrence-bearing file references

## Decision

**Do not activate a repository-wide CC BY-SA or AGPL notice yet.**

Creative Commons guidance recommends clearly identifying third-party
portions that are excluded from a CC license. GNU guidance likewise
requires dependency/license compatibility rather than assuming code can
simply be relicensed.

## Next manual pass

1.  Confirm authorship of likely project-authored source files.
2.  Resolve every `NEEDS_PROVENANCE` image/audio/video/font/PDF.
3.  Generate a third-party notices registry.
4.  Inspect JS/CSS dependencies and copied snippets for their upstream
    licenses.
5.  Split license scopes: content/documentation vs software vs
    third-party assets vs identity.
6.  After review, activate machine-readable notices.
