// Kecerdasan Artifisial — soal UTS KA 2025 (sama dengan LKS GA-2), soal mirip, Metaheuristic Search (Week 1),
// dan Multi-Objective Optimisation / NSGA-II (Week 6). Uraian bertahap seperti soal esai UTS.
// Semua angka dihitung dengan kode; soal UTS dan LKS tidak memberi kunci.

BANK.isian('ka', 'uts', 'Soal UTS 2025 (= LKS GA-2): GA untuk TSP', [
  { type: 'steps',
    q: 'Soal 1 UTS KA Ganjil 2025/2026 (sama dengan LKS GA-2). Peta 5 kota diberikan sebagai matriks ketetanggaan di bawah. Selesaikan TSP dengan algoritma genetika: populasi 4 individu, salesman boleh mulai dari kota mana pun, representasi permutasi (1 = A, 2 = B, 3 = C, 4 = D, 5 = E; kromosom 12345 berarti A→B→C→D→E→A), fitness = 1/(total jarak).',
    table: { head: ['', 'A', 'B', 'C', 'D', 'E'],
      rows: [
        ['A', '-', 8, 12, 6, 5],
        ['B', 8, '-', 7, 10, 13],
        ['C', 12, 7, '-', 4, 8],
        ['D', 6, 10, 4, '-', 9],
        ['E', 5, 13, 8, 9, '-']
      ] },
    steps: [
      { q: 'a. Hitung total jarak dan nilai fitness = 1/(total jarak) setiap kromosom (fitness 4 desimal). Ingat ruas terakhir kembali ke kota awal.',
        table: { head: ['Kromosom', 'Gen', 'Rute'],
          rows: [
            ['A1', '1 2 3 4 5', 'A→B→C→D→E→A'],
            ['A2', '2 4 1 3 5', 'B→D→A→C→E→B'],
            ['A3', '5 1 3 2 4', 'E→A→C→B→D→E'],
            ['A4', '3 2 1 4 5', 'C→B→A→D→E→C']
          ] },
        fields: [
          { label: 'Total jarak A1', a: 33, tol: 0 },
          { label: 'Fitness A1', a: 0.0303, tol: 0.0001 },
          { label: 'Total jarak A2', a: 49, tol: 0 },
          { label: 'Fitness A2', a: 0.0204, tol: 0.0001 },
          { label: 'Total jarak A3', a: 43, tol: 0 },
          { label: 'Fitness A3', a: 0.0233, tol: 0.0001 },
          { label: 'Total jarak A4', a: 38, tol: 0 },
          { label: 'Fitness A4', a: 0.0263, tol: 0.0001 }
        ],
        ex: 'A1: 8 + 7 + 4 + 9 + 5 = 33, fitness 1/33 = 0,0303. A2: 10 + 6 + 12 + 8 + 13 = 49, fitness 1/49 = 0,0204. A3: 5 + 12 + 7 + 10 + 9 = 43, fitness 1/43 = 0,0233. A4: 7 + 8 + 6 + 9 + 8 = 38, fitness 1/38 = 0,0263.' },
      { q: 'b. Hitung total fitness, proporsi roulette wheel (fitness/total, 2 desimal), dan batas atas rentang tiap kromosom. Batas bawah A1 = 0, batas atas A4 = 1. Tidak perlu diurutkan.',
        fields: [
          { label: 'Total fitness (4 desimal)', a: 0.1003, tol: 0.0002 },
          { label: 'Proporsi A1', a: 0.3, tol: 0.006 },
          { label: 'Proporsi A2', a: 0.2, tol: 0.006 },
          { label: 'Proporsi A3', a: 0.23, tol: 0.006 },
          { label: 'Proporsi A4', a: 0.26, tol: 0.006 },
          { label: 'Batas atas A1', a: 0.3, tol: 0.011 },
          { label: 'Batas atas A2', a: 0.51, tol: 0.011 },
          { label: 'Batas atas A3', a: 0.74, tol: 0.011 }
        ],
        ex: 'Total = 0,0303 + 0,0204 + 0,0233 + 0,0263 = 0,1003. Proporsi: A1 0,3022 ≈ 0,30, A2 0,2035 ≈ 0,20, A3 0,2319 ≈ 0,23, A4 0,2624 ≈ 0,26. Rentang: A1 [0,00 – 0,30), A2 [0,30 – 0,51), A3 [0,51 – 0,74), A4 [0,74 – 1,00). Jika tiap proporsi dibulatkan dulu lalu dijumlah, batas atas bisa beda 0,01; dua cara itu sama-sama diterima selama konsisten.' },
      { q: 'c. Pilih orang tua dengan nilai acak P1 = 0,201; 0,44; 0,876; 0,107 (urut P1 sampai P4). Kromosom terpilih adalah yang rentangnya memuat nilai acak.',
        fields: [
          { label: 'Parent1 (r = 0,201)', a: ['A1', '12345'] },
          { label: 'Parent2 (r = 0,44)', a: ['A2', '24135'] },
          { label: 'Parent3 (r = 0,876)', a: ['A4', '32145'] },
          { label: 'Parent4 (r = 0,107)', a: ['A1', '12345'] }
        ],
        ex: 'P1 = 0,201 → A1 (12345); P2 = 0,44 → A2 (24135); P3 = 0,876 → A4 (32145); P4 = 0,107 → A1 (12345).' },
      { q: 'd. Pasangkan Parent1–Parent2 dan Parent3–Parent4, lalu lakukan order crossover dengan TP1 = 2 dan TP2 = 4 (segmen = gen ke-3 sampai ke-4). Anak1 = segmen Parent1 + urutan Parent2, Anak2 = segmen Parent2 + urutan Parent1, begitu juga Anak3 dan Anak4.',
        fields: [
          { label: 'Anak1', a: '21345' },
          { label: 'Anak2', a: '24135' },
          { label: 'Anak3', a: '23145' },
          { label: 'Anak4', a: '21345' }
        ],
        ex: 'Anak1: segmen 3 4 dari A1; urutan A2 mulai gen ke-5: 5 2 4 1 3, buang segmen → 5 2 1; isi gen ke-5 dst. melingkar → 2 1 3 4 5. Anak2: segmen 1 3 dari A2; urutan A1 mulai gen ke-5: 5 1 2 3 4, buang segmen → 5 2 4; isi gen ke-5 dst. melingkar → 2 4 1 3 5. Anak3: segmen 1 4 dari A4; urutan A1 mulai gen ke-5: 5 1 2 3 4, buang segmen → 5 2 3; isi gen ke-5 dst. melingkar → 2 3 1 4 5. Anak4: segmen 3 4 dari A1; urutan A4 mulai gen ke-5: 5 3 2 1 4, buang segmen → 5 2 1; isi gen ke-5 dst. melingkar → 2 1 3 4 5.' },
      { q: 'e. Probabilitas mutasi = 0,2. Anak dimutasi jika nilai random < 0,2, dengan swap mutation pada indeks gen yang ditentukan.',
        table: { head: ['Anak', 'Nilai random', 'Indeks gen'],
          rows: [
            ['Anak1', '0,21', '1 dan 3'],
            ['Anak2', '0,54', '2 dan 4'],
            ['Anak3', '0,05', '1 dan 5'],
            ['Anak4', '0,19', '2 dan 3']
          ] },
        fields: [
          { label: 'Anak yang dimutasi (pisahkan spasi)', a: 'Anak3 Anak4', set: true },
          { label: 'Anak1 hasil mutasi', a: '21345' },
          { label: 'Anak2 hasil mutasi', a: '24135' },
          { label: 'Anak3 hasil mutasi', a: '53142' },
          { label: 'Anak4 hasil mutasi', a: '23145' }
        ],
        ex: 'Anak1: 0,21 ≥ 0,2, tetap 21345; Anak2: 0,54 ≥ 0,2, tetap 24135; Anak3: 0,05 < 0,2, tukar gen 1 dan 5: 23145 → 53142; Anak4: 0,19 < 0,2, tukar gen 2 dan 3: 21345 → 23145.' },
      { q: 'f. Generational replacement tanpa elitisme: keempat anak menggantikan seluruh populasi lama. Hitung total jarak dan fitness generasi baru.',
        fields: [
          { label: 'Total jarak Anak1', a: 46, tol: 0 },
          { label: 'Fitness Anak1', a: 0.0217, tol: 0.0001 },
          { label: 'Total jarak Anak2', a: 49, tol: 0 },
          { label: 'Fitness Anak2', a: 0.0204, tol: 0.0001 },
          { label: 'Total jarak Anak3', a: 49, tol: 0 },
          { label: 'Fitness Anak3', a: 0.0204, tol: 0.0001 },
          { label: 'Total jarak Anak4', a: 47, tol: 0 },
          { label: 'Fitness Anak4', a: 0.0213, tol: 0.0001 }
        ],
        ex: 'Anak1 B→A→C→D→E→B = 46, fitness 0,0217. Anak2 B→D→A→C→E→B = 49, fitness 0,0204. Anak3 E→C→A→D→B→E = 49, fitness 0,0204. Anak4 B→C→A→D→E→B = 47, fitness 0,0213. Rata-rata jarak 40,75 → 47,75.' },
      { q: 'g. Tuliskan jalur terbaik di generasi baru dan jalur terbaik yang pernah ditemukan selama proses (generasi awal + generasi baru), beserta total jaraknya.',
        fields: [
          { label: 'Jalur terbaik generasi baru', a: ['21345', 'BACDE', 'BACDEB'] },
          { label: 'Jaraknya', a: 46, tol: 0 },
          { label: 'Jalur terbaik selama proses', a: ['12345', 'ABCDE', 'ABCDEA'] },
          { label: 'Jarak terbaik selama proses', a: 33, tol: 0 }
        ],
        ex: 'Generasi baru: Anak1 = B→A→C→D→E→B (46). Tetapi A1 di generasi awal (A→B→C→D→E→A, 33) lebih pendek dan hilang karena tidak ada elitisme. Jawaban "jalur paling optimal yang didapatkan" = A→B→C→D→E→A = 33; sebutkan juga bahwa generasi baru justru memburuk. Optimum sebenarnya (dicek dengan mencoba semua permutasi) = 33.' },
      { q: 'Jelaskan apa yang terjadi jika dipakai elitisme k = 1, dan mengapa jawaban g bergantung pada ada tidaknya elitisme.',
        points: [
          'Elitisme k = 1 menyalin kromosom terbaik generasi lama (jarak terpendek) ke generasi baru tanpa diubah',
          'Kromosom terbaik menggantikan anak terburuk (jarak terpanjang)',
          'Tanpa elitisme solusi terbaik bisa hilang, sehingga kurva jarak terbaik bisa naik',
          'Di soal ini rute terbaik (33) hilang di generasi baru, jadi jawaban g adalah rute generasi awal'
        ] }
    ],
    ex: 'Soal asli UTS 2025 dan LKS GA-2; kunci dihitung sendiri dengan kode karena dokumen tidak memberi kunci.' }
]);

