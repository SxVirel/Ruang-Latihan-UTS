// node scripts/ka/build.js app/data: writes ka-4.js and ka-5.js, after checking that every field accepts its own key.
const fs = require('fs'), path = require('path');
const { topic } = require('./emit.js');
const p3 = require('./part3.js'), p4 = require('./part4.js'), p5 = require('./part5.js');
const out = path.resolve(process.argv[2]);
const Check = require(path.join(out, '../js/check.js'));

// Topic names follow the four UTS materi: Metaheuristic Search, Genetic Algorithm,
// GA for Combinatorial Problems, Multi-Objective Optimisation. Topic ids never change, because saved progress uses them.
const files = {
  'ka-4.js': {
    head: '// Kecerdasan Artifisial — soal UTS KA 2025 (sama dengan LKS GA-2) dan tiga soal mirip berpola sama.\n' +
      '// Semua angka dihitung dengan kode; soal UTS dan LKS tidak memberi kunci.\n',
    topics: [{ id: 'uts', name: 'Soal UTS 2025 (= LKS GA-2): GA untuk TSP', items: p3.uts },
      { id: 'mtsp', name: 'Mirip UTS 2025: GA untuk TSP', items: p3.mirip }]
  },
  'ka-5.js': {
    head: '// Kecerdasan Artifisial — soal berpola UTS per materi kisi-kisi, semuanya uraian bertahap.\n' +
      '// Materi 1 Metaheuristic Search, materi 2 Genetic Algorithm, materi 3 GA kombinatorial (TSP, PMX, OX),\n' +
      '// materi 4 Multi-Objective / NSGA-II. Semua angka dihitung dengan kode (part4.js dan part5.js) dan dibulatkan\n' +
      '// 2 desimal, kecuali fitness 1/jarak yang ditulis 4 desimal karena dipakai menghitung proporsi roulette.\n',
    topics: [
      { id: 'cmoo', name: 'Soal Cerita: NSGA-II (Week 6)', items: p4.moo },
      { id: 'cmeta', name: 'Soal Cerita: Metaheuristic Search (Week 1)', items: p4.meta },
      { id: 'cga', name: 'Soal Cerita: Satu Generasi GA (Week 2-3)', items: p4.ga },
      { id: 'ctsp', name: 'Soal Cerita: GA untuk TSP, pola soal UTS', items: p4.tsp },
      { id: 'ccross', name: 'Soal Cerita: Crossover PMX & OX (Week 5)', items: p4.cross },
      { id: 'mhc', name: 'Pola UTS · Metaheuristic: Hill Climbing & SA', items: p5.mhc },
      { id: 'mgrid', name: 'Pola UTS · Metaheuristic: Peta 2 Dimensi', items: p5.mgrid },
      { id: 'mspace', name: 'Pola UTS · Metaheuristic: Ruang Pencarian & No Free Lunch', items: p5.mspace },
      { id: 'gabin', name: 'Pola UTS · GA: Satu Generasi Biner', items: p5.gabin },
      { id: 'gabin2', name: 'Pola UTS · GA: Decode dan Satu Generasi', items: p5.gabin2 },
      { id: 'gajadwal', name: 'Pola UTS · GA: Jadwal Integer Satu Generasi', items: p5.gajadwal },
      { id: 'gasel', name: 'Pola UTS · GA: Seleksi Roulette, Tournament, Rank', items: p5.gasel },
      { id: 'kpmx', name: 'Pola UTS · PMX & OX Tujuh Gen', items: p5.kpmx },
      { id: 'kpmx2', name: 'Pola UTS · PMX & OX Delapan Gen', items: p5.kpmx2 },
      { id: 'mtsp2', name: 'Pola UTS · GA untuk TSP (6 kota, 7 kota)', items: p5.tsp2 },
      { id: 'msort', name: 'Pola UTS · NSGA-II: Sort, Crowding, Tournament', items: p5.msort },
      { id: 'mfill', name: 'Pola UTS · NSGA-II: Combine 2N lalu Fill N', items: p5.mfill },
      { id: 'mweight', name: 'Pola UTS · Multi-Objective: Knee Point & Weighted Sum', items: p5.mweight }
    ]
  }
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
