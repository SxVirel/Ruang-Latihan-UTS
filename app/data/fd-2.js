// Forensik Digital — bank soal kisi-kisi UTS (PG + isian singkat).
// Sumber: kisi-kisi UTS (4 kelompok materi, bobot 28/12/40/20) dan tujuh slide:
// Prinsip-prinsip forensik digital, Forensik digital1, Konsep dan Tool Dasar,
// Computer forensics-EMJ, Dead forensics-EMJ, Memory forensics-EMJ, Memory forensics II.
// Kisi-kisi tidak memuat kunci jawaban. Setiap kunci di sini diambil dari slide, atau
// disusun sendiri dan ditandai pada bagian ex. Soal PG dan isian dibuat terpisah
// (topicId beda) supaya id tidak bertabrakan; sesi 20 PG + 5 isian diambil dari sini.
// Soal lama (isian & esai) tetap di app/data/fd.js sebagai tab Uraian & Isian.

// ------------------------------------------------ 01 Konsep & Proses (±28%)
BANK.mcq('fd', 'proses', 'Prinsip & Proses Forensik (PG)', [
  {
    q: 'Seorang analis bersaksi bahwa pelaku yang menyentuh keyboard meninggalkan jejak di sistem dan membawa data korban saat pergi. Prinsip forensik yang dipakai analis itu dikemukakan oleh ...',
    a: 'Edmond Locard', w: ['Alphonse Bertillon', 'Hans Gross', 'Edwin Sutherland'],
    ex: 'Locard Exchange Principle (1910): setiap kontak meninggalkan jejak, termasuk pada intrusi komputer.'
  },
  {
    q: 'Kasus: penyerang masuk lewat VPN lalu menyalin basis data pelanggan. Jejak yang paling sesuai dengan penerapan prinsip Locard pada slide adalah ...',
    a: 'Log sistem, log jaringan, entri registry, dan sisa file di file system',
    w: ['Sidik jari di casing server, rekaman CCTV ruang server, dan buku tamu gedung', 'Hanya rekaman CCTV ruang server', 'Hanya catatan wawancara administrator'],
    ex: 'Pada intrusi komputer penyerang meninggalkan banyak jejak di file system, registry, system log, dan network-level log.'
  },
  {
    q: 'Tim forensik menyusun rencana kerja, melengkapi surat izin, dan menyiapkan toolkit serta media penyimpanan bersih sebelum berangkat ke lokasi. Tahap proses forensik yang sedang berjalan adalah ...',
    a: 'Preparation', w: ['Identification', 'Preservation', 'Presentation'],
    ex: 'Preparation: menyusun rencana aksi investigasi dan memperoleh sumber daya serta material pendukung.'
  },
  {
    q: 'Di TKP, tim memutus koneksi jaringan, menyalin isi RAM, dan mengamankan file log sebelum perangkat dimatikan. Dalam lima tahap proses forensik, kegiatan ini termasuk ...',
    a: 'Preservation', w: ['Preparation', 'Analysis', 'Presentation'],
    ex: 'Preservation: mencegah perubahan bukti, termasuk isolasi dari jaringan, mengamankan log, dan mengumpulkan data volatile.'
  },
  {
    q: 'Tim mendata jenis kasus, jenis dan model perangkat, media penyimpanan, pemilik, serta data yang dicari, lalu menyusun prioritas. Tahap ini disebut ...',
    a: 'Identification', w: ['Preparation', 'Preservation', 'Reporting'],
    ex: 'Identification: menemukan sumber bukti potensial, termasuk jenis perangkat, media, pemilik, dan prioritas data.'
  },
  {
    q: 'Setelah analisis selesai, tim menyusun laporan yang memuat bukti yang memberatkan dan yang meringankan. Tahap terakhir proses forensik digital adalah ...',
    a: 'Presentation', w: ['Examination', 'Acquisition', 'Collection'],
    ex: 'Presentation: pelaporan temuan agar sesuai konteks investigasi, lengkap dengan bukti memberatkan dan meringankan.'
  },
  {
    q: 'Urutan lima tahap proses forensik digital menurut slide adalah ...',
    a: 'Preparation, Identification, Preservation, Analysis, Presentation',
    w: ['Preparation, Collection, Imaging, Hashing, Reporting', 'Identification, Preparation, Analysis, Preservation, Presentation', 'Preparation, Identification, Analysis, Preservation, Presentation'],
    ex: 'Lima tahap: Preparation, Identification, Preservation, Analysis (examination and analysis), Presentation.'
  },
  {
    q: 'Diagram proses forensik NIST menunjukkan alur bukti dari media sampai menjadi evidence. Urutan yang benar adalah ...',
    a: 'Collection, Examination, Analysis, Reporting dengan alur Media, Data, Information, Evidence',
    w: ['Collection, Analysis, Examination, Reporting dengan alur Media, Information, Data, Evidence', 'Preparation, Collection, Analysis, Presentation dengan alur Media, Evidence, Data, Information', 'Identification, Preservation, Acquisition, Reporting dengan alur Evidence, Information, Data, Media'],
    ex: 'Slide Proses Forensik NIST: Collection - Examination - Analysis - Reporting; Media - Data - Information - Evidence. Kunci disusun sendiri dari diagram.'
  },
  {
    q: 'Di lokasi ditemukan laptop menyala dengan sesi RDP aktif dan hard disk 1 TB. Sesuai faktor prioritas NIST, data yang diambil lebih dulu adalah ...',
    a: 'Isi RAM dan daftar koneksi jaringan, karena akan hilang jika daya dilepas',
    w: ['Seluruh isi hard disk 1 TB, karena kapasitasnya paling besar', 'Dokumen di folder Documents lebih dulu, karena paling relevan dengan dugaan kasus', 'Log aplikasi di partisi lain, karena ukurannya kecil'],
    ex: 'Prioritas NIST: likely value, volatility, amount of effort required. Data yang hilang saat daya dicabut didahulukan. Kunci disusun sendiri.'
  },
  {
    q: 'Formulir chain of custody memuat tanggal pemindahan, pihak yang menyerahkan dan menerima, lokasi, serta tindakan yang dilakukan. Tujuan pencatatan itu adalah ...',
    a: 'Menunjukkan bahwa bukti tidak berubah sejak dikumpulkan sampai dianalisis',
    w: ['Membuktikan bahwa analis yang memeriksa bukti sudah lulus sertifikasi forensik', 'Menghitung biaya operasional penyidikan', 'Menentukan besar hukuman bagi pelaku'],
    ex: 'Chain of custody melacak perpindahan bukti sepanjang siklus koleksi, pengamanan, dan analisis (NIST).'
  },
  {
    q: 'Tim membuat image disk lalu mengirimkannya ke laboratorium. Menurut slide, chain of custody harus mencakup ...',
    a: 'Perangkat asli dan data atau image yang dihasilkan',
    w: ['Hanya perangkat asli, karena image cukup diverifikasi dengan nilai hash', 'Hanya laporan akhir pemeriksaan', 'Hanya berkas yang sudah dicetak'],
    ex: 'Pemeliharaan chain of custody bukan hanya untuk perangkat, tetapi juga untuk datanya.'
  },
  {
    q: 'Penyidik menyusun dugaan bahwa data tertentu mendukung hipotesis eksfiltrasi. Definisi bukti digital yang paling sesuai dengan cara berpikir ini adalah ...',
    a: 'Data digital yang mendukung atau membantah hipotesis tentang kejadian digital (Carrier, 2006)',
    w: ['Data yang dapat membuktikan kejahatan dan menghubungkannya dengan korban (Casey, 2000)', 'Informasi bernilai pembuktian yang disimpan atau dikirim dalam bentuk digital (SWGDE)', 'Informasi dan data bernilai investigasi yang disimpan atau dikirim komputer (ACPO)'],
    ex: 'Carrier (2006): data digital yang mendukung atau membantah hipotesis tentang kejadian digital atau keadaan data. Kunci disusun sendiri.'
  },
  {
    q: 'Seorang anggota tim yang belum pernah menangani perangkat mobile diminta mengekstrak data. Tindakan yang sesuai prinsip proses forensik adalah ...',
    a: 'Menyerahkan pekerjaan kepada anggota yang kompeten dan mendokumentasikan keputusan itu',
    w: ['Mencoba mengekstrak sendiri dengan panduan dari internet, lalu mencatat hasilnya sebagai temuan resmi', 'Mematikan perangkat agar data di dalamnya aman', 'Menghapus aplikasi mencurigakan sebelum ekstraksi'],
    ex: 'Kegiatan forensik digital hanya dilakukan tim yang kompeten; perubahan yang tak terhindarkan harus minimal dan bisa dijelaskan.'
  },
  {
    q: 'Model McKemmish (1999) membagi forensic computing menjadi empat elemen kunci, yaitu ...',
    a: 'Identification, Preservation, Analysis, Presentation',
    w: ['Preparation, Collection, Examination, Reporting', 'Readiness, Deployment, Investigation, Review', 'Acquisition, Extraction, Interpretation, Attribution'],
    ex: 'Tabel framework pada slide: McKemmish (1999) - four key elements of forensic computing.'
  },
  {
    q: 'Model yang menambahkan tahap Recognition and Identification, Documentation, serta Packaging and Transportation untuk first responder adalah ...',
    a: 'National Institute of Justice (2001)', w: ['Pollitt (1995)', 'McKemmish (1999)', 'Ciardhuain (2004)'],
    ex: 'Tabel framework no. 3: NIJ (2001), electronic crime scene investigation untuk first responder.'
  },
  {
    q: 'Standar yang memuat harmonized digital investigation process dengan tahap Readiness, Initialization, Acquisition, dan Investigative adalah ...',
    a: 'ISO/IEC 27043 (2015)', w: ['ISO/IEC 17025', 'NIST SP 800-86', 'ACPO Good Practice Guide'],
    ex: 'Tabel framework no. 45: harmonized digital investigation process, ISO/IEC (2015).'
  },
  {
    q: 'Di TKP, seorang petugas menyalakan ulang laptop yang sedang tidur agar lebih mudah diperiksa. Prinsip proses forensik yang dilanggar adalah ...',
    a: 'Tidak boleh ada tindakan yang berpotensi mengubah data atau menghilangkan bukti volatile',
    w: ['Chain of custody harus diisi lebih dulu sebelum petugas menyalakan perangkat apa pun di TKP', 'Write blocker tidak dipakai', 'Laporan akhir belum dibuat'],
    ex: 'Restart menghapus isi RAM dan mengubah timestamp sistem, sehingga bukti volatile hilang. Kunci disusun sendiri.'
  },
  {
    q: 'Menurut penerapan prinsip Locard pada intrusi komputer, sesuatu yang ikut terbawa pelaku dari TKP digital dapat berupa ...',
    a: 'Password pengguna atau PII yang dicuri', w: ['Sidik jari pelaku yang tertinggal pada prosesor server', 'Serat kain pada keyboard', 'Bekas sidik kaki di lantai'],
    ex: 'Slide Locard: penyerang dapat membawa elemen TKP, misalnya password pengguna atau PII dari file atau basis data.'
  }
]);

