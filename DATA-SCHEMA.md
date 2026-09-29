# Canonical Data Schema

Generated 2026-09-29 from the built data (`merged-src/data/*.js`). Field tables list every field that occurs, its JSON type and how many records carry it.

## Principles

1. **One schema per content type.** Both sources describe the same textbook with different field names; the canonical schema uses descriptive names (`prompt`, `correctAnswer`, `difficulty`, `cognitiveLevel`, `topicId`, `simpleExplanation` …) and every consumer was updated.
2. **Stable ids.** Existing ids are kept because they are what saved progress refers to. `aliases` records every merged id and `IFL.data.canonical*()` resolves them. Ids are never array indexes. (The optional naming style `topic_murabaha_basic` was not adopted: it would have invalidated every saved bookmark, note and review.)
3. **Provenance is data.** `origin` says which source contributed a record; `source` carries only chapter/section/pages that the sources give.
4. **Nothing is silently decided.** When two sources disagree, both values are stored (`titleAlt`, `altText`, `estimates`, `extendedDefinition`, `explanationAlt`, `backAlt`) and the choice is listed in MERGE-AUDIT-REPORT.md.
5. **Relationships are explicit.** `data/graph.js` stores 2365 typed triples; the rest are implied by record fields (`topicId`, `modeIds`, `productIds` …). `IFL.data.related(type, id)` returns everything linked to a record, bidirectionally; numericals and calculators register themselves at load.

## Object map

| Canonical object | Stored in | Count |
| --- | --- | --- |
| Chapter | `data/chapters/chNN.js` | 18 |
| Section / Topic | inside each chapter (`topics[]`) | 311 |
| Extended-notes section (F2 topic) | `topic.supplements[]` | 225 |
| Definition | `topic.definitions[]`, `supplements[].definitions[]`, glossary | 506 embedded |
| GlossaryEntry | `data/glossary.js` | 191 |
| Acronym | `data/acronyms.js` | 119 |
| Concept + edges | `data/concepts.js`, `data/concept-edges.js` | 85 + 249 |
| Flashcard | chapter `flashcards[]` | 1053 |
| Question | chapter `questions[]` (+ derived quick checks and product questions) | 1338 |
| Exam prompt | chapter `exam[]` | 136 |
| CaseStudy | `data/case-studies.js` | 61 |
| FinancingMode | `data/modes.js` | 19 |
| Product | `data/products.js` | 58 |
| TransactionDiagram | `data/diagrams.js` | 34 |
| Comparison | `data/comparisons.js` | 29 |
| NumericalExercise | code (`views/numericals.js`) — 33 generators, registered in the graph | 33 |
| Calculator | code (`calculators.js`) — registered in the graph | 25 |
| StudyMode | `data/study-plans.js` | 3 |
| LearningObjective | `chapter.learningObjectives[]` | 240 |
| SourceReference | `record.source`, `data/book-index.js` (149 sections with printed and PDF pages) | — |
| Alias tables | `data/aliases.js` | topics 225, questions 5, flashcards 3, concepts 64, comparisons 12 |

## Field tables

### Chapter
Chapter metadata; `estimates` keeps both sources’ study-time estimates (`minutes` is File 1’s).

18 records.

| Field | Type | Present in | Meaning |
| --- | --- | --- | --- |
| number | number | 100% |  |
| title | string | 100% |  |
| part | string | 100% |  |
| partRoman | string | 100% |  |
| pages | array | 100% |  |
| minutes | number | 100% |  |
| estimates | object | 100% |  |
| difficulty | string | 100% | `easy` / `medium` / `hard` (F1 `E`/`M`/`H`). |
| difficultyAlt | string | 100% |  |
| learningObjectives | array | 100% |  |
| why | string | 100% |  |
| whyExpanded | string | 100% |  |
| overview | string | 100% |  |
| summary | string | 100% |  |
| summaryExpanded | string | 100% |  |
| summarySection | object | 100% |  |
| takeaways | array | 100% |  |
| takeawayOrigins | array | 100% |  |
| checklist | array | 100% |  |
| topics | number | 100% |  |
| questions | number | 100% |  |
| flashcards | number | 100% |  |
| exam | number | 100% |  |

### Topic
311 records.

