// Kecerdasan Artifisial — soal uraian bertahap Genetic Algorithm (Week 2-3): konsep GA, proses GA, studi kasus jadwal.
// Setiap soal (type: 'steps') berisi langkah fill atau essay yang dibuka satu per satu saat latihan.
// Dibuat dari slide minggu 1-3 dan 5; semua angka dihitung dengan kode, label kunci buatan sendiri ada di ex.

BANK.isian('ka', 'konsep', 'Genetic Algorithm: Konsep Keseluruhan', [
  { type: 'steps',
    q: 'Bagian akademik FIF harus menempatkan 40 ujian ke dalam 10 slot waktu. Dua ujian yang diikuti mahasiswa yang sama akan bentrok jika berada di slot yang sama. Panitia meminta jadwal dengan bentrok sesedikit mungkin, dan jadwal harus jadi besok pagi.',
    steps: [
      { q: 'Setiap ujian boleh ditaruh di slot mana pun. Berapa banyak jadwal yang mungkin? Jika komputer memeriksa 10^9 jadwal per detik, berapa lama enumerasi penuh (1 tahun ≈ 3,15 × 10^7 detik)?',
        fields: [
          { label: 'Banyak jadwal = 10^k, k', a: 40, tol: 0 },
          { label: 'Lama enumerasi ≈ 10^k tahun, k', a: 23, tol: 0 }
        ],
        ex: 'Tiap ujian punya 10 pilihan, jadi 10^40 jadwal. Waktu = 10^40 / 10^9 = 10^31 detik ≈ 10^31 / (3,15 × 10^7) ≈ 3,2 × 10^23 tahun. Enumerasi tidak lambat lagi, tetapi mustahil.' },
      { q: 'Panitia mempertimbangkan dua perubahan: menambah 2 slot (jadi 12 slot) atau menambah 5 ujian (jadi 45 ujian). Berapa kali ruang pencarian membesar untuk masing-masing? Perubahan mana yang lebih memperbesar ruang pencarian?',
        fields: [
          { label: 'Slot jadi 12: membesar (kali)', a: 1469.77, tol: 1 },
          { label: 'Ujian jadi 45: membesar (kali)', a: 100000, tol: 0 },
          { label: 'Lebih memperbesar', a: ['menambah ujian', 'tambah ujian', 'ujian', 'menambah 5 ujian'] }
        ],
        ex: '12^40 / 10^40 = 1,2^40 ≈ 1.469,77 kali. 10^45 / 10^40 = 10^5 = 100.000 kali. Jumlah ujian adalah pangkat, jadi menambah ujian jauh lebih berat daripada menambah slot.' },
      { q: 'Jelaskan mengapa masalah ini diselesaikan dengan metaheuristik (misalnya GA), bukan dengan blind search seperti BFS atau informed search seperti A*.',
        points: [
          'Ruang pencarian 10^40 terlalu besar untuk dienumerasi atau ditelusuri BFS/A*',
          'Yang dicari adalah susunan (arrangement) terbaik, bukan jalur dari start ke goal',
          'Metaheuristik mencari solusi yang cukup baik dalam waktu yang tersedia, tanpa jaminan optimal',
          'Bisa dihentikan kapan saja dan tetap punya solusi (anytime)'
        ],
        model: 'BFS dan A* menelusuri jalur langkah demi langkah dan menjamin solusi (A* optimal jika heuristiknya admissible), tetapi pada 10^40 kemungkinan biayanya tidak terjangkau. Penjadwalan juga bukan masalah jalur: yang dinilai hanya susunan akhirnya. Metaheuristik seperti GA tidak menjamin optimum, tetapi memberi jadwal yang cukup baik sebelum batas waktu, dan selalu punya solusi terbaik sementara jika dihentikan.' },
      { q: 'Golongkan setiap algoritma: trajectory-based (satu solusi bergerak) atau population-based (banyak solusi sekaligus).',
        fields: [
          { label: 'Hill Climbing', a: ['trajectory', 'trajectory-based', 'trajektori'] },
          { label: 'Simulated Annealing', a: ['trajectory', 'trajectory-based', 'trajektori'] },
          { label: 'Tabu Search', a: ['trajectory', 'trajectory-based', 'trajektori'] },
          { label: 'Genetic Algorithm', a: ['population', 'population-based', 'populasi'] }
        ],
        ex: 'Hill Climbing, Simulated Annealing, dan Tabu Search menggerakkan satu solusi; bedanya hanya cara lolos dari local optimum (tidak ada, peluang, memori). GA menjalankan satu populasi yang saling bertukar informasi lewat crossover.' },
      { q: 'Sebutkan kelebihan dan kelemahan GA dibanding Hill Climbing untuk kasus ini.',
        points: [
          'GA: banyak solusi menjelajah beberapa daerah sekaligus, lebih tahan terhadap local optimum',
          'GA: solusi bertukar informasi lewat crossover (building block digabung)',
          'GA: lebih mahal (banyak evaluasi per generasi) dan banyak parameter yang harus diatur',
          'Hill Climbing: cepat, sederhana, hemat memori, tetapi mudah terjebak di local optimum'
        ] }
    ],
    ex: 'Soal buatan sendiri mengikuti slide minggu 1-3; kunci dihitung dengan kode.' },
  { type: 'steps',
    q: 'PT Kirim Kilat memakai GA untuk menentukan urutan kunjungan 8 titik antar (A sampai H) dalam satu putaran yang kembali ke titik awal. Satu kromosom adalah satu urutan kunjungan, misalnya B E A H C G D F. GA memakai populasi 30 rute dan berjalan 50 generasi.',
    steps: [
      { q: 'Isi besaran berikut.',
        fields: [
          { label: 'Panjang kromosom (jumlah gen)', a: 8, tol: 0 },
          { label: 'Ukuran populasi', a: 30, tol: 0 },
          { label: 'Banyak permutasi (n!)', a: 40320, tol: 0 },
          { label: 'Kromosom berbeda untuk satu rute yang sama (2n)', a: 16, tol: 0 },
          { label: 'Rute unik (n! / 2n)', a: 2520, tol: 0 }
        ],
        ex: '8! = 40.320 permutasi. Satu rute melingkar bisa dimulai dari 8 titik dan ditempuh 2 arah, jadi 2 × 8 = 16 kromosom menggambarkan rute yang sama. 40.320 / 16 = 2.520 rute unik.' },
      { q: 'Jelaskan arti gen, alel, kromosom, individu, populasi, dan generasi pada kasus ini.',
        points: [
          'Gen: satu posisi dalam urutan (titik ke-i yang dikunjungi)',
          'Alel: nilai gen, yaitu nama titik antar (A-H)',
          'Kromosom: satu urutan lengkap 8 titik = satu rute',
          'Individu: satu rute beserta nilai fitness-nya',
          'Populasi: 30 rute yang hidup di satu generasi',
          'Generasi: satu siklus evaluasi, seleksi, crossover, mutasi, dan pembentukan populasi baru'
        ] },
      { q: 'Berapa kali fungsi fitness dihitung selama 50 generasi (setiap generasi mengevaluasi seluruh populasi)?',
        fields: [{ label: 'Jumlah evaluasi', a: 1500, tol: 0 }],
        ex: 'Evaluasi = ukuran populasi × generasi = 30 × 50 = 1.500. Di slide, 4 individu × 20 generasi = 80 evaluasi. Angka ini yang dibandingkan saat menyebut "budget evaluasi".' },
      { q: 'GA meminjam tiga mekanisme seleksi alam. Sebutkan ketiganya beserta padanannya di algoritma.',
        points: [
          'Variation: individu berbeda-beda ↔ populasi berisi kromosom yang beragam',
          'Inheritance: sifat induk diturunkan ↔ crossover menggabungkan bagian dua induk',
          'Differential selection: yang lebih fit punya lebih banyak keturunan ↔ seleksi berdasarkan nilai fitness'
        ] }
    ],
    ex: 'Soal buatan sendiri mengikuti slide minggu 1-3; kunci dihitung dengan kode.' },
  { type: 'steps',
    q: 'Tim asisten menjalankan GA untuk jadwal praktikum dengan kromosom 40 gen dan populasi 60 individu. Mereka belum yakin dengan laju mutasi (pm) yang dipakai.',
    steps: [
      { q: 'Hitung jumlah gen yang berubah karena mutasi untuk setiap pilihan pm.',
        fields: [
          { label: 'pm = 1/n: gen berubah per kromosom', a: 1, tol: 0 },
          { label: 'pm = 1/n: gen berubah per generasi (populasi)', a: 60, tol: 0 },
          { label: 'pm = 0,5: gen berubah per kromosom', a: 20, tol: 0 },
          { label: 'pm = 0,001: rata-rata generasi sampai satu kromosom tertentu bermutasi', a: 25, tol: 0 }
        ],
        ex: 'Rata-rata gen berubah = n × pm. pm = 1/40 memberi 1 gen per kromosom, 60 gen per populasi. pm = 0,5 memberi 20 gen per kromosom: setengah kromosom diacak, jadi GA berubah menjadi random search. pm = 0,001 memberi 0,04 per kromosom per generasi, jadi rata-rata menunggu 1/0,04 = 25 generasi.' },
      { q: 'Dari tiap gejala, tentukan parameter yang diubah dan arahnya (naik/turun).',
        table: { head: ['Gejala', 'Yang terlihat'],
          rows: [
            ['A', 'Fitness terbaik berhenti membaik di generasi 12, dan semua kromosom di populasi sudah identik.'],
            ['B', 'Setelah 200 generasi, fitness rata-rata populasi naik turun tanpa pola dan tidak pernah stabil.'],
            ['C', 'Fitness terbaik kadang turun dari satu generasi ke generasi berikutnya.']
          ] },
        fields: [
          { label: 'A: parameter', a: ['pm', 'mutasi', 'mutation rate', 'laju mutasi'] },
          { label: 'A: arah', a: ['naik', 'naikkan', 'dinaikkan', 'lebih besar'] },
          { label: 'B: parameter', a: ['pm', 'mutasi', 'mutation rate', 'laju mutasi'] },
          { label: 'B: arah', a: ['turun', 'turunkan', 'diturunkan', 'lebih kecil'] },
          { label: 'C: yang ditambahkan', a: ['elitisme', 'elitism', 'elit', 'k'] }
        ],
        ex: 'A: diversitas habis (stagnasi) karena eksplorasi terlalu lemah, naikkan pm (atau kurangi tekanan seleksi). B: mutasi terlalu tinggi sehingga populasi rusak terus setiap generasi, turunkan pm. C: tanpa elitisme solusi terbaik bisa hilang; dengan elitisme k ≥ 1 kurva fitness terbaik tidak pernah turun.' },
      { q: 'Jelaskan exploration dan exploitation pada GA, dan operator atau parameter apa yang mendorong masing-masing.',
        points: [
          'Exploration: mencari di daerah yang belum dikunjungi; mencegah terjebak, tetapi konvergen lambat',
          'Exploitation: memperdalam daerah yang sudah baik; konvergen cepat, tetapi berisiko local optimum',
          'Mutasi, populasi besar, dan tekanan seleksi rendah mendorong exploration',
          'Crossover (menggabung building block), seleksi kuat, dan elitisme mendorong exploitation',
          'Keduanya berbagi budget komputasi yang sama; tidak ada rasio yang selalu benar'
        ] }
    ],
    ex: 'Soal buatan sendiri mengikuti slide minggu 1-3; kunci dihitung dengan kode.' },
  { type: 'steps',
    q: 'Sebuah GA jadwal memakai populasi 10 individu. Panitia membandingkan empat strategi replacement (penggantian populasi) dan memutuskan memakai elitisme.',
    steps: [
      { q: 'Berapa individu yang diganti offspring setiap generasi pada tiap strategi?',
        fields: [
          { label: 'Generational', a: 10, tol: 0 },
          { label: 'Elitist generational, k = 2', a: 8, tol: 0 },
          { label: 'Steady-state (ganti 2 per generasi)', a: 2, tol: 0 },
          { label: 'Replace-worst (offspring masuk jika mengalahkan yang terburuk)', a: 1, tol: 0 }
        ],
        ex: 'Generational mengganti semuanya (100%). Elitist k = 2 menyimpan 2 terbaik, 8 diganti (80%). Steady-state hanya 1-2 individu (di sini 2, 20%). Replace-worst mengganti 1 individu terburuk (10%) dan tekanan seleksinya paling tinggi.' },
      { q: 'Apa yang dijamin elitisme, dan apa risikonya jika k terlalu besar?',
        points: [
          'k individu terbaik disalin tanpa diubah ke generasi berikutnya',
          'Solusi terbaik sejauh ini tidak pernah hilang, jadi kurva fitness terbaik tidak pernah turun',
          'k terlalu besar menaikkan tekanan seleksi dan menghabiskan diversitas (konvergen prematur)',
          'Umumnya k = 1 atau 2'
        ] },
      { q: 'Hanya satu pernyataan benar. Tulis nomornya.\n1. Crossover bisa menghasilkan nilai gen yang tidak dimiliki kedua induk.\n2. Mutasi yang menurunkan fitness berarti pm salah setel.\n3. Dengan elitisme, kurva fitness terbaik tidak pernah turun.\n4. Jika kedua induk identik, crossover gagal.\n5. Menaikkan konstanta C pada fitness = C − konflik selalu aman.',
        fields: [{ label: 'Pernyataan benar', a: 3, tol: 0 }],
        ex: '1 salah: crossover hanya menyusun ulang gen yang sudah ada, hanya mutasi yang membuat nilai baru. 2 salah: mutasi merugikan tetap bisa terjadi pada pm yang benar. 4 salah: crossover tetap jalan, anaknya saja sama. 5 salah: C besar menekan tekanan seleksi sehingga seleksi hampir acak.' }
    ],
    ex: 'Pernyataan diambil dari Self-Check slide minggu 3; kunci mengikuti isi slide.' },
  { type: 'steps',
    q: 'Tiga tim membawa masalah berbeda ke laboratorium AI. Masalah 1: menyetel tiga parameter kontroler; satu evaluasi berupa simulasi 40 detik, waktu tersedia 2 jam, dan respons dipercaya mulus (satu puncak lebar). Masalah 2: merancang kode koreksi error 60 bit, dan pola pendek yang baik diketahui bisa digabung menjadi pola panjang yang baik. Masalah 3: menjadwalkan 30 ujian ke 8 slot.',
    steps: [
      { q: 'Berapa evaluasi yang muat dalam budget Masalah 1? Metode apa yang paling cocok untuk Masalah 1 dan Masalah 2 menurut studi kasus slide?',
        fields: [
          { label: 'Evaluasi dalam 2 jam', a: 180, tol: 0 },
          { label: 'Masalah 1', a: ['hill climbing', 'hc'] },
          { label: 'Masalah 2', a: ['genetic algorithm', 'ga', 'algoritma genetika'] }
        ],
        ex: '2 × 3.600 / 40 = 180 evaluasi, terlalu sedikit untuk populasi. Landscape mulus dengan satu puncak lebar: Hill Climbing mencapai 100% optimum di studi kasus. Masalah 2 punya building block yang bisa digabung: GA (crossover) unggul di masalah deceptive building block (86,6% vs 81,3% Hill Climbing).' },
      { q: 'Pilih metode untuk Masalah 3, beri alasan dari karakteristik masalah, dan sebutkan satu kelemahannya.',
        points: [
          'Menyebut satu metode (misalnya Simulated Annealing, Tabu Search, atau GA)',
          'Alasan dari sifat masalah: kombinatorial, ruang 8^30, banyak local optimum, evaluasi murah',
          'Menyebut kelemahan atau trade-off (parameter harus di-tuning, tanpa jaminan optimal, biaya evaluasi)'
        ],
        model: 'Contoh: Simulated Annealing. Ruang 8^30 terlalu besar dan penuh local optimum; SA sesekali menerima langkah memburuk sehingga bisa keluar dari jebakan, dan pada studi kasus jadwal SA memberi 582 konflik, terbaik dibanding restart Hill Climbing (588) dan metode populasi (588). Kelemahannya, jadwal suhu harus di-tuning. Jawaban GA atau Tabu juga diterima jika alasannya dari sifat masalah.' },
      { q: 'Jelaskan No Free Lunch Theorem dan apa yang TIDAK dikatakan teorema ini.',
        points: [
          'Dirata-rata atas semua masalah optimasi, semua algoritma pencarian sama baiknya (Wolpert & Macready, 1997)',
          'Tidak berarti algoritma bebas dipilih: pada masalah tertentu dengan struktur yang diketahui, selisihnya bisa sangat besar',
          'Pilihan algoritma harus mengikuti karakteristik masalah (bentuk ruang, tipe variabel, constraint, biaya evaluasi)',
          'Klaim "algoritma X terbaik" tanpa menyebut kelas masalah salah; perlu perbandingan empiris'
        ] }
    ],
    ex: 'Masalah diambil dari latihan slide minggu 1. Kunci Masalah 1 dan 2 mengikuti studi kasus slide; Masalah 3 bersifat terbuka.' },
  { type: 'steps',
    q: 'Sebuah GA mengoptimalkan beberapa masalah. Seleksi memakai roulette wheel, jadi fitness harus positif dan makin besar makin baik. Fungsi objektif tidak selalu langsung bisa dipakai sebagai fitness.',
    steps: [
      { q: 'Masalah minimasi dengan nilai objektif f = 0,2; 1,4; 2,7; 0,9. Ubah menjadi fitness = 1 / (1 + f) (4 desimal).',
        fields: [
          { label: 'Fitness untuk f = 0,2', a: 0.8333, tol: 0.0006 },
          { label: 'Fitness untuk f = 1,4', a: 0.4167, tol: 0.0006 },
          { label: 'Fitness untuk f = 2,7', a: 0.2703, tol: 0.0006 },
          { label: 'Fitness untuk f = 0,9', a: 0.5263, tol: 0.0006 }
        ],
        ex: '1/(1 + 0,2) = 0,8333; 1/(1 + 1,4) = 0,4167; 1/(1 + 2,7) = 0,2703; 1/(1 + 0,9) = 0,5263. Objektif terkecil (0,2) kini fitness terbesar.' },
      { q: 'Masalah lain punya nilai objektif (maksimasi) −2,1; −0,5; 0,3; 1,7. Geser dengan konstanta 2,2, lalu hitung probabilitas roulette tiap individu (4 desimal).',
        fields: [
          { label: 'Fitness 1', a: 0.1, tol: 0.01 },
          { label: 'Fitness 2', a: 1.7, tol: 0.01 },
          { label: 'Fitness 3', a: 2.5, tol: 0.01 },
          { label: 'Fitness 4', a: 3.9, tol: 0.01 },
          { label: 'P 1', a: 0.0122, tol: 0.0006 },
          { label: 'P 2', a: 0.2073, tol: 0.0006 },
          { label: 'P 3', a: 0.3049, tol: 0.0006 },
          { label: 'P 4', a: 0.4756, tol: 0.0006 }
        ],
        ex: 'Fitness = f + 2,2 = 0,1; 1,7; 2,5; 3,9. Total 8,2. P = 0,0122; 0,2073; 0,3049; 0,4756.' },
      { q: 'Empat desain fitness berikut bermasalah. Jelaskan cacat masing-masing dan usulkan perbaikan.\nA. Meminimalkan keterlambatan: fitness = −(total delay menit).\nB. Memaksimalkan akurasi: fitness = akurasi, yang hanya bervariasi 0,91-0,93 di populasi.\nC. Penjadwalan: fitness = 1 jika jadwal tanpa bentrok, 0 jika ada.\nD. Routing: fitness = 1 / panjang rute, dihitung lewat simulasi lalu lintas penuh.',
        points: [
          'A: nilai negatif tidak bisa dipakai roulette; geser dengan konstanta atau pakai 1/(1 + delay)',
          'B: rentang terlalu sempit sehingga seleksi hampir acak; scaling, rank-based, atau tambah presisi',
          'C: terlalu banyak seri (semua 0), tidak ada arah perbaikan; hitung jumlah bentrok',
          'D: evaluasi terlalu mahal dan tidak stabil; sederhanakan atau aproksimasi, cache, paralel'
        ] }
    ],
    ex: 'Transformasi dan desain A-D mengikuti slide minggu 2 (Objective ≠ Fitness, Spot the Flaw); angka dihitung dengan kode.' }
]);

