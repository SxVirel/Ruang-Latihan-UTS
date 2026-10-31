// Forensik Digital — dari 7 slide (prinsip, framework, konsep & tool, computer/dead/memory forensics)
BANK.isian('fd', 'prin', 'Prinsip & Standar', [
  { type: 'fill', q: 'Prinsip forensik: "Every contact leaves a trace" dikemukakan oleh siapa dan disebut prinsip apa?',
    fields: [{ label: 'Tokoh', a: ['edmond locard', 'locard'] }, { label: 'Nama prinsip', a: ['locard exchange principle', 'locards exchange principle', 'exchange principle', 'prinsip pertukaran locard'] }, { label: 'Tahun', a: 1910, tol: 0 }],
    ex: 'Pelaku membawa sesuatu ke TKP dan membawa sesuatu darinya. Pada intrusi komputer, jejak ada di file system, registry, log sistem, dan log jaringan.' },
  { type: 'essay', q: 'Sebutkan empat prinsip ACPO Good Practice Guide for Digital Evidence.',
    points: ['Prinsip 1: tidak boleh ada tindakan yang mengubah data yang akan diandalkan di pengadilan', 'Prinsip 2: jika harus mengakses data asli, orang tersebut harus kompeten dan mampu menjelaskan relevansi serta implikasi tindakannya', 'Prinsip 3: audit trail semua proses harus dibuat dan disimpan; pihak ketiga independen harus bisa mengulang dan mendapat hasil sama', 'Prinsip 4: penanggung jawab investigasi bertanggung jawab memastikan hukum dan prinsip ini dipatuhi'] },
  { type: 'fill', q: 'ISO/IEC 27037 mengatur bukti digital dengan tiga prinsip dasar. Sebutkan.',
    fields: [{ label: 'Prinsip 1', a: ['relevance', 'relevansi'] }, { label: 'Prinsip 2', a: ['reliability', 'reliabilitas', 'keandalan'] }, { label: 'Prinsip 3', a: ['sufficiency', 'kecukupan'] }],
    ex: 'Relevance: material relevan dengan investigasi. Reliability: proses dapat diaudit dan diulang, hasilnya reproducible. Sufficiency: materi yang dikumpulkan cukup untuk investigasi.' },
  { type: 'fill', q: 'Istilah ISO/IEC 27037.',
    fields: [
      { label: 'DEFR singkatan dari', a: ['digital evidence first responder'] },
      { label: 'DES singkatan dari', a: ['digital evidence specialist'] },
      { label: 'Hasil sama dengan prosedur, alat, dan kondisi yang SAMA', a: ['repeatability', 'repeatable'] },
      { label: 'Hasil sama dengan metode sama tapi alat dan kondisi BERBEDA', a: ['reproducibility', 'reproducible'] }],
    ex: 'Auditability: assessor independen bisa mengevaluasi aktivitas. Justifiability: setiap tindakan bisa dibenarkan sebagai pilihan terbaik.' },
  { type: 'fill', q: 'Pasangkan standar dengan isinya.',
    fields: [
      { label: 'Identifikasi, koleksi, akuisisi, preservasi bukti digital', a: ['iso iec 27037', 'iso 27037', '27037'] },
      { label: 'Laboratorium pengujian dan kalibrasi', a: ['iso iec 17025', 'iso 17025', '17025'] },
      { label: 'Integrasi teknik forensik ke incident response (NIST)', a: ['nist sp 800 86', 'sp 800 86', '800 86'] },
      { label: 'Harmonized digital investigation process (2015)', a: ['iso iec 27043', 'iso 27043', '27043'] }] },
  { type: 'essay', q: 'Apa beda principle, standard, guideline, dan best practice? Sebutkan contoh guideline forensik.',
    points: ['Principle: kebenaran dasar yang menjadi fondasi perilaku atau penilaian', 'Standard: disepakati internasional oleh ahli (ISO), "formula" cara terbaik', 'Guideline: rekomendasi', 'Best practice: metode yang diterima umum karena hasilnya lebih baik', 'Contoh guideline: IOCE (2002), SWGDE (2013), ENFSI Best Practice Manual (2015)', 'SWGDE: jenis error tool forensik = incompleteness, inaccuracy, misinterpretation'] },
  { type: 'essay', q: 'Sebutkan prinsip penanganan bukti digital menurut ISO/IEC 27037.',
    points: ['Minimalkan penanganan perangkat asli atau bukti digital potensial', 'Catat setiap perubahan dan dokumentasikan semua tindakan', 'Patuhi aturan pembuktian lokal', 'DEFR dan DES tidak boleh bertindak di luar kompetensinya', 'Proses harus divalidasi sebelum dipakai'] }
]);

