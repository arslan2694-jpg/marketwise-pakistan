# Chapter educational content — schema

One JSON file per chapter at `data/content/chapters/<chapter_id>.json`
(e.g. `book-1-ch-iv.json`). `<chapter_id>` matches `data/raw/structure.json`.

This schema is the contract every content-generation pass (human or agent)
must follow. It encodes the three-layer principle from the spec:

- **`russell_presentation`** fields = Layer 1: what Russell actually says/argues, faithfully.
- **`explanation` / `study_notes` / concept `explanation` fields** = Layer 2: original pedagogical explanation that makes it easier to understand.
- **`critical_context`** fields = Layer 3: interpretive disputes, later scholarship, limitations — explicitly labeled, never merged into Layer 1.

No fabrication: every philosopher, date, claim, and quotation must be
traceable to the chapter's raw text in `data/raw/chapters/<chapter_id>.txt`.
If the chapter text does not support a field (e.g. no explicit objections
are discussed), use an empty array/string rather than inventing content.

```jsonc
{
  "chapter_id": "book-1-ch-iv",
  "book_id": "book-1",
  "part_id": "book-1-part-1",
  "roman": "IV",
  "title": "Heraclitus",
  "start_page": 55,
  "end_page": 64,

  "orientation": "2-4 sentence framing: what this chapter is about and why it matters.",
  "historical_background": "Historical/political/social circumstances Russell frames this chapter with.",
  "philosophical_problems": ["Problem 1 the chapter addresses", "..."],

  "philosophers_discussed": [
    {
      "name": "Heraclitus",
      "role_in_chapter": "1-2 sentences on what this chapter says about them specifically",
      "is_primary_subject": true
    }
  ],

  "schools_discussed": ["Ionian philosophy"],

  "core_concepts": [
    {
      "name": "Universal flux",
      "plain_explanation": "Layer 2 — beginner-friendly.",
      "precise_definition": "Layer 2 — precise philosophical definition.",
      "why_it_mattered": "...",
      "historical_origin": "...",
      "associated_philosopher": "Heraclitus",
      "examples": ["..."],
      "objections": ["..."],
      "competing_positions": ["Parmenides' denial of change"],
      "influence_on_later_thinkers": "...",
      "connection_to_politics_or_religion": "",
      "is_major": true
    }
  ],

  "arguments": [
    {
      "title": "Argument from perpetual change",
      "philosopher": "Heraclitus",
      "premises": ["Premise 1", "Premise 2"],
      "conclusion": "...",
      "explanation": "Explain each premise and why the conclusion follows (or doesn't).",
      "objections": ["..."],
      "implications": ["..."]
    }
  ],

  "key_distinctions": ["e.g. Becoming vs. Being"],

  "connections_to_earlier_philosophers": "...",
  "connections_to_later_philosophers": "...",
  "political_social_context": "...",
  "religion_science_culture_context": "",

  "russell_presentation": "Layer 1 — summarize faithfully what Russell himself argues/asserts in this chapter, in your own words (not verbatim reproduction). Note his tone/evaluation where explicit.",
  "critical_context": "Layer 3 — ONLY where genuinely useful: label clearly, e.g. 'Common scholarly criticism: ...' or 'Later development: ...'. Leave empty string if none is warranted — do not force one.",

  "key_takeaways": ["3-6 bullet takeaways"],
  "study_notes": "Layer 2 — a few original paragraphs of instructional explanation, NOT a paraphrase-length copy of the chapter.",

  "glossary_terms": [
    {
      "term": "Flux",
      "beginner_explanation": "...",
      "academic_explanation": "...",
      "related_concepts": ["Universal flux"]
    }
  ],

  "questions": [
    {
      "type": "short_answer",
      "prompt": "...",
      "answer": "...",
      "explanation": "...",
      "source_page": 56
    }
  ],

  "flashcards": [
    { "front": "What did Heraclitus mean by 'panta rhei'?", "back": "...", "category": "concept" }
  ],

  "quiz": [
    {
      "type": "multiple_choice",
      "difficulty": "beginner",
      "prompt": "...",
      "options": ["A", "B", "C", "D"],
      "correct_index": 2,
      "explanation": "...",
      "related_concept": "Universal flux",
      "source_page": 55
    }
  ],

  "essay_prompts": [
    {
      "task_type": "Compare",
      "prompt": "Compare Heraclitus's doctrine of flux with Parmenides's denial of change.",
      "rubric": ["Factual accuracy", "Argument reconstruction", "Comparison", "Historical context"]
    }
  ],

  "extraction_confidence": "high"
}
```

## Coverage targets per chapter (adapt to chapter length — do not pad)

- `philosophers_discussed`: every philosopher the chapter substantively discusses.
- `core_concepts`: every concept central to the chapter; mark 2-5 as `"is_major": true` and give those the fullest treatment (all sub-fields non-empty where the text supports it). Minor concepts can have shorter `plain_explanation`/`precise_definition` and leave other fields empty.
- `arguments`: every argument Russell explicitly reconstructs or attributes to a philosopher in this chapter.
- `questions`: 4-8, mixing types (short_answer, identify_philosopher, compare_contrast, argument_reconstruction).
- `flashcards`: 8-15.
- `quiz`: 6-10, spanning at least 3 difficulty levels, at least 4 multiple_choice plus a mix of true_false/matching/fill_in_blank.
- `essay_prompts`: 1-3.

Quiz `correct_index` must be a valid index into `options`. Every `source_page` must fall within `[start_page, end_page]` for this chapter (or be omitted if not attributable to one page).

**Page numbering warning**: `start_page`/`end_page` are the PDF's own page indices, given to you explicitly in the task for each chapter. The raw chapter `.txt` file may ALSO contain a different printed page number as a footer marker somewhere in the text (e.g. a lone `-259-` on its own line) — this is the original 1945 book's print pagination, which is NOT the same numbering and is typically offset from the PDF index by anywhere from 0 to +20 depending which part of the book you're in. Never use a footer marker found inside the raw text as a `source_page` value. Always use a page number of your own choosing that is directly inside the given `[start_page, end_page]` range (the range *is* correct for the PDF; you do not need to and should not try to locate a more "precise" page via any number printed inside the text).
