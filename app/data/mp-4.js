// Manajemen Proyek — soal cerita setara UTS dan latihan critical path.
// Soal cerita meniru bentuk soal UTS tahun lalu (mp-3.js) untuk tiap butir kisi-kisi: NPV dan PV, ROI, ROA, payback, EV, WBS.
// Topik critical path memuat Latihan Individu Pertemuan 5 (tanpa kunci dari dosen) dan variasinya.
// Semua angka dihitung dengan kode. Kunci path dicek ulang oleh tests/data.test.js.
var MP_CERITA = 'Soal cerita buatan sendiri dengan bentuk seperti soal UTS tahun lalu.';
var MP_P5 = 'Soal dari Latihan Individu Pertemuan 5. Kunci dihitung sendiri.';
var MP_AOA = ['Activity', 'Initial Node', 'Final Node', 'Estimated Duration'];

BANK.isian('mp', 'cerita', 'Soal Cerita Setara UTS', [
  { type: 'fill', q: 'CV Kopi Senja membuka gerai kopi. Biaya awal (sewa tempat, renovasi, mesin espresso, izin usaha) Rp800 juta.\nTahun 1 (gerai Yogyakarta): pemasukan 450, pengeluaran bahan baku dan gaji 250.\nTahun 2: membuka gerai Solo dengan modal 200. Pemasukan Yogyakarta 520, pengeluaran Yogyakarta 270, pemasukan Solo 300, pengeluaran Solo 180.\nTahun 3: pemasukan Yogyakarta 560 dan Solo 380, pengeluaran Yogyakarta 280 dan Solo 200, renovasi gerai Yogyakarta 60.\nTahun 4: tiap gerai (2 gerai) pemasukan 400 dan pengeluaran 210.\nSemua angka dalam juta rupiah, discount rate 10%. Hitung arus kas bersih, NPV, ROI, dan PBP.',
    fields: [
      { label: 'Arus kas bersih tahun 1', a: 200, tol: 0.5 }, { label: 'Arus kas bersih tahun 2', a: 170, tol: 0.5 },
      { label: 'Arus kas bersih tahun 3', a: 400, tol: 0.5 }, { label: 'Arus kas bersih tahun 4', a: 380, tol: 0.5 },
      { label: 'NPV (juta)', a: 82.39, tol: 0.5 },
      { label: 'ROI (%), (manfaat diskonto − biaya diskonto) / biaya diskonto', a: 3.65, tol: 0.05 },
      { label: 'PBP biasa (tahun)', a: 3.08, tol: 0.01 }, { label: 'PBP diskonto (tahun)', a: 3.68, tol: 0.01 }],
    ex: 'Tahun 2: 520 − 270 + 300 − 180 − 200 = 170. Tahun 3: 560 + 380 − 280 − 200 − 60 = 400. Tahun 4: 2 × (400 − 210) = 380. PV: 181,82 + 140,50 + 300,53 + 259,55 = 882,39, jadi NPV = 82,39. Manfaat diskonto 2339,42 dan biaya diskonto 2257,04, ROI = 82,38/2257,04 = 3,65%. Kumulatif biasa 200, 370, 770, 1150: PBP = 3 + (800 − 770)/(1150 − 770) = 3,08 tahun. Kumulatif diskonto 622,84 lalu 882,39: PBP diskonto = 3 + 177,16/259,55 = 3,68 tahun. ROI tanpa diskonto = (3010 − 2660)/2660 = 13,16%. ' + MP_CERITA },
  { type: 'fill', q: 'Startup BelajarYuk membuat aplikasi les online. Investasi awal (pengembangan aplikasi, laptop tim, promosi peluncuran) Rp600 juta.\nHarga langganan Rp300 ribu per pelanggan per tahun. Biaya server Rp40 ribu per pelanggan per tahun. Gaji tim tetap Rp120 juta per tahun.\nJumlah pelanggan: tahun 1 = 1.000, tahun 2 = 1.800, tahun 3 = 2.500, tahun 4 = 3.000. Di tahun 3 ada upgrade server Rp100 juta.\nDiscount rate 12%. Hitung arus kas bersih (juta rupiah), NPV, dan PBP.',
    fields: [
      { label: 'Arus kas bersih tahun 1', a: 140, tol: 0.5 }, { label: 'Arus kas bersih tahun 2', a: 348, tol: 0.5 },
      { label: 'Arus kas bersih tahun 3', a: 430, tol: 0.5 }, { label: 'Arus kas bersih tahun 4', a: 660, tol: 0.5 },
      { label: 'NPV (juta)', a: 527.93, tol: 0.5 },
      { label: 'PBP biasa (tahun)', a: 2.26, tol: 0.01 }, { label: 'PBP diskonto (tahun)', a: 2.65, tol: 0.01 }],
    ex: 'Margin per pelanggan = 300 − 40 = 260 ribu. Tahun 1: 1000 × 0,26 − 120 = 140. Tahun 2: 1800 × 0,26 − 120 = 348. Tahun 3: 2500 × 0,26 − 120 − 100 = 430. Tahun 4: 3000 × 0,26 − 120 = 660. PV: 125 + 277,42 + 306,07 + 419,44 = 1127,93, NPV = 527,93. Kumulatif 140, 488, 918: PBP = 2 + (600 − 488)/(918 − 488) = 2,26 tahun. Kumulatif diskonto 402,42 lalu 708,49: PBP diskonto = 2 + 197,58/306,07 = 2,65 tahun. ' + MP_CERITA },
  { type: 'fill', q: 'Pabrik tekstil memasang panel surya seharga Rp900 juta. Panel menghemat tagihan listrik Rp260 juta per tahun selama 5 tahun, dengan biaya perawatan Rp30 juta per tahun. Di tahun 3 inverter harus diganti dengan biaya Rp50 juta. Di akhir tahun 5 panel dijual bekas (nilai sisa) Rp100 juta. Discount rate 9%. Hitung dalam juta rupiah.',
    fields: [
      { label: 'Arus kas bersih tahun 3', a: 180, tol: 0.5 }, { label: 'Arus kas bersih tahun 5', a: 330, tol: 0.5 },
      { label: 'NPV (juta)', a: 21, tol: 0.5 },
      { label: 'Keputusan', a: ['layak', 'diterima', 'terima', 'accepted', 'layak dijalankan'] },
      { label: 'PBP biasa (tahun)', a: 4.09, tol: 0.01 }],
    ex: 'Tahun 1, 2, dan 4: 260 − 30 = 230. Tahun 3: 230 − 50 = 180. Tahun 5: 230 + 100 = 330, karena nilai sisa dihitung sebagai pemasukan di tahun terakhir. PV: 211,01 + 193,59 + 138,99 + 162,94 + 214,48 = 921,00, NPV = 21,00 > 0 sehingga layak, walau tipis. Kumulatif 230, 460, 640, 870, 1200: PBP = 4 + (900 − 870)/(1200 − 870) = 4,09 tahun. ' + MP_CERITA },
  { type: 'fill', q: 'Kampus memilih sistem LMS untuk 3 tahun dengan discount rate 10%.\nOpsi A (bangun sendiri): investasi Rp500 juta di tahun 0, biaya pemeliharaan Rp50 juta per tahun, manfaat Rp250 juta per tahun.\nOpsi B (berlangganan SaaS): biaya setup Rp100 juta di tahun 0, langganan Rp120 juta per tahun, manfaat Rp230 juta per tahun.\nHitung NPV dan ROI tiap opsi (juta rupiah), lalu pilih opsi.',
    fields: [
      { label: 'NPV opsi A', a: -2.63, tol: 0.05 }, { label: 'NPV opsi B', a: 173.55, tol: 0.1 },
      { label: 'ROI opsi A (%)', a: -0.42, tol: 0.02 }, { label: 'ROI opsi B (%)', a: 43.56, tol: 0.05 },
      { label: 'Pilih opsi', a: ['B', 'opsi B', 'SaaS', 'berlangganan'] }],
    ex: 'Jumlah discount factor 3 tahun pada 10% = 0,9091 + 0,8264 + 0,7513 = 2,4869. Opsi A: arus kas bersih 200 per tahun, NPV = 200 × 2,4869 − 500 = −2,63. Opsi B: 110 per tahun, NPV = 110 × 2,4869 − 100 = 173,55. ROI A = (621,71 − 624,34)/624,34 = −0,42%. ROI B = (571,98 − 398,42)/398,42 = 43,56%. Manfaat A lebih besar, tetapi NPV A negatif, jadi pilih B. ' + MP_CERITA },
  { type: 'fill', q: 'Rumah sakit menilai proyek rekam medis elektronik dengan discount rate 10%. Discount factor sudah dibulatkan seperti tabel JWD Consulting. Semua angka dalam juta rupiah. Hitung dengan discount factor dari tabel.',
    table: { head: ['', 'Tahun 0', 'Tahun 1', 'Tahun 2', 'Tahun 3', 'Tahun 4'], rows: [['Discount factor', 1, '0,91', '0,83', '0,75', '0,68'], ['Biaya', 300, 40, 40, 40, 40], ['Manfaat', 0, 80, 150, 200, 200]] },
    fields: [
      { label: 'Total biaya diskonto', a: 426.8, tol: 0.05 }, { label: 'Total manfaat diskonto', a: 483.3, tol: 0.05 },
      { label: 'NPV', a: 56.5, tol: 0.05 }, { label: 'ROI (%)', a: 13.24, tol: 0.05 },
      { label: 'Kumulatif mulai positif pada tahun ke', a: 4, tol: 0 }, { label: 'Payback (tahun, 2 desimal)', a: 3.48, tol: 0.01 }],
    ex: 'Biaya diskonto = 300 + 40 × (0,91 + 0,83 + 0,75 + 0,68) = 300 + 126,8 = 426,8. Manfaat diskonto = 72,8 + 124,5 + 150 + 136 = 483,3. NPV = 56,5 dan ROI = 56,5/426,8 = 13,24%. Kumulatif (manfaat − biaya) diskonto: −300; −263,6; −172,3; −52,3; +56,5. Kumulatif positif di tahun 4, jadi payback = 3 + 52,3/108,8 = 3,48 tahun. ' + MP_CERITA },
  { type: 'fill', q: 'Klinik gigi membeli kursi dental dan alat rontgen seharga Rp350 juta. Perkiraan arus kas bersih: tahun 1 = 60, tahun 2 = 90, tahun 3 = 120, tahun 4 = 150, tahun 5 = 150 (juta rupiah). Pemilik hanya mau berinvestasi kalau modal kembali paling lama 3 tahun. Gunakan rumus n + (a − b)/(c − b).',
    fields: [
      { label: 'n', a: 3, tol: 0 }, { label: 'b (kumulatif tahun n)', a: 270, tol: 0 }, { label: 'c (kumulatif tahun n+1)', a: 420, tol: 0 },
      { label: 'PBP (tahun)', a: 3.53, tol: 0.01 }, { label: 'Sisa bulan setelah tahun ke-n (pecahan × 12)', a: 6.4, tol: 0.1 },
      { label: 'Keputusan menurut target pemilik', a: ['tidak layak', 'ditolak', 'tolak', 'tidak'] }],
    ex: 'Kumulatif: 60, 150, 270, 420. Investasi 350 tertutup di tahun 4, jadi n = 3, b = 270, c = 420. PBP = 3 + (350 − 270)/(420 − 270) = 3,53 tahun, sekitar 3 tahun 6 bulan. Lebih lama dari target 3 tahun, jadi tidak layak menurut kriteria pemilik, walau NPV pada 10% positif (64,67). ' + MP_CERITA },
  { type: 'fill', q: 'PT Kirim Cepat (logistik) punya total aset Rp2.000 juta dan laba bersih Rp180 juta per tahun. Perusahaan berencana membeli 5 truk baru seharga Rp150 juta per unit. Truk baru menambah pendapatan Rp420 juta per tahun, dengan biaya operasional (BBM, sopir, perawatan) Rp240 juta dan penyusutan Rp75 juta per tahun. Pajak 20% dari laba sebelum pajak. Pakai ROA = laba bersih / total aset × 100%.',
    fields: [
      { label: 'ROA saat ini (%)', a: 9, tol: 0.01 }, { label: 'Tambahan laba bersih dari truk (juta)', a: 84, tol: 0.01 },
      { label: 'ROA proyek truk saja (%)', a: 11.2, tol: 0.01 }, { label: 'ROA perusahaan setelah membeli truk (%)', a: 9.6, tol: 0.01 },
      { label: 'ROA perusahaan naik atau turun?', a: ['naik', 'meningkat', 'bertambah'] }],
    ex: 'ROA saat ini = 180/2000 = 9%. Laba sebelum pajak dari truk = 420 − 240 − 75 = 105, laba bersih = 105 × 80% = 84. Aset bertambah 5 × 150 = 750. ROA proyek = 84/750 = 11,2%. ROA baru = (180 + 84)/(2000 + 750) = 264/2750 = 9,6%. ROA proyek di atas 9%, jadi ROA perusahaan naik. Rumus ROA dari buku standar, bukan slide. ' + MP_CERITA },
  { type: 'fill', q: 'Toko bangunan punya dua cabang. Pajak 22% dari laba sebelum pajak.\nCabang Bekasi: pendapatan Rp1.500 juta, harga pokok penjualan Rp1.050 juta, biaya operasional Rp210 juta, total aset Rp1.200 juta.\nCabang Depok: pendapatan Rp2.100 juta, harga pokok penjualan Rp1.540 juta, biaya operasional Rp260 juta, total aset Rp2.000 juta.\nHitung laba bersih dan ROA tiap cabang, ROA gabungan, lalu tentukan cabang yang lebih efisien memakai aset.',
    fields: [
      { label: 'Laba bersih Bekasi (juta)', a: 187.2, tol: 0.05 }, { label: 'Laba bersih Depok (juta)', a: 234, tol: 0.05 },
      { label: 'ROA Bekasi (%)', a: 15.6, tol: 0.01 }, { label: 'ROA Depok (%)', a: 11.7, tol: 0.01 },
      { label: 'ROA gabungan (%)', a: 13.16, tol: 0.01 }, { label: 'Lebih efisien', a: ['Bekasi', 'cabang Bekasi'] }],
    ex: 'Bekasi: (1500 − 1050 − 210) × 78% = 240 × 0,78 = 187,2, ROA = 187,2/1200 = 15,6%. Depok: (2100 − 1540 − 260) × 78% = 300 × 0,78 = 234, ROA = 234/2000 = 11,7%. Gabungan = 421,2/3200 = 13,16%. Laba Depok lebih besar, tetapi Bekasi lebih efisien memakai aset. ' + MP_CERITA },
  { type: 'fill', q: 'Proyek aplikasi e-commerce UMKM punya anggaran Rp240 juta dengan durasi 8 bulan, dan anggaran direncanakan merata tiap bulan. Pada akhir bulan ke-5, pekerjaan baru selesai 55% dan biaya yang sudah dikeluarkan Rp120 juta. Hitung dalam juta rupiah dan tentukan status proyek.',
    fields: [
      { label: 'PV', a: 150, tol: 0.01 }, { label: 'EV', a: 132, tol: 0.01 },
      { label: 'CPI', a: 1.1, tol: 0.005 }, { label: 'SPI', a: 0.88, tol: 0.005 },
      { label: 'CV', a: 12, tol: 0.01 }, { label: 'SV', a: -18, tol: 0.01 },
      { label: 'EAC', a: 218.18, tol: 0.05 }, { label: 'Estimated Time to Complete (bulan)', a: 9.09, tol: 0.01 },
      { label: 'Status biaya', a: ['under budget', 'hemat', 'di bawah anggaran', 'lebih hemat'] },
      { label: 'Status jadwal', a: ['terlambat', 'behind schedule', 'tertinggal', 'lambat'] }],
    ex: 'PV = 240 × 5/8 = 150. EV = 55% × 240 = 132. AC = 120. CPI = 132/120 = 1,1 dan CV = +12, jadi hemat. SPI = 132/150 = 0,88 dan SV = −18, jadi terlambat. EAC = 240/1,1 = 218,18. Estimated Time to Complete = 8/0,88 = 9,09 bulan. Bentuknya mengikuti Soal 4 UTS tahun lalu. ' + MP_CERITA },
  { type: 'fill', q: 'Proyek renovasi laboratorium komputer berdurasi rencana 10 minggu. Berikut laporan akhir minggu ke-4 (anggaran dan biaya dalam juta rupiah). Hitung nilai earned value proyek.',
    table: { head: ['Aktivitas', 'Anggaran', '% rencana selesai', '% aktual selesai', 'Biaya aktual'], rows: [['Pembongkaran', 20, '100%', '100%', 22], ['Instalasi listrik', 40, '100%', '90%', 45], ['Jaringan LAN', 60, '75%', '40%', 33], ['Pemasangan PC', 40, '50%', '0%', 0]] },
    fields: [
      { label: 'BAC', a: 160, tol: 0.01 }, { label: 'PV', a: 125, tol: 0.01 }, { label: 'EV', a: 80, tol: 0.01 }, { label: 'AC', a: 100, tol: 0.01 },
      { label: 'CPI', a: 0.8, tol: 0.005 }, { label: 'SPI', a: 0.64, tol: 0.005 }, { label: 'EAC', a: 200, tol: 0.5 },
      { label: 'Sisa biaya yang masih diperlukan (EAC − AC)', a: 100, tol: 0.5 },
      { label: 'Estimasi durasi total (minggu) = durasi rencana / SPI', a: 15.63, tol: 0.02 }],
    ex: 'BAC = 20 + 40 + 60 + 40 = 160. PV = 20 + 40 + 45 + 20 = 125. EV = 20 + 36 + 24 + 0 = 80. AC = 22 + 45 + 33 + 0 = 100. CPI = 80/100 = 0,8 dan SPI = 80/125 = 0,64, jadi boros dan terlambat. EAC = 160/0,8 = 200, sisa biaya = 200 − 100 = 100, VAC = 160 − 200 = −40. Durasi = 10/0,64 = 15,63 minggu. ' + MP_CERITA },
  { type: 'fill', q: 'Laporan proyek ERP di akhir bulan ke-4 hanya mencantumkan: CPI = 1,25; SPI = 0,8; AC = Rp80 juta; BAC = Rp400 juta; durasi rencana 10 bulan. Cari nilai yang hilang (juta rupiah).',
    fields: [
      { label: 'EV', a: 100, tol: 0.01 }, { label: 'PV', a: 125, tol: 0.01 },
      { label: 'CV', a: 20, tol: 0.01 }, { label: 'SV', a: -25, tol: 0.01 },
      { label: 'EAC', a: 320, tol: 0.01 }, { label: 'Estimated Time to Complete (bulan)', a: 12.5, tol: 0.01 },
      { label: 'Persen pekerjaan selesai (%)', a: 25, tol: 0.01 }],
    ex: 'EV = CPI × AC = 1,25 × 80 = 100. PV = EV/SPI = 100/0,8 = 125. CV = 100 − 80 = 20. SV = 100 − 125 = −25. EAC = 400/1,25 = 320. Waktu = 10/0,8 = 12,5 bulan. Persen selesai = EV/BAC = 100/400 = 25%. ' + MP_CERITA },
  { type: 'fill', q: 'WBS Sistem Informasi Perpustakaan Daerah dengan metode Waterfall (analisis kebutuhan, desain, implementasi, pengujian). Pemberi kerja meminta kickoff meeting di awal, laporan kemajuan setelah tahap desain, User Acceptance Test (UAT) setelah pengujian, serta serah terima dan pelatihan pengguna di akhir. Isi urutan aktivitas level 1 WBS, lalu kode WBS-nya.',
    fields: [
      { label: '1', a: ['kickoff meeting', 'kickoff', 'kick off meeting', 'kick off', 'pertemuan awal'] },
      { label: '2', a: ['analisis kebutuhan', 'analisis', 'analisis kebutuhan sistem', 'requirement analysis', 'requirements'] },
      { label: '3', a: ['desain', 'design', 'desain sistem', 'perancangan'] },
      { label: '4', a: ['laporan kemajuan', 'progress report'] },
      { label: '5', a: ['implementasi', 'implementation', 'coding', 'pengkodean'] },
      { label: '6', a: ['pengujian', 'testing', 'test', 'pengujian sistem'] },
      { label: '7', a: ['uat', 'user acceptance test', 'user acceptance testing'] },
      { label: '8', a: ['serah terima dan pelatihan', 'serah terima & pelatihan', 'serah terima dan pelatihan pengguna', 'serah terima', 'pelatihan', 'handover'] },
      { label: 'Kode aktivitas level 3 kedua di bawah 3.1', a: ['3.1.2', '312'] }],
    ex: 'Milestone dari pemberi kerja disisipkan di antara tahap Waterfall, seperti Soal 2 UTS tahun lalu yang memakai Design Thinking. Contoh level 2 dan 3: 3.1 desain database, 3.1.1 ERD, 3.1.2 kamus data. ' + MP_CERITA }
]);

