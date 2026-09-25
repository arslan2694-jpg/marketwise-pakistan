# Cross-Cutting Data Authoring Guide

You are authoring the cross-chapter data files for an MBA Islamic Finance
study app based on Muhammad Ayub's *Understanding Islamic Finance*. Read
`source/AUTHORING_GUIDE.md` first for the source-grounding rules (preserve
the author's terminology/structure, no invented Shariah rulings, paraphrase
don't copy verbatim, label generated practice content clearly) — they apply
here too. Also skim `source/chapter-index.json` for exact section titles/page
numbers.

All files are plain scripts (no import/export), loaded directly in a browser
with no build step, appending to `window.IFL_DATA`. Write valid JS object
literals. No placeholder text.

Source chapter texts (machine-extracted, `p.N` = printed page markers) are at
`source/extraction-notes/chapters/chNN.txt`.

## 1. `data/comparisons.js` — Comparison Lab

The book contains several EXPLICIT comparison sections — use them as your
primary grounding (paraphrase, don't copy):
- Chapter 6, section 6.3.1 "Trade (Profit) versus Interest: Permissibility versus Prohibition" (ch06.txt)
- Chapter 9, section 9.11 "Musawamah (Bargaining on Price)" — compare Murabaha vs Musawamah, and see 9.2-9.6 for Murabaha's own defining conditions (ch09.txt)
- Chapter 10 — Salam (10.2-10.9) vs Istisna'a (10.11) both being forward sales; only note distinctions the text actually draws (e.g. price payment timing, subject matter fungibility, binding nature) (ch10.txt)
- Chapter 11, section 11.2.1 "Ijarah and Bai' Compared" (ch11.txt)
- Chapter 11, section 11.4.4 "Appraisal of Conventional Leases from the Shari'ah Angle" — Ijarah vs conventional leasing (ch11.txt)
- Chapter 12, section 12.5 "Mudarabah Distinguished from Musharakah" (ch12.txt)
- Chapter 15 — Sukuk's defining features vs conventional bonds/debt instruments, drawn from 15.3 (categories, tradability) and 15.3.4 (Shari'ah bases) (ch15.txt)
- Chapter 16, section 16.5 "Takaful and Conventional Insurance Compared" (ch16.txt)
- Chapter 17, section 17.4.3 "Difference between Islamic and Conventional Banking" (ch17.txt)

Write `islamic-finance-learning/data/comparisons.js`:
```js
window.IFL_DATA = window.IFL_DATA || {};
window.IFL_DATA.comparisons = [
  {
    id: "riba-vs-trade",              // kebab-case
    title: "Riba (Interest) vs Trade Profit",
    itemALabel: "Riba (Interest)",
    itemBLabel: "Trade Profit (Bai')",
    summary: "1-2 sentence framing",
    dimensions: [
      { dimension: "Nature of the transaction", itemA: "...", itemB: "..." },
      { dimension: "Risk", itemA: "...", itemB: "..." }
      // only dimensions the book actually supports: e.g. Nature of contract,
      // Subject matter, Ownership, Risk, Return, Payment timing, Asset
      // involvement, Obligations, Purpose, relevant Shari'ah requirement
    ],
    source: { chapters: [3, 6], sections: ["3.2.1", "6.3.1"], pages: [44, 132] }
  }
  // one entry per comparison listed above (~9 entries)
];
```

## 2. `data/case-studies.js` — Case Study Lab

Interactive application scenarios (NOT textbook-verbatim examples — these are
practice scenarios YOU write, clearly grounded in the book's actual rules for
the relevant financing mode, so a student can apply concepts to a business
situation). Cover Murabaha, Salam, Istisna'a, Ijarah, Musharakah, Mudarabah,
Diminishing Musharakah, Sukuk, and Takaful — 2 scenarios each (18 total).

Write `islamic-finance-learning/data/case-studies.js`:
```js
window.IFL_DATA = window.IFL_DATA || {};
window.IFL_DATA.caseStudies = [
  {
    id: "cs-murabaha-1",
    title: "A short, concrete title",
    chapter: 9,
    concept: "Murabaha to Purchase Orderer",
    scenario: "2-4 sentence realistic business situation requiring financing.",
    problemPrompt: "What financing mode/structure applies here, and what must the bank ensure?",
    analysisPrompts: [ "guiding question 1", "guiding question 2" ],
    textbookAnswer: "The mode/structure that applies, grounded in the book's own conditions for it.",
    whyExplanation: "The specific rule/condition from the book that makes this the right answer.",
    examTakeaway: "One crisp sentence a student should remember for exams.",
    source: { chapter: 9, section: "9.8", pages: [222] }
  }
  // 18 entries total, 2 per financing mode listed above
];
```
Every scenario must end with this exact disclaimer field on each entry:
`"disclaimer": "Educational scenario for applying Muhammad Ayub's textbook framework — not a Shari'ah ruling or professional financial/legal advice."`

## 3. `data/concept-map.js` — Concept Map

A node/edge graph a student can click through. Ground the hierarchy in the
book's own Part/Chapter structure and the relationships it draws (e.g.
Shari'ah -> Maqasid -> prohibitions -> contract principles -> financing
modes -> banking/capital markets -> Sukuk/Takaful).

