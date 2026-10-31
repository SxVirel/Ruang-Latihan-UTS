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

test('only known item types', () => {
  for (const it of all) assert.ok(['mcq', 'fill', 'essay'].includes(it.type), it.id + ' ' + it.type);
});
