// Manajemen Proyek — soal isian dari kisi-kisi UTS: ROA/ROI, jaringan aktivitas, payback period, EV, NPV dan PV.
// Rumus dan contoh mengikuti Manpro 4 (NPV, ROI, payback) dan Manpro 6 (jalur kritis, float, PERT).
// ROA dan earned value tidak ada di slide yang diberikan, jadi rumusnya dari buku standar dan ditandai di ex.
// Semua angka sudah dicek dengan kode.
var MP_SENDIRI = 'Soal latihan buatan sendiri, bukan soal asli dosen.';

BANK.isian('mp', 'k-fin', 'Kisi-kisi: NPV, PV, ROI, Payback', [
  { type: 'fill', q: 'Contoh slide: discount rate 10%. Arus kas tahun 0 = −5000 (investasi awal), tahun 1 = 1000, tahun 2 = 2000, tahun 3 = 3000, tahun 4 = 4000. Hitung PV tiap tahun dan NPV (2 desimal).',
    fields: [{ label: 'PV tahun 1', a: 909.09, tol: 0.02 }, { label: 'PV tahun 2', a: 1652.89, tol: 0.02 }, { label: 'PV tahun 3', a: 2253.94, tol: 0.02 }, { label: 'PV tahun 4', a: 2732.05, tol: 0.02 }, { label: 'NPV', a: 2547.98, tol: 0.05 }],
    ex: 'PV = CF/(1+r)^t. Total PV = 7547,97, lalu NPV = 7547,97 − 5000 = 2547,98. NPV > 0 berarti proyek menguntungkan. Angka dari slide Manpro 4.' },
  { type: 'fill', q: 'Discount rate 12%. Investasi awal 8000 di tahun 0. Arus kas masuk: tahun 1 = 3000, tahun 2 = 3000, tahun 3 = 4000, tahun 4 = 2000. Hitung NPV (2 desimal), lalu tentukan proyek diterima atau ditolak.',
    fields: [{ label: 'PV tahun 1', a: 2678.57, tol: 0.02 }, { label: 'PV tahun 3', a: 2847.12, tol: 0.02 }, { label: 'NPV', a: 1188.31, tol: 0.05 }, { label: 'Keputusan', a: ['diterima', 'terima', 'layak', 'accepted'] }],
    ex: 'PV: 2678,57 + 2391,58 + 2847,12 + 1271,04 = 9188,31. NPV = 9188,31 − 8000 = 1188,31 > 0, jadi diterima. ' + MP_SENDIRI },
  { type: 'fill', q: 'Berapa present value dari uang Rp10.000.000 yang diterima 3 tahun lagi dengan discount rate 10%? Bulatkan ke rupiah.',
    fields: [{ label: 'PV (Rp)', a: 7513148, tol: 1 }],
    ex: 'PV = 10.000.000 / 1,1³ = 10.000.000 / 1,331 = 7.513.148. ' + MP_SENDIRI },
  { type: 'fill', q: 'Hitung discount factor 1/(1+r)^t untuk r = 8%, dibulatkan 2 desimal seperti tabel JWD Consulting.',
    fields: [{ label: 'Tahun 0', a: 1, tol: 0 }, { label: 'Tahun 1', a: 0.93, tol: 0.005 }, { label: 'Tahun 2', a: 0.86, tol: 0.005 }, { label: 'Tahun 3', a: 0.79, tol: 0.005 }],
    ex: '1/1,08 = 0,926; 1/1,08² = 0,857; 1/1,08³ = 0,794. Angka ini dipakai di Figure 4-5 slide.' },
  { type: 'fill', q: 'Model JWD Consulting dengan discount factor 1; 0,93; 0,86; 0,79. Biaya: tahun 0 = 100.000, tahun 1-3 masing-masing 30.000. Manfaat: tahun 0 = 0, tahun 1-3 masing-masing 80.000. Hitung nilainya.',
    fields: [{ label: 'Total biaya discounted', a: 177400, tol: 1 }, { label: 'Total manfaat discounted', a: 206400, tol: 1 }, { label: 'NPV', a: 29000, tol: 1 }, { label: 'ROI (%)', a: 16.35, tol: 0.05 }, { label: 'Payback pada tahun ke', a: 3, tol: 0 }],
    ex: 'Biaya = 100.000 + 30.000×(0,93+0,86+0,79) = 177.400. Manfaat = 80.000×2,58 = 206.400. NPV = 29.000. ROI = 29.000/177.400 = 16,35%. Kumulatif: −100.000, −53.500, −10.500, +29.000, jadi payback di tahun 3. ' + MP_SENDIRI },
  { type: 'fill', q: 'Contoh slide: Joe membeli saham $1.000 lalu menjualnya $1.200. Ia juga membeli saham lain $2.000 lalu menjualnya $2.800. Hitung ROI masing-masing.',
    fields: [{ label: 'ROI pertama (%)', a: 20, tol: 0.01 }, { label: 'ROI kedua (%)', a: 40, tol: 0.01 }],
    ex: 'ROI = keuntungan / biaya investasi × 100%. 200/1000 = 20%, 800/2000 = 40%.' },
  { type: 'fill', q: 'Total discounted benefits Rp250 juta, total discounted costs Rp200 juta. Hitung ROI.',
    fields: [{ label: 'ROI (%)', a: 25, tol: 0.01 }],
    ex: 'ROI = (250 − 200) / 200 × 100% = 25%. ' + MP_SENDIRI },
  { type: 'fill', q: 'Investasi awal Rp120 juta, arus kas bersih sama setiap tahun Rp30 juta. Berapa payback period?',
    fields: [{ label: 'Payback (tahun)', a: 4, tol: 0.01 }],
    ex: 'Arus kas sama: payback = investasi / arus kas = 120/30 = 4 tahun. ' + MP_SENDIRI },
  { type: 'fill', q: 'Investasi Rp400 juta. Arus kas: tahun 1 = 100, tahun 2 = 150, tahun 3 = 200, tahun 4 = 250 (juta). Pakai rumus n + (a − b)/(c − b).',
    fields: [{ label: 'n', a: 2, tol: 0 }, { label: 'b (kumulatif tahun n)', a: 250, tol: 0 }, { label: 'c (kumulatif tahun n+1)', a: 450, tol: 0 }, { label: 'Payback (tahun)', a: 2.75, tol: 0.01 }],
    ex: 'Kumulatif: 100, 250, 450. Investasi tertutup di tahun 3, jadi n = 2. Payback = 2 + (400 − 250)/(450 − 250) = 2,75 tahun. ' + MP_SENDIRI },
  { type: 'fill', q: 'Dua proyek dengan investasi 1000 dan discount rate 10%. Proyek A: arus kas 500, 500, 500. Proyek B: 200, 400, 900. Hitung NPV dan pilih proyek.',
    fields: [{ label: 'NPV A', a: 243.43, tol: 0.05 }, { label: 'NPV B', a: 188.58, tol: 0.05 }, { label: 'Pilih proyek', a: ['A', 'proyek A'] }],
    ex: 'Total arus kas sama-sama 1500, tetapi uang A datang lebih cepat. Itulah time value of money. ' + MP_SENDIRI },
  { type: 'fill', q: 'Isi istilah atau keputusan yang tepat.',
    fields: [
      { label: 'NPV berbeda walau total arus kas sama karena', a: ['time value of money', 'nilai waktu uang'] },
      { label: 'Jika NPV < 0, proyek', a: ['ditolak', 'tolak', 'rejected'] },
      { label: 'Tiga metode analisis finansial di slide: NPV, ROI, dan', a: ['payback', 'payback analysis', 'payback period'] },
      { label: 'Metode seleksi yang memakai perhitungan matematis kompleks', a: ['mathematical model', 'constrained optimization', 'model matematis'] }],
    ex: 'NPV > 0 diterima, NPV < 0 ditolak, NPV = 0 netral. Makin tinggi NPV dan ROI, makin baik.' }
]);