BANK.isian('ka', 'mtsp', 'Mirip UTS 2025: GA untuk TSP', [
  { type: 'steps',
    q: 'Kurir ekspedisi di Bandung melayani 5 titik antar: A (gudang Gedebage), B (Dago), C (Cihampelas), D (Buahbatu), E (Pasteur). Jarak (km) pada matriks. Selesaikan TSP dengan algoritma genetika: populasi 4, mulai dari titik mana pun, representasi permutasi (1 = A sampai 5 = E), fitness = 1/(total jarak).',
    table: { head: ['', 'A', 'B', 'C', 'D', 'E'],
      rows: [
        ['A', '-', 12, 11, 4, 12],
        ['B', 12, '-', 3, 6, 9],
        ['C', 11, 3, '-', 10, 6],
        ['D', 4, 6, 10, '-', 15],
        ['E', 12, 9, 6, 15, '-']
      ] },
    steps: [
      { q: 'a. Hitung total jarak dan nilai fitness = 1/(total jarak) setiap kromosom (fitness 4 desimal). Ingat ruas terakhir kembali ke kota awal.',
        table: { head: ['Kromosom', 'Gen', 'Rute'],
          rows: [
            ['A1', '2 3 4 1 5', 'B→C→D→A→E→B'],
            ['A2', '1 2 5 3 4', 'A→B→E→C→D→A'],
            ['A3', '5 4 1 3 2', 'E→D→A→C→B→E'],
            ['A4', '4 5 2 1 3', 'D→E→B→A→C→D']
          ] },
        fields: [
          { label: 'Total jarak A1', a: 38, tol: 0 },
          { label: 'Fitness A1', a: 0.0263, tol: 0.0001 },
          { label: 'Total jarak A2', a: 41, tol: 0 },
          { label: 'Fitness A2', a: 0.0244, tol: 0.0001 },
          { label: 'Total jarak A3', a: 42, tol: 0 },
          { label: 'Fitness A3', a: 0.0238, tol: 0.0001 },
          { label: 'Total jarak A4', a: 57, tol: 0 },
          { label: 'Fitness A4', a: 0.0175, tol: 0.0001 }
        ],
        ex: 'A1: 3 + 10 + 4 + 12 + 9 = 38, fitness 1/38 = 0,0263. A2: 12 + 9 + 6 + 10 + 4 = 41, fitness 1/41 = 0,0244. A3: 15 + 4 + 11 + 3 + 9 = 42, fitness 1/42 = 0,0238. A4: 15 + 9 + 12 + 11 + 10 = 57, fitness 1/57 = 0,0175.' },
      { q: 'b. Hitung total fitness, proporsi roulette wheel (fitness/total, 2 desimal), dan batas atas rentang tiap kromosom. Batas bawah A1 = 0, batas atas A4 = 1. Tidak perlu diurutkan.',
        fields: [
          { label: 'Total fitness (4 desimal)', a: 0.0921, tol: 0.0002 },
          { label: 'Proporsi A1', a: 0.29, tol: 0.006 },
          { label: 'Proporsi A2', a: 0.26, tol: 0.006 },
          { label: 'Proporsi A3', a: 0.26, tol: 0.006 },
          { label: 'Proporsi A4', a: 0.19, tol: 0.006 },
          { label: 'Batas atas A1', a: 0.29, tol: 0.011 },
          { label: 'Batas atas A2', a: 0.55, tol: 0.011 },
          { label: 'Batas atas A3', a: 0.81, tol: 0.011 }
        ],
        ex: 'Total = 0,0263 + 0,0244 + 0,0238 + 0,0175 = 0,0921. Proporsi: A1 0,2859 ≈ 0,29, A2 0,2649 ≈ 0,26, A3 0,2586 ≈ 0,26, A4 0,1906 ≈ 0,19. Rentang: A1 [0,00 – 0,29), A2 [0,29 – 0,55), A3 [0,55 – 0,81), A4 [0,81 – 1,00). Jika tiap proporsi dibulatkan dulu lalu dijumlah, batas atas bisa beda 0,01; dua cara itu sama-sama diterima selama konsisten.' },
      { q: 'c. Pilih orang tua dengan nilai acak P1 = 0,34; 0,927; 0,443; 0,61 (urut P1 sampai P4). Kromosom terpilih adalah yang rentangnya memuat nilai acak.',
        fields: [
          { label: 'Parent1 (r = 0,34)', a: ['A2', '12534'] },
          { label: 'Parent2 (r = 0,927)', a: ['A4', '45213'] },
          { label: 'Parent3 (r = 0,443)', a: ['A2', '12534'] },
          { label: 'Parent4 (r = 0,61)', a: ['A3', '54132'] }
        ],
        ex: 'P1 = 0,34 → A2 (12534); P2 = 0,927 → A4 (45213); P3 = 0,443 → A2 (12534); P4 = 0,61 → A3 (54132).' },
      { q: 'd. Pasangkan Parent1–Parent2 dan Parent3–Parent4, lalu lakukan order crossover dengan TP1 = 2 dan TP2 = 4 (segmen = gen ke-3 sampai ke-4). Anak1 = segmen Parent1 + urutan Parent2, Anak2 = segmen Parent2 + urutan Parent1, begitu juga Anak3 dan Anak4.',
        fields: [
          { label: 'Anak1', a: '21534' },
          { label: 'Anak2', a: '53214' },
          { label: 'Anak3', a: '41532' },
          { label: 'Anak4', a: '25134' }
        ],
        ex: 'Anak1: segmen 5 3 dari A2; urutan A4 mulai gen ke-5: 3 4 5 2 1, buang segmen → 4 2 1; isi gen ke-5 dst. melingkar → 2 1 5 3 4. Anak2: segmen 2 1 dari A4; urutan A2 mulai gen ke-5: 4 1 2 5 3, buang segmen → 4 5 3; isi gen ke-5 dst. melingkar → 5 3 2 1 4. Anak3: segmen 5 3 dari A2; urutan A3 mulai gen ke-5: 2 5 4 1 3, buang segmen → 2 4 1; isi gen ke-5 dst. melingkar → 4 1 5 3 2. Anak4: segmen 1 3 dari A3; urutan A2 mulai gen ke-5: 4 1 2 5 3, buang segmen → 4 2 5; isi gen ke-5 dst. melingkar → 2 5 1 3 4.' },
      { q: 'e. Probabilitas mutasi = 0,2. Anak dimutasi jika nilai random < 0,2, dengan swap mutation pada indeks gen yang ditentukan.',
        table: { head: ['Anak', 'Nilai random', 'Indeks gen'],
          rows: [
            ['Anak1', '0,31', '1 dan 4'],
            ['Anak2', '0,12', '2 dan 5'],
            ['Anak3', '0,47', '3 dan 5'],
            ['Anak4', '0,08', '1 dan 2']
          ] },
        fields: [
          { label: 'Anak yang dimutasi (pisahkan spasi)', a: 'Anak2 Anak4', set: true },
          { label: 'Anak1 hasil mutasi', a: '21534' },
          { label: 'Anak2 hasil mutasi', a: '54213' },
          { label: 'Anak3 hasil mutasi', a: '41532' },
          { label: 'Anak4 hasil mutasi', a: '52134' }
        ],
        ex: 'Anak1: 0,31 ≥ 0,2, tetap 21534; Anak2: 0,12 < 0,2, tukar gen 2 dan 5: 53214 → 54213; Anak3: 0,47 ≥ 0,2, tetap 41532; Anak4: 0,08 < 0,2, tukar gen 1 dan 2: 25134 → 52134.' },
      { q: 'f. Generational replacement tanpa elitisme: keempat anak menggantikan seluruh populasi lama. Hitung total jarak dan fitness generasi baru.',
        fields: [
          { label: 'Total jarak Anak1', a: 46, tol: 0 },
          { label: 'Fitness Anak1', a: 0.0217, tol: 0.0001 },
          { label: 'Total jarak Anak2', a: 50, tol: 0 },
          { label: 'Fitness Anak2', a: 0.02, tol: 0.0001 },
          { label: 'Total jarak Anak3', a: 31, tol: 0 },
          { label: 'Fitness Anak3', a: 0.0323, tol: 0.0001 },
          { label: 'Total jarak Anak4', a: 57, tol: 0 },
          { label: 'Fitness Anak4', a: 0.0175, tol: 0.0001 }
        ],
        ex: 'Anak1 B→A→E→C→D→B = 46, fitness 0,0217. Anak2 E→D→B→A→C→E = 50, fitness 0,0200. Anak3 D→A→E→C→B→D = 31, fitness 0,0323. Anak4 E→B→A→C→D→E = 57, fitness 0,0175. Rata-rata jarak 44,50 → 46,00.' },
      { q: 'g. Tuliskan jalur terbaik di generasi baru dan jalur terbaik yang pernah ditemukan selama proses (generasi awal + generasi baru), beserta total jaraknya.',
        fields: [
          { label: 'Jalur terbaik generasi baru', a: ['41532', 'DAECB', 'DAECBD'] },
          { label: 'Jaraknya', a: 31, tol: 0 },
          { label: 'Jalur terbaik selama proses', a: ['41532', 'DAECB', 'DAECBD'] },
          { label: 'Jarak terbaik selama proses', a: 31, tol: 0 }
        ],
        ex: 'Generasi baru: Anak3 = D→A→E→C→B→D (31). Generasi baru lebih baik dari generasi awal (terbaik lama A1 = 38): crossover dan mutasi berhasil menggabungkan bagian rute yang baik. Optimum sebenarnya (dicek dengan mencoba semua permutasi) = 31.' },
      { q: 'Jelaskan apa yang terjadi jika dipakai elitisme k = 1, dan mengapa jawaban g bergantung pada ada tidaknya elitisme.',
        points: [
          'Elitisme k = 1 menyalin kromosom terbaik generasi lama (jarak terpendek) ke generasi baru tanpa diubah',
          'Kromosom terbaik menggantikan anak terburuk (jarak terpanjang)',
          'Tanpa elitisme solusi terbaik bisa hilang, sehingga kurva jarak terbaik bisa naik',
          'Di soal ini generasi baru sudah lebih baik, jadi elitisme tidak mengubah jawaban g'
        ] }
    ],
    ex: 'Soal buatan sendiri dengan format sama persis seperti UTS 2025; kunci dihitung dengan kode.' },
  { type: 'steps',
    q: 'Tim survei lapangan mengunjungi 5 desa (A sampai E) dalam satu putaran dan kembali ke desa awal. Jarak (km) pada matriks. Gunakan algoritma genetika dengan populasi 4, representasi permutasi (1 = A sampai 5 = E), dan fitness = 1/(total jarak).',
    table: { head: ['', 'A', 'B', 'C', 'D', 'E'],
      rows: [
        ['A', '-', 7, 13, 6, 8],
        ['B', 7, '-', 11, 6, 8],
        ['C', 13, 11, '-', 4, 15],
        ['D', 6, 6, 4, '-', 13],
        ['E', 8, 8, 15, 13, '-']
      ] },
    steps: [
      { q: 'a. Hitung total jarak dan nilai fitness = 1/(total jarak) setiap kromosom (fitness 4 desimal). Ingat ruas terakhir kembali ke kota awal.',
        table: { head: ['Kromosom', 'Gen', 'Rute'],
          rows: [
            ['A1', '1 5 2 4 3', 'A→E→B→D→C→A'],
            ['A2', '5 1 4 2 3', 'E→A→D→B→C→E'],
            ['A3', '2 3 1 4 5', 'B→C→A→D→E→B'],
            ['A4', '5 2 3 4 1', 'E→B→C→D→A→E']
          ] },
        fields: [
          { label: 'Total jarak A1', a: 39, tol: 0 },
          { label: 'Fitness A1', a: 0.0256, tol: 0.0001 },
          { label: 'Total jarak A2', a: 46, tol: 0 },
          { label: 'Fitness A2', a: 0.0217, tol: 0.0001 },
          { label: 'Total jarak A3', a: 51, tol: 0 },
          { label: 'Fitness A3', a: 0.0196, tol: 0.0001 },
          { label: 'Total jarak A4', a: 37, tol: 0 },
          { label: 'Fitness A4', a: 0.027, tol: 0.0001 }
        ],
        ex: 'A1: 8 + 8 + 6 + 4 + 13 = 39, fitness 1/39 = 0,0256. A2: 8 + 6 + 6 + 11 + 15 = 46, fitness 1/46 = 0,0217. A3: 11 + 13 + 6 + 13 + 8 = 51, fitness 1/51 = 0,0196. A4: 8 + 11 + 4 + 6 + 8 = 37, fitness 1/37 = 0,0270.' },
      { q: 'b. Hitung total fitness, proporsi roulette wheel (fitness/total, 2 desimal), dan batas atas rentang tiap kromosom. Batas bawah A1 = 0, batas atas A4 = 1. Tidak perlu diurutkan.',
        fields: [
          { label: 'Total fitness (4 desimal)', a: 0.094, tol: 0.0002 },
          { label: 'Proporsi A1', a: 0.27, tol: 0.006 },
          { label: 'Proporsi A2', a: 0.23, tol: 0.006 },
          { label: 'Proporsi A3', a: 0.21, tol: 0.006 },
          { label: 'Proporsi A4', a: 0.29, tol: 0.006 },
          { label: 'Batas atas A1', a: 0.27, tol: 0.011 },
          { label: 'Batas atas A2', a: 0.5, tol: 0.011 },
          { label: 'Batas atas A3', a: 0.71, tol: 0.011 }
        ],
        ex: 'Total = 0,0256 + 0,0217 + 0,0196 + 0,0270 = 0,0940. Proporsi: A1 0,2727 ≈ 0,27, A2 0,2312 ≈ 0,23, A3 0,2086 ≈ 0,21, A4 0,2875 ≈ 0,29. Rentang: A1 [0,00 – 0,27), A2 [0,27 – 0,50), A3 [0,50 – 0,71), A4 [0,71 – 1,00). Jika tiap proporsi dibulatkan dulu lalu dijumlah, batas atas bisa beda 0,01; dua cara itu sama-sama diterima selama konsisten.' },
      { q: 'c. Pilih orang tua dengan nilai acak P1 = 0,837; 0,393; 0,565; 0,452 (urut P1 sampai P4). Kromosom terpilih adalah yang rentangnya memuat nilai acak.',
        fields: [
          { label: 'Parent1 (r = 0,837)', a: ['A4', '52341'] },
          { label: 'Parent2 (r = 0,393)', a: ['A2', '51423'] },
          { label: 'Parent3 (r = 0,565)', a: ['A3', '23145'] },
          { label: 'Parent4 (r = 0,452)', a: ['A2', '51423'] }
        ],
        ex: 'P1 = 0,837 → A4 (52341); P2 = 0,393 → A2 (51423); P3 = 0,565 → A3 (23145); P4 = 0,452 → A2 (51423).' },
      { q: 'd. Pasangkan Parent1–Parent2 dan Parent3–Parent4, lalu lakukan order crossover dengan TP1 = 2 dan TP2 = 4 (segmen = gen ke-3 sampai ke-4). Anak1 = segmen Parent1 + urutan Parent2, Anak2 = segmen Parent2 + urutan Parent1, begitu juga Anak3 dan Anak4.',
        fields: [
          { label: 'Anak1', a: '12345' },
          { label: 'Anak2', a: '53421' },
          { label: 'Anak3', a: '52143' },
          { label: 'Anak4', a: '31425' }
        ],
        ex: 'Anak1: segmen 3 4 dari A4; urutan A2 mulai gen ke-5: 3 5 1 4 2, buang segmen → 5 1 2; isi gen ke-5 dst. melingkar → 1 2 3 4 5. Anak2: segmen 4 2 dari A2; urutan A4 mulai gen ke-5: 1 5 2 3 4, buang segmen → 1 5 3; isi gen ke-5 dst. melingkar → 5 3 4 2 1. Anak3: segmen 1 4 dari A3; urutan A2 mulai gen ke-5: 3 5 1 4 2, buang segmen → 3 5 2; isi gen ke-5 dst. melingkar → 5 2 1 4 3. Anak4: segmen 4 2 dari A2; urutan A3 mulai gen ke-5: 5 2 3 1 4, buang segmen → 5 3 1; isi gen ke-5 dst. melingkar → 3 1 4 2 5.' },
      { q: 'e. Probabilitas mutasi = 0,2. Anak dimutasi jika nilai random < 0,2, dengan swap mutation pada indeks gen yang ditentukan.',
        table: { head: ['Anak', 'Nilai random', 'Indeks gen'],
          rows: [
            ['Anak1', '0,31', '1 dan 4'],
            ['Anak2', '0,12', '2 dan 5'],
            ['Anak3', '0,47', '3 dan 5'],
            ['Anak4', '0,08', '1 dan 2']
          ] },
        fields: [
          { label: 'Anak yang dimutasi (pisahkan spasi)', a: 'Anak2 Anak4', set: true },
          { label: 'Anak1 hasil mutasi', a: '12345' },
          { label: 'Anak2 hasil mutasi', a: '51423' },
          { label: 'Anak3 hasil mutasi', a: '52143' },
          { label: 'Anak4 hasil mutasi', a: '13425' }
        ],
        ex: 'Anak1: 0,31 ≥ 0,2, tetap 12345; Anak2: 0,12 < 0,2, tukar gen 2 dan 5: 53421 → 51423; Anak3: 0,47 ≥ 0,2, tetap 52143; Anak4: 0,08 < 0,2, tukar gen 1 dan 2: 31425 → 13425.' },
      { q: 'f. Generational replacement tanpa elitisme: keempat anak menggantikan seluruh populasi lama. Hitung total jarak dan fitness generasi baru.',
        fields: [
          { label: 'Total jarak Anak1', a: 43, tol: 0 },
          { label: 'Fitness Anak1', a: 0.0233, tol: 0.0001 },
          { label: 'Total jarak Anak2', a: 46, tol: 0 },
          { label: 'Fitness Anak2', a: 0.0217, tol: 0.0001 },
          { label: 'Total jarak Anak3', a: 40, tol: 0 },
          { label: 'Fitness Anak3', a: 0.025, tol: 0.0001 },
          { label: 'Total jarak Anak4', a: 39, tol: 0 },
          { label: 'Fitness Anak4', a: 0.0256, tol: 0.0001 }
        ],
        ex: 'Anak1 A→B→C→D→E→A = 43, fitness 0,0233. Anak2 E→A→D→B→C→E = 46, fitness 0,0217. Anak3 E→B→A→D→C→E = 40, fitness 0,0250. Anak4 A→C→D→B→E→A = 39, fitness 0,0256. Rata-rata jarak 43,25 → 42,00.' },
      { q: 'g. Tuliskan jalur terbaik di generasi baru dan jalur terbaik yang pernah ditemukan selama proses (generasi awal + generasi baru), beserta total jaraknya.',
        fields: [
          { label: 'Jalur terbaik generasi baru', a: ['13425', 'ACDBE', 'ACDBEA'] },
          { label: 'Jaraknya', a: 39, tol: 0 },
          { label: 'Jalur terbaik selama proses', a: ['52341', 'EBCDA', 'EBCDAE'] },
          { label: 'Jarak terbaik selama proses', a: 37, tol: 0 }
        ],
        ex: 'Generasi baru: Anak4 = A→C→D→B→E→A (39). Tetapi A4 di generasi awal (E→B→C→D→A→E, 37) lebih pendek dan hilang karena tidak ada elitisme. Jawaban "jalur paling optimal yang didapatkan" = E→B→C→D→A→E = 37; sebutkan juga bahwa generasi baru justru memburuk.' },
      { q: 'Jelaskan apa yang terjadi jika dipakai elitisme k = 1, dan mengapa jawaban g bergantung pada ada tidaknya elitisme.',
        points: [
          'Elitisme k = 1 menyalin kromosom terbaik generasi lama (jarak terpendek) ke generasi baru tanpa diubah',
          'Kromosom terbaik menggantikan anak terburuk (jarak terpanjang)',
          'Tanpa elitisme solusi terbaik bisa hilang, sehingga kurva jarak terbaik bisa naik',
          'Di soal ini rute terbaik (37) hilang di generasi baru, jadi jawaban g adalah rute generasi awal'
        ] }
    ],
    ex: 'Soal buatan sendiri dengan format UTS 2025. Di sini, seperti soal aslinya, rute terbaik hilang karena tidak ada elitisme.' },
  { type: 'steps',
    q: 'Teknisi jaringan mengunjungi 6 BTS (A sampai F) lalu kembali ke BTS awal. Jarak (km) pada matriks. Gunakan algoritma genetika dengan populasi 4, representasi permutasi (1 = A sampai 6 = F), fitness = 1/(total jarak). Perhatikan: kromosom 6 gen dan segmen OX lebih panjang.',
    table: { head: ['', 'A', 'B', 'C', 'D', 'E', 'F'],
      rows: [
        ['A', '-', 8, 13, 9, 15, 13],
        ['B', 8, '-', 9, 14, 8, 10],
        ['C', 13, 9, '-', 14, 9, 7],
        ['D', 9, 14, 14, '-', 12, 14],
        ['E', 15, 8, 9, 12, '-', 14],
        ['F', 13, 10, 7, 14, 14, '-']
      ] },
    steps: [
      { q: 'a. Hitung total jarak dan nilai fitness = 1/(total jarak) setiap kromosom (fitness 4 desimal). Ingat ruas terakhir kembali ke kota awal.',
        table: { head: ['Kromosom', 'Gen', 'Rute'],
          rows: [
            ['A1', '4 3 1 5 6 2', 'D→C→A→E→F→B→D'],
            ['A2', '3 6 2 1 5 4', 'C→F→B→A→E→D→C'],
            ['A3', '1 6 5 3 4 2', 'A→F→E→C→D→B→A'],
            ['A4', '6 5 3 1 4 2', 'F→E→C→A→D→B→F']
          ] },
        fields: [
          { label: 'Total jarak A1', a: 80, tol: 0 },
          { label: 'Fitness A1', a: 0.0125, tol: 0.0001 },
          { label: 'Total jarak A2', a: 66, tol: 0 },
          { label: 'Fitness A2', a: 0.0152, tol: 0.0001 },
          { label: 'Total jarak A3', a: 72, tol: 0 },
          { label: 'Fitness A3', a: 0.0139, tol: 0.0001 },
          { label: 'Total jarak A4', a: 69, tol: 0 },
          { label: 'Fitness A4', a: 0.0145, tol: 0.0001 }
        ],
        ex: 'A1: 14 + 13 + 15 + 14 + 10 + 14 = 80, fitness 1/80 = 0,0125. A2: 7 + 10 + 8 + 15 + 12 + 14 = 66, fitness 1/66 = 0,0152. A3: 13 + 14 + 9 + 14 + 14 + 8 = 72, fitness 1/72 = 0,0139. A4: 14 + 9 + 13 + 9 + 14 + 10 = 69, fitness 1/69 = 0,0145.' },
      { q: 'b. Hitung total fitness, proporsi roulette wheel (fitness/total, 2 desimal), dan batas atas rentang tiap kromosom. Batas bawah A1 = 0, batas atas A4 = 1. Tidak perlu diurutkan.',
        fields: [
          { label: 'Total fitness (4 desimal)', a: 0.056, tol: 0.0002 },
          { label: 'Proporsi A1', a: 0.22, tol: 0.006 },
          { label: 'Proporsi A2', a: 0.27, tol: 0.006 },
          { label: 'Proporsi A3', a: 0.25, tol: 0.006 },
          { label: 'Proporsi A4', a: 0.26, tol: 0.006 },
          { label: 'Batas atas A1', a: 0.22, tol: 0.011 },
          { label: 'Batas atas A2', a: 0.49, tol: 0.011 },
          { label: 'Batas atas A3', a: 0.74, tol: 0.011 }
        ],
        ex: 'Total = 0,0125 + 0,0152 + 0,0139 + 0,0145 = 0,0560. Proporsi: A1 0,2231 ≈ 0,22, A2 0,2704 ≈ 0,27, A3 0,2479 ≈ 0,25, A4 0,2586 ≈ 0,26. Rentang: A1 [0,00 – 0,22), A2 [0,22 – 0,49), A3 [0,49 – 0,74), A4 [0,74 – 1,00). Jika tiap proporsi dibulatkan dulu lalu dijumlah, batas atas bisa beda 0,01; dua cara itu sama-sama diterima selama konsisten.' },
      { q: 'c. Pilih orang tua dengan nilai acak P1 = 0,365; 0,674; 0,15; 0,81 (urut P1 sampai P4). Kromosom terpilih adalah yang rentangnya memuat nilai acak.',
        fields: [
          { label: 'Parent1 (r = 0,365)', a: ['A2', '362154'] },
          { label: 'Parent2 (r = 0,674)', a: ['A3', '165342'] },
          { label: 'Parent3 (r = 0,15)', a: ['A1', '431562'] },
          { label: 'Parent4 (r = 0,81)', a: ['A4', '653142'] }
        ],
        ex: 'P1 = 0,365 → A2 (362154); P2 = 0,674 → A3 (165342); P3 = 0,15 → A1 (431562); P4 = 0,81 → A4 (653142).' },
      { q: 'd. Pasangkan Parent1–Parent2 dan Parent3–Parent4, lalu lakukan order crossover dengan TP1 = 2 dan TP2 = 5 (segmen = gen ke-3 sampai ke-5). Anak1 = segmen Parent1 + urutan Parent2, Anak2 = segmen Parent2 + urutan Parent1, begitu juga Anak3 dan Anak4.',
        fields: [
          { label: 'Anak1', a: '342156' },
          { label: 'Anak2', a: '215346' },
          { label: 'Anak3', a: '341562' },
          { label: 'Anak4', a: '563142' }
        ],
        ex: 'Anak1: segmen 2 1 5 dari A2; urutan A3 mulai gen ke-6: 2 1 6 5 3 4, buang segmen → 6 3 4; isi gen ke-6 dst. melingkar → 3 4 2 1 5 6. Anak2: segmen 5 3 4 dari A3; urutan A2 mulai gen ke-6: 4 3 6 2 1 5, buang segmen → 6 2 1; isi gen ke-6 dst. melingkar → 2 1 5 3 4 6. Anak3: segmen 1 5 6 dari A1; urutan A4 mulai gen ke-6: 2 6 5 3 1 4, buang segmen → 2 3 4; isi gen ke-6 dst. melingkar → 3 4 1 5 6 2. Anak4: segmen 3 1 4 dari A4; urutan A1 mulai gen ke-6: 2 4 3 1 5 6, buang segmen → 2 5 6; isi gen ke-6 dst. melingkar → 5 6 3 1 4 2.' },
      { q: 'e. Probabilitas mutasi = 0,2. Anak dimutasi jika nilai random < 0,2, dengan swap mutation pada indeks gen yang ditentukan.',
        table: { head: ['Anak', 'Nilai random', 'Indeks gen'],
          rows: [
            ['Anak1', '0,31', '1 dan 4'],
            ['Anak2', '0,12', '2 dan 6'],
            ['Anak3', '0,47', '3 dan 5'],
            ['Anak4', '0,08', '1 dan 6']
          ] },
        fields: [
          { label: 'Anak yang dimutasi (pisahkan spasi)', a: 'Anak2 Anak4', set: true },
          { label: 'Anak1 hasil mutasi', a: '342156' },
          { label: 'Anak2 hasil mutasi', a: '265341' },
          { label: 'Anak3 hasil mutasi', a: '341562' },
          { label: 'Anak4 hasil mutasi', a: '263145' }
        ],
        ex: 'Anak1: 0,31 ≥ 0,2, tetap 342156; Anak2: 0,12 < 0,2, tukar gen 2 dan 6: 215346 → 265341; Anak3: 0,47 ≥ 0,2, tetap 341562; Anak4: 0,08 < 0,2, tukar gen 1 dan 6: 563142 → 263145.' },
      { q: 'f. Generational replacement tanpa elitisme: keempat anak menggantikan seluruh populasi lama. Hitung total jarak dan fitness generasi baru.',
        fields: [
          { label: 'Total jarak Anak1', a: 72, tol: 0 },
          { label: 'Fitness Anak1', a: 0.0139, tol: 0.0001 },
          { label: 'Total jarak Anak2', a: 64, tol: 0 },
          { label: 'Fitness Anak2', a: 0.0156, tol: 0.0001 },
          { label: 'Total jarak Anak3', a: 71, tol: 0 },
          { label: 'Fitness Anak3', a: 0.0141, tol: 0.0001 },
          { label: 'Total jarak Anak4', a: 59, tol: 0 },
          { label: 'Fitness Anak4', a: 0.0169, tol: 0.0001 }
        ],
        ex: 'Anak1 C→D→B→A→E→F→C = 72, fitness 0,0139. Anak2 B→F→E→C→D→A→B = 64, fitness 0,0156. Anak3 C→D→A→E→F→B→C = 71, fitness 0,0141. Anak4 B→F→C→A→D→E→B = 59, fitness 0,0169. Rata-rata jarak 71,75 → 66,50.' },
      { q: 'g. Tuliskan jalur terbaik di generasi baru dan jalur terbaik yang pernah ditemukan selama proses (generasi awal + generasi baru), beserta total jaraknya.',
        fields: [
          { label: 'Jalur terbaik generasi baru', a: ['263145', 'BFCADE', 'BFCADEB'] },
          { label: 'Jaraknya', a: 59, tol: 0 },
          { label: 'Jalur terbaik selama proses', a: ['263145', 'BFCADE', 'BFCADEB'] },
          { label: 'Jarak terbaik selama proses', a: 59, tol: 0 }
        ],
        ex: 'Generasi baru: Anak4 = B→F→C→A→D→E→B (59). Generasi baru lebih baik dari generasi awal (terbaik lama A2 = 66): crossover dan mutasi berhasil menggabungkan bagian rute yang baik.' },
      { q: 'Jelaskan apa yang terjadi jika dipakai elitisme k = 1, dan mengapa jawaban g bergantung pada ada tidaknya elitisme.',
        points: [
          'Elitisme k = 1 menyalin kromosom terbaik generasi lama (jarak terpendek) ke generasi baru tanpa diubah',
          'Kromosom terbaik menggantikan anak terburuk (jarak terpanjang)',
          'Tanpa elitisme solusi terbaik bisa hilang, sehingga kurva jarak terbaik bisa naik',
          'Di soal ini generasi baru sudah lebih baik, jadi elitisme tidak mengubah jawaban g'
        ] }
    ],
    ex: 'Soal buatan sendiri, versi 6 kota dari format UTS 2025; kunci dihitung dengan kode.' }
]);