BANK.isian('fd', 'frame', 'Framework & Tahapan', [
  { type: 'fill', q: 'Tahapan umum forensik digital (urutkan, lima tahap).',
    fields: [{ label: 'Tahap 1', a: ['preparation', 'persiapan'] }, { label: 'Tahap 2', a: ['identification', 'identifikasi'] }, { label: 'Tahap 3', a: ['preservation', 'preservasi'] }, { label: 'Tahap 4', a: ['analysis', 'analisis', 'examination and analysis'] }, { label: 'Tahap 5', a: ['presentation', 'presentasi', 'pelaporan', 'reporting'] }],
    ex: 'Versi NIST: collection, examination, analysis, reporting. Versi slide proses umum: identifikasi, koleksi, akuisisi, analisis, pelaporan.' },
  { type: 'fill', q: 'Empat elemen kunci forensic computing menurut McKemmish (1999).',
    fields: [{ label: '1', a: ['identification', 'identifikasi'] }, { label: '2', a: ['preservation', 'preservasi'] }, { label: '3', a: ['analysis', 'analisis'] }, { label: '4', a: ['presentation', 'presentasi'] }] },
  { type: 'fill', q: 'Prioritas pengumpulan data menurut NIST ditentukan oleh tiga faktor.',
    fields: [{ label: '1', a: ['likely value', 'nilai', 'value'] }, { label: '2', a: ['volatility', 'volatilitas'] }, { label: '3', a: ['amount of effort required', 'effort', 'usaha', 'amount of effort'] }],
    ex: 'Data yang akan hilang jika listrik dicabut (RAM, koneksi jaringan) diprioritaskan.' },
  { type: 'essay', q: 'Definisikan chain of custody dan jelaskan mengapa penting.',
    points: ['Proses melacak perpindahan bukti selama siklus koleksi, pengamanan, dan analisis', 'Mencatat setiap orang yang menangani bukti', 'Mencatat tanggal/waktu dikumpulkan atau dipindahkan', 'Mencatat tujuan pemindahan', 'Berlaku untuk perangkat DAN datanya (image)', 'Menjaga keabsahan bukti di pengadilan'] },
  { type: 'fill', q: 'Daubert test (Daubert v. Merrell Dow, 1993) punya empat panduan penerimaan bukti ilmiah. Sebutkan.',
    fields: [{ label: '1', a: ['testing', 'pengujian', 'tested'] }, { label: '2', a: ['publication', 'publikasi', 'peer review'] }, { label: '3', a: ['error rate', 'tingkat error'] }, { label: '4', a: ['acceptance', 'general acceptance', 'penerimaan'] }],
    ex: 'Sebelumnya Frye v. U.S. (1923) hanya memakai kriteria "general acceptance" di komunitas ilmiah.' },
  { type: 'fill', q: 'Rules of evidence pada tahap analisis: bukti harus memenuhi lima syarat.',
    fields: [{ label: '1', a: ['admissible'] }, { label: '2', a: ['authentic', 'autentik'] }, { label: '3', a: ['complete', 'lengkap'] }, { label: '4', a: ['reliable', 'andal'] }, { label: '5', a: ['believable', 'dapat dipercaya'] }] },
  { type: 'essay', q: 'Jelaskan definisi digital evidence menurut Casey (2000), SWGDE, dan Carrier (2006).',
    points: ['Casey: data yang dapat membuktikan kejahatan terjadi atau menghubungkan kejahatan dengan korban/pelaku', 'SWGDE: informasi bernilai pembuktian (probative value) yang disimpan atau dikirim dalam bentuk digital', 'ACPO: informasi dan data bernilai investigasi yang disimpan/dikirim komputer', 'Carrier: data digital yang mendukung atau membantah hipotesis tentang kejadian digital'] },
  { type: 'essay', q: 'Panduan akuisisi: perangkat asli, primary copy, dan secondary copy dipakai untuk apa?',
    points: ['Perangkat asli disimpan dan tidak dipakai analisis', 'Primary copy (hasil akuisisi 1) disimpan sebagai master', 'Secondary copy (hasil akuisisi 2) dipakai untuk analisis', 'Verifikasi integritas dengan hash dan membandingkan hasil antar tool'] }
]);

