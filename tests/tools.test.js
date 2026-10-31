const test = require('node:test');
const assert = require('node:assert/strict');
const clocks = require('../app/js/tools/clocks.js');
const chord = require('../app/js/tools/chord.js');
const consistency = require('../app/js/tools/consistency.js');
const cpm = require('../app/js/tools/cpm.js');
const Check = require('../app/js/check.js');

test('Lamport clock on the exam diagram', () => {
  assert.deepEqual(clocks.lamport(clocks.EXAM), { a: 1, e: 1, b: 2, c: 2, f: 3, g: 4, d: 5 });
});

test('Vector clock on the exam diagram', () => {
  const V = clocks.vector(clocks.EXAM);
  assert.deepEqual(V.a, [1, 0, 0]);
  assert.deepEqual(V.b, [2, 0, 0]);
  assert.deepEqual(V.e, [0, 0, 1]);
  assert.deepEqual(V.c, [1, 1, 1]);
  assert.deepEqual(V.f, [2, 0, 2]);
  assert.deepEqual(V.g, [2, 0, 3]);
  assert.deepEqual(V.d, [2, 2, 3]);
});

test('Random diagrams keep messages forward in time', () => {
  for (let s = 1; s < 200; s++) {
    const d = clocks.randomDiagram(s);
    const t = Object.fromEntries(d.events.map(e => [e.id, e]));
    for (const m of d.msgs) {
      assert.ok(t[m.from].t < t[m.to].t);
      assert.notEqual(t[m.from].p, t[m.to].p);
    }
    const L = clocks.lamport(d);
    for (const m of d.msgs) assert.ok(L[m.from] < L[m.to]);
  }
});

test('Chord finger tables match the lecture slide', () => {
  const { nodes, m } = chord.SLIDE;
  const expected = {
    1: [4, 4, 9, 9, 18], 4: [9, 9, 9, 14, 20], 9: [11, 11, 14, 18, 28],
    11: [14, 14, 18, 20, 28], 14: [18, 18, 18, 28, 1], 18: [20, 20, 28, 28, 4],
    20: [21, 28, 28, 28, 4], 21: [28, 28, 28, 1, 9], 28: [1, 1, 1, 4, 14]
  };
  for (const p of nodes) assert.deepEqual(chord.fingerTable(nodes, m, p), expected[p], 'node ' + p);
});

test('Chord lookups from the slide', () => {
  const { nodes, m } = chord.SLIDE;
  assert.deepEqual(chord.lookup(nodes, m, 1, 26), [1, 18, 20, 21, 28]);
  assert.deepEqual(chord.lookup(nodes, m, 28, 12), [28, 4, 9, 11, 14]);
  assert.equal(chord.succ(nodes, m, 29), 1);
  assert.equal(chord.succ(nodes, m, 5), 9);
});

test('Chord lookup always ends at succ(key)', () => {
  for (let s = 1; s < 300; s++) {
    const r = chord.randomRing(s);
    const path = chord.lookup(r.nodes, r.m, r.node, r.key);
    assert.equal(path[path.length - 1], chord.succ(r.nodes, r.m, r.key));
    assert.ok(path.length <= r.m + 2);
  }
});

test('Sequential consistency presets', () => {
  const [exam, a, b] = consistency.PRESETS;
  assert.equal(consistency.check(exam.procs).ok, true);
  assert.equal(consistency.check(a.procs).ok, true);
  const bad = consistency.check(b.procs);
  assert.equal(bad.ok, false);
  assert.ok(bad.conflict);
});

test('Sequential order returned is valid', () => {
  for (let s = 1; s < 200; s++) {
    const { procs } = consistency.random(s);
    const res = consistency.check(procs);
    if (!res.ok) continue;
    let x = null;
    const next = procs.map(() => 0);
    for (const step of res.order) {
      assert.equal(step.i, next[step.p]++);
      const op = procs[step.p][step.i];
      if (op.op === 'W') x = op.v; else assert.equal(op.v, x);
    }
  }
});

test('CPM example', () => {
  const r = cpm.compute(cpm.EXAMPLE);
  assert.equal(r.duration, 16);
  assert.deepEqual(r.critical, [['A', 'D', 'F', 'G', 'H']]);
  assert.equal(r.paths.length, 3);
  assert.equal(r.res.C.slack, 1);
  for (const id of r.critical.flat()) assert.equal(r.res[id].slack, 0);
});

test('PERT, NPV, ROI, payback', () => {
  assert.equal(cpm.pert(8, 10, 24), 12);
  assert.ok(Math.abs(cpm.npv(0.1, [-100, 60, 60]) - 4.1322) < 1e-3);
  assert.equal(cpm.roi(150, 100), 50);
  assert.equal(cpm.payback(100, [40, 40, 40]), 2.5);
});

test('Answer checker', () => {
  assert.ok(Check.checkField({ a: 'FCBDEA' }, 'F C B D E A'));
  assert.ok(Check.checkField({ a: 'FCBDEA' }, 'f,c,b,d,e,a'));
  assert.ok(Check.checkField({ a: ['inside attack'] }, 'Inside Attack.'));
  assert.ok(Check.checkField({ a: 0.9, tol: 0.001 }, '0,9'));
  assert.ok(Check.checkField({ a: 85.2, tol: 0.1 }, '85,2%'));
  assert.ok(Check.checkField({ a: 122000, tol: 1 }, '122.000'));
  assert.ok(Check.checkField({ a: 0.3111, tol: 0.001 }, '28/90'));
  assert.ok(Check.checkField({ a: 31.62, tol: 0.01 }, '31.623'));
  assert.ok(Check.checkField({ a: 122000, tol: 1 }, '122,000'));
  assert.ok(Check.checkField({ a: '1 0 0' }, '(1, 0, 0)'));
  assert.ok(!Check.checkField({ a: '1 0 0' }, '1,00'));
  assert.ok(Check.checkField({ a: 'B-G' }, 'b - g'));
  assert.ok(!Check.checkField({ a: 5 }, ''));
  assert.ok(!Check.checkField({ a: 'abc' }, ''));
});
