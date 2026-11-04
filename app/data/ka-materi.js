// Kecerdasan Artifisial — materi UTS (slide dosen): Introduction to Metaheuristic Search, Genetic Algorithm,
// GA for Combinatorial Problems, Multi-Objective Optimisation. Ditambah pembahasan Soal UTS 2025 (= LKS GA-2).
// Bab minggu 7 (machine learning) sudah dihapus karena di luar kisi-kisi UTS. Disusun sendiri dari slide Week 1-6 dan catatan MOGA (RSM); bukan salinan slide.
// genes: { pos?, rows: [{ label, genes, mark?, mark2?, note? }] } dan wheel: { items: [{ label, p }], r? } digambar oleh js/diagram.js.
BANK.materi('ka', [
  {
    label: 'Pola ujian', judul: 'UTS Kamis 5 November: Bentuk dan Materi',
    ringkas: 'Empat soal esai, 120 menit, open notes 1 lembar A4 bolak-balik, kalkulator boleh. Materi Week 1, 2-3, 5, dan 6.',
    bagian: [
      { h: 'Ketentuan dari slide dosen', tabel: { head: ['Hal', 'Ketentuan'], rows: [
        ['Waktu', 'Pekan 8, Kamis 5 November 2026, 08.00 – 10.00 (120 menit). Jadwal FIF menulis 08.00 – 10.15, ruang TULT 0711'],
        ['Mode dan media', 'Onsite, paper-based, boleh kalkulator'],
        ['Bentuk soal', 'Essay, 4 soal'],
        ['Tipe evaluasi', 'Open notes: 1 lembar A4, 2 halaman (bolak-balik)']] } },
      { h: 'Materi dan letaknya di slide', tabel: { head: ['Materi UTS', 'Slide', 'Yang harus bisa'], rows: [
        ['1. Introduction to Metaheuristic Search', 'Week 1', 'Ruang pencarian, Hill Climbing, Simulated Annealing P = exp(−ΔE/T), trajectory vs population, exploration vs exploitation, No Free Lunch'],
        ['2. Genetic Algorithm', 'Week 2-3', 'Encoding/decoding biner, fitness, roulette/tournament/rank, crossover, mutasi, elitisme, satu generasi penuh (studi kasus jadwal)'],
        ['3. GA for Combinatorial Problems', 'Week 5', 'Permutasi, PMX, OX, mutasi swap/insertion/inversion, constraint (rejection/repair/penalty), Tabu Search, GA untuk TSP'],
        ['4. Multi-Objective Optimisation', 'Week 6 + MOGA', 'Dominasi, Pareto front, n_p dan S_p, crowding distance, tournament rank lalu crowding, combine 2N dan fill N, weighted sum']] },
        ingat: 'Soal 1 UTS 2025 adalah GA untuk TSP (sama persis dengan LKS GA-2), dengan tabel a sampai g. Pembahasannya ada di bab berikut.' },
      { h: 'Cara menulis jawaban', poin: [
        'Tulis rumus sebelum angka, misalnya P = f / Σf dan x = x_min + (x_max − x_min)/(2^n − 1) × d.',
        'Buat tabel: kromosom, d, x, f, P, kumulatif. Pakai 4 desimal, dan pastikan kumulatif terakhir tepat 1,0000.',
        'Roulette: kromosom terpilih adalah yang kumulatifnya pertama kali ≥ r. Tulis r dan hasilnya berpasangan.',
        'Crossover "setelah gen k" artinya potongan di antara gen k dan gen k+1. Baca instruksi dengan teliti.',
        'Uniform crossover: tulis dulu arti mask (1 ambil dari P1 atau dari P2), karena soal bisa memakai konvensi mana pun.',
        'Setelah PMX atau OX, cek bahwa setiap kota atau pekerjaan muncul tepat sekali.',
        'Elitisme k = 1: individu terbaik populasi lama menggantikan offspring terburuk. Tulis populasi baru dan bandingkan rata-ratanya.'
      ], ingat: 'Latihan soal di aplikasi berbentuk uraian bertahap: langkah berikutnya terbuka setelah langkah sekarang diperiksa, persis seperti mengerjakan soal a, b, c di ujian.' }
    ]
  },
  {
    label: 'Soal UTS 2025 · pembahasan', judul: 'Soal 1 UTS 2025 (= LKS GA-2): GA untuk TSP',
    ringkas: 'Lima kota A-E, populasi 4, fitness = 1/jarak, roulette 2 desimal, order crossover TP1 = 2 dan TP2 = 4, swap mutation pm = 0,2, tanpa elitisme. Kunci dihitung sendiri.',
    bagian: [
      { h: 'Soal', soal: 'Matriks jarak: AB 8, AC 12, AD 6, AE 5, BC 7, BD 10, BE 13, CD 4, CE 8, DE 9. Kromosom permutasi (1 = A … 5 = E), mulai dari kota mana pun. Populasi: A1 = 12345, A2 = 24135, A3 = 51324, A4 = 32145. Nilai acak parent: 0,201; 0,440; 0,876; 0,107. Mutasi: random 0,21 (gen 1-3), 0,54 (2-4), 0,05 (1-5), 0,19 (2-3).',
        tabel: { head: ['', 'Kromosom', 'Rute', 'Total jarak', 'Fitness', 'Proporsi', 'Rentang'], rows: [
          ['A1', '1 2 3 4 5', 'A-B-C-D-E-A: 8+7+4+9+5', '33', '0,0303', '0,30', '0 – 0,30'],
          ['A2', '2 4 1 3 5', 'B-D-A-C-E-B: 10+6+12+8+13', '49', '0,0204', '0,20', '0,30 – 0,51'],
          ['A3', '5 1 3 2 4', 'E-A-C-B-D-E: 5+12+7+10+9', '43', '0,0233', '0,23', '0,51 – 0,74'],
          ['A4', '3 2 1 4 5', 'C-B-A-D-E-C: 7+8+6+9+8', '38', '0,0263', '0,26', '0,74 – 1'],
          ['Total', '', '', '', '0,1003', '1', '']] } },
      { h: 'c-d. Parent dan order crossover', genes: { pos: true, rows: [
          { label: 'P1 = A1', genes: '12345', mark: [2, 3, 4] }, { label: 'P2 = A2', genes: '24135', mark2: [2, 3, 4] },
          { label: 'Anak1', genes: '12345', mark: [2, 3, 4], mark2: [1, 5], note: 'urutan A2 dari gen 5: 5 2 4 1 3 → buang 2, 3, 4 → sisa 5, 1' },
          { label: 'Anak2', genes: '24135', mark2: [2, 3, 4], mark: [1, 5], note: 'urutan A1 dari gen 5: 5 1 2 3 4 → buang 4, 1, 3 → sisa 5, 2' },
          { label: 'P3 = A4', genes: '32145', mark: [2, 3, 4] }, { label: 'P4 = A1', genes: '12345', mark2: [2, 3, 4] },
          { label: 'Anak3', genes: '32145', mark: [2, 3, 4], mark2: [1, 5], note: 'urutan A1 dari gen 5: 5 1 2 3 4 → buang 2, 1, 4 → sisa 5, 3' },
          { label: 'Anak4', genes: '12345', mark2: [2, 3, 4], mark: [1, 5], note: 'urutan A4 dari gen 5: 5 3 2 1 4 → buang 2, 3, 4 → sisa 5, 1' }] },
        poin: ['0,201 → A1 (0 – 0,30); 0,440 → A2 (0,30 – 0,51); 0,876 → A4 (0,74 – 1); 0,107 → A1.',
          'Kunci di sini membaca TP sebagai indeks gen yang termasuk: TP1 = 2 dan TP2 = 4 berarti segmen gen ke-2 sampai ke-4 (soal menyebutnya "rentang indeks", dan panah TP di tabel jawaban menunjuk sel ke-2 dan ke-4). Contoh OX di soal tidak memberi angka TP, jadi tafsiran "potong setelah gen 2 dan gen 4" (segmen gen 3-4) juga mungkin; tulis asumsimu di lembar ujian.',
          'Isi sisa mulai gen ke-5 lalu melingkar ke gen 1 dan 2, mengikuti urutan induk lain yang dibaca mulai gen ke-5.',
          'Di soal ini keempat anak kebetulan sama dengan induknya. Bukan kesalahan hitung: dengan 5 gen dan segmen 3 gen, dua gen sisa jatuh tepat di posisi yang sama seperti induknya.'] },
      { h: 'e-g. Mutasi, generasi baru, dan jalur terbaik', tabel: { head: ['Anak', 'Random', 'Mutasi?', 'Hasil', 'Rute', 'Jarak', 'Fitness'], rows: [
          ['Anak1', '0,21', 'Tidak (≥ 0,2)', '1 2 3 4 5', 'A-B-C-D-E-A', '33', '0,0303'],
          ['Anak2', '0,54', 'Tidak', '2 4 1 3 5', 'B-D-A-C-E-B', '49', '0,0204'],
          ['Anak3', '0,05', 'Ya, tukar gen 1 dan 5', '5 2 1 4 3', 'E-B-A-D-C-E', '39', '0,0256'],
          ['Anak4', '0,19', 'Ya, tukar gen 2 dan 3', '1 3 2 4 5', 'A-C-B-D-E-A', '43', '0,0233']] },
        ingat: 'Jalur terbaik yang didapat: A1 = A→B→C→D→E→A dengan jarak 33 (ini juga optimum global, dicek dengan mencoba semua permutasi). Anak1 mewarisi rute itu apa adanya, jadi tanpa elitisme pun rute terbaik tidak hilang, tetapi generasi baru tidak membaik (rata-rata jarak 40,75 → 41,00). Sebutkan bahwa elitisme tidak mengubah jawaban g di soal ini. Dengan tafsiran segmen gen 3-4: anak 21345, 24135, 23145, 21345; setelah mutasi 21345, 24135, 53142, 23145; jarak 46, 49, 49, 47; A1 (33) hilang karena tanpa elitisme, jadi jawaban g tetap A→B→C→D→E→A = 33 tetapi dari generasi awal.' }
    ]
  },
  {
    label: 'Materi 1 · Week 1', judul: 'Metaheuristik dan Ruang Pencarian',
    ringkas: 'Kenapa jadwal ujian tidak bisa diselesaikan dengan BFS atau A*, dan apa yang membedakan metaheuristik.',
    bagian: [
      { h: 'Studi kasus: jadwal ujian fakultas', poin: [
        '30 ujian harus ditempatkan di 8 slot. Dua ujian dengan mahasiswa yang sama bentrok jika satu slot.',
        'Tujuan: meminimalkan total pasangan mahasiswa yang bentrok (900 pendaftaran, 7.773 pasangan berkonflik).',
        'Ruang pencarian 8^30 ≈ 1,24 × 10^27 jadwal. Memeriksa satu jadwal per nanodetik pun butuh sekitar 4 × 10^10 tahun, lebih lama dari umur alam semesta.',
        'Menambah ujian jauh lebih berat daripada menambah slot: ujian adalah pangkat, slot hanya basis.'
      ] },
      { h: 'Tiga keluarga search', tabel: { head: ['Keluarga', 'Contoh', 'Janji'], rows: [
        ['Blind search', 'BFS, DFS, DLS, IDS, UCS, bidirectional', 'Menjamin solusi, sering tidak terjangkau'],
        ['Informed search', 'Greedy best-first, A*', 'Optimal jika heuristik admissible'],
        ['Local search', 'Hill Climbing, Simulated Annealing', 'Murah dan cepat, tanpa jaminan']] },
        ingat: 'Pertanyaan penentu: jawabannya berupa jalur (path) atau susunan (arrangement)? Jadwal adalah susunan.' },
      { h: 'Hill Climbing dan kegagalannya', poin: [
        'Mulai dari jadwal acak, pindah ke tetangga terbaik selama memperbaiki, berhenti jika tidak ada tetangga yang lebih baik.',
        'Tetangga = pindahkan satu ujian ke slot lain: 30 × 7 = 210 tetangga per jadwal.',
        '400 kali jalan dari titik awal berbeda: semuanya terjebak, hasil 577 sampai 668 konflik (median 618).',
        'Tiga jebakan: local optimum (semua tetangga lebih buruk), plateau (semua tetangga sama), narrow ridge (puncak hanya terjangkau lewat langkah yang tidak tersedia).'
      ] },
      { h: 'Simulated Annealing', poin: [
        'Sesekali menerima langkah memburuk dengan peluang P(accept) = exp(−ΔE / T).',
        'Suhu T tinggi di awal (eksplorasi), lalu turun (eksploitasi). Saat T rendah, SA menjadi Hill Climbing biasa.',
        'Dengan budget 40.000 evaluasi: random sampling 691, satu Hill Climbing 618, restart 588, populasi 588, SA 582 konflik.'
      ] },
      { h: 'Trajectory-based vs population-based', tabel: { head: ['', 'Trajectory-based', 'Population-based'], rows: [
        ['Solusi hidup', 'Satu solusi bergerak', 'Banyak solusi sekaligus'],
        ['Algoritma', 'Hill Climbing, Simulated Annealing, Tabu Search', 'Genetic Algorithm, NSGA-II'],
        ['Kelebihan', 'Cepat, sederhana, hemat memori', 'Tahan local optimum, menjelajah beberapa daerah, bertukar informasi'],
        ['Kelemahan', 'Mudah terjebak local optimum', 'Mahal, banyak parameter']] } },
      { h: 'Empat sifat metaheuristik', poin: [
        'Tidak menjamin optimal: tujuannya solusi cukup baik dalam waktu yang wajar.',
        'Tidak bergantung struktur masalah: tidak butuh turunan, konveksitas, atau rumus tertutup.',
        'Stokastik: dua kali jalan bisa memberi hasil berbeda, dan itu disengaja.',
        'Anytime: bisa dihentikan kapan saja dan selalu punya solusi.',
        'Pakai jika ruang besar/kombinatorial, objektif black box, waktu terbatas. Jangan pakai jika ada solusi analitis, masalahnya kecil, atau optimum harus dibuktikan.'
      ] },
      { h: 'Exploration vs exploitation dan No Free Lunch', poin: [
        'Exploration: mencari daerah baru. Exploitation: memperdalam daerah yang sudah baik. Keduanya berbagi budget yang sama.',
        'Terlalu sedikit eksplorasi terjebak local optimum; terlalu banyak menjadi tebakan acak.',
        'No Free Lunch (Wolpert & Macready, 1997): dirata-rata atas semua masalah, semua algoritma sama baik.',
        'NFL tidak berarti algoritma bebas dipilih: pada masalah tertentu selisihnya bisa besar. Hill Climbing 100% di landscape mulus, SA 99,9% di narrow basin, GA 86,6% di deceptive building block.'
      ] }
    ]
  },
  {
    label: 'Materi 2 · GA (Week 2)', judul: 'Konsep GA: Istilah, Alur, dan Encoding',
    ringkas: 'Tiga mekanisme evolusi, kosakata GA, enam langkah, dan cara memilih encoding.',
    bagian: [
      { h: 'Dari evolusi ke algoritma', tabel: { head: ['Mekanisme alam', 'Padanan di GA'], rows: [
        ['Variation: individu berbeda-beda', 'Populasi berisi kromosom yang beragam'],
        ['Inheritance: sifat induk diturunkan', 'Crossover menggabungkan bagian dua induk'],
        ['Differential selection: yang lebih fit punya lebih banyak keturunan', 'Seleksi berdasarkan fitness']] } },
      { h: 'Kosakata', tabel: { head: ['Istilah', 'Arti', 'Contoh TSP 8 kota'], rows: [
        ['Gen', 'Unit terkecil penyusun kromosom', 'Posisi ke-i dalam urutan kunjungan'],
        ['Alel', 'Nilai yang boleh diambil gen', 'Nama kota A-H'],
        ['Kromosom', 'Untaian gen = satu solusi', 'B E A H C G D F'],
        ['Individu', 'Satu kandidat solusi beserta fitness-nya', 'Rute + panjangnya'],
        ['Populasi', 'Kumpulan individu dalam satu generasi', '30 rute'],
        ['Generasi', 'Satu siklus evaluasi, seleksi, membentuk populasi baru', 'Satu putaran GA']] } },
      { h: 'Alur umum GA', poin: [
        '1. Inisialisasi populasi acak (sekali saja).',
        '2. Evaluasi fitness tiap kromosom.',
        '3. Seleksi induk (roulette, tournament, rank-based).',
        '4. Crossover untuk membuat offspring.',
        '5. Mutasi kecil acak untuk menjaga diversitas.',
        '6. Bentuk populasi baru (sering dengan elitisme), lalu cek kriteria berhenti. Jika belum, ulangi dari langkah 2.'
      ], ingat: 'Biaya GA dihitung dalam evaluasi fitness: populasi × generasi. 4 individu × 20 generasi = 80 evaluasi.' },
      { h: 'Jenis encoding', tabel: { head: ['Encoding', 'Contoh kromosom', 'Cocok untuk'], rows: [
        ['Biner', '1 0 1 1 0', 'Ya/tidak (knapsack), atau angka yang didekode'],
        ['Integer', '3 · 7 · 1 · 9', 'Memilih dari himpunan terbatas: slot jadwal, jumlah mesin'],
        ['Real', '2,41 · 0,08 · 5,66', 'Nilai kontinu: parameter model, suhu, kecepatan'],
        ['Permutasi', 'C · A · D · B', 'Urutan: TSP, job sequencing; tiap elemen muncul tepat sekali']] },
        ingat: 'Pertanyaan panduan: jika satu gen diubah sedikit, apakah solusinya juga berubah sedikit? Jika tidak, tinjau ulang encoding.' },
      { h: 'Membaca kromosom biner', soal: 'Kromosom 11001, x ∈ [0, 10], n = 5 bit. Berapa x?',
        poin: [
          'Desimal: d = 1×16 + 1×8 + 0×4 + 0×2 + 1×1 = 25.',
          'x = x_min + (x_max − x_min)/(2^n − 1) × d = 0 + 10/31 × 25 = 8,065.',
          'Langkah terkecil = (x_max − x_min)/(2^n − 1). n = 5 → 0,323; n = 10 → 0,0098; n = 20 → 0,0000095.',
          'Bit minimal untuk presisi p: cari n terkecil dengan 2^n − 1 ≥ (x_max − x_min)/p.',
          'Banyak variabel: tiap variabel punya blok bitnya sendiri, panjang kromosom = jumlah semua blok.'
        ] },
      { h: 'Masalah encoding biner', poin: [
        'Hamming cliff: 7 = 0111 dan 8 = 1000 bertetangga tetapi beda 4 bit, satu mutasi tidak bisa menjembatani.',
        'Gray code memperbaikinya: dua nilai berurutan selalu beda tepat 1 bit (… 011, 010, 110 …). Operator lain tetap sama.',
        'Solusi tidak valid: pada masalah urutan, banyak pola bit tidak mewakili urutan sah (misalnya 101 → B B C), jadi harus dibuang atau diperbaiki.'
      ] },
      { h: 'Inisialisasi populasi', poin: [
        'Gen diambil acak merata di seluruh domain supaya populasi tersebar (eksplorasi baik).',
        'Seeding dengan hasil heuristik lain boleh, tetapi jangan seluruh populasi: diversitas mati di generasi pertama (seeded: median 618 tapi sebaran 10× lebih sempit).',
        'Populasi awal harus dicek validitasnya jika ada constraint.',
        'Ukuran populasi umum 20-100 individu.'
      ] }
    ]
  },
  {
    label: 'Materi 2 · GA (Week 2)', judul: 'Fitness dan Seleksi Induk',
    ringkas: 'Fungsi objektif diubah menjadi fitness positif, lalu seleksi memilih induk dengan tekanan yang tepat.',
    bagian: [
      { h: 'Objective function ≠ fitness function', tabel: { head: ['Kasus', 'Ubah menjadi fitness', 'Contoh'], rows: [
        ['Maksimasi, nilai selalu positif', 'Fitness = f', '0,2; 1,4; 2,7; 0,9 dipakai langsung'],
        ['Minimasi', 'Fitness = 1/(1 + f) atau C − f (C cukup besar)', '0,2 → 0,83; 2,7 → 0,27'],
        ['Ada nilai negatif', 'Geser dengan konstanta', '−2,1 + 2,2 = 0,1']] } },
      { h: 'Empat kesalahan desain fitness', poin: [
        'Skala terlalu timpang: satu individu menguasai seleksi, diversitas runtuh. Perbaikan: scaling atau ranking.',
        'Terlalu banyak seri: seleksi kehilangan arah. Perbaikan: tambah presisi atau kriteria kedua.',
        'Evaluasi terlalu mahal: setiap generasi lambat. Perbaikan: sederhanakan, cache, aproksimasi, paralel.',
        'Mengukur hal yang salah: GA akan mengoptimalkan target yang salah dengan sangat baik.'
      ] },
      { h: 'Roulette wheel selection', soal: 'Empat kromosom: 01100 (f = 0,30), 11001 (f = 1,79), 00110 (f = 1,34), 10010 (f = 0,53). Dengan r = 0,72, siapa yang terpilih?',
        wheel: { items: [{ label: '01100', p: 0.0753 }, { label: '11001', p: 0.4522 }, { label: '00110', p: 0.3390 }, { label: '10010', p: 0.1335 }], r: [0.72] },
        poin: [
          'Langkah 1-2: jumlahkan fitness, P_i = f_i / Σf.',
          'Langkah 3: susun probabilitas kumulatif sampai 1,0000.',
          'Langkah 4: bangkitkan r ∈ [0, 1), pilih kromosom pertama yang kumulatifnya ≥ r.',
          'r = 0,72 pertama kali dilewati di kumulatif 0,866 milik 00110, jadi 00110 terpilih.'
        ] },
      { h: 'Tournament dan rank-based', poin: [
        'Tournament: ambil k individu acak, yang fitness-nya terbaik menang. Sederhana, murah, tidak peka skala, tetap jalan untuk fitness negatif. k = 2 lembut, k = 5 keras (populasi seragam dalam 4 generasi).',
        'Rank-based: urutkan, peluang ditentukan urutan, bukan besar fitness. Superindividu turun dari 75% ke 33%.',
        'Linear scaling: f\' = a·f + b dengan rata-rata tetap dan f\'(maks) = 2 × rata-rata. Contoh 900 vs 5-12: A dari 96% menjadi 33%, yang lain sekitar 13%.'
      ] },
      { h: 'Perbandingan tiga metode seleksi', tabel: { head: ['', 'Roulette wheel', 'Tournament', 'Rank-based'], rows: [
        ['Dasar peluang', 'Besar fitness', 'Hasil perbandingan', 'Urutan (rank)'],
        ['Peka skala fitness', 'Ya, kelemahan utamanya', 'Tidak', 'Tidak'],
        ['Kontrol tekanan', 'Tidak ada', 'Ukuran turnamen k', 'Skema bobot rank'],
        ['Biaya', 'Butuh total dan kumulatif', 'Paling murah', 'Butuh sorting'],
        ['Cocok jika', 'Selisih fitness bermakna dan terskala baik', 'Ingin sederhana, cepat, tekanan bisa diatur', 'Ingin stabil dan tahan outlier']] },
        ingat: 'Roulette gagal pada dua kondisi: superindividu (diversitas runtuh) dan fitness terlalu mirip seperti 0,901-0,906 (seleksi jadi acak). Akarnya sama: peka terhadap skala.' }
    ]
  },
  {
    label: 'Materi 2 · GA (Week 3)', judul: 'Crossover, Mutasi, Parameter, dan Kriteria Berhenti',
    ringkas: 'Crossover menyusun ulang bahan yang sudah ada, mutasi membawa bahan baru. Empat parameter dan elitisme menentukan keseimbangannya.',
    bagian: [
      { h: 'Tiga skema crossover biner', genes: { pos: true, rows: [
        { label: 'P1', genes: '00110', mark: [1, 2, 3] }, { label: 'P2', genes: '11001', mark2: [1, 2, 3, 4, 5] },
        { label: 'Single (3)', genes: '00101', mark: [1, 2, 3], mark2: [4, 5], note: 'potong setelah gen 3' },
        { label: 'Two-point', genes: '01110', mark: [1, 5], mark2: [2, 3, 4], note: 'tukar gen 2-4' },
        { label: 'Uniform', genes: '10100', mark: [2, 4, 5], mark2: [1, 3], note: 'mask 10100: 1 = dari P2' }] },
        tabel: { head: ['Skema', 'Disruption', 'Menjaga gen bertetangga', 'Pakai jika'], rows: [
          ['Single-point', 'Rendah', 'Ya, kuat', 'Gen berdekatan membentuk kelompok bermakna'],
          ['Two-point', 'Sedang', 'Sebagian', 'Default yang wajar'],
          ['Uniform', 'Tinggi', 'Tidak', 'Urutan gen tidak bermakna']] },
        ingat: 'Biru = gen dari P1, kuning = dari P2. Posisi yang sama di kedua induk pasti sama di semua offspring: crossover tidak pernah membuat nilai gen baru.' },
      { h: 'Building block dan probabilitas crossover', poin: [
        'Building block: kelompok gen pendek yang bernilai baik di mana pun berada. Crossover bekerja karena menggabungkan blok dari dua induk.',
        'Crossover dilakukan dengan peluang pc (umumnya 0,6-0,95). Jika tidak terjadi, induk disalin apa adanya.',
        'pc = 1: tidak ada induk yang lolos utuh. pc = 0: GA menjadi hill climbing populasi dengan mutasi saja.',
        'Royal Road (64 bit, 8 blok): crossover on rata-rata 48,8 vs mutasi saja 41,2. Pada jadwal: 593 vs 594, hampir tidak beda karena tidak ada blok untuk digabung.'
      ] },
      { h: 'Mutasi', poin: [
        'Bit flip: setiap gen dibalik dengan peluang pm. Umumnya pm ≈ 1/n, sekitar satu gen per kromosom.',
        'Contoh: 00101 (x = 1,613, f = 1,1781) dibalik gen 2 → 01101 (x = 4,194, f = 0,5025). Satu bit memindahkan solusi ke puncak lain.',
        'pm terlalu rendah: tidak ada bahan baru, stagnan. pm terlalu tinggi: populasi rusak tiap generasi, menjadi random search.',
        'Integer: random reset (ganti nilai acak) vs creep (±1). Pada jadwal random reset 602 vs creep 630, karena slot 3 dan 4 hanya label, bukan nilai yang mirip.',
        'Real: arithmetic crossover child = α·P1 + (1 − α)·P2 bisa membuat nilai di antara induk.'
      ] },
      { h: 'Empat parameter yang harus dipilih', tabel: { head: ['Parameter', 'Rentang awal', 'Efek'], rows: [
        ['Ukuran populasi', '20-100', 'Besar: diversitas terjaga, tiap generasi mahal'],
        ['Probabilitas crossover pc', '0,6-0,95', 'Tinggi: lebih banyak pencampuran building block'],
        ['Probabilitas mutasi pm', '≈ 1/n', 'Memasukkan bahan genetik baru'],
        ['Jumlah elit k', '1-2', 'Menjamin solusi terbaik tidak hilang']] },
        ingat: 'Pada studi kasus jadwal, hasil terbaik ada di pm = 1/n (602 konflik pada pc = 0,5 dan pc = 1,0). pm mendominasi: pindah kolom pm mengubah segalanya, pindah baris pc mengubah sedikit. pc = 0 dan pm = 0 memberi 770 (tidak ada yang berubah).' },
      { h: 'Elitisme dan replacement', tabel: { head: ['Strategi', 'Yang terjadi tiap generasi', 'Diganti (populasi 10)', 'Efek'], rows: [
        ['Generational', 'Seluruh populasi diganti offspring', '10 (100%)', 'Eksplorasi maksimal, solusi baik bisa hilang'],
        ['Elitist generational', 'Diganti semua kecuali k terbaik', '8 (k = 2)', 'Default umum, seimbang'],
        ['Steady-state', 'Hanya 1-2 individu diganti', '2', 'Bahan baru cepat menyebar, diversitas cepat habis'],
        ['Replace-worst', 'Offspring masuk jika mengalahkan yang terburuk', '1', 'Tekanan seleksi sangat tinggi, konvergen prematur']] },
        ingat: 'Tanpa elitisme kurva konflik terbaik naik turun; dengan k = 2 kurvanya monoton dan hasil akhirnya lebih baik (598 vs 613).' },
      { h: 'Kriteria berhenti', poin: [
        'Generation cap: berhenti setelah jumlah generasi tertentu (misalnya 80 atau 120).',
        'Convergence: berhenti jika tidak ada perbaikan selama sejumlah generasi (misalnya 20).',
        'Target value: berhenti jika solusi sudah cukup baik (misalnya f ≥ 43 atau konflik < 600).',
        'Biasanya dipakai bersamaan; yang pertama terpenuhi menghentikan pencarian.',
        'Pada jadwal 600 generasi, 90% perbaikan terjadi di 100 generasi pertama. Berhenti di generasi 200 hanya kehilangan 3% kualitas tetapi menghemat dua pertiga waktu.'
      ] }
    ]
  },
  {
    label: 'Materi 2 · GA (Week 3)', judul: 'Contoh Satu Generasi Lengkap (Biner)',
    ringkas: 'Contoh slide minggu 3: empat kromosom 5 bit pada domain [0, 10], dari evaluasi sampai populasi baru.',
    bagian: [
      { h: 'Langkah 1-3: evaluasi, probabilitas, seleksi', tabel: { head: ['Kromosom', 'd', 'x', 'f(x)', 'P', 'Kumulatif'], rows: [
        ['01100', '12', '3,871', '0,2986', '0,0753', '0,0753'],
        ['11001', '25', '8,065', '1,7943', '0,4522', '0,5275'],
        ['00110', '6', '1,935', '1,3449', '0,3390', '0,8664'],
        ['10010', '18', '5,806', '0,5299', '0,1336', '1,0000']] },
        wheel: { items: [{ label: '01100', p: 0.0753 }, { label: '11001', p: 0.4522 }, { label: '00110', p: 0.3390 }, { label: '10010', p: 0.1335 }], r: [0.72, 0.31, 0.05, 0.95] },
        poin: ['r = 0,72 → 00110, r = 0,31 → 11001: pasangan 1 = (00110, 11001).', 'r = 0,05 → 01100, r = 0,95 → 10010: pasangan 2 = (01100, 10010).'] },
      { h: 'Langkah 4-5: crossover dan mutasi', genes: { rows: [
        { label: 'Pasangan 1', genes: '00110', mark: [1, 2, 3], note: '× 11001, potong setelah bit 3' },
        { label: 'O1', genes: '00101', mark: [1, 2, 3], mark2: [4, 5] }, { label: 'O2', genes: '11010', mark2: [1, 2, 3], mark: [4, 5] },
        { label: 'Pasangan 2', genes: '01100', mark: [1, 2], note: '× 10010, potong setelah bit 2' },
        { label: 'O3', genes: '01010', mark: [1, 2], mark2: [3, 4, 5] }, { label: 'O4', genes: '10100', mark2: [1, 2], mark: [3, 4, 5] },
        { label: 'O1 mutasi', genes: '01101', mark: [2], note: 'gen 2 dibalik: f 1,1781 → 0,5025' },
        { label: 'O4 mutasi', genes: '10110', mark: [4], note: 'gen 4 dibalik: f 0,3809 → 0,9686' }] } },
      { h: 'Langkah 6: elitisme dan populasi baru', tabel: { head: ['Kromosom', 'f(x)', 'Status'], rows: [
        ['01101', '0,5025', 'Dipertahankan'], ['11010', '1,6040', 'Dipertahankan'], ['01010', '0,3747', 'Terburuk, diganti'],
        ['10110', '0,9686', 'Dipertahankan'], ['11001', '1,7943', 'Elit (k = 1) dari populasi lama']] },
        poin: ['Populasi baru: 11001, 01101, 11010, 10110.', 'Rata-rata fitness 0,9919 → 1,2173; fitness terbaik tetap 1,7943 karena dijaga elitisme.',
          'Mutasi bisa merugikan (O1 turun) atau menyelamatkan (O4 naik dan lolos dari penggantian).'] }
    ]
  },
  {
    label: 'Materi 2 · GA (Week 3)', judul: 'Studi Kasus Jadwal Ujian dengan GA',
    ringkas: 'Delapan ujian (A-H) ke empat slot, satu generasi penuh dari slide minggu 3, lalu masalah konstanta fitness dan constraint ruang.',
    bagian: [
      { h: 'Encoding jadwal', genes: { pos: true, rows: [{ label: 'Ujian', genes: 'ABCDEFGH' }, { label: 'T2', genes: '22134143', note: 'gen = slot ujian' }] },
        poin: [
          'Encoding integer panjang 8, alel {1, 2, 3, 4}: posisi = ujian, nilai gen = slot. Tidak perlu dekode.',
          'Biner hanya pas jika jumlah slot pangkat 2 (8 slot = 3 bit); 7 slot akan menyisakan kode tidak valid. Integer langsung menyimpan nomor slot.',
          'Bukan permutasi: beberapa ujian boleh berbagi slot, tidak ada aturan "tepat sekali".',
          'Ruang pencarian tidak berubah: 30 ujian × 8 slot tetap 8^30 ≈ 1,24 × 10^27.'
        ] },
      { h: 'Seleksi: fitness = 30 − konflik', tabel: { head: ['Jadwal', 'Kromosom (A..H)', 'Konflik', 'Fitness', 'P', 'Kumulatif'], rows: [
        ['T1', '1 2 3 4 1 2 3 4', '26', '4', '0,2222', '0,2222'], ['T2', '2 2 1 3 4 1 4 3', '23', '7', '0,3889', '0,6111'],
        ['T3', '3 1 4 2 3 4 1 2', '28', '2', '0,1111', '0,7222'], ['T4', '1 4 2 2 3 1 3 4', '25', '5', '0,2778', '1,0000']] },
        wheel: { items: [{ label: 'T1', p: 0.2222 }, { label: 'T2', p: 0.3889 }, { label: 'T3', p: 0.1111 }, { label: 'T4', p: 0.2778 }], r: [0.45, 0.9, 0.1, 0.65] },
        ingat: 'T2 terbaik tetapi peluangnya hanya 39%. Itu bukan cacat: jadwal lain tetap diberi kesempatan supaya diversitas terjaga.' },
      { h: 'Satu generasi penuh', tabel: { head: ['Langkah', 'Yang terjadi', 'Hasil'], rows: [
        ['Seleksi', 'Roulette dengan r = 0,45; 0,90; 0,10; 0,65', 'Pasangan 1 = (T2, T4), pasangan 2 = (T1, T3)'],
        ['Crossover', 'Single-point: pasangan 1 setelah gen 4, pasangan 2 setelah gen 6', 'O1 = 18, O2 = 22, O3 = 40, O4 = 27 konflik'],
        ['Mutasi', 'Gen 5 O1 → slot 2; gen 7 O4 → slot 1', 'O1: 18 → 25 (memburuk), O4: 27 → 22 (membaik)'],
        ['Elitisme k = 1', 'Offspring terburuk O3 (40) diganti T2 (23)', 'Populasi baru: T2 = 23, O1 = 25, O2 = 22, O4 = 22'],
        ['Ringkasan', 'Rata-rata konflik 25,50 → 23,00; terbaik 23 → 22', 'Biaya: 8 evaluasi jadwal']] } },
      { h: 'Crossover pada jadwal', genes: { pos: true, rows: [
        { label: 'T2', genes: '22134143', mark: [1, 2, 3, 4] }, { label: 'T4', genes: '14223134', mark2: [5, 6, 7, 8] },
        { label: 'O1', genes: '22133134', mark: [1, 2, 3, 4], mark2: [5, 6, 7, 8], note: '18 konflik, lebih baik dari kedua induk' },
        { label: 'O2', genes: '14224143', mark2: [1, 2, 3, 4], mark: [5, 6, 7, 8], note: '22 konflik' }] },
        ingat: 'Setiap nomor slot sah di posisi mana pun, jadi offspring jadwal tidak perlu repair. Crossover bisa menghasilkan anak yang lebih baik dari kedua induk dengan menggabungkan bagian baiknya.' },
      { h: 'Masalah konstanta C pada fitness = C − konflik', tabel: { head: ['C', 'Fitness T1-T4', 'P T1-T4', 'Terbaik/terburuk'], rows: [
        ['30', '4, 7, 2, 5', '22,2%, 38,9%, 11,1%, 27,8%', '3,5×'], ['45', '19, 22, 17, 20', '24,4%, 28,2%, 21,8%, 25,6%', '1,3×']] },
        poin: ['Offspring dengan 40 konflik memberi fitness 30 − 40 = −10: roulette tidak bisa memakai nilai negatif.',
          'C = 45 aman, tetapi tekanan seleksi turun dan seleksi hampir acak.', 'C besar: aman tapi lambat. C kecil: kuat tapi berisiko. Alternatif: 1/(1 + konflik), tournament, atau rank-based.'] },
      { h: 'Constraint ruang (minggu 5): maksimal 2 ujian per slot', poin: [
        'Ini hard constraint: jadwal dengan 3 ujian di satu slot tidak bisa dijalankan.',
        'Dari T2, O1, O2, O4 hanya T2 yang feasible; tiga lainnya masing-masing 1 pelanggaran.',
        'Rejection: buang O1, O2, O4, tiga dari empat evaluasi terbuang. Repair: pindah ujian A dari slot 2 ke slot kosong memberi 13 konflik, terbaik sejauh ini.',
        'Penalty: fitness = (45 − konflik) − w × pelanggaran. w = 5: 22, 15, 18, 18 (infeasible masih bersaing). w = 10: 22, 10, 13, 13 (seimbang). w = 25: 22, −5, −2, −2 (sama dengan rejection).'
      ] }
    ]
  },
  {
    label: 'Materi 3 · Week 5', judul: 'Masalah Kombinatorial vs Non-kombinatorial',
    ringkas: 'Kombinatorial: jawabannya susunan, subset, atau penugasan. Non-kombinatorial: jawabannya nilai kontinu.',
    bagian: [
      { h: 'Perbedaan', tabel: { head: ['', 'Kombinatorial', 'Non-kombinatorial'], rows: [
        ['Bentuk solusi', 'Susunan (permutasi), subset, atau penugasan elemen diskrit', 'Titik pada ruang kontinu (bilangan real)'],
        ['Contoh', 'TSP, knapsack, job scheduling, timetabling', 'Mencari x maksimum f(x), menyetel parameter PID'],
        ['Encoding', 'Permutasi, biner (subset), integer', 'Real, atau biner yang didekode'],
        ['Gradien', 'Tidak ada; solusi hanya bisa dibandingkan', 'Kadang ada, tetapi metaheuristik tetap dipakai jika black box'],
        ['Operator', 'Harus menjaga validitas (PMX, OX, swap, inversion)', 'Crossover potong, uniform, arithmetic; mutasi kecil (creep/gaussian)']] } },
      { h: 'Tiga masalah kombinatorial utama', tabel: { head: ['Masalah', 'Tujuan', 'Encoding', 'Ukuran ruang'], rows: [
        ['Travelling Salesman (TSP)', 'Kunjungi tiap kota sekali, kembali ke awal, jarak minimum', 'Permutasi, misalnya 2 5 1 4 3 6', 'n!'],
        ['Knapsack', 'Pilih barang, nilai maksimum tanpa melebihi kapasitas', 'Biner (bawa/tidak)', '2^n'],
        ['Job scheduling', 'Tugaskan dan urutkan pekerjaan di mesin, waktu selesai minimum', 'Permutasi + penugasan, misalnya 2A 1B 4A', 'n! × m^n']] },
        ingat: '20 kota sudah 20! ≈ 2,4 × 10^18 tur. Enumerasi bukan lambat, tetapi mustahil.' },
      { h: 'Mengapa crossover biner rusak pada permutasi', genes: { pos: true, rows: [
        { label: 'P1', genes: 'ABCDEF', mark: [1, 2, 3] }, { label: 'P2', genes: 'CFEBDA', mark2: [4, 5, 6] },
        { label: 'C1', genes: 'ABCBDA', mark: [1, 2, 3], mark2: [4, 5, 6], note: 'A dan B dua kali, E dan F hilang' },
        { label: 'C2', genes: 'CFEDEF', mark2: [1, 2, 3], mark: [4, 5, 6], note: 'E dan F dua kali, A dan B hilang' }] },
        poin: ['Single-point crossover mengabaikan syarat "tiap kota tepat sekali", jadi offspring bukan tur sama sekali.',
          'Pada knapsack biner, crossover yang sama selalu sah strukturnya; yang mungkin dilanggar hanya kapasitas.',
          'Solusi: operator khusus permutasi (PMX, OX, cycle crossover; mutasi swap, insertion, inversion) atau repair.'] },
      { h: 'Permutasi: banyak kromosom untuk satu tur', poin: [
        'A B C D E F, B C D E F A (titik awal lain), dan F E D C B A (arah terbalik) adalah tur yang sama.',
        'Satu tur n kota ditulis oleh 2n kromosom: 6 kota → 12 kromosom, jadi 720 permutasi hanya 60 tur unik.',
        'Dua induk yang tampak berbeda bisa ternyata tur yang sama, dan crossover keduanya tidak menghasilkan apa-apa.'
      ] },
      { h: 'Constraint pada masalah kombinatorial', tabel: { head: ['Strategi', 'Cara', 'Pilih jika'], rows: [
        ['Rejection', 'Buang kromosom infeasible, buat lagi', 'Sebagian besar kromosom acak sudah feasible'],
        ['Repair', 'Ubah sampai feasible (buang barang, pindah ujian)', 'Ada perbaikan murah dan jelas'],
        ['Penalty', 'Simpan, kurangi fitness sebanding pelanggaran', 'Solusi feasible langka, atau optimum tepat di batas constraint']] },
        poin: ['Hard constraint (harus dipenuhi): dua ujian satu ruang, pengawas di dua tempat, melebihi kursi. Ditangani rejection atau repair.',
          'Soft constraint (sebaiknya dipenuhi): ujian sebaiknya selesai sebelum 16.00. Masuk ke objective/penalty.',
          '"Total bentrok sekecil mungkin" bukan constraint, melainkan objective.',
          'Knapsack 60 kg dengan optimum tepat di batas: repair merusak informasi, penalty terbaik (380 − 6×30 = 200; 320 − 6×8 = 272).'] }
    ]
  },
  {
    label: 'Materi 3 · Week 5', judul: 'Crossover Permutasi: PMX dan OX',
    ringkas: 'Dua cara membuat offspring permutasi yang valid. PMX menjaga posisi, OX menjaga urutan.',
    bagian: [
      { h: 'Partially Mapped Crossover (PMX)', soal: 'P1 = A B C D E F, P2 = C F E B D A, segmen posisi 3-4. Buat offspring PMX.',
        genes: { pos: true, rows: [
          { label: 'P1', genes: 'ABCDEF', mark: [3, 4] }, { label: 'P2', genes: 'CFEBDA', mark2: [3, 4] },
          { label: 'Langkah 1', genes: ['-', '-', 'C', 'D', '-', '-'], mark: [3, 4], note: 'salin segmen P1' },
          { label: 'Offspring', genes: 'EFCDBA', mark: [3, 4], mark2: [1, 5], note: 'posisi 1 dan 5 lewat mapping' }] },
        poin: [
          'Langkah 1: salin segmen P1 (C D) ke posisi yang sama.',
          'Langkah 2: buat mapping dari segmen: C ↔ E dan D ↔ B (P1 segmen ↔ P2 segmen).',
          'Langkah 3: isi posisi lain dengan gen P2 di posisi yang sama. Posisi 2 = F dan posisi 6 = A langsung masuk.',
          'Jika gen P2 sudah ada di segmen, ikuti mapping: posisi 1, P2 = C → E. Posisi 5, P2 = D → B.',
          'Jika hasil mapping masih ada di segmen, ikuti mapping lagi (rantai) sampai mendapat gen yang belum dipakai.',
          'Hasil: E F C D B A.'
        ] },
      { h: 'Order Crossover (OX)', soal: 'P1 = A B C D E F, P2 = C F E B D A, segmen posisi 3-4. Buat offspring OX.',
        genes: { pos: true, rows: [
          { label: 'P1', genes: 'ABCDEF', mark: [3, 4] }, { label: 'P2', genes: 'CFEBDA' },
          { label: 'Baca P2', genes: 'DACFEB', note: 'mulai posisi 5, melingkar' },
          { label: 'Sisa', genes: 'AFEB', mark2: [1, 2, 3, 4], note: 'buang C dan D' },
          { label: 'Offspring', genes: 'EBCDAF', mark: [3, 4], mark2: [1, 2, 5, 6], note: 'isi posisi 5, 6, 1, 2' }] },
        poin: [
          'Langkah 1: salin segmen P1 (C D) ke posisi 3-4.',
          'Langkah 2: baca P2 mulai dari posisi setelah segmen (posisi 5) dan melingkar: D A C F E B.',
          'Langkah 3: buang gen yang sudah ada di segmen (C, D): A F E B.',
          'Langkah 4: isi posisi kosong mulai setelah segmen, melingkar (5, 6, 1, 2) dengan urutan itu: E B C D A F.'
        ] },
      { h: 'Perbandingan', tabel: { head: ['', 'PMX', 'OX'], rows: [
        ['Yang dijaga', 'Posisi absolut gen', 'Urutan relatif gen'],
        ['Cocok untuk', 'Penugasan, timetabling ("job 3 dikerjakan di slot 5")', 'TSP, routing, sequencing ("kota B tepat setelah A")'],
        ['Mekanisme perbaikan', 'Mapping antara dua segmen', 'Tidak perlu: sisa diisi berurutan'],
        ['Contoh hasil (P1 ABCDEF, P2 CFEBDA)', 'E F C D B A', 'E B C D A F']] },
        ingat: 'Pertanyaan panduan: jika seluruh urutan digeser satu posisi, apakah solusinya memburuk? Jika tidak, posisi tidak penting, pakai OX.' },
      { h: 'Operator ketiga: Cycle Crossover', poin: [
        'Setiap gen mempertahankan posisi yang dimilikinya di salah satu induk.',
        'Telusuri siklus: mulai posisi 1, P1 = A dan P2 = C; cari C di P1, dan seterusnya sampai kembali ke A.',
        'Jika siklus mencakup semua posisi (seperti P1 ABCDEF dan P2 CFEBDA), offspring = salinan P1: mixing sangat rendah.'
      ] },
      { h: 'Latihan slide: Recombine Two Tours', soal: 'P1 = C A B D E F, P2 = A F C D B E, segmen posisi 3-4.',
        poin: ['OX: baca P2 dari posisi 5: B E A F C D. Buang B dan D: E A F C. Isi posisi 5, 6, 1, 2 → F C B D E A.',
          'PMX: segmen P1 = B D, segmen P2 = C D, mapping B ↔ C dan D ↔ D. Posisi 1 = A, posisi 2 = F, posisi 5: P2 = B ada di segmen → C, posisi 6 = E → A F B D C E.',
          'Segmennya sama, tetapi sisanya berbeda karena cara mengambil gen dari P2 berbeda.'] }
    ]
  },
  {
    label: 'Materi 3 · Week 5', judul: 'GA untuk Travelling Salesman Problem',
    ringkas: 'Rangkaian lengkap: encoding permutasi, fitness 1/panjang, seleksi, OX, mutasi inversion, elitisme.',
    bagian: [
      { h: 'Desain GA untuk TSP', tabel: { head: ['Komponen', 'Pilihan', 'Alasan'], rows: [
        ['Encoding', 'Permutasi kota', 'Setiap kota muncul tepat sekali'],
        ['Fitness', '1 / panjang tur (atau tournament langsung membandingkan panjang)', 'TSP minimasi, roulette butuh fitness besar untuk tur pendek'],
        ['Seleksi', 'Tournament atau roulette', 'Tournament tidak peka skala; 1/L membuat peluang roulette sangat mirip'],
        ['Crossover', 'Order Crossover (OX)', 'Menjaga urutan relatif kota yang bersebelahan'],
        ['Mutasi', 'Inversion (2-opt)', 'Memutus ruas paling sedikit'],
        ['Replacement', 'Elitisme k = 1-2', 'Tur terbaik tidak hilang']] } },
      { h: 'Menghitung panjang tur', soal: 'Jarak: AB 7, AC 9, AD 8, AE 5, BC 4, BD 6, BE 9, CD 3, CE 7, DE 4. Berapa panjang tur A B D C E?',
        poin: ['Jumlahkan ruas berurutan, termasuk ruas terakhir kembali ke kota awal: A-B 7 + B-D 6 + D-C 3 + C-E 7 + E-A 5 = 28.',
          'Fitness = 1/28 = 0,03571. Tur yang lebih pendek mendapat fitness lebih besar.'] },
      { h: 'Mutasi permutasi', genes: { pos: true, rows: [
        { label: 'Awal', genes: 'ABCDEF' },
        { label: 'Swap 2,5', genes: 'AECDBF', mark: [2, 5], note: 'putus 4 ruas' },
        { label: 'Insertion', genes: 'ACDEBF', mark: [5], note: 'B dipindah ke posisi 5, putus 3 ruas' },
        { label: 'Inversion 2-5', genes: 'AEDCBF', mark: [2, 3, 4, 5], note: 'putus 2 ruas' }] },
        tabel: { head: ['Operator', 'Ruas putus', 'Panjang rata-rata (40 kota, 6.000 evaluasi)'], rows: [['Swap', '4', '730'], ['Insertion', '3', '616'], ['Inversion', '2', '562']] },
        ingat: 'Pada TSP simetris arah di dalam segmen tidak berpengaruh, jadi inversion hanya mengubah dua ruas di ujung segmen. Operator yang paling sedikit merusak struktur menemukan tur terpendek.' },
      { h: 'Studi kasus slide', poin: [
        'Six Deliveries: P1 = A F C D B E (37,4) dan P2 = C A B D E F (35,5) dengan OX menghasilkan O1 = A B C D E F (24,5), tur optimal dan lebih baik dari kedua induk.',
        'Tabu Search (2-opt, tenure 25) mengalahkan GA pertama (roulette, tanpa elitisme, mutasi rendah): 572 vs 1.490.',
        'GA yang di-tuning (tournament, elitism, inversion 0,2) mencapai 567, setara Tabu 572. Perbandingan adil hanya jika kedua metode diberi kesempatan yang sama.'
      ] }
    ]
  },
  {
    label: 'Materi 3 · Week 5', judul: 'Tabu Search',
    ringkas: 'Local search satu solusi yang melarang dirinya mengulang langkah terakhir.',
    bagian: [
      { h: 'Ide dasar', poin: [
        'Trajectory-based seperti Hill Climbing, tetapi punya memori: move yang baru dilakukan dilarang (tabu) selama tenure iterasi.',
        'Selalu pindah ke tetangga terbaik yang tidak tabu, walaupun memburuk; ini yang memaksanya keluar dari local optimum.',
        'Aspiration: move tabu tetap boleh jika menghasilkan solusi lebih baik dari best known.',
        'Simulated Annealing lolos dari local optimum karena peluang; Tabu Search karena aturan.'
      ] },
      { h: 'Tenure', poin: [
        'Tenure = 1 setara steepest-descent hill climbing (hanya backtracking langsung yang dilarang).',
        'Tenure terlalu pendek: cycling, panjang tur berosilasi di dua nilai. Tenure terlalu panjang (misalnya 5.000): hampir semua move tabu, pencarian tercekik.',
        'Studi kasus 25 kota: tanpa memori 442,7, tenure 20 mencapai 434,8, lebih dari 20 sudah datar.'
      ] },
      { h: 'Tabu Search vs GA', tabel: { head: ['', 'Tabu Search', 'Genetic Algorithm'], rows: [
        ['Solusi hidup', 'Satu', 'Satu populasi'], ['Lolos local optimum', 'Memori move terakhir', 'Diversitas dan mutasi'],
        ['Struktur masalah', 'Sangat dipakai (move operator spesifik)', 'Sedikit (operator generik)'], ['Paralel', 'Sulit', 'Alami']] } }
    ]
  },
  {
    label: 'Materi 4 · Week 6', judul: 'Multi-Objective GA (MOGA) dan NSGA-II',
    ringkas: 'Dua tujuan yang bertentangan menghasilkan sekumpulan solusi kompromi, bukan satu solusi terbaik.',
    bagian: [
      { h: 'Dominasi dan Pareto optimal', soal: 'Paket wisata: A (biaya 100, 2 tempat), B (150, 5), C (200, 4), D (120, 3). Minimalkan biaya, maksimalkan jumlah tempat.',
        poin: [
          'X mendominasi Y jika X tidak lebih buruk di semua objektif dan lebih baik di minimal satu objektif.',
          'B mendominasi C: lebih murah (150 < 200) dan lebih banyak tempat (5 > 4).',
          'A, B, D tidak saling mendominasi: A paling murah, B paling banyak tempat, D di tengah.',
          'Pareto optimal (front 1) = A, B, D. Pilihan akhir tergantung prioritas pengambil keputusan.'
        ] },
      { h: 'GA vs MOGA', tabel: { head: ['Aspek', 'GA', 'MOGA'], rows: [
        ['Jumlah tujuan', 'Umumnya satu', 'Dua atau lebih'], ['Evaluasi', 'Satu fungsi objektif', 'Beberapa fungsi objektif'],
        ['Solusi akhir', 'Satu solusi terbaik', 'Sekumpulan solusi Pareto'], ['Contoh', 'Minimalkan biaya', 'Minimalkan biaya sekaligus waktu']] } },
      { h: 'Langkah NSGA-II', poin: [
        'Evaluate kedua objektif, lalu non-dominated sorting: front 1 = tidak didominasi siapa pun (n_p = 0), lalu front 2, dan seterusnya.',
        'Crowding distance per front untuk menjaga sebaran: CD_i = Σ (f(i+1) − f(i−1)) / (f_max − f_min) per objektif; ujung front = ∞.',
        'Seleksi binary tournament: rank lebih kecil menang; jika rank sama, crowding lebih besar menang.',
        'Crossover dan mutasi, lalu gabungkan induk + offspring (2N) dan isi N dengan front utuh. Front yang meluap dipotong berdasarkan crowding.',
        'Berhenti: jumlah generasi maksimum, front berhenti membaik, atau batas waktu. Hasil = front 1 generasi terakhir atau external archive.'
      ] },
      { h: 'Contoh crowding distance (wisata, front 1)', tabel: { head: ['Solusi', 'CD biaya', 'CD jumlah tempat', 'Total CD'], rows: [
        ['P1 (40, 1)', '∞', '∞', '∞'], ['P2 (50, 2)', '(90 − 40)/140 = 0,357', '(3 − 1)/4 = 0,500', '0,857'],
        ['Q3 (90, 3)', '(140 − 50)/140 = 0,643', '(4 − 2)/4 = 0,500', '1,143'], ['Q1 (140, 4)', '(180 − 90)/140 = 0,643', '(5 − 3)/4 = 0,500', '1,143'], ['P4 (180, 5)', '∞', '∞', '∞']] },
        ingat: 'Front 1 berisi 5 kandidat tetapi populasi hanya 4: P2 dibuang karena crowding terkecil. Populasi baru P1, Q3, Q1, P4.' }
    ]
  },
  {
    label: 'Materi 4 · Week 6', judul: 'NSGA-II Langkah demi Langkah (Jadwal, Slide Week 6)',
    ringkas: 'Delapan langkah satu generasi pada enam jadwal: f1 = slot terpakai, f2 = bentrok, keduanya diminimalkan.',
    bagian: [
      { h: 'Definisi yang dipakai di soal', tabel: { head: ['Istilah', 'Arti'], rows: [
        ['Objective vector', 'Pasangan (f1, f2) satu solusi, misalnya P2 = (5, 27)'],
        ['A mendominasi B', 'A tidak lebih buruk di SEMUA objektif DAN lebih baik di minimal SATU. Seri di satu objektif tetap bisa mendominasi: (3, 44) mendominasi (3, 45)'],
        ['Incomparable', 'Tidak ada yang mendominasi: (5, 27) vs (3, 44). Solusi identik (4, 41) vs (4, 41) juga tidak saling mendominasi'],
        ['n_p dan S_p', 'n_p = berapa solusi yang mendominasi p; S_p = himpunan solusi yang didominasi p'],
        ['Front dan rank', 'Front 1 = n_p = 0. Hapus front 1, kurangi n_q untuk setiap q di S_p, baca front 2, dan seterusnya. Rank = nomor front'],
        ['Crowding distance', 'Per front dan per objektif: urutkan, ujung = ∞, interior += (f[i+1] − f[i−1]) / (f_max − f_min). Makin besar makin terisolasi']] } },
      { h: 'Langkah 1-3: evaluate, sort, crowd', tabel: { head: ['Solusi', '(f1, f2)', 'Didominasi oleh', 'n_p', 'S_p', 'Front', 'Crowding'], rows: [
        ['P1', '(4, 44)', 'P5, P6', '2', '-', '2', 'dihitung per front'], ['P2', '(5, 27)', '-', '0', '-', '1', '∞'],
        ['P3', '(3, 45)', 'P5', '1', 'P4', '2', ''], ['P4', '(3, 49)', 'P3, P5', '2', '-', '3', ''],
        ['P5', '(3, 44)', '-', '0', 'P1, P3, P4', '1', '∞'], ['P6', '(4, 41)', '-', '0', 'P1', '1', '(5 − 3)/2 + (44 − 27)/17 = 2,0000']] },
        ingat: 'Front 1 = {P2, P5, P6}, front 2 = {P1, P3}, front 3 = {P4}. P6 satu-satunya interior di front 1 dan tepat di tengah tetangganya pada kedua sumbu, jadi 1,0 + 1,0.' },
      { h: 'Langkah 4-5: select dan vary', poin: [
        'Binary tournament: A menang jika rank(A) < rank(B); jika rank sama, crowding(A) > crowding(B).',
        'Contoh slide: P4 vs P1 → P1 (rank 2 < 3). P2 vs P6 → P2 (rank seri, ∞ > 2,0). P5 vs P3 → P5. P3 vs P2 → P2. P1 vs P5 → P5. Induk: (P1, P2), (P5, P2), (P5, P6).',
        'Crossover single-point dan mutasi satu gen reset, sama seperti Week 3 dan 5. Offspring: O1 (4, 42), O2 (5, 36), O3 (5, 45), O4 (3, 29), O5 (3, 59), O6 (4, 33). Mutasi gen 2 O1 (4 → 5) memperbaiki bentrok 42 → 37.'
      ] },
      { h: 'Langkah 6-8: combine, sort again, fill', tabel: { head: ['Front pool 12', 'Anggota', 'Ukuran', 'Total', 'Keputusan'], rows: [
        ['F1', 'P2 (5, 27), O4 (3, 29)', '2', '2', 'Masuk semua'],
        ['F2', 'O6 (4, 33), P5 (3, 44)', '2', '4', 'Masuk semua'],
        ['F3', 'O2 (5, 36), O1 (4, 37), P3 (3, 45)', '3', 'akan 7 > 6', 'Meluap, hanya 2 tempat: hitung crowding'],
        ['F4-F6', 'P6, P4, P1, O5, O3', '5', '-', 'Dibuang tanpa hitung crowding']] },
        poin: ['Crowding F3: P3 dan O2 ujung (∞). O1 = (5 − 3)/2 + (45 − 36)/9 = 1,0 + 1,0 = 2,0000 → O1 dibuang walaupun tidak didominasi siapa pun di front itu.',
          'Generasi baru: P2, O4, O6, P5, O2, P3. Pada 3 slot, bentrok terbaik turun dari 44 ke 29.',
          'Elitisme NSGA-II: induk dan offspring bersaing di pool 2N, tanpa parameter k.'] },
      { h: 'Lima kesalahan yang mengurangi nilai', poin: [
        'Menghitung crowding dengan rentang seluruh populasi, padahal rentang per front.',
        'Lupa bahwa seri di satu objektif tetap bisa mendominasi.',
        'Memakai crowding sebelum rank; crowding hanya pemecah seri rank.',
        'Mengganti induk dengan offspring langsung; NSGA-II menggabung 2N lalu memilih N.',
        'Menghitung crowding untuk front yang tidak meluap (kerja sia-sia).'
      ], ingat: 'Self-check Week 6: hanya pernyataan "setiap solusi di front 1 incomparable terhadap solusi lain di front 1" yang benar.' },
      { h: 'Membaca hasil dan weighted sum', poin: [
        'NSGA-II mengembalikan pilihan (front), bukan satu jawaban. Keputusan diambil setelah pencarian (a posteriori).',
        'Front sejati: 1 slot/179, 2/49, 3/13, 4/4, 5/0. Penghematan per tambahan slot 130, 36, 9, 4. Knee point = 3 slot.',
        'Weighted sum: skor = w·slot + (1 − w)·bentrok. w harus dipilih sebelum trade-off terlihat, dan pada front cekung sebagian solusi tidak pernah terpilih. Wajar jika nilai tukar diketahui (misalnya rupiah per slot).',
        'Skala nyata: N = 100, 30 gen, 250 generasi = 25.000 evaluasi; pool 200 butuh 19.900 perbandingan per sort.'
      ] }
    ]
  }
]);
