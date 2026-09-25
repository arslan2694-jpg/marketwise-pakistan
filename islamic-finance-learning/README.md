# Islamic Finance Learning

An offline-first, interactive study platform for **Muhammad Ayub, *Understanding Islamic Finance*** (John Wiley & Sons, Wiley Finance Series). It is built for an MBA Finance (Semester 4) student preparing for an Islamic Finance examination.

The whole book is covered, all 18 chapters across its three parts: foundations, contracts, and products and markets. Each chapter is broken into study topics that follow the book's own section numbering. Every piece of content is paraphrased and carries the chapter, section and printed page it came from.

> Educational tool based on Muhammad Ayub's textbook; not a Shariah ruling or professional advice.

---

## What the application does

| Area | What you get |
|---|---|
| **Dashboard** | Course completion, chapters and topics done, quiz average, flashcards reviewed and due, streak, study time, weak topics, exam readiness per Part, recent activity, bookmarks, and "Recommended next". Every figure comes from your own activity; nothing is estimated or pre-filled. |
| **Learn** | 18 chapter pages (overview, objectives, why it matters, sections, definitions, summary, quiz, flashcards) and 311 topic lessons. Each lesson has Beginner / MBA / Exam levels, four "Explain again" modes, conditions, principles, steps, examples, distinctions, common confusions, and the author's discussion of criticisms. There is a quick check, a source footer with "View source context", and **Teach me**, a guided walk through the topic. |
| **Explore** | Concept map (37 concepts along the book's spine, from the Islamic economic system through to Takaful). Glossary (191 book terms plus chapter definitions, with search, A–Z, categories, related terms and bookmarks). 13 step-through transaction diagrams. Comparison lab (12 modes × 12 aspects, plus 18 paired comparisons). **Which mode applies?**, a decision tree with the disclaimer above. |
| **Practise** | Flashcards: 284 cards in chapter and category decks, with a deterministic spaced-review schedule (Again / Hard / Good / Easy). Quiz builder and 236 questions in 11 types, plus 311 quick checks. Every question has an answer, explanation, source, learning objective and a "Review topic" link. Adaptive practice driven by your answer history. 11 case studies. |
| **Exam** | Exam centre with priority tiers, an answer trainer (88 questions with expected structure, key concepts, essential points and common mistakes), and rapid revision cards. |
| **Guided study** | 45-minute crash course, 90-minute revision and 3-hour deep study. Each has a countdown, the current section, a completion track, and previous / next / skip / pause / resume. Your position is saved. |
| **Tools** | Global search, notes (with timestamps and search), bookmarks by type, a study timer (Pomodoro, 45, 60 or custom minutes, running across pages), a progress page with achievements, and 14 calculators. Calculators with invented numbers are labelled "Practice Example — generated for learning". |
| **Settings** | Light / dark / system theme, text size, reduced motion, default explanation level, daily goal, and export / import / reset of your data. |

Keyboard: `/` focuses search. In quizzes, `A`–`D` or `1`–`4` answer and `Enter` moves on. In flashcards, `Space` flips and `1`–`4` grade. On revision cards, `←` and `→` move between cards. `Esc` closes dialogs.

---

## How to run it

**Option 1: open the file.** Double-click `index.html` or open it in a browser (`file://`). Everything works this way, including progress saving. The app is plain HTML, CSS and JavaScript loaded as classic scripts, with no build step and no dependencies.

**Option 2: serve it locally.** This turns on the installable PWA and offline cache:

```bash
cd islamic-finance-learning
npx http-server -c-1 -p 8080 .       # or: npm start  /  python3 -m http.server 8080
# open http://localhost:8080
```

Browsers register the service worker only over `http(s)`. Once a page has loaded, every app file is cached and the app works without a connection. The textbook PDF is deliberately not cached.

### The textbook PDF

The spec places the book at `textbook/Understanding-Islamic-Finance.pdf`. The PDF is **copyrighted**, so it is listed in `.gitignore` and is **not committed**. The full text extracted from it is also git-ignored. To get the PDF locally:

```bash
tools/fetch-textbook.sh      # downloads the course copy from Google Drive and checks the file is a PDF
```

The app does not need the PDF. When the PDF is present, the "View source context" dialog can open it at the cited page (printed page + 28 = PDF page).

---

## How the source book was processed

1. **Extraction.** `tools/extract_source.py` (PyMuPDF) reads the PDF and verifies it. Its outputs:
   - Text for each page and each chapter (git-ignored).
   - `source/source-map.json`: Part > Chapter > Section > Subsection, with printed page ranges.
   - `source/chapter-index.json`.

   Printed page numbers were checked against the running heads on every body page. The rule is **printed page = PDF page − 28**.
2. **Authoring.** Each chapter was read in full and written up as structured knowledge in `data/chapters/chNN.js`:
   - topics mapped 1:1 to the book's sections;
   - definitions, conditions, examples and tables;
   - the author's own positions on debates;
   - flashcards and questions.

   Content is **paraphrased**. Short, attributed quotations are kept only where exactness matters for an exam, such as formal definitions (e.g. AAOIFI's definition of Sukuk), Hadith and legal maxims. Nothing presents the platform's own interpretation as the author's view, and no Shariah rulings are invented. Where scholars differ, the book's own framing ("majority", "OIC Fiqh Academy", named scholars) is kept.
3. **Cross-chapter layers:**
   - the glossary, generated by `tools/build_glossary.py` from the book's glossary pages, with definitions paraphrased and page numbers looked up automatically;
   - concepts, diagrams, comparisons, case studies, the mode finder and study plans.

   Practice cases and calculator figures that are not in the book are labelled "generated for learning".
4. **Indexes:**
   - `tools/build-course-index.cjs` builds the small startup index;
   - `tools/build-indexes.cjs` builds `source/terminology-index.json` (266 terms) and `source/concept-index.json`.
5. **Audits:**
   - `tools/validate.cjs` checks structure, references and coverage against the source map;
   - `tools/audit-content.cjs` checks lesson depth;
   - `tools/audit-overlap.cjs` checks for verbatim runs copied from the extracted book text. It is a copyright guard: long passages fail it, and attributed quotations are excluded.

---

## Project structure

```text
islamic-finance-learning/
├── index.html              App shell (top bar, sidebar, view, bottom nav); loads scripts in order
├── styles.css              Design system: tokens for light/dark, layout, components, responsive rules
├── app.js                  Navigation, theme, mobile drawer, shortcuts, service-worker registration
├── manifest.json           PWA manifest
├── service-worker.js       Generated: precache list + cache-first strategy (tools/build-sw.cjs)
├── package.json            Convenience scripts only (no dependencies)
├── assets/icons/           icon.svg + rendered PNGs (tools/render-icons.cjs)
├── textbook/               Local copy of the PDF (git-ignored; tools/fetch-textbook.sh)
├── source/
│   ├── source-map.json         Book outline with printed pages (generated from the PDF)
│   ├── chapter-index.json      Chapter list, page ranges, section counts
│   ├── terminology-index.json  Term → chapters/topics/pages
│   ├── concept-index.json      Concept → topics/relations
│   └── extraction-notes/       pdf-info.json (+ git-ignored page/chapter text)
├── data/                   Textbook-derived content (no UI code)
│   ├── registry.js             IFL_DATA registry + lazy loader (script injection; works on file://)
│   ├── course-index.js         Generated: chapters, parts, topic tuples — the only content loaded at startup
│   ├── chapters/ch01–ch18.js   Per-chapter knowledge: topics, flashcards, questions, exam items
│   ├── glossary.js  concepts.js  diagrams.js  comparisons.js
│   ├── case-studies.js  mode-finder.js  study-plans.js
├── modules/                Application logic and UI
│   ├── util.js                 DOM builder, escaping, toast, accessible modal, formatting
│   ├── store.js                User state (localStorage key "ifl.v1"), export/import/reset
│   ├── progress.js             Completion, accuracy, weak topics, readiness, streaks, achievements, recommendations
│   ├── srs.js                  Spaced-review scheduler
│   ├── router.js               Hash router with lazy views and error handling
│   ├── components.js           Shared UI: question renderer (11 types), diagrams, concept cards, tables, source footer, notes/bookmarks
│   ├── calculators.js          14 worked calculators
│   ├── timer.js                Study timer
│   └── views/                  One file per page group (dashboard, learn, topic, glossary, flashcards, quiz,
│                               practice, cases, compare, diagrams, concept-map, finder, exam, guided,
│                               personal, search, settings)
├── tools/                  Build, validation and audit scripts (Node / Python)
└── tests/e2e.cjs           Browser tests (Playwright)
```

The suggested layout in the brief put flashcards and questions in separate files. They live inside each chapter file instead, so a chapter loads as one unit and its questions always sit beside the topics they test. The modules suggested there (quiz, glossary, notes and so on) are the files in `modules/views/`.

---

## Data architecture

The code is split into four layers that do not mix:

1. **Content** (`data/`) is pure data registered on `window.IFL_DATA` and contains no UI code. A chapter file looks like:
   ```js
   IFL_DATA.registerChapter({ number, title, part, pages, objectives, overview, summary,
     topics: [{ id: 't9.2', section: '9.2', title, pages: [214, 215], tier, intuition, simple,
                academic: [...], exam, keyPoints, definitions, conditions, principles, steps,
                examples, distinctions, confusions, debate, table, calc, related, concepts, quickCheck }],
     flashcards: [...], questions: [...], exam: [...] });
   ```
   Every question carries `type`, `diff` (E/M/H), `level` (recall … evaluate), `answer`, `explanation`, `obj` and `topic`. The `topic` field is what source labels and "Review topic" links are built from.
2. **Index.** `data/course-index.js` is the only content loaded at startup, about 40 KB. Chapters and the other datasets load on demand through `IFL_DATA.load([...])` / `loadChapter(n)`. Search and the glossary load all chapters the first time they are used.
3. **Logic** (`modules/*.js`) covers progress, scheduling, routing and calculators, all under `window.IFL`.
4. **User state** lives in a single JSON object in `localStorage["ifl.v1"]`:
   - `settings`, `topics` (visited / completed / time), `chapters`;
   - `answers` (per question: attempts, correct, last result), `attempts` (quiz history);
   - `cards` (schedule) and `reviews`;
   - `notes`, `bookmarks`, `activity`, `days` (seconds studied per day);
   - `timerSessions`, `guided` (position in each study plan), `exam` (answer drafts and self-ratings), `achievements`, `last`.

   Writes are debounced and flushed on page hide. If storage is blocked (e.g. some private modes), the app keeps working in memory and warns you.

**Privacy.** The app makes no network requests apart from its own files. It has no analytics, tracking, fonts or CDNs. Notes, progress and quiz data never leave the browser, and an automated test checks this.

---

## How progress works

- **Topic complete** happens only when you press **Mark complete**. Opening a topic marks it *visited*.
- **Chapter complete** means every topic in the chapter is complete. Part and course percentages are completed topics divided by total topics.
- **Quiz average** is total correct divided by total asked across all quiz attempts. It shows "—" until you take a quiz.
- **Accuracy per topic** comes from every question you have answered, including quick checks and practice.
  - **Weak topic:** accuracy below 70% after at least two answers, or when the latest answer was wrong.
  - **Mastered:** at least three answers with 85% or better.
- **Adaptive practice** ranks questions in this order: weak topics, missed questions, unseen questions from topics you have studied, then everything else. Mastered topics come up less often.
- **Exam readiness (per Part)** is 50% completion plus 50% accuracy. The accuracy half is scaled down until you have answered questions on a reasonable share of the Part's topics. It shows "not yet measured" until you answer something.
- **Flashcards** use an SM-2-style schedule:
  - *Again* brings the card back in 10 minutes and lowers its ease.
  - *Hard* multiplies the interval by 1.2.
  - *Good* goes 1 day, then 3 days, then interval × ease.
  - *Easy* gives a longer interval and raises ease.

  Each button shows the next interval before you press it.
- **Study time** counts while the app is visible and you are active; idle time is not counted. A **study day** is any day with at least one minute of study, and the **streak** is consecutive study days.
- **"What do I study next?"** looks at due flashcards, weak topics, the next unfinished chapter in book order, unfinished guided sessions and quiz history, and says *why* it recommends each item.

## How to reset data

**Settings → Your data → Reset all progress**, then confirm. This deletes completion, quiz history, flashcard schedules, notes, bookmarks, study time and achievements on this device. Appearance settings are kept. Export first if you might want the data back.

## How to export / import data

- **Export:** Settings → *Export my study data* downloads `islamic-finance-study-data-YYYY-MM-DD.json` with everything above, notes included.
- **Import:** Settings → *Import study data* → choose the file → confirm. This replaces the data on this device. The file is checked before anything is replaced, and an invalid file shows an error without changing anything.

Use export and import to move your progress to another browser or device, or to keep a backup.

---

## How to update textbook-derived content

1. Edit the relevant file in `data/`. For a chapter that is `data/chapters/chNN.js`; keep the topic `id`s stable, since progress is keyed by them. Regenerate the glossary with `python3 tools/build_glossary.py`, which needs the extracted text.
2. Rebuild the generated files: `npm run build`, which runs `build-course-index.cjs`, `build-indexes.cjs` and `build-sw.cjs`.
3. Validate: `npm run validate`. This runs:
   - **schema:** every question type, every cross-reference, study-plan continuity;
   - **coverage:** every source-map section and subsection is covered;
   - **placeholder scan** and **index freshness**;
   - **content-depth audit** and **copyright overlap audit**.
4. Test: `npm test`, which runs the validator and then the browser tests.

To re-derive the source map from the PDF: `tools/fetch-textbook.sh`, then `pip install pymupdf && python3 tools/extract_source.py`.

## Tests

- `node tools/validate.cjs` is a static check covering:
  - file integrity: required files, script references in `index.html`, service-worker precache entries;
  - HTML structure;
  - data schema, reference integrity and coverage.
- `node tests/e2e.cjs [filter]` runs the Playwright browser tests. They use the `playwright` library with Chromium, with no test-runner dependency. They cover:
  - dashboard, navigation to every section, all 18 chapters, and topic levels and completion;
  - glossary, search, flashcard grading, quizzes, adaptive practice, cases, comparisons, diagrams, concept map and mode finder;
  - notes, bookmarks, timer, and the crash course, revision and deep-study modes;
  - exam trainer, calculators, and persistence of progress, notes, bookmarks and settings after reload;
  - export, reset and import;
  - keyboard shortcuts and error handling;
  - **no external network requests**;
  - mobile layout (no horizontal scroll, drawer) and dark mode;
  - PWA install and offline load;
  - the full student workflow from the brief (dashboard → Chapter 1 → … → crash course → dashboard).

  Screenshots go to `tests/screenshots/` (git-ignored).

## Known limitations

- **Content is a study aid, not the book.** Lessons are condensed paraphrases, so read the cited pages for full arguments and context. The platform does not issue Shariah rulings, and where it describes scholarly opinion it reports the book's account.
- **Page references** are the printed page numbers of this edition. Chapter-opening pages carry no printed number in the book; the numbers cited for them are derived with the same rule (PDF page − 28).
- **Practice material:** 3 of the 11 case studies and some calculator inputs are invented for practice and labelled "generated for learning". Their numbers are illustrative, not market data.
- **Short-answer and exam-trainer marking** is self-assessed. The app highlights which expected key terms you used, but it cannot grade reasoning.
- **Storage is per browser.** Clearing site data deletes progress, and private windows may not keep it, so use Export for backups. Nothing syncs between devices.
- **The PDF is not bundled in git** for copyright reasons (see above), so "Open PDF at page" works only when the local copy exists. With `file://`, some browsers ignore the `#page=` fragment.
- **Offline caching (PWA)** needs the app to be served over `http(s)` once. Opening `index.html` directly works offline anyway, because every file is local.
- **The concept map** is laid out for wide screens. On phones it scrolls horizontally inside its frame, and the text list of all concepts below it is the more comfortable way to browse.
