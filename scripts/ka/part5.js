// Soal latihan berpola UTS per materi kisi-kisi. Semua kunci dihitung di sini dengan kode.
// Angka yang diminta ke siswa: bilangan bulat atau 2 desimal; fitness 1/jarak tetap 4 desimal karena dipakai
// menghitung proporsi roulette.
const G = require('./ga.js');
const { id, round } = G;
const { tspExam, sortFronts, crowd, dom, cdField, cdText } = require('./part3.js');
const T2 = 0.006;
const num = (label, a, tol) => ({ label, a, tol: tol == null ? T2 : tol });
const numi = (label, a) => ({ label, a, tol: 0 });
const txt = (label, a) => ({ label, a });
const set = (label, a) => ({ label, a, set: true });
const SENDIRI = 'Kunci dihitung sendiri dengan kode; soal tidak memberi kunci.';
const c = x => String(x).replace('.', ',');
const c2 = x => Number(x).toFixed(2).replace('.', ',');
const INF = ['∞', 'inf', 'infinity', 'tak hingga', 'infinite'];

// ============================================================ MATERI 1: METAHEURISTIC SEARCH
function mhcItem() {
  const f = [5, 9, 13, 13, 13, 19, 22, 21, 17, 11];
  const climb = s => { const path = [s]; let i = s; for (;;) { const nb = [i - 1, i + 1].filter(y => y >= 0 && y < f.length); const b = nb.reduce((p, q) => (f[q] > f[p] ? q : p), nb[0]); if (f[b] <= f[i]) return path; i = b; path.push(i); } };
  const P = (dE, T) => round(Math.exp(-dE / T), 2);
  const T = k => round(80 * 0.9 ** k, 2);
  const ok = f.map((_, i) => climb(i).pop()).filter(i => f[i] === Math.max(...f)).length;
  const hit = 1 - (1 - ok / f.length) ** 4;
  return {
    type: 'steps',
    q: 'Sebuah kedai kopi mengatur jumlah barista yang bertugas per shift. Manajer mencoba 10 skenario, yaitu 0 sampai 9 barista, lalu mencatat jumlah gelas yang selesai per jam (makin besar makin baik).\n' +
      'Tetangga sebuah skenario adalah jumlah barista dikurangi 1 atau ditambah 1. Hill Climbing selalu pindah ke tetangga yang lebih baik, dan berhenti bila tidak ada tetangga yang lebih baik. Simulated Annealing menerima langkah yang memperburuk nilai sebesar ΔE dengan peluang P = exp(−ΔE / T), yaitu jika nilai acak r < P. Suhu awalnya 80 dan diturunkan secara geometrik T_k = 80 × 0,9^k dengan k mulai 0.\n' +
      'Catatan: bulatkan setiap hasil hitungan ke 2 angka di belakang koma.',
    table: { head: ['Barista'].concat(f.map((_, i) => i)), rows: [['Gelas per jam'].concat(f)] },
    steps: [
      { q: 'a. Jalankan Hill Climbing dari 0 barista. Di skenario berapa ia berhenti, berapa gelas per jam, dan apakah itu global optimum?',
        fields: [numi('Berhenti di', climb(0).pop()), numi('Gelas per jam', f[climb(0).pop()]), txt('Global optimum? (ya / tidak)', ['tidak', 'bukan', 'no'])],
        ex: 'Jalur: ' + climb(0).join(' → ') + '. Berhenti di ' + climb(0).pop() + ' dengan ' + f[climb(0).pop()] + ' gelas. Bukan global optimum: skenario 6 menghasilkan ' + Math.max(...f) + '.' },
      { q: 'b. Jalankan Hill Climbing dari 3 barista dan dari 5 barista. Di mana masing-masing berhenti, dan kondisi apa yang membuat keduanya berbeda?',
        fields: [numi('Dari 3 berhenti di', climb(3).pop()), numi('Nilai', f[climb(3).pop()]),
          numi('Dari 5 berhenti di', climb(5).pop()), numi('Nilai', f[climb(5).pop()]),
          txt('Nama kondisi', ['plateau', 'dataran', 'plateau dataran'])],
        ex: 'Dari 3: ' + climb(3).join(' → ') + ' → berhenti karena tetangga 2 dan 4 sama-sama 13 (plateau). Dari 5: ' + climb(5).join(' → ') + '. Tiga skenario berturut-turut (2, 3, 4) bernilai sama 13.' },
      { q: 'c. SA berada di 6 barista (22 gelas) lalu diusulkan pindah ke 8 barista (17 gelas), jadi ΔE = 5. Hitung P = exp(−ΔE/T) untuk T = 5, T = 2, T = 1 (2 desimal). Dengan r = 0,20, pada suhu mana usulan diterima?',
        fields: [num('T = 5', P(5, 5)), num('T = 2', P(5, 2)), num('T = 1', P(5, 1)), txt('Diterima pada', ['T = 5', '5', 'T=5'])],
        ex: 'exp(−5/5) = ' + c(P(5, 5)) + ', exp(−5/2) = ' + c(P(5, 2)) + ', exp(−5/1) = ' + c(P(5, 1)) + '. r = 0,20 hanya lebih kecil dari ' + c(P(5, 5)) + ', jadi diterima hanya pada T = 5. Inilah cara SA keluar dari plateau.' },
      { q: 'd. Hitung suhu pada iterasi k = 10 dan k = 30 (2 desimal).',
        fields: [num('T_10', T(10)), num('T_30', T(30))],
        ex: 'T_10 = 80 × 0,9^10 = 80 × 0,3487 = ' + c(T(10)) + '. T_30 = 80 × 0,9^30 = 80 × 0,0424 = ' + c(T(30)) + '. Setelah itu hampir tidak ada lagi langkah memburuk yang diterima, dan SA berperilaku seperti Hill Climbing.' },
      { q: 'e. Dari 10 titik awal yang dicoba, berapa yang berhasil mencapai global optimum? Jika dijalankan 4 run independen, berapa peluang sedikitnya satu run berhasil (2 desimal)?',
        fields: [numi('Titik awal yang berhasil', ok), num('Peluang 4 run', round(hit, 2))],
        ex: 'Titik awal 0, 1, 3, dan 2 gagal (berhenti di 13); 4 sampai 9 berhasil. Jadi ' + ok + ' dari 10, peluang satu run berhasil 0,60. Empat run gagal semua 0,40^4 = 0,0256, jadi peluang berhasil = 1 − 0,0256 = 0,9744 ≈ ' + c(round(hit, 2)) + '.' },
      { q: 'f. Jelaskan mengapa Hill Climbing bisa berhenti di nilai 13 padahal ada skenario 22, lalu jelaskan bagaimana Simulated Annealing dan Tabu Search mengatasinya. Sebutkan juga kapan Hill Climbing justru pilihan yang tepat.',
        points: ['Hill Climbing hanya menerima tetangga yang lebih baik, jadi berhenti di local optimum atau plateau seperti skenario 2, 3, 4',
          'Simulated Annealing kadang menerima langkah memburuk dengan peluang exp(−ΔE/T), sehingga bisa menyeberangi lembah; peluang itu mengecil saat suhu turun',
          'Tabu Search melarang pengulangan langkah terakhir selama tenure, sehingga terpaksa bergerak walau memburuk',
          'Hill Climbing tepat bila landscape mulus (satu puncak), evaluasi mahal sehingga budget kecil, atau sebagai baseline pembanding',
          'Ketiganya trajectory-based: satu solusi bergerak, tanpa populasi dan tanpa jaminan optimum'] }
    ],
    ex: SENDIRI + ' Mengikuti pola slide Week 1: Hill Climbing, plateau, Simulated Annealing, pendinginan geometrik, random restart.'
  };
}

