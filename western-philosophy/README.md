# Western Philosophy — A Study Companion

A university-level self-study platform built from Bertrand Russell's *A
History of Western Philosophy* (1945): a chapter-by-chapter interactive
textbook, philosopher/concept/school reference, timeline, knowledge graph,
spaced-repetition flashcards, and exam-style practice — all generated from
and traceable back to the actual pages of the book.

This lives inside the `marketwise-pakistan` repository as a separate,
self-contained project (it does not touch the existing MarketWise app at
the repo root).

## Running the app

```bash
cd western-philosophy/web
npm install   # first time only
npm run dev   # http://localhost:3000
```

Production build (runs `next start`, a small Node server):

```bash
cd western-philosophy/web
npm run build
npm start
```

## Standalone static export (no server required)

`next.config.ts` sets `output: "export"`, so `next build` also emits a
plain folder of static HTML/CSS/JS at `western-philosophy/web/out/` — 817
pre-rendered pages (every chapter, philosopher, concept, school, plus the
static routes), each fully self-contained with no Node process needed to
serve them:

```bash
cd western-philosophy/web
npm run build          # generates ./out
npx serve out           # or: python3 -m http.server 8080 --directory out
```

`out/` is regenerated on every build and is gitignored (like
`node_modules`/`.next`) rather than committed — treat it the same as any
other build artifact. Deploy it to any static host (GitHub Pages, Netlify,
S3 + CloudFront, Nginx, etc.) by copying `out/`'s contents to the host's
web root. If it's deployed under a sub-path (e.g.
`your-domain.com/western-philosophy/` alongside the existing MarketWise
app rather than at the domain root), add `basePath: "/western-philosophy"`
to `next.config.ts` before building, so internal links resolve correctly.

## Rebuilding the educational dataset from the PDF

The pipeline is: extract raw text → (content-generation pass, currently
agent-assisted) → consolidate cross-chapter entities → sync into the web
app.

```bash
cd western-philosophy

# 1. Re-extract raw chapter text + structure from the PDF (idempotent;
#    only needed if the source PDF changes)
python3 scripts/extract_pdf.py source/history_of_western_philosophy.pdf

# 2. Generate data/content/chapters/<chapter_id>.json for each chapter.
#    This step is currently done by prompting an LLM agent per batch of
#    chapters against data/content/CHAPTER_SCHEMA.md and the raw text in
#    data/raw/chapters/ -- see that file for the exact schema/instructions
#    an agent (or a human) needs to follow. There is no fully-automatic
#    script for this step by design: faithful, non-fabricated educational
#    writing needs a synthesis step, not string manipulation.

# 3. Once chapter JSON exists, consolidate philosophers/concepts/schools/
#    glossary/timeline/graph, build the SQLite database, sync into the web
#    app, and print a coverage report:
bash scripts/build_all.sh
```

Individual steps (`build_philosophers.py`, `build_concepts.py`,
`build_schools.py`, `build_glossary.py`, `build_timeline.py`,
`build_graph.py`, `build_database.py`, `sync_content_to_web.py`,
`validate_content.py`, `coverage_report.py`) can also be run on their own
from `western-philosophy/scripts/`.

## Project structure

```
western-philosophy/
  source/                          the source PDF
  data/
    raw/                           extracted raw text, one file per chapter
      structure.json                verified book/part/chapter map + page ranges
      chapters/<id>.txt
      front_matter/{preface,introduction,book_2_introduction}.txt
      back_of_book_index.txt        the book's own alphabetical index (real page refs)
    content/                       generated educational content (the "database" in JSON form)
      CHAPTER_SCHEMA.md             schema + instructions for per-chapter content
      DATA_MODEL.md                 schema for cross-chapter entities
      chapters/<id>.json
      philosophers/<slug>.json
      concepts/<slug>.json
      schools/<slug>.json
      glossary/glossary.json
      timeline/events.json
      graph/relationships.json
    db/philosophy.sqlite            same dataset, queryable via SQL
  scripts/                         the ingestion + consolidation pipeline (see above)
  web/                             the Next.js app
    src/app/                        routes (App Router)
    src/components/                 UI + interactive widgets
    src/lib/                        types, content loaders, local-first progress store
    content/, structure.json        synced copies of data/content and data/raw/structure.json
```

## Design principles this app follows

- **Three layers, never merged**: every chapter distinguishes what Russell
  says (`russell_presentation`), original pedagogical explanation, and
  clearly-labeled critical/interpretive context.
