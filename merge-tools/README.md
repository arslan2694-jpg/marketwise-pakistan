# merge-tools

Reproducible build of **Understanding-Islamic-Finance-MERGED.html** from the two source applications
(`Islamic-Finance-Learning.html` and `Understanding-Islamic-Finance-STANDALONE.html`).

```
node merge-tools/build.js <Islamic-Finance-Learning.html> <Understanding-Islamic-Finance-STANDALONE.html> <outDir>
   → <outDir>/Understanding-Islamic-Finance-MERGED.html   (single standalone file)
   → <outDir>/MERGE-AUDIT.md, MERGE-AUDIT.json

NODE_PATH=$(npm root -g) node merge-tools/tests/run-all.js <app1> <app2> <merged.html> [--axe path/to/axe.min.js]
```

| Path | Purpose |
|---|---|
| `lib/extract.js` | reads both source HTML files and evaluates only their embedded data scripts in an isolated VM |
| `merge-data.js` | the merge: canonical schema, companion notes, alias maps, question/flashcard/glossary/case/comparison/concept/plan conversion, audit statistics |
| `src/` | the unified application: one router, store (`ifl_v2` + migration), search, progress engine, components, views, CSS (design tokens), shell |
| `build.js` / `audit.js` | inlines data + code + CSS into one HTML file; writes the audit report |
| `tests/` | integrity/preservation (Node), regression + feature suites (Playwright/Chromium), static checks |

The source files are never modified. Nothing in the final HTML depends on this folder.
