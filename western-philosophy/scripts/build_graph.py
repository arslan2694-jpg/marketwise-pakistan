#!/usr/bin/env python3
"""
Derive the knowledge-graph relationship list from philosopher profiles'
predecessors/successors/disagreements/key_arguments/school fields (already
mechanically populated by build_philosophers.py from real chapter text) plus
school<->philosopher membership from build_schools.py's output.

Must run AFTER build_philosophers.py and build_schools.py.

Writes data/content/graph/relationships.json.
"""
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from consolidate_common import CONTENT_DIR, write_json


def main():
    phil_dir = CONTENT_DIR / "philosophers"
    school_dir = CONTENT_DIR / "schools"
    if not phil_dir.exists():
        print("No philosopher profiles found -- run build_philosophers.py first.")
        return

    philosophers = {f.stem: json.loads(f.read_text(encoding="utf-8")) for f in phil_dir.glob("*.json")}
    schools = {f.stem: json.loads(f.read_text(encoding="utf-8")) for f in school_dir.glob("*.json")} if school_dir.exists() else {}

    relationships = []

    for slug, p in philosophers.items():
        home_chapter = p["appears_in_chapters"][0]["chapter_id"] if p["appears_in_chapters"] else ""

        for pred in p.get("predecessors", []):
            if pred in philosophers:
                relationships.append(
                    {
                        "from": slug,
                        "from_type": "philosopher",
                        "relationship": "responded_to",
                        "to": pred,
                        "to_type": "philosopher",
                        "explanation": f"{p['name']} is discussed in connection with {philosophers[pred]['name']} as an earlier influence.",
                        "source_chapter": home_chapter,
                    }
                )
        for succ in p.get("successors", []):
            if succ in philosophers:
                relationships.append(
                    {
                        "from": slug,
                        "from_type": "philosopher",
                        "relationship": "influenced",
                        "to": succ,
                        "to_type": "philosopher",
                        "explanation": f"{p['name']} is discussed as influencing {philosophers[succ]['name']}.",
                        "source_chapter": home_chapter,
                    }
                )
        for dis in p.get("disagreements", []):
            if dis["with"] in philosophers:
                relationships.append(
                    {
                        "from": slug,
                        "from_type": "philosopher",
                        "relationship": "opposed",
                        "to": dis["with"],
                        "to_type": "philosopher",
                        "explanation": f"Disagreement concerning {dis['about']}.",
                        "source_chapter": home_chapter,
                    }
                )

    for slug, s in schools.items():
        for pslug in s.get("philosophers", []):
            if pslug in philosophers:
                relationships.append(
                    {
                        "from": pslug,
                        "from_type": "philosopher",
                        "relationship": "developed",
                        "to": slug,
                        "to_type": "school",
                        "explanation": f"{philosophers[pslug]['name']} is discussed as belonging to / developing {s['name']}.",
                        "source_chapter": s["appears_in_chapters"][0] if s["appears_in_chapters"] else "",
                    }
                )

    # dedupe
    seen = set()
    deduped = []
    for r in relationships:
        key = (r["from"], r["relationship"], r["to"])
        if key not in seen:
            seen.add(key)
            deduped.append(r)

    out_dir = CONTENT_DIR / "graph"
    write_json(out_dir / "relationships.json", deduped)
    print(f"Wrote {len(deduped)} graph relationships to {out_dir / 'relationships.json'}")


if __name__ == "__main__":
    main()
