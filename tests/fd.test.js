const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const Check = require('../app/js/check.js');
const Session = require('../app/js/session.js');

// Same loading order as index.html: the data scripts run against one BANK.
function loadBank() {
  const html = fs.readFileSync(path.join(__dirname, '../app/index.html'), 'utf8');
  const files = [...html.matchAll(/<script src="(data\/[^"]+)"/g)].map(m => m[1]);
  const BANK = require('../app/js/bank.js');
  const ctx = vm.createContext({ BANK });
  for (const f of files) vm.runInContext(fs.readFileSync(path.join(__dirname, '../app', f), 'utf8'), ctx, { filename: f });
  return { data: BANK.data, files };
}

function shuffle(items) {
  const a = items.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const { data } = loadBank();
const all = data.mcq.concat(data.isian);
const course = data.courses.fd;
// The pool the Latihan tab draws from: everything not parked in the Uraian & Isian tab.
const pool = all.filter(it => it.course === 'fd' && !it.section);
const mcqPool = pool.filter(it => it.type === 'mcq');
const fillPool = pool.filter(it => it.type === 'fill');

test('Forensik Digital has enough questions for a fixed 20 + 5 session', () => {
  assert.ok(mcqPool.length >= 60, 'only ' + mcqPool.length + ' multiple choice');
  assert.ok(fillPool.length >= 20, 'only ' + fillPool.length + ' short answer');
});

test('the fixed session shape is a course setting, not a course name check', () => {
  assert.equal(course.mix.mcq, 20);
  assert.equal(course.mix.fill, 5);
  for (const id of Object.keys(data.courses)) {
    if (id === 'fd') continue;
    assert.equal(data.courses[id].mix, undefined, id + ' should keep its current shape');
  }
});

test('every fd session is exactly 20 multiple choice plus 5 short answer', () => {
  for (let run = 0; run < 200; run++) {
    const set = Session.compose(course, pool, shuffle);
    assert.ok(set, 'session could not be composed');
    assert.equal(set.length, 25);
    assert.equal(set.filter(it => it.type === 'mcq').length, 20);
    assert.equal(set.filter(it => it.type === 'fill').length, 5);
    assert.equal(new Set(set.map(it => it.id)).size, 25, 'duplicate item in one session');
  }
});

test('the drawn session mixes both kinds instead of grouping them', () => {
  const firstTypes = new Set();
  let mixedRuns = 0;
  for (let run = 0; run < 200; run++) {
    const set = Session.compose(course, pool, shuffle);
    firstTypes.add(set[0].type);
    // Mixed means at least one short answer sits before the last multiple choice item.
    const lastMcq = set.map(it => it.type).lastIndexOf('mcq');
    const firstFill = set.map(it => it.type).indexOf('fill');
    if (firstFill < lastMcq) mixedRuns++;
  }
  assert.equal(firstTypes.size, 2, 'the first question is always the same type');
  assert.ok(mixedRuns > 150, 'order is not really mixed: ' + mixedRuns + '/200');
});

test('the exam timer is derived from the mixed set', () => {
  const secsOf = type => course.mixSecs[type];
  assert.equal(Session.seconds(course, secsOf), 20 * 120 + 5 * 300);
});

test('a session is only offered when the chosen topics can fill it', () => {
  assert.equal(Session.ready(course, pool), true);
  assert.equal(Session.compose(course, mcqPool.slice(0, 19), shuffle), null);
  assert.equal(Session.compose(course, fillPool.slice(0, 4), shuffle), null);
  assert.equal(Session.ready(data.courses.ks, pool), false);
});

test('fd multiple choice items have 3-4 unique wrong options', () => {
  for (const it of mcqPool) {
    assert.ok(it.q && it.a && it.ex, it.id);
    assert.ok(it.w.length >= 3 && it.w.length <= 4, it.id + ': ' + it.w.length + ' wrong options');
    const opts = [it.a, ...it.w].map(s => s.trim().toLowerCase());
    assert.equal(new Set(opts).size, opts.length, it.id + ' has a duplicate option');
  }
});

test('the session pool only holds kisi-kisi items', () => {
  const topics = new Set(pool.map(it => it.topic));
  const expected = [
    'Prinsip & Proses Forensik (PG)', 'Prinsip & Proses (isian)',
    'Hukum & Standar Bukti (PG)', 'Hukum & Standar Bukti (isian)',
    'Akuisisi & Penanganan Bukti (PG)', 'Akuisisi & Penanganan Bukti (isian)',
    'Artefak & Memori (PG)', 'Artefak & Memori (isian)'
  ];
  assert.deepEqual([...topics].sort(), expected.sort());
  assert.equal(pool.filter(it => it.type === 'essay').length, 0, 'essays must not enter a 20 + 5 session');
  // The old answers stay usable in their own tab, but never join the fixed session.
  const oldIds = new Set(all.filter(it => it.section === 'uraian').map(it => it.id));
  assert.ok(oldIds.size >= 30, 'old items disappeared: ' + oldIds.size);
  assert.equal(pool.filter(it => oldIds.has(it.id)).length, 0);
});

test('short answer keys accept their own answer', () => {
  for (const it of fillPool) {
    assert.equal(it.type, 'fill', it.id);
    for (const f of it.fields) {
      const key = typeof f.a === 'number' ? String(f.a) : (Array.isArray(f.a) ? f.a[0] : f.a);
      assert.ok(Check.checkField(f, key), it.id + ' rejects its own key ' + key);
      assert.ok(Check.checkField(f, Check.display(f)), it.id + ' rejects displayed key');
    }
  }
});

test('fd materi covers the seven decks', () => {
  const weeks = data.materi.fd;
  assert.equal(weeks.length, 7);
  for (const w of weeks) {
    assert.ok(w.minggu && w.judul && w.hlm && w.ringkas && w.bagian.length, 'minggu ' + w.minggu);
    for (const b of w.bagian) {
      assert.ok(b.h && (b.poin || b.tabel), b.h);
      if (b.tabel) for (const r of b.tabel.rows) assert.equal(r.length, b.tabel.head.length, b.h);
    }
  }
});
