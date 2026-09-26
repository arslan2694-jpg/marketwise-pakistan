/* App bootstrap: sidebar nav, theme, search box, streak pill, router init. */
(function () {
  "use strict";

  var NAV = [
    { section: null, items: [
      { label: "Dashboard", href: "#/dashboard", icon: "&#127968;" }
    ] },
    { section: "Learn", items: [
      { label: "All Chapters", href: "#/learn", icon: "&#128218;" },
      { label: "Part I · Fundamentals", href: "#/learn/part/I", icon: "&#9702;" },
      { label: "Part II · Contractual Bases", href: "#/learn/part/II", icon: "&#9702;" },
      { label: "Part III · Products & Procedures", href: "#/learn/part/III", icon: "&#9702;" }
    ] },
    { section: null, items: [
      { label: "Concept Map", href: "#/concept-map", icon: "&#128202;" },
      { label: "Glossary", href: "#/glossary", icon: "&#128214;" },
      { label: "Flashcards", href: "#/flashcards", icon: "&#127183;" },
      { label: "Quiz", href: "#/quiz", icon: "&#10067;" },
      { label: "Adaptive Practice", href: "#/adaptive", icon: "&#127919;" },
      { label: "Case Studies", href: "#/case-studies", icon: "&#128188;" },
      { label: "Comparisons", href: "#/comparisons", icon: "&#9878;" },
      { label: "Financing Mode Finder", href: "#/decision-tool", icon: "&#129504;" },
      { label: "Calculators", href: "#/calculators", icon: "&#128202;" }
    ] },
    { section: "Exam Preparation", items: [
      { label: "Exam Prep Center", href: "#/exam-prep", icon: "&#127891;" },
      { label: "45-Minute Crash Course", href: "#/crash-course/45", icon: "&#9201;" },
      { label: "90-Minute Revision", href: "#/crash-course/90", icon: "&#9201;" },
      { label: "3-Hour Deep Study", href: "#/crash-course/180", icon: "&#9201;" }
    ] },
    { section: "My Study", items: [
      { label: "Bookmarks", href: "#/bookmarks", icon: "&#128278;" },
      { label: "My Notes", href: "#/notes", icon: "&#128221;" },
      { label: "My Progress", href: "#/progress", icon: "&#128200;" },
      { label: "Study Timer", href: "#/timer", icon: "&#9203;" },
      { label: "Settings", href: "#/settings", icon: "&#9881;" }
    ] }
  ];

  function renderSidebar() {
    var host = document.getElementById("sidebar-nav");
    host.innerHTML = "";
    NAV.forEach(function (group) {
      if (group.section) {
        var h = document.createElement("div");
        h.className = "sidebar-section-title";
        h.textContent = group.section;
        host.appendChild(h);
      }
      var wrap = document.createElement("div");
      wrap.className = "nav-group";
      group.items.forEach(function (item) {
        var a = document.createElement("a");
        a.className = "nav-link";
        a.href = item.href;
        a.setAttribute("data-nav", item.href);
        a.setAttribute("data-href-prefix", item.href.split("?")[0]);
        a.innerHTML = '<span class="icon" aria-hidden="true">' + item.icon + '</span><span class="sidebar-label">' + item.label + '</span>';
        wrap.appendChild(a);
      });
      host.appendChild(wrap);
    });
  }

  function updateActiveNav() {
    var current = ("#" + (location.hash.replace(/^#/, "") || "/dashboard")).split("?")[0];
    IFLDom.qsa(".nav-link").forEach(function (a) {
      var prefix = a.getAttribute("data-href-prefix");
      var isActive = current === prefix || (prefix !== "#/dashboard" && current.indexOf(prefix) === 0 && prefix.length > 2);
      a.classList.toggle("active", isActive);
    });
  }

  function applyTheme(theme) {
    if (theme === "system") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
    var isDark = theme === "dark" || (theme === "system" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
    var icon = isDark ? "&#9789;" : "&#9788;";
    ["theme-toggle", "theme-toggle-mobile"].forEach(function (id) {
      var btn = document.getElementById(id);
      if (btn) btn.innerHTML = icon;
    });
  }

  function cycleTheme() {
    var s = IFLStore.get().settings;
    var order = ["system", "light", "dark"];
    var next = order[(order.indexOf(s.theme) + 1) % order.length];
    IFLStore.update(function (state) { state.settings.theme = next; });
    applyTheme(next);
    IFLDom.toast("Theme: " + next.charAt(0).toUpperCase() + next.slice(1));
  }

  function updateStreakPill() {
    var pill = document.getElementById("streak-pill");
    if (!pill) return;
    var days = IFLStore.get().progress.streakDays;
    pill.textContent = "🔥 " + days + "-day streak";
  }

  function wireSearch() {
    ["search-input", "search-input-mobile"].forEach(function (id) {
      var input = document.getElementById(id);
      if (!input) return;
      input.addEventListener("keydown", function (e) {
        if (e.key === "Enter" && input.value.trim()) {
          IFLRouter.navigate("#/search" + IFLRouter.buildQuery({ q: input.value.trim() }));
        }
      });
      if (window.IFLSearchUI) IFLSearchUI.attachLiveSearch(id);
    });
  }

  function wireSidebarToggle() {
    var sidebar = document.getElementById("sidebar");
    var toggle = document.getElementById("sidebar-toggle");
    var collapsed = false;
    try { collapsed = localStorage.getItem("ifl_sidebar_collapsed") === "1"; } catch (e) {}
    if (collapsed) sidebar.classList.add("collapsed");
    toggle.addEventListener("click", function () {
      sidebar.classList.toggle("collapsed");
      try { localStorage.setItem("ifl_sidebar_collapsed", sidebar.classList.contains("collapsed") ? "1" : "0"); } catch (e) {}
    });

    var menuBtn = document.getElementById("mobile-menu-btn");
    var backdrop = document.getElementById("mobile-backdrop");
    function closeMobile() { sidebar.classList.remove("mobile-open"); backdrop.classList.remove("open"); }
    menuBtn.addEventListener("click", function () {
      sidebar.classList.add("mobile-open");
      backdrop.classList.add("open");
    });
    backdrop.addEventListener("click", closeMobile);
    sidebar.addEventListener("click", function (e) {
      if (e.target.closest("[data-nav]")) closeMobile();
    });
  }

  function boot() {
    if (!window.IFL_DATA) window.IFL_DATA = {};
    renderSidebar();
    wireSidebarToggle();
    wireSearch();
    applyTheme(IFLStore.get().settings.theme);
    updateStreakPill();

    window.IFLApplyTheme = applyTheme;

    document.getElementById("theme-toggle").addEventListener("click", cycleTheme);
    var mobileToggle = document.getElementById("theme-toggle-mobile");
    if (mobileToggle) mobileToggle.addEventListener("click", cycleTheme);

    IFLStore.subscribe(function () {
      updateStreakPill();
    });

    IFLRouter.beforeEach(function () { updateActiveNav(); });
    IFLRouter.init(document.getElementById("app-content"));
    updateActiveNav();

    if (window.matchMedia) {
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function () {
        if (IFLStore.get().settings.theme === "system") applyTheme("system");
      });
    }

    window.addEventListener("error", function (e) {
      console.error("[app] uncaught error:", e.error || e.message);
    });

    if ("serviceWorker" in navigator && (location.protocol === "http:" || location.protocol === "https:")) {
      navigator.serviceWorker.register("./service-worker.js").catch(function (e) {
        console.warn("[app] service worker registration failed (app still works online):", e);
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
