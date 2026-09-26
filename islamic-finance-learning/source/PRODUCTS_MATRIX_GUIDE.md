# "Products at a Glance" Matrix — Authoring Guide

Read `source/AUTHORING_GUIDE.md` first for the shared source-grounding
rules (paraphrase, no invented Shari'ah rulings, real page citations).

Write `islamic-finance-learning/data/products-matrix.js`:

```js
window.IFL_DATA = window.IFL_DATA || {};
window.IFL_DATA.productsMatrix = [
  {
    "id": "murabaha",                 // kebab-case, stable id
    "name": "Murabaha",
    "category": "Trade-based (Sale)", // one of: "Trade-based (Sale)", "Forward Sale", "Lease-based", "Participatory (Equity)", "Agency-based", "Capital Market", "Risk-Pooling"
    "chapter": 9,
    "href": "#/chapter/9",            // link to the chapter that covers it primarily
    "shariahBasis": "...",            // 1-2 sentences: what makes it Shari'ah-compliant, its classical root
    "subjectMatter": "...",           // what is actually being sold/leased/invested in
    "ownershipRiskTiming": "...",     // WHEN does ownership/risk transfer, and to whom
    "returnType": "Fixed" | "Variable/Profit-Share" | "Rental" | "Fee-based" | "Mixed",
    "returnTypeDetail": "...",        // 1 sentence elaborating
    "typicalTenor": "...",            // short/medium/long-term, with the book's own framing if given
    "liquidityTradability": "...",    // can the resulting instrument/receivable be traded? at what price?
    "commonUse": "...",               // what business need it typically finances, per the book
    "keyConditions": [ "...", "..." ],   // 3-5 conditions, from the book
    "majorRisks": [ "...", "..." ],      // 2-4 risks, from the book (credit, Shari'ah-compliance, market, etc.)
    "distinguishingFeature": "...",   // the ONE thing that most distinguishes it from adjacent products (e.g. Murabaha vs Musawamah = disclosure; Salam vs Istisna'a = advance payment requirement)
    "source": { "chapter": 9, "section": "9.2-9.8", "pages": [213, 229] }
  }
  // ... one entry per product listed below
]
```

Cover exactly these products (one entry each, ~14 total):

1. Murabaha (ch9)
2. Musawamah (ch9)
3. Salam (ch10)
4. Istisna'a (ch10)
5. Ijarah (operating/financial lease) (ch11)
6. Ijarah Muntahia-bi-Tamleek (ch11)
7. Musharakah (ch12)
8. Mudarabah (ch12)
9. Diminishing Musharakah (ch12)
10. Wakalah (ch13)
11. Tawarruq (ch13)
12. Ju'alah (ch13)
13. Sukuk (ch15) — treat as one entry covering the general Sukuk mechanism (categories are already detailed elsewhere in the app)
14. Takaful (ch16)

For every field, ground it in the actual chapter text (`source/extraction-notes/chapters/chNN.txt`) — re-read each chapter's relevant sections before writing its row rather than relying on general Islamic-finance knowledge. Keep each text field concise (1-2 sentences) since this renders in a dense table — save elaboration for the `keyConditions`/`majorRisks` bullet lists.

After writing, validate:
```
node -e "
global.window={};
require('./data/products-matrix.js');
var m = global.window.IFL_DATA.productsMatrix;
console.log('entries:', m.length);
var ids = m.map(function(x){return x.id;});
console.log('duplicate ids:', ids.length - new Set(ids).size);
console.log('missing fields:', m.filter(function(x){return !x.shariahBasis || !x.keyConditions || !x.majorRisks || !x.distinguishingFeature;}).map(function(x){return x.id;}));
"
```
Report back the final entry count and confirm zero duplicates / zero missing required fields.
