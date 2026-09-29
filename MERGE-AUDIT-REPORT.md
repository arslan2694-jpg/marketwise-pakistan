# Merge Audit Report

Generated 2026-09-29. Result of merging **File 1** (*Islamic-Finance-Learning*) and **File 2** (*Understanding-Islamic-Finance-STANDALONE*) into **Understanding-Islamic-Finance-MBA-Learning-System.html** (5.71 MB, single file, no network access).

## 1. Process followed

1. **Backup** — both originals copied to `/source-backup/`; nothing was modified, renamed or deleted. The data build reads the backups directly, so the merge is reproducible (`node merged-src/tools/build-data.js`).
2. **Complete read** — every script block, data file and stylesheet of both files was extracted and inspected (File 1: 62 blocks; File 2: 93 blocks; the data was also executed to obtain exact schemas and counts).
3. **Inventory & merge matrix** — see FEATURE-INVENTORY.md and CONTENT-RECONCILIATION.md.
4. **Canonical schema, ids, alias tables, relationship graph** — DATA-SCHEMA.md.
5. **Engine decision** — the two applications share the same architecture (global namespace, hash router, per-view modules) but File 1's engine is stronger where they differ (SM-2 scheduler with lapses and ease, versioned typed store, focus-trapping modals, adaptive practice, mock exams, planner, diagrams, numerical trainer, guided player). It was kept and re-founded on the canonical data layer; File 2's product/reference layer, cases, terminology and structured reference content were integrated as first-class content; File 2's UX ideas (collapsible sidebar, streak pill, live search, learning-flow map, finder by purpose) were added. The application is **not** File 1 with File 2 pasted in: data, state, search, relationships, calculators and navigation were all rebuilt around one model.
6. **Build, static QA, runtime QA, reconciliation, zero-loss audit** — see QA-REPORT.md.

## 2. Merge matrix (data records)

| Content type | FILE_1_UNIQUE | FILE_2_UNIQUE | TRUE_DUPLICATE | COMPLEMENTARY / SAME_CONCEPT_DIFFERENT_DETAIL | CONFLICT |
| --- | --- | --- | --- | --- | --- |
| Questions | 766 | 567 | 5 | 0 | 0 |
| Flashcards | 495 | 555 | 3 | 0 | 0 |
| Topics | 311 | 0 | 0 | 225 | 0 |
| Glossary terms | 11 | 0 | 2 | 178 | 0 |
| Acronyms | 0 | 119 | 0 | 0 | 0 |
| Concepts | 21 | 31 | 0 | 33 | 0 |
| Cases | 19 | 42 | 0 | 0 | 0 |
| Comparisons | 13 | 4 | 0 | 12 | 0 |
| Financing modes | 0 | 7 | 0 | 12 | 0 |
| Products | 58 | 0 | 0 | 0 | 0 |
| Diagrams | 34 | 0 | 0 | 0 | 0 |
| Exam prompts | 110 | 26 | 0 | 0 | 0 |

Structure classes not counted above: SHARED_DEPENDENCY = the 18 chapters / 3 parts / page numbering of the textbook; LEGACY/COMPATIBILITY = the two storage formats, both route tables and every File 2 id; UNKNOWN_REQUIRES_REVIEW = none left.

## 3. Conflicts and how each was resolved

| Conflict | File 1 | File 2 | Resolution |
| --- | --- | --- | --- |
| Chapter study-time estimates (16 chapters differ) | e.g. Ch 1: 35 min | e.g. Ch 1: 45 min | File 1 values drive the planner (the planner and guided plans were built on them); both stored in `chapter.estimates`. Not a content claim. |
| Chapter titles | identical after normalisation (18/18) | — | No conflict. |
| Study-plan lengths | 45 / 90 / 180 | 45 / 90 / 180 | Identical. |
| Storage key and schema | ifl.v1 | ifl_v1 | New versioned record `ifl.v3`; both converted (see DATA-SCHEMA.md); legacy records untouched. |
| SRS | SM-2 (reps, ease, interval, due, lapses, grade) | Leitner 5 boxes | SM-2 kept; Leitner box → interval/ease/due on import (box 3 → 4 days, ease reduced by lapses). |
| Question shapes | `q`, `answer`, `diff` (E/M/H), `level`, `topic` (id), matching = pairs, ordering = items | `prompt`, `correctAnswer`, `difficulty`, `cognitiveLevel`, `topic` (title), matching/ordering as option indexes | One canonical shape. F2 ordering with an index permutation became a real ordering item; F2 matching with a parsable left-hand list became pairs (2 items); the remaining F2 matching/ordering items are multiple-choice in form and flagged with `format`. F2 identify/scenario items with no options became written-answer items. |
| Topic granularity | 311 topics keyed by section | 225 topics keyed by section *ranges* (e.g. 9.8–9.8.2) | F1 topics are the spine; each F2 topic is attached to the topic its range starts at (ties broken by title similarity) as “extended study notes” and lists every topic it covers; the other covered topics show a pointer. |
| Same term, different transliteration (glossary) | Kharaj bil Daman, Mithlan bi-mithlin … | Kharaj bi-al-Daman, Mithlam-bi-mithlin … | Matched by spacing/diacritic-insensitive key, then edit distance ≤ 1, then a hand table for 4; one automatic match (`W‘adah` → `Wadi‘ah`, promise vs deposit) was wrong and overridden. |
| Calculators with overlapping scope | credit-price, pool-weightage, musharakah-pl, sleeping-partner | murabaha-pricing, deposit-pool, musharakah-split | One calculator each. Superset features kept: Murabaha/Musawamah disclosure note and profit/mark-up readout; deposit-pool loss-by-capital already present; Musharakah split now enforces the sleeping-partner cap (File 2) and flags both-sleeping (File 1). The separate `sleeping-partner` tool was merged away. |
| Comparison with 3+ items vs File 2 pair | Sukuk vs bonds vs shares | Sukuk vs conventional bonds | File 2 rows aligned to the matching columns; the third column shows “—” where File 2 says nothing. |
| Concept ids | istisna, imbt, dm, jualah, istijrar, qard, maisir … | istisnaa, ijarah-muntahia-bi-tamleek, diminishing-musharakah, juaalah, bai-al-istijrar, qard-hasan, maisir-qimar … | File 1 concept ids kept (they are used by products and diagrams); File 2 ids stored as aliases; kafalah and rahn map to File 1’s combined “security” concept. |
| Concept-map group | Nine named groups | Six stages | Both kept (`group`, `stage`). File 2-only nodes have no File 1 group: a group was derived from the stage and flagged `groupDerivedFromStage`. |
| PWA | service worker only over http | manifest data-URL with `start_url ./index.html` and `icon.svg` | Neither can work from a single file; the final file ships neither and makes no PWA claim. |