function mgridItem() {
  const H = [[9, 12, 15, 11], [14, 18, 11, 13], [10, 17, 25, 16], [7, 11, 14, 8]];
  const at = ([r, cc]) => H[r - 1][cc - 1];
  const nb = ([r, cc]) => [[r - 1, cc], [r + 1, cc], [r, cc - 1], [r, cc + 1]].filter(([a, b]) => a >= 1 && a <= 4 && b >= 1 && b <= 4);
  const climb = s => { const path = [s]; let cur = s; for (;;) { const ns = nb(cur); const b = ns.reduce((p, q) => (at(q) > at(p) ? q : p), ns[0]); if (at(b) <= at(cur)) return path; cur = b; path.push(cur); } };
  const name = p => '(' + p[0] + ',' + p[1] + ')';
  const trail = p => climb(p).map(name).join(' → ');
  const max = Math.max(...H.flat());
  return {
    type: 'steps',
    q: 'Sebuah drone pemetaan mencari titik tertinggi sebuah bukit. Medan dibagi menjadi grid 4 × 4. Baris 1 sampai 4 dari atas, kolom 1 sampai 4 dari kiri; angka pada sel adalah ketinggian (meter).\n' +
      'Drone hanya boleh bergerak ke sel tetangga atas, bawah, kiri, atau kanan (tidak diagonal). Hill Climbing selalu pindah ke tetangga dengan ketinggian terbesar bila lebih tinggi dari posisinya, lalu berhenti bila tidak ada tetangga yang lebih tinggi.\n' +
      'Catatan: bulatkan hasil hitungan ke 2 angka di belakang koma.',
    table: { head: ['', 'Kol 1', 'Kol 2', 'Kol 3', 'Kol 4'], rows: H.map((row, i) => ['Baris ' + (i + 1)].concat(row)) },
    steps: [
      { q: 'a. Jalankan Hill Climbing dari (1,1). Tulis jalur yang dilalui, sel tempat berhenti, ketinggiannya, dan apakah itu puncak tertinggi medan.',
        fields: [txt('Jalur', climb([1, 1]).map(name).join(' ')), txt('Berhenti di', name(climb([1, 1]).pop())), numi('Ketinggian', at(climb([1, 1]).pop())), txt('Optimum? (ya / tidak)', ['tidak', 'bukan', 'no'])],
        ex: 'Jalur: ' + trail([1, 1]) + '. Berhenti di ' + at(climb([1, 1]).pop()) + ' meter, padahal puncak sebenarnya ' + max + ' meter di (3,3). Ini local optimum: semua tetangga (1,2), (2,1), (2,3), (3,2) lebih rendah.' },
      { q: 'b. Jalankan Hill Climbing dari (1,3) dan dari (3,1). Di mana masing-masing berhenti?',
        fields: [txt('Dari (1,3) berhenti di', name(climb([1, 3]).pop())), numi('Ketinggian', at(climb([1, 3]).pop())),
          txt('Dari (3,1) berhenti di', name(climb([3, 1]).pop())), numi('Ketinggian', at(climb([3, 1]).pop()))],
        ex: 'Dari (1,3) = 15: tetangga (1,2) = 12, (1,4) = 11, (2,3) = 11, semuanya lebih rendah, jadi berhenti di 15 (local optimum). Dari (3,1): ' + trail([3, 1]) + ' → ' + at(climb([3, 1]).pop()) + ' meter, yaitu global optimum. Titik awal menentukan hasil.' },
      { q: 'c. SA di (1,3) mengusulkan pindah ke (2,3): turun dari 15 ke 11, jadi ΔE = 4. Hitung P = exp(−ΔE/T) untuk T = 8, T = 3, T = 1 (2 desimal). Dengan r = 0,30, pada suhu mana usulan diterima?',
        fields: [num('T = 8', round(Math.exp(-4 / 8), 2)), num('T = 3', round(Math.exp(-4 / 3), 2)), num('T = 1', round(Math.exp(-4 / 1), 2)), txt('Diterima pada', ['T = 8', '8', 'T=8'])],
        ex: 'exp(−4/8) = ' + c(round(Math.exp(-4 / 8), 2)) + ', exp(−4/3) = ' + c(round(Math.exp(-4 / 3), 2)) + ', exp(−4/1) = ' + c(round(Math.exp(-4 / 1), 2)) + '. Dengan r = 0,30 hanya T = 8 yang menerima; setelah turun ke (2,3) drone bisa naik ke (3,3).' },
      { q: 'd. Berapa jumlah tetangga sah untuk sel (1,1), sel (1,2), dan sel (2,2)?',
        fields: [numi('(1,1) sudut', nb([1, 1]).length), numi('(1,2) tepi', nb([1, 2]).length), numi('(2,2) tengah', nb([2, 2]).length)],
        ex: 'Sudut punya 2 tetangga, tepi 3, dan sel tengah 4. Ukuran neighbourhood menentukan biaya satu iterasi local search.' },
      { q: 'e. Tiga mahasiswa memberi usulan: (1) jalankan Hill Climbing berulang dari titik acak, (2) pakai Simulated Annealing, (3) pakai GA dengan populasi 40. Untuk medan kecil seperti ini, mana yang paling murah dan mana yang paling tahan local optimum? Jelaskan.',
        points: ['Hill Climbing dengan random restart murah dan sederhana, tetapi tidak menjamin optimum dan bisa mengulang jalur yang sama',
          'Simulated Annealing lebih tahan local optimum karena sesekali menerima langkah menurun, dengan biaya tuning suhu',
          'GA dengan populasi 40 jauh lebih mahal untuk medan 16 sel; bukan pilihan hemat, tetapi tahan local optimum karena banyak titik awal sekaligus',
          'Semua metode di atas tetap stokastik: hasil berbeda antar-run adalah sifat, bukan bug'] }
    ],
    ex: SENDIRI + ' Pola slide Week 1: local optimum pada landscape dua dimensi, peluang SA, dan pemilihan metode menurut biaya evaluasi.'
  };
}

function mspaceItem() {
  const exam = 24, slot = 6, nbr = exam * (slot - 1);
  const space = slot ** exam, addExam = slot ** 6, addSlot = round((8 / slot) ** exam, 2);
  const years = round(space * 0.0001 / 31536000 / 1e6, 2);
  return {
    type: 'steps',
    q: 'Panitia ujian fakultas harus menempatkan ' + exam + ' ujian ke ' + slot + ' slot waktu. Setiap ujian boleh ditaruh di slot mana pun, dan tujuan optimasinya meminimalkan jumlah pasangan mahasiswa yang bentrok. Satu jadwal diubah dengan memindahkan satu ujian ke slot lain.\n' +
      'Catatan: bulatkan hasil hitungan ke 2 angka di belakang koma bila bukan bilangan bulat.',
    steps: [
      { q: 'a. Berapa besar ruang pencarian (tulis sebagai basis dan pangkat) dan berapa tetangga satu jadwal?',
        fields: [numi('Basis', slot), numi('Pangkat', exam), numi('Tetangga satu jadwal', nbr)],
        ex: 'Ruang = ' + slot + '^' + exam + ' ≈ 4,74 × 10^18 jadwal. Tetangga = ' + exam + ' × ' + (slot - 1) + ' = ' + nbr + ', karena tiap ujian boleh pindah ke ' + (slot - 1) + ' slot lain.' },
      { q: 'b. Jika fakultas menambah 6 ujian (tetap ' + slot + ' slot), berapa kali lipat ruang pencariannya? Jika menambah 2 slot (tetap ' + exam + ' ujian), berapa kali lipat? Mana yang lebih berat?',
        fields: [numi('Tambah 6 ujian (kali)', addExam), num('Tambah 2 slot (kali)', addSlot), txt('Lebih berat', ['tambah ujian', 'ujian', 'menambah ujian'])],
        ex: 'Tambah ujian mengalikan ruang dengan ' + slot + '^6 = ' + id(addExam) + ' kali. Tambah slot hanya (8/6)^' + exam + ' = ' + c(addSlot) + ' kali. Jumlah ujian adalah pangkat, jumlah slot hanya basis: menambah ujian jauh lebih berat.' },
      { q: 'c. Satu jadwal dapat diperiksa dalam 0,0001 detik. Berapa juta tahun untuk memeriksa seluruh ruang 6^24 (asumsikan 1 tahun = 365 hari, 2 desimal)?',
        fields: [num('Juta tahun', years, 0.02)],
        ex: 'Waktu = 6^24 × 0,0001 detik ≈ 4,74 × 10^14 detik. Dalam tahun: dibagi 31.536.000 detik ≈ 1,50 × 10^7 tahun = ' + c2(years) + ' juta tahun. Karena itu enumerasi tidak mungkin dan dipakai metaheuristik.' },
      { q: 'd. Jelaskan empat sifat metaheuristik dan pasangkan dengan kebutuhan panitia. Sebutkan pula satu kondisi yang membuat metaheuristik justru pilihan yang salah.',
        points: ['Tidak menjamin optimal: panitia menerima jadwal yang cukup baik, bukan terbukti terbaik',
          'Tidak bergantung struktur masalah: tidak butuh turunan atau konveksitas, cukup fungsi penilai bentrok',
          'Stokastik: dua kali jalan bisa memberi jadwal berbeda; itu disengaja untuk eksplorasi',
          'Anytime: bisa dihentikan kapan saja dan tetap ada jadwal yang bisa dipakai',
          'Salah dipakai bila masalahnya kecil sehingga enumerasi selesai cepat, atau ada algoritma eksak yang praktis'] },
      { q: 'e. Jelaskan No Free Lunch Theorem dan koreksi salah paham yang sering muncul. Gunakan istilah exploration dan exploitation dalam penjelasanmu.',
        points: ['Dirata-rata atas seluruh masalah optimasi, semua algoritma sama baiknya (Wolpert & Macready, 1997)',
          'NFL tidak berarti algoritma boleh dipilih sembarang: pada kelas masalah tertentu selisihnya besar',
          'Karena itu klaim "algoritma X terbaik" harus menyebut kelas masalah dan dibuktikan empiris',
          'Exploration mencari daerah baru (mencegah terjebak), exploitation memperdalam daerah yang sudah bagus',
          'Terlalu banyak exploration = seperti random search; terlalu banyak exploitation = cepat terjebak local optimum'] }
    ],
    ex: SENDIRI + ' Angka ruang pencarian dari slide Week 1; bagian "panjang satu jadwal 10.000 kali per detik" ditambahkan sendiri.'
  };
}