// ------------------------------------------------ 02 Aspek Hukum & Standar (±12%)
BANK.mcq('fd', 'hukum', 'Hukum & Standar Bukti (PG)', [
  {
    q: 'Pengacara bertanya: berapa persentase kesalahan alat ini pada uji validasi. Dalam Daubert test, pertanyaan itu menguji faktor ...',
    a: 'Error rate', w: ['Testing', 'Publication', 'Acceptance'],
    ex: 'Empat panduan Daubert: testing, publication atau peer review, error rate, dan general acceptance.'
  },
  {
    q: 'Sebelum Daubert (1993), acuan penerimaan bukti ilmiah di pengadilan Amerika hanya menuntut metode telah generally accepted di bidangnya. Acuan itu berasal dari ...',
    a: 'Frye v. U.S. (1923)', w: ['Daubert v. Merrell Dow (1993)', 'ISO/IEC 27037 (2012)', 'ACPO Good Practice Guide (2012)'],
    ex: 'Frye (1923) memakai kriteria general acceptance; Daubert menambahkan tuntutan evidentiary reliability.'
  },
  {
    q: 'Seorang pemeriksa harus bisa menjelaskan asal-usul barang bukti yang ia periksa. Syarat rules of evidence yang dimaksud adalah ...',
    a: 'Authentic', w: ['Admissible', 'Complete', 'Believable'],
    ex: 'Authentic: bukti terikat pada insiden secara relevan dan pemeriksa bertanggung jawab atas asal bukti.'
  },
  {
    q: 'Dalam laporan, pemeriksa hanya menampilkan potongan log yang memberatkan dan menyembunyikan sisanya. Syarat rules of evidence yang dilanggar adalah ...',
    a: 'Complete', w: ['Reliable', 'Admissible', 'Authentic'],
    ex: 'Complete: bukti harus jelas dan lengkap serta mencerminkan cerita utuh.'
  },
  {
    q: 'Pihak ketiga independen diminta mengulang proses pemeriksaan dan memperoleh hasil yang sama. Prinsip ACPO yang mendukung permintaan itu adalah ...',
    a: 'Prinsip 3: audit trail semua proses dibuat dan disimpan sehingga pihak ketiga dapat memeriksanya',
    w: ['Prinsip 1: tindakan tidak boleh mengubah data yang akan dipakai di pengadilan', 'Prinsip 2: orang yang mengakses data asli harus kompeten dan mampu menjelaskan relevansi serta implikasi tindakannya', 'Prinsip 4: penanggung jawab investigasi memastikan hukum dan prinsip dipatuhi'],
    ex: 'ACPO Principle 3: audit trail atau rekaman semua proses dibuat dan dipelihara untuk pemeriksaan pihak ketiga.'
  },
  {
    q: 'Auditor meminta bukti bahwa material yang diambil memang berkaitan dengan insiden dan jumlahnya cukup untuk investigasi. Prinsip ISO/IEC 27037 yang diuji adalah ...',
    a: 'Relevance dan sufficiency', w: ['Repeatability dan reproducibility', 'Auditability dan justifiability', 'Reliability dan repeatability'],
    ex: 'Tiga prinsip fundamental: relevance, reliability, sufficiency. Relevance = relevan dengan investigasi; sufficiency = cukup untuk investigasi.'
  },
  {
    q: 'Laboratorium mengulang uji memakai prosedur dan alat yang sama pada kondisi yang sama, lalu memperoleh hasil identik. Sifat ini disebut ...',
    a: 'Repeatability', w: ['Reproducibility', 'Auditability', 'Justifiability'],
    ex: 'Repeatability: prosedur, alat, dan kondisi sama. Reproducibility: metode sama, tetapi alat dan kondisi berbeda.'
  },
  {
    q: 'Menurut SWGDE (2013), jenis kesalahan dalam implementasi tool forensik digital adalah ...',
    a: 'Incompleteness, inaccuracy, dan misinterpretation', w: ['Latency, jitter, dan packet loss', 'False positive, false negative, dan drift pada hasil hashing', 'Overwrite, corruption, dan truncation'],
    ex: 'Slide Guidelines: SWGDE (2013) menyebut incompleteness, inaccuracy, dan misinterpretation.'
  }
]);

