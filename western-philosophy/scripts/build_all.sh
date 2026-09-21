#!/usr/bin/env bash
# Rebuilds the entire educational dataset from the already-extracted raw
# chapter text and per-chapter content JSON, in dependency order, then
# syncs it into the Next.js app and runs QC.
#
# Run this after regenerating any chapter content, or after re-running
# extract_pdf.py against a new PDF.
#
# Usage: bash scripts/build_all.sh
set -euo pipefail
cd "$(dirname "$0")/.."

echo "== 1/9 Validating per-chapter content =="
python3 scripts/validate_content.py || echo "(validation reported issues above -- continuing so later steps still run on what exists)"

echo "== 2/9 Building philosopher profiles =="
python3 scripts/build_philosophers.py

echo "== 3/9 Building concept profiles =="
python3 scripts/build_concepts.py

echo "== 4/9 Building school profiles =="
python3 scripts/build_schools.py

echo "== 5/9 Building glossary =="
python3 scripts/build_glossary.py

echo "== 6/9 Building timeline =="
python3 scripts/build_timeline.py

echo "== 7/9 Building knowledge graph =="
python3 scripts/build_graph.py

echo "== 8/9 Building SQLite database =="
python3 scripts/build_database.py

echo "== 9/9 Syncing content into web app =="
python3 scripts/sync_content_to_web.py

echo "== Coverage report =="
python3 scripts/coverage_report.py