// ============================================================ MATERI 2: GENETIC ALGORITHM
function oneGenItem(cfg) {
  const pop = cfg.pop, N = pop.map((_, i) => 'K' + (i + 1));
  const d = pop.map(p => parseInt(p, 2));
  const f = cfg.fit, fv = d.map(f), w = G.wheel(fv), prop = w.p.map(x => round(x, 2)), cum = w.cum.map(x => round(x, 2));
  const par = cfg.r.map(x => G.pick(w.cum, x));
  const [o1, o2] = G.cross1(pop[par[0]], pop[par[1]], cfg.cut);
  const [o3, o4] = G.cross1(pop[par[2]], pop[par[3]], cfg.cut);
  const kids = [o1, o2, o3, o4];
  const mut = kids.map((k, i) => (cfg.rm[i] < cfg.pm ? G.flip(k, cfg.gen[i]) : k));
  const kf = kids.map(k => f(parseInt(k, 2))), mf = mut.map(k => f(parseInt(k, 2)));
  const bestOld = Math.max(...fv), bi = fv.indexOf(bestOld), wi = mf.indexOf(Math.min(...mf));
  const elite = mf.slice(); elite[wi] = bestOld;
  const avg = a => round(G.sum(a) / a.length, 2);
  return {
    type: 'steps',
    q: cfg.q,
    steps: cfg.steps({ pop, d, fit: fv, w, prop, cum, par, kids, mut, kf, mf, bestOld, bi, wi, elite, N, avg }),
    ex: cfg.ex
  };
}

const gbin = oneGenItem({
  pop: ['10110', '00111', '11001', '01010'],
  fit: d => d * d,
  r: [0.15, 0.40, 0.70, 0.97], cut: 3, pm: 0.10,
  rm: [0.08, 0.35, 0.05, 0.60], gen: [2, 4, 5, 3],
  q: 'Sebuah GA memaksimalkan f(x) = x² dengan x bilangan bulat 0 sampai 31. Kromosom 5 bit dibaca langsung sebagai bilangan biner, jadi x = nilai desimal kromosom. Populasi awal: K1 = 10110, K2 = 00111, K3 = 11001, K4 = 01010.\n' +
    'Catatan: fitness berupa bilangan bulat. Tulis proporsi roulette dan batas rentang dengan 2 angka di belakang koma, dan hitung proporsi dari nilai fitness yang belum dibulatkan.',
  steps: s => ([
    { q: 'a. Ubah tiap kromosom ke desimal, lalu hitung fitness = x² dan total fitness.',
      fields: s.N.map((n, i) => numi(n + ' desimal (x)', s.d[i])).concat(s.N.map((n, i) => numi('fitness ' + n, s.fit[i]))).concat([numi('Total fitness', G.sum(s.fit))]),
      ex: s.N.map((n, i) => n + ' = ' + s.pop[i] + ' → x = ' + s.d[i] + ' → f = ' + s.fit[i]).join('. ') + '. Total = ' + G.sum(s.fit) + '.' },
    { q: 'b. Hitung proporsi roulette wheel dan batas atas setiap rentang (2 desimal). Tidak perlu diurutkan; batas bawah K1 = 0 dan batas atas K4 = 1.',
      fields: s.N.map((n, i) => num('Proporsi ' + n, s.prop[i])).concat([0, 1, 2].map(i => num('Batas atas ' + s.N[i], s.cum[i]))),
      ex: 'Proporsi: ' + s.N.map((n, i) => n + ' = ' + s.fit[i] + '/' + G.sum(s.fit) + ' = ' + c2(s.w.p[i]) + ' ≈ ' + c(s.prop[i])).join(', ') + '. Rentang: ' +
        s.N.map((n, i) => n + ' [' + (i ? c(s.cum[i - 1]) : '0') + ' – ' + c(s.cum[i]) + ')').join(', ') + '.' },
    { q: 'c. Pilih 4 orang tua dengan nilai acak ' + [0.15, 0.40, 0.70, 0.97].map(c).join('; ') + ' (urut Parent1 sampai Parent4).',
      fields: [0, 1, 2, 3].map(i => txt('Parent' + (i + 1), [s.N[s.par[i]], s.pop[s.par[i]]])),
      ex: [0, 1, 2, 3].map(i => 'P' + (i + 1) + ' = ' + c([0.15, 0.40, 0.70, 0.97][i]) + ' → ' + s.N[s.par[i]] + ' (' + s.pop[s.par[i]] + ')').join('; ') + '.' },
    { q: 'd. Pasangkan Parent1–Parent2 dan Parent3–Parent4, lalu lakukan single-point crossover dengan potongan setelah gen ke-3. Tulis keempat anak dan fitness-nya sebelum mutasi.',
      fields: s.kids.map((k, i) => txt('Anak' + (i + 1), k)).concat(s.kids.map((k, i) => numi('Fitness Anak' + (i + 1) + ' (sebelum mutasi)', s.kf[i]))),
      ex: s.pop[s.par[0]] + ' × ' + s.pop[s.par[1]] + ' → ' + s.kids[0] + ' dan ' + s.kids[1] + '; ' + s.pop[s.par[2]] + ' × ' + s.pop[s.par[3]] + ' → ' + s.kids[2] + ' dan ' + s.kids[3] +
        '. Fitness: ' + s.kf.join(', ') + '.' },
    { q: 'e. Probabilitas mutasi 0,10; anak dimutasi jika nilai acaknya < 0,10, dengan bit flip pada gen yang ditentukan. Tulis anak yang dimutasi dan keempat kromosom hasilnya.',
      table: { head: ['Anak', 'Nilai acak', 'Gen'], rows: s.kids.map((k, i) => ['Anak' + (i + 1), c([0.08, 0.35, 0.05, 0.60][i]), [2, 4, 5, 3][i]]) },
      fields: [set('Anak yang dimutasi (pisahkan spasi)', [0.08, 0.35, 0.05, 0.60].map((x, i) => (x < 0.10 ? 'Anak' + (i + 1) : '')).filter(Boolean).join(' '))]
        .concat(s.mut.map((m, i) => txt('Anak' + (i + 1) + ' hasil', m))),
      ex: [0.08, 0.35, 0.05, 0.60].map((x, i) => 'Anak' + (i + 1) + ': ' + c(x) + (x < 0.10 ? ' < 0,10 → gen ' + [2, 4, 5, 3][i] + ' dibalik: ' + s.kids[i] + ' → ' + s.mut[i] : ' ≥ 0,10 → tetap ' + s.kids[i])).join('; ') + '.' },
    { q: 'f. Terapkan elitisme k = 1: kromosom terbaik populasi lama menggantikan anak terburuk. Tulis fitness generasi baru tanpa dan dengan elitisme, serta ratanya.',
      fields: s.mut.map((m, i) => numi('Fitness Anak' + (i + 1) + ' (sesudah mutasi)', s.mf[i]))
        .concat([numi('Fitness terbaik populasi lama', s.bestOld), num('Rata-rata populasi lama', s.avg(s.fit)), num('Rata-rata tanpa elitisme', s.avg(s.mf)), num('Rata-rata dengan elitisme', s.avg(s.elite))]),
      ex: 'Setelah mutasi: ' + s.mf.join(', ') + '. Terbaik lama ' + s.N[s.bi] + ' = ' + s.bestOld + ' menggantikan Anak' + (s.wi + 1) + ' (' + s.mf[s.wi] + '). Rata-rata: lama ' + c(s.avg(s.fit)) + ', tanpa elitisme ' + c(s.avg(s.mf)) + ', dengan elitisme ' + c(s.avg(s.elite)) + '. Elitisme menjamin yang terbaik tidak hilang.' },
    { q: 'g. Apakah satu generasi ini membaik? Sebutkan bagian mana yang membawa perbaikan dan bagian mana yang justru merugikan, lalu simpulkan mengapa GA butuh banyak generasi.',
      points: ['Bandingkan fitness terbaik lama dan terbaik baru; pada soal ini elitisme menjaga yang terbaik',
        'Crossover menggabungkan bagian kromosom yang sudah baik, tetapi tidak membuat nilai gen baru',
        'Mutasi bisa menaikkan fitness (jika gen yang dibalik memperbaiki) atau justru menjatuhkannya',
        'Satu generasi hanya satu langkah; perbaikan besar biasanya datang setelah puluhan generasi karena building block harus bergabung',
        'Tanpa elitisme, individu terbaik bisa hilang dan kurva fitness terbaik bisa turun'] }
  ]),
  ex: SENDIRI + ' Pola soal Week 2-3: decode biner, fitness, roulette, single-point, bit flip, elitisme.'
});

