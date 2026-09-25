# Understanding Islamic Finance — Learning Platform

An offline-first, interactive MBA study companion built directly from
Muhammad Ayub's *Understanding Islamic Finance* (John Wiley & Sons). It
turns all 18 chapters into a structured learning system: progressive
lessons at three explanation levels, a glossary, spaced-repetition
flashcards, a quiz engine, adaptive practice, interactive transaction
diagrams, a comparison lab, case studies, a concept map, exam preparation
tools, and guided study modes (45-minute crash course, 90-minute revision,
3-hour deep study) — all tracked with real local progress data.

## What this app is (and isn't)

- It is a **textbook-based study tool**, grounded in the author's own
  terminology, structure, definitions, conditions, examples, and — in
  Chapter 17 — his treatment of common criticisms of Islamic banking.
- It is **not** a Shari'ah-fatwa engine. The Financing Mode Finder and Case
  Study Lab are explicitly labeled as educational tools based on this
  textbook, not professional or religious rulings.
- Any numeric example not drawn directly from the book is labeled
  **"Practice Example — generated for learning."**
- All study data (progress, notes, bookmarks, quiz history) stays in your
  browser's `localStorage`. Nothing is ever sent to a server.

## Running the app

No build step, no server required.

- **Standalone, double-click** (simplest way to just use it or share it):
  open **`Understanding-Islamic-Finance-STANDALONE.html`** at the repo
  root — a single self-contained file with every stylesheet, data file and
  module inlined (~2.8 MB). Double-click it, or drag it into a browser tab.
  100% of the app's content and functionality is preserved; nothing is
  fetched externally. Regenerate it after any change to the modular source
  with:
  ```bash
  cd islamic-finance-learning
  node tools/build-standalone.js
  ```
- **Modular source** (for development): open `index.html` directly, or —
  to also enable the offline service worker and PWA install — serve the
  folder over HTTP:
  ```bash
  cd islamic-finance-learning
  python3 -m http.server 8080
  # then open http://localhost:8080
  ```
  Service workers require `http(s)://`, not `file://`. The modular
  `index.html` still works fully under `file://` (all its `<script src>`
  tags load fine there); it just won't cache itself for offline use that
  way — use the standalone build above for guaranteed offline-by-default
  behavior with zero setup.

## How the source book was processed

1. **Acquisition** (`textbook/Understanding-Islamic-Finance.pdf`) — the
   544-page PDF was downloaded from the user's own Google Drive and
   verified (valid PDF, correct author/title metadata, text-extractable).
2. **Extraction** (`source/extraction-notes/`) — full text was extracted
   page-by-page (`full-text.txt`), then split per chapter
   (`chapters/chNN.txt`) using a verified page-offset (`printed page + 28 =
   PDF page`) computed by cross-checking chapter start pages.
3. **Structure mapping** (`source/chapter-index.json`,
   `source/source-map.json`) — the book's own table of contents was parsed
   into an exact Part → Chapter → Section → Subsection → page tree (18
   chapters, 148 sections, 201 subsections), so every learning item can be
   traced back to a real page.
4. **Reference data** (`source/glossary-book.json`,
   `source/acronyms-book.json`) — the book's own back-matter Glossary (180
   terms) and Acronyms list (119 entries) were parsed directly from the
   extracted text.
5. **Knowledge-base authoring** (`data/chapters/chNN.js`,
   `data/flashcards/chNN.js`, `data/questions/chNN.js`) — each chapter's
   extracted text was read in full and transformed into structured topic
   objects (three explanation levels, definitions, conditions, examples,
   distinctions, common confusions, source citations) following
   `source/AUTHORING_GUIDE.md`, plus matching flashcards and quiz
   questions. Cross-cutting material (comparisons, case studies, concept
   map, decision tree, study-mode scripts, exam-answer-trainer sets) was
   authored per `source/CROSSCUTTING_GUIDE.md`.

If you want to regenerate or extend this content later, those two guide
files describe the exact data schema every view module expects — follow
them and re-run the same extraction pipeline (`source/extraction-notes/`)
against any updated source text.

## Project structure

