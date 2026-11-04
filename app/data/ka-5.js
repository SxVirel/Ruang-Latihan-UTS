// Kecerdasan Artifisial — soal berpola UTS per materi kisi-kisi, semuanya uraian bertahap.
// Materi 1 Metaheuristic Search, materi 2 Genetic Algorithm, materi 3 GA kombinatorial (TSP, PMX, OX),
// materi 4 Multi-Objective / NSGA-II. Semua angka dihitung dengan kode (part4.js dan part5.js) dan dibulatkan
// 2 desimal, kecuali fitness 1/jarak yang ditulis 4 desimal karena dipakai menghitung proporsi roulette.

BANK.isian('ka', 'cmoo', 'Soal Cerita: NSGA-II (Week 6)', [
  { type: 'steps',
    q: 'Badan penanggulangan bencana menyusun enam rencana rute armada bantuan. Setiap rencana dinilai dengan dua objektif yang keduanya diminimalkan: f1 = waktu tempuh total (menit) dan f2 = biaya bahan bakar (ribu rupiah).\nKeenam rencana sudah dievaluasi: R1 = (30, 90), R2 = (40, 68), R3 = (35, 85), R4 = (50, 60), R5 = (45, 95), R6 = (25, 110).\nCatatan: bulatkan crowding distance dan semua hasil hitungan ke 2 angka di belakang koma.',
    table: { head: ['Rencana', 'f1 (menit)', 'f2 (ribu rupiah)'],
      rows: [['R1', 30, 90], ['R2', 40, 68], ['R3', 35, 85], ['R4', 50, 60], ['R5', 45, 95], ['R6', 25, 110]] },
    steps: [
      { q: 'a. Hitung n_p (banyak solusi yang mendominasi p) untuk setiap rencana. Sebutkan dengan tepat solusi mana saja yang mendominasi R5.',
        fields: [
          { label: 'n_p R1', a: 0, tol: 0 },
          { label: 'n_p R2', a: 0, tol: 0 },
          { label: 'n_p R3', a: 0, tol: 0 },
          { label: 'n_p R4', a: 0, tol: 0 },
          { label: 'n_p R5', a: 3, tol: 0 },
          { label: 'n_p R6', a: 0, tol: 0 },
          { label: 'Yang mendominasi R5 (pisahkan spasi)', a: 'R1 R2 R3', set: true }
        ],
        ex: 'R1: n_p = 0, R2: n_p = 0, R3: n_p = 0, R4: n_p = 0, R5: n_p = 3, R6: n_p = 0. R5 = (45, 95) lebih buruk daripada R1 (30, 90), R2 (40, 68), dan R3 (35, 85) pada kedua objektif sekaligus, jadi ketiganya mendominasi R5. R5 tidak mendominasi siapa pun.' },
      { q: 'b. Tentukan front non-dominated (rank) semua rencana.',
        fields: [{ label: 'Front 1', a: 'R1 R2 R3 R4 R6', set: true }, { label: 'Front 2', a: 'R5', set: true }],
        ex: 'Front 1 = {R1, R2, R3, R4, R6}; Front 2 = {R5}. Front 1 adalah semua yang n_p = 0. R5 baru masuk front 2 setelah R1, R2, dan R3 dikeluarkan dari pertimbangan.' },
      { q: 'c. Hitung crowding distance setiap anggota front 1 (2 desimal). Ingat: rentang dihitung di dalam front itu saja, dan dua ujung tiap objektif bernilai tak hingga.',
        fields: [
          { label: 'CD R1', a: 0.9, tol: 0.006 },
          { label: 'CD R2', a: 1.1, tol: 0.006 },
          { label: 'CD R3', a: 0.84, tol: 0.006 },
          { label: 'CD R4', a: ['∞', 'inf', 'infinity', 'tak hingga'] },
          { label: 'CD R6', a: ['∞', 'inf', 'infinity', 'tak hingga'] },
          { label: 'Rencana dengan CD terkecil', a: 'R3' }
        ],
        ex: 'Urut f1: R6, R1, R3, R2, R4. Rentang f1 = 50 − 25 = 25, rentang f2 = 110 − 60 = 50. R1 = 0,9 = (35 − 25)/25 + (110 − 85)/50; R2 = 1,1 = (50 − 35)/25 + (85 − 60)/50; R3 = 0,84 = (40 − 30)/25 + (90 − 68)/50. R4 dan R6 ujung → ∞. Terkecil R3 (0,84).' },
      { q: 'd. Binary tournament: R1 vs R2, R3 vs R4, R5 vs R6, R2 vs R6. Tentukan pemenang tiap pasangan. Rank lebih kecil menang; bila rank sama, crowding distance lebih besar menang.',
        fields: [
          { label: 'R1 vs R2', a: 'R2' },
          { label: 'R3 vs R4', a: 'R4' },
          { label: 'R5 vs R6', a: 'R6' },
          { label: 'R2 vs R6', a: 'R6' }
        ],
        ex: 'R1 (rank 1, CD 0,9) vs R2 (rank 1, CD 1,1) → R2, diputuskan crowding; R3 (rank 1, CD 0,84) vs R4 (rank 1, CD ∞) → R4, diputuskan crowding; R5 (rank 2, CD ∞) vs R6 (rank 1, CD ∞) → R6, diputuskan rank; R2 (rank 1, CD 1,1) vs R6 (rank 1, CD ∞) → R6, diputuskan crowding.' },
      { q: 'e. Populasi baru hanya menampung N = 4 rencana, diambil dari front 1. Rencana mana yang bertahan dan mana yang dibuang?',
        fields: [{ label: 'Bertahan', a: 'R4 R6 R2 R1', set: true }, { label: 'Dibuang', a: 'R3', set: true }],
        ex: 'R4 dan R6 pasti bertahan karena CD tak hingga, lalu R2 dan R1 yang CD-nya terbesar. R3 dibuang karena berada paling rapat dengan tetangganya, bukan karena solusinya buruk. Ini inti mengapa NSGA-II memakai crowding: rank saja akan membuat populasi bergerombol.' },
      { q: 'f. Jelaskan mengapa NSGA-II tidak cukup memakai weighted sum (skor = w·f1 + (1 − w)·f2), lalu jelaskan arti keputusan yang diambil badan penanggulangan bencana setelah menerima front itu.',
        points: [
          'Bobot w harus dipilih sebelum melihat trade-off yang tersedia, sehingga hasilnya ditentukan di awal',
          'Pada front yang cekung, sebagian solusi tidak pernah terpilih berapa pun nilai w',
          'NSGA-II mencari seluruh front lebih dulu, lalu pemilihan dilakukan setelah semua opsi terlihat (a posteriori)',
          'Keputusan akhirnya politis dan etis, bukan teknis: berapa biaya yang rela dibayar untuk beberapa menit lebih cepat; algoritma hanya menyiapkan pilihan',
          'Weighted sum tetap wajar bila nilai tukar kedua objektif sudah diketahui, misalnya rupiah per menit yang sudah ada standarnya'
        ] }
    ],
    ex: 'Kunci dihitung sendiri dengan kode; soal tidak memberi kunci. Data dibuat sendiri mengikuti pola Week 6 (non-dominated sort, crowding distance, tournament rank lalu crowding, fill N), dengan tambahan keputusan setelah front didapat.' }
]);

BANK.isian('ka', 'cmeta', 'Soal Cerita: Metaheuristic Search (Week 1)', [
  { type: 'steps',
    q: 'Sebuah aplikasi ojek online mengatur berapa driver yang standby per jam di satu kawasan. Manajer mencoba 9 skenario, yaitu 0 sampai 8 driver, lalu mencatat pesanan yang berhasil diselesaikan per jam (makin besar makin baik).\nTetangga sebuah skenario adalah jumlah driver dikurangi 1 atau ditambah 1. Hill Climbing selalu pindah ke tetangga yang nilainya lebih baik, dan berhenti jika tidak ada tetangga yang lebih baik darinya.\nSimulated Annealing (SA) menerima langkah yang memperburuk nilai sebesar ΔE dengan peluang P = exp(−ΔE / T), yaitu diterima jika nilai acak r < P. Suhu awalnya T0 = 90 dan diturunkan secara geometrik T_k = 90 × 0,85^k, dengan k bilangan iterasi mulai dari 0.\nCatatan: bulatkan setiap hasil hitungan ke 2 angka di belakang koma.',
    table: { head: ['Driver', 0, 1, 2, 3, 4, 5, 6, 7, 8], rows: [['Pesanan per jam', 12, 18, 25, 31, 31, 31, 34, 30, 22]] },
    steps: [
      { q: 'a. Jalankan Hill Climbing dari 0 driver. Skenario berapa yang dipilih saat berhenti, berapa pesanan per jam, dan apakah itu global optimum?',
        fields: [
          { label: 'Berhenti di (driver)', a: 3, tol: 0 },
          { label: 'Pesanan per jam', a: 31, tol: 0 },
          { label: 'Global optimum? (ya / tidak)', a: ['tidak', 'bukan', 'no'] }
        ],
        ex: 'x = 0 → 1 → 2 → 3 (berhenti di 3, nilai 31). Skenario 0 hanya punya satu tetangga (1) dan nilainya lebih baik, jadi naik terus sampai 3. Tetangga 3 adalah 2 (25) dan 4 (31): tidak ada yang lebih baik, jadi berhenti di 31. Itu bukan global optimum karena skenario 6 menghasilkan 34.' },
      { q: 'b. Jalankan Hill Climbing dari 4 driver dan dari 5 driver. Di mana masing-masing berhenti, dan kondisi apa yang membuat keduanya berhenti di tempat berbeda?',
        fields: [
          { label: 'Dari 4 berhenti di', a: 4, tol: 0 },
          { label: 'Nilai', a: 31, tol: 0 },
          { label: 'Dari 5 berhenti di', a: 6, tol: 0 },
          { label: 'Nilai', a: 34, tol: 0 },
          { label: 'Nama kondisi', a: ['plateau', 'dataran', 'plateau dataran'] }
        ],
        ex: 'x = 4 (berhenti di 4, nilai 31) dan x = 5 → 6 (berhenti di 6, nilai 34). Tiga skenario berturut-turut (3, 4, 5) bernilai 31 yang sama: inilah plateau. Di 4, semua tetangga sama atau lebih buruk sehingga naik tidak mungkin; di 5, tetangga 6 bernilai 34 sehingga masih bisa naik. Titik awal menentukan hasil.' },
      { q: 'c. SA sedang berada di 6 driver lalu diusulkan pindah ke 7 driver: nilainya turun dari 34 ke 30, jadi ΔE = 4. Hitung P = exp(−ΔE / T) untuk T = 6, T = 3, dan T = 1 (2 desimal). Dengan nilai acak r = 0,30, pada suhu mana usulan itu diterima?',
        fields: [
          { label: 'T = 6', a: 0.51, tol: 0.006 },
          { label: 'T = 3', a: 0.26, tol: 0.006 },
          { label: 'T = 1', a: 0.02, tol: 0.006 },
          { label: 'Diterima pada', a: ['T = 6', '6', 'T=6'] }
        ],
        ex: 'exp(−4/6) = 0,51, exp(−4/3) = 0,26, exp(−4/1) = 0,02. r = 0,30 hanya lebih kecil dari 0,51, jadi usulan diterima pada T = 6 saja. Suhu tinggi di awal = eksplorasi; suhu rendah = SA berubah menjadi Hill Climbing.' },
      { q: 'd. Hitung suhu pada iterasi k = 5 dan k = 20 dengan T_k = 90 × 0,85^k (2 desimal).',
        fields: [{ label: 'T_5', a: 39.93, tol: 0.006 }, { label: 'T_20', a: 3.49, tol: 0.006 }],
        ex: 'T_5 = 90 × 0,85^5 = 90 × 0,4437 = 39,93. T_20 = 90 × 0,85^20 = 90 × 0,0388 = 3,49. Setelah 20 iterasi hampir tidak ada lagi langkah buruk yang diterima.' },
      { q: 'e. Tim lain menjalankan Hill Climbing 4 kali dari titik awal acak dan berhasil menemukan global optimum pada 2 dari 4 run. Jika dijalankan 3 run independen, berapa peluang sedikitnya satu run menemukan global optimum (2 desimal)?',
        fields: [{ label: 'Peluang', a: 0.88, tol: 0.006 }],
        ex: 'Peluang satu run gagal = 1 − 2/4 = 0,50. Tiga run gagal semua = 0,50^3 = 0,125, jadi peluang sedikitnya satu run berhasil = 1 − 0,125 = 0,875 ≈ 0,88. Random restart memperbesar peluang berhasil tanpa mengubah algoritmanya.' },
      { q: 'f. Jelaskan mengapa Hill Climbing bisa berhenti di 31 padahal ada skenario bernilai 34, lalu bandingkan Hill Climbing, Simulated Annealing, dan Tabu Search dalam cara meloloskan local optimum.',
        points: [
          'Hill Climbing hanya menerima tetangga yang lebih baik, jadi berhenti di local optimum atau plateau (skenario 3, 4, 5 bernilai 31)',
          'Simulated Annealing kadang menerima langkah yang memburuk dengan peluang exp(−ΔE/T), sehingga bisa keluar dari basin; peluangnya mengecil saat suhu turun',
          'Tabu Search memakai memori: langkah yang baru dilakukan dilarang selama tenure, sehingga terpaksa bergerak walau memburuk',
          'Ketiganya trajectory-based (satu solusi bergerak); bedanya hanya mekanisme lolos. Random restart adalah cara tambahan untuk Hill Climbing, bukan pengganti algoritmanya',
          'Untuk masalah yang punya banyak local optimum, beberapa run lebih berguna daripada satu run sangat panjang karena hasil tiap run independen'
        ] }
    ],
    ex: 'Kunci dihitung sendiri dengan kode; soal tidak memberi kunci. Data dibuat sendiri mengikuti pola slide Week 1 (Hill Climbing, plateau, Simulated Annealing, random restart).' }
]);

