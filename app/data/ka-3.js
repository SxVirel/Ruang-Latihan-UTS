// Kecerdasan Artifisial — soal uraian bertahap GA for Combinatorial Problems (Week 5): kombinatorial, PMX & OX, TSP,
// dan latihan dari slide. Dibuat dari slide minggu 1-5; semua angka dihitung dengan kode.

BANK.isian('ka', 'komb', 'GA Kombinatorial: Kombinatorial vs Non-kombinatorial', [
  { type: 'steps',
    q: 'Sebuah startup menerima enam permintaan optimasi:\n1. Rute kurir mengunjungi 10 toko lalu kembali ke gudang.\n2. Memilih barang dari 12 jenis untuk satu truk berkapasitas 2 ton.\n3. Menyetel tiga parameter PID (Kp, Ki, Kd) bernilai real.\n4. Mencari x di [0, 10] yang memaksimalkan f(x) = x·sin(x).\n5. Menempatkan 6 ujian ke 4 slot waktu.\n6. Mengurutkan 5 pekerjaan pada satu mesin.',
    steps: [
      { q: 'Golongkan tiap permintaan: kombinatorial atau non-kombinatorial.',
        fields: [
          { label: '1', a: ['kombinatorial', 'combinatorial', 'diskrit'] },
          { label: '2', a: ['kombinatorial', 'combinatorial', 'diskrit'] },
          { label: '3',
            a: [
              'non-kombinatorial',
              'nonkombinatorial',
              'non kombinatorial',
              'kontinu',
              'continuous',
              'non-combinatorial'
            ] },
          { label: '4',
            a: [
              'non-kombinatorial',
              'nonkombinatorial',
              'non kombinatorial',
              'kontinu',
              'continuous',
              'non-combinatorial'
            ] },
          { label: '5', a: ['kombinatorial', 'combinatorial', 'diskrit'] },
          { label: '6', a: ['kombinatorial', 'combinatorial', 'diskrit'] }
        ],
        ex: 'Kombinatorial: jawabannya susunan, subset, atau penugasan dari elemen diskrit (1, 2, 5, 6). Non-kombinatorial: jawabannya nilai pada ruang kontinu (3, 4).' },
      { q: 'Encoding apa yang paling cocok? Isi: permutasi, biner, integer, atau real.',
        fields: [
          { label: '1 (rute)', a: ['permutasi', 'permutation'] },
          { label: '2 (pilih barang)', a: ['biner', 'binary'] },
          { label: '3 (PID)', a: ['real', 'real-valued', 'bilangan real'] },
          { label: '5 (ujian ke slot)', a: ['integer', 'bilangan bulat'] },
          { label: '6 (urutan pekerjaan)', a: ['permutasi', 'permutation'] }
        ],
        ex: 'Rute dan urutan: tiap elemen muncul tepat sekali, jadi permutasi. Pilih barang: ambil/tidak, jadi biner. PID: nilai kontinu, jadi real (atau biner didekode). Ujian ke slot: tiap gen berisi nomor slot, integer.' },
      { q: 'Hitung ukuran ruang pencarian.',
        fields: [
          { label: '1: permutasi 10 toko (10!)', a: 3628800, tol: 0 },
          { label: '2: subset 12 barang (2^12)', a: 4096, tol: 0 },
          { label: '5: 6 ujian ke 4 slot (4^6)', a: 4096, tol: 0 },
          { label: '6: urutan 5 pekerjaan (5!)', a: 120, tol: 0 }
        ],
        ex: '10! = 3.628.800. 2^12 = 4.096. 4^6 = 4.096. 5! = 120. Permutasi (n!) tumbuh jauh lebih cepat daripada 2^n: 20 kota saja sudah 20! ≈ 2,4 × 10^18 tur.' },
      { q: 'Mengapa masalah kombinatorial tidak bisa diselesaikan dengan metode berbasis gradien?',
        points: [
          'Ruangnya diskrit: solusi adalah susunan, bukan titik pada ruang kontinu',
          'Tidak ada gradien yang bisa diikuti; susunan hanya bisa dibandingkan satu sama lain',
          'Ukuran ruang tumbuh eksponensial/faktorial sehingga enumerasi juga mustahil',
          'Maka dipakai metaheuristik seperti GA dengan operator yang menjaga validitas'
        ] }
    ],
    ex: 'Kategori dan encoding mengikuti slide minggu 2 (Choosing an Encoding) dan minggu 5 (Three Problems You Will Keep Meeting).' },
  { type: 'steps',
    q: 'Dua tur TSP 6 kota: P1 = A B C D E F dan P2 = C F E B D A. Seorang mahasiswa memakai single-point crossover seperti pada kromosom biner minggu lalu, dengan potongan setelah gen 3.',
    steps: [
      { q: 'Tulis kedua offspring.',
        fields: [{ label: 'C1', a: 'ABCBDA' }, { label: 'C2', a: 'CFEDEF' }],
        ex: 'ABC|DEF × CFE|BDA → C1 = A B C B D A, C2 = C F E D E F.' },
      { q: 'Kota mana yang muncul dua kali dan kota mana yang hilang pada C1 dan C2?',
        fields: [
          { label: 'C1: kota ganda', a: 'A B', set: true },
          { label: 'C1: kota hilang', a: 'E F', set: true },
          { label: 'C2: kota ganda', a: 'E F', set: true },
          { label: 'C2: kota hilang', a: 'A B', set: true }
        ],
        ex: 'C1 berisi A dan B dua kali, E dan F hilang. C2 berisi E dan F dua kali, A dan B hilang. Keduanya bukan tur buruk, tetapi bukan tur sama sekali.' },
      { q: 'Operator yang sama dipakai pada knapsack biner 6 item: 101|100 × 011|011. Apakah offspring-nya selalu berupa kromosom yang sah? Masalah apa yang masih bisa muncul?',
        fields: [
          { label: 'Offspring 1', a: '101011' },
          { label: 'Offspring 2', a: '011100' },
          { label: 'Selalu sah sebagai kromosom? (ya/tidak)', a: ['ya', 'yes'] }
        ],
        ex: 'Setiap string biner adalah subset yang sah, jadi crossover tidak merusak struktur. Yang bisa muncul hanyalah pelanggaran constraint, misalnya total berat melebihi kapasitas, yang ditangani dengan rejection, repair, atau penalty.' },
      { q: 'Jelaskan syarat operator pada encoding permutasi dan dua cara menanganinya.',
        points: [
          'Setiap kota/elemen harus muncul tepat sekali, jadi offspring harus tetap permutasi yang valid',
          'Crossover dan mutasi biasa (cut-and-swap, bit flip) merusak syarat ini',
          'Cara 1: pakai operator khusus permutasi (PMX, OX, cycle crossover; mutasi swap/insertion/inversion)',
          'Cara 2: repair (hapus duplikat, sisipkan kota yang hilang), atau tolak offspring'
        ] }
    ],
    ex: 'Contoh dari slide minggu 5 (Why Last Week\'s Crossover Breaks); kunci dihitung dengan kode.' },
  { type: 'steps',
    q: 'Empat masalah berikut harus dikodekan sebelum GA dijalankan.\nA. Menyetel tiga gain kontroler, masing-masing di [0, 50] dengan presisi sekitar 0,01.\nB. Memilih armada yang berangkat dari 20 mobil boks untuk hari ini.\nC. Menentukan urutan 12 mesin yang memproses satu batch.\nD. Menempatkan 30 ujian ke 8 slot waktu.',
    steps: [
      { q: 'Untuk A memakai encoding biner. Berapa bit minimal per variabel agar langkah (x_max − x_min)/(2^n − 1) ≤ 0,01? Berapa panjang total kromosom, dan berapa langkah sebenarnya?',
        fields: [
          { label: 'Bit per variabel', a: 13, tol: 0 },
          { label: 'Panjang kromosom', a: 39, tol: 0 },
          { label: 'Langkah sebenarnya (5 desimal)', a: 0.0061, tol: 0.00002 }
        ],
        ex: 'Butuh 2^n − 1 ≥ 50/0,01 = 5.000. 2^12 − 1 = 4.095 kurang, 2^13 − 1 = 8.191 cukup: 13 bit. Tiga variabel: 39 bit. Langkah = 50/8.191 ≈ 0,00610.' },
      { q: 'Tentukan encoding dan ukuran ruang pencarian B, C, D.',
        fields: [
          { label: 'B: encoding', a: ['biner', 'binary'] },
          { label: 'B: ukuran ruang (2^20)', a: 1048576, tol: 0 },
          { label: 'C: encoding', a: ['permutasi', 'permutation'] },
          { label: 'C: ukuran ruang (12!)', a: 479001600, tol: 0 },
          { label: 'D: encoding', a: ['integer', 'bilangan bulat'] },
          { label: 'D: ruang = 8^k, k', a: 30, tol: 0 }
        ],
        ex: 'B: tiap mobil berangkat/tidak, 2^20 = 1.048.576. C: urutan, 12! = 479.001.600. D: tiap ujian berisi slot 1-8, 8^30 ≈ 1,24 × 10^27.' },
      { q: 'Kapan encoding perlu dipertimbangkan ulang? Jelaskan dengan pertanyaan panduan dari slide.',
        points: [
          'Pertanyaan panduan: jika satu gen diubah sedikit, apakah solusinya juga berubah sedikit?',
          'Jika tidak (misalnya Hamming cliff pada biner), encoding perlu ditinjau ulang',
          'Encoding yang mengikuti struktur masalah membuat pencarian lebih efektif',
          'Encoding menentukan bentuk ruang yang dicari algoritma, bukan detail teknis'
        ] }
    ],
    ex: 'Masalah A-D dari latihan slide minggu 2 (Choose an Encoding); hitungan bit dan ruang dihitung dengan kode.' },
  { type: 'steps',
    q: 'Knapsack: tas berkapasitas 9 kg, pilih barang agar nilai total maksimal. Kromosom biner 5 gen (1 = dibawa) dengan urutan barang sesuai tabel. Kromosom yang kelebihan berat tidak dibuang, melainkan diberi penalty: fitness = nilai − 3 × kelebihan berat.',
    table: { head: ['Gen', 'Barang', 'Berat (kg)', 'Nilai'],
      rows: [[1, 'Laptop', 4, 9], [2, 'Kamera', 2, 6], [3, 'Gitar', 5, 7], [4, 'Jaket', 3, 4], [5, 'Buku', 1, 2]] },
    steps: [
      { q: 'Populasi: K1 = 11001, K2 = 10110, K3 = 01011, K4 = 11101. Hitung berat, nilai, dan fitness tiap kromosom.',
        fields: [
          { label: 'Berat K1', a: 7, tol: 0 },
          { label: 'Fitness K1', a: 17, tol: 0 },
          { label: 'Berat K2', a: 12, tol: 0 },
          { label: 'Fitness K2', a: 11, tol: 0 },
          { label: 'Berat K3', a: 6, tol: 0 },
          { label: 'Fitness K3', a: 12, tol: 0 },
          { label: 'Berat K4', a: 12, tol: 0 },
          { label: 'Fitness K4', a: 15, tol: 0 }
        ],
        ex: 'K1: berat 7, nilai 17, fitness 17. K2: berat 12, nilai 20, lebih 3 kg, fitness 20 − 3×3 = 11. K3: berat 6, nilai 12, fitness 12. K4: berat 12, nilai 24, lebih 3 kg, fitness 24 − 3×3 = 15.' },
      { q: 'K2 dan K3 disilangkan dengan single-point setelah gen 2. Tulis offspring dan fitness-nya.',
        fields: [
          { label: 'O1', a: '10011' },
          { label: 'Fitness O1', a: 15, tol: 0 },
          { label: 'O2', a: '01110' },
          { label: 'Fitness O2', a: 14, tol: 0 }
        ],
        ex: '10|110 × 01|011 → O1 = 10011 (berat 8, nilai 15, fitness 15), O2 = 01110 (berat 10, nilai 17, fitness 14). Strukturnya selalu sah, yang bisa dilanggar hanya kapasitas.' },
      { q: 'Repair untuk K4: buang barang dengan rasio nilai/berat terkecil sampai muat. Barang mana yang dibuang dan bagaimana kromosomnya?',
        fields: [
          { label: 'Barang yang dibuang (pisahkan spasi)', a: 'Gitar', set: true },
          { label: 'Kromosom setelah repair', a: '11001' },
          { label: 'Nilai setelah repair', a: 17, tol: 0 }
        ],
        ex: 'Rasio nilai/berat: Laptop 2,25, Kamera 3,00, Gitar 1,40, Jaket 1,33, Buku 2,00. K4 = 11101 berat 12 kg. Dibuang: Gitar, jadi 11001 (berat 7, nilai 17).' },
      { q: 'Knapsack ini optimumnya tepat di batas kapasitas. Mengapa penalty sering lebih baik daripada rejection atau repair pada kasus seperti ini?',
        points: [
          'Rejection membuang terlalu banyak kromosom saat solusi feasible langka, pencarian macet',
          'Repair mendorong solusi menjauh dari batas dan merusak informasi (bias aturan repair)',
          'Penalty membiarkan pencarian melewati daerah infeasible menuju optimum di batas',
          'Bobot penalty harus di-tuning: terlalu kecil solusi infeasible menang, terlalu besar sama dengan rejection'
        ] }
    ],
    ex: 'Soal buatan sendiri mengikuti slide minggu 5; kunci dihitung dengan kode.' },
  { type: 'steps',
    q: 'Bengkel percetakan punya 5 pekerjaan yang dikerjakan satu per satu di satu mesin. Durasi (jam): J1 = 4, J2 = 2, J3 = 6, J4 = 3, J5 = 5. Tujuan: meminimalkan total waktu selesai (jumlah waktu selesai semua pekerjaan). Kromosom permutasi berisi urutan pengerjaan.',
    steps: [
      { q: 'Hitung waktu selesai tiap pekerjaan dan total waktu selesai untuk P1 = J3 J1 J5 J2 J4 dan P2 = J2 J4 J1 J5 J3.',
        fields: [
          { label: 'Waktu selesai pekerjaan terakhir P1', a: 20, tol: 0 },
          { label: 'Total waktu selesai P1', a: 68, tol: 0 },
          { label: 'Total waktu selesai P2', a: 50, tol: 0 }
        ],
        ex: 'P1: selesai 6, 10, 15, 17, 20, total 68. P2: selesai 2, 5, 9, 14, 20, total 50.' },
      { q: 'Lakukan Order Crossover (OX) dengan segmen posisi 2-3 dari P1. Tulis urutan baca P2 mulai posisi 4, sisa setelah membuang gen segmen, offspring, dan total waktu selesainya.',
        fields: [
          { label: 'Urutan baca P2 dari posisi 4', a: 'J5J3J2J4J1' },
          { label: 'Offspring OX', a: 'J4J1J5J3J2' },
          { label: 'Total waktu selesai offspring', a: 60, tol: 0 }
        ],
        ex: 'Segmen J1 J5 tetap di posisi 2-3. Baca P2 dari posisi 4: J5 J3 J2 J4 J1. Buang J1, J5: J3 J2 J4. Isi posisi 4, 5, 1: J4 J1 J5 J3 J2. Total 60.' },
      { q: 'Urutan optimal untuk tujuan ini adalah Shortest Processing Time (durasi terpendek dulu). Tulis urutan itu dan totalnya.',
        fields: [{ label: 'Urutan SPT', a: 'J2J4J1J5J3' }, { label: 'Total waktu selesai', a: 50, tol: 0 }],
        ex: 'SPT: J2 J4 J1 J5 J3, selesai 2, 5, 9, 14, 20, total 50. Masalah sekecil ini punya aturan eksak, jadi GA tidak perlu: sesuai slide "jangan pakai metaheuristik jika solusi analitis ada".' },
      { q: 'Jika pekerjaan juga harus dibagi ke dua mesin, apa yang berubah pada encoding?',
        points: [
          'Solusi menjadi permutasi + assignment (urutan dan mesin)',
          'Contoh encoding: pasangan (pekerjaan, mesin) per gen, misalnya 2A 1B 4A …',
          'Operator harus menjaga urutan tetap permutasi sekaligus memilih mesin yang sah',
          'Ruang pencarian membesar menjadi n! × 2^n'
        ] }
    ],
    ex: 'Soal buatan sendiri mengikuti slide minggu 5; kunci dihitung dengan kode.' },
  { type: 'steps',
    q: 'Masalah non-kombinatorial: GA dengan encoding real menyetel empat bobot. Induk P1 = (1,2; −0,5; 3,7; 2,1) dan P2 = (−0,3; 1,8; 0,2; 4,0).',
    steps: [
      { q: 'Arithmetic crossover dengan α = 0,35: C1 = α·P1 + (1 − α)·P2 dan C2 = (1 − α)·P1 + α·P2, gen per gen. Hitung C1 dan C2 (3 desimal).',
        fields: [
          { label: 'C1 gen 1', a: 0.225, tol: 0.002 },
          { label: 'C1 gen 2', a: 0.995, tol: 0.002 },
          { label: 'C1 gen 3', a: 1.425, tol: 0.002 },
          { label: 'C1 gen 4', a: 3.335, tol: 0.002 },
          { label: 'C2 gen 1', a: 0.675, tol: 0.002 },
          { label: 'C2 gen 2', a: 0.305, tol: 0.002 },
          { label: 'C2 gen 3', a: 2.475, tol: 0.002 },
          { label: 'C2 gen 4', a: 2.765, tol: 0.002 }
        ],
        ex: 'C1 = 0,225; 0,995; 1,425; 3,335. C2 = 0,675; 0,305; 2,475; 2,765. Nilai baru yang tidak ada di kedua induk bisa muncul, berbeda dengan crossover kombinatorial.' },
      { q: 'Apakah single-point crossover (potong setelah gen 2) juga sah di sini? Tulis offspring pertamanya.',
        fields: [
          { label: 'Sah? (ya/tidak)', a: ['ya', 'yes'] },
          { label: 'Offspring pertama', a: ['1,2 -0,5 0,2 4,0', '1.2 -0.5 0.2 4.0'] }
        ],
        ex: '(1,2; −0,5 | 0,2; 4,0). Setiap gen real tetap berada di domainnya, jadi crossover pemotongan selalu sah; namun arithmetic crossover biasanya lebih baik karena bisa membuat nilai di antara induk.' },
      { q: 'Kromosom integer penjadwalan (slot 1-8) dimutasi. Bandingkan random reset dan creep, dan mana yang lebih cocok untuk jadwal ujian menurut studi kasus slide.',
        fields: [{ label: 'Lebih cocok untuk jadwal ujian', a: ['random reset', 'random-reset'] }],
        ex: 'Random reset mengganti gen dengan slot acak 1-8; creep menambah/mengurangi 1. Pada jadwal, slot 3 dan slot 4 tidak "mirip", nomor slot hanya label, jadi creep tidak masuk akal: random reset 602 konflik vs creep 630.' },
      { q: 'Simpulkan perbedaan operator untuk masalah kombinatorial dan non-kombinatorial.',
        points: [
          'Non-kombinatorial (real/integer): crossover potong dan uniform selalu sah; arithmetic crossover membuat nilai baru',
          'Mutasi real: geser nilai sedikit (creep/gaussian), selama tetanggaan bermakna',
          'Kombinatorial (permutasi): operator biasa menghasilkan duplikat/hilang, perlu PMX/OX dan mutasi swap/insertion/inversion',
          'Representasi menentukan operator yang tepat'
        ] }
    ],
    ex: 'Induk diambil dari slide minggu 3 (Crossover Beyond Binary) dengan 4 gen pertama; rumus α ditulis eksplisit di soal, kunci dihitung dengan kode.' }
]);

