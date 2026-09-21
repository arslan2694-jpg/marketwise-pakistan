#!/usr/bin/env python3
"""
Consolidate every chapter's `core_concepts` into one profile per distinct
concept (deduped by lowercase name) at data/content/concepts/<slug>.json.
Mechanical merge only -- see DATA_MODEL.md.
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from consolidate_common import CONTENT_DIR, load_all_chapters, slugify, write_json


def merge_lists(a, b):
    return list(dict.fromkeys([*a, *b]))


def main():
    chapters = load_all_chapters()
    concepts: dict[str, dict] = {}

    for ch in chapters:
        for c in ch.get("core_concepts", []):
            slug = slugify(c["name"])
            existing = concepts.get(slug)
            if existing is None:
                concepts[slug] = {
                    "slug": slug,
                    "name": c["name"],
                    "plain_explanation": c["plain_explanation"],
                    "precise_definition": c["precise_definition"],
                    "why_it_mattered": c["why_it_mattered"],
                    "historical_origin": c["historical_origin"],
                    "associated_philosopher": c["associated_philosopher"],
                    "examples": list(c.get("examples", [])),
                    "objections": list(c.get("objections", [])),
                    "competing_positions": list(c.get("competing_positions", [])),
                    "influence_on_later_thinkers": c.get("influence_on_later_thinkers", ""),
                    "connection_to_politics_or_religion": c.get(
                        "connection_to_politics_or_religion", ""
                    ),
                    "is_major": c.get("is_major", False),
                    "related_concepts": [],
                    "appears_in_chapters": [ch["chapter_id"]],
                    "evolution": [
                        {
                            "philosopher": c["associated_philosopher"],
                            "treatment": c["plain_explanation"],
                        }
                    ],
                }
            else:
                existing["is_major"] = existing["is_major"] or c.get("is_major", False)
                existing["examples"] = merge_lists(existing["examples"], c.get("examples", []))
                existing["objections"] = merge_lists(existing["objections"], c.get("objections", []))
                existing["competing_positions"] = merge_lists(
                    existing["competing_positions"], c.get("competing_positions", [])
                )
                if not existing["influence_on_later_thinkers"] and c.get("influence_on_later_thinkers"):
                    existing["influence_on_later_thinkers"] = c["influence_on_later_thinkers"]
                existing["appears_in_chapters"].append(ch["chapter_id"])
                if c["associated_philosopher"] and c["associated_philosopher"] != existing["evolution"][-1]["philosopher"]:
                    existing["evolution"].append(
                        {
                            "philosopher": c["associated_philosopher"],
                            "treatment": c["plain_explanation"],
                        }
                    )

    out_dir = CONTENT_DIR / "concepts"
    if out_dir.exists():
        for f in out_dir.glob("*.json"):
            f.unlink()
    for slug, c in concepts.items():
        write_json(out_dir / f"{slug}.json", c)

    print(f"Wrote {len(concepts)} concept profiles to {out_dir}")


if __name__ == "__main__":
    main()