BANK.isian('ka', 'cga', 'Soal Cerita: Satu Generasi GA (Week 2-3)', [
  { type: 'steps',
    q: 'Pabrik keripik singkong punya enam paket pengadaan P1 sampai P6. Keuntungan tiap paket (juta rupiah): P1 = 40, P2 = 25, P3 = 30, P4 = 55, P5 = 18, P6 = 32. Kromosom 6 bit menyatakan paket yang diambil (bit 1 = ambil).\nAturan pabrik: P1 dan P4 memakai mesin penggorengan yang sama, jadi keduanya tidak boleh diambil bersamaan. Kromosom dianggap tidak sah bila memuat P1 dan P4 sekaligus, dan fitness-nya diberi 0. Selain itu fitness = jumlah keuntungan paket yang diambil.\nPopulasi awal 4 kromosom: K1 = 101100, K2 = 011010, K3 = 110011, K4 = 001101.\nCatatan: bulatkan proporsi, batas rentang, dan rata-rata ke 2 angka di belakang koma. Hitung proporsi dari fitness yang belum dibulatkan.',
    steps: [
      { q: 'a. Hitung fitness setiap kromosom. Sebutkan kromosom yang tidak sah.',
        fields: [
          { label: 'Fitness K1', a: 0, tol: 0 },
          { label: 'Fitness K2', a: 73, tol: 0 },
          { label: 'Fitness K3', a: 115, tol: 0 },
          { label: 'Fitness K4', a: 117, tol: 0 },
          { label: 'Kromosom tidak sah', a: ['K1', 'k1'] }
        ],
        ex: 'K1 = truefalsetruetruefalsefalse: P1 dan P4 sekaligus → tidak sah → 0. K2 = falsetruetruefalsetruefalse: P2 + P3 + P5 → 73. K3 = truetruefalsefalsetruetrue: P1 + P2 + P5 + P6 → 115. K4 = falsefalsetruetruefalsetrue: P3 + P4 + P6 → 117. K1 memuat P1 dan P4 sekaligus, jadi nilainya 0 walau keuntungannya besar. Fitness 0 membuat kromosom itu tidak punya peluang di roulette.' },
      { q: 'b. Hitung total fitness, proporsi roulette wheel, dan batas atas setiap rentang (2 desimal). Tidak perlu diurutkan; batas bawah K1 = 0 dan batas atas K4 = 1.',
        fields: [
          { label: 'Total fitness', a: 305, tol: 0 },
          { label: 'Proporsi K1', a: 0, tol: 0.006 },
          { label: 'Proporsi K2', a: 0.24, tol: 0.006 },
          { label: 'Proporsi K3', a: 0.38, tol: 0.006 },
          { label: 'Proporsi K4', a: 0.38, tol: 0.006 },
          { label: 'Batas atas K1', a: 0, tol: 0.006 },
          { label: 'Batas atas K2', a: 0.24, tol: 0.006 },
          { label: 'Batas atas K3', a: 0.62, tol: 0.006 }
        ],
        ex: 'Total = 0 + 73 + 115 + 117 = 305. Proporsi: K1 = 0/305 = 0, K2 = 73/305 = 0,24, K3 = 115/305 = 0,38, K4 = 117/305 = 0,38. Rentang: K1 [0 – 0), K2 [0 – 0,24), K3 [0,24 – 0,62), K4 [0,62 – 1). K1 lebarnya 0, jadi K1 hanya terpilih jika r = 0.' },
      { q: 'c. Pilih 4 orang tua dengan nilai acak 0,15; 0,40; 0,70; 0,30 (urut Parent1 sampai Parent4). Kromosom terpilih adalah yang rentangnya memuat nilai acak itu.',
        fields: [
          { label: 'Parent1 (r = 0,15)', a: ['K2', '011010'] },
          { label: 'Parent2 (r = 0,4)', a: ['K3', '110011'] },
          { label: 'Parent3 (r = 0,7)', a: ['K4', '001101'] },
          { label: 'Parent4 (r = 0,3)', a: ['K3', '110011'] }
        ],
        ex: 'P1 = 0,15 → K2 (011010, fitness 73); P2 = 0,4 → K3 (110011, fitness 115); P3 = 0,7 → K4 (001101, fitness 117); P4 = 0,3 → K3 (110011, fitness 115). K3 terpilih dua kali, K1 tidak pernah terpilih.' },
      { q: 'd. Pasangkan Parent1–Parent2 dan Parent3–Parent4, lalu lakukan single-point crossover dengan titik potong setelah gen ke-3. Tulis keempat anak.',
        fields: [
          { label: 'Anak1', a: '011011' },
          { label: 'Anak2', a: '110010' },
          { label: 'Anak3', a: '001011' },
          { label: 'Anak4', a: '110101' }
        ],
        ex: 'Potong setelah gen 3: 011010 × 110011 → 011011 dan 110010; 001101 × 110011 → 001011 dan 110101. Gen 1-3 tetap, gen 4-6 bertukar. Perhatikan bahwa setiap bit anak sudah ada di salah satu induknya.' },
      { q: 'e. Probabilitas mutasi 0,10. Anak dimutasi jika nilai acaknya < 0,10, dengan bit flip pada gen yang ditentukan. Tentukan anak yang dimutasi dan tulis keempat kromosom hasilnya.',
        table: { head: ['Anak', 'Nilai acak', 'Gen', 'Bit baru'],
          rows: [
            ['Anak1', '0,07', 4, '0 → 1'],
            ['Anak2', '0,42', 2, 'tetap'],
            ['Anak3', '0,09', 6, '1 → 0'],
            ['Anak4', '0,55', 1, 'tetap']
          ] },
        fields: [
          { label: 'Anak yang dimutasi (pisahkan spasi)', a: 'Anak1 Anak3', set: true },
          { label: 'Anak1 hasil', a: '011111' },
          { label: 'Anak2 hasil', a: '110010' },
          { label: 'Anak3 hasil', a: '001010' },
          { label: 'Anak4 hasil', a: '110101' }
        ],
        ex: 'Anak1: 0,07 < 0,10 → gen 4 dibalik: 011011 → 011111; Anak2: 0,42 ≥ 0,10 → tetap 110010; Anak3: 0,09 < 0,10 → gen 6 dibalik: 001011 → 001010; Anak4: 0,55 ≥ 0,10 → tetap 110101.' },
      { q: 'f. Generational replacement: keempat anak menggantikan seluruh populasi lama. Hitung fitness generasi baru tanpa elitisme, lalu dengan elitisme k = 1 (kromosom terbaik generasi lama menggantikan anak terburuk). Tulis rata-rata fitness ketiga populasi.',
        fields: [
          { label: 'Fitness Anak1 (setelah mutasi)', a: 160, tol: 0 },
          { label: 'Fitness Anak2 (setelah mutasi)', a: 83, tol: 0 },
          { label: 'Fitness Anak3 (setelah mutasi)', a: 48, tol: 0 },
          { label: 'Fitness Anak4 (setelah mutasi)', a: 0, tol: 0 },
          { label: 'Fitness terbaik generasi lama', a: 117, tol: 0 },
          { label: 'Anak terburuk', a: 0, tol: 0 },
          { label: 'Rata-rata populasi lama', a: 76.25, tol: 0.006 },
          { label: 'Rata-rata tanpa elitisme', a: 72.75, tol: 0.006 },
          { label: 'Rata-rata dengan elitisme', a: 102, tol: 0.006 }
        ],
        ex: 'Tanpa mutasi fitness anak: 105, 83, 80, 0. Setelah mutasi: 160, 83, 48, 0. Terbaik lama K4 = 117 menggantikan Anak4 (0). Rata-rata: lama 76,25, tanpa elitisme 72,75, dengan elitisme 102. Elitisme menaikkan rata-rata tanpa mengubah anak yang sudah baik.' },
      { q: 'g. Jelaskan tiga hal: (1) mengapa crossover tidak pernah menghasilkan nilai gen yang benar-benar baru, (2) mengapa seleksi roulette bermasalah ketika ada kromosom dengan fitness 0, dan (3) kapan tournament selection atau rank-based selection lebih tepat.',
        points: [
          'Crossover hanya menyalin gen yang sudah ada di kedua induk, jadi tidak ada nilai gen baru; nilai baru hanya muncul dari mutasi',
          'Semua kromosom yang tidak sah ber-fitness 0 sehingga lebarnya rentang 0: kromosom itu tidak pernah terpilih dan perbaikan harus datang dari mutasi atau dari induk yang sah',
          'Roulette peka skala: satu superindividu dapat mendominasi, dan fitness 0 atau fitness yang hampir sama membuat seleksi hampir acak',
          'Tournament membandingkan beberapa individu secara lokal tanpa memakai total fitness, jadi aman untuk fitness 0 atau negatif',
          'Rank-based memakai peringkat, sehingga tahan outlier dan cocok bila nilainya berderet mirip'
        ] }
    ],
    ex: 'Kunci dihitung sendiri dengan kode; soal tidak memberi kunci. Kasus dibuat sendiri mengikuti pola GA Week 2-3: encoding biner, fitness dengan constraint, roulette, single-point crossover, bit flip, elitisme.' }
]);

BANK.isian('ka', 'ctsp', 'Soal Cerita: GA untuk TSP, pola soal UTS', [
  { type: 'steps',
    q: 'Depot air minum "Tirta Jaya" mengantar galon ke lima titik pelanggan: A (depot), B (kos mahasiswa), C (kantor kelurahan), D (pasar), E (rumah sakit). Jarak antar titik dalam km diberikan pada matriks ketetanggaan di bawah. Satu unit pikap harus mengunjungi semua titik tepat satu kali lalu kembali ke depot.\nSelesaikan TSP ini dengan algoritma genetika: populasi 4 individu, representasi permutasi (1 = A, 2 = B, 3 = C, 4 = D, 5 = E; kromosom 21543 berarti B→A→E→D→C→B), fitness = 1/(total jarak), dan pikap boleh berangkat dari titik mana pun.\nCatatan: jarak dalam bilangan bulat; tulis fitness 4 angka di belakang koma, tetapi proporsi, batas rentang, dan semua hasil akhir lain cukup 2 angka di belakang koma. Hitung proporsi dari fitness yang belum dibulatkan.',
    table: { head: ['', 'A', 'B', 'C', 'D', 'E'],
      rows: [
        ['A', '-', 10, 6, 13, 8],
        ['B', 10, '-', 9, 5, 12],
        ['C', 6, 9, '-', 7, 11],
        ['D', 13, 5, 7, '-', 4],
        ['E', 8, 12, 11, 4, '-']
      ] },
    steps: [
      { q: 'a. Hitung total jarak dan nilai fitness = 1/(total jarak) setiap kromosom (fitness 4 desimal). Ingat ruas terakhir kembali ke kota awal.',
        table: { head: ['Kromosom', 'Gen', 'Rute'],
          rows: [
            ['A1', '2 1 5 4 3', 'B→A→E→D→C→B'],
            ['A2', '2 3 5 4 1', 'B→C→E→D→A→B'],
            ['A3', '3 2 5 4 1', 'C→B→E→D→A→C'],
            ['A4', '5 3 1 2 4', 'E→C→A→B→D→E']
          ] },
        fields: [
          { label: 'Total jarak A1', a: 38, tol: 0 },
          { label: 'Fitness A1', a: 0.0263, tol: 0.0001 },
          { label: 'Total jarak A2', a: 47, tol: 0 },
          { label: 'Fitness A2', a: 0.0213, tol: 0.0001 },
          { label: 'Total jarak A3', a: 44, tol: 0 },
          { label: 'Fitness A3', a: 0.0227, tol: 0.0001 },
          { label: 'Total jarak A4', a: 36, tol: 0 },
          { label: 'Fitness A4', a: 0.0278, tol: 0.0001 }
        ],
        ex: 'A1: 10 + 8 + 4 + 7 + 9 = 38, fitness 1/38 = 0,0263. A2: 9 + 11 + 4 + 13 + 10 = 47, fitness 1/47 = 0,0213. A3: 9 + 12 + 4 + 13 + 6 = 44, fitness 1/44 = 0,0227. A4: 11 + 6 + 10 + 5 + 4 = 36, fitness 1/36 = 0,0278.' },
      { q: 'b. Hitung total fitness, proporsi roulette wheel (fitness/total, 2 desimal), dan batas atas rentang tiap kromosom. Batas bawah A1 = 0, batas atas A4 = 1. Tidak perlu diurutkan.',
        fields: [
          { label: 'Total fitness (4 desimal)', a: 0.0981, tol: 0.0002 },
          { label: 'Proporsi A1', a: 0.27, tol: 0.006 },
          { label: 'Proporsi A2', a: 0.22, tol: 0.006 },
          { label: 'Proporsi A3', a: 0.23, tol: 0.006 },
          { label: 'Proporsi A4', a: 0.28, tol: 0.006 },
          { label: 'Batas atas A1', a: 0.27, tol: 0.011 },
          { label: 'Batas atas A2', a: 0.49, tol: 0.011 },
          { label: 'Batas atas A3', a: 0.72, tol: 0.011 }
        ],
        ex: 'Total = 0,0263 + 0,0213 + 0,0227 + 0,0278 = 0,0981. Proporsi: A1 0,2683 ≈ 0,27, A2 0,2169 ≈ 0,22, A3 0,2317 ≈ 0,23, A4 0,2832 ≈ 0,28. Rentang: A1 [0,00 – 0,27), A2 [0,27 – 0,49), A3 [0,49 – 0,72), A4 [0,72 – 1,00). Jika tiap proporsi dibulatkan dulu lalu dijumlah, batas atas bisa beda 0,01; dua cara itu sama-sama diterima selama konsisten.' },
      { q: 'c. Pilih orang tua dengan nilai acak P1 = 0,13; 0,38; 0,6; 0,86 (urut P1 sampai P4). Kromosom terpilih adalah yang rentangnya memuat nilai acak.',
        fields: [
          { label: 'Parent1 (r = 0,13)', a: ['A1', '21543'] },
          { label: 'Parent2 (r = 0,38)', a: ['A2', '23541'] },
          { label: 'Parent3 (r = 0,6)', a: ['A3', '32541'] },
          { label: 'Parent4 (r = 0,86)', a: ['A4', '53124'] }
        ],
        ex: 'P1 = 0,13 → A1 (21543); P2 = 0,38 → A2 (23541); P3 = 0,6 → A3 (32541); P4 = 0,86 → A4 (53124).' },
      { q: 'd. Pasangkan Parent1–Parent2 dan Parent3–Parent4, lalu lakukan order crossover dengan TP1 = 2 dan TP2 = 4 (segmen = gen ke-2 sampai gen ke-4, keduanya termasuk). Anak1 = segmen Parent1 + urutan Parent2, Anak2 = segmen Parent2 + urutan Parent1, begitu juga Anak3 dan Anak4.',
        fields: [
          { label: 'Anak1', a: '31542' },
          { label: 'Anak2', a: '13542' },
          { label: 'Anak3', a: '12543' },
          { label: 'Anak4', a: '43125' }
        ],
        ex: 'Anak1: segmen 1 5 4 dari A1; urutan A2 mulai gen ke-5: 1 2 3 5 4, buang segmen → 2 3; isi gen ke-5 dst. melingkar → 3 1 5 4 2. Anak2: segmen 3 5 4 dari A2; urutan A1 mulai gen ke-5: 3 2 1 5 4, buang segmen → 2 1; isi gen ke-5 dst. melingkar → 1 3 5 4 2. Anak3: segmen 2 5 4 dari A3; urutan A4 mulai gen ke-5: 4 5 3 1 2, buang segmen → 3 1; isi gen ke-5 dst. melingkar → 1 2 5 4 3. Anak4: segmen 3 1 2 dari A4; urutan A3 mulai gen ke-5: 1 3 2 5 4, buang segmen → 5 4; isi gen ke-5 dst. melingkar → 4 3 1 2 5. Tafsiran lain (TP = potong setelah gen 2 dan gen 4, segmen gen 3–4): Anak1–4 = 23541, 21543, 12543, 54123. Tulis asumsi segmenmu di lembar ujian.' },
      { q: 'e. Probabilitas mutasi = 0,2. Anak dimutasi jika nilai random < 0,2, dengan swap mutation pada indeks gen yang ditentukan.',
        table: { head: ['Anak', 'Nilai random', 'Indeks gen'],
          rows: [
            ['Anak1', '0,21', '2 dan 5'],
            ['Anak2', '0,05', '1 dan 3'],
            ['Anak3', '0,54', '3 dan 4'],
            ['Anak4', '0,19', '1 dan 5']
          ] },
        fields: [
          { label: 'Anak yang dimutasi (pisahkan spasi)', a: 'Anak2 Anak4', set: true },
          { label: 'Anak1 hasil mutasi', a: '31542' },
          { label: 'Anak2 hasil mutasi', a: '53142' },
          { label: 'Anak3 hasil mutasi', a: '12543' },
          { label: 'Anak4 hasil mutasi', a: '53124' }
        ],
        ex: 'Anak1: 0,21 ≥ 0,2, tetap 31542; Anak2: 0,05 < 0,2, tukar gen 1 dan 3: 13542 → 53142; Anak3: 0,54 ≥ 0,2, tetap 12543; Anak4: 0,19 < 0,2, tukar gen 1 dan 5: 43125 → 53124. Tafsiran lain (TP = potong setelah gen 2 dan gen 4, segmen gen 3–4): hasil mutasi 23541, 51243, 12543, 34125. Tulis asumsi segmenmu di lembar ujian.' },
      { q: 'f. Generational replacement tanpa elitisme: keempat anak menggantikan seluruh populasi lama. Hitung total jarak dan fitness generasi baru.',
        fields: [
          { label: 'Total jarak Anak1', a: 32, tol: 0 },
          { label: 'Fitness Anak1', a: 0.0313, tol: 0.0001 },
          { label: 'Total jarak Anak2', a: 47, tol: 0 },
          { label: 'Fitness Anak2', a: 0.0213, tol: 0.0001 },
          { label: 'Total jarak Anak3', a: 39, tol: 0 },
          { label: 'Fitness Anak3', a: 0.0256, tol: 0.0001 },
          { label: 'Total jarak Anak4', a: 36, tol: 0 },
          { label: 'Fitness Anak4', a: 0.0278, tol: 0.0001 }
        ],
        ex: 'Anak1 C→A→E→D→B→C = 32, fitness 0,0313. Anak2 E→C→A→D→B→E = 47, fitness 0,0213. Anak3 A→B→E→D→C→A = 39, fitness 0,0256. Anak4 E→C→A→B→D→E = 36, fitness 0,0278. Rata-rata jarak 41,25 → 38,50. Tafsiran lain (TP = potong setelah gen 2 dan gen 4, segmen gen 3–4): jarak 47, 41, 39, 53. Tulis asumsi segmenmu di lembar ujian.' },
      { q: 'g. Tuliskan jalur terbaik di generasi baru dan jalur terbaik yang pernah ditemukan selama proses (generasi awal + generasi baru), beserta total jaraknya.',
        fields: [
          { label: 'Jalur terbaik generasi baru', a: ['31542', 'CAEDB', 'CAEDBC'] },
          { label: 'Jaraknya', a: 32, tol: 0 },
          { label: 'Jalur terbaik selama proses', a: ['31542', 'CAEDB', 'CAEDBC'] },
          { label: 'Jarak terbaik selama proses', a: 32, tol: 0 }
        ],
        ex: 'Generasi baru: Anak1 = C→A→E→D→B→C (32). Generasi baru lebih baik dari generasi awal (terbaik lama A4 = 36): crossover dan mutasi berhasil menggabungkan bagian rute yang baik. Optimum sebenarnya (dicek dengan mencoba semua permutasi) = 32. Tafsiran lain (TP = potong setelah gen 2 dan gen 4, segmen gen 3–4): terbaik generasi baru 39, terbaik selama proses 36. Tulis asumsi segmenmu di lembar ujian.' },
      { q: 'Jelaskan apa yang terjadi jika dipakai elitisme k = 1, dan mengapa jawaban g bergantung pada ada tidaknya elitisme.',
        points: [
          'Elitisme k = 1 menyalin kromosom terbaik generasi lama (jarak terpendek) ke generasi baru tanpa diubah',
          'Kromosom terbaik menggantikan anak terburuk (jarak terpanjang)',
          'Tanpa elitisme solusi terbaik bisa hilang, sehingga kurva jarak terbaik bisa naik',
          'Di soal ini generasi baru sudah lebih baik, jadi elitisme tidak mengubah jawaban g'
        ] }
    ],
    ex: 'Kunci dihitung sendiri dengan kode; soal tidak memberi kunci. Format sama persis dengan Soal 1 UTS 2025 (langkah a sampai g) tetapi angka, kromosom, dan kota awalnya berbeda.' }
]);

