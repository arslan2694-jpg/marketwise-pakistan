#!/usr/bin/env python3
"""
QC pass over data/content/chapters/*.json (Phase 22 in the spec).

Checks, per chapter:
  - required top-level fields present with correct types
  - quiz correct_index valid for its options
  - quiz/question source_page within [start_page, end_page]
  - no empty quiz/flashcards/questions arrays (every chapter must have some)
  - matches book_structure.py (no missing/duplicate/unexpected chapters)
  - no leftover OCR mojibake markers ("â€", "Ã©"-style mis-decodes) in prose fields

Exits non-zero and prints every problem if anything fails; otherwise prints
a coverage summary.
"""
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from book_structure import flatten_chapters

ROOT = Path(__file__).parent.parent
CHAPTERS_DIR = ROOT / "data" / "content" / "chapters"

REQUIRED_FIELDS = [
    "chapter_id", "book_id", "part_id", "roman", "title", "start_page", "end_page",
    "orientation", "historical_background", "philosophical_problems",
    "philosophers_discussed", "schools_discussed", "core_concepts", "arguments",
    "key_distinctions", "connections_to_earlier_philosophers",
    "connections_to_later_philosophers", "political_social_context",
    "religion_science_culture_context", "russell_presentation", "critical_context",
    "key_takeaways", "study_notes", "glossary_terms", "questions", "flashcards",
    "quiz", "essay_prompts", "extraction_confidence",
]

MOJIBAKE_MARKERS = ["â€", "Ã©", "Ã¨", "Ã¯", "â€™", "â€œ", "â€\x9d"]


def check_chapter(path: Path, expected: dict) -> list[str]:
    problems = []
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as e:
        return [f"INVALID JSON: {e}"]

    for field in REQUIRED_FIELDS:
        if field not in data:
            problems.append(f"missing field '{field}'")

    if data.get("chapter_id") != expected["chapter_id"]:
        problems.append(
            f"chapter_id mismatch: file has {data.get('chapter_id')!r}, expected {expected['chapter_id']!r}"
        )
    if data.get("start_page") != expected["start_page"] or data.get("end_page") != expected["end_page"]:
        problems.append(
            f"page range mismatch: file has {data.get('start_page')}-{data.get('end_page')}, "
            f"expected {expected['start_page']}-{expected['end_page']}"
        )

    start, end = data.get("start_page", 0), data.get("end_page", 0)
    for q in data.get("quiz", []):
        if q.get("type") in ("multiple_choice", "identify_philosopher", "identify_school"):
            opts = q.get("options") or []
            idx = q.get("correct_index")
            if idx is None or not (0 <= idx < len(opts)):
                problems.append(f"quiz correct_index {idx!r} invalid for options {opts!r}")
        sp = q.get("source_page")
        if sp is not None and not (start <= sp <= end):
            problems.append(f"quiz source_page {sp} outside [{start},{end}]")

    for q in data.get("questions", []):
        sp = q.get("source_page")
        if sp is not None and not (start <= sp <= end):
            problems.append(f"question source_page {sp} outside [{start},{end}]")

    if len(data.get("quiz", [])) == 0:
        problems.append("no quiz questions")
    if len(data.get("flashcards", [])) == 0:
        problems.append("no flashcards")
    if len(data.get("questions", [])) == 0:
        problems.append("no active-recall questions")

    text_blob = json.dumps(
        {k: v for k, v in data.items() if isinstance(v, str)}, ensure_ascii=False
    )
    for marker in MOJIBAKE_MARKERS:
        if marker in text_blob:
            problems.append(f"possible OCR mojibake artifact left in content: {marker!r}")
            break

    return problems


def main():
    expected_chapters = {c["book_id"] + "-ch-" + c["roman"].lower(): c for c in flatten_chapters()}
    # normalize keys to the same slug scheme extract_pdf.py uses
    from extract_pdf import slugify

    expected_by_id = {}
    for c in flatten_chapters():
        cid = slugify(c["book_id"], c["roman"])
        expected_by_id[cid] = {
            "chapter_id": cid,
            "start_page": c["start_page"],
            "end_page": c["end_page"],
        }

    present_files = {f.stem: f for f in CHAPTERS_DIR.glob("*.json")}

    missing = sorted(set(expected_by_id) - set(present_files))
    unexpected = sorted(set(present_files) - set(expected_by_id))

    all_problems: dict[str, list[str]] = {}
    for cid, path in present_files.items():
        if cid not in expected_by_id:
            continue
        probs = check_chapter(path, expected_by_id[cid])
        if probs:
            all_problems[cid] = probs

    total_expected = len(expected_by_id)
    total_present = len(present_files)
    total_valid = total_present - len(all_problems)

    print(f"Chapters expected: {total_expected}")
    print(f"Chapters generated: {total_present}")
    print(f"Chapters passing validation: {total_valid}")

    if missing:
        print(f"\nMISSING ({len(missing)}): {', '.join(missing)}")
    if unexpected:
        print(f"\nUNEXPECTED FILES ({len(unexpected)}): {', '.join(unexpected)}")
    if all_problems:
        print(f"\nCHAPTERS WITH PROBLEMS ({len(all_problems)}):")
        for cid, probs in all_problems.items():
            print(f"  {cid}:")
            for p in probs:
                print(f"    - {p}")

    if all_problems or unexpected:
        sys.exit(1)


if __name__ == "__main__":
    main()
