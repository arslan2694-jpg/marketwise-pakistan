#!/usr/bin/env python3
"""
One-off remediation: ~140 quiz items across the 76 chapters were written
without a `difficulty` field (a generation-formatting slip, not a content
problem -- every other required field was present). Rather than guess a
specific tier, this assigns "intermediate" -- a neutral, defensible default
for a quiz item with no other difficulty signal -- so every quiz item is
usable by difficulty-filtered exam mode. This does not touch any
substantive content (prompt/options/explanation/etc.), only backfills a
missing taxonomy label.
"""
import json
from pathlib import Path

CHAPTERS_DIR = Path(__file__).parent.parent / "data" / "content" / "chapters"


def main():
    fixed = 0
    for f in sorted(CHAPTERS_DIR.glob("*.json")):
        data = json.loads(f.read_text(encoding="utf-8"))
        changed = False
        for q in data.get("quiz", []):
            if "difficulty" not in q:
                q["difficulty"] = "intermediate"
                changed = True
        if changed:
            f.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")
            fixed += 1
    print(f"Backfilled missing quiz difficulty in {fixed} chapter file(s).")


if __name__ == "__main__":
    main()