BANK.isian('ka', 'ccross', 'Soal Cerita: Crossover PMX & OX (Week 5)', [
  { type: 'steps',
    q: 'Sebuah bengkel motor punya 6 unit yang masuk pagi ini, diberi nomor 1 sampai 6, dan seorang teknisi harus mengerjakannya satu per satu. Urutan pengerjaan dikodekan sebagai permutasi 6 gen.\nDua urutan usulan dari generasi sebelumnya: P1 = 3 1 5 2 6 4 dan P2 = 2 6 3 4 1 5. Keduanya akan di-crossover dengan potongan gen ke-3 sampai gen ke-4 (keduanya termasuk).\nCatatan: bulatkan hasil hitungan ke 2 angka di belakang koma bila perlu.',
    steps: [
      { q: 'a. Lakukan order crossover (OX). Tulis segmen yang disalin, urutan baca induk lain mulai gen ke-5, gen sisa setelah segmen dibuang, lalu kedua anak.',
        fields: [
          { label: 'Segmen dari P1', a: '52' },
          { label: 'Urutan baca P2 dari gen 5', a: '152634' },
          { label: 'Gen sisa dari P2', a: '1634' },
          { label: 'Anak 1 (OX)', a: '345216' },
          { label: 'Anak 2 (OX)', a: '523461' }
        ],
        ex: 'Segmen P1 = 5 2 di gen 3-4. Baca P2 dari gen 5 melingkar: 1 5 2 6 3 4, buang gen segmen → 1 6 3 4, isi gen 5, 6, 1, 2 → Anak 1 = 3 4 5 2 1 6. Untuk Anak 2, segmen P2 = 3 4, baca P1 dari gen 5: 6 4 3 1 5 2, sisa 6 1 5 2 → 5 2 3 4 6 1.' },
      { q: 'b. Lakukan partially mapped crossover (PMX) dengan segmen gen 3-4 yang sama. Tulis mapping yang terbentuk, lalu kedua anak.',
        fields: [
          { label: 'Mapping (contoh: 5-3)', a: '5-3 2-4' },
          { label: 'Anak 1 (PMX)', a: '465213' },
          { label: 'Anak 2 (PMX)', a: '513462' }
        ],
        ex: 'Mapping dari segmen: 5↔3 dan 2↔4. Anak 1 = 4 6 5 2 1 3: gen 3-4 disalin dari P1, gen di luar segmen diambil dari P2 dan diganti lewat mapping bila sudah dipakai. Anak 2 = 5 1 3 4 6 2 dengan arah sebaliknya.' },
      { q: 'c. Periksa keabsahan keempat anak: apakah setiap nomor unit muncul tepat satu kali? Lalu sebutkan satu perbedaan pokok antara PMX dan OX.',
        fields: [
          { label: 'Jumlah anak yang sah', a: 4 },
          { label: 'PMX menjaga', a: ['posisi absolut', 'posisi', 'absolute position'] },
          { label: 'OX menjaga', a: ['urutan relatif', 'urutan', 'relative order'] }
        ],
        ex: 'Keempat anak sah karena setiap nomor 1-6 muncul tepat sekali; PMX menyelesaikan duplikat lewat mapping, OX cukup membuang gen yang sudah ada di segmen. PMX menjaga posisi absolut (cocok untuk penugasan), OX menjaga urutan relatif (cocok untuk TSP dan antrean).' },
      { q: 'd. Urutan awal seorang teknisi adalah 1 2 3 4 5 6 7. Hitung berapa ruas (edge) yang putus bila dipakai swap gen 2 dan 5, insertion gen 2 ke posisi 5, dan inversion gen 2 sampai 5. Mana yang paling sedikit merusak urutan?',
        fields: [
          { label: 'Hasil swap 2 dan 5', a: '1534267' },
          { label: 'Ruas putus (swap)', a: 4, tol: 0 },
          { label: 'Hasil insertion', a: '1345267' },
          { label: 'Ruas putus (insertion)', a: 3, tol: 0 },
          { label: 'Hasil inversion 2-5', a: '1543267' },
          { label: 'Ruas putus (inversion)', a: 2, tol: 0 },
          { label: 'Paling sedikit merusak', a: ['inversion', 'inversi'] }
        ],
        ex: 'Swap: 1534267 → 4 ruas putus. Insertion: 1345267 → 3 ruas. Inversion: 1543267 → 2 ruas, karena hanya dua ruas di batas segmen yang berubah. Untuk TSP simetris, inversion paling aman diikuti insertion, lalu swap.' },
      { q: 'e. Jelaskan mengapa single-point crossover yang biasa dipakai pada kromosom biner tidak boleh langsung dipakai pada kromosom permutasi, lalu jelaskan kapan sebaiknya memilih OX dan kapan memilih PMX.',
        points: [
          'Single-point pada permutasi menghasilkan gen ganda dan gen yang hilang, sehingga bukan lagi urutan yang sah',
          'Operator permutasi harus menjaga setiap elemen muncul tepat sekali: OX lewat urutan relatif, PMX lewat mapping',
          'Pilih OX bila urutan relatif yang penting: TSP, routing, penjadwalan urutan kerja',
          'Pilih PMX bila posisi absolut yang penting: penugasan, penempatan pada slot tetap',
          'Selalu periksa hasil crossover: setiap elemen tepat satu kali sebelum dipakai di generasi berikutnya'
        ] }
    ],
    ex: 'Kunci dihitung sendiri dengan kode; soal tidak memberi kunci. Pola soal Week 5 (PMX vs OX, mutasi permutasi); angka dan kasus bengkel dibuat sendiri.' }
]);

