// Kisi-kisi KA bagian 1: konsep GA, proses satu generasi (biner), scheduling pekan 3.
const G = require('./ga.js');
const { id } = G;
const num = (label, a, tol) => ({ label, a, tol });
const txt = (label, a) => ({ label, a });
const SENDIRI = 'Soal buatan sendiri mengikuti slide minggu 1-3; kunci dihitung dengan kode.';

// ---------------------------------------------------------------- one binary generation
// Full trace used by several items: decode, fitness, wheel, parents, crossover, mutation, elitism.
function binTrace(c) {
  const fit = c.bits.map(b => c.fit(b));
  const w = G.wheel(fit);
  const par = c.r.map(r => G.pick(w.cum, r));
  const off = [].concat(
    G.cross1(c.bits[par[0]], c.bits[par[1]], c.cuts[0]),
    G.cross1(c.bits[par[2]], c.bits[par[3]], c.cuts[1]));
  const mutated = off.slice();
  for (const [o, g] of c.mut) mutated[o] = G.flip(mutated[o], g);
  const offFit = mutated.map(b => c.fit(b));
  const best = fit.indexOf(Math.max(...fit));
  const worst = offFit.indexOf(Math.min(...offFit));
  const next = mutated.slice(); next[worst] = c.bits[best];
  const nextFit = offFit.slice(); nextFit[worst] = fit[best];
  return { fit, w, par, off, mutated, offFit, best, worst, next, nextFit,
    meanOld: G.sum(fit) / fit.length, meanNew: G.sum(nextFit) / nextFit.length };
}

function binSteps(c, t, opt) {
  const N = c.names, d = opt.fd, md = Math.max(d, 2); // decimals for fitness and for means
  const fits = t.fit.slice().sort((x, y) => y - x), offs = t.offFit.slice().sort((x, y) => x - y);
  if (fits[0] === fits[1] || offs[0] === offs[1]) throw new Error('tie in best parent or worst offspring: ' + c.bits.join(' '));
  const steps = [];
  if (opt.decode) {
    steps.push({ q: opt.decode.q, fields: c.bits.map((b, i) => num('x ' + N[i] + ' (' + b + ')', G.round(opt.decode.x(b), 3), 0.002)),
      ex: opt.decode.ex });
  }
  steps.push({ q: opt.fitQ, fields: c.bits.map((b, i) => num('f ' + N[i], G.round(t.fit[i], d), opt.ftol)).concat([num('Total fitness', G.round(t.w.tot, d), opt.ftol * 2)]),
    ex: opt.fitEx || c.bits.map((b, i) => N[i] + ' = ' + id(t.fit[i], d)).join(', ') + '. Total = ' + id(t.w.tot, d) + '.' });
  steps.push({ q: 'Hitung probabilitas seleksi P = f / total dan probabilitas kumulatif tiap kromosom (4 desimal).',
    fields: [].concat(c.bits.map((b, i) => num('P ' + N[i], G.round(t.w.p[i], 4), 0.0006)),
      c.bits.map((b, i) => num('Kumulatif ' + N[i], G.round(t.w.cum[i], 4), 0.0012))),
    ex: c.bits.map((b, i) => N[i] + ': ' + id(t.w.p[i], 4) + ' (kumulatif ' + id(t.w.cum[i], 4) + ')').join('; ') + '. Kumulatif terakhir harus tepat 1,0000.' });
  steps.push({ q: 'Putar roulette wheel dengan r = ' + c.r.map(r => id(r, 2)).join('; ') + '. Kromosom terpilih adalah yang kumulatifnya pertama kali ≥ r. Dua r pertama membentuk pasangan 1, dua berikutnya pasangan 2.',
    fields: c.r.map((r, i) => txt('Induk dari r = ' + id(r, 2), [N[t.par[i]], c.bits[t.par[i]]])),
    ex: c.r.map((r, i) => 'r = ' + id(r, 2) + ' jatuh di ' + N[t.par[i]]).join(', ') + '. Pasangan 1 = (' + N[t.par[0]] + ', ' + N[t.par[1]] + '), pasangan 2 = (' + N[t.par[2]] + ', ' + N[t.par[3]] + ').' +
      (t.par[2] === t.par[3] || t.par[0] === t.par[1] ? ' Satu pasangan berisi kromosom yang sama: crossover tetap jalan, tetapi anaknya kembar dengan induknya.' : '') });
  steps.push({ q: 'Lakukan single-point crossover: pasangan 1 dipotong setelah gen ' + c.cuts[0] + ', pasangan 2 setelah gen ' + c.cuts[1] + '. Tulis keempat offspring (O1, O2 dari pasangan 1; O3, O4 dari pasangan 2).',
    fields: t.off.map((o, i) => txt('O' + (i + 1), o)),
    ex: 'Pasangan 1: ' + c.bits[t.par[0]].slice(0, c.cuts[0]) + '|' + c.bits[t.par[0]].slice(c.cuts[0]) + ' × ' + c.bits[t.par[1]].slice(0, c.cuts[0]) + '|' + c.bits[t.par[1]].slice(c.cuts[0]) +
      ' → ' + t.off[0] + ' dan ' + t.off[1] + '. Pasangan 2: ' + c.bits[t.par[2]].slice(0, c.cuts[1]) + '|' + c.bits[t.par[2]].slice(c.cuts[1]) + ' × ' + c.bits[t.par[3]].slice(0, c.cuts[1]) + '|' + c.bits[t.par[3]].slice(c.cuts[1]) +
      ' → ' + t.off[2] + ' dan ' + t.off[3] + '.' });
  steps.push({ q: 'Mutasi bit flip: ' + c.mut.map(([o, g]) => 'gen ' + g + ' pada O' + (o + 1)).join(' dan ') + ' dibalik. Tulis kromosom hasil mutasi, lalu hitung fitness keempat offspring setelah mutasi.',
    fields: c.mut.map(([o]) => txt('O' + (o + 1) + ' setelah mutasi', t.mutated[o])).concat(t.mutated.map((b, i) => num('f O' + (i + 1), G.round(t.offFit[i], d), opt.ftol))),
    ex: c.mut.map(([o, g]) => 'O' + (o + 1) + ': ' + t.off[o] + ' → ' + t.mutated[o]).join('; ') + '. Fitness: ' + t.mutated.map((b, i) => 'O' + (i + 1) + ' = ' + id(t.offFit[i], d)).join(', ') + '.' });
  steps.push({ q: 'Terapkan elitisme k = 1: kromosom terbaik populasi lama menggantikan offspring terburuk. Isi offspring yang diganti, rata-rata fitness populasi lama dan baru, serta fitness terbaik populasi baru.',
    fields: [txt('Offspring yang diganti', ['O' + (t.worst + 1), t.mutated[t.worst]]),
      num('Rata-rata fitness lama', G.round(t.meanOld, md), opt.ftol), num('Rata-rata fitness baru', G.round(t.meanNew, md), opt.ftol),
      num('Fitness terbaik baru', G.round(Math.max(...t.nextFit), d), opt.ftol)],
    ex: 'Elit = ' + N[t.best] + ' (' + c.bits[t.best] + ', f = ' + id(t.fit[t.best], d) + '). Offspring terburuk O' + (t.worst + 1) + ' (f = ' + id(t.offFit[t.worst], d) + ') diganti. Populasi baru: ' +
      t.next.join(', ') + '. Rata-rata ' + id(t.meanOld, md) + ' → ' + id(t.meanNew, md) + '.' });
  return steps;
}

// ---------------------------------------------------------------- konsep
const konsep = [];