BANK.isian('fd', 'konsep', 'Hash, Timestamp & Metadata', [
  { type: 'fill', q: 'Unix time.',
    fields: [{ label: 'Epoch (tanggal mulai, format 1 januari yyyy)', a: ['1 januari 1970', '1 january 1970', '01 01 1970', '1970 01 01', '1 1 1970'] }, { label: 'Unix time tengah malam 1 Januari 2010', a: 1262304000, tol: 0 }, { label: 'Tahun overflow Unix time 32-bit', a: 2038, tol: 0 }],
    ex: 'Unix time = jumlah detik non-leap sejak 00:00:00 UTC 1 Januari 1970, disimpan sebagai signed integer.' },
  { type: 'fill', q: 'NTFS timestamp disebut MACE/MACB. Kepanjangan tiap huruf?',
    fields: [{ label: 'M', a: ['modified', 'last modified'] }, { label: 'A', a: ['accessed', 'last accessed'] }, { label: 'C', a: ['created', 'creation', 'file creation'] }, { label: 'E', a: ['entry modified', 'mft entry changed', 'mft entry modified', 'entry changed'] }],
    ex: 'E = MFT entry changed: saat record $MFT file diperbarui.' },
  { type: 'fill', q: 'Fungsi hash memetakan pesan sepanjang apa pun ke digest dengan panjang tertentu. Berapa panjang digest?',
    fields: [{ label: 'MD5 (bit)', a: 128, tol: 0 }, { label: 'SHA-1 (bit)', a: 160, tol: 0 }, { label: 'SHA-256 (bit)', a: 256, tol: 0 }],
    ex: 'Dalam forensik, hash membuktikan image identik dengan media asli.' },
  { type: 'fill', q: 'Jenis metadata.',
    fields: [
      { label: 'Judul, abstrak, penulis, kata kunci (penemuan)', a: ['descriptive', 'deskriptif'] },
      { label: 'Cara objek majemuk disusun (urutan halaman ke bab)', a: ['structural', 'struktural'] },
      { label: 'Tipe resource, izin, kapan dan bagaimana dibuat', a: ['administrative', 'administratif'] },
      { label: 'Pembuat, pemegang hak cipta, lisensi', a: ['legal'] }] },
  { type: 'essay', q: 'Apa fungsi hex editor dalam forensik digital? Sebutkan contohnya.',
    points: ['Melihat dan mengedit isi file dalam bentuk byte (hexadecimal)', 'Analisis struktur file dan signature/header', 'Diffing: membandingkan file asli dengan file setelah berubah', 'Contoh: HxD, ImHex, hexed.it'] }
]);

