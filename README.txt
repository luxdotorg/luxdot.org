LUXDOT LIVING RESEARCH WEB v1
================================
Open index.html through a web server (not file://) because the research page fetches data/care-points.json.
Recommended local test:
  python -m http.server 8000
then visit http://localhost:8000

Structure
- index.html                         Projects / Research landing page
- research/shaam-breda.html         Living Research 001 (Arabic + English)
- data/care-points.json             Latest preserved 25 km / 70-record care dataset
- README.txt

External runtime dependencies
- Leaflet 1.9.4 from unpkg
- OpenStreetMap tiles

Editorial design
- Arabic public label uses شام; geographic source data retains Chaam where precision/search requires it.
- Knowledge statuses are visibly distinct.
- Unsupported symbolic matches are hypotheses or pruned branches, not facts.
- Map is privacy-by-design and contains organizations/public partners rather than vulnerable individuals.
