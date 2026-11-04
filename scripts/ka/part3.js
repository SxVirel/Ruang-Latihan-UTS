// Kisi-kisi KA materi 3: soal UTS 2025 (= LKS GA-2) dan soal mirip, dengan helper roulette/PMX/OX/front/crowding.
// dan Multi-Objective Optimisation / NSGA-II (Week 6).
const G = require('./ga.js');
const { id } = G;
const num = (label, a, tol) => ({ label, a, tol });
const txt = (label, a) => ({ label, a });
const SENDIRI = 'Kunci dihitung sendiri dengan kode; soal tidak memberi kunci.';
const INF = ['∞', 'inf', 'infinity', 'tak hingga', 'infinite'];

// ---------------------------------------------------------------- TSP seperti UTS 2025
// cfg: { cities: 'ABCDE', dist: ['AB 8', ...], pop: ['12345', ...], r: [4], tp: [tp1, tp2], rm: [4], idx: [[i, j] x4], pm }
function tspExam(cfg) {
  const C = cfg.cities.split(''), D = G.dist(cfg.dist), N = ['A1', 'A2', 'A3', 'A4'];
  const route = s => s.split('').map(c => C[+c - 1]);
  const L = s => G.tourLen(route(s), D);
  const letters = s => route(s).join('');
  const path = s => route(s).concat(route(s)[0]).join('→');
  const len = cfg.pop.map(L), fit = len.map(l => 1 / l), w = G.wheel(fit);
  const par = cfg.r.map(x => G.pick(w.cum, x));
  // Kunci memakai TP1 dan TP2 sebagai indeks gen, keduanya termasuk: segmen = gen TP1 .. TP2, karena soal menyebutnya
  // "rentang indeks" dan panah TP di tabel jawaban menunjuk sel ke-TP1 dan ke-TP2. Contoh OX di soal tidak memberi angka TP,
  // jadi tafsiran lain (potong setelah gen TP1, segmen = gen TP1+1 .. TP2) tetap mungkin; hasilnya ditulis di ex tiap langkah.
  const [a, b] = [cfg.tp[0], cfg.tp[1]];
  const pairs = [[par[0], par[1]], [par[1], par[0]], [par[2], par[3]], [par[3], par[2]]];
  const pm = cfg.pm || 0.2, mutated = cfg.rm.map(x => x < pm);
  const chain = (lo, hi) => {
    const kids = pairs.map(([i, j]) => G.ox(cfg.pop[i].split(''), cfg.pop[j].split(''), lo, hi).child.join(''));
    const mut = kids.map((k, i) => (mutated[i] ? G.swap(k.split(''), cfg.idx[i][0], cfg.idx[i][1]).join('') : k));
    return { kids, mut, nl: mut.map(L) };
  };
  const ox = (i, j) => G.ox(cfg.pop[i].split(''), cfg.pop[j].split(''), a, b);
  const { kids, mut, nl } = chain(a, b), alt = chain(a + 1, b);
  const altBest = Math.min(...alt.nl), altAll = Math.min(altBest, Math.min(...len));
  const altNote = (s) => ' Tafsiran lain (TP = potong setelah gen ' + cfg.tp[0] + ' dan gen ' + cfg.tp[1] + ', segmen gen ' + (a + 1) + '–' + b + '): ' + s + ' Tulis asumsi segmenmu di lembar ujian.';
  const bestNew = Math.min(...nl), bestOld = Math.min(...len);
  const iNew = nl.indexOf(bestNew), iOld = len.indexOf(bestOld);
  if (nl.filter(x => x === bestNew).length > 1 || len.filter(x => x === bestOld).length > 1) throw new Error('tie in best tour');
  const cum2 = w.cum.map(x => G.round(x, 2));
  for (const x of cfg.r) if (w.cum.some(c => Math.abs(c - x) < 0.015)) throw new Error('r too close to a boundary ' + x);
  const seg = (s) => s.slice(a - 1, b).split('').join(' ');
  const best = (s, l) => [s, letters(s), letters(s) + letters(s)[0]];
  const vs = bestNew < bestOld ? 'lebih baik' : bestNew > bestOld ? 'lebih buruk' : 'sama baiknya';
  const table = { head: [''].concat(C), rows: C.map(u => [u].concat(C.map(v => (u === v ? '-' : D[u][v])))) };
  const steps = [
    { q: 'a. Hitung total jarak dan nilai fitness = 1/(total jarak) setiap kromosom (fitness 4 desimal). Ingat ruas terakhir kembali ke kota awal.',
      table: { head: ['Kromosom', 'Gen', 'Rute'], rows: cfg.pop.map((s, i) => [N[i], s.split('').join(' '), path(s)]) },
      fields: [].concat(...cfg.pop.map((s, i) => [num('Total jarak ' + N[i], len[i], 0), num('Fitness ' + N[i], G.round(fit[i], 4), 0.0001)])),
      ex: cfg.pop.map((s, i) => { const r = route(s); return N[i] + ': ' + r.map((c, k) => D[c][r[(k + 1) % r.length]]).join(' + ') + ' = ' + len[i] + ', fitness 1/' + len[i] + ' = ' + id(fit[i], 4); }).join('. ') + '.' },
    { q: 'b. Hitung total fitness, proporsi roulette wheel (fitness/total, 2 desimal), dan batas atas rentang tiap kromosom. Batas bawah A1 = 0, batas atas A4 = 1. Tidak perlu diurutkan.',
      fields: [num('Total fitness (4 desimal)', G.round(w.tot, 4), 0.0002)].concat(w.p.map((p, i) => num('Proporsi ' + N[i], G.round(p, 2), 0.006)),
        [0, 1, 2].map(i => num('Batas atas ' + N[i], cum2[i], 0.011))),
      ex: 'Total = ' + fit.map(f => id(f, 4)).join(' + ') + ' = ' + id(w.tot, 4) + '. Proporsi: ' + w.p.map((p, i) => N[i] + ' ' + id(p, 4) + ' ≈ ' + id(p, 2)).join(', ') + '. Rentang: ' +
        N.map((n, i) => n + ' [' + id(i ? cum2[i - 1] : 0, 2) + ' – ' + id(cum2[i], 2) + ')').join(', ') + '. Jika tiap proporsi dibulatkan dulu lalu dijumlah, batas atas bisa beda 0,01; dua cara itu sama-sama diterima selama konsisten.' },
    { q: 'c. Pilih orang tua dengan nilai acak P1 = ' + cfg.r.map(x => String(x).replace('.', ',')).join('; ') + ' (urut P1 sampai P4). Kromosom terpilih adalah yang rentangnya memuat nilai acak.',
      fields: cfg.r.map((x, i) => txt('Parent' + (i + 1) + ' (r = ' + String(x).replace('.', ',') + ')', [N[par[i]], cfg.pop[par[i]]])),
      ex: cfg.r.map((x, i) => 'P' + (i + 1) + ' = ' + String(x).replace('.', ',') + ' → ' + N[par[i]] + ' (' + cfg.pop[par[i]] + ')').join('; ') + '.' },
    { q: 'd. Pasangkan Parent1–Parent2 dan Parent3–Parent4, lalu lakukan order crossover dengan TP1 = ' + cfg.tp[0] + ' dan TP2 = ' + cfg.tp[1] + ' (segmen = gen ke-' + a + ' sampai gen ke-' + b + ', keduanya termasuk). Anak1 = segmen Parent1 + urutan Parent2, Anak2 = segmen Parent2 + urutan Parent1, begitu juga Anak3 dan Anak4.',
      fields: kids.map((k, i) => txt('Anak' + (i + 1), k)),
      ex: pairs.map(([i, j], k) => { const o = ox(i, j); return 'Anak' + (k + 1) + ': segmen ' + seg(cfg.pop[i]) + ' dari ' + N[i] + '; urutan ' + N[j] + ' mulai gen ke-' + (b + 1) + ': ' + o.read.join(' ') + ', buang segmen → ' + o.rest.join(' ') + '; isi gen ke-' + (b + 1) + ' dst. melingkar → ' + o.child.join(' '); }).join('. ') + '.' + altNote('Anak1–4 = ' + alt.kids.join(', ') + '.') },
    { q: 'e. Probabilitas mutasi = ' + String(pm).replace('.', ',') + '. Anak dimutasi jika nilai random < ' + String(pm).replace('.', ',') + ', dengan swap mutation pada indeks gen yang ditentukan.',
      table: { head: ['Anak', 'Nilai random', 'Indeks gen'], rows: kids.map((k, i) => ['Anak' + (i + 1), String(cfg.rm[i]).replace('.', ','), cfg.idx[i].join(' dan ')]) },
      fields: [{ label: 'Anak yang dimutasi (pisahkan spasi)', a: mutated.map((m, i) => (m ? 'Anak' + (i + 1) : '')).filter(Boolean).join(' '), set: true }].concat(mut.map((m, i) => txt('Anak' + (i + 1) + ' hasil mutasi', m))),
      ex: kids.map((k, i) => 'Anak' + (i + 1) + ': ' + String(cfg.rm[i]).replace('.', ',') + (mutated[i] ? ' < ' + String(pm).replace('.', ',') + ', tukar gen ' + cfg.idx[i].join(' dan ') + ': ' + k + ' → ' + mut[i] : ' ≥ ' + String(pm).replace('.', ',') + ', tetap ' + k)).join('; ') + '.' + altNote('hasil mutasi ' + alt.mut.join(', ') + '.') },
    { q: 'f. Generational replacement tanpa elitisme: keempat anak menggantikan seluruh populasi lama. Hitung total jarak dan fitness generasi baru.',
      fields: [].concat(...mut.map((m, i) => [num('Total jarak Anak' + (i + 1), nl[i], 0), num('Fitness Anak' + (i + 1), G.round(1 / nl[i], 4), 0.0001)])),
      ex: mut.map((m, i) => 'Anak' + (i + 1) + ' ' + path(m) + ' = ' + nl[i] + ', fitness ' + id(1 / nl[i], 4)).join('. ') + '. Rata-rata jarak ' + id(G.sum(len) / 4, 2) + ' → ' + id(G.sum(nl) / 4, 2) + '.' + altNote('jarak ' + alt.nl.join(', ') + '.') },
    { q: 'g. Tuliskan jalur terbaik di generasi baru dan jalur terbaik yang pernah ditemukan selama proses (generasi awal + generasi baru), beserta total jaraknya.',
      fields: [txt('Jalur terbaik generasi baru', best(mut[iNew], bestNew)), num('Jaraknya', bestNew, 0),
        txt('Jalur terbaik selama proses', bestNew <= bestOld ? best(mut[iNew], bestNew) : best(cfg.pop[iOld], bestOld)), num('Jarak terbaik selama proses', Math.min(bestOld, bestNew), 0)],
      ex: 'Generasi baru: Anak' + (iNew + 1) + ' = ' + path(mut[iNew]) + ' (' + bestNew + '). ' +
        (bestNew > bestOld ? 'Tetapi ' + N[iOld] + ' di generasi awal (' + path(cfg.pop[iOld]) + ', ' + bestOld + ') lebih pendek dan hilang karena tidak ada elitisme. Jawaban "jalur paling optimal yang didapatkan" = ' + path(cfg.pop[iOld]) + ' = ' + bestOld + '; sebutkan juga bahwa generasi baru justru memburuk.'
          : bestNew < bestOld ? 'Generasi baru lebih baik dari generasi awal (terbaik lama ' + N[iOld] + ' = ' + bestOld + '): crossover dan mutasi berhasil menggabungkan bagian rute yang baik.'
            : 'Generasi baru sama baiknya dengan generasi awal (' + bestOld + '): anak terbaik kebetulan mewarisi rute terbaik induknya, sehingga tidak ada perbaikan dan tidak ada kemunduran.') +
        (cfg.opt ? ' Optimum sebenarnya (dicek dengan mencoba semua permutasi) = ' + cfg.opt + '.' : '') +
        altNote('terbaik generasi baru ' + altBest + ', terbaik selama proses ' + altAll + '.') },
    { q: 'Jelaskan apa yang terjadi jika dipakai elitisme k = 1, dan mengapa jawaban g bergantung pada ada tidaknya elitisme.',
      points: ['Elitisme k = 1 menyalin kromosom terbaik generasi lama (jarak terpendek) ke generasi baru tanpa diubah',
        'Kromosom terbaik menggantikan anak terburuk (jarak terpanjang)', 'Tanpa elitisme solusi terbaik bisa hilang, sehingga kurva jarak terbaik bisa naik',
        bestNew > bestOld ? 'Di soal ini rute terbaik (' + bestOld + ') hilang di generasi baru, jadi jawaban g adalah rute generasi awal'
          : bestNew < bestOld ? 'Di soal ini generasi baru sudah lebih baik, jadi elitisme tidak mengubah jawaban g'
            : 'Di soal ini generasi baru hanya menyamai generasi awal, jadi elitisme tidak mengubah jawaban g; perhatikan bahwa anak terbaik sama persis dengan induk terbaik'] }
  ];
  return { type: 'steps', q: cfg.q, table, steps, ex: cfg.ex };
}

