// Manajemen Proyek — soal UTS tahun lalu (soal-ujian-manpro 2026 Genap), dari foto layar kiriman teman.
// Soal 3 tidak ada di foto. Kunci soal 4 tercantum di dokumen; kunci soal 1 dan 2 dihitung atau disusun sendiri.
// Satuan uang ditulis dalam juta rupiah supaya mudah diketik.
var MP_TL = 'Soal UTS tahun lalu (2026 Genap).';

BANK.isian('mp', 'tl', 'Soal UTS Tahun Lalu', [
  { type: 'fill', q: 'Soal 1 (30 poin) — PT Digital Nusantara.\nBiaya awal (perizinan, riset produk, legal, operasional awal) Rp1.500 juta.\nTahun 1 (Bandung): pengeluaran 300, pemasukan 600.\nTahun 2: tambahan modal Cirebon 150, pemasukan Cirebon 350, pengeluaran Bandung 80, pemasukan Bandung 500.\nTahun 3: modal tambahan Tasikmalaya 90, pemasukan Tasikmalaya 200, pemasukan Bandung 400, pemasukan Cirebon 180, pengeluaran Bandung 100, pengeluaran Cirebon 90.\nTahun 4: tiap kota (3 kota) pemasukan 220 dan pengeluaran 70.\nSemua angka dalam juta rupiah. Hitung arus kas bersih tiap tahun.',
    fields: [{ label: 'Tahun 0', a: -1500, tol: 0.5 }, { label: 'Tahun 1', a: 300, tol: 0.5 }, { label: 'Tahun 2', a: 620, tol: 0.5 }, { label: 'Tahun 3', a: 500, tol: 0.5 }, { label: 'Tahun 4', a: 450, tol: 0.5 }],
    ex: 'Tahun 2: 350 + 500 − 150 − 80 = 620. Tahun 3: 200 + 400 + 180 − 90 − 100 − 90 = 500. Tahun 4: 3 × (220 − 70) = 450. ' + MP_TL + ' Kunci dihitung sendiri.' },
  { type: 'fill', q: 'Lanjutan Soal 1. Arus kas bersih (juta rupiah): tahun 0 = −1500, tahun 1 = 300, tahun 2 = 620, tahun 3 = 500, tahun 4 = 450. Discount rate 6%. Berapa NPV, ROI, dan PBP-nya?',
    fields: [
      { label: 'NPV (juta)', a: 111.07, tol: 0.5 },
      { label: 'ROI (%), rumus slide: (manfaat diskonto − biaya diskonto) / biaya diskonto', a: 4.65, tol: 0.05 },
      { label: 'PBP biasa (tahun), rumus n + (a − b)/(c − b)', a: 3.18, tol: 0.01 },
      { label: 'PBP diskonto (tahun)', a: 3.69, tol: 0.01 }],
    ex: 'PV: 283,02 + 551,80 + 419,81 + 356,44 = 1611,07, jadi NPV = 1611,07 − 1500 = 111,07. Manfaat diskonto 2500,22, biaya diskonto 2389,15, ROI = 4,65%. Kumulatif biasa 300, 920, 1420, 1870: PBP = 3 + (1500 − 1420)/(1870 − 1420) = 3,18 tahun. Kumulatif diskonto 1254,63 dan 1611,07: PBP = 3 + 245,37/356,44 = 3,69 tahun. ' + MP_TL + ' Kunci dihitung sendiri. Kalau dosen memakai ROI tanpa diskonto, hasilnya (2890 − 2520)/2520 = 14,68%.' },
  { type: 'fill', q: 'Soal 2 (20 poin) — WBS Sistem Informasi Konseling Mahasiswa dengan metode Design Thinking. Penyelenggara meminta pertemuan awal (kickoff meeting), laporan kemajuan setelah tahap Ideate, serta laporan akhir dan sosialisasi di akhir. Isi urutan aktivitas level 1 WBS.',
    fields: [
      { label: '1', a: ['kickoff meeting', 'kickoff', 'pertemuan awal', 'kick off meeting', 'kick off'] },
      { label: '2', a: ['empathize', 'empati', 'empathy'] },
      { label: '3', a: ['define', 'definisi'] },
      { label: '4', a: ['ideate', 'ideasi'] },
      { label: '5', a: ['laporan kemajuan', 'progress report'] },
      { label: '6', a: ['prototype', 'prototipe'] },
      { label: '7', a: ['test', 'pengujian', 'testing'] },
      { label: '8', a: ['laporan akhir dan sosialisasi', 'laporan akhir sosialisasi', 'laporan akhir', 'sosialisasi'] }],
    ex: 'Di ujian, tiap aktivitas level 1 dipecah sampai level 3 dalam bentuk tabel (misalnya 2.1 riset pengguna, 2.1.1 wawancara mahasiswa). ' + MP_TL + ' Urutan disusun sendiri dari teks soal.' },
  { type: 'fill', q: 'Soal 4a (25 poin) — Proyek sistem manajemen inventori didanai Rp150 juta dengan durasi 1 tahun. Pada akhir bulan ke-9, pekerjaan selesai 60% dan anggaran terpakai Rp100 juta. Tentukan PV, EV, AC, dan BAC di akhir bulan ke-9 (juta rupiah).',
    fields: [{ label: 'PV', a: 112.5, tol: 0.01 }, { label: 'EV', a: 90, tol: 0.01 }, { label: 'AC', a: 100, tol: 0.01 }, { label: 'BAC', a: 150, tol: 0.01 }],
    ex: 'PV = 150 × 9/12 = 112,5. EV = 60% × 150 = 90. AC = 100. BAC = 150. ' + MP_TL + ' Kunci sesuai dokumen.' },
  { type: 'fill', q: 'Soal 4b — Lanjutan proyek inventori (BAC 150, PV 112,5, EV 90, AC 100, durasi rencana 12 bulan). Hitung CPI, CV, SPI, SV, EAC, dan Estimated Time to Complete.',
    fields: [
      { label: 'CPI', a: 0.9, tol: 0.005 }, { label: 'CV (juta)', a: -10, tol: 0.01 },
      { label: 'SPI', a: 0.8, tol: 0.005 }, { label: 'SV (juta)', a: -22.5, tol: 0.01 },
      { label: 'EAC (juta)', a: 166.67, tol: 0.01 }, { label: 'Estimated Time to Complete (bulan)', a: 15, tol: 0.01 }],
    ex: 'CPI = 90/100 = 0,9. CV = 90 − 100 = −10. SPI = 90/112,5 = 0,8. SV = 90 − 112,5 = −22,5. EAC = BAC/CPI = 166,67 (Rp166.666.667). Estimated Time to Complete = waktu rencana/SPI = 12/0,8 = 15 bulan. ' + MP_TL + ' Kunci sesuai dokumen.' }
]);
