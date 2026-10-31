// Critical Path Method (activity-on-node) plus PERT and project finance formulas.
(function (root) {
  // acts: [{ id, d, pre: [ids] }] in any order
  function compute(acts) {
    var byId = {};
    acts.forEach(function (a) { byId[a.id] = a; });
    var order = topo(acts, byId);
    var res = {};
    order.forEach(function (id) {
      var a = byId[id];
      var es = 0;
      a.pre.forEach(function (p) { es = Math.max(es, res[p].ef); });
      res[id] = { es: es, ef: es + a.d };
    });
    var duration = 0;
    order.forEach(function (id) { duration = Math.max(duration, res[id].ef); });
    order.slice().reverse().forEach(function (id) {
      var lf = duration;
      acts.forEach(function (s) {
        if (s.pre.indexOf(id) >= 0) lf = Math.min(lf, res[s.id].ls);
      });
      res[id].lf = lf;
      res[id].ls = lf - byId[id].d;
      res[id].slack = res[id].ls - res[id].es;
    });
    var all = paths(acts, byId);
    var critical = all.filter(function (p) { return p.length === duration; }).map(function (p) { return p.ids; });
    return { order: order, res: res, duration: duration, paths: all, critical: critical };
  }

  function topo(acts, byId) {
    var out = [], mark = {};
    function visit(id) {
      if (mark[id] === 2) return;
      if (mark[id] === 1) throw new Error('Siklus pada aktivitas ' + id);
      mark[id] = 1;
      byId[id].pre.forEach(visit);
      mark[id] = 2;
      out.push(id);
    }
    acts.forEach(function (a) { visit(a.id); });
    return out;
  }

  // Every start-to-end path with its total duration.
  function paths(acts, byId) {
    var succs = {};
    acts.forEach(function (a) { succs[a.id] = []; });
    acts.forEach(function (a) { a.pre.forEach(function (p) { succs[p].push(a.id); }); });
    var out = [];
    function walk(id, ids, len) {
      ids = ids.concat(id);
      len += byId[id].d;
      if (!succs[id].length) { out.push({ ids: ids, length: len }); return; }
      succs[id].forEach(function (s) { walk(s, ids, len); });
    }
    acts.filter(function (a) { return !a.pre.length; }).forEach(function (a) { walk(a.id, [], 0); });
    return out;
  }

  function pert(a, m, b) { return (a + 4 * m + b) / 6; }

  // flows[0] is year 0 (usually negative investment)
  function npv(rate, flows) {
    return flows.reduce(function (sum, c, t) { return sum + c / Math.pow(1 + rate, t); }, 0);
  }

  function roi(benefits, costs) { return (benefits - costs) / costs * 100; }

  // Payback period for uneven flows: n + (a - b) / (c - b)
  function payback(investment, inflows) {
    var cum = 0;
    for (var n = 0; n < inflows.length; n++) {
      var next = cum + inflows[n];
      if (next >= investment) return n + (investment - cum) / (next - cum);
      cum = next;
    }
    return Infinity;
  }

  function random(seed) {
    var r = (root.Tools && root.Tools.clocks ? root.Tools.clocks.rng : require('./clocks.js').rng)(seed || Date.now());
    var n = 6 + Math.floor(r() * 3);
    var acts = [];
    for (var i = 0; i < n; i++) {
      var id = String.fromCharCode(65 + i);
      var pre = [];
      if (i >= 2 || (i === 1 && r() < 0.5)) {
        var lo = Math.max(0, i - 4);
        var k = 1 + (r() < 0.35 ? 1 : 0);
        while (pre.length < k) {
          var cand = String.fromCharCode(65 + lo + Math.floor(r() * (i - lo)));
          if (pre.indexOf(cand) < 0) pre.push(cand);
          if (i - lo < 2) break;
        }
      }
      acts.push({ id: id, d: 1 + Math.floor(r() * 8), pre: pre.sort() });
    }
    return acts;
  }

  var EXAMPLE = [
    { id: 'A', d: 2, pre: [] }, { id: 'B', d: 3, pre: [] },
    { id: 'C', d: 2, pre: ['A'] }, { id: 'D', d: 4, pre: ['A'] },
    { id: 'E', d: 4, pre: ['B', 'C'] }, { id: 'F', d: 3, pre: ['D'] },
    { id: 'G', d: 5, pre: ['E', 'F'] }, { id: 'H', d: 2, pre: ['G'] }
  ];

  var api = { compute: compute, pert: pert, npv: npv, roi: roi, payback: payback, random: random, EXAMPLE: EXAMPLE };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else (root.Tools = root.Tools || {}).cpm = api;
})(this);
