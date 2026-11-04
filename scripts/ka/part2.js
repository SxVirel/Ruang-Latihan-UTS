// Kisi-kisi KA bagian 2: kombinatorial vs non-kombinatorial, PMX & OX, GA untuk TSP, latihan slide.
const G = require('./ga.js');
const { id } = G;
const num = (label, a, tol) => ({ label, a, tol });
const txt = (label, a) => ({ label, a });
const SENDIRI = 'Soal buatan sendiri mengikuti slide minggu 5; kunci dihitung dengan kode.';
const S = s => s.split('');
const J = a => a.join('');
const spaced = a => a.join(' ');

// ---------------------------------------------------------------- kombinatorial vs non-kombinatorial
const komb = [];
const KOMB = ['kombinatorial', 'combinatorial', 'diskrit'], NONKOMB = ['non-kombinatorial', 'nonkombinatorial', 'non kombinatorial', 'kontinu', 'continuous', 'non-combinatorial'];

komb.push({ type: 'steps',
  q: 'Sebuah startup menerima enam permintaan optimasi:\n1. Rute kurir mengunjungi 10 toko lalu kembali ke gudang.\n2. Memilih barang dari 12 jenis untuk satu truk berkapasitas 2 ton.\n3. Menyetel tiga parameter PID (Kp, Ki, Kd) bernilai real.\n4. Mencari x di [0, 10] yang memaksimalkan f(x) = x·sin(x).\n5. Menempatkan 6 ujian ke 4 slot waktu.\n6. Mengurutkan 5 pekerjaan pada satu mesin.',
  steps: [
    { q: 'Golongkan tiap permintaan: kombinatorial atau non-kombinatorial.',
      fields: [txt('1', KOMB), txt('2', KOMB), txt('3', NONKOMB), txt('4', NONKOMB), txt('5', KOMB), txt('6', KOMB)],
      ex: 'Kombinatorial: jawabannya susunan, subset, atau penugasan dari elemen diskrit (1, 2, 5, 6). Non-kombinatorial: jawabannya nilai pada ruang kontinu (3, 4).' },
    { q: 'Encoding apa yang paling cocok? Isi: permutasi, biner, integer, atau real.',
      fields: [txt('1 (rute)', ['permutasi', 'permutation']), txt('2 (pilih barang)', ['biner', 'binary']), txt('3 (PID)', ['real', 'real-valued', 'bilangan real']),
        txt('5 (ujian ke slot)', ['integer', 'bilangan bulat']), txt('6 (urutan pekerjaan)', ['permutasi', 'permutation'])],
      ex: 'Rute dan urutan: tiap elemen muncul tepat sekali, jadi permutasi. Pilih barang: ambil/tidak, jadi biner. PID: nilai kontinu, jadi real (atau biner didekode). Ujian ke slot: tiap gen berisi nomor slot, integer.' },
    { q: 'Hitung ukuran ruang pencarian.',
      fields: [num('1: permutasi 10 toko (10!)', 3628800, 0), num('2: subset 12 barang (2^12)', 4096, 0), num('5: 6 ujian ke 4 slot (4^6)', 4096, 0), num('6: urutan 5 pekerjaan (5!)', 120, 0)],
      ex: '10! = 3.628.800. 2^12 = 4.096. 4^6 = 4.096. 5! = 120. Permutasi (n!) tumbuh jauh lebih cepat daripada 2^n: 20 kota saja sudah 20! ≈ 2,4 × 10^18 tur.' },
    { q: 'Mengapa masalah kombinatorial tidak bisa diselesaikan dengan metode berbasis gradien?',
      points: ['Ruangnya diskrit: solusi adalah susunan, bukan titik pada ruang kontinu', 'Tidak ada gradien yang bisa diikuti; susunan hanya bisa dibandingkan satu sama lain',
        'Ukuran ruang tumbuh eksponensial/faktorial sehingga enumerasi juga mustahil', 'Maka dipakai metaheuristik seperti GA dengan operator yang menjaga validitas'] }
  ],
  ex: 'Kategori dan encoding mengikuti slide minggu 2 (Choosing an Encoding) dan minggu 5 (Three Problems You Will Keep Meeting).' });

{
  const P1 = S('ABCDEF'), P2 = S('CFEBDA');
  const [c1, c2] = G.cross1(P1, P2, 3);
  const dup = a => [...new Set(a.filter((g, i) => a.indexOf(g) !== i))].sort();
  const miss = a => S('ABCDEF').filter(g => !a.includes(g));
  komb.push({ type: 'steps',
    q: 'Dua tur TSP 6 kota: P1 = A B C D E F dan P2 = C F E B D A. Seorang mahasiswa memakai single-point crossover seperti pada kromosom biner minggu lalu, dengan potongan setelah gen 3.',
    steps: [
      { q: 'Tulis kedua offspring.', fields: [txt('C1', J(c1)), txt('C2', J(c2))],
        ex: 'ABC|DEF × CFE|BDA → C1 = ' + spaced(c1) + ', C2 = ' + spaced(c2) + '.' },
      { q: 'Kota mana yang muncul dua kali dan kota mana yang hilang pada C1 dan C2?',
        fields: [{ label: 'C1: kota ganda', a: dup(c1).join(' '), set: true }, { label: 'C1: kota hilang', a: miss(c1).join(' '), set: true },
          { label: 'C2: kota ganda', a: dup(c2).join(' '), set: true }, { label: 'C2: kota hilang', a: miss(c2).join(' '), set: true }],
        ex: 'C1 berisi ' + dup(c1).join(' dan ') + ' dua kali, ' + miss(c1).join(' dan ') + ' hilang. C2 berisi ' + dup(c2).join(' dan ') + ' dua kali, ' + miss(c2).join(' dan ') + ' hilang. Keduanya bukan tur buruk, tetapi bukan tur sama sekali.' },
      { q: 'Operator yang sama dipakai pada knapsack biner 6 item: 101|100 × 011|011. Apakah offspring-nya selalu berupa kromosom yang sah? Masalah apa yang masih bisa muncul?',
        fields: [txt('Offspring 1', '101011'), txt('Offspring 2', '011100'), txt('Selalu sah sebagai kromosom? (ya/tidak)', ['ya', 'yes'])],
        ex: 'Setiap string biner adalah subset yang sah, jadi crossover tidak merusak struktur. Yang bisa muncul hanyalah pelanggaran constraint, misalnya total berat melebihi kapasitas, yang ditangani dengan rejection, repair, atau penalty.' },
      { q: 'Jelaskan syarat operator pada encoding permutasi dan dua cara menanganinya.',
        points: ['Setiap kota/elemen harus muncul tepat sekali, jadi offspring harus tetap permutasi yang valid', 'Crossover dan mutasi biasa (cut-and-swap, bit flip) merusak syarat ini',
          'Cara 1: pakai operator khusus permutasi (PMX, OX, cycle crossover; mutasi swap/insertion/inversion)', 'Cara 2: repair (hapus duplikat, sisipkan kota yang hilang), atau tolak offspring'] }
    ],
    ex: 'Contoh dari slide minggu 5 (Why Last Week\'s Crossover Breaks); kunci dihitung dengan kode.' });
}

