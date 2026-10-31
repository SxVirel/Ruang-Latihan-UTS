// Chord DHT: successor, finger tables, and key lookup (Tanenbaum & van Steen notation).
(function (root) {
  function norm(k, m) { var size = 1 << m; return ((k % size) + size) % size; }

  function succ(nodes, m, k) {
    k = norm(k, m);
    var sorted = nodes.slice().sort(function (a, b) { return a - b; });
    for (var i = 0; i < sorted.length; i++) if (sorted[i] >= k) return sorted[i];
    return sorted[0];
  }

  function pred(nodes, m, p) {
    var sorted = nodes.slice().sort(function (a, b) { return a - b; });
    var i = sorted.indexOf(p);
    return sorted[(i - 1 + sorted.length) % sorted.length];
  }

  // FT_p[i] = succ(p + 2^(i-1)), i = 1..m
  function fingerTable(nodes, m, p) {
    var ft = [];
    for (var i = 1; i <= m; i++) ft.push(succ(nodes, m, p + Math.pow(2, i - 1)));
    return ft;
  }

  // x in (a, b] on the ring
  function inHalfOpen(x, a, b) {
    if (a < b) return x > a && x <= b;
    return x > a || x <= b; // wraps (or a == b: whole ring)
  }

  // x in (a, b) on the ring
  function inOpen(x, a, b) {
    if (a < b) return x > a && x < b;
    if (a === b) return x !== a;
    return x > a || x < b;
  }

  function lookup(nodes, m, start, key) {
    key = norm(key, m);
    var target = succ(nodes, m, key);
    var path = [start], cur = start;
    for (var hops = 0; hops < 64; hops++) {
      if (cur === target) return path;
      var ft = fingerTable(nodes, m, cur);
      if (inHalfOpen(key, cur, ft[0])) { path.push(ft[0]); return path; }
      var next = ft[0];
      for (var j = ft.length - 1; j >= 0; j--) {
        if (inOpen(ft[j], cur, key)) { next = ft[j]; break; }
      }
      path.push(next);
      cur = next;
    }
    return path;
  }

  function randomRing(seed) {
    var r = (root.Tools && root.Tools.clocks ? root.Tools.clocks.rng : require('./clocks.js').rng)(seed || Date.now());
    var m = r() < 0.75 ? 5 : 4;
    var size = 1 << m;
    var count = m === 5 ? 6 + Math.floor(r() * 4) : 4 + Math.floor(r() * 3);
    var set = {};
    while (Object.keys(set).length < count) set[Math.floor(r() * size)] = true;
    var nodes = Object.keys(set).map(Number).sort(function (a, b) { return a - b; });
    var start = nodes[Math.floor(r() * nodes.length)];
    var key;
    do { key = Math.floor(r() * size); } while (succ(nodes, m, key) === start);
    return { m: m, nodes: nodes, node: start, key: key };
  }

  // Ring from the lecture slide "Chord lookup example".
  var SLIDE = { m: 5, nodes: [1, 4, 9, 11, 14, 18, 20, 21, 28], node: 1, key: 26 };

  var api = { succ: succ, pred: pred, fingerTable: fingerTable, lookup: lookup, randomRing: randomRing, SLIDE: SLIDE };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else (root.Tools = root.Tools || {}).chord = api;
})(this);