konsep.push({ type: 'steps',
  q: 'Bagian akademik FIF harus menempatkan 40 ujian ke dalam 10 slot waktu. Dua ujian yang diikuti mahasiswa yang sama akan bentrok jika berada di slot yang sama. Panitia meminta jadwal dengan bentrok sesedikit mungkin, dan jadwal harus jadi besok pagi.',
  steps: [
    { q: 'Setiap ujian boleh ditaruh di slot mana pun. Berapa banyak jadwal yang mungkin? Jika komputer memeriksa 10^9 jadwal per detik, berapa lama enumerasi penuh (1 tahun ≈ 3,15 × 10^7 detik)?',
      fields: [num('Banyak jadwal = 10^k, k', 40, 0), num('Lama enumerasi ≈ 10^k tahun, k', 23, 0)],
      ex: 'Tiap ujian punya 10 pilihan, jadi 10^40 jadwal. Waktu = 10^40 / 10^9 = 10^31 detik ≈ 10^31 / (3,15 × 10^7) ≈ 3,2 × 10^23 tahun. Enumerasi tidak lambat lagi, tetapi mustahil.' },
    { q: 'Panitia mempertimbangkan dua perubahan: menambah 2 slot (jadi 12 slot) atau menambah 5 ujian (jadi 45 ujian). Berapa kali ruang pencarian membesar untuk masing-masing? Perubahan mana yang lebih memperbesar ruang pencarian?',
      fields: [num('Slot jadi 12: membesar (kali)', 1469.77, 1), num('Ujian jadi 45: membesar (kali)', 100000, 0), txt('Lebih memperbesar', ['menambah ujian', 'tambah ujian', 'ujian', 'menambah 5 ujian'])],
      ex: '12^40 / 10^40 = 1,2^40 ≈ 1.469,77 kali. 10^45 / 10^40 = 10^5 = 100.000 kali. Jumlah ujian adalah pangkat, jadi menambah ujian jauh lebih berat daripada menambah slot.' },
    { q: 'Jelaskan mengapa masalah ini diselesaikan dengan metaheuristik (misalnya GA), bukan dengan blind search seperti BFS atau informed search seperti A*.',
      points: ['Ruang pencarian 10^40 terlalu besar untuk dienumerasi atau ditelusuri BFS/A*',
        'Yang dicari adalah susunan (arrangement) terbaik, bukan jalur dari start ke goal',
        'Metaheuristik mencari solusi yang cukup baik dalam waktu yang tersedia, tanpa jaminan optimal',
        'Bisa dihentikan kapan saja dan tetap punya solusi (anytime)'],
      model: 'BFS dan A* menelusuri jalur langkah demi langkah dan menjamin solusi (A* optimal jika heuristiknya admissible), tetapi pada 10^40 kemungkinan biayanya tidak terjangkau. Penjadwalan juga bukan masalah jalur: yang dinilai hanya susunan akhirnya. Metaheuristik seperti GA tidak menjamin optimum, tetapi memberi jadwal yang cukup baik sebelum batas waktu, dan selalu punya solusi terbaik sementara jika dihentikan.' },
    { q: 'Golongkan setiap algoritma: trajectory-based (satu solusi bergerak) atau population-based (banyak solusi sekaligus).',
      fields: [txt('Hill Climbing', ['trajectory', 'trajectory-based', 'trajektori']), txt('Simulated Annealing', ['trajectory', 'trajectory-based', 'trajektori']),
        txt('Tabu Search', ['trajectory', 'trajectory-based', 'trajektori']), txt('Genetic Algorithm', ['population', 'population-based', 'populasi'])],
      ex: 'Hill Climbing, Simulated Annealing, dan Tabu Search menggerakkan satu solusi; bedanya hanya cara lolos dari local optimum (tidak ada, peluang, memori). GA menjalankan satu populasi yang saling bertukar informasi lewat crossover.' },
    { q: 'Sebutkan kelebihan dan kelemahan GA dibanding Hill Climbing untuk kasus ini.',
      points: ['GA: banyak solusi menjelajah beberapa daerah sekaligus, lebih tahan terhadap local optimum',
        'GA: solusi bertukar informasi lewat crossover (building block digabung)',
        'GA: lebih mahal (banyak evaluasi per generasi) dan banyak parameter yang harus diatur',
        'Hill Climbing: cepat, sederhana, hemat memori, tetapi mudah terjebak di local optimum'] }
  ],
  ex: SENDIRI });

konsep.push({ type: 'steps',
  q: 'PT Kirim Kilat memakai GA untuk menentukan urutan kunjungan 8 titik antar (A sampai H) dalam satu putaran yang kembali ke titik awal. Satu kromosom adalah satu urutan kunjungan, misalnya B E A H C G D F. GA memakai populasi 30 rute dan berjalan 50 generasi.',
  steps: [
    { q: 'Isi besaran berikut.',
      fields: [num('Panjang kromosom (jumlah gen)', 8, 0), num('Ukuran populasi', 30, 0), num('Banyak permutasi (n!)', 40320, 0),
        num('Kromosom berbeda untuk satu rute yang sama (2n)', 16, 0), num('Rute unik (n! / 2n)', 2520, 0)],
      ex: '8! = 40.320 permutasi. Satu rute melingkar bisa dimulai dari 8 titik dan ditempuh 2 arah, jadi 2 × 8 = 16 kromosom menggambarkan rute yang sama. 40.320 / 16 = 2.520 rute unik.' },
    { q: 'Jelaskan arti gen, alel, kromosom, individu, populasi, dan generasi pada kasus ini.',
      points: ['Gen: satu posisi dalam urutan (titik ke-i yang dikunjungi)', 'Alel: nilai gen, yaitu nama titik antar (A-H)',
        'Kromosom: satu urutan lengkap 8 titik = satu rute', 'Individu: satu rute beserta nilai fitness-nya',
        'Populasi: 30 rute yang hidup di satu generasi', 'Generasi: satu siklus evaluasi, seleksi, crossover, mutasi, dan pembentukan populasi baru'] },
    { q: 'Berapa kali fungsi fitness dihitung selama 50 generasi (setiap generasi mengevaluasi seluruh populasi)?',
      fields: [num('Jumlah evaluasi', 1500, 0)],
      ex: 'Evaluasi = ukuran populasi × generasi = 30 × 50 = 1.500. Di slide, 4 individu × 20 generasi = 80 evaluasi. Angka ini yang dibandingkan saat menyebut "budget evaluasi".' },
    { q: 'GA meminjam tiga mekanisme seleksi alam. Sebutkan ketiganya beserta padanannya di algoritma.',
      points: ['Variation: individu berbeda-beda ↔ populasi berisi kromosom yang beragam', 'Inheritance: sifat induk diturunkan ↔ crossover menggabungkan bagian dua induk',
        'Differential selection: yang lebih fit punya lebih banyak keturunan ↔ seleksi berdasarkan nilai fitness'] }
  ],
  ex: SENDIRI });

