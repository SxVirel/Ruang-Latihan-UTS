// Kisi-kisi KA terbaru (4 materi): soal UTS 2025 (= LKS GA-2) dan soal mirip, Metaheuristic Search (Week 1),
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
  const [a, b] = [cfg.tp[0] + 1, cfg.tp[1]];
  const ox = (i, j) => G.ox(cfg.pop[i].split(''), cfg.pop[j].split(''), a, b);
  const pairs = [[par[0], par[1]], [par[1], par[0]], [par[2], par[3]], [par[3], par[2]]];
  const kids = pairs.map(([i, j]) => ox(i, j).child.join(''));
  const pm = cfg.pm || 0.2, mutated = cfg.rm.map(x => x < pm);
  const mut = kids.map((k, i) => (mutated[i] ? G.swap(k.split(''), cfg.idx[i][0], cfg.idx[i][1]).join('') : k));
  const nl = mut.map(L), bestNew = Math.min(...nl), bestOld = Math.min(...len);
  const iNew = nl.indexOf(bestNew), iOld = len.indexOf(bestOld);
  if (nl.filter(x => x === bestNew).length > 1 || len.filter(x => x === bestOld).length > 1) throw new Error('tie in best tour');
  const cum2 = w.cum.map(x => G.round(x, 2));
  for (const x of cfg.r) if (w.cum.some(c => Math.abs(c - x) < 0.015)) throw new Error('r too close to a boundary ' + x);
  const seg = (s) => s.slice(a - 1, b).split('').join(' ');
  const best = (s, l) => [s, letters(s), letters(s) + letters(s)[0]];
  const oldBestBetter = bestOld < bestNew;
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
    { q: 'd. Pasangkan Parent1–Parent2 dan Parent3–Parent4, lalu lakukan order crossover dengan TP1 = ' + cfg.tp[0] + ' dan TP2 = ' + cfg.tp[1] + ' (segmen = gen ke-' + a + ' sampai ke-' + b + '). Anak1 = segmen Parent1 + urutan Parent2, Anak2 = segmen Parent2 + urutan Parent1, begitu juga Anak3 dan Anak4.',
      fields: kids.map((k, i) => txt('Anak' + (i + 1), k)),
      ex: pairs.map(([i, j], k) => { const o = ox(i, j); return 'Anak' + (k + 1) + ': segmen ' + seg(cfg.pop[i]) + ' dari ' + N[i] + '; urutan ' + N[j] + ' mulai gen ke-' + (b + 1) + ': ' + o.read.join(' ') + ', buang segmen → ' + o.rest.join(' ') + '; isi gen ke-' + (b + 1) + ' dst. melingkar → ' + o.child.join(' '); }).join('. ') + '.' },
    { q: 'e. Probabilitas mutasi = ' + String(pm).replace('.', ',') + '. Anak dimutasi jika nilai random < ' + String(pm).replace('.', ',') + ', dengan swap mutation pada indeks gen yang ditentukan.',
      table: { head: ['Anak', 'Nilai random', 'Indeks gen'], rows: kids.map((k, i) => ['Anak' + (i + 1), String(cfg.rm[i]).replace('.', ','), cfg.idx[i].join(' dan ')]) },
      fields: [{ label: 'Anak yang dimutasi (pisahkan spasi)', a: mutated.map((m, i) => (m ? 'Anak' + (i + 1) : '')).filter(Boolean).join(' '), set: true }].concat(mut.map((m, i) => txt('Anak' + (i + 1) + ' hasil mutasi', m))),
      ex: kids.map((k, i) => 'Anak' + (i + 1) + ': ' + String(cfg.rm[i]).replace('.', ',') + (mutated[i] ? ' < ' + String(pm).replace('.', ',') + ', tukar gen ' + cfg.idx[i].join(' dan ') + ': ' + k + ' → ' + mut[i] : ' ≥ ' + String(pm).replace('.', ',') + ', tetap ' + k)).join('; ') + '.' },
    { q: 'f. Generational replacement tanpa elitisme: keempat anak menggantikan seluruh populasi lama. Hitung total jarak dan fitness generasi baru.',
      fields: [].concat(...mut.map((m, i) => [num('Total jarak Anak' + (i + 1), nl[i], 0), num('Fitness Anak' + (i + 1), G.round(1 / nl[i], 4), 0.0001)])),
      ex: mut.map((m, i) => 'Anak' + (i + 1) + ' ' + path(m) + ' = ' + nl[i] + ', fitness ' + id(1 / nl[i], 4)).join('. ') + '. Rata-rata jarak ' + id(G.sum(len) / 4, 2) + ' → ' + id(G.sum(nl) / 4, 2) + '.' },
    { q: 'g. Tuliskan jalur terbaik di generasi baru dan jalur terbaik yang pernah ditemukan selama proses (generasi awal + generasi baru), beserta total jaraknya.',
      fields: [txt('Jalur terbaik generasi baru', best(mut[iNew], bestNew)), num('Jaraknya', bestNew, 0),
        txt('Jalur terbaik selama proses', oldBestBetter ? best(cfg.pop[iOld], bestOld) : best(mut[iNew], bestNew)), num('Jarak terbaik selama proses', Math.min(bestOld, bestNew), 0)],
      ex: 'Generasi baru: Anak' + (iNew + 1) + ' = ' + path(mut[iNew]) + ' (' + bestNew + '). ' +
        (oldBestBetter ? 'Tetapi ' + N[iOld] + ' di generasi awal (' + path(cfg.pop[iOld]) + ', ' + bestOld + ') lebih pendek dan hilang karena tidak ada elitisme. Jawaban "jalur paling optimal yang didapatkan" = ' + path(cfg.pop[iOld]) + ' = ' + bestOld + '; sebutkan juga bahwa generasi baru justru memburuk.' :
          'Generasi baru lebih baik dari generasi awal (terbaik lama ' + N[iOld] + ' = ' + bestOld + '): crossover dan mutasi berhasil menggabungkan bagian rute yang baik.') + (cfg.opt ? ' Optimum sebenarnya (dicek dengan mencoba semua permutasi) = ' + cfg.opt + '.' : '') },
    { q: 'Jelaskan apa yang terjadi jika dipakai elitisme k = 1, dan mengapa jawaban g bergantung pada ada tidaknya elitisme.',
      points: ['Elitisme k = 1 menyalin kromosom terbaik generasi lama (jarak terpendek) ke generasi baru tanpa diubah',
        'Kromosom terbaik menggantikan anak terburuk (jarak terpanjang)', 'Tanpa elitisme solusi terbaik bisa hilang, sehingga kurva jarak terbaik bisa naik',
        oldBestBetter ? 'Di soal ini rute terbaik (' + bestOld + ') hilang di generasi baru, jadi jawaban g adalah rute generasi awal' : 'Di soal ini generasi baru sudah lebih baik, jadi elitisme tidak mengubah jawaban g'] }
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
  pop: ['23415', '12534', '54132', '45213'], r: [0.34, 0.927, 0.443, 0.61], tp: [2, 4], rm: [0.31, 0.12, 0.47, 0.08], idx: [[1, 4], [2, 5], [3, 5], [1, 2]], opt: 31,
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