{
  const bitsFor = (range, prec) => { let n = 1; while ((2 ** n - 1) < range / prec) n++; return n; };
  const nA = bitsFor(50, 0.01);
  komb.push({ type: 'steps',
    q: 'Empat masalah berikut harus dikodekan sebelum GA dijalankan.\nA. Menyetel tiga gain kontroler, masing-masing di [0, 50] dengan presisi sekitar 0,01.\nB. Memilih armada yang berangkat dari 20 mobil boks untuk hari ini.\nC. Menentukan urutan 12 mesin yang memproses satu batch.\nD. Menempatkan 30 ujian ke 8 slot waktu.',
    steps: [
      { q: 'Untuk A memakai encoding biner. Berapa bit minimal per variabel agar langkah (x_max − x_min)/(2^n − 1) ≤ 0,01? Berapa panjang total kromosom, dan berapa langkah sebenarnya?',
        fields: [num('Bit per variabel', nA, 0), num('Panjang kromosom', 3 * nA, 0), num('Langkah sebenarnya (5 desimal)', G.round(50 / (2 ** nA - 1), 5), 0.00002)],
        ex: 'Butuh 2^n − 1 ≥ 50/0,01 = 5.000. 2^12 − 1 = 4.095 kurang, 2^13 − 1 = 8.191 cukup: 13 bit. Tiga variabel: 39 bit. Langkah = 50/8.191 ≈ ' + id(50 / 8191, 5) + '.' },
      { q: 'Tentukan encoding dan ukuran ruang pencarian B, C, D.',
        fields: [txt('B: encoding', ['biner', 'binary']), num('B: ukuran ruang (2^20)', 1048576, 0), txt('C: encoding', ['permutasi', 'permutation']), num('C: ukuran ruang (12!)', 479001600, 0),
          txt('D: encoding', ['integer', 'bilangan bulat']), num('D: ruang = 8^k, k', 30, 0)],
        ex: 'B: tiap mobil berangkat/tidak, 2^20 = 1.048.576. C: urutan, 12! = 479.001.600. D: tiap ujian berisi slot 1-8, 8^30 ≈ 1,24 × 10^27.' },
      { q: 'Kapan encoding perlu dipertimbangkan ulang? Jelaskan dengan pertanyaan panduan dari slide.',
        points: ['Pertanyaan panduan: jika satu gen diubah sedikit, apakah solusinya juga berubah sedikit?', 'Jika tidak (misalnya Hamming cliff pada biner), encoding perlu ditinjau ulang',
          'Encoding yang mengikuti struktur masalah membuat pencarian lebih efektif', 'Encoding menentukan bentuk ruang yang dicari algoritma, bukan detail teknis'] }
    ],
    ex: 'Masalah A-D dari latihan slide minggu 2 (Choose an Encoding); hitungan bit dan ruang dihitung dengan kode.' });
}

{
  const items = [{ n: 'Laptop', w: 4, v: 9 }, { n: 'Kamera', w: 2, v: 6 }, { n: 'Gitar', w: 5, v: 7 }, { n: 'Jaket', w: 3, v: 4 }, { n: 'Buku', w: 1, v: 2 }];
  const cap = 9, pen = 3;
  const pop = { K1: '11001', K2: '10110', K3: '01011', K4: '11101' }, names = Object.keys(pop);
  const W = b => G.sum(b.split('').map((x, i) => (x === '1' ? items[i].w : 0))), V = b => G.sum(b.split('').map((x, i) => (x === '1' ? items[i].v : 0)));
  const F = b => V(b) - pen * Math.max(0, W(b) - cap);
  const [o1, o2] = G.cross1(pop.K2, pop.K3, 2);
  // Repair: drop the carried item with the smallest value per kg until the bag fits.
  const rb = pop.K4.split(''), dropped = [];
  while (W(rb.join('')) > cap) {
    let k = -1;
    rb.forEach((x, i) => { if (x === '1' && (k < 0 || items[i].v / items[i].w < items[k].v / items[k].w)) k = i; });
    rb[k] = '0'; dropped.push(items[k].n);
  }
  const rep = rb.join('');
  komb.push({ type: 'steps',
    q: 'Knapsack: tas berkapasitas ' + cap + ' kg, pilih barang agar nilai total maksimal. Kromosom biner 5 gen (1 = dibawa) dengan urutan barang sesuai tabel. Kromosom yang kelebihan berat tidak dibuang, melainkan diberi penalty: fitness = nilai − ' + pen + ' × kelebihan berat.',
    table: { head: ['Gen', 'Barang', 'Berat (kg)', 'Nilai'], rows: items.map((it, i) => [i + 1, it.n, it.w, it.v]) },
    steps: [
      { q: 'Populasi: ' + names.map(n => n + ' = ' + pop[n]).join(', ') + '. Hitung berat, nilai, dan fitness tiap kromosom.',
        fields: [].concat(...names.map(n => [num('Berat ' + n, W(pop[n]), 0), num('Fitness ' + n, F(pop[n]), 0)])),
        ex: names.map(n => n + ': berat ' + W(pop[n]) + ', nilai ' + V(pop[n]) + (W(pop[n]) > cap ? ', lebih ' + (W(pop[n]) - cap) + ' kg, fitness ' + V(pop[n]) + ' − ' + pen + '×' + (W(pop[n]) - cap) + ' = ' + F(pop[n]) : ', fitness ' + F(pop[n]))).join('. ') + '.' },
      { q: 'K2 dan K3 disilangkan dengan single-point setelah gen 2. Tulis offspring dan fitness-nya.',
        fields: [txt('O1', o1), num('Fitness O1', F(o1), 0), txt('O2', o2), num('Fitness O2', F(o2), 0)],
        ex: '10|110 × 01|011 → O1 = ' + o1 + ' (berat ' + W(o1) + ', nilai ' + V(o1) + ', fitness ' + F(o1) + '), O2 = ' + o2 + ' (berat ' + W(o2) + ', nilai ' + V(o2) + ', fitness ' + F(o2) + '). Strukturnya selalu sah, yang bisa dilanggar hanya kapasitas.' },
      { q: 'Repair untuk K4: buang barang dengan rasio nilai/berat terkecil sampai muat. Barang mana yang dibuang dan bagaimana kromosomnya?',
        fields: [{ label: 'Barang yang dibuang (pisahkan spasi)', a: dropped.join(' '), set: true }, txt('Kromosom setelah repair', rep), num('Nilai setelah repair', V(rep), 0)],
        ex: 'Rasio nilai/berat: ' + items.map(x => x.n + ' ' + id(x.v / x.w, 2)).join(', ') + '. K4 = ' + pop.K4 + ' berat ' + W(pop.K4) + ' kg. Dibuang: ' + dropped.join(', ') + ', jadi ' + rep + ' (berat ' + W(rep) + ', nilai ' + V(rep) + ').' },
      { q: 'Knapsack ini optimumnya tepat di batas kapasitas. Mengapa penalty sering lebih baik daripada rejection atau repair pada kasus seperti ini?',
        points: ['Rejection membuang terlalu banyak kromosom saat solusi feasible langka, pencarian macet', 'Repair mendorong solusi menjauh dari batas dan merusak informasi (bias aturan repair)',
          'Penalty membiarkan pencarian melewati daerah infeasible menuju optimum di batas', 'Bobot penalty harus di-tuning: terlalu kecil solusi infeasible menang, terlalu besar sama dengan rejection'] }
    ],
    ex: SENDIRI });
}

