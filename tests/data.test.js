const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const Check = require('../app/js/check.js');

// Load the data files the same way index.html does, in its script order.
function loadBank() {
  const html = fs.readFileSync(path.join(__dirname, '../app/index.html'), 'utf8');
  const files = [...html.matchAll(/<script src="(data\/[^"]+)"/g)].map(m => m[1]);
  const BANK = require('../app/js/bank.js');
  const ctx = vm.createContext({ BANK });
  for (const f of files) vm.runInContext(fs.readFileSync(path.join(__dirname, '../app', f), 'utf8'), ctx, { filename: f });
  return { data: BANK.data, files };
}

const { data, files } = loadBank();
const all = data.mcq.concat(data.isian);

test('every data file on disk is loaded by index.html', () => {
  const onDisk = fs.readdirSync(path.join(__dirname, '../app/data')).map(f => 'data/' + f);
  assert.deepEqual(onDisk.sort(), files.slice().sort());
});

test('ids are unique', () => {
  const seen = new Set();
  for (const it of all) {
    assert.ok(!seen.has(it.id), 'duplicate id ' + it.id);
    seen.add(it.id);
  }
});

test('every item belongs to a known course', () => {
  for (const it of all) assert.ok(data.courses[it.course], it.id);
  for (const id of Object.keys(data.courses)) assert.ok(all.some(it => it.course === id), 'empty course ' + id);
});

test('Keamanan Siber has enough questions for a 100-question set', () => {
  const ks = data.mcq.filter(it => it.course === 'ks');
  assert.ok(ks.length >= 100, 'only ' + ks.length);
});

test('multiple choice items are well formed', () => {
  for (const it of data.mcq) {
    assert.ok(it.q && it.a, it.id);
    assert.ok(Array.isArray(it.w) && it.w.length >= 3 && it.w.length <= 4, it.id + ' wrong options');
    const opts = [it.a, ...it.w].map(s => s.trim().toLowerCase());
    assert.equal(new Set(opts).size, opts.length, it.id + ' duplicate option');
    assert.ok(it.ex, it.id + ' missing explanation');
  }
});

test('fill items accept their own key', () => {
  for (const it of data.isian.filter(i => i.type === 'fill')) {
    assert.ok(it.fields && it.fields.length, it.id);
    for (const f of it.fields) {
      const key = typeof f.a === 'number' ? String(f.a) : (Array.isArray(f.a) ? f.a[0] : f.a);
      assert.ok(Check.checkField(f, key), it.id + ' rejects its own key ' + key);
      assert.ok(Check.checkField(f, Check.display(f)), it.id + ' rejects displayed key');
    }
  }
});

test('essay items have points to grade against', () => {
  for (const it of data.isian.filter(i => i.type === 'essay')) {
    assert.ok(it.q && it.points && it.points.length >= 2, it.id);
  }
});

test('every script the page loads is cached for offline use', () => {
  const html = fs.readFileSync(path.join(__dirname, '../app/index.html'), 'utf8');
  const sw = fs.readFileSync(path.join(__dirname, '../app/sw.js'), 'utf8');
  for (const [, src] of html.matchAll(/<script src="([^"]+)"/g)) assert.ok(sw.includes("'" + src + "'"), src);
});

test('materi weeks are well formed', () => {
  const weeks = data.materi.ks;
  assert.equal(weeks.length, 7);
  for (const w of weeks) {
    assert.ok(w.judul && w.hlm && w.ringkas && w.bagian.length, 'minggu ' + w.minggu);
    for (const b of w.bagian) {
      assert.ok(b.h && (b.poin || b.tabel), b.h);
      if (b.tabel) for (const r of b.tabel.rows) assert.equal(r.length, b.tabel.head.length, b.h);
    }
  }
});

test('uraian items stay out of the normal practice pool', () => {
  const uraian = data.isian.filter(it => it.section === 'uraian');
  assert.ok(uraian.length >= 20, 'only ' + uraian.length);
  // The section flag is what keeps them out of the normal pool.
  assert.ok(uraian.every(it => it.section === 'uraian' && it.type));
  // ks predictions carry an explanation; the older fd items never did, so only ks is checked.
  const ks = uraian.filter(it => it.course === 'ks');
  assert.ok(ks.length >= 20, 'only ' + ks.length);
  assert.ok(ks.every(it => it.ex));
});

test('only known item types', () => {
  for (const it of all) assert.ok(['mcq', 'fill', 'essay', 'steps'].includes(it.type), it.id + ' ' + it.type);
});