const moo = [];

function sortItem(cfg) {
  const S = cfg.S, names = Object.keys(S), r = sortFronts(S), F1 = r.fronts[0], c = crowd(S, cfg.cdFront ? r.fronts[cfg.cdFront - 1] : F1);
  const steps = [
    { q: 'Hitung n_p (jumlah solusi yang mendominasi p) dan S_p (solusi yang didominasi p) untuk semua solusi. Kedua objektif diminimalkan.',
      fields: names.map(p => num('n_p ' + p, r.np[p], 0)).concat(names.map(p => ({ label: 'S_p ' + p + ' (jika kosong tulis "kosong")', a: r.sp[p].length ? r.sp[p].join(' ') : ['kosong', 'tidak ada', 'none'], set: !!r.sp[p].length }))),
      ex: names.map(p => p + ': n_p = ' + r.np[p] + (r.np[p] ? ' (didominasi ' + names.filter(q => dom(S[q], S[p])).join(', ') + ')' : '') + ', S_p = {' + r.sp[p].join(', ') + '}').join('. ') + '. Ingat: seri di satu objektif tetap bisa mendominasi, misalnya (3, 44) mendominasi (3, 45).' },
    { q: 'Baca front dari n_p dan S_p: front 1 = semua dengan n_p = 0, lalu kurangi n_q untuk setiap q di S_p, dan seterusnya.',
      fields: r.fronts.map((f, i) => ({ label: 'Front ' + (i + 1), a: f.join(' '), set: true })),
      ex: r.fronts.map((f, i) => 'Front ' + (i + 1) + ' = {' + f.join(', ') + '}').join(', ') + '. Rank = nomor front.' },
    { q: 'Hitung crowding distance setiap anggota front ' + (cfg.cdFront || 1) + ' (4 desimal). Ujung tiap objektif diberi ∞.',
      fields: Object.keys(c.cd).map(p => cdField(p, c.cd[p])),
      ex: 'Rentang dihitung di dalam front saja. ' + Object.keys(c.cd).map(p => c.cd[p] === Infinity ? p + ' ujung → ∞' : p + ' = ' + c.parts[p].join(' + ') + ' = ' + id(c.cd[p], 4)).join('; ') + '.' }
  ];
  if (cfg.tours) {
    const rank = Object.fromEntries(r.fronts.flatMap((f, i) => f.map(p => [p, i + 1])));
    const cdAll = {}; r.fronts.forEach(f => Object.assign(cdAll, crowd(S, f).cd));
    const win = cfg.tours.map(([a, b]) => (rank[a] !== rank[b] ? (rank[a] < rank[b] ? a : b) : cdAll[a] === cdAll[b] ? null : cdAll[a] > cdAll[b] ? a : b));
    if (win.includes(null)) throw new Error('tournament tie');
    steps.push({ q: 'Binary tournament: ' + cfg.tours.map(t => t.join(' vs ')).join(', ') + '. Siapa pemenangnya? Rank lebih kecil menang; jika rank sama, crowding distance lebih besar menang.',
      fields: cfg.tours.map((t, i) => txt(t.join(' vs '), win[i])),
      ex: cfg.tours.map(([a, b], i) => a + ' (rank ' + rank[a] + ', CD ' + (cdAll[a] === Infinity ? '∞' : id(cdAll[a], 4)) + ') vs ' + b + ' (rank ' + rank[b] + ', CD ' + (cdAll[b] === Infinity ? '∞' : id(cdAll[b], 4)) + ') → ' + win[i] + (rank[a] === rank[b] ? ', diputuskan crowding' : ', diputuskan rank')).join('; ') + '.' });
  }
  if (cfg.essay) steps.push(cfg.essay);
  return { type: 'steps', q: cfg.q, table: cfg.table, steps, ex: cfg.ex };
}

