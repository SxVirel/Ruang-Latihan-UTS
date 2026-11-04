// Soal cerita UTS KA: lima kasus naratif, satu per pola soal ujian, untuk melatih penalaran.
// Semua kunci dihitung di sini dengan kode (tidak diketik manual), dan semua angka dibulatkan 2 desimal.
// Dipakai scripts/ka/build.js untuk menulis app/data/ka-5.js.
const G = require('./ga.js');
const { id, round } = G;
const { tspExam, sortFronts, crowd } = require('./part3.js');
const T2 = 0.006; // toleransi untuk jawaban 2 desimal
const num = (label, a, tol) => ({ label, a, tol: tol == null ? T2 : tol });
const numi = (label, a) => ({ label, a, tol: 0 });
const txt = (label, a) => ({ label, a });
const SENDIRI = 'Kunci dihitung sendiri dengan kode; soal tidak memberi kunci.';
const c = x => String(x).replace('.', ',');

// ---------------------------------------------------------------- 1. Metaheuristic Search
function metaItem() {
  const f = [12, 18, 25, 31, 31, 31, 34, 30, 22]; // driver 0..8
  const climb = s => {
    const path = [s];
    let i = s;
    for (;;) {
      const nb = [i - 1, i + 1].filter(y => y >= 0 && y < f.length);
      const b = nb.reduce((p, q) => (f[q] > f[p] ? q : p), nb[0]);
      if (f[b] <= f[i]) return path;
      i = b;
      path.push(i);
    }
  };
  const P = (dE, T) => round(Math.exp(-dE / T), 2);
  const T0 = 90, alpha = 0.85, T = k => round(T0 * alpha ** k, 2);
  const p = 2 / 4, hit = 1 - (1 - p) ** 3;
  const run = s => 'x = ' + climb(s).join(' → ') + ' (berhenti di ' + climb(s).pop() + ', nilai ' + f[climb(s).pop()] + ')';
  return {
    type: 'steps',
    q: 'Sebuah aplikasi ojek online mengatur berapa driver yang standby per jam di satu kawasan. Manajer mencoba 9 skenario, yaitu 0 sampai 8 driver, lalu mencatat pesanan yang berhasil diselesaikan per jam (makin besar makin baik).\n' +
      'Tetangga sebuah skenario adalah jumlah driver dikurangi 1 atau ditambah 1. Hill Climbing selalu pindah ke tetangga yang nilainya lebih baik, dan berhenti jika tidak ada tetangga yang lebih baik darinya.\n' +
      'Simulated Annealing (SA) menerima langkah yang memperburuk nilai sebesar ΔE dengan peluang P = exp(−ΔE / T), yaitu diterima jika nilai acak r < P. Suhu awalnya T0 = 90 dan diturunkan secara geometrik T_k = 90 × 0,85^k, dengan k bilangan iterasi mulai dari 0.\n' +
      'Catatan: bulatkan setiap hasil hitungan ke 2 angka di belakang koma.',
    table: { head: ['Driver'].concat(f.map((_, i) => i)), rows: [['Pesanan per jam'].concat(f)] },
    steps: [
      { q: 'a. Jalankan Hill Climbing dari 0 driver. Skenario berapa yang dipilih saat berhenti, berapa pesanan per jam, dan apakah itu global optimum?',
        fields: [numi('Berhenti di (driver)', climb(0).pop()), numi('Pesanan per jam', f[climb(0).pop()]), txt('Global optimum? (ya / tidak)', ['tidak', 'bukan', 'no'])],
        ex: run(0) + '. Skenario 0 hanya punya satu tetangga (1) dan nilainya lebih baik, jadi naik terus sampai 3. Tetangga 3 adalah 2 (25) dan 4 (31): tidak ada yang lebih baik, jadi berhenti di 31. Itu bukan global optimum karena skenario 6 menghasilkan 34.' },
      { q: 'b. Jalankan Hill Climbing dari 4 driver dan dari 5 driver. Di mana masing-masing berhenti, dan kondisi apa yang membuat keduanya berhenti di tempat berbeda?',
        fields: [numi('Dari 4 berhenti di', climb(4).pop()), numi('Nilai', f[climb(4).pop()]),
          numi('Dari 5 berhenti di', climb(5).pop()), numi('Nilai', f[climb(5).pop()]),
          txt('Nama kondisi', ['plateau', 'dataran', 'plateau dataran'])],
        ex: run(4) + ' dan ' + run(5) + '. Tiga skenario berturut-turut (3, 4, 5) bernilai 31 yang sama: inilah plateau. Di 4, semua tetangga sama atau lebih buruk sehingga naik tidak mungkin; di 5, tetangga 6 bernilai 34 sehingga masih bisa naik. Titik awal menentukan hasil.' },
      { q: 'c. SA sedang berada di 6 driver lalu diusulkan pindah ke 7 driver: nilainya turun dari 34 ke 30, jadi ΔE = 4. Hitung P = exp(−ΔE / T) untuk T = 6, T = 3, dan T = 1 (2 desimal). Dengan nilai acak r = 0,30, pada suhu mana usulan itu diterima?',
        fields: [num('T = 6', P(4, 6)), num('T = 3', P(4, 3)), num('T = 1', P(4, 1)), txt('Diterima pada', ['T = 6', '6', 'T=6'])],
        ex: 'exp(−4/6) = ' + c(P(4, 6)) + ', exp(−4/3) = ' + c(P(4, 3)) + ', exp(−4/1) = ' + c(P(4, 1)) + '. r = 0,30 hanya lebih kecil dari 0,51, jadi usulan diterima pada T = 6 saja. Suhu tinggi di awal = eksplorasi; suhu rendah = SA berubah menjadi Hill Climbing.' },
      { q: 'd. Hitung suhu pada iterasi k = 5 dan k = 20 dengan T_k = 90 × 0,85^k (2 desimal).',
        fields: [num('T_5', T(5)), num('T_20', T(20))],
        ex: 'T_5 = 90 × 0,85^5 = 90 × 0,4437 = ' + c(T(5)) + '. T_20 = 90 × 0,85^20 = 90 × 0,0388 = ' + c(T(20)) + '. Setelah 20 iterasi hampir tidak ada lagi langkah buruk yang diterima.' },
      { q: 'e. Tim lain menjalankan Hill Climbing 4 kali dari titik awal acak dan berhasil menemukan global optimum pada 2 dari 4 run. Jika dijalankan 3 run independen, berapa peluang sedikitnya satu run menemukan global optimum (2 desimal)?',
        fields: [num('Peluang', round(hit, 2))],
        ex: 'Peluang satu run gagal = 1 − 2/4 = 0,50. Tiga run gagal semua = 0,50^3 = 0,125, jadi peluang sedikitnya satu run berhasil = 1 − 0,125 = 0,875 ≈ ' + c(round(hit, 2)) + '. Random restart memperbesar peluang berhasil tanpa mengubah algoritmanya.' },
      { q: 'f. Jelaskan mengapa Hill Climbing bisa berhenti di 31 padahal ada skenario bernilai 34, lalu bandingkan Hill Climbing, Simulated Annealing, dan Tabu Search dalam cara meloloskan local optimum.',
        points: ['Hill Climbing hanya menerima tetangga yang lebih baik, jadi berhenti di local optimum atau plateau (skenario 3, 4, 5 bernilai 31)',
          'Simulated Annealing kadang menerima langkah yang memburuk dengan peluang exp(−ΔE/T), sehingga bisa keluar dari basin; peluangnya mengecil saat suhu turun',
          'Tabu Search memakai memori: langkah yang baru dilakukan dilarang selama tenure, sehingga terpaksa bergerak walau memburuk',
          'Ketiganya trajectory-based (satu solusi bergerak); bedanya hanya mekanisme lolos. Random restart adalah cara tambahan untuk Hill Climbing, bukan pengganti algoritmanya',
          'Untuk masalah yang punya banyak local optimum, beberapa run lebih berguna daripada satu run sangat panjang karena hasil tiap run independen'] }
    ],
    ex: SENDIRI + ' Data dibuat sendiri mengikuti pola slide Week 1 (Hill Climbing, plateau, Simulated Annealing, random restart).'
  };
}

