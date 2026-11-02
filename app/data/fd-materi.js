// Forensik Digital — ringkasan satu dek slide per minggu, disusun sendiri (bukan salinan slide).
// hlm = rentang halaman slide sumber. Urutan mengikuti alur kisi-kisi UTS.
BANK.materi('fd', [
  {
    minggu: 1, judul: 'Prinsip, Standar, dan Pedoman Forensik', hlm: '1-19',
    ringkas: 'Prinsip Locard, empat prinsip ACPO, standar ISO/IEC 27037, dan cara membedakan principle, standard, guideline, best practice.',
    bagian: [
      { h: 'Prinsip Locard', poin: [
        'Setiap kontak meninggalkan jejak: pelaku membawa sesuatu masuk ke TKP dan membawa sesuatu keluar.',
        'Pada intrusi komputer jejaknya tersebar di file system, registry, system log, dan log jaringan; pelaku juga bisa membawa pulang data korban seperti password atau PII.',
        'Tujuan investigasi: mengikuti jejak yang ditinggalkan dan menghubungkan pelaku dengan korban serta TKP.'
      ], ingat: 'Locard dipakai untuk menjelaskan mengapa setiap perangkat dan setiap log layak diperiksa.' },
      { h: 'Empat prinsip ACPO', tabel: { head: ['Prinsip', 'Isi'], rows: [
        ['1', 'Tidak ada tindakan yang mengubah data yang nanti dipakai di pengadilan'],
        ['2', 'Jika data asli harus diakses, orangnya kompeten dan mampu menjelaskan relevansi serta implikasi tindakannya'],
        ['3', 'Audit trail semua proses dibuat dan disimpan; pihak ketiga independen dapat mengulang proses dan memperoleh hasil sama'],
        ['4', 'Penanggung jawab investigasi memastikan hukum dan prinsip ini dipatuhi']
      ] } },
      { h: 'ISO/IEC 27037 dan standar lain', poin: [
        'Tiga prinsip bukti digital: relevance, reliability, sufficiency.',
        'Reliability menuntut proses dapat diaudit, diulang (repeatability), dan direproduksi (reproducibility).',
        'Repeatability: prosedur, alat, dan kondisi sama. Reproducibility: metode sama, alat dan kondisi berbeda.',
        'Auditability: assessor independen dapat menilai aktivitas DEFR dan DES. Justifiability: setiap tindakan dapat dibenarkan sebagai pilihan terbaik.',
        'Standar lain: ISO/IEC 17025 (laboratorium uji dan kalibrasi), NIST SP 800-86 (integrasi forensik ke incident response), ISO/IEC 27043 (harmonized investigation process).',
        'Pedoman: IOCE (2002), SWGDE (2013, jenis error tool: incompleteness, inaccuracy, misinterpretation), ENFSI (2015).'
      ] },
      { h: 'Prinsip penanganan bukti', poin: [
        'Minimalkan penanganan perangkat asli atau bukti potensial.',
        'Catat setiap perubahan dan dokumentasikan semua tindakan.',
        'Patuhi aturan pembuktian yang berlaku, dan jangan bertindak di luar kompetensi.',
        'Validasi proses sebelum dipakai; bukti digital mudah berubah, rusak, atau hilang jika salah penanganan.'
      ] }
    ]
  },
  {
    minggu: 2, judul: 'Framework dan Tahapan Penyidikan', hlm: '1-37',
    ringkas: 'Definisi bukti digital, uji Daubert, model proses forensik, lima tahapan, proses NIST, dan chain of custody.',
    bagian: [
      { h: 'Definisi dan istilah', poin: [
        'Forensik berasal dari kata Latin forum (pasar, tempat publik); artinya ilmu untuk kepentingan peradilan.',
        'Bukti digital: data yang membuktikan kejahatan atau menghubungkan kejahatan dengan korban dan pelaku (Casey), informasi bernilai pembuktian (SWGDE), data bernilai investigasi (ACPO), data yang mendukung atau membantah hipotesis (Carrier).',
        'Digital evidence mencakup barang bukti, alat bukti, dan bukti digital potensial.'
      ] },
      { h: 'Penerimaan bukti ilmiah', poin: [
        'Frye v. U.S. (1923): bukti ilmiah diterima jika metodenya generally accepted.',
        'Daubert v. Merrell Dow (1993) menambahkan evidentiary reliability dengan empat panduan: testing, publication atau peer review, error rate, general acceptance.'
      ] },
      { h: 'Lima tahapan proses', tabel: { head: ['Tahap', 'Kegiatan utama'], rows: [
        ['Preparation', 'Menyusun rencana, sumber daya, izin, dan toolkit'],
        ['Identification', 'Menemukan sumber bukti, jenis perangkat, pemilik, prioritas data, metode dan tool'],
        ['Preservation', 'Mencegah perubahan: isolasi jaringan, amankan log, ambil data volatile, lalu koleksi dan akuisisi'],
        ['Analysis', 'Examination dan analysis: mencari serta menafsirkan jejak'],
        ['Presentation', 'Melaporkan temuan sesuai konteks, termasuk bukti memberatkan dan meringankan']
      ] } },
      { h: 'Proses NIST dan chain of custody', poin: [
        'NIST: Collection, Examination, Analysis, Reporting; alur bukti Media - Data - Information - Evidence.',
        'Prioritas pengumpulan: likely value, volatility, amount of effort required. Data yang hilang saat daya dicabut diambil lebih dulu.',
        'Chain of custody mencatat siapa menangani bukti, kapan dikumpulkan atau dipindahkan, dan untuk tujuan apa; berlaku untuk perangkat maupun data atau image-nya.',
        'Syarat rules of evidence: admissible, authentic, complete, reliable, believable.'
      ], ingat: 'Framework berbeda-beda namanya, tetapi isinya selalu berputar pada rencana, identifikasi, pengamanan, analisis, dan pelaporan.' }
    ]
  },
  {
    minggu: 3, judul: 'Hash, Timestamp, dan Metadata', hlm: '1-14',
    ringkas: 'Fungsi hash dan panjang digest, Unix time, timestamp NTFS, jenis metadata, dan hex editor.',
    bagian: [
      { h: 'Fungsi hash', poin: [
        'Hash memetakan pesan sepanjang apa pun menjadi digest dengan panjang tetap.',
        'Perubahan satu karakter mengubah seluruh nilai hash; karena itu hash dipakai untuk membuktikan image identik dengan media asli.',
        'Panjang digest: MD5 128 bit, SHA-1 160 bit, SHA-256 256 bit.'
      ] },
      { h: 'Timestamp', tabel: { head: ['Istilah', 'Arti'], rows: [
        ['Unix time', 'Jumlah detik non-leap sejak 00.00.00 UTC 1 Januari 1970'],
        ['32-bit overflow', 'Signed integer 32-bit habis pada 2038'],
        ['MACE atau MACB', 'Modified, Accessed, Created, Entry modified pada NTFS']
      ] }, poin: [
        'Timestamp tidak harus berpatokan pada waktu absolut; epoch-nya bisa sembarang, misalnya waktu sistem menyala.',
        'Contoh: tengah malam 1 Januari 2010 = 1262304000; 1 Januari 2020 = 1577836800.',
        'Huruf E pada MACE berarti record $MFT berubah, bukan isi file.'
      ] },
      { h: 'Metadata', poin: [
        'Descriptive: judul, abstrak, penulis, kata kunci.',
        'Structural: cara objek majemuk disusun, misalnya urutan halaman menjadi bab.',
        'Administrative: tipe resource, izin, kapan dan bagaimana dibuat.',
        'Reference dan statistical: isi serta kualitas data statistik. Legal: pembuat, pemegang hak cipta, lisensi.'
      ] },
      { h: 'Hex editor', poin: [
        'Melihat dan mengubah isi file pada tingkat byte, misalnya untuk memeriksa header atau signature.',
        'Diffing: membandingkan file asli dengan file setelah perubahan.',
        'Contoh tool: HxD, ImHex, hexed.it.'
      ] }
    ]
  },
  {
    minggu: 4, judul: 'Akuisisi, Imaging, dan Struktur Disk', hlm: '1-38',
    ringkas: 'Live dan dead imaging, write blocker, copy versus cloning versus imaging, verifikasi hash, serta sektor dan cluster.',
    bagian: [
      { h: 'Live atau dead imaging', poin: [
        'Pilihan bergantung pada situasi, data yang dicari, dan jenis kasus.',
        'Data volatile hilang saat daya dilepas (RAM, tabel routing, koneksi). Data persisten tetap ada, tetapi bisa terkunci enkripsi.',
        'Live imaging dipakai bila RAM harus diselamatkan, disk terenkripsi tanpa kunci, perangkat tidak boleh dimatikan karena bisnis, data di lokasi jauh, atau mematikan sistem memicu perubahan perilaku pelaku.',
        'Dead imaging: perangkat dimatikan dan media dilepas, sehingga tidak ada perubahan data; dianjurkan bila ada dugaan time bomb. Catat isu integritas pada SSD.'
      ] },
      { h: 'Langkah first responder', poin: [
        'Perangkat menyala: jangan dimatikan; hentikan program penghapus; isolasi dari jaringan; matikan screensaver dan screen lock; periksa enkripsi; pastikan sumber daya.',
        'Perangkat mati: jangan dinyalakan sampai diproses dengan jaminan prosedur.',
        'Alur keputusan: triage, isolasi, ambil RAM, cek enkripsi, baru matikan; bila imaging di lokasi diperlukan, lepas disk atau boot dari media khusus, buat image, dan catat hash sumber serta target.'
      ] },
      { h: 'Penggandaan dan verifikasi', tabel: { head: ['Teknik', 'Cakupan', 'Keluaran'], rows: [
        ['Copy-paste', 'Hanya file aktif', 'File di folder tujuan'],
        ['Cloning', 'Bit-by-bit seluruh media', 'Disk lain yang bisa menggantikan asli'],
        ['Imaging', 'Bit-by-bit seluruh media', 'Satu file snapshot tetap']
      ] }, poin: [
        'Imaging mencakup active data, unused space, slack, dan unallocated space; hash image harus sama dengan hash media asli.',
        'Urutan dead imaging: lepas disk, sambungkan ke port read-only write blocker, media target ke port read-write, sambungkan ke komputer analisis, buat image, dokumentasikan chain of custody, lalu analisis pada image.',
        'Catat prosedur, tool, lokasi tujuan, algoritma hash beserta nilainya, dan kejadian selama proses.',
        'Tool: dd, FTK Imager, EnCase, Sleuth Kit, Autopsy, ProDiscover, SANS SIFT.'
      ] },
      { h: 'Sektor, cluster, dan slack', poin: [
        'Sektor 512 byte adalah unit terkecil yang dapat ditulis; cluster adalah unit terkecil yang dapat dialamati pada volume.',
        'Bila satu cluster berisi 4 sektor, ukurannya 2048 byte, sehingga ukuran fisik minimum sebuah file adalah 2048 byte.',
        'File 600 byte tetap memakai satu cluster; 1448 byte sisanya tidak ditimpa dan dapat berisi data lama (slack).'
      ], ingat: 'Analisis selalu pada salinan. Media asli disimpan, primary copy disimpan, secondary copy dipakai untuk analisis.' }
    ]
  },
  {
    minggu: 5, judul: 'Dead Forensics dan Sanitasi Media', hlm: '1-17',
    ringkas: 'Perbedaan delete, format, dan wipe serta pengaruhnya pada peluang pemulihan data.',
    bagian: [
      { h: 'Dead imaging', poin: [
        'Dilakukan saat perangkat sudah dimatikan dan media dipisahkan dari perangkatnya.',
        'Tidak ada peluang perubahan data selama imaging.',
        'Direkomendasikan bila ada kemungkinan time bomb penghapus data.'
      ] },
      { h: 'Sanitasi media', tabel: { head: ['Metode', 'Yang berubah', 'Peluang pemulihan'], rows: [
        ['Delete', 'Record MFT ditandai terhapus', 'Data masih ada sampai ditimpa'],
        ['Quick format', 'MFT dan indeks lokasi file dihancurkan, partisi ditandai terformat', 'Data masih ada di disk'],
        ['Full format Vista ke atas', 'Ditambah langkah penimpaan', 'Turun drastis, bergantung pola timpa'],
        ['Wipe', 'Seluruh partisi ditimpa', 'Data tidak dapat dipulihkan']
      ] }, poin: [
        'Tujuan sanitasi berbeda: mencegah kebocoran privasi pada keamanan informasi, mencegah kontaminasi pada forensik.'
      ], ingat: 'Media target wajib di-wipe lebih dulu agar sisa data lama tidak tercampur dengan bukti baru.' },
      { h: 'Uji sanitasi di slide', poin: [
        'Alur uji: perlakukan media (delete, format, wipe), periksa isi disk, lalu coba pemulihan.',
        'Setelah delete dan format masih ditemukan data lama; setelah wipe sektor berisi pola timpa sehingga tidak terbaca sebagai file.',
        'Tool uji: HxD, MiniTool Partition Wizard, Disk Management, FTK Imager.'
      ] },
      { h: 'Best practice akuisisi', poin: [
        'Pakai write blocker dan tool yang teruji serta diterima komunitas forensik.',
        'Cek enkripsi sebelum mematikan daya, dan lakukan live imaging lebih dulu bila perlu.',
        'Pertimbangkan akuisisi logical volume atau physical drive.',
        'Enkripsi file image bila perlu, dan selalu perbarui chain of custody.'
      ] }
    ]
  },
  {
    minggu: 6, judul: 'Memory Forensics: Akuisisi dan Artefak', hlm: '1-31',
    ringkas: 'Ruang alamat, paging, akuisisi RAM dengan FTK Imager dan WinPmem, serta artefak yang bisa digali dari dump memori.',
    bagian: [
      { h: 'Konsep memori', poin: [
        'Memory acquisition menyalin isi memori volatile ke media non-volatile untuk pengawetan.',
        'Proses tidak mengakses memori fisik langsung; setiap proses punya virtual address space.',
        'Pada x86 setiap proses mendapat 4 GB: 2 GB user space di bawah, 2 GB kernel space di atas. Pada x64 ruangnya jauh lebih besar.',
        'Ruang alamat dibagi menjadi page berukuran tetap yang dipetakan ke memori fisik. Shared memory dipakai beberapa proses sekaligus.',
        'Stack ada di alamat tinggi dan tumbuh ke bawah; heap tumbuh ke atas dari area data.'
      ] },
      { h: 'Akuisisi', poin: [
        'Siapkan flash drive yang cukup besar, lalu wipe dulu agar bersih.',
        'Tool akuisisi: FTK Imager, WinPmem, Belkasoft Live RAM Capturer, Magnet RAM Capture, DumpIt.',
        'Akuisisi parsial per proses dapat memakai ProcDump dari Sysinternals.',
        'Pemantauan cepat saat sistem hidup: Process Hacker (daftar proses, service, koneksi jaringan, pemakaian disk).'
      ] },
      { h: 'Analisis dengan Volatility', poin: [
        'Profile menunjukkan sistem operasi sumber dump; imageinfo menebaknya lewat KDBG search.',
        'pslist membaca daftar proses aktif, psscan memindai struktur proses termasuk yang sudah berhenti atau tersembunyi.',
        'Plugin lain: cmdline (argumen proses), hashdump, lsadump, cachedump, hivelist, printkey, dumpregistry, userassist, shutdowntime, shellbags, dumpfiles.',
        'dumpfiles memakai -Q untuk offset fisik dan -D untuk folder tujuan.',
        'Waktu pada keluaran Volatility umumnya UTC, sehingga perlu disesuaikan dengan zona waktu setempat.'
      ] },
      { h: 'Informasi yang bisa digali', poin: [
        'Program yang berjalan otomatis (persistence), perangkat eksternal yang pernah terpasang, akun dan MRU, program yang baru dijalankan, serta konfigurasi sistem dan patch.',
        'Kontainer kripto seperti BitLocker, TrueCrypt, dan VeraCrypt dapat terdeteksi dari memori.',
        'Tool lain: MemProcFS, Registry Explorer, RegRipper, ShellbagsExplorer.'
      ], ingat: 'Mematikan komputer menghapus bukti di RAM. Itulah alasan urutan akuisisi memprioritaskan data volatile.' }
    ]
  },
  {
    minggu: 7, judul: 'Memory Forensics II: String, Password, dan Registry', hlm: '1-24',
    ringkas: 'Pencarian string, bulk extractor, YARA, pemulihan kredensial, dan artefak registry dari dump memori.',
    bagian: [
      { h: 'Investigasi string', poin: [
        'String64 dari Sysinternals mengekstrak teks yang dapat dibaca dari dump, misalnya string64.exe -a dump.mem.',
        'bulk_extractor memindai image, file, atau direktori tanpa mengurai file system, dengan parameter -o untuk folder keluaran.',
        'Scanner bulk_extractor dapat diaktifkan dengan -e, dijadikan satu-satunya dengan -E, dan dimatikan dengan -x.',
        'YARA mencocokkan pola atau rule untuk mengenali malware pada dump.'
      ] },
      { h: 'Pemulihan kredensial', tabel: { head: ['Plugin', 'Isi'], rows: [
        ['hashdump', 'Hash password akun lokal, dapat diuji dengan John the Ripper'],
        ['lsadump', 'Rahasia LSA: password auto-login, kunci RDP, kredensial DPAPI'],
        ['cachedump', 'Hash kredensial domain yang di-cache (maksimal 10 akun terakhir)'],
        ['cmdline', 'Argumen command line tiap proses']
      ] } },
      { h: 'Artefak registry di memori', poin: [
        'HKCU menyimpan setelan pengguna, HKLM menyimpan setelan sistem.',
        'SAM: grup, pengguna, hak istimewa, password, tanggal login terakhir.',
        'SYSTEM: nama komputer, service, perangkat USB yang pernah terpasang, zona waktu, konfigurasi network adapter.',
        'SOFTWARE: software terpasang, scheduled task, autorun, kompatibilitas aplikasi.',
        'NTUSER.DAT: dokumen terakhir dibuka, program sering dijalankan, riwayat explorer, koneksi RDP keluar.',
        'Persistence sistem ada di HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run, RunOnce, dan Policies\\Explorer\\Run; persistence pengguna di HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run dan RunOnce.'
      ] },
      { h: 'Plugin registry dan pesan instan', poin: [
        'printkey menampilkan key, subkey, dan value; hivelist mendaftar hive yang dapat diakses; dumpregistry mengekstrak file hive dari memori.',
        'userassist membantu melihat program yang pernah dijalankan; shutdowntime kapan sistem dimatikan; shellbags folder yang pernah dibuka.',
        'Pesan instan dan email juga dapat dipulihkan dari memori, sama seperti riwayat browser.'
      ], ingat: 'Registry menjelaskan apa yang terjadi, memori menjelaskan apa yang sedang terjadi.' }
    ]
  }
]);