BANK.isian('ka', 'proses', 'Genetic Algorithm: Proses Satu Generasi', [
  { type: 'steps',
    q: 'Sebuah GA memaksimalkan f(x) = x² untuk x bilangan bulat 0 sampai 31. Kromosom 5 bit dibaca langsung sebagai bilangan biner (x = nilai desimalnya). Populasi awal: K1 = 01101, K2 = 11000, K3 = 01000, K4 = 10011.',
    steps: [
      { q: 'Ubah tiap kromosom ke desimal, lalu hitung fitness f(x) = x² dan total fitness.',
        fields: [
          { label: 'f K1', a: 169, tol: 0.5 },
          { label: 'f K2', a: 576, tol: 0.5 },
          { label: 'f K3', a: 64, tol: 0.5 },
          { label: 'f K4', a: 361, tol: 0.5 },
          { label: 'Total fitness', a: 1170, tol: 1 }
        ],
        ex: 'K1 = 13 → 169, K2 = 24 → 576, K3 = 8 → 64, K4 = 19 → 361. Total 1.170.' },
      { q: 'Hitung probabilitas seleksi P = f / total dan probabilitas kumulatif tiap kromosom (4 desimal).',
        fields: [
          { label: 'P K1', a: 0.1444, tol: 0.0006 },
          { label: 'P K2', a: 0.4923, tol: 0.0006 },
          { label: 'P K3', a: 0.0547, tol: 0.0006 },
          { label: 'P K4', a: 0.3085, tol: 0.0006 },
          { label: 'Kumulatif K1', a: 0.1444, tol: 0.0012 },
          { label: 'Kumulatif K2', a: 0.6368, tol: 0.0012 },
          { label: 'Kumulatif K3', a: 0.6915, tol: 0.0012 },
          { label: 'Kumulatif K4', a: 1, tol: 0.0012 }
        ],
        ex: 'K1: 0,1444 (kumulatif 0,1444); K2: 0,4923 (kumulatif 0,6368); K3: 0,0547 (kumulatif 0,6915); K4: 0,3085 (kumulatif 1,0000). Kumulatif terakhir harus tepat 1,0000.' },
      { q: 'Putar roulette wheel dengan r = 0,10; 0,30; 0,50; 0,90. Kromosom terpilih adalah yang kumulatifnya pertama kali ≥ r. Dua r pertama membentuk pasangan 1, dua berikutnya pasangan 2.',
        fields: [
          { label: 'Induk dari r = 0,10', a: ['K1', '01101'] },
          { label: 'Induk dari r = 0,30', a: ['K2', '11000'] },
          { label: 'Induk dari r = 0,50', a: ['K2', '11000'] },
          { label: 'Induk dari r = 0,90', a: ['K4', '10011'] }
        ],
        ex: 'r = 0,10 jatuh di K1, r = 0,30 jatuh di K2, r = 0,50 jatuh di K2, r = 0,90 jatuh di K4. Pasangan 1 = (K1, K2), pasangan 2 = (K2, K4).' },
      { q: 'Lakukan single-point crossover: pasangan 1 dipotong setelah gen 4, pasangan 2 setelah gen 2. Tulis keempat offspring (O1, O2 dari pasangan 1; O3, O4 dari pasangan 2).',
        fields: [
          { label: 'O1', a: '01100' },
          { label: 'O2', a: '11001' },
          { label: 'O3', a: '11011' },
          { label: 'O4', a: '10000' }
        ],
        ex: 'Pasangan 1: 0110|1 × 1100|0 → 01100 dan 11001. Pasangan 2: 11|000 × 10|011 → 11011 dan 10000.' },
      { q: 'Mutasi bit flip: gen 3 pada O4 dibalik. Tulis kromosom hasil mutasi, lalu hitung fitness keempat offspring setelah mutasi.',
        fields: [
          { label: 'O4 setelah mutasi', a: '10100' },
          { label: 'f O1', a: 144, tol: 0.5 },
          { label: 'f O2', a: 625, tol: 0.5 },
          { label: 'f O3', a: 729, tol: 0.5 },
          { label: 'f O4', a: 400, tol: 0.5 }
        ],
        ex: 'O4: 10000 → 10100. Fitness: O1 = 144, O2 = 625, O3 = 729, O4 = 400.' },
      { q: 'Terapkan elitisme k = 1: kromosom terbaik populasi lama menggantikan offspring terburuk. Isi offspring yang diganti, rata-rata fitness populasi lama dan baru, serta fitness terbaik populasi baru.',
        fields: [
          { label: 'Offspring yang diganti', a: ['O1', '01100'] },
          { label: 'Rata-rata fitness lama', a: 292.5, tol: 0.5 },
          { label: 'Rata-rata fitness baru', a: 582.5, tol: 0.5 },
          { label: 'Fitness terbaik baru', a: 729, tol: 0.5 }
        ],
        ex: 'Elit = K2 (11000, f = 576). Offspring terburuk O1 (f = 144) diganti. Populasi baru: 11000, 11001, 11011, 10100. Rata-rata 292,50 → 582,50.' },
      { q: 'Bandingkan populasi lama dan baru. Apakah GA membaik, dan bagian mana yang membawa perbaikan?',
        points: [
          'Rata-rata fitness naik dari 292,5 ke 582,5 dan fitness terbaik naik dari 576 ke 729',
          'Crossover menggabungkan bagian depan 11 dari K2 dan bagian belakang 011 dari K4 menjadi 11011 (x = 27)',
          'Elitisme mencegah 11000 (576) hilang saat offspring terburuk 01100 dibuang',
          'Seleksi memberi K2 dua kesempatan menjadi induk karena fitness-nya terbesar'
        ] }
    ],
    ex: 'Contoh klasik Goldberg (f = x²) dengan r dan titik potong yang ditentukan sendiri; kunci dihitung dengan kode.' },
  { type: 'steps',
    q: 'Pabrik minuman mengatur kecepatan konveyor x (meter per menit) pada rentang [0, 10]. Keuntungan per jam f(x) = 2 + 3x − 0,25x² (juta rupiah) ingin dimaksimalkan dengan GA. Kromosom 5 bit didekode dengan x = 0 + (10 − 0)/(2^5 − 1) × d. Populasi awal: K1 = 00110, K2 = 11001, K3 = 01100, K4 = 10010.',
    steps: [
      { q: 'Dekode setiap kromosom: ubah ke desimal d, lalu hitung x (3 desimal).',
        fields: [
          { label: 'x K1 (00110)', a: 1.935, tol: 0.002 },
          { label: 'x K2 (11001)', a: 8.065, tol: 0.002 },
          { label: 'x K3 (01100)', a: 3.871, tol: 0.002 },
          { label: 'x K4 (10010)', a: 5.806, tol: 0.002 }
        ],
        ex: 'K1: d = 6, x = 10/31 × 6 = 1,935; K2: d = 25, x = 10/31 × 25 = 8,065; K3: d = 12, x = 10/31 × 12 = 3,871; K4: d = 18, x = 10/31 × 18 = 5,806. Langkah terkecil = 10/31 ≈ 0,323.' },
      { q: 'Hitung f(x) = 2 + 3x − 0,25x² untuk tiap kromosom (4 desimal) dan total fitness. Pakai x yang belum dibulatkan.',
        fields: [
          { label: 'f K1', a: 6.8699, tol: 0.002 },
          { label: 'f K2', a: 9.9344, tol: 0.002 },
          { label: 'f K3', a: 9.8668, tol: 0.002 },
          { label: 'f K4', a: 10.9906, tol: 0.002 },
          { label: 'Total fitness', a: 37.6618, tol: 0.004 }
        ],
        ex: 'K1 = 6,8699, K2 = 9,9344, K3 = 9,8668, K4 = 10,9906. Total = 37,6618.' },
      { q: 'Hitung probabilitas seleksi P = f / total dan probabilitas kumulatif tiap kromosom (4 desimal).',
        fields: [
          { label: 'P K1', a: 0.1824, tol: 0.0006 },
          { label: 'P K2', a: 0.2638, tol: 0.0006 },
          { label: 'P K3', a: 0.262, tol: 0.0006 },
          { label: 'P K4', a: 0.2918, tol: 0.0006 },
          { label: 'Kumulatif K1', a: 0.1824, tol: 0.0012 },
          { label: 'Kumulatif K2', a: 0.4462, tol: 0.0012 },
          { label: 'Kumulatif K3', a: 0.7082, tol: 0.0012 },
          { label: 'Kumulatif K4', a: 1, tol: 0.0012 }
        ],
        ex: 'K1: 0,1824 (kumulatif 0,1824); K2: 0,2638 (kumulatif 0,4462); K3: 0,2620 (kumulatif 0,7082); K4: 0,2918 (kumulatif 1,0000). Kumulatif terakhir harus tepat 1,0000.' },
      { q: 'Putar roulette wheel dengan r = 0,72; 0,31; 0,05; 0,95. Kromosom terpilih adalah yang kumulatifnya pertama kali ≥ r. Dua r pertama membentuk pasangan 1, dua berikutnya pasangan 2.',
        fields: [
          { label: 'Induk dari r = 0,72', a: ['K4', '10010'] },
          { label: 'Induk dari r = 0,31', a: ['K2', '11001'] },
          { label: 'Induk dari r = 0,05', a: ['K1', '00110'] },
          { label: 'Induk dari r = 0,95', a: ['K4', '10010'] }
        ],
        ex: 'r = 0,72 jatuh di K4, r = 0,31 jatuh di K2, r = 0,05 jatuh di K1, r = 0,95 jatuh di K4. Pasangan 1 = (K4, K2), pasangan 2 = (K1, K4).' },
      { q: 'Lakukan single-point crossover: pasangan 1 dipotong setelah gen 3, pasangan 2 setelah gen 2. Tulis keempat offspring (O1, O2 dari pasangan 1; O3, O4 dari pasangan 2).',
        fields: [
          { label: 'O1', a: '10001' },
          { label: 'O2', a: '11010' },
          { label: 'O3', a: '00010' },
          { label: 'O4', a: '10110' }
        ],
        ex: 'Pasangan 1: 100|10 × 110|01 → 10001 dan 11010. Pasangan 2: 00|110 × 10|010 → 00010 dan 10110.' },
      { q: 'Mutasi bit flip: gen 2 pada O1 dan gen 4 pada O4 dibalik. Tulis kromosom hasil mutasi, lalu hitung fitness keempat offspring setelah mutasi.',
        fields: [
          { label: 'O1 setelah mutasi', a: '11001' },
          { label: 'O4 setelah mutasi', a: '10100' },
          { label: 'f O1', a: 9.9344, tol: 0.002 },
          { label: 'f O2', a: 9.5754, tol: 0.002 },
          { label: 'f O3', a: 3.8314, tol: 0.002 },
          { label: 'f O4', a: 10.949, tol: 0.002 }
        ],
        ex: 'O1: 10001 → 11001; O4: 10110 → 10100. Fitness: O1 = 9,9344, O2 = 9,5754, O3 = 3,8314, O4 = 10,9490.' },
      { q: 'Terapkan elitisme k = 1: kromosom terbaik populasi lama menggantikan offspring terburuk. Isi offspring yang diganti, rata-rata fitness populasi lama dan baru, serta fitness terbaik populasi baru.',
        fields: [
          { label: 'Offspring yang diganti', a: ['O3', '00010'] },
          { label: 'Rata-rata fitness lama', a: 9.4155, tol: 0.002 },
          { label: 'Rata-rata fitness baru', a: 10.3624, tol: 0.002 },
          { label: 'Fitness terbaik baru', a: 10.9906, tol: 0.002 }
        ],
        ex: 'Elit = K4 (10010, f = 10,9906). Offspring terburuk O3 (f = 3,8314) diganti. Populasi baru: 11001, 11010, 10010, 10100. Rata-rata 9,4155 → 10,3624.' },
      { q: 'Optimum fungsi ini ada di x = 6. Kromosom 5 bit mana yang paling dekat dengan x = 6, dan mengapa kromosom yang sedikit berbeda bitnya bisa sangat jauh nilainya (Hamming cliff)?',
        fields: [{ label: 'Kromosom terdekat ke x = 6', a: '10011' }],
        ex: 'd = 6 × 31/10 = 18,6, jadi d = 19 = 10011 (x = 6,129). Nilai bertetangga bisa beda banyak bit: 15 = 01111 dan 16 = 10000 beda 5 bit, sehingga satu mutasi tidak bisa memindahkan solusi ke tetangganya. Gray code mengatasinya.' }
    ],
    ex: 'Populasi, r, titik potong, dan mutasi sama dengan contoh slide minggu 3; fungsi f(x) dibuat sendiri, jadi angkanya berbeda dari slide.' },
  { type: 'steps',
    q: 'GA dipakai untuk MEMINIMALKAN g(x) = x² − 2x + 2 pada x ∈ [−5, 5]. Kromosom 6 bit didekode dengan x = −5 + 10/(2^6 − 1) × d. Karena roulette butuh fitness besar untuk solusi baik, dipakai fitness = 1 / (1 + g(x)). Populasi awal: K1 = 101010, K2 = 000111, K3 = 111111, K4 = 011100.',
    steps: [
      { q: 'Dekode setiap kromosom menjadi x (3 desimal).',
        fields: [
          { label: 'x K1 (101010)', a: 1.667, tol: 0.002 },
          { label: 'x K2 (000111)', a: -3.889, tol: 0.002 },
          { label: 'x K3 (111111)', a: 5, tol: 0.002 },
          { label: 'x K4 (011100)', a: -0.556, tol: 0.002 }
        ],
        ex: 'K1: d = 42, x = 1,667; K2: d = 7, x = -3,889; K3: d = 63, x = 5,000; K4: d = 28, x = -0,556.' },
      { q: 'Hitung g(x), lalu fitness = 1 / (1 + g(x)) untuk tiap kromosom (4 desimal), dan total fitness.',
        fields: [
          { label: 'f K1', a: 0.4091, tol: 0.0006 },
          { label: 'f K2', a: 0.0386, tol: 0.0006 },
          { label: 'f K3', a: 0.0556, tol: 0.0006 },
          { label: 'f K4', a: 0.2263, tol: 0.0006 },
          { label: 'Total fitness', a: 0.7295, tol: 0.0012 }
        ],
        ex: 'K1: g = 1,4444, fitness = 0,4091; K2: g = 24,9012, fitness = 0,0386; K3: g = 17,0000, fitness = 0,0556; K4: g = 3,4198, fitness = 0,2263. Total = 0,7295.' },
      { q: 'Hitung probabilitas seleksi P = f / total dan probabilitas kumulatif tiap kromosom (4 desimal).',
        fields: [
          { label: 'P K1', a: 0.5608, tol: 0.0006 },
          { label: 'P K2', a: 0.0529, tol: 0.0006 },
          { label: 'P K3', a: 0.0762, tol: 0.0006 },
          { label: 'P K4', a: 0.3101, tol: 0.0006 },
          { label: 'Kumulatif K1', a: 0.5608, tol: 0.0012 },
          { label: 'Kumulatif K2', a: 0.6137, tol: 0.0012 },
          { label: 'Kumulatif K3', a: 0.6899, tol: 0.0012 },
          { label: 'Kumulatif K4', a: 1, tol: 0.0012 }
        ],
        ex: 'K1: 0,5608 (kumulatif 0,5608); K2: 0,0529 (kumulatif 0,6137); K3: 0,0762 (kumulatif 0,6899); K4: 0,3101 (kumulatif 1,0000). Kumulatif terakhir harus tepat 1,0000.' },
      { q: 'Putar roulette wheel dengan r = 0,15; 0,62; 0,48; 0,91. Kromosom terpilih adalah yang kumulatifnya pertama kali ≥ r. Dua r pertama membentuk pasangan 1, dua berikutnya pasangan 2.',
        fields: [
          { label: 'Induk dari r = 0,15', a: ['K1', '101010'] },
          { label: 'Induk dari r = 0,62', a: ['K3', '111111'] },
          { label: 'Induk dari r = 0,48', a: ['K1', '101010'] },
          { label: 'Induk dari r = 0,91', a: ['K4', '011100'] }
        ],
        ex: 'r = 0,15 jatuh di K1, r = 0,62 jatuh di K3, r = 0,48 jatuh di K1, r = 0,91 jatuh di K4. Pasangan 1 = (K1, K3), pasangan 2 = (K1, K4).' },
      { q: 'Lakukan single-point crossover: pasangan 1 dipotong setelah gen 3, pasangan 2 setelah gen 4. Tulis keempat offspring (O1, O2 dari pasangan 1; O3, O4 dari pasangan 2).',
        fields: [
          { label: 'O1', a: '101111' },
          { label: 'O2', a: '111010' },
          { label: 'O3', a: '101000' },
          { label: 'O4', a: '011110' }
        ],
        ex: 'Pasangan 1: 101|010 × 111|111 → 101111 dan 111010. Pasangan 2: 1010|10 × 0111|00 → 101000 dan 011110.' },
      { q: 'Mutasi bit flip: gen 6 pada O3 dibalik. Tulis kromosom hasil mutasi, lalu hitung fitness keempat offspring setelah mutasi.',
        fields: [
          { label: 'O3 setelah mutasi', a: '101001' },
          { label: 'f O1', a: 0.242, tol: 0.0006 },
          { label: 'f O2', a: 0.0814, tol: 0.0006 },
          { label: 'f O3', a: 0.4429, tol: 0.0006 },
          { label: 'f O4', a: 0.2831, tol: 0.0006 }
        ],
        ex: 'O3: 101000 → 101001. Fitness: O1 = 0,2420, O2 = 0,0814, O3 = 0,4429, O4 = 0,2831.' },
      { q: 'Terapkan elitisme k = 1: kromosom terbaik populasi lama menggantikan offspring terburuk. Isi offspring yang diganti, rata-rata fitness populasi lama dan baru, serta fitness terbaik populasi baru.',
        fields: [
          { label: 'Offspring yang diganti', a: ['O2', '111010'] },
          { label: 'Rata-rata fitness lama', a: 0.1824, tol: 0.0006 },
          { label: 'Rata-rata fitness baru', a: 0.3442, tol: 0.0006 },
          { label: 'Fitness terbaik baru', a: 0.4429, tol: 0.0006 }
        ],
        ex: 'Elit = K1 (101010, f = 0,4091). Offspring terburuk O2 (f = 0,0814) diganti. Populasi baru: 101111, 101010, 101001, 011110. Rata-rata 0,1824 → 0,3442.' },
      { q: 'Mengapa fitness tidak boleh langsung g(x) atau −g(x) pada soal ini?',
        points: [
          'g(x) langsung akan memberi peluang terbesar ke solusi terburuk (masalahnya minimasi)',
          '−g(x) bernilai negatif, roulette tidak bisa memakai bagian negatif',
          '1/(1 + g) membalik urutan dan selalu positif karena g ≥ 1 di sini'
        ] }
    ],
    ex: 'Domain dan kromosom K1-K3 diambil dari latihan dekode slide minggu 2; fungsi dan langkah lain dibuat sendiri. Kunci dihitung dengan kode.' },
  { type: 'steps',
    q: 'Populasi enam individu punya fitness A = 900, B = 12, C = 10, D = 8, E = 6, F = 5. Tim membandingkan tiga cara seleksi induk.',
    steps: [
      { q: 'Roulette wheel biasa: hitung probabilitas terpilih A dan B (4 desimal).',
        fields: [{ label: 'P(A)', a: 0.9564, tol: 0.0006 }, { label: 'P(B)', a: 0.0128, tol: 0.0006 }],
        ex: 'Total 941. P(A) = 900/941 = 0,9564; P(B) = 12/941 = 0,0128. A menguasai 96% roda (superindividu): populasi berikutnya hampir seragam.' },
      { q: 'Linear scaling f\' = a·f + b dengan syarat rata-rata tetap dan f\'(maks) = 2 × rata-rata. Hitung rata-rata, a, b, lalu P(A) dan P(B) setelah scaling (4 desimal).',
        fields: [
          { label: 'Rata-rata', a: 156.8333, tol: 0.01 },
          { label: 'a', a: 0.211, tol: 0.0006 },
          { label: 'b', a: 123.7362, tol: 0.05 },
          { label: 'P(A) setelah scaling', a: 0.3333, tol: 0.0006 },
          { label: 'P(B) setelah scaling', a: 0.1342, tol: 0.0006 }
        ],
        ex: 'Rata-rata = 941/6 = 156,8333. a = rata-rata/(maks − rata-rata) = 0,2110, b = rata-rata × (1 − a) = 123,7362. f\'(A) = 2 × rata-rata = 313,67, jadi P(A) = 0,3333 (sepertiga roda) dan P(B) = 0,1342. Slide: A turun dari 96% ke 33%, yang lain sekitar 13%.' },
      { q: 'Rank-based linear: urutkan dari terbaik (rank 6) sampai terburuk (rank 1), P = rank / jumlah rank. Hitung P(A) dan P(F).',
        fields: [
          { label: 'Jumlah rank', a: 21, tol: 0 },
          { label: 'P(A)', a: 0.2857, tol: 0.0006 },
          { label: 'P(F)', a: 0.0476, tol: 0.0006 }
        ],
        ex: 'Jumlah rank 1 + 2 + … + 6 = 21. P(A) = 6/21 = 0,2857; P(F) = 1/21 = 0,0476. Selisih fitness 900 vs 12 tidak lagi berpengaruh, hanya urutannya.' },
      { q: 'Binary tournament (k = 2): empat turnamen mengambil pasangan acak (A, D), (C, F), (B, E), (D, C). Siapa pemenang tiap turnamen?',
        fields: [
          { label: 'Turnamen 1', a: 'A' },
          { label: 'Turnamen 2', a: 'C' },
          { label: 'Turnamen 3', a: 'B' },
          { label: 'Turnamen 4', a: 'C' }
        ],
        ex: 'Pemenang = fitness lebih besar: A, C, B, C. Tournament hanya membandingkan, jadi tidak peka skala dan tetap jalan untuk fitness negatif. Tekanan seleksi diatur lewat k.' },
      { q: 'Jelaskan dua kondisi yang membuat roulette wheel gagal, dan bandingkan ketiga metode seleksi.',
        points: [
          'Superindividu: satu fitness jauh di atas yang lain menguasai roda, diversitas runtuh (konvergen prematur)',
          'Fitness terlalu dekat (misalnya 0,901-0,906): semua irisan hampir sama, seleksi menjadi acak',
          'Akar keduanya: roulette peka terhadap skala fitness',
          'Tournament: sederhana, murah, tekanan diatur k, tidak peka skala',
          'Rank-based: memakai urutan, stabil dan tahan outlier, tetapi perlu sorting'
        ] }
    ],
    ex: 'Fitness A-F dari studi kasus slide minggu 2 (Rescuing a Roulette Wheel); pasangan turnamen dibuat sendiri.' },
  { type: 'steps',
    q: 'Dua induk biner 8 bit: P1 = 11001010 dan P2 = 01110101. Sebelum memilih operator, tim mencoba tiga skema crossover pada pasangan yang sama.',
    steps: [
      { q: 'Single-point crossover, potong setelah gen 3.',
        fields: [{ label: 'Offspring 1', a: '11010101' }, { label: 'Offspring 2', a: '01101010' }],
        ex: '110|01010 × 011|10101 → 11010101 dan 01101010. Ekor setelah titik potong ditukar.' },
      { q: 'Two-point crossover, segmen gen 3 sampai 6 ditukar.',
        fields: [{ label: 'Offspring 1', a: '11110110' }, { label: 'Offspring 2', a: '01001001' }],
        ex: '11|0010|10 × 01|1101|01 → 11110110 dan 01001001.' },
      { q: 'Uniform crossover dengan mask 10011010: untuk offspring 1, mask 1 mengambil gen dari P1 dan mask 0 dari P2. Offspring 2 kebalikannya.',
        fields: [{ label: 'Offspring 1', a: '11101111' }, { label: 'Offspring 2', a: '01010000' }],
        ex: 'Gen per posisi mengikuti mask: 11101111 dan 01010000. Tiap posisi dipilih sendiri-sendiri.' },
      { q: 'Di posisi mana gen semua offspring di atas pasti sama, apa pun skema crossover-nya? Tulis nomor posisinya.',
        fields: [{ label: 'Posisi', a: '2', set: true }],
        ex: 'Kedua induk sama di posisi 2, jadi crossover apa pun hanya bisa menurunkan nilai itu. Crossover tidak pernah membuat nilai gen baru; hanya mutasi yang bisa.' },
      { q: 'Bandingkan ketiga skema dari sisi disruption dan kemampuan menjaga gen bertetangga (building block). Kapan uniform sebaiknya dihindari?',
        points: [
          'Single-point: disruption rendah, menjaga blok gen bertetangga dengan kuat',
          'Two-point: sedang, default yang wajar',
          'Uniform: mixing tinggi, tidak menjaga gen bertetangga',
          'Hindari uniform jika gen yang berdekatan membentuk kelompok bermakna (building block)'
        ] }
    ],
    ex: 'Induk dan mask dibuat sendiri mengikuti latihan crossover slide minggu 3; kunci dihitung dengan kode.' },
  { type: 'steps',
    q: 'Kromosom K = 1011001101 (10 gen) akan dimutasi dengan pm = 0,1. Untuk setiap gen dibangkitkan bilangan acak r; gen dibalik jika r < pm.\nr = 0,53; 0,08; 0,71; 0,95; 0,02; 0,44; 0,31; 0,09; 0,66; 0,17.',
    steps: [
      { q: 'Gen mana yang bermutasi, dan bagaimana kromosom setelah mutasi?',
        fields: [
          { label: 'Nomor gen yang dibalik', a: '2 5 8', set: true },
          { label: 'Kromosom setelah mutasi', a: '1111101001' }
        ],
        ex: 'r < 0,1 di gen 2, 5, 8. K = 1011001101 → 1111101001.' },
      { q: 'Berapa rata-rata gen yang bermutasi per kromosom dengan pm = 0,1, dan berapa per generasi jika populasi 20? Berapa pm yang disarankan slide untuk kromosom 10 gen?',
        fields: [
          { label: 'Per kromosom', a: 1, tol: 0 },
          { label: 'Per generasi (populasi 20)', a: 20, tol: 0 },
          { label: 'pm saran (1/n)', a: 0.1, tol: 0.001 }
        ],
        ex: 'n × pm = 10 × 0,1 = 1 gen per kromosom, 20 gen per generasi. pm ≈ 1/n = 0,1, jadi pengaturan ini sudah sesuai saran.' },
      { q: 'Mengapa mutasi diperlukan walaupun sudah ada crossover? Apa akibat pm terlalu kecil dan terlalu besar?',
        points: [
          'Mutasi satu-satunya sumber nilai gen yang benar-benar baru',
          'Mengembalikan nilai gen yang sudah hilang dari populasi karena seleksi',
          'pm terlalu kecil: tidak ada materi baru, pencarian stagnan lebih awal',
          'pm terlalu besar: populasi rusak setiap generasi, menjadi random search'
        ] }
    ],
    ex: 'Soal buatan sendiri mengikuti slide minggu 1-3; kunci dihitung dengan kode.' }
]);