moo.push(sortItem({ S: { Q1: [3, 31], Q2: [4, 22], Q3: [3, 26], Q4: [5, 19], Q5: [4, 28], Q6: [5, 24] }, tours: [['Q5', 'Q6'], ['Q1', 'Q4'], ['Q2', 'Q4']],
  q: 'Latihan slide Week 6 (Repeat Steps 2 and 3 on a New Population). Enam jadwal dari generasi berikutnya sudah dievaluasi: f1 = jumlah slot terpakai, f2 = jumlah bentrok mahasiswa. Keduanya diminimalkan.',
  table: { head: ['Solusi', 'f1 (slot)', 'f2 (bentrok)'], rows: [['Q1', 3, 31], ['Q2', 4, 22], ['Q3', 3, 26], ['Q4', 5, 19], ['Q5', 4, 28], ['Q6', 5, 24]] },
  essay: { q: 'Slide bertanya: "satu solusi di sini mendominasi tiga solusi lain". Periksa klaim itu dengan S_p yang kamu hitung, lalu jelaskan apa artinya bila sebuah solusi mendominasi banyak solusi lain.',
    points: ['Dengan angka di tabel, tidak ada yang mendominasi tiga: Q2 mendominasi Q5 dan Q6, Q3 mendominasi Q1 dan Q5, Q4 mendominasi Q6', 'Jadi klaim slide tidak cocok dengan datanya; tulis hasil hitunganmu dan alasannya',
      'Solusi yang mendominasi banyak solusi lain berada di daerah yang baik untuk kedua objektif (dekat pojok kiri-bawah)', 'Slide juga keliru menyebut n_p sebagai rank dan S_p sebagai crowding: n_p = banyak yang mendominasi p, S_p = himpunan yang didominasi p'] },
  ex: 'Data dari latihan slide Week 6; slide tidak memberi kunci, jadi dihitung sendiri. Klaim slide "mendominasi tiga" tidak cocok dengan angka di tabelnya.' }));

moo.push(sortItem({ S: { A: [2, 8], B: [4, 5], C: [7, 2], D: [5, 9], E: [6, 6], F: [3, 6], G: [8, 8] }, tours: [['E', 'G'], ['F', 'B'], ['A', 'F']],
  q: 'Latihan slide Week 6 (Sort These Yourself dan Compute Crowding Distance). Tujuh solusi, kedua objektif diminimalkan: A = (2, 8), B = (4, 5), C = (7, 2), D = (5, 9), E = (6, 6), F = (3, 6), G = (8, 8).',
  essay: { q: 'Jika satu anggota front 1 harus dibuang, siapa yang dibuang dan mengapa? Apakah dua solusi ujung selalu sama di kedua objektif?',
    points: ['Buang yang crowding distance-nya paling kecil: F (0,9000)', 'A dan C ujung di kedua objektif karena front 2 objektif yang bertentangan: terkecil f1 = terbesar f2',
      'Tidak selalu: jika objektif tidak bertentangan sempurna atau ada seri, ujung kedua objektif bisa berbeda', 'Pembuangan berdasarkan kerapatan, bukan kualitas'] },
  ex: 'Data dari latihan slide Week 6; kunci dihitung sendiri.' }));

