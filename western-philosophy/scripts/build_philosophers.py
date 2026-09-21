#!/usr/bin/env python3
"""
Consolidate every chapter's `philosophers_discussed` / `core_concepts` /
`arguments` into one profile JSON per philosopher at
data/content/philosophers/<slug>.json.

This is a MECHANICAL aggregation pass: every sentence in the output already
exists somewhere in the per-chapter content (itself generated from the raw
book text), plus best-effort date extraction via regex against the raw
chapter text. No new claims are synthesized here -- see DATA_MODEL.md.

Because different chapter-generation passes referred to the same person by
different name forms (e.g. "Hegel" vs "G. W. F. Hegel" vs "Georg Wilhelm
Friedrich Hegel"), a bare surname-matching merge would also wrongly conflate
genuinely different people who share a surname (Francis Bacon vs Roger
Bacon; James Mill vs John Stuart Mill; Gregory the Great vs Gregory VII).
So the alias resolution below is a manually-curated, reviewed list built by
inspecting the actual duplicate slugs this pipeline produced -- not a
generic heuristic -- plus a small compound-name splitter for the few
chapter mentions phrased as "X and Y" (e.g. "Socrates and Plato") that a
naive slugify() would otherwise turn into a fictitious third "person".

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

# lowercase mention -> canonical full name. Only for verified same-person
# aliases found in the generated dataset (see module docstring).
ALIAS_MAP = {
    "hegel": "Georg Wilhelm Friedrich Hegel",
    "g. w. f. hegel": "Georg Wilhelm Friedrich Hegel",
    "hume": "David Hume",
    "berkeley": "George Berkeley",
    "kant": "Immanuel Kant",
    "locke": "John Locke",
    "leibniz": "Gottfried Wilhelm Leibniz",
    "newton": "Isaac Newton",
    "descartes": "Rene Descartes",
    "machiavelli": "Niccolò Machiavelli",
    "rousseau": "Jean-Jacques Rousseau",
    "nietzsche": "Friedrich Nietzsche",
    "spinoza": "Baruch Spinoza",
    "bentham": "Jeremy Bentham",
    "fichte": "Johann Gottlieb Fichte",
    "averroes": "Averroes (Ibn Rushd)",
    "athanasius": "Saint Athanasius",
    "origen (the philosopher, contemporary of plotinus)": "Origen",
}

# lowercase compound mention -> the real, distinct people it should credit.
COMPOUND_SPLIT_MAP = {
    "socrates and plato": ["Socrates", "Plato"],
    "leucippus and democritus": ["Leucippus", "Democritus"],
    "pythagoras and the pythagoreans": ["Pythagoras"],
    "pythagoras and the pythagoreans (including philolaus)": ["Pythagoras"],
}


def resolve_names(raw_name: str) -> list[str]:
    key = raw_name.strip().lower()
    if key in COMPOUND_SPLIT_MAP:
        return COMPOUND_SPLIT_MAP[key]
    if key in ALIAS_MAP:
        return [ALIAS_MAP[key]]
    return [raw_name]


def main():
    chapters = load_all_chapters()
    profiles: dict[str, dict] = {}

    all_names_by_slug: dict[str, str] = {}
    for ch in chapters:
        for p in ch.get("philosophers_discussed", []):
            for name in resolve_names(p["name"]):
                all_names_by_slug[slugify(name)] = name

    for ch in chapters:
        chapter_id = ch["chapter_id"]
        raw = raw_text_for(chapter_id)
        for p in ch.get("philosophers_discussed", []):
            for canonical_name in resolve_names(p["name"]):
                slug = slugify(canonical_name)
                prof = profiles.setdefault(
                    slug,
                    {
                        "slug": slug,
                        "name": canonical_name,
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

                if not any(a["chapter_id"] == chapter_id for a in prof["appears_in_chapters"]):
                    prof["appears_in_chapters"].append(
                        {"chapter_id": chapter_id, "role": p["role_in_chapter"]}
                    )

                if not prof["dates"]:
                    dates = find_dates_near(raw, canonical_name)
                    if dates:
                        prof["dates"] = dates

                if p["role_in_chapter"] and p["role_in_chapter"] not in prof["_biography_parts"]:
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
                    if resolve_names(c.get("associated_philosopher", "")) and slugify(
                        resolve_names(c.get("associated_philosopher", ""))[0]
                    ) == slug:
                        if c["name"] not in prof["major_ideas"]:
                            prof["major_ideas"].append(c["name"])
                        if c.get("is_major") and c.get("precise_definition"):
                            doctrine = f"{c['name']}: {c['precise_definition']}"
                            if doctrine not in prof["_doctrine_parts"]:
                                prof["_doctrine_parts"].append(doctrine)
                        # try to detect other philosophers mentioned in competing_positions -> disagreements
                        for comp in c.get("competing_positions", []):
                            for other_slug, other_name in all_names_by_slug.items():
                                if other_slug != slug and other_name.split()[-1] in comp:
                                    prof["disagreements"].append({"with": other_slug, "about": c["name"]})

                # arguments made by this philosopher
                for a in ch.get("arguments", []):
                    arg_names = resolve_names(a.get("philosopher", ""))
                    if arg_names and slugify(arg_names[0]) == slug:
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