BANK.isian('ka', 'meta', 'Metaheuristic Search (Week 1)', [
  { type: 'steps',
    q: 'Sebuah masalah memaksimalkan f(x) dengan x bilangan bulat 0 sampai 12. Tetangga x adalah x − 1 dan x + 1. Hill Climbing selalu pindah ke tetangga terbaik selama tetangga itu lebih baik.',
    table: { head: ['x', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      rows: [['f(x)', 3, 5, 8, 9, 7, 6, 4, 6, 10, 13, 15, 12, 9]] },
    steps: [
      { q: 'Jalankan Hill Climbing dari x = 2. Di mana berhenti dan berapa f-nya? Apakah itu global optimum?',
        fields: [
          { label: 'Berhenti di x', a: 3, tol: 0 },
          { label: 'f(x)', a: 9, tol: 0 },
          { label: 'Global optimum? (ya/tidak)', a: ['tidak', 'bukan', 'no'] }
        ],
        ex: 'x = 2 (8) → 3 (9). Tetangga 2 (8) dan 4 (7) lebih buruk, jadi berhenti di x = 3, f = 9. Global optimum ada di x = 10 (f = 15): ini local optimum.' },
      { q: 'Jalankan lagi dari x = 7 dan dari x = 5.',
        fields: [
          { label: 'Dari x = 7 berhenti di', a: 10, tol: 0 },
          { label: 'f', a: 15, tol: 0 },
          { label: 'Dari x = 5 berhenti di', a: 3, tol: 0 }
        ],
        ex: 'x = 7: 7 → 8 → 9 → 10 (f = 15, global). x = 5: 5 → 4 → 3 (f = 9, terjebak lagi). Hasil Hill Climbing bergantung titik awal: itulah alasan random restart.' },
      { q: 'Simulated Annealing di x = 3 mengusulkan x = 4 (f turun dari 9 ke 7, jadi ΔE = 2). Hitung P(accept) = exp(−ΔE/T) untuk T = 5, T = 1, dan T = 0,5 (4 desimal). Dengan r = 0,40, diterima pada T berapa saja?',
        fields: [
          { label: 'T = 5', a: 0.6703, tol: 0.0006 },
          { label: 'T = 1', a: 0.1353, tol: 0.0006 },
          { label: 'T = 0,5', a: 0.0183, tol: 0.0006 },
          { label: 'Diterima pada', a: ['T = 5', '5', 'T=5'] }
        ],
        ex: 'exp(−2/5) = 0,6703, exp(−2/1) = 0,1353, exp(−2/0,5) = 0,0183. r = 0,40 < 0,6703 hanya pada T = 5. Suhu tinggi di awal = eksplorasi; suhu rendah = SA menjadi Hill Climbing.' },
      { q: 'Jelaskan bagaimana Hill Climbing, Simulated Annealing, dan Tabu Search masing-masing menghadapi local optimum seperti x = 3.',
        points: [
          'Hill Climbing: tidak punya cara keluar, berhenti di local optimum (perlu restart)',
          'Simulated Annealing: kadang menerima langkah memburuk dengan peluang exp(−ΔE/T)',
          'Tabu Search: melarang langkah balik selama tenure iterasi, jadi terpaksa bergerak walau memburuk',
          'Ketiganya trajectory-based: satu solusi bergerak; bedanya hanya mekanisme lolos'
        ] }
    ],
    ex: 'Soal buatan sendiri mengikuti slide Week 1 (Hill Climbing, Simulated Annealing as a Patch); kunci dihitung dengan kode.' },
  { type: 'steps',
    q: 'Simulated Annealing untuk jadwal ujian (minimasi bentrok) memakai suhu awal T0 = 100 dan pendinginan geometrik T_k = T0 · 0,9^k. Langkah yang memperburuk bentrok sebesar ΔE diterima dengan peluang exp(−ΔE/T).',
    steps: [
      { q: 'Hitung suhu pada iterasi k = 10 dan k = 50 (2 desimal).',
        fields: [{ label: 'T_10', a: 34.87, tol: 0.02 }, { label: 'T_50', a: 0.52, tol: 0.02 }],
        ex: 'T_10 = 100 · 0,9^10 = 34,87. T_50 = 100 · 0,9^50 = 0,52.' },
      { q: 'Peluang menerima langkah yang menambah 10 bentrok pada k = 0, k = 10, dan k = 50 (4 desimal).',
        fields: [
          { label: 'k = 0', a: 0.9048, tol: 0.0006 },
          { label: 'k = 10', a: 0.7507, tol: 0.0006 },
          { label: 'k = 50', a: 0, tol: 0.0006 }
        ],
        ex: 'exp(−10/100) = 0,9048; exp(−10/34,87) = 0,7507; exp(−10/0,52) = 0,0000. Awal: hampir semua langkah buruk diterima (eksplorasi). Akhir: hampir tidak pernah (eksploitasi).' },
      { q: 'Studi kasus slide dengan budget 40.000 evaluasi. Isi hasilnya (bentrok, makin kecil makin baik).',
        fields: [
          { label: 'Random sampling', a: 691, tol: 0 },
          { label: 'Satu Hill Climbing (median)', a: 618, tol: 0 },
          { label: 'Hill Climbing restarts', a: 588, tol: 0 },
          { label: 'Population method', a: 588, tol: 0 },
          { label: 'Simulated Annealing', a: 582, tol: 0 }
        ],
        ex: 'Random 691 adalah baseline: metode apa pun harus mengalahkannya. SA terbaik (582), tetapi hanya setelah suhunya di-tuning.' },
      { q: 'Tiga run berbeda dengan budget 500 iterasi: A konvergen di iterasi 15 lalu tidak membaik; B setelah 500 iterasi masih naik turun tanpa pola; C sepuluh run pada input yang sama memberi sepuluh hasil berbeda jauh. Diagnosis masing-masing.',
        points: [
          'A: eksplorasi terlalu sedikit (eksploitasi berlebihan), terjebak local optimum; tambah restart, naikkan suhu atau mutasi',
          'B: eksplorasi terlalu banyak, seperti random search; turunkan suhu lebih cepat atau kurangi mutasi',
          'C: sifat stokastik plus landscape yang kasar (banyak local optimum); jalankan beberapa run dan laporkan sebarannya',
          'Keseimbangan exploration-exploitation bergantung masalah, tidak ada rasio yang selalu benar'
        ] }
    ],
    ex: 'Rumus P(accept) dari slide Week 1; jadwal pendinginan geometrik ditentukan di soal (slide hanya menampilkan kurva suhu turun). Kunci dihitung dengan kode.' },
  { type: 'steps',
    q: 'Konsep metaheuristik (Week 1). Jawab dengan alasan, seperti soal esai.',
    steps: [
      { q: 'Hanya satu pernyataan benar. Tulis nomornya.\n1. Hill Climbing yang terjebak berarti programnya bug.\n2. Jika dua run memberi hasil berbeda, algoritmanya tidak bisa diandalkan.\n3. No Free Lunch berarti pilihan algoritma tidak penting.\n4. Metaheuristik bisa menjamin menemukan global optimum.\n5. Menambah ujian memperbesar ruang pencarian lebih cepat daripada menambah slot.',
        fields: [{ label: 'Pernyataan benar', a: 5, tol: 0 }],
        ex: '1 salah: terjebak adalah sifat Hill Climbing. 2 salah: stokastik itu disengaja. 3 salah: pada masalah tertentu selisihnya besar. 4 salah: tidak ada jaminan optimal. 5 benar: slot^ujian, ujian adalah pangkat.' },
      { q: 'Sebutkan empat sifat metaheuristik, lalu kapan sebaiknya dipakai dan kapan jangan.',
        points: [
          'Tidak menjamin optimal; tidak bergantung struktur masalah (tanpa turunan); stokastik; anytime',
          'Pakai jika ruang besar atau kombinatorial, objektif black box/tidak terdiferensialkan, waktu terbatas, tidak ada metode eksak yang praktis',
          'Jangan pakai jika ada solusi analitis, masalah cukup kecil untuk dienumerasi, optimum harus dibuktikan, atau sudah ada algoritma eksak khusus',
          'Contoh salah pakai: GA untuk mencari akar persamaan kuadrat'
        ] },
      { q: 'Isi tabel taksonomi: kelompok untuk tiap algoritma (trajectory atau population).',
        fields: [
          { label: 'Hill Climbing', a: ['trajectory', 'trajectory-based'] },
          { label: 'Simulated Annealing', a: ['trajectory', 'trajectory-based'] },
          { label: 'Tabu Search', a: ['trajectory', 'trajectory-based'] },
          { label: 'Genetic Algorithm', a: ['population', 'population-based'] },
          { label: 'NSGA-II', a: ['population', 'population-based'] }
        ],
        ex: 'Trajectory: satu solusi bergerak (cepat, hemat memori, mudah terjebak). Population: banyak solusi bertukar informasi (tahan local optimum, mahal, banyak parameter).' },
      { q: 'Jelaskan No Free Lunch dan akibat praktisnya dalam memilih algoritma. Gunakan contoh studi kasus tiga algoritma pada tiga tipe masalah.',
        points: [
          'Dirata-rata atas semua masalah optimasi, semua algoritma sama baiknya (Wolpert & Macready, 1997)',
          'Pada masalah tertentu dengan struktur yang diketahui, selisihnya bisa besar',
          'Contoh: Hill Climbing 100% pada landscape mulus, Simulated Annealing 99,9% pada narrow basin, GA 86,6% pada deceptive building block',
          'Klaim "algoritma X terbaik" harus menyebut kelas masalah; bandingkan secara empiris'
        ] }
    ],
    ex: 'Dari slide Week 1 (Self-Check, Four Defining Traits, A Taxonomy, No Free Lunch).' }
]);

BANK.isian('ka', 'moo', 'Multi-Objective & NSGA-II (Week 6)', [
  { type: 'steps',
    q: 'Latihan slide Week 6 (Repeat Steps 2 and 3 on a New Population). Enam jadwal dari generasi berikutnya sudah dievaluasi: f1 = jumlah slot terpakai, f2 = jumlah bentrok mahasiswa. Keduanya diminimalkan.',
    table: { head: ['Solusi', 'f1 (slot)', 'f2 (bentrok)'],
      rows: [['Q1', 3, 31], ['Q2', 4, 22], ['Q3', 3, 26], ['Q4', 5, 19], ['Q5', 4, 28], ['Q6', 5, 24]] },
    steps: [
      { q: 'Hitung n_p (jumlah solusi yang mendominasi p) dan S_p (solusi yang didominasi p) untuk semua solusi. Kedua objektif diminimalkan.',
        fields: [
          { label: 'n_p Q1', a: 1, tol: 0 },
          { label: 'n_p Q2', a: 0, tol: 0 },
          { label: 'n_p Q3', a: 0, tol: 0 },
          { label: 'n_p Q4', a: 0, tol: 0 },
          { label: 'n_p Q5', a: 2, tol: 0 },
          { label: 'n_p Q6', a: 2, tol: 0 },
          { label: 'S_p Q1 (jika kosong tulis "kosong")', a: ['kosong', 'tidak ada', 'none'], set: false },
          { label: 'S_p Q2 (jika kosong tulis "kosong")', a: 'Q5 Q6', set: true },
          { label: 'S_p Q3 (jika kosong tulis "kosong")', a: 'Q1 Q5', set: true },
          { label: 'S_p Q4 (jika kosong tulis "kosong")', a: 'Q6', set: true },
          { label: 'S_p Q5 (jika kosong tulis "kosong")', a: ['kosong', 'tidak ada', 'none'], set: false },
          { label: 'S_p Q6 (jika kosong tulis "kosong")', a: ['kosong', 'tidak ada', 'none'], set: false }
        ],
        ex: 'Q1: n_p = 1 (didominasi Q3), S_p = {}. Q2: n_p = 0, S_p = {Q5, Q6}. Q3: n_p = 0, S_p = {Q1, Q5}. Q4: n_p = 0, S_p = {Q6}. Q5: n_p = 2 (didominasi Q2, Q3), S_p = {}. Q6: n_p = 2 (didominasi Q2, Q4), S_p = {}. Ingat: seri di satu objektif tetap bisa mendominasi, misalnya (3, 44) mendominasi (3, 45).' },
      { q: 'Baca front dari n_p dan S_p: front 1 = semua dengan n_p = 0, lalu kurangi n_q untuk setiap q di S_p, dan seterusnya.',
        fields: [{ label: 'Front 1', a: 'Q2 Q3 Q4', set: true }, { label: 'Front 2', a: 'Q1 Q5 Q6', set: true }],
        ex: 'Front 1 = {Q2, Q3, Q4}, Front 2 = {Q1, Q5, Q6}. Rank = nomor front.' },
      { q: 'Hitung crowding distance setiap anggota front 1 (4 desimal). Ujung tiap objektif diberi ∞.',
        fields: [
          { label: 'CD Q2', a: 2, tol: 0.0006 },
          { label: 'CD Q3', a: ['∞', 'inf', 'infinity', 'tak hingga', 'infinite'] },
          { label: 'CD Q4', a: ['∞', 'inf', 'infinity', 'tak hingga', 'infinite'] }
        ],
        ex: 'Rentang dihitung di dalam front saja. Q2 = (5 − 3)/2 + (26 − 19)/7 = 2,0000; Q3 ujung → ∞; Q4 ujung → ∞.' },
      { q: 'Binary tournament: Q5 vs Q6, Q1 vs Q4, Q2 vs Q4. Siapa pemenangnya? Rank lebih kecil menang; jika rank sama, crowding distance lebih besar menang.',
        fields: [{ label: 'Q5 vs Q6', a: 'Q6' }, { label: 'Q1 vs Q4', a: 'Q4' }, { label: 'Q2 vs Q4', a: 'Q4' }],
        ex: 'Q5 (rank 2, CD 2,0000) vs Q6 (rank 2, CD ∞) → Q6, diputuskan crowding; Q1 (rank 2, CD ∞) vs Q4 (rank 1, CD ∞) → Q4, diputuskan rank; Q2 (rank 1, CD 2,0000) vs Q4 (rank 1, CD ∞) → Q4, diputuskan crowding.' },
      { q: 'Slide bertanya: "satu solusi di sini mendominasi tiga solusi lain". Periksa klaim itu dengan S_p yang kamu hitung, lalu jelaskan apa artinya bila sebuah solusi mendominasi banyak solusi lain.',
        points: [
          'Dengan angka di tabel, tidak ada yang mendominasi tiga: Q2 mendominasi Q5 dan Q6, Q3 mendominasi Q1 dan Q5, Q4 mendominasi Q6',
          'Jadi klaim slide tidak cocok dengan datanya; tulis hasil hitunganmu dan alasannya',
          'Solusi yang mendominasi banyak solusi lain berada di daerah yang baik untuk kedua objektif (dekat pojok kiri-bawah)',
          'Slide juga keliru menyebut n_p sebagai rank dan S_p sebagai crowding: n_p = banyak yang mendominasi p, S_p = himpunan yang didominasi p'
        ] }
    ],
    ex: 'Data dari latihan slide Week 6; slide tidak memberi kunci, jadi dihitung sendiri. Klaim slide "mendominasi tiga" tidak cocok dengan angka di tabelnya.' },
  { type: 'steps',
    q: 'Latihan slide Week 6 (Sort These Yourself dan Compute Crowding Distance). Tujuh solusi, kedua objektif diminimalkan: A = (2, 8), B = (4, 5), C = (7, 2), D = (5, 9), E = (6, 6), F = (3, 6), G = (8, 8).',
    steps: [
      { q: 'Hitung n_p (jumlah solusi yang mendominasi p) dan S_p (solusi yang didominasi p) untuk semua solusi. Kedua objektif diminimalkan.',
        fields: [
          { label: 'n_p A', a: 0, tol: 0 },
          { label: 'n_p B', a: 0, tol: 0 },
          { label: 'n_p C', a: 0, tol: 0 },
          { label: 'n_p D', a: 3, tol: 0 },
          { label: 'n_p E', a: 2, tol: 0 },
          { label: 'n_p F', a: 0, tol: 0 },
          { label: 'n_p G', a: 5, tol: 0 },
          { label: 'S_p A (jika kosong tulis "kosong")', a: 'D G', set: true },
          { label: 'S_p B (jika kosong tulis "kosong")', a: 'D E G', set: true },
          { label: 'S_p C (jika kosong tulis "kosong")', a: 'G', set: true },
          { label: 'S_p D (jika kosong tulis "kosong")', a: ['kosong', 'tidak ada', 'none'], set: false },
          { label: 'S_p E (jika kosong tulis "kosong")', a: 'G', set: true },
          { label: 'S_p F (jika kosong tulis "kosong")', a: 'D E G', set: true },
          { label: 'S_p G (jika kosong tulis "kosong")', a: ['kosong', 'tidak ada', 'none'], set: false }
        ],
        ex: 'A: n_p = 0, S_p = {D, G}. B: n_p = 0, S_p = {D, E, G}. C: n_p = 0, S_p = {G}. D: n_p = 3 (didominasi A, B, F), S_p = {}. E: n_p = 2 (didominasi B, F), S_p = {G}. F: n_p = 0, S_p = {D, E, G}. G: n_p = 5 (didominasi A, B, C, E, F), S_p = {}. Ingat: seri di satu objektif tetap bisa mendominasi, misalnya (3, 44) mendominasi (3, 45).' },
      { q: 'Baca front dari n_p dan S_p: front 1 = semua dengan n_p = 0, lalu kurangi n_q untuk setiap q di S_p, dan seterusnya.',
        fields: [
          { label: 'Front 1', a: 'A B C F', set: true },
          { label: 'Front 2', a: 'D E', set: true },
          { label: 'Front 3', a: 'G', set: true }
        ],
        ex: 'Front 1 = {A, B, C, F}, Front 2 = {D, E}, Front 3 = {G}. Rank = nomor front.' },
      { q: 'Hitung crowding distance setiap anggota front 1 (4 desimal). Ujung tiap objektif diberi ∞.',
        fields: [
          { label: 'CD A', a: ['∞', 'inf', 'infinity', 'tak hingga', 'infinite'] },
          { label: 'CD B', a: 1.4667, tol: 0.0006 },
          { label: 'CD C', a: ['∞', 'inf', 'infinity', 'tak hingga', 'infinite'] },
          { label: 'CD F', a: 0.9, tol: 0.0006 }
        ],
        ex: 'Rentang dihitung di dalam front saja. A ujung → ∞; B = (7 − 3)/5 + (6 − 2)/6 = 1,4667; C ujung → ∞; F = (4 − 2)/5 + (8 − 5)/6 = 0,9000.' },
      { q: 'Binary tournament: E vs G, F vs B, A vs F. Siapa pemenangnya? Rank lebih kecil menang; jika rank sama, crowding distance lebih besar menang.',
        fields: [{ label: 'E vs G', a: 'E' }, { label: 'F vs B', a: 'B' }, { label: 'A vs F', a: 'A' }],
        ex: 'E (rank 2, CD ∞) vs G (rank 3, CD ∞) → E, diputuskan rank; F (rank 1, CD 0,9000) vs B (rank 1, CD 1,4667) → B, diputuskan crowding; A (rank 1, CD ∞) vs F (rank 1, CD 0,9000) → A, diputuskan crowding.' },
      { q: 'Jika satu anggota front 1 harus dibuang, siapa yang dibuang dan mengapa? Apakah dua solusi ujung selalu sama di kedua objektif?',
        points: [
          'Buang yang crowding distance-nya paling kecil: F (0,9000)',
          'A dan C ujung di kedua objektif karena front 2 objektif yang bertentangan: terkecil f1 = terbesar f2',
          'Tidak selalu: jika objektif tidak bertentangan sempurna atau ada seri, ujung kedua objektif bisa berbeda',
          'Pembuangan berdasarkan kerapatan, bukan kualitas'
        ] }
    ],
    ex: 'Data dari latihan slide Week 6; kunci dihitung sendiri.' },
  { type: 'steps',
    q: 'Latihan slide Week 6 (Complete the Survivor Selection). Pool 12 solusi sudah diurutkan ke front, ukuran populasi N = 6.\nF1: A(2, 9), B(4, 6), C(7, 3)\nF2: D(3, 8), E(5, 7), G(8, 4), H(6, 5)\nF3: lima solusi sisanya.',
    steps: [
      { q: 'Front mana yang masuk utuh, front mana yang meluap, dan berapa tempat tersisa untuk front yang meluap?',
        fields: [
          { label: 'Masuk utuh', a: ['F1', 'front 1', '1'] },
          { label: 'Front yang meluap', a: ['F2', 'front 2', '2'] },
          { label: 'Tempat tersisa', a: 3, tol: 0 }
        ],
        ex: 'F1 (3) masuk, terisi 3/6. F2 (4) akan membuat 7 > 6, jadi F2 meluap dan hanya 3 tempat tersisa. F3 tidak dipertimbangkan sama sekali.' },
      { q: 'Hitung crowding distance setiap anggota F2 (4 desimal).',
        fields: [
          { label: 'CD D', a: ['∞', 'inf', 'infinity', 'tak hingga', 'infinite'] },
          { label: 'CD E', a: 1.35, tol: 0.0006 },
          { label: 'CD H', a: 1.35, tol: 0.0006 },
          { label: 'CD G', a: ['∞', 'inf', 'infinity', 'tak hingga', 'infinite'] }
        ],
        ex: 'Urut f1: D3, E5, H6, G8 (rentang 5). Urut f2: G4, H5, E7, D8 (rentang 4). E = (6 − 3)/5 + (8 − 5)/4 = 1,3500; H = (8 − 5)/5 + (7 − 4)/4 = 1,3500. D dan G ujung → ∞.' },
      { q: 'Tulis keenam solusi yang bertahan, dan berapa solusi yang dibuang tanpa pernah dihitung crowding distance-nya?',
        fields: [
          { label: 'Pasti bertahan', a: 'A B C D G', set: true },
          { label: 'Dibuang (satu dari dua yang seri)', a: ['E atau H', 'E', 'H'] },
          { label: 'Dibuang tanpa crowding', a: 5, tol: 0 }
        ],
        ex: 'A, B, C (F1) dan D, G (∞) pasti bertahan. E dan H seri 1,3500, jadi satu dipilih acak; slide tidak memberi aturan pemecah seri, tulis asumsi kalian. Lima solusi F3 dibuang hanya karena rank.' }
    ],
    ex: 'Data dari latihan slide Week 6. Kunci dihitung sendiri: crowding E dan H ternyata seri.' },
  { type: 'steps',
    q: 'Penjadwalan rapat dosen dengan NSGA-II, N = 4. f1 = jumlah hari yang dipakai, f2 = jumlah dosen yang bentrok, keduanya diminimalkan. Populasi induk dan offspring hasil crossover dan mutasi:',
    table: { head: ['Solusi', 'f1 (hari)', 'f2 (bentrok)'],
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
      { q: 'Langkah 6 (combine): gabungkan induk dan offspring. Berapa ukuran pool, dan mengapa NSGA-II tidak langsung mengganti induk dengan offspring?',
        fields: [{ label: 'Ukuran pool', a: 8, tol: 0 }],
        ex: 'Pool = N induk + N offspring = 2N = 8. Induk yang lebih baik dari offspring tetap bisa bertahan: inilah bentuk elitisme NSGA-II, tanpa parameter k.' },
      { q: 'Langkah 7 (sort again): urutkan pool ke front.',
        fields: [
          { label: 'Front 1', a: 'O1', set: true },
          { label: 'Front 2', a: 'P2 P3 O3 O4', set: true },
          { label: 'Front 3', a: 'P1 P4', set: true },
          { label: 'Front 4', a: 'O2', set: true }
        ],
        ex: 'F1 = {O1}, F2 = {P2, P3, O3, O4}, F3 = {P1, P4}, F4 = {O2}.' },
      { q: 'Langkah 8 (fill): isi N = 4. Front mana yang meluap, berapa tempat tersisa, dan berapa crowding distance anggotanya?',
        fields: [
          { label: 'Front yang meluap', a: ['F2', 'front 2', '2'] },
          { label: 'Tempat tersisa', a: 3, tol: 0 },
          { label: 'CD P2', a: 0.9913, tol: 0.0006 },
          { label: 'CD P3', a: 1.4261, tol: 0.0006 },
          { label: 'CD O3', a: ['∞', 'inf', 'infinity', 'tak hingga', 'infinite'] },
          { label: 'CD O4', a: ['∞', 'inf', 'infinity', 'tak hingga', 'infinite'] }
        ],
        ex: 'Masuk utuh: O1 (1/4). Front 2 {P2, P3, O3, O4} meluap, sisa 3 tempat. Crowding: P2 = (5 − 2)/5 + (34 − 25)/23 = 0,9913; P3 = (7 − 4)/5 + (30 − 11)/23 = 1,4261; O3 = ∞; O4 = ∞.' },
      { q: 'Tulis populasi generasi berikutnya dan solusi yang dibuang dari front yang meluap.',
        fields: [
          { label: 'Generasi berikutnya', a: 'O1 O3 O4 P3', set: true },
          { label: 'Dibuang dari front yang meluap', a: 'P2', set: true }
        ],
        ex: 'Generasi berikutnya: O1, O3, O4, P3. P2 dibuang karena crowding distance terkecil, bukan karena kualitasnya buruk. Solusi di front lebih belakang dibuang hanya karena rank.' }
    ],
    ex: 'Soal buatan sendiri mengikuti langkah 6-8 slide Week 6; kunci dihitung dengan kode.' },
  { type: 'steps',
    q: 'Agen wisata menyusun paket perjalanan dengan dua tujuan: meminimalkan biaya (ribu rupiah) dan MEMAKSIMALKAN jumlah tempat wisata. Empat paket awal: A = (100, 2), B = (150, 5), C = (200, 4), D = (120, 3).',
    steps: [
      { q: 'Untuk setiap pasangan, tulis siapa yang mendominasi atau "incomparable". Ingat arah objektif kedua dibalik (lebih banyak lebih baik).',
        fields: [
          { label: 'B vs C', a: ['B'] },
          { label: 'A vs D', a: ['incomparable', 'tidak ada', 'tidak saling mendominasi'] },
          { label: 'B vs D', a: ['incomparable', 'tidak ada', 'tidak saling mendominasi'] },
          { label: 'D vs C', a: ['incomparable', 'tidak ada', 'tidak saling mendominasi'] }
        ],
        ex: 'B lebih murah (150 < 200) dan lebih banyak tempat (5 > 4), jadi B mendominasi C. A lebih murah dari D tetapi lebih sedikit tempat: incomparable. B lebih banyak tempat tetapi lebih mahal dari D: incomparable. D lebih murah dari C tetapi tempatnya lebih sedikit (3 < 4): incomparable.' },
      { q: 'Tulis himpunan Pareto optimal (front 1) dari keempat paket. Bagaimana objektif kedua ditulis agar keduanya bisa diminimalkan?',
        fields: [
          { label: 'Pareto optimal', a: 'A B D', set: true },
          { label: 'Objektif kedua menjadi', a: ['-f2', '−f2', 'min -f2', 'minus jumlah tempat', '-jumlah tempat'] }
        ],
        ex: 'A, B, D tidak didominasi siapa pun; C didominasi B. Dengan f = min(biaya, −tempat), semua aturan dominasi "lebih kecil lebih baik" berlaku.' },
      { q: 'Studi kasus NSGA-II di dokumen MOGA: front 1 pool berisi P1(40, 1), P2(50, 2), Q3(90, 3), Q1(140, 4), P4(180, 5), tetapi N = 4. Hitung crowding distance tiap solusi dan tentukan yang dibuang.',
        fields: [
          { label: 'CD P1', a: ['∞', 'inf', 'infinity', 'tak hingga', 'infinite'] },
          { label: 'CD P2', a: 0.8571, tol: 0.0006 },
          { label: 'CD Q3', a: 1.1429, tol: 0.0006 },
          { label: 'CD Q1', a: 1.1429, tol: 0.0006 },
          { label: 'CD P4', a: ['∞', 'inf', 'infinity', 'tak hingga', 'infinite'] },
          { label: 'Dibuang', a: 'P2' }
        ],
        ex: 'Rentang biaya 180 − 40 = 140, rentang tempat 5 − 1 = 4. P2 = (90 − 40)/140 + (3 − 1)/4 = 0,357 + 0,5 = 0,8571. Q3 = (140 − 50)/140 + 0,5 = 1,1429. Q1 = (180 − 90)/140 + 0,5 = 1,1429. P1 dan P4 ujung → ∞. P2 terkecil, dibuang. Populasi baru: P1, Q3, Q1, P4.' },
      { q: 'Bandingkan GA biasa dan MOGA, lalu sebutkan dua contoh penerapan MOGA.',
        points: [
          'GA: umumnya satu tujuan dan satu solusi terbaik; MOGA: dua tujuan atau lebih dan sekumpulan solusi Pareto',
          'MOGA mencari kompromi terbaik karena tujuan saling bertentangan',
          'Contoh: penjadwalan (waktu dan biaya), transportasi (jarak dan bahan bakar), machine learning (akurasi dan kompleksitas), desain produk (berat, biaya, kekuatan)'
        ] }
    ],
    ex: 'Kasus dari dokumen MOGA (RSM); kunci diperiksa ulang dengan kode.' },
  { type: 'steps',
    q: 'Setelah ratusan generasi, NSGA-II memberi front jadwal ujian: (slot, bentrok) = (1, 179), (2, 49), (3, 13), (4, 4), (5, 0). Fakultas harus memilih satu.',
    steps: [
      { q: 'Berapa bentrok yang dihemat setiap tambahan satu slot? Di mana knee point?',
        fields: [
          { label: '1 → 2', a: 130, tol: 0 },
          { label: '2 → 3', a: 36, tol: 0 },
          { label: '3 → 4', a: 9, tol: 0 },
          { label: '4 → 5', a: 4, tol: 0 },
          { label: 'Knee point (slot)', a: 3, tol: 0 }
        ],
        ex: 'Sampai 3 slot tiap slot menghemat puluhan bentrok, setelahnya hanya satuan. Knee = 3 slot (13 bentrok).' },
      { q: 'Weighted sum: skor = w·slot + (1 − w)·bentrok, pilih skor terkecil. Jadwal (jumlah slot) mana yang terpilih untuk w = 0,5 dan untuk w = 0,95?',
        fields: [{ label: 'w = 0,5', a: 5, tol: 0 }, { label: 'w = 0,95', a: 3, tol: 0 }],
        ex: 'w = 0,5: skor 90,00; 25,50; 8,00; 4,00; 2,50 → 5 slot. w = 0,95: skor 9,90; 4,35; 3,50; 4,00; 4,75 → 3 slot. Pilihan berubah total hanya karena w, dan w harus ditentukan sebelum trade-off terlihat.' },
      { q: 'Fakultas berkata ujian tidak boleh lebih dari 3 hari (3 slot). Opsi mana yang tersisa dan mana yang kamu rekomendasikan? Tulis untuk dekan, bukan jawaban teknis.',
        points: [
          'Opsi yang memenuhi: 1, 2, dan 3 slot',
          'Rekomendasi 3 slot dengan 13 bentrok',
          'Alasan: slot ketiga masih menghemat 36 bentrok, slot setelahnya hanya sedikit (knee point)',
          'Keputusan akhir milik fakultas (a posteriori), algoritma hanya memberi pilihan'
        ] },
      { q: 'Mengapa NSGA-II tidak cukup memakai weighted sum, dan kapan weighted sum boleh dipakai?',
        points: [
          'Bobot w harus dipilih sebelum melihat trade-off apa yang tersedia',
          'Pada front cekung (concave) sebagian solusi tidak pernah terpilih berapa pun w',
          'NSGA-II mencari seluruh front dulu, baru keputusan diambil (a posteriori)',
          'Weighted sum wajar jika nilai tukar sudah diketahui, misalnya biaya per slot dalam rupiah'
        ] }
    ],
    ex: 'Front dari slide Week 6 (What Happens After a Hundred Generations); bagian weighted sum dibuat sendiri dan dihitung dengan kode.' },
  { type: 'steps',
    q: 'Self-check Week 6 dan lima kesalahan yang mengurangi nilai. Jawab setiap langkah dengan alasan.',
    steps: [
      { q: 'Hanya satu pernyataan benar. Tulis nomornya.\n1. Jika dua solusi seri di satu objektif, tidak ada yang bisa mendominasi.\n2. Crowding distance dihitung untuk setiap front di pool gabungan.\n3. Solusi dengan crowding tak hingga selalu menang atas crowding terbatas.\n4. Di NSGA-II offspring langsung menggantikan induk.\n5. Setiap solusi di front 1 incomparable terhadap setiap solusi lain di front 1.',
        fields: [{ label: 'Pernyataan benar', a: 5, tol: 0 }],
        ex: '1 salah: (3, 44) mendominasi (3, 45). 2 salah: hanya front yang meluap. 3 salah: rank dicek dulu. 4 salah: induk + offspring digabung 2N lalu dipilih N. 5 benar.' },
      { q: 'Sebutkan lima kesalahan yang paling sering mengurangi nilai pada soal NSGA-II.',
        points: [
          'Menghitung crowding dengan rentang seluruh populasi, padahal per front',
          'Lupa bahwa seri di satu objektif tetap bisa mendominasi',
          'Memakai crowding sebelum rank',
          'Mengganti induk dengan offspring langsung, padahal digabung 2N lalu dipilih N',
          'Menghitung crowding untuk front yang tidak meluap (kerja sia-sia)'
        ] },
      { q: 'Hitung skala NSGA-II: jumlah perbandingan pasangan non-dominated sort untuk pool 12 dan pool 200, serta total evaluasi untuk N = 100 selama 250 generasi.',
        fields: [
          { label: 'Pool 12', a: 66, tol: 0 },
          { label: 'Pool 200', a: 19900, tol: 0 },
          { label: 'Total evaluasi', a: 25000, tol: 0 }
        ],
        ex: 'Perbandingan = n(n − 1)/2: 12·11/2 = 66, 200·199/2 = 19.900. Evaluasi = 100 × 250 = 25.000.' },
      { q: 'Kapan NSGA-II berhenti? Sebutkan kriterianya dan mengapa berbeda dengan Hill Climbing di Week 1.',
        points: [
          'Jumlah generasi tetap (paling umum, sesuai budget)',
          'Front berhenti bergerak antar generasi',
          'Indikator kualitas seperti hypervolume mendatar',
          'Tidak ada titik "nol bentrok" yang menandai selesai, jadi dipakai budget; Hill Climbing berhenti saat tidak ada tetangga yang lebih baik'
        ] }
    ],
    ex: 'Pernyataan dari slide Week 6 (Self-Check, Five Mistakes, Real Scale, When Does It Stop).' }
]);
