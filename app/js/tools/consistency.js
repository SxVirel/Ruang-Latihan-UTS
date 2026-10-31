// Sequential consistency check for a single shared variable x.
// procs: [[{ op: 'W'|'R', v: 'a' }, ...], ...] in program order (left to right).
(function (root) {
  function check(procs) {
    var n = procs.length, seen = {};
    var idx = new Array(n).fill(0), order = [];

    function dfs(value) {
      var done = true;
      for (var p = 0; p < n; p++) if (idx[p] < procs[p].length) { done = false; break; }
      if (done) return true;
      var key = idx.join(',') + '|' + value;
      if (seen[key]) return false;
      seen[key] = true;
      for (p = 0; p < n; p++) {
        var op = procs[p][idx[p]];
        if (!op) continue;
        if (op.op === 'R' && op.v !== value) continue;
        var next = op.op === 'W' ? op.v : value;
        idx[p]++; order.push({ p: p, i: idx[p] - 1 });
        if (dfs(next)) return true;
        idx[p]--; order.pop();
      }
      return false;
    }

    var ok = dfs(null);
    return { ok: ok, order: ok ? order.slice() : null, conflict: ok ? null : conflict(procs) };
  }

  // Two readers that saw two values in opposite orders.
  function conflict(procs) {
    var seq = procs.map(function (ops) {
      var out = [];
      ops.forEach(function (o) { if (o.op === 'R' && out[out.length - 1] !== o.v) out.push(o.v); });
      return out;
    });
    for (var a = 0; a < procs.length; a++) {
      for (var b = a + 1; b < procs.length; b++) {
        for (var i = 0; i < seq[a].length; i++) {
          for (var j = i + 1; j < seq[a].length; j++) {
            var x = seq[a][i], y = seq[a][j];
            var bi = seq[b].indexOf(x), bj = seq[b].indexOf(y);
            if (bi >= 0 && bj >= 0 && bj < bi) return { a: a, b: b, first: x, second: y };
          }
        }
      }
    }
    return null;
  }

  function label(op) { return op.op + '(x)' + op.v; }

  function random(seed) {
    var r = (root.Tools && root.Tools.clocks ? root.Tools.clocks.rng : require('./clocks.js').rng)(seed || Date.now());
    var values = ['a', 'b', 'c'].slice(0, 2 + Math.floor(r() * 2));
    var writers = values.length;
    var procs = [];
    for (var w = 0; w < writers; w++) procs.push([{ op: 'W', v: values[w] }]);
    // Each reader sees values in a valid global write order, then maybe one gets swapped.
    var global = values.slice().sort(function () { return r() - 0.5; });
    var readers = 2;
    for (var k = 0; k < readers; k++) {
      var start = Math.floor(r() * (global.length - 1));
      procs.push([{ op: 'R', v: global[start] }, { op: 'R', v: global[start + 1] }]);
    }
    if (r() < 0.5) {
      var last = procs[procs.length - 1];
      var tmp = last[0].v; last[0].v = last[1].v; last[1].v = tmp;
    }
    if (r() < 0.4 && writers > 1) procs[0].unshift({ op: 'R', v: values[1] });
    return { procs: procs, cols: layout(procs, r) };
  }

  // Column (time) position for drawing; real time does not matter for SC.
  function layout(procs, r) {
    return procs.map(function (ops) {
      var cols = [], c = Math.floor(r() * 3);
      ops.forEach(function () { cols.push(c); c += 1 + Math.floor(r() * 2); });
      return cols;
    });
  }

  var PRESETS = [
    { name: 'Soal UTS (P1-P4)',
      procs: [
        [{ op: 'R', v: 'a' }, { op: 'W', v: 'c' }],
        [{ op: 'W', v: 'a' }, { op: 'W', v: 'b' }],
        [{ op: 'R', v: 'c' }, { op: 'R', v: 'b' }],
        [{ op: 'R', v: 'c' }, { op: 'R', v: 'b' }]
      ],
      cols: [[2, 4], [0, 3], [5, 6], [5, 6]] },
    { name: 'Buku (a): konsisten',
      procs: [
        [{ op: 'W', v: 'a' }],
        [{ op: 'W', v: 'b' }],
        [{ op: 'R', v: 'b' }, { op: 'R', v: 'a' }],
        [{ op: 'R', v: 'b' }, { op: 'R', v: 'a' }]
      ],
      cols: [[0], [1], [2, 4], [3, 5]] },
    { name: 'Buku (b): tidak konsisten',
      procs: [
        [{ op: 'W', v: 'a' }],
        [{ op: 'W', v: 'b' }],
        [{ op: 'R', v: 'b' }, { op: 'R', v: 'a' }],
        [{ op: 'R', v: 'a' }, { op: 'R', v: 'b' }]
      ],
      cols: [[0], [1], [2, 4], [3, 5]] }
  ];

  var api = { check: check, label: label, random: random, PRESETS: PRESETS };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else (root.Tools = root.Tools || {}).consistency = api;
})(this);
