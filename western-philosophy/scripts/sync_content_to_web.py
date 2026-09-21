#!/usr/bin/env python3
"""
Copies generated content (data/content/**, data/raw/structure.json) into
web/content and web/structure.json so the Next.js app can read them at
build/dev time via plain fs calls.

We copy rather than symlink because Turbopack's dev server refuses to
traverse a symlink that points outside the Next.js project root
("leaves the filesystem root"). Re-run this after any content-generation
step; it's cheap (a few MB of JSON).

Usage: python3 scripts/sync_content_to_web.py
"""
import shutil
from pathlib import Path

ROOT = Path(__file__).parent.parent
SRC_CONTENT = ROOT / "data" / "content"
SRC_STRUCTURE = ROOT / "data" / "raw" / "structure.json"
WEB_DIR = ROOT / "web"
DST_CONTENT = WEB_DIR / "content"
DST_STRUCTURE = WEB_DIR / "structure.json"


def main():
    if DST_CONTENT.exists():
        shutil.rmtree(DST_CONTENT)
    shutil.copytree(SRC_CONTENT, DST_CONTENT)
    shutil.copy2(SRC_STRUCTURE, DST_STRUCTURE)
    n_files = sum(1 for _ in DST_CONTENT.rglob("*.json"))
    print(f"Synced {n_files} JSON files into {DST_CONTENT}")


if __name__ == "__main__":
    main()