| Field | Type | Present in | Meaning |
| --- | --- | --- | --- |
| id | string | 100% | Stable canonical id (never an array index). Source ids are kept (F1: `t9.3`, `q1.1`, `f1.1`; F2: `q-ch1-1`, `fc-ch1-1`, `cs-murabaha-1`); merged duplicates list the retired id in `aliases`. |
| section | string | 100% |  |
| title | string | 100% |  |
| pages | array | 100% |  |
| tier | string | 100% |  |
| concepts | array | 100% |  |
| intuition | string | 100% |  |
| simpleExplanation | string | 100% | Beginner explanation (F1 `simple`). |
| academicExplanation | array | 100% | MBA-level paragraphs (F1 `academic`). |
| examExplanation | string | 100% | Exam-answer summary (F1 `exam`). |
| keyPoints | array | 100% |  |
| definitions | array | 100% |  |
| examples | array | 100% |  |
| commonConfusions | array | 100% | Misconception / correct-view pairs (F1 `confusions`). |
| relatedTopics | array | 100% | Related topic ids (F1 `related`). |
| quickCheck | object | 100% |  |
| origin | array | 100% | Which source(s) contributed: `f1`, `f2`. |
| aliases | array | 100% | Ids of the other application’s records merged into this one (used to migrate saved progress). |
| supplements | array | 100% | The second study source’s treatment of this section: overview, three explanation levels, key points, definitions, conditions, principles, steps, examples, confusions, distinctions, related concepts, transaction steps, calculation walkthroughs, debate fields. |
| distinctions | array | 22% |  |
| principles | array | 2% |  |
| table | object | 22% |  |
| processSteps | array | 8% | Ordered steps (F1 `steps`). |
| debate | array | 12% |  |
| calc | object | 5% |  |
| conditions | array | 2% |  |
| subsections | array | 5% |  |

### Topic supplement (extended notes)
225 records.

| Field | Type | Present in | Meaning |
| --- | --- | --- | --- |
| id | string | 100% | Stable canonical id (never an array index). Source ids are kept (F1: `t9.3`, `q1.1`, `f1.1`; F2: `q-ch1-1`, `fc-ch1-1`, `cs-murabaha-1`); merged duplicates list the retired id in `aliases`. |
| origin | string | 100% | Which source(s) contributed: `f1`, `f2`. |
| sectionRange | string | 100% |  |
| sectionTitle | string | 100% |  |
| title | string | 100% |  |
| covers | array | 100% | All canonical topics an extended-notes section spans. |
| overview | string | 100% |  |
| simpleExplanation | string | 100% | Beginner explanation (F1 `simple`). |
| academicExplanation | string | 100% | MBA-level paragraphs (F1 `academic`). |
| examExplanation | string | 100% | Exam-answer summary (F1 `exam`). |
| keyPoints | array | 100% |  |
| definitions | array | 100% |  |
| conditions | array | 100% |  |
| principles | array | 100% |  |
| processSteps | array | 100% | Ordered steps (F1 `steps`). |
| examples | array | 100% |  |
| commonConfusions | array | 100% | Misconception / correct-view pairs (F1 `confusions`). |
| distinctions | array | 100% |  |
| relatedConcepts | array | 100% |  |
| examRelevance | string | 100% |  |
| difficulty | string | 100% | `easy` / `medium` / `hard` (F1 `E`/`M`/`H`). |
| source | object | 100% | `{chapter, section, pages[]}` (or the book/section for glossary) — never invented. |
| transactionSteps | array | 8% |  |
| calculations | array | 6% |  |
| issue | string | 7% |  |
| alternativeView | string | 2% |  |
| authorsResponse | string | 7% |  |
| studentTakeaway | string | 7% |  |
| criticism | string | 7% |  |

### Question
Types: mcq, tf, multi, match (pairs), order (items in correct order), definition, identify, comparison, scenario, application, short (written answer, optional keywords).

1338 records.