const gbin2 = oneGenItem({
  pop: ['00100', '01001', '11110', '01100'],
  fit: d => 1024 - (d - 18) ** 2,
  r: [0.10, 0.35, 0.60, 0.85], cut: 3, pm: 0.10,
  rm: [0.06, 0.44, 0.09, 0.52], gen: [5, 2, 4, 1],
  q: 'Sebuah perusahaan taksi meminimalkan deviasi jumlah armada terhadap kebutuhan 18 unit. Kromosom 5 bit dibaca sebagai bilangan biner x (0 sampai 31), deviasi g(x) = (x − 18)², dan karena roulette butuh nilai besar untuk solusi baik dipakai fitness = 1024 − g(x). Populasi awal: K1 = 00100, K2 = 01001, K3 = 11110, K4 = 01100.\n' +
    'Catatan: semua nilai bulat. Tulis proporsi dan batas rentang 2 desimal; hitung proporsi dari fitness yang belum dibulatkan.',
  steps: s => ([
    { q: 'a. Decode tiap kromosom, hitung g(x), fitness, dan total fitness.',
      fields: s.N.map((n, i) => numi(n + ' (x)', s.d[i])).concat(s.N.map((n, i) => numi('g(x) ' + n, (s.d[i] - 18) ** 2))).concat([numi('Total fitness', G.sum(s.fit))]),
      ex: s.N.map((n, i) => n + ': x = ' + s.d[i] + ', g = (' + s.d[i] + ' − 18)² = ' + (s.d[i] - 18) ** 2 + ', fitness = 1024 − ' + (s.d[i] - 18) ** 2 + ' = ' + s.fit[i]).join('. ') + '.' },
    { q: 'b. Hitung proporsi roulette dan batas atas setiap rentang (2 desimal).',
      fields: s.N.map((n, i) => num('Proporsi ' + n, s.prop[i])).concat([0, 1, 2].map(i => num('Batas atas ' + s.N[i], s.cum[i]))),
      ex: 'Proporsi: ' + s.N.map((n, i) => n + ' = ' + s.fit[i] + '/' + G.sum(s.fit) + ' = ' + c2(s.w.p[i]) + ' ≈ ' + c(s.prop[i])).join(', ') + '.' },
    { q: 'c. Pilih 4 orang tua dengan nilai acak 0,10; 0,35; 0,60; 0,85 (urut Parent1 sampai Parent4).',
      fields: [0, 1, 2, 3].map(i => txt('Parent' + (i + 1), [s.N[s.par[i]], s.pop[s.par[i]]])),
      ex: [0, 1, 2, 3].map(i => 'P' + (i + 1) + ' = ' + c([0.10, 0.35, 0.60, 0.85][i]) + ' → ' + s.N[s.par[i]] + ' (' + s.pop[s.par[i]] + ')').join('; ') + '.' },
    { q: 'd. Lakukan single-point crossover setelah gen ke-3 pada kedua pasangan. Tulis keempat anak dan fitness-nya.',
      fields: s.kids.map((k, i) => txt('Anak' + (i + 1), k)).concat(s.kids.map((k, i) => numi('Fitness Anak' + (i + 1), s.kf[i]))),
      ex: 'Anak: ' + s.kids.join(', ') + ' dengan fitness ' + s.kf.join(', ') + '.' },
    { q: 'e. Mutasi bit flip dengan pm = 0,10 pada gen berikut: Anak1 gen 5, Anak2 gen 2, Anak3 gen 4, Anak4 gen 1; nilai acaknya 0,06; 0,44; 0,09; 0,52. Tulis hasil mutasi dan fitness-nya.',
      fields: s.mut.map((m, i) => txt('Anak' + (i + 1) + ' hasil', m)).concat(s.mut.map((m, i) => numi('Fitness Anak' + (i + 1) + ' hasil', s.mf[i]))),
      ex: [0.06, 0.44, 0.09, 0.52].map((x, i) => 'Anak' + (i + 1) + ': ' + c(x) + (x < 0.10 ? ' < 0,10 → dibalik: ' + s.kids[i] + ' → ' + s.mut[i] : ' ≥ 0,10 → tetap ' + s.kids[i])).join('; ') + '.' },
    { q: 'f. Terapkan elitisme k = 1 dan hitung rata-rata fitness tiga populasi (lama, tanpa elitisme, dengan elitisme).',
      fields: [num('Rata-rata populasi lama', s.avg(s.fit)), num('Rata-rata tanpa elitisme', s.avg(s.mf)), num('Rata-rata dengan elitisme', s.avg(s.elite))],
      ex: 'Terbaik lama ' + s.N[s.bi] + ' = ' + s.bestOld + ' menggantikan anak terburuk (' + s.mf[s.wi] + '). Rata-rata: lama ' + c(s.avg(s.fit)) + ', tanpa elitisme ' + c(s.avg(s.mf)) + ', dengan elitisme ' + c(s.avg(s.elite)) + '.' },
    { q: 'g. Gen mana yang paling dekat dengan kebutuhan 18 unit, dan mengapa fitness tidak boleh langsung dipakai sebagai g(x)?',
      points: ['Kromosom dengan x paling dekat 18 memberi g(x) terkecil dan fitness terbesar',
        'g(x) adalah fungsi minimasi: makin kecil makin baik, sedangkan roulette butuh nilai besar untuk solusi baik',
        'Menggeser dengan konstanta 1024 membuat semua fitness positif dan urutannya tetap terjaga',
        'Jika konstanta terlalu besar, semua fitness hampir sama dan seleksi menjadi hampir acak',
        'Alternatif yang juga sah: fitness = 1/(1 + g(x)) atau tournament selection yang tidak butuh fitness positif'] }
  ]),
  ex: SENDIRI + ' Pola Week 2-3 dengan fungsi minimasi dan konversi fitness; dicek agar rata-rata dan fitness bulat.'
});