// ------------------------------------------------ 03 Akuisisi & Penanganan Bukti (±40%)
BANK.mcq('fd', 'akuisisi', 'Akuisisi & Penanganan Bukti (PG)', [
  {
    q: 'Laptop tersangka menyala dengan BitLocker aktif dan kunci dekripsi belum diketahui. Tindakan yang tepat adalah ...',
    a: 'Melakukan live imaging lebih dulu sebelum daya dilepas',
    w: ['Mematikan laptop lalu melepas disk untuk dead imaging', 'Menunggu laptop masuk mode sleep agar isi memori tersimpan aman ke disk', 'Memformat disk agar bersih sebelum di-image'],
    ex: 'Live imaging diperlukan bila disk terenkripsi dan kunci tidak dimiliki, agar data masih bisa diakses.'
  },
  {
    q: 'Tim tiba di lokasi dan mendapati komputer menyala dengan program penghapus berjalan. Panduan first responder menyarankan ...',
    a: 'Jangan matikan perangkat, hentikan proses anti-forensik bila perlu dengan mencabut daya, lalu isolasi dari jaringan',
    w: ['Matikan komputer dengan shutdown normal agar semua data di memori tersimpan rapi ke disk sebelum disita dan dibawa ke laboratorium', 'Restart komputer agar proses mencurigakan berhenti sendiri', 'Hubungkan ke jaringan kantor untuk memantau aktivitasnya'],
    ex: 'Interpol Guidelines 2021: jika peralatan menyala, jangan dimatikan; hentikan program penghapus; isolasi dari jaringan.'
  },
  {
    q: 'Petugas menonaktifkan screensaver dan screen lock pada komputer yang menyala. Alasannya adalah ...',
    a: 'Agar perangkat tidak hibernasi atau terkunci sehingga data volatile tetap dapat diakses',
    w: ['Agar baterai lebih hemat selama pemeriksaan', 'Agar pengguna lain tidak bisa login ke sistem dan mengubah konfigurasi selama pemeriksaan', 'Agar proses imaging berjalan lebih cepat'],
    ex: 'Interpol: disable screensavers dan screen locking untuk mencegah perangkat hibernasi atau suspend.'
  },
  {
    q: 'Komputer dalam keadaan mati saat tim tiba. Menurut panduan first responder, tindakan yang benar adalah ...',
    a: 'Jangan menyalakannya sampai diproses dengan jaminan prosedur',
    w: ['Nyalakan untuk melihat siapa yang sedang login', 'Nyalakan lalu langsung lakukan imaging', 'Nyalakan dalam safe mode untuk memeriksa program startup tanpa ikut memuat malware'],
    ex: 'Interpol: jika peralatan mati, jangan dinyalakan sampai diproses dengan jaminan.'
  },
  {
    q: 'Analis melepas hard disk bukti, menyambungkannya ke port read-only sebuah write blocker, lalu menghubungkan media target ke port read-write. Tujuan pemasangan itu adalah ...',
    a: 'Agar pembacaan media bukti tidak mengubah isinya, sementara image ditulis ke media target',
    w: ['Agar proses imaging berjalan dua kali lebih cepat', 'Agar nilai hash media bukti ikut diperbarui mengikuti isi image yang ditulis ke media target', 'Agar media bukti bisa diformat setelah di-image'],
    ex: 'Langkah dead imaging: hard disk ke port read-only write blocker, media target ke port read-write.'
  },
  {
    q: 'Manajer bertanya apa bedanya image dengan copy-paste folder. Jawaban yang tepat adalah ...',
    a: 'Image adalah salinan bit-wise 1:1 termasuk slack dan unallocated space, sedangkan copy-paste hanya menyalin file aktif',
    w: ['Image hanya menyalin file aktif, sedangkan copy-paste menyalin seluruh disk', 'Keduanya sama dan hanya berbeda nama tool', 'Image menyalin file aktif dan file terhapus saja, sedangkan copy-paste menyalin seluruh disk beserta slack space-nya'],
    ex: 'Imaging: bit-wise 1:1 copy pada active data, unused space, slack, dan unallocated space. Copy-paste hanya file aktif.'
  },
  {
    q: 'Tim menghasilkan salinan persis ke satu file yang bersifat snapshot tetap untuk dianalisis. Teknik yang dipakai adalah ...',
    a: 'Imaging', w: ['Cloning', 'Copy-paste', 'Wiping'],
    ex: 'Imaging: output berupa file dan bersifat fixed snapshot. Cloning: output ke disk lain dan bisa dipakai sebagai pengganti.'
  },
  {
    q: 'Setelah penggandaan, analis membandingkan nilai hash media asli dengan hasil salinan. Hasil yang menunjukkan salinan sah secara forensik adalah ...',
    a: 'Nilai hash salinan sama dengan nilai hash media asli',
    w: ['Nilai hash salinan berbeda karena file yang tersalin lebih banyak', 'Nilai hash salinan sama dengan nilai hash folder tujuan', 'Nilai hash tidak perlu dibandingkan selama file dapat dibuka'],
    ex: 'Slide contoh kasus: original, cloning, dan imaging memiliki hash sama; hasil copy-paste berbeda.'
  },
  {
    q: 'Tersangka menyalin data ke USB lalu melakukan quick format. Kemungkinan data lama pada USB itu adalah ...',
    a: 'Masih ada di disk karena quick format hanya menandai partisi terformat dan menghancurkan indeks lokasi file',
    w: ['Hilang total karena seluruh sektor ditimpa', 'Hilang total karena quick format menghapus MFT lalu menimpa seluruh sektor dengan angka nol secara otomatis', 'Tetap ada tetapi otomatis terenkripsi'],
    ex: 'Quick format: MFT dihapus dan indeks lokasi file dihancurkan, tetapi data masih berada di hard disk.'
  },
  {
    q: 'Agar media target tidak terkontaminasi, teknisi menimpa data pada seluruh partisi. Teknik sanitasi ini adalah ...',
    a: 'Wipe', w: ['Delete', 'Quick format', 'Full format pada Windows XP'],
    ex: 'Wipe menimpa data pada seluruh partisi. Hanya wipe yang membuat data tidak dapat dipulihkan.'
  },
  {
    q: 'Full format pada Windows Vista dan versi sesudahnya berbeda dari versi sebelumnya karena ...',
    a: 'Menambahkan langkah penimpaan data', w: ['Menghapus seluruh partisi', 'Mengenkripsi seluruh volume', 'Membuat salinan bayangan sebelum format'],
    ex: 'Slide sanitasi: full format Vista ke atas menambahkan langkah overwriting.'
  },
  {
    q: 'Analis menduga ada time bomb yang akan menghapus data pada jam tertentu. Rekomendasi tindakannya adalah ...',
    a: 'Matikan komputer lalu lakukan dead imaging',
    w: ['Biarkan menyala sampai time bomb aktif agar polanya terlihat', 'Lakukan live imaging sambil menunggu waktu aktif', 'Hapus lebih dulu file pemicu time bomb'],
    ex: 'Bila ada kemungkinan aktivasi time bomb untuk menghapus data, disarankan mematikan komputer dan melakukan dead imaging.'
  },
  {
    q: 'Mengapa dead imaging pada media SSD perlu catatan khusus?',
    a: 'Ada isu integritas data pada media SSD yang dapat mengubah isi setelah di-image',
    w: ['SSD tidak dapat di-image memakai write blocker karena antarmukanya tidak didukung', 'SSD selalu terenkripsi secara bawaan', 'SSD tidak memiliki file slack'],
    ex: 'Slide dead imaging mencantumkan note issue data integrity pada media SSD.'
  },
  {
    q: 'Data berikut yang termasuk data volatile adalah ...',
    a: 'Isi RAM dan tabel routing', w: ['File dokumen pada partisi data', 'File terhapus di unallocated space', 'Log yang sudah disalin ke hard disk'],
    ex: 'Volatile data hilang saat media terputus dari listrik, misalnya RAM, routing table, ARP cache, dan koneksi jaringan.'
  },
  {
    q: 'Tantangan utama saat mengakuisisi data persisten menurut slide adalah ...',
    a: 'Data persisten berada pada disk terenkripsi yang kuncinya tidak dimiliki',
    w: ['Data persisten selalu berubah setiap kali dibaca sehingga nilai hash tidak pernah sama', 'Data persisten hilang saat daya listrik dilepas', 'Data persisten tidak dapat di-hash'],
    ex: 'Tantangannya ketika data persisten disimpan pada disk terenkripsi dan kunci dekripsi tidak dimiliki.'
  },
  {
    q: 'Server produksi tidak boleh dimatikan karena transaksi sedang berjalan. Pilihan akuisisi yang tepat adalah ...',
    a: 'Live imaging dengan urutan pengumpulan yang memprioritaskan data volatile',
    w: ['Dead imaging dengan mematikan server pada malam hari saat transaksi sedang sepi', 'Menunggu jadwal maintenance berikutnya', 'Menyalin folder aplikasi dengan copy-paste'],
    ex: 'Salah satu situasi live imaging: perangkat tidak bisa atau tidak boleh dimatikan karena alasan bisnis.'
  },
  {
    q: 'Data bukti berada di kantor cabang lain dan akses fisik sangat terbatas. Menurut slide, live imaging diperlukan karena ...',
    a: 'Data berada di lokasi jauh dengan akses fisik yang sulit',
    w: ['Data terlalu kecil untuk di-image', 'Data tidak memiliki nilai pembuktian', 'Data sudah tersalin di backup pusat sehingga perangkat aslinya tidak perlu diperiksa'],
    ex: 'Situasi live imaging: data berada di lokasi jauh dengan akses fisik terbatas atau sulit.'
  },
  {
    q: 'Menurut panduan Interpol, mencabut kabel daya atau melepas baterai dibenarkan dalam situasi ...',
    a: 'Ada program penghapus lokal atau jarak jauh yang berjalan dan tidak bisa dihentikan dengan cara lain',
    w: ['Petugas ingin mempercepat pekerjaan', 'Perangkat terlalu panas saat diperiksa dan dikhawatirkan merusak komponen penyimpanan di dalam casing', 'Pemilik meminta perangkat dimatikan'],
    ex: 'Interpol: hentikan proses tersebut bahkan dengan mencabut kabel daya atau melepas baterai bila perlu.'
  },
  {
    q: 'Laporan penggandaan data menurut panduan Interpol harus memuat ...',
    a: 'Prosedur yang dipakai, tool, lokasi tujuan, algoritma hash beserta nilainya, dan catatan kejadian selama proses',
    w: ['Nama korban, alamat, nomor telepon, dan pekerjaan', 'Harga perangkat, tanggal pembelian, masa garansi, serta nama toko dan nomor faktur pembelian perangkat tersebut', 'Daftar aplikasi terpasang beserta versinya'],
    ex: 'Interpol: procedure used, tool, destination location, HASH (algoritma dan signature), observations.'
  },
  {
    q: 'Sebelum mematikan daya listrik perangkat, best practice yang harus dilakukan adalah ...',
    a: 'Memeriksa apakah enkripsi aktif pada media penyimpanan',
    w: ['Memastikan baterai dalam keadaan penuh', 'Menghapus file sementara di folder temp agar image lebih kecil', 'Mencatat nomor seri monitor'],
    ex: 'Best practice akuisisi: cek lebih dulu apakah enkripsi aktif sebelum mematikan daya.'
  },
  {
    q: 'Mengapa analisis dilakukan pada hasil image, bukan pada perangkat asli?',
    a: 'Agar bukti asli tetap terlindungi dan tidak berubah',
    w: ['Agar nilai hash perangkat asli ikut berubah', 'Agar perangkat asli bisa segera dikembalikan ke tersangka', 'Agar kapasitas penyimpanan laboratorium lebih besar'],
    ex: 'Akuisisi bertujuan menghasilkan backup; bukti original harus terlindungi dan tidak berubah.'
  },
  {
    q: 'Volume memakai sektor 512 byte dan cluster berisi 4 sektor. File berukuran 1 byte menempati ruang fisik minimum sebesar ...',
    a: '2048 byte', w: ['512 byte', '1 byte', '1024 byte'],
    ex: 'Cluster = 4 x 512 = 2048 byte; ukuran fisik minimum sebuah file adalah satu cluster.'
  },
  {
    q: 'File 600 byte disimpan pada volume dengan cluster 2048 byte. Sisa 1448 byte pada cluster tersebut ...',
    a: 'Tidak ditimpa dan dapat berisi data file lama (file slack)',
    w: ['Otomatis dihapus oleh sistem file', 'Selalu diisi angka nol oleh sistem file agar tidak ada sisa data', 'Dipakai untuk menyimpan nama file'],
    ex: 'Sektor sisa dalam cluster tidak ditimpa dan dapat berisi data file sebelumnya, disebut slack.'
  },
  {
    q: 'Tim mengambil data dari server yang aksesnya mudah lebih dulu, lalu menunda perangkat yang butuh izin berlapis. Faktor prioritas NIST yang dipakai adalah ...',
    a: 'Amount of effort required', w: ['Volatility', 'Jumlah pengguna', 'Nilai hash'],
    ex: 'Tiga faktor prioritas NIST: likely value, volatility, dan amount of effort required.'
  },
  {
    q: 'Fungsi utama write blocker adalah ...',
    a: 'Mencegah operasi tulis ke media bukti sehingga isinya tidak berubah',
    w: ['Mempercepat transfer data dari media bukti ke media target saat imaging', 'Mengenkripsi image secara otomatis', 'Menghitung nilai hash media target'],
    ex: 'Best practice akuisisi: gunakan write blocker untuk mencegah perubahan data.'
  },
  {
    q: 'Setelah imaging, nilai hash image ternyata berbeda dari nilai hash media asli. Langkah yang benar adalah ...',
    a: 'Menyatakan salinan tidak sah, mencari penyebabnya, lalu mengulang akuisisi',
    w: ['Menganggap selisih hash wajar karena jumlah file pada image dan media asli berbeda', 'Tetap menganalisis image karena isinya terlihat sama', 'Mengubah nilai hash media asli agar sama'],
    ex: 'Verifikasi integritas memakai hash; image harus identik dengan media asli. Kunci disusun sendiri.'
  },
  {
    q: 'Tool bawaan Unix dan Linux yang paling sering disebut untuk imaging bit-by-bit adalah ...',
    a: 'dd', w: ['Autopsy', 'Volatility', 'RegRipper'],
    ex: 'Slide alat bantu imaging: dd, FTK Imager, SANS SIFT, EnCase Forensic Imager, Sleuth Kit, ProDiscover Basic.'
  }
]);

