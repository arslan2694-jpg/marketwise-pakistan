#!/usr/bin/env python3
"""
Assemble every generated JSON file into a single SQLite database at
data/db/philosophy.sqlite, per the spec's "structured JSON/SQLite for the
educational dataset" requirement. The Next.js app reads the JSON files
directly (simpler for a statically-generated site); this database is the
portable/queryable artifact for anyone who wants to explore the dataset
with SQL instead, and it's what scripts/coverage_report.py counts against.

Run this LAST, after build_philosophers.py / build_concepts.py /
build_schools.py / build_timeline.py / build_graph.py / build_glossary.py.
"""
import json
import sqlite3
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from consolidate_common import CONTENT_DIR

ROOT = Path(__file__).parent.parent
DB_PATH = ROOT / "data" / "db" / "philosophy.sqlite"

SCHEMA = """
CREATE TABLE book (id TEXT PRIMARY KEY, title TEXT, "order" INTEGER, start_page INTEGER);
CREATE TABLE part (id TEXT PRIMARY KEY, book_id TEXT, title TEXT, "order" INTEGER, start_page INTEGER);
CREATE TABLE chapter (
  id TEXT PRIMARY KEY, book_id TEXT, part_id TEXT, roman TEXT, title TEXT,
  start_page INTEGER, end_page INTEGER, orientation TEXT, historical_background TEXT,
  russell_presentation TEXT, critical_context TEXT, study_notes TEXT,
  extraction_confidence TEXT
);
CREATE TABLE philosopher (
  slug TEXT PRIMARY KEY, name TEXT, era TEXT, dates TEXT, geography TEXT, school TEXT,
  biography TEXT, central_doctrines TEXT, ethics TEXT, politics TEXT, metaphysics TEXT,
  epistemology TEXT, philosophy_of_science TEXT, religion_theology TEXT,
  russell_view TEXT, why_this_matters TEXT, extraction_confidence TEXT
);
CREATE TABLE philosopher_chapter (philosopher_slug TEXT, chapter_id TEXT, role TEXT, is_primary INTEGER);
CREATE TABLE concept (
  slug TEXT PRIMARY KEY, name TEXT, plain_explanation TEXT, precise_definition TEXT,
  why_it_mattered TEXT, historical_origin TEXT, associated_philosopher TEXT, is_major INTEGER
);
CREATE TABLE concept_chapter (concept_slug TEXT, chapter_id TEXT);
CREATE TABLE school (slug TEXT PRIMARY KEY, name TEXT, period TEXT);
CREATE TABLE school_philosopher (school_slug TEXT, philosopher_slug TEXT);
CREATE TABLE argument (
  id INTEGER PRIMARY KEY AUTOINCREMENT, chapter_id TEXT, title TEXT, philosopher TEXT,
  premises TEXT, conclusion TEXT, explanation TEXT
);
CREATE TABLE glossary_term (slug TEXT PRIMARY KEY, term TEXT, beginner_explanation TEXT, academic_explanation TEXT);
CREATE TABLE quiz_question (
  id INTEGER PRIMARY KEY AUTOINCREMENT, chapter_id TEXT, type TEXT, difficulty TEXT,
  prompt TEXT, options TEXT, correct_index INTEGER, correct_answer TEXT, explanation TEXT, source_page INTEGER
);
CREATE TABLE flashcard (
  id INTEGER PRIMARY KEY AUTOINCREMENT, chapter_id TEXT, front TEXT, back TEXT, category TEXT
);
CREATE TABLE timeline_event (
  id TEXT PRIMARY KEY, name TEXT, date TEXT, date_sort INTEGER, description TEXT
);
CREATE TABLE relationship (
  id INTEGER PRIMARY KEY AUTOINCREMENT, from_id TEXT, from_type TEXT, relationship TEXT,
  to_id TEXT, to_type TEXT, explanation TEXT, source_chapter TEXT
);
"""