const uts = [];
uts.push(tspExam({ cities: 'ABCDE', dist: ['AB 8', 'AC 12', 'AD 6', 'AE 5', 'BC 7', 'BD 10', 'BE 13', 'CD 4', 'CE 8', 'DE 9'],
  pop: ['12345', '24135', '51324', '32145'], r: [0.201, 0.440, 0.876, 0.107], tp: [2, 4], rm: [0.21, 0.54, 0.05, 0.19], idx: [[1, 3], [2, 4], [1, 5], [2, 3]], opt: 33,
  q: 'Soal 1 UTS KA Ganjil 2025/2026 (sama dengan LKS GA-2). Peta 5 kota diberikan sebagai matriks ketetanggaan di bawah. Selesaikan TSP dengan algoritma genetika: populasi 4 individu, salesman boleh mulai dari kota mana pun, representasi permutasi (1 = A, 2 = B, 3 = C, 4 = D, 5 = E; kromosom 12345 berarti A→B→C→D→E→A), fitness = 1/(total jarak).',
  ex: 'Soal asli UTS 2025 dan LKS GA-2; kunci dihitung sendiri dengan kode karena dokumen tidak memberi kunci.' }));

const mirip = [];
mirip.push(tspExam({ cities: 'ABCDE', dist: ['AB 12', 'AC 11', 'AD 4', 'AE 12', 'BC 3', 'BD 6', 'BE 9', 'CD 10', 'CE 6', 'DE 15'],
  pop: ['23415', '12534', '54132', '45213'], r: [0.34, 0.927, 0.443, 0.61], tp: [2, 4], rm: [0.11, 0.42, 0.07, 0.55], idx: [[1, 2], [2, 5], [1, 3], [3, 5]], opt: 31,
  q: 'Kurir ekspedisi di Bandung melayani 5 titik antar: A (gudang Gedebage), B (Dago), C (Cihampelas), D (Buahbatu), E (Pasteur). Jarak (km) pada matriks. Selesaikan TSP dengan algoritma genetika: populasi 4, mulai dari titik mana pun, representasi permutasi (1 = A sampai 5 = E), fitness = 1/(total jarak).',
  ex: 'Soal buatan sendiri dengan format sama persis seperti UTS 2025; kunci dihitung dengan kode.' }));
