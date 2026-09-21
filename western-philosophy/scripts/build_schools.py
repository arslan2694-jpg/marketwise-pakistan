#!/usr/bin/env python3
"""
Consolidate every chapter's `schools_discussed` into one profile per school
at data/content/schools/<slug>.json.

Must run AFTER build_philosophers.py: school membership is derived from
each philosopher profile's own `school` field (set when that philosopher
was the primary subject of a chapter), not from "this chapter happens to
mention both a school and a philosopher" co-occurrence -- an earlier
version did the latter and produced nonsense (e.g. crediting every
philosopher named anywhere in the Logical Analysis chapter as a member of
every school that chapter's text also mentioned in passing).
"""
import json
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from consolidate_common import CONTENT_DIR, load_all_chapters, slugify, write_json


def normalize_school_name(raw: str) -> str:
    """Different chapter-generation passes wrote schools_discussed as free
    text with editorial parentheticals (e.g. "Cynicism (anticipated)",
    "Cynicism (as an ethical source for early Stoicism)") rather than a
    short canonical name, which fragmented one real school into many
    near-duplicate entries. Stripping the parenthetical (and any trailing
    ' as/referenced/discussed ...' clause) recovers the shared core name
    mechanically -- it does not rename or merge genuinely different
    schools, only editorial qualifiers on the same name."""
    name = re.sub(r"\s*\([^)]*\)\s*$", "", raw).strip()
    name = re.sub(r",?\s+as\b.*$", "", name).strip()
    return name or raw.strip()


def main():
    chapters = load_all_chapters()
    schools: dict[str, dict] = {}

    for ch in chapters:
        for raw_school_name in ch.get("schools_discussed", []):
            school_name = normalize_school_name(raw_school_name)
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

    # membership: pull from each philosopher profile's own `school` field
    # (set only when that philosopher was the primary subject of a chapter
    # whose first schools_discussed entry was this school) rather than raw
    # chapter co-occurrence.
    phil_dir = CONTENT_DIR / "philosophers"
    concepts_by_philosopher_slug: dict[str, list[dict]] = {}
    if phil_dir.exists():
        for f in phil_dir.glob("*.json"):
            p = json.loads(f.read_text(encoding="utf-8"))
            if p.get("school"):
                school_slug = slugify(normalize_school_name(p["school"]))
                if school_slug in schools and p["slug"] not in schools[school_slug]["philosophers"]:
                    schools[school_slug]["philosophers"].append(p["slug"])

    # doctrines: a chapter's major concepts belong to a school only if that
    # concept's own associated_philosopher is an actual member of the school
    # (per the membership just computed above).
    member_school_by_philosopher: dict[str, str] = {}
    for slug, s in schools.items():
        for pslug in s["philosophers"]:
            member_school_by_philosopher[pslug] = slug

    for ch in chapters:
        for c in ch.get("core_concepts", []):
            if not c.get("is_major"):
                continue
            pslug = slugify(c.get("associated_philosopher", ""))
            school_slug = member_school_by_philosopher.get(pslug)
            if school_slug and c["name"] not in schools[school_slug]["doctrines"]:
                schools[school_slug]["doctrines"].append(c["name"])

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