{
  const S = { A: [2, 9], B: [4, 6], C: [7, 3], D: [3, 8], E: [5, 7], G: [8, 4], H: [6, 5] }, c = crowd(S, ['D', 'E', 'H', 'G']);
  moo.push({ type: 'steps',
    q: 'Latihan slide Week 6 (Complete the Survivor Selection). Pool 12 solusi sudah diurutkan ke front, ukuran populasi N = 6.\nF1: A(2, 9), B(4, 6), C(7, 3)\nF2: D(3, 8), E(5, 7), G(8, 4), H(6, 5)\nF3: lima solusi sisanya.',
    steps: [
      { q: 'Front mana yang masuk utuh, front mana yang meluap, dan berapa tempat tersisa untuk front yang meluap?',
        fields: [txt('Masuk utuh', ['F1', 'front 1', '1']), txt('Front yang meluap', ['F2', 'front 2', '2']), num('Tempat tersisa', 3, 0)],
        ex: 'F1 (3) masuk, terisi 3/6. F2 (4) akan membuat 7 > 6, jadi F2 meluap dan hanya 3 tempat tersisa. F3 tidak dipertimbangkan sama sekali.' },
      { q: 'Hitung crowding distance setiap anggota F2 (4 desimal).',
        fields: ['D', 'E', 'H', 'G'].map(p => cdField(p, c.cd[p])),
        ex: 'Urut f1: D3, E5, H6, G8 (rentang 5). Urut f2: G4, H5, E7, D8 (rentang 4). ' + ['E', 'H'].map(p => p + ' = ' + c.parts[p].join(' + ') + ' = ' + id(c.cd[p], 4)).join('; ') + '. D dan G ujung → ∞.' },
      { q: 'Tulis keenam solusi yang bertahan, dan berapa solusi yang dibuang tanpa pernah dihitung crowding distance-nya?',
        fields: [{ label: 'Pasti bertahan', a: 'A B C D G', set: true }, txt('Dibuang (satu dari dua yang seri)', ['E atau H', 'E', 'H']), num('Dibuang tanpa crowding', 5, 0)],
        ex: 'A, B, C (F1) dan D, G (∞) pasti bertahan. E dan H seri 1,3500, jadi satu dipilih acak; slide tidak memberi aturan pemecah seri, tulis asumsi kalian. Lima solusi F3 dibuang hanya karena rank.' }
    ],
    ex: 'Data dari latihan slide Week 6. Kunci dihitung sendiri: crowding E dan H ternyata seri.' });
}

{
  // One complete generation with N = 4 on a fresh case.
  const P = { P1: [6, 27], P2: [4, 30], P3: [5, 25], P4: [3, 36] }, O = { O1: [2, 10], O2: [6, 33], O3: [7, 11], O4: [2, 34] };
  const pool = Object.assign({}, P, O), r = sortFronts(pool), N = 4;
  let taken = [], k = 0;
  while (taken.length + r.fronts[k].length <= N) { taken = taken.concat(r.fronts[k]); k++; }
  const over = r.fronts[k], room = N - taken.length, c = crowd(pool, over);
  const order = over.slice().sort((a, b) => c.cd[b] - c.cd[a]);
  if (room > 0 && c.cd[order[room - 1]] === c.cd[order[room]]) throw new Error('cut tie');
  const keep = taken.concat(order.slice(0, room)), drop = order.slice(room);
  moo.push({ type: 'steps',
    q: 'Penjadwalan rapat dosen dengan NSGA-II, N = 4. f1 = jumlah hari yang dipakai, f2 = jumlah dosen yang bentrok, keduanya diminimalkan. Populasi induk dan offspring hasil crossover dan mutasi:',
    table: { head: ['Solusi', 'f1 (hari)', 'f2 (bentrok)'], rows: Object.keys(pool).map(p => [p].concat(pool[p])) },
    steps: [
      { q: 'Langkah 6 (combine): gabungkan induk dan offspring. Berapa ukuran pool, dan mengapa NSGA-II tidak langsung mengganti induk dengan offspring?',
        fields: [num('Ukuran pool', 8, 0)],
        ex: 'Pool = N induk + N offspring = 2N = 8. Induk yang lebih baik dari offspring tetap bisa bertahan: inilah bentuk elitisme NSGA-II, tanpa parameter k.' },
      { q: 'Langkah 7 (sort again): urutkan pool ke front.',
        fields: r.fronts.map((f, i) => ({ label: 'Front ' + (i + 1), a: f.join(' '), set: true })),
        ex: r.fronts.map((f, i) => 'F' + (i + 1) + ' = {' + f.join(', ') + '}').join(', ') + '.' },
      { q: 'Langkah 8 (fill): isi N = 4. Front mana yang meluap, berapa tempat tersisa, dan berapa crowding distance anggotanya?',
        fields: [txt('Front yang meluap', ['F' + (k + 1), 'front ' + (k + 1), String(k + 1)]), num('Tempat tersisa', room, 0)].concat(over.map(p => cdField(p, c.cd[p]))),
        ex: 'Masuk utuh: ' + taken.join(', ') + ' (' + taken.length + '/4). Front ' + (k + 1) + ' {' + over.join(', ') + '} meluap, sisa ' + room + ' tempat. Crowding: ' + over.map(p => c.cd[p] === Infinity ? p + ' = ∞' : p + ' = ' + c.parts[p].join(' + ') + ' = ' + id(c.cd[p], 4)).join('; ') + '.' },
      { q: 'Tulis populasi generasi berikutnya dan solusi yang dibuang dari front yang meluap.',
        fields: [{ label: 'Generasi berikutnya', a: keep.join(' '), set: true }, { label: 'Dibuang dari front yang meluap', a: drop.join(' '), set: true }],
        ex: 'Generasi berikutnya: ' + keep.join(', ') + '. ' + drop.join(', ') + ' dibuang karena crowding distance terkecil, bukan karena kualitasnya buruk. Solusi di front lebih belakang dibuang hanya karena rank.' }
    ],
    ex: 'Soal buatan sendiri mengikuti langkah 6-8 slide Week 6; kunci dihitung dengan kode.' });
}