mirip.push(tspExam({ cities: 'ABCDE', dist: ['AB 7', 'AC 13', 'AD 6', 'AE 8', 'BC 11', 'BD 6', 'BE 8', 'CD 4', 'CE 15', 'DE 13'],
  pop: ['15243', '51423', '23145', '52341'], r: [0.837, 0.393, 0.565, 0.452], tp: [2, 4], rm: [0.31, 0.12, 0.47, 0.08], idx: [[1, 4], [2, 5], [3, 5], [1, 2]],
  q: 'Tim survei lapangan mengunjungi 5 desa (A sampai E) dalam satu putaran dan kembali ke desa awal. Jarak (km) pada matriks. Gunakan algoritma genetika dengan populasi 4, representasi permutasi (1 = A sampai 5 = E), dan fitness = 1/(total jarak).',
  ex: 'Soal buatan sendiri dengan format UTS 2025. Di sini, seperti soal aslinya, rute terbaik hilang karena tidak ada elitisme.' }));
mirip.push(tspExam({ cities: 'ABCDEF', dist: ['AB 8', 'AC 13', 'AD 9', 'AE 15', 'AF 13', 'BC 9', 'BD 14', 'BE 8', 'BF 10', 'CD 14', 'CE 9', 'CF 7', 'DE 12', 'DF 14', 'EF 14'],
  pop: ['431562', '362154', '165342', '653142'], r: [0.365, 0.674, 0.15, 0.81], tp: [2, 5], rm: [0.31, 0.12, 0.47, 0.08], idx: [[1, 4], [2, 6], [3, 5], [1, 6]],
  q: 'Teknisi jaringan mengunjungi 6 BTS (A sampai F) lalu kembali ke BTS awal. Jarak (km) pada matriks. Gunakan algoritma genetika dengan populasi 4, representasi permutasi (1 = A sampai 6 = F), fitness = 1/(total jarak). Perhatikan: kromosom 6 gen dan segmen OX lebih panjang.',
  ex: 'Soal buatan sendiri, versi 6 kota dari format UTS 2025; kunci dihitung dengan kode.' }));

