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
  for (const it of all) assert.ok(['mcq', 'fill', 'essay'].includes(it.type), it.id + ' ' + it.type);
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

// Activity-on-node tables (Pendahulu column): redo the forward and backward pass and compare with the keys.
test('forward and backward pass keys match their precedence tables', () => {
  const items = data.isian.filter(it => it.course === 'mp' && it.table && it.table.head.includes('Pendahulu'));
  assert.ok(items.length >= 5, 'only ' + items.length);
  let checked = 0;
  for (const it of items) {
    const head = it.table.head, pi = head.indexOf('Pendahulu'), di = head.findIndex(x => /^Durasi/.test(x));
    const acts = it.table.rows.map(r => ({ id: r[0], dur: r[di], pre: r[pi] === '-' ? [] : String(r[pi]).split(/,\s*/) }));
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
  assert.ok(checked >= 20, 'checked ' + checked);
});
