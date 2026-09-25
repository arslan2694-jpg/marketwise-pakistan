# Chapter Content Authoring Guide

You are authoring structured learning content for an MBA-level Islamic Finance
study app, grounded strictly in Muhammad Ayub's *Understanding Islamic Finance*
(John Wiley & Sons). This guide is shared by every agent authoring chapters.

## Source rule (critical)

- Your ONLY source is the chapter text file(s) you are given
  (`source/extraction-notes/chapters/chNN.txt`), which is machine-extracted
  text from the actual book, with page markers like `----- p.44 (pdf 72) -----`
  (the `p.N` is the PRINTED book page — use this number for citations).
- Preserve the author's terminology, definitions, conditions, structures,
  examples, arguments, and criticisms. Do not replace them with generic
  internet knowledge about Islamic finance.
- Do NOT invent Shariah rulings or present your own interpretation as the
  author's view.
- Paraphrase — do not reproduce long verbatim passages (a phrase or short
  definition-length quote is fine; multi-sentence verbatim copying is not).
- If you add a numeric example not from the text (for calculation practice),
  label it clearly with `"generated": true` and title it
  "Practice Example — generated for learning". Never present invented numbers
  as the book's own example.
- Where the text is genuinely ambiguous or a figure/box is referenced but its
  content isn't recoverable from extracted text, state that plainly in the
  field rather than inventing content.