BANK.isian('ka', 'jadwal', 'Genetic Algorithm: Studi Kasus Jadwal (Week 3)', [
  { type: 'steps',
    q: 'Studi kasus minggu 2-3: 8 ujian (A-H) dijadwalkan ke 4 slot. Kromosom integer: gen ke-i = slot untuk ujian ke-i. Fitness = 30 − konflik.',
    table: { head: ['Jadwal', 'Kromosom (A..H)', 'Konflik'],
      rows: [
        ['T1', '1 2 3 4 1 2 3 4', 26],
        ['T2', '2 2 1 3 4 1 4 3', 23],
        ['T3', '3 1 4 2 3 4 1 2', 28],
        ['T4', '1 4 2 2 3 1 3 4', 25]
      ] },
    steps: [
      { q: 'Hitung fitness, probabilitas seleksi, dan kumulatif tiap jadwal (4 desimal).',
        fields: [
          { label: 'Fitness T1', a: 4, tol: 0 },
          { label: 'Fitness T2', a: 7, tol: 0 },
          { label: 'Fitness T3', a: 2, tol: 0 },
          { label: 'Fitness T4', a: 5, tol: 0 },
          { label: 'P T1', a: 0.2222, tol: 0.0006 },
          { label: 'P T2', a: 0.3889, tol: 0.0006 },
          { label: 'P T3', a: 0.1111, tol: 0.0006 },
          { label: 'P T4', a: 0.2778, tol: 0.0006 },
          { label: 'Kumulatif T1', a: 0.2222, tol: 0.0012 },
          { label: 'Kumulatif T2', a: 0.6111, tol: 0.0012 },
          { label: 'Kumulatif T3', a: 0.7222, tol: 0.0012 },
          { label: 'Kumulatif T4', a: 1, tol: 0.0012 }
        ],
        ex: 'Fitness 4, 7, 2, 5 (total 18). P = 0,2222; 0,3889; 0,1111; 0,2778. Kumulatif 0,2222; 0,6111; 0,7222; 1,0000. T2 paling baik tetapi peluangnya hanya 39%: itu disengaja, agar jadwal lain tetap punya kesempatan (diversitas).' },
      { q: 'Roulette wheel dengan r = 0,45; 0,90; 0,10; 0,65. Tentukan keempat induk (dua pertama = pasangan 1).',
        fields: [
          { label: 'Induk dari r = 0,45', a: 'T2' },
          { label: 'Induk dari r = 0,90', a: 'T4' },
          { label: 'Induk dari r = 0,10', a: 'T1' },
          { label: 'Induk dari r = 0,65', a: 'T3' }
        ],
        ex: '0,45 → T2, 0,90 → T4, 0,10 → T1, 0,65 → T3. Pasangan 1 = (T2, T4), pasangan 2 = (T1, T3).' },
      { q: 'Crossover single-point: pasangan 1 dipotong setelah gen 4, pasangan 2 setelah gen 6. Tulis O1, O2 (pasangan 1) dan O3, O4 (pasangan 2).',
        fields: [
          { label: 'O1', a: '22133134' },
          { label: 'O2', a: '14224143' },
          { label: 'O3', a: '12341212' },
          { label: 'O4', a: '31423434' }
        ],
        ex: 'T2 2213|4143 × T4 1422|3134 → O1 = 22133134, O2 = 14224143. T1 123412|34 × T3 314234|12 → O3 = 12341212, O4 = 31423434. Setiap angka slot sah di posisi mana pun, jadi tidak perlu repair.' },
      { q: 'Mutasi: gen 5 pada O1 diganti slot 2, gen 7 pada O4 diganti slot 1. Tulis O1 dan O4 setelah mutasi.',
        fields: [{ label: 'O1 setelah mutasi', a: '22132134' }, { label: 'O4 setelah mutasi', a: '31423414' }],
        ex: 'O1: 22133134 → 22132134 (konflik 18 → 25, memburuk). O4: 31423434 → 31423414 (konflik 27 → 22, membaik). Mutasi bisa membantu atau merugikan.' },
      { q: 'Evaluasi offspring: O1 = 25, O2 = 22, O3 = 40, O4 = 22 konflik. Terapkan elitisme k = 1 (jadwal terbaik populasi lama menggantikan offspring terburuk). Hitung rata-rata konflik sebelum dan sesudah, dan konflik terbaik populasi baru.',
        fields: [
          { label: 'Offspring yang diganti', a: 'O3' },
          { label: 'Jadwal elit', a: 'T2' },
          { label: 'Rata-rata konflik lama', a: 25.5, tol: 0.01 },
          { label: 'Rata-rata konflik baru', a: 23, tol: 0.01 },
          { label: 'Konflik terbaik baru', a: 22, tol: 0 }
        ],
        ex: 'O3 (40 konflik) diganti T2 (23). Populasi baru: T2 = 23, O1 = 25, O2 = 22, O4 = 22. Rata-rata (26 + 23 + 28 + 25)/4 = 25,50 → (23 + 25 + 22 + 22)/4 = 23,00. Terbaik 23 → 22. Biaya satu generasi: 8 evaluasi jadwal.' },
      { q: 'O3 punya 40 konflik. Apa yang terjadi pada fitness = 30 − konflik untuk O3, mengapa itu masalah bagi roulette, dan apa trade-off menaikkan konstanta menjadi 45?',
        points: [
          'Fitness O3 = 30 − 40 = −10, negatif',
          'Roulette tidak bisa memberi irisan negatif, perhitungan probabilitas rusak',
          'C = 45 membuat semua fitness positif, tetapi selisih relatif mengecil',
          'Tekanan seleksi turun (terbaik/terburuk 3,5× menjadi sekitar 1,3×), seleksi mendekati acak',
          'C besar aman tapi lambat; C kecil kuat tapi berisiko negatif'
        ] }
    ],
    ex: 'Angka sesuai studi kasus slide minggu 2-3 (Selecting Parents, Crossover on the Timetable, One Generation of the Timetable).' },
  { type: 'steps',
    q: 'Panitia ujian susulan menjadwalkan 6 ujian (A-F) ke 3 slot. Tabel di bawah berisi banyak mahasiswa yang mengikuti dua ujian sekaligus; jika dua ujian itu di slot yang sama, mereka semua bentrok. Dipakai GA dengan kromosom integer (gen ke-i = slot ujian ke-i) dan populasi 4.',
    table: { head: ['Pasangan ujian', 'Mahasiswa yang sama'],
      rows: [['A-B', 5], ['A-C', 2], ['B-D', 4], ['C-E', 3], ['D-F', 6], ['E-F', 2], ['B-E', 1], ['A-F', 3]] },
    steps: [
      { q: 'Hitung konflik setiap jadwal. Konflik = jumlah mahasiswa pada semua pasangan ujian yang berada di slot yang sama.',
        table: { head: ['Jadwal', 'Kromosom (ABCDEF)'],
          rows: [['T1', '1 1 2 2 3 3'], ['T2', '1 2 3 1 2 3'], ['T3', '1 2 1 3 2 3'], ['T4', '3 1 2 1 3 2']] },
        fields: [
          { label: 'Konflik T1', a: 7, tol: 0 },
          { label: 'Konflik T2', a: 1, tol: 0 },
          { label: 'Konflik T3', a: 9, tol: 0 },
          { label: 'Konflik T4', a: 4, tol: 0 }
        ],
        ex: 'T1: A-B (5) + E-F (2) = 7. T2: B-E (1) = 1. T3: A-C (2) + D-F (6) + B-E (1) = 9. T4: B-D (4) = 4.' },
      { q: 'Fitness = 20 − konflik. Hitung fitness dan probabilitas kumulatif roulette tiap jadwal (4 desimal).',
        fields: [
          { label: 'Fitness T1', a: 13, tol: 0 },
          { label: 'Fitness T2', a: 19, tol: 0 },
          { label: 'Fitness T3', a: 11, tol: 0 },
          { label: 'Fitness T4', a: 16, tol: 0 },
          { label: 'Kumulatif T1', a: 0.2203, tol: 0.0012 },
          { label: 'Kumulatif T2', a: 0.5424, tol: 0.0012 },
          { label: 'Kumulatif T3', a: 0.7288, tol: 0.0012 },
          { label: 'Kumulatif T4', a: 1, tol: 0.0012 }
        ],
        ex: 'Fitness 13, 19, 11, 16 (total 59). P = 0,2203; 0,3220; 0,1864; 0,2712. Kumulatif 0,2203; 0,5424; 0,7288; 1,0000.' },
      { q: 'Pilih induk dengan r = 0,35; 0,80; 0,15; 0,55 (dua pertama = pasangan 1).',
        fields: [
          { label: 'Induk dari r = 0,35', a: 'T2' },
          { label: 'Induk dari r = 0,80', a: 'T4' },
          { label: 'Induk dari r = 0,15', a: 'T1' },
          { label: 'Induk dari r = 0,55', a: 'T3' }
        ],
        ex: '0,35 → T2, 0,80 → T4, 0,15 → T1, 0,55 → T3.' },
      { q: 'Crossover single-point: pasangan 1 dipotong setelah gen 3, pasangan 2 setelah gen 2. Tulis O1-O4.',
        fields: [
          { label: 'O1', a: '123132' },
          { label: 'O2', a: '312123' },
          { label: 'O3', a: '111323' },
          { label: 'O4', a: '122233' }
        ],
        ex: 'Pasangan 1 (T2 × T4) → 123132, 312123. Pasangan 2 (T1 × T3) → 111323, 122233.' },
      { q: 'Mutasi: gen 5 (ujian E) pada O2 dipindah ke slot 1. Hitung konflik keempat offspring setelah mutasi.',
        fields: [
          { label: 'O2 setelah mutasi', a: '312113' },
          { label: 'Konflik O1', a: 3, tol: 0 },
          { label: 'Konflik O2', a: 8, tol: 0 },
          { label: 'Konflik O3', a: 13, tol: 0 },
          { label: 'Konflik O4', a: 6, tol: 0 }
        ],
        ex: 'Sebelum mutasi konflik offspring 3, 10, 13, 6. O2: 312123 → 312113 (10 → 8). Setelah mutasi: 3, 8, 13, 6.' },
      { q: 'Elitisme k = 1: jadwal terbaik populasi lama menggantikan offspring dengan konflik terbanyak. Hitung rata-rata konflik populasi lama dan baru, serta konflik terbaik populasi baru.',
        fields: [
          { label: 'Offspring yang diganti', a: 'O3' },
          { label: 'Jadwal elit', a: 'T2' },
          { label: 'Rata-rata konflik lama', a: 5.25, tol: 0.01 },
          { label: 'Rata-rata konflik baru', a: 4.5, tol: 0.01 },
          { label: 'Konflik terbaik baru', a: 1, tol: 0 }
        ],
        ex: 'Elit T2 (1 konflik) menggantikan O3 (13). Konflik populasi baru: 3, 8, 1, 6. Rata-rata 5,25 → 4,50.' },
      { q: 'Mengapa dipakai encoding integer, bukan biner atau permutasi, untuk masalah ini?',
        points: [
          'Tiap gen langsung berisi nomor slot (1-3), tanpa langkah dekode',
          'Biner 2 bit per ujian punya pola 11 yang tidak bermakna (4 nilai untuk 3 slot), jadi muncul kromosom tidak valid',
          'Bukan permutasi: beberapa ujian boleh berbagi satu slot, tidak ada aturan "tepat sekali"',
          'Crossover dan mutasi biasa selalu menghasilkan jadwal sah'
        ] }
    ],
    ex: 'Soal buatan sendiri mengikuti slide minggu 1-3; kunci dihitung dengan kode.' },
  { type: 'steps',
    q: 'Laboratorium menjadwalkan 7 praktikum (P, Q, R, S, T, U, V) ke 3 sesi. Asisten mencatat jumlah mahasiswa yang mengambil dua praktikum sekaligus (tabel). Kromosom integer berisi sesi tiap praktikum dalam urutan P..V, dan fitness = 25 − konflik.',
    table: { head: ['Pasangan ujian', 'Mahasiswa yang sama'],
      rows: [['P-Q', 4], ['P-S', 2], ['Q-R', 3], ['R-T', 5], ['S-U', 4], ['T-V', 2], ['U-V', 3], ['Q-U', 1], ['P-V', 2]] },
    steps: [
      { q: 'Hitung konflik setiap jadwal. Konflik = jumlah mahasiswa pada semua pasangan ujian yang berada di slot yang sama.',
        table: { head: ['Jadwal', 'Kromosom (PQRSTUV)'],
          rows: [['J1', '1 1 3 3 3 3 3'], ['J2', '3 1 2 1 2 2 1'], ['J3', '3 1 3 2 1 2 2'], ['J4', '2 1 3 2 2 3 2']] },
        fields: [
          { label: 'Konflik J1', a: 18, tol: 0 },
          { label: 'Konflik J2', a: 5, tol: 0 },
          { label: 'Konflik J3', a: 7, tol: 0 },
          { label: 'Konflik J4', a: 6, tol: 0 }
        ],
        ex: 'J1: P-Q (4) + R-T (5) + S-U (4) + T-V (2) + U-V (3) = 18. J2: R-T (5) = 5. J3: S-U (4) + U-V (3) = 7. J4: P-S (2) + T-V (2) + P-V (2) = 6.' },
      { q: 'Fitness = 25 − konflik. Hitung fitness dan probabilitas kumulatif roulette tiap jadwal (4 desimal).',
        fields: [
          { label: 'Fitness J1', a: 7, tol: 0 },
          { label: 'Fitness J2', a: 20, tol: 0 },
          { label: 'Fitness J3', a: 18, tol: 0 },
          { label: 'Fitness J4', a: 19, tol: 0 },
          { label: 'Kumulatif J1', a: 0.1094, tol: 0.0012 },
          { label: 'Kumulatif J2', a: 0.4219, tol: 0.0012 },
          { label: 'Kumulatif J3', a: 0.7031, tol: 0.0012 },
          { label: 'Kumulatif J4', a: 1, tol: 0.0012 }
        ],
        ex: 'Fitness 7, 20, 18, 19 (total 64). P = 0,1094; 0,3125; 0,2813; 0,2969. Kumulatif 0,1094; 0,4219; 0,7031; 1,0000.' },
      { q: 'Pilih induk dengan r = 0,62; 0,20; 0,95; 0,40 (dua pertama = pasangan 1).',
        fields: [
          { label: 'Induk dari r = 0,62', a: 'J3' },
          { label: 'Induk dari r = 0,20', a: 'J2' },
          { label: 'Induk dari r = 0,95', a: 'J4' },
          { label: 'Induk dari r = 0,40', a: 'J2' }
        ],
        ex: '0,62 → J3, 0,20 → J2, 0,95 → J4, 0,40 → J2.' },
      { q: 'Crossover single-point: pasangan 1 dipotong setelah gen 4, pasangan 2 setelah gen 3. Tulis O1-O4.',
        fields: [
          { label: 'O1', a: '3132221' },
          { label: 'O2', a: '3121122' },
          { label: 'O3', a: '2131221' },
          { label: 'O4', a: '3122232' }
        ],
        ex: 'Pasangan 1 (J3 × J2) → 3132221, 3121122. Pasangan 2 (J4 × J2) → 2131221, 3122232.' },
      { q: 'Mutasi: gen 2 (ujian Q) pada O3 dipindah ke slot 3; gen 7 (ujian V) pada O4 dipindah ke slot 1. Hitung konflik keempat offspring setelah mutasi.',
        fields: [
          { label: 'O3 setelah mutasi', a: '2331221' },
          { label: 'O4 setelah mutasi', a: '3122231' },
          { label: 'Konflik O1', a: 4, tol: 0 },
          { label: 'Konflik O2', a: 3, tol: 0 },
          { label: 'Konflik O3', a: 3, tol: 0 },
          { label: 'Konflik O4', a: 5, tol: 0 }
        ],
        ex: 'Sebelum mutasi konflik offspring 4, 3, 0, 7. O3: 2131221 → 2331221 (0 → 3); O4: 3122232 → 3122231 (7 → 5). Setelah mutasi: 4, 3, 3, 5.' },
      { q: 'Elitisme k = 1: jadwal terbaik populasi lama menggantikan offspring dengan konflik terbanyak. Hitung rata-rata konflik populasi lama dan baru, serta konflik terbaik populasi baru.',
        fields: [
          { label: 'Offspring yang diganti', a: 'O4' },
          { label: 'Jadwal elit', a: 'J2' },
          { label: 'Rata-rata konflik lama', a: 9, tol: 0.01 },
          { label: 'Rata-rata konflik baru', a: 3.75, tol: 0.01 },
          { label: 'Konflik terbaik baru', a: 3, tol: 0 }
        ],
        ex: 'Elit J2 (5 konflik) menggantikan O4 (5). Konflik populasi baru: 4, 3, 3, 5. Rata-rata 9,00 → 3,75.' },
      { q: 'Setelah satu generasi, jelaskan peran masing-masing operator (seleksi, crossover, mutasi, elitisme) dalam perubahan rata-rata konflik.',
        points: [
          'Seleksi memberi peluang lebih besar pada jadwal berkonflik rendah',
          'Crossover menggabungkan bagian jadwal dari dua induk; anak bisa lebih baik atau lebih buruk dari induknya',
          'Mutasi memindahkan satu praktikum ke sesi lain, sumber variasi baru',
          'Elitisme menjamin jadwal terbaik tidak hilang'
        ] }
    ],
    ex: 'Soal buatan sendiri mengikuti slide minggu 1-3; kunci dihitung dengan kode.' },
  { type: 'steps',
    q: 'Program studi menjadwalkan 6 sidang tugas akhir (A-F) ke 3 slot. Dosen penguji yang sama tidak boleh menguji dua sidang di slot yang sama; tabel berisi banyak dosen yang menjadi penguji di dua sidang sekaligus. Konflik = jumlah dosen yang bentrok, fitness = 15 − konflik.',
    table: { head: ['Pasangan ujian', 'Mahasiswa yang sama'],
      rows: [['A-B', 2], ['A-D', 1], ['B-C', 2], ['C-F', 3], ['D-E', 2], ['E-F', 1], ['B-F', 1]] },
    steps: [
      { q: 'Hitung konflik setiap jadwal. Konflik = jumlah mahasiswa pada semua pasangan ujian yang berada di slot yang sama.',
        table: { head: ['Jadwal', 'Kromosom (ABCDEF)'],
          rows: [['S1', '3 2 3 1 1 1'], ['S2', '1 2 2 3 3 2'], ['S3', '2 2 2 1 1 1'], ['S4', '1 3 2 3 3 2']] },
        fields: [
          { label: 'Konflik S1', a: 3, tol: 0 },
          { label: 'Konflik S2', a: 8, tol: 0 },
          { label: 'Konflik S3', a: 7, tol: 0 },
          { label: 'Konflik S4', a: 5, tol: 0 }
        ],
        ex: 'S1: D-E (2) + E-F (1) = 3. S2: B-C (2) + C-F (3) + D-E (2) + B-F (1) = 8. S3: A-B (2) + B-C (2) + D-E (2) + E-F (1) = 7. S4: C-F (3) + D-E (2) = 5.' },
      { q: 'Fitness = 15 − konflik. Hitung fitness dan probabilitas kumulatif roulette tiap jadwal (4 desimal).',
        fields: [
          { label: 'Fitness S1', a: 12, tol: 0 },
          { label: 'Fitness S2', a: 7, tol: 0 },
          { label: 'Fitness S3', a: 8, tol: 0 },
          { label: 'Fitness S4', a: 10, tol: 0 },
          { label: 'Kumulatif S1', a: 0.3243, tol: 0.0012 },
          { label: 'Kumulatif S2', a: 0.5135, tol: 0.0012 },
          { label: 'Kumulatif S3', a: 0.7297, tol: 0.0012 },
          { label: 'Kumulatif S4', a: 1, tol: 0.0012 }
        ],
        ex: 'Fitness 12, 7, 8, 10 (total 37). P = 0,3243; 0,1892; 0,2162; 0,2703. Kumulatif 0,3243; 0,5135; 0,7297; 1,0000.' },
      { q: 'Pilih induk dengan r = 0,05; 0,70; 0,30; 0,88 (dua pertama = pasangan 1).',
        fields: [
          { label: 'Induk dari r = 0,05', a: 'S1' },
          { label: 'Induk dari r = 0,70', a: 'S3' },
          { label: 'Induk dari r = 0,30', a: 'S1' },
          { label: 'Induk dari r = 0,88', a: 'S4' }
        ],
        ex: '0,05 → S1, 0,70 → S3, 0,30 → S1, 0,88 → S4.' },
      { q: 'Crossover single-point: pasangan 1 dipotong setelah gen 2, pasangan 2 setelah gen 4. Tulis O1-O4.',
        fields: [
          { label: 'O1', a: '322111' },
          { label: 'O2', a: '223111' },
          { label: 'O3', a: '323132' },
          { label: 'O4', a: '132311' }
        ],
        ex: 'Pasangan 1 (S1 × S3) → 322111, 223111. Pasangan 2 (S1 × S4) → 323132, 132311.' },
      { q: 'Mutasi: gen 4 (ujian D) pada O1 dipindah ke slot 3. Hitung konflik keempat offspring setelah mutasi.',
        fields: [
          { label: 'O1 setelah mutasi', a: '322311' },
          { label: 'Konflik O1', a: 4, tol: 0 },
          { label: 'Konflik O2', a: 5, tol: 0 },
          { label: 'Konflik O3', a: 1, tol: 0 },
          { label: 'Konflik O4', a: 1, tol: 0 }
        ],
        ex: 'Sebelum mutasi konflik offspring 5, 5, 1, 1. O1: 322111 → 322311 (5 → 4). Setelah mutasi: 4, 5, 1, 1.' },
      { q: 'Elitisme k = 1: jadwal terbaik populasi lama menggantikan offspring dengan konflik terbanyak. Hitung rata-rata konflik populasi lama dan baru, serta konflik terbaik populasi baru.',
        fields: [
          { label: 'Offspring yang diganti', a: 'O2' },
          { label: 'Jadwal elit', a: 'S1' },
          { label: 'Rata-rata konflik lama', a: 5.75, tol: 0.01 },
          { label: 'Rata-rata konflik baru', a: 2.25, tol: 0.01 },
          { label: 'Konflik terbaik baru', a: 1, tol: 0 }
        ],
        ex: 'Elit S1 (3 konflik) menggantikan O2 (5). Konflik populasi baru: 4, 3, 1, 1. Rata-rata 5,75 → 2,25.' },
      { q: 'Jika slot sidang ditambah menjadi 4, apa yang berubah pada encoding dan ukuran ruang pencarian? Apakah GA harus diubah?',
        points: [
          'Encoding tetap integer, hanya alel bertambah menjadi 1-4',
          'Ruang pencarian naik dari 3^6 = 729 menjadi 4^6 = 4.096',
          'Operator crossover dan mutasi tetap sama; mutasi kini memilih slot dari 1-4',
          'Konflik biasanya lebih mudah diturunkan karena pilihan slot lebih banyak'
        ] }
    ],
    ex: 'Soal buatan sendiri mengikuti slide minggu 1-3; kunci dihitung dengan kode.' },
  { type: 'steps',
    q: 'Lanjutan studi kasus jadwal 8 ujian (A-H). Sekarang slot ada 5 (S1-S5) dan muncul aturan baru: satu slot paling banyak berisi 2 ujian karena ruangan terbatas. Empat jadwal yang bertahan:',
    table: { head: ['Jadwal', 'Kromosom (A..H)', 'Konflik'],
      rows: [
        ['T2', '2 2 1 3 4 1 4 3', 23],
        ['O1', '2 2 1 3 2 1 3 4', 25],
        ['O2', '1 4 2 2 4 1 4 3', 22],
        ['O4', '3 1 4 2 3 4 1 4', 22]
      ] },
    steps: [
      { q: 'Hitung banyak ujian di slot S2 untuk tiap jadwal, lalu jumlah pelanggaran (slot yang berisi lebih dari 2 ujian; setiap ujian kelebihan = 1 pelanggaran).',
        fields: [
          { label: 'Ujian di S2 pada T2', a: 2, tol: 0 },
          { label: 'Ujian di S2 pada O1', a: 3, tol: 0 },
          { label: 'Ujian di S2 pada O2', a: 2, tol: 0 },
          { label: 'Ujian di S2 pada O4', a: 1, tol: 0 },
          { label: 'Pelanggaran T2', a: 0, tol: 0 },
          { label: 'Pelanggaran O1', a: 1, tol: 0 },
          { label: 'Pelanggaran O2', a: 1, tol: 0 },
          { label: 'Pelanggaran O4', a: 1, tol: 0 }
        ],
        ex: 'T2: isi slot S1-S5 = 2·2·2·2·0, pelanggaran 0. O1: isi slot S1-S5 = 2·3·2·1·0, pelanggaran 1. O2: isi slot S1-S5 = 2·2·1·3·0, pelanggaran 1. O4: isi slot S1-S5 = 2·1·2·3·0, pelanggaran 1. T2 satu-satunya yang feasible.' },
      { q: 'Ini hard constraint atau soft constraint? Sebutkan tiga cara menangani kromosom yang melanggarnya.',
        fields: [
          { label: 'Jenis aturan', a: ['hard', 'hard constraint', 'keras'] },
          { label: 'Cara 1', a: ['rejection', 'reject', 'penolakan', 'buang'] },
          { label: 'Cara 2', a: ['repair', 'perbaikan', 'perbaiki'] },
          { label: 'Cara 3', a: ['penalty', 'penalti'] }
        ],
        ex: 'Ruangan tidak bisa menampung ujian ketiga, jadi jadwal tidak bisa dijalankan: hard constraint. Penanganan: rejection (buang), repair (pindahkan ujian ke slot kosong), penalty (kurangi fitness).' },
      { q: 'Pakai penalty: fitness = (45 − konflik) − w × pelanggaran. Hitung fitness keempat jadwal untuk w = 5 dan w = 25.',
        fields: [
          { label: 'w = 5: T2', a: 22, tol: 0 },
          { label: 'w = 5: O1', a: 15, tol: 0 },
          { label: 'w = 5: O2', a: 18, tol: 0 },
          { label: 'w = 5: O4', a: 18, tol: 0 },
          { label: 'w = 25: T2', a: 22, tol: 0 },
          { label: 'w = 25: O1', a: -5, tol: 0 },
          { label: 'w = 25: O2', a: -2, tol: 0 },
          { label: 'w = 25: O4', a: -2, tol: 0 }
        ],
        ex: 'w = 5: 22, 15, 18, 18. w = 25: 22, -5, -2, -2. Dengan w = 25 semua jadwal infeasible bernilai negatif, jadi penalty berperilaku seperti rejection. Slide: w = 10 seimbang (22, 10, 13, 13).' },
      { q: 'Repair untuk O1: pindahkan satu ujian dari S2 ke slot yang masih kosong. Slide mencatat konflik setelah repair: pindah A = 13, pindah E = 17, pindah B = 24. Ujian mana yang dipindah, dan bandingkan ketiga strategi untuk kasus ini.',
        fields: [{ label: 'Ujian yang dipindah', a: ['A', 'ujian A'] }],
        ex: 'Pindah A memberi 13 konflik, lebih baik dari jadwal mana pun yang pernah ada. Rejection membuang 3 dari 4 jadwal (evaluasi terbuang). Repair di sini murah dan kuat. Penalty bergantung penuh pada pilihan w.' }
    ],
    ex: 'Kromosom dan konflik dari studi kasus slide minggu 5 (Adding a Room Constraint); jumlah pelanggaran dan fitness dihitung dengan kode.' },
  { type: 'steps',
    q: 'Empat jadwal punya konflik T1 = 26, T2 = 23, T3 = 28, T4 = 25. Tim membandingkan dua konstanta pada fitness = C − konflik.',
    steps: [
      { q: 'Untuk C = 30, hitung probabilitas roulette tiap jadwal (4 desimal) dan rasio peluang terbaik/terburuk.',
        fields: [
          { label: 'P T1', a: 0.2222, tol: 0.0006 },
          { label: 'P T2', a: 0.3889, tol: 0.0006 },
          { label: 'P T3', a: 0.1111, tol: 0.0006 },
          { label: 'P T4', a: 0.2778, tol: 0.0006 },
          { label: 'Rasio terbaik/terburuk', a: 3.5, tol: 0.01 }
        ],
        ex: 'Fitness 4, 7, 2, 5 (total 18). P = 0,2222; 0,3889; 0,1111; 0,2778. Rasio 7/2 = 3,5.' },
      { q: 'Untuk C = 45, hitung lagi probabilitas dan rasionya.',
        fields: [
          { label: 'P T1', a: 0.2436, tol: 0.0006 },
          { label: 'P T2', a: 0.2821, tol: 0.0006 },
          { label: 'P T3', a: 0.2179, tol: 0.0006 },
          { label: 'P T4', a: 0.2564, tol: 0.0006 },
          { label: 'Rasio terbaik/terburuk', a: 1.29, tol: 0.01 }
        ],
        ex: 'Fitness 19, 22, 17, 20 (total 78). P = 0,2436; 0,2821; 0,2179; 0,2564. Rasio 22/17 ≈ 1,29: hampir seperti memilih acak.' },
      { q: 'Satu offspring baru punya 40 konflik. Berapa fitness-nya untuk C = 30 dan C = 45?',
        fields: [{ label: 'C = 30', a: -10, tol: 0 }, { label: 'C = 45', a: 5, tol: 0 }],
        ex: '30 − 40 = −10 (roulette rusak), 45 − 40 = 5 (aman).' },
      { q: 'Simpulkan trade-off memilih C, dan sebutkan alternatif fitness atau seleksi yang menghindari masalah ini.',
        points: [
          'C kecil: tekanan seleksi kuat, tetapi bisa menghasilkan fitness negatif',
          'C besar: selalu aman, tetapi tekanan seleksi hilang dan konvergensi lambat',
          'Alternatif fitness: 1/(1 + konflik), selalu positif',
          'Alternatif seleksi: tournament atau rank-based yang tidak peka skala'
        ] }
    ],
    ex: 'Angka dari slide minggu 3 (The Fitness Constant Bites Back); kunci dihitung dengan kode.' }
]);