{
  const dur = { J1: 4, J2: 2, J3: 6, J4: 3, J5: 5 };
  const total = o => { let t = 0, s = 0; for (const j of o) { t += dur[j]; s += t; } return s; };
  const comp = o => { let t = 0; return o.map(j => (t += dur[j])); };
  const P1 = ['J3', 'J1', 'J5', 'J2', 'J4'], P2 = ['J2', 'J4', 'J1', 'J5', 'J3'];
  const o = G.ox(P1, P2, 2, 3).child, spt = Object.keys(dur).sort((a, b) => dur[a] - dur[b]);
  komb.push({ type: 'steps',
    q: 'Bengkel percetakan punya 5 pekerjaan yang dikerjakan satu per satu di satu mesin. Durasi (jam): J1 = 4, J2 = 2, J3 = 6, J4 = 3, J5 = 5. Tujuan: meminimalkan total waktu selesai (jumlah waktu selesai semua pekerjaan). Kromosom permutasi berisi urutan pengerjaan.',
    steps: [
      { q: 'Hitung waktu selesai tiap pekerjaan dan total waktu selesai untuk P1 = J3 J1 J5 J2 J4 dan P2 = J2 J4 J1 J5 J3.',
        fields: [num('Waktu selesai pekerjaan terakhir P1', comp(P1)[4], 0), num('Total waktu selesai P1', total(P1), 0), num('Total waktu selesai P2', total(P2), 0)],
        ex: 'P1: selesai ' + comp(P1).join(', ') + ', total ' + total(P1) + '. P2: selesai ' + comp(P2).join(', ') + ', total ' + total(P2) + '.' },
      { q: 'Lakukan Order Crossover (OX) dengan segmen posisi 2-3 dari P1. Tulis urutan baca P2 mulai posisi 4, sisa setelah membuang gen segmen, offspring, dan total waktu selesainya.',
        fields: [txt('Urutan baca P2 dari posisi 4', J(G.ox(P1, P2, 2, 3).read)), txt('Offspring OX', J(o)), num('Total waktu selesai offspring', total(o), 0)],
        ex: 'Segmen J1 J5 tetap di posisi 2-3. Baca P2 dari posisi 4: ' + spaced(G.ox(P1, P2, 2, 3).read) + '. Buang J1, J5: ' + spaced(G.ox(P1, P2, 2, 3).rest) + '. Isi posisi 4, 5, 1: ' + spaced(o) + '. Total ' + total(o) + '.' },
      { q: 'Urutan optimal untuk tujuan ini adalah Shortest Processing Time (durasi terpendek dulu). Tulis urutan itu dan totalnya.',
        fields: [txt('Urutan SPT', J(spt)), num('Total waktu selesai', total(spt), 0)],
        ex: 'SPT: ' + spaced(spt) + ', selesai ' + comp(spt).join(', ') + ', total ' + total(spt) + '. Masalah sekecil ini punya aturan eksak, jadi GA tidak perlu: sesuai slide "jangan pakai metaheuristik jika solusi analitis ada".' },
      { q: 'Jika pekerjaan juga harus dibagi ke dua mesin, apa yang berubah pada encoding?',
        points: ['Solusi menjadi permutasi + assignment (urutan dan mesin)', 'Contoh encoding: pasangan (pekerjaan, mesin) per gen, misalnya 2A 1B 4A …',
          'Operator harus menjaga urutan tetap permutasi sekaligus memilih mesin yang sah', 'Ruang pencarian membesar menjadi n! × 2^n'] }
    ],
    ex: SENDIRI });
}

{
  const P1 = [1.2, -0.5, 3.7, 2.1], P2 = [-0.3, 1.8, 0.2, 4.0], a = 0.35;
  const c1 = P1.map((x, i) => a * x + (1 - a) * P2[i]), c2 = P1.map((x, i) => (1 - a) * x + a * P2[i]);
  komb.push({ type: 'steps',
    q: 'Masalah non-kombinatorial: GA dengan encoding real menyetel empat bobot. Induk P1 = (1,2; −0,5; 3,7; 2,1) dan P2 = (−0,3; 1,8; 0,2; 4,0).',
    steps: [
      { q: 'Arithmetic crossover dengan α = 0,35: C1 = α·P1 + (1 − α)·P2 dan C2 = (1 − α)·P1 + α·P2, gen per gen. Hitung C1 dan C2 (3 desimal).',
        fields: c1.map((x, i) => num('C1 gen ' + (i + 1), G.round(x, 3), 0.002)).concat(c2.map((x, i) => num('C2 gen ' + (i + 1), G.round(x, 3), 0.002))),
        ex: 'C1 = ' + c1.map(x => id(x, 3)).join('; ') + '. C2 = ' + c2.map(x => id(x, 3)).join('; ') + '. Nilai baru yang tidak ada di kedua induk bisa muncul, berbeda dengan crossover kombinatorial.' },
      { q: 'Apakah single-point crossover (potong setelah gen 2) juga sah di sini? Tulis offspring pertamanya.',
        fields: [txt('Sah? (ya/tidak)', ['ya', 'yes']), txt('Offspring pertama', ['1,2 -0,5 0,2 4,0', '1.2 -0.5 0.2 4.0'])],
        ex: '(1,2; −0,5 | 0,2; 4,0). Setiap gen real tetap berada di domainnya, jadi crossover pemotongan selalu sah; namun arithmetic crossover biasanya lebih baik karena bisa membuat nilai di antara induk.' },
      { q: 'Kromosom integer penjadwalan (slot 1-8) dimutasi. Bandingkan random reset dan creep, dan mana yang lebih cocok untuk jadwal ujian menurut studi kasus slide.',
        fields: [txt('Lebih cocok untuk jadwal ujian', ['random reset', 'random-reset'])],
        ex: 'Random reset mengganti gen dengan slot acak 1-8; creep menambah/mengurangi 1. Pada jadwal, slot 3 dan slot 4 tidak "mirip", nomor slot hanya label, jadi creep tidak masuk akal: random reset 602 konflik vs creep 630.' },
      { q: 'Simpulkan perbedaan operator untuk masalah kombinatorial dan non-kombinatorial.',
        points: ['Non-kombinatorial (real/integer): crossover potong dan uniform selalu sah; arithmetic crossover membuat nilai baru', 'Mutasi real: geser nilai sedikit (creep/gaussian), selama tetanggaan bermakna',
          'Kombinatorial (permutasi): operator biasa menghasilkan duplikat/hilang, perlu PMX/OX dan mutasi swap/insertion/inversion', 'Representasi menentukan operator yang tepat'] }
    ],
    ex: 'Induk diambil dari slide minggu 3 (Crossover Beyond Binary) dengan 4 gen pertama; rumus α ditulis eksplisit di soal, kunci dihitung dengan kode.' });
}

// ---------------------------------------------------------------- PMX & OX
const cross = [];
function crossItem(cfg) {
  const { P1, P2, a, b } = cfg;
  const px1 = G.pmx(P1, P2, a, b), px2 = G.pmx(P2, P1, a, b), ox1 = G.ox(P1, P2, a, b), ox2 = G.ox(P2, P1, a, b);
  const chain = px1.chains.map(c => 'posisi ' + c.pos + ': ' + c.path.join(' → ')).join('; ');
  const steps = [
    { q: 'PMX, offspring 1 (segmen posisi ' + a + '-' + b + ' dari P1). Tulis segmen yang disalin, lalu offspring-nya.',
      fields: [txt('Segmen dari P1', J(P1.slice(a - 1, b))), txt('Offspring 1 PMX', J(px1.child))],
      ex: 'Mapping: ' + px1.map.map(([u, v]) => u + '↔' + v).join(', ') + '. Isi posisi lain dari P2; jika gennya sudah ada di segmen, ikuti mapping. ' + (chain ? 'Rantai mapping: ' + chain + '. ' : '') + 'Hasil: ' + spaced(px1.child) + '.' },
    { q: 'PMX, offspring 2 (peran dibalik: segmen dari P2, sisa dari P1).',
      fields: [txt('Offspring 2 PMX', J(px2.child))],
      ex: 'Mapping: ' + px2.map.map(([u, v]) => u + '↔' + v).join(', ') + '. ' + (px2.chains.length ? 'Rantai: ' + px2.chains.map(c => 'posisi ' + c.pos + ': ' + c.path.join(' → ')).join('; ') + '. ' : '') + 'Hasil: ' + spaced(px2.child) + '.' },
    { q: 'OX, offspring 1 (segmen posisi ' + a + '-' + b + ' dari P1). Tulis urutan baca P2 mulai posisi ' + (b + 1) + ' (melingkar), sisa setelah membuang gen segmen, lalu offspring.',
      fields: [txt('Urutan baca P2', J(ox1.read)), txt('Sisa setelah dibuang', J(ox1.rest)), txt('Offspring 1 OX', J(ox1.child))],
      ex: 'Baca P2 dari posisi ' + (b + 1) + ': ' + spaced(ox1.read) + '. Buang ' + P1.slice(a - 1, b).join(', ') + ': ' + spaced(ox1.rest) + '. Isi posisi ' + (b + 1) + '…' + P1.length + ' lalu 1…' + (a - 1) + ': ' + spaced(ox1.child) + '.' },
    { q: 'OX, offspring 2 (segmen dari P2, urutan dibaca dari P1).',
      fields: [txt('Offspring 2 OX', J(ox2.child))],
      ex: 'Baca P1 dari posisi ' + (b + 1) + ': ' + spaced(ox2.read) + '. Buang ' + P2.slice(a - 1, b).join(', ') + ': ' + spaced(ox2.rest) + '. Hasil: ' + spaced(ox2.child) + '.' }
  ];
  if (cfg.extra) steps.push(...cfg.extra(px1, ox1));
  return { type: 'steps', q: cfg.q, steps, ex: cfg.ex || SENDIRI };
}