BANK.isian('ka', 'cross', 'GA Kombinatorial: Crossover PMX & OX', [
  { type: 'steps',
    q: 'Dua rute pengiriman 6 kota: P1 = D A C B F E dan P2 = B E F C A D. Segmen = posisi 3 sampai 4.',
    steps: [
      { q: 'PMX, offspring 1 (segmen posisi 3-4 dari P1). Tulis segmen yang disalin, lalu offspring-nya.',
        fields: [{ label: 'Segmen dari P1', a: 'CB' }, { label: 'Offspring 1 PMX', a: 'FECBAD' }],
        ex: 'Mapping: C↔F, B↔C. Isi posisi lain dari P2; jika gennya sudah ada di segmen, ikuti mapping. Rantai mapping: posisi 1: B → C → F. Hasil: F E C B A D.' },
      { q: 'PMX, offspring 2 (peran dibalik: segmen dari P2, sisa dari P1).',
        fields: [{ label: 'Offspring 2 PMX', a: 'DAFCBE' }],
        ex: 'Mapping: F↔C, C↔B. Rantai: posisi 5: F → C → B. Hasil: D A F C B E.' },
      { q: 'OX, offspring 1 (segmen posisi 3-4 dari P1). Tulis urutan baca P2 mulai posisi 5 (melingkar), sisa setelah membuang gen segmen, lalu offspring.',
        fields: [
          { label: 'Urutan baca P2', a: 'ADBEFC' },
          { label: 'Sisa setelah dibuang', a: 'ADEF' },
          { label: 'Offspring 1 OX', a: 'EFCBAD' }
        ],
        ex: 'Baca P2 dari posisi 5: A D B E F C. Buang C, B: A D E F. Isi posisi 5…6 lalu 1…2: E F C B A D.' },
      { q: 'OX, offspring 2 (segmen dari P2, urutan dibaca dari P1).',
        fields: [{ label: 'Offspring 2 OX', a: 'ABFCED' }],
        ex: 'Baca P1 dari posisi 5: F E D A C B. Buang F, C: E D A B. Hasil: A B F C E D.' },
      { q: 'Periksa offspring 1 PMX dan offspring 1 OX: apakah setiap kota muncul tepat sekali? Di posisi mana saja gen kedua offspring sama?',
        fields: [
          { label: 'Semua valid? (ya/tidak)', a: ['ya', 'yes'] },
          { label: 'Posisi yang gennya sama', a: '3 4 5 6', set: true }
        ],
        ex: 'PMX F E C B A D, OX E F C B A D. Keduanya permutasi sah. Segmen (posisi 3-4) pasti sama; posisi 5, 6 kebetulan juga sama, sedangkan posisi 1, 2 berbeda karena PMX mewarisi posisi absolut P2 dan OX mewarisi urutan relatif P2.' }
    ],
    ex: 'Soal buatan sendiri mengikuti slide minggu 5; kunci dihitung dengan kode.' },
  { type: 'steps',
    q: 'Penjadwalan 8 pekerjaan (1-8). P1 = 1 2 3 4 5 6 7 8 dan P2 = 3 7 5 1 6 8 2 4. Segmen = posisi 3 sampai 5. Perhatikan: PMX kadang perlu mengikuti mapping lebih dari sekali.',
    steps: [
      { q: 'PMX, offspring 1 (segmen posisi 3-5 dari P1). Tulis segmen yang disalin, lalu offspring-nya.',
        fields: [{ label: 'Segmen dari P1', a: '345' }, { label: 'Offspring 1 PMX', a: '67345821' }],
        ex: 'Mapping: 3↔5, 4↔1, 5↔6. Isi posisi lain dari P2; jika gennya sudah ada di segmen, ikuti mapping. Rantai mapping: posisi 1: 3 → 5 → 6; posisi 8: 4 → 1. Hasil: 6 7 3 4 5 8 2 1.' },
      { q: 'PMX, offspring 2 (peran dibalik: segmen dari P2, sisa dari P1).',
        fields: [{ label: 'Offspring 2 PMX', a: '42516378' }],
        ex: 'Mapping: 5↔3, 1↔4, 6↔5. Rantai: posisi 1: 1 → 4; posisi 6: 6 → 5 → 3. Hasil: 4 2 5 1 6 3 7 8.' },
      { q: 'OX, offspring 1 (segmen posisi 3-5 dari P1). Tulis urutan baca P2 mulai posisi 6 (melingkar), sisa setelah membuang gen segmen, lalu offspring.',
        fields: [
          { label: 'Urutan baca P2', a: '82437516' },
          { label: 'Sisa setelah dibuang', a: '82716' },
          { label: 'Offspring 1 OX', a: '16345827' }
        ],
        ex: 'Baca P2 dari posisi 6: 8 2 4 3 7 5 1 6. Buang 3, 4, 5: 8 2 7 1 6. Isi posisi 6…8 lalu 1…2: 1 6 3 4 5 8 2 7.' },
      { q: 'OX, offspring 2 (segmen dari P2, urutan dibaca dari P1).',
        fields: [{ label: 'Offspring 2 OX', a: '34516782' }],
        ex: 'Baca P1 dari posisi 6: 6 7 8 1 2 3 4 5. Buang 5, 1, 6: 7 8 2 3 4. Hasil: 3 4 5 1 6 7 8 2.' },
      { q: 'Mengapa mapping PMX harus diulang sampai gen tidak lagi berada di segmen?',
        points: [
          'Gen hasil mapping pertama bisa ternyata juga ada di segmen yang disalin',
          'Jika langsung dipakai, offspring berisi duplikat',
          'Mapping diulang (rantai) sampai mendapat gen yang belum dipakai',
          'Hasil akhirnya tetap permutasi yang valid'
        ] }
    ],
    ex: 'Soal buatan sendiri mengikuti slide minggu 5; kunci dihitung dengan kode.' },
  { type: 'steps',
    q: 'Robot gudang mengunjungi 7 rak (A-G). P1 = G B D A E C F, P2 = C E A F G D B. Segmen = posisi 2 sampai 4.',
    steps: [
      { q: 'PMX, offspring 1 (segmen posisi 2-4 dari P1). Tulis segmen yang disalin, lalu offspring-nya.',
        fields: [{ label: 'Segmen dari P1', a: 'BDA' }, { label: 'Offspring 1 PMX', a: 'CBDAGFE' }],
        ex: 'Mapping: B↔E, D↔A, A↔F. Isi posisi lain dari P2; jika gennya sudah ada di segmen, ikuti mapping. Rantai mapping: posisi 6: D → A → F; posisi 7: B → E. Hasil: C B D A G F E.' },
      { q: 'PMX, offspring 2 (peran dibalik: segmen dari P2, sisa dari P1).',
        fields: [{ label: 'Offspring 2 PMX', a: 'GEAFBCD' }],
        ex: 'Mapping: E↔B, A↔D, F↔A. Rantai: posisi 5: E → B; posisi 7: F → A → D. Hasil: G E A F B C D.' },
      { q: 'OX, offspring 1 (segmen posisi 2-4 dari P1). Tulis urutan baca P2 mulai posisi 5 (melingkar), sisa setelah membuang gen segmen, lalu offspring.',
        fields: [
          { label: 'Urutan baca P2', a: 'GDBCEAF' },
          { label: 'Sisa setelah dibuang', a: 'GCEF' },
          { label: 'Offspring 1 OX', a: 'FBDAGCE' }
        ],
        ex: 'Baca P2 dari posisi 5: G D B C E A F. Buang B, D, A: G C E F. Isi posisi 5…7 lalu 1…1: F B D A G C E.' },
      { q: 'OX, offspring 2 (segmen dari P2, urutan dibaca dari P1).',
        fields: [{ label: 'Offspring 2 OX', a: 'DEAFCGB' }],
        ex: 'Baca P1 dari posisi 5: E C F G B D A. Buang E, A, F: C G B D. Hasil: D E A F C G B.' }
    ],
    ex: 'Soal buatan sendiri mengikuti slide minggu 5; kunci dihitung dengan kode.' },
  { type: 'steps',
    q: 'Urutan 9 pekerjaan perakitan. P1 = 9 4 2 6 1 5 3 7 8 dan P2 = 2 8 7 3 4 1 9 5 6. Segmen = posisi 4 sampai 6.',
    steps: [
      { q: 'PMX, offspring 1 (segmen posisi 4-6 dari P1). Tulis segmen yang disalin, lalu offspring-nya.',
        fields: [{ label: 'Segmen dari P1', a: '615' }, { label: 'Offspring 1 PMX', a: '287615943' }],
        ex: 'Mapping: 6↔3, 1↔4, 5↔1. Isi posisi lain dari P2; jika gennya sudah ada di segmen, ikuti mapping. Rantai mapping: posisi 8: 5 → 1 → 4; posisi 9: 6 → 3. Hasil: 2 8 7 6 1 5 9 4 3.' },
      { q: 'PMX, offspring 2 (peran dibalik: segmen dari P2, sisa dari P1).',
        fields: [{ label: 'Offspring 2 PMX', a: '952341678' }],
        ex: 'Mapping: 3↔6, 4↔1, 1↔5. Rantai: posisi 2: 4 → 1 → 5; posisi 7: 3 → 6. Hasil: 9 5 2 3 4 1 6 7 8.' },
      { q: 'OX, offspring 1 (segmen posisi 4-6 dari P1). Tulis urutan baca P2 mulai posisi 7 (melingkar), sisa setelah membuang gen segmen, lalu offspring.',
        fields: [
          { label: 'Urutan baca P2', a: '956287341' },
          { label: 'Sisa setelah dibuang', a: '928734' },
          { label: 'Offspring 1 OX', a: '734615928' }
        ],
        ex: 'Baca P2 dari posisi 7: 9 5 6 2 8 7 3 4 1. Buang 6, 1, 5: 9 2 8 7 3 4. Isi posisi 7…9 lalu 1…3: 7 3 4 6 1 5 9 2 8.' },
      { q: 'OX, offspring 2 (segmen dari P2, urutan dibaca dari P1).',
        fields: [{ label: 'Offspring 2 OX', a: '265341789' }],
        ex: 'Baca P1 dari posisi 7: 3 7 8 9 4 2 6 1 5. Buang 3, 4, 1: 7 8 9 2 6 5. Hasil: 2 6 5 3 4 1 7 8 9.' }
    ],
    ex: 'Soal buatan sendiri mengikuti slide minggu 5; kunci dihitung dengan kode.' },
  { type: 'steps',
    q: 'Tim memilih operator crossover untuk empat masalah permutasi berbeda.\nA. Rute TSP 30 kota (yang penting kota mana bersebelahan).\nB. Menempatkan 10 dosen ke 10 ruang ujian, satu dosen per ruang (yang penting dosen X di ruang Y).\nC. Urutan kunjungan teknisi ke pelanggan.\nD. Penugasan 8 mesin ke 8 posisi lini produksi.',
    steps: [
      { q: 'PMX atau OX untuk tiap masalah?',
        fields: [
          { label: 'A', a: ['OX', 'order crossover'] },
          { label: 'B', a: ['PMX', 'partially mapped crossover'] },
          { label: 'C', a: ['OX', 'order crossover'] },
          { label: 'D', a: ['PMX', 'partially mapped crossover'] }
        ],
        ex: 'Pertanyaan panduan: jika seluruh urutan digeser satu posisi, apakah solusinya memburuk? Rute (A, C) tidak memburuk, posisi tidak penting: OX menjaga urutan relatif. Penugasan (B, D) memburuk, posisi penting: PMX menjaga posisi absolut.' },
      { q: 'Isi tabel perbandingan.',
        fields: [
          { label: 'PMX menjaga', a: ['posisi', 'posisi absolut', 'absolute position'] },
          { label: 'OX menjaga', a: ['urutan', 'urutan relatif', 'relative order'] },
          { label: 'Mekanisme perbaikan PMX', a: ['mapping', 'pemetaan'] },
          { label: 'Mekanisme perbaikan OX', a: ['tidak ada', 'tidak perlu', 'none', 'diisi berurutan'] }
        ],
        ex: 'PMX memperbaiki konflik lewat mapping antarsegmen. OX tidak butuh perbaikan: sisa posisi diisi berurutan dari induk kedua tanpa duplikat.' },
      { q: 'Mengapa offspring PMX dan OX berbeda walaupun memakai segmen yang sama dari induk yang sama?',
        points: [
          'Segmen dari P1 sama di kedua operator',
          'PMX mengisi sisa posisi dengan gen P2 di posisi yang sama (diperbaiki lewat mapping)',
          'OX mengisi sisa posisi dengan urutan P2 mulai setelah segmen, mengabaikan posisi aslinya',
          'Jadi PMX mewarisi posisi, OX mewarisi urutan'
        ] }
    ],
    ex: 'Panduan pemilihan dari slide minggu 5 (PMX or OX?).' }
]);