konsep.push({ type: 'steps',
  q: 'Tim asisten menjalankan GA untuk jadwal praktikum dengan kromosom 40 gen dan populasi 60 individu. Mereka belum yakin dengan laju mutasi (pm) yang dipakai.',
  steps: [
    { q: 'Hitung jumlah gen yang berubah karena mutasi untuk setiap pilihan pm.',
      fields: [num('pm = 1/n: gen berubah per kromosom', 1, 0), num('pm = 1/n: gen berubah per generasi (populasi)', 60, 0),
        num('pm = 0,5: gen berubah per kromosom', 20, 0), num('pm = 0,001: rata-rata generasi sampai satu kromosom tertentu bermutasi', 25, 0)],
      ex: 'Rata-rata gen berubah = n × pm. pm = 1/40 memberi 1 gen per kromosom, 60 gen per populasi. pm = 0,5 memberi 20 gen per kromosom: setengah kromosom diacak, jadi GA berubah menjadi random search. pm = 0,001 memberi 0,04 per kromosom per generasi, jadi rata-rata menunggu 1/0,04 = 25 generasi.' },
    { q: 'Dari tiap gejala, tentukan parameter yang diubah dan arahnya (naik/turun).',
      table: { head: ['Gejala', 'Yang terlihat'], rows: [
        ['A', 'Fitness terbaik berhenti membaik di generasi 12, dan semua kromosom di populasi sudah identik.'],
        ['B', 'Setelah 200 generasi, fitness rata-rata populasi naik turun tanpa pola dan tidak pernah stabil.'],
        ['C', 'Fitness terbaik kadang turun dari satu generasi ke generasi berikutnya.']] },
      fields: [txt('A: parameter', ['pm', 'mutasi', 'mutation rate', 'laju mutasi']), txt('A: arah', ['naik', 'naikkan', 'dinaikkan', 'lebih besar']),
        txt('B: parameter', ['pm', 'mutasi', 'mutation rate', 'laju mutasi']), txt('B: arah', ['turun', 'turunkan', 'diturunkan', 'lebih kecil']),
        txt('C: yang ditambahkan', ['elitisme', 'elitism', 'elit', 'k'])],
      ex: 'A: diversitas habis (stagnasi) karena eksplorasi terlalu lemah, naikkan pm (atau kurangi tekanan seleksi). B: mutasi terlalu tinggi sehingga populasi rusak terus setiap generasi, turunkan pm. C: tanpa elitisme solusi terbaik bisa hilang; dengan elitisme k ≥ 1 kurva fitness terbaik tidak pernah turun.' },
    { q: 'Jelaskan exploration dan exploitation pada GA, dan operator atau parameter apa yang mendorong masing-masing.',
      points: ['Exploration: mencari di daerah yang belum dikunjungi; mencegah terjebak, tetapi konvergen lambat',
        'Exploitation: memperdalam daerah yang sudah baik; konvergen cepat, tetapi berisiko local optimum',
        'Mutasi, populasi besar, dan tekanan seleksi rendah mendorong exploration',
        'Crossover (menggabung building block), seleksi kuat, dan elitisme mendorong exploitation',
        'Keduanya berbagi budget komputasi yang sama; tidak ada rasio yang selalu benar'] }
  ],
  ex: SENDIRI });

konsep.push({ type: 'steps',
  q: 'Sebuah GA jadwal memakai populasi 10 individu. Panitia membandingkan empat strategi replacement (penggantian populasi) dan memutuskan memakai elitisme.',
  steps: [
    { q: 'Berapa individu yang diganti offspring setiap generasi pada tiap strategi?',
      fields: [num('Generational', 10, 0), num('Elitist generational, k = 2', 8, 0), num('Steady-state (ganti 2 per generasi)', 2, 0), num('Replace-worst (offspring masuk jika mengalahkan yang terburuk)', 1, 0)],
      ex: 'Generational mengganti semuanya (100%). Elitist k = 2 menyimpan 2 terbaik, 8 diganti (80%). Steady-state hanya 1-2 individu (di sini 2, 20%). Replace-worst mengganti 1 individu terburuk (10%) dan tekanan seleksinya paling tinggi.' },
    { q: 'Apa yang dijamin elitisme, dan apa risikonya jika k terlalu besar?',
      points: ['k individu terbaik disalin tanpa diubah ke generasi berikutnya', 'Solusi terbaik sejauh ini tidak pernah hilang, jadi kurva fitness terbaik tidak pernah turun',
        'k terlalu besar menaikkan tekanan seleksi dan menghabiskan diversitas (konvergen prematur)', 'Umumnya k = 1 atau 2'] },
    { q: 'Hanya satu pernyataan benar. Tulis nomornya.\n1. Crossover bisa menghasilkan nilai gen yang tidak dimiliki kedua induk.\n2. Mutasi yang menurunkan fitness berarti pm salah setel.\n3. Dengan elitisme, kurva fitness terbaik tidak pernah turun.\n4. Jika kedua induk identik, crossover gagal.\n5. Menaikkan konstanta C pada fitness = C − konflik selalu aman.',
      fields: [num('Pernyataan benar', 3, 0)],
      ex: '1 salah: crossover hanya menyusun ulang gen yang sudah ada, hanya mutasi yang membuat nilai baru. 2 salah: mutasi merugikan tetap bisa terjadi pada pm yang benar. 4 salah: crossover tetap jalan, anaknya saja sama. 5 salah: C besar menekan tekanan seleksi sehingga seleksi hampir acak.' }
  ],
  ex: 'Pernyataan diambil dari Self-Check slide minggu 3; kunci mengikuti isi slide.' });

konsep.push({ type: 'steps',
  q: 'Tiga tim membawa masalah berbeda ke laboratorium AI. Masalah 1: menyetel tiga parameter kontroler; satu evaluasi berupa simulasi 40 detik, waktu tersedia 2 jam, dan respons dipercaya mulus (satu puncak lebar). Masalah 2: merancang kode koreksi error 60 bit, dan pola pendek yang baik diketahui bisa digabung menjadi pola panjang yang baik. Masalah 3: menjadwalkan 30 ujian ke 8 slot.',
  steps: [
    { q: 'Berapa evaluasi yang muat dalam budget Masalah 1? Metode apa yang paling cocok untuk Masalah 1 dan Masalah 2 menurut studi kasus slide?',
      fields: [num('Evaluasi dalam 2 jam', 180, 0), txt('Masalah 1', ['hill climbing', 'hc']), txt('Masalah 2', ['genetic algorithm', 'ga', 'algoritma genetika'])],
      ex: '2 × 3.600 / 40 = 180 evaluasi, terlalu sedikit untuk populasi. Landscape mulus dengan satu puncak lebar: Hill Climbing mencapai 100% optimum di studi kasus. Masalah 2 punya building block yang bisa digabung: GA (crossover) unggul di masalah deceptive building block (86,6% vs 81,3% Hill Climbing).' },
    { q: 'Pilih metode untuk Masalah 3, beri alasan dari karakteristik masalah, dan sebutkan satu kelemahannya.',
      points: ['Menyebut satu metode (misalnya Simulated Annealing, Tabu Search, atau GA)', 'Alasan dari sifat masalah: kombinatorial, ruang 8^30, banyak local optimum, evaluasi murah',
        'Menyebut kelemahan atau trade-off (parameter harus di-tuning, tanpa jaminan optimal, biaya evaluasi)'],
      model: 'Contoh: Simulated Annealing. Ruang 8^30 terlalu besar dan penuh local optimum; SA sesekali menerima langkah memburuk sehingga bisa keluar dari jebakan, dan pada studi kasus jadwal SA memberi 582 konflik, terbaik dibanding restart Hill Climbing (588) dan metode populasi (588). Kelemahannya, jadwal suhu harus di-tuning. Jawaban GA atau Tabu juga diterima jika alasannya dari sifat masalah.' },
    { q: 'Jelaskan No Free Lunch Theorem dan apa yang TIDAK dikatakan teorema ini.',
      points: ['Dirata-rata atas semua masalah optimasi, semua algoritma pencarian sama baiknya (Wolpert & Macready, 1997)',
        'Tidak berarti algoritma bebas dipilih: pada masalah tertentu dengan struktur yang diketahui, selisihnya bisa sangat besar',
        'Pilihan algoritma harus mengikuti karakteristik masalah (bentuk ruang, tipe variabel, constraint, biaya evaluasi)',
        'Klaim "algoritma X terbaik" tanpa menyebut kelas masalah salah; perlu perbandingan empiris'] }
  ],
  ex: 'Masalah diambil dari latihan slide minggu 1. Kunci Masalah 1 dan 2 mengikuti studi kasus slide; Masalah 3 bersifat terbuka.' });

