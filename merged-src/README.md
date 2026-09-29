# merged-src — modular working source

Source for `../Understanding-Islamic-Finance-MBA-Learning-System.html` (single-file build).

- `index.html` — shell + script list · `styles.css` · `app.js` — bootstrap/navigation
- `modules/` — engine: `registry` (data registry), `data` (canonical index + relationship graph), `migrate` + `store` (state v3), `progress`, `srs`, `router`, `components`, `calculators`, `legacy-routes`, `timer`, `views/*`
- `data/` — **generated** canonical data (do not edit) · `data/_audit.json` merge audit · `data/_integrity.json`
- `tools/build-data.js` — merges both original apps (read from `../source-backup/`) into `data/`
- `tools/build-standalone.js` — inlines everything into the one deliverable file
- `tools/check-integrity.js`, `tools/qa/*` — QA suites; `tools/run-qa.sh` runs everything; `tools/build-reports.js` writes the reports

Rebuild: `node tools/build-data.js && node tools/build-standalone.js`. The originals in `../source-backup/` are never modified.
