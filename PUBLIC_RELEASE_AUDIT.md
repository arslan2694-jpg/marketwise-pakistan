# MarketWise Pakistan — Public Release Audit

## Release Status

**READY FOR PUBLICATION.** No secrets, credentials, private personal
information, or unresolved XSS/injection vectors were found. Two real
security gaps were discovered during this audit (an unhardened
import/localStorage path, and two unescaped fields in the new Recent
Activity feature) — both were fixed and re-verified with automated
browser tests. Zero educational content was removed or altered.

## Source File

`MarketWisePakistan_Enhanced_Merged.html` (the final merged/enhanced
MarketWise Pakistan build present in the project directory) was audited
and hardened. An untouched copy was preserved first at
`backup/pre-public-release.html` before any change was made.

## Output

`index.html` (repository root) and `github-pages-release/index.html`
(identical copy, packaged for deployment).

## Content Preservation

Counted programmatically (headless-browser evaluation of `window.DATA`),
comparing the pre-hardening backup against the final `index.html`:

| Item | Backup | Final `index.html` | Delta |
|---|---|---|---|
| Modules | 26 | 26 | 0 |
| Lessons | 145 | 145 | 0 |
| Quiz-bank questions | 84 | 84 | 0 |
| In-lesson checkpoint questions | 174 | 174 | 0 |
| Key-takeaway blocks | 145 | 145 | 0 |
| Callouts | 188 | 188 | 0 |
| Tables | 81 | 81 | 0 |
| Interactive diagrams (declarative) | 15 | 15 | 0 |
| Calculators/interactive tools (calc/sim/order/match/hotspot/estimate/builder/sort/audit blocks) | 27 | 27 | 0 |
| Glossary terms | 157 | 157 | 0 |
| Flashcards | 96 | 96 | 0 |
| Badges | 10 | 10 | 0 |
| FAQs | 10 | 10 | 0 |
| Timeline entries | 20 | 20 | 0 |
| Process-builder sequences | 11 | 11 | 0 |

A full `diff` between the backup and the final `index.html` was also
reviewed line by line: **6 lines removed, 105 lines added**, and every
removed line is one of the security fixes listed below (never
educational content, never a module/lesson/quiz/glossary entry).

## Security Findings

| # | Finding | Severity | Fix |
|---|---|---|---|
| 1 | `localStorage` and "Import progress" JSON were merged into the live app state with a raw `Object.assign(store, JSON.parse(...))`. A crafted file with an `"__proto__"` key could hijack an object's prototype; oversized or malformed fields could bloat storage or crash rendering. | Medium | Added `sanitizeImport()` — rebuilds the state object field-by-field, drops `__proto__`/`constructor`/`prototype` keys, enforces expected types, clamps numeric ranges, and caps collection sizes (e.g. max 3000 entries, notes ≤ 20,000 chars). Applied to both the "Import progress" file handler and the normal `localStorage` boot path. Also added an 8 MB hard file-size cap before parsing. |
| 2 | The new "Recent Activity" list (added in the prior merge) rendered `a.key` into an `href="#/lesson/${a.key}"` attribute and `a.icon` into text, both unescaped. Not exploitable through normal use (these fields are always app-generated), but became a real attribute-injection / markup-injection vector once combined with the unhardened import path above. | Medium (defense-in-depth; only reachable via a maliciously crafted import file) | Both fields now pass through the existing `esc()` HTML-escaping helper before insertion, matching every other user/import-adjacent field in the app. |
| 3 | The Revision Center's "missed questions" list linked to `rec.key`/showed `rec.m` from `store.quizMissed` without escaping or validating that the key resolved to a real lesson. | Low–Medium (same reachability as #2) | The lesson link now only renders when `rec.key` matches a real, known lesson (`allLessons.find(...)`); `rec.m` is escaped; and `sanitizeImport()` now validates the internal shape of each `quizMissed` entry (`q`, `m`, `key`, `ts`) rather than accepting any object. |

All fixes were verified with headless-browser tests that specifically
attempted prototype pollution (`__proto__`/`constructor` keys) and script
injection (`<img onerror>`, `"><script>` payloads) through the import
file. Result: no pollution of `Object.prototype`, no script execution,
numeric fields correctly clamped (e.g. an injected `quizBest: 99999` was
clamped to 100), and all 20 `<script>` blocks remain syntactically valid.

**No other injection vectors were found.** The audit traced every
`innerHTML` assignment (85 occurrences) and confirmed each is either (a)
static, app-authored curriculum/UI markup, or (b) already passed through
`esc()`/a matched-against-known-data guard before insertion. There is no
`eval`, `new Function`, `document.write`, `insertAdjacentHTML`, or
string-form `setTimeout`/`setInterval` anywhere in the file. Hash-derived
route parameters (module id, lesson id, glossary term) are always looked
up against known static data before use, or explicitly escaped
(`esc(focus)` in the glossary search box) — none are echoed into HTML
unescaped.