Write `islamic-finance-learning/data/concept-map.js`:
```js
window.IFL_DATA = window.IFL_DATA || {};
window.IFL_DATA.conceptMap = {
  nodes: [
    { id: "shariah", label: "Islamic Shari'ah", chapter: 2, href: "#/chapter/2", group: "foundations" },
    { id: "maqasid", label: "Maqasid al-Shari'ah", chapter: 2, href: "#/chapter/2", group: "foundations" }
    // ~35-50 nodes total spanning: Islamic economic system, Shari'ah, Maqasid,
    // main prohibitions (Riba/Gharar/Maisir), business ethics, contract law
    // (Mal, Wa'dah, contract types), trading rules, loan/debt rules, each
    // major financing mode (Murabaha, Musawamah, Salam, Istisna'a, Ijarah,
    // Musharakah, Mudarabah, Diminishing Musharakah), accessory contracts
    // (Wakalah, Tawarruq, Ju'alah), Sukuk, Takaful, criticism/appraisal,
    // way forward. group = a short category tag you choose consistently
    // (e.g. "foundations","prohibitions","contracts","modes","markets","appraisal")
  ],
  edges: [
    { from: "shariah", to: "maqasid" }
    // an edge for every meaningful relationship implied by the book's
    // structure/cross-references (e.g. prohibitions -> the modes that avoid
    // them; Musharakah -> Diminishing Musharakah; Sukuk -> Musharakah/Ijarah
    // as underlying structures used in securitization, etc.)
  ]
};
```

## 4. `data/decision-tree.js` — "Which Mode Might Apply?" tool