// ---------------------------------------------------------------- NSGA-II
const dom = (a, b) => a.every((x, i) => x <= b[i]) && a.some((x, i) => x < b[i]);
function sortFronts(S) { // S: { name: [f1, f2] }, all minimised
  const names = Object.keys(S), np = {}, sp = {};
  names.forEach(p => { np[p] = names.filter(q => dom(S[q], S[p])).length; sp[p] = names.filter(q => dom(S[p], S[q])); });
  const fronts = [], left = new Set(names), n = Object.assign({}, np);
  while (left.size) {
    const f = [...left].filter(p => n[p] === 0);
    fronts.push(f);
    f.forEach(p => { left.delete(p); sp[p].forEach(q => n[q]--); });
  }
  return { np, sp, fronts };
}
function crowd(S, front) {
  const cd = Object.fromEntries(front.map(p => [p, 0])), parts = Object.fromEntries(front.map(p => [p, []]));
  for (let m = 0; m < 2; m++) {
    const s = front.slice().sort((a, b) => S[a][m] - S[b][m]);
    const range = S[s[s.length - 1]][m] - S[s[0]][m];
    cd[s[0]] = cd[s[s.length - 1]] = Infinity;
    for (let i = 1; i < s.length - 1; i++) {
      const d = range ? (S[s[i + 1]][m] - S[s[i - 1]][m]) / range : 0;
      parts[s[i]].push('(' + S[s[i + 1]][m] + ' − ' + S[s[i - 1]][m] + ')/' + range);
      if (cd[s[i]] !== Infinity) cd[s[i]] += d;
    }
  }
  return { cd, parts };
}
const cdField = (p, v) => (v === Infinity ? txt('CD ' + p, INF) : num('CD ' + p, G.round(v, 4), 0.0006));
const cdText = (p, v) => p + ' = ' + (v === Infinity ? '∞' : id(v, 4));
const pts = S => Object.keys(S).map(p => p + '(' + S[p].join(', ') + ')').join(', ');
module.exports = { uts, mirip, tspExam, sortFronts, crowd, dom, cdField, cdText };
