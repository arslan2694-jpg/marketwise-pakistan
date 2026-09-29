/* Data registry. Every data set is inlined ahead of the application code (no network access,
   works from file://), so loading is synchronous; the promise API is kept so views can stay simple. */
(function () {
  var D = window.IFL_DATA = window.IFL_DATA || {};
  D.chapters = D.chapters || {};
  D.sets = D.sets || {};
  D.register = function (name, value) { D.sets[name] = value; };
  D.registerChapter = function (c) { D.chapters[c.number] = c; };
  D.load = function (names) {
    names = [].concat(names);
    var out = {};
    for (var i = 0; i < names.length; i++) {
      if (!D.sets[names[i]]) return Promise.reject(new Error('Unknown data set ' + names[i]));
      out[names[i]] = D.sets[names[i]];
    }
    return Promise.resolve(out);
  };
  D.loadChapter = function (n) {
    n = Number(n);
    return D.chapters[n] ? Promise.resolve(D.chapters[n]) : Promise.reject(new Error('Chapter ' + n + ' data is missing'));
  };
  D.loadAllChapters = function () {
    var ps = []; for (var i = 1; i <= 18; i++) ps.push(D.loadChapter(i));
    return Promise.all(ps);
  };
})();