{
  const raw = [0.2, 1.4, 2.7, 0.9], neg = [-2.1, -0.5, 0.3, 1.7];
  const inv = raw.map(f => 1 / (1 + f)), sh = neg.map(f => f + 2.2), w = G.wheel(sh);
  konsep.push({ type: 'steps',
    q: 'Sebuah GA mengoptimalkan beberapa masalah. Seleksi memakai roulette wheel, jadi fitness harus positif dan makin besar makin baik. Fungsi objektif tidak selalu langsung bisa dipakai sebagai fitness.',
    steps: [
      { q: 'Masalah minimasi dengan nilai objektif f = 0,2; 1,4; 2,7; 0,9. Ubah menjadi fitness = 1 / (1 + f) (4 desimal).',
        fields: raw.map((f, i) => num('Fitness untuk f = ' + id(f, 1), G.round(inv[i], 4), 0.0006)),
        ex: raw.map((f, i) => '1/(1 + ' + id(f, 1) + ') = ' + id(inv[i], 4)).join('; ') + '. Objektif terkecil (0,2) kini fitness terbesar.' },
      { q: 'Masalah lain punya nilai objektif (maksimasi) −2,1; −0,5; 0,3; 1,7. Geser dengan konstanta 2,2, lalu hitung probabilitas roulette tiap individu (4 desimal).',
        fields: sh.map((f, i) => num('Fitness ' + (i + 1), G.round(f, 1), 0.01)).concat(w.p.map((p, i) => num('P ' + (i + 1), G.round(p, 4), 0.0006))),
        ex: 'Fitness = f + 2,2 = ' + sh.map(f => id(f, 1)).join('; ') + '. Total ' + id(w.tot, 1) + '. P = ' + w.p.map(p => id(p, 4)).join('; ') + '.' },
      { q: 'Empat desain fitness berikut bermasalah. Jelaskan cacat masing-masing dan usulkan perbaikan.\nA. Meminimalkan keterlambatan: fitness = −(total delay menit).\nB. Memaksimalkan akurasi: fitness = akurasi, yang hanya bervariasi 0,91-0,93 di populasi.\nC. Penjadwalan: fitness = 1 jika jadwal tanpa bentrok, 0 jika ada.\nD. Routing: fitness = 1 / panjang rute, dihitung lewat simulasi lalu lintas penuh.',
        points: ['A: nilai negatif tidak bisa dipakai roulette; geser dengan konstanta atau pakai 1/(1 + delay)',
          'B: rentang terlalu sempit sehingga seleksi hampir acak; scaling, rank-based, atau tambah presisi',
          'C: terlalu banyak seri (semua 0), tidak ada arah perbaikan; hitung jumlah bentrok',
          'D: evaluasi terlalu mahal dan tidak stabil; sederhanakan atau aproksimasi, cache, paralel'] }
    ],
    ex: 'Transformasi dan desain A-D mengikuti slide minggu 2 (Objective ≠ Fitness, Spot the Flaw); angka dihitung dengan kode.' });
}

// ---------------------------------------------------------------- proses (biner)
const proses = [];

{
  const c = { names: ['K1', 'K2', 'K3', 'K4'], bits: ['01101', '11000', '01000', '10011'], fit: b => parseInt(b, 2) ** 2,
    r: [0.10, 0.30, 0.50, 0.90], cuts: [4, 2], mut: [[3, 3]] };
  const t = binTrace(c);
  proses.push({ type: 'steps',
    q: 'Sebuah GA memaksimalkan f(x) = x² untuk x bilangan bulat 0 sampai 31. Kromosom 5 bit dibaca langsung sebagai bilangan biner (x = nilai desimalnya). Populasi awal: K1 = 01101, K2 = 11000, K3 = 01000, K4 = 10011.',
    steps: binSteps(c, t, { fd: 0, ftol: 0.5,
      fitQ: 'Ubah tiap kromosom ke desimal, lalu hitung fitness f(x) = x² dan total fitness.',
      fitEx: 'K1 = 13 → 169, K2 = 24 → 576, K3 = 8 → 64, K4 = 19 → 361. Total 1.170.' }).concat([
      { q: 'Bandingkan populasi lama dan baru. Apakah GA membaik, dan bagian mana yang membawa perbaikan?',
        points: ['Rata-rata fitness naik dari 292,5 ke 582,5 dan fitness terbaik naik dari 576 ke 729',
          'Crossover menggabungkan bagian depan 11 dari K2 dan bagian belakang 011 dari K4 menjadi 11011 (x = 27)',
          'Elitisme mencegah 11000 (576) hilang saat offspring terburuk 01100 dibuang',
          'Seleksi memberi K2 dua kesempatan menjadi induk karena fitness-nya terbesar'] }]),
    ex: 'Contoh klasik Goldberg (f = x²) dengan r dan titik potong yang ditentukan sendiri; kunci dihitung dengan kode.' });
}

{
  const fx = x => 2 + 3 * x - 0.25 * x * x;
  const c = { names: ['K1', 'K2', 'K3', 'K4'], bits: ['00110', '11001', '01100', '10010'], fit: b => fx(G.decode(b, 0, 10).x),
    r: [0.72, 0.31, 0.05, 0.95], cuts: [3, 2], mut: [[0, 2], [3, 4]] };
  const t = binTrace(c);
  proses.push({ type: 'steps',
    q: 'Pabrik minuman mengatur kecepatan konveyor x (meter per menit) pada rentang [0, 10]. Keuntungan per jam f(x) = 2 + 3x − 0,25x² (juta rupiah) ingin dimaksimalkan dengan GA. Kromosom 5 bit didekode dengan x = 0 + (10 − 0)/(2^5 − 1) × d. Populasi awal: K1 = 00110, K2 = 11001, K3 = 01100, K4 = 10010.',
    steps: binSteps(c, t, { fd: 4, ftol: 0.002,
      decode: { q: 'Dekode setiap kromosom: ubah ke desimal d, lalu hitung x (3 desimal).', x: b => G.decode(b, 0, 10).x,
        ex: c.bits.map((b, i) => c.names[i] + ': d = ' + parseInt(b, 2) + ', x = 10/31 × ' + parseInt(b, 2) + ' = ' + id(G.decode(b, 0, 10).x, 3)).join('; ') + '. Langkah terkecil = 10/31 ≈ 0,323.' },
      fitQ: 'Hitung f(x) = 2 + 3x − 0,25x² untuk tiap kromosom (4 desimal) dan total fitness. Pakai x yang belum dibulatkan.' }).concat([
      { q: 'Optimum fungsi ini ada di x = 6. Kromosom 5 bit mana yang paling dekat dengan x = 6, dan mengapa kromosom yang sedikit berbeda bitnya bisa sangat jauh nilainya (Hamming cliff)?',
        fields: [txt('Kromosom terdekat ke x = 6', '10011')],
        ex: 'd = 6 × 31/10 = 18,6, jadi d = 19 = 10011 (x = 6,129). Nilai bertetangga bisa beda banyak bit: 15 = 01111 dan 16 = 10000 beda 5 bit, sehingga satu mutasi tidak bisa memindahkan solusi ke tetangganya. Gray code mengatasinya.' }]),
    ex: 'Populasi, r, titik potong, dan mutasi sama dengan contoh slide minggu 3; fungsi f(x) dibuat sendiri, jadi angkanya berbeda dari slide.' });
}

{
  const g = x => x * x - 2 * x + 2, fit = b => 1 / (1 + g(G.decode(b, -5, 5).x));
  const c = { names: ['K1', 'K2', 'K3', 'K4'], bits: ['101010', '000111', '111111', '011100'], fit, r: [0.15, 0.62, 0.48, 0.91], cuts: [3, 4], mut: [[2, 6]] };
  const t = binTrace(c);
  proses.push({ type: 'steps',
    q: 'GA dipakai untuk MEMINIMALKAN g(x) = x² − 2x + 2 pada x ∈ [−5, 5]. Kromosom 6 bit didekode dengan x = −5 + 10/(2^6 − 1) × d. Karena roulette butuh fitness besar untuk solusi baik, dipakai fitness = 1 / (1 + g(x)). Populasi awal: K1 = 101010, K2 = 000111, K3 = 111111, K4 = 011100.',
    steps: binSteps(c, t, { fd: 4, ftol: 0.0006,
      decode: { q: 'Dekode setiap kromosom menjadi x (3 desimal).', x: b => G.decode(b, -5, 5).x,
        ex: c.bits.map((b, i) => c.names[i] + ': d = ' + parseInt(b, 2) + ', x = ' + id(G.decode(b, -5, 5).x, 3)).join('; ') + '.' },
      fitQ: 'Hitung g(x), lalu fitness = 1 / (1 + g(x)) untuk tiap kromosom (4 desimal), dan total fitness.',
      fitEx: c.bits.map((b, i) => { const x = G.decode(b, -5, 5).x; return c.names[i] + ': g = ' + id(g(x), 4) + ', fitness = ' + id(t.fit[i], 4); }).join('; ') + '. Total = ' + id(t.w.tot, 4) + '.' }).concat([
      { q: 'Mengapa fitness tidak boleh langsung g(x) atau −g(x) pada soal ini?',
        points: ['g(x) langsung akan memberi peluang terbesar ke solusi terburuk (masalahnya minimasi)', '−g(x) bernilai negatif, roulette tidak bisa memakai bagian negatif',
          '1/(1 + g) membalik urutan dan selalu positif karena g ≥ 1 di sini'] }]),
    ex: 'Domain dan kromosom K1-K3 diambil dari latihan dekode slide minggu 2; fungsi dan langkah lain dibuat sendiri. Kunci dihitung dengan kode.' });
}