// A staged item is a story plus steps; each step is graded like a fill item (fields) or an essay (points).
test('staged items have well formed steps that accept their own keys', () => {
  const staged = data.isian.filter(i => i.type === 'steps');
  assert.ok(staged.length >= 20, 'only ' + staged.length);
  for (const it of staged) {
    assert.ok(it.q && it.steps && it.steps.length >= 2, it.id);
    it.steps.forEach((s, k) => {
      const where = it.id + ' step ' + (k + 1);
      assert.ok(s.q, where);
      assert.ok(!!s.fields !== !!s.points, where + ' needs fields or points, not both');
      if (s.points) assert.ok(s.points.length >= 2, where);
      if (s.table) for (const r of s.table.rows) assert.equal(r.length, s.table.head.length, where);
      for (const f of s.fields || []) {
        const key = typeof f.a === 'number' ? String(f.a) : (Array.isArray(f.a) ? f.a[0] : f.a);
        assert.ok(Check.checkField(f, key), where + ' rejects its own key ' + key);
        assert.ok(Check.checkField(f, Check.display(f)), where + ' rejects displayed key');
      }
    });
  }
});

test('Kecerdasan Artifisial practice covers the four UTS materi in staged form', () => {
  const ka = data.isian.filter(it => it.course === 'ka');
  const staged = { uts: 1, mtsp: 3, cmeta: 1, cga: 1, ctsp: 1, ccross: 1, cmoo: 1,
    mhc: 1, mgrid: 1, mspace: 1, gabin: 1, gabin2: 1, gajadwal: 1, gasel: 1,
    kpmx: 1, kpmx2: 1, mtsp2: 2, msort: 1, mfill: 1, mweight: 1 };
  for (const t of Object.keys(staged)) {
    const items = ka.filter(it => it.id.startsWith('ka-' + t + '-'));
    assert.ok(items.length >= staged[t], t + ' has ' + items.length);
    assert.ok(items.every(it => it.type === 'steps' && !it.section), t);
  }
  // Setiap materi kisi-kisi harus punya minimal dua soal berpola UTS.
  const materi = { meta: ['cmeta', 'mhc', 'mgrid', 'mspace'], ga: ['cga', 'gabin', 'gabin2', 'gajadwal', 'gasel'],
    komb: ['uts', 'mtsp', 'ctsp', 'mtsp2', 'ccross', 'kpmx', 'kpmx2'], moo: ['cmoo', 'msort', 'mfill', 'mweight'] };
  for (const m of Object.keys(materi)) {
    const n = ka.filter(it => !it.section && materi[m].some(t => it.id.startsWith('ka-' + t + '-'))).length;
    assert.ok(n >= 2, m + ' only ' + n);
  }
  // Ujian berbentuk esai, jadi drill isian singkat minggu 5-6 ditaruh di tab khusus.
  assert.ok(ka.filter(it => !it.section).every(it => it.type === 'steps'));
  assert.ok(ka.filter(it => /^ka-w[56]-/.test(it.id)).every(it => it.section === 'uraian'));
  // Materi minggu 7 sudah dihapus: di luar kisi-kisi UTS.
  assert.ok(!ka.some(it => /^ka-w7-/.test(it.id)));
  assert.ok(ka.some(it => it.id === 'ka-w5-16'));
});

// Last year's UTS question 1 (= LKS GA-2): recompute the tours from the distance matrix.
test('the UTS 2025 TSP key matches its distance matrix', () => {
  const it = data.isian.find(i => i.id === 'ka-uts-1');
  const head = it.table.head.slice(1), D = {};
  it.table.rows.forEach(r => head.forEach((c, k) => { D[r[0] + c] = r[k + 1]; }));
  const len = s => s.split('').reduce((sum, c, k, a) => sum + D[head[c - 1] + head[a[(k + 1) % a.length] - 1]], 0);
  assert.equal(len('12345'), 33);
  const a = it.steps[0].fields, f = it.steps[5].fields;
  ['12345', '24135', '51324', '32145'].forEach((s, k) => assert.equal(a[2 * k].a, len(s), s));
  it.steps[4].fields.slice(1).forEach((m, k) => assert.equal(f[2 * k].a, len(m.a), m.a));
});

test('Kecerdasan Artifisial materi is well formed and its roulette bars add up to one', () => {
  const weeks = data.materi.ka;
  assert.ok(weeks.length >= 10, 'only ' + weeks.length);
  for (const w of weeks) {
    assert.ok(w.label && w.judul && w.ringkas && w.bagian.length, w.judul);
    for (const b of w.bagian) {
      assert.ok(b.h && (b.poin || b.tabel || b.genes || b.wheel), b.h);
      if (b.tabel) for (const r of b.tabel.rows) assert.equal(r.length, b.tabel.head.length, b.h);
      if (b.wheel) assert.ok(Math.abs(b.wheel.items.reduce((s, x) => s + x.p, 0) - 1) < 1e-9, b.h);
      if (b.genes) for (const r of b.genes.rows) for (const p of (r.mark || []).concat(r.mark2 || [])) assert.ok(p >= 1 && p <= r.genes.length, b.h + ' ' + r.label);
    }
  }
});

