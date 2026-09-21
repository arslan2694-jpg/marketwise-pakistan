#!/usr/bin/env python3
"""
Derive timeline events from philosopher profiles' `dates` field (itself
extracted via regex from the raw book text in build_philosophers.py -- so
this stays non-fabricated: every event traces back to a date Russell's own
text prints next to that philosopher's name).

Must run AFTER build_philosophers.py.

Writes data/content/timeline/events.json.
"""
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from consolidate_common import CONTENT_DIR, write_json

YEAR_RE = re.compile(r"\d{1,4}")
BC_RE = re.compile(r"B\.?\s?C\.?", re.IGNORECASE)


def parse_years(date_str: str):
    """Return (birth_sort, death_sort) as signed ints, or None if unparseable."""
    is_bc = bool(BC_RE.search(date_str))
    years = [int(y) for y in YEAR_RE.findall(date_str)]
    if not years:
        return None
    if len(years) == 1:
        y = years[0]
        return (-y, -y) if is_bc else (y, y)
    birth, death = years[0], years[1]
    if is_bc:
        return (-birth, -death)
    return (birth, death)


def main():
    phil_dir = CONTENT_DIR / "philosophers"
    if not phil_dir.exists():
        print("No philosopher profiles found -- run build_philosophers.py first.")
        return

    import json

    events = []
    for f in sorted(phil_dir.glob("*.json")):
        p = json.loads(f.read_text(encoding="utf-8"))
        if not p.get("dates"):
            continue
        parsed = parse_years(p["dates"])
        if not parsed:
            continue
        birth_sort, death_sort = parsed
        related_chapters = [a["chapter_id"] for a in p.get("appears_in_chapters", [])]

        events.append(
            {
                "id": f"{p['slug']}-active",
                "name": f"{p['name']} ({p['dates']})",
                "date": p["dates"],
                "date_sort": birth_sort,
                "category": ["philosophy"],
                "description": p.get("why_this_matters") or p.get("biography", "")[:280],
                "related_philosophers": [p["slug"]],
                "related_chapters": related_chapters,
            }
        )

    events.sort(key=lambda e: e["date_sort"])
    out_dir = CONTENT_DIR / "timeline"
    write_json(out_dir / "events.json", events)
    print(f"Wrote {len(events)} timeline events to {out_dir / 'events.json'}")
    skipped = len(list(phil_dir.glob('*.json'))) - len(events)
    print(f"({skipped} philosopher(s) had no parseable date string and were skipped -- no fabrication.)")


if __name__ == "__main__":
    main()