{
  const f = { A: 900, B: 12, C: 10, D: 8, E: 6, F: 5 }, keys = Object.keys(f), vals = keys.map(k => f[k]);
  const tot = G.sum(vals), avg = tot / 6, a = avg / (900 - avg), b = avg * (1 - a);
  const scaled = vals.map(v => a * v + b), ps = scaled.map(v => v / G.sum(scaled));
  const rankP = [6, 5, 4, 3, 2, 1].map(r => r / 21);
  const tour = [['A', 'D'], ['C', 'F'], ['B', 'E'], ['D', 'C']];
  proses.push({ type: 'steps',
    q: 'Populasi enam individu punya fitness A = 900, B = 12, C = 10, D = 8, E = 6, F = 5. Tim membandingkan tiga cara seleksi induk.',
    steps: [
      { q: 'Roulette wheel biasa: hitung probabilitas terpilih A dan B (4 desimal).',
        fields: [num('P(A)', G.round(900 / tot, 4), 0.0006), num('P(B)', G.round(12 / tot, 4), 0.0006)],
        ex: 'Total 941. P(A) = 900/941 = 0,9564; P(B) = 12/941 = 0,0128. A menguasai 96% roda (superindividu): populasi berikutnya hampir seragam.' },
      { q: 'Linear scaling f\' = a·f + b dengan syarat rata-rata tetap dan f\'(maks) = 2 × rata-rata. Hitung rata-rata, a, b, lalu P(A) dan P(B) setelah scaling (4 desimal).',
        fields: [num('Rata-rata', G.round(avg, 4), 0.01), num('a', G.round(a, 4), 0.0006), num('b', G.round(b, 4), 0.05),
          num('P(A) setelah scaling', G.round(ps[0], 4), 0.0006), num('P(B) setelah scaling', G.round(ps[1], 4), 0.0006)],
        ex: 'Rata-rata = 941/6 = ' + id(avg, 4) + '. a = rata-rata/(maks − rata-rata) = ' + id(a, 4) + ', b = rata-rata × (1 − a) = ' + id(b, 4) + '. f\'(A) = 2 × rata-rata = ' + id(scaled[0], 2) +
          ', jadi P(A) = ' + id(ps[0], 4) + ' (sepertiga roda) dan P(B) = ' + id(ps[1], 4) + '. Slide: A turun dari 96% ke 33%, yang lain sekitar 13%.' },
      { q: 'Rank-based linear: urutkan dari terbaik (rank 6) sampai terburuk (rank 1), P = rank / jumlah rank. Hitung P(A) dan P(F).',
        fields: [num('Jumlah rank', 21, 0), num('P(A)', G.round(rankP[0], 4), 0.0006), num('P(F)', G.round(rankP[5], 4), 0.0006)],
        ex: 'Jumlah rank 1 + 2 + … + 6 = 21. P(A) = 6/21 = 0,2857; P(F) = 1/21 = 0,0476. Selisih fitness 900 vs 12 tidak lagi berpengaruh, hanya urutannya.' },
      { q: 'Binary tournament (k = 2): empat turnamen mengambil pasangan acak ' + tour.map(p => '(' + p.join(', ') + ')').join(', ') + '. Siapa pemenang tiap turnamen?',
        fields: tour.map((p, i) => txt('Turnamen ' + (i + 1), f[p[0]] > f[p[1]] ? p[0] : p[1])),
        ex: 'Pemenang = fitness lebih besar: ' + tour.map(p => (f[p[0]] > f[p[1]] ? p[0] : p[1])).join(', ') + '. Tournament hanya membandingkan, jadi tidak peka skala dan tetap jalan untuk fitness negatif. Tekanan seleksi diatur lewat k.' },
      { q: 'Jelaskan dua kondisi yang membuat roulette wheel gagal, dan bandingkan ketiga metode seleksi.',
        points: ['Superindividu: satu fitness jauh di atas yang lain menguasai roda, diversitas runtuh (konvergen prematur)',
          'Fitness terlalu dekat (misalnya 0,901-0,906): semua irisan hampir sama, seleksi menjadi acak', 'Akar keduanya: roulette peka terhadap skala fitness',
          'Tournament: sederhana, murah, tekanan diatur k, tidak peka skala', 'Rank-based: memakai urutan, stabil dan tahan outlier, tetapi perlu sorting'] }
    ],
    ex: 'Fitness A-F dari studi kasus slide minggu 2 (Rescuing a Roulette Wheel); pasangan turnamen dibuat sendiri.' });
}

{
  const P1 = '11001010', P2 = '01110101';
  const s1 = G.cross1(P1, P2, 3), s2 = G.cross2(P1, P2, 3, 6), u = G.uniform(P1, P2, '10011010', 'P1');
  const same = [...P1].map((g, i) => (g === P2[i] ? i + 1 : 0)).filter(Boolean);
  proses.push({ type: 'steps',
    q: 'Dua induk biner 8 bit: P1 = 11001010 dan P2 = 01110101. Sebelum memilih operator, tim mencoba tiga skema crossover pada pasangan yang sama.',
    steps: [
      { q: 'Single-point crossover, potong setelah gen 3.', fields: [txt('Offspring 1', s1[0]), txt('Offspring 2', s1[1])],
        ex: '110|01010 × 011|10101 → ' + s1[0] + ' dan ' + s1[1] + '. Ekor setelah titik potong ditukar.' },
      { q: 'Two-point crossover, segmen gen 3 sampai 6 ditukar.', fields: [txt('Offspring 1', s2[0]), txt('Offspring 2', s2[1])],
        ex: '11|0010|10 × 01|1101|01 → ' + s2[0] + ' dan ' + s2[1] + '.' },
      { q: 'Uniform crossover dengan mask 10011010: untuk offspring 1, mask 1 mengambil gen dari P1 dan mask 0 dari P2. Offspring 2 kebalikannya.',
        fields: [txt('Offspring 1', u[0]), txt('Offspring 2', u[1])],
        ex: 'Gen per posisi mengikuti mask: ' + u[0] + ' dan ' + u[1] + '. Tiap posisi dipilih sendiri-sendiri.' },
      { q: 'Di posisi mana gen semua offspring di atas pasti sama, apa pun skema crossover-nya? Tulis nomor posisinya.',
        fields: [{ label: 'Posisi', a: same.join(' '), set: true }],
        ex: 'Kedua induk sama di posisi ' + same.join(', ') + ', jadi crossover apa pun hanya bisa menurunkan nilai itu. Crossover tidak pernah membuat nilai gen baru; hanya mutasi yang bisa.' },
      { q: 'Bandingkan ketiga skema dari sisi disruption dan kemampuan menjaga gen bertetangga (building block). Kapan uniform sebaiknya dihindari?',
        points: ['Single-point: disruption rendah, menjaga blok gen bertetangga dengan kuat', 'Two-point: sedang, default yang wajar',
          'Uniform: mixing tinggi, tidak menjaga gen bertetangga', 'Hindari uniform jika gen yang berdekatan membentuk kelompok bermakna (building block)'] }
    ],
    ex: 'Induk dan mask dibuat sendiri mengikuti latihan crossover slide minggu 3; kunci dihitung dengan kode.' });
}

