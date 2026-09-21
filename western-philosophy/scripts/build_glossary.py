#!/usr/bin/env python3
"""
Merge every chapter's `glossary_terms` into one deduped glossary at
data/content/glossary/glossary.json.
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from consolidate_common import CONTENT_DIR, load_all_chapters, slugify, write_json


def main():
    chapters = load_all_chapters()
    terms: dict[str, dict] = {}

    for ch in chapters:
        for g in ch.get("glossary_terms", []):
            slug = slugify(g["term"])
            existing = terms.get(slug)
            if existing is None:
                terms[slug] = {
                    "slug": slug,
                    "term": g["term"],
                    "beginner_explanation": g["beginner_explanation"],
                    "academic_explanation": g["academic_explanation"],
                    "related_concepts": list(g.get("related_concepts", [])),
                    "appears_in_chapters": [ch["chapter_id"]],
                }
            else:
                existing["appears_in_chapters"].append(ch["chapter_id"])
                for rc in g.get("related_concepts", []):
                    if rc not in existing["related_concepts"]:
                        existing["related_concepts"].append(rc)

    out_dir = CONTENT_DIR / "glossary"
    out_dir.mkdir(parents=True, exist_ok=True)
    write_json(out_dir / "glossary.json", sorted(terms.values(), key=lambda t: t["term"].lower()))
    print(f"Wrote {len(terms)} glossary entries to {out_dir / 'glossary.json'}")


if __name__ == "__main__":
    main()