BANK.isian('mp', 'cp', 'Critical Path (Latihan Pertemuan 5)', [
  { type: 'fill', q: 'Latihan Individu Pertemuan 5, Soal 1. Sebutkan semua path pada jaringan berikut, urutkan dari total nilai terkecil, lalu tentukan critical path. Path boleh ditulis sebagai urutan aktivitas (A-D) atau urutan node (1-3-5).',
    table: { head: MP_AOA, rows: [['A', 1, 3, 5], ['B', 1, 2, 5], ['C', 2, 4, 3], ['D', 3, 5, 2], ['E', 4, 6, 7], ['F', 2, 5, 5]] },
    fields: [
      { label: 'Path 1 (total terkecil)', a: ['AD', '135'] }, { label: 'Total path 1', a: 7, tol: 0 },
      { label: 'Path 2', a: ['BF', '125'] }, { label: 'Total path 2', a: 10, tol: 0 },
      { label: 'Path 3 (total terbesar)', a: ['BCE', '1246'] }, { label: 'Total path 3', a: 15, tol: 0 },
      { label: 'Critical path', a: ['BCE', '1246'] }],
    ex: 'Node 1 adalah awal. Jaringan punya dua node akhir: node 5 (dari D dan F) dan node 6 (dari E). Path: A-D (1-3-5) = 5 + 2 = 7, B-F (1-2-5) = 5 + 5 = 10, B-C-E (1-2-4-6) = 5 + 3 + 7 = 15. Critical path adalah path terpanjang, B-C-E dengan 15. ' + MP_P5 },
  { type: 'fill', q: 'Latihan Individu Pertemuan 5, Soal 2. Sebutkan semua path, urutkan dari total nilai terkecil, lalu tentukan critical path. Path boleh ditulis sebagai urutan aktivitas atau urutan node.',
    table: { head: MP_AOA, rows: [['A', 1, 3, 8], ['B', 2, 3, 5], ['C', 3, 4, 2], ['D', 3, 5, 6], ['E', 4, 6, 5], ['F', 4, 5, 2], ['G', 6, 5, 8], ['H', 5, 7, 6]] },
    fields: [
      { label: 'Path 1 (total terkecil)', a: ['BCFH', '23457'] }, { label: 'Total path 1', a: 15, tol: 0 },
      { label: 'Path 2', a: ['BDH', '2357'] }, { label: 'Total path 2', a: 17, tol: 0 },
      { label: 'Path 3', a: ['ACFH', '13457'] }, { label: 'Total path 3', a: 18, tol: 0 },
      { label: 'Path 4', a: ['ADH', '1357'] }, { label: 'Total path 4', a: 20, tol: 0 },
      { label: 'Path 5', a: ['BCEGH', '234657'] }, { label: 'Total path 5', a: 26, tol: 0 },
      { label: 'Path 6 (total terbesar)', a: ['ACEGH', '134657'] }, { label: 'Total path 6', a: 29, tol: 0 },
      { label: 'Critical path', a: ['ACEGH', '134657'] }],
    ex: 'Ada dua node awal (1 dan 2) dan satu node akhir (7). Dari node 3 ada tiga jalan ke node 7: D-H = 12, C-F-H = 10, C-E-G-H = 21. Dengan B (5) di depan: 15, 17, 26. Dengan A (8): 18, 20, 29. Critical path A-C-E-G-H = 29. G berjalan dari node 6 ke node 5, jadi nomor node tidak selalu naik. ' + MP_P5 },
  { type: 'fill', q: 'Koperasi mahasiswa membuat aplikasi kasir. A analisis kebutuhan, B pengadaan server, C desain UI, D desain database, E pembuatan backend, F pembuatan frontend, G penyusunan manual, H pengujian. Durasi dalam hari. Sebutkan semua path dari total terkecil, lalu tentukan critical path dan durasi proyek.',
    table: { head: MP_AOA, rows: [['A', 1, 2, 3], ['B', 1, 3, 4], ['C', 2, 4, 5], ['D', 2, 3, 2], ['E', 3, 5, 6], ['F', 4, 5, 4], ['G', 4, 6, 3], ['H', 5, 6, 2]] },
    fields: [
      { label: 'Path 1 (total terkecil)', a: ['ACG', '1246'] }, { label: 'Total path 1', a: 11, tol: 0 },
      { label: 'Path 2', a: ['BEH', '1356'] }, { label: 'Total path 2', a: 12, tol: 0 },
      { label: 'Path 3', a: ['ADEH', '12356'] }, { label: 'Total path 3', a: 13, tol: 0 },
      { label: 'Path 4 (total terbesar)', a: ['ACFH', '12456'] }, { label: 'Total path 4', a: 14, tol: 0 },
      { label: 'Critical path', a: ['ACFH', '12456'] }, { label: 'Durasi proyek', a: 14, tol: 0 }],
    ex: 'Path: A-C-G = 3 + 5 + 3 = 11, B-E-H = 4 + 6 + 2 = 12, A-D-E-H = 3 + 2 + 6 + 2 = 13, A-C-F-H = 3 + 5 + 4 + 2 = 14. Critical path A-C-F-H, jadi proyek paling cepat selesai 14 hari. ' + MP_CERITA },
  { type: 'fill', q: 'Lanjutan aplikasi kasir koperasi (tabel sama, durasi proyek 14 hari). Hitung float beberapa aktivitas. Lalu aktivitas E (backend) ternyata molor 3 hari, dari 6 menjadi 9 hari. Analisis dampaknya.',
    table: { head: MP_AOA, rows: [['A', 1, 2, 3], ['B', 1, 3, 4], ['C', 2, 4, 5], ['D', 2, 3, 2], ['E', 3, 5, 6], ['F', 4, 5, 4], ['G', 4, 6, 3], ['H', 5, 6, 2]] },
    fields: [
      { label: 'Float B (sebelum terlambat)', a: 2, tol: 0 }, { label: 'Float G (sebelum terlambat)', a: 3, tol: 0 },
      { label: 'Float E (sebelum terlambat)', a: 1, tol: 0 },
      { label: 'Durasi proyek setelah E molor', a: 16, tol: 0 }, { label: 'Critical path baru', a: ['ADEH', '12356'] },
      { label: 'Proyek mundur berapa hari?', a: 2, tol: 0 }],
    ex: 'Float = 14 − path terpanjang yang melewati aktivitas itu. B hanya di B-E-H = 12, float 2. G hanya di A-C-G = 11, float 3. E paling panjang di A-D-E-H = 13, float 1. Setelah E menjadi 9: A-D-E-H = 16, B-E-H = 15, A-C-F-H = 14. Critical path pindah ke A-D-E-H dan proyek mundur 16 − 14 = 2 hari, bukan 3, karena E punya float 1. ' + MP_CERITA },
  { type: 'fill', q: 'Jaringan berikut punya lebih dari satu critical path. Tentukan jumlah path, durasi proyek, semua critical path, dan float aktivitas B dan D.',
    table: { head: MP_AOA, rows: [['A', 1, 2, 4], ['B', 1, 3, 6], ['C', 2, 3, 3], ['D', 2, 4, 5], ['E', 3, 4, 4], ['F', 3, 5, 7], ['G', 4, 5, 3]] },
    fields: [
      { label: 'Jumlah path', a: 5, tol: 0 }, { label: 'Durasi proyek', a: 14, tol: 0 },
      { label: 'Jumlah critical path', a: 2, tol: 0 },
      { label: 'Semua critical path (pisahkan dengan koma)', set: true, a: ['ACEG ACF', 'A C E G A C F', '12345 1235', '1 2 3 4 5 1 2 3 5'] },
      { label: 'Float B', a: 1, tol: 0 }, { label: 'Float D', a: 2, tol: 0 }],
    ex: 'Lima path: A-D-G = 12, B-E-G = 13, B-F = 13, A-C-E-G = 14, A-C-F = 14. Dua path sama-sama 14, jadi keduanya critical path, dan A, C, E, F, G semuanya kritis. Float B = 14 − 13 = 1, float D = 14 − 12 = 2. ' + MP_CERITA },
  { type: 'fill', q: 'Seperti Soal 2 latihan, jaringan ini punya dua node awal. Node akhirnya juga dua. Sebutkan semua path dari total terkecil, lalu tentukan critical path.',
    table: { head: MP_AOA, rows: [['A', 1, 3, 7], ['B', 2, 3, 4], ['C', 3, 4, 3], ['D', 3, 5, 6], ['E', 4, 6, 4], ['F', 5, 6, 3], ['G', 4, 7, 8]] },
    fields: [
      { label: 'Path 1 (total terkecil)', a: ['BCE', '2346'] }, { label: 'Total path 1', a: 11, tol: 0 },
      { label: 'Path 2', a: ['BDF', '2356'] }, { label: 'Total path 2', a: 13, tol: 0 },
      { label: 'Path 3', a: ['ACE', '1346'] }, { label: 'Total path 3', a: 14, tol: 0 },
      { label: 'Path 4', a: ['BCG', '2347'] }, { label: 'Total path 4', a: 15, tol: 0 },
      { label: 'Path 5', a: ['ADF', '1356'] }, { label: 'Total path 5', a: 16, tol: 0 },
      { label: 'Path 6 (total terbesar)', a: ['ACG', '1347'] }, { label: 'Total path 6', a: 18, tol: 0 },
      { label: 'Critical path', a: ['ACG', '1347'] }],
    ex: 'Node awal 1 dan 2 (tidak ada panah masuk), node akhir 6 dan 7 (tidak ada panah keluar). Dari node 3: C-E = 7, D-F = 9, C-G = 11. Dengan B (4) di depan: 11, 13, 15. Dengan A (7): 14, 16, 18. Critical path A-C-G = 18. ' + MP_CERITA },
  { type: 'fill', q: 'Pembangunan gedung serbaguna kampus, durasi dalam minggu. A perizinan, B pembersihan lahan, C desain interior, D pondasi, E pengadaan material, F pengadaan furnitur, G struktur dan atap, H instalasi listrik dan air, I finishing, J pembangunan area parkir. Tentukan jumlah path, durasi proyek, critical path, dan float.',
    table: { head: MP_AOA, rows: [['A', 1, 2, 10], ['B', 1, 3, 14], ['C', 2, 4, 8], ['D', 2, 5, 12], ['E', 3, 5, 9], ['F', 4, 6, 6], ['G', 5, 6, 7], ['H', 5, 7, 11], ['I', 6, 7, 5], ['J', 3, 7, 20]] },
    fields: [
      { label: 'Jumlah path', a: 6, tol: 0 }, { label: 'Durasi proyek', a: 35, tol: 0 },
      { label: 'Critical path', a: ['BEGI', '13567'] },
      { label: 'Float A', a: 1, tol: 0 }, { label: 'Float C', a: 6, tol: 0 }, { label: 'Float J', a: 1, tol: 0 }],
    ex: 'Path: A-C-F-I = 29, A-D-H = 33, A-D-G-I = 34, B-E-H = 34, B-J = 34, B-E-G-I = 35. Critical path B-E-G-I = 35 minggu. Float A = 35 − 34 = 1 (path terpanjang lewat A adalah A-D-G-I), float C = 35 − 29 = 6, float J = 35 − 34 = 1. Tiga path hanya selisih 1 minggu dari critical path, jadi keterlambatan lebih dari 1 minggu di A, D, H, atau J langsung menggeser jadwal. ' + MP_CERITA },
  { type: 'fill', q: 'Panitia festival musik kampus menyusun jadwal, durasi dalam minggu. A rapat konsep, B cari sponsor, C desain poster, D booking venue, E promosi, F tiket presale, G sewa panggung dan sound system, H tiket reguler, I gladi resik, J dekorasi. Tentukan critical path, lalu analisis percepatan: G dipercepat 2 minggu, dari 6 menjadi 4.',
    table: { head: MP_AOA, rows: [['A', 1, 2, 2], ['B', 1, 3, 3], ['C', 2, 3, 1], ['D', 2, 4, 4], ['E', 3, 5, 5], ['F', 4, 5, 2], ['G', 4, 6, 6], ['H', 5, 6, 3], ['I', 6, 7, 2], ['J', 5, 7, 4]] },
    fields: [
      { label: 'Jumlah path', a: 7, tol: 0 }, { label: 'Durasi proyek awal', a: 14, tol: 0 },
      { label: 'Critical path awal', a: ['ADGI', '12467'] }, { label: 'Float J', a: 2, tol: 0 },
      { label: 'Durasi proyek setelah G dipercepat', a: 13, tol: 0 },
      { label: 'Jumlah critical path setelah G dipercepat', a: 3, tol: 0 }],
    ex: 'Tujuh path: A-C-E-J, A-D-F-J, dan B-E-J = 12; A-C-E-H-I, A-D-F-H-I, dan B-E-H-I = 13; A-D-G-I = 14. Critical path awal A-D-G-I = 14 minggu, float J = 14 − 12 = 2. Setelah G menjadi 4, A-D-G-I = 12, tetapi tiga path lain masih 13. Proyek hanya maju 1 minggu walau G dipercepat 2 minggu, karena critical path pindah ke tiga path 13 minggu. ' + MP_CERITA }
]);