{
  const K = '1011001101', r = [0.53, 0.08, 0.71, 0.95, 0.02, 0.44, 0.31, 0.09, 0.66, 0.17];
  const hit = r.map((v, i) => (v < 0.1 ? i + 1 : 0)).filter(Boolean);
  let M = K; for (const g of hit) M = G.flip(M, g);
  proses.push({ type: 'steps',
    q: 'Kromosom K = 1011001101 (10 gen) akan dimutasi dengan pm = 0,1. Untuk setiap gen dibangkitkan bilangan acak r; gen dibalik jika r < pm.\nr = ' + r.map(v => id(v, 2)).join('; ') + '.',
    steps: [
      { q: 'Gen mana yang bermutasi, dan bagaimana kromosom setelah mutasi?',
        fields: [{ label: 'Nomor gen yang dibalik', a: hit.join(' '), set: true }, txt('Kromosom setelah mutasi', M)],
        ex: 'r < 0,1 di gen ' + hit.join(', ') + '. K = ' + K + ' → ' + M + '.' },
      { q: 'Berapa rata-rata gen yang bermutasi per kromosom dengan pm = 0,1, dan berapa per generasi jika populasi 20? Berapa pm yang disarankan slide untuk kromosom 10 gen?',
        fields: [num('Per kromosom', 1, 0), num('Per generasi (populasi 20)', 20, 0), num('pm saran (1/n)', 0.1, 0.001)],
        ex: 'n × pm = 10 × 0,1 = 1 gen per kromosom, 20 gen per generasi. pm ≈ 1/n = 0,1, jadi pengaturan ini sudah sesuai saran.' },
      { q: 'Mengapa mutasi diperlukan walaupun sudah ada crossover? Apa akibat pm terlalu kecil dan terlalu besar?',
        points: ['Mutasi satu-satunya sumber nilai gen yang benar-benar baru', 'Mengembalikan nilai gen yang sudah hilang dari populasi karena seleksi',
          'pm terlalu kecil: tidak ada materi baru, pencarian stagnan lebih awal', 'pm terlalu besar: populasi rusak setiap generasi, menjadi random search'] }
    ],
    ex: SENDIRI });
}

// ---------------------------------------------------------------- jadwal (scheduling pekan 3)
const jadwal = [];

{
  const T = { T1: '12341234', T2: '22134143', T3: '31423412', T4: '14223134' }, conf = { T1: 26, T2: 23, T3: 28, T4: 25 };
  const names = ['T1', 'T2', 'T3', 'T4'], fit = names.map(n => 30 - conf[n]), w = G.wheel(fit);
  const r = [0.45, 0.90, 0.10, 0.65], par = r.map(x => names[G.pick(w.cum, x)]);
  const [O1, O2] = G.cross1(T.T2, T.T4, 4), [O3, O4] = G.cross1(T.T1, T.T3, 6);
  const O1m = O1.slice(0, 4) + '2' + O1.slice(5), O4m = O4.slice(0, 6) + '1' + O4.slice(7);
  jadwal.push({ type: 'steps',
    q: 'Studi kasus minggu 2-3: 8 ujian (A-H) dijadwalkan ke 4 slot. Kromosom integer: gen ke-i = slot untuk ujian ke-i. Fitness = 30 − konflik.',
    table: { head: ['Jadwal', 'Kromosom (A..H)', 'Konflik'], rows: names.map(n => [n, T[n].split('').join(' '), conf[n]]) },
    steps: [
      { q: 'Hitung fitness, probabilitas seleksi, dan kumulatif tiap jadwal (4 desimal).',
        fields: names.map((n, i) => num('Fitness ' + n, fit[i], 0)).concat(names.map((n, i) => num('P ' + n, G.round(w.p[i], 4), 0.0006)), names.map((n, i) => num('Kumulatif ' + n, G.round(w.cum[i], 4), 0.0012))),
        ex: 'Fitness 4, 7, 2, 5 (total 18). P = 0,2222; 0,3889; 0,1111; 0,2778. Kumulatif 0,2222; 0,6111; 0,7222; 1,0000. T2 paling baik tetapi peluangnya hanya 39%: itu disengaja, agar jadwal lain tetap punya kesempatan (diversitas).' },
      { q: 'Roulette wheel dengan r = 0,45; 0,90; 0,10; 0,65. Tentukan keempat induk (dua pertama = pasangan 1).',
        fields: r.map((x, i) => txt('Induk dari r = ' + id(x, 2), par[i])),
        ex: '0,45 → T2, 0,90 → T4, 0,10 → T1, 0,65 → T3. Pasangan 1 = (T2, T4), pasangan 2 = (T1, T3).' },
      { q: 'Crossover single-point: pasangan 1 dipotong setelah gen 4, pasangan 2 setelah gen 6. Tulis O1, O2 (pasangan 1) dan O3, O4 (pasangan 2).',
        fields: [txt('O1', O1), txt('O2', O2), txt('O3', O3), txt('O4', O4)],
        ex: 'T2 2213|4143 × T4 1422|3134 → O1 = ' + O1 + ', O2 = ' + O2 + '. T1 123412|34 × T3 314234|12 → O3 = ' + O3 + ', O4 = ' + O4 + '. Setiap angka slot sah di posisi mana pun, jadi tidak perlu repair.' },
      { q: 'Mutasi: gen 5 pada O1 diganti slot 2, gen 7 pada O4 diganti slot 1. Tulis O1 dan O4 setelah mutasi.',
        fields: [txt('O1 setelah mutasi', O1m), txt('O4 setelah mutasi', O4m)],
        ex: 'O1: ' + O1 + ' → ' + O1m + ' (konflik 18 → 25, memburuk). O4: ' + O4 + ' → ' + O4m + ' (konflik 27 → 22, membaik). Mutasi bisa membantu atau merugikan.' },
      { q: 'Evaluasi offspring: O1 = 25, O2 = 22, O3 = 40, O4 = 22 konflik. Terapkan elitisme k = 1 (jadwal terbaik populasi lama menggantikan offspring terburuk). Hitung rata-rata konflik sebelum dan sesudah, dan konflik terbaik populasi baru.',
        fields: [txt('Offspring yang diganti', 'O3'), txt('Jadwal elit', 'T2'), num('Rata-rata konflik lama', 25.5, 0.01), num('Rata-rata konflik baru', 23, 0.01), num('Konflik terbaik baru', 22, 0)],
        ex: 'O3 (40 konflik) diganti T2 (23). Populasi baru: T2 = 23, O1 = 25, O2 = 22, O4 = 22. Rata-rata (26 + 23 + 28 + 25)/4 = 25,50 → (23 + 25 + 22 + 22)/4 = 23,00. Terbaik 23 → 22. Biaya satu generasi: 8 evaluasi jadwal.' },
      { q: 'O3 punya 40 konflik. Apa yang terjadi pada fitness = 30 − konflik untuk O3, mengapa itu masalah bagi roulette, dan apa trade-off menaikkan konstanta menjadi 45?',
        points: ['Fitness O3 = 30 − 40 = −10, negatif', 'Roulette tidak bisa memberi irisan negatif, perhitungan probabilitas rusak',
          'C = 45 membuat semua fitness positif, tetapi selisih relatif mengecil', 'Tekanan seleksi turun (terbaik/terburuk 3,5× menjadi sekitar 1,3×), seleksi mendekati acak',
          'C besar aman tapi lambat; C kecil kuat tapi berisiko negatif'] }
    ],
    ex: 'Angka sesuai studi kasus slide minggu 2-3 (Selecting Parents, Crossover on the Timetable, One Generation of the Timetable).' });
}

