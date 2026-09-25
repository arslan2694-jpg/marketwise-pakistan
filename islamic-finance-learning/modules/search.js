/* Live search-as-you-type dropdown for the topbar search box. Full result
 * listing (on Enter) is handled by the #/search route (views/search-results.js);
 * this module only manages the inline suggestion popover. */
(function (global) {
  "use strict";

  function attachLiveSearch(inputId) {
    var input = document.getElementById(inputId);
    if (!input) return;
    var wrap = input.closest(".topbar-search");
    if (!wrap) return;
    wrap.style.position = "relative";

    var panel = document.createElement("div");
    panel.className = "card";
    panel.style.cssText = "position:absolute;top:calc(100% + 6px);left:0;right:0;z-index:50;max-height:360px;overflow:auto;padding:var(--sp-2);display:none;";
    wrap.appendChild(panel);

    var timer = null;
    function renderResults(q) {
      var results = IFLData.search(q, 8);
      if (!results.length) {
        panel.innerHTML = '<div class="text-sm text-muted" style="padding:var(--sp-3);">No matches for "' + IFLDom.esc(q) + '"</div>';
      } else {
        panel.innerHTML = "";
        results.forEach(function (r) {
          var item = document.createElement("a");
          item.href = r.href;
          item.setAttribute("data-nav", r.href);
          item.className = "flex-col";
          item.style.cssText = "display:flex;flex-direction:column;padding:var(--sp-2) var(--sp-3);border-radius:var(--radius-sm);text-decoration:none;color:inherit;";
          item.onmouseenter = function () { item.style.background = "var(--color-bg-sunken)"; };
          item.onmouseleave = function () { item.style.background = "transparent"; };
          item.innerHTML =
            '<span class="flex items-center gap-2"><span class="pill pill-brand text-xs">' + IFLDom.esc(r.kind) + '</span>' +
            '<strong class="text-sm">' + IFLDom.esc(r.title) + '</strong></span>' +
            (r.context ? '<span class="text-xs text-muted" style="margin-top:2px;">' + IFLDom.esc(String(r.context).slice(0, 100)) + '</span>' : "");
          panel.appendChild(item);
        });
        var seeAll = document.createElement("a");
        seeAll.href = "#/search" + IFLRouter.buildQuery({ q: q });
        seeAll.setAttribute("data-nav", seeAll.href);
        seeAll.className = "btn btn-ghost btn-sm btn-block mt-2";
        seeAll.textContent = "See all results →";
        panel.appendChild(seeAll);
      }
      panel.style.display = "block";
    }

    input.addEventListener("input", function () {
      clearTimeout(timer);
      var q = input.value.trim();
      if (!q) { panel.style.display = "none"; return; }
      timer = setTimeout(function () { renderResults(q); }, 150);
    });
    input.addEventListener("focus", function () {
      if (input.value.trim()) renderResults(input.value.trim());
    });
    document.addEventListener("click", function (e) {
      if (!wrap.contains(e.target)) panel.style.display = "none";
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") panel.style.display = "none";
    });
    panel.addEventListener("click", function () { panel.style.display = "none"; input.blur(); });
  }

  global.IFLSearchUI = { attachLiveSearch: attachLiveSearch };
})(window);
