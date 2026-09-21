"""Shared helpers for the build_*.py consolidation scripts."""
import json
import re
import unicodedata
from pathlib import Path

ROOT = Path(__file__).parent.parent
CONTENT_DIR = ROOT / "data" / "content"
CHAPTERS_DIR = CONTENT_DIR / "chapters"
RAW_CHAPTERS_DIR = ROOT / "data" / "raw" / "chapters"


def slugify(name: str) -> str:
    name = unicodedata.normalize("NFKD", name).encode("ascii", "ignore").decode()
    name = name.lower().strip()
    name = re.sub(r"[^a-z0-9]+", "-", name)
    return name.strip("-")


def load_all_chapters() -> list[dict]:
    chapters = []
    for f in sorted(CHAPTERS_DIR.glob("*.json")):
        chapters.append(json.loads(f.read_text(encoding="utf-8")))
    chapters.sort(key=lambda c: c["start_page"])
    return chapters


def raw_text_for(chapter_id: str) -> str:
    f = RAW_CHAPTERS_DIR / f"{chapter_id}.txt"
    return f.read_text(encoding="utf-8") if f.exists() else ""


DATE_RE = re.compile(
    r"\(\s*([A-Za-z.]*\s*\d{1,4}\??\s*[-–]\s*[A-Za-z.]*\s*\d{1,4}\??\s*(?:B\.?C\.?)?)\s*\)"
)


def find_dates_near(text: str, name: str) -> str:
    """Best-effort: look for a '(YYYY-YYYY)' style date range within ~80 chars
    after the philosopher's name (as Russell typically writes it on first
    mention, e.g. 'HOBBES (1588-1679)'). Returns '' if none found -- we do
    not fabricate dates."""
    first_token = name.split()[-1].upper()  # surname is usually what's capitalized
    idx = text.upper().find(first_token)
    if idx == -1:
        idx = text.upper().find(name.upper())
    if idx == -1:
        return ""
    window = text[idx : idx + 100]
    m = DATE_RE.search(window)
    return m.group(1).strip() if m else ""


def write_json(path: Path, data) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")