| Field | Type | Present in | Meaning |
| --- | --- | --- | --- |
| id | string | 100% | Stable canonical id (never an array index). Source ids are kept (F1: `t9.3`, `q1.1`, `f1.1`; F2: `q-ch1-1`, `fc-ch1-1`, `cs-murabaha-1`); merged duplicates list the retired id in `aliases`. |
| type | string | 100% |  |
| prompt | string | 100% | Question stem (was `q` in F1, `prompt` in F2). |
| options | array | 68% |  |
| correctAnswer | number | 93% | Option index (mcq family), boolean (tf), index array (multi) or model answer text (short). match/order questions use `pairs` / `items` instead. |
| explanation | string | 100% |  |
| topicId | string | 100% | Canonical topic (F1 granularity). F2 sections are resolved to it by section range. |
| chapter | number | 100% |  |
| section | string | 100% |  |
| difficulty | string | 100% | `easy` / `medium` / `hard` (F1 `E`/`M`/`H`). |
| cognitiveLevel | string | 100% | `recall` / `understanding` / `application` / `analysis` (was `level`). |
| objective | string | 100% | Learning objective text (was `obj` / `learningObjective`). |
| source | object | 100% | `{chapter, section, pages[]}` (or the book/section for glossary) — never invented. |
| origin | array | 100% | Which source(s) contributed: `f1`, `f2`. |
| aliases | array | 100% | Ids of the other application’s records merged into this one (used to migrate saved progress). |
| pairs | array | 3% |  |
| items | array | 3% |  |
| keywords | array | 3% |  |
| topicLabel | string | 42% | F2’s free-text topic title. |
| format | string | 3% | F2 items that are MCQ-shaped but were labelled matching/ordering, or written-answer forms of identify/scenario items. |
| explanationAlt | string | 0% | Second explanation kept when a duplicate question had different wording. |

### Flashcard
1053 records.

| Field | Type | Present in | Meaning |
| --- | --- | --- | --- |
| id | string | 100% | Stable canonical id (never an array index). Source ids are kept (F1: `t9.3`, `q1.1`, `f1.1`; F2: `q-ch1-1`, `fc-ch1-1`, `cs-murabaha-1`); merged duplicates list the retired id in `aliases`. |
| front | string | 100% |  |
| back | string | 100% |  |
| category | string | 100% | Flashcard / glossary / mode category (was `cat`). |
| topicId | string | 100% | Canonical topic (F1 granularity). F2 sections are resolved to it by section range. |
| chapter | number | 100% |  |
| source | object | 100% | `{chapter, section, pages[]}` (or the book/section for glossary) — never invented. |
| origin | array | 100% | Which source(s) contributed: `f1`, `f2`. |
| aliases | array | 100% | Ids of the other application’s records merged into this one (used to migrate saved progress). |
| backAlt | string | 0% | Second wording when a duplicate flashcard had a different back. |

### Exam prompt
136 records.

| Field | Type | Present in | Meaning |
| --- | --- | --- | --- |
| id | string | 100% | Stable canonical id (never an array index). Source ids are kept (F1: `t9.3`, `q1.1`, `f1.1`; F2: `q-ch1-1`, `fc-ch1-1`, `cs-murabaha-1`); merged duplicates list the retired id in `aliases`. |
| kind | string | 100% | Case: `textbook` / `practice` / `scenario`; exam prompt: long/short/conceptual/viva/difference/scenario/answer-plan; concept edge: `relation` / `flow`. |
| prompt | string | 100% | Question stem (was `q` in F1, `prompt` in F2). |
| expectedStructure | array | 100% |  |
| keyConcepts | array | 100% |  |
| essentialPoints | array | 100% |  |
| commonMistakes | array | 100% |  |
| topicId | string | 100% | Canonical topic (F1 granularity). F2 sections are resolved to it by section range. |
| chapter | number | 100% |  |
| source | object | 100% | `{chapter, section, pages[]}` (or the book/section for glossary) — never invented. |
| origin | array | 100% | Which source(s) contributed: `f1`, `f2`. |
| aliases | array | 100% | Ids of the other application’s records merged into this one (used to migrate saved progress). |

### Glossary entry
191 records.

| Field | Type | Present in | Meaning |
| --- | --- | --- | --- |
| id | string | 100% | Stable canonical id (never an array index). Source ids are kept (F1: `t9.3`, `q1.1`, `f1.1`; F2: `q-ch1-1`, `fc-ch1-1`, `cs-murabaha-1`); merged duplicates list the retired id in `aliases`. |
| term | string | 100% |  |
| category | string | 100% | Flashcard / glossary / mode category (was `cat`). |
| definition | string | 100% | Short definition. |
| glossaryPage | number | 100% | Page in the book’s printed glossary. |
| topicId | string | 100% | Canonical topic (F1 granularity). F2 sections are resolved to it by section range. |
| origin | array | 100% | Which source(s) contributed: `f1`, `f2`. |
| aliases | array | 100% | Ids of the other application’s records merged into this one (used to migrate saved progress). |
| source | object | 100% | `{chapter, section, pages[]}` (or the book/section for glossary) — never invented. |
| extendedDefinition | string | 93% | The other source’s definition when the wording differs. |
| relatedTerms | array | 86% |  |
| chapter | number | 93% |  |
| discussedOnPages | array | 93% | Pages where the chapter discusses the term. |