test('Manajemen Proyek is fill-in only, like the exam', () => {
  const mp = data.isian.filter(it => it.course === 'mp');
  assert.ok(mp.length >= 50, 'only ' + mp.length);
  for (const it of mp) assert.equal(it.type, 'fill', it.id);
});

// Critical path items list the nodes as an activity-on-arrow table. Recompute every path from the table
// and compare it with the keys, so a typo in a duration or a key cannot slip through.
test('critical path keys match their node tables', () => {
  const items = data.isian.filter(it => it.course === 'mp' && it.table && it.table.head[1] === 'Initial Node');
  assert.ok(items.length >= 8, 'only ' + items.length);
  for (const it of items) {
    const rows = it.table.rows, out = {}, into = {};
    for (const r of rows) { (out[r[1]] = out[r[1]] || []).push(r); into[r[2]] = true; }
    const found = [];
    const walk = (n, acts, nodes, tot) => {
      if (!out[n]) return found.push({ acts: acts.join(''), nodes: nodes.join(''), tot });
      for (const r of out[n]) walk(r[2], acts.concat(r[0]), nodes.concat(r[2]), tot + r[3]);
    };
    for (const n of Object.keys(out)) if (!into[n]) walk(Number(n), [], [n], 0);
    found.sort((a, b) => a.tot - b.tot);
    const max = found[found.length - 1].tot, critical = found.filter(p => p.tot === max);
    const slack = act => max - Math.max(...found.filter(p => p.acts.includes(act)).map(p => p.tot));
    for (const f of it.fields) {
      let m;
      if ((m = /^Path (\d+)/.exec(f.label))) {
        const p = found[m[1] - 1];
        assert.ok(Check.checkField(f, p.acts) && Check.checkField(f, p.nodes), it.id + ' ' + f.label);
        assert.equal(new Set(found.map(q => q.tot)).size, found.length, it.id + ' path totals tie, so the order is ambiguous');
      } else if ((m = /^Total path (\d+)$/.exec(f.label))) assert.equal(f.a, found[m[1] - 1].tot, it.id + ' ' + f.label);
      else if (/^Critical path( awal)?$/.test(f.label)) {
        assert.equal(critical.length, 1, it.id);
        assert.ok(Check.checkField(f, critical[0].acts) && Check.checkField(f, critical[0].nodes), it.id + ' ' + f.label);
      } else if (/^Durasi proyek( awal)?$/.test(f.label)) assert.equal(f.a, max, it.id + ' ' + f.label);
      else if (f.label === 'Jumlah path') assert.equal(f.a, found.length, it.id);
      else if (f.label === 'Jumlah critical path') assert.equal(f.a, critical.length, it.id);
      else if ((m = /^Float ([A-Z])\b/.exec(f.label))) assert.equal(f.a, slack(m[1]), it.id + ' ' + f.label);
    }
  }
});

// Precedence tables (Pendahulu column) and node tables: redo the forward and backward pass and compare with the keys.
// In a node table an activity follows every activity that ends at its initial node.
test('forward and backward pass keys match their precedence tables', () => {
  const items = data.isian.filter(it => it.course === 'mp' && it.table && (it.table.head.includes('Pendahulu') || it.table.head[1] === 'Initial Node'));
  assert.ok(items.length >= 5, 'only ' + items.length);
  let checked = 0;
  for (const it of items) {
    const head = it.table.head, pi = head.indexOf('Pendahulu'), di = head.findIndex(x => /^(Durasi|Estimated Duration)/.test(x));
    const pre = r => pi < 0 ? it.table.rows.filter(q => q[2] === r[1]).map(q => q[0]) : r[pi] === '-' ? [] : String(r[pi]).split(/,\s*/);
    const acts = it.table.rows.map(r => ({ id: r[0], dur: r[di], pre: pre(r) }));
    const by = Object.fromEntries(acts.map(a => [a.id, a]));
    const ef = id => by[id].ef != null ? by[id].ef : (by[id].ef = Math.max(0, ...by[id].pre.map(p => ef(p))) + by[id].dur);
    acts.forEach(a => ef(a.id));
    const end = Math.max(...acts.map(a => a.ef)), next = id => acts.filter(a => a.pre.includes(id));
    const ls = id => by[id].ls != null ? by[id].ls : (by[id].ls = Math.min(end, ...next(id).map(n => ls(n.id))) - by[id].dur);
    acts.forEach(a => ls(a.id));
    const crit = [], walk = (a, path) => {
      const nxt = next(a.id).filter(n => n.ef - n.dur === a.ef && n.ls === n.ef - n.dur);
      if (!next(a.id).length) return crit.push(path);
      nxt.forEach(n => walk(n, path + n.id));
    };
    acts.filter(a => !a.pre.length && a.ls === 0).forEach(a => walk(a, a.id));
    for (const f of it.fields) {
      let m; const a = (m = /^(ES|EF|LS|LF|Total slack|Free slack) ([A-Z])$/.exec(f.label)) && by[m[2]];
      if (a) {
        const es = a.ef - a.dur, v = { ES: es, EF: a.ef, LS: a.ls, LF: a.ls + a.dur, 'Total slack': a.ls - es,
          'Free slack': Math.min(end, ...next(a.id).map(n => n.ef - n.dur)) - a.ef }[m[1]];
        assert.equal(f.a, v, it.id + ' ' + f.label); checked++;
      } else if (f.label === 'Durasi proyek') { assert.equal(f.a, end, it.id); checked++; }
      else if (f.label === 'Critical path' || f.label === 'Jalur kritis') {
        assert.equal(crit.length, 1, it.id);
        assert.ok(Check.checkField(f, crit[0]), it.id + ' ' + crit[0]); checked++;
      }
    }
  }
  assert.ok(checked >= 80, 'checked ' + checked);
});