BANK.isian('mp', 'k-roa', 'Kisi-kisi: ROA & Earned Value', [
  { type: 'fill', q: 'Perusahaan punya laba bersih Rp150 juta dan total aset Rp1,2 miliar. Hitung ROA (Return on Assets).',
    fields: [{ label: 'ROA (%)', a: 12.5, tol: 0.01 }],
    ex: 'ROA = laba bersih / total aset × 100% = 150/1200 = 12,5%. ROA tidak ada di slide Manpro 1-6. Kalau maksud kisi-kisi adalah ROI, pakai rumus ROI di topik sebelumnya. ' + MP_SENDIRI },
  { type: 'fill', q: 'Proyek A: laba bersih Rp80 juta, total aset Rp400 juta. Proyek B: laba bersih Rp90 juta, total aset Rp600 juta. Hitung ROA, lalu tentukan yang lebih efisien memakai aset.',
    fields: [{ label: 'ROA A (%)', a: 20, tol: 0.01 }, { label: 'ROA B (%)', a: 15, tol: 0.01 }, { label: 'Lebih efisien', a: ['A', 'proyek A'] }],
    ex: '80/400 = 20%, 90/600 = 15%. Laba B lebih besar, tetapi A lebih efisien. Rumus ROA dari buku standar, bukan slide. ' + MP_SENDIRI },
  { type: 'fill', q: 'Earned value: BAC Rp100 juta. Di akhir bulan 2, rencana 50% selesai (PV = 50), realisasi 40% selesai (EV = 40), biaya aktual AC = 45 (juta). Hitung nilainya.',
    fields: [{ label: 'CV = EV − AC', a: -5, tol: 0.01 }, { label: 'SV = EV − PV', a: -10, tol: 0.01 }, { label: 'CPI = EV/AC', a: 0.889, tol: 0.005 }, { label: 'SPI = EV/PV', a: 0.8, tol: 0.005 }, { label: 'EAC = BAC/CPI', a: 112.5, tol: 0.1 }],
    ex: 'CV negatif berarti over budget, SV negatif berarti terlambat, CPI dan SPI < 1 berarti buruk. Earned value hanya disebut di Manpro 3; rumusnya dari Schwalbe bab Cost Management. ' + MP_SENDIRI },
  { type: 'fill', q: 'Earned value: PV = 200, EV = 220, AC = 180 (juta). Hitung CPI dan SPI, lalu isi status biaya dan jadwal.',
    fields: [{ label: 'CPI', a: 1.222, tol: 0.005 }, { label: 'SPI', a: 1.1, tol: 0.005 }, { label: 'Status biaya', a: ['under budget', 'hemat', 'di bawah anggaran'] }, { label: 'Status jadwal', a: ['ahead of schedule', 'lebih cepat', 'lebih cepat dari jadwal'] }],
    ex: 'CPI = 220/180 = 1,222 dan SPI = 220/200 = 1,1. Nilai > 1 berarti lebih baik dari rencana. ' + MP_SENDIRI },
  { type: 'fill', q: 'Isi singkatan earned value.',
    fields: [
      { label: 'Nilai pekerjaan yang direncanakan selesai', a: ['PV', 'planned value'] },
      { label: 'Nilai pekerjaan yang benar-benar selesai', a: ['EV', 'earned value'] },
      { label: 'Biaya yang benar-benar dikeluarkan', a: ['AC', 'actual cost'] },
      { label: 'Total anggaran proyek', a: ['BAC', 'budget at completion'] }],
    ex: 'PV di earned value berarti planned value, berbeda dengan PV (present value) di NPV. ' + MP_SENDIRI }
]);

