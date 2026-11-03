// Manajemen Proyek — soal remedial UTS Ganjil 2024/2025 (tipe A) dan soal mirip bentuknya.
// Hanya bagian hitungan. Soal 2 (WBS) ada di tab Materi sebagai contoh soal bergambar.
// Kunci dihitung sendiri dengan kode; kunci jaringan dicek ulang oleh tests/data.test.js. Uang dalam juta rupiah.
var MP_RM = 'Soal remedial UTS tahun lalu (Ganjil 2024/2025, tipe A). Kunci dihitung sendiri.';
var MP_RM_MIRIP = 'Soal buatan sendiri yang meniru bentuk soal remedial, dengan kasus dan angka berbeda.';
var MP_RM_NET = [['A', 1, 2, 5], ['B', 1, 4, 7], ['C', 1, 3, 5], ['D', 2, 5, 7], ['E', 3, 4, 6], ['F', 3, 6, 10], ['G', 4, 5, 9], ['H', 5, 6, 8]];
var MP_FSTS = 'FS = free slack (ES aktivitas sesudahnya yang paling awal − EF), TS = total slack (LS − ES), sesuai definisi slide. Lembar rumus ujian menukar kedua nama ini; lihat tab Materi.';
var MP_KINERJA_BOROS = ['over budget', 'boros', 'melebihi anggaran', 'lebih boros', 'biaya membengkak', 'cost overrun'];
var MP_KINERJA_HEMAT = ['under budget', 'hemat', 'di bawah anggaran', 'lebih hemat'];
var MP_KINERJA_CEPAT = ['ahead of schedule', 'lebih cepat', 'lebih cepat dari jadwal', 'mendahului jadwal', 'ahead'];
var MP_KINERJA_LAMBAT = ['behind schedule', 'terlambat', 'lebih lambat', 'lebih lambat dari jadwal', 'behind'];