```
islamic-finance-learning/
├── Understanding-Islamic-Finance-STANDALONE.html   # generated, double-click, offline, self-contained
├── index.html            # modular entry point (source of truth for development)
├── styles.css             # design system (spacing/type/color/dark-light)
├── app.js                 # bootstrap: sidebar, theme, search, router init
├── manifest.json, service-worker.js, icon.svg   # PWA / offline
├── tools/
│   └── build-standalone.js   # regenerates the STANDALONE.html bundle from the modular source
├── textbook/               # the source PDF
├── source/                 # extraction pipeline outputs + authoring guides
│   ├── chapter-index.json, source-map.json
│   ├── glossary-book.json, acronyms-book.json
│   ├── AUTHORING_GUIDE.md, CROSSCUTTING_GUIDE.md
│   └── extraction-notes/   # raw extracted text (not shipped to end users' study flow, used only during authoring)
├── data/                   # content + reference data (plain scripts, window.IFL_DATA)
│   ├── chapters/chNN.js, flashcards/chNN.js, questions/chNN.js
│   ├── glossary.js, comparisons.js, case-studies.js
│   ├── concept-map.js, decision-tree.js, study-modes.js, exam-prep.js
│   └── chapter-index.js
├── modules/                 # application logic (plain scripts, window.IFL*)
│   ├── dom.js, store.js, data.js, router.js, progress.js, search.js
│   └── views/                # one file per route/screen
└── tests/                   # content-integrity + Playwright browser checks
```

**Two ways to run the same app**: `index.html` is the modular source of
truth (edit this, and everything under `data/`, `modules/`, `styles.css`);
`Understanding-Islamic-Finance-STANDALONE.html` is a generated,
byte-for-byte-equivalent single file for distribution — after changing
anything in the modular source, re-run `node tools/build-standalone.js`
to refresh it.

No bundler, no `npm install`, no transpilation — every file is a plain
`<script>` tag loaded in dependency order from `index.html`, writing to a
shared global namespace (`window.IFL_DATA`, `window.IFLStore`,
`window.IFLData`, `window.IFLRouter`, etc.). This keeps the app runnable
directly from disk and trivially deployable as static files (e.g. GitHub
Pages).

## Data architecture

- **Content data** (`data/*.js`) is pure, static, textbook-derived data —
  no UI, no logic.
- **Application logic** (`modules/*.js`) reads that data through
  `IFLData` and never touches `localStorage` directly except via
  `IFLStore`.
- **User state** lives entirely in one versioned `localStorage` record
  (key `ifl_v1`, see `modules/store.js`) — progress, notes, bookmarks,
  settings, achievements. Imports are sanitized field-by-field (type
  checks, size caps, `__proto__`/`constructor` key stripping) before being
  merged in, so a malformed or malicious import file can't corrupt state
  or pollute prototypes.

## How progress works

- A **topic** is marked complete only when the student explicitly clicks
  "Mark Topic Complete" on that topic's page — opening a chapter does not
  complete it.
- A **chapter** is marked complete automatically once every topic in it is
  complete.
- **Quiz scores**, **flashcard review history** (a simple 6-box spaced
  scheduler — see `IFLProgress.recordFlashcardReview`), **weak topics**
  (derived from real per-question accuracy), **study streak**, and
  **achievements** are all computed from actual recorded interactions —
  nothing is fabricated or randomly seeded.

## Resetting / exporting / importing your data

In **Settings**:
- **Export My Study Data** downloads your full local state as JSON.
- **Import Study Data** restores it (validated and sanitized on import).
- **Reset All Progress** permanently wipes local state after a
  confirmation dialog.

## Known limitations

- PDF text extraction has minor OCR artifacts (stray spaces, diacritic
  marks on transliterated Arabic); the authoring guides instruct
  normalization to standard transliteration, but a small number of
  imperfections may remain in generated text.
- The concept map is rendered as a clickable grouped list rather than a
  freeform node-graph canvas, for accessibility and small-screen
  robustness.
- The Financing Mode Finder and Case Study Lab are educational tools
  modeled on the textbook's own conditions — they are not exhaustive
  Shari'ah rulings and should never be used as such.
- Content generation was performed by parallel authoring passes over the
  extracted text; if you spot a citation or definition that looks off
  against your own copy of the book, treat the printed book as
  authoritative and file a correction.
