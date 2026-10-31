// Lamport & vector clocks over a space-time diagram.
// diagram = { procs: n, events: [{ id, p, t }], msgs: [{ from, to }] }
// t is a position on the time axis; every message must satisfy t(from) < t(to).
(function (root) {
  function ordered(diagram) {
    return diagram.events.slice().sort(function (a, b) { return a.t - b.t; });
  }

  function incoming(diagram, id) {
    return diagram.msgs.filter(function (m) { return m.to === id; }).map(function (m) { return m.from; });
  }

  function lamport(diagram) {
    var L = {}, last = {};
    ordered(diagram).forEach(function (e) {
      var v = last[e.p] !== undefined ? L[last[e.p]] : 0;
      incoming(diagram, e.id).forEach(function (src) { v = Math.max(v, L[src]); });
      L[e.id] = v + 1;
      last[e.p] = e.id;
    });
    return L;
  }

  function vector(diagram) {
    var V = {}, last = {}, n = diagram.procs;
    ordered(diagram).forEach(function (e) {
      var v = last[e.p] !== undefined ? V[last[e.p]].slice() : new Array(n).fill(0);
      incoming(diagram, e.id).forEach(function (src) {
        for (var i = 0; i < n; i++) v[i] = Math.max(v[i], V[src][i]);
      });
      v[e.p] += 1;
      V[e.id] = v;
      last[e.p] = e.id;
    });
    return V;
  }

  // Seeded generator so a "soal baru" can be reproduced in tests.
  function rng(seed) {
    var s = seed >>> 0 || 1;
    return function () {
      s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0;
      return s / 4294967296;
    };
  }

  function randomDiagram(seed) {
    var r = rng(seed || Date.now());
    var procs = r() < 0.7 ? 3 : 4;
    var letters = 'abcdefghijklmnop'.split('');
    var events = [], used = {};
    for (var p = 0; p < procs; p++) {
      var count = 2 + Math.floor(r() * 3);
      for (var k = 0; k < count; k++) {
        var t;
        do { t = 1 + Math.floor(r() * 14); } while (used[t]);
        used[t] = true;
        events.push({ p: p, t: t });
      }
    }
    events.sort(function (a, b) { return a.p - b.p || a.t - b.t; });
    events.forEach(function (e, i) { e.id = letters[i]; });

    var msgs = [], busy = {};
    var want = procs + Math.floor(r() * 2);
    for (var tries = 0; msgs.length < want && tries < 200; tries++) {
      var a = events[Math.floor(r() * events.length)];
      var b = events[Math.floor(r() * events.length)];
      if (a.p === b.p || a.t >= b.t || busy[a.id] || busy[b.id]) continue;
      busy[a.id] = busy[b.id] = true;
      msgs.push({ from: a.id, to: b.id });
    }
    return { procs: procs, events: events, msgs: msgs };
  }

  // Diagram from the lecturer's exam sheet (P1: a b, P2: c d, P3: e f g).
  var EXAM = {
    procs: 3,
    events: [
      { id: 'a', p: 0, t: 4.3 }, { id: 'b', p: 0, t: 5.2 },
      { id: 'c', p: 1, t: 6.05 }, { id: 'd', p: 1, t: 9.65 },
      { id: 'e', p: 2, t: 4.55 }, { id: 'f', p: 2, t: 8.3 }, { id: 'g', p: 2, t: 8.93 }
    ],
    msgs: [{ from: 'a', to: 'c' }, { from: 'e', to: 'c' }, { from: 'b', to: 'f' }, { from: 'g', to: 'd' }]
  };

  var api = { lamport: lamport, vector: vector, randomDiagram: randomDiagram, rng: rng, EXAM: EXAM };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else (root.Tools = root.Tools || {}).clocks = api;
})(this);
