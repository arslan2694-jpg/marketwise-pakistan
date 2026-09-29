# Content Reconciliation

Generated 2026-09-29 by `merged-src/tools/build-reports.js` from `merged-src/data/_audit.json`, the canonical data files and the QA result files. Every number below is computed, not estimated.

**Columns.** *File 1* and *File 2* are the record counts in the two original applications. *True duplicates* are records collapsed into one canonical record because keeping both added no educational or functional value. *Complementary / merged* describes records that overlap in subject but carry different information (kept, and merged where they describe the same thing). *Final unique* is what the merged platform contains.

| Content type | File 1 | File 2 | True duplicates | Complementary / merged | Final unique |
| --- | --- | --- | --- | --- | --- |
| Parts | 3 | 3 | 3 | 0 | 3 |
| Chapters | 18 | 18 | 18 | 0 | 18 |
| Sections / topics | 311 topics | 225 topic records (214 distinct section citations) | 0 | 225 attached as extended notes | 311 topics (+ 225 extended-notes sections) |
| Learning objectives | 119 | 124 | 3 | wording variants kept as “also phrased” | 240 |
| Definitions embedded in topics | 183 | 323 | 0 | kept in place; unified by term in the Glossary view | 506 |
| Glossary entries | 191 | 180 | 180 | 178 F2 definitions kept as “fuller definition” | 191 |
| Acronyms | 0 | 119 | 0 | 0 | 119 |
| Concepts (revision cards / map nodes) | 54 | 64 | 33 | 31 map-only nodes added | 85 |
| Concept edges | 127 | 124 | 2 | relation and flow edges kept as separate kinds | 249 |
| Flashcards | 498 | 558 | 3 | 0 | 1053 |
| Questions (stored) | 771 | 572 | 5 | near-similar questions with different answers kept | 1338 |
| Questions (derived at runtime) | 311 quick checks + 198 product questions | 0 | 0 | — | 509 derived (pool total 1847) |
| Exam answer prompts | 110 | 26 | 0 | 0 similar pairs linked, both kept | 136 |
| Case studies | 19 | 42 | 0 | 0 | 61 |
| Financing modes (contracts) | 12 (comparison matrix) | 19 | 12 | 7 F2-only modes; F1 attributes merged onto F2 profiles | 19 |
| Products / applications | 58 | 0 | 0 | 0 | 58 |
| Transaction diagrams | 34 | 0 (18 step lists kept as extended notes) | 0 | 0 | 34 |
| Numerical exercises (trainer) | 33 generators (12 with textbook figures) | 0 | 0 | — | 33 |
| Worked numericals inside products / topics | 58 product examples | 14 topic walkthroughs | 0 | kept in their own places | 72 |
| Calculators / rule checkers | 23 | 6 | 3 | 3 F2 calculators absorbed into F1 ones (features added); 3 F2 calculators new; F1 “sleeping partner” merged into the Musharakah calculator | 25 |
| Comparisons | 25 | 16 | 0 | 12 pairs merged (all rows from both kept) | 29 |
| Mode-finder results | 14 | 14 | 0 | two pathways, one renderer | 28 |
| Guided study modes | 3 | 3 | 0 | 3 merged (F2 roadmaps attached) | 3 |
| Achievements | 11 | 16 | 8 | union of both lists | 19 |
| Relationship-graph edges (stored) | — | — | — | — | 2365 + derived |

## How “true duplicate” was decided

Two records were collapsed only when their prompts / terms were substantively the same **and** their answers were the same. A near-similar question that tests the same fact with a different answer or different reasoning was kept.

### Questions collapsed (5)
| Kept (File 1 id) | Collapsed (File 2 id) | Prompt similarity | Answer similarity | Kept prompt | Collapsed prompt |
| --- | --- | --- | --- | --- | --- |
| q2.20 | q-ch2-8 | 0.82 | 1 | How many socio-economic imperatives for studying Islamic economics does M.A. Man | How many socio-economic imperatives for studying Islamic economics does M.A. Man |
| q3.27 | q-ch3-12 | 0.5 | 0.91 | Which rationale for the prohibition of interest does the author find most convin | Which rationale does Ayub identify as the most convincing basis for the prohibit |
| q7.42 | q-ch7-24 | 0.55 | 1 | The OIC Islamic Fiqh Council, including Malaysia’s representatives, unanimously  | True or False: The OIC Islamic Fiqh Council, despite including Malaysian represe |
| q8.14 | q-ch8-1 | 1 | 1 | The word “bank” is said to derive from the Italian “banco”, meaning: | The word 'bank' is said to derive from the Italian word 'banco', meaning: |
| q15.27 | q-ch15-11 | 0.71 | 1 | The OIC Islamic Fiqh Council approved the prohibition of Bai‘ al Dayn unanimousl | True or False: The OIC Islamic Fiqh Council, with Malaysian representation, unan |

Where the collapsed question's explanation differed, it is kept on the surviving question as `explanationAlt`; the collapsed id is stored as an alias so earlier progress still maps.

### Flashcards collapsed (3)
| Kept (File 1 id) | Collapsed (File 2 id) | Front similarity | Back similarity | Kept front | Collapsed front |
| --- | --- | --- | --- | --- | --- |
| f2.3 | fc-ch2-4 | 0.83 | 1 | Six primary objectives (Maqasid) of Shari’ah | List the six Primary Objectives (Maqasid) of Shari'ah. |
| f2.17 | fc-ch2-8 | 0.75 | 1 | Mannan’s seven imperatives for studying Islamic economics | Name M.A. Mannan's seven imperatives for studying Islamic economics. |
| f5.5 | fc-ch5-7 | 0.67 | 0.91 | Three essential elements of a contract | What are the three essential elements of a valid contract ('Aqd)? |

### Glossary
All 180 File 2 glossary terms correspond to a File 1 term (180 File 1 entries carry both sources). 171 matched after ignoring spacing, diacritics and quote style; 9 were transliteration variants confirmed by reading both definitions (`Kharaj bi-al-Daman`/`Kharaj bil Daman`, `Mithlam-bi-mithlin`/`Mithlan bi-mithlin`, `Muzara‘a`/`Muzara‘ah`, `Yadam-bi-yadin`/`Yadan bi-yadin`, `Saw´am-bi-sawaa´`/`Sawa’an bi-sawa’in`, `Hilah, Hiyal (plural)`/`Hilah (Hiyal)`, `‘Inan (a type of Shirkah)`/`‘Inan`, `W‘adah`/`Wa‘d`, `Zakah/Zakat`/`Zakah`). A blind edit-distance match would have merged `W‘adah` (promise) with `Wadi‘ah` (deposit); it was overridden by hand. 178 entries keep both wordings (`definition` and `extendedDefinition`).

### Learning objectives, takeaways
Objectives were merged when their wording overlapped (≥ 0.6 word overlap); the second wording is kept as `altText`. Chapter takeaways are collapsed only when byte-identical.

## Zero-loss check (string level)

`tools/qa/zero-loss.js` walks every string in every record of both original applications and looks for it in the canonical data.

- Strings audited: **52813**
- Not byte-identical but explained: {"implicit true/false option labels (canonical tf questions store a boolean)":150,"typographic / spacing / case variant of a string that is present":4,"same wording re-ordered (identical content words) as a definition that is present":1,"internal id / route string (ids were canonicalised through alias tables)":20,"label kept with an “(extended)” suffix":1}
- **Unexplained: 0**

The only records intentionally not carried over are the 5 question and 3 flashcard true duplicates listed above (the surviving record is the same fact with the same answer).