BANK.isian('ka', 'tsp', 'GA Kombinatorial: GA untuk TSP', [
  { type: 'steps',
    q: 'Kurir di Bandung mengunjungi 5 lokasi (A-E) dalam satu putaran yang kembali ke lokasi awal. Jarak (km) ada di tabel. Kromosom = urutan kunjungan, fitness = 1 / panjang tur.',
    table: { head: ['', 'A', 'B', 'C', 'D', 'E'],
      rows: [
        ['A', '-', 7, 9, 8, 5],
        ['B', 7, '-', 4, 6, 9],
        ['C', 9, 4, '-', 3, 7],
        ['D', 8, 6, 3, '-', 4],
        ['E', 5, 9, 7, 4, '-']
      ] },
    steps: [
      { q: 'Hitung panjang tur dan fitness (5 desimal) untuk T1 = A B D C E, T2 = A C B E D, T3 = A D B C E, T4 = A E B D C. Jangan lupa ruas terakhir kembali ke kota awal.',
        fields: [
          { label: 'Panjang T1', a: 28, tol: 0 },
          { label: 'Fitness T1', a: 0.03571, tol: 0.00002 },
          { label: 'Panjang T2', a: 34, tol: 0 },
          { label: 'Fitness T2', a: 0.02941, tol: 0.00002 },
          { label: 'Panjang T3', a: 30, tol: 0 },
          { label: 'Fitness T3', a: 0.03333, tol: 0.00002 },
          { label: 'Panjang T4', a: 32, tol: 0 },
          { label: 'Fitness T4', a: 0.03125, tol: 0.00002 }
        ],
        ex: 'T1: 7 + 6 + 3 + 7 + 5 = 28. T2: 9 + 4 + 9 + 4 + 8 = 34. T3: 8 + 6 + 4 + 7 + 5 = 30. T4: 5 + 9 + 6 + 3 + 9 = 32.' },
      { q: 'Hitung probabilitas kumulatif roulette (4 desimal), lalu pilih dua induk dengan r = 0,60 dan 0,40.',
        fields: [
          { label: 'Kumulatif T1', a: 0.2753, tol: 0.0012 },
          { label: 'Kumulatif T2', a: 0.5021, tol: 0.0012 },
          { label: 'Kumulatif T3', a: 0.7591, tol: 0.0012 },
          { label: 'Kumulatif T4', a: 1, tol: 0.0012 },
          { label: 'Induk 1', a: 'T3' },
          { label: 'Induk 2', a: 'T2' }
        ],
        ex: 'Total fitness 0,12971. P = 0,2753; 0,2268; 0,2570; 0,2409. r = 0,60 → T3, r = 0,40 → T2. Fitness 1/L membuat peluang sangat mirip (semua sekitar 25%): contoh "fitness values too close".' },
      { q: 'Lakukan OX dengan segmen posisi 2-4. Offspring 1: segmen dari induk 1, urutan dari induk 2. Offspring 2: kebalikannya. Hitung panjang keduanya.',
        fields: [
          { label: 'Offspring 1', a: 'EDBCA' },
          { label: 'Panjang offspring 1', a: 28, tol: 0 },
          { label: 'Offspring 2', a: 'DCBEA' },
          { label: 'Panjang offspring 2', a: 29, tol: 0 }
        ],
        ex: 'Offspring 1 = E D B C A (28 km). Offspring 2 = D C B E A (29 km). Tiap kota tetap muncul tepat sekali, dan kedua anak lebih pendek dari kedua induknya (30 dan 34 km).' },
      { q: 'Offspring yang lebih panjang dimutasi dengan inversion posisi 2-4 (urutan di dalam segmen dibalik). Tulis tur baru dan panjangnya. Berapa ruas (adjacency) yang berubah?',
        fields: [
          { label: 'Tur setelah inversion', a: 'DEBCA' },
          { label: 'Panjang', a: 34, tol: 0 },
          { label: 'Ruas yang berubah', a: 2, tol: 0 }
        ],
        ex: 'D C B E A → D E B C A (34 km). Inversion hanya memutus 2 ruas di ujung segmen; ruas di dalam segmen tetap ada, hanya arahnya terbalik, dan pada TSP simetris arah tidak berpengaruh.' },
      { q: 'Jelaskan mengapa fitness = 1 / panjang dan mengapa operator OX + inversion cocok untuk TSP.',
        points: [
          'TSP adalah minimasi, roulette butuh fitness besar untuk tur pendek: 1/L membalik urutan dan selalu positif',
          'Kromosom TSP permutasi, jadi crossover harus menjaga setiap kota muncul tepat sekali',
          'Yang penting di TSP adalah urutan relatif (kota bersebelahan), dan OX menjaga urutan itu',
          'Inversion merusak ruas paling sedikit (2), jadi struktur tur terjaga'
        ] }
    ],
    ex: 'Soal buatan sendiri mengikuti slide minggu 5; kunci dihitung dengan kode.' },
  { type: 'steps',
    q: 'Enam titik pengantaran makanan (A-F) dengan jarak pada tabel (km). Dua tur induk: P1 = A F C D B E dan P2 = C A B D E F. Segmen crossover = posisi 3-4.',
    table: { head: ['', 'A', 'B', 'C', 'D', 'E', 'F'],
      rows: [
        ['A', '-', 4, 7, 9, 8, 3],
        ['B', 4, '-', 3, 8, 9, 6],
        ['C', 7, 3, '-', 4, 7, 9],
        ['D', 9, 8, 4, '-', 3, 8],
        ['E', 8, 9, 7, 3, '-', 5],
        ['F', 3, 6, 9, 8, 5, '-']
      ] },
    steps: [
      { q: 'Hitung panjang P1 dan P2.',
        fields: [{ label: 'Panjang P1', a: 41, tol: 0 }, { label: 'Panjang P2', a: 36, tol: 0 }],
        ex: 'P1: 41 km. P2: 36 km.' },
      { q: 'Buat offspring dengan OX dan dengan PMX (segmen dari P1, sisa dari P2), lalu hitung panjangnya.',
        fields: [
          { label: 'Offspring OX', a: 'ABCDEF' },
          { label: 'Panjang OX', a: 22, tol: 0 },
          { label: 'Offspring PMX', a: 'BACDEF' },
          { label: 'Panjang PMX', a: 29, tol: 0 }
        ],
        ex: 'OX: baca P2 dari posisi 5 (E F C A B D), buang C, D, isi posisi 5, 6, 1, 2 → A B C D E F (22 km). PMX: mapping C↔B, D↔D → B A C D E F (29 km).' },
      { q: 'Bandingkan hasilnya dengan induk. Apa yang ditunjukkan contoh ini?',
        points: [
          'Offspring OX lebih pendek dari kedua induk: crossover yang menjaga urutan bisa menggabungkan bagian baik dua tur',
          'Kedua induk hanya sedang, tetapi anaknya jauh lebih baik',
          'OX menjaga urutan relatif P2, cocok untuk TSP',
          'PMX menjaga posisi absolut, kurang bermakna untuk tur melingkar'
        ] }
    ],
    ex: 'Induk dari studi kasus slide minggu 5 (Six Deliveries in One Round); jarak dibuat sendiri, jadi panjangnya berbeda dari slide. Kunci dihitung dengan kode.' },
  { type: 'steps',
    q: 'Perusahaan logistik mempertimbangkan GA untuk TSP dengan jumlah kota yang terus bertambah. Kromosom memakai encoding permutasi tanpa kota awal tetap.',
    steps: [
      { q: 'Isi tabel untuk n = 6, 8, dan 10 kota.',
        fields: [
          { label: '6 kota: permutasi', a: 720, tol: 0 },
          { label: '6 kota: tur unik (n!/2n)', a: 60, tol: 0 },
          { label: '8 kota: permutasi', a: 40320, tol: 0 },
          { label: '8 kota: tur unik', a: 2520, tol: 0 },
          { label: '10 kota: permutasi', a: 3628800, tol: 0 },
          { label: '10 kota: tur unik', a: 181440, tol: 0 }
        ],
        ex: 'Tiap tur ditulis oleh 2n kromosom (n titik awal × 2 arah). 720/12 = 60; 40.320/16 = 2.520; 3.628.800/20 = 181.440.' },
      { q: 'Jika titik awal ditetapkan (misalnya selalu mulai dari gudang A), berapa permutasi yang perlu dicari untuk 10 kota, dan berapa panjang kromosomnya?',
        fields: [{ label: 'Permutasi ((n − 1)!)', a: 362880, tol: 0 }, { label: 'Panjang kromosom', a: 9, tol: 0 }],
        ex: 'Gudang tetap di depan, jadi hanya 9 kota sisanya yang diurutkan: 9! = 362.880 dan kromosom 9 gen.' },
      { q: 'Mengapa banyaknya kromosom yang mewakili tur sama penting diketahui?',
        points: [
          'Dua induk yang terlihat sangat berbeda bisa ternyata tur yang sama (beda titik awal atau arah)',
          'Crossover antara keduanya tidak menghasilkan apa pun yang baru',
          'Ruang pencarian efektif lebih kecil dari n!',
          'Bisa diatasi dengan menetapkan kota awal (normalisasi)'
        ] }
    ],
    ex: 'Hitungan 2n mengikuti slide minggu 5 (How Many Chromosomes Are the Same Tour?).' },
  { type: 'steps',
    q: 'Teknisi ISP mengunjungi 6 pelanggan (A-F). Tur saat ini T = A B C D E F, jarak pada tabel (km). Tim membandingkan tiga operator mutasi permutasi pada posisi 2 dan 5.',
    table: { head: ['', 'A', 'B', 'C', 'D', 'E', 'F'],
      rows: [
        ['A', '-', 5, 9, 12, 10, 4],
        ['B', 5, '-', 4, 9, 11, 8],
        ['C', 9, 4, '-', 5, 8, 10],
        ['D', 12, 9, 5, '-', 4, 11],
        ['E', 10, 11, 8, 4, '-', 6],
        ['F', 4, 8, 10, 11, 6, '-']
      ] },
    steps: [
      { q: 'Hitung panjang T.', fields: [{ label: 'Panjang T', a: 28, tol: 0 }], ex: 'A-B-C-D-E-F-A = 28 km.' },
      { q: 'Swap posisi 2 dan 5. Tulis tur baru, panjangnya, dan jumlah ruas yang berubah.',
        fields: [{ label: 'Tur', a: 'AECDBF' }, { label: 'Panjang', a: 44, tol: 0 }, { label: 'Ruas berubah', a: 4, tol: 0 }],
        ex: 'A E C D B F, 44 km, 4 ruas putus (dua di sekitar tiap posisi yang ditukar).' },
      { q: 'Insertion: ambil gen di posisi 2, sisipkan ke posisi 5.',
        fields: [{ label: 'Tur', a: 'ACDEBF' }, { label: 'Panjang', a: 41, tol: 0 }, { label: 'Ruas berubah', a: 3, tol: 0 }],
        ex: 'A C D E B F, 41 km, 3 ruas putus.' },
      { q: 'Inversion posisi 2 sampai 5.',
        fields: [{ label: 'Tur', a: 'AEDCBF' }, { label: 'Panjang', a: 35, tol: 0 }, { label: 'Ruas berubah', a: 2, tol: 0 }],
        ex: 'A E D C B F, 35 km, 2 ruas putus. Ruas di dalam segmen tetap, hanya arahnya terbalik.' },
      { q: 'Urutkan ketiga operator dari disruption terkecil, dan hubungkan dengan hasil studi kasus 40 kota di slide.',
        points: [
          'Inversion (2 ruas) < insertion (3 ruas) < swap (4 ruas)',
          'Studi kasus 40 kota: rata-rata panjang tur swap 730, insertion 616, inversion 562',
          'Operator yang paling sedikit merusak ruas menjaga struktur tur, sehingga menemukan tur lebih pendek',
          'Semua operator tetap menghasilkan permutasi valid'
        ] }
    ],
    ex: 'Soal buatan sendiri mengikuti slide minggu 5; kunci dihitung dengan kode.' },
  { type: 'steps',
    q: 'Robot penyiram taman mengunjungi 6 titik (A-F) lalu kembali ke titik awal. Populasi berisi 6 rute. Seleksi memakai binary tournament (rute yang lebih pendek menang) dan elitisme k = 1.',
    table: { head: ['', 'A', 'B', 'C', 'D', 'E', 'F'],
      rows: [
        ['A', '-', 6, 4, 9, 7, 5],
        ['B', 6, '-', 5, 4, 8, 9],
        ['C', 4, 5, '-', 6, 3, 8],
        ['D', 9, 4, 6, '-', 5, 7],
        ['E', 7, 8, 3, 5, '-', 4],
        ['F', 5, 9, 8, 7, 4, '-']
      ] },
    steps: [
      { q: 'Hitung panjang setiap rute: R1 = A B D C E F, R2 = A C E D B F, R3 = A F E D C B, R4 = A D B F C E, R5 = A C B D E F, R6 = A E F B D C.',
        fields: [
          { label: 'Panjang R1', a: 28, tol: 0 },
          { label: 'Panjang R2', a: 30, tol: 0 },
          { label: 'Panjang R3', a: 31, tol: 0 },
          { label: 'Panjang R4', a: 40, tol: 0 },
          { label: 'Panjang R5', a: 27, tol: 0 },
          { label: 'Panjang R6', a: 34, tol: 0 }
        ],
        ex: 'R1 = 28, R2 = 30, R3 = 31, R4 = 40, R5 = 27, R6 = 34 km. Rute terbaik R5 (27 km).' },
      { q: 'Empat turnamen mengambil pasangan acak (R4, R2), (R6, R4), (R3, R5), (R1, R6). Siapa pemenang tiap turnamen?',
        fields: [
          { label: 'Turnamen 1', a: 'R2' },
          { label: 'Turnamen 2', a: 'R6' },
          { label: 'Turnamen 3', a: 'R5' },
          { label: 'Turnamen 4', a: 'R1' }
        ],
        ex: 'R4 40 vs R2 30 → R2; R6 34 vs R4 40 → R6; R3 31 vs R5 27 → R5; R1 28 vs R6 34 → R1. Tournament tidak butuh fitness 1/L: cukup membandingkan panjang.' },
      { q: 'Pemenang turnamen 1 dan 2 menjadi induk. Lakukan OX dengan segmen posisi 3-5 (offspring 1: segmen dari induk 1). Tulis kedua offspring dan panjangnya.',
        fields: [
          { label: 'Offspring 1', a: 'AFEDBC' },
          { label: 'Panjang offspring 1', a: 27, tol: 0 },
          { label: 'Offspring 2', a: 'CEFBDA' },
          { label: 'Panjang offspring 2', a: 33, tol: 0 }
        ],
        ex: 'Induk R2 × R6. Offspring 1 = A F E D B C (27 km), offspring 2 = C E F B D A (33 km).' },
      { q: 'Rute mana yang dibawa ke generasi berikutnya oleh elitisme k = 1? Jelaskan keuntungan tournament dibanding roulette pada TSP.',
        fields: [{ label: 'Rute elit', a: 'R5' }],
        ex: 'R5 adalah rute terpendek (27 km), jadi disalin tanpa diubah. Tournament tidak peka skala dan tidak perlu transformasi minimasi ke fitness; tekanan seleksi diatur dengan k. Slide: GA yang di-tuning (tournament, elitism, inversion 0,2) mencapai 567 melawan Tabu 572.' }
    ],
    ex: 'Soal buatan sendiri mengikuti slide minggu 5; kunci dihitung dengan kode.' },
  { type: 'steps',
    q: 'Robot gudang selalu berangkat dan kembali ke dok 0, lalu mengambil barang di rak 1-5. Karena dok tetap, kromosom hanya berisi urutan 5 rak; rute = 0 → rak sesuai kromosom → 0. Jarak pada tabel (meter).',
    table: { head: ['', '0', '1', '2', '3', '4', '5'],
      rows: [
        ['0', '-', 4, 6, 5, 7, 3],
        ['1', 4, '-', 3, 6, 8, 5],
        ['2', 6, 3, '-', 4, 6, 7],
        ['3', 5, 6, 4, '-', 3, 6],
        ['4', 7, 8, 6, 3, '-', 5],
        ['5', 3, 5, 7, 6, 5, '-']
      ] },
    steps: [
      { q: 'Hitung panjang rute untuk P1 = 3 1 5 2 4 dan P2 = 2 5 1 4 3.',
        fields: [{ label: 'Panjang P1', a: 36, tol: 0 }, { label: 'Panjang P2', a: 34, tol: 0 }],
        ex: 'P1: 0-3-1-5-2-4-0 = 36. P2: 0-2-5-1-4-3-0 = 34.' },
      { q: 'OX dengan segmen posisi 2-4 dari P1. Tulis offspring dan panjang rutenya.',
        fields: [
          { label: 'Urutan baca P2 dari posisi 5', a: '32514' },
          { label: 'Offspring', a: '41523' },
          { label: 'Panjang rute', a: 36, tol: 0 }
        ],
        ex: 'Segmen 1 5 2. Baca P2 dari posisi 5 (melingkar): 3 2 5 1 4. Buang 1, 5, 2: 3 4. Isi posisi 5 lalu 1: 4 1 5 2 3 (36 m).' },
      { q: 'Mutasi inversion posisi 1-3 pada offspring. Tulis urutan baru dan panjangnya.',
        fields: [{ label: 'Setelah inversion', a: '51423' }, { label: 'Panjang rute', a: 31, tol: 0 }],
        ex: '4 1 5 2 3 → 5 1 4 2 3 (31 m).' },
      { q: 'Apa keuntungan menetapkan dok sebagai titik awal tetap pada encoding ini?',
        points: [
          'Kromosom lebih pendek (5 gen, bukan 6)',
          'Ruang pencarian turun dari 6! = 720 menjadi 5! = 120',
          'Rotasi tur yang sama tidak lagi muncul sebagai kromosom berbeda',
          'Operator permutasi (OX, inversion) tetap bisa dipakai apa adanya'
        ] }
    ],
    ex: 'Soal buatan sendiri mengikuti slide minggu 5; kunci dihitung dengan kode.' }
]);

