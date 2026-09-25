# Content schema

All textbook-derived content lives in `data/`. Files are plain classic scripts that
register objects on `window.IFL_DATA` so the app works from `file://` as well as
from a web server. Nothing in `data/` contains UI or user state.

## data/chapters/chNN.js — `IFL_DATA.registerChapter({...})`

| field | meaning |
|---|---|
| `number`, `title`, `part`, `pages` | as in `source/source-map.json` (printed pages) |
| `minutes`, `difficulty` | estimated study time; Foundational / Intermediate / Advanced |
| `objectives[]`, `why`, `overview` | chapter framing |
| `topics[]` | one per textbook section (see below) |
| `summarySection` | section number of the chapter's own Summary section, represented by `summary` |
| `summary`, `takeaways[]`, `checklist[]` | end-of-chapter material |
| `flashcards[]` | `{id, cat, front, back, topic}` |
| `questions[]` | quiz items (see below) |
| `exam[]` | exam-trainer items `{id, kind, q, structure[], keyConcepts[], points[], mistakes[], topic}` |

### Topic
`{id: "t9.8", section: "9.8", title, pages: [start, end], tier, concepts[], intuition, simple,
academic[], exam, keyPoints[], definitions[{term, meaning}], conditions[], principles[], steps[],
examples[{title, text, kind}], confusions[{wrong, right}], distinctions[{a, b, text}],
subsections[{number, title, page, points[]}], debate[{issue, criticism, response, alternative, takeaway}],
table{caption, head[], rows[][]}, calc{...}, related[], quickCheck{q, options[], answer, explanation}}`

* `tier`: `core` | `supporting` | `detailed` | `revision` — neutral categories, not rankings.
* `examples[].kind`: `textbook` (paraphrase of the book's own example) or `practice`
  (generated for learning; always labelled in the UI).
* `debate`: used where the book presents an argument/criticism and the author's response.

### Question
`{id, type, q, options[], answer, explanation, topic, diff: E|M|H, level: recall|understanding|application|analysis, obj}`

* `type`: mcq, tf, multi, match (`pairs[[l, r]]`), order (`items[]` in correct order),
  definition, identify, comparison, scenario, application (all single-answer, `answer` = index),
  short (`answer` = model answer, `keywords[]`).
* `tf`: `answer` is boolean. `multi`: `answer` is an array of indices.
