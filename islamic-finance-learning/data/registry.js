/* Data registry + lazy loader. Content files call IFL_DATA.registerChapter / IFL_DATA.register.
   Works from file:// (classic <script> injection) and from a web server. */
(function () {
  var D = window.IFL_DATA = window.IFL_DATA || {};
  D.chapters = D.chapters || {};
  D.sets = D.sets || {};
  D.registerChapter = function (c) { D.chapters[c.number] = c; };
  D.register = function (name, value) { D.sets[name] = value; };
  var FILES = {
    glossary: 'data/glossary.js', concepts: 'data/concepts.js', diagrams: 'data/diagrams.js',
    comparisons: 'data/comparisons.js', cases: 'data/case-studies.js', modeFinder: 'data/mode-finder.js',
    studyPlans: 'data/study-plans.js'
  };
  var pending = {};
  function inject(src) {
    if (pending[src]) return pending[src];
    pending[src] = new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = src; s.async = true;
      s.onload = function () { resolve(); };
      s.onerror = function () { delete pending[src]; reject(new Error('Could not load ' + src)); };
      document.head.appendChild(s);
    });
    return pending[src];
  }
  D.load = function (names) {
    names = [].concat(names);
    return Promise.all(names.map(function (n) {
      if (D.sets[n]) return null;
      if (!FILES[n]) return Promise.reject(new Error('Unknown data set ' + n));
      return inject(FILES[n]);
    })).then(function () {
      var out = {}; names.forEach(function (n) { out[n] = D.sets[n]; }); return out;
    });
  };
  D.loadChapter = function (n) {
    n = Number(n);
    if (D.chapters[n]) return Promise.resolve(D.chapters[n]);
    return inject('data/chapters/ch' + (n < 10 ? '0' : '') + n + '.js').then(function () {
      if (!D.chapters[n]) throw new Error('Chapter ' + n + ' data is malformed');
      return D.chapters[n];
    });
  };
  D.loadAllChapters = function () {
    var ps = []; for (var i = 1; i <= 18; i++) ps.push(D.loadChapter(i));
    return Promise.all(ps);
  };
})();
