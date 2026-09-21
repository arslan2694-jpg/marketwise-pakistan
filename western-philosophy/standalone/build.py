#!/usr/bin/env python3
"""
Assembles the standalone, double-clickable single-file build of the
Western Philosophy Study Companion: reads every generated content JSON
file plus the hand-written CSS/JS, and inlines all of it into one .html
file with zero external requests (no CDN, no fetch, no server).

Usage: python3 build.py
Output: dist/western-philosophy-standalone.html
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).parent
PROJECT_ROOT = ROOT.parent
CONTENT_DIR = PROJECT_ROOT / "data" / "content"
RAW_DIR = PROJECT_ROOT / "data" / "raw"
SRC_DIR = ROOT / "src"
DIST_DIR = ROOT / "dist"


def load_json(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))


def load_dir_by_key(dir_path: Path, key: str) -> dict:
    out = {}
    if not dir_path.exists():
        return out
    for f in sorted(dir_path.glob("*.json")):
        data = load_json(f)
        out[data[key]] = data
    return out


def safe_json_for_script_tag(data) -> str:
    """JSON-encode then neutralize '</' so embedded content can never
    prematurely close the enclosing <script> tag."""
    raw = json.dumps(data, ensure_ascii=False, separators=(",", ":"))
    return raw.replace("</", "<\\/")


def main():
    structure = load_json(RAW_DIR / "structure.json")
    chapters = load_dir_by_key(CONTENT_DIR / "chapters", "chapter_id")
    philosophers = load_dir_by_key(CONTENT_DIR / "philosophers", "slug")
    concepts = load_dir_by_key(CONTENT_DIR / "concepts", "slug")
    schools = load_dir_by_key(CONTENT_DIR / "schools", "slug")

    glossary_file = CONTENT_DIR / "glossary" / "glossary.json"
    timeline_file = CONTENT_DIR / "timeline" / "events.json"
    graph_file = CONTENT_DIR / "graph" / "relationships.json"
    glossary = load_json(glossary_file) if glossary_file.exists() else []
    timeline = load_json(timeline_file) if timeline_file.exists() else []
    graph = load_json(graph_file) if graph_file.exists() else []

    bundle = {
        "structure": structure,
        "chapters": chapters,
        "philosophers": philosophers,
        "concepts": concepts,
        "schools": schools,
        "glossary": glossary,
        "timeline": timeline,
        "graph": graph,
    }

    template = (SRC_DIR / "index.template.html").read_text(encoding="utf-8")
    styles = (SRC_DIR / "styles.css").read_text(encoding="utf-8")
    app_js = (SRC_DIR / "app.js").read_text(encoding="utf-8")
    data_js = safe_json_for_script_tag(bundle)

    # Guard against the JS/CSS itself containing a literal "</script>"
    # (none currently do, but keep the assembly safe if edited later).
    app_js_safe = app_js.replace("</script>", "<\\/script>")

    html = template
    html = html.replace("/*__STYLES__*/", styles)
    html = html.replace("/*__DATA__*/{}", data_js)
    html = html.replace("/*__APP__*/", app_js_safe)

    DIST_DIR.mkdir(parents=True, exist_ok=True)
    out_path = DIST_DIR / "western-philosophy-standalone.html"
    out_path.write_text(html, encoding="utf-8")

    size_mb = out_path.stat().st_size / (1024 * 1024)
    print(f"Wrote {out_path} ({size_mb:.1f} MB)")
    print(f"  chapters: {len(chapters)}  philosophers: {len(philosophers)}  concepts: {len(concepts)}")
    print(f"  schools: {len(schools)}  glossary: {len(glossary)}  timeline: {len(timeline)}  graph: {len(graph)}")


if __name__ == "__main__":
    main()
