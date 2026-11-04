// Kecerdasan Artifisial — soal UTS KA 2025 (sama dengan LKS GA-2) dan tiga soal mirip berpola sama.
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
      { q: 'd. Pasangkan Parent1–Parent2 dan Parent3–Parent4, lalu lakukan order crossover dengan TP1 = 2 dan TP2 = 4 (segmen = gen ke-2 sampai gen ke-4, keduanya termasuk). Anak1 = segmen Parent1 + urutan Parent2, Anak2 = segmen Parent2 + urutan Parent1, begitu juga Anak3 dan Anak4.',
        fields: [
          { label: 'Anak1', a: '12345' },
          { label: 'Anak2', a: '24135' },
          { label: 'Anak3', a: '32145' },
          { label: 'Anak4', a: '12345' }
        ],
        ex: 'Anak1: segmen 2 3 4 dari A1; urutan A2 mulai gen ke-5: 5 2 4 1 3, buang segmen → 5 1; isi gen ke-5 dst. melingkar → 1 2 3 4 5. Anak2: segmen 4 1 3 dari A2; urutan A1 mulai gen ke-5: 5 1 2 3 4, buang segmen → 5 2; isi gen ke-5 dst. melingkar → 2 4 1 3 5. Anak3: segmen 2 1 4 dari A4; urutan A1 mulai gen ke-5: 5 1 2 3 4, buang segmen → 5 3; isi gen ke-5 dst. melingkar → 3 2 1 4 5. Anak4: segmen 2 3 4 dari A1; urutan A4 mulai gen ke-5: 5 3 2 1 4, buang segmen → 5 1; isi gen ke-5 dst. melingkar → 1 2 3 4 5. Tafsiran lain (TP = potong setelah gen 2 dan gen 4, segmen gen 3–4): Anak1–4 = 21345, 24135, 23145, 21345. Tulis asumsi segmenmu di lembar ujian.' },
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
          { label: 'Anak1 hasil mutasi', a: '12345' },
          { label: 'Anak2 hasil mutasi', a: '24135' },
          { label: 'Anak3 hasil mutasi', a: '52143' },
          { label: 'Anak4 hasil mutasi', a: '13245' }
        ],
        ex: 'Anak1: 0,21 ≥ 0,2, tetap 12345; Anak2: 0,54 ≥ 0,2, tetap 24135; Anak3: 0,05 < 0,2, tukar gen 1 dan 5: 32145 → 52143; Anak4: 0,19 < 0,2, tukar gen 2 dan 3: 12345 → 13245. Tafsiran lain (TP = potong setelah gen 2 dan gen 4, segmen gen 3–4): hasil mutasi 21345, 24135, 53142, 23145. Tulis asumsi segmenmu di lembar ujian.' },
      { q: 'f. Generational replacement tanpa elitisme: keempat anak menggantikan seluruh populasi lama. Hitung total jarak dan fitness generasi baru.',
        fields: [
          { label: 'Total jarak Anak1', a: 33, tol: 0 },
          { label: 'Fitness Anak1', a: 0.0303, tol: 0.0001 },
          { label: 'Total jarak Anak2', a: 49, tol: 0 },
          { label: 'Fitness Anak2', a: 0.0204, tol: 0.0001 },
          { label: 'Total jarak Anak3', a: 39, tol: 0 },
          { label: 'Fitness Anak3', a: 0.0256, tol: 0.0001 },
          { label: 'Total jarak Anak4', a: 43, tol: 0 },
          { label: 'Fitness Anak4', a: 0.0233, tol: 0.0001 }
        ],
        ex: 'Anak1 A→B→C→D→E→A = 33, fitness 0,0303. Anak2 B→D→A→C→E→B = 49, fitness 0,0204. Anak3 E→B→A→D→C→E = 39, fitness 0,0256. Anak4 A→C→B→D→E→A = 43, fitness 0,0233. Rata-rata jarak 40,75 → 41,00. Tafsiran lain (TP = potong setelah gen 2 dan gen 4, segmen gen 3–4): jarak 46, 49, 49, 47. Tulis asumsi segmenmu di lembar ujian.' },
      { q: 'g. Tuliskan jalur terbaik di generasi baru dan jalur terbaik yang pernah ditemukan selama proses (generasi awal + generasi baru), beserta total jaraknya.',
        fields: [
          { label: 'Jalur terbaik generasi baru', a: ['12345', 'ABCDE', 'ABCDEA'] },
          { label: 'Jaraknya', a: 33, tol: 0 },
          { label: 'Jalur terbaik selama proses', a: ['12345', 'ABCDE', 'ABCDEA'] },
          { label: 'Jarak terbaik selama proses', a: 33, tol: 0 }
        ],
        ex: 'Generasi baru: Anak1 = A→B→C→D→E→A (33). Generasi baru sama baiknya dengan generasi awal (33): anak terbaik kebetulan mewarisi rute terbaik induknya, sehingga tidak ada perbaikan dan tidak ada kemunduran. Optimum sebenarnya (dicek dengan mencoba semua permutasi) = 33. Tafsiran lain (TP = potong setelah gen 2 dan gen 4, segmen gen 3–4): terbaik generasi baru 46, terbaik selama proses 33. Tulis asumsi segmenmu di lembar ujian.' },
      { q: 'Jelaskan apa yang terjadi jika dipakai elitisme k = 1, dan mengapa jawaban g bergantung pada ada tidaknya elitisme.',
        points: [
          'Elitisme k = 1 menyalin kromosom terbaik generasi lama (jarak terpendek) ke generasi baru tanpa diubah',
          'Kromosom terbaik menggantikan anak terburuk (jarak terpanjang)',
          'Tanpa elitisme solusi terbaik bisa hilang, sehingga kurva jarak terbaik bisa naik',
          'Di soal ini generasi baru hanya menyamai generasi awal, jadi elitisme tidak mengubah jawaban g; perhatikan bahwa anak terbaik sama persis dengan induk terbaik'
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
      { q: 'd. Pasangkan Parent1–Parent2 dan Parent3–Parent4, lalu lakukan order crossover dengan TP1 = 2 dan TP2 = 4 (segmen = gen ke-2 sampai gen ke-4, keduanya termasuk). Anak1 = segmen Parent1 + urutan Parent2, Anak2 = segmen Parent2 + urutan Parent1, begitu juga Anak3 dan Anak4.',
        fields: [
          { label: 'Anak1', a: '12534' },
          { label: 'Anak2', a: '35214' },
          { label: 'Anak3', a: '12534' },
          { label: 'Anak4', a: '54132' }
        ],
        ex: 'Anak1: segmen 2 5 3 dari A2; urutan A4 mulai gen ke-5: 3 4 5 2 1, buang segmen → 4 1; isi gen ke-5 dst. melingkar → 1 2 5 3 4. Anak2: segmen 5 2 1 dari A4; urutan A2 mulai gen ke-5: 4 1 2 5 3, buang segmen → 4 3; isi gen ke-5 dst. melingkar → 3 5 2 1 4. Anak3: segmen 2 5 3 dari A2; urutan A3 mulai gen ke-5: 2 5 4 1 3, buang segmen → 4 1; isi gen ke-5 dst. melingkar → 1 2 5 3 4. Anak4: segmen 4 1 3 dari A3; urutan A2 mulai gen ke-5: 4 1 2 5 3, buang segmen → 2 5; isi gen ke-5 dst. melingkar → 5 4 1 3 2. Tafsiran lain (TP = potong setelah gen 2 dan gen 4, segmen gen 3–4): Anak1–4 = 21534, 53214, 41532, 25134. Tulis asumsi segmenmu di lembar ujian.' },
      { q: 'e. Probabilitas mutasi = 0,2. Anak dimutasi jika nilai random < 0,2, dengan swap mutation pada indeks gen yang ditentukan.',
        table: { head: ['Anak', 'Nilai random', 'Indeks gen'],
          rows: [
            ['Anak1', '0,11', '1 dan 2'],
            ['Anak2', '0,42', '2 dan 5'],
            ['Anak3', '0,07', '1 dan 3'],
            ['Anak4', '0,55', '3 dan 5']
          ] },
        fields: [
          { label: 'Anak yang dimutasi (pisahkan spasi)', a: 'Anak1 Anak3', set: true },
          { label: 'Anak1 hasil mutasi', a: '21534' },
          { label: 'Anak2 hasil mutasi', a: '35214' },
          { label: 'Anak3 hasil mutasi', a: '52134' },
          { label: 'Anak4 hasil mutasi', a: '54132' }
        ],
        ex: 'Anak1: 0,11 < 0,2, tukar gen 1 dan 2: 12534 → 21534; Anak2: 0,42 ≥ 0,2, tetap 35214; Anak3: 0,07 < 0,2, tukar gen 1 dan 3: 12534 → 52134; Anak4: 0,55 ≥ 0,2, tetap 54132. Tafsiran lain (TP = potong setelah gen 2 dan gen 4, segmen gen 3–4): hasil mutasi 12534, 53214, 51432, 25134. Tulis asumsi segmenmu di lembar ujian.' },
      { q: 'f. Generational replacement tanpa elitisme: keempat anak menggantikan seluruh populasi lama. Hitung total jarak dan fitness generasi baru.',
        fields: [
          { label: 'Total jarak Anak1', a: 46, tol: 0 },
          { label: 'Fitness Anak1', a: 0.0217, tol: 0.0001 },
          { label: 'Total jarak Anak2', a: 41, tol: 0 },
          { label: 'Fitness Anak2', a: 0.0244, tol: 0.0001 },
          { label: 'Total jarak Anak3', a: 57, tol: 0 },
          { label: 'Fitness Anak3', a: 0.0175, tol: 0.0001 },
          { label: 'Total jarak Anak4', a: 42, tol: 0 },
          { label: 'Fitness Anak4', a: 0.0238, tol: 0.0001 }
        ],
        ex: 'Anak1 B→A→E→C→D→B = 46, fitness 0,0217. Anak2 C→E→B→A→D→C = 41, fitness 0,0244. Anak3 E→B→A→C→D→E = 57, fitness 0,0175. Anak4 E→D→A→C→B→E = 42, fitness 0,0238. Rata-rata jarak 44,50 → 46,50. Tafsiran lain (TP = potong setelah gen 2 dan gen 4, segmen gen 3–4): jarak 41, 40, 38, 48. Tulis asumsi segmenmu di lembar ujian.' },
      { q: 'g. Tuliskan jalur terbaik di generasi baru dan jalur terbaik yang pernah ditemukan selama proses (generasi awal + generasi baru), beserta total jaraknya.',
        fields: [
          { label: 'Jalur terbaik generasi baru', a: ['35214', 'CEBAD', 'CEBADC'] },
          { label: 'Jaraknya', a: 41, tol: 0 },
          { label: 'Jalur terbaik selama proses', a: ['23415', 'BCDAE', 'BCDAEB'] },
          { label: 'Jarak terbaik selama proses', a: 38, tol: 0 }
        ],
        ex: 'Generasi baru: Anak2 = C→E→B→A→D→C (41). Tetapi A1 di generasi awal (B→C→D→A→E→B, 38) lebih pendek dan hilang karena tidak ada elitisme. Jawaban "jalur paling optimal yang didapatkan" = B→C→D→A→E→B = 38; sebutkan juga bahwa generasi baru justru memburuk. Optimum sebenarnya (dicek dengan mencoba semua permutasi) = 31. Tafsiran lain (TP = potong setelah gen 2 dan gen 4, segmen gen 3–4): terbaik generasi baru 38, terbaik selama proses 38. Tulis asumsi segmenmu di lembar ujian.' },
      { q: 'Jelaskan apa yang terjadi jika dipakai elitisme k = 1, dan mengapa jawaban g bergantung pada ada tidaknya elitisme.',
        points: [
          'Elitisme k = 1 menyalin kromosom terbaik generasi lama (jarak terpendek) ke generasi baru tanpa diubah',
          'Kromosom terbaik menggantikan anak terburuk (jarak terpanjang)',
          'Tanpa elitisme solusi terbaik bisa hilang, sehingga kurva jarak terbaik bisa naik',
          'Di soal ini rute terbaik (38) hilang di generasi baru, jadi jawaban g adalah rute generasi awal'
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
      { q: 'd. Pasangkan Parent1–Parent2 dan Parent3–Parent4, lalu lakukan order crossover dengan TP1 = 2 dan TP2 = 4 (segmen = gen ke-2 sampai gen ke-4, keduanya termasuk). Anak1 = segmen Parent1 + urutan Parent2, Anak2 = segmen Parent2 + urutan Parent1, begitu juga Anak3 dan Anak4.',
        fields: [
          { label: 'Anak1', a: '12345' },
          { label: 'Anak2', a: '31425' },
          { label: 'Anak3', a: '23145' },
          { label: 'Anak4', a: '31425' }
        ],
        ex: 'Anak1: segmen 2 3 4 dari A4; urutan A2 mulai gen ke-5: 3 5 1 4 2, buang segmen → 5 1; isi gen ke-5 dst. melingkar → 1 2 3 4 5. Anak2: segmen 1 4 2 dari A2; urutan A4 mulai gen ke-5: 1 5 2 3 4, buang segmen → 5 3; isi gen ke-5 dst. melingkar → 3 1 4 2 5. Anak3: segmen 3 1 4 dari A3; urutan A2 mulai gen ke-5: 3 5 1 4 2, buang segmen → 5 2; isi gen ke-5 dst. melingkar → 2 3 1 4 5. Anak4: segmen 1 4 2 dari A2; urutan A3 mulai gen ke-5: 5 2 3 1 4, buang segmen → 5 3; isi gen ke-5 dst. melingkar → 3 1 4 2 5. Tafsiran lain (TP = potong setelah gen 2 dan gen 4, segmen gen 3–4): Anak1–4 = 12345, 53421, 52143, 31425. Tulis asumsi segmenmu di lembar ujian.' },
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
          { label: 'Anak2 hasil mutasi', a: '35421' },
          { label: 'Anak3 hasil mutasi', a: '23145' },
          { label: 'Anak4 hasil mutasi', a: '13425' }
        ],
        ex: 'Anak1: 0,31 ≥ 0,2, tetap 12345; Anak2: 0,12 < 0,2, tukar gen 2 dan 5: 31425 → 35421; Anak3: 0,47 ≥ 0,2, tetap 23145; Anak4: 0,08 < 0,2, tukar gen 1 dan 2: 31425 → 13425. Tafsiran lain (TP = potong setelah gen 2 dan gen 4, segmen gen 3–4): hasil mutasi 12345, 51423, 52143, 13425. Tulis asumsi segmenmu di lembar ujian.' },
      { q: 'f. Generational replacement tanpa elitisme: keempat anak menggantikan seluruh populasi lama. Hitung total jarak dan fitness generasi baru.',
        fields: [
          { label: 'Total jarak Anak1', a: 43, tol: 0 },
          { label: 'Fitness Anak1', a: 0.0233, tol: 0.0001 },
          { label: 'Total jarak Anak2', a: 54, tol: 0 },
          { label: 'Fitness Anak2', a: 0.0185, tol: 0.0001 },
          { label: 'Total jarak Anak3', a: 51, tol: 0 },
          { label: 'Fitness Anak3', a: 0.0196, tol: 0.0001 },
          { label: 'Total jarak Anak4', a: 39, tol: 0 },
          { label: 'Fitness Anak4', a: 0.0256, tol: 0.0001 }
        ],
        ex: 'Anak1 A→B→C→D→E→A = 43, fitness 0,0233. Anak2 C→E→D→B→A→C = 54, fitness 0,0185. Anak3 B→C→A→D→E→B = 51, fitness 0,0196. Anak4 A→C→D→B→E→A = 39, fitness 0,0256. Rata-rata jarak 43,25 → 46,75. Tafsiran lain (TP = potong setelah gen 2 dan gen 4, segmen gen 3–4): jarak 43, 46, 40, 39. Tulis asumsi segmenmu di lembar ujian.' },
      { q: 'g. Tuliskan jalur terbaik di generasi baru dan jalur terbaik yang pernah ditemukan selama proses (generasi awal + generasi baru), beserta total jaraknya.',
        fields: [
          { label: 'Jalur terbaik generasi baru', a: ['13425', 'ACDBE', 'ACDBEA'] },
          { label: 'Jaraknya', a: 39, tol: 0 },
          { label: 'Jalur terbaik selama proses', a: ['52341', 'EBCDA', 'EBCDAE'] },
          { label: 'Jarak terbaik selama proses', a: 37, tol: 0 }
        ],
        ex: 'Generasi baru: Anak4 = A→C→D→B→E→A (39). Tetapi A4 di generasi awal (E→B→C→D→A→E, 37) lebih pendek dan hilang karena tidak ada elitisme. Jawaban "jalur paling optimal yang didapatkan" = E→B→C→D→A→E = 37; sebutkan juga bahwa generasi baru justru memburuk. Tafsiran lain (TP = potong setelah gen 2 dan gen 4, segmen gen 3–4): terbaik generasi baru 39, terbaik selama proses 37. Tulis asumsi segmenmu di lembar ujian.' },
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
      { q: 'd. Pasangkan Parent1–Parent2 dan Parent3–Parent4, lalu lakukan order crossover dengan TP1 = 2 dan TP2 = 5 (segmen = gen ke-2 sampai gen ke-5, keduanya termasuk). Anak1 = segmen Parent1 + urutan Parent2, Anak2 = segmen Parent2 + urutan Parent1, begitu juga Anak3 dan Anak4.',
        fields: [
          { label: 'Anak1', a: '462153' },
          { label: 'Anak2', a: '165342' },
          { label: 'Anak3', a: '431562' },
          { label: 'Anak4', a: '653142' }
        ],
        ex: 'Anak1: segmen 6 2 1 5 dari A2; urutan A3 mulai gen ke-6: 2 1 6 5 3 4, buang segmen → 3 4; isi gen ke-6 dst. melingkar → 4 6 2 1 5 3. Anak2: segmen 6 5 3 4 dari A3; urutan A2 mulai gen ke-6: 4 3 6 2 1 5, buang segmen → 2 1; isi gen ke-6 dst. melingkar → 1 6 5 3 4 2. Anak3: segmen 3 1 5 6 dari A1; urutan A4 mulai gen ke-6: 2 6 5 3 1 4, buang segmen → 2 4; isi gen ke-6 dst. melingkar → 4 3 1 5 6 2. Anak4: segmen 5 3 1 4 dari A4; urutan A1 mulai gen ke-6: 2 4 3 1 5 6, buang segmen → 2 6; isi gen ke-6 dst. melingkar → 6 5 3 1 4 2. Tafsiran lain (TP = potong setelah gen 2 dan gen 5, segmen gen 3–5): Anak1–4 = 342156, 215346, 341562, 563142. Tulis asumsi segmenmu di lembar ujian.' },
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
          { label: 'Anak1 hasil mutasi', a: '462153' },
          { label: 'Anak2 hasil mutasi', a: '125346' },
          { label: 'Anak3 hasil mutasi', a: '431562' },
          { label: 'Anak4 hasil mutasi', a: '253146' }
        ],
        ex: 'Anak1: 0,31 ≥ 0,2, tetap 462153; Anak2: 0,12 < 0,2, tukar gen 2 dan 6: 165342 → 125346; Anak3: 0,47 ≥ 0,2, tetap 431562; Anak4: 0,08 < 0,2, tukar gen 1 dan 6: 653142 → 253146. Tafsiran lain (TP = potong setelah gen 2 dan gen 5, segmen gen 3–5): hasil mutasi 342156, 265341, 341562, 263145. Tulis asumsi segmenmu di lembar ujian.' },
      { q: 'f. Generational replacement tanpa elitisme: keempat anak menggantikan seluruh populasi lama. Hitung total jarak dan fitness generasi baru.',
        fields: [
          { label: 'Total jarak Anak1', a: 70, tol: 0 },
          { label: 'Fitness Anak1', a: 0.0143, tol: 0.0001 },
          { label: 'Total jarak Anak2', a: 66, tol: 0 },
          { label: 'Fitness Anak2', a: 0.0152, tol: 0.0001 },
          { label: 'Total jarak Anak3', a: 80, tol: 0 },
          { label: 'Fitness Anak3', a: 0.0125, tol: 0.0001 },
          { label: 'Total jarak Anak4', a: 63, tol: 0 },
          { label: 'Fitness Anak4', a: 0.0159, tol: 0.0001 }
        ],
        ex: 'Anak1 D→F→B→A→E→C→D = 70, fitness 0,0143. Anak2 A→B→E→C→D→F→A = 66, fitness 0,0152. Anak3 D→C→A→E→F→B→D = 80, fitness 0,0125. Anak4 B→E→C→A→D→F→B = 63, fitness 0,0159. Rata-rata jarak 71,75 → 69,75. Tafsiran lain (TP = potong setelah gen 2 dan gen 5, segmen gen 3–5): jarak 72, 64, 71, 59. Tulis asumsi segmenmu di lembar ujian.' },
      { q: 'g. Tuliskan jalur terbaik di generasi baru dan jalur terbaik yang pernah ditemukan selama proses (generasi awal + generasi baru), beserta total jaraknya.',
        fields: [
          { label: 'Jalur terbaik generasi baru', a: ['253146', 'BECADF', 'BECADFB'] },
          { label: 'Jaraknya', a: 63, tol: 0 },
          { label: 'Jalur terbaik selama proses', a: ['253146', 'BECADF', 'BECADFB'] },
          { label: 'Jarak terbaik selama proses', a: 63, tol: 0 }
        ],
        ex: 'Generasi baru: Anak4 = B→E→C→A→D→F→B (63). Generasi baru lebih baik dari generasi awal (terbaik lama A2 = 66): crossover dan mutasi berhasil menggabungkan bagian rute yang baik. Tafsiran lain (TP = potong setelah gen 2 dan gen 5, segmen gen 3–5): terbaik generasi baru 59, terbaik selama proses 59. Tulis asumsi segmenmu di lembar ujian.' },
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
