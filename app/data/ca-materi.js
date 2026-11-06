// Komputasi Awan — materi per nomor kisi-kisi UTS 2026.
// Ringkasan disusun sendiri dari buku Distributed Systems (van Steen & Tanenbaum), soal UTS 24/25 dan 25/26,
// dokumen SOAL (Chord dengan hashing ASCII), dan kisi-kisi yang dikumpulkan pemilik. Pembahasan disusun sendiri.
BANK.materi('ca', [
  {
    label: 'Pengantar', judul: 'Kisi-kisi UTS 2026 dan cara menjawab', hlm: '-',
    ringkas: 'Tujuh nomor soal beserta cakupannya, hubungannya dengan soal tahun lalu, dan pola jawaban esai.',
    bagian: [
      { h: 'Kisi-kisi per nomor', tabel: { head: ['No', 'Topik', 'Cakupan'], rows: [
        ['1', 'Sistem terdistribusi', 'Teori dasar: centralized, decentralized, distributed; distribution transparency (definisi, contoh, trade-off dengan performa dan komunikasi asinkron); skalabilitas (cadangan: shared/private memory, client-server vs P2P)'],
        ['2', 'Arsitektur', 'Publish-subscribe dan RESTful: komponen, interface, konektor; lengkapi tabel coupled/decoupled (koordinasi); perbandingan coupling'],
        ['3', 'Proses', 'Container (plus minus) dan virtual machine: hypervisor, guest OS, kernel; memilih container atau VM. Tanpa hitungan'],
        ['4', 'Komunikasi', 'Teori dasar transient/persistent × synchronous/asynchronous; RPC: cara kerja, stub, marshalling, varian'],
        ['5', 'Koordinasi', 'Logical clock (Lamport) dan situasi yang membutuhkannya; vector clock; mengisi timestamp dari diagram dengan bentuk berbeda'],
        ['6', 'Penamaan', 'Identitas pada Reticulum (identity, destination hash, beda dengan alamat IP); teori name/identifier/address; Chord: finger table dan lookup'],
        ['7', 'Konsistensi', 'Teori dasar: mengapa replikasi dan konsistensi; analisis diagram P1-P4 sequentially dan causally consistent']] },
        poin: ['Tabel ini menggabungkan dua catatan kisi-kisi. Catatan tambahan menyebut identitas Reticulum di nomor 6, komponen/interface/konektor di nomor 2, dan komunikasi asinkron di nomor 1.'],
        ingat: 'Nomor 1, 4, 5, dan 7 mirip UTS 25/26. Nomor 2, 3, dan 6 bergeser ke RESTful/pub-sub, container, serta Reticulum dan Chord.' },
      { h: 'Bentuk soal tahun lalu', tabel: { head: ['Aspek', 'UTS Genap 24/25', 'UTS Ganjil 25/26'], rows: [
        ['Jumlah soal', '7 nomor, tiap nomor a/b/c', '7 nomor, a/b/c (nomor 2 dan 6 hanya a/b)'],
        ['Bobot', '15 poin per nomor', '10 poin per nomor, sub-soal 2 sampai 6 poin'],
        ['Hitungan', 'Vector clock semua event, kausalitas pesan', 'Vector clock semua event, analisis R(x)/W(x)']] },
        poin: ['Soal aslinya ada di topik Soal Asli UTS 24/25 dan 25/26 pada Latihan soal.', 'Topik 1 sampai 7 berisi latihan per nomor kisi-kisi 2026, termasuk paket soal a/b/c bergaya UTS.'] },
      { h: 'Pola jawaban esai', poin: [
        'Definisi satu kalimat, lalu poin-poin, lalu contoh nyata.',
        'Soal "bandingkan": buat tabel (aspek, A, B).',
        'Soal "jelaskan cara kerja": tulis langkah bernomor.',
        'Soal hitungan atau diagram: tulis aturan, langkah per event, lalu hasil. Nilai parsial didapat dari langkah.'
      ], ingat: 'Bobot sub-soal kecil (2 sampai 4 poin): jawab padat, kira-kira setengah halaman.' }
    ]
  },
  {
    label: 'Soal 1', judul: 'Sistem Terdistribusi', hlm: '-',
    ringkas: 'Definisi, centralized vs decentralized vs distributed, distribution transparency, scalability dan teknik scaling, shared vs private memory, client-server vs P2P.',
    bagian: [
      { h: 'Definisi dan karakteristik', poin: [
        'Sistem terdistribusi: kumpulan elemen komputasi otonom yang tampak bagi penggunanya sebagai satu sistem yang koheren.',
        'Karakteristik: tidak ada jam global (no global clock), proses berkomunikasi dengan pesan lewat jaringan, sumber daya dipakai bersama, kegagalan bisa terjadi sebagian (partial failure).',
        'Tujuan desain: sharing resource, distribution transparency, openness, dan scalability.'
      ] },
      { h: 'Centralized, decentralized, distributed', tabel: { head: ['Bentuk', 'Titik kendali', 'Contoh', 'Kelebihan', 'Kelemahan'], rows: [
        ['Centralized', 'Satu pusat', 'Sistem akademik di satu server, mainframe', 'Mudah dikelola dan dikoordinasi', 'Single point of failure, bottleneck'],
        ['Decentralized', 'Beberapa pusat lokal (hub)', 'Email (mail server per domain), DNS per zona', 'Beban terbagi, kegagalan terlokalisasi', 'Hub mati memutus node di bawahnya'],
        ['Distributed', 'Tidak ada pusat, node setara', 'Blockchain, BitTorrent, cluster', 'Paling tahan gagal dan skalabel', 'Koordinasi dan konsistensi paling sulit']] },
        soal: 'UTS 25/26 1a: Apa yang dimaksud sistem centralized, decentralized, dan distributed? (3 poin)',
        ingat: 'Bedakan dari jumlah titik kendali: satu, beberapa, atau tidak ada. Gambar topologi: bintang, beberapa bintang terhubung, mesh.' },
      { h: 'Distribution transparency', tabel: { head: ['Tipe', 'Yang disembunyikan', 'Contoh'], rows: [
        ['Access', 'Perbedaan representasi data dan cara akses', 'File dibuka sama walau server Linux dan client Windows'],
        ['Location', 'Di mana objek berada', 'URL tidak menunjukkan server fisik'],
        ['Relocation', 'Objek dipindah saat sedang dipakai', 'Laptop pindah Wi-Fi tanpa memutus sesi'],
        ['Migration', 'Objek dipindah ke lokasi lain', 'VM dipindah ke server lain'],
        ['Replication', 'Objek punya beberapa salinan', 'CDN, replika database'],
        ['Concurrency', 'Objek dipakai bersama banyak pengguna', 'Google Docs dipakai bersamaan'],
        ['Failure', 'Kegagalan dan pemulihan objek', 'Server cadangan mengambil alih'],
        ['Persistence (daftar lama)', 'Objek ada di memori atau di disk', 'Objek database']] },
        poin: [
          'Definisi: menyembunyikan fakta bahwa proses dan sumber daya tersebar secara fisik di banyak komputer, sehingga sistem tampak sebagai satu komputer.',
          'Degree of transparency: transparansi penuh tidak selalu diinginkan. Latensi antar benua tidak bisa disembunyikan, server lambat sulit dibedakan dari server mati, dan menjaga replika selalu sama itu mahal.',
          'Trade-off 1, transparansi vs performa: replication transparency penuh menuntut semua salinan selalu sama, padahal sinkronisasi antar replika yang berjauhan lambat dan mahal.',
          'Trade-off 2, transparansi vs komunikasi asinkron: agar latensi tersembunyi, sistem memakai komunikasi asinkron (pengirim tidak menunggu). Akibatnya pengguna kadang perlu tahu bahwa operasinya belum selesai, misalnya email masih di outbox, sehingga hasilnya tidak bisa dibuat seolah-olah lokal.',
          'Trade-off 3, transparansi vs kegagalan: server lambat tidak bisa dibedakan dari server mati, sehingga menyembunyikan kegagalan membuat client terus menunggu atau mengulang request.'
        ],
        soal: 'UTS 24/25 1a dan 25/26 1b: Jelaskan definisi distribution transparency dan sebutkan tipe-tipenya. (4 poin)',
        ingat: 'Kata kuncinya "menyembunyikan". Hafalkan tujuh tipe: access, location, relocation, migration, replication, concurrency, failure.' },
      { h: 'Scalability', tabel: { head: ['Dimensi', 'Arti', 'Masalah utama'], rows: [
        ['Size', 'Mudah menambah pengguna dan sumber daya', 'Komponen terpusat (server, database, jaringan) menjadi bottleneck'],
        ['Geographical', 'Pengguna dan sumber daya boleh berjauhan', 'Latensi WAN; komunikasi synchronous lambat; broadcast LAN tidak bisa dipakai'],
        ['Administrative', 'Tetap mudah dikelola lintas organisasi', 'Kebijakan keamanan, biaya, dan manajemen bertentangan']] },
        poin: [
          'Definisi: sistem tetap bekerja baik ketika ukurannya, jaraknya, atau jumlah organisasinya bertambah.',
          'Teknik scaling 1, hiding communication latency: komunikasi asynchronous, misalnya validasi form di browser.',
          'Teknik scaling 2, partitioning and distribution: membagi data atau komponen, misalnya DNS dibagi menjadi zona.',
          'Teknik scaling 3, replication dan caching: salinan dekat pengguna, misalnya CDN dan web cache. Akibatnya muncul masalah konsistensi (nomor 7).'
        ],
        soal: 'UTS 24/25 1b: Apa maksud scalability? Uraikan salah satu dari size, geographical, atau administrative scalability.',
        ingat: 'Tulis definisi, satu dimensi dengan masalahnya, lalu satu teknik scaling sebagai nilai tambah.' },
      { h: 'Shared memory vs private memory', tabel: { head: ['Aspek', 'Shared memory', 'Private memory'], rows: [
        ['Arsitektur', 'Multiprocessor', 'Multicomputer'],
        ['Pertukaran data', 'Baca tulis memori bersama', 'Message passing lewat jaringan'],
        ['Sinkronisasi', 'Lock, semaphore', 'Pesan'],
        ['Skalabilitas', 'Terbatas (bus dan memori bottleneck)', 'Tinggi, sampai ribuan node (cluster)']] },
        soal: 'UTS 25/26 1c dan dokumen SOAL: Jelaskan sistem shared memory dan private memory pada parallel computing. (3 poin)' },
      { h: 'Client-server vs peer-to-peer', tabel: { head: ['Aspek', 'Client-server', 'Peer-to-peer'], rows: [
        ['Pembagian peran', 'Asimetris: server melayani, client meminta', 'Simetris: tiap peer client sekaligus server'],
        ['Kepemilikan sumber daya', 'Dimiliki dan dikelola server', 'Tersebar di banyak peer'],
        ['Ketahanan', 'Server single point of failure dan bottleneck', 'Tidak ada titik gagal tunggal; data hilang sementara bila peer pemilik offline'],
        ['Contoh', 'Web, email, sistem akademik', 'BitTorrent, blockchain']] },
        soal: 'Dokumen SOAL: Jelaskan perbedaan client server vs peer to peer.' }
    ]
  },
  {
    label: 'Soal 2', judul: 'Arsitektur: RESTful dan Publish-Subscribe', hlm: '-',
    ringkas: 'Gaya arsitektur, komponen/interface/konektor RESTful dan publish-subscribe, RESTful (4 karakteristik dan operasi), publish-subscribe (tabel koordinasi, shared data space, basis subscription).',
    bagian: [
      { h: 'Teori dasar gaya arsitektur', poin: [
        'Gaya arsitektur: cara komponen disusun, dihubungkan, dan bertukar data.',
        'Component: unit modular dengan interface yang jelas dan dapat diganti.',
        'Interface: kontrak layanan yang disediakan atau dibutuhkan komponen.',
        'Connector: mekanisme komunikasi dan koordinasi antar komponen (RPC, message passing, streaming).'
      ], tabel: { head: ['Gaya', 'Ciri', 'Contoh'], rows: [
        ['Layered', 'Lapisan atas memanggil lapisan di bawahnya', 'TCP/IP, aplikasi three-tier'],
        ['Object-based (service-oriented)', 'Objek remote dipanggil lewat interface', 'Java RMI, microservice'],
        ['Resource-based (RESTful)', 'Sumber daya diberi URI, interface seragam PUT/GET/DELETE/POST', 'Amazon S3, REST API'],
        ['Publish-subscribe', 'Publisher tidak tahu subscriber, middleware mencocokkan event', 'MQTT, Kafka']] } },
      { h: 'RESTful architecture', poin: [
        'REST (Representational State Transfer) memandang sistem terdistribusi sebagai kumpulan sumber daya yang dikelola komponen.',
        '1. Sumber daya diidentifikasi lewat satu skema penamaan (URI).',
        '2. Semua layanan menawarkan interface yang sama: PUT, GET, DELETE, POST.',
        '3. Pesan dari dan ke layanan menjelaskan dirinya sendiri (self-describing).',
        '4. Stateless: setelah menjalankan operasi, layanan melupakan semua informasi tentang pemanggil.',
        'Keuntungan stateless: request bisa dilayani server mana pun, sehingga mudah di-load-balance, direplikasi, dan di-cache.'
      ], tabel: { head: ['Operasi', 'Arti (tabel buku)', 'Contoh Amazon S3'], rows: [
        ['PUT', 'Create a new resource', 'Membuat bucket atau mengunggah object'],
        ['GET', 'Retrieve the state of a resource', 'Mengunduh object'],
        ['DELETE', 'Delete a resource', 'Menghapus object'],
        ['POST', 'Modify a resource by transferring a new state', 'Mengubah object']] },
        ingat: 'Di praktik HTTP banyak API memakai POST untuk membuat dan PUT untuk mengganti. Di ujian ikuti tabel buku, lalu sebut konvensi praktiknya bila perlu.' },
      { h: 'Komponen, interface, dan konektor', tabel: { head: ['Unsur', 'RESTful', 'Publish-subscribe'], rows: [
        ['Komponen', 'Sumber daya (resource) yang dikelola layanan dan diberi nama URI; client dan server', 'Publisher, subscriber, dan broker/middleware event'],
        ['Interface', 'Seragam untuk semua layanan: PUT, GET, DELETE, POST', 'publish(event) dan subscribe(topik atau syarat), lalu notify ke subscriber'],
        ['Konektor', 'HTTP request-reply, stateless, pesan self-describing', 'Event bus/broker (mis. MQTT, Kafka) yang mencocokkan event dengan subscription'],
        ['Coupling', 'Referentially dan temporally coupled', 'Referentially decoupled; temporally decoupled bila broker menyimpan event']] },
        soal: 'Kisi-kisi 2026 nomor 2 dan PDF latihan 2b: Pada arsitektur RESTful, jelaskan komponen, interface, dan konektor, serta operasi standarnya.',
        ingat: 'Komponen = apa yang dihubungkan, interface = kontrak layanannya, konektor = jalur komunikasinya.' },
      { h: 'Publish-subscribe architecture', poin: [
        'Publisher menerbitkan event tanpa tahu siapa penerimanya.',
        'Subscriber mendaftarkan minat (subscription).',
        'Middleware atau broker mencocokkan event dengan subscription lalu meneruskannya.',
        'Contoh: sensor IoT mengirim ke broker MQTT, dashboard berlangganan topik "suhu/ruang1".'
      ] },
      { h: 'Tabel koordinasi (lengkapi tabel)', tabel: { head: ['', 'Temporally coupled', 'Temporally decoupled'], rows: [
        ['Referentially coupled', 'Direct (telepon, RPC)', 'Mailbox (email ke alamat tertentu)'],
        ['Referentially decoupled', 'Event-based (pub-sub, penerima harus online)', 'Shared data space (tuple space, JavaSpaces)']] },
        poin: [
          'Referentially decoupled ("berbasis rujukan"): pihak yang berkomunikasi tidak perlu tahu identitas atau alamat pihak lain.',
          'Temporally decoupled: pengirim dan penerima tidak harus aktif pada waktu yang sama.',
          'Shared data space ("space"): proses menaruh tuple ke ruang data bersama; proses lain membaca (rd) atau mengambil (in) tuple yang cocok dengan polanya, kapan saja.'
        ],
        soal: 'Kisi-kisi 2026 nomor 2: lengkapi tabel koordinasi publish-subscribe dan berikan contoh tiap jenis.',
        ingat: 'Dua pertanyaan untuk setiap contoh: perlu tahu identitas? perlu aktif bersamaan?' },
      { h: 'Basis subscription dan dimensi decoupling', tabel: { head: ['Basis', 'Cara berlangganan', 'Contoh'], rows: [
        ['Topic-based (subject-based)', 'Berdasarkan nama topik', '"kampus/pengumuman"'],
        ['Content-based', 'Berdasarkan nilai atribut event (predikat)', 'Harga saham BBCA > 9000'],
        ['Type-based', 'Berdasarkan tipe atau kelas event', 'Semua event bertipe PesananBaru']] },
        poin: [
          'Tiga dimensi decoupling: space (referential), time (temporal), dan synchronization (publisher tidak diblokir, subscriber diberi tahu secara asynchronous).',
          'Tantangan: pencocokan subscription yang cepat pada skala besar, keamanan, jaminan pengiriman.'
        ] },
      { h: 'RESTful vs publish-subscribe', tabel: { head: ['Aspek', 'RESTful', 'Publish-subscribe'], rows: [
        ['Pola', 'Request-reply', 'Event dikirim ke banyak penerima'],
        ['Hubungan pihak', 'Client tahu URI (referentially coupled)', 'Saling tidak kenal (decoupled)'],
        ['Sinkronisasi', 'Umumnya synchronous', 'Umumnya asynchronous'],
        ['Cocok untuk', 'CRUD data, aplikasi web/mobile ke backend', 'Notifikasi, IoT, data real-time']] } }
    ]
  },
  {
    label: 'Soal 3', judul: 'Proses dan Container', hlm: '-',
    ringkas: 'Proses vs thread, multithreaded server, virtualisasi, container (Docker) vs virtual machine: definisi, cara kerja, contoh, kelebihan, kekurangan.',
    bagian: [
      { h: 'Teori dasar: proses vs thread', tabel: { head: ['Aspek', 'Proses', 'Thread'], rows: [
        ['Address space', 'Sendiri', 'Bersama dalam satu proses'],
        ['Biaya buat dan context switch', 'Mahal', 'Murah (lightweight)'],
        ['Komunikasi', 'IPC: pipe, socket, pesan', 'Variabel bersama, perlu lock'],
        ['Isolasi', 'Crash satu proses tidak merusak yang lain', 'Crash satu thread bisa mematikan proses']] },
        poin: [
          'Multithreaded server (dispatcher/worker): dispatcher menerima request dan menyerahkannya ke worker; worker yang blocking tidak menghentikan worker lain, jadi lebih banyak client terlayani.',
          'Multithreaded client: beberapa objek halaman web diunduh bersamaan sehingga latensi jaringan saling menutupi.'
        ] },
      { h: 'Virtualisasi', poin: [
        'Virtualisasi membuat satu mesin fisik tampak sebagai beberapa lingkungan terpisah.',
        'Manfaat: satu server dipakai banyak aplikasi (sharing resource), isolasi, portabilitas, mudah dipindah dan diperbanyak.',
        'Hypervisor tipe 1 (native, bare metal): langsung di hardware, contoh VMware ESXi, Xen, Hyper-V.',
        'Hypervisor tipe 2 (hosted): di atas OS host, contoh VirtualBox, VMware Workstation.'
      ] },
      { h: 'Container', poin: [
        'Definisi: virtualisasi tingkat sistem operasi yang mengemas aplikasi beserta library dan dependensinya agar berjalan sama di mana pun.',
        'Semua container berbagi kernel OS host; container tidak membawa OS sendiri.',
        'Namespaces: tiap container melihat proses, jaringan, dan file system-nya sendiri (isolasi).',
        'Cgroups (control groups): membatasi pemakaian CPU dan memori tiap container.',
        'Union/overlay file system: image tersusun dari lapisan read-only, container menambah satu lapisan tulis.',
        'Contoh teknologi: Docker, Podman, LXC, containerd; orkestrasi banyak container dengan Kubernetes.'
      ], ingat: 'Yang disebut dosen di awal adalah Docker: tulis Docker sebagai contoh utama.' },
      { h: 'Docker', tabel: { head: ['Istilah', 'Arti'], rows: [
        ['Dockerfile', 'Berkas teks berisi instruksi membangun image (FROM, COPY, RUN, CMD)'],
        ['Image', 'Template read-only berlapis untuk menjalankan container'],
        ['Container', 'Instance image yang sedang berjalan'],
        ['Registry', 'Tempat menyimpan dan membagikan image, mis. Docker Hub'],
        ['Docker engine/daemon', 'Layanan yang membangun, menjalankan, dan mengelola container']] },
        poin: ['Alur: tulis Dockerfile → docker build (image) → docker push ke registry → docker pull di server → docker run (container).'] },
      { h: 'Container vs virtual machine', tabel: { head: ['Aspek', 'Container', 'Virtual machine'], rows: [
        ['Yang divirtualisasi', 'Sistem operasi', 'Hardware'],
        ['Lapisan pengelola', 'Container engine (Docker)', 'Hypervisor'],
        ['OS', 'Berbagi kernel host', 'OS tamu lengkap per VM'],
        ['Ukuran dan start', 'MB, detik', 'GB, menit'],
        ['Isolasi', 'Lebih lemah', 'Lebih kuat'],
        ['OS berbeda', 'Tidak bisa (kernel sama)', 'Bisa (Windows di atas Linux)'],
        ['Contoh', 'Docker, Podman, LXC', 'VMware, VirtualBox, KVM, Hyper-V']] },
        soal: 'Kisi-kisi 2026 nomor 3: Jelaskan container dan virtual machine: definisi, contoh, kelebihan dan kekurangan container.' },
      { h: 'Kelebihan dan kekurangan container', poin: [
        'Kelebihan: ringan dan cepat start, overhead kecil sehingga satu server memuat banyak container.',
        'Kelebihan: portabel (build once, run anywhere), lingkungan dev dan produksi sama.',
        'Kelebihan: cocok microservices, CI/CD, dan autoscaling.',
        'Kekurangan: isolasi lebih lemah karena kernel dipakai bersama; celah kernel berdampak ke semua container.',
        'Kekurangan: tidak bisa menjalankan OS dengan kernel berbeda.',
        'Kekurangan: pengelolaan banyak container butuh orkestrasi (Kubernetes) dan penyimpanan data persisten perlu volume.'
      ], ingat: 'Pilih VM untuk OS berbeda dan isolasi kuat; pilih container untuk aplikasi ringan yang sering di-deploy.' }
    ]
  },
  {
    label: 'Soal 4', judul: 'Komunikasi dan RPC', hlm: '-',
    ringkas: 'Tipe komunikasi persistent/transient × synchronous/asynchronous, cara kerja RPC, stub dan marshalling, parameter passing, varian RPC, binding DCE.',
    bagian: [
      { h: 'Tipe komunikasi', tabel: { head: ['Tipe', 'Arti', 'Contoh'], rows: [
        ['Persistent asynchronous', 'Pesan disimpan middleware, pengirim langsung lanjut', 'Email, message queue'],
        ['Persistent synchronous', 'Pesan disimpan, pengirim menunggu konfirmasi tersimpan', 'Kirim ke queue dengan acknowledgment'],
        ['Transient asynchronous', 'Tidak disimpan, pengirim tidak menunggu', 'Datagram UDP, one-way RPC'],
        ['Transient synchronous', 'Tidak disimpan, pengirim menunggu', 'RPC, HTTP request-response']] },
        poin: [
          'Persistent: penerima tidak perlu aktif saat pesan dikirim. Transient: pesan hilang jika penerima tidak aktif.',
          'Titik sinkronisasi synchronous: setelah request diterima middleware (submission), setelah sampai di penerima (delivery), setelah diproses (response, dipakai RPC).',
          'Catatan dosen: contoh client-server minggu 4 digolongkan transient asynchronous; buku menggolongkan request-reply sebagai transient synchronous. Sebut konteksnya.'
        ], soal: 'UTS 24/25 4b dan 25/26 4a: Sebutkan dan jelaskan tipe-tipe komunikasi (transient dan persistent).' },
      { h: 'Cara kerja RPC', poin: [
        'Ide: memanggil prosedur di mesin lain seolah prosedur lokal (access transparency).',
        '1. Client memanggil client stub secara biasa.',
        '2. Client stub membuat pesan (marshalling parameter) dan memanggil OS lokal.',
        '3. OS client mengirim pesan ke OS server.',
        '4. OS server menyerahkan pesan ke server stub.',
        '5. Server stub membuka parameter (unmarshalling) dan memanggil prosedur server.',
        '6. Server menjalankan prosedur dan mengembalikan hasil ke server stub.',
        '7. Server stub membungkus hasil dan memanggil OS server.',
        '8. OS server mengirim pesan hasil ke OS client.',
        '9. OS client menyerahkan pesan ke client stub.',
        '10. Client stub membuka hasil dan mengembalikannya ke client.'
      ], soal: 'Kisi-kisi 2026 nomor 4: Jelaskan cara kerja RPC.',
        ingat: 'Hafalkan kerangkanya: client → client stub (marshal) → jaringan → server stub (unmarshal) → server, lalu kembali dengan arah sebaliknya.' },
      { h: 'Stub, marshalling, dan parameter passing', poin: [
        'Client stub: wakil prosedur remote di client. Server stub (skeleton): penerima di server yang memanggil prosedur sebenarnya.',
        'Marshalling: mengemas parameter menjadi urutan byte dalam format yang disepakati; unmarshalling kebalikannya.',
        'Stub dibangkitkan otomatis dari definisi interface (IDL, Interface Definition Language).',
        'Masalah representasi data: little endian (Intel) vs big endian; solusi format standar.',
        'Masalah pass-by-reference/pointer: alamat memori tidak bermakna di mesin lain; solusi copy/restore atau melarang pointer.'
      ] },
      { h: 'Varian RPC', tabel: { head: ['Varian', 'Perilaku client'], rows: [
        ['Synchronous RPC', 'Menunggu sampai hasil diterima'],
        ['Asynchronous RPC', 'Menunggu acknowledgment bahwa request diterima, lalu lanjut'],
        ['Deferred synchronous RPC', 'Dua asynchronous RPC: server memanggil client kembali saat hasil siap'],
        ['One-way RPC', 'Tidak menunggu acknowledgment sama sekali']] },
        poin: ['Asynchronous RPC berguna bila tidak ada hasil yang perlu ditunggu, mis. memulai layanan atau transfer dana batch.'] },
      { h: 'Binding pada DCE RPC', poin: [
        'Server mendaftarkan endpoint (port) ke DCE daemon di mesinnya, lalu mendaftarkan layanannya ke directory server.',
        'Client bertanya ke directory server untuk menemukan mesin server.',
        'Client bertanya ke DCE daemon di mesin itu untuk mendapat endpoint.',
        'Client melakukan RPC ke endpoint tersebut.'
      ] },
      { h: 'RPC vs panggilan lokal', poin: [
        'Ada latensi jaringan.',
        'Bisa gagal sebagian: request/balasan hilang, server crash; client tidak tahu apakah prosedur sudah dijalankan.',
        'Tidak ada memori bersama: parameter di-marshal, pointer dan variabel global tidak bisa dipakai.',
        'Semantik kegagalan: at-least-once, at-most-once; exactly-once sulit dicapai.'
      ] }
    ]
  },
  {
    label: 'Soal 5', judul: 'Logical Clock dan Vector Clock', hlm: '-',
    ringkas: 'Situasi yang membutuhkan logical clock, aturan Lamport, masalah Lamport, aturan vector clock, langkah mengisi timestamp dari diagram, kausalitas pesan.',
    bagian: [
      { h: 'Mengapa logical clock', poin: [
        'Tidak ada jam global, dan jam fisik tiap mesin berbeda (clock skew), sehingga waktu fisik tidak bisa dipakai untuk mengurutkan event.',
        'Logical clock memberi nomor urut event tanpa waktu nyata; cukup bila yang penting hanya urutan.',
        'Physical clock tetap diperlukan untuk waktu nyata: sertifikat kedaluwarsa, log audit, absensi (sinkronisasi NTP/Berkeley).'
      ] },
      { h: 'Situasi yang membutuhkan logical clock', tabel: { head: ['Situasi', 'Clock', 'Penjelasan'], rows: [
        ['Replika database bank', 'Lamport (totally ordered multicast)', 'Setoran Rp100 dan bunga 1% harus diterapkan dalam urutan sama di semua replika'],
        ['Forum, chat, bulletin board', 'Vector (causally ordered multicast)', 'Balasan tidak boleh tampil sebelum pesan aslinya'],
        ['Mutual exclusion terdistribusi', 'Lamport (Ricart-Agrawala)', 'Request dengan timestamp terkecil masuk lebih dulu'],
        ['Debugging dan log terdistribusi', 'Vector', 'Mengetahui event mana yang saling memengaruhi'],
        ['Versi data replika', 'Vector', 'Mendeteksi update yang concurrent (konflik)']] },
        poin: ['Contoh bank: saldo Rp1.000. Setor dulu lalu bunga = 1.111; bunga dulu lalu setor = 1.110. Replika berbeda bila urutannya tidak sama.'],
        soal: 'Kisi-kisi 2026 nomor 5: Logical clock dibutuhkan dalam situasi apa saja?',
        ingat: 'Jawab dengan pola: alasan (tidak ada jam global) lalu dua atau tiga situasi beserta contohnya.' },
      { h: 'Lamport clock', poin: [
        'Happened-before: a → b bila a dan b di proses sama dan a lebih dulu, atau a = kirim dan b = terima pesan yang sama; transitif.',
        'Aturan 1: sebelum event lokal atau kirim, C = C + 1.',
        'Aturan 2: pesan membawa timestamp pengirim.',
        'Aturan 3: saat menerima, C = max(C lokal, timestamp pesan) + 1.',
        'Menjamin: a → b maka L(a) < L(b).',
        'Masalah utama: L(a) < L(b) tidak berarti a → b. Lamport tidak bisa membedakan event kausal dan concurrent.'
      ], soal: 'UTS 25/26 5b: Apa masalah utama yang dimiliki Lamport clock? (2 poin)' },
      { h: 'Vector clock', poin: [
        'Setiap proses Pi menyimpan vektor VCi dengan satu counter per proses.',
        'Event lokal atau kirim: VCi[i] = VCi[i] + 1; pesan membawa vektor pengirim.',
        'Terima: ambil maksimum per komponen antara vektor sendiri dan vektor pesan, lalu VCi[i] + 1.',
        'a → b jika semua komponen V(a) ≤ V(b) dan minimal satu lebih kecil.',
        'Jika masing-masing punya komponen yang lebih besar, a dan b concurrent.'
      ], tabel: { head: ['Perbandingan V(x) dan V(y)', 'Kesimpulan'], rows: [
        ['Semua komponen x ≤ y, ada yang <', 'x → y (kausal)'],
        ['Semua komponen y ≤ x, ada yang <', 'y → x'],
        ['Ada komponen x < y dan ada yang x > y', 'Concurrent']] } },
      { h: 'Langkah mengisi timestamp dari diagram', poin: [
        '1. Urutkan semua event dari kiri ke kanan (waktu).',
        '2. Event tanpa pesan masuk: naikkan komponen proses sendiri dari event sebelumnya di proses itu.',
        '3. Event penerima: ambil max per komponen dengan vektor event pengirim, lalu naikkan komponen sendiri.',
        '4. Jangan menghitung event penerima sebelum event pengirimnya.',
        'Contoh UTS 25/26 (P1: a, b; P2: c, d; P3: e, f, g; pesan a→c, e→c, b→f, g→d): a (1,0,0), b (2,0,0), e (0,0,1), c (1,1,1), f (2,0,2), g (2,0,3), d (2,2,3).',
        'Lamport untuk diagram yang sama: a 1, b 2, c 2, d 5, e 1, f 3, g 4.'
      ], soal: 'UTS 24/25 5b dan 25/26 5c: Gunakan vector clock untuk menentukan timestamp semua event. (4 sampai 8 poin)',
        ingat: 'Bentuk diagram bisa berbeda (empat proses, pesan menyilang, event lokal). Aturannya tetap sama: latihan di topik 5 dan lab Timestamp.' },
      { h: 'Kausalitas antar pesan', poin: [
        'Dua pesan dibandingkan lewat vector clock event pengirimnya.',
        'Contoh UTS 24/25: send(m2) = (4,1,0), send(m4) = (2,3,0) tidak saling ≤, jadi concurrent (tidak bergantung secara kausal).'
      ], soal: 'UTS 24/25 5c: Apakah m2 dan m4 saling bergantung secara kausal? (2 poin)' }
    ]
  },
  {
    label: 'Soal 6', judul: 'Penamaan, Reticulum, dan Chord', hlm: '-',
    ringkas: 'Name, identifier, address dan tiga sifat identifier, skema penamaan, identitas pada Reticulum (identity, destination hash, beda dengan IP), Chord: hashing ASCII, successor, finger table, lookup.',
    bagian: [
      { h: 'Name, identifier, address', tabel: { head: ['Istilah', 'Arti', 'Contoh'], rows: [
        ['Name', 'String untuk merujuk entitas', 'www.telkomuniversity.ac.id'],
        ['Address', 'Nama access point entitas; bisa berubah dan dipakai ulang', '192.168.1.10:8080'],
        ['Identifier', 'Nama yang merujuk entitas secara unik dan tetap', 'Key SHA-1, ID node Chord']] },
        poin: [
          'Tiga sifat identifier: (1) merujuk paling banyak satu entitas, (2) setiap entitas dirujuk paling banyak satu identifier, (3) selalu merujuk entitas yang sama, tidak pernah dipakai ulang.',
          'Human-friendly name: nama yang mudah dibaca manusia, misalnya nama file atau nama domain.'
        ], ingat: 'Tiga poin yang perlu dipahami: name, identifier, address, ditambah tiga sifat identifier.' },
      { h: 'Skema penamaan', tabel: { head: ['Skema', 'Ciri', 'Contoh'], rows: [
        ['Flat naming', 'Identifier tanpa struktur; resolusi lewat broadcast, forwarding pointer, home-based, atau DHT', 'Chord, alamat MAC'],
        ['Structured naming', 'Name space hierarkis, mudah dibaca', 'DNS, path file'],
        ['Attribute-based naming', 'Dicari lewat pasangan atribut-nilai', 'LDAP, Active Directory']] } },
      { h: 'Identitas pada Reticulum Network Stack', poin: [
        'Reticulum adalah network stack yang tidak bergantung pada IP. Ia bisa berjalan di atas LoRa, radio paket, serial, maupun TCP/UDP, tanpa server pusat dan tanpa pembagian alamat.',
        'Identity: pasangan kunci kriptografi yang dibuat sendiri oleh setiap pihak, terdiri dari kunci X25519 (enkripsi/ECDH) dan kunci Ed25519 (tanda tangan), total 512 bit. Kunci privat disimpan sendiri, kunci publik disebarkan.',
        'Destination: titik tujuan yang diberi nama bertitik "nama_aplikasi.aspek1.aspek2", misalnya "chatapp.user". Destination bertipe single terikat pada satu identity.',
        'Destination hash: SHA-256 dari nama destination dan identity, lalu dipotong menjadi 128 bit (16 byte, ditulis 32 karakter heksadesimal). Hash inilah yang dipakai sebagai alamat tujuan paket.',
        'Announce: destination menyebarkan pesan announce berisi destination hash, kunci publik, dan tanda tangan. Transport node mencatat arah datangnya sehingga jaringan tahu jalur ke hash itu.',
        'Tipe destination: single (terenkripsi untuk satu identity), group (kunci simetris bersama), plain (tidak terenkripsi, untuk broadcast), dan link (kanal terenkripsi dua arah).'
      ], tabel: { head: ['Aspek', 'Destination hash Reticulum', 'Alamat IP'], rows: [
        ['Cara mendapat', 'Dihitung sendiri dari kunci dan nama, tanpa otoritas pusat', 'Diberikan jaringan (DHCP, ISP, IANA)'],
        ['Hubungan dengan lokasi', 'Tidak bergantung lokasi; tetap sama walau pindah jaringan atau media', 'Menunjukkan lokasi di topologi; berubah saat pindah jaringan'],
        ['Keterkaitan dengan pemilik', 'Terikat kunci publik, jadi bisa diverifikasi (self-certifying)', 'Tidak membuktikan siapa pemiliknya; bisa dipakai ulang perangkat lain'],
        ['Keunikan', 'Unik secara probabilistik karena hash 128 bit', 'Unik karena dialokasikan; bisa ditranslasi (NAT)'],
        ['Konsep penamaan', 'Identifier pada flat naming', 'Address (access point)']] },
        soal: 'Kisi-kisi 2026 nomor 6 dan PDF latihan 6a: Jelaskan konsep identity pada Reticulum Network Stack: bagaimana identitas dibentuk, apa itu destination hash, dan apa perbedaan mendasarnya dengan alamat IP. (3 poin)',
        ingat: 'Tidak ada slide Reticulum di folder materi; ringkasan ini disusun dari dokumentasi Reticulum dan perlu dicek dengan catatan kelas. Kaitkan dengan teori penamaan: destination hash adalah identifier (unik, tetap, tidak dipakai ulang), sedangkan IP adalah address.' },
      { h: 'Chord: ring dan successor', poin: [
        'Node dan data diberi identifier m bit dengan fungsi hash, lalu disusun melingkar 0 sampai 2^m − 1.',
        'Di slide kelas: ID = total ASCII string mod 2^m (m = 4 berarti mod 16, m = 5 berarti mod 32). Di sistem nyata dipakai SHA-1.',
        'Key k disimpan di succ(k): node pertama dengan ID ≥ k. Bila melewati ID terbesar, kembali ke node terkecil.',
        'Setiap node bertanggung jawab atas key di antara predecessor-nya (eksklusif) dan dirinya (inklusif).'
      ] },
      { h: 'Contoh dokumen SOAL (m = 4)', tabel: { head: ['Server', 'IP', 'Total ASCII', 'ID (mod 16)'], rows: [
        ['A', '202.168.0.15', '595', '3'],
        ['B', '202.168.0.2', '543', '15'],
        ['C', '202.168.0.10', '590', '14'],
        ['D', '202.168.0.12', '592', '0']] },
        poin: [
          'Total ASCII "202.168.0.15" = 50+48+50+46+49+54+56+46+48+46+49+53 = 595; 595 mod 16 = 3. ASCII "0" sampai "9" = 48 sampai 57, "." = 46.',
          'File indah1.jpg sampai indah5.jpg: total ASCII 932 sampai 936, key 4 sampai 8.',
          'Ring: 0 (D), 3 (A), 14 (C), 15 (B). Key 4 sampai 8 ada di (3, 14], jadi semua foto disimpan di C (node 14).'
        ],
        soal: 'Dokumen SOAL: Tentukan total ASCII dan ID setiap server, hash key lima file, dan node penyimpannya (clue: node successor).',
        ingat: 'Asumsi: seluruh string IP termasuk titik dijumlahkan. Cocokkan dengan slide 8-35; bila slide menjumlah tanpa titik, ID berubah.' },
      { h: 'Finger table', poin: [
        'FT_p[i] = succ(p + 2^(i−1)), i = 1 sampai m; hitung p + 2^(i−1) mod 2^m.',
        'Contoh slide m = 5, node {1, 4, 9, 11, 14, 18, 20, 21, 28}.'
      ], tabel: { head: ['Node', 'FT[1..5]'], rows: [
        ['1', '4 4 9 9 18'], ['4', '9 9 9 14 20'], ['9', '11 11 14 18 28'], ['11', '14 14 18 20 28'], ['14', '18 18 18 28 1'],
        ['18', '20 20 28 28 4'], ['20', '21 28 28 28 4'], ['21', '28 28 28 1 9'], ['28', '1 1 1 4 14']] },
        soal: 'Kisi-kisi 2026 nomor 6: Buat finger table pada topologi ring Chord.' },
      { h: 'Lookup', poin: [
        'Di node p mencari key k: jika k ∈ (p, FT_p[1]], teruskan ke FT_p[1] (itulah penyimpan).',
        'Jika tidak, teruskan ke finger terjauh yang belum melewati k.',
        'Key 26 dari node 1: 1 → 18 → 20 → 21 → 28.',
        'Key 12 dari node 28: 28 → 4 → 9 → 11 → 14.',
        'Setiap hop memangkas jarak sekitar separuh, jadi O(log N) hop.'
      ], ingat: 'Tulis jalur lengkap beserta alasan tiap lompatan. Lab Chord menyediakan ring acak untuk latihan.' }
    ]
  },
  {
    label: 'Soal 7', judul: 'Konsistensi: Sequential dan Causal', hlm: '-',
    ringkas: 'Mengapa replikasi dan konsistensi, definisi sequential dan causal consistency, langkah analisis diagram P1-P4, contoh ya dan tidak.',
    bagian: [
      { h: 'Mengapa konsistensi diperlukan', poin: [
        'Replikasi untuk reliability: sistem tetap jalan bila satu replika gagal.',
        'Replikasi untuk performa dan skalabilitas: data dekat pengguna, beban terbagi.',
        'Akibatnya: bila satu replika diubah, replika lain sementara berbeda.',
        'Konsistensi diperlukan agar semua proses melihat data sesuai aturan yang disepakati (model konsistensi), tidak usang atau bertentangan.',
        'Trade-off: konsistensi kuat butuh sinkronisasi global yang mahal; model lebih lemah lebih cepat.'
      ], soal: 'Kisi-kisi 2026 nomor 7: Jelaskan mengapa konsistensi diperlukan.' },
      { h: 'Sequential consistency', poin: [
        'Hasil eksekusi sama seperti semua operasi dijalankan dalam satu urutan global, dan operasi tiap proses muncul sesuai urutan programnya.',
        'Semua proses melihat interleaving yang sama; waktu nyata tidak dipersoalkan.',
        'Cara cepat: jika dua pembaca melihat dua nilai dalam urutan berlawanan, tidak sequential.'
      ] },
      { h: 'Causal consistency', poin: [
        'Write yang berpotensi berhubungan kausal harus dilihat semua proses dalam urutan yang sama.',
        'Write concurrent boleh dilihat dalam urutan berbeda.',
        'Kausal jika: proses membaca nilai lalu menulis nilai baru, atau dua write oleh proses yang sama.',
        'Sequential consistent selalu causal consistent; tidak sebaliknya.'
      ] },
      { h: 'Langkah analisis diagram', poin: [
        '1. Baca operasi setiap proses dari kiri ke kanan (urutan program).',
        '2. Daftar urutan nilai yang dibaca setiap pembaca.',
        '3. Sequential: cari satu urutan global semua operasi; jika ada dua pembaca dengan urutan berlawanan, jawab tidak.',
        '4. Causal: tandai pasangan write kausal; cek semua pembaca melihatnya dengan urutan yang sama.',
        '5. Tulis kesimpulan beserta alasannya, misalnya urutan global yang ditemukan.'
      ] },
      { h: 'Contoh UTS 25/26 7b', tabel: { head: ['Proses', 'Operasi (kiri lebih dulu)'], rows: [
        ['P1', 'R(x)a   W(x)c'], ['P2', 'W(x)a   W(x)b'], ['P3', 'R(x)c   R(x)b'], ['P4', 'R(x)c   R(x)b']] },
        poin: ['Urutan global W2(x)a → R1(x)a → W1(x)c → R3(x)c → R4(x)c → W2(x)b → R3(x)b → R4(x)b memenuhi semua syarat: sequentially consistent, dan karena itu juga causally consistent.'],
        soal: 'UTS 25/26 7b: Apakah gambar sequentially consistent atau causally consistent? Jelaskan analisis Anda. (4 poin)' },
      { h: 'Contoh variasi', tabel: { head: ['Diagram', 'Sequential', 'Causal', 'Alasan'], rows: [
        ['P1 W(x)a; P2 W(x)b; P3 R(x)b R(x)a; P4 R(x)a R(x)b', 'Tidak', 'Ya', 'a dan b concurrent, boleh beda urutan'],
        ['P1 W(x)a; P2 R(x)a W(x)b; P3 R(x)b R(x)a; P4 R(x)a R(x)b', 'Tidak', 'Tidak', 'a → b kausal, P3 melihat b dulu'],
        ['P1 R(x)a W(x)c; P2 W(x)a W(x)b; P3 R(x)b R(x)c; P4 R(x)c R(x)b', 'Tidak', 'Ya', 'b dan c concurrent'],
        ['P1 W(x)a R(x)b; P2 W(x)b R(x)a; P3 R(x)a R(x)b', 'Tidak', 'Ya', 'P1 menuntut a sebelum b, P2 menuntut b sebelum a']] },
        soal: 'UTS 24/25 7a dan 7b: Apakah gambar sequentially consistent? Apakah causally consistent? (5 poin)',
        ingat: 'Lab Konsistensi menghasilkan diagram acak beserta pemeriksaan sequential.' },
      { h: 'Memilih model konsistensi', tabel: { head: ['Kasus', 'Model', 'Alasan'], rows: [
        ['Stock market, transfer saldo', 'Sequential (atau lebih kuat)', 'Urutan order dan transaksi harus sama di semua replika'],
        ['Komentar dan balasan', 'Causal', 'Balasan tidak boleh tampil sebelum komentar asli'],
        ['DNS, CDN', 'Eventual', 'Jarang diubah, boleh menyebar perlahan']] } }
    ]
  }
]);