BANK.isian('ka', 'lks', 'Latihan dari Slide Week 1-3', [
  { type: 'steps',
    q: 'Latihan slide minggu 2 (Decode Three Chromosomes). Domain x ∈ [−5, 5], panjang kromosom n = 6. Dekode dengan x = x_min + (x_max − x_min)/(2^n − 1) × d.',
    steps: [
      { q: 'Hitung d dan x untuk 101010, 000111, dan 111111 (4 desimal).',
        fields: [
          { label: 'd 101010', a: 42, tol: 0 },
          { label: 'x 101010', a: 1.6667, tol: 0.0006 },
          { label: 'd 000111', a: 7, tol: 0 },
          { label: 'x 000111', a: -3.8889, tol: 0.0006 },
          { label: 'd 111111', a: 63, tol: 0 },
          { label: 'x 111111', a: 5, tol: 0.0006 }
        ],
        ex: 'Langkah = 10/63 ≈ 0,1587. 101010 = 42 → −5 + 42 × 10/63 = 1,6667. 000111 = 7 → −3,8889. 111111 = 63 → 5.' },
      { q: 'Kromosom mana yang menghasilkan x = 5 tepat, dan mana yang menghasilkan x = −5?',
        fields: [{ label: 'x = 5', a: '111111' }, { label: 'x = −5', a: '000000' }],
        ex: 'd maksimum (63) memetakan ke x_max, d = 0 ke x_min. Biner kecil → x kecil, biner besar → x besar.' },
      { q: 'Berapa bit minimal agar langkahnya tidak lebih dari 0,01 pada domain yang sama?',
        fields: [{ label: 'Bit minimal', a: 10, tol: 0 }],
        ex: 'Butuh 2^n − 1 ≥ 10/0,01 = 1.000. 2^10 − 1 = 1.023 cukup, 2^9 − 1 = 511 belum. Jadi 10 bit.' }
    ],
    ex: 'Latihan slide; kunci dihitung sendiri karena slide tidak memberi jawaban.' },
  { type: 'steps',
    q: 'Latihan slide minggu 2 (Two Variables in One Chromosome). Kromosom 12 bit: 6 bit pertama mengodekan x ∈ [0, 20], 6 bit terakhir mengodekan y ∈ [−10, 10]. Kromosom: 101101 001110.',
    steps: [
      { q: 'Ubah tiap blok ke desimal (0-63), lalu petakan ke x dan y (4 desimal).',
        fields: [
          { label: 'Desimal blok x', a: 45, tol: 0 },
          { label: 'x', a: 14.2857, tol: 0.0006 },
          { label: 'Desimal blok y', a: 14, tol: 0 },
          { label: 'y', a: -5.5556, tol: 0.0006 }
        ],
        ex: '101101 = 45 → x = 0 + 45 × 20/63 = 14,2857. 001110 = 14 → y = −10 + 14 × 20/63 = −5,5556.' },
      { q: 'Berapa perubahan terkecil x dan y yang bisa diwakili encoding ini?',
        fields: [{ label: 'Resolusi x', a: 0.3175, tol: 0.0006 }, { label: 'Resolusi y', a: 0.3175, tol: 0.0006 }],
        ex: 'Resolusi = rentang / (2^6 − 1) = 20/63 ≈ 0,3175 untuk keduanya, karena rentang x dan y sama-sama 20.' },
      { q: 'Jika kedua variabel butuh presisi yang sama, berapa bit seharusnya tiap blok?',
        fields: [{ label: 'Jawaban', a: ['sama', 'sama banyak', '6', '6 bit', 'sama, 6 bit'] }],
        ex: 'Bit yang dibutuhkan bergantung pada rentang/presisi. Rentang x dan y sama (20), jadi jumlah bitnya sama; di sini 6 bit masing-masing.' }
    ],
    ex: 'Latihan slide; kunci dihitung sendiri.' },
  { type: 'steps',
    q: 'Latihan slide minggu 2 (Roulette Wheel Against the Clock). Lima individu: A = 10110 (f = 5,40), B = 01001 (f = 2,15), C = 11100 (f = 7,85), D = 00011 (f = 1,60), E = 10001 (f = 4,00). Pilih empat induk dengan roulette wheel.',
    steps: [
      { q: 'Hitung total fitness dan P tiap individu (4 desimal).',
        fields: [
          { label: 'Total', a: 21, tol: 0.001 },
          { label: 'P A', a: 0.2571, tol: 0.0006 },
          { label: 'P B', a: 0.1024, tol: 0.0006 },
          { label: 'P C', a: 0.3738, tol: 0.0006 },
          { label: 'P D', a: 0.0762, tol: 0.0006 },
          { label: 'P E', a: 0.1905, tol: 0.0006 }
        ],
        ex: 'Total 21,00. P = A 0,2571, B 0,1024, C 0,3738, D 0,0762, E 0,1905.' },
      { q: 'Tulis kolom kumulatif (harus berakhir tepat 1,0000).',
        fields: [
          { label: 'Kumulatif A', a: 0.2571, tol: 0.0012 },
          { label: 'Kumulatif B', a: 0.3595, tol: 0.0012 },
          { label: 'Kumulatif C', a: 0.7333, tol: 0.0012 },
          { label: 'Kumulatif D', a: 0.8095, tol: 0.0012 },
          { label: 'Kumulatif E', a: 1, tol: 0.0012 }
        ],
        ex: 'Kumulatif: 0,2571; 0,3595; 0,7333; 0,8095; 1,0000.' },
      { q: 'Pilih induk untuk r = 0,08; 0,33; 0,61; 0,94.',
        fields: [
          { label: 'r = 0,08', a: 'A' },
          { label: 'r = 0,33', a: 'B' },
          { label: 'r = 0,61', a: 'C' },
          { label: 'r = 0,94', a: 'E' }
        ],
        ex: '0,08 → A, 0,33 → B, 0,61 → C, 0,94 → E. D (fitness terkecil) tidak terpilih kali ini, tetapi tetap punya peluang 7,6%.' }
    ],
    ex: 'Latihan slide; kunci dihitung sendiri.' },
  { type: 'steps',
    q: 'Latihan slide minggu 3 (Uniform Crossover and the Cut-Point Trap). P1 = 11010011, P2 = 01101101.',
    steps: [
      { q: 'Single-point crossover: tulis offspring untuk potongan setelah gen 3, lalu setelah gen 5.',
        fields: [
          { label: 'Potong 3: offspring 1', a: '11001101' },
          { label: 'Potong 3: offspring 2', a: '01110011' },
          { label: 'Potong 5: offspring 1', a: '11010101' },
          { label: 'Potong 5: offspring 2', a: '01101011' }
        ],
        ex: '110|10011 × 011|01101 → 11001101, 01110011. 11010|011 × 01101|101 → 11010101, 01101011.' },
      { q: 'Berapa gen yang berbeda antara offspring 1 potongan 3 dan offspring 1 potongan 5?',
        fields: [{ label: 'Gen berbeda', a: 2, tol: 0 }],
        ex: '11001101 vs 11010101: berbeda 2 gen, yaitu di antara kedua titik potong (gen 4-5), dan hanya di posisi yang nilai induknya berbeda.' },
      { q: 'Uniform crossover dengan mask 01100101, di mana 1 berarti ambil gen dari P2 dan 0 dari P1. Tulis offspring-nya.',
        fields: [{ label: 'Offspring uniform', a: '11110111' }],
        ex: 'Per posisi mengikuti mask → 11110111.' },
      { q: 'Di posisi mana keempat offspring single-point dan offspring uniform pasti sama? Mengapa?',
        fields: [{ label: 'Posisi', a: '2 8', set: true }],
        ex: 'P1 dan P2 sama-sama bernilai 1 di posisi 2 dan 8. Crossover hanya memilih gen dari salah satu induk, jadi posisi yang sama di kedua induk pasti sama di semua offspring.' }
    ],
    ex: 'Latihan slide; kunci dihitung sendiri.' },
  { type: 'steps',
    q: 'Latihan slide minggu 3 (Read the Instruction Exactly). A = 100110, B = 011001. Gen dinomori dari kiri ke kanan; potongan dibuat SETELAH gen yang disebut.',
    steps: [
      { q: 'Task A: potong setelah gen 2, lalu setelah gen 4. Tulis kedua pasang offspring.',
        fields: [
          { label: 'Setelah gen 2: offspring 1', a: '101001' },
          { label: 'Setelah gen 2: offspring 2', a: '010110' },
          { label: 'Setelah gen 4: offspring 1', a: '100101' },
          { label: 'Setelah gen 4: offspring 2', a: '011010' }
        ],
        ex: '10|0110 × 01|1001 → 101001, 010110. 1001|10 × 0110|01 → 100101, 011010.' },
      { q: 'Task B: mutasi gen 3 pada A dan gen 6 pada B.',
        fields: [{ label: 'A setelah mutasi', a: '101110' }, { label: 'B setelah mutasi', a: '011000' }],
        ex: 'A: 100110 → 101110. B: 011001 → 011000.' },
      { q: 'Task C: seorang teman membaca "potong setelah gen 2" sebagai "potong sebelum gen 2" (artinya setelah gen 1). Offspring apa yang ia dapat, dan berapa gen meleset dari jawaban yang benar?',
        fields: [
          { label: 'Offspring 1 teman', a: '111001' },
          { label: 'Offspring 2 teman', a: '000110' },
          { label: 'Gen yang meleset per offspring', a: 1, tol: 0 }
        ],
        ex: '1|00110 × 0|11001 → 111001, 000110. Dibanding 101001 dan 010110, hanya gen 2 yang berbeda. A dan B saling komplemen (beda di semua posisi), jadi setiap salah baca titik potong langsung mengubah gen.' }
    ],
    ex: 'Latihan slide; kunci dihitung sendiri.' },
  { type: 'steps',
    q: 'Latihan slide minggu 3 (Complete a Generation Yourself). Populasi empat individu, memaksimalkan f: A = 01011 (f = 3,2), B = 11010 (f = 6,4), C = 00110 (f = 1,8), D = 10001 (f = 4,6). Pakai 4 desimal.',
    steps: [
      { q: 'Langkah 1-2: isi tabel total fitness, probabilitas, dan kumulatif.',
        fields: [
          { label: 'Total', a: 16, tol: 0.001 },
          { label: 'P A', a: 0.2, tol: 0.0006 },
          { label: 'P B', a: 0.4, tol: 0.0006 },
          { label: 'P C', a: 0.1125, tol: 0.0006 },
          { label: 'P D', a: 0.2875, tol: 0.0006 },
          { label: 'Kumulatif A', a: 0.2, tol: 0.0012 },
          { label: 'Kumulatif B', a: 0.6, tol: 0.0012 },
          { label: 'Kumulatif C', a: 0.7125, tol: 0.0012 },
          { label: 'Kumulatif D', a: 1, tol: 0.0012 }
        ],
        ex: 'Total 16,0. P = 0,2000; 0,4000; 0,1125; 0,2875. Kumulatif 0,2000; 0,6000; 0,7125; 1,0000.' },
      { q: 'Langkah 3: pakai r = 0,18; 0,55; 0,72; 0,95 untuk memilih empat induk (berurutan).',
        fields: [
          { label: 'r = 0,18', a: 'A' },
          { label: 'r = 0,55', a: 'B' },
          { label: 'r = 0,72', a: 'D' },
          { label: 'r = 0,95', a: 'D' }
        ],
        ex: '0,18 → A, 0,55 → B, 0,72 → D, 0,95 → D. Pasangan 2 berisi D dua kali.' },
      { q: 'Langkah 4: single-point crossover setelah gen 2 pada setiap pasangan.',
        fields: [
          { label: 'Offspring 1', a: '01010' },
          { label: 'Offspring 2', a: '11011' },
          { label: 'Offspring 3', a: '10001' },
          { label: 'Offspring 4', a: '10001' }
        ],
        ex: 'Pasangan 1 (A × B) → 01010, 11011. Pasangan 2 (D × D) → 10001, 10001: induk identik menghasilkan anak identik. Crossover tidak gagal, hanya tidak ada yang bisa digabung.' },
      { q: 'Langkah 5-6: mutasi gen 4 pada offspring pertama. Dengan elitisme k = 1, individu mana yang dibawa dari populasi lama?',
        fields: [{ label: 'Offspring 1 setelah mutasi', a: '01000' }, { label: 'Individu elit', a: ['B', '11010'] }],
        ex: '01010 → 01000. Elit = B (f = 6,4), menggantikan offspring terburuk setelah offspring dievaluasi.' }
    ],
    ex: 'Latihan slide; kunci dihitung sendiri.' },
  { type: 'steps',
    q: 'Latihan slide minggu 3 (Mutation Rate Arithmetic). Kromosom 40 gen, populasi 60 individu.',
    steps: [
      { q: 'Task A: pm = 1/n. Rata-rata berapa gen berubah per kromosom, dan berapa di seluruh populasi per generasi?',
        fields: [{ label: 'Per kromosom', a: 1, tol: 0 }, { label: 'Per populasi', a: 60, tol: 0 }],
        ex: '40 × 1/40 = 1; 60 × 1 = 60.' },
      { q: 'Task B: pm = 0,5. Berapa gen berubah per kromosom? Algoritma menjadi apa?',
        fields: [
          { label: 'Per kromosom', a: 20, tol: 0 },
          { label: 'Menjadi', a: ['random search', 'pencarian acak', 'acak'] }
        ],
        ex: '40 × 0,5 = 20: setengah kromosom diacak setiap generasi, jadi GA menjadi random search.' },
      { q: 'Task C: pm = 0,001. Rata-rata berapa generasi sebelum satu kromosom tertentu bermutasi? Berapa mutasi per generasi di seluruh populasi?',
        fields: [
          { label: 'Generasi menunggu', a: 25, tol: 0 },
          { label: 'Mutasi per generasi (populasi)', a: 2.4, tol: 0.001 }
        ],
        ex: 'Per kromosom 40 × 0,001 = 0,04 mutasi per generasi, jadi menunggu 1/0,04 = 25 generasi. Per populasi 60 × 0,04 = 2,4.' },
      { q: 'Mana yang lebih cepat terlihat pada kurva fitness terbaik: pm = 0,5 atau pm = 0,001? Jelaskan.',
        points: [
          'pm = 0,5 langsung terlihat: kurva naik turun tanpa kemajuan karena populasi diacak setiap generasi',
          'pm = 0,001 terlihat lambat: kurva mendatar karena tidak ada materi baru (stagnasi)',
          'Keduanya salah arah: terlalu tinggi merusak, terlalu rendah membekukan',
          'Sesuaikan pm dengan tingkat kesulitan masalah, titik awal 1/n'
        ] }
    ],
    ex: 'Latihan slide; kunci dihitung sendiri.' },
  { type: 'steps',
    q: 'Latihan slide minggu 1 (Feel the Size of the Space). Jadwal awal: 30 ujian ke 8 slot, jadi 8^30 ≈ 1,24 × 10^27 kemungkinan.',
    steps: [
      { q: 'Question A: fakultas menambah 2 slot (10 slot). Berapa jadwal sekarang (10^k), dan berapa kali lebih besar?',
        fields: [{ label: 'k', a: 30, tol: 0 }, { label: 'Kali lebih besar (2 desimal)', a: 807.79, tol: 0.5 }],
        ex: '10^30. (10/8)^30 = 1,25^30 ≈ 807,79 kali.' },
      { q: 'Question B: lima mata kuliah baru (35 ujian, tetap 8 slot). Berapa kali lebih besar?',
        fields: [{ label: 'Kali lebih besar', a: 32768, tol: 0 }],
        ex: '8^35 / 8^30 = 8^5 = 32.768 kali.' },
      { q: 'Question C: satu jadwal diubah dengan memindah satu ujian ke slot lain. Berapa tetangga seperti itu yang dimiliki setiap jadwal?',
        fields: [{ label: 'Tetangga', a: 210, tol: 0 }],
        ex: '30 ujian × 7 slot lain = 210 tetangga (sama dengan slide Hill Climbing).' },
      { q: 'Mana yang lebih berat: menambah slot atau menambah ujian? Jelaskan dalam satu kalimat.',
        fields: [{ label: 'Lebih berat', a: ['menambah ujian', 'tambah ujian', 'ujian'] }],
        ex: 'Jumlah ujian adalah pangkat (slot^ujian), jadi setiap ujian baru mengalikan ruang dengan 8, sedangkan slot baru hanya mengubah basisnya.' }
    ],
    ex: 'Latihan slide; kunci dihitung sendiri.' }
]);