## Privacy Findings

- **No secrets/credentials of any kind** — searched for API keys, tokens,
  passwords, bearer/OAuth/client-secret patterns, AWS-style keys, PEM
  private-key headers, and JWT-shaped strings. None found.
- **One email address** appears in the app: `engr.arslan2694@gmail.com`,
  the developer's own public contact address, already intentionally
  displayed in the app's "About & Credits" page and footer as
  attribution. This is deliberate public information, not a leak.
- **No phone numbers, CNIC/passport numbers, physical addresses, internal
  usernames, or IP addresses** anywhere in the file.
- **No developer/machine artifacts** — no `TODO`/`FIXME`/`HACK`/`XXX`
  markers, no `localhost`/`127.0.0.1`/`file:///` references, no
  Windows/`/home`/`/Users` development paths, no debug/test UI left in
  place. (The words "private", "confidential" and "debug" do appear
  dozens of times, but every occurrence sampled and reviewed is
  legitimate market-education vocabulary — e.g. "privately owned
  generation", "commercial terms can stay confidential", "the debug
  order in a settlement dispute" — not development artifacts.)
- Nothing is hidden-but-present via `display:none`/`visibility:hidden`
  that would constitute an accidental disclosure; there is no such
  content in the file at all.

## Items Requiring Human Review

No content was found that appears confidential, internal-only, or
derived from non-public documents. Every occurrence of figures/claims
about CPPA-G, ISMO, NEPRA, NGC, PPIB, DISCOs, etc. reads as generic,
publicly-sourceable market education, and the app itself already states
(in its own "About" page) that content is compiled from public NEPRA /
CPPA-G / ISMO / Power Division sources, with figures marked "approximate"
or "illustrative" (30+ such qualifiers found) rather than presented as
exact real institutional data. Classification:

- **Category 1/2 (clearly/likely public):** effectively all curriculum
  content — institutional structure, market design explanations, generic
  worked numerical examples explicitly labelled as illustrative.
- **Category 3 (uncertain):** none identified.
- **Category 4 (unsuitable for public release):** none identified.

That said, this audit is a static text/code review, not a subject-matter
legal or regulatory review. Because the content touches live regulatory
institutions, **the app's owner (who has direct industry context) should
still do a final skim of the market-figures content before the first
public deployment**, simply as prudent practice for anything
regulator-adjacent — not because this audit found anything requiring
withholding.

No third-party copyrighted material was found: there are no external
images, no copied diagrams, no third-party JS/CSS libraries, and all
icons are either native emoji or small original inline SVGs. No
attribution obligations apply beyond the app's own self-attribution,
which is already present.

## External Dependencies

**No external runtime dependencies detected.** Confirmed by exhaustive
search of the entire file:
- No `<script src="">` or `<link>` beyond a single `data:` URI favicon.
- No `<img>`, `<iframe>`, external fonts, or external CSS.
- No `fetch()`, `XMLHttpRequest`, `WebSocket`, or `EventSource` calls.
- No `http://`/`https://` URLs anywhere except the standard SVG XML
  namespace string embedded in the favicon's `data:` URI (not a network
  request).
- The only outbound reference of any kind is a `mailto:` link to the
  developer's contact address (user-initiated, not automatic).

The app is fully self-contained and works completely offline after the
first load, on GitHub Pages or anywhere else.

## Tracking

**No analytics or tracking exists**, and none was added. Searched
specifically for Google Analytics/Tag Manager, Meta Pixel, Hotjar,
Microsoft Clarity, Mixpanel, Segment, and generic fingerprinting/telemetry
patterns — zero matches. No cookie/consent banner was added, since none
is needed: the app uses only same-origin `localStorage` for local
learning progress, which does not require a cookie-consent banner under
typical privacy frameworks, and adding a banner that implies tracking
exists (when it doesn't) would be misleading.

## Local Data

All state (lesson/module completion, quiz history and missed questions,
bookmarks, notes, study time, streak, recent activity, theme, focus-mode
preference, daily goal) lives in one namespaced `localStorage` key,
`marketwise-pk-v1`, as a single JSON object. It is:
- Parsed defensively (`try/catch`, corrupt data falls back to defaults).
- Now additionally passed through `sanitizeImport()` on every load (not
  just on explicit import), so a corrupted or hand-edited entry can't
  crash the app or pollute prototypes.
- Never transmitted anywhere — there is no network code in the app at all.
- Preserved schema-compatible with the pre-hardening version: the same 18
  top-level keys, same shapes: no migration was needed and no existing
  user's saved progress (completions, bookmarks, notes, quiz history,
  study time, streak, theme) is reset or altered by this release.

## GitHub Pages Compatibility

- No root-absolute paths (`href="/..."`, `src="/..."`) exist anywhere —
  confirmed by search. All navigation is hash-based (`#/home`,
  `#/lesson/...`, etc.), which is inherently path-independent.