// ------------------------------------------------ 04 Analisis Artefak & Memori (±20%)
BANK.mcq('fd', 'artefak', 'Artefak & Memori (PG)', [
  {
    q: 'Penyidik ingin membuktikan bahwa sebuah USB pernah dicolok ke komputer. Registry hive yang diperiksa adalah ...',
    a: 'SYSTEM', w: ['SAM', 'SOFTWARE', 'NTUSER.DAT'],
    ex: 'SYSTEM memuat nama komputer, services, connected USB devices, time zone, dan konfigurasi network adapter.'
  },
  {
    q: 'Untuk melihat daftar akun, hak istimewa, hash password, dan tanggal login terakhir, hive yang dipakai adalah ...',
    a: 'SAM', w: ['SYSTEM', 'SOFTWARE', 'NTUSER.DAT'],
    ex: 'SAM memuat informasi grup dan pengguna, termasuk hak istimewa, password, dan tanggal login terakhir.'
  },
  {
    q: 'Investigasi mencari dokumen yang terakhir dibuka dan program yang sering dijalankan oleh satu pengguna. Hive yang tepat adalah ...',
    a: 'NTUSER.DAT', w: ['SAM', 'SYSTEM', 'SOFTWARE'],
    ex: 'NTUSER.DAT: dokumen terakhir dilihat, program sering dijalankan, riwayat explorer, dan koneksi RDP keluar.'
  },
  {
    q: 'Perbedaan HKLM dan HKCU adalah ...',
    a: 'HKLM menyimpan setelan sistem, HKCU menyimpan setelan khusus pengguna',
    w: ['HKLM khusus pengguna, HKCU khusus sistem', 'Keduanya identik dan dapat dipakai bergantian', 'HKLM hanya tersimpan di memori saat sistem berjalan, HKCU hanya tersimpan di disk'],
    ex: 'HKEY_LOCAL_MACHINE adalah registry sistem; HKEY_CURRENT_USER adalah registry pengguna.'
  },
  {
    q: 'Sebuah malware perlu dijalankan otomatis setiap pengguna login. Lokasi registry yang paling mungkin dipakai adalah ...',
    a: 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run',
    w: ['HKLM\\SYSTEM\\CurrentControlSet\\Control\\TimeZoneInformation', 'HKLM\\SAM\\SAM\\Domains\\Account', 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\UserAssist'],
    ex: 'Persistence: Run dan RunOnce pada HKLM maupun HKCU; TimeZoneInformation untuk zona waktu.'
  },
  {
    q: 'Sebuah file memiliki timestamp 1262304000. Waktu UTC-nya adalah ...',
    a: '1 Januari 2010 pukul 00.00.00', w: ['1 Januari 2000 pukul 00.00.00', '1 Januari 2020 pukul 00.00.00', '31 Desember 2010 pukul 12.00.00'],
    ex: 'Slide Unix time: pada tengah malam 1 Januari 2010, Unix time bernilai 1262304000.'
  },
  {
    q: 'Unix time disimpan sebagai signed integer 32-bit. Peristiwa yang diperingatkan pada slide adalah ...',
    a: 'Overflow pada 2038', w: ['Overflow pada 2100', 'Hilangnya zona waktu UTC', 'Berhentinya penambahan leap second'],
    ex: 'Slide animasi 32-bit Unix time overflow: akan terjadi pada 2038.'
  },
  {
    q: 'Volume memakai cluster yang berisi 8 sektor dan setiap sektor 512 byte. Satu cluster sama dengan ...',
    a: '4096 byte', w: ['512 byte', '1024 byte', '2048 byte'],
    ex: '8 x 512 = 4096 byte per cluster.'
  },
  {
    q: 'File 5000 byte disimpan pada volume dengan cluster 2048 byte. Berapa cluster yang terpakai dan berapa slack pada cluster terakhir?',
    a: '3 cluster dan 1144 byte slack', w: ['2 cluster dan 1144 byte slack', '3 cluster dan 2048 byte slack', '2 cluster dan 3096 byte slack'],
    ex: '5000 byte memerlukan 3 cluster (6144 byte); slack = 6144 - 5000 = 1144 byte.'
  },
  {
    q: 'Pada sistem x86, setiap proses dialokasikan 4 GB ruang alamat. Pembagiannya adalah ...',
    a: '2 GB user space dan 2 GB kernel space', w: ['3 GB user space dan 1 GB kernel space', '4 GB user space tanpa kernel space', '1 GB user space dan 3 GB kernel space'],
    ex: 'x86: 4 GB per proses, 2 GB bawah untuk user space dan 2 GB atas untuk kernel space.'
  },
  {
    q: 'Analis menerima file dump memori tanpa informasi sistem operasi. Plugin Volatility yang dipakai untuk memperkirakan profile adalah ...',
    a: 'imageinfo', w: ['hashdump', 'dumpfiles', 'userassist'],
    ex: 'imageinfo menentukan profile berdasarkan KDBG search, misalnya Win10x64_14393.'
  },
  {
    q: 'Analis menduga ada proses yang sudah dihentikan tetapi struktur sisa prosesnya masih ada di memori. Plugin yang dipakai adalah ...',
    a: 'psscan', w: ['pslist', 'cmdline', 'hivelist'],
    ex: 'pslist membaca daftar proses aktif; psscan memindai struktur proses di memori, termasuk yang tidak lagi aktif. Kunci disusun sendiri dari tangkapan layar pslist dan psscan.'
  },
  {
    q: 'Analis menemukan offset fisik sebuah file di memori dan ingin mengekstraknya. Perintah Volatility yang tepat adalah ...',
    a: 'dumpfiles -Q <offset> -D <folder tujuan>', w: ['dumpfiles -p <pid> -D <folder tujuan>', 'dumpregistry -Q <offset> -D <folder tujuan>', 'hivelist -Q <offset> -D <folder tujuan>'],
    ex: 'Slide memori: dumpfiles memakai -Q untuk offset fisik dan -D untuk folder penyimpanan hasil.'
  }
]);

// ------------------------------------------------ Isian singkat
BANK.isian('fd', 'isian-proses', 'Prinsip & Proses (isian)', [
  {
    type: 'fill',
    q: 'Tahap proses forensik digital yang berisi penyusunan rencana kerja dan penyiapan sumber daya disebut ...',
    fields: [{ label: 'Tahap', a: ['preparation', 'persiapan'] }],
    ex: 'Preparation adalah tahap pertama: rencana aksi investigasi dan sumber daya pendukungnya.'
  },
  {
    type: 'fill',
    q: 'Dalam lima tahap proses forensik, tahap yang berada tepat setelah Preservation dan sebelum Presentation adalah ...',
    fields: [{ label: 'Tahap', a: ['analysis', 'analisis', 'examination and analysis'] }],
    ex: 'Urutan: Preparation, Identification, Preservation, Analysis, Presentation.'
  },
  {
    type: 'fill',
    q: 'Tahap yang menghasilkan laporan berisi bukti yang memberatkan dan yang meringankan disebut ...',
    fields: [{ label: 'Tahap', a: ['presentation', 'presentasi', 'pelaporan', 'reporting'] }],
    ex: 'Presentation atau pelaporan adalah tahap terakhir proses forensik digital.'
  },
  {
    type: 'fill',
    q: 'Pada diagram proses forensik NIST, bukti berkembang dari Media, Data, Information, sampai ...',
    fields: [{ label: 'Tahap akhir', a: ['evidence', 'bukti'] }],
    ex: 'Alur NIST: Media - Data - Information - Evidence.'
  },
  {
    type: 'fill',
    q: 'Selain likely value dan amount of effort required, faktor prioritas pengumpulan data menurut NIST adalah ...',
    fields: [{ label: 'Faktor', a: ['volatility', 'volatilitas'] }],
    ex: 'Tiga faktor prioritas NIST: likely value, volatility, amount of effort required.'
  },
  {
    type: 'fill',
    q: 'Istilah untuk proses pelacakan perpindahan barang bukti sejak dikumpulkan, diamankan, sampai dianalisis, lengkap dengan pencatatan setiap orang yang menanganinya, adalah ...',
    fields: [{ label: 'Istilah', a: ['chain of custody', 'chain custody', 'coc'] }],
    ex: 'Definisi NIST: chain of custody mencatat siapa yang menangani bukti, waktu, dan tujuan pemindahannya.'
  },
  {
    type: 'fill',
    q: 'Jejak penyerang pada intrusi komputer tidak hanya ada di file system, registry, dan system log, tetapi juga di log tingkat ...',
    fields: [{ label: 'Tingkat log', a: ['network', 'jaringan'] }],
    ex: 'Slide Locard: jejak muncul di file system, registry, system log, dan network-level log.'
  }
]);

BANK.isian('fd', 'isian-hukum', 'Hukum & Standar Bukti (isian)', [
  {
    type: 'fill',
    q: 'Acuan penerimaan bukti ilmiah di pengadilan Amerika sebelum Daubert, yang hanya menuntut metode telah generally accepted, berasal dari putusan ...',
    fields: [{ label: 'Putusan', a: ['frye', 'frye v us', 'frye v u s', 'frye v united states'] }],
    ex: 'Frye v. U.S. (1923) memakai kriteria general acceptance di komunitas ilmiah.'
  },
  {
    type: 'fill',
    q: 'ACPO Good Practice Guide for Digital Evidence memuat berapa prinsip?',
    fields: [{ label: 'Jumlah prinsip', a: ['4', 'empat'] }],
    ex: 'Empat prinsip ACPO: tidak mengubah data, kompetensi saat mengakses data asli, audit trail, tanggung jawab penanggung jawab investigasi.'
  },
  {
    type: 'fill',
    q: 'Prinsip ISO/IEC 27037 yang menuntut semua proses dapat diaudit dan diulang serta hasilnya reproducible disebut ...',
    fields: [{ label: 'Prinsip', a: ['reliability', 'reliabilitas', 'keandalan'] }],
    ex: 'Tiga prinsip ISO/IEC 27037: relevance, reliability, dan sufficiency.'
  }
]);

BANK.isian('fd', 'isian-akuisisi', 'Akuisisi & Penanganan Bukti (isian)', [
  {
    type: 'fill',
    q: 'Sebuah volume memakai sektor 512 byte dan satu cluster berisi 16 sektor. Ukuran satu cluster adalah ... byte.',
    fields: [{ label: 'Ukuran cluster (byte)', a: 8192, tol: 0 }],
    ex: '16 x 512 = 8192 byte. Hitungan, bukan kunci resmi.'
  },
  {
    type: 'fill',
    q: 'File berukuran 5000 byte disimpan pada volume dengan cluster 2048 byte. Berapa byte slack yang tersisa pada cluster terakhir?',
    fields: [{ label: 'Slack (byte)', a: 1144, tol: 0 }],
    ex: 'File memakai 3 cluster (6144 byte); slack = 6144 - 5000 = 1144 byte. Hitungan, bukan kunci resmi.'
  },
  {
    type: 'fill',
    q: 'Volume memakai sektor 512 byte. Agar satu cluster berukuran 1024 byte, jumlah sektor per cluster harus ...',
    fields: [{ label: 'Jumlah sektor', a: 2, tol: 0 }],
    ex: '1024 : 512 = 2 sektor per cluster. Hitungan, bukan kunci resmi.'
  },
  {
    type: 'fill',
    q: 'Jenis imaging yang dilakukan ketika media penyimpanan masih terhubung dan komputer masih menyala disebut ...',
    fields: [{ label: 'Jenis imaging', a: ['live imaging', 'live', 'akuisisi live'] }],
    ex: 'Live imaging dipakai bila data volatile atau disk terenkripsi harus diamankan lebih dulu.'
  },
  {
    type: 'fill',
    q: 'Perangkat yang dipasang di antara media bukti dan komputer agar media bukti hanya dapat dibaca disebut ...',
    fields: [{ label: 'Perangkat', a: ['write blocker', 'writeblocker', 'write block'] }],
    ex: 'Write blocker mencegah operasi tulis ke media bukti.'
  },
  {
    type: 'fill',
    q: 'Penggandaan bit-by-bit dari media sumber ke sebuah file disebut ...',
    fields: [{ label: 'Teknik', a: ['imaging', 'image'] }],
    ex: 'Imaging menghasilkan file snapshot tetap yang dipakai untuk analisis.'
  },
  {
    type: 'fill',
    q: 'Penggandaan bit-by-bit ke disk lain yang dapat dipakai sebagai pengganti disk asli disebut ...',
    fields: [{ label: 'Teknik', a: ['cloning', 'clone'] }],
    ex: 'Cloning: salinan persis ke disk lain; imaging: salinan persis ke dalam file.'
  },
  {
    type: 'fill',
    q: 'Metode sanitasi media yang menimpa data pada seluruh partisi sehingga data tidak dapat dipulihkan disebut ...',
    fields: [{ label: 'Metode', a: ['wipe', 'wiping', 'penimpaan'] }],
    ex: 'Delete dan quick format tidak menghapus data; hanya wipe yang membuat data tidak dapat dipulihkan.'
  },
  {
    type: 'fill',
    q: 'Algoritma hash 256 bit yang umum dipakai untuk memverifikasi image memiliki panjang digest ... bit.',
    fields: [{ label: 'Panjang digest (bit)', a: 256, tol: 0 }],
    ex: 'SHA-256 menghasilkan digest 256 bit; MD5 128 bit dan SHA-1 160 bit.'
  },
  {
    type: 'fill',
    q: 'Utility bawaan Unix dan Linux yang dipakai untuk imaging bit-by-bit adalah ...',
    fields: [{ label: 'Utility', a: ['dd'] }],
    ex: 'Slide alat bantu imaging menyebut dd sebagai utility pada mesin Unix dan Linux.'
  }
]);

BANK.isian('fd', 'isian-artefak', 'Artefak & Memori (isian)', [
  {
    type: 'fill',
    q: 'Berapa nilai Unix time untuk 1 Januari 2020 pukul 00.00.00 UTC?',
    fields: [{ label: 'Unix time', a: 1577836800, tol: 0 }],
    ex: 'Unix time menghitung detik non-leap sejak 1 Januari 1970. Hasil hitung, bukan kunci resmi.'
  },
  {
    type: 'fill',
    q: 'Registry hive Windows yang menyimpan daftar perangkat USB yang pernah terhubung dan zona waktu adalah ...',
    fields: [{ label: 'Hive', a: ['system'] }],
    ex: 'SYSTEM memuat nama komputer, services, perangkat USB, zona waktu, dan konfigurasi network adapter.'
  },
  {
    type: 'fill',
    q: 'Registry hive yang menyimpan akun pengguna beserta hash password dan tanggal login terakhir adalah ...',
    fields: [{ label: 'Hive', a: ['sam'] }],
    ex: 'SAM memuat grup dan pengguna, hak istimewa, password, dan tanggal login terakhir.'
  },
  {
    type: 'fill',
    q: 'Plugin Volatility yang dipakai untuk mengambil hash password akun lokal dari dump memori adalah ...',
    fields: [{ label: 'Plugin', a: ['hashdump'] }],
    ex: 'hashdump mengambil hash akun lokal; hasilnya dapat diuji dengan John the Ripper.'
  }
]);