// ---------------------------------------------------------------- 2. Genetic Algorithm (satu generasi penuh)
function gaItem() {
  const untung = [40, 25, 30, 55, 18, 32]; // P1..P6
  const pop = ['101100', '011010', '110011', '001101'];
  const N = ['K1', 'K2', 'K3', 'K4'];
  const bits = s => s.split('').map(ch => ch === '1');
  const pilih = s => bits(s).map((b, i) => (b ? i : -1)).filter(i => i >= 0);
  const sah = s => {
    const p = pilih(s);
    return !(p.includes(0) && p.includes(3)); // P1 dan P4 memakai mesin yang sama
  };
  const fit = s => (sah(s) ? G.sum(pilih(s).map(i => untung[i])) : 0);
  const ket = s => (sah(s) ? pilih(s).map(i => 'P' + (i + 1)).join(' + ') : 'P1 dan P4 sekaligus → tidak sah');
  const len = pop.map(fit), w = G.wheel(len);
  const prop = w.p.map(x => round(x, 2));
  const cum = w.cum.map(x => round(x, 2));
  const r = [0.15, 0.40, 0.70, 0.30];
  const par = r.map(x => G.pick(w.cum, x));
  const [k1, k2] = G.cross1(pop[par[0]], pop[par[1]], 3);
  const [k3, k4] = G.cross1(pop[par[2]], pop[par[3]], 3);
  const kids = [k1, k2, k3, k4];
  const rm = [0.07, 0.42, 0.09, 0.55], gen = [4, 2, 6, 1], pm = 0.10;
  const mut = kids.map((k, i) => (rm[i] < pm ? G.flip(k, gen[i]) : k));
  const kf = kids.map(fit), mf = mut.map(fit);
  const bestOldFit = Math.max(...len), bestIndex = len.indexOf(bestOldFit);
  const worstChild = Math.min(...mf), wi = mf.indexOf(worstChild);
  const withElite = mf.slice();
  withElite[wi] = len[bestIndex];
  const avgOld = round(G.sum(len) / 4, 2), avgNo = round(G.sum(mf) / 4, 2), avgYes = round(G.sum(withElite) / 4, 2);
  return {
    type: 'steps',
    q: 'Pabrik keripik singkong punya enam paket pengadaan P1 sampai P6. Keuntungan tiap paket (juta rupiah): P1 = 40, P2 = 25, P3 = 30, P4 = 55, P5 = 18, P6 = 32. Kromosom 6 bit menyatakan paket yang diambil (bit 1 = ambil).\n' +
      'Aturan pabrik: P1 dan P4 memakai mesin penggorengan yang sama, jadi keduanya tidak boleh diambil bersamaan. Kromosom dianggap tidak sah bila memuat P1 dan P4 sekaligus, dan fitness-nya diberi 0. Selain itu fitness = jumlah keuntungan paket yang diambil.\n' +
      'Populasi awal 4 kromosom: K1 = 101100, K2 = 011010, K3 = 110011, K4 = 001101.\n' +
      'Catatan: bulatkan proporsi, batas rentang, dan rata-rata ke 2 angka di belakang koma. Hitung proporsi dari fitness yang belum dibulatkan.',
    steps: [
      { q: 'a. Hitung fitness setiap kromosom. Sebutkan kromosom yang tidak sah.',
        fields: N.map((n, i) => numi('Fitness ' + n, len[i])).concat([txt('Kromosom tidak sah', ['K1', 'k1'])]),
        ex: N.map((n, i) => n + ' = ' + bits(pop[i]).join('') + ': ' + ket(pop[i]) + ' → ' + len[i]).join('. ') + '. K1 memuat P1 dan P4 sekaligus, jadi nilainya 0 walau keuntungannya besar. Fitness 0 membuat kromosom itu tidak punya peluang di roulette.' },
      { q: 'b. Hitung total fitness, proporsi roulette wheel, dan batas atas setiap rentang (2 desimal). Tidak perlu diurutkan; batas bawah K1 = 0 dan batas atas K4 = 1.',
        fields: [num('Total fitness', G.sum(len), 0)].concat(prop.map((x, i) => num('Proporsi ' + N[i], x))).concat([0, 1, 2].map(i => num('Batas atas ' + N[i], cum[i]))),
        ex: 'Total = ' + len.join(' + ') + ' = ' + G.sum(len) + '. Proporsi: ' + prop.map((x, i) => N[i] + ' = ' + len[i] + '/' + G.sum(len) + ' = ' + c(x)).join(', ') + '. Rentang: ' +
          N.map((n, i) => n + ' [' + (i ? c(cum[i - 1]) : '0') + ' – ' + c(cum[i]) + ')').join(', ') + '. K1 lebarnya 0, jadi K1 hanya terpilih jika r = 0.' },
      { q: 'c. Pilih 4 orang tua dengan nilai acak 0,15; 0,40; 0,70; 0,30 (urut Parent1 sampai Parent4). Kromosom terpilih adalah yang rentangnya memuat nilai acak itu.',
        fields: r.map((x, i) => txt('Parent' + (i + 1) + ' (r = ' + c(x) + ')', [N[par[i]], pop[par[i]]])),
        ex: r.map((x, i) => 'P' + (i + 1) + ' = ' + c(x) + ' → ' + N[par[i]] + ' (' + pop[par[i]] + ', fitness ' + len[par[i]] + ')').join('; ') + '. K3 terpilih dua kali, K1 tidak pernah terpilih.' },
      { q: 'd. Pasangkan Parent1–Parent2 dan Parent3–Parent4, lalu lakukan single-point crossover dengan titik potong setelah gen ke-3. Tulis keempat anak.',
        fields: kids.map((k, i) => txt('Anak' + (i + 1), k)),
        ex: 'Potong setelah gen 3: ' + pop[par[0]] + ' × ' + pop[par[1]] + ' → ' + k1 + ' dan ' + k2 + '; ' + pop[par[2]] + ' × ' + pop[par[3]] + ' → ' + k3 + ' dan ' + k4 + '. Gen 1-3 tetap, gen 4-6 bertukar. Perhatikan bahwa setiap bit anak sudah ada di salah satu induknya.' },
      { q: 'e. Probabilitas mutasi 0,10. Anak dimutasi jika nilai acaknya < 0,10, dengan bit flip pada gen yang ditentukan. Tentukan anak yang dimutasi dan tulis keempat kromosom hasilnya.',
        table: { head: ['Anak', 'Nilai acak', 'Gen', 'Bit baru'], rows: kids.map((k, i) => ['Anak' + (i + 1), c(rm[i]), gen[i], rm[i] < pm ? k[gen[i] - 1] + ' → ' + (k[gen[i] - 1] === '1' ? '0' : '1') : 'tetap']) },
        fields: [{ label: 'Anak yang dimutasi (pisahkan spasi)', a: rm.map((x, i) => (x < pm ? 'Anak' + (i + 1) : '')).filter(Boolean).join(' '), set: true }]
          .concat(mut.map((m, i) => txt('Anak' + (i + 1) + ' hasil', m))),
        ex: rm.map((x, i) => 'Anak' + (i + 1) + ': ' + c(x) + (x < pm ? ' < 0,10 → gen ' + gen[i] + ' dibalik: ' + kids[i] + ' → ' + mut[i] : ' ≥ 0,10 → tetap ' + kids[i])).join('; ') + '.' },
      { q: 'f. Generational replacement: keempat anak menggantikan seluruh populasi lama. Hitung fitness generasi baru tanpa elitisme, lalu dengan elitisme k = 1 (kromosom terbaik generasi lama menggantikan anak terburuk). Tulis rata-rata fitness ketiga populasi.',
        fields: mut.map((m, i) => numi('Fitness Anak' + (i + 1) + ' (setelah mutasi)', mf[i]))
          .concat([numi('Fitness terbaik generasi lama', bestOldFit), numi('Anak terburuk', worstChild), num('Rata-rata populasi lama', avgOld), num('Rata-rata tanpa elitisme', avgNo), num('Rata-rata dengan elitisme', avgYes)]),
        ex: 'Tanpa mutasi fitness anak: ' + kf.join(', ') + '. Setelah mutasi: ' + mf.join(', ') + '. Terbaik lama ' + N[bestIndex] + ' = ' + bestOldFit + ' menggantikan Anak' + (wi + 1) + ' (' + worstChild + '). Rata-rata: lama ' + c(avgOld) + ', tanpa elitisme ' + c(avgNo) + ', dengan elitisme ' + c(avgYes) + '. Elitisme menaikkan rata-rata tanpa mengubah anak yang sudah baik.' },
      { q: 'g. Jelaskan tiga hal: (1) mengapa crossover tidak pernah menghasilkan nilai gen yang benar-benar baru, (2) mengapa seleksi roulette bermasalah ketika ada kromosom dengan fitness 0, dan (3) kapan tournament selection atau rank-based selection lebih tepat.',
        points: ['Crossover hanya menyalin gen yang sudah ada di kedua induk, jadi tidak ada nilai gen baru; nilai baru hanya muncul dari mutasi',
          'Semua kromosom yang tidak sah ber-fitness 0 sehingga lebarnya rentang 0: kromosom itu tidak pernah terpilih dan perbaikan harus datang dari mutasi atau dari induk yang sah',
          'Roulette peka skala: satu superindividu dapat mendominasi, dan fitness 0 atau fitness yang hampir sama membuat seleksi hampir acak',
          'Tournament membandingkan beberapa individu secara lokal tanpa memakai total fitness, jadi aman untuk fitness 0 atau negatif',
          'Rank-based memakai peringkat, sehingga tahan outlier dan cocok bila nilainya berderet mirip'] }
    ],
    ex: SENDIRI + ' Kasus dibuat sendiri mengikuti pola GA Week 2-3: encoding biner, fitness dengan constraint, roulette, single-point crossover, bit flip, elitisme.'
  };
}

