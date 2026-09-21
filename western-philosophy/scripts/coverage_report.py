#!/usr/bin/env python3
"""
Phase 22 coverage report: counts every major entity in the generated
dataset and writes a human-readable summary to COVERAGE_REPORT.md at the
project root, plus prints it to stdout.
"""
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from consolidate_common import CONTENT_DIR
from book_structure import TOTAL_PAGES, flatten_chapters

ROOT = Path(__file__).parent.parent


def count_dir(rel: str) -> int:
    d = CONTENT_DIR / rel
    return len(list(d.glob("*.json"))) if d.exists() else 0


def count_json_array(rel_path: str) -> int:
    f = CONTENT_DIR / rel_path
    if not f.exists():
        return 0
    return len(json.loads(f.read_text(encoding="utf-8")))


def sum_field_across_chapters(field: str) -> int:
    total = 0
    for f in (CONTENT_DIR / "chapters").glob("*.json"):
        data = json.loads(f.read_text(encoding="utf-8"))
        total += len(data.get(field, []))
    return total


def main():
    total_chapters_expected = len(flatten_chapters())
    total_chapters_generated = count_dir("chapters")

    report = {
        "Total PDF pages processed": TOTAL_PAGES,
        "Total chapters expected (from verified body headings)": total_chapters_expected,
        "Total chapters with generated content": total_chapters_generated,
        "Total philosophers": count_dir("philosophers"),
        "Total concepts": count_dir("concepts"),
        "Total schools": count_dir("schools"),
        "Total arguments (across all chapters)": sum_field_across_chapters("arguments"),
        "Total active-recall questions": sum_field_across_chapters("questions"),
        "Total quiz questions": sum_field_across_chapters("quiz"),
        "Total flashcards": sum_field_across_chapters("flashcards"),
        "Total essay prompts": sum_field_across_chapters("essay_prompts"),
        "Total glossary terms": count_json_array("glossary/glossary.json"),
        "Total timeline events": count_json_array("timeline/events.json"),
        "Total knowledge-graph relationships": count_json_array("graph/relationships.json"),
    }

    lines = ["# Coverage Report", ""]
    for k, v in report.items():
        lines.append(f"- **{k}**: {v}")
    completion_pct = round(100 * total_chapters_generated / total_chapters_expected, 1)
    lines.append("")
    lines.append(f"Chapter content completion: **{completion_pct}%** ({total_chapters_generated}/{total_chapters_expected})")

    text = "\n".join(lines)
    print(text)
    (ROOT / "COVERAGE_REPORT.md").write_text(text + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