function gajadwalItem() {
  const U = ['A', 'B', 'C', 'D', 'E', 'F'], slot = 3;
  const pairs = [['A', 'B', 5], ['A', 'C', 3], ['A', 'D', 2], ['A', 'E', 0], ['A', 'F', 4],
    ['B', 'C', 6], ['B', 'D', 3], ['B', 'E', 2], ['B', 'F', 1],
    ['C', 'D', 2], ['C', 'E', 5], ['C', 'F', 0],
    ['D', 'E', 4], ['D', 'F', 2], ['E', 'F', 3]];
  const K = ['T1', 'T2', 'T3', 'T4'];
  const pop = ['112233', '121323', '332112', '213132'];
  const clash = s => G.sum(pairs.filter(([a, b]) => s[U.indexOf(a)] === s[U.indexOf(b)]).map(p => p[2]));
  const C = 20, fit = pop.map(s => C - clash(s)), w = G.wheel(fit);
  const prop = w.p.map(x => round(x, 2)), cum = w.cum.map(x => round(x, 2));
  const r = [0.12, 0.38, 0.63, 0.86], par = r.map(x => G.pick(w.cum, x));
  const [o1, o2] = G.cross1(pop[par[0]], pop[par[1]], 3), [o3, o4] = G.cross1(pop[par[2]], pop[par[3]], 3);
  const kids = [o1, o2, o3, o4];
  // Nilai baru selalu berbeda dari nilai lama, supaya mutasi benar-benar mengubah jadwal.
  const newB = (+kids[0][1] % slot) + 1, newE = (+kids[3][4] % slot) + 1;
  const mut = kids.map((k, i) => (i === 0 ? G.setGene(k.split(''), 2, newB).join('') : i === 3 ? G.setGene(k.split(''), 5, newE).join('') : k));
  const kc = kids.map(clash), mc = mut.map(clash), kf = kc.map(x => C - x), mf = mc.map(x => C - x);
  const bestOld = Math.max(...fit), wi = mf.indexOf(Math.min(...mf));
  const elite = mf.slice(); elite[wi] = bestOld;
  return {
    type: 'steps',
    q: 'Panitia ujian susulan menjadwalkan 6 ujian (A sampai F) ke 3 slot. Tabel di bawah berisi banyak mahasiswa yang mengambil dua ujian sekaligus; jika dua ujian itu berada di slot yang sama, mereka semua bentrok. Kromosom integer berisi slot tiap ujian dalam urutan A, B, C, D, E, F. Fitness = 20 − jumlah konflik.\n' +
      'Empat jadwal populasi awal: T1 = 112233, T2 = 121323, T3 = 332112, T4 = 213132.\n' +
      'Catatan: bulatkan proporsi dan rata-rata ke 2 angka di belakang koma.',
    table: { head: ['Pasangan', 'Mahasiswa'], rows: pairs.filter(p => p[2] > 0).map(p => [p[0] + '–' + p[1], p[2]]) },
    steps: [
      { q: 'a. Hitung konflik dan fitness setiap jadwal.',
        fields: K.map((k, i) => numi('Konflik ' + k, clash(pop[i]))).concat(K.map((k, i) => numi('Fitness ' + k, fit[i]))),
        ex: K.map((k, i) => k + ' = ' + pop[i] + ' → konflik ' + clash(pop[i]) + ', fitness ' + fit[i]).join('. ') + '. Konflik dihitung hanya dari pasangan yang berada di slot yang sama.' },
      { q: 'b. Hitung total fitness, proporsi roulette, dan batas atas rentang (2 desimal).',
        fields: [numi('Total fitness', G.sum(fit))].concat(K.map((k, i) => num('Proporsi ' + k, prop[i]))).concat([0, 1, 2].map(i => num('Batas atas ' + K[i], cum[i]))),
        ex: 'Total = ' + G.sum(fit) + '. Proporsi: ' + K.map((k, i) => k + ' = ' + fit[i] + '/' + G.sum(fit) + ' = ' + c2(w.p[i]) + ' ≈ ' + c(prop[i])).join(', ') + '.' },
      { q: 'c. Pilih 4 orang tua dengan nilai acak 0,12; 0,38; 0,63; 0,86.',
        fields: [0, 1, 2, 3].map(i => txt('Parent' + (i + 1), [K[par[i]], pop[par[i]]])),
        ex: [0, 1, 2, 3].map(i => 'P' + (i + 1) + ' = ' + c(r[i]) + ' → ' + K[par[i]] + ' (' + pop[par[i]] + ')').join('; ') + '.' },
      { q: 'd. Single-point crossover setelah gen ke-3 pada kedua pasangan. Tulis keempat anak dan konfliknya.',
        fields: kids.map((k, i) => txt('Anak' + (i + 1), k)).concat(kids.map((k, i) => numi('Konflik Anak' + (i + 1), kc[i]))),
        ex: 'Anak: ' + kids.join(', ') + ' dengan konflik ' + kc.join(', ') + '. Setiap anak tetap jadwal yang sah karena setiap gen tetap bernilai 1, 2, atau 3.' },
      { q: 'e. Mutasi integer: gen 2 (ujian B) pada Anak1 diganti slot ' + newB + ', dan gen 5 (ujian E) pada Anak4 diganti slot ' + newE + '. Hitung konflik dan fitness keempat anak setelah mutasi.',
        fields: mut.map((m, i) => txt('Anak' + (i + 1) + ' hasil', m)).concat(mut.map((m, i) => numi('Fitness Anak' + (i + 1) + ' hasil', mf[i]))),
        ex: 'Hasil: ' + mut.join(', ') + ' dengan konflik ' + mc.join(', ') + ' dan fitness ' + mf.join(', ') + '.' },
      { q: 'f. Elitisme k = 1: jadwal terbaik populasi lama menggantikan anak terburuk. Tulis rata-rata fitness ketiga populasi (2 desimal).',
        fields: [numi('Fitness terbaik populasi lama', bestOld), num('Rata-rata populasi lama', round(G.sum(fit) / 4, 2)), num('Rata-rata tanpa elitisme', round(G.sum(mf) / 4, 2)), num('Rata-rata dengan elitisme', round(G.sum(elite) / 4, 2))],
        ex: 'Terbaik lama ' + bestOld + ' menggantikan anak terburuk (fitness ' + mf[wi] + '). Rata-rata: lama ' + c(round(G.sum(fit) / 4, 2)) + ', tanpa elitisme ' + c(round(G.sum(mf) / 4, 2)) + ', dengan elitisme ' + c(round(G.sum(elite) / 4, 2)) + '.' },
      { q: 'g. Mengapa masalah ini memakai encoding integer, bukan biner atau permutasi? Lalu jelaskan apa yang terjadi bila fitness = 20 − konflik diganti fitness = 5 − konflik.',
        points: ['Setiap gen butuh nilai slot 1..3, dan beberapa ujian boleh berbagi slot, jadi integer lebih hemat daripada biner',
          'Permutasi tidak cocok karena permutasi mewajibkan setiap nilai muncul tepat sekali, sedangkan di sini satu slot dipakai banyak ujian',
          'Dengan fitness = 5 − konflik, banyak jadwal mendapat fitness negatif dan roulette wheel tidak bisa dipakai (peluang negatif)',
          'Solusi untuk fitness negatif: geser dengan konstanta, pakai fitness = 1/(1+konflik), atau ganti ke tournament selection',
          'Konflik sendiri bukan constraint, melainkan objective: jadwal dengan bentrok tetap sah, hanya nilainya buruk'] }
    ],
    ex: SENDIRI + ' Pola studi kasus jadwal Week 3 dengan angka baru; kunci dihitung dari tabel pasangan.'
  };
}

function gaselItem() {
  const names = ['A', 'B', 'C', 'D', 'E', 'F'], fit = [600, 200, 100, 60, 30, 10];
  const tot = G.sum(fit), p = fit.map(x => round(x / tot, 2));
  const rank = [6, 5, 4, 3, 2, 1], sumRank = G.sum(rank), pr = rank.map(x => round(x / sumRank, 2));
  const tours = [['A', 'F'], ['C', 'E'], ['B', 'D'], ['B', 'F']];
  const win = tours.map(([a, b]) => (fit[names.indexOf(a)] > fit[names.indexOf(b)] ? a : b));
  return {
    type: 'steps',
    q: 'Enam individu punya fitness A = 600, B = 200, C = 100, D = 60, E = 30, F = 10. Tim membandingkan tiga cara memilih induk: roulette wheel, rank-based (peringkat terbaik = 6), dan binary tournament (dua individu acak, yang fitness-nya lebih besar menang).\n' +
      'Catatan: semua peluang ditulis 2 angka di belakang koma.',
    steps: [
      { q: 'a. Roulette wheel: hitung total fitness dan peluang terpilih tiap individu.',
        fields: [numi('Total fitness', tot)].concat(names.map((n, i) => num('P(' + n + ')', p[i]))),
        ex: 'Total = ' + tot + '. P = fitness/total: ' + names.map((n, i) => n + ' = ' + c2(fit[i] / tot) + ' ≈ ' + c(p[i])).join(', ') + '. Individu A mendominasi: ' + c2(fit[0] / tot) + ' dari seluruh putaran.' },
      { q: 'b. Rank-based: hitung peluang tiap individu bila P = peringkat / jumlah peringkat.',
        fields: [numi('Jumlah peringkat', sumRank)].concat(names.map((n, i) => num('P(' + n + ')', pr[i]))),
        ex: 'Peringkat 6, 5, 4, 3, 2, 1 dengan jumlah 21. P = ' + names.map((n, i) => n + ' ' + c2(rank[i] / sumRank) + ' ≈ ' + c(pr[i])).join(', ') + '.' },
      { q: 'c. Binary tournament untuk pasangan A–F, C–E, B–D, B–F. Siapa pemenangnya?',
        fields: tours.map((t, i) => txt(t.join(' vs '), win[i])),
        ex: tours.map(([a, b], i) => a + ' (' + fit[names.indexOf(a)] + ') vs ' + b + ' (' + fit[names.indexOf(b)] + ') → ' + win[i]).join('; ') + '.' },
      { q: 'd. Hitung rasio peluang individu terbaik terhadap terburuk pada roulette wheel dan pada rank-based (2 desimal).',
        fields: [num('Roulette (terbaik/terburuk)', round((fit[0] / tot) / (fit[5] / tot), 2)), num('Rank (terbaik/terburuk)', round((rank[0] / sumRank) / (rank[5] / sumRank), 2))],
        ex: 'Roulette: 0,60 / 0,01 = 60,00 kali. Rank: 6/21 dibagi 1/21 = 6,00 kali. Rank jauh lebih lembut, sehingga satu individu tidak menguasai seluruh populasi.' },
      { q: 'e. Jelaskan dua kondisi yang membuat roulette wheel gagal, lalu bandingkan ketiga metode seleksi dan sebutkan kapan masing-masing dipakai.',
        points: ['Superindividu: satu individu berfitness sangat tinggi menguasai hampir semua putaran sehingga diversitas mati',
          'Fitness terlalu mirip atau banyak nol: semua peluang hampir sama, seleksi menjadi hampir acak',
          'Roulette peka skala, murah, dan mudah dihitung; cocok bila fitness positif dan tidak timpang',
          'Rank-based stabil terhadap outlier tetapi butuh pengurutan dan menghapus informasi jarak fitness',
          'Tournament tidak butuh fitness positif, mudah diparalelkan, dan tekanan seleksinya diatur ukuran k'] }
    ],
    ex: SENDIRI + ' Pola Week 2-3 tentang seleksi; angka dipilih agar peluang roulette berjumlah tepat 1,00.'
  };
}

