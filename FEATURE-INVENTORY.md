# Feature Inventory and Feature Reconciliation

Generated 2026-09-29. “File 1” is *Islamic-Finance-Learning* (modular learning engine); “File 2” is *Understanding-Islamic-Finance-STANDALONE* (structured product / reference layer). Both were read completely (all script blocks, data files and CSS) before merging.

Legend for **Action**: RETAINED · MERGED · IMPROVED · REPLACED WITH SUPERIOR IMPLEMENTATION · TRUE DUPLICATE REMOVED. **No feature is marked “not retained”.**

## Feature reconciliation table

| Feature | File 1 | File 2 | Final implementation | Action |
| --- | --- | --- | --- | --- |
| Application shell | Top bar, sidebar, drawer, bottom nav, skip link, modal + toast roots | Sidebar with collapse, mobile top bar, backdrop, streak pill, live search dropdown | One shell: F1 landmarks and accessibility + F2 collapsible sidebar, streak pill and search suggestions | MERGED |
| Navigation | 8 groups, Learn sub-menu | 5 groups, flat list | Learn → Practise → Apply → Calculate → Exam → Study → Reference → Personal | IMPROVED |
| Legacy deep links | — | Own route table (#/case-studies, #/crash-course/45 …) | 19 redirect rules keep every File 2 link and every File 1 link working | RETAINED |
| Dashboard | Hero, next-step recommendations, readiness, weak topics, heat map, planner card | Welcome, continue, stats, weak topics, bookmarks, activity, streak | F1 dashboard + streak pill + links to modes, glossary/acronyms, sources | MERGED |
| Chapters / topics | 311 topics, 3 explanation levels, “explain again”, tiers, quick check | 225 topics, Beginner/MBA/Exam levels, source citations | 311 topics; each shows F2’s treatment as level-aware “extended study notes”; F2 sections spanning several topics are cross-linked | MERGED |
| Teach me (guided lesson) | 9-step tutor walk-through | Step-by-step guided lesson | One 9-step Teach me (conditions/principles now include extended notes) | MERGED |
| Source citations | Chapter · section · pages, “view source context” | Section/page citations on records | Both + Sources page: full section/page map with PDF page numbers, appendices, back matter | IMPROVED |
| Glossary | 191 terms + chapter-defined terms | 180 terms + chapter definitions | One glossary (191 terms + chapter terms), both wordings, related terms, pages | MERGED |
| Acronyms | None | 119 (data present) | Acronyms tab with search, A–Z, bookmarks, global search | IMPROVED |
| Concept map | Spine map, concept pages with relationship graph, chapter concept maps | Stage columns, edges on selection, “show all” | Two views over one graph (Course map / Learning flow) and 85 concepts, 249 edges | MERGED |
| Concept hub | Concept pages (rapid-revision card + links) | Name-matched aggregation page | One concept page: card, relationship graph, connected learning (graph) and name-matched mentions | MERGED |
| Flashcards | 498 cards, deck picker, review session | 558 cards, category/chapter picker | 1,053 cards, one engine, decks by scope/chapter/category | MERGED |
| Spaced repetition | SM-2 style: reps, ease, interval, due, lapses, grade | Leitner boxes (5) | One SM-2 scheduler with guard rails (no NaN, negative or impossible values); Leitner history converted | REPLACED WITH SUPERIOR IMPLEMENTATION |
| Question engine | 11 question types incl. matching/ordering/multi/short, explanations, source, objective | mcq/tf/identify/comparison/scenario, multiselect, others self-graded | One engine, 11 types; File 2 ordering / matching converted to real interactive items where structured | MERGED |
| Quiz builder & runner | Presets, builder, results, retry missed | Chapter / mixed / by-type | Presets + builder + browse-by-type + chapter quizzes | MERGED |
| Adaptive practice / weak areas | Ranks by weak topics, missed, unseen | Weighted by chapter accuracy | F1 ranking over the canonical answer history | REPLACED WITH SUPERIOR IMPLEMENTATION |
| Mistakes review / retry | My mistakes page, retry missed | Missed ids in attempts | One mistakes list fed by every answer | MERGED |
| Case studies | 19 cases: 4-step lab with MCQs | 42 cases: prompts + textbook answer + why + takeaway | 61 cases, one lab supporting both formats; filters by kind, chapter, mode; completion tracked | MERGED |
| Comparisons | 25 pairs + any-to-any matrix (12 modes) | 16 comparisons with dimensions | 29 comparisons (12 merged, all rows kept) + 19-mode any-to-any matrix with 21 aspects and focus presets | MERGED |
| Financing modes | Comparison matrix rows, finder results | 19-mode “Products at a glance” matrix | Modes catalogue + a page per mode linked to products, diagrams, cases, numericals, calculators, comparisons, questions and flashcards | MERGED |
| Products / applications | 58 products: catalogue, finder, maps, compare, quiz, numericals | — | Retained; each product links to its financing modes | RETAINED |
| Transaction diagrams | 34 interactive diagrams (parties, steps, rules, pitfalls) | 18 step lists (no parties) | 34 diagrams kept as diagrams; step lists kept as “transaction steps” in extended notes; each diagram links to its mode and products | RETAINED |
| Which mode applies? | 9-node decision tree, 14 results | 10-question tree, 14 results | One finder with two pathways (need / purpose) and 28 results | MERGED |
| Numerical trainer | 33 problem types (12 with textbook figures) with practice variants | — | Retained; results feed the progress model; each numerical linked to topic, product and mode | RETAINED |
| Calculators | 23 calculators / checkers | 6 calculators | 25: F2 features folded in (Murabaha/Musawamah disclosure, sleeping-partner cap), 3 new (Salam discount, Sukuk distribution, Qard vs interest); tenure typo can no longer freeze the page | MERGED |
| Exam centre | Tabs: definitions, short, long, conceptual, difference, scenario, MCQ, viva, rapid, core | Browse by question type + trainer | F1 centre + Answer plans tab (F2 trainer sets) + type browsing on the quiz page | MERGED |
| Answer trainer | 110 prompts: structure, key concepts, points, mistakes | 26 trainer sets | 136 prompts, one trainer | MERGED |
| Rapid revision cards | 54 concept cards | Rapid revision (concept nodes) | One deck of the concepts that have revision cards | RETAINED |
| Timed mock exams | Mock builder, silent answers, timer, review by chapter and level | — | Retained over the merged pool | RETAINED |
| Exam planner | Day-by-day plan from exam date and progress | — | Retained | RETAINED |
| Guided study (45 / 90 / 180) | Item-driven player: countdown, pause, skip, saved position | Segment roadmaps + closing quiz | One player; File 2 segments shown as each plan’s roadmap; state migrated | MERGED |
| Study timer | Persistent Pomodoro / 45 / 60 / custom, header chip, logging | Pomodoro / 45 / 60 / custom | F1 timer (superset) | TRUE DUPLICATE REMOVED |
| Progress & achievements | 11 achievements, streak, heat map, readiness | 16 achievements, streak | 19 achievements (union), one progress model incl. cases, calculators, numericals | MERGED |
| Bookmarks / notes | Typed bookmarks and notes on any item | Bookmarks / notes on topics, concepts, glossary… | One store; File 2 items mapped to canonical ids and working routes | MERGED |
| Search | Full-text index over 10 content types | Live dropdown + results page | One index over 17 content types, hub card for concepts and modes, live dropdown | MERGED |
| Settings | Theme, text size, motion, level, daily goal, name, export/import/reset | Theme, level, reset, export/import | F1 settings + merge/replace import that accepts either earlier application’s export | MERGED |
| Themes | Light / dark / system, no-flash | Light / dark / system | F1 tokens; text-3 and gold tokens darkened to meet 4.5:1 contrast | IMPROVED |
| Accessibility | Skip link, focus trap modals, aria-current/expanded, reduced motion, keyboard flashcards | Skip link, reduced motion | All of F1’s; first Tab stop is the skip link; flashcard Space no longer flips twice; hidden file input labelled | IMPROVED |
| Mobile | Drawer, bottom nav, responsive grids | Backdrop drawer | No horizontal overflow at 375 / 768 px on 39 sampled routes; buttons wrap | IMPROVED |
| Persistence | localStorage “ifl.v1”, no migrations | localStorage “ifl_v1” | Versioned “ifl.v3” (APP_STATE_VERSION 3) with migrations from both, merge, sanitising, corrupt-record backup | REPLACED WITH SUPERIOR IMPLEMENTATION |
| Offline / standalone | Standalone flag + optional service worker over http | Standalone build with a data-URL manifest (start_url ./index.html, icon.svg — not deliverable from one file) | One file, no network requests; deliberately no manifest or service worker | REPLACED WITH SUPERIOR IMPLEMENTATION |
| Print | Printable chapter revision sheet | — | Retained | RETAINED |
| Data loader | Lazy per-chapter script injection | Global aggregation module | One registry (all inlined) + one canonical index / relationship graph (IFL.data) | REPLACED WITH SUPERIOR IMPLEMENTATION |

## Pre-merge inventory summary

| Area | File 1 | File 2 |
| --- | --- | --- |
| Structure | modular source built to one file; ~62 script blocks (18 chapter data files, 8 shared data sets, 26 view/engine modules) | modular source built to one file; 93 script blocks (data files per chapter/type, 22 view modules, 6 core modules) |
| Data | 311 topics, 498 flashcards, 771 questions, 110 exam prompts, 191 glossary terms, 54 concepts, 34 diagrams, 25 comparison pairs + 12-mode matrix, 19 cases, 58 products, 3 study plans | 225 topics, 558 flashcards, 572 questions, 26 trainer sets, 180 glossary terms, 119 acronyms, 64 concept nodes / 124 edges, 16 comparisons, 42 cases, 19 mode profiles, decision tree, 3 study modes, book index |
| Routes | 43 route patterns | 39 route patterns |
| State | `ifl.v1`: topics, answers, attempts, cards (SM-2), reviews, notes, bookmarks, activity, days, timer sessions, guided, exam | `ifl_v1`: progress.{topicsCompleted, questionHistory, quizAttempts, flashcardReviews (Leitner), …}, notes, bookmarks, achievements |
| Storage of PWA | service-worker registration only when served over http | manifest as data-URL with `start_url: "./index.html"` and `icon.svg` |

## Merge matrix for features

| Class | Features |
| --- | --- |
| FILE_1_UNIQUE | Numerical trainer, mock exams, planner, mistakes review, adaptive-practice ranking, transaction diagrams, product catalogue/finder/maps/compare/quiz, rapid revision, answer-trainer tabs, printable sheet, SM-2 scheduler, Teach-me steps as designed |
| FILE_2_UNIQUE | Acronyms data, financing-mode profiles (19), Salam-discount / Sukuk-distribution / Qard-vs-interest calculators, decision tree by purpose, learning-flow concept view, sidebar collapse, streak pill, live search dropdown, book section/page index |
| COMPLEMENTARY | Topics (two independent treatments), cases, comparisons, glossary wordings, exam prompts, study-mode roadmaps |
| TRUE_DUPLICATE | Study timer, dashboard recommendations, bookmarks/notes storage, theme handling, 5 questions, 3 flashcards |
| SAME_CONCEPT_DIFFERENT_IMPLEMENTATION | SRS (SM-2 vs Leitner), question runner, concept map, search, router, store, progress, calculators |
| CONFLICT | 16 data conflicts (chapter study-time estimates ×16; see MERGE-AUDIT-REPORT.md) |
| SHARED_DEPENDENCY | The book’s chapter/part structure, page numbers, terminology |
| LEGACY/COMPATIBILITY | Both storage formats, both route tables, F2 ids (topic, question, flashcard, concept, comparison, mode) |
| UNKNOWN_REQUIRES_REVIEW | none remaining |
