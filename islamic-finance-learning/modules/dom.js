/* Small DOM / formatting helpers shared by every view module. */
(function (global) {
  "use strict";

  function esc(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  // Very small markdown-ish formatter for content strings: *italic*, **bold**,
  // and line breaks. Escapes HTML first so this is safe against injected data.
  function formatText(str) {
    var s = esc(str);
    s = s.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    s = s.replace(/\*(.+?)\*/g, "<em>$1</em>");
    s = s.replace(/\n/g, "<br>");
    return s;
  }

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    attrs = attrs || {};
    for (var k in attrs) {
      if (!Object.prototype.hasOwnProperty.call(attrs, k)) continue;
      if (k === "class") node.className = attrs[k];
      else if (k === "html") node.innerHTML = attrs[k];
      else if (k.indexOf("on") === 0 && typeof attrs[k] === "function") node.addEventListener(k.slice(2), attrs[k]);
      else node.setAttribute(k, attrs[k]);
    }
    (children || []).forEach(function (c) {
      if (c == null) return;
      node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return node;
  }

  function qs(sel, root) { return (root || document).querySelector(sel); }
  function qsa(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function pillClassForLevel(diff) {
    if (diff === "hard" || diff === "advanced") return "pill-danger";
    if (diff === "medium" || diff === "intermediate") return "pill-warning";
    return "pill-success";
  }

  function pillClassForExamRelevance(rel) {
    if (rel === "core") return "pill-brand";
    if (rel === "supporting") return "pill-info";
    if (rel === "detailed") return "pill-accent";
    return "pill";
  }

  function formatDuration(seconds) {
    seconds = Math.max(0, Math.round(seconds || 0));
    var h = Math.floor(seconds / 3600);
    var m = Math.floor((seconds % 3600) / 60);
    if (h > 0) return h + "h " + m + "m";
    if (m > 0) return m + "m";
    return seconds + "s";
  }

  function formatDate(ts) {
    if (!ts) return "";
    var d = new Date(ts);
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
  }

  function relativeTime(ts) {
    if (!ts) return "";
    var diff = Date.now() - ts;
    var mins = Math.round(diff / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return mins + "m ago";
    var hrs = Math.round(mins / 60);
    if (hrs < 24) return hrs + "h ago";
    var days = Math.round(hrs / 24);
    if (days < 30) return days + "d ago";
    return formatDate(ts);
  }

  function toast(message, opts) {
    opts = opts || {};
    var host = document.getElementById("toast-host");
    if (!host) return;
    var t = el("div", { class: "card", style: "position:relative;box-shadow:var(--shadow-lg);padding:var(--sp-3) var(--sp-4);min-width:220px;" }, [
      el("div", { class: "text-sm" }, [message])
    ]);
    host.appendChild(t);
    setTimeout(function () {
      t.style.transition = "opacity 200ms ease";
      t.style.opacity = "0";
      setTimeout(function () { t.remove(); }, 220);
    }, opts.duration || 2400);
  }

  function confirmModal(opts) {
    return new Promise(function (resolve) {
      var backdrop = el("div", { class: "modal-backdrop" }, [
        el("div", { class: "modal", role: "alertdialog", "aria-modal": "true" }, [
          el("div", { class: "modal-header" }, [el("h3", {}, [opts.title || "Are you sure?"])]),
          el("p", {}, [opts.message || ""]),
          el("div", { class: "flex gap-2", style: "justify-content:flex-end;margin-top:var(--sp-4);" }, [
            (function () {
              var cancelBtn = el("button", { class: "btn btn-outline" }, [opts.cancelLabel || "Cancel"]);
              cancelBtn.addEventListener("click", function () { backdrop.remove(); resolve(false); });
              return cancelBtn;
            })(),
            (function () {
              var okBtn = el("button", { class: "btn " + (opts.danger ? "btn-danger" : "btn-primary") }, [opts.confirmLabel || "Confirm"]);
              okBtn.addEventListener("click", function () { backdrop.remove(); resolve(true); });
              return okBtn;
            })()
          ])
        ])
      ]);
      backdrop.addEventListener("click", function (e) { if (e.target === backdrop) { backdrop.remove(); resolve(false); } });
      document.body.appendChild(backdrop);
    });
  }

  global.IFLDom = {
    esc: esc,
    formatText: formatText,
    el: el,
    qs: qs,
    qsa: qsa,
    pillClassForLevel: pillClassForLevel,
    pillClassForExamRelevance: pillClassForExamRelevance,
    formatDuration: formatDuration,
    formatDate: formatDate,
    relativeTime: relativeTime,
    toast: toast,
    confirmModal: confirmModal
  };
})(window);