An educational decision tool (NOT a Shari'ah ruling engine). Base the
branches and the modes/conditions/risks referenced on the actual chapters
(9-14). Write `islamic-finance-learning/data/decision-tree.js`:
```js
window.IFL_DATA = window.IFL_DATA || {};
window.IFL_DATA.decisionTree = {
  disclaimer: "Educational tool based on Muhammad Ayub's textbook; not a Shari'ah ruling or professional advice.",
  root: "q-purpose",
  questions: {
    "q-purpose": {
      prompt: "What is the primary financing purpose?",
      options: [
        { label: "Buying a specific existing asset/goods", next: "q-asset-need" },
        { label: "Working capital / trade finance", next: "..." },
        { label: "Manufacturing / constructing something not yet existing", next: "..." },
        { label: "Need the use of an asset without owning it outright", next: "..." },
        { label: "Partnering in a business venture", next: "..." },
        { label: "Managing liquidity", next: "..." }
      ]
    }
    // build out a reasonable tree (8-15 question nodes) that terminates in
    // result nodes
  },
  results: {
    "r-murabaha": {
      modes: ["Murabaha", "Murabaha to Purchase Orderer"],
      whyRelevant: "...",
      basicStructure: "...",
      keyConditions: ["...", "..."],
      majorRisks: ["...", "..."],
      chapter: 9,
      href: "#/chapter/9"
    }
    // one result node per terminal branch, referencing chapters 9-14 (and 15/16 if liquidity/risk-pooling leads there)
  }
};
```
Question/result node ids you invent just need to be internally consistent
(every `next`/root points to a real key in `questions` or `results`, prefix
`r-` for a result leaf you place directly in a question's `next`, resolved
by the app treating any `next` starting with `r-` as a lookup into `results`
instead of `questions`).

## 5. `data/study-modes.js` — Crash course / revision / deep-study paths

Write `islamic-finance-learning/data/study-modes.js`:
```js
window.IFL_DATA = window.IFL_DATA || {};
window.IFL_DATA.studyModes = {
  "45": {
    title: "45-Minute Crash Course",
    totalMinutes: 45,
    segments: [
      { label: "Foundations", startMin: 0, endMin: 5, chapters: [1,2], topicRefs: [], summary: "..." },
      { label: "Riba, Gharar, Maisir", startMin: 5, endMin: 10, chapters: [3], topicRefs: [], summary: "..." },
      { label: "Contracts", startMin: 10, endMin: 18, chapters: [5,6,7], topicRefs: [], summary: "..." },
      { label: "Murabaha", startMin: 18, endMin: 25, chapters: [9], topicRefs: [], summary: "..." },
      { label: "Salam & Istisna'a", startMin: 25, endMin: 30, chapters: [10], topicRefs: [], summary: "..." },
      { label: "Ijarah", startMin: 30, endMin: 34, chapters: [11], topicRefs: [], summary: "..." },
      { label: "Musharakah & Mudarabah", startMin: 34, endMin: 39, chapters: [12], topicRefs: [], summary: "..." },
      { label: "Sukuk", startMin: 39, endMin: 42, chapters: [15], topicRefs: [], summary: "..." },
      { label: "Takaful", startMin: 42, endMin: 44, chapters: [16], topicRefs: [], summary: "..." },
      { label: "Rapid-fire quiz", startMin: 44, endMin: 45, chapters: [], topicRefs: [], quiz: true }
    ]
  },
  "90": {
    title: "90-Minute Revision",
    totalMinutes: 90,
    segments: [
      { label: "Foundations", startMin: 0, endMin: 10, chapters: [1,2], summary: "..." },
      { label: "Prohibitions", startMin: 10, endMin: 20, chapters: [3], summary: "..." },
      { label: "Contracts", startMin: 20, endMin: 35, chapters: [5,6,7], summary: "..." },
      { label: "Major financing modes", startMin: 35, endMin: 60, chapters: [9,10,11,12], summary: "..." },
      { label: "Comparisons", startMin: 60, endMin: 70, chapters: [], summary: "Use the Comparison Lab", comparisons: true },
      { label: "Sukuk", startMin: 70, endMin: 78, chapters: [15], summary: "..." },
      { label: "Takaful", startMin: 78, endMin: 84, chapters: [16], summary: "..." },
      { label: "Practice questions", startMin: 84, endMin: 90, chapters: [], quiz: true }
    ]
  },
  "180": {
    title: "3-Hour Deep Study",
    totalMinutes: 180,
    segments: [
      // Build ~10-14 segments covering all 18 chapters at real depth,
      // following the Concept -> Explanation -> Example -> Comparison ->
      // Practice -> Flashcards -> Quiz -> Review flow described for this
      // mode; each segment names its chapters/summary like above.
    ]
  }
};
```
Write real 1-3 sentence `summary` text per segment (grounded in that
chapter's actual content, not generic filler).

## 6. `data/exam-prep.js` — Exam Answer Trainer sets

Pick 12-18 substantial essay/short-answer questions spanning the book
(definitions, differences, conceptual, scenario-based — favor the topics
most central to the book: Riba/Gharar/Maisir, contract validity, each major
financing mode, Sukuk, Takaful, and the Chapter 17 criticisms). Write
`islamic-finance-learning/data/exam-prep.js`:
```js
window.IFL_DATA = window.IFL_DATA || {};
window.IFL_DATA.examPrep = {
  trainerSets: [
    {
      id: "et-1",
      chapter: 3,
      question: "Explain the prohibition of Riba and how it differs from a legitimate trade profit.",
      expectedStructure: [ "Define Riba", "State the Qur'anic/Shari'ah basis briefly as the book presents it", "Contrast with Bai' profit", "Conclude with the underlying rationale (risk-sharing vs guaranteed return)" ],
      keyConcepts: [ "Riba", "Bai'", "Gharar (if relevant)" ],
      essentialPoints: [ "...", "..." ],
      commonMistakes: [ "...", "..." ],
      source: { chapter: 3, section: "3.2.1", pages: [44] }
    }
  ]
};
```

## Self-check

After writing all 6 files, re-read each for JS syntax validity (balanced
braces/brackets, no trailing commas). Report back file-by-file counts
(comparisons, case studies, concept-map nodes/edges, decision-tree question
count, study-mode segment counts, exam-prep trainer set count) and anything
you had to omit due to unrecoverable source text.