BANK.isian('mp', 'rm', 'Soal Remedial UTS Tahun Lalu', [
  { type: 'fill', q: 'Soal 1 (30 poin).\nPada tahun 2017 di kampus Telkom University terdapat usulan proyek investasi server dengan dana Rp1.000.000.000, dengan cashflow berbeda tiap tahun. Selama beroperasi, proyek membutuhkan biaya maintenance Rp25 juta per tahun, dan setiap dua tahun (tahun ke-2, 4, 6, dst.) ada biaya pameran Rp50 juta. Pendapatan tahun ke-1 Rp300 juta, tahun ke-2 Rp250 juta, tahun ke-3 Rp380 juta, dan tahun ke-4 Rp400 juta. Discount rate 6%.\nLangkah pertama: hitung total biaya dan arus kas bersih tiap tahun (juta rupiah).',
    fields: [
      { label: 'Biaya tahun 1', a: 25, tol: 0 }, { label: 'Biaya tahun 2', a: 75, tol: 0 },
      { label: 'Biaya tahun 3', a: 25, tol: 0 }, { label: 'Biaya tahun 4', a: 75, tol: 0 },
      { label: 'Arus kas bersih tahun 0', a: -1000, tol: 0 }, { label: 'Arus kas bersih tahun 1', a: 275, tol: 0 },
      { label: 'Arus kas bersih tahun 2', a: 175, tol: 0 }, { label: 'Arus kas bersih tahun 3', a: 355, tol: 0 },
      { label: 'Arus kas bersih tahun 4', a: 325, tol: 0 }],
    ex: 'Maintenance berjalan setiap tahun selama beroperasi (tahun 1-4). Pameran hanya di tahun genap, jadi biaya tahun 2 dan 4 = 25 + 50 = 75. Arus kas bersih = pendapatan − biaya: 300 − 25 = 275, 250 − 75 = 175, 380 − 25 = 355, 400 − 75 = 325. Tahun 0 = −1.000 (dana investasi). ' + MP_RM },
  { type: 'fill', q: 'Lanjutan Soal 1. Arus kas bersih (juta rupiah): tahun 0 = −1.000, tahun 1 = 275, tahun 2 = 175, tahun 3 = 355, tahun 4 = 325. Biaya tahun 1-4: 25, 75, 25, 75. Pendapatan: 300, 250, 380, 400. Discount rate 6%.\nBerapa NPV, ROI, dan PBP? Apakah proyek layak dilaksanakan?',
    fields: [
      { label: 'NPV (juta)', a: -29.32, tol: 0.5 },
      { label: 'ROI (%), rumus lembar soal: (benefit diskonto − cost diskonto) / cost diskonto', a: -2.5, tol: 0.05 },
      { label: 'PBP (tahun), rumus n + (a − b)/(c − b)', a: 3.6, tol: 0.01 },
      { label: 'Kelayakan proyek', a: ['tidak layak', 'tidak', 'tidak layak dilaksanakan', 'ditolak'] }],
    ex: 'DF 6%: 0,9434; 0,8900; 0,8396; 0,7921. PV arus kas bersih: 259,43 + 155,75 + 298,06 + 257,43 = 970,68 (dijumlah sebelum dibulatkan), jadi NPV = 970,68 − 1.000 = −29,32. Benefit diskonto = 283,02 + 222,50 + 319,06 + 316,84 ≈ 1.141,41. Cost diskonto = 1.000 + 23,58 + 66,75 + 20,99 + 59,41 = 1.170,73. ROI = (1.141,41 − 1.170,73)/1.170,73 = −2,50%. Kumulatif arus kas 275, 450, 805, 1.130: PBP = 3 + (1.000 − 805)/(1.130 − 805) = 3,6 tahun. Kumulatif PV sampai tahun 4 baru 970,68, jadi secara diskonto modal belum kembali. NPV negatif, jadi proyek tidak layak walaupun PBP biasa 3,6 tahun. Kalau ROI dihitung tanpa diskonto, hasilnya (1.330 − 1.200)/1.200 = 10,83%. ' + MP_RM },
  { type: 'fill', q: 'Soal 3 (30 poin), bagian a. Sebutkan semua PATH pada kasus berikut, urutkan dari total nilai terkecil, lalu tentukan critical path. Lembar jawaban menyediakan 8 baris; isi sebanyak path yang benar-benar ada. Path boleh ditulis sebagai urutan aktivitas (A-D-H) atau urutan node (1-2-5-6).',
    table: { head: MP_AOA, rows: MP_RM_NET },
    fields: [
      { label: 'Jumlah path', a: 4, tol: 0 },
      { label: 'Path 1 (total terkecil)', a: ['CF', '136'] }, { label: 'Total path 1', a: 15, tol: 0 },
      { label: 'Path 2', a: ['ADH', '1256'] }, { label: 'Total path 2', a: 20, tol: 0 },
      { label: 'Path 3', a: ['BGH', '1456'] }, { label: 'Total path 3', a: 24, tol: 0 },
      { label: 'Path 4 (total terbesar)', a: ['CEGH', '13456'] }, { label: 'Total path 4', a: 28, tol: 0 },
      { label: 'Critical path', a: ['CEGH', '13456'] }, { label: 'Durasi proyek', a: 28, tol: 0 }],
    ex: 'Dari node 1 keluar A (ke 2), B (ke 4), dan C (ke 3). Path: C-F (1-3-6) = 5 + 10 = 15, A-D-H (1-2-5-6) = 5 + 7 + 8 = 20, B-G-H (1-4-5-6) = 7 + 9 + 8 = 24, C-E-G-H (1-3-4-5-6) = 5 + 6 + 9 + 8 = 28. Critical path adalah path terpanjang, C-E-G-H, jadi proyek selesai paling cepat 28 hari. Gambar network diagram-nya ada di tab Materi. ' + MP_RM },
  { type: 'fill', q: 'Soal 3 bagian b (aktivitas A-D). Hitung ES, EF, LS, LF, FS, dan TS dengan forward pass dan backward pass. ' + MP_FSTS,
    table: { head: MP_AOA, rows: MP_RM_NET },
    fields: [
      { label: 'ES A', a: 0, tol: 0 }, { label: 'EF A', a: 5, tol: 0 }, { label: 'LS A', a: 8, tol: 0 }, { label: 'LF A', a: 13, tol: 0 }, { label: 'Free slack A', a: 0, tol: 0 }, { label: 'Total slack A', a: 8, tol: 0 },
      { label: 'ES B', a: 0, tol: 0 }, { label: 'EF B', a: 7, tol: 0 }, { label: 'LS B', a: 4, tol: 0 }, { label: 'LF B', a: 11, tol: 0 }, { label: 'Free slack B', a: 4, tol: 0 }, { label: 'Total slack B', a: 4, tol: 0 },
      { label: 'ES C', a: 0, tol: 0 }, { label: 'EF C', a: 5, tol: 0 }, { label: 'LS C', a: 0, tol: 0 }, { label: 'LF C', a: 5, tol: 0 }, { label: 'Free slack C', a: 0, tol: 0 }, { label: 'Total slack C', a: 0, tol: 0 },
      { label: 'ES D', a: 5, tol: 0 }, { label: 'EF D', a: 12, tol: 0 }, { label: 'LS D', a: 13, tol: 0 }, { label: 'LF D', a: 20, tol: 0 }, { label: 'Free slack D', a: 8, tol: 0 }, { label: 'Total slack D', a: 8, tol: 0 }],
    ex: 'Forward pass (waktu paling awal tiap node): node 1 = 0, node 2 = 5, node 3 = 5, node 4 = max(0 + 7, 5 + 6) = 11, node 5 = max(5 + 7, 11 + 9) = 20, node 6 = max(20 + 8, 5 + 10) = 28. ES aktivitas = waktu node awalnya. Backward pass: node 6 = 28, node 5 = 20, node 4 = 11, node 3 = min(11 − 6, 28 − 10) = 5, node 2 = 20 − 7 = 13. LF aktivitas = waktu paling lambat node akhirnya, LS = LF − durasi. A: TS = 8 − 0 = 8, tetapi FS = ES D − EF A = 5 − 5 = 0, karena D langsung bisa mulai begitu A selesai. B: FS = ES G − EF B = 11 − 7 = 4. D: FS = ES H − EF D = 20 − 12 = 8. ' + MP_RM },
  { type: 'fill', q: 'Soal 3 bagian b (aktivitas E-H). Hitung ES, EF, LS, LF, FS, dan TS dengan forward pass dan backward pass. ' + MP_FSTS,
    table: { head: MP_AOA, rows: MP_RM_NET },
    fields: [
      { label: 'ES E', a: 5, tol: 0 }, { label: 'EF E', a: 11, tol: 0 }, { label: 'LS E', a: 5, tol: 0 }, { label: 'LF E', a: 11, tol: 0 }, { label: 'Free slack E', a: 0, tol: 0 }, { label: 'Total slack E', a: 0, tol: 0 },
      { label: 'ES F', a: 5, tol: 0 }, { label: 'EF F', a: 15, tol: 0 }, { label: 'LS F', a: 18, tol: 0 }, { label: 'LF F', a: 28, tol: 0 }, { label: 'Free slack F', a: 13, tol: 0 }, { label: 'Total slack F', a: 13, tol: 0 },
      { label: 'ES G', a: 11, tol: 0 }, { label: 'EF G', a: 20, tol: 0 }, { label: 'LS G', a: 11, tol: 0 }, { label: 'LF G', a: 20, tol: 0 }, { label: 'Free slack G', a: 0, tol: 0 }, { label: 'Total slack G', a: 0, tol: 0 },
      { label: 'ES H', a: 20, tol: 0 }, { label: 'EF H', a: 28, tol: 0 }, { label: 'LS H', a: 20, tol: 0 }, { label: 'LF H', a: 28, tol: 0 }, { label: 'Free slack H', a: 0, tol: 0 }, { label: 'Total slack H', a: 0, tol: 0 }],
    ex: 'E, G, dan H ada di critical path C-E-G-H, jadi slack-nya 0. F berakhir di node 6 (akhir proyek): LF F = 28, LS F = 28 − 10 = 18, TS = 18 − 5 = 13, dan FS = 28 − 15 = 13 karena tidak ada aktivitas sesudahnya. ES G = 11 karena G menunggu B (selesai 7) dan E (selesai 11). ' + MP_RM },
  { type: 'fill', q: 'Soal 4 (20 poin), bagian a. Sebuah proyek konstruksi memiliki anggaran Rp200 juta dengan durasi 1 tahun. Pada akhir bulan ke-8, pekerjaan dilaporkan selesai 70% dari total proyek. Anggaran yang telah dikeluarkan hingga bulan ke-8 adalah Rp150 juta. Tentukan PV, EV, AC, dan BAC di akhir bulan ke-8 (juta rupiah).',
    fields: [{ label: 'PV', a: 133.33, tol: 0.01 }, { label: 'EV', a: 140, tol: 0.01 }, { label: 'AC', a: 150, tol: 0.01 }, { label: 'BAC', a: 200, tol: 0.01 }],
    ex: 'PV = 200 × 8/12 = 133,33. EV = 70% × 200 = 140. AC = 150. BAC = 200. ' + MP_RM },
  { type: 'fill', q: 'Soal 4 bagian b. Lanjutan proyek konstruksi (BAC 200, PV 133,33, EV 140, AC 150, durasi rencana 12 bulan). Hitung CPI, CV, SPI, SV, EAC, dan ETC di akhir bulan ke-8, lalu jelaskan kinerja anggaran dan jadwal.',
    fields: [
      { label: 'CPI', a: 0.93, tol: 0.005 }, { label: 'CV (juta)', a: -10, tol: 0.01 },
      { label: 'SPI', a: 1.05, tol: 0.005 }, { label: 'SV (juta)', a: 6.67, tol: 0.01 },
      { label: 'EAC (juta)', a: 214.29, tol: 0.05 }, { label: 'ETC, Estimated Time to Complete (bulan)', a: 11.43, tol: 0.01 },
      { label: 'Kinerja anggaran', a: MP_KINERJA_BOROS }, { label: 'Kinerja jadwal', a: MP_KINERJA_CEPAT }],
    ex: 'CPI = 140/150 = 0,93. CV = 140 − 150 = −10. SPI = 140/133,33 = 1,05. SV = 140 − 133,33 = 6,67. EAC = 200/0,9333 = 214,29. ETC = 12/1,05 = 11,43 bulan. CPI < 1 (CV negatif): biaya yang keluar lebih besar dari nilai pekerjaan, jadi proyek over budget. SPI > 1 (SV positif): pekerjaan lebih maju dari rencana, jadi proyek ahead of schedule dan diperkirakan selesai sekitar 11,4 bulan. ' + MP_RM }
]);