BANK.isian('ka', 'mhc', 'Pola UTS · Metaheuristic: Hill Climbing & SA', [
  { type: 'steps',
    q: 'Sebuah kedai kopi mengatur jumlah barista yang bertugas per shift. Manajer mencoba 10 skenario, yaitu 0 sampai 9 barista, lalu mencatat jumlah gelas yang selesai per jam (makin besar makin baik).\nTetangga sebuah skenario adalah jumlah barista dikurangi 1 atau ditambah 1. Hill Climbing selalu pindah ke tetangga yang lebih baik, dan berhenti bila tidak ada tetangga yang lebih baik. Simulated Annealing menerima langkah yang memperburuk nilai sebesar ΔE dengan peluang P = exp(−ΔE / T), yaitu jika nilai acak r < P. Suhu awalnya 80 dan diturunkan secara geometrik T_k = 80 × 0,9^k dengan k mulai 0.\nCatatan: bulatkan setiap hasil hitungan ke 2 angka di belakang koma.',
    table: { head: ['Barista', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      rows: [['Gelas per jam', 5, 9, 13, 13, 13, 19, 22, 21, 17, 11]] },
    steps: [
      { q: 'a. Jalankan Hill Climbing dari 0 barista. Di skenario berapa ia berhenti, berapa gelas per jam, dan apakah itu global optimum?',
        fields: [
          { label: 'Berhenti di', a: 2, tol: 0 },
          { label: 'Gelas per jam', a: 13, tol: 0 },
          { label: 'Global optimum? (ya / tidak)', a: ['tidak', 'bukan', 'no'] }
        ],
        ex: 'Jalur: 0 → 1 → 2. Berhenti di 2 dengan 13 gelas. Bukan global optimum: skenario 6 menghasilkan 22.' },
      { q: 'b. Jalankan Hill Climbing dari 3 barista dan dari 5 barista. Di mana masing-masing berhenti, dan kondisi apa yang membuat keduanya berbeda?',
        fields: [
          { label: 'Dari 3 berhenti di', a: 3, tol: 0 },
          { label: 'Nilai', a: 13, tol: 0 },
          { label: 'Dari 5 berhenti di', a: 6, tol: 0 },
          { label: 'Nilai', a: 22, tol: 0 },
          { label: 'Nama kondisi', a: ['plateau', 'dataran', 'plateau dataran'] }
        ],
        ex: 'Dari 3: 3 → berhenti karena tetangga 2 dan 4 sama-sama 13 (plateau). Dari 5: 5 → 6. Tiga skenario berturut-turut (2, 3, 4) bernilai sama 13.' },
      { q: 'c. SA berada di 6 barista (22 gelas) lalu diusulkan pindah ke 8 barista (17 gelas), jadi ΔE = 5. Hitung P = exp(−ΔE/T) untuk T = 5, T = 2, T = 1 (2 desimal). Dengan r = 0,20, pada suhu mana usulan diterima?',
        fields: [
          { label: 'T = 5', a: 0.37, tol: 0.006 },
          { label: 'T = 2', a: 0.08, tol: 0.006 },
          { label: 'T = 1', a: 0.01, tol: 0.006 },
          { label: 'Diterima pada', a: ['T = 5', '5', 'T=5'] }
        ],
        ex: 'exp(−5/5) = 0,37, exp(−5/2) = 0,08, exp(−5/1) = 0,01. r = 0,20 hanya lebih kecil dari 0,37, jadi diterima hanya pada T = 5. Inilah cara SA keluar dari plateau.' },
      { q: 'd. Hitung suhu pada iterasi k = 10 dan k = 30 (2 desimal).',
        fields: [{ label: 'T_10', a: 27.89, tol: 0.006 }, { label: 'T_30', a: 3.39, tol: 0.006 }],
        ex: 'T_10 = 80 × 0,9^10 = 80 × 0,3487 = 27,89. T_30 = 80 × 0,9^30 = 80 × 0,0424 = 3,39. Setelah itu hampir tidak ada lagi langkah memburuk yang diterima, dan SA berperilaku seperti Hill Climbing.' },
      { q: 'e. Dari 10 titik awal yang dicoba, berapa yang berhasil mencapai global optimum? Jika dijalankan 4 run independen, berapa peluang sedikitnya satu run berhasil (2 desimal)?',
        fields: [{ label: 'Titik awal yang berhasil', a: 6, tol: 0 }, { label: 'Peluang 4 run', a: 0.97, tol: 0.006 }],
        ex: 'Titik awal 0, 1, 3, dan 2 gagal (berhenti di 13); 4 sampai 9 berhasil. Jadi 6 dari 10, peluang satu run berhasil 0,60. Empat run gagal semua 0,40^4 = 0,0256, jadi peluang berhasil = 1 − 0,0256 = 0,9744 ≈ 0,97.' },
      { q: 'f. Jelaskan mengapa Hill Climbing bisa berhenti di nilai 13 padahal ada skenario 22, lalu jelaskan bagaimana Simulated Annealing dan Tabu Search mengatasinya. Sebutkan juga kapan Hill Climbing justru pilihan yang tepat.',
        points: [
          'Hill Climbing hanya menerima tetangga yang lebih baik, jadi berhenti di local optimum atau plateau seperti skenario 2, 3, 4',
          'Simulated Annealing kadang menerima langkah memburuk dengan peluang exp(−ΔE/T), sehingga bisa menyeberangi lembah; peluang itu mengecil saat suhu turun',
          'Tabu Search melarang pengulangan langkah terakhir selama tenure, sehingga terpaksa bergerak walau memburuk',
          'Hill Climbing tepat bila landscape mulus (satu puncak), evaluasi mahal sehingga budget kecil, atau sebagai baseline pembanding',
          'Ketiganya trajectory-based: satu solusi bergerak, tanpa populasi dan tanpa jaminan optimum'
        ] }
    ],
    ex: 'Kunci dihitung sendiri dengan kode; soal tidak memberi kunci. Mengikuti pola slide Week 1: Hill Climbing, plateau, Simulated Annealing, pendinginan geometrik, random restart.' }
]);

BANK.isian('ka', 'mgrid', 'Pola UTS · Metaheuristic: Peta 2 Dimensi', [
  { type: 'steps',
    q: 'Sebuah drone pemetaan mencari titik tertinggi sebuah bukit. Medan dibagi menjadi grid 4 × 4. Baris 1 sampai 4 dari atas, kolom 1 sampai 4 dari kiri; angka pada sel adalah ketinggian (meter).\nDrone hanya boleh bergerak ke sel tetangga atas, bawah, kiri, atau kanan (tidak diagonal). Hill Climbing selalu pindah ke tetangga dengan ketinggian terbesar bila lebih tinggi dari posisinya, lalu berhenti bila tidak ada tetangga yang lebih tinggi.\nCatatan: bulatkan hasil hitungan ke 2 angka di belakang koma.',
    table: { head: ['', 'Kol 1', 'Kol 2', 'Kol 3', 'Kol 4'],
      rows: [
        ['Baris 1', 9, 12, 15, 11],
        ['Baris 2', 14, 18, 11, 13],
        ['Baris 3', 10, 17, 25, 16],
        ['Baris 4', 7, 11, 14, 8]
      ] },
    steps: [
      { q: 'a. Jalankan Hill Climbing dari (1,1). Tulis jalur yang dilalui, sel tempat berhenti, ketinggiannya, dan apakah itu puncak tertinggi medan.',
        fields: [
          { label: 'Jalur', a: '(1,1) (2,1) (2,2)' },
          { label: 'Berhenti di', a: '(2,2)' },
          { label: 'Ketinggian', a: 18, tol: 0 },
          { label: 'Optimum? (ya / tidak)', a: ['tidak', 'bukan', 'no'] }
        ],
        ex: 'Jalur: (1,1) → (2,1) → (2,2). Berhenti di 18 meter, padahal puncak sebenarnya 25 meter di (3,3). Ini local optimum: semua tetangga (1,2), (2,1), (2,3), (3,2) lebih rendah.' },
      { q: 'b. Jalankan Hill Climbing dari (1,3) dan dari (3,1). Di mana masing-masing berhenti?',
        fields: [
          { label: 'Dari (1,3) berhenti di', a: '(1,3)' },
          { label: 'Ketinggian', a: 15, tol: 0 },
          { label: 'Dari (3,1) berhenti di', a: '(3,3)' },
          { label: 'Ketinggian', a: 25, tol: 0 }
        ],
        ex: 'Dari (1,3) = 15: tetangga (1,2) = 12, (1,4) = 11, (2,3) = 11, semuanya lebih rendah, jadi berhenti di 15 (local optimum). Dari (3,1): (3,1) → (3,2) → (3,3) → 25 meter, yaitu global optimum. Titik awal menentukan hasil.' },
      { q: 'c. SA di (1,3) mengusulkan pindah ke (2,3): turun dari 15 ke 11, jadi ΔE = 4. Hitung P = exp(−ΔE/T) untuk T = 8, T = 3, T = 1 (2 desimal). Dengan r = 0,30, pada suhu mana usulan diterima?',
        fields: [
          { label: 'T = 8', a: 0.61, tol: 0.006 },
          { label: 'T = 3', a: 0.26, tol: 0.006 },
          { label: 'T = 1', a: 0.02, tol: 0.006 },
          { label: 'Diterima pada', a: ['T = 8', '8', 'T=8'] }
        ],
        ex: 'exp(−4/8) = 0,61, exp(−4/3) = 0,26, exp(−4/1) = 0,02. Dengan r = 0,30 hanya T = 8 yang menerima; setelah turun ke (2,3) drone bisa naik ke (3,3).' },
      { q: 'd. Berapa jumlah tetangga sah untuk sel (1,1), sel (1,2), dan sel (2,2)?',
        fields: [
          { label: '(1,1) sudut', a: 2, tol: 0 },
          { label: '(1,2) tepi', a: 3, tol: 0 },
          { label: '(2,2) tengah', a: 4, tol: 0 }
        ],
        ex: 'Sudut punya 2 tetangga, tepi 3, dan sel tengah 4. Ukuran neighbourhood menentukan biaya satu iterasi local search.' },
      { q: 'e. Tiga mahasiswa memberi usulan: (1) jalankan Hill Climbing berulang dari titik acak, (2) pakai Simulated Annealing, (3) pakai GA dengan populasi 40. Untuk medan kecil seperti ini, mana yang paling murah dan mana yang paling tahan local optimum? Jelaskan.',
        points: [
          'Hill Climbing dengan random restart murah dan sederhana, tetapi tidak menjamin optimum dan bisa mengulang jalur yang sama',
          'Simulated Annealing lebih tahan local optimum karena sesekali menerima langkah menurun, dengan biaya tuning suhu',
          'GA dengan populasi 40 jauh lebih mahal untuk medan 16 sel; bukan pilihan hemat, tetapi tahan local optimum karena banyak titik awal sekaligus',
          'Semua metode di atas tetap stokastik: hasil berbeda antar-run adalah sifat, bukan bug'
        ] }
    ],
    ex: 'Kunci dihitung sendiri dengan kode; soal tidak memberi kunci. Pola slide Week 1: local optimum pada landscape dua dimensi, peluang SA, dan pemilihan metode menurut biaya evaluasi.' }
]);

BANK.isian('ka', 'mspace', 'Pola UTS · Metaheuristic: Ruang Pencarian & No Free Lunch', [
  { type: 'steps',
    q: 'Panitia ujian fakultas harus menempatkan 24 ujian ke 6 slot waktu. Setiap ujian boleh ditaruh di slot mana pun, dan tujuan optimasinya meminimalkan jumlah pasangan mahasiswa yang bentrok. Satu jadwal diubah dengan memindahkan satu ujian ke slot lain.\nCatatan: bulatkan hasil hitungan ke 2 angka di belakang koma bila bukan bilangan bulat.',
    steps: [
      { q: 'a. Berapa besar ruang pencarian (tulis sebagai basis dan pangkat) dan berapa tetangga satu jadwal?',
        fields: [
          { label: 'Basis', a: 6, tol: 0 },
          { label: 'Pangkat', a: 24, tol: 0 },
          { label: 'Tetangga satu jadwal', a: 120, tol: 0 }
        ],
        ex: 'Ruang = 6^24 ≈ 4,74 × 10^18 jadwal. Tetangga = 24 × 5 = 120, karena tiap ujian boleh pindah ke 5 slot lain.' },
      { q: 'b. Jika fakultas menambah 6 ujian (tetap 6 slot), berapa kali lipat ruang pencariannya? Jika menambah 2 slot (tetap 24 ujian), berapa kali lipat? Mana yang lebih berat?',
        fields: [
          { label: 'Tambah 6 ujian (kali)', a: 46656, tol: 0 },
          { label: 'Tambah 2 slot (kali)', a: 996.62, tol: 0.006 },
          { label: 'Lebih berat', a: ['tambah ujian', 'ujian', 'menambah ujian'] }
        ],
        ex: 'Tambah ujian mengalikan ruang dengan 6^6 = 46.656 kali. Tambah slot hanya (8/6)^24 = 996,62 kali. Jumlah ujian adalah pangkat, jumlah slot hanya basis: menambah ujian jauh lebih berat.' },
      { q: 'c. Satu jadwal dapat diperiksa dalam 0,0001 detik. Berapa juta tahun untuk memeriksa seluruh ruang 6^24 (asumsikan 1 tahun = 365 hari, 2 desimal)?',
        fields: [{ label: 'Juta tahun', a: 15.03, tol: 0.02 }],
        ex: 'Waktu = 6^24 × 0,0001 detik ≈ 4,74 × 10^14 detik. Dalam tahun: dibagi 31.536.000 detik ≈ 1,50 × 10^7 tahun = 15,03 juta tahun. Karena itu enumerasi tidak mungkin dan dipakai metaheuristik.' },
      { q: 'd. Jelaskan empat sifat metaheuristik dan pasangkan dengan kebutuhan panitia. Sebutkan pula satu kondisi yang membuat metaheuristik justru pilihan yang salah.',
        points: [
          'Tidak menjamin optimal: panitia menerima jadwal yang cukup baik, bukan terbukti terbaik',
          'Tidak bergantung struktur masalah: tidak butuh turunan atau konveksitas, cukup fungsi penilai bentrok',
          'Stokastik: dua kali jalan bisa memberi jadwal berbeda; itu disengaja untuk eksplorasi',
          'Anytime: bisa dihentikan kapan saja dan tetap ada jadwal yang bisa dipakai',
          'Salah dipakai bila masalahnya kecil sehingga enumerasi selesai cepat, atau ada algoritma eksak yang praktis'
        ] },
      { q: 'e. Jelaskan No Free Lunch Theorem dan koreksi salah paham yang sering muncul. Gunakan istilah exploration dan exploitation dalam penjelasanmu.',
        points: [
          'Dirata-rata atas seluruh masalah optimasi, semua algoritma sama baiknya (Wolpert & Macready, 1997)',
          'NFL tidak berarti algoritma boleh dipilih sembarang: pada kelas masalah tertentu selisihnya besar',
          'Karena itu klaim "algoritma X terbaik" harus menyebut kelas masalah dan dibuktikan empiris',
          'Exploration mencari daerah baru (mencegah terjebak), exploitation memperdalam daerah yang sudah bagus',
          'Terlalu banyak exploration = seperti random search; terlalu banyak exploitation = cepat terjebak local optimum'
        ] }
    ],
    ex: 'Kunci dihitung sendiri dengan kode; soal tidak memberi kunci. Angka ruang pencarian dari slide Week 1; bagian "panjang satu jadwal 10.000 kali per detik" ditambahkan sendiri.' }
]);

BANK.isian('ka', 'gabin', 'Pola UTS · GA: Satu Generasi Biner', [
  { type: 'steps',
    q: 'Sebuah GA memaksimalkan f(x) = x² dengan x bilangan bulat 0 sampai 31. Kromosom 5 bit dibaca langsung sebagai bilangan biner, jadi x = nilai desimal kromosom. Populasi awal: K1 = 10110, K2 = 00111, K3 = 11001, K4 = 01010.\nCatatan: fitness berupa bilangan bulat. Tulis proporsi roulette dan batas rentang dengan 2 angka di belakang koma, dan hitung proporsi dari nilai fitness yang belum dibulatkan.',
    steps: [
      { q: 'a. Ubah tiap kromosom ke desimal, lalu hitung fitness = x² dan total fitness.',
        fields: [
          { label: 'K1 desimal (x)', a: 22, tol: 0 },
          { label: 'K2 desimal (x)', a: 7, tol: 0 },
          { label: 'K3 desimal (x)', a: 25, tol: 0 },
          { label: 'K4 desimal (x)', a: 10, tol: 0 },
          { label: 'fitness K1', a: 484, tol: 0 },
          { label: 'fitness K2', a: 49, tol: 0 },
          { label: 'fitness K3', a: 625, tol: 0 },
          { label: 'fitness K4', a: 100, tol: 0 },
          { label: 'Total fitness', a: 1258, tol: 0 }
        ],
        ex: 'K1 = 10110 → x = 22 → f = 484. K2 = 00111 → x = 7 → f = 49. K3 = 11001 → x = 25 → f = 625. K4 = 01010 → x = 10 → f = 100. Total = 1258.' },
      { q: 'b. Hitung proporsi roulette wheel dan batas atas setiap rentang (2 desimal). Tidak perlu diurutkan; batas bawah K1 = 0 dan batas atas K4 = 1.',
        fields: [
          { label: 'Proporsi K1', a: 0.38, tol: 0.006 },
          { label: 'Proporsi K2', a: 0.04, tol: 0.006 },
          { label: 'Proporsi K3', a: 0.5, tol: 0.006 },
          { label: 'Proporsi K4', a: 0.08, tol: 0.006 },
          { label: 'Batas atas K1', a: 0.38, tol: 0.006 },
          { label: 'Batas atas K2', a: 0.42, tol: 0.006 },
          { label: 'Batas atas K3', a: 0.92, tol: 0.006 }
        ],
        ex: 'Proporsi: K1 = 484/1258 = 0,38 ≈ 0,38, K2 = 49/1258 = 0,04 ≈ 0,04, K3 = 625/1258 = 0,50 ≈ 0,5, K4 = 100/1258 = 0,08 ≈ 0,08. Rentang: K1 [0 – 0,38), K2 [0,38 – 0,42), K3 [0,42 – 0,92), K4 [0,92 – 1).' },
      { q: 'c. Pilih 4 orang tua dengan nilai acak 0,15; 0,4; 0,7; 0,97 (urut Parent1 sampai Parent4).',
        fields: [
          { label: 'Parent1', a: ['K1', '10110'] },
          { label: 'Parent2', a: ['K2', '00111'] },
          { label: 'Parent3', a: ['K3', '11001'] },
          { label: 'Parent4', a: ['K4', '01010'] }
        ],
        ex: 'P1 = 0,15 → K1 (10110); P2 = 0,4 → K2 (00111); P3 = 0,7 → K3 (11001); P4 = 0,97 → K4 (01010).' },
      { q: 'd. Pasangkan Parent1–Parent2 dan Parent3–Parent4, lalu lakukan single-point crossover dengan potongan setelah gen ke-3. Tulis keempat anak dan fitness-nya sebelum mutasi.',
        fields: [
          { label: 'Anak1', a: '10111' },
          { label: 'Anak2', a: '00110' },
          { label: 'Anak3', a: '11010' },
          { label: 'Anak4', a: '01001' },
          { label: 'Fitness Anak1 (sebelum mutasi)', a: 529, tol: 0 },
          { label: 'Fitness Anak2 (sebelum mutasi)', a: 36, tol: 0 },
          { label: 'Fitness Anak3 (sebelum mutasi)', a: 676, tol: 0 },
          { label: 'Fitness Anak4 (sebelum mutasi)', a: 81, tol: 0 }
        ],
        ex: '10110 × 00111 → 10111 dan 00110; 11001 × 01010 → 11010 dan 01001. Fitness: 529, 36, 676, 81.' },
      { q: 'e. Probabilitas mutasi 0,10; anak dimutasi jika nilai acaknya < 0,10, dengan bit flip pada gen yang ditentukan. Tulis anak yang dimutasi dan keempat kromosom hasilnya.',
        table: { head: ['Anak', 'Nilai acak', 'Gen'],
          rows: [['Anak1', '0,08', 2], ['Anak2', '0,35', 4], ['Anak3', '0,05', 5], ['Anak4', '0,6', 3]] },
        fields: [
          { label: 'Anak yang dimutasi (pisahkan spasi)', a: 'Anak1 Anak3', set: true },
          { label: 'Anak1 hasil', a: '11111' },
          { label: 'Anak2 hasil', a: '00110' },
          { label: 'Anak3 hasil', a: '11011' },
          { label: 'Anak4 hasil', a: '01001' }
        ],
        ex: 'Anak1: 0,08 < 0,10 → gen 2 dibalik: 10111 → 11111; Anak2: 0,35 ≥ 0,10 → tetap 00110; Anak3: 0,05 < 0,10 → gen 5 dibalik: 11010 → 11011; Anak4: 0,6 ≥ 0,10 → tetap 01001.' },
      { q: 'f. Terapkan elitisme k = 1: kromosom terbaik populasi lama menggantikan anak terburuk. Tulis fitness generasi baru tanpa dan dengan elitisme, serta ratanya.',
        fields: [
          { label: 'Fitness Anak1 (sesudah mutasi)', a: 961, tol: 0 },
          { label: 'Fitness Anak2 (sesudah mutasi)', a: 36, tol: 0 },
          { label: 'Fitness Anak3 (sesudah mutasi)', a: 729, tol: 0 },
          { label: 'Fitness Anak4 (sesudah mutasi)', a: 81, tol: 0 },
          { label: 'Fitness terbaik populasi lama', a: 625, tol: 0 },
          { label: 'Rata-rata populasi lama', a: 314.5, tol: 0.006 },
          { label: 'Rata-rata tanpa elitisme', a: 451.75, tol: 0.006 },
          { label: 'Rata-rata dengan elitisme', a: 599, tol: 0.006 }
        ],
        ex: 'Setelah mutasi: 961, 36, 729, 81. Terbaik lama K3 = 625 menggantikan Anak2 (36). Rata-rata: lama 314,5, tanpa elitisme 451,75, dengan elitisme 599. Elitisme menjamin yang terbaik tidak hilang.' },
      { q: 'g. Apakah satu generasi ini membaik? Sebutkan bagian mana yang membawa perbaikan dan bagian mana yang justru merugikan, lalu simpulkan mengapa GA butuh banyak generasi.',
        points: [
          'Bandingkan fitness terbaik lama dan terbaik baru; pada soal ini elitisme menjaga yang terbaik',
          'Crossover menggabungkan bagian kromosom yang sudah baik, tetapi tidak membuat nilai gen baru',
          'Mutasi bisa menaikkan fitness (jika gen yang dibalik memperbaiki) atau justru menjatuhkannya',
          'Satu generasi hanya satu langkah; perbaikan besar biasanya datang setelah puluhan generasi karena building block harus bergabung',
          'Tanpa elitisme, individu terbaik bisa hilang dan kurva fitness terbaik bisa turun'
        ] }
    ],
    ex: 'Kunci dihitung sendiri dengan kode; soal tidak memberi kunci. Pola soal Week 2-3: decode biner, fitness, roulette, single-point, bit flip, elitisme.' }
]);

BANK.isian('ka', 'gabin2', 'Pola UTS · GA: Decode dan Satu Generasi', [
  { type: 'steps',
    q: 'Sebuah perusahaan taksi meminimalkan deviasi jumlah armada terhadap kebutuhan 18 unit. Kromosom 5 bit dibaca sebagai bilangan biner x (0 sampai 31), deviasi g(x) = (x − 18)², dan karena roulette butuh nilai besar untuk solusi baik dipakai fitness = 1024 − g(x). Populasi awal: K1 = 00100, K2 = 01001, K3 = 11110, K4 = 01100.\nCatatan: semua nilai bulat. Tulis proporsi dan batas rentang 2 desimal; hitung proporsi dari fitness yang belum dibulatkan.',
    steps: [
      { q: 'a. Decode tiap kromosom, hitung g(x), fitness, dan total fitness.',
        fields: [
          { label: 'K1 (x)', a: 4, tol: 0 },
          { label: 'K2 (x)', a: 9, tol: 0 },
          { label: 'K3 (x)', a: 30, tol: 0 },
          { label: 'K4 (x)', a: 12, tol: 0 },
          { label: 'g(x) K1', a: 196, tol: 0 },
          { label: 'g(x) K2', a: 81, tol: 0 },
          { label: 'g(x) K3', a: 144, tol: 0 },
          { label: 'g(x) K4', a: 36, tol: 0 },
          { label: 'Total fitness', a: 3639, tol: 0 }
        ],
        ex: 'K1: x = 4, g = (4 − 18)² = 196, fitness = 1024 − 196 = 828. K2: x = 9, g = (9 − 18)² = 81, fitness = 1024 − 81 = 943. K3: x = 30, g = (30 − 18)² = 144, fitness = 1024 − 144 = 880. K4: x = 12, g = (12 − 18)² = 36, fitness = 1024 − 36 = 988.' },
      { q: 'b. Hitung proporsi roulette dan batas atas setiap rentang (2 desimal).',
        fields: [
          { label: 'Proporsi K1', a: 0.23, tol: 0.006 },
          { label: 'Proporsi K2', a: 0.26, tol: 0.006 },
          { label: 'Proporsi K3', a: 0.24, tol: 0.006 },
          { label: 'Proporsi K4', a: 0.27, tol: 0.006 },
          { label: 'Batas atas K1', a: 0.23, tol: 0.006 },
          { label: 'Batas atas K2', a: 0.49, tol: 0.006 },
          { label: 'Batas atas K3', a: 0.73, tol: 0.006 }
        ],
        ex: 'Proporsi: K1 = 828/3639 = 0,23 ≈ 0,23, K2 = 943/3639 = 0,26 ≈ 0,26, K3 = 880/3639 = 0,24 ≈ 0,24, K4 = 988/3639 = 0,27 ≈ 0,27.' },
      { q: 'c. Pilih 4 orang tua dengan nilai acak 0,10; 0,35; 0,60; 0,85 (urut Parent1 sampai Parent4).',
        fields: [
          { label: 'Parent1', a: ['K1', '00100'] },
          { label: 'Parent2', a: ['K2', '01001'] },
          { label: 'Parent3', a: ['K3', '11110'] },
          { label: 'Parent4', a: ['K4', '01100'] }
        ],
        ex: 'P1 = 0,1 → K1 (00100); P2 = 0,35 → K2 (01001); P3 = 0,6 → K3 (11110); P4 = 0,85 → K4 (01100).' },
      { q: 'd. Lakukan single-point crossover setelah gen ke-3 pada kedua pasangan. Tulis keempat anak dan fitness-nya.',
        fields: [
          { label: 'Anak1', a: '00101' },
          { label: 'Anak2', a: '01000' },
          { label: 'Anak3', a: '11100' },
          { label: 'Anak4', a: '01110' },
          { label: 'Fitness Anak1', a: 855, tol: 0 },
          { label: 'Fitness Anak2', a: 924, tol: 0 },
          { label: 'Fitness Anak3', a: 924, tol: 0 },
          { label: 'Fitness Anak4', a: 1008, tol: 0 }
        ],
        ex: 'Anak: 00101, 01000, 11100, 01110 dengan fitness 855, 924, 924, 1008.' },
      { q: 'e. Mutasi bit flip dengan pm = 0,10 pada gen berikut: Anak1 gen 5, Anak2 gen 2, Anak3 gen 4, Anak4 gen 1; nilai acaknya 0,06; 0,44; 0,09; 0,52. Tulis hasil mutasi dan fitness-nya.',
        fields: [
          { label: 'Anak1 hasil', a: '00100' },
          { label: 'Anak2 hasil', a: '01000' },
          { label: 'Anak3 hasil', a: '11110' },
          { label: 'Anak4 hasil', a: '01110' },
          { label: 'Fitness Anak1 hasil', a: 828, tol: 0 },
          { label: 'Fitness Anak2 hasil', a: 924, tol: 0 },
          { label: 'Fitness Anak3 hasil', a: 880, tol: 0 },
          { label: 'Fitness Anak4 hasil', a: 1008, tol: 0 }
        ],
        ex: 'Anak1: 0,06 < 0,10 → dibalik: 00101 → 00100; Anak2: 0,44 ≥ 0,10 → tetap 01000; Anak3: 0,09 < 0,10 → dibalik: 11100 → 11110; Anak4: 0,52 ≥ 0,10 → tetap 01110.' },
      { q: 'f. Terapkan elitisme k = 1 dan hitung rata-rata fitness tiga populasi (lama, tanpa elitisme, dengan elitisme).',
        fields: [
          { label: 'Rata-rata populasi lama', a: 909.75, tol: 0.006 },
          { label: 'Rata-rata tanpa elitisme', a: 910, tol: 0.006 },
          { label: 'Rata-rata dengan elitisme', a: 950, tol: 0.006 }
        ],
        ex: 'Terbaik lama K4 = 988 menggantikan anak terburuk (828). Rata-rata: lama 909,75, tanpa elitisme 910, dengan elitisme 950.' },
      { q: 'g. Gen mana yang paling dekat dengan kebutuhan 18 unit, dan mengapa fitness tidak boleh langsung dipakai sebagai g(x)?',
        points: [
          'Kromosom dengan x paling dekat 18 memberi g(x) terkecil dan fitness terbesar',
          'g(x) adalah fungsi minimasi: makin kecil makin baik, sedangkan roulette butuh nilai besar untuk solusi baik',
          'Menggeser dengan konstanta 1024 membuat semua fitness positif dan urutannya tetap terjaga',
          'Jika konstanta terlalu besar, semua fitness hampir sama dan seleksi menjadi hampir acak',
          'Alternatif yang juga sah: fitness = 1/(1 + g(x)) atau tournament selection yang tidak butuh fitness positif'
        ] }
    ],
    ex: 'Kunci dihitung sendiri dengan kode; soal tidak memberi kunci. Pola Week 2-3 dengan fungsi minimasi dan konversi fitness; dicek agar rata-rata dan fitness bulat.' }
]);

BANK.isian('ka', 'gajadwal', 'Pola UTS · GA: Jadwal Integer Satu Generasi', [
  { type: 'steps',
    q: 'Panitia ujian susulan menjadwalkan 6 ujian (A sampai F) ke 3 slot. Tabel di bawah berisi banyak mahasiswa yang mengambil dua ujian sekaligus; jika dua ujian itu berada di slot yang sama, mereka semua bentrok. Kromosom integer berisi slot tiap ujian dalam urutan A, B, C, D, E, F. Fitness = 20 − jumlah konflik.\nEmpat jadwal populasi awal: T1 = 112233, T2 = 121323, T3 = 332112, T4 = 213132.\nCatatan: bulatkan proporsi dan rata-rata ke 2 angka di belakang koma.',
    table: { head: ['Pasangan', 'Mahasiswa'],
      rows: [
        ['A–B', 5],
        ['A–C', 3],
        ['A–D', 2],
        ['A–F', 4],
        ['B–C', 6],
        ['B–D', 3],
        ['B–E', 2],
        ['B–F', 1],
        ['C–D', 2],
        ['C–E', 5],
        ['D–E', 4],
        ['D–F', 2],
        ['E–F', 3]
      ] },
    steps: [
      { q: 'a. Hitung konflik dan fitness setiap jadwal.',
        fields: [
          { label: 'Konflik T1', a: 10, tol: 0 },
          { label: 'Konflik T2', a: 7, tol: 0 },
          { label: 'Konflik T3', a: 9, tol: 0 },
          { label: 'Konflik T4', a: 12, tol: 0 },
          { label: 'Fitness T1', a: 10, tol: 0 },
          { label: 'Fitness T2', a: 13, tol: 0 },
          { label: 'Fitness T3', a: 11, tol: 0 },
          { label: 'Fitness T4', a: 8, tol: 0 }
        ],
        ex: 'T1 = 112233 → konflik 10, fitness 10. T2 = 121323 → konflik 7, fitness 13. T3 = 332112 → konflik 9, fitness 11. T4 = 213132 → konflik 12, fitness 8. Konflik dihitung hanya dari pasangan yang berada di slot yang sama.' },
      { q: 'b. Hitung total fitness, proporsi roulette, dan batas atas rentang (2 desimal).',
        fields: [
          { label: 'Total fitness', a: 42, tol: 0 },
          { label: 'Proporsi T1', a: 0.24, tol: 0.006 },
          { label: 'Proporsi T2', a: 0.31, tol: 0.006 },
          { label: 'Proporsi T3', a: 0.26, tol: 0.006 },
          { label: 'Proporsi T4', a: 0.19, tol: 0.006 },
          { label: 'Batas atas T1', a: 0.24, tol: 0.006 },
          { label: 'Batas atas T2', a: 0.55, tol: 0.006 },
          { label: 'Batas atas T3', a: 0.81, tol: 0.006 }
        ],
        ex: 'Total = 42. Proporsi: T1 = 10/42 = 0,24 ≈ 0,24, T2 = 13/42 = 0,31 ≈ 0,31, T3 = 11/42 = 0,26 ≈ 0,26, T4 = 8/42 = 0,19 ≈ 0,19.' },
      { q: 'c. Pilih 4 orang tua dengan nilai acak 0,12; 0,38; 0,63; 0,86.',
        fields: [
          { label: 'Parent1', a: ['T1', '112233'] },
          { label: 'Parent2', a: ['T2', '121323'] },
          { label: 'Parent3', a: ['T3', '332112'] },
          { label: 'Parent4', a: ['T4', '213132'] }
        ],
        ex: 'P1 = 0,12 → T1 (112233); P2 = 0,38 → T2 (121323); P3 = 0,63 → T3 (332112); P4 = 0,86 → T4 (213132).' },
      { q: 'd. Single-point crossover setelah gen ke-3 pada kedua pasangan. Tulis keempat anak dan konfliknya.',
        fields: [
          { label: 'Anak1', a: '112323' },
          { label: 'Anak2', a: '121233' },
          { label: 'Anak3', a: '332132' },
          { label: 'Anak4', a: '213112' },
          { label: 'Konflik Anak1', a: 12, tol: 0 },
          { label: 'Konflik Anak2', a: 9, tol: 0 },
          { label: 'Konflik Anak3', a: 7, tol: 0 },
          { label: 'Konflik Anak4', a: 13, tol: 0 }
        ],
        ex: 'Anak: 112323, 121233, 332132, 213112 dengan konflik 12, 9, 7, 13. Setiap anak tetap jadwal yang sah karena setiap gen tetap bernilai 1, 2, atau 3.' },
      { q: 'e. Mutasi integer: gen 2 (ujian B) pada Anak1 diganti slot 2, dan gen 5 (ujian E) pada Anak4 diganti slot 2. Hitung konflik dan fitness keempat anak setelah mutasi.',
        fields: [
          { label: 'Anak1 hasil', a: '122323' },
          { label: 'Anak2 hasil', a: '121233' },
          { label: 'Anak3 hasil', a: '332132' },
          { label: 'Anak4 hasil', a: '213122' },
          { label: 'Fitness Anak1 hasil', a: 5, tol: 0 },
          { label: 'Fitness Anak2 hasil', a: 11, tol: 0 },
          { label: 'Fitness Anak3 hasil', a: 13, tol: 0 },
          { label: 'Fitness Anak4 hasil', a: 10, tol: 0 }
        ],
        ex: 'Hasil: 122323, 121233, 332132, 213122 dengan konflik 15, 9, 7, 10 dan fitness 5, 11, 13, 10.' },
      { q: 'f. Elitisme k = 1: jadwal terbaik populasi lama menggantikan anak terburuk. Tulis rata-rata fitness ketiga populasi (2 desimal).',
        fields: [
          { label: 'Fitness terbaik populasi lama', a: 13, tol: 0 },
          { label: 'Rata-rata populasi lama', a: 10.5, tol: 0.006 },
          { label: 'Rata-rata tanpa elitisme', a: 9.75, tol: 0.006 },
          { label: 'Rata-rata dengan elitisme', a: 11.75, tol: 0.006 }
        ],
        ex: 'Terbaik lama 13 menggantikan anak terburuk (fitness 5). Rata-rata: lama 10,5, tanpa elitisme 9,75, dengan elitisme 11,75.' },
      { q: 'g. Mengapa masalah ini memakai encoding integer, bukan biner atau permutasi? Lalu jelaskan apa yang terjadi bila fitness = 20 − konflik diganti fitness = 5 − konflik.',
        points: [
          'Setiap gen butuh nilai slot 1..3, dan beberapa ujian boleh berbagi slot, jadi integer lebih hemat daripada biner',
          'Permutasi tidak cocok karena permutasi mewajibkan setiap nilai muncul tepat sekali, sedangkan di sini satu slot dipakai banyak ujian',
          'Dengan fitness = 5 − konflik, banyak jadwal mendapat fitness negatif dan roulette wheel tidak bisa dipakai (peluang negatif)',
          'Solusi untuk fitness negatif: geser dengan konstanta, pakai fitness = 1/(1+konflik), atau ganti ke tournament selection',
          'Konflik sendiri bukan constraint, melainkan objective: jadwal dengan bentrok tetap sah, hanya nilainya buruk'
        ] }
    ],
    ex: 'Kunci dihitung sendiri dengan kode; soal tidak memberi kunci. Pola studi kasus jadwal Week 3 dengan angka baru; kunci dihitung dari tabel pasangan.' }
]);

BANK.isian('ka', 'gasel', 'Pola UTS · GA: Seleksi Roulette, Tournament, Rank', [
  { type: 'steps',
    q: 'Enam individu punya fitness A = 600, B = 200, C = 100, D = 60, E = 30, F = 10. Tim membandingkan tiga cara memilih induk: roulette wheel, rank-based (peringkat terbaik = 6), dan binary tournament (dua individu acak, yang fitness-nya lebih besar menang).\nCatatan: semua peluang ditulis 2 angka di belakang koma.',
    steps: [
      { q: 'a. Roulette wheel: hitung total fitness dan peluang terpilih tiap individu.',
        fields: [
          { label: 'Total fitness', a: 1000, tol: 0 },
          { label: 'P(A)', a: 0.6, tol: 0.006 },
          { label: 'P(B)', a: 0.2, tol: 0.006 },
          { label: 'P(C)', a: 0.1, tol: 0.006 },
          { label: 'P(D)', a: 0.06, tol: 0.006 },
          { label: 'P(E)', a: 0.03, tol: 0.006 },
          { label: 'P(F)', a: 0.01, tol: 0.006 }
        ],
        ex: 'Total = 1000. P = fitness/total: A = 0,60 ≈ 0,6, B = 0,20 ≈ 0,2, C = 0,10 ≈ 0,1, D = 0,06 ≈ 0,06, E = 0,03 ≈ 0,03, F = 0,01 ≈ 0,01. Individu A mendominasi: 0,60 dari seluruh putaran.' },
      { q: 'b. Rank-based: hitung peluang tiap individu bila P = peringkat / jumlah peringkat.',
        fields: [
          { label: 'Jumlah peringkat', a: 21, tol: 0 },
          { label: 'P(A)', a: 0.29, tol: 0.006 },
          { label: 'P(B)', a: 0.24, tol: 0.006 },
          { label: 'P(C)', a: 0.19, tol: 0.006 },
          { label: 'P(D)', a: 0.14, tol: 0.006 },
          { label: 'P(E)', a: 0.1, tol: 0.006 },
          { label: 'P(F)', a: 0.05, tol: 0.006 }
        ],
        ex: 'Peringkat 6, 5, 4, 3, 2, 1 dengan jumlah 21. P = A 0,29 ≈ 0,29, B 0,24 ≈ 0,24, C 0,19 ≈ 0,19, D 0,14 ≈ 0,14, E 0,10 ≈ 0,1, F 0,05 ≈ 0,05.' },
      { q: 'c. Binary tournament untuk pasangan A–F, C–E, B–D, B–F. Siapa pemenangnya?',
        fields: [
          { label: 'A vs F', a: 'A' },
          { label: 'C vs E', a: 'C' },
          { label: 'B vs D', a: 'B' },
          { label: 'B vs F', a: 'B' }
        ],
        ex: 'A (600) vs F (10) → A; C (100) vs E (30) → C; B (200) vs D (60) → B; B (200) vs F (10) → B.' },
      { q: 'd. Hitung rasio peluang individu terbaik terhadap terburuk pada roulette wheel dan pada rank-based (2 desimal).',
        fields: [
          { label: 'Roulette (terbaik/terburuk)', a: 60, tol: 0.006 },
          { label: 'Rank (terbaik/terburuk)', a: 6, tol: 0.006 }
        ],
        ex: 'Roulette: 0,60 / 0,01 = 60,00 kali. Rank: 6/21 dibagi 1/21 = 6,00 kali. Rank jauh lebih lembut, sehingga satu individu tidak menguasai seluruh populasi.' },
      { q: 'e. Jelaskan dua kondisi yang membuat roulette wheel gagal, lalu bandingkan ketiga metode seleksi dan sebutkan kapan masing-masing dipakai.',
        points: [
          'Superindividu: satu individu berfitness sangat tinggi menguasai hampir semua putaran sehingga diversitas mati',
          'Fitness terlalu mirip atau banyak nol: semua peluang hampir sama, seleksi menjadi hampir acak',
          'Roulette peka skala, murah, dan mudah dihitung; cocok bila fitness positif dan tidak timpang',
          'Rank-based stabil terhadap outlier tetapi butuh pengurutan dan menghapus informasi jarak fitness',
          'Tournament tidak butuh fitness positif, mudah diparalelkan, dan tekanan seleksinya diatur ukuran k'
        ] }
    ],
    ex: 'Kunci dihitung sendiri dengan kode; soal tidak memberi kunci. Pola Week 2-3 tentang seleksi; angka dipilih agar peluang roulette berjumlah tepat 1,00.' }
]);

BANK.isian('ka', 'kpmx', 'Pola UTS · PMX & OX Tujuh Gen', [
  { type: 'steps',
    q: 'Bengkel motor menerima 6 unit bernomor 1 sampai 6 yang harus dikerjakan satu per satu. Dua urutan usulan dari generasi sebelumnya: P1 = 1 4 6 2 5 3 dan P2 = 5 3 2 1 6 4, dengan potongan gen ke-3 sampai gen ke-4 (keduanya termasuk).\nCatatan: bulatkan hasil hitungan ke 2 angka di belakang koma bila perlu.',
    steps: [
      { q: 'a. Order crossover (OX): salin segmen gen 3–4 dari P1, baca P2 mulai gen 5 melingkar, buang gen segmen, isi posisi kosong mulai gen 5. Tulis urutan baca, gen sisa, dan kedua anak.',
        fields: [
          { label: 'Segmen dari P1', a: '6 2' },
          { label: 'Urutan baca P2', a: '645321' },
          { label: 'Gen sisa', a: '4531' },
          { label: 'Anak 1 (OX)', a: '316245' },
          { label: 'Anak 2 (OX)', a: '462153' }
        ],
        ex: 'Segmen P1 = 6 2. Baca P2 dari gen 5: 6 4 5 3 2 1 → buang segmen → 4 5 3 1 → isi gen 5 dst. melingkar → 3 1 6 2 4 5. Anak 2: segmen 2 1, baca P1: 5 3 1 4 6 2 → 5 3 4 6 → 4 6 2 1 5 3.' },
      { q: 'b. Partially mapped crossover (PMX) dengan segmen yang sama. Tulis mapping, lalu kedua anak.',
        fields: [
          { label: 'Mapping (contoh: 5-3)', a: '6-2 2-1' },
          { label: 'Anak 1 (PMX)', a: '536214' },
          { label: 'Anak 2 (PMX)', a: '642153' }
        ],
        ex: 'Mapping: 6↔2, 2↔1. Anak 1 = 5 3 6 2 1 4. Rantai mapping terjadi di posisi 5 (6→2→1). Anak 2 = 6 4 2 1 5 3.' },
      { q: 'c. Periksa keempat anak: apakah setiap nomor muncul tepat satu kali? Sebutkan satu perbedaan pokok PMX dan OX.',
        fields: [
          { label: 'Jumlah anak sah', a: 4, tol: 0 },
          { label: 'PMX menjaga', a: ['posisi absolut', 'posisi', 'absolute position'] },
          { label: 'OX menjaga', a: ['urutan relatif', 'urutan', 'relative order'] }
        ],
        ex: 'Keempat anak sah: setiap nomor 1-6 muncul tepat sekali. PMX mempertahankan posisi absolut dan cocok untuk penugasan; OX mempertahankan urutan relatif dan cocok untuk TSP atau penjadwalan urutan.' },
      { q: 'd. Dari urutan awal 1 2 3 4 5 6 7, hitung jumlah ruas (edge) yang putus bila dipakai swap gen 2 dan 5, insertion gen 2 ke posisi 5, dan inversion gen 2 sampai 5. Mana yang paling sedikit merusak?',
        fields: [
          { label: 'Hasil swap', a: '1534267' },
          { label: 'Ruas putus (swap)', a: 4, tol: 0 },
          { label: 'Hasil insertion', a: '1345267' },
          { label: 'Ruas putus (insertion)', a: 3, tol: 0 },
          { label: 'Hasil inversion', a: '1543267' },
          { label: 'Ruas putus (inversion)', a: 2, tol: 0 },
          { label: 'Paling sedikit merusak', a: ['inversion', 'inversi'] }
        ],
        ex: 'Swap: 1534267 → 4 ruas putus. Insertion: 1345267 → 3. Inversion: 1543267 → 2, karena hanya dua ruas di batas segmen yang berubah. Untuk TSP simetris, inversion paling aman.' },
      { q: 'e. Kapan sebaiknya memilih OX dan kapan PMX? Sebutkan pula akibatnya bila single-point crossover biner dipakai langsung pada kromosom permutasi.',
        points: [
          'Single-point pada permutasi menghasilkan nomor ganda dan nomor hilang, sehingga bukan urutan yang sah',
          'Operator permutasi harus menjaga setiap elemen muncul tepat sekali; itulah alasan PMX dan OX ada',
          'Pilih OX bila yang penting urutan relatif atau kedekatan antar elemen: TSP, routing, penjadwalan urutan',
          'Pilih PMX bila yang penting posisi absolut: penempatan pada slot tetap, penugasan',
          'Selalu periksa keabsahan anak sebelum dipakai; satu nomor hilang membuat seluruh rute tidak bisa dijalankan'
        ] }
    ],
    ex: 'Kunci dihitung sendiri dengan kode; soal tidak memberi kunci. Pola Week 5 (PMX vs OX, mutasi permutasi) dengan angka baru.' }
]);

BANK.isian('ka', 'kpmx2', 'Pola UTS · PMX & OX Delapan Gen', [
  { type: 'steps',
    q: 'Delapan berkas perkara bernomor 1 sampai 8 harus diperiksa satu per satu. Dua urutan usulan: P1 = 4 8 2 7 1 5 3 6 dan P2 = 2 7 1 6 3 8 4 5, dengan potongan gen ke-3 sampai gen ke-5 (keduanya termasuk).\nCatatan: bulatkan hasil hitungan ke 2 angka di belakang koma bila perlu.',
    steps: [
      { q: 'a. Order crossover (OX): salin segmen gen 3–5 dari P1, baca P2 mulai gen 6 melingkar, buang gen segmen, isi posisi kosong mulai gen 6. Tulis urutan baca, gen sisa, dan kedua anak.',
        fields: [
          { label: 'Segmen dari P1', a: '2 7 1' },
          { label: 'Urutan baca P2', a: '84527163' },
          { label: 'Gen sisa', a: '84563' },
          { label: 'Anak 1 (OX)', a: '63271845' },
          { label: 'Anak 2 (OX)', a: '27163548' }
        ],
        ex: 'Segmen P1 = 2 7 1. Baca P2 dari gen 6: 8 4 5 2 7 1 6 3 → buang segmen → 8 4 5 6 3 → isi gen 6 dst. melingkar → 6 3 2 7 1 8 4 5. Anak 2: segmen 1 6 3, baca P1: 5 3 6 4 8 2 7 1 → 5 4 8 2 7 → 2 7 1 6 3 5 4 8.' },
      { q: 'b. Partially mapped crossover (PMX) dengan segmen yang sama. Tulis mapping, lalu kedua anak.',
        fields: [
          { label: 'Mapping (contoh: 5-3)', a: '2-1 7-6 1-3' },
          { label: 'Anak 1 (PMX)', a: '36271845' },
          { label: 'Anak 2 (PMX)', a: '48163527' }
        ],
        ex: 'Mapping: 2↔1, 7↔6, 1↔3. Anak 1 = 3 6 2 7 1 8 4 5. Rantai mapping terjadi di posisi 1 (2→1→3), 2 (7→6). Anak 2 = 4 8 1 6 3 5 2 7.' },
      { q: 'c. Periksa keempat anak: apakah setiap nomor muncul tepat satu kali? Sebutkan satu perbedaan pokok PMX dan OX.',
        fields: [
          { label: 'Jumlah anak sah', a: 4, tol: 0 },
          { label: 'PMX menjaga', a: ['posisi absolut', 'posisi', 'absolute position'] },
          { label: 'OX menjaga', a: ['urutan relatif', 'urutan', 'relative order'] }
        ],
        ex: 'Keempat anak sah: setiap nomor 1-8 muncul tepat sekali. PMX mempertahankan posisi absolut dan cocok untuk penugasan; OX mempertahankan urutan relatif dan cocok untuk TSP atau penjadwalan urutan.' },
      { q: 'd. Dari urutan awal 1 2 3 4 5 6 7 8, hitung jumlah ruas (edge) yang putus bila dipakai swap gen 2 dan 5, insertion gen 2 ke posisi 5, dan inversion gen 2 sampai 5. Mana yang paling sedikit merusak?',
        fields: [
          { label: 'Hasil swap', a: '15342678' },
          { label: 'Ruas putus (swap)', a: 4, tol: 0 },
          { label: 'Hasil insertion', a: '13452678' },
          { label: 'Ruas putus (insertion)', a: 3, tol: 0 },
          { label: 'Hasil inversion', a: '15432678' },
          { label: 'Ruas putus (inversion)', a: 2, tol: 0 },
          { label: 'Paling sedikit merusak', a: ['inversion', 'inversi'] }
        ],
        ex: 'Swap: 15342678 → 4 ruas putus. Insertion: 13452678 → 3. Inversion: 15432678 → 2, karena hanya dua ruas di batas segmen yang berubah. Untuk TSP simetris, inversion paling aman.' },
      { q: 'e. Kapan sebaiknya memilih OX dan kapan PMX? Sebutkan pula akibatnya bila single-point crossover biner dipakai langsung pada kromosom permutasi.',
        points: [
          'Single-point pada permutasi menghasilkan nomor ganda dan nomor hilang, sehingga bukan urutan yang sah',
          'Operator permutasi harus menjaga setiap elemen muncul tepat sekali; itulah alasan PMX dan OX ada',
          'Pilih OX bila yang penting urutan relatif atau kedekatan antar elemen: TSP, routing, penjadwalan urutan',
          'Pilih PMX bila yang penting posisi absolut: penempatan pada slot tetap, penugasan',
          'Selalu periksa keabsahan anak sebelum dipakai; satu nomor hilang membuat seluruh rute tidak bisa dijalankan'
        ] }
    ],
    ex: 'Kunci dihitung sendiri dengan kode; soal tidak memberi kunci. Pola Week 5 (PMX vs OX, mutasi permutasi) dengan angka baru.' }
]);

BANK.isian('ka', 'mtsp2', 'Pola UTS · GA untuk TSP (6 kota, 7 kota)', [
  { type: 'steps',
    q: 'Kurir kue kering mengantar pesanan ke enam titik (A sampai F) lalu kembali ke titik awal. Jarak dalam km ada pada matriks ketetanggaan. Gunakan GA dengan populasi 4, representasi permutasi (1 = A sampai 6 = F), fitness = 1/(total jarak), dan kurir boleh berangkat dari titik mana pun.\nCatatan: jarak bilangan bulat; fitness 4 desimal, proporsi dan batas rentang 2 desimal. Hitung proporsi dari fitness yang belum dibulatkan.',
    table: { head: ['', 'A', 'B', 'C', 'D', 'E', 'F'],
      rows: [
        ['A', '-', 9, 7, 9, 7, 10],
        ['B', 9, '-', 10, 14, 3, 11],
        ['C', 7, 10, '-', 2, 10, 2],
        ['D', 9, 14, 2, '-', 10, 12],
        ['E', 7, 3, 10, 10, '-', 3],
        ['F', 10, 11, 2, 12, 3, '-']
      ] },
    steps: [
      { q: 'a. Hitung total jarak dan nilai fitness = 1/(total jarak) setiap kromosom (fitness 4 desimal). Ingat ruas terakhir kembali ke kota awal.',
        table: { head: ['Kromosom', 'Gen', 'Rute'],
          rows: [
            ['A1', '3 2 1 5 4 6', 'C→B→A→E→D→F→C'],
            ['A2', '3 1 5 2 6 4', 'C→A→E→B→F→D→C'],
            ['A3', '2 5 4 1 6 3', 'B→E→D→A→F→C→B'],
            ['A4', '5 2 6 1 3 4', 'E→B→F→A→C→D→E']
          ] },
        fields: [
          { label: 'Total jarak A1', a: 50, tol: 0 },
          { label: 'Fitness A1', a: 0.02, tol: 0.0001 },
          { label: 'Total jarak A2', a: 42, tol: 0 },
          { label: 'Fitness A2', a: 0.0238, tol: 0.0001 },
          { label: 'Total jarak A3', a: 44, tol: 0 },
          { label: 'Fitness A3', a: 0.0227, tol: 0.0001 },
          { label: 'Total jarak A4', a: 43, tol: 0 },
          { label: 'Fitness A4', a: 0.0233, tol: 0.0001 }
        ],
        ex: 'A1: 10 + 9 + 7 + 10 + 12 + 2 = 50, fitness 1/50 = 0,0200. A2: 7 + 7 + 3 + 11 + 12 + 2 = 42, fitness 1/42 = 0,0238. A3: 3 + 10 + 9 + 10 + 2 + 10 = 44, fitness 1/44 = 0,0227. A4: 3 + 11 + 10 + 7 + 2 + 10 = 43, fitness 1/43 = 0,0233.' },
      { q: 'b. Hitung total fitness, proporsi roulette wheel (fitness/total, 2 desimal), dan batas atas rentang tiap kromosom. Batas bawah A1 = 0, batas atas A4 = 1. Tidak perlu diurutkan.',
        fields: [
          { label: 'Total fitness (4 desimal)', a: 0.0898, tol: 0.0002 },
          { label: 'Proporsi A1', a: 0.22, tol: 0.006 },
          { label: 'Proporsi A2', a: 0.27, tol: 0.006 },
          { label: 'Proporsi A3', a: 0.25, tol: 0.006 },
          { label: 'Proporsi A4', a: 0.26, tol: 0.006 },
          { label: 'Batas atas A1', a: 0.22, tol: 0.011 },
          { label: 'Batas atas A2', a: 0.49, tol: 0.011 },
          { label: 'Batas atas A3', a: 0.74, tol: 0.011 }
        ],
        ex: 'Total = 0,0200 + 0,0238 + 0,0227 + 0,0233 = 0,0898. Proporsi: A1 0,2227 ≈ 0,22, A2 0,2652 ≈ 0,27, A3 0,2531 ≈ 0,25, A4 0,2590 ≈ 0,26. Rentang: A1 [0,00 – 0,22), A2 [0,22 – 0,49), A3 [0,49 – 0,74), A4 [0,74 – 1,00). Jika tiap proporsi dibulatkan dulu lalu dijumlah, batas atas bisa beda 0,01; dua cara itu sama-sama diterima selama konsisten.' },
      { q: 'c. Pilih orang tua dengan nilai acak P1 = 0,11; 0,36; 0,61; 0,87 (urut P1 sampai P4). Kromosom terpilih adalah yang rentangnya memuat nilai acak.',
        fields: [
          { label: 'Parent1 (r = 0,11)', a: ['A1', '321546'] },
          { label: 'Parent2 (r = 0,36)', a: ['A2', '315264'] },
          { label: 'Parent3 (r = 0,61)', a: ['A3', '254163'] },
          { label: 'Parent4 (r = 0,87)', a: ['A4', '526134'] }
        ],
        ex: 'P1 = 0,11 → A1 (321546); P2 = 0,36 → A2 (315264); P3 = 0,61 → A3 (254163); P4 = 0,87 → A4 (526134).' },
      { q: 'd. Pasangkan Parent1–Parent2 dan Parent3–Parent4, lalu lakukan order crossover dengan TP1 = 2 dan TP2 = 5 (segmen = gen ke-2 sampai gen ke-5, keduanya termasuk). Anak1 = segmen Parent1 + urutan Parent2, Anak2 = segmen Parent2 + urutan Parent1, begitu juga Anak3 dan Anak4.',
        fields: [
          { label: 'Anak1', a: '621543' },
          { label: 'Anak2', a: '415263' },
          { label: 'Anak3', a: '354162' },
          { label: 'Anak4', a: '426135' }
        ],
        ex: 'Anak1: segmen 2 1 5 4 dari A1; urutan A2 mulai gen ke-6: 4 3 1 5 2 6, buang segmen → 3 6; isi gen ke-6 dst. melingkar → 6 2 1 5 4 3. Anak2: segmen 1 5 2 6 dari A2; urutan A1 mulai gen ke-6: 6 3 2 1 5 4, buang segmen → 3 4; isi gen ke-6 dst. melingkar → 4 1 5 2 6 3. Anak3: segmen 5 4 1 6 dari A3; urutan A4 mulai gen ke-6: 4 5 2 6 1 3, buang segmen → 2 3; isi gen ke-6 dst. melingkar → 3 5 4 1 6 2. Anak4: segmen 2 6 1 3 dari A4; urutan A3 mulai gen ke-6: 3 2 5 4 1 6, buang segmen → 5 4; isi gen ke-6 dst. melingkar → 4 2 6 1 3 5. Tafsiran lain (TP = potong setelah gen 2 dan gen 5, segmen gen 3–5): Anak1–4 = 261543, 145263, 234165, 546132. Tulis asumsi segmenmu di lembar ujian.' },
      { q: 'e. Probabilitas mutasi = 0,2. Anak dimutasi jika nilai random < 0,2, dengan swap mutation pada indeks gen yang ditentukan.',
        table: { head: ['Anak', 'Nilai random', 'Indeks gen'],
          rows: [
            ['Anak1', '0,11', '1 dan 3'],
            ['Anak2', '0,42', '2 dan 5'],
            ['Anak3', '0,07', '4 dan 6'],
            ['Anak4', '0,55', '1 dan 6']
          ] },
        fields: [
          { label: 'Anak yang dimutasi (pisahkan spasi)', a: 'Anak1 Anak3', set: true },
          { label: 'Anak1 hasil mutasi', a: '126543' },
          { label: 'Anak2 hasil mutasi', a: '415263' },
          { label: 'Anak3 hasil mutasi', a: '354261' },
          { label: 'Anak4 hasil mutasi', a: '426135' }
        ],
        ex: 'Anak1: 0,11 < 0,2, tukar gen 1 dan 3: 621543 → 126543; Anak2: 0,42 ≥ 0,2, tetap 415263; Anak3: 0,07 < 0,2, tukar gen 4 dan 6: 354162 → 354261; Anak4: 0,55 ≥ 0,2, tetap 426135. Tafsiran lain (TP = potong setelah gen 2 dan gen 5, segmen gen 3–5): hasil mutasi 162543, 145263, 234561, 546132. Tulis asumsi segmenmu di lembar ujian.' },
      { q: 'f. Generational replacement tanpa elitisme: keempat anak menggantikan seluruh populasi lama. Hitung total jarak dan fitness generasi baru.',
        fields: [
          { label: 'Total jarak Anak1', a: 42, tol: 0 },
          { label: 'Fitness Anak1', a: 0.0238, tol: 0.0001 },
          { label: 'Total jarak Anak2', a: 34, tol: 0 },
          { label: 'Fitness Anak2', a: 0.0294, tol: 0.0001 },
          { label: 'Total jarak Anak3', a: 62, tol: 0 },
          { label: 'Fitness Anak3', a: 0.0161, tol: 0.0001 },
          { label: 'Total jarak Anak4', a: 62, tol: 0 },
          { label: 'Fitness Anak4', a: 0.0161, tol: 0.0001 }
        ],
        ex: 'Anak1 A→B→F→E→D→C→A = 42, fitness 0,0238. Anak2 D→A→E→B→F→C→D = 34, fitness 0,0294. Anak3 C→E→D→B→F→A→C = 62, fitness 0,0161. Anak4 D→B→F→A→C→E→D = 62, fitness 0,0161. Rata-rata jarak 44,75 → 50,00. Tafsiran lain (TP = potong setelah gen 2 dan gen 5, segmen gen 3–5): jarak 43, 42, 44, 52. Tulis asumsi segmenmu di lembar ujian.' },
      { q: 'g. Tuliskan jalur terbaik di generasi baru dan jalur terbaik yang pernah ditemukan selama proses (generasi awal + generasi baru), beserta total jaraknya.',
        fields: [
          { label: 'Jalur terbaik generasi baru', a: ['415263', 'DAEBFC', 'DAEBFCD'] },
          { label: 'Jaraknya', a: 34, tol: 0 },
          { label: 'Jalur terbaik selama proses', a: ['415263', 'DAEBFC', 'DAEBFCD'] },
          { label: 'Jarak terbaik selama proses', a: 34, tol: 0 }
        ],
        ex: 'Generasi baru: Anak2 = D→A→E→B→F→C→D (34). Generasi baru lebih baik dari generasi awal (terbaik lama A2 = 42): crossover dan mutasi berhasil menggabungkan bagian rute yang baik. Optimum sebenarnya (dicek dengan mencoba semua permutasi) = 28. Tafsiran lain (TP = potong setelah gen 2 dan gen 5, segmen gen 3–5): terbaik generasi baru 42, terbaik selama proses 42. Tulis asumsi segmenmu di lembar ujian.' },
      { q: 'Jelaskan apa yang terjadi jika dipakai elitisme k = 1, dan mengapa jawaban g bergantung pada ada tidaknya elitisme.',
        points: [
          'Elitisme k = 1 menyalin kromosom terbaik generasi lama (jarak terpendek) ke generasi baru tanpa diubah',
          'Kromosom terbaik menggantikan anak terburuk (jarak terpanjang)',
          'Tanpa elitisme solusi terbaik bisa hilang, sehingga kurva jarak terbaik bisa naik',
          'Di soal ini generasi baru sudah lebih baik, jadi elitisme tidak mengubah jawaban g'
        ] }
    ],
    ex: 'Kunci dihitung sendiri dengan kode; soal tidak memberi kunci. Pola Soal 1 UTS 2025 dengan 6 kota; segmen OX lebih panjang sehingga anak lebih bervariasi.' },
  { type: 'steps',
    q: 'Petugas sensus keliling mengunjungi tujuh desa (A sampai G) dalam satu putaran lalu kembali ke desa pertama. Jarak (km) ada pada matriks ketetanggaan. Gunakan GA dengan populasi 4, representasi permutasi (1 = A sampai 7 = G), fitness = 1/(total jarak).\nCatatan: jarak bilangan bulat; fitness 4 desimal, proporsi dan batas rentang 2 desimal. Hitung proporsi dari fitness yang belum dibulatkan.',
    table: { head: ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G'],
      rows: [
        ['A', '-', 5, 11, 7, 13, 6, 11],
        ['B', 5, '-', 11, 5, 3, 12, 10],
        ['C', 11, 11, '-', 13, 5, 12, 8],
        ['D', 7, 5, 13, '-', 11, 11, 12],
        ['E', 13, 3, 5, 11, '-', 13, 11],
        ['F', 6, 12, 12, 11, 13, '-', 8],
        ['G', 11, 10, 8, 12, 11, 8, '-']
      ] },
    steps: [
      { q: 'a. Hitung total jarak dan nilai fitness = 1/(total jarak) setiap kromosom (fitness 4 desimal). Ingat ruas terakhir kembali ke kota awal.',
        table: { head: ['Kromosom', 'Gen', 'Rute'],
          rows: [
            ['A1', '3 6 7 1 2 5 4', 'C→F→G→A→B→E→D→C'],
            ['A2', '7 2 5 6 3 4 1', 'G→B→E→F→C→D→A→G'],
            ['A3', '3 6 5 1 2 4 7', 'C→F→E→A→B→D→G→C'],
            ['A4', '2 5 6 3 7 1 4', 'B→E→F→C→G→A→D→B']
          ] },
        fields: [
          { label: 'Total jarak A1', a: 63, tol: 0 },
          { label: 'Fitness A1', a: 0.0159, tol: 0.0001 },
          { label: 'Total jarak A2', a: 69, tol: 0 },
          { label: 'Fitness A2', a: 0.0145, tol: 0.0001 },
          { label: 'Total jarak A3', a: 68, tol: 0 },
          { label: 'Fitness A3', a: 0.0147, tol: 0.0001 },
          { label: 'Total jarak A4', a: 59, tol: 0 },
          { label: 'Fitness A4', a: 0.0169, tol: 0.0001 }
        ],
        ex: 'A1: 12 + 8 + 11 + 5 + 3 + 11 + 13 = 63, fitness 1/63 = 0,0159. A2: 10 + 3 + 13 + 12 + 13 + 7 + 11 = 69, fitness 1/69 = 0,0145. A3: 12 + 13 + 13 + 5 + 5 + 12 + 8 = 68, fitness 1/68 = 0,0147. A4: 3 + 13 + 12 + 8 + 11 + 7 + 5 = 59, fitness 1/59 = 0,0169.' },
      { q: 'b. Hitung total fitness, proporsi roulette wheel (fitness/total, 2 desimal), dan batas atas rentang tiap kromosom. Batas bawah A1 = 0, batas atas A4 = 1. Tidak perlu diurutkan.',
        fields: [
          { label: 'Total fitness (4 desimal)', a: 0.062, tol: 0.0002 },
          { label: 'Proporsi A1', a: 0.26, tol: 0.006 },
          { label: 'Proporsi A2', a: 0.23, tol: 0.006 },
          { label: 'Proporsi A3', a: 0.24, tol: 0.006 },
          { label: 'Proporsi A4', a: 0.27, tol: 0.006 },
          { label: 'Batas atas A1', a: 0.26, tol: 0.011 },
          { label: 'Batas atas A2', a: 0.49, tol: 0.011 },
          { label: 'Batas atas A3', a: 0.73, tol: 0.011 }
        ],
        ex: 'Total = 0,0159 + 0,0145 + 0,0147 + 0,0169 = 0,0620. Proporsi: A1 0,2559 ≈ 0,26, A2 0,2337 ≈ 0,23, A3 0,2371 ≈ 0,24, A4 0,2733 ≈ 0,27. Rentang: A1 [0,00 – 0,26), A2 [0,26 – 0,49), A3 [0,49 – 0,73), A4 [0,73 – 1,00). Jika tiap proporsi dibulatkan dulu lalu dijumlah, batas atas bisa beda 0,01; dua cara itu sama-sama diterima selama konsisten.' },
      { q: 'c. Pilih orang tua dengan nilai acak P1 = 0,13; 0,37; 0,61; 0,86 (urut P1 sampai P4). Kromosom terpilih adalah yang rentangnya memuat nilai acak.',
        fields: [
          { label: 'Parent1 (r = 0,13)', a: ['A1', '3671254'] },
          { label: 'Parent2 (r = 0,37)', a: ['A2', '7256341'] },
          { label: 'Parent3 (r = 0,61)', a: ['A3', '3651247'] },
          { label: 'Parent4 (r = 0,86)', a: ['A4', '2563714'] }
        ],
        ex: 'P1 = 0,13 → A1 (3671254); P2 = 0,37 → A2 (7256341); P3 = 0,61 → A3 (3651247); P4 = 0,86 → A4 (2563714).' },
      { q: 'd. Pasangkan Parent1–Parent2 dan Parent3–Parent4, lalu lakukan order crossover dengan TP1 = 2 dan TP2 = 6 (segmen = gen ke-2 sampai gen ke-6, keduanya termasuk). Anak1 = segmen Parent1 + urutan Parent2, Anak2 = segmen Parent2 + urutan Parent1, begitu juga Anak3 dan Anak4.',
        fields: [
          { label: 'Anak1', a: '4671253' },
          { label: 'Anak2', a: '1256347' },
          { label: 'Anak3', a: '7651243' },
          { label: 'Anak4', a: '4563712' }
        ],
        ex: 'Anak1: segmen 6 7 1 2 5 dari A1; urutan A2 mulai gen ke-7: 1 7 2 5 6 3 4, buang segmen → 3 4; isi gen ke-7 dst. melingkar → 4 6 7 1 2 5 3. Anak2: segmen 2 5 6 3 4 dari A2; urutan A1 mulai gen ke-7: 4 3 6 7 1 2 5, buang segmen → 7 1; isi gen ke-7 dst. melingkar → 1 2 5 6 3 4 7. Anak3: segmen 6 5 1 2 4 dari A3; urutan A4 mulai gen ke-7: 4 2 5 6 3 7 1, buang segmen → 3 7; isi gen ke-7 dst. melingkar → 7 6 5 1 2 4 3. Anak4: segmen 5 6 3 7 1 dari A4; urutan A3 mulai gen ke-7: 7 3 6 5 1 2 4, buang segmen → 2 4; isi gen ke-7 dst. melingkar → 4 5 6 3 7 1 2. Tafsiran lain (TP = potong setelah gen 2 dan gen 6, segmen gen 3–6): Anak1–4 = 3471256, 1256347, 3751246, 2463715. Tulis asumsi segmenmu di lembar ujian.' },
      { q: 'e. Probabilitas mutasi = 0,2. Anak dimutasi jika nilai random < 0,2, dengan swap mutation pada indeks gen yang ditentukan.',
        table: { head: ['Anak', 'Nilai random', 'Indeks gen'],
          rows: [
            ['Anak1', '0,11', '1 dan 3'],
            ['Anak2', '0,42', '2 dan 5'],
            ['Anak3', '0,07', '4 dan 6'],
            ['Anak4', '0,55', '1 dan 6']
          ] },
        fields: [
          { label: 'Anak yang dimutasi (pisahkan spasi)', a: 'Anak1 Anak3', set: true },
          { label: 'Anak1 hasil mutasi', a: '7641253' },
          { label: 'Anak2 hasil mutasi', a: '1256347' },
          { label: 'Anak3 hasil mutasi', a: '7654213' },
          { label: 'Anak4 hasil mutasi', a: '4563712' }
        ],
        ex: 'Anak1: 0,11 < 0,2, tukar gen 1 dan 3: 4671253 → 7641253; Anak2: 0,42 ≥ 0,2, tetap 1256347; Anak3: 0,07 < 0,2, tukar gen 4 dan 6: 7651243 → 7654213; Anak4: 0,55 ≥ 0,2, tetap 4563712. Tafsiran lain (TP = potong setelah gen 2 dan gen 6, segmen gen 3–6): hasil mutasi 7431256, 1256347, 3754216, 2463715. Tulis asumsi segmenmu di lembar ujian.' },
      { q: 'f. Generational replacement tanpa elitisme: keempat anak menggantikan seluruh populasi lama. Hitung total jarak dan fitness generasi baru.',
        fields: [
          { label: 'Total jarak Anak1', a: 47, tol: 0 },
          { label: 'Fitness Anak1', a: 0.0213, tol: 0.0001 },
          { label: 'Total jarak Anak2', a: 69, tol: 0 },
          { label: 'Fitness Anak2', a: 0.0145, tol: 0.0001 },
          { label: 'Total jarak Anak3', a: 61, tol: 0 },
          { label: 'Fitness Anak3', a: 0.0164, tol: 0.0001 },
          { label: 'Total jarak Anak4', a: 65, tol: 0 },
          { label: 'Fitness Anak4', a: 0.0154, tol: 0.0001 }
        ],
        ex: 'Anak1 G→F→D→A→B→E→C→G = 47, fitness 0,0213. Anak2 A→B→E→F→C→D→G→A = 69, fitness 0,0145. Anak3 G→F→E→D→B→A→C→G = 61, fitness 0,0164. Anak4 D→E→F→C→G→A→B→D = 65, fitness 0,0154. Rata-rata jarak 64,75 → 60,50. Tafsiran lain (TP = potong setelah gen 2 dan gen 6, segmen gen 3–6): jarak 65, 69, 58, 63. Tulis asumsi segmenmu di lembar ujian.' },
      { q: 'g. Tuliskan jalur terbaik di generasi baru dan jalur terbaik yang pernah ditemukan selama proses (generasi awal + generasi baru), beserta total jaraknya.',
        fields: [
          { label: 'Jalur terbaik generasi baru', a: ['7641253', 'GFDABEC', 'GFDABECG'] },
          { label: 'Jaraknya', a: 47, tol: 0 },
          { label: 'Jalur terbaik selama proses', a: ['7641253', 'GFDABEC', 'GFDABECG'] },
          { label: 'Jarak terbaik selama proses', a: 47, tol: 0 }
        ],
        ex: 'Generasi baru: Anak1 = G→F→D→A→B→E→C→G (47). Generasi baru lebih baik dari generasi awal (terbaik lama A4 = 59): crossover dan mutasi berhasil menggabungkan bagian rute yang baik. Optimum sebenarnya (dicek dengan mencoba semua permutasi) = 42. Tafsiran lain (TP = potong setelah gen 2 dan gen 6, segmen gen 3–6): terbaik generasi baru 58, terbaik selama proses 58. Tulis asumsi segmenmu di lembar ujian.' },
      { q: 'Jelaskan apa yang terjadi jika dipakai elitisme k = 1, dan mengapa jawaban g bergantung pada ada tidaknya elitisme.',
        points: [
          'Elitisme k = 1 menyalin kromosom terbaik generasi lama (jarak terpendek) ke generasi baru tanpa diubah',
          'Kromosom terbaik menggantikan anak terburuk (jarak terpanjang)',
          'Tanpa elitisme solusi terbaik bisa hilang, sehingga kurva jarak terbaik bisa naik',
          'Di soal ini generasi baru sudah lebih baik, jadi elitisme tidak mengubah jawaban g'
        ] }
    ],
    ex: 'Kunci dihitung sendiri dengan kode; soal tidak memberi kunci. Pola Soal 1 UTS 2025 dengan 7 kota. Segmen gen 2-6 membuat sisa gen hanya 2 sehingga banyak anak mirip induknya; periksa tiap kota tepat sekali.' }
]);

BANK.isian('ka', 'msort', 'Pola UTS · NSGA-II: Sort, Crowding, Tournament', [
  { type: 'steps',
    q: 'Tim kurir makanan membandingkan enam rencana pengiriman. Setiap rencana dinilai dengan dua objektif yang keduanya diminimalkan: f1 = waktu tempuh total (menit) dan f2 = biaya operasional (ribu rupiah).\nCatatan: bulatkan crowding distance ke 2 angka di belakang koma.',
    table: { head: ['Solusi', 'f1', 'f2'],
      rows: [['S1', 12, 40], ['S2', 18, 30], ['S3', 15, 34], ['S4', 25, 22], ['S5', 30, 26], ['S6', 10, 48]] },
    steps: [
      { q: 'a. Hitung n_p (banyak solusi yang mendominasi p) dan tulis S_p (solusi yang didominasi p). Kedua objektif diminimalkan.',
        fields: [
          { label: 'n_p S1', a: 0, tol: 0 },
          { label: 'n_p S2', a: 0, tol: 0 },
          { label: 'n_p S3', a: 0, tol: 0 },
          { label: 'n_p S4', a: 0, tol: 0 },
          { label: 'n_p S5', a: 1, tol: 0 },
          { label: 'n_p S6', a: 0, tol: 0 },
          { label: 'S_p S1 (kosong)', a: ['kosong', 'tidak ada', '-'] },
          { label: 'S_p S2 (kosong)', a: ['kosong', 'tidak ada', '-'] },
          { label: 'S_p S3 (kosong)', a: ['kosong', 'tidak ada', '-'] },
          { label: 'S_p S4', a: 'S5', set: true },
          { label: 'S_p S5 (kosong)', a: ['kosong', 'tidak ada', '-'] },
          { label: 'S_p S6 (kosong)', a: ['kosong', 'tidak ada', '-'] }
        ],
        ex: 'S1 = (12, 40): n_p = 0, tidak mendominasi siapa pun. S2 = (18, 30): n_p = 0, tidak mendominasi siapa pun. S3 = (15, 34): n_p = 0, tidak mendominasi siapa pun. S4 = (25, 22): n_p = 0, mendominasi {S5}. S5 = (30, 26): n_p = 1, tidak mendominasi siapa pun. S6 = (10, 48): n_p = 0, tidak mendominasi siapa pun. Ingat: seri di satu objektif tetap bisa mendominasi bila objektif lain lebih baik.' },
      { q: 'b. Tulis front non-dominated (rank) semua solusi.',
        fields: [{ label: 'Front 1', a: 'S1 S2 S3 S4 S6', set: true }, { label: 'Front 2', a: 'S5', set: true }],
        ex: 'Front 1 = {S1, S2, S3, S4, S6}; Front 2 = {S5}. Front 1 adalah semua solusi dengan n_p = 0; setelah dikeluarkan, sisa solusi dihitung ulang.' },
      { q: 'c. Hitung crowding distance semua anggota front 1 (2 desimal). Ujung setiap objektif diberi tak hingga.',
        fields: [
          { label: 'CD S1', a: 0.87, tol: 0.006 },
          { label: 'CD S2', a: 1.13, tol: 0.006 },
          { label: 'CD S3', a: 0.78, tol: 0.006 },
          { label: 'CD S4', a: ['∞', 'inf', 'infinity', 'tak hingga', 'infinite'] },
          { label: 'CD S6', a: ['∞', 'inf', 'infinity', 'tak hingga', 'infinite'] },
          { label: 'CD terkecil di front 1', a: 'S3' }
        ],
        ex: 'Urut f1: S6, S1, S3, S2, S4. S1 = 0,87 = (15 − 10)/15 + (48 − 34)/26; S2 = 1,13 = (25 − 15)/15 + (34 − 22)/26; S3 = 0,78 = (18 − 12)/15 + (40 − 30)/26. S4 dan S6 berada di ujung sehingga CD = ∞.' },
      { q: 'd. Binary tournament: S1 vs S2, S3 vs S4, S5 vs S6, S2 vs S6. Rank lebih kecil menang; bila rank sama, crowding lebih besar menang.',
        fields: [
          { label: 'S1 vs S2', a: 'S2' },
          { label: 'S3 vs S4', a: 'S4' },
          { label: 'S5 vs S6', a: 'S6' },
          { label: 'S2 vs S6', a: 'S6' }
        ],
        ex: 'S1 (rank 1, CD 0,87) vs S2 (rank 1, CD 1,13) → S2 karena crowding; S3 (rank 1, CD 0,78) vs S4 (rank 1, CD ∞) → S4 karena crowding; S5 (rank 2, CD ∞) vs S6 (rank 1, CD ∞) → S6 karena rank; S2 (rank 1, CD 1,13) vs S6 (rank 1, CD ∞) → S6 karena crowding.' },
      { q: 'e. Bila hanya satu rencana boleh dipakai dari front 1, mana yang paling tepat dibuang lebih dulu, dan mengapa membuang berdasarkan crowding bukan berarti solusinya buruk?',
        points: [
          'Yang dibuang adalah anggota front 1 dengan crowding distance terkecil, karena paling rapat dengan tetangganya',
          'Crowding kecil berarti solusi itu bisa diwakili solusi tetangganya yang hampir sama baiknya; solusinya sendiri tetap non-dominated',
          'Membuang berdasarkan rank saja akan menghapus seluruh front 1 sekaligus dan menyisakan front yang lebih buruk',
          'Crowding menjaga sebaran pilihan sehingga keputusan akhir punya banyak opsi trade-off'
        ] }
    ],
    ex: 'Kunci dihitung sendiri dengan kode; soal tidak memberi kunci. Pola Week 6: non-dominated sort, crowding distance, tournament rank lalu crowding.' }
]);

BANK.isian('ka', 'mfill', 'Pola UTS · NSGA-II: Combine 2N lalu Fill N', [
  { type: 'steps',
    q: 'Penjadwalan bengkel dengan NSGA-II, N = 4. f1 = jumlah hari yang dipakai, f2 = jumlah teknisi yang bentrok; keduanya diminimalkan. Populasi induk (P1-P4) dan offspring hasil crossover dan mutasi (O1-O4) sudah dievaluasi.\nCatatan: crowding distance dan semua hasil 2 desimal.',
    table: { head: ['Solusi', 'f1', 'f2'],
      rows: [
        ['P1', 6, 27],
        ['P2', 4, 30],
        ['P3', 5, 25],
        ['P4', 3, 36],
        ['O1', 2, 10],
        ['O2', 6, 33],
        ['O3', 7, 11],
        ['O4', 2, 34]
      ] },
    steps: [
      { q: 'a. Langkah 6 (combine): berapa ukuran pool gabungan, dan mengapa NSGA-II tidak langsung mengganti induk dengan offspring?',
        fields: [{ label: 'Ukuran pool', a: 8, tol: 0 }],
        ex: 'Pool = N induk + N offspring = 2N = 8. Induk yang lebih baik dari offspring masih bisa bertahan: inilah elitisme NSGA-II tanpa parameter k.' },
      { q: 'b. Langkah 7 (sort again): urutkan pool ke front.',
        fields: [
          { label: 'Front 1', a: 'O1', set: true },
          { label: 'Front 2', a: 'P2 P3 O3 O4', set: true },
          { label: 'Front 3', a: 'P1 P4', set: true },
          { label: 'Front 4', a: 'O2', set: true }
        ],
        ex: 'F1 = {O1}; F2 = {P2, P3, O3, O4}; F3 = {P1, P4}; F4 = {O2}.' },
      { q: 'c. Langkah 8 (fill): front mana yang masuk utuh, front mana yang meluap, berapa tempat tersisa, dan berapa crowding anggotanya (2 desimal)?',
        fields: [
          { label: 'Masuk utuh', a: 'O1' },
          { label: 'Front meluap', a: ['F2', 'front 2', '2'] },
          { label: 'Tempat tersisa', a: 3, tol: 0 },
          { label: 'CD P2', a: 0.99, tol: 0.006 },
          { label: 'CD P3', a: 1.43, tol: 0.006 },
          { label: 'CD O3', a: ['∞', 'inf', 'infinity', 'tak hingga', 'infinite'] },
          { label: 'CD O4', a: ['∞', 'inf', 'infinity', 'tak hingga', 'infinite'] }
        ],
        ex: 'Masuk utuh: O1 (1/4). F2 {P2, P3, O3, O4} meluap, sisa 3 tempat. Crowding: P2 = 0,99; P3 = 1,43; O3 = ∞; O4 = ∞.' },
      { q: 'd. Tulis populasi generasi berikutnya dan semua solusi yang dibuang.',
        fields: [
          { label: 'Generasi berikutnya', a: 'O1 O3 O4 P3', set: true },
          { label: 'Dibuang', a: 'P1 P4 O2 P2', set: true }
        ],
        ex: 'Generasi berikutnya: O1, O3, O4, P3. Dibuang: P1, P4, O2, P2. Yang dibuang dari front meluap dipilih karena crowding terkecil; sisanya dibuang hanya karena berada di front belakang.' },
      { q: 'e. Jelaskan mengapa menggabungkan induk dan offspring (2N) lalu memilih N disebut elitisme tanpa parameter, dan bandingkan dengan elitisme k pada GA biasa.',
        points: [
          'Karena seluruh induk ikut bersaing, solusi terbaik tidak mungkin hilang selama ia masih ada di pool',
          'Tidak ada parameter k yang perlu dipilih; jumlah yang bertahan ditentukan oleh rank lalu crowding',
          'Pada GA biasa elitisme k menyalin top-k secara paksa dan k harus ditentukan sendiri',
          'Akibatnya NSGA-II tidak pernah memburuk pada objektif Pareto, tetapi tetap harus menjaga sebaran lewat crowding'
        ] }
    ],
    ex: 'Kunci dihitung sendiri dengan kode; soal tidak memberi kunci. Pola langkah 6-8 slide Week 6.' }
]);

BANK.isian('ka', 'mweight', 'Pola UTS · Multi-Objective: Knee Point & Weighted Sum', [
  { type: 'steps',
    q: 'Setelah ratusan generasi, NSGA-II memberi front jadwal ujian dalam bentuk (jumlah slot, jumlah bentrok): (1, 179), (2, 49), (3, 13), (4, 4), (5, 0). Semua titik ini non-dominated: menambah slot menurunkan bentrok tetapi menambah hari ujian.\nCatatan: semua hitungan 2 desimal.',
    steps: [
      { q: 'a. Berapa bentrok yang dihemat setiap tambahan satu slot, dan di mana knee point-nya?',
        fields: [
          { label: '1 → 2 slot', a: 130, tol: 0 },
          { label: '2 → 3 slot', a: 36, tol: 0 },
          { label: '3 → 4 slot', a: 9, tol: 0 },
          { label: '4 → 5 slot', a: 4, tol: 0 },
          { label: 'Knee point (slot)', a: 3, tol: 0 }
        ],
        ex: 'Penghematan: 130, 36, 9, 4 bentrok. Sampai 3 slot setiap tambahan menghemat puluhan bentrok, setelah itu tinggal satuan. Knee point = 3 slot (13 bentrok).' },
      { q: 'b. Weighted sum: skor = w × slot + (1 − w) × bentrok, pilih skor terkecil. Jadwal mana yang terpilih untuk w = 0,5 dan w = 0,95?',
        fields: [{ label: 'w = 0,5', a: 5, tol: 0 }, { label: 'w = 0,95', a: 3, tol: 0 }],
        ex: 'w = 0,5: skor 90,00; 25,50; 8,00; 4,00; 2,50 → 5 slot. w = 0,95: skor 9,90; 4,35; 3,50; 4,00; 4,75 → 3 slot. Pilihan berubah total hanya karena bobot, padahal datanya sama.' },
      { q: 'c. Dekan menetapkan ujian maksimal 3 hari. Opsi mana yang masih memenuhi, dan mana yang kamu rekomendasikan? Tulis alasannya untuk dekan, bukan untuk dosen algoritma.',
        points: [
          'Opsi yang memenuhi: 1, 2, dan 3 slot',
          'Rekomendasi 3 slot dengan 13 bentrok, karena slot ketiga masih menghemat 36 bentrok sedangkan slot keempat hanya 9',
          'Batasan 3 hari membuat opsi 4 dan 5 slot gugur walau lebih sedikit bentrok',
          'Keputusan akhir milik dekan; algoritma hanya menyediakan pilihan dan angka trade-off-nya'
        ] },
      { q: 'd. Mengapa NSGA-II tidak cukup diganti weighted sum, dan kapan weighted sum justru wajar dipakai?',
        points: [
          'Bobot w harus dipilih sebelum trade-off terlihat, sehingga hasil sudah ditentukan di awal',
          'Pada front cekung sebagian solusi tidak pernah terpilih berapa pun nilai w',
          'NSGA-II mencari seluruh front lebih dulu, keputusan diambil belakangan (a posteriori)',
          'Weighted sum wajar bila nilai tukar sudah diketahui, misalnya biaya satu slot sudah ada standar rupiahnya',
          'Weighted sum juga murah: satu kali optimasi, bukan sekumpulan solusi'
        ] }
    ],
    ex: 'Kunci dihitung sendiri dengan kode; soal tidak memberi kunci. Front dari slide Week 6; bagian weighted sum dan keputusan dekan dibuat sendiri.' }
]);