### Acronym
119 records.

| Field | Type | Present in | Meaning |
| --- | --- | --- | --- |
| id | string | 100% | Stable canonical id (never an array index). Source ids are kept (F1: `t9.3`, `q1.1`, `f1.1`; F2: `q-ch1-1`, `fc-ch1-1`, `cs-murabaha-1`); merged duplicates list the retired id in `aliases`. |
| acronym | string | 100% |  |
| expansion | string | 100% |  |
| origin | array | 100% | Which source(s) contributed: `f1`, `f2`. |
| source | object | 100% | `{chapter, section, pages[]}` (or the book/section for glossary) — never invented. |

### Concept
85 records.

| Field | Type | Present in | Meaning |
| --- | --- | --- | --- |
| id | string | 100% | Stable canonical id (never an array index). Source ids are kept (F1: `t9.3`, `q1.1`, `f1.1`; F2: `q-ch1-1`, `fc-ch1-1`, `cs-murabaha-1`); merged duplicates list the retired id in `aliases`. |
| name | string | 100% |  |
| group | string | 100% |  |
| tags | array | 100% | Concept-tag ids used in topic `concepts`. |
| oneLine | string | 64% |  |
| points | array | 64% |  |
| distinction | string | 64% |  |
| trigger | string | 64% |  |
| topicIds | array | 100% | Topics where the item is taught. |
| origin | array | 100% | Which source(s) contributed: `f1`, `f2`. |
| aliases | array | 100% | Ids of the other application’s records merged into this one (used to migrate saved progress). |
| stage | string | 74% | F2 learning-flow stage of a concept. |
| chapter | number | 74% |  |
| altNames | array | 25% | Other name(s) used by the other source. |
| groupDerivedFromStage | boolean | 36% | Group was derived from the F2 stage because F2 gives none. |
| mapNodeOnly | boolean | 36% | Concept known only from the book’s concept map (no revision card). |

### Concept edge
`relation` edges carry a label (File 1); `flow` edges follow the book’s conceptual sequence (File 2).

249 records.

| Field | Type | Present in | Meaning |
| --- | --- | --- | --- |
| from | string | 100% |  |
| to | string | 100% |  |
| kind | string | 100% | Case: `textbook` / `practice` / `scenario`; exam prompt: long/short/conceptual/viva/difference/scenario/answer-plan; concept edge: `relation` / `flow`. |
| origin | array | 100% | Which source(s) contributed: `f1`, `f2`. |
| label | string | 51% |  |

### Financing mode
A financing MODE is a contract; a PRODUCT is a real-world application. The relationship is many-to-many: `product.modeIds` ↔ graph edges.

19 records.

| Field | Type | Present in | Meaning |
| --- | --- | --- | --- |
| id | string | 100% | Stable canonical id (never an array index). Source ids are kept (F1: `t9.3`, `q1.1`, `f1.1`; F2: `q-ch1-1`, `fc-ch1-1`, `cs-murabaha-1`); merged duplicates list the retired id in `aliases`. |
| name | string | 100% |  |
| category | string | 100% | Flashcard / glossary / mode category (was `cat`). |
| chapter | number | 100% |  |
| conceptId | string | 100% | Concept card for the mode. |
| shariahBasis | string | 100% |  |
| subjectMatter | string | 100% |  |
| ownershipRiskTiming | string | 100% |  |
| returnType | string | 100% |  |
| returnTypeDetail | string | 100% |  |
| typicalTenor | string | 100% |  |
| liquidityTradability | string | 100% |  |
| commonUse | string | 100% |  |
| keyConditions | array | 100% |  |
| majorRisks | array | 100% |  |
| distinguishingFeature | string | 100% |  |
| source | object | 100% | `{chapter, section, pages[]}` (or the book/section for glossary) — never invented. |
| origin | array | 100% | Which source(s) contributed: `f1`, `f2`. |
| aliases | array | 100% | Ids of the other application’s records merged into this one (used to migrate saved progress). |
| attributes | object | 63% | F1 comparison-matrix attributes (nature, ownership, return, payment, late, tenor, uses, keyRule, pitfall). |
| topicId | string | 100% | Canonical topic (F1 granularity). F2 sections are resolved to it by section range. |
| altNames | array | 16% | Other name(s) used by the other source. |

