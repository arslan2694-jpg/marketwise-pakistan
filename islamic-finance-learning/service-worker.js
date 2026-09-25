/* Offline-first service worker. Precaches the app shell and all known data
 * files on install, then serves cache-first with a background network
 * refresh (stale-while-revalidate) so the app works fully offline after the
 * first visit, while still picking up updates when online. */
"use strict";

var CACHE_NAME = "ifl-cache-v1";

var CORE_ASSETS = [
  "./", "./index.html", "./styles.css", "./app.js", "./manifest.json", "./icon.svg",
  "./modules/dom.js", "./modules/store.js", "./modules/data.js", "./modules/router.js",
  "./modules/progress.js", "./modules/search.js",
  "./modules/views/dashboard.js", "./modules/views/learn.js", "./modules/views/chapter.js",
  "./modules/views/concept-map.js", "./modules/views/glossary.js", "./modules/views/flashcards.js",
  "./modules/views/quiz.js", "./modules/views/adaptive.js", "./modules/views/comparisons.js",
  "./modules/views/case-studies.js", "./modules/views/decision-tool.js", "./modules/views/exam-prep.js",
  "./modules/views/study-modes.js", "./modules/views/bookmarks.js", "./modules/views/notes.js",
  "./modules/views/progress-view.js", "./modules/views/settings.js", "./modules/views/search-results.js",
  "./modules/views/timer.js",
  "./data/chapter-index.js", "./data/glossary.js", "./data/comparisons.js", "./data/case-studies.js",
  "./data/concept-map.js", "./data/decision-tree.js", "./data/study-modes.js", "./data/exam-prep.js"
];

function chapterPaths(prefix) {
  var out = [];
  for (var i = 1; i <= 18; i++) {
    out.push("./data/" + prefix + "/ch" + String(i).padStart(2, "0") + ".js");
  }
  return out;
}

var ALL_ASSETS = CORE_ASSETS
  .concat(chapterPaths("chapters"))
  .concat(chapterPaths("flashcards"))
  .concat(chapterPaths("questions"));

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return Promise.all(
        ALL_ASSETS.map(function (url) {
          return cache.add(url).catch(function () {
            // A file that doesn't exist yet (or 404s) shouldn't fail the whole install.
            return null;
          });
        })
      );
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE_NAME; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (event) {
  if (event.request.method !== "GET") return;
  var url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return; // never proxy external requests

  event.respondWith(
    caches.match(event.request).then(function (cached) {
      var networkFetch = fetch(event.request).then(function (response) {
        if (response && response.status === 200) {
          var copy = response.clone();
          caches.open(CACHE_NAME).then(function (cache) { cache.put(event.request, copy); });
        }
        return response;
      }).catch(function () { return cached; });
      return cached || networkFetch;
    })
  );
});