- The extraction has OCR noise (stray spaces inside words like "Murabah a",
  macron marks over Arabic transliteration letters e.g. "Shar ¯ı´ah" which
  you should render as "Shari'ah", "Qim ¯ar" -> "Qimar"). Clean this up as you
  write, using standard transliteration (Shari'ah, Riba, Gharar, Maisir,
  Qimar, Murabaha, Musawamah, Salam, Istisna'a, Ijarah, Musharakah, Mudarabah,
  Wakalah, Tawarruq, Ju'alah, Sukuk, Takaful, Hawalah, Kafalah, Khiyar,
  Wa'dah, 'Arbun, Bai' al-Dayn, etc.)

## Output format

For each assigned chapter N, write ONE file:
`islamic-finance-learning/data/chapters/ch{NN}.js` (NN = zero-padded, e.g. ch01.js)

It must be a plain script (NOT an ES module — no import/export) that pushes
into a shared global, exactly this shape:

```js
window.IFL_DATA = window.IFL_DATA || {};
window.IFL_DATA.chapters = window.IFL_DATA.chapters || {};
window.IFL_DATA.chapters[N] = {
  chapterNumber: N,
  title: "...",              // exact title from source/chapter-index.json
  part: "I" | "II" | "III",
  estimatedMinutes: 40,       // reasonable study estimate given length
  difficulty: "foundation" | "intermediate" | "advanced",
  learningObjectives: [ "...", "..." ],   // 4-7 objectives, student-facing
  whyItMatters: "...",        // 2-4 sentences, grounded in the chapter's own themes
  topics: [
    {
      id: "ch{N}-t{i}",       // sequential within chapter, e.g. ch9-t1
      sectionNumber: "9.2",   // from chapter-index.json where applicable
      sectionTitle: "...",
      title: "...",           // a clear topic title (can equal sectionTitle)
      overview: "...",        // 1-2 sentence framing
      simpleExplanation: "...",     // Level 1 - plain, intuitive, no jargon
      academicExplanation: "...",   // Level 2 - MBA-level, proper terminology
      examExplanation: "...",       // Level 3 - compact exam-ready answer
      keyPoints: [ "...", "..." ],
      definitions: [ { "term": "...", "definition": "..." } ],   // [] if none
      conditions: [ "...", "..." ],     // Shariah/legal conditions, [] if none
      principles: [ "...", "..." ],     // [] if none
      processSteps: [ "...", "..." ],   // ordered steps if the topic describes a procedure/transaction, else []
      examples: [ { "title": "...", "body": "...", "generated": false } ],  // from text; generated:true only for your own practice examples
      calculations: [   // OPTIONAL — only when the topic has a genuine numeric worked example (deposit weightage, profit/loss split, cost-plus pricing, rent/amortization schedules, etc.)
        {
          "title": "...",              // e.g. "Box 8.1: Weighted Profit Distribution Across a Deposit Pool"
          "formula": "...",            // one-line formula in plain text
          "inputs": [ { "label": "...", "value": "..." } ],
          "steps": [ "...", "..." ],   // numbered arithmetic steps, showing the actual numbers
          "result": "...",             // the final numeric answer, stated plainly
          "interpretation": "...",     // what the result means / why it matters
          "generated": false,          // true + a "Practice Example — generated for learning" title if you authored the numbers yourself
          "source": { "chapter": N, "section": "...", "pages": [...] }
        }
      ],
      commonConfusions: [ "...", "..." ],       // [] if none identified
      importantDistinctions: [ "...", "..." ],  // e.g. vs a related concept, [] if none
      relatedConcepts: [ "Murabaha", "Musawamah" ],   // topic titles/terms, not ids
      examRelevance: "core" | "supporting" | "detailed" | "revision",
      difficulty: "beginner" | "intermediate" | "advanced",
      source: { "chapter": N, "section": "9.2", "pages": [214] }   // printed page numbers actually covering this topic
    }
  ],
  chapterSummary: "...",      // 3-5 sentences
  keyTakeaways: [ "...", "..." ]   // 5-8 bullets
};
```

Guidance on splitting into topics: roughly one topic per major (X.Y) section,
merging trivial sections (e.g. a bare "Introduction" or "Summary" section)
into the neighboring substantive topic rather than giving them their own
card. A chapter should typically yield 5-12 topics. Where the book presents
criticism/argument/response (this matters especially for Chapter 17), use
this structure inside the relevant topic's `academicExplanation` or as
explicit fields: add `"issue"`, `"criticism"`, `"authorsResponse"`,
`"alternativeView"` (only if the text presents one), `"studentTakeaway"` as
extra optional fields on that topic object when applicable.

## Also produce: flashcards and quiz questions

For each assigned chapter also write:

`islamic-finance-learning/data/flashcards/ch{NN}.js`:
```js
window.IFL_DATA = window.IFL_DATA || {};
window.IFL_DATA.flashcards = window.IFL_DATA.flashcards || [];
window.IFL_DATA.flashcards.push(
  {
    id: "fc-ch9-1",
    chapter: N,
    category: "Definitions" | "Arabic terminology" | "Principles" | "Prohibitions" | "Contract rules" | "Financing modes" | "Banking" | "Capital markets" | "Risk" | "Comparisons" | "Exam facts",
    front: "...",       // question or term
    back: "...",        // answer/explanation
    source: { chapter: N, section: "9.2", pages: [214] }
  }
  // aim for roughly 1.5-2.5 cards per topic in the chapter
);
```

`islamic-finance-learning/data/questions/ch{NN}.js`:
```js
window.IFL_DATA = window.IFL_DATA || {};
window.IFL_DATA.questions = window.IFL_DATA.questions || [];
window.IFL_DATA.questions.push(
  {
    id: "q-ch9-1",
    chapter: N,
    section: "9.2",
    topic: "Conditions of Valid Bai'",
    type: "mcq" | "truefalse" | "multiselect" | "matching" | "ordering" | "definition" | "identify" | "comparison" | "scenario" | "short",
    difficulty: "easy" | "medium" | "hard",
    cognitiveLevel: "recall" | "understanding" | "application" | "analysis",
    prompt: "...",
    options: [ "...", "..." ],     // present for mcq/truefalse/multiselect; omit/[] otherwise
    correctAnswer: 0,               // index for mcq/truefalse; array of indices for multiselect; string for short/definition
    explanation: "...",             // why correct answer is right, referencing the concept
    learningObjective: "...",
    source: { chapter: N, section: "9.2", pages: [214] }
  }
  // aim for roughly 2-3 questions per topic, mix of types/difficulty/cognitive level
);
```

## Quality bar

- Every topic's `source.pages` must be real printed page numbers you saw in
  the chapter text (the `p.N` markers), not guesses.
- Write JSON-valid literals (double-quoted strings, no trailing commas, no
  comments) even though the file is a `.js` script — you're writing a JS
  object literal, so unescaped apostrophes inside double-quoted strings are
  fine, just escape embedded double quotes.
- No placeholder text ("TODO", "Coming soon", "Lorem ipsum") anywhere.
- After writing each file, mentally re-scan it for a stray trailing comma or
  unescaped quote that would break `<script>` parsing — these files are
  loaded directly in a browser with no build step.
- Keep explanations concise and structured (this is a study app, not an
  essay) — a few sentences per field, not paragraphs, except where a concept
  genuinely needs more (e.g. explaining Gharar or Riba's categories).

Reference `source/chapter-index.json` for exact chapter/section titles and
page numbers, and `source/glossary-book.json` (the book's own glossary) for
definition wording consistency.
