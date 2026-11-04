// node scripts/ka/build.js app/data: writes ka-2.js, ka-3.js and ka-4.js, after checking that every field accepts its own key.
const fs = require('fs'), path = require('path');
const { topic } = require('./emit.js');
const p1 = require('./part1.js'), p2 = require('./part2.js'), p3 = require('./part3.js');
const out = path.resolve(process.argv[2]);
const Check = require(path.join(out, '../js/check.js'));

// Topic names follow the four UTS materi: Metaheuristic Search, Genetic Algorithm, GA for Combinatorial Problems,
// Multi-Objective Optimisation. Topic ids never change, because saved progress uses them.
const files = {
  'ka-4.js': { head: '// Kecerdasan Artifisial — soal UTS KA 2025 (sama dengan LKS GA-2), soal mirip, Metaheuristic Search (Week 1),\n' +
      '// dan Multi-Objective Optimisation / NSGA-II (Week 6). Uraian bertahap seperti soal esai UTS.\n' +
      '// Semua angka dihitung dengan kode; soal UTS dan LKS tidak memberi kunci.\n',
    topics: [{ id: 'uts', name: 'Soal UTS 2025 (= LKS GA-2): GA untuk TSP', items: p3.uts },
      { id: 'mtsp', name: 'Mirip UTS 2025: GA untuk TSP', items: p3.mirip },
      { id: 'meta', name: 'Metaheuristic Search (Week 1)', items: p3.meta },
      { id: 'moo', name: 'Multi-Objective & NSGA-II (Week 6)', items: p3.moo }] },
  'ka-2.js': { head: '// Kecerdasan Artifisial — soal uraian bertahap Genetic Algorithm (Week 2-3): konsep GA, proses GA, studi kasus jadwal.\n' +
      '// Setiap soal (type: \'steps\') berisi langkah fill atau essay yang dibuka satu per satu saat latihan.\n' +
      '// Dibuat dari slide minggu 1-3 dan 5; semua angka dihitung dengan kode, label kunci buatan sendiri ada di ex.\n',
    topics: [{ id: 'konsep', name: 'Genetic Algorithm: Konsep Keseluruhan', items: p1.konsep },
      { id: 'proses', name: 'Genetic Algorithm: Proses Satu Generasi', items: p1.proses },
      { id: 'jadwal', name: 'Genetic Algorithm: Studi Kasus Jadwal (Week 3)', items: p1.jadwal }] },
  'ka-3.js': { head: '// Kecerdasan Artifisial — soal uraian bertahap GA for Combinatorial Problems (Week 5): kombinatorial, PMX & OX, TSP,\n' +
      '// dan latihan dari slide. Dibuat dari slide minggu 1-5; semua angka dihitung dengan kode.\n',
    topics: [{ id: 'komb', name: 'GA Kombinatorial: Kombinatorial vs Non-kombinatorial', items: p2.komb },
      { id: 'cross', name: 'GA Kombinatorial: Crossover PMX & OX', items: p2.cross },
      { id: 'tsp', name: 'GA Kombinatorial: GA untuk TSP', items: p2.tsp },
      { id: 'lks', name: 'Latihan dari Slide Week 1-3', items: p2.lks }] }
};

let n = 0, steps = 0;
for (const [name, f] of Object.entries(files)) {
  for (const t of f.topics) for (const it of t.items) {
    n++;
    for (const s of it.steps) {
      steps++;
      if (s.fields) for (const fl of s.fields) {
        const key = typeof fl.a === 'number' ? String(fl.a) : (Array.isArray(fl.a) ? fl.a[0] : fl.a);
        if (!Check.checkField(fl, key) || !Check.checkField(fl, Check.display(fl))) throw new Error(t.id + ' rejects own key ' + fl.label + ' ' + key);
        if (typeof fl.a === 'number' && !isFinite(fl.a)) throw new Error(t.id + ' bad number ' + fl.label);
      } else if (!s.points || s.points.length < 2) throw new Error(t.id + ' step without fields or points: ' + s.q);
    }
  }
  fs.writeFileSync(path.join(out, name), f.head + '\n' + f.topics.map(t => topic('ka', t)).join('\n'));
}
console.log('items', n, 'steps', steps);
