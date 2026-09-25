#!/usr/bin/env bash
# Downloads the textbook PDF (Muhammad Ayub, Understanding Islamic Finance, Wiley) from the
# course's Google Drive copy into textbook/. The PDF is copyrighted and is NOT committed to git.
# Only needed to re-run the source-extraction pipeline (tools/extract_source.py) or to use the
# "Open PDF at this page" links in the app. The app itself runs without it.
set -euo pipefail
ID="1M0rhG7OcdvOqD4W9_k_ezTR-N0Xxpyf8"
DIR="$(cd "$(dirname "$0")/.." && pwd)/textbook"
OUT="$DIR/Understanding-Islamic-Finance.pdf"
mkdir -p "$DIR"
if command -v gdown >/dev/null 2>&1; then
  gdown --quiet "$ID" -O "$OUT"
else
  curl -fsSL -o "$OUT" "https://drive.usercontent.google.com/download?id=${ID}&export=download&confirm=t"
fi
if [ "$(head -c 5 "$OUT")" != "%PDF-" ]; then
  echo "Download did not return a PDF (check that the Drive file is shared with you)." >&2
  rm -f "$OUT"; exit 1
fi
echo "Saved $OUT ($(wc -c < "$OUT") bytes)"