BANK.isian('mp', 'k-net', 'Kisi-kisi: Jaringan Aktivitas & PERT', [
  { type: 'fill', q: 'Contoh slide (Project X): A=1, B=2, C=3, D=4, E=5, F=4, G=6, H=6, I=2, J=3. Jalur: A-D-H-J, B-E-H-J, B-F-J, C-G-I-J.',
    fields: [{ label: 'Panjang A-D-H-J', a: 14, tol: 0 }, { label: 'Panjang B-E-H-J', a: 16, tol: 0 }, { label: 'Panjang B-F-J', a: 9, tol: 0 }, { label: 'Jalur kritis', a: ['BEHJ'] }],
    ex: 'C-G-I-J = 14. Jalur terpanjang B-E-H-J = 16 hari adalah jalur kritis.' },
  { type: 'fill', q: 'Lanjutan Project X. Hitung float dengan cara slide: float = panjang jalur kritis − panjang jalur, mulai dari jalur terpanjang.',
    fields: [{ label: 'Float A', a: 2, tol: 0 }, { label: 'Float G', a: 2, tol: 0 }, { label: 'Float F', a: 7, tol: 0 }, { label: 'Float E', a: 0, tol: 0 }],
    ex: 'A dan D di jalur 14: 16 − 14 = 2. C, G, I juga 2. F hanya ada di B-F-J: 16 − 9 = 7. B, E, H, J di jalur kritis: 0.' },
  { type: 'fill', q: 'Contoh slide: 1→2 A=2, 2→3 B=5, 3→4 C=2, 4→6 E=1, 3→5 D=7, 5→6 F=2.',
    fields: [{ label: 'Jumlah path', a: 2, tol: 0 }, { label: 'Path terpendek', a: 10, tol: 0 }, { label: 'Path terpanjang', a: 16, tol: 0 }, { label: 'Waktu tercepat proyek selesai', a: 16, tol: 0 }],
    ex: '1-2-3-4-6 = 2+5+2+1 = 10. 1-2-3-5-6 = 2+5+7+2 = 16, jadi jalur kritis 1-2-3-5-6.' },
  { type: 'fill', q: 'Aktivitas dan pendahulunya: A(3) tanpa pendahulu, B(4) setelah A, C(2) setelah A, D(5) setelah B, E(3) setelah C, F(2) setelah D dan E.',
    table: { head: ['Aktivitas', 'Durasi', 'Pendahulu'], rows: [['A', 3, '-'], ['B', 4, 'A'], ['C', 2, 'A'], ['D', 5, 'B'], ['E', 3, 'C'], ['F', 2, 'D, E']] },
    fields: [{ label: 'Durasi proyek', a: 14, tol: 0 }, { label: 'Jalur kritis', a: ['ABDF'] }, { label: 'Slack C', a: 4, tol: 0 }, { label: 'Earliest finish D', a: 12, tol: 0 }],
    ex: 'A-B-D-F = 14, A-C-E-F = 10. Slack C dan E = 14 − 10 = 4. ES D = 7, jadi EF D = 12. ' + MP_SENDIRI },
  { type: 'fill', q: 'A(4) dan B(3) di awal. C(5) setelah A. D(2) setelah A dan B. E(6) setelah B. F(3) setelah C dan D. G(4) setelah E. H(2) setelah F dan G.',
    table: { head: ['Aktivitas', 'Durasi', 'Pendahulu'], rows: [['A', 4, '-'], ['B', 3, '-'], ['C', 5, 'A'], ['D', 2, 'A, B'], ['E', 6, 'B'], ['F', 3, 'C, D'], ['G', 4, 'E'], ['H', 2, 'F, G']] },
    fields: [{ label: 'Jumlah jalur', a: 4, tol: 0 }, { label: 'Durasi proyek', a: 15, tol: 0 }, { label: 'Jalur kritis', a: ['BEGH'] }, { label: 'Slack D', a: 4, tol: 0 }],
    ex: 'A-C-F-H = 14, A-D-F-H = 11, B-D-F-H = 10, B-E-G-H = 15. Slack D = 15 − 11 = 4. ' + MP_SENDIRI },
  { type: 'fill', q: 'Tabel PERT dari slide: hitung t = (a + 4m + b)/6 dengan a = optimistic, b = pessimistic, m = most likely.',
    table: { head: ['Aktivitas', 'a', 'b', 'm'], rows: [['A', 1, 3, 2], ['B', 2, 4, 3], ['C', 1, 3, 2], ['D', 2, 6, 4], ['H', 1, 3, 2]] },
    fields: [{ label: 'A', a: 2, tol: 0.01 }, { label: 'B', a: 3, tol: 0.01 }, { label: 'D', a: 4, tol: 0.01 }, { label: 'H', a: 2, tol: 0.01 }],
    ex: 'A = (1+8+3)/6 = 2. B = (2+12+4)/6 = 3. D = (2+16+6)/6 = 4. H = (1+8+3)/6 = 2.' },
  { type: 'fill', q: 'PERT: aktivitas X punya optimistic 4, most likely 6, pessimistic 14 hari. Aktivitas Y punya optimistic 2, most likely 5, pessimistic 8 hari. X dan Y berurutan.',
    fields: [{ label: 't X', a: 7, tol: 0.01 }, { label: 't Y', a: 5, tol: 0.01 }, { label: 'Total X lalu Y', a: 12, tol: 0.01 }],
    ex: 'X = (4 + 24 + 14)/6 = 7. Y = (2 + 20 + 8)/6 = 5. Total 12 hari. ' + MP_SENDIRI },
  { type: 'fill', q: 'Isi istilah jaringan aktivitas.',
    fields: [
      { label: 'Diagram dengan aktivitas di panah, hanya finish-to-start', a: ['AOA', 'activity on arrow', 'ADM', 'arrow diagramming method'] },
      { label: 'Ketergantungan alami (hard logic)', a: ['mandatory', 'mandatory dependencies', 'ketergantungan utama'] },
      { label: 'Ketergantungan yang ditentukan tim (soft logic)', a: ['discretionary', 'discretionary dependencies'] },
      { label: 'Ketergantungan dengan aktivitas non-proyek', a: ['external', 'external dependencies', 'eksternal'] }],
    ex: 'Dari slide Manpro 6: pengurutan aktivitas menentukan ketergantungan untuk analisis jalur kritis.' }
]);
