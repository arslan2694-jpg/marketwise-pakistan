#!/usr/bin/env python3
"""
One-off remediation: some early chapter-generation agents cited the book's
own printed footer page number (e.g. "-783-") instead of the PDF-index
source_page they were given, producing out-of-range citations. Rather than
guess a "corrected" page (which could still be wrong), this script clears
just the offending source_page fields to null -- an omitted citation is
honest; a guessed one might not be. See CHAPTER_SCHEMA.md's page-numbering
warning, added specifically to stop this at generation time going forward.
"""
import json
from pathlib import Path

CHAPTERS_DIR = Path(__file__).parent.parent / "data" / "content" / "chapters"


def main():
    fixed_count = 0
    for f in sorted(CHAPTERS_DIR.glob("*.json")):
        data = json.loads(f.read_text(encoding="utf-8"))
        start, end = data.get("start_page", 0), data.get("end_page", 0)
        changed = False
        for q in data.get("quiz", []):
            sp = q.get("source_page")
            if sp is not None and not (start <= sp <= end):
                q["source_page"] = None
                changed = True
        for q in data.get("questions", []):
            sp = q.get("source_page")
            if sp is not None and not (start <= sp <= end):
                q["source_page"] = None
                changed = True
        if changed:
            f.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")
            fixed_count += 1
            print(f"fixed {f.name}")
    print(f"\nCleared out-of-range source_page in {fixed_count} chapter file(s).")


if __name__ == "__main__":
    main()