cross.push(crossItem({ P1: S('DACBFE'), P2: S('BEFCAD'), a: 3, b: 4,
  q: 'Dua rute pengiriman 6 kota: P1 = D A C B F E dan P2 = B E F C A D. Segmen = posisi 3 sampai 4.',
  extra: (px1, ox1) => {
    const same = px1.child.map((g, i) => (g === ox1.child[i] ? i + 1 : 0)).filter(Boolean);
    const diff = px1.child.map((g, i) => (g !== ox1.child[i] ? i + 1 : 0)).filter(Boolean);
    return [{ q: 'Periksa offspring 1 PMX dan offspring 1 OX: apakah setiap kota muncul tepat sekali? Di posisi mana saja gen kedua offspring sama?',
      fields: [txt('Semua valid? (ya/tidak)', ['ya', 'yes']), { label: 'Posisi yang gennya sama', a: same.join(' '), set: true }],
      ex: 'PMX ' + spaced(px1.child) + ', OX ' + spaced(ox1.child) + '. Keduanya permutasi sah. Segmen (posisi 3-4) pasti sama; posisi ' + same.filter(p => p < 3 || p > 4).join(', ') +
        ' kebetulan juga sama, sedangkan posisi ' + diff.join(', ') + ' berbeda karena PMX mewarisi posisi absolut P2 dan OX mewarisi urutan relatif P2.' }];
  } }));

cross.push(crossItem({ P1: S('12345678'), P2: S('37516824'), a: 3, b: 5,
  q: 'Penjadwalan 8 pekerjaan (1-8). P1 = 1 2 3 4 5 6 7 8 dan P2 = 3 7 5 1 6 8 2 4. Segmen = posisi 3 sampai 5. Perhatikan: PMX kadang perlu mengikuti mapping lebih dari sekali.',
  extra: () => [{ q: 'Mengapa mapping PMX harus diulang sampai gen tidak lagi berada di segmen?',
    points: ['Gen hasil mapping pertama bisa ternyata juga ada di segmen yang disalin', 'Jika langsung dipakai, offspring berisi duplikat',
      'Mapping diulang (rantai) sampai mendapat gen yang belum dipakai', 'Hasil akhirnya tetap permutasi yang valid'] }] }));

cross.push(crossItem({ P1: S('GBDAECF'), P2: S('CEAFGDB'), a: 2, b: 4,
  q: 'Robot gudang mengunjungi 7 rak (A-G). P1 = G B D A E C F, P2 = C E A F G D B. Segmen = posisi 2 sampai 4.' }));

cross.push(crossItem({ P1: S('942615378'), P2: S('287341956'), a: 4, b: 6,
  q: 'Urutan 9 pekerjaan perakitan. P1 = 9 4 2 6 1 5 3 7 8 dan P2 = 2 8 7 3 4 1 9 5 6. Segmen = posisi 4 sampai 6.' }));

cross.push({ type: 'steps',
  q: 'Tim memilih operator crossover untuk empat masalah permutasi berbeda.\nA. Rute TSP 30 kota (yang penting kota mana bersebelahan).\nB. Menempatkan 10 dosen ke 10 ruang ujian, satu dosen per ruang (yang penting dosen X di ruang Y).\nC. Urutan kunjungan teknisi ke pelanggan.\nD. Penugasan 8 mesin ke 8 posisi lini produksi.',
  steps: [
    { q: 'PMX atau OX untuk tiap masalah?', fields: [txt('A', ['OX', 'order crossover']), txt('B', ['PMX', 'partially mapped crossover']), txt('C', ['OX', 'order crossover']), txt('D', ['PMX', 'partially mapped crossover'])],
      ex: 'Pertanyaan panduan: jika seluruh urutan digeser satu posisi, apakah solusinya memburuk? Rute (A, C) tidak memburuk, posisi tidak penting: OX menjaga urutan relatif. Penugasan (B, D) memburuk, posisi penting: PMX menjaga posisi absolut.' },
    { q: 'Isi tabel perbandingan.',
      fields: [txt('PMX menjaga', ['posisi', 'posisi absolut', 'absolute position']), txt('OX menjaga', ['urutan', 'urutan relatif', 'relative order']),
        txt('Mekanisme perbaikan PMX', ['mapping', 'pemetaan']), txt('Mekanisme perbaikan OX', ['tidak ada', 'tidak perlu', 'none', 'diisi berurutan'])],
      ex: 'PMX memperbaiki konflik lewat mapping antarsegmen. OX tidak butuh perbaikan: sisa posisi diisi berurutan dari induk kedua tanpa duplikat.' },
    { q: 'Mengapa offspring PMX dan OX berbeda walaupun memakai segmen yang sama dari induk yang sama?',
      points: ['Segmen dari P1 sama di kedua operator', 'PMX mengisi sisa posisi dengan gen P2 di posisi yang sama (diperbaiki lewat mapping)',
        'OX mengisi sisa posisi dengan urutan P2 mulai setelah segmen, mengabaikan posisi aslinya', 'Jadi PMX mewarisi posisi, OX mewarisi urutan'] }
  ],
  ex: 'Panduan pemilihan dari slide minggu 5 (PMX or OX?).' });

// ---------------------------------------------------------------- TSP
const tsp = [];
function tspPop(D, pop) { return Object.fromEntries(Object.entries(pop).map(([k, t]) => [k, G.tourLen(S(t), D)])); }

{
  const D = G.dist(['AB 7', 'AC 9', 'AD 8', 'AE 5', 'BC 4', 'BD 6', 'BE 9', 'CD 3', 'CE 7', 'DE 4']);
  const pop = { T1: 'ABDCE', T2: 'ACBED', T3: 'ADBCE', T4: 'AEBDC' }, names = Object.keys(pop), L = tspPop(D, pop);
  const fit = names.map(n => 1 / L[n]), w = G.wheel(fit);
  const r = [0.60, 0.40], par = r.map(x => names[G.pick(w.cum, x)]);
  const o1 = G.ox(S(pop[par[0]]), S(pop[par[1]]), 2, 4).child, o2 = G.ox(S(pop[par[1]]), S(pop[par[0]]), 2, 4).child;
  const Lo1 = G.tourLen(o1, D), Lo2 = G.tourLen(o2, D);
  const worse = Lo1 >= Lo2 ? o1 : o2, inv = G.invert(worse, 2, 4), Linv = G.tourLen(inv, D);
  tsp.push({ type: 'steps',
    q: 'Kurir di Bandung mengunjungi 5 lokasi (A-E) dalam satu putaran yang kembali ke lokasi awal. Jarak (km) ada di tabel. Kromosom = urutan kunjungan, fitness = 1 / panjang tur.',
    table: G.distTable(S('ABCDE'), D),
    steps: [
      { q: 'Hitung panjang tur dan fitness (5 desimal) untuk T1 = A B D C E, T2 = A C B E D, T3 = A D B C E, T4 = A E B D C. Jangan lupa ruas terakhir kembali ke kota awal.',
        fields: [].concat(...names.map((n, i) => [num('Panjang ' + n, L[n], 0), num('Fitness ' + n, G.round(fit[i], 5), 0.00002)])),
        ex: names.map(n => n + ': ' + S(pop[n]).map((c, k, t) => c + t[(k + 1) % t.length]).map(e => D[e[0]][e[1]]).join(' + ') + ' = ' + L[n]).join('. ') + '.' },
      { q: 'Hitung probabilitas kumulatif roulette (4 desimal), lalu pilih dua induk dengan r = 0,60 dan 0,40.',
        fields: names.map((n, i) => num('Kumulatif ' + n, G.round(w.cum[i], 4), 0.0012)).concat([txt('Induk 1', par[0]), txt('Induk 2', par[1])]),
        ex: 'Total fitness ' + id(w.tot, 5) + '. P = ' + w.p.map(p => id(p, 4)).join('; ') + '. r = 0,60 → ' + par[0] + ', r = 0,40 → ' + par[1] + '. Fitness 1/L membuat peluang sangat mirip (semua sekitar 25%): contoh "fitness values too close".' },
      { q: 'Lakukan OX dengan segmen posisi 2-4. Offspring 1: segmen dari induk 1, urutan dari induk 2. Offspring 2: kebalikannya. Hitung panjang keduanya.',
        fields: [txt('Offspring 1', J(o1)), num('Panjang offspring 1', Lo1, 0), txt('Offspring 2', J(o2)), num('Panjang offspring 2', Lo2, 0)],
        ex: 'Offspring 1 = ' + spaced(o1) + ' (' + Lo1 + ' km). Offspring 2 = ' + spaced(o2) + ' (' + Lo2 + ' km). Tiap kota tetap muncul tepat sekali, dan kedua anak lebih pendek dari kedua induknya (' + L[par[0]] + ' dan ' + L[par[1]] + ' km).' },
      { q: 'Offspring yang lebih panjang dimutasi dengan inversion posisi 2-4 (urutan di dalam segmen dibalik). Tulis tur baru dan panjangnya. Berapa ruas (adjacency) yang berubah?',
        fields: [txt('Tur setelah inversion', J(inv)), num('Panjang', Linv, 0), num('Ruas yang berubah', G.broken(worse, inv), 0)],
        ex: spaced(worse) + ' → ' + spaced(inv) + ' (' + Linv + ' km). Inversion hanya memutus 2 ruas di ujung segmen; ruas di dalam segmen tetap ada, hanya arahnya terbalik, dan pada TSP simetris arah tidak berpengaruh.' },
      { q: 'Jelaskan mengapa fitness = 1 / panjang dan mengapa operator OX + inversion cocok untuk TSP.',
        points: ['TSP adalah minimasi, roulette butuh fitness besar untuk tur pendek: 1/L membalik urutan dan selalu positif', 'Kromosom TSP permutasi, jadi crossover harus menjaga setiap kota muncul tepat sekali',
          'Yang penting di TSP adalah urutan relatif (kota bersebelahan), dan OX menjaga urutan itu', 'Inversion merusak ruas paling sedikit (2), jadi struktur tur terjaga'] }
    ],
    ex: SENDIRI });
}

