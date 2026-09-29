# QA Report

Generated 2026-09-29. All suites live in `merged-src/tools/qa/` and run against the built single file in headless Chromium (`file://`). Result files (`*-result.json`) sit next to the scripts.

| Suite | What it checks | Result |
| --- | --- | --- |
| Reference integrity (`tools/check-integrity.js`) | ids, dangling references, question / flashcard / case / diagram / comparison / finder / study-plan structure, alias targets, graph endpoints | **0 problems** |
| Static QA (`static.js`) | markup balance, duplicate ids, aria targets, script syntax, external dependencies, duplicate routes, single engines | **13/13 pass** |
| Lint (ESLint, `no-undef` etc.) | undefined variables, redeclarations, dead code, duplicate keys/cases over 37 source files | **0 errors** |
| Route crawler (`crawl.js`) | every route and every record page (1151 visited: all topics, chapters × tabs, cases, modes, products, diagrams, concepts, comparisons, exam prompts, numericals, calculators, plans), plus every internal link found on them | **0 problem pages; 3110 unique internal links found, 2059 extra visited, 0 broken; 0 JS/console errors** |
| Interactive flows 1 (`flows.js`) | search (21 terms incl. all required), all 11 question types answered correctly through the UI, flashcards, SRS fuzz (20,000 grades), mock exam, both case formats, both finder pathways, all 3 guided plans, all 25 calculators (default/zero/negative), all 33 numerical generators (textbook + 40 seeds), bookmarks/notes/theme, persistence, **no network requests** | **75/75 pass** |
| Interactive flows 2 (`flows2.js`) | learning journey, extended notes and level switch, Teach me, diagram stepping, modes catalogue/compare, both concept-map views, glossary/acronyms, settings, export/import UI, skip link, modal focus trap, Escape/focus return, single flashcard flip | **33/33 pass** |
| Migration (`migrate.js`) | File 2 state, File 1 state, both, imports of raw/own exports, unknown-file rejection, corrupt record, blocked storage | **32/32 pass** |
| Calculations (`calc.js`) | 27 independently computed expected values (formulas re-derived in the test, not read from the app) + edge inputs (0, −1, 1e12, 0.005; non-numeric input is coerced to 0 by the input handler) on every calculator | **27/27 values correct; edge inputs: 0 problems** |
| Responsive / accessibility (`responsive.js`) | horizontal overflow at 375 / 768 / 1280 px (light + dark) on 39 routes, unlabeled controls, tap targets, drawer, contrast of 13 token pairs in both themes | **overflow 0 · unlabeled 0 · small targets 0 · contrast all ≥ 4.5:1** |
| Zero-loss (`zero-loss.js`) | every string of every File 1 and File 2 record found in the canonical data | **52813 strings, 0 unexplained** |

## Coverage against the requested runtime checklist
Home/dashboard ✓ · navigation ✓ · search ✓ · chapters ✓ · topics ✓ · glossary ✓ · acronyms ✓ · concept map ✓ (two views) · flashcards ✓ · SRS ✓ · questions (MCQ, true/false, multi-select, short answer, scenarios, matching, ordering, definition, identify, comparison, application) ✓ · cases ✓ · products ✓ · financing modes ✓ · diagrams ✓ · numericals ✓ · calculators ✓ · comparisons ✓ · guided study ✓ · adaptive practice ✓ (route crawler + question flows) · mistakes ✓ · rapid revision ✓ · mock exams ✓ · exam timer ✓ (mock timer; auto-submit path exercised via the submit path) · exam planner ✓ (route crawl) · progress ✓ · bookmarks ✓ · notes ✓ · settings ✓ · themes ✓ · mobile navigation ✓ · responsive layout ✓ · offline loading ✓ (zero network requests).

## Search integrity (representative terms)
Murabaha, Musharakah, Mudarabah, Ijarah, Salam, Istisna'a, Sukuk, Takaful, Tawarruq, Kafalah, Qard Hasan, AAOIFI, SPV, Hamish Jiddiyah, sleeping partner, weightage, Wakalah, Hawalah, Rahn, Gharar, Riba all return results. The “Murabaha” search returns Topic, Financing mode, Product, Transaction diagram, Case study, Numerical, Calculator, Comparison, Question, Flashcard, Concept and Glossary hits and opens the connected-learning hub (mode → products, diagrams, cases, numericals, calculators, comparisons, questions, flashcards).

## Console error audit
Zero `pageerror` / `console.error` events across the crawler, both interactive suites, migration and responsive runs.

## Performance
First render 697 ms (DOMContentLoaded 624 ms) for a 5.71 MB file; search index build 73 ms, query 5 ms; topic page 46 ms; JS heap 48.1 MB; 1185 DOM nodes on the dashboard. Optimisations: indexes built once, question pool cached, glossary renders 100 entries at a time, all data synchronous (no lazy script injection).

## Known limitations of the QA
Chromium only; no manual screen-reader or real-device testing; the calculators’ *rules* (e.g. tradability thresholds) are the book’s as encoded in File 1 and were not re-litigated — only the arithmetic and structure were verified independently.