// ---------------------------------------------------------------- 3. GA untuk TSP (pola soal UTS)
const tsp = [];
tsp.push(tspExam({
  cities: 'ABCDE',
  dist: ['AB 10', 'AC 6', 'AD 13', 'AE 8', 'BC 9', 'BD 5', 'BE 12', 'CD 7', 'CE 11', 'DE 4'],
  pop: ['21543', '23541', '32541', '53124'],
  r: [0.13, 0.38, 0.60, 0.86], tp: [2, 4],
  rm: [0.21, 0.05, 0.54, 0.19], idx: [[2, 5], [1, 3], [3, 4], [1, 5]],
  opt: 32,
  q: 'Depot air minum "Tirta Jaya" mengantar galon ke lima titik pelanggan: A (depot), B (kos mahasiswa), C (kantor kelurahan), D (pasar), E (rumah sakit). Jarak antar titik dalam km diberikan pada matriks ketetanggaan di bawah. Satu unit pikap harus mengunjungi semua titik tepat satu kali lalu kembali ke depot.\n' +
    'Selesaikan TSP ini dengan algoritma genetika: populasi 4 individu, representasi permutasi (1 = A, 2 = B, 3 = C, 4 = D, 5 = E; kromosom 21543 berarti B→A→E→D→C→B), fitness = 1/(total jarak), dan pikap boleh berangkat dari titik mana pun.\n' +
    'Catatan: jarak dalam bilangan bulat; tulis fitness 4 angka di belakang koma, tetapi proporsi, batas rentang, dan semua hasil akhir lain cukup 2 angka di belakang koma. Hitung proporsi dari fitness yang belum dibulatkan.',
  ex: SENDIRI + ' Format sama persis dengan Soal 1 UTS 2025 (langkah a sampai g) tetapi angka, kromosom, dan kota awalnya berbeda.'
}));