### Product
58 records.

| Field | Type | Present in | Meaning |
| --- | --- | --- | --- |
| id | string | 100% | Stable canonical id (never an array index). Source ids are kept (F1: `t9.3`, `q1.1`, `f1.1`; F2: `q-ch1-1`, `fc-ch1-1`, `cs-murabaha-1`); merged duplicates list the retired id in `aliases`. |
| name | string | 100% |  |
| category | string | 100% | Flashcard / glossary / mode category (was `cat`). |
| who | array | 100% |  |
| use | array | 100% |  |
| need | string | 100% |  |
| contracts | array | 100% |  |
| modeIds | array | 100% | Financing modes (contracts) involved. |
| topicIds | array | 100% | Topics where the item is taught. |
| how | array | 100% |  |
| numerical | object | 100% |  |
| controls | array | 100% |  |
| risks | array | 100% |  |
| conventional | object | 100% |  |
| origin | array | 100% | Which source(s) contributed: `f1`, `f2`. |
| diagramId | string | 69% |  |
| calcId | string | 59% |  |
| caseIds | array | 28% |  |

### Transaction diagram
34 records.

| Field | Type | Present in | Meaning |
| --- | --- | --- | --- |
| id | string | 100% | Stable canonical id (never an array index). Source ids are kept (F1: `t9.3`, `q1.1`, `f1.1`; F2: `q-ch1-1`, `fc-ch1-1`, `cs-murabaha-1`); merged duplicates list the retired id in `aliases`. |
| title | string | 100% |  |
| topicId | string | 100% | Canonical topic (F1 granularity). F2 sections are resolved to it by section range. |
| conceptId | string | 100% | Concept card for the mode. |
| modeId | string | 94% |  |
| productIds | array | 100% | Products built on the mode / used in the case. |
| summary | string | 100% |  |
| parties | array | 100% |  |
| steps | array | 100% |  |
| rules | array | 100% |  |
| pitfalls | array | 100% |  |
| origin | array | 100% | Which source(s) contributed: `f1`, `f2`. |

### Comparison
29 records.

| Field | Type | Present in | Meaning |
| --- | --- | --- | --- |
| id | string | 100% | Stable canonical id (never an array index). Source ids are kept (F1: `t9.3`, `q1.1`, `f1.1`; F2: `q-ch1-1`, `fc-ch1-1`, `cs-murabaha-1`); merged duplicates list the retired id in `aliases`. |
| title | string | 100% |  |
| topicId | string | 100% | Canonical topic (F1 granularity). F2 sections are resolved to it by section range. |
| columns | array | 100% | Column labels of a comparison (rows are `[aspect, …one cell per column]`). |
| rows | array | 100% |  |
| origin | array | 100% | Which source(s) contributed: `f1`, `f2`. |
| aliases | array | 100% | Ids of the other application’s records merged into this one (used to migrate saved progress). |
| titleAlt | string | 41% | The other source’s title for a merged comparison. |
| summary | string | 55% |  |
| source | object | 55% | `{chapter, section, pages[]}` (or the book/section for glossary) — never invented. |
| columnsAlt | array | 41% | Column labels used by the second source. |

### Case study
Two shapes share one schema: cases with worked multiple-choice `questions` + `analysis`, and cases with `problem` / `prompts` / `answer` / `explanation` / `examTakeaway`.

61 records.