// ============================================================ MATERI 3: GA KOMBINATORIAL
function tspWith(cfg) {
  const variants = [
    { rm: [0.11, 0.42, 0.07, 0.55], idx: [[1, 3], [2, 5], [4, 6], [1, 6]] },
    { rm: [0.12, 0.05, 0.63, 0.22], idx: [[1, 4], [2, 6], [3, 5], [2, 7]] },
    { rm: [0.21, 0.09, 0.31, 0.08], idx: [[2, 5], [1, 3], [3, 6], [4, 7]] },
    { rm: [0.09, 0.21, 0.11, 0.19], idx: [[1, 2], [3, 4], [2, 6], [1, 5]] },
    { rm: [0.19, 0.51, 0.08, 0.12], idx: [[2, 3], [1, 6], [4, 5], [2, 4]] }
  ];
  let last;
  for (const v of variants) {
    // Indeks gen harus ada di dalam panjang kromosom; kalau tidak, mutasi menghasilkan gen undefined.
    if (v.idx.some(([i, j]) => i > cfg.cities.length || j > cfg.cities.length)) continue;
    try { return tspExam(Object.assign({}, cfg, v)); } catch (e) { last = e; }
  }
  throw last || new Error('no tsp variant');
}

const tspVariant = [
  tspWith({
    cities: 'ABCDEF',
    dist: ['AB 9', 'AC 7', 'AD 9', 'AE 7', 'AF 10', 'BC 10', 'BD 14', 'BE 3', 'BF 11', 'CD 2', 'CE 10', 'CF 2', 'DE 10', 'DF 12', 'EF 3'],
    pop: ['321546', '315264', '254163', '526134'], r: [0.11, 0.36, 0.61, 0.87], tp: [2, 5], opt: 28,
    q: 'Kurir kue kering mengantar pesanan ke enam titik (A sampai F) lalu kembali ke titik awal. Jarak dalam km ada pada matriks ketetanggaan. Gunakan GA dengan populasi 4, representasi permutasi (1 = A sampai 6 = F), fitness = 1/(total jarak), dan kurir boleh berangkat dari titik mana pun.\n' +
      'Catatan: jarak bilangan bulat; fitness 4 desimal, proporsi dan batas rentang 2 desimal. Hitung proporsi dari fitness yang belum dibulatkan.',
    ex: SENDIRI + ' Pola Soal 1 UTS 2025 dengan 6 kota; segmen OX lebih panjang sehingga anak lebih bervariasi.'
  }),
  tspWith({
    cities: 'ABCDEFG',
    dist: ['AB 5', 'AC 11', 'AD 7', 'AE 13', 'AF 6', 'AG 11', 'BC 11', 'BD 5', 'BE 3', 'BF 12', 'BG 10', 'CD 13', 'CE 5', 'CF 12', 'CG 8', 'DE 11', 'DF 11', 'DG 12', 'EF 13', 'EG 11', 'FG 8'],
    pop: ['3671254', '7256341', '3651247', '2563714'], r: [0.13, 0.37, 0.61, 0.86], tp: [2, 6], opt: 42,
    q: 'Petugas sensus keliling mengunjungi tujuh desa (A sampai G) dalam satu putaran lalu kembali ke desa pertama. Jarak (km) ada pada matriks ketetanggaan. Gunakan GA dengan populasi 4, representasi permutasi (1 = A sampai 7 = G), fitness = 1/(total jarak).\n' +
      'Catatan: jarak bilangan bulat; fitness 4 desimal, proporsi dan batas rentang 2 desimal. Hitung proporsi dari fitness yang belum dibulatkan.',
    ex: SENDIRI + ' Pola Soal 1 UTS 2025 dengan 7 kota. Segmen gen 2-6 membuat sisa gen hanya 2 sehingga banyak anak mirip induknya; periksa tiap kota tepat sekali.'
  })
];

function pmxItem(cfg) {
  const { P1, P2, a, b, T } = cfg;
  const o1 = G.ox(P1.split(''), P2.split(''), a, b), o2 = G.ox(P2.split(''), P1.split(''), a, b);
  const p1 = G.pmx(P1.split(''), P2.split(''), a, b), p2 = G.pmx(P2.split(''), P1.split(''), a, b);
  const sw = G.swap(T.split(''), 2, 5).join(''), ins = G.insert(T.split(''), 2, 5).join(''), inv = G.invert(T.split(''), 2, 5).join('');
  const n = P1.length;
  return {
    type: 'steps',
    q: cfg.q,
    steps: [
      { q: 'a. Order crossover (OX): salin segmen gen ' + a + '–' + b + ' dari P1, baca P2 mulai gen ' + (b + 1) + ' melingkar, buang gen segmen, isi posisi kosong mulai gen ' + (b + 1) + '. Tulis urutan baca, gen sisa, dan kedua anak.',
        fields: [txt('Segmen dari P1', o1.child.slice(a - 1, b).join(' ')), txt('Urutan baca P2', o1.read.join('')), txt('Gen sisa', o1.rest.join('')), txt('Anak 1 (OX)', o1.child.join('')), txt('Anak 2 (OX)', o2.child.join(''))],
        ex: 'Segmen P1 = ' + o1.child.slice(a - 1, b).join(' ') + '. Baca P2 dari gen ' + (b + 1) + ': ' + o1.read.join(' ') + ' → buang segmen → ' + o1.rest.join(' ') + ' → isi gen ' + (b + 1) + ' dst. melingkar → ' + o1.child.join(' ') + '. Anak 2: segmen ' + o2.child.slice(a - 1, b).join(' ') + ', baca P1: ' + o2.read.join(' ') + ' → ' + o2.rest.join(' ') + ' → ' + o2.child.join(' ') + '.' },
      { q: 'b. Partially mapped crossover (PMX) dengan segmen yang sama. Tulis mapping, lalu kedua anak.',
        fields: [txt('Mapping (contoh: 5-3)', p1.map.map(([x, y]) => x + '-' + y).join(' ')), txt('Anak 1 (PMX)', p1.child.join('')), txt('Anak 2 (PMX)', p2.child.join(''))],
        ex: 'Mapping: ' + p1.map.map(([x, y]) => x + '↔' + y).join(', ') + '. Anak 1 = ' + p1.child.join(' ') + '. ' + (p1.chains.length ? 'Rantai mapping terjadi di posisi ' + p1.chains.map(ch => ch.pos + ' (' + ch.path.join('→') + ')').join(', ') + '. ' : 'Tidak ada rantai mapping di soal ini. ') + 'Anak 2 = ' + p2.child.join(' ') + '.' },
      { q: 'c. Periksa keempat anak: apakah setiap nomor muncul tepat satu kali? Sebutkan satu perbedaan pokok PMX dan OX.',
        fields: [numi('Jumlah anak sah', 4), txt('PMX menjaga', ['posisi absolut', 'posisi', 'absolute position']), txt('OX menjaga', ['urutan relatif', 'urutan', 'relative order'])],
        ex: 'Keempat anak sah: setiap nomor 1-' + n + ' muncul tepat sekali. PMX mempertahankan posisi absolut dan cocok untuk penugasan; OX mempertahankan urutan relatif dan cocok untuk TSP atau penjadwalan urutan.' },
      { q: 'd. Dari urutan awal ' + T.split('').join(' ') + ', hitung jumlah ruas (edge) yang putus bila dipakai swap gen 2 dan 5, insertion gen 2 ke posisi 5, dan inversion gen 2 sampai 5. Mana yang paling sedikit merusak?',
        fields: [txt('Hasil swap', sw), numi('Ruas putus (swap)', G.broken(T, sw)), txt('Hasil insertion', ins), numi('Ruas putus (insertion)', G.broken(T, ins)), txt('Hasil inversion', inv), numi('Ruas putus (inversion)', G.broken(T, inv)), txt('Paling sedikit merusak', ['inversion', 'inversi'])],
        ex: 'Swap: ' + sw + ' → ' + G.broken(T, sw) + ' ruas putus. Insertion: ' + ins + ' → ' + G.broken(T, ins) + '. Inversion: ' + inv + ' → ' + G.broken(T, inv) + ', karena hanya dua ruas di batas segmen yang berubah. Untuk TSP simetris, inversion paling aman.' },
      { q: 'e. Kapan sebaiknya memilih OX dan kapan PMX? Sebutkan pula akibatnya bila single-point crossover biner dipakai langsung pada kromosom permutasi.',
        points: ['Single-point pada permutasi menghasilkan nomor ganda dan nomor hilang, sehingga bukan urutan yang sah',
          'Operator permutasi harus menjaga setiap elemen muncul tepat sekali; itulah alasan PMX dan OX ada',
          'Pilih OX bila yang penting urutan relatif atau kedekatan antar elemen: TSP, routing, penjadwalan urutan',
          'Pilih PMX bila yang penting posisi absolut: penempatan pada slot tetap, penugasan',
          'Selalu periksa keabsahan anak sebelum dipakai; satu nomor hilang membuat seluruh rute tidak bisa dijalankan'] }
    ],
    ex: SENDIRI + ' Pola Week 5 (PMX vs OX, mutasi permutasi) dengan angka baru.'
  };
}