// ---------------------------------------------------------------- 4. Crossover permutasi (PMX vs OX)
function crossItem() {
  const P1 = '315264', P2 = '263415', a = 3, b = 4;
  const o1 = G.ox(P1.split(''), P2.split(''), a, b), o2 = G.ox(P2.split(''), P1.split(''), a, b);
  const p1 = G.pmx(P1.split(''), P2.split(''), a, b), p2 = G.pmx(P2.split(''), P1.split(''), a, b);
  const T = '1234567';
  const sw = G.swap(T.split(''), 2, 5).join(''), ins = G.insert(T.split(''), 2, 5).join(''), inv = G.invert(T.split(''), 2, 5).join('');
  const bsw = G.broken(T, sw), bins = G.broken(T, ins), binv = G.broken(T, inv);
  return {
    type: 'steps',
    q: 'Sebuah bengkel motor punya 6 unit yang masuk pagi ini, diberi nomor 1 sampai 6, dan seorang teknisi harus mengerjakannya satu per satu. Urutan pengerjaan dikodekan sebagai permutasi 6 gen.\n' +
      'Dua urutan usulan dari generasi sebelumnya: P1 = 3 1 5 2 6 4 dan P2 = 2 6 3 4 1 5. Keduanya akan di-crossover dengan potongan gen ke-3 sampai gen ke-4 (keduanya termasuk).\n' +
      'Catatan: bulatkan hasil hitungan ke 2 angka di belakang koma bila perlu.',
    steps: [
      { q: 'a. Lakukan order crossover (OX). Tulis segmen yang disalin, urutan baca induk lain mulai gen ke-5, gen sisa setelah segmen dibuang, lalu kedua anak.',
        fields: [txt('Segmen dari P1', o1.child.slice(2, 4).join('')), txt('Urutan baca P2 dari gen 5', o1.read.join('')),
          txt('Gen sisa dari P2', o1.rest.join('')), txt('Anak 1 (OX)', o1.child.join('')),
          txt('Anak 2 (OX)', o2.child.join(''))],
        ex: 'Segmen P1 = ' + o1.child.slice(2, 4).join(' ') + ' di gen 3-4. Baca P2 dari gen 5 melingkar: ' + o1.read.join(' ') + ', buang gen segmen → ' + o1.rest.join(' ') + ', isi gen 5, 6, 1, 2 → Anak 1 = ' + o1.child.join(' ') + '. Untuk Anak 2, segmen P2 = ' + o2.child.slice(2, 4).join(' ') + ', baca P1 dari gen 5: ' + o2.read.join(' ') + ', sisa ' + o2.rest.join(' ') + ' → ' + o2.child.join(' ') + '.' },
      { q: 'b. Lakukan partially mapped crossover (PMX) dengan segmen gen 3-4 yang sama. Tulis mapping yang terbentuk, lalu kedua anak.',
        fields: [txt('Mapping (contoh: 5-3)', p1.map.map(([x, y]) => x + '-' + y).join(' ')),
          txt('Anak 1 (PMX)', p1.child.join('')), txt('Anak 2 (PMX)', p2.child.join(''))],
        ex: 'Mapping dari segmen: ' + p1.map.map(([x, y]) => x + '↔' + y).join(' dan ') + '. Anak 1 = ' + p1.child.join(' ') + ': gen 3-4 disalin dari P1, gen di luar segmen diambil dari P2 dan diganti lewat mapping bila sudah dipakai. Anak 2 = ' + p2.child.join(' ') + ' dengan arah sebaliknya.' },
      { q: 'c. Periksa keabsahan keempat anak: apakah setiap nomor unit muncul tepat satu kali? Lalu sebutkan satu perbedaan pokok antara PMX dan OX.',
        fields: [txt('Jumlah anak yang sah', 4), txt('PMX menjaga', ['posisi absolut', 'posisi', 'absolute position']),
          txt('OX menjaga', ['urutan relatif', 'urutan', 'relative order'])],
        ex: 'Keempat anak sah karena setiap nomor 1-6 muncul tepat sekali; PMX menyelesaikan duplikat lewat mapping, OX cukup membuang gen yang sudah ada di segmen. PMX menjaga posisi absolut (cocok untuk penugasan), OX menjaga urutan relatif (cocok untuk TSP dan antrean).' },
      { q: 'd. Urutan awal seorang teknisi adalah 1 2 3 4 5 6 7. Hitung berapa ruas (edge) yang putus bila dipakai swap gen 2 dan 5, insertion gen 2 ke posisi 5, dan inversion gen 2 sampai 5. Mana yang paling sedikit merusak urutan?',
        fields: [txt('Hasil swap 2 dan 5', sw), numi('Ruas putus (swap)', bsw),
          txt('Hasil insertion', ins), numi('Ruas putus (insertion)', bins),
          txt('Hasil inversion 2-5', inv), numi('Ruas putus (inversion)', binv),
          txt('Paling sedikit merusak', ['inversion', 'inversi'])],
        ex: 'Swap: ' + sw + ' → 4 ruas putus. Insertion: ' + ins + ' → ' + bins + ' ruas. Inversion: ' + inv + ' → ' + binv + ' ruas, karena hanya dua ruas di batas segmen yang berubah. Untuk TSP simetris, inversion paling aman diikuti insertion, lalu swap.' },
      { q: 'e. Jelaskan mengapa single-point crossover yang biasa dipakai pada kromosom biner tidak boleh langsung dipakai pada kromosom permutasi, lalu jelaskan kapan sebaiknya memilih OX dan kapan memilih PMX.',
        points: ['Single-point pada permutasi menghasilkan gen ganda dan gen yang hilang, sehingga bukan lagi urutan yang sah',
          'Operator permutasi harus menjaga setiap elemen muncul tepat sekali: OX lewat urutan relatif, PMX lewat mapping',
          'Pilih OX bila urutan relatif yang penting: TSP, routing, penjadwalan urutan kerja',
          'Pilih PMX bila posisi absolut yang penting: penugasan, penempatan pada slot tetap',
          'Selalu periksa hasil crossover: setiap elemen tepat satu kali sebelum dipakai di generasi berikutnya'] }
    ],
    ex: SENDIRI + ' Pola soal Week 5 (PMX vs OX, mutasi permutasi); angka dan kasus bengkel dibuat sendiri.'
  };
}