| Field | Type | Present in | Meaning |
| --- | --- | --- | --- |
| id | string | 100% | Stable canonical id (never an array index). Source ids are kept (F1: `t9.3`, `q1.1`, `f1.1`; F2: `q-ch1-1`, `fc-ch1-1`, `cs-murabaha-1`); merged duplicates list the retired id in `aliases`. |
| kind | string | 100% | Case: `textbook` / `practice` / `scenario`; exam prompt: long/short/conceptual/viva/difference/scenario/answer-plan; concept edge: `relation` / `flow`. |
| title | string | 100% |  |
| chapter | number | 100% |  |
| topicId | string | 100% | Canonical topic (F1 granularity). F2 sections are resolved to it by section range. |
| modeIds | array | 100% | Financing modes (contracts) involved. |
| scenario | string | 100% |  |
| facts | array | 31% |  |
| questions | array | 31% |  |
| analysis | string | 31% |  |
| takeaways | array | 31% |  |
| source | object | 100% | `{chapter, section, pages[]}` (or the book/section for glossary) — never invented. |
| productIds | array | 100% | Products built on the mode / used in the case. |
| origin | array | 100% | Which source(s) contributed: `f1`, `f2`. |
| conceptLabel | string | 69% |  |
| problem | string | 69% |  |
| prompts | array | 69% |  |
| answer | string | 69% |  |
| explanation | string | 69% |  |
| examTakeaway | string | 69% |  |
| disclaimer | string | 69% |  |


## Relationship types (graph)

| Edge | Stored count |
| --- | --- |
| case —relatedModes→ mode | 49 |
| case —relatedProducts→ product | 19 |
| case —relatedTopics→ topic | 61 |
| comparison —relatedTopics→ topic | 29 |
| concept —relatedTopics→ topic | 218 |
| diagram —relatedConcepts→ concept | 34 |
| diagram —relatedModes→ mode | 32 |
| diagram —relatedTopics→ topic | 34 |
| finderResult —relatedModes→ mode | 29 |
| mode —relatedConcepts→ concept | 19 |
| mode —relatedTopics→ topic | 19 |
| product —relatedCalculators→ calculator | 34 |
| product —relatedCases→ case | 19 |
| product —relatedConcepts→ concept | 177 |
| product —relatedDiagrams→ diagram | 40 |
| product —relatedModes→ mode | 125 |
| product —relatedTopics→ topic | 141 |
| topic —relatedCalculators→ calculator | 14 |
| topic —relatedConcepts→ concept | 571 |
| topic —relatedTopics→ topic | 701 |

Edges implied by record fields and therefore not stored: question/flashcard/exam prompt/glossary → topic, chapter → topic, mode → concept. At runtime numericals and calculators add their own edges (topic, product, mode).

## Application state (APP_STATE_VERSION 3)

Stored under `localStorage["ifl.v3"]`. Fields: `version, created, settings{theme, level, fontScale, reduceMotion, dailyGoal, name, examDate}, topics{id → visited, completed, time, views}, chapters, answers{questionId → n, correct, last, lastCorrect, topic}, attempts[], cards{flashcardId → reps, ease, interval, due, lapses, last, grade}, reviews[], notes[], bookmarks[], activity[], days{}, timerSessions[], guided{}, exam{}, cases{}, calcs{}, numericals{}, achievements{}, legacy{reviewsBefore, imported}, last{}`.

### Migrations (`modules/migrate.js`)
| Function | From | To | Notes |
| --- | --- | --- | --- |
| `migrateF1StateToV3` | `ifl.v1` (File 1) | v3 | ids unchanged; new collections added; SRS cards sanitised |
| `migrateF2StateToV3` | `ifl_v1` (File 2) | v3 | topic ids → canonical topics they span; question/flashcard/concept/comparison ids through alias tables; Leitner box → interval/ease/due; `flashcardsReviewedCount` kept; streak days reconstructed from `lastStudyDate` + `streakDays`; crash-course progress → guided; notes/bookmarks re-targeted with working routes |
| `mergeStates` | v3 + v3 | v3 | latest review wins per card, highest completion per topic, union of notes/bookmarks/attempts |
| `migrateStateV3ToLatest` | v3 | v3+ | version ladder for future changes |

Legacy records are left in place, never overwritten. Import (Settings) accepts an export from this application or from either earlier application, with merge or replace.

## Reference-integrity checker

`node tools/check-integrity.js` validates: unique ids for every type; no dangling topic, concept, mode, product, diagram, case or comparison reference; question structure per type (option indexes, tf boolean, multi index sets, pairs, items, written answers); difficulty and cognitive-level vocabularies; chapter/topic consistency; case, diagram (party references) and comparison (row width) structure; finder graph (no dangling `next`/`result`); study-plan references; alias targets; every graph endpoint. Current result: **0 problems** across 6414 checked objects.