## 4. Defects found in the sources and fixed

- **File 1 — flashcard keyboard double-flip.** Space on the focused card fired the card’s own handler *and* the global handler, flipping twice, so keyboard users could not reveal the answer. Fixed (`stopPropagation`); covered by an automated test.
- **File 1 — calculator freeze.** The Diminishing-Musharakah schedule looped `months` times: typing a huge tenure froze the page. Tenure is now clamped to 1–600 months (found by the calculator edge-input test).
- **File 1 — crafted `/numericals?p=…&s=book`** for problems with no textbook figures threw; book mode now requires textbook figures (found by the route crawler).
- **File 1 — contrast.** `--text-3` on the page background (4.08:1) and `--gold` on `--gold-soft` (3.99:1) failed 4.5:1; tokens darkened (now ≥ 4.5:1 in both themes).
- **File 1 — mobile.** Long buttons, key/value lists, badges and grid children caused horizontal scroll on phones; wrapping/min-width rules added.
- **File 1 — first Tab stop.** Focus was moved to `<main>` on the first render, hiding the skip link; now only on later navigations.
- **File 2 — manifest** `start_url: "./index.html"` referred to a file that does not exist in a single-file deployment; removed together with the data-URL manifest.
- **File 2 — glossary extraction artefacts** (`Zar ai‘`, `K ali`, `‘ Ariyah`): matched to their clean File 1 terms; the spacing variants are kept as aliases only where they differ in letters.
- **Observation, left unchanged (source-derived).** The pool-weightage calculator’s note says the textbook figures are 119, 184 and 197, while the exact division gives 118.42, 184.21 and 197.37 (displayed 118 / 184 / 197). Independent recomputation confirms the arithmetic; the discrepancy is the book’s own rounding, not altered here.

## 5. Not merged / limitations (explicit)

- File 2’s topic treatments are **not fused sentence-by-sentence** with File 1’s: they are two independently written explanations, so they are kept whole as level-aware “extended study notes” attached to the topic. This is deliberate (no content is invented or blended); the cost is that a topic page can show two treatments.
- File 2’s 18 `transactionSteps` lists have no parties or arrows, so they were **not** converted into transaction diagrams (that would require inventing structure); they appear as “Transaction steps” in extended notes.
- Where a File 2 matching/ordering question is multiple-choice in form (for example “1-b, 2-a, 3-c”), it stays multiple-choice; only structurally parsable items became interactive matching/ordering.
- File 2 exam prompts carry no “kind” (long/short…); they are labelled “Answer plan” rather than guessing.
- Static page-number links to a local textbook PDF (File 1) were removed: the PDF is not shipped, so the link could only break. Page and PDF-page numbers are shown instead.
- Verified in headless Chromium only (no Firefox / Safari / manual screen-reader pass).
- First render 697 ms; the file is 5.7 MB because all content is embedded.

## 6. Final zero-loss / duplication questions

| Question | Answer |
| --- | --- |
| Did anything useful from File 1 disappear? | No: all 43 route patterns and every module are present (see FEATURE-INVENTORY.md); 31230 File 1 strings audited, 0 unexplained. |
| Did anything useful from File 2 disappear? | No: every File 2 route maps to a page (or a redirect); 21583 File 2 strings audited, 0 unexplained. |
| Any unique content lost? | No — only 5 questions and 3 flashcards were collapsed as true duplicates, listed in CONTENT-RECONCILIATION.md. |
| Any user-facing feature lost? | No. |
| Any data structure / calculation / source metadata / relationship lost? | No; 27 independent calculation checks pass; source objects are kept on every record. |
| Two versions of the same feature? | No: one router, store, SRS, progress model, data layer, search index, question runner, flashcard engine, calculator framework, shell (static check). The only intentional pair is *Concept map* vs *Transaction diagram* (different learning problems) and *Financing modes* vs *Products* (contract vs application). |
