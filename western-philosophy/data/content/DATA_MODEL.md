# Knowledge model — cross-chapter entities

Per-chapter content lives at `data/content/chapters/<chapter_id>.json`
(see `CHAPTER_SCHEMA.md`). This file defines the entities that are
*derived by consolidating across chapters* rather than authored per-chapter.
They are built in a second pass, after chapter JSON exists, by reading the
`philosophers_discussed` / `core_concepts` / `schools_discussed` /
`arguments` arrays across all 76 chapter files plus the raw chapter text
(and, where useful, the book's own back-of-book index at
`data/raw/back_of_book_index.txt` for real cross-reference page numbers).

All IDs are kebab-case slugs. All entities carry `source_pages: [{chapter_id, page}]` — never a fabricated page number.

## Philosopher — `data/content/philosophers/<slug>.json`

```jsonc
{
  "slug": "heraclitus",
  "name": "Heraclitus",
  "era": "Pre-Socratic",
  "dates": "c. 535 - c. 475 BC",
  "geography": "Ephesus, Ionia",
  "school": "Ionian philosophy",
  "major_ideas": ["Universal flux", "Unity of opposites", "Logos"],
  "works": ["On Nature (fragments only)"],
  "philosophical_domains": ["metaphysics", "epistemology"],
  "biography": "Layer 2 — original synthesis from the chapter(s).",
  "central_doctrines": "...",
  "key_arguments": ["slug refs into arguments/*.json"],
  "terminology": ["Flux", "Logos"],
  "ethics": "", "politics": "", "metaphysics": "...", "epistemology": "...",
  "philosophy_of_science": "", "religion_theology": "",
  "predecessors": ["thales", "anaximander"],
  "influences_on_predecessors_note": "",
  "successors": ["parmenides"],
  "disagreements": [{"with": "parmenides", "about": "whether change is real"}],
  "notable_quotations": [{"text": "You cannot step into the same river twice (paraphrase).", "attribution": "as reported by Russell, ch. IV", "is_paraphrase": true}],
  "russell_view": "Layer 1 — what Russell thinks of this philosopher, explicitly.",
  "why_this_matters": "Layer 2.",
  "appears_in_chapters": [{"chapter_id": "book-1-ch-iv", "role": "primary subject"}, {"chapter_id": "book-1-ch-v", "role": "mentioned"}],
  "extraction_confidence": "high"
}
```

## Concept — `data/content/concepts/<slug>.json`
Same shape as a chapter's `core_concepts` entry (see CHAPTER_SCHEMA.md) plus:
`slug`, `related_concepts: [slug]`, `appears_in_chapters: [chapter_id]`, `evolution` (ordered list of `{philosopher, treatment}` showing how the concept changed hands across the book — "concept evolution" per spec Phase 11).

## School — `data/content/schools/<slug>.json`
```jsonc
{ "slug": "stoicism", "name": "Stoicism", "period": "c. 300 BC - 200 AD",
  "doctrines": ["..."], "philosophers": ["zeno-of-citium", "chrysippus", "seneca", "epictetus", "marcus-aurelius"],
  "predecessor_schools": ["cynicism"], "successor_influence": ["christian-ethics"],
  "appears_in_chapters": ["book-1-ch-xxviii"] }
```

## Argument — `data/content/arguments/<slug>.json`
Same shape as a chapter's `arguments` entry, plus `slug`, `chapter_id`, `philosopher_slug`.

## Event — `data/content/timeline/events.json` (single array)
```jsonc
{ "id": "death-of-socrates", "name": "Trial and death of Socrates", "date": "399 BC",
  "date_sort": -399, "category": ["philosophy", "politics"], "description": "...",
  "related_philosophers": ["socrates"], "related_chapters": ["book-1-ch-xi"] }
```
`category` values: `philosophy | politics | religion | science | culture`. `date_sort` is a signed integer (negative = BC) used for chronological sorting/filtering.

## Relationship — `data/content/graph/relationships.json` (single array)
```jsonc
{ "from": "parmenides", "from_type": "philosopher", "relationship": "responded_to",
  "to": "heraclitus", "to_type": "philosopher",
  "explanation": "...", "source_chapter": "book-1-ch-v" }
```
`relationship` values: `influenced | criticized | rejected | developed | anticipated | responded_to | borrowed_from | opposed | continued | transformed | historically_contextualized_by`. `*_type` values: `philosopher | school | concept`.

## Glossary — `data/content/glossary/glossary.json` (single array, deduped)
Merge of every chapter's `glossary_terms`, deduped by lowercase term, unioning `related_concepts` and `appears_in_chapters`.

## Build order for this pass
1. All 76 chapter JSON files exist and pass `scripts/validate_content.py`.
2. `scripts/build_philosophers.py` — walk chapters, group `philosophers_discussed`, synthesize one profile JSON per distinct philosopher.
3. `scripts/build_concepts.py`, `scripts/build_schools.py`, `scripts/build_arguments.py` — analogous.
4. `scripts/build_timeline.py` — pull explicit dates from chapter text/content.
5. `scripts/build_graph.py` — pull `predecessors`/`successors`/`disagreements` off philosopher profiles into the relationships array.
6. `scripts/build_glossary.py` — dedupe glossary terms.
7. `scripts/build_database.py` — assemble everything into `data/db/philosophy.sqlite` and `web/src/generated/*.json` for the Next.js app.