{
  // MOGA RSM: minimise cost, maximise places.
  const S = { A: [100, 2], B: [150, 5], C: [200, 4], D: [120, 3] };
  const front = { P1: [40, 1], P2: [50, 2], Q3: [90, 3], Q1: [140, 4], P4: [180, 5] };
  const c = crowd(Object.fromEntries(Object.entries(front).map(([k, v]) => [k, [v[0], -v[1]]])), Object.keys(front));
  moo.push({ type: 'steps',
    q: 'Agen wisata menyusun paket perjalanan dengan dua tujuan: meminimalkan biaya (ribu rupiah) dan MEMAKSIMALKAN jumlah tempat wisata. Empat paket awal: A = (100, 2), B = (150, 5), C = (200, 4), D = (120, 3).',
    steps: [
      { q: 'Untuk setiap pasangan, tulis siapa yang mendominasi atau "incomparable". Ingat arah objektif kedua dibalik (lebih banyak lebih baik).',
        fields: [txt('B vs C', ['B']), txt('A vs D', ['incomparable', 'tidak ada', 'tidak saling mendominasi']), txt('B vs D', ['incomparable', 'tidak ada', 'tidak saling mendominasi']), txt('D vs C', ['incomparable', 'tidak ada', 'tidak saling mendominasi'])],
        ex: 'B lebih murah (150 < 200) dan lebih banyak tempat (5 > 4), jadi B mendominasi C. A lebih murah dari D tetapi lebih sedikit tempat: incomparable. B lebih banyak tempat tetapi lebih mahal dari D: incomparable. D lebih murah dari C tetapi tempatnya lebih sedikit (3 < 4): incomparable.' },
      { q: 'Tulis himpunan Pareto optimal (front 1) dari keempat paket. Bagaimana objektif kedua ditulis agar keduanya bisa diminimalkan?',
        fields: [{ label: 'Pareto optimal', a: 'A B D', set: true }, txt('Objektif kedua menjadi', ['-f2', '−f2', 'min -f2', 'minus jumlah tempat', '-jumlah tempat'])],
        ex: 'A, B, D tidak didominasi siapa pun; C didominasi B. Dengan f = min(biaya, −tempat), semua aturan dominasi "lebih kecil lebih baik" berlaku.' },
      { q: 'Studi kasus NSGA-II di dokumen MOGA: front 1 pool berisi P1(40, 1), P2(50, 2), Q3(90, 3), Q1(140, 4), P4(180, 5), tetapi N = 4. Hitung crowding distance tiap solusi dan tentukan yang dibuang.',
        fields: Object.keys(front).map(p => cdField(p, c.cd[p])).concat([txt('Dibuang', 'P2')]),
        ex: 'Rentang biaya 180 − 40 = 140, rentang tempat 5 − 1 = 4. P2 = (90 − 40)/140 + (3 − 1)/4 = 0,357 + 0,5 = 0,8571. Q3 = (140 − 50)/140 + 0,5 = 1,1429. Q1 = (180 − 90)/140 + 0,5 = 1,1429. P1 dan P4 ujung → ∞. P2 terkecil, dibuang. Populasi baru: P1, Q3, Q1, P4.' },
      { q: 'Bandingkan GA biasa dan MOGA, lalu sebutkan dua contoh penerapan MOGA.',
        points: ['GA: umumnya satu tujuan dan satu solusi terbaik; MOGA: dua tujuan atau lebih dan sekumpulan solusi Pareto', 'MOGA mencari kompromi terbaik karena tujuan saling bertentangan',
          'Contoh: penjadwalan (waktu dan biaya), transportasi (jarak dan bahan bakar), machine learning (akurasi dan kompleksitas), desain produk (berat, biaya, kekuatan)'] }
    ],
    ex: 'Kasus dari dokumen MOGA (RSM); kunci diperiksa ulang dengan kode.' });
}