test('a removed item keeps its slot, so later ids do not shift', () => {
  assert.ok(!all.some(it => it.id === 'mp-tl-3'));
  assert.match(all.find(it => it.id === 'mp-tl-4').q, /^Soal 4a/);
});

test('Manajemen Proyek materi is well formed and its worked tables match the diagram', () => {
  const cpm = require('../app/js/tools/cpm.js');
  const bab = data.materi.mp;
  assert.ok(bab.length >= 8, 'only ' + bab.length);
  const depth = n => typeof n === 'string' ? 1 : 1 + Math.max(0, ...(n[1] || []).map(depth));
  let wbs = 0, aoa = null, esTable = null;
  for (const w of bab) {
    assert.ok(w.label && w.judul && w.ringkas && w.bagian.length, w.judul);
    for (const b of w.bagian) {
      assert.ok(b.h && (b.poin || b.tabel || b.wbs || b.net), b.h);
      if (b.tabel) for (const r of b.tabel.rows) assert.equal(r.length, b.tabel.head.length, b.h);
      if (b.tabel && b.tabel.head.join() === 'Activity,ES,EF,LS,LF,FS,TS') esTable = b.tabel;
      if (b.wbs) {
        wbs++;
        // The exam asks for WBS down to level 3.
        assert.ok(b.wbs.root && b.wbs.items.every(n => depth(n) === 3), b.h);
      }
      if (b.net) {
        const nodes = b.net.type === 'aon' ? b.net.rows.map(r => r[0]) : b.net.rows.flatMap(r => [r[1], r[2]]);
        for (const n of nodes) assert.ok(b.net.pos[n], b.h + ': no position for node ' + n);
        if (b.net.type === 'aoa' && !aoa) aoa = b.net.rows;
      }
    }
  }
  assert.ok(wbs >= 6, 'only ' + wbs + ' WBS diagrams');
  assert.ok(aoa && esTable, 'worked network example missing');
  const r = cpm.compute(aoa.map(x => ({ id: x[0], d: x[3], pre: aoa.filter(q => q[2] === x[1]).map(q => q[0]) })));
  for (const row of esTable.rows) {
    const x = r.res[row[0]];
    assert.equal(row.slice(1).join(), [x.es, x.ef, x.ls, x.lf, x.free, x.slack].join(), row[0]);
  }
});

test('Komputasi Awan materi is well formed and exam-pattern items sit in their own topics', () => {
  const weeks = data.materi.ca;
  assert.ok(weeks && weeks.length >= 8, 'ca materi');
  for (const w of weeks) {
    assert.ok(w.judul && w.label && w.ringkas && w.bagian.length, w.judul);
    for (const b of w.bagian) {
      assert.ok(b.h && (b.poin || b.tabel), b.h);
      if (b.tabel) for (const r of b.tabel.rows) assert.equal(r.length, b.tabel.head.length, b.h);
    }
  }
  assert.ok(weeks.filter(w => w.bagian.some(b => b.soal)).length >= 7, 'each exam topic has an example question');
  const ca = data.isian.filter(it => it.course === 'ca');
  const count = t => ca.filter(it => it.topic === t).length;
  for (const t of ['Pola UTS 24/25', 'Pola UTS 25/26', 'Pola UTS 24/25 & 25/26']) assert.ok(count(t) >= 10, t + ' ' + count(t));
  // Old ca.js items keep their material topics; ids stay unique.
  assert.equal(new Set(ca.map(it => it.id)).size, ca.length);
  assert.ok(ca.filter(it => /^ca-(arsi|proc|kom|koor|nama|kons)-/.test(it.id)).every(it => !/^Pola UTS/.test(it.topic)));
});
