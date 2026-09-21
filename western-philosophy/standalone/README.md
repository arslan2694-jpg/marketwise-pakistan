# Standalone single-file build

A genuinely double-clickable, offline version of the Western Philosophy
Study Companion: one `.html` file with zero external requests (no CDN, no
fetch, no server) and no missing content or functionality compared to the
Next.js app at `../web/`.

It's a separate, hand-written vanilla-JS implementation (no React, no
Next.js — those require a server or a multi-file static export), reusing
the same generated content JSON and reproducing the same feature set:
dashboard, library/chapter reader (all 12 lessons per chapter), inline and
standalone quizzes, spaced-repetition flashcards, philosopher/concept/
school reference pages, timeline, force-directed knowledge graph,
glossary, essay practice with autosaving drafts, notes/bookmarks, local
progress tracking (persists in `localStorage` across reloads), search,
and light/dark theme — all client-side routed via `location.hash`.

## Building it

```bash
cd western-philosophy/standalone
python3 build.py
```

Output: `dist/western-philosophy-standalone.html` (~5MB — the whole
dataset is embedded inline: 76 chapters, ~190 philosophers, ~370
concepts, ~160 schools, glossary, timeline, and knowledge graph). Rerun
this after regenerating any content in `../data/content/`.

`dist/` is gitignored (it's a build artifact, like `web/out/`); only the
sources (`src/app.js`, `src/styles.css`, `src/index.template.html`,
`build.py`) are committed.

## Using it

Just open `dist/western-philosophy-standalone.html` in a browser —
double-click it, or drag it into a browser window. No `npm install`, no
build step for the end user, no internet connection needed. Progress is
saved to that browser's `localStorage`, scoped to the file itself.

## How it works

- `src/app.js` — the entire application: a hash-based router (`#/library/
  book-1-ch-i`, `#/philosophers/plato`, etc.), one render function per
  page, and a single delegated click/input listener (`data-action`
  attributes) instead of a framework. All content mutations go through
  the same local-first progress store semantics as `web/src/lib/
  progress.ts` (spaced-repetition box intervals, streak days, quiz
  attempts, notes, bookmarks).
- `src/styles.css` — hand-written CSS reproducing the same academic
  design system (colors, typography, layout) as `web/src/app/
  globals.css`, since Tailwind's CDN build would itself be an external
  request.
- `build.py` — reads every file under `../data/content/` (chapters,
  philosophers, concepts, schools, glossary, timeline, graph) plus
  `../data/raw/structure.json`, and inlines all of it as one JSON blob
  (`window.__WP_DATA__`) directly into the HTML, escaping any `</` so
  embedded content can never break out of the `<script>` tag.

## Known differences from the Next.js app

- No server-rendering or per-page code-splitting — the whole app (data
  included) loads on first paint. On this dataset that's ~5MB, which
  loads instantly on any modern machine; it would need reconsidering if
  the dataset grew an order of magnitude larger.
- The graph's force-directed layout redraws the whole SVG every animation
  frame for its ~3.5s settling period (same as the Next.js version) — a
  node you try to click while it's still moving may shift out from under
  your cursor; wait for it to settle first.
- Verified via a headless-browser test suite (loaded through `file://`
  with all non-`file://` network requests blocked) covering navigation,
  every interactive widget, `localStorage` persistence across a full page
  reload, and confirming exactly one request is ever made (the initial
  file load) across all 17 top-level routes.