{
  const D = G.dist(['AB 4', 'AC 7', 'AD 9', 'AE 8', 'AF 3', 'BC 3', 'BD 8', 'BE 9', 'BF 6', 'CD 4', 'CE 7', 'CF 9', 'DE 3', 'DF 8', 'EF 5']);
  const P1 = S('AFCDBE'), P2 = S('CABDEF');
  const px = G.pmx(P1, P2, 3, 4).child, oxc = G.ox(P1, P2, 3, 4).child;
  const L = t => G.tourLen(t, D);
  tsp.push({ type: 'steps',
    q: 'Enam titik pengantaran makanan (A-F) dengan jarak pada tabel (km). Dua tur induk: P1 = A F C D B E dan P2 = C A B D E F. Segmen crossover = posisi 3-4.',
    table: G.distTable(S('ABCDEF'), D),
    steps: [
      { q: 'Hitung panjang P1 dan P2.', fields: [num('Panjang P1', L(P1), 0), num('Panjang P2', L(P2), 0)],
        ex: 'P1: ' + L(P1) + ' km. P2: ' + L(P2) + ' km.' },
      { q: 'Buat offspring dengan OX dan dengan PMX (segmen dari P1, sisa dari P2), lalu hitung panjangnya.',
        fields: [txt('Offspring OX', J(oxc)), num('Panjang OX', L(oxc), 0), txt('Offspring PMX', J(px)), num('Panjang PMX', L(px), 0)],
        ex: 'OX: baca P2 dari posisi 5 (' + spaced(G.ox(P1, P2, 3, 4).read) + '), buang C, D, isi posisi 5, 6, 1, 2 → ' + spaced(oxc) + ' (' + L(oxc) + ' km). PMX: mapping C↔B, D↔D → ' + spaced(px) + ' (' + L(px) + ' km).' },
      { q: 'Bandingkan hasilnya dengan induk. Apa yang ditunjukkan contoh ini?',
        points: ['Offspring OX lebih pendek dari kedua induk: crossover yang menjaga urutan bisa menggabungkan bagian baik dua tur', 'Kedua induk hanya sedang, tetapi anaknya jauh lebih baik',
          'OX menjaga urutan relatif P2, cocok untuk TSP', 'PMX menjaga posisi absolut, kurang bermakna untuk tur melingkar'] }
    ],
    ex: 'Induk dari studi kasus slide minggu 5 (Six Deliveries in One Round); jarak dibuat sendiri, jadi panjangnya berbeda dari slide. Kunci dihitung dengan kode.' });
}

tsp.push({ type: 'steps',
  q: 'Perusahaan logistik mempertimbangkan GA untuk TSP dengan jumlah kota yang terus bertambah. Kromosom memakai encoding permutasi tanpa kota awal tetap.',
  steps: [
    { q: 'Isi tabel untuk n = 6, 8, dan 10 kota.',
      fields: [num('6 kota: permutasi', 720, 0), num('6 kota: tur unik (n!/2n)', 60, 0), num('8 kota: permutasi', 40320, 0), num('8 kota: tur unik', 2520, 0), num('10 kota: permutasi', 3628800, 0), num('10 kota: tur unik', 181440, 0)],
      ex: 'Tiap tur ditulis oleh 2n kromosom (n titik awal × 2 arah). 720/12 = 60; 40.320/16 = 2.520; 3.628.800/20 = 181.440.' },
    { q: 'Jika titik awal ditetapkan (misalnya selalu mulai dari gudang A), berapa permutasi yang perlu dicari untuk 10 kota, dan berapa panjang kromosomnya?',
      fields: [num('Permutasi ((n − 1)!)', 362880, 0), num('Panjang kromosom', 9, 0)],
      ex: 'Gudang tetap di depan, jadi hanya 9 kota sisanya yang diurutkan: 9! = 362.880 dan kromosom 9 gen.' },
    { q: 'Mengapa banyaknya kromosom yang mewakili tur sama penting diketahui?',
      points: ['Dua induk yang terlihat sangat berbeda bisa ternyata tur yang sama (beda titik awal atau arah)', 'Crossover antara keduanya tidak menghasilkan apa pun yang baru',
        'Ruang pencarian efektif lebih kecil dari n!', 'Bisa diatasi dengan menetapkan kota awal (normalisasi)'] }
  ],
  ex: 'Hitungan 2n mengikuti slide minggu 5 (How Many Chromosomes Are the Same Tour?).' });