// ---------------------------------------------------------------- 5. Multi-Objective (NSGA-II)
function mooItem() {
  const S = { R1: [30, 90], R2: [40, 68], R3: [35, 85], R4: [50, 60], R5: [45, 95], R6: [25, 110] };
  const names = Object.keys(S), res = sortFronts(S), F1 = res.fronts[0];
  const cd = crowd(S, F1);
  const cdAll = {}; res.fronts.forEach(f => Object.assign(cdAll, crowd(S, f).cd));
  const rank = {}; res.fronts.forEach((f, i) => f.forEach(p => { rank[p] = i + 1; }));
  const tours = [['R1', 'R2'], ['R3', 'R4'], ['R5', 'R6'], ['R2', 'R6']];
  const win = tours.map(([x, y]) => (rank[x] !== rank[y] ? (rank[x] < rank[y] ? x : y) : cdAll[x] > cdAll[y] ? x : y));
  const cdF = p => (cd.cd[p] === Infinity ? txt('CD ' + p, ['∞', 'inf', 'infinity', 'tak hingga']) : num('CD ' + p, round(cd.cd[p], 2)));
  const cdTxt = p => (cd.cd[p] === Infinity ? '∞' : c(round(cd.cd[p], 2)) + ' = ' + cd.parts[p].join(' + '));
  const order = F1.slice().sort((x, y) => cd.cd[y] - cd.cd[x]);
  const keep = order.slice(0, 4), drop = order.slice(4);
  return {
    type: 'steps',
    q: 'Badan penanggulangan bencana menyusun enam rencana rute armada bantuan. Setiap rencana dinilai dengan dua objektif yang keduanya diminimalkan: f1 = waktu tempuh total (menit) dan f2 = biaya bahan bakar (ribu rupiah).\n' +
      'Keenam rencana sudah dievaluasi: R1 = (30, 90), R2 = (40, 68), R3 = (35, 85), R4 = (50, 60), R5 = (45, 95), R6 = (25, 110).\n' +
      'Catatan: bulatkan crowding distance dan semua hasil hitungan ke 2 angka di belakang koma.',
    table: { head: ['Rencana', 'f1 (menit)', 'f2 (ribu rupiah)'], rows: names.map(p => [p].concat(S[p])) },
    steps: [
      { q: 'a. Hitung n_p (banyak solusi yang mendominasi p) untuk setiap rencana. Sebutkan dengan tepat solusi mana saja yang mendominasi R5.',
        fields: names.map(p => numi('n_p ' + p, res.np[p])).concat([{ label: 'Yang mendominasi R5 (pisahkan spasi)', a: 'R1 R2 R3', set: true }]),
        ex: names.map(p => p + ': n_p = ' + res.np[p]).join(', ') + '. R5 = (45, 95) lebih buruk daripada R1 (30, 90), R2 (40, 68), dan R3 (35, 85) pada kedua objektif sekaligus, jadi ketiganya mendominasi R5. R5 tidak mendominasi siapa pun.' },
      { q: 'b. Tentukan front non-dominated (rank) semua rencana.',
        fields: res.fronts.map((f, i) => ({ label: 'Front ' + (i + 1), a: f.join(' '), set: true })),
        ex: res.fronts.map((f, i) => 'Front ' + (i + 1) + ' = {' + f.join(', ') + '}').join('; ') + '. Front 1 adalah semua yang n_p = 0. R5 baru masuk front 2 setelah R1, R2, dan R3 dikeluarkan dari pertimbangan.' },
      { q: 'c. Hitung crowding distance setiap anggota front 1 (2 desimal). Ingat: rentang dihitung di dalam front itu saja, dan dua ujung tiap objektif bernilai tak hingga.',
        fields: F1.map(cdF).concat([txt('Rencana dengan CD terkecil', drop[0])]),
        ex: 'Urut f1: ' + F1.slice().sort((x, y) => S[x][0] - S[y][0]).join(', ') + '. Rentang f1 = 50 − 25 = 25, rentang f2 = 110 − 60 = 50. ' + ['R1', 'R2', 'R3'].map(p => p + ' = ' + cdTxt(p)).join('; ') + '. R4 dan R6 ujung → ∞. Terkecil ' + drop[0] + ' (' + c(round(cd.cd[drop[0]], 2)) + ').' },
      { q: 'd. Binary tournament: R1 vs R2, R3 vs R4, R5 vs R6, R2 vs R6. Tentukan pemenang tiap pasangan. Rank lebih kecil menang; bila rank sama, crowding distance lebih besar menang.',
        fields: tours.map((t, i) => txt(t.join(' vs '), win[i])),
        ex: tours.map(([x, y], i) => x + ' (rank ' + rank[x] + ', CD ' + (cdAll[x] === Infinity ? '∞' : c(round(cdAll[x], 2))) + ') vs ' + y + ' (rank ' + rank[y] + ', CD ' + (cdAll[y] === Infinity ? '∞' : c(round(cdAll[y], 2))) + ') → ' + win[i] + (rank[x] === rank[y] ? ', diputuskan crowding' : ', diputuskan rank')).join('; ') + '.' },
      { q: 'e. Populasi baru hanya menampung N = 4 rencana, diambil dari front 1. Rencana mana yang bertahan dan mana yang dibuang?',
        fields: [{ label: 'Bertahan', a: keep.join(' '), set: true }, { label: 'Dibuang', a: drop.join(' '), set: true }],
        ex: 'R4 dan R6 pasti bertahan karena CD tak hingga, lalu ' + keep.slice(2).join(' dan ') + ' yang CD-nya terbesar. ' + drop.join(' dan ') + ' dibuang karena berada paling rapat dengan tetangganya, bukan karena solusinya buruk. Ini inti mengapa NSGA-II memakai crowding: rank saja akan membuat populasi bergerombol.' },
      { q: 'f. Jelaskan mengapa NSGA-II tidak cukup memakai weighted sum (skor = w·f1 + (1 − w)·f2), lalu jelaskan arti keputusan yang diambil badan penanggulangan bencana setelah menerima front itu.',
        points: ['Bobot w harus dipilih sebelum melihat trade-off yang tersedia, sehingga hasilnya ditentukan di awal',
          'Pada front yang cekung, sebagian solusi tidak pernah terpilih berapa pun nilai w',
          'NSGA-II mencari seluruh front lebih dulu, lalu pemilihan dilakukan setelah semua opsi terlihat (a posteriori)',
          'Keputusan akhirnya politis dan etis, bukan teknis: berapa biaya yang rela dibayar untuk beberapa menit lebih cepat; algoritma hanya menyiapkan pilihan',
          'Weighted sum tetap wajar bila nilai tukar kedua objektif sudah diketahui, misalnya rupiah per menit yang sudah ada standarnya'] }
    ],
    ex: SENDIRI + ' Data dibuat sendiri mengikuti pola Week 6 (non-dominated sort, crowding distance, tournament rank lalu crowding, fill N), dengan tambahan keputusan setelah front didapat.'
  };
}

const meta = [metaItem()], ga = [gaItem()], cross = [crossItem()], moo = [mooItem()];
module.exports = { meta, ga, tsp, cross, moo };
