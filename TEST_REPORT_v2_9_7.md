# LuxDot v2.9.7 — QA
Date: 2026-08-14
Base: v2.9.6 Kolbe Living Memory

## Content
- Edith Stein full living-memory dossier added: PASS
- Edith Stein card links to dossier: PASS
- Kolbe remains in Living Memory: PASS
- Edith Stein remains in Living Memory: PASS

## Local images
All dossier image `src` values are local relative paths; no external image URLs are used in either dossier page.

Verified readable images with Pillow:
- maximilian-kolbe-research.jpg — JPEG 1920x2487
- maximilian-kolbe.jpg — JPEG 525x680
- kolbe-niepokalanow.jpg — JPEG 800x450
- franciszek-gajowniczek.jpg — JPEG 369x479
- edith-stein-carmel.jpg — JPEG 960x1091
- edith-stein-student.jpg — JPEG 1559x2023
- edith-stein-echt-memorial.jpg — JPEG 960x1280

Franciszek Gajowniczek is now JPEG instead of WEBP for broader browser/static-host compatibility.

## Structural checks
- memory.js syntax: PASS
- memory-data.js syntax: PASS
- data/memory-atlas.json parse: PASS
- Local HTML href/src scan: PASS, 0 missing references
- Target image file integrity/decode: PASS
- Visual inspection of Kolbe portrait, Gajowniczek portrait and Edith Stein Carmelite portrait: PASS

## Browser rendering note
A Chromium headless screenshot attempt was blocked/hung in the container runtime, so no claim of pixel-perfect browser screenshot QA is made. Static references, MIME/image decoding and local HTTP availability were checked independently.