{
  const D = G.dist(['AB 5', 'AC 9', 'AD 12', 'AE 10', 'AF 4', 'BC 4', 'BD 9', 'BE 11', 'BF 8', 'CD 5', 'CE 8', 'CF 10', 'DE 4', 'DF 11', 'EF 6']);
  const T = S('ABCDEF'), sw = G.swap(T, 2, 5), ins = G.insert(T, 2, 5), inv = G.invert(T, 2, 5);
  const L = t => G.tourLen(t, D);
  tsp.push({ type: 'steps',
    q: 'Teknisi ISP mengunjungi 6 pelanggan (A-F). Tur saat ini T = A B C D E F, jarak pada tabel (km). Tim membandingkan tiga operator mutasi permutasi pada posisi 2 dan 5.',
    table: G.distTable(S('ABCDEF'), D),
    steps: [
      { q: 'Hitung panjang T.', fields: [num('Panjang T', L(T), 0)], ex: 'A-B-C-D-E-F-A = ' + L(T) + ' km.' },
      { q: 'Swap posisi 2 dan 5. Tulis tur baru, panjangnya, dan jumlah ruas yang berubah.',
        fields: [txt('Tur', J(sw)), num('Panjang', L(sw), 0), num('Ruas berubah', G.broken(T, sw), 0)],
        ex: spaced(sw) + ', ' + L(sw) + ' km, ' + G.broken(T, sw) + ' ruas putus (dua di sekitar tiap posisi yang ditukar).' },
      { q: 'Insertion: ambil gen di posisi 2, sisipkan ke posisi 5.',
        fields: [txt('Tur', J(ins)), num('Panjang', L(ins), 0), num('Ruas berubah', G.broken(T, ins), 0)],
        ex: spaced(ins) + ', ' + L(ins) + ' km, ' + G.broken(T, ins) + ' ruas putus.' },
      { q: 'Inversion posisi 2 sampai 5.',
        fields: [txt('Tur', J(inv)), num('Panjang', L(inv), 0), num('Ruas berubah', G.broken(T, inv), 0)],
        ex: spaced(inv) + ', ' + L(inv) + ' km, ' + G.broken(T, inv) + ' ruas putus. Ruas di dalam segmen tetap, hanya arahnya terbalik.' },
      { q: 'Urutkan ketiga operator dari disruption terkecil, dan hubungkan dengan hasil studi kasus 40 kota di slide.',
        points: ['Inversion (2 ruas) < insertion (3 ruas) < swap (4 ruas)', 'Studi kasus 40 kota: rata-rata panjang tur swap 730, insertion 616, inversion 562',
          'Operator yang paling sedikit merusak ruas menjaga struktur tur, sehingga menemukan tur lebih pendek', 'Semua operator tetap menghasilkan permutasi valid'] }
    ],
    ex: SENDIRI });
}

{
  const D = G.dist(['AB 6', 'AC 4', 'AD 9', 'AE 7', 'AF 5', 'BC 5', 'BD 4', 'BE 8', 'BF 9', 'CD 6', 'CE 3', 'CF 8', 'DE 5', 'DF 7', 'EF 4']);
  const pop = { R1: 'ABDCEF', R2: 'ACEDBF', R3: 'AFEDCB', R4: 'ADBFCE', R5: 'ACBDEF', R6: 'AEFBDC' };
  const names = Object.keys(pop), L = tspPop(D, pop);
  const tours = [['R4', 'R2'], ['R6', 'R4'], ['R3', 'R5'], ['R1', 'R6']];
  const win = tours.map(([u, v]) => (L[u] <= L[v] ? u : v));
  const o1 = G.ox(S(pop[win[0]]), S(pop[win[1]]), 3, 5).child, o2 = G.ox(S(pop[win[1]]), S(pop[win[0]]), 3, 5).child;
  const best = names.reduce((b, n) => (L[n] < L[b] ? n : b), names[0]);
  tsp.push({ type: 'steps',
    q: 'Robot penyiram taman mengunjungi 6 titik (A-F) lalu kembali ke titik awal. Populasi berisi 6 rute. Seleksi memakai binary tournament (rute yang lebih pendek menang) dan elitisme k = 1.',
    table: G.distTable(S('ABCDEF'), D),
    steps: [
      { q: 'Hitung panjang setiap rute: ' + names.map(n => n + ' = ' + spaced(S(pop[n]))).join(', ') + '.',
        fields: names.map(n => num('Panjang ' + n, L[n], 0)),
        ex: names.map(n => n + ' = ' + L[n]).join(', ') + ' km. Rute terbaik ' + best + ' (' + L[best] + ' km).' },
      { q: 'Empat turnamen mengambil pasangan acak ' + tours.map(p => '(' + p.join(', ') + ')').join(', ') + '. Siapa pemenang tiap turnamen?',
        fields: tours.map((p, i) => txt('Turnamen ' + (i + 1), win[i])),
        ex: tours.map((p, i) => p[0] + ' ' + L[p[0]] + ' vs ' + p[1] + ' ' + L[p[1]] + ' → ' + win[i]).join('; ') + '. Tournament tidak butuh fitness 1/L: cukup membandingkan panjang.' },
      { q: 'Pemenang turnamen 1 dan 2 menjadi induk. Lakukan OX dengan segmen posisi 3-5 (offspring 1: segmen dari induk 1). Tulis kedua offspring dan panjangnya.',
        fields: [txt('Offspring 1', J(o1)), num('Panjang offspring 1', G.tourLen(o1, D), 0), txt('Offspring 2', J(o2)), num('Panjang offspring 2', G.tourLen(o2, D), 0)],
        ex: 'Induk ' + win[0] + ' × ' + win[1] + '. Offspring 1 = ' + spaced(o1) + ' (' + G.tourLen(o1, D) + ' km), offspring 2 = ' + spaced(o2) + ' (' + G.tourLen(o2, D) + ' km).' },
      { q: 'Rute mana yang dibawa ke generasi berikutnya oleh elitisme k = 1? Jelaskan keuntungan tournament dibanding roulette pada TSP.',
        fields: [txt('Rute elit', best)],
        ex: best + ' adalah rute terpendek (' + L[best] + ' km), jadi disalin tanpa diubah. Tournament tidak peka skala dan tidak perlu transformasi minimasi ke fitness; tekanan seleksi diatur dengan k. Slide: GA yang di-tuning (tournament, elitism, inversion 0,2) mencapai 567 melawan Tabu 572.' }
    ],
    ex: SENDIRI });
}

{
  const D = G.dist(['01 4', '02 6', '03 5', '04 7', '05 3', '12 3', '13 6', '14 8', '15 5', '23 4', '24 6', '25 7', '34 3', '35 6', '45 5']);
  const tour = p => ['0'].concat(p);
  const P1 = S('31524'), P2 = S('25143'), L = p => G.tourLen(tour(p), D);
  const o = G.ox(P1, P2, 2, 4).child, inv = G.invert(o, 1, 3);
  tsp.push({ type: 'steps',
    q: 'Robot gudang selalu berangkat dan kembali ke dok 0, lalu mengambil barang di rak 1-5. Karena dok tetap, kromosom hanya berisi urutan 5 rak; rute = 0 → rak sesuai kromosom → 0. Jarak pada tabel (meter).',
    table: G.distTable(S('012345'), D),
    steps: [
      { q: 'Hitung panjang rute untuk P1 = 3 1 5 2 4 dan P2 = 2 5 1 4 3.',
        fields: [num('Panjang P1', L(P1), 0), num('Panjang P2', L(P2), 0)],
        ex: 'P1: 0-3-1-5-2-4-0 = ' + L(P1) + '. P2: 0-2-5-1-4-3-0 = ' + L(P2) + '.' },
      { q: 'OX dengan segmen posisi 2-4 dari P1. Tulis offspring dan panjang rutenya.',
        fields: [txt('Urutan baca P2 dari posisi 5', J(G.ox(P1, P2, 2, 4).read)), txt('Offspring', J(o)), num('Panjang rute', L(o), 0)],
        ex: 'Segmen 1 5 2. Baca P2 dari posisi 5 (melingkar): ' + spaced(G.ox(P1, P2, 2, 4).read) + '. Buang 1, 5, 2: ' + spaced(G.ox(P1, P2, 2, 4).rest) + '. Isi posisi 5 lalu 1: ' + spaced(o) + ' (' + L(o) + ' m).' },
      { q: 'Mutasi inversion posisi 1-3 pada offspring. Tulis urutan baru dan panjangnya.',
        fields: [txt('Setelah inversion', J(inv)), num('Panjang rute', L(inv), 0)],
        ex: spaced(o) + ' → ' + spaced(inv) + ' (' + L(inv) + ' m).' },
      { q: 'Apa keuntungan menetapkan dok sebagai titik awal tetap pada encoding ini?',
        points: ['Kromosom lebih pendek (5 gen, bukan 6)', 'Ruang pencarian turun dari 6! = 720 menjadi 5! = 120',
          'Rotasi tur yang sama tidak lagi muncul sebagai kromosom berbeda', 'Operator permutasi (OX, inversion) tetap bisa dipakai apa adanya'] }
    ],
    ex: SENDIRI });
}

// ---------------------------------------------------------------- latihan slide (setara LKS)
const lks = [];

