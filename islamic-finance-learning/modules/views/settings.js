/* Settings: theme, default explanation level, reset progress, export/import
 * study data. Nothing here ever leaves the browser's local storage. */
(function () {
  "use strict";
  var esc = IFLDom.esc;

  function render() {
    var root = IFLRouter.outlet();
    var s = IFLStore.get();
    root.innerHTML =
      '<div class="section-header"><h1>Settings</h1></div>' +

      '<div class="card mb-4">' +
        '<h3>Appearance</h3>' +
        '<label>Theme</label>' +
        '<div class="level-switch mb-3">' +
          ["system", "light", "dark"].map(function (t) { return '<button data-theme-opt="' + t + '" class="' + (s.settings.theme === t ? "active" : "") + '">' + t.charAt(0).toUpperCase() + t.slice(1) + '</button>'; }).join("") +
        '</div>' +
        '<label>Default Explanation Level</label>' +
        '<div class="level-switch">' +
          [["beginner", "Simple"], ["mba", "MBA"], ["exam", "Exam"]].map(function (pair) {
            return '<button data-level-opt="' + pair[0] + '" class="' + (s.settings.explanationLevel === pair[0] ? "active" : "") + '">' + pair[1] + '</button>';
          }).join("") +
        '</div>' +
      '</div>' +

      '<div class="card mb-4">' +
        '<h3>Your Study Data</h3>' +
        '<p class="text-sm text-secondary">Everything you do here — progress, notes, bookmarks, quiz history — is stored only in this browser. Nothing is ever sent to a server.</p>' +
        '<div class="badge-row">' +
          '<button class="btn btn-outline" id="export-btn">⬇ Export My Study Data</button>' +
          '<button class="btn btn-outline" id="import-btn">⬆ Import Study Data</button>' +
          '<input type="file" id="import-file" accept="application/json" class="hidden">' +
        '</div>' +
      '</div>' +

      '<div class="card" style="border-color:var(--color-danger);">' +
        '<h3 style="color:var(--color-danger);">Danger Zone</h3>' +
        '<p class="text-sm text-secondary">Permanently erase all progress, notes, bookmarks and settings on this device. This cannot be undone.</p>' +
        '<button class="btn btn-danger" id="reset-btn">Reset All Progress</button>' +
      '</div>';

    IFLDom.qsa("[data-theme-opt]", root).forEach(function (btn) {
      btn.addEventListener("click", function () {
        var t = btn.getAttribute("data-theme-opt");
        IFLStore.update(function (st) { st.settings.theme = t; });
        if (window.IFLApplyTheme) window.IFLApplyTheme(t);
        render();
      });
    });
    IFLDom.qsa("[data-level-opt]", root).forEach(function (btn) {
      btn.addEventListener("click", function () {
        IFLStore.update(function (st) { st.settings.explanationLevel = btn.getAttribute("data-level-opt"); });
        render();
      });
    });

    document.getElementById("export-btn").addEventListener("click", function () {
      var blob = new Blob([IFLStore.exportJSON()], { type: "application/json" });
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = "islamic-finance-study-data-" + IFLStore.todayStr() + ".json";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
      IFLDom.toast("Study data exported");
    });

    var fileInput = document.getElementById("import-file");
    document.getElementById("import-btn").addEventListener("click", function () { fileInput.click(); });
    fileInput.addEventListener("change", function () {
      var file = fileInput.files[0];
      if (!file) return;
      if (file.size > 8 * 1024 * 1024) { IFLDom.toast("File too large (max 8MB)"); return; }
      var reader = new FileReader();
      reader.onload = function () {
        try {
          IFLStore.importJSON(String(reader.result));
          IFLData.invalidateSearchIndex();
          IFLDom.toast("Study data imported");
          render();
        } catch (e) {
          IFLDom.toast("Import failed: file is not valid study-data JSON");
        }
      };
      reader.readAsText(file);
      fileInput.value = "";
    });

    document.getElementById("reset-btn").addEventListener("click", function () {
      IFLDom.confirmModal({
        title: "Reset all progress?",
        message: "This permanently deletes all progress, notes, bookmarks, quiz history and achievements on this device. This cannot be undone.",
        confirmLabel: "Reset everything", danger: true
      }).then(function (ok) {
        if (!ok) return;
        IFLStore.resetAll();
        IFLData.invalidateSearchIndex();
        IFLDom.toast("All progress has been reset");
        render();
      });
    });
  }

  IFLRouter.register("/settings", render);
})();