BANK.isian('fd', 'akuis', 'Akuisisi & Computer Forensics', [
  { type: 'fill', q: 'Dua jenis data dalam penyidikan.',
    fields: [{ label: 'Hilang saat listrik terputus', a: ['volatile', 'volatile data'] }, { label: 'Tetap ada setelah mati', a: ['persistent', 'non volatile', 'persistent data'] }] },
  { type: 'essay', q: 'Kapan live imaging diperlukan? Sebutkan situasinya.',
    points: ['Mengambil RAM agar data volatile tidak hilang', 'Disk terenkripsi dan kunci dekripsi tidak dimiliki', 'Perangkat tidak boleh dimatikan karena alasan bisnis', 'Data berada di lokasi jauh dengan akses fisik terbatas', 'Mematikan sistem bisa membuat pelaku sadar sedang diselidiki'] },
  { type: 'essay', q: 'Jelaskan dead imaging dan langkah akuisisinya dengan write blocker.',
    points: ['Dead imaging: perangkat dimatikan, media penyimpanan dilepas dari komputer, lalu di-image', 'Tidak ada perubahan data pada media; disarankan jika ada risiko time bomb penghapus data', 'Langkah: lepas hard drive, sambungkan ke port read-only write blocker', 'Media target di port read-write, write blocker ke komputer analisis', 'Buat image, dokumentasikan original di formulir chain of custody', 'Analisis dilakukan pada image, bukan pada original', 'Catatan: SSD punya isu integritas data (TRIM/garbage collection)'] },
  { type: 'fill', q: 'Copy, cloning, atau imaging?',
    fields: [
      { label: 'Hanya file aktif, tanpa MBR/FAT dan unallocated space', a: ['copy', 'copying', 'copy paste'] },
      { label: 'Salinan bit-by-bit disk ke disk lain, bisa jadi pengganti', a: ['cloning', 'clone'] },
      { label: 'Salinan bit-by-bit disk ke dalam FILE (snapshot tetap)', a: ['imaging', 'image'] }],
    ex: 'Imaging adalah standar forensik: bit-wise 1:1 copy termasuk active data, slack, unallocated space, lalu diverifikasi dengan hash.' },
  { type: 'essay', q: 'Sebutkan best practice akuisisi data forensik.',
    points: ['Gunakan write blocker', 'Gunakan tools dan teknik yang teruji dan diterima komunitas forensik', 'Cek apakah enkripsi aktif sebelum mematikan daya', 'Lakukan live imaging bila perlu sebelum dead imaging', 'Pertimbangkan akuisisi logical volume atau physical drive', 'Enkripsi file image jika perlu', 'Selalu perbarui chain of custody'] },
  { type: 'fill', q: 'Sector dan cluster. Sector 512 byte, satu cluster = 4 sector.',
    fields: [{ label: 'Ukuran cluster (byte)', a: 2048, tol: 0 }, { label: 'Unit terkecil yang bisa dialamati di volume', a: ['cluster'] }, { label: 'Unit terkecil yang bisa ditulis', a: ['sector', 'sektor'] }, { label: 'Sisa cluster yang berisi data file lama', a: ['slack', 'file slack', 'slack space'] }],
    ex: 'File 600 byte tetap memakai satu cluster 2048 byte. Sector yang tidak ditimpa bisa berisi sisa data file sebelumnya (file slack).' },
  { type: 'fill', q: 'Tools forensik.',
    fields: [
      { label: 'Utility Unix/Linux untuk imaging', a: ['dd'] },
      { label: 'Tool GUI Windows untuk imaging disk dan RAM (AccessData)', a: ['ftk imager', 'ftkimager'] },
      { label: 'Suite analisis open source berbasis Sleuth Kit', a: ['autopsy'] },
      { label: 'Tool link analysis / OSINT berbentuk graf', a: ['maltego'] }] },
  { type: 'essay', q: 'Sebutkan teknik analisis dalam computer forensics.',
    points: ['Preliminary examination', 'Filtering', 'Automated analysis', 'Timeline analysis', 'Relational/link analysis', 'Graph and visual representation', 'Metadata analysis'] }
]);

BANK.isian('fd', 'dead', 'Dead Forensics & Sanitasi', [
  { type: 'fill', q: 'Disk sanitation: delete, format, atau wipe?',
    fields: [
      { label: 'Record MFT ditandai terhapus, data masih ada sampai ditimpa', a: ['delete', 'hapus'] },
      { label: 'Indeks lokasi file dihancurkan, data masih di disk (quick)', a: ['quick format', 'format'] },
      { label: 'Menimpa data di seluruh partisi', a: ['wipe'] },
      { label: 'Full format Windows Vista ke atas menambahkan langkah', a: ['overwrite', 'overwriting', 'penimpaan'] }],
    ex: 'Sanitasi mencegah kebocoran privasi dan kontaminasi data pada media target forensik. Hanya wipe yang membuat data tidak bisa dipulihkan.' },
  { type: 'essay', q: 'Mengapa media penyimpanan target harus disanitasi (forensically wiped) sebelum dipakai menyimpan image atau dump memori?',
    points: ['Mencegah kontaminasi: sisa data lama bisa tercampur dengan bukti', 'Bukti harus bisa dibuktikan berasal dari sumber, bukan dari media target', 'Delete dan quick format tidak menghapus data', 'Wipe menimpa seluruh partisi sehingga media bersih'] }
]);

