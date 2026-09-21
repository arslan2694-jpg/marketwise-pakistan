#!/usr/bin/env python3
"""
Consolidate every chapter's `philosophers_discussed` / `core_concepts` /
`arguments` into one profile JSON per philosopher at
data/content/philosophers/<slug>.json.

This is a MECHANICAL aggregation pass: every sentence in the output already
exists somewhere in the per-chapter content (itself generated from the raw
book text), plus best-effort date extraction via regex against the raw
chapter text. No new claims are synthesized here -- see DATA_MODEL.md.

Usage: python3 scripts/build_philosophers.py
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from consolidate_common import (
    CONTENT_DIR,
    find_dates_near,
    load_all_chapters,
    raw_text_for,
    slugify,
    write_json,
)

ERA_BY_BOOK = {
    "book-1": "Ancient",
    "book-2": "Medieval / Catholic",
    "book-3": "Modern",
}


def main():
    chapters = load_all_chapters()
    profiles: dict[str, dict] = {}

    all_names_by_slug: dict[str, str] = {}
    for ch in chapters:
        for p in ch.get("philosophers_discussed", []):
            all_names_by_slug[slugify(p["name"])] = p["name"]

    for ch in chapters:
        chapter_id = ch["chapter_id"]
        raw = raw_text_for(chapter_id)
        for p in ch.get("philosophers_discussed", []):
            slug = slugify(p["name"])
            prof = profiles.setdefault(
                slug,
                {
                    "slug": slug,
                    "name": p["name"],
                    "era": ERA_BY_BOOK.get(ch["book_id"], ""),
                    "dates": "",
                    "geography": "",
                    "school": "",
                    "major_ideas": [],
                    "works": [],
                    "philosophical_domains": [],
                    "biography": "",
                    "central_doctrines": "",
                    "key_arguments": [],
                    "terminology": [],
                    "ethics": "",
                    "politics": "",
                    "metaphysics": "",
                    "epistemology": "",
                    "philosophy_of_science": "",
                    "religion_theology": "",
                    "predecessors": [],
                    "successors": [],
                    "disagreements": [],
                    "notable_quotations": [],
                    "russell_view": "",
                    "why_this_matters": "",
                    "appears_in_chapters": [],
                    "extraction_confidence": "high",
                    "_biography_parts": [],
                    "_doctrine_parts": [],
                },
            )

            prof["appears_in_chapters"].append(
                {"chapter_id": chapter_id, "role": p["role_in_chapter"]}
            )

            if not prof["dates"]:
                dates = find_dates_near(raw, p["name"])
                if dates:
                    prof["dates"] = dates

            if p["role_in_chapter"]:
                prof["_biography_parts"].append(p["role_in_chapter"])

            if p.get("is_primary_subject"):
                if not prof["school"] and ch.get("schools_discussed"):
                    prof["school"] = ch["schools_discussed"][0]
                if not prof["russell_view"] and ch.get("russell_presentation"):
                    prof["russell_view"] = ch["russell_presentation"]
                if not prof["why_this_matters"] and ch.get("key_takeaways"):
                    prof["why_this_matters"] = " ".join(ch["key_takeaways"][:2])

            # concepts associated with this philosopher
            for c in ch.get("core_concepts", []):
                if slugify(c.get("associated_philosopher", "")) == slug:
                    if c["name"] not in prof["major_ideas"]:
                        prof["major_ideas"].append(c["name"])
                    if c.get("is_major") and c.get("precise_definition"):
                        prof["_doctrine_parts"].append(f"{c['name']}: {c['precise_definition']}")
                    # try to detect other philosophers mentioned in competing_positions -> disagreements
                    for comp in c.get("competing_positions", []):
                        for other_slug, other_name in all_names_by_slug.items():
                            if other_slug != slug and other_name.split()[-1] in comp:
                                prof["disagreements"].append({"with": other_slug, "about": c["name"]})

            # arguments made by this philosopher
            for a in ch.get("arguments", []):
                if slugify(a.get("philosopher", "")) == slug:
                    if a["title"] not in prof["key_arguments"]:
                        prof["key_arguments"].append(a["title"])

            # predecessors/successors via substring match on connection text
            for other_slug, other_name in all_names_by_slug.items():
                if other_slug == slug:
                    continue
                surname = other_name.split()[-1]
                if surname and surname in (ch.get("connections_to_earlier_philosophers") or ""):
                    if p.get("is_primary_subject") and other_slug not in prof["predecessors"]:
                        prof["predecessors"].append(other_slug)
                if surname and surname in (ch.get("connections_to_later_philosophers") or ""):
                    if p.get("is_primary_subject") and other_slug not in prof["successors"]:
                        prof["successors"].append(other_slug)

    # finalize free-text fields from accumulated parts
    for prof in profiles.values():
        if prof["_biography_parts"]:
            prof["biography"] = " ".join(dict.fromkeys(prof["_biography_parts"]))
        if prof["_doctrine_parts"]:
            prof["central_doctrines"] = " ".join(dict.fromkeys(prof["_doctrine_parts"]))
        del prof["_biography_parts"]
        del prof["_doctrine_parts"]
        # dedupe disagreements
        seen = set()
        deduped = []
        for d in prof["disagreements"]:
            key = (d["with"], d["about"])
            if key not in seen:
                seen.add(key)
                deduped.append(d)
        prof["disagreements"] = deduped

    out_dir = CONTENT_DIR / "philosophers"
    if out_dir.exists():
        for f in out_dir.glob("*.json"):
            f.unlink()
    for slug, prof in profiles.items():
        write_json(out_dir / f"{slug}.json", prof)

    print(f"Wrote {len(profiles)} philosopher profiles to {out_dir}")


if __name__ == "__main__":
    main()