- No `<base>` tag, no manifest, no service worker.
- Verified by actually serving the file from a local static server under
  a simulated project-site path (`/marketwise-pakistan/`) with headless
  Chromium: the app loaded, a **direct deep-link** to
  `#/module/foundations` rendered correctly, a **hard refresh** on that
  same hash route rendered correctly again, and the Revision Center
  route also worked — all with zero failed requests and zero console
  errors. This confirms compatibility with both a user/org root site and
  a project subdirectory deployment, and confirms the hash-routing
  architecture survives direct loads and refreshes without any
  server-side rewrite rules (which GitHub Pages doesn't provide).

## Accessibility

Pre-existing accessibility features were all preserved and re-verified:
semantic landmarks (`<header role="banner">`, `<nav aria-label>`, skip
link), modal dialogs with `role="dialog"`/`aria-modal`, `aria-expanded`
on collapsible sidebar sections, `aria-live` toast region, focus-visible
outlines, `prefers-reduced-motion` support, keyboard-operable diagram
nodes (`tabindex`, Enter/Space activation), and Escape-to-close on every
modal (now including the new focus-mode overlay). No accessibility
regressions were introduced by the hardening changes; the new CSP and
meta tags don't affect DOM structure or keyboard behavior.

## Responsive Testing

Verified with headless Chromium across 360×740, 390×844, 768×1024,
1024×768, 1366×900 and 1920×1080: no horizontal page overflow at any
size, mobile hamburger sidebar opens/closes correctly, and — specific to
this release — focus mode was confirmed to hide the sidebar/topbar only
at desktop widths (≥961px) and to leave the mobile hamburger menu and
sidebar fully functional at narrow widths.

## Known Limitations

- The `<meta http-equiv="Content-Security-Policy">` tag is the strongest
  CSP this single-file, build-free app can practically use.
  `'unsafe-inline'` is required for `script-src`/`style-src` because the
  app has no bundler to generate nonces/hashes for its inline
  `<script>`/`<style>` blocks. This still meaningfully hardens the app:
  `connect-src 'none'`, `frame-src 'none'`, `object-src 'none'`,
  `base-uri 'none'` and `form-action 'none'` are all real, enforced
  restrictions given the app makes no network calls and has no forms.
- `frame-ancestors`, `report-uri`/`report-to`, and CSP's `sandbox`
  directive are **not honored inside a `<meta>` CSP** by any browser —
  they require a real HTTP response header. GitHub Pages does not let a
  repository configure custom response headers, so click-jacking
  protection (`frame-ancestors`/`X-Frame-Options`) and CSP violation
  reporting cannot be added for this deployment target. This is a
  platform limitation, not an oversight — a future move to a host that
  supports custom headers (e.g. Cloudflare Pages, Netlify) could close
  this gap if it becomes a concern.
- `404.html`'s "back to site" link uses a relative `./` href, the
  standard approach for a static 404 page without a build-time base URL.
  On a deeply-nested mistyped URL under a project-subdirectory
  deployment, this could resolve one level off from the true site root
  — a well-known, generic limitation of plain static 404 pages (not
  specific to this app), included here for completeness rather than
  fixed with a script, since Phase 34 asks for a script-free 404 page.
- No service worker / PWA manifest was added. The app is already a
  single offline-capable file; a service worker would add complexity
  (and a real risk of users getting stuck on a cached old version) without
  a corresponding benefit for a single-file app, so — per this task's own
  guidance — none was added.

## Content Requiring Factual/Currentness Review

The app already carries its own currency caveats ("Version 1.1 · Content
current to late 2025", and a standing disclaimer to consult primary
sources), which were preserved untouched. No factual, tariff, regulatory,
or institutional statements were rewritten during this audit, per the
task's explicit instruction to treat this as security/deployment work,
not a content-accuracy pass. Given the sector's pace of change, the
owner should periodically revisit: any CTBCM rollout-stage or
resource-adequacy details tied to specific years, ISMO/NGC/EIDMC
institutional-restructuring dates, and any named determination dates
(e.g. the CPPA-G Special Purpose Agent determination) — all are already
framed in the app as time-stamped and provisional, which is the correct
posture; they simply age as the sector moves.

## Deployment Recommendation

1. Push the contents of `github-pages-release/` (or the repository root,
   which now also contains the same hardened `index.html`) to GitHub.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**,
   select the branch (e.g. `main`) and the `/ (root)` folder, then save.
4. Wait for GitHub to publish the site; the Pages URL appears at the top
   of the same settings page once the first deployment completes.
5. Optionally, once the final Pages URL is known, add `og:url` and an
   `og:image` to `index.html`'s `<head>` for richer social-media link
   previews — intentionally left out of this release since the URL
   doesn't exist yet and a placeholder domain would be misleading.
6. No DNS, backend, database, or environment configuration is required —
   this is a fully static deployment.