BANK.isian('mp', 'mr', 'Mirip Soal Remedial', [
  { type: 'fill', q: 'Integration Management (30 poin).\nPada tahun 2025, SMK Teknologi Nusantara di Bandung mengusulkan proyek laboratorium jaringan dengan dana Rp800.000.000. Selama beroperasi, laboratorium membutuhkan biaya pemeliharaan Rp20 juta per tahun, dan setiap dua tahun (tahun ke-2, 4, dst.) ada biaya pembaruan lisensi perangkat Rp40 juta. Pendapatan dari pelatihan sertifikasi tahun ke-1 Rp260 juta, tahun ke-2 Rp280 juta, tahun ke-3 Rp300 juta, dan tahun ke-4 Rp320 juta. Discount rate 8%.\nBerapa NPV, ROI, dan PBP? Apakah proyek layak?',
    fields: [
      { label: 'Arus kas bersih tahun 2 (juta)', a: 220, tol: 0 },
      { label: 'NPV (juta)', a: 24.22, tol: 0.5 },
      { label: 'ROI (%), rumus lembar soal', a: 2.6, tol: 0.05 },
      { label: 'PBP (tahun)', a: 3.23, tol: 0.01 },
      { label: 'PBP diskonto (tahun)', a: 3.87, tol: 0.01 },
      { label: 'Kelayakan proyek', a: ['layak', 'layak dilaksanakan', 'diterima'] }],
    ex: 'Biaya tahun 1-4: 20, 60, 20, 60. Arus kas bersih: 240, 220, 280, 260. DF 8%: 0,9259; 0,8573; 0,7938; 0,7350. PV: 222,22 + 188,61 + 222,27 + 191,11 = 824,22, jadi NPV = 24,22. Benefit diskonto 954,15, cost diskonto 800 + 129,94 = 929,94, ROI = 24,22/929,94 = 2,60%. Kumulatif 240, 460, 740, 1.000: PBP = 3 + (800 − 740)/(1.000 − 740) = 3,23 tahun. Kumulatif PV 633,11 lalu 824,22: PBP diskonto = 3 + 166,89/191,11 = 3,87 tahun. NPV positif, jadi layak, walau tipis. ' + MP_RM_MIRIP },
  { type: 'fill', q: 'Integration Management (30 poin).\nPT Sinar Logistik mengusulkan investasi sistem gudang otomatis senilai Rp1.200.000.000. Selama beroperasi ada biaya pemeliharaan Rp30 juta per tahun, ditambah biaya kalibrasi sensor Rp60 juta setiap dua tahun mulai tahun pertama (tahun ke-1, 3, dst.). Penghematan dan pendapatan tambahan tahun ke-1 Rp380 juta, tahun ke-2 Rp450 juta, tahun ke-3 Rp520 juta, dan tahun ke-4 Rp560 juta. Discount rate 10%.\nBerapa NPV, ROI, dan PBP?',
    fields: [
      { label: 'Biaya tahun 1 (juta)', a: 90, tol: 0 }, { label: 'Biaya tahun 2 (juta)', a: 30, tol: 0 },
      { label: 'NPV (juta)', a: 95.81, tol: 0.5 },
      { label: 'ROI (%), rumus lembar soal', a: 6.87, tol: 0.05 },
      { label: 'PBP (tahun)', a: 3.11, tol: 0.01 },
      { label: 'PBP diskonto (tahun)', a: 3.74, tol: 0.01 },
      { label: 'Kelayakan proyek', a: ['layak', 'layak dilaksanakan', 'diterima'] }],
    ex: 'Kalibrasi jatuh di tahun ganjil, jadi biaya tahun 1-4: 90, 30, 90, 30. Arus kas bersih: 290, 420, 430, 530. DF 10%: 0,9091; 0,8264; 0,7513; 0,6830. PV: 263,64 + 347,11 + 323,07 + 362,00 = 1.295,81, jadi NPV = 95,81. Benefit diskonto 1.490,53, cost diskonto 1.200 + 194,72 = 1.394,72, ROI = 95,81/1.394,72 = 6,87%. Kumulatif 290, 710, 1.140, 1.670: PBP = 3 + (1.200 − 1.140)/(1.670 − 1.140) = 3,11 tahun. Kumulatif PV 933,81 lalu 1.295,81: PBP diskonto = 3 + 266,19/362,00 = 3,74 tahun. NPV positif, jadi layak.' + MP_RM_MIRIP },
  { type: 'fill', q: 'Time Management (30 poin), bagian a. Proyek pemasangan jaringan kampus memiliki aktivitas seperti tabel. Sebutkan semua path, urutkan dari total nilai terkecil, lalu tentukan critical path. Path boleh ditulis sebagai urutan aktivitas atau urutan node.',
    table: { head: MP_AOA, rows: [['A', 1, 2, 4], ['B', 1, 3, 6], ['C', 2, 4, 4], ['D', 2, 5, 3], ['E', 3, 4, 4], ['F', 3, 6, 6], ['G', 4, 6, 6], ['H', 5, 7, 5], ['I', 6, 7, 6], ['J', 4, 5, 2]] },
    fields: [
      { label: 'Jumlah path', a: 6, tol: 0 },
      { label: 'Path 1 (total terkecil)', a: ['ADH', '1257'] }, { label: 'Total path 1', a: 12, tol: 0 },
      { label: 'Path 2', a: ['ACJH', '12457'] }, { label: 'Total path 2', a: 15, tol: 0 },
      { label: 'Path 3', a: ['BEJH', '13457'] }, { label: 'Total path 3', a: 17, tol: 0 },
      { label: 'Path 4', a: ['BFI', '1367'] }, { label: 'Total path 4', a: 18, tol: 0 },
      { label: 'Path 5', a: ['ACGI', '12467'] }, { label: 'Total path 5', a: 20, tol: 0 },
      { label: 'Path 6 (total terbesar)', a: ['BEGI', '13467'] }, { label: 'Total path 6', a: 22, tol: 0 },
      { label: 'Critical path', a: ['BEGI', '13467'] }, { label: 'Durasi proyek', a: 22, tol: 0 }],
    ex: 'Node 4 punya dua jalan keluar (G ke 6, J ke 5), jadi setiap path yang lewat node 4 bercabang dua. A-D-H = 12, A-C-J-H = 15, B-E-J-H = 17, B-F-I = 18, A-C-G-I = 20, B-E-G-I = 22. Critical path B-E-G-I, durasi 22 hari. ' + MP_RM_MIRIP },
  { type: 'fill', q: 'Time Management, bagian b. Untuk jaringan pemasangan jaringan kampus, hitung ES, EF, LS, LF, FS, dan TS aktivitas D, H, dan J. ' + MP_FSTS,
    table: { head: MP_AOA, rows: [['A', 1, 2, 4], ['B', 1, 3, 6], ['C', 2, 4, 4], ['D', 2, 5, 3], ['E', 3, 4, 4], ['F', 3, 6, 6], ['G', 4, 6, 6], ['H', 5, 7, 5], ['I', 6, 7, 6], ['J', 4, 5, 2]] },
    fields: [
      { label: 'ES D', a: 4, tol: 0 }, { label: 'EF D', a: 7, tol: 0 }, { label: 'LS D', a: 14, tol: 0 }, { label: 'LF D', a: 17, tol: 0 }, { label: 'Free slack D', a: 5, tol: 0 }, { label: 'Total slack D', a: 10, tol: 0 },
      { label: 'ES H', a: 12, tol: 0 }, { label: 'EF H', a: 17, tol: 0 }, { label: 'LS H', a: 17, tol: 0 }, { label: 'LF H', a: 22, tol: 0 }, { label: 'Free slack H', a: 5, tol: 0 }, { label: 'Total slack H', a: 5, tol: 0 },
      { label: 'ES J', a: 10, tol: 0 }, { label: 'EF J', a: 12, tol: 0 }, { label: 'LS J', a: 15, tol: 0 }, { label: 'LF J', a: 17, tol: 0 }, { label: 'Free slack J', a: 0, tol: 0 }, { label: 'Total slack J', a: 5, tol: 0 }],
    ex: 'Waktu paling awal node: 1 = 0, 2 = 4, 3 = 6, 4 = max(4 + 4, 6 + 4) = 10, 5 = max(4 + 3, 10 + 2) = 12, 6 = max(6 + 6, 10 + 6) = 16, 7 = max(12 + 5, 16 + 6) = 22. Waktu paling lambat node: 7 = 22, 6 = 16, 5 = 22 − 5 = 17, 4 = min(17 − 2, 16 − 6) = 10. D: ES 4, EF 7, LF 17, LS 14, TS 10, FS = 12 − 7 = 5 (H baru bisa mulai di 12 karena menunggu J). J: ES 10, EF 12, LF 17, LS 15, TS 5, FS = 12 − 12 = 0. H: ES 12, EF 17, LF 22, LS 17, TS = FS = 5. ' + MP_RM_MIRIP },
  { type: 'fill', q: 'Earned Value (20 poin).\nProyek aplikasi kasir untuk jaringan minimarket memiliki anggaran Rp240 juta dengan durasi 10 bulan. Pada akhir bulan ke-6, pekerjaan dilaporkan selesai 50%. Anggaran yang telah dikeluarkan hingga bulan ke-6 adalah Rp110 juta.\nTentukan PV, EV, AC, BAC, lalu hitung CPI, CV, SPI, SV, EAC, dan ETC, dan jelaskan kinerja anggaran dan jadwal.',
    fields: [
      { label: 'PV', a: 144, tol: 0.01 }, { label: 'EV', a: 120, tol: 0.01 }, { label: 'AC', a: 110, tol: 0.01 }, { label: 'BAC', a: 240, tol: 0.01 },
      { label: 'CPI', a: 1.09, tol: 0.005 }, { label: 'CV (juta)', a: 10, tol: 0.01 },
      { label: 'SPI', a: 0.83, tol: 0.005 }, { label: 'SV (juta)', a: -24, tol: 0.01 },
      { label: 'EAC (juta)', a: 220, tol: 0.05 }, { label: 'ETC, Estimated Time to Complete (bulan)', a: 12, tol: 0.01 },
      { label: 'Kinerja anggaran', a: MP_KINERJA_HEMAT }, { label: 'Kinerja jadwal', a: MP_KINERJA_LAMBAT }],
    ex: 'PV = 240 × 6/10 = 144. EV = 50% × 240 = 120. CPI = 120/110 = 1,09, CV = 10: hemat (under budget). SPI = 120/144 = 0,83, SV = −24: terlambat (behind schedule). EAC = 240/1,0909 = 220. ETC = 10/0,8333 = 12 bulan. Kebalikan soal remedial: di sini hemat tetapi terlambat. ' + MP_RM_MIRIP }
]);