{
  const F = [[1, 179], [2, 49], [3, 13], [4, 4], [5, 0]];
  const ws = w => F.map(([s, c]) => w * s + (1 - w) * c), pick = w => { const v = ws(w); return F[v.indexOf(Math.min(...v))][0]; };
  moo.push({ type: 'steps',
    q: 'Setelah ratusan generasi, NSGA-II memberi front jadwal ujian: (slot, bentrok) = (1, 179), (2, 49), (3, 13), (4, 4), (5, 0). Fakultas harus memilih satu.',
    steps: [
      { q: 'Berapa bentrok yang dihemat setiap tambahan satu slot? Di mana knee point?',
        fields: [num('1 → 2', 130, 0), num('2 → 3', 36, 0), num('3 → 4', 9, 0), num('4 → 5', 4, 0), num('Knee point (slot)', 3, 0)],
        ex: 'Sampai 3 slot tiap slot menghemat puluhan bentrok, setelahnya hanya satuan. Knee = 3 slot (13 bentrok).' },
      { q: 'Weighted sum: skor = w·slot + (1 − w)·bentrok, pilih skor terkecil. Jadwal (jumlah slot) mana yang terpilih untuk w = 0,5 dan untuk w = 0,95?',
        fields: [num('w = 0,5', pick(0.5), 0), num('w = 0,95', pick(0.95), 0)],
        ex: 'w = 0,5: skor ' + ws(0.5).map(x => id(x, 2)).join('; ') + ' → ' + pick(0.5) + ' slot. w = 0,95: skor ' + ws(0.95).map(x => id(x, 2)).join('; ') + ' → ' + pick(0.95) + ' slot. Pilihan berubah total hanya karena w, dan w harus ditentukan sebelum trade-off terlihat.' },
      { q: 'Fakultas berkata ujian tidak boleh lebih dari 3 hari (3 slot). Opsi mana yang tersisa dan mana yang kamu rekomendasikan? Tulis untuk dekan, bukan jawaban teknis.',
        points: ['Opsi yang memenuhi: 1, 2, dan 3 slot', 'Rekomendasi 3 slot dengan 13 bentrok', 'Alasan: slot ketiga masih menghemat 36 bentrok, slot setelahnya hanya sedikit (knee point)', 'Keputusan akhir milik fakultas (a posteriori), algoritma hanya memberi pilihan'] },
      { q: 'Mengapa NSGA-II tidak cukup memakai weighted sum, dan kapan weighted sum boleh dipakai?',
        points: ['Bobot w harus dipilih sebelum melihat trade-off apa yang tersedia', 'Pada front cekung (concave) sebagian solusi tidak pernah terpilih berapa pun w',
          'NSGA-II mencari seluruh front dulu, baru keputusan diambil (a posteriori)', 'Weighted sum wajar jika nilai tukar sudah diketahui, misalnya biaya per slot dalam rupiah'] }
    ],
    ex: 'Front dari slide Week 6 (What Happens After a Hundred Generations); bagian weighted sum dibuat sendiri dan dihitung dengan kode.' });
}

moo.push({ type: 'steps',
  q: 'Self-check Week 6 dan lima kesalahan yang mengurangi nilai. Jawab setiap langkah dengan alasan.',
  steps: [
    { q: 'Hanya satu pernyataan benar. Tulis nomornya.\n1. Jika dua solusi seri di satu objektif, tidak ada yang bisa mendominasi.\n2. Crowding distance dihitung untuk setiap front di pool gabungan.\n3. Solusi dengan crowding tak hingga selalu menang atas crowding terbatas.\n4. Di NSGA-II offspring langsung menggantikan induk.\n5. Setiap solusi di front 1 incomparable terhadap setiap solusi lain di front 1.',
      fields: [num('Pernyataan benar', 5, 0)],
      ex: '1 salah: (3, 44) mendominasi (3, 45). 2 salah: hanya front yang meluap. 3 salah: rank dicek dulu. 4 salah: induk + offspring digabung 2N lalu dipilih N. 5 benar.' },
    { q: 'Sebutkan lima kesalahan yang paling sering mengurangi nilai pada soal NSGA-II.',
      points: ['Menghitung crowding dengan rentang seluruh populasi, padahal per front', 'Lupa bahwa seri di satu objektif tetap bisa mendominasi', 'Memakai crowding sebelum rank',
        'Mengganti induk dengan offspring langsung, padahal digabung 2N lalu dipilih N', 'Menghitung crowding untuk front yang tidak meluap (kerja sia-sia)'] },
    { q: 'Hitung skala NSGA-II: jumlah perbandingan pasangan non-dominated sort untuk pool 12 dan pool 200, serta total evaluasi untuk N = 100 selama 250 generasi.',
      fields: [num('Pool 12', 66, 0), num('Pool 200', 19900, 0), num('Total evaluasi', 25000, 0)],
      ex: 'Perbandingan = n(n − 1)/2: 12·11/2 = 66, 200·199/2 = 19.900. Evaluasi = 100 × 250 = 25.000.' },
    { q: 'Kapan NSGA-II berhenti? Sebutkan kriterianya dan mengapa berbeda dengan Hill Climbing di Week 1.',
      points: ['Jumlah generasi tetap (paling umum, sesuai budget)', 'Front berhenti bergerak antar generasi', 'Indikator kualitas seperti hypervolume mendatar',
        'Tidak ada titik "nol bentrok" yang menandai selesai, jadi dipakai budget; Hill Climbing berhenti saat tidak ada tetangga yang lebih baik'] }
  ],
  ex: 'Pernyataan dari slide Week 6 (Self-Check, Five Mistakes, Real Scale, When Does It Stop).' });