// Own conflict tables: compute conflicts for every chromosome.
function jadwalItem(cfg) {
  const { exams, pairs, pop, C, r, cuts, mut } = cfg;
  const names = Object.keys(pop), conf = names.map(n => G.clashes(pop[n], exams, pairs));
  const fit = conf.map(k => C - k), w = G.wheel(fit);
  const par = r.map(x => names[G.pick(w.cum, x)]);
  const off = [].concat(G.cross1(pop[par[0]], pop[par[1]], cuts[0]), G.cross1(pop[par[2]], pop[par[3]], cuts[1]));
  const offConf0 = off.map(o => G.clashes(o, exams, pairs));
  const m = off.slice();
  for (const [o, g, v] of mut) m[o] = m[o].slice(0, g - 1) + v + m[o].slice(g);
  const offConf = m.map(o => G.clashes(o, exams, pairs));
  const best = conf.indexOf(Math.min(...conf)), worst = offConf.indexOf(Math.max(...offConf));
  const nextConf = offConf.slice(); nextConf[worst] = conf[best];
  const meanOld = G.sum(conf) / 4, meanNew = G.sum(nextConf) / 4;
  if (fit.some(f => f <= 0)) throw new Error('nonpositive fitness ' + cfg.title);
  if (conf.filter(k => k === conf[best]).length > 1 || offConf.filter(k => k === offConf[worst]).length > 1) throw new Error('tie in elite or worst ' + cfg.title);
  if (off.some(o => names.some(n => pop[n] === o))) throw new Error('offspring copies a parent ' + cfg.title);
  const tbl = { head: ['Pasangan ujian', 'Mahasiswa yang sama'], rows: pairs.map(([u, v, k]) => [u + '-' + v, k]) };
  const pretty = s => s.split('').join(' ');
  const steps = [
    { q: 'Hitung konflik setiap jadwal. Konflik = jumlah mahasiswa pada semua pasangan ujian yang berada di slot yang sama.',
      table: { head: ['Jadwal', 'Kromosom (' + exams.join('') + ')'], rows: names.map(n => [n, pretty(pop[n])]) },
      fields: names.map((n, i) => num('Konflik ' + n, conf[i], 0)),
      ex: names.map((n, i) => { const L = G.clashList(pop[n], exams, pairs); return n + ': ' + (L.length ? L.map(p => p[0] + '-' + p[1] + ' (' + p[2] + ')').join(' + ') + ' = ' + conf[i] : 'tidak ada pasangan sekelas, 0'); }).join('. ') + '.' },
    { q: 'Fitness = ' + C + ' − konflik. Hitung fitness dan probabilitas kumulatif roulette tiap jadwal (4 desimal).',
      fields: names.map((n, i) => num('Fitness ' + n, fit[i], 0)).concat(names.map((n, i) => num('Kumulatif ' + n, G.round(w.cum[i], 4), 0.0012))),
      ex: 'Fitness ' + fit.join(', ') + ' (total ' + w.tot + '). P = ' + w.p.map(p => id(p, 4)).join('; ') + '. Kumulatif ' + w.cum.map(p => id(p, 4)).join('; ') + '.' },
    { q: 'Pilih induk dengan r = ' + r.map(x => id(x, 2)).join('; ') + ' (dua pertama = pasangan 1).',
      fields: r.map((x, i) => txt('Induk dari r = ' + id(x, 2), par[i])),
      ex: r.map((x, i) => id(x, 2) + ' → ' + par[i]).join(', ') + '.' },
    { q: 'Crossover single-point: pasangan 1 dipotong setelah gen ' + cuts[0] + ', pasangan 2 setelah gen ' + cuts[1] + '. Tulis O1-O4.',
      fields: off.map((o, i) => txt('O' + (i + 1), o)),
      ex: 'Pasangan 1 (' + par[0] + ' × ' + par[1] + ') → ' + off[0] + ', ' + off[1] + '. Pasangan 2 (' + par[2] + ' × ' + par[3] + ') → ' + off[2] + ', ' + off[3] + '.' },
    { q: 'Mutasi: ' + mut.map(([o, g, v]) => 'gen ' + g + ' (ujian ' + exams[g - 1] + ') pada O' + (o + 1) + ' dipindah ke slot ' + v).join('; ') + '. Hitung konflik keempat offspring setelah mutasi.',
      fields: mut.map(([o]) => txt('O' + (o + 1) + ' setelah mutasi', m[o])).concat(m.map((o, i) => num('Konflik O' + (i + 1), offConf[i], 0))),
      ex: 'Sebelum mutasi konflik offspring ' + offConf0.join(', ') + '. ' + mut.map(([o]) => 'O' + (o + 1) + ': ' + off[o] + ' → ' + m[o] + ' (' + offConf0[o] + ' → ' + offConf[o] + ')').join('; ') + '. Setelah mutasi: ' + offConf.join(', ') + '.' },
    { q: 'Elitisme k = 1: jadwal terbaik populasi lama menggantikan offspring dengan konflik terbanyak. Hitung rata-rata konflik populasi lama dan baru, serta konflik terbaik populasi baru.',
      fields: [txt('Offspring yang diganti', 'O' + (worst + 1)), txt('Jadwal elit', names[best]), num('Rata-rata konflik lama', meanOld, 0.01), num('Rata-rata konflik baru', meanNew, 0.01), num('Konflik terbaik baru', Math.min(...nextConf), 0)],
      ex: 'Elit ' + names[best] + ' (' + conf[best] + ' konflik) menggantikan O' + (worst + 1) + ' (' + offConf[worst] + '). Konflik populasi baru: ' + nextConf.join(', ') + '. Rata-rata ' + id(meanOld, 2) + ' → ' + id(meanNew, 2) + '.' }
  ];
  if (cfg.essay) steps.push(cfg.essay);
  return { type: 'steps', q: cfg.q, table: tbl, steps, ex: SENDIRI };
}

jadwal.push(jadwalItem({ title: 'susulan',
  q: 'Panitia ujian susulan menjadwalkan 6 ujian (A-F) ke 3 slot. Tabel di bawah berisi banyak mahasiswa yang mengikuti dua ujian sekaligus; jika dua ujian itu di slot yang sama, mereka semua bentrok. Dipakai GA dengan kromosom integer (gen ke-i = slot ujian ke-i) dan populasi 4.',
  exams: 'ABCDEF'.split(''), pairs: [['A', 'B', 5], ['A', 'C', 2], ['B', 'D', 4], ['C', 'E', 3], ['D', 'F', 6], ['E', 'F', 2], ['B', 'E', 1], ['A', 'F', 3]],
  pop: { T1: '112233', T2: '123123', T3: '121323', T4: '312132' }, C: 20, r: [0.35, 0.80, 0.15, 0.55], cuts: [3, 2], mut: [[1, 5, '1']],
  essay: { q: 'Mengapa dipakai encoding integer, bukan biner atau permutasi, untuk masalah ini?',
    points: ['Tiap gen langsung berisi nomor slot (1-3), tanpa langkah dekode', 'Biner 2 bit per ujian punya pola 11 yang tidak bermakna (4 nilai untuk 3 slot), jadi muncul kromosom tidak valid',
      'Bukan permutasi: beberapa ujian boleh berbagi satu slot, tidak ada aturan "tepat sekali"', 'Crossover dan mutasi biasa selalu menghasilkan jadwal sah'] } }));

jadwal.push(jadwalItem({ title: 'praktikum',
  q: 'Laboratorium menjadwalkan 7 praktikum (P, Q, R, S, T, U, V) ke 3 sesi. Asisten mencatat jumlah mahasiswa yang mengambil dua praktikum sekaligus (tabel). Kromosom integer berisi sesi tiap praktikum dalam urutan P..V, dan fitness = 25 − konflik.',
  exams: 'PQRSTUV'.split(''), pairs: [['P', 'Q', 4], ['P', 'S', 2], ['Q', 'R', 3], ['R', 'T', 5], ['S', 'U', 4], ['T', 'V', 2], ['U', 'V', 3], ['Q', 'U', 1], ['P', 'V', 2]],
  pop: { J1: '1133333', J2: '3121221', J3: '3132122', J4: '2132232' }, C: 25, r: [0.62, 0.20, 0.95, 0.40], cuts: [4, 3], mut: [[2, 2, '3'], [3, 7, '1']],
  essay: { q: 'Setelah satu generasi, jelaskan peran masing-masing operator (seleksi, crossover, mutasi, elitisme) dalam perubahan rata-rata konflik.',
    points: ['Seleksi memberi peluang lebih besar pada jadwal berkonflik rendah', 'Crossover menggabungkan bagian jadwal dari dua induk; anak bisa lebih baik atau lebih buruk dari induknya',
      'Mutasi memindahkan satu praktikum ke sesi lain, sumber variasi baru', 'Elitisme menjamin jadwal terbaik tidak hilang'] } }));