def main():
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    if DB_PATH.exists():
        DB_PATH.unlink()
    conn = sqlite3.connect(DB_PATH)
    conn.executescript(SCHEMA)

    structure = json.loads((ROOT / "data" / "raw" / "structure.json").read_text())
    for book in structure["books"]:
        conn.execute(
            "INSERT INTO book VALUES (?,?,?,?)",
            (book["id"], book["title"], book["order"], book["start_page"]),
        )
        for part in book["parts"]:
            conn.execute(
                "INSERT INTO part VALUES (?,?,?,?,?)",
                (part["id"], book["id"], part["title"], part["order"], part["start_page"]),
            )

    chapters_dir = CONTENT_DIR / "chapters"
    for f in sorted(chapters_dir.glob("*.json")):
        ch = json.loads(f.read_text(encoding="utf-8"))
        conn.execute(
            "INSERT INTO chapter VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
            (
                ch["chapter_id"], ch["book_id"], ch["part_id"], ch["roman"], ch["title"],
                ch["start_page"], ch["end_page"], ch["orientation"], ch["historical_background"],
                ch["russell_presentation"], ch["critical_context"], ch["study_notes"],
                ch["extraction_confidence"],
            ),
        )
        for p in ch.get("philosophers_discussed", []):
            from consolidate_common import slugify
            conn.execute(
                "INSERT INTO philosopher_chapter VALUES (?,?,?,?)",
                (slugify(p["name"]), ch["chapter_id"], p["role_in_chapter"], int(p.get("is_primary_subject", False))),
            )
        for c in ch.get("core_concepts", []):
            from consolidate_common import slugify
            conn.execute("INSERT INTO concept_chapter VALUES (?,?)", (slugify(c["name"]), ch["chapter_id"]))
        for a in ch.get("arguments", []):
            conn.execute(
                "INSERT INTO argument (chapter_id, title, philosopher, premises, conclusion, explanation) VALUES (?,?,?,?,?,?)",
                (ch["chapter_id"], a["title"], a["philosopher"], json.dumps(a["premises"]), a["conclusion"], a["explanation"]),
            )
        for q in ch.get("quiz", []):
            conn.execute(
                "INSERT INTO quiz_question (chapter_id, type, difficulty, prompt, options, correct_index, correct_answer, explanation, source_page) VALUES (?,?,?,?,?,?,?,?,?)",
                (
                    ch["chapter_id"], q["type"], q["difficulty"], q["prompt"],
                    json.dumps(q.get("options")), q.get("correct_index"), q.get("correct_answer"),
                    q["explanation"], q.get("source_page"),
                ),
            )
        for fc in ch.get("flashcards", []):
            conn.execute(
                "INSERT INTO flashcard (chapter_id, front, back, category) VALUES (?,?,?,?)",
                (ch["chapter_id"], fc["front"], fc["back"], fc["category"]),
            )

    phil_dir = CONTENT_DIR / "philosophers"
    if phil_dir.exists():
        for f in sorted(phil_dir.glob("*.json")):
            p = json.loads(f.read_text(encoding="utf-8"))
            conn.execute(
                "INSERT INTO philosopher VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
                (
                    p["slug"], p["name"], p["era"], p["dates"], p["geography"], p["school"],
                    p["biography"], p["central_doctrines"], p["ethics"], p["politics"],
                    p["metaphysics"], p["epistemology"], p["philosophy_of_science"],
                    p["religion_theology"], p["russell_view"], p["why_this_matters"],
                    p["extraction_confidence"],
                ),
            )

    concepts_dir = CONTENT_DIR / "concepts"
    if concepts_dir.exists():
        for f in sorted(concepts_dir.glob("*.json")):
            c = json.loads(f.read_text(encoding="utf-8"))
            conn.execute(
                "INSERT INTO concept VALUES (?,?,?,?,?,?,?,?)",
                (
                    c["slug"], c["name"], c["plain_explanation"], c["precise_definition"],
                    c["why_it_mattered"], c["historical_origin"], c["associated_philosopher"],
                    int(c.get("is_major", False)),
                ),
            )

    schools_dir = CONTENT_DIR / "schools"
    if schools_dir.exists():
        for f in sorted(schools_dir.glob("*.json")):
            s = json.loads(f.read_text(encoding="utf-8"))
            conn.execute("INSERT INTO school VALUES (?,?,?)", (s["slug"], s["name"], s["period"]))
            for pslug in s.get("philosophers", []):
                conn.execute("INSERT INTO school_philosopher VALUES (?,?)", (s["slug"], pslug))

    glossary_file = CONTENT_DIR / "glossary" / "glossary.json"
    if glossary_file.exists():
        for g in json.loads(glossary_file.read_text()):
            conn.execute(
                "INSERT INTO glossary_term VALUES (?,?,?,?)",
                (g["slug"], g["term"], g["beginner_explanation"], g["academic_explanation"]),
            )

    events_file = CONTENT_DIR / "timeline" / "events.json"
    if events_file.exists():
        for e in json.loads(events_file.read_text()):
            conn.execute(
                "INSERT INTO timeline_event VALUES (?,?,?,?,?)",
                (e["id"], e["name"], e["date"], e["date_sort"], e["description"]),
            )

    rel_file = CONTENT_DIR / "graph" / "relationships.json"
    if rel_file.exists():
        for r in json.loads(rel_file.read_text()):
            conn.execute(
                "INSERT INTO relationship (from_id, from_type, relationship, to_id, to_type, explanation, source_chapter) VALUES (?,?,?,?,?,?,?)",
                (r["from"], r["from_type"], r["relationship"], r["to"], r["to_type"], r["explanation"], r["source_chapter"]),
            )

    conn.commit()

    counts = {}
    for table in ["book", "part", "chapter", "philosopher", "concept", "school", "argument", "glossary_term", "quiz_question", "flashcard", "timeline_event", "relationship"]:
        counts[table] = conn.execute(f"SELECT COUNT(*) FROM {table}").fetchone()[0]
    conn.close()

    print(f"Built {DB_PATH}")
    for table, n in counts.items():
        print(f"  {table}: {n}")


if __name__ == "__main__":
    main()
