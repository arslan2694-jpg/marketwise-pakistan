#!/usr/bin/env python3
"""
Ingestion step 1: extract raw text for every chapter (and front matter) of
the source PDF into data/raw/, keyed to the canonical structure in
book_structure.py.

Usage:
    python3 scripts/extract_pdf.py [path/to/pdf]

Output:
    data/raw/structure.json          -- full book/part/chapter map incl. end pages
    data/raw/chapters/<chapter_id>.txt   -- raw extracted text per chapter
    data/raw/front_matter/preface.txt
    data/raw/front_matter/introduction.txt
    data/raw/extraction_report.json  -- per-chapter char/word counts + warnings

This script does not invent or repair missing text. If a chapter's raw text
looks empty or implausibly short, it is recorded in extraction_report.json
under "warnings" for manual/visual follow-up instead of being silently
patched.
"""
import json
import re
import sys
from pathlib import Path

import fitz  # PyMuPDF

sys.path.insert(0, str(Path(__file__).parent))
from book_structure import BOOKS, FRONT_MATTER, INDEX_START_PAGE, flatten_chapters, TOTAL_PAGES

ROOT = Path(__file__).parent.parent
DEFAULT_PDF = ROOT / "source" / "history_of_western_philosophy.pdf"
RAW_DIR = ROOT / "data" / "raw"
CHAPTERS_DIR = RAW_DIR / "chapters"
FRONT_DIR = RAW_DIR / "front_matter"


def slugify(book_id: str, roman: str) -> str:
    return f"{book_id}-ch-{roman.lower()}"


def extract_page_range(doc, start, end) -> str:
    parts = []
    for i in range(start, end + 1):
        parts.append(doc[i].get_text())
    return "\n".join(parts)


def main():
    pdf_path = Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_PDF
    if not pdf_path.exists():
        print(f"ERROR: PDF not found at {pdf_path}", file=sys.stderr)
        sys.exit(1)

    CHAPTERS_DIR.mkdir(parents=True, exist_ok=True)
    FRONT_DIR.mkdir(parents=True, exist_ok=True)

    doc = fitz.open(str(pdf_path))
    if doc.page_count != TOTAL_PAGES:
        print(
            f"WARNING: PDF has {doc.page_count} pages, expected {TOTAL_PAGES}. "
            "Page indices in book_structure.py may no longer be valid.",
            file=sys.stderr,
        )

    flat = flatten_chapters()
    report = {"pdf_path": str(pdf_path), "page_count": doc.page_count, "chapters": [], "warnings": []}

    # Front matter
    for name, (start, end) in FRONT_MATTER.items():
        if name == "table_of_contents":
            continue  # defective/incomplete in this edition; body headings are source of truth
        text = extract_page_range(doc, start, end)
        (FRONT_DIR / f"{name}.txt").write_text(text, encoding="utf-8")

    # Back-of-book alphabetical index (real page cross-references per name/topic;
    # useful later for grounding philosopher "appears in chapters" links)
    index_text = extract_page_range(doc, INDEX_START_PAGE, doc.page_count - 1)
    (RAW_DIR / "back_of_book_index.txt").write_text(index_text, encoding="utf-8")

    # Book Two's own introduction (distinct from the book-wide Introduction)
    book2 = next(b for b in BOOKS if b["id"] == "book-2")
    intro_start = book2["introduction_start_page"]
    intro_end = book2["parts"][0]["chapters"][0][2] - 1
    text = extract_page_range(doc, intro_start, intro_end)
    (FRONT_DIR / "book_2_introduction.txt").write_text(text, encoding="utf-8")

    # Chapters
    for ch in flat:
        chapter_id = slugify(ch["book_id"], ch["roman"])
        text = extract_page_range(doc, ch["start_page"], ch["end_page"])
        (CHAPTERS_DIR / f"{chapter_id}.txt").write_text(text, encoding="utf-8")

        word_count = len(text.split())
        entry = {
            "chapter_id": chapter_id,
            "book_id": ch["book_id"],
            "part_id": ch["part_id"],
            "roman": ch["roman"],
            "title": ch["title"],
            "start_page": ch["start_page"],
            "end_page": ch["end_page"],
            "char_count": len(text),
            "word_count": word_count,
        }
        report["chapters"].append(entry)

        if word_count < 150:
            report["warnings"].append(
                f"{chapter_id} ('{ch['title']}') extracted only {word_count} words "
                f"from pages {ch['start_page']}-{ch['end_page']} -- check visually."
            )

    # Persist canonical structure (with resolved end_page) as JSON for downstream steps
    structure_out = {"books": [], "index_start_page": INDEX_START_PAGE, "total_pages": doc.page_count}
    for book in BOOKS:
        b = {k: v for k, v in book.items() if k != "parts"}
        b["parts"] = []
        for part in book["parts"]:
            p = {k: v for k, v in part.items() if k != "chapters"}
            p["chapters"] = []
            for ch in flat:
                if ch["part_id"] == part["id"]:
                    p["chapters"].append(
                        {
                            "id": slugify(ch["book_id"], ch["roman"]),
                            "roman": ch["roman"],
                            "title": ch["title"],
                            "start_page": ch["start_page"],
                            "end_page": ch["end_page"],
                        }
                    )
            b["parts"].append(p)
        structure_out["books"].append(b)

    (RAW_DIR / "structure.json").write_text(json.dumps(structure_out, indent=2), encoding="utf-8")
    (RAW_DIR / "extraction_report.json").write_text(json.dumps(report, indent=2), encoding="utf-8")

    print(f"Extracted {len(flat)} chapters from {doc.page_count}-page PDF.")
    print(f"Total words extracted: {sum(c['word_count'] for c in report['chapters']):,}")
    if report["warnings"]:
        print(f"WARNINGS ({len(report['warnings'])}):")
        for w in report["warnings"]:
            print("  -", w)
    else:
        print("No low-word-count warnings.")


if __name__ == "__main__":
    main()