lks.push({ type: 'steps',
  q: 'Latihan slide minggu 2 (Decode Three Chromosomes). Domain x ∈ [−5, 5], panjang kromosom n = 6. Dekode dengan x = x_min + (x_max − x_min)/(2^n − 1) × d.',
  steps: [
    { q: 'Hitung d dan x untuk 101010, 000111, dan 111111 (4 desimal).',
      fields: [num('d 101010', 42, 0), num('x 101010', 1.6667, 0.0006), num('d 000111', 7, 0), num('x 000111', -3.8889, 0.0006), num('d 111111', 63, 0), num('x 111111', 5, 0.0006)],
      ex: 'Langkah = 10/63 ≈ 0,1587. 101010 = 42 → −5 + 42 × 10/63 = 1,6667. 000111 = 7 → −3,8889. 111111 = 63 → 5.' },
    { q: 'Kromosom mana yang menghasilkan x = 5 tepat, dan mana yang menghasilkan x = −5?',
      fields: [txt('x = 5', '111111'), txt('x = −5', '000000')],
      ex: 'd maksimum (63) memetakan ke x_max, d = 0 ke x_min. Biner kecil → x kecil, biner besar → x besar.' },
    { q: 'Berapa bit minimal agar langkahnya tidak lebih dari 0,01 pada domain yang sama?',
      fields: [num('Bit minimal', 10, 0)],
      ex: 'Butuh 2^n − 1 ≥ 10/0,01 = 1.000. 2^10 − 1 = 1.023 cukup, 2^9 − 1 = 511 belum. Jadi 10 bit.' }
  ],
  ex: 'Latihan slide; kunci dihitung sendiri karena slide tidak memberi jawaban.' });

lks.push({ type: 'steps',
  q: 'Latihan slide minggu 2 (Two Variables in One Chromosome). Kromosom 12 bit: 6 bit pertama mengodekan x ∈ [0, 20], 6 bit terakhir mengodekan y ∈ [−10, 10]. Kromosom: 101101 001110.',
  steps: [
    { q: 'Ubah tiap blok ke desimal (0-63), lalu petakan ke x dan y (4 desimal).',
      fields: [num('Desimal blok x', 45, 0), num('x', 14.2857, 0.0006), num('Desimal blok y', 14, 0), num('y', -5.5556, 0.0006)],
      ex: '101101 = 45 → x = 0 + 45 × 20/63 = 14,2857. 001110 = 14 → y = −10 + 14 × 20/63 = −5,5556.' },
    { q: 'Berapa perubahan terkecil x dan y yang bisa diwakili encoding ini?',
      fields: [num('Resolusi x', 0.3175, 0.0006), num('Resolusi y', 0.3175, 0.0006)],
      ex: 'Resolusi = rentang / (2^6 − 1) = 20/63 ≈ 0,3175 untuk keduanya, karena rentang x dan y sama-sama 20.' },
    { q: 'Jika kedua variabel butuh presisi yang sama, berapa bit seharusnya tiap blok?',
      fields: [txt('Jawaban', ['sama', 'sama banyak', '6', '6 bit', 'sama, 6 bit'])],
      ex: 'Bit yang dibutuhkan bergantung pada rentang/presisi. Rentang x dan y sama (20), jadi jumlah bitnya sama; di sini 6 bit masing-masing.' }
  ],
  ex: 'Latihan slide; kunci dihitung sendiri.' });

{
  const pop = { A: ['10110', 5.40], B: ['01001', 2.15], C: ['11100', 7.85], D: ['00011', 1.60], E: ['10001', 4.00] };
  const names = Object.keys(pop), w = G.wheel(names.map(n => pop[n][1]));
  const r = [0.08, 0.33, 0.61, 0.94], par = r.map(x => names[G.pick(w.cum, x)]);
  lks.push({ type: 'steps',
    q: 'Latihan slide minggu 2 (Roulette Wheel Against the Clock). Lima individu: A = 10110 (f = 5,40), B = 01001 (f = 2,15), C = 11100 (f = 7,85), D = 00011 (f = 1,60), E = 10001 (f = 4,00). Pilih empat induk dengan roulette wheel.',
    steps: [
      { q: 'Hitung total fitness dan P tiap individu (4 desimal).',
        fields: [num('Total', 21, 0.001)].concat(names.map((n, i) => num('P ' + n, G.round(w.p[i], 4), 0.0006))),
        ex: 'Total 21,00. P = ' + names.map((n, i) => n + ' ' + id(w.p[i], 4)).join(', ') + '.' },
      { q: 'Tulis kolom kumulatif (harus berakhir tepat 1,0000).',
        fields: names.map((n, i) => num('Kumulatif ' + n, G.round(w.cum[i], 4), 0.0012)),
        ex: 'Kumulatif: ' + w.cum.map(c => id(c, 4)).join('; ') + '.' },
      { q: 'Pilih induk untuk r = 0,08; 0,33; 0,61; 0,94.',
        fields: r.map((x, i) => txt('r = ' + id(x, 2), par[i])),
        ex: r.map((x, i) => id(x, 2) + ' → ' + par[i]).join(', ') + '. D (fitness terkecil) tidak terpilih kali ini, tetapi tetap punya peluang 7,6%.' }
    ],
    ex: 'Latihan slide; kunci dihitung sendiri.' });
}

{
  const P1 = '11010011', P2 = '01101101';
  const a3 = G.cross1(P1, P2, 3), a5 = G.cross1(P1, P2, 5), u = G.uniform(P1, P2, '01100101', 'P2');
  const diff = [...a3[0]].filter((g, i) => g !== a5[0][i]).length;
  lks.push({ type: 'steps',
    q: 'Latihan slide minggu 3 (Uniform Crossover and the Cut-Point Trap). P1 = 11010011, P2 = 01101101.',
    steps: [
      { q: 'Single-point crossover: tulis offspring untuk potongan setelah gen 3, lalu setelah gen 5.',
        fields: [txt('Potong 3: offspring 1', a3[0]), txt('Potong 3: offspring 2', a3[1]), txt('Potong 5: offspring 1', a5[0]), txt('Potong 5: offspring 2', a5[1])],
        ex: '110|10011 × 011|01101 → ' + a3[0] + ', ' + a3[1] + '. 11010|011 × 01101|101 → ' + a5[0] + ', ' + a5[1] + '.' },
      { q: 'Berapa gen yang berbeda antara offspring 1 potongan 3 dan offspring 1 potongan 5?',
        fields: [num('Gen berbeda', diff, 0)],
        ex: a3[0] + ' vs ' + a5[0] + ': berbeda ' + diff + ' gen, yaitu di antara kedua titik potong (gen 4-5), dan hanya di posisi yang nilai induknya berbeda.' },
      { q: 'Uniform crossover dengan mask 01100101, di mana 1 berarti ambil gen dari P2 dan 0 dari P1. Tulis offspring-nya.',
        fields: [txt('Offspring uniform', u[0])],
        ex: 'Per posisi mengikuti mask → ' + u[0] + '.' },
      { q: 'Di posisi mana keempat offspring single-point dan offspring uniform pasti sama? Mengapa?',
        fields: [{ label: 'Posisi', a: '2 8', set: true }],
        ex: 'P1 dan P2 sama-sama bernilai 1 di posisi 2 dan 8. Crossover hanya memilih gen dari salah satu induk, jadi posisi yang sama di kedua induk pasti sama di semua offspring.' }
    ],
    ex: 'Latihan slide; kunci dihitung sendiri.' });
}