- **Source traceability**: every chapter, question, and quiz item carries
  the PDF page range it came from.
- **No fabrication**: philosopher dates, quotations, and claims are only
  included when the source text supports them; unparseable/unsupported
  fields are left empty rather than invented. `extraction_confidence` on
  each chapter flags anything uncertain.
- **Local-first progress**: all learner data (completion, quiz scores,
  flashcard schedule, notes, bookmarks) lives in `localStorage` only.
- **Copyright-safe**: the app teaches *from* the book (original summaries,
  explanations, questions) rather than reproducing it; quotations are
  short and attributed.

## Known limitations

As of the last full pipeline run (see `COVERAGE_REPORT.md`, generated by
`scripts/coverage_report.py`): all 76/76 chapters generated and passing
`scripts/validate_content.py`; 192 philosopher profiles, 370 concepts, 161
schools, 508 active-recall questions, 666 quiz questions, 1,037 flashcards,
178 essay prompts, 330 glossary terms, 21 timeline events, 1,085
knowledge-graph relationships.

- Philosopher/concept/school profiles are built by *mechanically*
  consolidating already-generated chapter content (see
  `scripts/build_philosophers.py` etc.) rather than by a fresh synthesis
  pass, to keep every claim traceable to a chapter's own text. This means
  fields like `predecessors`/`successors`/`disagreements` are populated by
  heuristic name-matching against the `connections_to_*` prose and may
  miss some real relationships or (rarely) include a spurious one.
- Because different chapter-generation passes referred to the same person
  by different name forms (e.g. "Hegel" vs "G. W. F. Hegel"),
  `build_philosophers.py` includes a manually-curated `ALIAS_MAP` built by
  inspecting the actual duplicate slugs this pipeline produced, plus a
  `COMPOUND_SPLIT_MAP` for chapter mentions phrased as "X and Y" (e.g.
  "Socrates and Plato") that would otherwise become a fictitious third
  "person". This list was reviewed once against the generated dataset; a
  future re-run with substantially different chapter content should
  re-check for new aliases the same way (`scripts/validate_content.py`
  doesn't currently catch this class of issue — check for name-collision
  groups manually, e.g. by grouping philosopher profiles by surname).
  Three surname collisions were deliberately left unmerged because they
  are genuinely different people (Francis Bacon vs. Roger Bacon; Gregory
  the Great vs. Gregory VII; James Mill vs. John Stuart Mill).
- School names are normalized by stripping editorial parentheticals (e.g.
  "Cynicism (anticipated)" → "Cynicism") before deduping, since chapters
  described schools with free-text qualifiers rather than a short
  canonical name. Even after this, some schools remain fairly granular
  (161 total) — this mirrors how specifically Russell's own text names
  sub-movements and doctrinal variants, not a bug, but it means the
  Schools page is closer to "every named doctrine/movement" than a
  textbook's tidy list of ~20 major schools.
- School membership (which philosophers belong to a school) is derived
  from each philosopher profile's own `school` field, which is only set
  when that philosopher was the *primary subject* of a chapter. A
  philosopher who is a member of a school but never the primary subject
  of any chapter (rare, but possible for minor figures) won't show up in
  that school's philosopher list.
- Timeline events only exist for philosophers whose dates could be parsed
  out of Russell's own text (e.g. "HOBBES (1588-1679)"); philosophers
  Russell doesn't date inline won't appear on the timeline (21 of 192
  profiles have one).
- The knowledge graph currently models philosopher↔philosopher and
  philosopher↔school relationships; concept-to-concept edges are not yet
  populated. Bertrand Russell, Plato, and Aristotle are the highest-degree
  nodes — this reflects the book's own structure (Russell repeatedly
  draws forward-looking lines from earlier chapters to his own concluding
  "Philosophy of Logical Analysis" chapter), not a data-quality bug.
- "Sections" below chapter level are not separately modeled — Russell's
  chapters mostly don't have numbered subheadings, so the chapter is the
  finest structural unit; in-chapter navigation instead uses the fixed
  12-lesson sequence.
- A handful of chapters have `extraction_confidence: "medium"` where the
  source PDF's OCR text had a genuinely corrupted passage (noted per
  chapter) or where the raw chapter text was truncated at a natural
  chapter/part boundary; no content was invented to fill these gaps.
- The "Teach Me" and "Socratic" tutor modes described in the original
  spec (conversational Q&A grounded in the structured dataset) are not
  yet implemented as a separate UI mode — the structured content (study
  notes, questions, concepts) needed to power them exists, but the
  conversational interface itself is future work.