// ============================================================ MATERI 4: MULTI-OBJECTIVE
function sortCrowdItem(cfg) {
  const S = cfg.S, names = Object.keys(S), r = sortFronts(S), F1 = r.fronts[0], cd = crowd(S, F1);
  const rank = {}; r.fronts.forEach((f, i) => f.forEach(p => { rank[p] = i + 1; }));
  const cdAll = {}; r.fronts.forEach(f => Object.assign(cdAll, crowd(S, f).cd));
  const tours = cfg.tours, win = tours.map(([x, y]) => (rank[x] !== rank[y] ? (rank[x] < rank[y] ? x : y) : cdAll[x] > cdAll[y] ? x : y));
  if (win.includes(undefined)) throw new Error('tournament tie in ' + cfg.name);
  const cdOf = p => (cd.cd[p] === Infinity ? txt('CD ' + p, INF) : num('CD ' + p, round(cd.cd[p], 2)));
  const cdTx = p => (cd.cd[p] === Infinity ? '∞' : c2(cd.cd[p]) + ' = ' + cd.parts[p].join(' + '));
  const drop = F1.slice().sort((x, y) => cd.cd[x] - cd.cd[y])[0];
  return {
    type: 'steps',
    q: cfg.q,
    table: { head: ['Solusi', 'f1', 'f2'], rows: names.map(p => [p].concat(S[p])) },
    steps: [
      { q: 'a. Hitung n_p (banyak solusi yang mendominasi p) dan tulis S_p (solusi yang didominasi p). Kedua objektif diminimalkan.',
        fields: names.map(p => numi('n_p ' + p, r.np[p])).concat(names.map(p => (r.sp[p].length ? set('S_p ' + p, r.sp[p].join(' ')) : txt('S_p ' + p + ' (kosong)', ['kosong', 'tidak ada', '-'])))),
        ex: names.map(p => p + ' = (' + S[p].join(', ') + '): n_p = ' + r.np[p] + (r.sp[p].length ? ', mendominasi {' + r.sp[p].join(', ') + '}' : ', tidak mendominasi siapa pun')).join('. ') + '. Ingat: seri di satu objektif tetap bisa mendominasi bila objektif lain lebih baik.' },
      { q: 'b. Tulis front non-dominated (rank) semua solusi.',
        fields: r.fronts.map((f, i) => set('Front ' + (i + 1), f.join(' '))),
        ex: r.fronts.map((f, i) => 'Front ' + (i + 1) + ' = {' + f.join(', ') + '}').join('; ') + '. Front 1 adalah semua solusi dengan n_p = 0; setelah dikeluarkan, sisa solusi dihitung ulang.' },
      { q: 'c. Hitung crowding distance semua anggota front 1 (2 desimal). Ujung setiap objektif diberi tak hingga.',
        fields: F1.map(cdOf).concat([txt('CD terkecil di front 1', drop)]),
        ex: 'Urut f1: ' + F1.slice().sort((x, y) => S[x][0] - S[y][0]).join(', ') + '. ' + F1.filter(p => cd.cd[p] !== Infinity).map(p => p + ' = ' + cdTx(p)).join('; ') + '. ' + F1.filter(p => cd.cd[p] === Infinity).join(' dan ') + ' berada di ujung sehingga CD = ∞.' },
      { q: 'd. Binary tournament: ' + tours.map(t => t.join(' vs ')).join(', ') + '. Rank lebih kecil menang; bila rank sama, crowding lebih besar menang.',
        fields: tours.map((t, i) => txt(t.join(' vs '), win[i])),
        ex: tours.map(([x, y], i) => x + ' (rank ' + rank[x] + ', CD ' + (cdAll[x] === Infinity ? '∞' : c2(cdAll[x])) + ') vs ' + y + ' (rank ' + rank[y] + ', CD ' + (cdAll[y] === Infinity ? '∞' : c2(cdAll[y])) + ') → ' + win[i] + (rank[x] === rank[y] ? ' karena crowding' : ' karena rank')).join('; ') + '.' },
      cfg.essay
    ],
    ex: cfg.ex
  };
}

const msort = [sortCrowdItem({
  name: 'msort', S: { S1: [12, 40], S2: [18, 30], S3: [15, 34], S4: [25, 22], S5: [30, 26], S6: [10, 48] },
  tours: [['S1', 'S2'], ['S3', 'S4'], ['S5', 'S6'], ['S2', 'S6']],
  q: 'Tim kurir makanan membandingkan enam rencana pengiriman. Setiap rencana dinilai dengan dua objektif yang keduanya diminimalkan: f1 = waktu tempuh total (menit) dan f2 = biaya operasional (ribu rupiah).\n' +
    'Catatan: bulatkan crowding distance ke 2 angka di belakang koma.',
  essay: { q: 'e. Bila hanya satu rencana boleh dipakai dari front 1, mana yang paling tepat dibuang lebih dulu, dan mengapa membuang berdasarkan crowding bukan berarti solusinya buruk?',
    points: ['Yang dibuang adalah anggota front 1 dengan crowding distance terkecil, karena paling rapat dengan tetangganya',
      'Crowding kecil berarti solusi itu bisa diwakili solusi tetangganya yang hampir sama baiknya; solusinya sendiri tetap non-dominated',
      'Membuang berdasarkan rank saja akan menghapus seluruh front 1 sekaligus dan menyisakan front yang lebih buruk',
      'Crowding menjaga sebaran pilihan sehingga keputusan akhir punya banyak opsi trade-off'] },
  ex: SENDIRI + ' Pola Week 6: non-dominated sort, crowding distance, tournament rank lalu crowding.'
})];