{
  const A = '100110', B = '011001';
  const c2 = G.cross1(A, B, 2), c4 = G.cross1(A, B, 4), c1 = G.cross1(A, B, 1);
  lks.push({ type: 'steps',
    q: 'Latihan slide minggu 3 (Read the Instruction Exactly). A = 100110, B = 011001. Gen dinomori dari kiri ke kanan; potongan dibuat SETELAH gen yang disebut.',
    steps: [
      { q: 'Task A: potong setelah gen 2, lalu setelah gen 4. Tulis kedua pasang offspring.',
        fields: [txt('Setelah gen 2: offspring 1', c2[0]), txt('Setelah gen 2: offspring 2', c2[1]), txt('Setelah gen 4: offspring 1', c4[0]), txt('Setelah gen 4: offspring 2', c4[1])],
        ex: '10|0110 × 01|1001 → ' + c2[0] + ', ' + c2[1] + '. 1001|10 × 0110|01 → ' + c4[0] + ', ' + c4[1] + '.' },
      { q: 'Task B: mutasi gen 3 pada A dan gen 6 pada B.',
        fields: [txt('A setelah mutasi', G.flip(A, 3)), txt('B setelah mutasi', G.flip(B, 6))],
        ex: 'A: 100110 → ' + G.flip(A, 3) + '. B: 011001 → ' + G.flip(B, 6) + '.' },
      { q: 'Task C: seorang teman membaca "potong setelah gen 2" sebagai "potong sebelum gen 2" (artinya setelah gen 1). Offspring apa yang ia dapat, dan berapa gen meleset dari jawaban yang benar?',
        fields: [txt('Offspring 1 teman', c1[0]), txt('Offspring 2 teman', c1[1]), num('Gen yang meleset per offspring', 1, 0)],
        ex: '1|00110 × 0|11001 → ' + c1[0] + ', ' + c1[1] + '. Dibanding ' + c2[0] + ' dan ' + c2[1] + ', hanya gen 2 yang berbeda. A dan B saling komplemen (beda di semua posisi), jadi setiap salah baca titik potong langsung mengubah gen.' }
    ],
    ex: 'Latihan slide; kunci dihitung sendiri.' });
}

{
  const pop = { A: ['01011', 3.2], B: ['11010', 6.4], C: ['00110', 1.8], D: ['10001', 4.6] };
  const names = Object.keys(pop), w = G.wheel(names.map(n => pop[n][1]));
  const r = [0.18, 0.55, 0.72, 0.95], par = r.map(x => names[G.pick(w.cum, x)]);
  const o = [].concat(G.cross1(pop[par[0]][0], pop[par[1]][0], 2), G.cross1(pop[par[2]][0], pop[par[3]][0], 2));
  lks.push({ type: 'steps',
    q: 'Latihan slide minggu 3 (Complete a Generation Yourself). Populasi empat individu, memaksimalkan f: A = 01011 (f = 3,2), B = 11010 (f = 6,4), C = 00110 (f = 1,8), D = 10001 (f = 4,6). Pakai 4 desimal.',
    steps: [
      { q: 'Langkah 1-2: isi tabel total fitness, probabilitas, dan kumulatif.',
        fields: [num('Total', 16, 0.001)].concat(names.map((n, i) => num('P ' + n, G.round(w.p[i], 4), 0.0006)), names.map((n, i) => num('Kumulatif ' + n, G.round(w.cum[i], 4), 0.0012))),
        ex: 'Total 16,0. P = ' + w.p.map(p => id(p, 4)).join('; ') + '. Kumulatif ' + w.cum.map(p => id(p, 4)).join('; ') + '.' },
      { q: 'Langkah 3: pakai r = 0,18; 0,55; 0,72; 0,95 untuk memilih empat induk (berurutan).',
        fields: r.map((x, i) => txt('r = ' + id(x, 2), par[i])),
        ex: r.map((x, i) => id(x, 2) + ' → ' + par[i]).join(', ') + '. Pasangan 2 berisi D dua kali.' },
      { q: 'Langkah 4: single-point crossover setelah gen 2 pada setiap pasangan.',
        fields: o.map((x, i) => txt('Offspring ' + (i + 1), x)),
        ex: 'Pasangan 1 (' + par[0] + ' × ' + par[1] + ') → ' + o[0] + ', ' + o[1] + '. Pasangan 2 (D × D) → ' + o[2] + ', ' + o[3] + ': induk identik menghasilkan anak identik. Crossover tidak gagal, hanya tidak ada yang bisa digabung.' },
      { q: 'Langkah 5-6: mutasi gen 4 pada offspring pertama. Dengan elitisme k = 1, individu mana yang dibawa dari populasi lama?',
        fields: [txt('Offspring 1 setelah mutasi', G.flip(o[0], 4)), txt('Individu elit', ['B', '11010'])],
        ex: o[0] + ' → ' + G.flip(o[0], 4) + '. Elit = B (f = 6,4), menggantikan offspring terburuk setelah offspring dievaluasi.' }
    ],
    ex: 'Latihan slide; kunci dihitung sendiri.' });
}

lks.push({ type: 'steps',
  q: 'Latihan slide minggu 3 (Mutation Rate Arithmetic). Kromosom 40 gen, populasi 60 individu.',
  steps: [
    { q: 'Task A: pm = 1/n. Rata-rata berapa gen berubah per kromosom, dan berapa di seluruh populasi per generasi?',
      fields: [num('Per kromosom', 1, 0), num('Per populasi', 60, 0)], ex: '40 × 1/40 = 1; 60 × 1 = 60.' },
    { q: 'Task B: pm = 0,5. Berapa gen berubah per kromosom? Algoritma menjadi apa?',
      fields: [num('Per kromosom', 20, 0), txt('Menjadi', ['random search', 'pencarian acak', 'acak'])],
      ex: '40 × 0,5 = 20: setengah kromosom diacak setiap generasi, jadi GA menjadi random search.' },
    { q: 'Task C: pm = 0,001. Rata-rata berapa generasi sebelum satu kromosom tertentu bermutasi? Berapa mutasi per generasi di seluruh populasi?',
      fields: [num('Generasi menunggu', 25, 0), num('Mutasi per generasi (populasi)', 2.4, 0.001)],
      ex: 'Per kromosom 40 × 0,001 = 0,04 mutasi per generasi, jadi menunggu 1/0,04 = 25 generasi. Per populasi 60 × 0,04 = 2,4.' },
    { q: 'Mana yang lebih cepat terlihat pada kurva fitness terbaik: pm = 0,5 atau pm = 0,001? Jelaskan.',
      points: ['pm = 0,5 langsung terlihat: kurva naik turun tanpa kemajuan karena populasi diacak setiap generasi', 'pm = 0,001 terlihat lambat: kurva mendatar karena tidak ada materi baru (stagnasi)',
        'Keduanya salah arah: terlalu tinggi merusak, terlalu rendah membekukan', 'Sesuaikan pm dengan tingkat kesulitan masalah, titik awal 1/n'] }
  ],
  ex: 'Latihan slide; kunci dihitung sendiri.' });

lks.push({ type: 'steps',
  q: 'Latihan slide minggu 1 (Feel the Size of the Space). Jadwal awal: 30 ujian ke 8 slot, jadi 8^30 ≈ 1,24 × 10^27 kemungkinan.',
  steps: [
    { q: 'Question A: fakultas menambah 2 slot (10 slot). Berapa jadwal sekarang (10^k), dan berapa kali lebih besar?',
      fields: [num('k', 30, 0), num('Kali lebih besar (2 desimal)', 807.79, 0.5)],
      ex: '10^30. (10/8)^30 = 1,25^30 ≈ 807,79 kali.' },
    { q: 'Question B: lima mata kuliah baru (35 ujian, tetap 8 slot). Berapa kali lebih besar?',
      fields: [num('Kali lebih besar', 32768, 0)], ex: '8^35 / 8^30 = 8^5 = 32.768 kali.' },
    { q: 'Question C: satu jadwal diubah dengan memindah satu ujian ke slot lain. Berapa tetangga seperti itu yang dimiliki setiap jadwal?',
      fields: [num('Tetangga', 210, 0)], ex: '30 ujian × 7 slot lain = 210 tetangga (sama dengan slide Hill Climbing).' },
    { q: 'Mana yang lebih berat: menambah slot atau menambah ujian? Jelaskan dalam satu kalimat.',
      fields: [txt('Lebih berat', ['menambah ujian', 'tambah ujian', 'ujian'])],
      ex: 'Jumlah ujian adalah pangkat (slot^ujian), jadi setiap ujian baru mengalikan ruang dengan 8, sedangkan slot baru hanya mengubah basisnya.' }
  ],
  ex: 'Latihan slide; kunci dihitung sendiri.' });

module.exports = { komb, cross, tsp, lks };