jadwal.push(jadwalItem({ title: 'sidang',
  q: 'Program studi menjadwalkan 6 sidang tugas akhir (A-F) ke 3 slot. Dosen penguji yang sama tidak boleh menguji dua sidang di slot yang sama; tabel berisi banyak dosen yang menjadi penguji di dua sidang sekaligus. Konflik = jumlah dosen yang bentrok, fitness = 15 − konflik.',
  exams: 'ABCDEF'.split(''), pairs: [['A', 'B', 2], ['A', 'D', 1], ['B', 'C', 2], ['C', 'F', 3], ['D', 'E', 2], ['E', 'F', 1], ['B', 'F', 1]],
  pop: { S1: '323111', S2: '122332', S3: '222111', S4: '132332' }, C: 15, r: [0.05, 0.70, 0.30, 0.88], cuts: [2, 4], mut: [[0, 4, '3']],
  essay: { q: 'Jika slot sidang ditambah menjadi 4, apa yang berubah pada encoding dan ukuran ruang pencarian? Apakah GA harus diubah?',
    points: ['Encoding tetap integer, hanya alel bertambah menjadi 1-4', 'Ruang pencarian naik dari 3^6 = 729 menjadi 4^6 = 4.096',
      'Operator crossover dan mutasi tetap sama; mutasi kini memilih slot dari 1-4', 'Konflik biasanya lebih mudah diturunkan karena pilihan slot lebih banyak'] } }));

{
  const names = ['T2', 'O1', 'O2', 'O4'], chrom = { T2: '22134143', O1: '22132134', O2: '14224143', O4: '31423414' }, conf = { T2: 23, O1: 25, O2: 22, O4: 22 };
  const count = s => [1, 2, 3, 4, 5].map(k => s.split('').filter(x => +x === k).length);
  const viol = n => count(chrom[n]).reduce((v, c) => v + Math.max(0, c - 2), 0);
  const V = names.map(viol);
  const fitW = w => names.map((n, i) => (45 - conf[n]) - w * V[i]);
  jadwal.push({ type: 'steps',
    q: 'Lanjutan studi kasus jadwal 8 ujian (A-H). Sekarang slot ada 5 (S1-S5) dan muncul aturan baru: satu slot paling banyak berisi 2 ujian karena ruangan terbatas. Empat jadwal yang bertahan:',
    table: { head: ['Jadwal', 'Kromosom (A..H)', 'Konflik'], rows: names.map(n => [n, chrom[n].split('').join(' '), conf[n]]) },
    steps: [
      { q: 'Hitung banyak ujian di slot S2 untuk tiap jadwal, lalu jumlah pelanggaran (slot yang berisi lebih dari 2 ujian; setiap ujian kelebihan = 1 pelanggaran).',
        fields: names.map((n, i) => num('Ujian di S2 pada ' + n, count(chrom[n])[1], 0)).concat(names.map((n, i) => num('Pelanggaran ' + n, V[i], 0))),
        ex: names.map((n, i) => n + ': isi slot S1-S5 = ' + count(chrom[n]).join('·') + ', pelanggaran ' + V[i]).join('. ') + '. T2 satu-satunya yang feasible.' },
      { q: 'Ini hard constraint atau soft constraint? Sebutkan tiga cara menangani kromosom yang melanggarnya.',
        fields: [txt('Jenis aturan', ['hard', 'hard constraint', 'keras']), txt('Cara 1', ['rejection', 'reject', 'penolakan', 'buang']), txt('Cara 2', ['repair', 'perbaikan', 'perbaiki']), txt('Cara 3', ['penalty', 'penalti'])],
        ex: 'Ruangan tidak bisa menampung ujian ketiga, jadi jadwal tidak bisa dijalankan: hard constraint. Penanganan: rejection (buang), repair (pindahkan ujian ke slot kosong), penalty (kurangi fitness).' },
      { q: 'Pakai penalty: fitness = (45 − konflik) − w × pelanggaran. Hitung fitness keempat jadwal untuk w = 5 dan w = 25.',
        fields: fitW(5).map((f, i) => num('w = 5: ' + names[i], f, 0)).concat(fitW(25).map((f, i) => num('w = 25: ' + names[i], f, 0))),
        ex: 'w = 5: ' + fitW(5).join(', ') + '. w = 25: ' + fitW(25).join(', ') + '. Dengan w = 25 semua jadwal infeasible bernilai negatif, jadi penalty berperilaku seperti rejection. Slide: w = 10 seimbang (22, 10, 13, 13).' },
      { q: 'Repair untuk O1: pindahkan satu ujian dari S2 ke slot yang masih kosong. Slide mencatat konflik setelah repair: pindah A = 13, pindah E = 17, pindah B = 24. Ujian mana yang dipindah, dan bandingkan ketiga strategi untuk kasus ini.',
        fields: [txt('Ujian yang dipindah', ['A', 'ujian A'])],
        ex: 'Pindah A memberi 13 konflik, lebih baik dari jadwal mana pun yang pernah ada. Rejection membuang 3 dari 4 jadwal (evaluasi terbuang). Repair di sini murah dan kuat. Penalty bergantung penuh pada pilihan w.' }
    ],
    ex: 'Kromosom dan konflik dari studi kasus slide minggu 5 (Adding a Room Constraint); jumlah pelanggaran dan fitness dihitung dengan kode.' });
}

{
  const conf = [26, 23, 28, 25], f30 = conf.map(c => 30 - c), f45 = conf.map(c => 45 - c), w30 = G.wheel(f30), w45 = G.wheel(f45);
  jadwal.push({ type: 'steps',
    q: 'Empat jadwal punya konflik T1 = 26, T2 = 23, T3 = 28, T4 = 25. Tim membandingkan dua konstanta pada fitness = C − konflik.',
    steps: [
      { q: 'Untuk C = 30, hitung probabilitas roulette tiap jadwal (4 desimal) dan rasio peluang terbaik/terburuk.',
        fields: w30.p.map((p, i) => num('P T' + (i + 1), G.round(p, 4), 0.0006)).concat([num('Rasio terbaik/terburuk', 3.5, 0.01)]),
        ex: 'Fitness 4, 7, 2, 5 (total 18). P = ' + w30.p.map(p => id(p, 4)).join('; ') + '. Rasio 7/2 = 3,5.' },
      { q: 'Untuk C = 45, hitung lagi probabilitas dan rasionya.',
        fields: w45.p.map((p, i) => num('P T' + (i + 1), G.round(p, 4), 0.0006)).concat([num('Rasio terbaik/terburuk', G.round(22 / 17, 2), 0.01)]),
        ex: 'Fitness 19, 22, 17, 20 (total 78). P = ' + w45.p.map(p => id(p, 4)).join('; ') + '. Rasio 22/17 ≈ 1,29: hampir seperti memilih acak.' },
      { q: 'Satu offspring baru punya 40 konflik. Berapa fitness-nya untuk C = 30 dan C = 45?',
        fields: [num('C = 30', -10, 0), num('C = 45', 5, 0)],
        ex: '30 − 40 = −10 (roulette rusak), 45 − 40 = 5 (aman).' },
      { q: 'Simpulkan trade-off memilih C, dan sebutkan alternatif fitness atau seleksi yang menghindari masalah ini.',
        points: ['C kecil: tekanan seleksi kuat, tetapi bisa menghasilkan fitness negatif', 'C besar: selalu aman, tetapi tekanan seleksi hilang dan konvergensi lambat',
          'Alternatif fitness: 1/(1 + konflik), selalu positif', 'Alternatif seleksi: tournament atau rank-based yang tidak peka skala'] }
    ],
    ex: 'Angka dari slide minggu 3 (The Fitness Constant Bites Back); kunci dihitung dengan kode.' });
}

module.exports = { konsep, proses, jadwal };