function fillItem(cfg) {
  const pool = cfg.pool, N = cfg.N, names = Object.keys(pool), r = sortFronts(pool);
  let taken = [], k = 0;
  while (k < r.fronts.length && taken.length + r.fronts[k].length <= N) { taken = taken.concat(r.fronts[k]); k++; }
  const over = r.fronts[k], room = N - taken.length, cw = crowd(pool, over);
  const order = over.slice().sort((a, b) => cw.cd[b] - cw.cd[a]);
  if (room > 0 && cw.cd[order[room - 1]] === cw.cd[order[room]]) throw new Error('cut tie in mfill');
  const keep = taken.concat(order.slice(0, room)), dropAll = r.fronts.slice(k + 1).flat().concat(order.slice(room));
  const cdOf = p => (cw.cd[p] === Infinity ? txt('CD ' + p, INF) : num('CD ' + p, round(cw.cd[p], 2)));
  return {
    type: 'steps',
    q: cfg.q,
    table: { head: ['Solusi', 'f1', 'f2'], rows: names.map(p => [p].concat(pool[p])) },
    steps: [
      { q: 'a. Langkah 6 (combine): berapa ukuran pool gabungan, dan mengapa NSGA-II tidak langsung mengganti induk dengan offspring?',
        fields: [numi('Ukuran pool', names.length)],
        ex: 'Pool = N induk + N offspring = 2N = ' + names.length + '. Induk yang lebih baik dari offspring masih bisa bertahan: inilah elitisme NSGA-II tanpa parameter k.' },
      { q: 'b. Langkah 7 (sort again): urutkan pool ke front.',
        fields: r.fronts.map((f, i) => set('Front ' + (i + 1), f.join(' '))),
        ex: r.fronts.map((f, i) => 'F' + (i + 1) + ' = {' + f.join(', ') + '}').join('; ') + '.' },
      { q: 'c. Langkah 8 (fill): front mana yang masuk utuh, front mana yang meluap, berapa tempat tersisa, dan berapa crowding anggotanya (2 desimal)?',
        fields: [txt('Masuk utuh', taken.length ? taken.join(' ') : ['tidak ada', 'kosong']), txt('Front meluap', ['F' + (k + 1), 'front ' + (k + 1), String(k + 1)]), numi('Tempat tersisa', room)].concat(over.map(cdOf)),
        ex: 'Masuk utuh: ' + taken.join(', ') + ' (' + taken.length + '/' + N + '). F' + (k + 1) + ' {' + over.join(', ') + '} meluap, sisa ' + room + ' tempat. Crowding: ' + over.map(p => p + (cw.cd[p] === Infinity ? ' = ∞' : ' = ' + c2(cw.cd[p]))).join('; ') + '.' },
      { q: 'd. Tulis populasi generasi berikutnya dan semua solusi yang dibuang.',
        fields: [set('Generasi berikutnya', keep.join(' ')), set('Dibuang', dropAll.join(' ') || ['tidak ada', 'kosong'])],
        ex: 'Generasi berikutnya: ' + keep.join(', ') + '. Dibuang: ' + dropAll.join(', ') + '. Yang dibuang dari front meluap dipilih karena crowding terkecil; sisanya dibuang hanya karena berada di front belakang.' },
      cfg.essay
    ],
    ex: cfg.ex
  };
}

const mfill = [fillItem({
  pool: { P1: [6, 27], P2: [4, 30], P3: [5, 25], P4: [3, 36], O1: [2, 10], O2: [6, 33], O3: [7, 11], O4: [2, 34] },
  N: 4,
  q: 'Penjadwalan bengkel dengan NSGA-II, N = 4. f1 = jumlah hari yang dipakai, f2 = jumlah teknisi yang bentrok; keduanya diminimalkan. Populasi induk (P1-P4) dan offspring hasil crossover dan mutasi (O1-O4) sudah dievaluasi.\n' +
    'Catatan: crowding distance dan semua hasil 2 desimal.',
  essay: { q: 'e. Jelaskan mengapa menggabungkan induk dan offspring (2N) lalu memilih N disebut elitisme tanpa parameter, dan bandingkan dengan elitisme k pada GA biasa.',
    points: ['Karena seluruh induk ikut bersaing, solusi terbaik tidak mungkin hilang selama ia masih ada di pool',
      'Tidak ada parameter k yang perlu dipilih; jumlah yang bertahan ditentukan oleh rank lalu crowding',
      'Pada GA biasa elitisme k menyalin top-k secara paksa dan k harus ditentukan sendiri',
      'Akibatnya NSGA-II tidak pernah memburuk pada objektif Pareto, tetapi tetap harus menjaga sebaran lewat crowding'] },
  ex: SENDIRI + ' Pola langkah 6-8 slide Week 6.'
})];

function weightItem() {
  const F = [[1, 179], [2, 49], [3, 13], [4, 4], [5, 0]];
  const save = F.slice(1).map((p, i) => F[i][1] - p[1]);
  const ws = w => F.map(([s, b]) => round(w * s + (1 - w) * b, 2));
  const pickAt = w => { const v = ws(w); return F[v.indexOf(Math.min(...v))][0]; };
  return {
    type: 'steps',
    q: 'Setelah ratusan generasi, NSGA-II memberi front jadwal ujian dalam bentuk (jumlah slot, jumlah bentrok): (1, 179), (2, 49), (3, 13), (4, 4), (5, 0). Semua titik ini non-dominated: menambah slot menurunkan bentrok tetapi menambah hari ujian.\n' +
      'Catatan: semua hitungan 2 desimal.',
    steps: [
      { q: 'a. Berapa bentrok yang dihemat setiap tambahan satu slot, dan di mana knee point-nya?',
        fields: save.map((v, i) => numi((i + 1) + ' → ' + (i + 2) + ' slot', v)).concat([numi('Knee point (slot)', 3)]),
        ex: 'Penghematan: ' + save.join(', ') + ' bentrok. Sampai 3 slot setiap tambahan menghemat puluhan bentrok, setelah itu tinggal satuan. Knee point = 3 slot (13 bentrok).' },
      { q: 'b. Weighted sum: skor = w × slot + (1 − w) × bentrok, pilih skor terkecil. Jadwal mana yang terpilih untuk w = 0,5 dan w = 0,95?',
        fields: [numi('w = 0,5', pickAt(0.5)), numi('w = 0,95', pickAt(0.95))],
        ex: 'w = 0,5: skor ' + ws(0.5).map(c2).join('; ') + ' → ' + pickAt(0.5) + ' slot. w = 0,95: skor ' + ws(0.95).map(c2).join('; ') + ' → ' + pickAt(0.95) + ' slot. Pilihan berubah total hanya karena bobot, padahal datanya sama.' },
      { q: 'c. Dekan menetapkan ujian maksimal 3 hari. Opsi mana yang masih memenuhi, dan mana yang kamu rekomendasikan? Tulis alasannya untuk dekan, bukan untuk dosen algoritma.',
        points: ['Opsi yang memenuhi: 1, 2, dan 3 slot',
        'Rekomendasi 3 slot dengan 13 bentrok, karena slot ketiga masih menghemat 36 bentrok sedangkan slot keempat hanya 9',
        'Batasan 3 hari membuat opsi 4 dan 5 slot gugur walau lebih sedikit bentrok',
        'Keputusan akhir milik dekan; algoritma hanya menyediakan pilihan dan angka trade-off-nya'] },
      { q: 'd. Mengapa NSGA-II tidak cukup diganti weighted sum, dan kapan weighted sum justru wajar dipakai?',
        points: ['Bobot w harus dipilih sebelum trade-off terlihat, sehingga hasil sudah ditentukan di awal',
        'Pada front cekung sebagian solusi tidak pernah terpilih berapa pun nilai w',
        'NSGA-II mencari seluruh front lebih dulu, keputusan diambil belakangan (a posteriori)',
        'Weighted sum wajar bila nilai tukar sudah diketahui, misalnya biaya satu slot sudah ada standar rupiahnya',
        'Weighted sum juga murah: satu kali optimasi, bukan sekumpulan solusi'] }
    ],
    ex: SENDIRI + ' Front dari slide Week 6; bagian weighted sum dan keputusan dekan dibuat sendiri.'
  };
}

module.exports = {
  mhc: [mhcItem()], mgrid: [mgridItem()], mspace: [mspaceItem()],
  gabin: [gbin], gabin2: [gbin2], gajadwal: [gajadwalItem()], gasel: [gaselItem()],
  kpmx: [pmxItem({
    P1: '146253', P2: '532164', a: 3, b: 4, T: '1234567',
    q: 'Bengkel motor menerima 6 unit bernomor 1 sampai 6 yang harus dikerjakan satu per satu. Dua urutan usulan dari generasi sebelumnya: P1 = 1 4 6 2 5 3 dan P2 = 5 3 2 1 6 4, dengan potongan gen ke-3 sampai gen ke-4 (keduanya termasuk).\n' +
      'Catatan: bulatkan hasil hitungan ke 2 angka di belakang koma bila perlu.'
  })],
  kpmx2: [pmxItem({
    P1: '48271536', P2: '27163845', a: 3, b: 5, T: '12345678',
    q: 'Delapan berkas perkara bernomor 1 sampai 8 harus diperiksa satu per satu. Dua urutan usulan: P1 = 4 8 2 7 1 5 3 6 dan P2 = 2 7 1 6 3 8 4 5, dengan potongan gen ke-3 sampai gen ke-5 (keduanya termasuk).\n' +
      'Catatan: bulatkan hasil hitungan ke 2 angka di belakang koma bila perlu.'
  })],
  tsp2: tspVariant,
  msort, mfill, mweight: [weightItem()]
};
