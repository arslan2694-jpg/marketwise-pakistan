#!/usr/bin/env python3
"""
Consolidate every chapter's `schools_discussed` into one profile per school
at data/content/schools/<slug>.json. Doctrines/philosophers are pulled from
the same chapters that name the school (mechanical co-occurrence, not new
synthesis) -- see DATA_MODEL.md.
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from consolidate_common import CONTENT_DIR, load_all_chapters, slugify, write_json


def main():
    chapters = load_all_chapters()
    schools: dict[str, dict] = {}

    for ch in chapters:
        for school_name in ch.get("schools_discussed", []):
            slug = slugify(school_name)
            s = schools.setdefault(
                slug,
                {
                    "slug": slug,
                    "name": school_name,
                    "period": "",
                    "doctrines": [],
                    "philosophers": [],
                    "predecessor_schools": [],
                    "successor_influence": [],
                    "appears_in_chapters": [],
                },
            )
            s["appears_in_chapters"].append(ch["chapter_id"])

            for p in ch.get("philosophers_discussed", []):
                pslug = slugify(p["name"])
                if pslug not in s["philosophers"]:
                    s["philosophers"].append(pslug)

            for c in ch.get("core_concepts", []):
                if c.get("is_major") and c["name"] not in s["doctrines"]:
                    s["doctrines"].append(c["name"])

    # infer a rough period string from the span of chapters the school appears in
    chapters_by_id = {c["chapter_id"]: c for c in chapters}
    for s in schools.values():
        pages = [chapters_by_id[cid]["start_page"] for cid in s["appears_in_chapters"] if cid in chapters_by_id]
        if pages:
            book_ids = {chapters_by_id[cid]["book_id"] for cid in s["appears_in_chapters"] if cid in chapters_by_id}
            s["period"] = "Ancient" if book_ids == {"book-1"} else (
                "Medieval" if book_ids == {"book-2"} else (
                    "Modern" if book_ids == {"book-3"} else "Spans multiple eras"
                )
            )

    out_dir = CONTENT_DIR / "schools"
    if out_dir.exists():
        for f in out_dir.glob("*.json"):
            f.unlink()
    for slug, s in schools.items():
        write_json(out_dir / f"{slug}.json", s)

    print(f"Wrote {len(schools)} school profiles to {out_dir}")


if __name__ == "__main__":
    main()
