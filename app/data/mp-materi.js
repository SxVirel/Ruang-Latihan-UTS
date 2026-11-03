// Manajemen Proyek — materi per butir kisi-kisi dan per soal ujian (UTS 2026 Genap, remedial Ganjil 2024/2025).
// Disusun sendiri dari slide Manpro 4-6, lembar rumus ujian, dan contoh soal; bukan salinan slide.
// wbs: { root, items } dan net: { type: 'aoa' | 'aon', rows, pos } digambar oleh js/diagram.js.
// pos memberi letak tiap node dalam kolom dan baris; critical path dihitung ulang saat digambar.
BANK.materi('mp', [
  {
    label: 'Pola ujian', judul: 'Bentuk Soal UTS dan Lembar Rumus',
    ringkas: 'Empat soal: NPV/ROI/PBP, WBS, time management, earned value. Polanya sama di UTS 2026 Genap dan remedial 2024/2025.',
    bagian: [
      { h: 'Empat soal', tabel: { head: ['Soal', 'Poin', 'Materi', 'Yang diminta'], rows: [
        ['1', '30', 'Integration Management: NPV, ROI, PBP', 'Hitung NPV, ROI, PBP, jelaskan arti tiap nilai, lalu putuskan layak atau tidak'],
        ['2', '20', 'Scope Management: WBS', 'WBS sampai level 3 untuk metode tertentu, ditulis seperti daftar pustaka'],
        ['3', '30', 'Time Management', 'Semua path dan critical path, tabel ES, EF, LS, LF, FS, TS, dan network diagram'],
        ['4', '20-25', 'Earned Value', 'PV, EV, AC, BAC, lalu CPI, CV, SPI, SV, EAC, ETC, dan penjelasan kinerja']
      ] }, ingat: 'Soal 3 UTS 2026 Genap tidak terfoto, tetapi soal remedial memperlihatkan bentuknya: tabel Activity, Initial Node, Final Node, Estimated Duration.' },
      { h: 'Kisi-kisi dari dosen', poin: [
        'ROA (return on assets).',
        'Soal "a ke b": jaringan aktivitas dari node awal ke node akhir. Cari semua path dan critical path-nya.',
        'Payback period.',
        'Earned value (EV).',
        'NPV dan PV.'
      ] },
      { h: 'Lembar rumus yang dibagikan', tabel: { head: ['Besaran', 'Rumus di lembar soal'], rows: [
        ['ROI', '(total benefit discounted − total cost discounted) / total cost discounted × 100%'],
        ['Payback Period', 'n + (a − b)/(c − b) × 1 tahun'],
        ['Earned Value (EV)', 'PV to date × Rp, dalam praktik: persen pekerjaan selesai × BAC'],
        ['Cost Performance Index (CPI)', 'EV / AC'],
        ['Cost Variance (CV)', 'EV − AC'],
        ['Schedule Performance Index (SPI)', 'EV / PV'],
        ['Schedule Variance (SV)', 'EV − PV'],
        ['Estimate at Completion (EAC)', 'BAC / CPI'],
        ['Estimated Time to Complete', 'Original time estimate / SPI'],
        ['FreeSlack', 'LS − ES atau LF − EF'],
        ['Total Slack', 'ES aktivitas selanjutnya − EF aktivitas saat ini']
      ] }, ingat: 'Nama dua rumus slack di lembar soal tertukar dengan definisi slide. Menurut slide, total slack = LS − ES (aktivitas boleh telat tanpa memundurkan proyek) dan free slack = ES aktivitas berikutnya − EF (aktivitas boleh telat tanpa memundurkan aktivitas berikutnya). Kunci di aplikasi ini memakai definisi slide. Di ujian, tulis rumus yang kamu pakai di samping jawaban.' }
    ]
  },
  {
    label: 'Soal 1 · kisi-kisi NPV dan PV', judul: 'NPV, PV, dan Discount Factor',
    ringkas: 'Susun tabel arus kas, kalikan dengan discount factor, lalu jumlahkan.',
    bagian: [
      { h: 'Langkah', poin: [
        'Buat tabel per tahun: biaya, manfaat (pemasukan), dan arus kas bersih = manfaat − biaya. Tahun 0 berisi investasi awal.',
        'Discount factor DF = 1/(1 + r)^t, dengan r = discount rate dan t = tahun ke berapa.',
        'PV (present value) = nilai × DF. Tahun 0 tidak didiskonto, DF-nya 1.',
        'NPV = jumlah PV arus kas bersih tahun 0 sampai tahun terakhir. Tahun 0 negatif karena modal keluar.',
        'NPV > 0: proyek layak, karena nilai sekarang hasilnya lebih besar dari modal. NPV < 0: tidak layak.'
      ] },
      { h: 'Discount factor yang sering dipakai', tabel: { head: ['Tahun', '6%', '7%', '8%', '9%', '10%'], rows: [
        ['1', '0,9434', '0,9346', '0,9259', '0,9174', '0,9091'],
        ['2', '0,8900', '0,8734', '0,8573', '0,8417', '0,8264'],
        ['3', '0,8396', '0,8163', '0,7938', '0,7722', '0,7513'],
        ['4', '0,7921', '0,7629', '0,7350', '0,7084', '0,6830']
      ] } },
      { h: 'Contoh: Soal 1 remedial',
        soal: 'Tahun 2017, Telkom University mengusulkan investasi server Rp1.000 juta. Selama beroperasi ada biaya maintenance Rp25 juta per tahun, dan biaya pameran Rp50 juta setiap dua tahun (tahun 2, 4, dst.). Pendapatan tahun 1 sampai 4: 300, 250, 380, dan 400 juta. Discount rate 6%. Hitung NPV, ROI, dan PBP, jelaskan artinya, lalu tentukan apakah proyek layak.',
        tabel: { head: ['Tahun', 'Biaya', 'Manfaat', 'Arus kas bersih', 'DF 6%', 'PV'], rows: [
          ['0', '1.000', '0', '−1.000', '1', '−1.000,00'],
          ['1', '25', '300', '275', '0,9434', '259,43'],
          ['2', '75', '250', '175', '0,8900', '155,75'],
          ['3', '25', '380', '355', '0,8396', '298,06'],
          ['4', '75', '400', '325', '0,7921', '257,43'],
          ['NPV', '', '', '', '', '−29,32']
        ] },
        poin: [
          'Biaya tahun 2 dan 4 = 25 + 50 = 75 juta, karena pameran hanya ada di tahun genap.',
          'NPV = 970,68 − 1.000 = −29,32 juta. Artinya, nilai sekarang semua arus kas bersih masih 29,32 juta di bawah modal yang ditanam.',
          'NPV negatif, jadi proyek tidak layak, walaupun modal biasa sudah kembali dalam 3,6 tahun (lihat bab Payback Period).'
        ],
        ingat: 'Biaya rutin mulai tahun 1 karena soal menyebut "selama beroperasi". Jumlahkan PV sebelum dibulatkan supaya NPV tidak meleset di desimal kedua.' }
    ]
  },
  {
    label: 'Soal 1 · kisi-kisi ROI dan ROA', judul: 'ROI dan ROA',
    ringkas: 'ROI memakai nilai diskonto sesuai lembar rumus. ROA membandingkan laba dengan total aset.',
    bagian: [
      { h: 'ROI (return on investment)', poin: [
        'ROI = (total benefit diskonto − total cost diskonto) / total cost diskonto × 100%.',
        'Benefit diskonto = jumlah PV pemasukan. Cost diskonto = investasi awal + jumlah PV biaya rutin.',
        'Contoh Soal 1 remedial: benefit diskonto 1.141,41 dan cost diskonto 1.170,73, jadi ROI = (1.141,41 − 1.170,73)/1.170,73 = −2,50%.',
        'Arti: setiap Rp100 biaya (dalam nilai sekarang) hanya kembali Rp97,50, jadi proyek rugi 2,5%.'
      ], ingat: 'Tanpa diskonto, ROI kasus ini 10,83% dan terlihat untung. Lembar rumus memakai nilai diskonto, jadi pakai versi itu.' },
      { h: 'ROA (return on assets)', poin: [
        'ROA = laba bersih / total aset × 100%. Rumus ini dari buku standar karena tidak ada di slide.',
        'Contoh: laba bersih tahun 4 = 375 juta dan total aset 2.500 juta, jadi ROA = 375/2.500 = 15%.',
        'Arti: setiap Rp100 aset menghasilkan laba Rp15. Makin tinggi ROA, makin efisien aset dipakai.',
        'Kalau aset bertambah karena investasi baru, ROA bisa turun walaupun labanya naik.'
      ] }
    ]
  },
  {
    label: 'Soal 1 · kisi-kisi payback', judul: 'Payback Period',
    ringkas: 'Kapan modal kembali, dihitung dengan n + (a − b)/(c − b).',
    bagian: [
      { h: 'Arti simbol', tabel: { head: ['Simbol', 'Arti'], rows: [
        ['n', 'Tahun terakhir sebelum kumulatif arus kas bersih menutup investasi'],
        ['a', 'Investasi awal'],
        ['b', 'Kumulatif arus kas bersih sampai tahun n'],
        ['c', 'Kumulatif arus kas bersih sampai tahun n + 1']
      ] } },
      { h: 'Contoh: Soal 1 remedial', tabel: { head: ['Tahun', 'Arus kas bersih', 'Kumulatif', 'Kumulatif PV'], rows: [
        ['1', '275', '275', '259,43'],
        ['2', '175', '450', '415,18'],
        ['3', '355', '805', '713,25'],
        ['4', '325', '1.130', '970,68']
      ] }, poin: [
        'Kumulatif melewati 1.000 di tahun 4, jadi n = 3, b = 805, dan c = 1.130.',
        'PBP = 3 + (1.000 − 805)/(1.130 − 805) = 3 + 0,6 = 3,6 tahun, atau 3 tahun 7,2 bulan.',
        'PBP diskonto memakai kumulatif PV. Sampai tahun 4 baru 970,68, jadi secara diskonto modal belum kembali. Hasil ini sejalan dengan NPV yang negatif.'
      ], ingat: 'PBP hanya mengukur seberapa cepat modal kembali. Keputusan layak atau tidak tetap diambil dari NPV.' }
    ]
  },
  {
    label: 'Soal 2 · Scope Management', judul: 'WBS: Konsep dan Cara Menyusun',
    ringkas: 'WBS memecah pekerjaan per tahap metode sampai level 3, termasuk milestone yang diminta soal.',
    bagian: [
      { h: 'Isi slide', poin: [
        'WBS adalah pengelompokan pekerjaan berorientasi deliverable yang menentukan seluruh lingkup proyek.',
        'WBS menjadi dasar perencanaan jadwal, biaya, sumber daya, dan perubahan.',
        'Work package adalah tugas di level terendah WBS.',
        'WBS bisa disusun berdasarkan produk atau berdasarkan fase, lalu digambar sebagai chart atau ditulis dalam bentuk tabular.',
        'Pendekatan menyusun WBS: guideline, analogi, top-down, bottom-up, dan mind-mapping.'
      ] },
      { h: 'Cara menjawab soal WBS', poin: [
        'Level 1 berisi tahapan metode yang disebut soal, diurutkan sesuai waktu.',
        'Milestone yang diminta (kickoff, laporan kemajuan, laporan akhir, serah terima) menjadi aktivitas level 1 sendiri, diletakkan tepat di posisi yang disebut soal.',
        'Level 2 berisi kegiatan atau deliverable di tiap tahap. Level 3 berisi pekerjaan rinci (work package).',
        'Beri nomor seperti daftar pustaka: 1, 1.1, 1.1.1. Kode anak selalu diawali kode induknya.'
      ], ingat: 'Chart di bab berikutnya membantu membayangkan strukturnya. Di lembar jawaban, tulis bentuk daftar pustaka, karena soal memintanya.' },
      { h: 'Tahapan tiap metode', tabel: { head: ['Metode', 'Tahapan (level 1)'], rows: [
        ['Waterfall', 'Analisis kebutuhan, desain, implementasi, pengujian, (deployment dan pemeliharaan)'],
        ['Agile (Scrum)', 'Product backlog, sprint planning, pelaksanaan sprint dengan daily stand-up, sprint review, sprint retrospective'],
        ['Design Thinking', 'Empathize, define, ideate, prototype, test'],
        ['RAD', 'Requirements planning, user design, construction, cutover'],
        ['Prototyping', 'Komunikasi, perencanaan cepat, pemodelan desain cepat, konstruksi prototipe, penyerahan dan umpan balik']
      ] } }
    ]
  },
  {
    label: 'Soal 2 · contoh soal', judul: 'Contoh Soal WBS dengan Diagram',
    ringkas: 'Soal WBS remedial, UTS tahun lalu, dan empat soal latihan, masing-masing dengan diagram dan bentuk daftar pustakanya.',
    bagian: [
      { h: 'Remedial Soal 2: aplikasi peluang karier (Agile)',
        soal: 'Unit Pengembangan Karir sebuah universitas ingin mengembangkan aplikasi agar mahasiswa bisa melacak peluang karier secara real-time, dengan pendekatan Agile. Tim proyek diminta menyusun product backlog termasuk user stories untuk fitur utama, melakukan sprint planning untuk iterasi awal, menyediakan laporan harian (daily stand-up), dan mengadakan sprint review setelah iterasi selesai. Buatlah WBS hingga level 3 berdasarkan aktivitas utama Agile, ditulis seperti daftar pustaka.',
        wbs: { root: 'Aplikasi Pelacak Peluang Karier (Agile)', items: [
          ['Penyusunan product backlog', [
            ['Pengumpulan kebutuhan', ['Wawancara mahasiswa dan Unit Pengembangan Karir', 'Analisis aplikasi lowongan sejenis']],
            ['Penulisan user stories', ['User story pencarian lowongan real-time', 'User story notifikasi lowongan baru']],
            ['Prioritas backlog', ['Estimasi story point', 'Pengurutan oleh product owner']]]],
          ['Sprint planning iterasi 1', [
            ['Penetapan sprint goal', ['Rapat sprint planning', 'Kesepakatan target sprint 1']],
            ['Penyusunan sprint backlog', ['Pemilihan user story sprint 1', 'Pemecahan story menjadi task']]]],
          ['Pelaksanaan sprint', [
            ['Pengembangan fitur', ['Desain antarmuka', 'Pemrograman pencarian real-time']],
            ['Pengujian', ['Unit testing', 'Integration testing']],
            ['Daily stand-up', ['Rapat harian 15 menit', 'Laporan harian dan burndown chart']]]],
          ['Sprint review', [
            ['Demo increment', ['Demo ke Unit Pengembangan Karir', 'Pencatatan umpan balik']],
            ['Pembaruan backlog', ['Revisi product backlog', 'Laporan hasil sprint']]]],
          ['Sprint retrospective', [
            ['Evaluasi proses', ['Hal yang berjalan baik dan yang kurang', 'Rencana perbaikan sprint berikutnya']]]]
        ] },
        ingat: 'Daily stand-up terjadi setiap hari selama sprint, jadi di sini diletakkan di bawah Pelaksanaan sprint. Menjadikannya level 1 sendiri juga masuk akal karena soal menyebutnya terpisah. Yang penting, keempat permintaan soal muncul semua.' },
      { h: 'UTS 2026 Genap Soal 2: SI Konseling Mahasiswa (Design Thinking)',
        soal: 'Sistem Informasi Konseling Mahasiswa dikembangkan dengan metode Design Thinking. Penyelenggara meminta pertemuan awal (kickoff meeting), laporan kemajuan setelah tahap Ideate, serta laporan akhir dan sosialisasi di akhir kegiatan. Buat WBS sampai level 3.',
        wbs: { root: 'SI Konseling Mahasiswa (Design Thinking)', items: [
          ['Kickoff meeting', [
            ['Persiapan', ['Penyusunan agenda dan undangan', 'Dokumen ruang lingkup']],
            ['Pelaksanaan rapat', ['Penyepakatan tujuan dan jadwal', 'Notulen kickoff']]]],
          ['Empathize', [
            ['Riset pengguna', ['Wawancara mahasiswa', 'Wawancara konselor']],
            ['Observasi layanan', ['Pengamatan alur konseling', 'Empathy map']]]],
          ['Define', [
            ['Analisis temuan', ['Pengelompokan masalah', 'Persona mahasiswa']],
            ['Rumusan masalah', ['Problem statement', 'Daftar kebutuhan fitur']]]],
          ['Ideate', [
            ['Brainstorming', ['Sesi ide fitur', 'Prioritas ide']],
            ['Konsep solusi', ['Alur pemesanan jadwal konseling', 'Sketsa solusi']]]],
          ['Laporan kemajuan', [
            ['Penyusunan laporan', ['Rekap empathize sampai ideate', 'Rencana tahap berikutnya']],
            ['Presentasi ke penyelenggara', ['Presentasi hasil', 'Catatan masukan']]]],
          ['Prototype', [
            ['Desain antarmuka', ['Wireframe', 'Mockup']],
            ['Prototipe interaktif', ['Prototipe pemesanan jadwal', 'Prototipe riwayat konseling']]]],
          ['Test', [
            ['Uji pengguna', ['Usability test dengan mahasiswa', 'Uji dengan konselor']],
            ['Perbaikan', ['Analisis hasil uji', 'Revisi prototipe']]]],
          ['Laporan akhir dan sosialisasi', [
            ['Laporan akhir', ['Dokumen laporan akhir', 'Serah terima sistem']],
            ['Sosialisasi', ['Sosialisasi ke mahasiswa', 'Panduan penggunaan']]]]
        ] } },
      { h: 'Latihan: SI Bank Sampah (Design Thinking, dua laporan kemajuan)',
        soal: 'Dinas Lingkungan Hidup mengembangkan Sistem Informasi Bank Sampah untuk mencatat setoran sampah dan saldo tabungan warga, dengan metode Design Thinking. Penyelenggara meminta kickoff meeting, Laporan Kemajuan 1 setelah Define, Laporan Kemajuan 2 setelah Prototype, serta Laporan Akhir & Serah Terima di akhir.',
        wbs: { root: 'SI Bank Sampah (Design Thinking)', items: [
          ['Kickoff meeting', [['Rapat awal', ['Penyepakatan ruang lingkup', 'Jadwal kegiatan']]]],
          ['Empathize', [['Riset warga dan petugas', ['Wawancara petugas bank sampah', 'Observasi pencatatan manual']]]],
          ['Define', [['Rumusan masalah', ['Persona warga penabung', 'Problem statement']]]],
          ['Laporan kemajuan 1', [['Laporan hasil empathize dan define', ['Dokumen laporan', 'Presentasi ke dinas']]]],
          ['Ideate', [['Brainstorming fitur', ['Ide pencatatan setoran', 'Ide cek saldo warga']]]],
          ['Prototype', [['Prototipe aplikasi', ['Wireframe setoran sampah', 'Prototipe halaman saldo']]]],
          ['Laporan kemajuan 2', [['Laporan hasil prototype', ['Dokumen laporan', 'Demo prototipe']]]],
          ['Test', [['Uji coba di kelurahan', ['Uji dengan petugas', 'Revisi prototipe']]]],
          ['Laporan akhir & serah terima', [['Penutupan proyek', ['Laporan akhir', 'Berita acara serah terima']]]]
        ] },
        ingat: 'Ideate ada di nomor 5 karena Laporan Kemajuan 1 menempati nomor 4. Jadi level 2 pertamanya 5.1, bukan 4.1.' },
      { h: 'Latihan: Sistem Pelacakan Paket (RAD)',
        soal: 'PT Ekspedisi Kilat Nusantara mengembangkan Sistem Pelacakan Paket berbasis web dan mobile dengan metode RAD. Manajemen meminta kickoff meeting, laporan kemajuan setelah User Design, serta laporan akhir & serah terima. Pelatihan kurir termasuk tahap Cutover.',
        wbs: { root: 'Sistem Pelacakan Paket (RAD)', items: [
          ['Kickoff meeting', [['Rapat awal', ['Penyepakatan ruang lingkup', 'Pembentukan tim']]]],
          ['Requirements planning', [['Workshop kebutuhan', ['Kebutuhan kurir', 'Kebutuhan pelanggan']]]],
          ['User design', [['Prototipe iteratif', ['Prototipe aplikasi kurir', 'Prototipe pelacakan pelanggan']]]],
          ['Laporan kemajuan', [['Laporan user design', ['Dokumen laporan', 'Presentasi ke manajemen']]]],
          ['Construction', [['Pengembangan sistem', ['Backend dan database', 'Aplikasi web dan mobile']], ['Pengujian', ['Uji fungsional', 'Uji integrasi']]]],
          ['Cutover', [['Konversi data', ['Migrasi data paket', 'Verifikasi data']], ['Pelatihan kurir', ['Pelatihan aplikasi mobile', 'Pelatihan pemindaian paket']]]],
          ['Laporan akhir & serah terima', [['Penutupan proyek', ['Laporan akhir', 'Berita acara serah terima']]]]
        ] } },
      { h: 'Latihan: Reservasi Dokter Online (Prototyping)',
        soal: 'RSIA Bunda Sehat mengembangkan Sistem Reservasi Dokter Online dengan metode Prototyping: komunikasi, perencanaan cepat, pemodelan desain cepat, konstruksi prototipe, serta penyerahan dan umpan balik. Rumah sakit meminta kickoff meeting, laporan kemajuan setelah Pemodelan Desain Cepat, serta laporan akhir & sosialisasi.',
        wbs: { root: 'Reservasi Dokter Online (Prototyping)', items: [
          ['Kickoff meeting', [['Rapat awal', ['Penyepakatan ruang lingkup', 'Jadwal proyek']]]],
          ['Komunikasi', [['Penggalian kebutuhan', ['Wawancara pasien', 'Wawancara bagian pendaftaran']]]],
          ['Perencanaan cepat', [['Rencana iterasi', ['Daftar fitur prioritas', 'Jadwal iterasi']]]],
          ['Pemodelan desain cepat', [['Desain antarmuka', ['Wireframe halaman jadwal dokter', 'Wireframe halaman antrean']]]],
          ['Laporan kemajuan', [['Laporan desain', ['Dokumen laporan', 'Presentasi ke rumah sakit']]]],
          ['Konstruksi prototipe', [['Pembuatan prototipe', ['Fitur pilih jadwal dokter', 'Fitur nomor antrean']]]],
          ['Penyerahan dan umpan balik', [['Uji coba pengguna', ['Uji dengan pasien', 'Rekap umpan balik']]]],
          ['Laporan akhir & sosialisasi', [['Penutupan', ['Laporan akhir', 'Sosialisasi ke pasien dan staf']]]]
        ] } },
      { h: 'Latihan: SI Perpustakaan Daerah (Waterfall)',
        soal: 'Sistem Informasi Perpustakaan Daerah dikembangkan dengan metode Waterfall (analisis kebutuhan, desain, implementasi, pengujian). Pemberi kerja meminta kickoff meeting, laporan kemajuan setelah desain, User Acceptance Test (UAT) setelah pengujian, serta serah terima dan pelatihan pengguna.',
        wbs: { root: 'SI Perpustakaan Daerah (Waterfall)', items: [
          ['Kickoff meeting', [['Rapat awal', ['Penyepakatan ruang lingkup', 'Jadwal proyek']]]],
          ['Analisis kebutuhan', [['Pengumpulan kebutuhan', ['Wawancara pustakawan', 'Dokumen SRS']]]],
          ['Desain', [['Desain database', ['ERD', 'Kamus data']], ['Desain antarmuka', ['Mockup katalog', 'Mockup peminjaman']]]],
          ['Laporan kemajuan', [['Laporan desain', ['Dokumen laporan', 'Presentasi ke pemberi kerja']]]],
          ['Implementasi', [['Pemrograman', ['Modul katalog buku', 'Modul peminjaman']]]],
          ['Pengujian', [['Uji sistem', ['Black box testing', 'Perbaikan bug']]]],
          ['User acceptance test', [['UAT bersama pengguna', ['Skenario UAT', 'Berita acara UAT']]]],
          ['Serah terima dan pelatihan', [['Penutupan', ['Pelatihan pustakawan', 'Berita acara serah terima']]]]
        ] } }
    ]
  },
  {
    label: 'Soal 3 · kisi-kisi soal a ke b', judul: 'Network Diagram, Path, dan Critical Path',
    ringkas: 'Baca tabel node awal dan node akhir, gambar jaringannya, lalu daftar semua path.',
    bagian: [
      { h: 'Membaca tabel', poin: [
        'Setiap baris adalah satu panah (activity on arrow, AOA) dari Initial Node ke Final Node. Node berupa lingkaran bernomor.',
        'Soal "a ke b" meminta semua jalan dari node awal (biasanya 1) ke node akhir. Sebuah path selesai ketika sampai di node yang tidak punya panah keluar.',
        'Total path = jumlah durasi aktivitas di path itu.',
        'Critical path adalah path terpanjang. Totalnya sama dengan durasi proyek. Critical path bisa lebih dari satu kalau ada path lain yang sama panjang.'
      ] },
      { h: 'Contoh: Soal 3 remedial, bagian path',
        soal: 'Activity, Initial Node, Final Node, Estimated Duration:\nA 1→2 (5), B 1→4 (7), C 1→3 (5), D 2→5 (7), E 3→4 (6), F 3→6 (10), G 4→5 (9), H 5→6 (8).\nSebutkan semua path dan totalnya, lalu tandai critical path. Gambar network diagram-nya di halaman belakang.',
        net: { type: 'aoa', rows: [['A', 1, 2, 5], ['B', 1, 4, 7], ['C', 1, 3, 5], ['D', 2, 5, 7], ['E', 3, 4, 6], ['F', 3, 6, 10], ['G', 4, 5, 9], ['H', 5, 6, 8]],
          pos: { 1: [0, 1], 2: [1, 0], 3: [1, 2], 4: [2, 1], 5: [3, 0], 6: [4, 1] } },
        tabel: { head: ['No', 'Path', 'Total nilai', 'Critical path'], rows: [
          ['1', 'C-F (1-3-6)', '15', ''],
          ['2', 'A-D-H (1-2-5-6)', '20', ''],
          ['3', 'B-G-H (1-4-5-6)', '24', ''],
          ['4', 'C-E-G-H (1-3-4-5-6)', '28', '✓']
        ] },
        poin: [
          'Lembar jawaban menyediakan 8 baris, tetapi jaringan ini hanya punya 4 path. Jangan memaksa mengisi semua baris.',
          'Node 4 dimasuki B dan E, jadi G baru bisa mulai setelah keduanya selesai.'
        ] },
      { h: 'Float tiap aktivitas (cara slide)', poin: [
        'Float = durasi critical path − total path terpanjang yang melewati aktivitas itu.',
        'Isi mulai dari path terpanjang. Aktivitas yang sudah punya nilai tidak diisi lagi.',
        'Contoh remedial: C, E, G, H ada di critical path, float 0. B dan G ada di path 24, jadi float B = 28 − 24 = 4. A dan D ada di path 20, float = 8. F hanya ada di path 15, float = 13.'
      ] },
      { h: 'Langkah menggambar network diagram', poin: [
        'Mulai dari node 1 di kiri. Letakkan node lain makin ke kanan sesuai urutannya.',
        'Tarik panah sesuai tabel, tulis huruf aktivitas dan durasinya di atas panah.',
        'Setiap nomor node hanya digambar sekali. Panah yang berbagi node bertemu di lingkaran yang sama.',
        'Tebalkan panah di critical path, dan tulis waktu paling awal | paling lambat di atas tiap node agar ES sampai LF mudah dibaca.'
      ] }
    ]
  },
  {
    label: 'Soal 3 · Time Management', judul: 'ES, EF, LS, LF, dan Slack',
    ringkas: 'Forward pass untuk ES dan EF, backward pass untuk LS dan LF, lalu free slack dan total slack.',
    bagian: [
      { h: 'Forward pass (ES dan EF)', poin: [
        'ES aktivitas pertama = 0. EF = ES + durasi.',
        'ES sebuah aktivitas = EF terbesar dari semua aktivitas yang harus selesai sebelumnya.',
        'Di diagram AOA, ES = waktu paling awal node awalnya, yaitu nilai terbesar dari semua panah yang masuk ke node itu.'
      ] },
      { h: 'Backward pass (LS dan LF)', poin: [
        'LF aktivitas terakhir = durasi proyek. LS = LF − durasi.',
        'LF sebuah aktivitas = LS terkecil dari semua aktivitas sesudahnya.',
        'Di diagram AOA, LF = waktu paling lambat node akhirnya.'
      ] },
      { h: 'Dua jenis slack', tabel: { head: ['Istilah', 'Definisi slide', 'Rumus'], rows: [
        ['Total slack (total float)', 'Lama aktivitas boleh ditunda tanpa menunda selesainya proyek', 'LS − ES = LF − EF'],
        ['Free slack (free float)', 'Lama aktivitas boleh ditunda tanpa menunda mulainya aktivitas berikutnya', 'ES aktivitas berikutnya yang paling awal − EF']
      ] }, ingat: 'Lembar rumus ujian menukar kedua nama ini. Kalau tabel jawaban meminta FS dan TS, tulis rumus yang kamu pakai supaya penilai bisa mengikutinya.' },
      { h: 'Contoh: tabel jawaban Soal 3 remedial', tabel: { head: ['Activity', 'ES', 'EF', 'LS', 'LF', 'FS', 'TS'], rows: [
        ['A', '0', '5', '8', '13', '0', '8'],
        ['B', '0', '7', '4', '11', '4', '4'],
        ['C', '0', '5', '0', '5', '0', '0'],
        ['D', '5', '12', '13', '20', '8', '8'],
        ['E', '5', '11', '5', '11', '0', '0'],
        ['F', '5', '15', '18', '28', '13', '13'],
        ['G', '11', '20', '11', '20', '0', '0'],
        ['H', '20', '28', '20', '28', '0', '0']
      ] }, poin: [
        'Aktivitas dengan TS = 0 (C, E, G, H) membentuk critical path.',
        'A punya TS 8 tetapi FS 0: kalau A telat, D ikut mundur, walaupun proyek masih aman sampai 8 hari.',
        'F berakhir di node akhir proyek, jadi FS = TS = 28 − 15 = 13.'
      ] },
      { h: 'Proyek yang sama dalam notasi AON', net: { type: 'aon',
        rows: [['A', '-', 5], ['B', '-', 7], ['C', '-', 5], ['D', 'A', 7], ['E', 'C', 6], ['F', 'C', 10], ['G', 'B, E', 9], ['H', 'D, G', 8]],
        pos: { A: [0, 0], B: [0, 1], C: [0, 2], D: [1, 0], E: [1, 2], F: [1, 3], G: [2, 1], H: [3, 0.5] } },
        poin: [
          'Pada AON (activity on node), aktivitas digambar sebagai kotak dan panah hanya menunjukkan urutan.',
          'Pendahulu didapat dari tabel AOA: aktivitas X menunggu semua aktivitas yang berakhir di node awal X. Contoh: G mulai di node 4, yang dimasuki B dan E, jadi pendahulu G adalah B dan E.',
          'Soal dengan kolom Pendahulu (seperti topik Mirip Soal 3) digambar dengan notasi ini.'
        ] }
    ]
  },
  {
    label: 'Kisi-kisi jaringan · PERT', judul: 'PERT: Tiga Perkiraan Durasi',
    ringkas: 'Durasi harapan dari perkiraan optimis, paling mungkin, dan pesimis.',
    bagian: [
      { h: 'Rumus', poin: [
        'Durasi harapan t = (a + 4m + b)/6, dengan a = optimistic, m = most likely, dan b = pessimistic.',
        'Contoh: aktivitas X dengan a = 4, m = 6, b = 14 hari punya t = (4 + 24 + 14)/6 = 7 hari.',
        'Setelah tiap aktivitas punya t, cari path dan critical path seperti biasa memakai nilai t.'
      ] }
    ]
  },
  {
    label: 'Soal 4 · kisi-kisi EV', judul: 'Earned Value',
    ringkas: 'PV, EV, AC, BAC, lalu indeks kinerja biaya dan jadwal.',
    bagian: [
      { h: 'Empat nilai dasar', tabel: { head: ['Istilah', 'Arti', 'Cara hitung'], rows: [
        ['BAC', 'Total anggaran proyek', 'Langsung dari soal'],
        ['PV', 'Nilai pekerjaan yang direncanakan selesai sampai saat itu', 'BAC × waktu berjalan / durasi rencana'],
        ['EV', 'Nilai pekerjaan yang benar-benar selesai', 'Persen selesai × BAC'],
        ['AC', 'Biaya yang benar-benar sudah keluar', 'Langsung dari soal']
      ] } },
      { h: 'Indeks, variansi, dan perkiraan', tabel: { head: ['Besaran', 'Rumus'], rows: [
        ['CPI', 'EV / AC'], ['CV', 'EV − AC'], ['SPI', 'EV / PV'], ['SV', 'EV − PV'],
        ['EAC', 'BAC / CPI'], ['Estimated Time to Complete', 'Durasi rencana / SPI']
      ] }, ingat: 'Estimated Time to Complete di lembar rumus adalah perkiraan total waktu (misalnya dalam bulan), bukan sisa biaya.' },
      { h: 'Membaca hasil', tabel: { head: ['Hasil', 'Artinya'], rows: [
        ['CPI < 1, CV negatif', 'Over budget (boros): biaya keluar lebih besar dari nilai pekerjaan'],
        ['CPI > 1, CV positif', 'Under budget (hemat)'],
        ['SPI < 1, SV negatif', 'Behind schedule (terlambat)'],
        ['SPI > 1, SV positif', 'Ahead of schedule (lebih cepat dari rencana)']
      ] } },
      { h: 'Contoh: Soal 4 remedial',
        soal: 'Proyek konstruksi beranggaran Rp200 juta dengan durasi 1 tahun. Di akhir bulan ke-8, pekerjaan selesai 70% dan anggaran terpakai Rp150 juta. Tentukan PV, EV, AC, BAC, lalu CPI, CV, SPI, SV, EAC, ETC, dan jelaskan kinerja anggaran dan jadwal.',
        tabel: { head: ['Besaran', 'Hitungan', 'Hasil'], rows: [
          ['PV', '200 × 8/12', '133,33'], ['EV', '70% × 200', '140'], ['AC', 'dari soal', '150'], ['BAC', 'dari soal', '200'],
          ['CPI', '140 / 150', '0,93'], ['CV', '140 − 150', '−10'],
          ['SPI', '140 / 133,33', '1,05'], ['SV', '140 − 133,33', '6,67'],
          ['EAC', '200 / 0,9333', '214,29'], ['ETC', '12 / 1,05', '11,43 bulan']
        ] },
        poin: [
          'Anggaran: CPI < 1, jadi proyek over budget. Jika kinerja biaya tetap, total biaya diperkirakan 214,29 juta, 14,29 juta di atas anggaran.',
          'Jadwal: SPI > 1, jadi proyek ahead of schedule dan diperkirakan selesai dalam sekitar 11,4 bulan.'
        ] }
    ]
  }
]);