BANK.isian('fd', 'mem', 'Memory Forensics', [
  { type: 'fill', q: 'Konsep memori.',
    fields: [
      { label: 'Menyalin isi memori volatile ke penyimpanan non-volatile', a: ['memory acquisition', 'akuisisi memori'] },
      { label: 'Address space default tiap proses di x86 (GB)', a: 4, tol: 0 },
      { label: 'Bagian user space di x86 (GB)', a: 2, tol: 0 },
      { label: 'Blok berukuran tetap yang dipetakan ke memori fisik', a: ['page', 'pages', 'halaman', 'paging'] }],
    ex: 'Proses tidak mengakses memori fisik langsung, melainkan virtual address space. Shared memory = area yang dipakai beberapa proses sekaligus.' },
  { type: 'fill', q: 'Tool akuisisi dan analisis memori.',
    fields: [
      { label: 'Contoh tool akuisisi RAM (sebut satu)', a: ['ftk imager', 'winpmem', 'belkasoft live ram capturer', 'magnet ram capture', 'dumpit'] },
      { label: 'Framework analisis dump memori', a: ['volatility', 'volatility framework'] },
      { label: 'Plugin Volatility untuk identifikasi profile', a: ['imageinfo'] },
      { label: 'Tool Sysinternals untuk partial acquisition proses', a: ['procdump'] }] },
  { type: 'fill', q: 'Plugin Volatility untuk tiap tujuan.',
    fields: [
      { label: 'Hash password akun lokal (SAM)', a: ['hashdump'] },
      { label: 'Secret LSA (password auto-login, kunci RDP, DPAPI)', a: ['lsadump'] },
      { label: 'Hash kredensial domain yang di-cache', a: ['cachedump'] },
      { label: 'Argumen command line proses', a: ['cmdline'] },
      { label: 'Daftar registry hive di memori', a: ['hivelist'] },
      { label: 'Mengambil file dari memori dengan offset fisik (-Q)', a: ['dumpfiles'] }] },
  { type: 'fill', q: 'Tool investigasi string pada dump memori.',
    fields: [
      { label: 'Memindai image tanpa parsing file system (C++)', a: ['bulk extractor', 'bulk_extractor'] },
      { label: 'Pencocokan pola/rule untuk malware', a: ['yara'] },
      { label: 'Perintah Sysinternals ekstrak teks', a: ['strings', 'string64', 'strings64', 'string64 exe'] }],
    ex: 'Contoh: bulk_extractor -o bulk_output dump.mem. Hash dari hashdump bisa di-crack dengan John the Ripper.' },
  { type: 'fill', q: 'Registry hive Windows.',
    fields: [
      { label: 'Info grup dan user, password, login terakhir', a: ['sam'] },
      { label: 'Nama komputer, service, USB terpasang, time zone', a: ['system'] },
      { label: 'Software terpasang, scheduled task, autorun', a: ['software'] },
      { label: 'Dokumen terakhir, program sering dijalankan milik user', a: ['ntuser dat', 'ntuser'] }],
    ex: 'HKLM = registry sistem, HKCU = registry user. Persistence malware sering ada di ...\\CurrentVersion\\Run dan RunOnce.' },
  { type: 'essay', q: 'Informasi apa saja yang bisa diperoleh dari registry dalam investigasi?',
    points: ['Program auto-start (persistence)', 'Perangkat eksternal/USB yang pernah terhubung', 'Akun user, MRU (most recently used), preferensi', 'Program yang baru dijalankan (UserAssist, Shimcache, MUICache)', 'Info sistem: setting, software terpasang, patch keamanan'] }
]);