// ---------------------------------------------------------------- Metaheuristic Search (Week 1)
const meta = [];
{
  const f = [3, 5, 8, 9, 7, 6, 4, 6, 10, 13, 15, 12, 9];
  const climb = x => { const path = [x]; for (;;) { const nb = [x - 1, x + 1].filter(y => y >= 0 && y < f.length); const b = nb.reduce((p, q) => (f[q] > f[p] ? q : p), nb[0]); if (f[b] <= f[x]) return path; x = b; path.push(x); } };
  const P = (dE, T) => Math.exp(-dE / T);
  meta.push({ type: 'steps',
    q: 'Sebuah masalah memaksimalkan f(x) dengan x bilangan bulat 0 sampai 12. Tetangga x adalah x − 1 dan x + 1. Hill Climbing selalu pindah ke tetangga terbaik selama tetangga itu lebih baik.',
    table: { head: ['x'].concat(f.map((_, i) => i)), rows: [['f(x)'].concat(f)] },
    steps: [
      { q: 'Jalankan Hill Climbing dari x = 2. Di mana berhenti dan berapa f-nya? Apakah itu global optimum?',
        fields: [num('Berhenti di x', climb(2).pop(), 0), num('f(x)', f[3], 0), txt('Global optimum? (ya/tidak)', ['tidak', 'bukan', 'no'])],
        ex: 'x = 2 (8) → 3 (9). Tetangga 2 (8) dan 4 (7) lebih buruk, jadi berhenti di x = 3, f = 9. Global optimum ada di x = 10 (f = 15): ini local optimum.' },
      { q: 'Jalankan lagi dari x = 7 dan dari x = 5.',
        fields: [num('Dari x = 7 berhenti di', climb(7).pop(), 0), num('f', 15, 0), num('Dari x = 5 berhenti di', climb(5).pop(), 0)],
        ex: 'x = 7: ' + climb(7).join(' → ') + ' (f = 15, global). x = 5: ' + climb(5).join(' → ') + ' (f = 9, terjebak lagi). Hasil Hill Climbing bergantung titik awal: itulah alasan random restart.' },
      { q: 'Simulated Annealing di x = 3 mengusulkan x = 4 (f turun dari 9 ke 7, jadi ΔE = 2). Hitung P(accept) = exp(−ΔE/T) untuk T = 5, T = 1, dan T = 0,5 (4 desimal). Dengan r = 0,40, diterima pada T berapa saja?',
        fields: [num('T = 5', G.round(P(2, 5), 4), 0.0006), num('T = 1', G.round(P(2, 1), 4), 0.0006), num('T = 0,5', G.round(P(2, 0.5), 4), 0.0006), txt('Diterima pada', ['T = 5', '5', 'T=5'])],
        ex: 'exp(−2/5) = ' + id(P(2, 5), 4) + ', exp(−2/1) = ' + id(P(2, 1), 4) + ', exp(−2/0,5) = ' + id(P(2, 0.5), 4) + '. r = 0,40 < 0,6703 hanya pada T = 5. Suhu tinggi di awal = eksplorasi; suhu rendah = SA menjadi Hill Climbing.' },
      { q: 'Jelaskan bagaimana Hill Climbing, Simulated Annealing, dan Tabu Search masing-masing menghadapi local optimum seperti x = 3.',
        points: ['Hill Climbing: tidak punya cara keluar, berhenti di local optimum (perlu restart)', 'Simulated Annealing: kadang menerima langkah memburuk dengan peluang exp(−ΔE/T)',
          'Tabu Search: melarang langkah balik selama tenure iterasi, jadi terpaksa bergerak walau memburuk', 'Ketiganya trajectory-based: satu solusi bergerak; bedanya hanya mekanisme lolos'] }
    ],
    ex: 'Soal buatan sendiri mengikuti slide Week 1 (Hill Climbing, Simulated Annealing as a Patch); kunci dihitung dengan kode.' });
}
{
  const T0 = 100, a = 0.9, T = k => T0 * a ** k, P = (dE, t) => Math.exp(-dE / t);
  meta.push({ type: 'steps',
    q: 'Simulated Annealing untuk jadwal ujian (minimasi bentrok) memakai suhu awal T0 = 100 dan pendinginan geometrik T_k = T0 · 0,9^k. Langkah yang memperburuk bentrok sebesar ΔE diterima dengan peluang exp(−ΔE/T).',
    steps: [
      { q: 'Hitung suhu pada iterasi k = 10 dan k = 50 (2 desimal).',
        fields: [num('T_10', G.round(T(10), 2), 0.02), num('T_50', G.round(T(50), 2), 0.02)],
        ex: 'T_10 = 100 · 0,9^10 = ' + id(T(10), 2) + '. T_50 = 100 · 0,9^50 = ' + id(T(50), 2) + '.' },
      { q: 'Peluang menerima langkah yang menambah 10 bentrok pada k = 0, k = 10, dan k = 50 (4 desimal).',
        fields: [num('k = 0', G.round(P(10, T(0)), 4), 0.0006), num('k = 10', G.round(P(10, T(10)), 4), 0.0006), num('k = 50', G.round(P(10, T(50)), 4), 0.0006)],
        ex: 'exp(−10/100) = ' + id(P(10, 100), 4) + '; exp(−10/' + id(T(10), 2) + ') = ' + id(P(10, T(10)), 4) + '; exp(−10/' + id(T(50), 2) + ') = ' + id(P(10, T(50)), 4) + '. Awal: hampir semua langkah buruk diterima (eksplorasi). Akhir: hampir tidak pernah (eksploitasi).' },
      { q: 'Studi kasus slide dengan budget 40.000 evaluasi. Isi hasilnya (bentrok, makin kecil makin baik).',
        fields: [num('Random sampling', 691, 0), num('Satu Hill Climbing (median)', 618, 0), num('Hill Climbing restarts', 588, 0), num('Population method', 588, 0), num('Simulated Annealing', 582, 0)],
        ex: 'Random 691 adalah baseline: metode apa pun harus mengalahkannya. SA terbaik (582), tetapi hanya setelah suhunya di-tuning.' },
      { q: 'Tiga run berbeda dengan budget 500 iterasi: A konvergen di iterasi 15 lalu tidak membaik; B setelah 500 iterasi masih naik turun tanpa pola; C sepuluh run pada input yang sama memberi sepuluh hasil berbeda jauh. Diagnosis masing-masing.',
        points: ['A: eksplorasi terlalu sedikit (eksploitasi berlebihan), terjebak local optimum; tambah restart, naikkan suhu atau mutasi', 'B: eksplorasi terlalu banyak, seperti random search; turunkan suhu lebih cepat atau kurangi mutasi',
          'C: sifat stokastik plus landscape yang kasar (banyak local optimum); jalankan beberapa run dan laporkan sebarannya', 'Keseimbangan exploration-exploitation bergantung masalah, tidak ada rasio yang selalu benar'] }
    ],
    ex: 'Rumus P(accept) dari slide Week 1; jadwal pendinginan geometrik ditentukan di soal (slide hanya menampilkan kurva suhu turun). Kunci dihitung dengan kode.' });
}
meta.push({ type: 'steps',
  q: 'Konsep metaheuristik (Week 1). Jawab dengan alasan, seperti soal esai.',
  steps: [
    { q: 'Hanya satu pernyataan benar. Tulis nomornya.\n1. Hill Climbing yang terjebak berarti programnya bug.\n2. Jika dua run memberi hasil berbeda, algoritmanya tidak bisa diandalkan.\n3. No Free Lunch berarti pilihan algoritma tidak penting.\n4. Metaheuristik bisa menjamin menemukan global optimum.\n5. Menambah ujian memperbesar ruang pencarian lebih cepat daripada menambah slot.',
      fields: [num('Pernyataan benar', 5, 0)],
      ex: '1 salah: terjebak adalah sifat Hill Climbing. 2 salah: stokastik itu disengaja. 3 salah: pada masalah tertentu selisihnya besar. 4 salah: tidak ada jaminan optimal. 5 benar: slot^ujian, ujian adalah pangkat.' },
    { q: 'Sebutkan empat sifat metaheuristik, lalu kapan sebaiknya dipakai dan kapan jangan.',
      points: ['Tidak menjamin optimal; tidak bergantung struktur masalah (tanpa turunan); stokastik; anytime', 'Pakai jika ruang besar atau kombinatorial, objektif black box/tidak terdiferensialkan, waktu terbatas, tidak ada metode eksak yang praktis',
        'Jangan pakai jika ada solusi analitis, masalah cukup kecil untuk dienumerasi, optimum harus dibuktikan, atau sudah ada algoritma eksak khusus', 'Contoh salah pakai: GA untuk mencari akar persamaan kuadrat'] },
    { q: 'Isi tabel taksonomi: kelompok untuk tiap algoritma (trajectory atau population).',
      fields: [txt('Hill Climbing', ['trajectory', 'trajectory-based']), txt('Simulated Annealing', ['trajectory', 'trajectory-based']), txt('Tabu Search', ['trajectory', 'trajectory-based']),
        txt('Genetic Algorithm', ['population', 'population-based']), txt('NSGA-II', ['population', 'population-based'])],
      ex: 'Trajectory: satu solusi bergerak (cepat, hemat memori, mudah terjebak). Population: banyak solusi bertukar informasi (tahan local optimum, mahal, banyak parameter).' },
    { q: 'Jelaskan No Free Lunch dan akibat praktisnya dalam memilih algoritma. Gunakan contoh studi kasus tiga algoritma pada tiga tipe masalah.',
      points: ['Dirata-rata atas semua masalah optimasi, semua algoritma sama baiknya (Wolpert & Macready, 1997)', 'Pada masalah tertentu dengan struktur yang diketahui, selisihnya bisa besar',
        'Contoh: Hill Climbing 100% pada landscape mulus, Simulated Annealing 99,9% pada narrow basin, GA 86,6% pada deceptive building block', 'Klaim "algoritma X terbaik" harus menyebut kelas masalah; bandingkan secara empiris'] }
  ],
  ex: 'Dari slide Week 1 (Self-Check, Four Defining Traits, A Taxonomy, No Free Lunch).' });

module.exports = { uts, mirip, moo, meta };
