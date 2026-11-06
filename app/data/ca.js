// Komputasi Awan — bank soal per nomor kisi-kisi UTS 2026 (7 nomor).
// Kisi-kisi: 1 centralized/decentralized/distributed, skalabilitas, transparansi; 2 RESTful dan publish-subscribe;
// 3 container; 4 RPC; 5 logical clock dan vector clock; 6 teori dasar penamaan dan Chord; 7 sequential dan causal.
// Topik lama (election, multicast, fault tolerance, Mobile IP, TLP, dll.) dihapus atas permintaan pemilik.
// Topik baru memakai id u1..u7. Semua item berbentuk paket soal a/b/c dengan poin, sebagian besar soal cerita.
// Kunci hitungan dihitung dengan app/js/tools/clocks.js, chord.js, consistency.js.
(function () {
  var S = ' Kunci disusun sendiri — perlu dicek.';

  // ================= Soal 1 =================
  BANK.isian('ca', 'u1', '1. Sistem Terdistribusi', [
    { type: 'steps', q: 'Latihan UTS Soal No. 1: Sistem Terdistribusi (total 10 poin)',
      steps: [
        { q: 'a. Apa yang dimaksud sistem centralized, decentralized, dan distributed? Berikan satu contoh untuk masing-masing! (3 poin)',
          points: ['Centralized: satu titik pusat mengendalikan data dan keputusan; contoh sistem akademik di satu server',
            'Decentralized: kendali dibagi ke beberapa pusat lokal; contoh email, tiap domain punya mail server',
            'Distributed: tidak ada pusat, node setara bekerja sama dan tampak sebagai satu sistem; contoh P2P/blockchain, cluster',
            'Kelemahan centralized: single point of failure dan bottleneck'],
          model: 'Centralized berarti satu node pusat memegang data dan keputusan, misalnya sistem akademik di satu server; bila server mati, seluruh layanan berhenti. Decentralized membagi kendali ke beberapa pusat lokal, misalnya email yang setiap domainnya punya mail server sendiri. Distributed tidak punya pusat: node-node setara saling bekerja sama sehingga tampak sebagai satu sistem, misalnya jaringan blockchain.' },
        { q: 'b. Jelaskan definisi Distribution Transparency dan sebutkan tipe-tipenya! (4 poin)',
          points: ['Definisi: menyembunyikan fakta bahwa proses dan sumber daya tersebar secara fisik di banyak komputer',
            'Access, location, relocation, migration',
            'Replication, concurrency, failure',
            'Satu kalimat penjelasan untuk tiap tipe'],
          model: 'Distribution transparency adalah sifat sistem terdistribusi yang menyembunyikan dari pengguna bahwa proses dan sumber dayanya tersebar di banyak komputer, sehingga sistem tampak sebagai satu komputer. Tipenya: access (perbedaan representasi data dan cara akses), location (di mana objek berada), relocation (objek dipindah saat dipakai), migration (objek dipindah ke lokasi lain), replication (objek punya beberapa salinan), concurrency (objek dipakai bersama), dan failure (kegagalan dan pemulihan objek).' },
        { q: 'c. Apa yang dimaksud scalability? Uraikan salah satu dari size, geographical, atau administrative scalability beserta masalahnya! (3 poin)',
          points: ['Scalability: sistem tetap bekerja baik saat bertumbuh',
            'Size: menambah pengguna dan sumber daya; masalah komponen terpusat menjadi bottleneck',
            'Geographical: pengguna berjauhan; masalah latensi WAN',
            'Administrative: lintas organisasi; masalah kebijakan dan keamanan berbeda'],
          model: 'Scalability adalah kemampuan sistem tetap bekerja baik ketika ukuran, jarak, atau jumlah organisasinya bertambah. Contoh size scalability: sistem harus tetap cepat saat penggunanya naik dari ribuan ke jutaan. Masalahnya, server atau database terpusat menjadi bottleneck karena kapasitas CPU, storage, dan jaringannya terbatas.' }
      ],
      ex: 'Pola mengikuti UTS 25/26 nomor 1 dengan butir skalabilitas dari kisi-kisi 2026.' + S },
    { type: 'steps', q: 'Latihan UTS Soal No. 1: Sistem Terdistribusi (total 10 poin)',
      steps: [
        { q: 'a. Jelaskan definisi sistem terdistribusi dan sebutkan tiga karakteristik yang membedakannya dari sistem terpusat! (3 poin)',
          points: ['Kumpulan komputer otonom yang tampak bagi pengguna sebagai satu sistem yang koheren',
            'Tidak ada jam global (no global clock)',
            'Proses berkomunikasi lewat pesan melalui jaringan, bukan memori bersama',
            'Sumber daya dipakai bersama (sharing resource); kegagalan bisa terjadi sebagian (partial failure)'],
          model: 'Sistem terdistribusi adalah kumpulan elemen komputasi otonom yang tampak bagi penggunanya sebagai satu sistem yang koheren. Karakteristiknya: tidak ada jam global sehingga urutan kejadian harus disepakati, proses berkomunikasi dengan bertukar pesan lewat jaringan, dan sumber daya dipakai bersama oleh banyak pengguna. Selain itu, sebagian komponen bisa gagal tanpa mematikan seluruh sistem.' },
        { q: 'b. Size, geographical, dan administrative scalability: jelaskan ketiganya beserta satu masalah pada tiap dimensi! (4 poin)',
          points: ['Size: tambah pengguna/sumber daya; masalah bottleneck komponen terpusat',
            'Geographical: pengguna dan sumber daya berjauhan; masalah latensi, komunikasi synchronous lambat, jaringan WAN kurang andal',
            'Administrative: lintas domain organisasi; masalah kebijakan keamanan, biaya, dan manajemen bertentangan'],
          model: 'Size scalability berarti pengguna dan sumber daya mudah ditambah; masalahnya server atau database terpusat menjadi bottleneck. Geographical scalability berarti pengguna dan sumber daya boleh berjauhan; masalahnya latensi WAN membuat komunikasi request-reply synchronous lambat. Administrative scalability berarti sistem tetap mudah dikelola walau melintasi banyak organisasi; masalahnya kebijakan keamanan dan pengelolaan antar organisasi berbeda.' },
        { q: 'c. Sebutkan tiga teknik scaling dan beri satu contoh penerapan masing-masing! (3 poin)',
          points: ['Hiding communication latency: komunikasi asynchronous, contoh validasi form di sisi client',
            'Partitioning and distribution: contoh DNS dibagi menjadi zona',
            'Replication dan caching: contoh CDN, web cache'],
          model: 'Pertama, menyembunyikan latensi komunikasi dengan komunikasi asynchronous, misalnya form divalidasi di browser sebelum dikirim. Kedua, partisi dan distribusi, misalnya name space DNS dibagi ke banyak zona yang dikelola server berbeda. Ketiga, replikasi dan caching, misalnya CDN menaruh salinan konten dekat pengguna; konsekuensinya muncul masalah konsistensi.' }
      ],
      ex: 'Gabungan teori dasar dan skalabilitas (kisi-kisi nomor 1).' + S },
    { type: 'steps', q: 'Latihan UTS Soal No. 1 (dokumen SOAL): Sistem Terdistribusi',
      steps: [
        { q: 'a. Jelaskan sistem Shared Memory dan Private Memory pada parallel computing!',
          points: ['Shared memory (multiprocessor): semua CPU memakai satu ruang memori bersama, data dipertukarkan lewat baca/tulis memori',
            'Perlu sinkronisasi (lock/semaphore); bus dan memori menjadi bottleneck sehingga sulit diskalakan',
            'Private memory (multicomputer): tiap node punya memori sendiri, data dipertukarkan dengan message passing lewat jaringan',
            'Private memory mudah diskalakan sampai ribuan node, contoh cluster'],
          model: 'Pada shared memory, beberapa prosesor memakai satu memori fisik yang sama, sehingga data cukup ditulis satu prosesor lalu dibaca prosesor lain. Cara ini mudah diprogram tetapi butuh lock, dan bus memori menjadi bottleneck saat prosesor bertambah. Pada private memory, setiap komputer punya memori sendiri dan bertukar data dengan mengirim pesan lewat jaringan. Cara ini lebih sulit diprogram tetapi skalabel, contohnya cluster.' },
        { q: 'b. Jelaskan perbedaan client-server dan peer-to-peer!',
          points: ['Client-server: peran asimetris, server menyediakan layanan dan sumber daya, client meminta',
            'P2P: peran simetris, setiap peer sekaligus client dan server',
            'Client-server: server single point of failure dan bottleneck',
            'P2P: tidak ada titik gagal tunggal, sumber daya tersebar, tetapi data bisa tidak tersedia bila peer pemiliknya offline',
            'Contoh: web/email (client-server), BitTorrent (P2P)'],
          model: 'Pada client-server, perannya tidak setara: server memiliki dan mengelola sumber daya, client hanya meminta layanan. Akibatnya server menjadi titik gagal tunggal dan bisa menjadi bottleneck. Pada peer-to-peer, setiap peer setara, sekaligus meminta dan menyediakan layanan, dan sumber dayanya tersebar. Sistem tetap berjalan walau sebagian peer keluar, tetapi data bisa hilang sementara bila peer yang menyimpannya offline.' },
        { q: 'c. Isi bentuk sistem untuk topologi berikut.',
          fields: [
            { label: 'Semua client terhubung ke satu server pusat', a: ['centralized', 'tersentralisasi', 'terpusat'] },
            { label: 'Beberapa hub, tiap hub melayani node di sekitarnya', a: ['decentralized', 'terdesentralisasi', 'desentralisasi'] },
            { label: 'Tanpa hub, tiap node terhubung ke beberapa node lain', a: ['distributed', 'terdistribusi'] }],
          ex: 'Satu pusat, beberapa pusat, atau tanpa pusat.' }
      ],
      ex: 'Bagian teori dari dokumen SOAL; tiga sub-soal pertamanya sama dengan UTS 25/26 nomor 1.' + S },
    { type: 'steps', q: 'Latihan UTS Soal No. 1: Studi Kasus Toko Online (total 10 poin). Toko online "Belanjain" awalnya berjalan di satu server di Jakarta. Saat Harbolnas, jumlah pengunjung naik dari 5 ribu menjadi 2 juta orang, banyak pembeli dari Papua dan Malaysia mengeluh halaman lambat, dan Belanjain mulai bekerja sama dengan tiga perusahaan logistik yang punya sistem dan kebijakan keamanan sendiri.',
      steps: [
        { q: 'a. Masalah-masalah pada cerita di atas termasuk dimensi scalability yang mana? (3 poin)',
          fields: [
            { label: 'CPU dan database server Jakarta penuh karena 2 juta pengunjung', a: ['size', 'size scalability', 'ukuran'] },
            { label: 'Pembeli di Papua dan Malaysia mengalami halaman lambat', a: ['geographical', 'geographic', 'geographical scalability', 'geografis'] },
            { label: 'Integrasi dengan tiga perusahaan logistik yang kebijakannya berbeda', a: ['administrative', 'administrative scalability', 'administratif'] }],
          ex: 'Bottleneck komponen terpusat = size; jarak dan latensi = geographical; banyak organisasi = administrative.' },
        { q: 'b. Teknik scaling apa yang tepat untuk tiap usulan perbaikan berikut (hiding latency, partitioning, replication)? (3 poin)',
          fields: [
            { label: 'Gambar produk disalin ke server CDN di Makassar dan Kuala Lumpur', a: ['replication', 'replikasi', 'caching', 'replication caching'] },
            { label: 'Data pelanggan dibagi: A-M di server 1, N-Z di server 2', a: ['partitioning', 'partitioning and distribution', 'partisi', 'distribution'] },
            { label: 'Form alamat divalidasi di browser dan keranjang disimpan secara asynchronous', a: ['hiding latency', 'hiding communication latency', 'hide latency', 'asynchronous', 'menyembunyikan latensi'] },
            { label: 'Teknik yang menimbulkan masalah konsistensi stok', a: ['replication', 'replikasi', 'caching', 'replication caching'] }],
          ex: 'Tiga teknik scaling di buku van Steen: hide communication latencies, partitioning and distribution, replication. Replikasi membuat salinan stok bisa berbeda.' },
        { q: 'c. Belanjain berencana pindah dari sistem centralized ke sistem distributed. Jelaskan perbedaan keduanya dan apa untung-rugi perpindahan ini bagi Belanjain! (4 poin)',
          points: ['Centralized: satu server pusat memegang data dan keputusan; mudah dikelola tetapi single point of failure dan bottleneck',
            'Distributed: banyak node bekerja sama dan tampak sebagai satu sistem',
            'Untung: beban terbagi, tahan kegagalan satu server, bisa didekatkan ke pembeli di berbagai wilayah',
            'Rugi: koordinasi dan konsistensi data (stok, pembayaran) lebih sulit, biaya dan kompleksitas naik',
            'Pilihan tengah: decentralized, beberapa pusat regional'],
          model: 'Saat ini Belanjain centralized: satu server di Jakarta memegang semua data dan keputusan, sehingga mudah dikelola tetapi menjadi bottleneck dan bila server mati seluruh toko berhenti. Pada sistem distributed, banyak server di beberapa lokasi bekerja sama dan tampak bagi pembeli sebagai satu toko. Keuntungannya, beban 2 juta pengunjung terbagi, toko tetap jalan walau satu server gagal, dan server bisa diletakkan dekat pembeli. Kerugiannya, menjaga stok dan pembayaran tetap konsisten di banyak server jauh lebih sulit dan biayanya naik.' }
      ],
      ex: 'Soal cerita gabungan skalabilitas dan bentuk sistem (kisi-kisi nomor 1).' + S },
    { type: 'steps', q: 'Latihan UTS Soal No. 1: Studi Kasus Transparansi (total 10 poin). Kampus menyediakan layanan "KampusDrive". Mahasiswa cukup membuka drive.kampus.ac.id tanpa tahu servernya. File disimpan di tiga data center dan disalin ke dua server. Saat satu server rusak, mahasiswa tetap bisa mengunduh file. Pengguna Windows, Mac, dan Linux membuka file dengan cara yang sama, dan saat file dibuka, admin bisa memindahkannya ke server lain tanpa terputus.',
      steps: [
        { q: 'a. Jelaskan definisi distribution transparency! (2 poin)',
          points: ['Menyembunyikan fakta bahwa proses dan sumber daya tersebar secara fisik di banyak komputer',
            'Sistem tampak bagi pengguna sebagai satu komputer'],
          model: 'Distribution transparency adalah sifat sistem terdistribusi yang menyembunyikan dari pengguna dan aplikasi bahwa proses dan sumber dayanya tersebar secara fisik di banyak komputer yang terhubung jaringan, sehingga sistem tampak seperti satu komputer.' },
        { q: 'b. Tentukan jenis transparansi yang muncul pada cerita! (5 poin)',
          fields: [
            { label: 'Membuka drive.kampus.ac.id tanpa tahu letak server', a: ['location', 'location transparency', 'lokasi'] },
            { label: 'File disalin ke dua server', a: ['replication', 'replication transparency', 'replikasi'] },
            { label: 'Server rusak, file tetap bisa diunduh', a: ['failure', 'failure transparency', 'kegagalan'] },
            { label: 'Windows, Mac, dan Linux membuka file dengan cara sama', a: ['access', 'access transparency', 'akses'] },
            { label: 'File dipindah ke server lain saat sedang dibuka', a: ['relocation', 'relocation transparency', 'relokasi'] }],
          ex: 'Tujuh tipe di buku van Steen: access, location, relocation, migration, replication, concurrency, failure. Relocation = dipindah saat dipakai; migration = dipindah saat tidak dipakai.' },
        { q: 'c. Rektorat meminta KampusDrive "100% transparan". Apakah transparansi penuh selalu diinginkan? Jelaskan dengan contoh dari kasus ini! (3 poin)',
          points: ['Tidak selalu; transparansi penuh bisa mengorbankan performa',
            'Latensi ke data center jauh tidak bisa disembunyikan sepenuhnya',
            'Server lambat dan server mati sulit dibedakan, jadi failure transparency penuh sulit',
            'Menjaga dua salinan selalu identik mahal',
            'Kadang pengguna perlu tahu, mis. memilih server terdekat atau tahu file sedang dikunci'],
          model: 'Tidak selalu. Bila file berada di data center yang jauh, latensinya tetap terasa dan tidak bisa disembunyikan. Sistem juga sulit membedakan server yang lambat dari server yang mati, sehingga usaha menyembunyikan kegagalan bisa membuat mahasiswa menunggu lama. Menjaga dua salinan selalu identik butuh sinkronisasi mahal. Karena itu tingkat transparansi dipilih seimbang dengan performa (degree of transparency).' }
      ],
      ex: 'Soal cerita transparansi.' + S },
    { type: 'steps', q: 'Latihan UTS Soal No. 1: Studi Kasus Lab Riset (total 10 poin). Lab riset kampus punya dua mesin. Mesin X: 8 prosesor memakai satu RAM 256 GB bersama. Mesin Y: 32 komputer kecil, masing-masing punya RAM sendiri dan terhubung switch. Mahasiswa juga membandingkan aplikasi e-learning kampus (semua mahasiswa mengakses satu server) dengan aplikasi berbagi file BitTorrent.',
      steps: [
        { q: 'a. Lengkapi tabel berikut! (4 poin)',
          table: { head: ['Aspek', 'Mesin X', 'Mesin Y'], rows: [['Jenis memori', '(1)', '(2)'], ['Cara bertukar data', '(3)', '(4)']] },
          fields: [
            { label: '(1)', a: ['shared memory', 'multiprocessor', 'multiprosesor', 'memori bersama'] },
            { label: '(2)', a: ['private memory', 'multicomputer', 'multikomputer', 'distributed memory'] },
            { label: '(3)', a: ['baca tulis memori bersama', 'shared variable', 'memori bersama', 'read write memory'] },
            { label: '(4)', a: ['message passing', 'pengiriman pesan', 'pesan'] },
            { label: 'Mesin yang lebih mudah ditambah sampai ratusan node', a: ['y', 'mesin y', 'private memory', 'multicomputer'] }],
          ex: 'Shared memory dibatasi bus dan memori bersama; private memory skalabel karena tiap node punya memori sendiri.' },
        { q: 'b. Tentukan client-server atau P2P untuk pernyataan berikut! (2 poin)',
          fields: [
            { label: 'E-learning kampus', a: ['client server', 'client-server', 'cs', 'c-s'] },
            { label: 'BitTorrent', a: ['p2p', 'peer to peer', 'peer-to-peer'] },
            { label: 'Model yang berhenti total bila satu mesin utamanya mati', a: ['client server', 'client-server', 'cs', 'c-s'] },
            { label: 'Model di mana setiap node sekaligus client dan server', a: ['p2p', 'peer to peer', 'peer-to-peer'] }],
          ex: 'C-S terpusat dan asimetris; P2P terdesentralisasi dan simetris.' },
        { q: 'c. Jelaskan perbedaan mendasar shared memory dan private memory, lalu kaitkan dengan alasan sistem terdistribusi modern (cloud) memakai private memory! (4 poin)',
          points: ['Shared memory: semua CPU memakai satu memori, mudah diprogram, perlu lock',
            'Bus dan memori bersama menjadi bottleneck saat CPU bertambah',
            'Private memory: tiap node punya memori sendiri, bertukar pesan lewat jaringan',
            'Lebih sulit diprogram tetapi bisa diskalakan sampai ribuan node',
            'Cloud dan cluster tersusun dari banyak komputer terpisah, jadi memakai private memory'],
          model: 'Pada shared memory, seperti mesin X, semua prosesor membaca dan menulis memori yang sama sehingga mudah diprogram, tetapi butuh lock dan bus memori menjadi bottleneck bila prosesor bertambah. Pada private memory, seperti mesin Y, tiap komputer punya memori sendiri dan bertukar data dengan mengirim pesan. Cara ini lebih sulit diprogram tetapi bisa ditambah sampai ribuan node. Cloud tersusun dari ribuan server terpisah, sehingga secara alami memakai model private memory.' }
      ],
      ex: 'Bagian teori dokumen SOAL dalam bentuk cerita.' + S }
  ]);

  // ================= Soal 2 =================
  BANK.isian('ca', 'u2', '2. Arsitektur: RESTful & Publish-Subscribe', [
    { type: 'steps', q: 'Latihan UTS Soal No. 2: Arsitektur Sistem (total 10 poin)',
      steps: [
        { q: 'a. Apa yang dimaksud gaya arsitektur (architectural style)? Jelaskan istilah component, interface, dan connector! (3 poin)',
          points: ['Gaya arsitektur: cara komponen disusun, dihubungkan, dan bertukar data',
            'Component: unit modular dengan interface yang jelas dan dapat diganti',
            'Interface: kontrak layanan yang disediakan atau dibutuhkan komponen',
            'Connector: mekanisme komunikasi dan koordinasi antar komponen (RPC, pesan, stream)'],
          model: 'Gaya arsitektur menjelaskan bagaimana komponen disusun, dihubungkan, dan bertukar data. Component adalah unit modular yang menyediakan layanan lewat interface dan dapat diganti. Interface adalah kontrak yang menyatakan layanan yang disediakan dan dibutuhkan komponen. Connector adalah mekanisme yang menghubungkan komponen, misalnya RPC, message passing, atau streaming. Contoh gaya: layered, service-oriented (object-based dan RESTful), dan publish-subscribe.' },
        { q: 'b. Jelaskan RESTful architecture beserta karakteristik dan operasi dasarnya! (4 poin)',
          points: ['RESTful = resource-based architecture: sistem dipandang sebagai kumpulan sumber daya yang dikelola komponen',
            'Sumber daya diidentifikasi dengan satu skema penamaan (URI)',
            'Semua layanan memakai interface yang sama: PUT, GET, DELETE, POST',
            'Pesan dari/ke layanan menjelaskan dirinya sendiri (self-describing)',
            'Stateless: setelah operasi, server tidak menyimpan state client',
            'Contoh: Amazon S3, REST API berbasis HTTP'],
          model: 'RESTful (Representational State Transfer) memandang sistem terdistribusi sebagai kumpulan sumber daya. Karakteristiknya: setiap sumber daya diberi nama unik lewat URI; semua layanan memakai interface yang sama, yaitu PUT (membuat sumber daya), GET (membaca state), DELETE (menghapus), dan POST (mengubah dengan mengirim state baru); pesan bersifat self-describing; dan server stateless, tidak menyimpan informasi client di antara request. Contohnya Amazon S3 yang mengelola bucket dan object lewat HTTP.' },
        { q: 'c. Jelaskan cara kerja publish-subscribe architecture dan berikan contohnya! (3 poin)',
          points: ['Publisher menerbitkan event/notifikasi tanpa tahu siapa subscriber',
            'Subscriber mendaftarkan minat (subscription) pada topik atau isi tertentu',
            'Middleware/broker mencocokkan event dengan subscription lalu mengirimkannya',
            'Pihak-pihak referentially decoupled',
            'Contoh: MQTT pada IoT, Kafka, notifikasi aplikasi'],
          model: 'Pada publish-subscribe, publisher menerbitkan event tanpa mengetahui penerimanya. Subscriber mendaftarkan minatnya, misalnya pada topik "suhu/ruang1". Middleware atau broker mencocokkan event yang masuk dengan daftar subscription, lalu meneruskannya ke subscriber yang cocok. Karena pengirim dan penerima tidak saling mengenal, keduanya referentially decoupled. Contohnya sensor IoT yang mengirim data ke broker MQTT dan aplikasi dashboard yang berlangganan topik tersebut.' }
      ],
      ex: 'Pola soal nomor 2 tahun 2026: teori dasar, RESTful, publish-subscribe.' + S },
    { type: 'steps', q: 'Latihan UTS Soal No. 2: Koordinasi pada Publish-Subscribe (total 10 poin)',
      steps: [
        { q: 'a. Lengkapi tabel jenis koordinasi berikut! (4 poin)',
          table: { head: ['', 'Temporally coupled', 'Temporally decoupled'], rows: [['Referentially coupled', '(1)', '(2)'], ['Referentially decoupled', '(3)', '(4)']] },
          fields: [
            { label: '(1)', a: ['direct', 'direct coordination', 'langsung'] },
            { label: '(2)', a: ['mailbox', 'mailbox coordination'] },
            { label: '(3)', a: ['event based', 'event-based', 'event based coordination', 'publish subscribe'] },
            { label: '(4)', a: ['shared data space', 'shared dataspace', 'tuple space'] }],
          ex: 'Referentially decoupled = tidak perlu tahu identitas pihak lain. Temporally decoupled = tidak harus aktif bersamaan.' },
        { q: 'b. Jelaskan maksud referentially decoupled dan temporally decoupled, lalu berikan contoh untuk keempat jenis koordinasi! (4 poin)',
          points: ['Referentially decoupled: pengirim tidak perlu tahu identitas/alamat penerima',
            'Temporally decoupled: pengirim dan penerima tidak perlu aktif pada waktu yang sama',
            'Direct (coupled-coupled): telepon, RPC',
            'Mailbox (ref. coupled, temp. decoupled): email ke alamat tertentu',
            'Event-based (ref. decoupled, temp. coupled): MQTT tanpa retained message, notifikasi langsung',
            'Shared data space (keduanya decoupled): tuple space Linda/JavaSpaces, papan pengumuman'],
          model: 'Referentially decoupled berarti pihak yang berkomunikasi tidak perlu saling mengetahui identitas; temporally decoupled berarti keduanya tidak harus aktif bersamaan. Direct coordination terikat keduanya, contohnya panggilan telepon. Mailbox hanya terlepas secara waktu: email dikirim ke alamat tertentu dan dibaca kapan saja. Event-based hanya terlepas secara rujukan: subscriber MQTT yang online menerima event tanpa tahu publisher-nya. Shared data space terlepas keduanya: proses menaruh tuple ke ruang data bersama dan proses lain mengambilnya kapan saja tanpa tahu siapa penulisnya.' },
        { q: 'c. Sebutkan jenis subscription berdasarkan basisnya! (2 poin)',
          fields: [
            { label: 'Langganan berdasarkan nama/subjek event, mis. "berita/olahraga"', a: ['topic based', 'topic-based', 'subject based', 'subject-based'] },
            { label: 'Langganan berdasarkan nilai atribut event, mis. harga > 100', a: ['content based', 'content-based', 'attribute based'] },
            { label: 'Langganan berdasarkan tipe/kelas objek event', a: ['type based', 'type-based'] }],
          ex: 'Topic-based paling sederhana; content-based paling ekspresif tetapi pencocokannya mahal.' }
      ],
      ex: 'Tabel koordinasi buku van Steen; basis subscription topic/content/type.' + S },
    { type: 'steps', q: 'Latihan UTS Soal No. 2: Studi Kasus RESTful (total 10 poin)',
      steps: [
        { q: 'a. Layanan penyimpanan foto memakai RESTful API di https://foto.id/albums/. Menurut tabel operasi REST di buku, operasi apa yang dipakai? (4 poin)',
          fields: [
            { label: 'Membuat album baru /albums/liburan', a: ['put'] },
            { label: 'Menampilkan isi album /albums/liburan', a: ['get'] },
            { label: 'Menghapus foto /albums/liburan/1.jpg', a: ['delete'] },
            { label: 'Mengubah judul album dengan mengirim state baru', a: ['post'] }],
          ex: 'Tabel buku: PUT = create a new resource, GET = retrieve the state, DELETE = delete, POST = modify by transferring a new state. Di praktik HTTP banyak API memakai POST untuk membuat dan PUT/PATCH untuk mengubah; sebutkan konvensi yang dipakai.' },
        { q: 'b. Mengapa REST disebut stateless dan apa keuntungannya bagi skalabilitas? (3 poin)',
          points: ['Server tidak menyimpan state sesi client di antara request',
            'Setiap request membawa semua informasi yang diperlukan (self-describing)',
            'Request bisa dilayani server mana pun, mudah load balancing dan replikasi',
            'Kegagalan server tidak menghilangkan sesi; mudah di-cache'],
          model: 'REST disebut stateless karena setelah menjalankan operasi, server tidak menyimpan informasi tentang client. Setiap request membawa semua data yang diperlukan. Akibatnya request berikutnya bisa dilayani server mana pun, sehingga load balancing, replikasi, dan caching mudah dilakukan dan sistem mudah diskalakan.' },
        { q: 'c. Bandingkan RESTful dan publish-subscribe: kapan masing-masing cocok dipakai? (3 poin)',
          points: ['REST: request-reply, client tahu alamat sumber daya (referentially coupled), synchronous',
            'Cocok untuk operasi CRUD pada data, contoh aplikasi web/mobile ke backend',
            'Pub-sub: event dikirim ke banyak penerima yang tidak dikenal (decoupled), umumnya asynchronous',
            'Cocok untuk notifikasi dan aliran data real-time, contoh IoT, chat, harga saham'],
          model: 'RESTful bekerja dengan pola request-reply: client mengetahui URI sumber daya dan menunggu balasan, sehingga cocok untuk operasi membaca dan mengubah data, misalnya aplikasi mobile ke backend toko daring. Publish-subscribe mengirim event ke banyak penerima yang tidak dikenal publisher, umumnya secara asynchronous, sehingga cocok untuk notifikasi dan data real-time seperti sensor IoT atau harga saham.' }
      ],
      ex: 'Studi kasus RESTful dan perbandingan dua gaya arsitektur.' + S },
    { type: 'steps', q: 'Latihan UTS Soal No. 2: Studi Kasus Ojek Online (total 10 poin). Aplikasi "OjekKu" punya backend RESTful di https://api.ojekku.id. Penumpang membuat pesanan, melihat status pesanan, dan membatalkan pesanan lewat API ini. Selain itu, setiap driver mengirim lokasi GPS tiap 3 detik ke broker MQTT pada topik "lokasi/driver/{id}", dan aplikasi penumpang berlangganan topik driver yang sedang menjemputnya.',
      steps: [
        { q: 'a. Menurut tabel operasi REST di buku van Steen, operasi apa yang dipakai? (3 poin)',
          fields: [
            { label: 'Membuat pesanan baru /orders/771', a: ['put'] },
            { label: 'Melihat status pesanan /orders/771', a: ['get'] },
            { label: 'Membatalkan pesanan /orders/771', a: ['delete'] },
            { label: 'Mengubah titik jemput dengan mengirim state baru', a: ['post'] }],
          ex: 'Tabel buku: PUT = create, GET = retrieve, DELETE = delete, POST = modify by transferring a new state. Praktik HTTP sering memakai POST untuk membuat dan PUT/PATCH untuk mengubah; sebutkan konvensi yang dipakai.' },
        { q: 'b. Pada pengiriman lokasi driver, siapa publisher, siapa subscriber, dan apa basis subscription-nya? (3 poin)',
          fields: [
            { label: 'Publisher', a: ['driver', 'aplikasi driver', 'hp driver'] },
            { label: 'Subscriber', a: ['penumpang', 'aplikasi penumpang'] },
            { label: 'Perantara yang mencocokkan event', a: ['broker', 'broker mqtt', 'mqtt broker', 'middleware'] },
            { label: 'Basis subscription', a: ['topic based', 'topic-based', 'subject based', 'topik'] }],
          ex: 'Driver menerbitkan ke topik, penumpang berlangganan topik itu, broker meneruskan. Langganan berdasarkan nama topik = topic-based.' },
        { q: 'c. Mengapa lokasi driver dikirim lewat publish-subscribe, bukan dengan aplikasi penumpang memanggil GET ke REST API setiap 3 detik? Jelaskan! (4 poin)',
          points: ['Polling GET tiap 3 detik dari jutaan penumpang membebani server, banyak request sia-sia',
            'Pub-sub mendorong (push) event hanya saat ada data baru',
            'Driver tidak perlu tahu siapa penumpangnya (referentially decoupled)',
            'Asynchronous: driver tidak menunggu balasan',
            'Mudah diskalakan: banyak subscriber pada satu topik; REST tetap dipakai untuk CRUD pesanan'],
          model: 'Bila setiap penumpang memanggil GET tiap 3 detik, server menerima jutaan request yang sebagian besar tidak membawa data baru. Dengan publish-subscribe, driver cukup menerbitkan lokasinya ke broker, lalu broker mendorong event itu ke penumpang yang berlangganan. Driver tidak perlu tahu siapa penumpangnya dan tidak menunggu balasan, sehingga sistem lebih ringan dan mudah diskalakan. REST tetap cocok untuk operasi pesanan yang bersifat request-reply.' }
      ],
      ex: 'Soal cerita gabungan RESTful dan publish-subscribe.' + S },
    { type: 'steps', q: 'Latihan UTS Soal No. 2: Studi Kasus Kebun Pintar (total 10 poin). Kebun pintar milik kampus memakai beberapa cara komunikasi: (1) petugas menelepon teknisi dan keduanya harus sedang aktif; (2) sistem mengirim email laporan harian ke alamat kepala kebun yang dibaca keesokan harinya; (3) sensor kelembapan menerbitkan event ke broker dan hanya dashboard yang sedang online yang menerimanya; (4) sensor menaruh data ke tuple space, lalu proses analitik mengambilnya kapan saja tanpa tahu sensor mana yang menulis.',
      steps: [
        { q: 'a. Tentukan jenis koordinasi untuk keempat cara komunikasi pada cerita! (4 poin)',
          fields: [
            { label: '(1) Telepon petugas-teknisi', a: ['direct', 'direct coordination', 'langsung'] },
            { label: '(2) Email laporan harian', a: ['mailbox', 'mailbox coordination'] },
            { label: '(3) Event sensor ke dashboard online', a: ['event based', 'event-based', 'event based coordination', 'publish subscribe'] },
            { label: '(4) Tuple space', a: ['shared data space', 'shared dataspace', 'tuple space'] }],
          ex: 'Tanyakan dua hal: perlu tahu identitas pihak lain (referential)? perlu aktif bersamaan (temporal)?' },
        { q: 'b. Jelaskan maksud referentially decoupled dan temporally decoupled, lalu tunjukkan cara mana pada cerita yang terlepas pada keduanya! (3 poin)',
          points: ['Referentially decoupled: pengirim tidak perlu tahu identitas/alamat penerima',
            'Temporally decoupled: pengirim dan penerima tidak harus aktif bersamaan',
            'Cara (4) tuple space terlepas pada keduanya',
            'Cara (2) hanya temporally decoupled; cara (3) hanya referentially decoupled'],
          model: 'Referentially decoupled berarti pihak yang berkomunikasi tidak perlu mengetahui identitas satu sama lain. Temporally decoupled berarti keduanya tidak harus aktif pada waktu yang sama. Pada cerita, tuple space (4) terlepas pada keduanya: sensor tidak tahu siapa pembacanya dan data tetap tersimpan sampai diambil. Email (2) hanya terlepas secara waktu karena alamat penerima harus diketahui, sedangkan event broker (3) hanya terlepas secara rujukan karena dashboard harus sedang online.' },
        { q: 'c. Kampus ingin dashboard yang sedang offline tetap menerima event sensor setelah online kembali. Apa yang harus diubah pada broker, dan dimensi decoupling apa yang bertambah? Jelaskan tiga dimensi decoupling publish-subscribe! (3 poin)',
          points: ['Broker harus menyimpan event (persisten/retained) sampai subscriber mengambilnya',
            'Bertambah time (temporal) decoupling',
            'Space (referential) decoupling: publisher dan subscriber tidak saling mengenal',
            'Synchronization decoupling: publisher tidak diblokir, subscriber diberi tahu secara asynchronous'],
          model: 'Broker harus menyimpan event sampai dashboard mengambilnya, misalnya dengan antrean persisten atau retained message. Dengan begitu bertambah time decoupling karena sensor dan dashboard tidak harus aktif bersamaan. Tiga dimensi decoupling publish-subscribe adalah space decoupling (tidak saling mengenal), time decoupling (tidak harus aktif bersamaan), dan synchronization decoupling (publisher tidak menunggu dan subscriber menerima secara asynchronous).' }
      ],
      ex: 'Tabel koordinasi buku van Steen dalam bentuk cerita.' + S },
    { type: 'steps', q: 'Latihan UTS Soal No. 2: Studi Kasus Bursa Saham (total 10 poin). Aplikasi investasi "SahamKu" punya tiga bagian: (1) data akun dan portofolio dikelola lewat RESTful API; (2) harga saham dikirim ke ribuan aplikasi pengguna lewat publish-subscribe; (3) protokol jaringannya tersusun berlapis dari aplikasi sampai TCP/IP. Seorang pengguna hanya ingin diberi tahu saat harga saham BBCA di atas Rp9.000.',
      steps: [
        { q: 'a. Tentukan gaya arsitektur untuk bagian berikut (layered, object-based, resource-based, publish-subscribe)! (3 poin)',
          fields: [
            { label: '(1) Akun dan portofolio lewat GET/PUT/DELETE pada URI', a: ['resource based', 'resource-based', 'rest', 'restful'] },
            { label: '(2) Harga saham ke ribuan aplikasi', a: ['publish subscribe', 'publish-subscribe', 'pub sub', 'event based', 'event-based'] },
            { label: '(3) Tumpukan protokol aplikasi sampai TCP/IP', a: ['layered', 'berlapis', 'layered architecture'] }],
          ex: 'Object-based dan resource-based termasuk service-oriented architecture.' },
        { q: 'b. Sebutkan empat karakteristik RESTful architecture dan tunjukkan penerapannya pada API akun SahamKu! (4 poin)',
          points: ['Sumber daya diberi nama dengan satu skema penamaan (URI), mis. /accounts/55/portfolio',
            'Semua layanan memakai interface yang sama: PUT, GET, DELETE, POST',
            'Pesan self-describing, mis. JSON dengan tipe konten jelas',
            'Stateless: server tidak menyimpan state client di antara request; setiap request membawa token dan data lengkap'],
          model: 'Pertama, setiap sumber daya diberi nama lewat satu skema penamaan, misalnya /accounts/55/portfolio. Kedua, semua layanan memakai interface yang sama, yaitu PUT, GET, DELETE, dan POST. Ketiga, pesan bersifat self-describing, misalnya berformat JSON dengan tipe konten jelas. Keempat, server stateless: setelah melayani request, server tidak menyimpan state pengguna, sehingga setiap request membawa token dan data lengkap dan bisa dilayani server mana pun.' },
        { q: 'c. Notifikasi "BBCA di atas Rp9.000" memakai basis subscription apa? Bandingkan dengan topic-based dan sebutkan satu tantangannya! (3 poin)',
          points: ['Content-based: syarat atas nilai atribut event (harga > 9000)',
            'Topic-based: berlangganan semua event pada topik, mis. "saham/BBCA", lalu menyaring sendiri',
            'Content-based lebih ekspresif dan hemat bandwidth bagi subscriber',
            'Tantangan: pencocokan predikat di broker mahal dan sulit diskalakan saat event dan subscription sangat banyak'],
          model: 'Notifikasi itu memakai content-based subscription karena syaratnya atas nilai atribut event, yaitu harga di atas Rp9.000. Pada topic-based, pengguna berlangganan seluruh event topik "saham/BBCA" dan harus menyaring sendiri. Content-based lebih ekspresif, tetapi broker harus memeriksa predikat setiap subscription untuk setiap event harga, sehingga pencocokannya mahal saat event dan pengguna sangat banyak.' }
      ],
      ex: 'Soal cerita gaya arsitektur, RESTful, dan basis subscription.' + S }
  ]);

  // ================= Soal 3 =================
  BANK.isian('ca', 'u3', '3. Proses & Container', [
    { type: 'steps', q: 'Latihan UTS Soal No. 3: Proses (total 10 poin)',
      steps: [
        { q: 'a. Jelaskan perbedaan proses dan thread (minimal dua)! (3 poin)',
          points: ['Proses punya address space sendiri; thread berbagi address space proses',
            'Membuat dan berpindah antar proses mahal; thread ringan',
            'Proses berkomunikasi lewat IPC; thread lewat variabel bersama sehingga perlu sinkronisasi',
            'Proses terisolasi; crash satu thread bisa mematikan seluruh proses'],
          model: 'Proses adalah program yang sedang berjalan dengan address space sendiri, sedangkan thread adalah alur eksekusi di dalam proses yang berbagi memori dengan thread lain. Membuat proses dan context switch antar proses mahal, sedangkan thread ringan. Proses berkomunikasi lewat IPC, thread cukup lewat variabel bersama tetapi perlu sinkronisasi.' },
        { q: 'b. Apa yang dimaksud container? Jelaskan cara kerjanya dan berikan contoh teknologinya! (4 poin)',
          points: ['Container: virtualisasi level OS yang mengemas aplikasi beserta library dan dependensinya',
            'Semua container berbagi kernel OS host',
            'Isolasi memakai namespaces (proses, jaringan, file system terlihat terpisah)',
            'Pembatasan sumber daya memakai cgroups (CPU, memori)',
            'Image berlapis (union file system) menjadi dasar container',
            'Contoh: Docker, Podman, LXC; diorkestrasi Kubernetes'],
          model: 'Container adalah unit virtualisasi tingkat sistem operasi yang mengemas aplikasi bersama library dan konfigurasinya agar berjalan sama di mana pun. Container tidak membawa OS sendiri, melainkan berbagi kernel host. Kernel memisahkan container lewat namespaces sehingga tiap container melihat proses, jaringan, dan file system-nya sendiri, dan membatasi pemakaian CPU serta memori lewat cgroups. Container dijalankan dari image berlapis. Contohnya Docker dan Podman, dan banyak container dikelola dengan Kubernetes.' },
        { q: 'c. Sebutkan kelebihan dan kekurangan container dibanding virtual machine! (3 poin)',
          points: ['Kelebihan: ringan (MB), start dalam detik, overhead kecil',
            'Kelebihan: portabel (build once, run anywhere), cocok microservices dan CI/CD, kepadatan tinggi per server',
            'Kekurangan: isolasi lebih lemah karena kernel dipakai bersama',
            'Kekurangan: tidak bisa menjalankan OS/kernel berbeda (container Linux butuh kernel Linux)',
            'Kekurangan: celah kernel berdampak ke semua container'],
          model: 'Kelebihan container: ukurannya kecil, start dalam hitungan detik, overhead rendah sehingga satu server bisa menjalankan banyak container, dan portabel karena image yang sama berjalan di laptop maupun cloud. Kekurangannya: isolasinya lebih lemah daripada VM karena semua container berbagi satu kernel, celah keamanan kernel memengaruhi semua container, dan container tidak bisa menjalankan OS dengan kernel berbeda.' }
      ],
      ex: 'Pola soal nomor 3 tahun 2026: teori dasar proses dan container (Docker).' + S },
    { type: 'steps', q: 'Latihan UTS Soal No. 3: Container dan Virtual Machine (total 10 poin)',
      steps: [
        { q: 'a. Lengkapi tabel perbandingan berikut! (4 poin)',
          table: { head: ['Aspek', 'Container', 'Virtual machine'], rows: [['Yang divirtualisasi', '(1)', '(2)'], ['Lapisan pengelola', 'Container engine', '(3)'], ['Waktu start', '(4)', 'Menit']] },
          fields: [
            { label: '(1)', a: ['sistem operasi', 'os', 'level os', 'operating system'] },
            { label: '(2)', a: ['hardware', 'perangkat keras', 'mesin'] },
            { label: '(3)', a: ['hypervisor', 'vmm', 'virtual machine monitor'] },
            { label: '(4)', a: ['detik', 'seconds', 'hitungan detik', 'milidetik'] }],
          ex: 'Container = virtualisasi OS di atas satu kernel; VM = virtualisasi hardware lewat hypervisor dengan OS tamu lengkap.' },
        { q: 'b. Istilah Docker. Isi namanya. (3 poin)',
          fields: [
            { label: 'Berkas teks berisi instruksi membangun image', a: ['dockerfile'] },
            { label: 'Template read-only berlapis untuk menjalankan container', a: ['image', 'docker image'] },
            { label: 'Tempat menyimpan dan membagikan image, mis. Docker Hub', a: ['registry', 'docker registry', 'repository'] },
            { label: 'Instance image yang sedang berjalan', a: ['container', 'kontainer'] }],
          ex: 'Alur: Dockerfile → docker build → image → docker push ke registry → docker run menjadi container.' },
        { q: 'c. Pilih container atau VM untuk kebutuhan berikut. (3 poin)',
          fields: [
            { label: 'Menjalankan Windows Server di atas host Linux', a: ['vm', 'virtual machine', 'mesin virtual'] },
            { label: 'Deploy 50 microservice kecil yang sering di-update', a: ['container', 'kontainer'] },
            { label: 'Menguji malware dengan isolasi sekuat mungkin', a: ['vm', 'virtual machine', 'mesin virtual'] },
            { label: 'Lingkungan pengembangan yang sama untuk semua anggota tim', a: ['container', 'kontainer'] }],
          ex: 'OS berbeda dan isolasi kuat → VM; ringan, cepat, dan portabel → container.' }
      ],
      ex: 'Perbandingan container dan VM.' + S },
    { type: 'steps', q: 'Latihan UTS Soal No. 3: Studi Kasus Deploy Aplikasi (total 10 poin). Tim mahasiswa membuat aplikasi presensi berbasis Python. Di laptop Andi aplikasinya jalan, tetapi di laptop Budi dan di server kampus gagal karena versi library berbeda. Dosen menyarankan memakai Docker: aplikasi dikemas dalam image, diunggah ke Docker Hub, lalu dijalankan di server kampus.',
      steps: [
        { q: 'a. Jelaskan alur yang harus dilakukan tim dari menulis Dockerfile sampai aplikasi berjalan sebagai container di server kampus! (4 poin)',
          points: ['Tulis Dockerfile: base image (FROM python), salin kode (COPY), instal library (RUN pip install), perintah awal (CMD)',
            'docker build membuat image berlapis',
            'docker push mengunggah image ke registry (Docker Hub)',
            'Di server: docker pull mengunduh image',
            'docker run membuat dan menjalankan container dari image',
            'Docker daemon mengelola image dan container'],
          model: 'Tim menulis Dockerfile berisi base image Python, perintah menyalin kode, menginstal library dengan versi tertentu, dan perintah menjalankan aplikasi. Perintah docker build mengubah Dockerfile menjadi image berlapis. Image diunggah ke Docker Hub dengan docker push. Di server kampus, admin menjalankan docker pull lalu docker run sehingga image menjadi container yang berjalan. Semua perintah diproses Docker daemon.' },
        { q: 'b. Isi istilah Docker dan mekanisme kernel yang dipakai pada cerita! (3 poin)',
          fields: [
            { label: 'Template read-only berisi aplikasi presensi dan library-nya', a: ['image', 'docker image'] },
            { label: 'Docker Hub termasuk jenis ...', a: ['registry', 'docker registry', 'repository'] },
            { label: 'Mekanisme kernel agar container melihat proses dan jaringannya sendiri', a: ['namespace', 'namespaces'] },
            { label: 'Mekanisme kernel untuk membatasi CPU dan memori container', a: ['cgroups', 'cgroup', 'control groups', 'control group'] }],
          ex: 'Namespaces = isolasi pandangan, cgroups = batas sumber daya, image = template berlapis, registry = tempat menyimpan image.' },
        { q: 'c. Mengapa masalah "jalan di laptop Andi, gagal di laptop Budi" selesai dengan container? Sebutkan juga satu kekurangan container yang perlu diwaspadai tim! (3 poin)',
          points: ['Container mengemas aplikasi bersama library dan konfigurasinya',
            'Image yang sama berjalan sama di laptop mana pun dan di server (portabel)',
            'Tidak bergantung pada library yang terpasang di host',
            'Kekurangan: berbagi kernel host, isolasi lebih lemah daripada VM, celah kernel berdampak ke semua container'],
          model: 'Container mengemas aplikasi bersama semua library dan konfigurasinya dalam satu image, sehingga lingkungan di laptop Andi, laptop Budi, dan server kampus menjadi sama. Aplikasi tidak lagi bergantung pada library yang terpasang di host. Kekurangannya, semua container berbagi kernel host sehingga isolasinya lebih lemah daripada virtual machine.' }
      ],
      ex: 'Soal cerita container (kisi-kisi nomor 3, tanpa hitungan).' + S },
    { type: 'steps', q: 'Latihan UTS Soal No. 3: Studi Kasus Migrasi Server (total 10 poin). Sebuah perusahaan menjalankan 20 virtual machine di VMware ESXi. Setiap VM berisi Ubuntu lengkap hanya untuk menjalankan satu layanan kecil, butuh 2 menit untuk menyala, dan memakan 4 GB RAM. Manajer IT ingin memindahkan sebagian layanan ke container, tetapi satu aplikasi akuntansi lama hanya bisa berjalan di Windows Server.',
      steps: [
        { q: 'a. Jelaskan definisi virtual machine dan container beserta contoh teknologinya! (3 poin)',
          points: ['VM: virtualisasi hardware lewat hypervisor; tiap VM punya OS tamu lengkap',
            'Contoh VM: VMware ESXi, VirtualBox, KVM, Hyper-V',
            'Container: virtualisasi level OS; berbagi kernel host, isolasi via namespaces dan cgroups',
            'Contoh container: Docker, Podman, LXC'],
          model: 'Virtual machine meniru satu komputer lengkap di atas hypervisor, sehingga setiap VM menjalankan OS tamu sendiri; contohnya VMware ESXi dan VirtualBox. Container hanya memvirtualisasi lingkungan OS: aplikasi dan dependensinya dijalankan sebagai proses terisolasi yang berbagi kernel host; contohnya Docker dan Podman.' },
        { q: 'b. Jawab pertanyaan berikut berdasarkan cerita! (4 poin)',
          fields: [
            { label: 'VMware ESXi termasuk hypervisor tipe ...', a: ['1', 'tipe 1', 'type 1', 'native', 'bare metal'] },
            { label: 'Layanan kecil berbasis Linux sebaiknya dipindah ke ...', a: ['container', 'kontainer'] },
            { label: 'Aplikasi akuntansi Windows Server di host Linux tetap memakai ...', a: ['vm', 'virtual machine', 'mesin virtual'] },
            { label: 'Perkiraan waktu start container', a: ['detik', 'seconds', 'hitungan detik', 'milidetik'] }],
          ex: 'ESXi berjalan langsung di hardware (tipe 1). Container tidak bisa menjalankan kernel berbeda, jadi Windows Server di host Linux tetap butuh VM.' },
        { q: 'c. Jelaskan keuntungan yang didapat perusahaan setelah pindah ke container dan risiko yang muncul! (3 poin)',
          points: ['Tidak ada OS tamu per layanan: RAM dan disk jauh lebih hemat',
            'Start dalam detik, mudah menambah instance saat beban naik',
            'Lebih banyak layanan per server (kepadatan tinggi), cocok microservices dan CI/CD',
            'Risiko: isolasi lebih lemah karena kernel dipakai bersama; celah kernel berdampak ke semua container'],
          model: 'Setelah pindah ke container, setiap layanan tidak lagi membawa Ubuntu lengkap, sehingga pemakaian RAM dan disk turun dan satu server bisa menjalankan jauh lebih banyak layanan. Container menyala dalam hitungan detik sehingga mudah menambah instance saat beban naik. Risikonya, semua container berbagi satu kernel, sehingga isolasinya lebih lemah dan satu celah kernel bisa berdampak ke semua layanan.' }
      ],
      ex: 'Soal cerita perbandingan VM dan container.' + S },
    { type: 'steps', q: 'Latihan UTS Soal No. 3: Studi Kasus Server KRS (total 10 poin). Saat masa KRS, 15 ribu mahasiswa membuka server KRS bersamaan. Versi lama server memproses satu request sampai selesai, termasuk menunggu database, sehingga mahasiswa lain antre. Versi baru memakai satu dispatcher thread dan banyak worker thread, dan dijalankan dalam beberapa container yang jumlahnya ditambah otomatis saat beban naik.',
      steps: [
        { q: 'a. Jelaskan perbedaan proses dan thread! (3 poin)',
          points: ['Proses punya address space sendiri; thread berbagi address space proses',
            'Membuat dan context switch proses mahal; thread ringan',
            'Proses berkomunikasi lewat IPC; thread lewat variabel bersama sehingga perlu sinkronisasi'],
          model: 'Proses adalah program yang sedang berjalan dengan address space sendiri, sedangkan thread adalah alur eksekusi di dalam proses yang berbagi memori dengan thread lain. Membuat dan berpindah antar proses mahal, sedangkan thread ringan. Proses berkomunikasi lewat IPC, sedangkan thread cukup lewat variabel bersama tetapi perlu sinkronisasi.' },
        { q: 'b. Mengapa versi baru server KRS (dispatcher/worker) bisa melayani lebih banyak mahasiswa dibanding versi lama? (4 poin)',
          points: ['Versi lama single-thread: saat menunggu database (blocking I/O), seluruh server berhenti',
            'Dispatcher menerima request lalu menyerahkannya ke worker thread',
            'Saat satu worker menunggu database, worker lain tetap melayani',
            'Memanfaatkan banyak core; thread lebih ringan daripada proses'],
          model: 'Versi lama memproses satu request sampai selesai. Saat menunggu database, server diam dan mahasiswa lain antre. Pada versi baru, dispatcher hanya menerima request dan menyerahkannya ke worker thread. Bila satu worker menunggu database, worker lain tetap melayani mahasiswa lain, dan beberapa core CPU dipakai bersamaan.' },
        { q: 'c. Mengapa virtualisasi dengan container membantu server KRS menghadapi lonjakan saat masa KRS? (3 poin)',
          points: ['Container ringan dan start dalam detik',
            'Instance bisa ditambah otomatis (autoscaling) saat beban naik dan dikurangi setelahnya',
            'Image sama di semua instance sehingga perilakunya seragam',
            'Satu server fisik dibagi untuk banyak instance, sumber daya lebih efisien'],
          model: 'Container ringan dan bisa dinyalakan dalam hitungan detik dari image yang sama, sehingga saat masa KRS jumlah instance server bisa ditambah otomatis dan dikurangi lagi setelah lonjakan selesai. Setiap instance berperilaku sama karena berasal dari image yang sama, dan beberapa instance bisa berbagi satu server fisik sehingga sumber daya lebih efisien.' }
      ],
      ex: 'Soal cerita proses, thread, dan container.' + S }
  ]);

  // ================= Soal 4 =================
  BANK.isian('ca', 'u4', '4. Komunikasi & RPC', [
    { type: 'steps', q: 'Latihan UTS Soal No. 4: Komunikasi (total 10 poin)',
      steps: [
        { q: 'a. Sebutkan dan jelaskan tipe-tipe komunikasi (transient/persistent, synchronous/asynchronous) beserta contohnya! (4 poin)',
          points: ['Persistent: pesan disimpan middleware sampai diterima; contoh email, message queue',
            'Transient: pesan hilang jika penerima tidak aktif; contoh UDP, RPC',
            'Synchronous: pengirim diblokir (sampai submit, delivery, atau response)',
            'Asynchronous: pengirim langsung lanjut',
            'Kombinasi: persistent async (email), transient sync (RPC), transient async (UDP)'],
          model: 'Persistent communication berarti pesan disimpan middleware sampai diambil penerima, misalnya email. Transient communication berarti pesan hanya disimpan selama pengirim dan penerima berjalan, misalnya datagram UDP. Synchronous berarti pengirim menunggu, sampai pesan diterima middleware, sampai di penerima, atau sampai diproses; asynchronous berarti pengirim langsung melanjutkan. Kombinasinya misalnya email (persistent asynchronous) dan RPC (transient synchronous).' },
        { q: 'b. Jelaskan cara kerja Remote Procedure Call (RPC) langkah demi langkah! (4 poin)',
          points: ['Client memanggil client stub seperti prosedur lokal',
            'Client stub membungkus parameter ke pesan (marshalling) dan memanggil OS lokal',
            'OS client mengirim pesan ke OS server',
            'OS server menyerahkan pesan ke server stub',
            'Server stub membuka pesan (unmarshalling) dan memanggil prosedur server',
            'Server menjalankan prosedur dan mengembalikan hasil ke server stub',
            'Server stub membungkus hasil, OS server mengirim ke OS client',
            'Client stub membuka hasil dan mengembalikannya ke client'],
          model: 'Client memanggil prosedur seolah lokal, padahal yang dipanggil adalah client stub. Client stub membungkus nama prosedur dan parameter menjadi pesan (marshalling) lalu meminta OS mengirimnya ke server. Di server, OS menyerahkan pesan ke server stub, yang membuka pesan (unmarshalling) dan memanggil prosedur sebenarnya. Hasilnya dibungkus server stub, dikirim kembali, lalu dibuka client stub dan diserahkan ke client. Selama itu client menunggu.' },
        { q: 'c. RPC biasa termasuk tipe komunikasi apa? Jelaskan! (2 poin)',
          fields: [
            { label: 'Tipe komunikasi RPC biasa', a: ['transient synchronous', 'transient sync', 'transien sinkron'] },
            { label: 'Titik sinkronisasi RPC (client diblokir sampai ...)', a: ['response', 'setelah diproses', 'after processing', 'balasan diterima', 'response based'] }],
          ex: 'RPC biasa: pesan tidak disimpan middleware dan client menunggu sampai server selesai memproses.' }
      ],
      ex: 'Pola soal nomor 4 tahun 2026: teori dasar komunikasi dan RPC.' + S },
    { type: 'steps', q: 'Latihan UTS Soal No. 4: RPC (total 10 poin)',
      steps: [
        { q: 'a. Apa fungsi client stub dan server stub? Apa yang dimaksud marshalling? (3 poin)',
          points: ['Client stub: wakil prosedur remote di sisi client, membungkus parameter dan mengirim pesan',
            'Server stub: menerima pesan, membuka parameter, memanggil prosedur server, mengirim hasil',
            'Marshalling: mengemas parameter ke format pesan yang bisa dikirim lewat jaringan',
            'Unmarshalling: kebalikannya',
            'Stub dibuat otomatis dari interface (IDL)'],
          model: 'Client stub berperan sebagai pengganti prosedur remote di sisi client: ia membungkus parameter ke pesan dan mengirimnya. Server stub ada di sisi server: menerima pesan, membuka parameter, memanggil prosedur sebenarnya, lalu mengirim hasil. Marshalling adalah proses mengemas parameter menjadi urutan byte dalam format yang disepakati, dan unmarshalling adalah kebalikannya. Stub biasanya dibangkitkan dari definisi interface (IDL).' },
        { q: 'b. Jelaskan masalah parameter passing pada RPC! (4 poin)',
          points: ['Representasi data berbeda: little endian vs big endian, kode karakter',
            'Solusi: format standar/IDL (mis. XDR, JSON, protobuf)',
            'Pass-by-reference/pointer tidak bermakna di mesin lain karena address space berbeda',
            'Solusi: copy/restore (salin nilai, kirim balik setelah selesai) atau larang pointer',
            'Struktur data kompleks (graf, linked list) sulit dikirim'],
          model: 'Masalah pertama adalah representasi data: mesin Intel memakai little endian, sedangkan sebagian mesin lain big endian, sehingga angka bisa terbaca keliru. Solusinya memakai format standar yang ditetapkan IDL. Masalah kedua adalah parameter by reference: alamat memori di client tidak berarti apa-apa di server. Solusinya copy/restore, yaitu nilai disalin ke server lalu hasil perubahan disalin kembali, atau pointer tidak diizinkan.' },
        { q: 'c. Isi jenis RPC berikut. (3 poin)',
          fields: [
            { label: 'Client menunggu sampai hasil diterima', a: ['synchronous rpc', 'synchronous', 'rpc biasa', 'sinkron'] },
            { label: 'Client lanjut setelah server mengonfirmasi menerima request', a: ['asynchronous rpc', 'asynchronous', 'asinkron'] },
            { label: 'Asynchronous RPC dan server memanggil client kembali saat hasil siap', a: ['deferred synchronous rpc', 'deferred synchronous', 'deferred'] },
            { label: 'Client tidak menunggu konfirmasi sama sekali', a: ['one way rpc', 'one-way rpc', 'one way', 'one-way'] }],
          ex: 'Synchronous → asynchronous (tunggu ack) → deferred synchronous (callback hasil) → one-way (tanpa ack).' }
      ],
      ex: 'Detail RPC dari buku van Steen bab 4.' + S },
    { type: 'steps', q: 'Latihan UTS Soal No. 4: Binding RPC (total 10 poin)',
      steps: [
        { q: 'a. Urutkan langkah RPC berikut (isi nomor urut 1-6). (3 poin)',
          table: { head: ['Langkah', 'Kegiatan'], rows: [['A', 'Server stub melakukan unmarshalling lalu memanggil prosedur server'], ['B', 'Client memanggil client stub'], ['C', 'Client stub mengembalikan hasil ke client'], ['D', 'Client stub melakukan marshalling dan OS mengirim pesan'], ['E', 'Server stub mengemas hasil dan mengirimnya ke client'], ['F', 'Server menjalankan prosedur']] },
          fields: [{ label: 'Urutan huruf A-F', a: 'B D A F E C' }],
          ex: 'B → D → A → F → E → C.' },
        { q: 'b. Bagaimana client menemukan server (binding) pada DCE RPC? (4 poin)',
          points: ['Server mendaftarkan endpoint (port) ke DCE daemon di mesinnya',
            'Server mendaftarkan layanan dan mesinnya ke directory server',
            'Client bertanya ke directory server untuk menemukan mesin server',
            'Client bertanya ke DCE daemon di mesin server untuk mendapat endpoint',
            'Client melakukan RPC ke endpoint tersebut'],
          model: 'Saat start, server meminta endpoint dari DCE daemon di mesinnya dan mendaftarkannya di tabel endpoint, lalu mendaftarkan layanannya ke directory server. Client yang ingin memanggil pertama-tama bertanya ke directory server untuk mengetahui mesin mana yang menyediakan layanan, lalu bertanya ke DCE daemon di mesin itu untuk mendapatkan endpoint. Setelah itu client melakukan RPC langsung ke endpoint server.' },
        { q: 'c. Sebutkan dua perbedaan RPC dengan pemanggilan prosedur lokal! (3 poin)',
          points: ['Ada latensi jaringan, jauh lebih lambat',
            'Bisa gagal sebagian: pesan hilang, server crash, client tidak tahu apakah prosedur sudah dijalankan',
            'Tidak ada memori bersama, parameter harus di-marshal, pointer bermasalah',
            'Representasi data berbeda antar mesin'],
          model: 'Pertama, RPC melewati jaringan sehingga jauh lebih lambat daripada pemanggilan lokal. Kedua, RPC bisa gagal sebagian: request atau balasan hilang, atau server crash, sehingga client tidak tahu apakah prosedur sudah dijalankan. Ketiga, client dan server tidak berbagi memori, sehingga parameter harus di-marshal dan pointer tidak bisa dipakai langsung.' }
      ],
      ex: 'Binding DCE dan transparansi RPC.' + S },
    { type: 'steps', q: 'Latihan UTS Soal No. 4: Studi Kasus Aplikasi Kampus (total 10 poin). Aplikasi mobile kampus memakai beberapa cara komunikasi: (1) pesan chat ke teman yang sedang offline diantar saat ia online; (2) aplikasi memanggil REST API jadwal kuliah dan menunggu respons; (3) sensor suhu ruang kelas mengirim datagram UDP tanpa menunggu; (4) aplikasi menunggu konfirmasi bahwa pesan sudah tersimpan di antrean server sebelum lanjut.',
      steps: [
        { q: 'a. Klasifikasikan keempat cara komunikasi pada cerita (persistent/transient dan synchronous/asynchronous)! (4 poin)',
          fields: [
            { label: '(1) Chat ke teman offline', a: ['persistent asynchronous', 'persistent async', 'persisten asinkron'] },
            { label: '(2) REST API jadwal', a: ['transient synchronous', 'transient sync', 'transien sinkron'] },
            { label: '(3) Datagram UDP sensor', a: ['transient asynchronous', 'transient async', 'transien asinkron'] },
            { label: '(4) Menunggu konfirmasi tersimpan di antrean', a: ['persistent synchronous', 'persistent sync', 'persisten sinkron'] }],
          ex: 'Disimpan middleware sampai diterima = persistent; pengirim menunggu = synchronous.' },
        { q: 'b. Pada komunikasi synchronous, pengirim bisa diblokir sampai tiga titik berbeda. Sebutkan ketiganya dan tentukan titik mana yang dipakai cara (2) dan (4)! (3 poin)',
          points: ['Request submission: sampai middleware menerima pesan',
            'Request delivery: sampai pesan sampai di penerima',
            'After processing: sampai penerima selesai memproses dan membalas',
            'Cara (4) memakai titik submission (konfirmasi tersimpan)',
            'Cara (2) memakai after processing (menunggu respons)'],
          model: 'Pengirim bisa diblokir sampai middleware menerima pesan (request submission), sampai pesan sampai di penerima (request delivery), atau sampai penerima selesai memproses dan membalas (after processing). Cara (4) memakai titik pertama karena hanya menunggu konfirmasi pesan tersimpan di antrean. Cara (2) memakai titik terakhir karena aplikasi menunggu respons jadwal dari server.' },
        { q: 'c. Tipe komunikasi apa yang umumnya digunakan pada komunikasi client/server? Jelaskan! (3 poin)',
          points: ['Request-reply: client mengirim request lalu menunggu reply',
            'Buku van Steen: transient synchronous, client diblokir sampai reply diterima, pesan tidak disimpan middleware',
            'Kedua pihak harus aktif saat komunikasi',
            'Catatan kisi-kisi dosen untuk contoh minggu 4: transient asynchronous; sebutkan acuan yang dipakai'],
          model: 'Client/server umumnya memakai pola request-reply. Menurut buku van Steen, komunikasinya transient synchronous: request tidak disimpan middleware, sehingga client dan server harus sama-sama aktif, dan client diblokir sampai reply diterima. Catatan kisi-kisi dosen untuk contoh minggu 4 menyebut transient asynchronous, jadi sebutkan acuan yang dipakai saat menjawab.' }
      ],
      ex: 'Soal cerita tipe komunikasi; nomor 4b UTS 25/26 dalam bentuk kasus.' + S },
    { type: 'steps', q: 'Latihan UTS Soal No. 4: Studi Kasus Transfer M-Banking (total 10 poin). Aplikasi m-banking memanggil prosedur transfer(rekening_tujuan, jumlah) di server bank memakai RPC. Suatu hari, setelah request dikirim, koneksi terputus. Client tidak tahu apakah server sempat memproses transfer, lalu mengirim ulang request sehingga saldo nasabah terpotong dua kali.',
      steps: [
        { q: 'a. Jelaskan langkah-langkah RPC saat aplikasi memanggil transfer() sampai hasil diterima! (4 poin)',
          points: ['Aplikasi memanggil client stub seperti prosedur lokal',
            'Client stub melakukan marshalling parameter (rekening, jumlah) ke pesan, OS client mengirim ke server',
            'OS server menyerahkan pesan ke server stub; server stub unmarshalling lalu memanggil transfer() sebenarnya',
            'Server menjalankan prosedur, server stub mengemas hasil dan mengirim balik',
            'Client stub membuka hasil dan mengembalikannya ke aplikasi; selama itu client menunggu'],
          model: 'Aplikasi memanggil transfer() seolah lokal, padahal yang dipanggil client stub. Client stub mengemas nama prosedur, nomor rekening, dan jumlah menjadi pesan (marshalling) lalu OS client mengirimnya ke server. OS server menyerahkan pesan ke server stub, yang membuka pesan (unmarshalling) dan memanggil prosedur transfer di server. Hasilnya dikemas server stub dan dikirim kembali, lalu client stub membuka hasil dan mengembalikannya ke aplikasi.' },
        { q: 'b. Kasus saldo terpotong dua kali menunjukkan RPC tidak sepenuhnya transparan. Jelaskan perbedaan RPC dengan pemanggilan prosedur lokal yang menyebabkan masalah ini! (3 poin)',
          points: ['Panggilan lokal tidak bisa gagal sebagian; RPC bisa kehilangan request/reply atau server crash',
            'Client tidak bisa membedakan request hilang, server crash, atau reply hilang',
            'Mengirim ulang (at-least-once) bisa menjalankan prosedur dua kali',
            'Ada latensi jaringan dan tidak ada memori bersama'],
          model: 'Pemanggilan lokal selalu berjalan di proses yang sama, jadi tidak ada request yang hilang. Pada RPC, request, reply, atau server bisa gagal secara terpisah. Saat koneksi putus, client tidak tahu apakah transfer belum diproses atau sudah diproses tetapi reply-nya hilang. Bila client mengirim ulang, prosedur bisa dijalankan dua kali. Inilah batas access transparency pada RPC.' },
        { q: 'c. Usulkan cara agar transfer tidak terjadi dua kali dan sebutkan semantik RPC yang dicapai! (3 poin)',
          points: ['Beri setiap request nomor unik (request ID)',
            'Server mencatat request ID yang sudah diproses dan tidak menjalankannya lagi, cukup mengirim ulang hasil',
            'Semantik at-most-once (bersama retry menjadi efektif exactly-once)',
            'Alternatif: buat operasi idempotent'],
          model: 'Setiap request transfer diberi nomor unik. Server menyimpan daftar nomor yang sudah diproses beserta hasilnya. Bila request yang sama datang lagi, server tidak menjalankan transfer ulang, melainkan hanya mengirim ulang hasil sebelumnya. Dengan cara ini prosedur dijalankan paling banyak sekali (at-most-once), dan bersama pengiriman ulang client hasilnya mendekati exactly-once.' }
      ],
      ex: 'Soal cerita RPC dan kegagalan parsial.' + S },
    { type: 'steps', q: 'Latihan UTS Soal No. 4: Studi Kasus Integrasi Sistem (total 10 poin). Sistem akademik (Java di server Intel, little endian) memanggil layanan nilai (C di server lama big endian) memakai RPC. Interface layanan ditulis dalam IDL. Nilai 300 (integer 16 bit, 0x012C) yang dikirim terbaca 11265 (0x2C01) di server, dan parameter berupa pointer ke array nilai tidak bekerja. Untuk mencetak transkrip massal yang lama, client tidak ingin menunggu hasilnya.',
      steps: [
        { q: 'a. Jelaskan fungsi client stub, server stub, marshalling, dan IDL pada kasus ini! (3 poin)',
          points: ['Client stub: wakil prosedur remote di sistem akademik, mengemas parameter dan mengirim pesan',
            'Server stub: menerima pesan di layanan nilai, membuka parameter, memanggil prosedur, mengirim hasil',
            'Marshalling: mengemas parameter ke format pesan yang disepakati',
            'IDL: mendefinisikan interface lalu dipakai membangkitkan stub untuk Java dan C'],
          model: 'Client stub di sistem akademik berperan sebagai wakil prosedur remote: ia mengemas parameter ke pesan dan mengirimnya. Server stub di layanan nilai menerima pesan, membuka parameter, memanggil prosedur C, lalu mengirim hasil. Marshalling adalah proses mengemas parameter ke format pesan yang disepakati. IDL mendefinisikan interface secara netral bahasa sehingga stub Java dan stub C bisa dibangkitkan dari definisi yang sama.' },
        { q: 'b. Jelaskan penyebab nilai 300 terbaca keliru dan pointer tidak bekerja, beserta solusinya! (4 poin)',
          points: ['Representasi data berbeda: little endian vs big endian, urutan byte terbalik',
            'Solusi: format standar jaringan yang ditetapkan IDL (mis. XDR, JSON, protobuf), stub melakukan konversi',
            'Pointer hanya bermakna di address space client',
            'Solusi: copy/restore (salin isi array ke server, salin kembali hasilnya) atau larang pointer'],
          model: 'Server Intel menyimpan byte paling tidak signifikan di alamat terkecil (little endian), sedangkan server lama big endian, sehingga byte nilai 300 terbaca terbalik menjadi 11265. Solusinya, stub memakai format data standar yang ditetapkan IDL dan mengonversinya di kedua sisi. Pointer ke array hanya bermakna di memori client; server tidak bisa membacanya. Solusinya copy/restore: isi array disalin ke pesan, diproses server, lalu hasilnya disalin kembali ke client.' },
        { q: 'c. Untuk cetak transkrip massal, tentukan jenis RPC yang sesuai! (3 poin)',
          fields: [
            { label: 'Client lanjut setelah server mengonfirmasi menerima request', a: ['asynchronous rpc', 'asynchronous', 'asinkron'] },
            { label: 'Client lanjut, server memanggil client kembali saat transkrip selesai', a: ['deferred synchronous rpc', 'deferred synchronous', 'deferred'] },
            { label: 'Client tidak menunggu konfirmasi sama sekali', a: ['one way rpc', 'one-way rpc', 'one way', 'one-way'] },
            { label: 'Jenis RPC biasa yang membuat client menunggu lama', a: ['synchronous rpc', 'synchronous', 'rpc biasa', 'sinkron'] }],
          ex: 'Synchronous → asynchronous (tunggu ack) → deferred synchronous (callback hasil) → one-way (tanpa ack).' }
      ],
      ex: 'Soal cerita parameter passing dan varian RPC.' + S }
  ]);

  // ================= Soal 5 =================
  var DA = { type: 'clock', procs: 3,
    events: [
      { id: 'a', p: 0, t: 5 }, { id: 'b', p: 0, t: 30 }, { id: 'c', p: 0, t: 60 },
      { id: 'd', p: 1, t: 15, below: true, box: true }, { id: 'e', p: 1, t: 40 }, { id: 'f', p: 1, t: 75 },
      { id: 'g', p: 2, t: 10, below: true }, { id: 'h', p: 2, t: 50, below: true }, { id: 'i', p: 2, t: 85, below: true }],
    msgs: [{ from: 'a', to: 'e', label: 'm1' }, { from: 'g', to: 'b', label: 'm2' }, { from: 'e', to: 'h', label: 'm3' }, { from: 'c', to: 'f', label: 'm4' }, { from: 'f', to: 'i', label: 'm5' }],
    caption: 'Diagram latihan. P1: a, b, c; P2: d, e, f; P3: g, h, i. d adalah event lokal.' };
  var DB = { type: 'clock', procs: 4,
    events: [
      { id: 'a', p: 0, t: 5 }, { id: 'b', p: 0, t: 84 }, { id: 'c', p: 0, t: 92 },
      { id: 'd', p: 1, t: 15 }, { id: 'e', p: 1, t: 30 }, { id: 'f', p: 1, t: 70 },
      { id: 'g', p: 2, t: 10 }, { id: 'h', p: 2, t: 40 }, { id: 'i', p: 2, t: 60 },
      { id: 'j', p: 3, t: 52, below: true }, { id: 'k', p: 3, t: 62, below: true }, { id: 'l', p: 3, t: 98, below: true }],
    msgs: [{ from: 'a', to: 'd', label: 'm1' }, { from: 'e', to: 'h', label: 'm2' }, { from: 'k', to: 'b', label: 'm3' }, { from: 'i', to: 'f', label: 'm4' }, { from: 'c', to: 'l', label: 'm5' }, { from: 'g', to: 'j', label: 'm6' }],
    caption: 'Diagram latihan empat proses. Setiap event mengirim atau menerima tepat satu pesan.' };
  var DX = { type: 'clock', procs: 3,
    events: [
      { id: 'a', p: 0, t: 8 }, { id: 'b', p: 0, t: 22 },
      { id: 'c', p: 1, t: 35, below: true }, { id: 'd', p: 1, t: 90 },
      { id: 'e', p: 2, t: 10, below: true }, { id: 'f', p: 2, t: 68, below: true }, { id: 'g', p: 2, t: 78, below: true }],
    msgs: [{ from: 'a', to: 'c' }, { from: 'e', to: 'c' }, { from: 'b', to: 'f' }, { from: 'g', to: 'd' }],
    caption: 'Diagram yang sama dengan soal UTS 25/26 nomor 5.' };
  var DC = { type: 'clock', procs: 3,
    events: [
      { id: 'a', p: 0, t: 5 }, { id: 'b', p: 0, t: 50 }, { id: 'c', p: 0, t: 70 },
      { id: 'd', p: 1, t: 20 }, { id: 'e', p: 1, t: 30 }, { id: 'f', p: 1, t: 38 },
      { id: 'g', p: 2, t: 10, below: true, box: true }, { id: 'h', p: 2, t: 45, below: true }, { id: 'i', p: 2, t: 85, below: true }],
    msgs: [{ from: 'a', to: 'd', label: 'm1' }, { from: 'e', to: 'h', label: 'm2' }, { from: 'f', to: 'b', label: 'm3' }, { from: 'c', to: 'i', label: 'm4' }],
    caption: 'Server chat. P1 Jakarta: a, b, c; P2 Bandung: d, e, f; P3 Surabaya: g, h, i. g adalah event lokal.' };

  BANK.isian('ca', 'u5', '5. Logical Clock & Vector Clock', [
    { type: 'steps', q: 'Latihan UTS Soal No. 5: Koordinasi (total 10 poin)', figure: DA,
      steps: [
        { q: 'a. Apa itu logical clock dan dalam situasi apa logical clock dibutuhkan? (3 poin)',
          points: ['Logical clock memberi nomor urut pada event tanpa memakai waktu nyata',
            'Dibutuhkan karena tidak ada jam global dan jam fisik tiap mesin bisa berbeda (clock skew)',
            'Situasi: yang penting urutan kejadian, bukan waktu nyata',
            'Contoh: totally ordered multicast untuk replika database, causally ordered multicast pada chat/forum, mutual exclusion terdistribusi, debugging/log terdistribusi'],
          model: 'Logical clock adalah penanda urutan event yang tidak bergantung pada waktu nyata. Ia dibutuhkan karena sistem terdistribusi tidak punya jam global dan jam fisik setiap mesin bisa berbeda. Logical clock dipakai ketika yang penting hanya urutan kejadian, misalnya agar semua replika database menerapkan update dalam urutan sama, agar balasan di forum tidak muncul sebelum pesan aslinya, atau untuk mutual exclusion terdistribusi.' },
        { q: 'b. Tentukan Lamport timestamp semua event! (3 poin)',
          fields: [
            { label: 'a', a: 1, tol: 0 }, { label: 'b', a: 2, tol: 0 }, { label: 'c', a: 3, tol: 0 },
            { label: 'd', a: 1, tol: 0 }, { label: 'e', a: 2, tol: 0 }, { label: 'f', a: 4, tol: 0 },
            { label: 'g', a: 1, tol: 0 }, { label: 'h', a: 3, tol: 0 }, { label: 'i', a: 5, tol: 0 }],
          ex: 'b = max(a=1, g=1) + 1 = 2. e = max(d=1, a=1) + 1 = 2. h = max(g=1, e=2) + 1 = 3. f = max(e=2, c=3) + 1 = 4. i = max(h=3, f=4) + 1 = 5. Dihitung dengan clocks.js.' },
        { q: 'c. Gunakan vector clock untuk menentukan timestamp semua event (format P1,P2,P3)! (4 poin)',
          fields: [
            { label: 'a', a: '1 0 0' }, { label: 'b', a: '2 0 1' }, { label: 'c', a: '3 0 1' },
            { label: 'd', a: '0 1 0' }, { label: 'e', a: '1 2 0' }, { label: 'f', a: '3 3 1' },
            { label: 'g', a: '0 0 1' }, { label: 'h', a: '1 2 2' }, { label: 'i', a: '3 3 3' }],
          ex: 'b: max((1,0,0), g=(0,0,1)) = (1,0,1) → (2,0,1). e: max(d=(0,1,0), a) = (1,1,0) → (1,2,0). h: max(g, e) = (1,2,1) → (1,2,2). f: max(e, c=(3,0,1)) = (3,2,1) → (3,3,1). i: max(h, f) = (3,3,2) → (3,3,3). Dihitung dengan clocks.js.' }
      ],
      ex: 'Pola soal nomor 5 tahun 2026: logical clock, vector clock, diagram berbentuk berbeda.' + S },
    { type: 'steps', q: 'Latihan UTS Soal No. 5: Vector Clock Empat Proses (total 10 poin)', figure: DB,
      steps: [
        { q: 'a. Tentukan vector clock semua event (format P1,P2,P3,P4)! (6 poin)',
          fields: [
            { label: 'a', a: '1 0 0 0' }, { label: 'b', a: '2 0 1 2' }, { label: 'c', a: '3 0 1 2' },
            { label: 'd', a: '1 1 0 0' }, { label: 'e', a: '1 2 0 0' }, { label: 'f', a: '1 3 3 0' },
            { label: 'g', a: '0 0 1 0' }, { label: 'h', a: '1 2 2 0' }, { label: 'i', a: '1 2 3 0' },
            { label: 'j', a: '0 0 1 1' }, { label: 'k', a: '0 0 1 2' }, { label: 'l', a: '3 0 1 3' }],
          ex: 'd terima m1: (1,1,0,0). h terima m2 dari e: max((0,0,1,0), (1,2,0,0)) → (1,2,2,0). j terima m6 dari g: (0,0,1,1); k = (0,0,1,2). f terima m4 dari i: max((1,2,0,0), (1,2,3,0)) → (1,3,3,0). b terima m3 dari k: max((1,0,0,0), (0,0,1,2)) → (2,0,1,2); c = (3,0,1,2). l terima m5 dari c: max((0,0,1,2), (3,0,1,2)) → (3,0,1,3). Dihitung dengan clocks.js.' },
        { q: 'b. Tentukan hubungan pasangan pesan berikut berdasarkan vector clock event pengirimnya (kausal / concurrent). (2 poin)',
          fields: [
            { label: 'm1 (dikirim a) dan m4 (dikirim i)', a: ['kausal', 'causal', 'm1 sebelum m4', 'bergantung'] },
            { label: 'm6 (dikirim g) dan m3 (dikirim k)', a: ['kausal', 'causal', 'm6 sebelum m3', 'bergantung'] },
            { label: 'm3 (dikirim k) dan m4 (dikirim i)', a: ['concurrent', 'konkuren', 'tidak kausal', 'bersamaan', 'tidak bergantung'] }],
          ex: 'a = (1,0,0,0) ≤ i = (1,2,3,0), jadi m1 → m4. g = (0,0,1,0) ≤ k = (0,0,1,2), jadi m6 → m3 (j menerima m6 sebelum k mengirim m3). k = (0,0,1,2) dan i = (1,2,3,0) tidak saling ≤, jadi concurrent.' },
        { q: 'c. Apa masalah utama Lamport clock yang diselesaikan vector clock? (2 poin)',
          points: ['Lamport menjamin a → b maka L(a) < L(b)', 'Kebalikannya tidak berlaku: L(a) < L(b) tidak berarti a → b',
            'Lamport tidak bisa mendeteksi concurrency/kausalitas', 'Vector: a → b jika dan hanya jika V(a) < V(b)'],
          model: 'Lamport clock hanya menjamin satu arah: jika a terjadi sebelum b maka L(a) < L(b). Sebaliknya, L(a) < L(b) tidak berarti a terjadi sebelum b. Contohnya di diagram ini L(k) = 3 < L(i) = 5, tetapi k dan i concurrent. Vector clock menyimpan counter setiap proses sehingga a → b jika dan hanya jika V(a) < V(b).' }
      ],
      ex: 'Variasi diagram empat proses.' + S },
    { type: 'steps', q: 'Latihan UTS Soal No. 5: Diagram UTS 25/26 (total 10 poin)', figure: DX,
      steps: [
        { q: 'a. Tentukan Lamport timestamp semua event! (3 poin)',
          fields: [{ label: 'a', a: 1, tol: 0 }, { label: 'b', a: 2, tol: 0 }, { label: 'c', a: 2, tol: 0 }, { label: 'd', a: 5, tol: 0 }, { label: 'e', a: 1, tol: 0 }, { label: 'f', a: 3, tol: 0 }, { label: 'g', a: 4, tol: 0 }],
          ex: 'c = max(0, a=1, e=1) + 1 = 2. f = max(e=1, b=2) + 1 = 3. g = 4. d = max(c=2, g=4) + 1 = 5.' },
        { q: 'b. Tentukan vector clock semua event! (4 poin)',
          fields: [{ label: 'a', a: '1 0 0' }, { label: 'b', a: '2 0 0' }, { label: 'c', a: '1 1 1' }, { label: 'd', a: '2 2 3' }, { label: 'e', a: '0 0 1' }, { label: 'f', a: '2 0 2' }, { label: 'g', a: '2 0 3' }],
          ex: 'c menerima dari a dan e: max = (1,0,1) → (1,1,1). d: max(c, g=(2,0,3)) = (2,1,3) → (2,2,3).' },
        { q: 'c. L(c) = 2 dan L(f) = 3. Apakah c terjadi sebelum f? Jelaskan dengan vector clock! (3 poin)',
          fields: [
            { label: 'Hubungan c dan f', a: ['concurrent', 'konkuren', 'tidak', 'bersamaan'] },
            { label: 'Komponen mana yang membuktikan V(c) tidak ≤ V(f)?', a: ['p2', 'komponen p2', 'kedua', 'komponen kedua'] }],
          ex: 'V(c) = (1,1,1), V(f) = (2,0,2): komponen P2 c = 1 > f = 0, sedangkan P1 c < f. Jadi concurrent walau L(c) < L(f). Inilah masalah Lamport clock.' }
      ],
      ex: 'Diagram sama dengan UTS 25/26; hitungan dengan clocks.js.' + S },
    { type: 'steps', q: 'Latihan UTS Soal No. 5: Studi Kasus Server Chat (total 10 poin). Aplikasi chat punya tiga server: P1 (Jakarta), P2 (Bandung), P3 (Surabaya). P1 mengirim pesan m1 ke P2 (event a). P3 mencatat log lokal (event g). P2 menerima m1 (d), lalu mengirim m2 ke P3 (e) dan m3 ke P1 (f). P3 menerima m2 (h). P1 menerima m3 (b), lalu mengirim m4 ke P3 (c). P3 menerima m4 (i).', figure: DC,
      steps: [
        { q: 'a. Tentukan Lamport timestamp semua event! (3 poin)',
          fields: [
            { label: 'a', a: 1, tol: 0 }, { label: 'b', a: 5, tol: 0 }, { label: 'c', a: 6, tol: 0 },
            { label: 'd', a: 2, tol: 0 }, { label: 'e', a: 3, tol: 0 }, { label: 'f', a: 4, tol: 0 },
            { label: 'g', a: 1, tol: 0 }, { label: 'h', a: 4, tol: 0 }, { label: 'i', a: 7, tol: 0 }],
          ex: 'd = max(0, a=1) + 1 = 2. e = 3, f = 4. h = max(g=1, e=3) + 1 = 4. b = max(a=1, f=4) + 1 = 5. c = 6. i = max(h=4, c=6) + 1 = 7. Dihitung dengan clocks.js.' },
        { q: 'b. Gunakan vector clock untuk menentukan timestamp semua event (format P1,P2,P3)! (4 poin)',
          fields: [
            { label: 'a', a: '1 0 0' }, { label: 'b', a: '2 3 0' }, { label: 'c', a: '3 3 0' },
            { label: 'd', a: '1 1 0' }, { label: 'e', a: '1 2 0' }, { label: 'f', a: '1 3 0' },
            { label: 'g', a: '0 0 1' }, { label: 'h', a: '1 2 2' }, { label: 'i', a: '3 3 3' }],
          ex: 'd: max((0,0,0), a) → (1,1,0). h: max(g=(0,0,1), e=(1,2,0)) = (1,2,1) → (1,2,2). b: max(a, f=(1,3,0)) = (1,3,0) → (2,3,0). i: max(h, c=(3,3,0)) = (3,3,2) → (3,3,3). Dihitung dengan clocks.js.' },
        { q: 'c. L(h) = 4 < L(b) = 5. Apakah h terjadi sebelum b? Jelaskan dengan vector clock dan hubungkan dengan masalah Lamport clock! (3 poin)',
          fields: [
            { label: 'Hubungan h dan b', a: ['concurrent', 'konkuren', 'tidak', 'bersamaan'] },
            { label: 'Hubungan g dan a', a: ['concurrent', 'konkuren', 'bersamaan'] }],
          ex: 'V(h) = (1,2,2), V(b) = (2,3,0): komponen P3 h = 2 > b = 0, tetapi P1 h < b. Tidak ada yang ≤ yang lain, jadi concurrent walau L(h) < L(b). Lamport hanya menjamin a → b ⇒ L(a) < L(b), bukan kebalikannya.' }
      ],
      ex: 'Soal cerita dengan urutan event dalam kalimat, seperti gaya UTS 25/26 nomor 7a.' + S },
    { type: 'steps', q: 'Latihan UTS Soal No. 5: Studi Kasus Replika Rekening (total 10 poin). Rekening Rp1.000 direplikasi di P1 (Jakarta) dan P2 (Medan). Hampir bersamaan, nasabah menyetor Rp100 di P1 (update U1) dan bank menambah bunga 1% di P2 (update U2). Setiap update di-multicast ke kedua replika. Counter Lamport kedua proses awalnya 0.',
      steps: [
        { q: 'a. Hitung saldo akhir bila update diterapkan dengan urutan berbeda di tiap replika! (3 poin)',
          fields: [
            { label: 'Saldo replika yang menerapkan U1 lalu U2', a: 1111, tol: 0 },
            { label: 'Saldo replika yang menerapkan U2 lalu U1', a: 1110, tol: 0 },
            { label: 'Apakah kedua replika konsisten? (ya/tidak)', a: ['tidak', 'no', 'tidak konsisten'] }],
          ex: 'U1 lalu U2: (1.000 + 100) × 1,01 = 1.111. U2 lalu U1: 1.000 × 1,01 + 100 = 1.110.' },
        { q: 'b. Dengan totally ordered multicast, setiap update diberi Lamport timestamp. Tentukan timestamp dan urutan penerapannya (seri dipecah dengan ID proses terkecil)! (3 poin)',
          fields: [
            { label: 'Timestamp U1 (dikirim P1)', a: 1, tol: 0 },
            { label: 'Timestamp U2 (dikirim P2)', a: 1, tol: 0 },
            { label: 'Urutan penerapan di semua replika', a: 'U1 U2' },
            { label: 'Saldo akhir semua replika', a: 1111, tol: 0 }],
          ex: 'Kedua proses menaikkan counter dari 0 ke 1 sebelum mengirim, jadi timestamp sama. Pemecah seri: (1, P1) < (1, P2), sehingga U1 lebih dulu di semua replika dan saldo menjadi 1.111.' },
        { q: 'c. Jelaskan cara kerja totally ordered multicast dan mengapa cukup memakai logical clock, bukan jam fisik! (4 poin)',
          points: ['Setiap update diberi Lamport timestamp lalu di-multicast ke semua replika (termasuk diri sendiri)',
            'Penerima menaruh pesan di antrean terurut timestamp dan mengirim acknowledgment ke semua',
            'Pesan di kepala antrean baru diterapkan setelah di-acknowledge semua proses',
            'Semua replika menerapkan update dalam urutan yang sama',
            'Yang penting urutan, bukan waktu nyata; jam fisik tiap mesin bisa berbeda (clock skew)'],
          model: 'Setiap replika memberi update Lamport timestamp lalu mengirimnya ke semua replika. Penerima memasukkan pesan ke antrean yang diurutkan berdasarkan timestamp dan mengirim acknowledgment. Pesan di kepala antrean baru diterapkan setelah diakui semua proses, sehingga semua replika menerapkan U1 dan U2 dalam urutan yang sama. Logical clock cukup karena yang dibutuhkan hanya urutan yang disepakati. Jam fisik Jakarta dan Medan bisa berbeda beberapa milidetik sehingga tidak bisa diandalkan.' }
      ],
      ex: 'Contoh klasik buku van Steen bab 6 dalam bentuk soal cerita.' + S },
    { type: 'steps', q: 'Latihan UTS Soal No. 5: Studi Kasus Forum Diskusi (total 10 poin). Forum mata kuliah berjalan di tiga proses P1, P2, P3 yang memakai vector clock untuk causally ordered multicast (counter hanya naik saat mengirim). Semua vektor awalnya (0,0,0). P1 mengirim pertanyaan m1 dengan timestamp (1,0,0). P2 menerima m1, lalu mengirim jawaban m2 dengan timestamp (1,1,0). Karena jaringan lambat, P3 menerima m2 lebih dulu sebelum m1.',
      steps: [
        { q: 'a. Mengapa forum ini butuh vector clock, bukan cukup Lamport clock? (3 poin)',
          points: ['Jawaban tidak boleh tampil sebelum pertanyaannya (hubungan kausal)',
            'Lamport clock tidak bisa membedakan event kausal dan concurrent: L(a) < L(b) tidak berarti a → b',
            'Vector clock: a → b jika dan hanya jika V(a) < V(b)',
            'Dengan vector clock, penerima tahu pesan mana yang harus ditunggu'],
          model: 'Forum mensyaratkan jawaban tidak tampil sebelum pertanyaan yang dijawabnya. Lamport clock tidak cukup karena nilai L(a) < L(b) tidak membuktikan a terjadi sebelum b, sehingga penerima tidak tahu apakah harus menunggu pesan lain. Vector clock menyimpan counter setiap proses, sehingga a → b jika dan hanya jika V(a) < V(b), dan penerima bisa mendeteksi pesan kausal yang belum diterimanya.' },
        { q: 'b. Tentukan apa yang dilakukan P3! (4 poin)',
          fields: [
            { label: 'Saat m2 tiba lebih dulu, apakah m2 langsung ditampilkan? (ya/tidak)', a: ['tidak', 'no', 'ditunda'] },
            { label: 'Komponen timestamp m2 yang belum terpenuhi di P3', a: ['p1', 'komponen p1', 'pertama', 'komponen pertama'] },
            { label: 'Vektor P3 setelah menampilkan m1', a: '1 0 0' },
            { label: 'Vektor P3 setelah menampilkan m2', a: '1 1 0' }],
          ex: 'Syarat menampilkan pesan dari Pj di Pk: ts(m)[j] = VCk[j] + 1 dan ts(m)[i] ≤ VCk[i] untuk i ≠ j. Untuk m2 (dari P2): ts[P1] = 1 > VC3[P1] = 0, jadi ditunda. Setelah m1 tampil, VC3 = (1,0,0), lalu m2 memenuhi syarat dan VC3 = (1,1,0).' },
        { q: 'c. Admin forum memeriksa beberapa pasang event. Tentukan hubungannya (x → y, y → x, atau concurrent)! (3 poin)',
          fields: [
            { label: 'V(x) = (2,1,0), V(y) = (3,1,2)', a: ['x → y', 'x->y', 'x sebelum y', 'xy'] },
            { label: 'V(x) = (1,3,0), V(y) = (2,1,1)', a: ['concurrent', 'konkuren', 'x || y', 'bersamaan'] },
            { label: 'V(x) = (4,2,2), V(y) = (1,2,2)', a: ['y → x', 'y->x', 'y sebelum x', 'yx'] }],
          ex: 'Bandingkan semua komponen. Jika ada komponen lebih besar di kedua arah, concurrent.' }
      ],
      ex: 'Soal cerita causally ordered multicast dengan vector clock.' + S }
  ]);

  // ================= Soal 6 =================
  var RING = '{1, 4, 9, 11, 14, 18, 20, 21, 28}';
  BANK.isian('ca', 'u6', '6. Penamaan & Chord', [
    { type: 'steps', q: 'Soal (dokumen SOAL, lihat slide 8-35): Misalnya ada 4 buah node server (m = 4) yaitu A, B, C, D. ID server = total ASCII alamat IP mod 16; hash key file = total ASCII nama file mod 16.',
      table: { head: ['Nama server', 'IP Address'], rows: [['A', '202.168.0.15'], ['B', '202.168.0.2'], ['C', '202.168.0.10'], ['D', '202.168.0.12']] },
      steps: [
        { q: 'a. Tentukan total ASCII dan ID setiap server (titik ikut dijumlahkan; ASCII "0" = 48, "." = 46).',
          fields: [
            { label: 'Total ASCII A', a: 595, tol: 0 }, { label: 'ID A', a: 3, tol: 0 },
            { label: 'Total ASCII B', a: 543, tol: 0 }, { label: 'ID B', a: 15, tol: 0 },
            { label: 'Total ASCII C', a: 590, tol: 0 }, { label: 'ID C', a: 14, tol: 0 },
            { label: 'Total ASCII D', a: 592, tol: 0 }, { label: 'ID D', a: 0, tol: 0 }],
          ex: '"202.168.0.15" = 50+48+50+46+49+54+56+46+48+46+49+53 = 595; 595 mod 16 = 3. B: 543 mod 16 = 15. C: 590 mod 16 = 14. D: 592 mod 16 = 0. Ring berisi node 0 (D), 3 (A), 14 (C), 15 (B).' },
        { q: 'b. Untuk tiap server akan disimpan 5 file: indah1.jpg sampai indah5.jpg. Tentukan HASH key-nya.',
          fields: [
            { label: 'indah1.jpg', a: 4, tol: 0 }, { label: 'indah2.jpg', a: 5, tol: 0 }, { label: 'indah3.jpg', a: 6, tol: 0 },
            { label: 'indah4.jpg', a: 7, tol: 0 }, { label: 'indah5.jpg', a: 8, tol: 0 }],
          ex: '"indah1.jpg" = 105+110+100+97+104+49+46+106+112+103 = 932; 932 mod 16 = 4. Setiap nomor berikutnya naik 1 (933, 934, ...), jadi key 5, 6, 7, 8.' },
        { q: 'c. Tentukan di node mana foto-foto tersebut disimpan (clue: node successor).',
          fields: [
            { label: 'Server penyimpan indah1.jpg sampai indah5.jpg', a: ['c', 'server c', 'node 14', '14', 'c 14'] },
            { label: 'Finger table node 3 (A): FT_3[1..4]', a: '14 14 14 14' }],
          ex: 'Key 4 sampai 8 berada di (3, 14], jadi succ = 14 = server C. FT_3 = succ(4), succ(5), succ(7), succ(11) = 14, 14, 14, 14.' }
      ],
      ex: 'Dari dokumen SOAL. Asumsi: seluruh string IP termasuk titik dijumlahkan; jika slide menjumlah tanpa titik atau memakai nama server, angka berubah.' + S },
    { type: 'steps', q: 'Latihan Chord (variasi dokumen SOAL): ring m = 5 (ID 0-31) dengan 5 server. ID server = total ASCII IP mod 32; hash key = total ASCII nama file mod 32.',
      table: { head: ['Server', 'IP Address'], rows: [['S1', '10.10.1.7'], ['S2', '10.10.1.25'], ['S3', '10.10.1.3'], ['S4', '10.10.1.18'], ['S5', '10.10.1.40']] },
      steps: [
        { q: 'a. Tentukan ID setiap server.',
          fields: [{ label: 'ID S1', a: 20, tol: 0 }, { label: 'ID S2', a: 4, tol: 0 }, { label: 'ID S3', a: 16, tol: 0 }, { label: 'ID S4', a: 6, tol: 0 }, { label: 'ID S5', a: 1, tol: 0 }],
          ex: 'Total ASCII: S1 436, S2 484, S3 432, S4 486, S5 481. Mod 32: 20, 4, 16, 6, 1. Ring: 1, 4, 6, 16, 20.' },
        { q: 'b. Tentukan hash key dan node penyimpan file berikut.',
          table: { head: ['File', 'Total ASCII'], rows: [['lagu.mp3', '743'], ['data.csv', '788'], ['slide.ppt', '915'], ['buku.pdf', '799'], ['video.mp4', '854']] },
          fields: [
            { label: 'Key lagu.mp3', a: 7, tol: 0 }, { label: 'Node lagu.mp3', a: 16, tol: 0 },
            { label: 'Key data.csv', a: 20, tol: 0 }, { label: 'Node data.csv', a: 20, tol: 0 },
            { label: 'Key slide.ppt', a: 19, tol: 0 }, { label: 'Node slide.ppt', a: 20, tol: 0 },
            { label: 'Key buku.pdf', a: 31, tol: 0 }, { label: 'Node buku.pdf', a: 1, tol: 0 },
            { label: 'Key video.mp4', a: 22, tol: 0 }, { label: 'Node video.mp4', a: 1, tol: 0 }],
          ex: 'Key = total mod 32. Node = succ(key). Key 22 dan 31 melewati node terbesar (20), jadi kembali ke node 1.' },
        { q: 'c. Buat finger table node 4 dan tulis jalur lookup.',
          fields: [
            { label: 'FT_4[1..5]', a: '6 6 16 16 20' },
            { label: 'Lookup video.mp4 (key 22) dari node 4', a: '4 20 1' },
            { label: 'Lookup lagu.mp3 (key 7) dari node 20', a: '20 4 6 16' }],
          ex: 'FT_4 = succ(5), succ(6), succ(8), succ(12), succ(20) = 6, 6, 16, 16, 20. Dari 4 ke key 22: finger terjauh sebelum 22 adalah 20; dari 20, key 22 ∈ (20, 1] → 1. Dihitung dengan chord.js.' }
      ],
      ex: 'Variasi angka sendiri dengan metode dokumen SOAL.' + S },
    { type: 'steps', q: 'Latihan UTS Soal No. 6: Penamaan (total 10 poin). Ring Chord m = 5 dengan node aktif ' + RING + ' (slide "Chord lookup example").',
      steps: [
        { q: 'a. Jelaskan perbedaan name, identifier, dan address, serta tiga sifat identifier! (4 poin)',
          points: ['Name: string untuk merujuk entitas',
            'Address: nama access point entitas, bisa berubah dan bisa dipakai entitas lain',
            'Identifier: nama yang merujuk entitas secara unik',
            'Sifat 1: identifier merujuk paling banyak satu entitas',
            'Sifat 2: setiap entitas dirujuk paling banyak satu identifier',
            'Sifat 3: identifier selalu merujuk entitas yang sama (tidak pernah dipakai ulang)'],
          model: 'Name adalah string bit atau karakter untuk merujuk entitas. Address adalah nama access point entitas, misalnya alamat IP dan port; address bisa berubah dan suatu saat dipakai entitas lain. Identifier adalah nama yang memenuhi tiga sifat: merujuk paling banyak satu entitas, setiap entitas punya paling banyak satu identifier, dan identifier selalu merujuk entitas yang sama serta tidak pernah dipakai ulang. Di Chord, ID node dan key hasil hash berperan sebagai identifier.' },
        { q: 'b. Buat finger table node 1 dan node 28! (4 poin)',
          fields: [{ label: 'FT_1[1..5]', a: '4 4 9 9 18' }, { label: 'FT_28[1..5]', a: '1 1 1 4 14' }],
          ex: 'FT_1 = succ(2), succ(3), succ(5), succ(9), succ(17) = 4, 4, 9, 9, 18. FT_28 = succ(29), succ(30), succ(32 mod 32 = 0), succ(36 mod 32 = 4), succ(44 mod 32 = 12) = 1, 1, 1, 4, 14.' },
        { q: 'c. Tulis jalur lookup key 26 dari node 1 dan key 12 dari node 28! (2 poin)',
          fields: [{ label: 'Key 26 dari node 1', a: '1 18 20 21 28' }, { label: 'Key 12 dari node 28', a: '28 4 9 11 14' }],
          ex: 'Sama dengan slide. Dari 1: finger terjauh sebelum 26 adalah 18; dari 18 (FT = 20 20 28 28 4) ke 20; dari 20 ke 21; key 26 ∈ (21, 28] → 28.' }
      ],
      ex: 'Pola soal nomor 6 tahun 2026: teori dasar penamaan dan Chord.' + S },
    { type: 'steps', q: 'Latihan UTS Soal No. 6: Studi Kasus Perpustakaan Digital (total 10 poin). Perpustakaan digital kampus menyimpan e-book di ring Chord m = 5 (ID 0-31) dengan node aktif ' + RING + ' (sama dengan slide "Chord lookup example"). Setiap e-book diberi key hasil hash, lalu disimpan di node successor key tersebut.',
      steps: [
        { q: 'a. E-book berikut disimpan di node mana? (3 poin)',
          fields: [{ label: 'E-book key 5', a: 9, tol: 0 }, { label: 'E-book key 14', a: 14, tol: 0 }, { label: 'E-book key 22', a: 28, tol: 0 }, { label: 'E-book key 30', a: 1, tol: 0 }],
          ex: 'Key k disimpan di succ(k), node pertama dengan ID ≥ k. Key 14 tepat di node 14. Key 30 melewati 31 lalu kembali ke 1.' },
        { q: 'b. Lengkapi finger table node 18 dan node 21, FT_p[i] = succ(p + 2^(i−1))! (4 poin)',
          fields: [{ label: 'FT_18[1..5]', a: '20 20 28 28 4' }, { label: 'FT_21[1..5]', a: '28 28 28 1 9' }],
          ex: 'FT_18: succ(19)=20, succ(20)=20, succ(22)=28, succ(26)=28, succ(34 mod 32 = 2)=4. FT_21: succ(22)=28, succ(23)=28, succ(25)=28, succ(29)=1, succ(37 mod 32 = 5)=9. Dihitung dengan chord.js.' },
        { q: 'c. Mahasiswa di node 4 mencari e-book key 19, dan mahasiswa di node 21 mencari e-book key 3. Tulis jalur lookup-nya! (3 poin)',
          fields: [{ label: 'Key 19 dari node 4', a: '4 14 18 20' }, { label: 'Key 3 dari node 21', a: '21 1 4' }, { label: 'Key 29 dari node 11', a: '11 28 1' }],
          ex: 'Di node p, jika k ∈ (p, FT_p[1]] kirim ke FT_p[1]; jika tidak, ke finger terjauh yang belum melewati k. Dari 4 (FT 9 9 9 14 20): finger terjauh sebelum 19 adalah 14; dari 14 ke 18; key 19 ∈ (18, 20] → 20. Dihitung dengan chord.js.' }
      ],
      ex: 'Soal cerita Chord memakai ring dari slide.' + S },
    { type: 'steps', q: 'Latihan UTS Soal No. 6: Studi Kasus Node Bergabung (total 10 poin). Layanan berbagi file antar laboratorium memakai ring Chord m = 5 (ID 0-31) dengan node aktif {2, 7, 13, 19, 24, 30}. Minggu depan, server laboratorium baru dengan ID 16 akan bergabung ke ring.',
      steps: [
        { q: 'a. Sebelum node 16 bergabung, tentukan node penyimpan key berikut! (2 poin)',
          fields: [{ label: 'Key 20', a: 24, tol: 0 }, { label: 'Key 31', a: 2, tol: 0 }, { label: 'Key 15', a: 19, tol: 0 }],
          ex: 'succ(20) = 24. Key 31 melewati node terbesar 30, jadi kembali ke 2. succ(15) = 19.' },
        { q: 'b. Buat finger table node 7 dan node 24, lalu tulis jalur lookup key 10 dari node 24! (4 poin)',
          fields: [{ label: 'FT_7[1..5]', a: '13 13 13 19 24' }, { label: 'FT_24[1..5]', a: '30 30 30 2 13' }, { label: 'Lookup key 10 dari node 24', a: '24 2 7 13' }],
          ex: 'FT_7 = succ(8), succ(9), succ(11), succ(15), succ(23) = 13, 13, 13, 19, 24. FT_24 = succ(25), succ(26), succ(28), succ(0), succ(8) = 30, 30, 30, 2, 13. Lookup: 24 → 2 → 7 → 13. Dihitung dengan chord.js.' },
        { q: 'c. Setelah node 16 bergabung, key mana yang berpindah dan bagaimana finger table node 7 berubah? (4 poin)',
          fields: [
            { label: 'Key yang pindah ke node 16 (pisahkan spasi)', a: '14 15 16', set: true },
            { label: 'Node asal key tersebut', a: 19, tol: 0 },
            { label: 'FT_7[1..5] setelah node 16 bergabung', a: '13 13 13 16 24' },
            { label: 'Lookup key 15 dari node 24 setelah bergabung', a: '24 13 16' }],
          ex: 'Node baru p mengambil key di (pred(p), p] = (13, 16] dari successor-nya, node 19. FT_7[4] = succ(15) berubah dari 19 menjadi 16. Lookup: dari 24 finger terjauh sebelum 15 adalah 13; key 15 ∈ (13, 16] → 16. Dihitung dengan chord.js.' }
      ],
      ex: 'Variasi Chord: node join. Kunci disusun dari aturan succ dan finger table.' + S },
    { type: 'steps', q: 'Latihan UTS Soal No. 6: Studi Kasus Penamaan Layanan Kampus (total 10 poin). Seorang mahasiswa membuka "lms.kampus.ac.id". DNS menerjemahkannya menjadi 10.20.30.40:443, tempat server menerima koneksi. Di dalam sistem, setiap file tugas diberi key SHA-1 160 bit yang unik dan tidak pernah dipakai ulang, lalu disimpan memakai Chord. Bagian kepegawaian mencari dosen dengan atribut "fakultas = Informatika, jabatan = Lektor" lewat LDAP.',
      steps: [
        { q: 'a. Tentukan name, identifier, atau address untuk tiap hal pada cerita! (3 poin)',
          fields: [
            { label: '"lms.kampus.ac.id"', a: ['name', 'nama', 'human friendly name'] },
            { label: '10.20.30.40:443', a: ['address', 'alamat'] },
            { label: 'Key SHA-1 160 bit file tugas', a: ['identifier', 'id'] }],
          ex: 'Address = nama access point; identifier = unik, tetap, tidak dipakai ulang; name = rujukan umum, sering untuk manusia.' },
        { q: 'b. Jelaskan perbedaan name, identifier, dan address, serta tiga sifat identifier! (4 poin)',
          points: ['Name: string bit/karakter untuk merujuk entitas',
            'Address: nama access point entitas, bisa berubah dan bisa dipakai entitas lain',
            'Identifier merujuk paling banyak satu entitas',
            'Setiap entitas dirujuk paling banyak satu identifier',
            'Identifier selalu merujuk entitas yang sama (tidak dipakai ulang)'],
          model: 'Name adalah string untuk merujuk entitas, misalnya lms.kampus.ac.id. Address adalah nama access point entitas, misalnya 10.20.30.40:443; address bisa berubah bila server pindah dan bisa dipakai entitas lain. Identifier adalah nama dengan tiga sifat: merujuk paling banyak satu entitas, setiap entitas punya paling banyak satu identifier, dan identifier selalu merujuk entitas yang sama tanpa dipakai ulang, seperti key SHA-1 file tugas.' },
        { q: 'c. Cerita memuat tiga skema penamaan. Sebutkan skemanya beserta contoh dari cerita, dan jelaskan mengapa Chord dipakai untuk key file tugas! (3 poin)',
          points: ['Structured naming: DNS lms.kampus.ac.id, hierarkis',
            'Flat naming: key SHA-1 tanpa struktur, tidak memberi petunjuk lokasi',
            'Attribute-based naming: LDAP dengan pasangan atribut-nilai',
            'Chord (DHT) menemukan lokasi flat name dengan O(log N) hop tanpa broadcast, skalabel'],
          model: 'Pertama, structured naming pada DNS: lms.kampus.ac.id tersusun hierarkis dan diselesaikan per tingkat. Kedua, flat naming pada key SHA-1 file tugas: identifier tanpa struktur yang tidak memberi petunjuk lokasi. Ketiga, attribute-based naming pada LDAP: dosen dicari dengan pasangan atribut-nilai. Chord dipakai karena flat name tidak bisa diselesaikan per tingkat; Chord menentukan node penyimpan dari hash key dan menemukannya dalam O(log N) hop tanpa broadcast, sehingga skalabel.' }
      ],
      ex: 'Soal cerita teori dasar penamaan (kisi-kisi nomor 6).' + S }
  ]);

  // ================= Soal 7 =================
  function ops(rows) { return { type: 'ops', rows: rows }; }
  var YA = ['ya', 'yes', 'konsisten'], TIDAK = ['tidak', 'no', 'tidak konsisten'];
  var C1 = ops([['P1', 'W(x)a', '', '', ''], ['P2', '', 'W(x)b', '', ''], ['P3', '', '', 'R(x)a', 'R(x)b'], ['P4', '', '', 'R(x)a', 'R(x)b']]);
  var C2 = ops([['P1', 'W(x)a', '', '', '', ''], ['P2', '', 'R(x)a', 'W(x)b', '', ''], ['P3', '', '', '', 'R(x)a', 'R(x)b'], ['P4', '', '', '', 'R(x)b', 'R(x)a']]);
  var C3 = ops([['P1', 'W(x)a', '', '', '', 'W(x)c', ''], ['P2', '', 'W(x)b', '', '', '', ''], ['P3', '', '', 'R(x)a', 'R(x)b', '', 'R(x)c'], ['P4', '', '', 'R(x)b', 'R(x)a', '', 'R(x)c']]);
  var C5 = ops([['P1', '', 'R(x)a', '', 'W(x)c', '', ''], ['P2', 'W(x)a', '', 'W(x)b', '', '', ''], ['P3', '', '', '', '', 'R(x)b', 'R(x)c'], ['P4', '', '', '', '', 'R(x)c', 'R(x)b']]);
  var C6 = ops([['P1', 'W(x)a', '', '', '', '', ''], ['P2', '', 'R(x)a', 'W(x)b', '', '', ''], ['P3', '', '', '', 'R(x)b', 'W(x)c', ''], ['P4', '', 'R(x)a', '', '', 'R(x)c', 'R(x)b']]);
  var C7 = ops([['P1', 'W(x)a', '', '', 'R(x)b'], ['P2', '', 'R(x)a', 'W(x)b', ''], ['P3', '', 'R(x)a', '', 'R(x)b'], ['P4', '', '', 'R(x)a', 'R(x)b']]);
  var C8 = ops([['P1', 'W(x)a', '', '', ''], ['P2', '', 'W(x)b', 'W(x)c', ''], ['P3', 'R(x)a', 'R(x)b', '', 'R(x)c'], ['P4', '', 'R(x)b', '', 'R(x)c']]);
  var C9 = ops([['P1', 'W(x)a', '', 'R(x)b'], ['P2', 'W(x)b', '', 'R(x)a'], ['P3', '', 'R(x)a', 'R(x)b']]);

  BANK.isian('ca', 'u7', '7. Konsistensi: Sequential & Causal', [
    { type: 'steps', q: 'Latihan UTS Soal No. 7: Konsistensi (total 10 poin)',
      steps: [
        { q: 'a. Jelaskan mengapa data direplikasi dan mengapa konsistensi diperlukan! (3 poin)',
          points: ['Replikasi untuk reliability: sistem tetap jalan bila satu replika gagal',
            'Replikasi untuk performa dan skalabilitas: data dekat pengguna, beban terbagi',
            'Masalah: bila satu replika diubah, replika lain menjadi berbeda',
            'Konsistensi diperlukan agar pembaca tidak melihat data usang/bertentangan, sesuai model yang disepakati',
            'Trade-off: konsistensi kuat mahal (sinkronisasi global), model lemah lebih cepat'],
          model: 'Data direplikasi untuk dua alasan: keandalan, karena bila satu replika rusak replika lain masih melayani, dan performa, karena data didekatkan ke pengguna dan beban dibagi ke banyak server. Akibatnya, ketika satu replika diubah, replika lain sementara berbeda. Konsistensi diperlukan supaya semua proses melihat data yang benar sesuai aturan yang disepakati, misalnya urutan update yang sama. Konsistensi kuat butuh sinkronisasi yang mahal, sehingga dipilih model yang seimbang dengan kebutuhan.' },
        { q: 'b. Apakah gambar di bawah sequentially consistent? Jelaskan analisis Anda! (4 poin)', figure: C5,
          fields: [
            { label: 'Sequentially consistent? (ya/tidak)', a: TIDAK },
            { label: 'Dua proses yang melihat urutan write berlawanan', a: 'P3 P4', set: true }],
          ex: 'P3 membaca b lalu c, P4 membaca c lalu b. Sequential consistency mewajibkan semua proses melihat satu urutan write yang sama, jadi tidak ada urutan global yang memenuhi keduanya. Diperiksa dengan consistency.js.' },
        { q: 'c. Apakah gambar yang sama causally consistent? Jelaskan! (3 poin)',
          fields: [
            { label: 'Causally consistent? (ya/tidak)', a: YA },
            { label: 'Pasangan write yang concurrent', a: 'b c', set: true }],
          ex: 'W(x)a → W(x)b (proses sama, P2) dan W(x)a → W(x)c (P1 membaca a lalu menulis c). W(x)b dan W(x)c tidak berhubungan, jadi concurrent dan boleh dilihat dengan urutan berbeda oleh P3 dan P4. Semua pembaca juga tidak melihat a setelah b atau c. Jadi causally consistent.' }
      ],
      ex: 'Pola soal nomor 7 tahun 2026: teori dasar, sequential dan causal.' + S },
    { type: 'steps', q: 'Latihan UTS Soal No. 7: Sequential dan Causal (total 10 poin)',
      steps: [
        { q: 'a. Definisikan sequential consistency dan causal consistency! (4 poin)',
          points: ['Sequential: hasil eksekusi sama seperti semua operasi dijalankan dalam satu urutan sekuensial',
            'Sequential: operasi tiap proses muncul sesuai urutan programnya; semua proses melihat interleaving yang sama',
            'Causal: write yang berpotensi berhubungan kausal harus dilihat semua proses dalam urutan sama',
            'Causal: write concurrent boleh dilihat dalam urutan berbeda',
            'Sequential lebih ketat; sequential ⇒ causal'],
          model: 'Sequential consistency: hasil setiap eksekusi sama dengan jika semua operasi baca dan tulis dijalankan dalam suatu urutan sekuensial, dan operasi setiap proses muncul dalam urutan programnya. Artinya semua proses melihat satu interleaving yang sama, tanpa memedulikan waktu nyata. Causal consistency lebih lemah: write yang berpotensi berhubungan kausal harus dilihat semua proses dalam urutan yang sama, sedangkan write yang concurrent boleh dilihat dalam urutan berbeda.' },
        { q: 'b. Analisis gambar berikut! (3 poin)', figure: C2,
          fields: [
            { label: 'Sequentially consistent? (ya/tidak)', a: TIDAK },
            { label: 'Causally consistent? (ya/tidak)', a: TIDAK },
            { label: 'Proses yang melanggar urutan kausal', a: ['p4', 'p 4', 'proses 4'] }],
          ex: 'P2 membaca a lalu menulis b, jadi W(x)a → W(x)b kausal. P4 melihat b lalu a, melanggar urutan kausal. Karena causal gagal, sequential pasti gagal.' },
        { q: 'c. Analisis gambar berikut! (3 poin)', figure: C1,
          fields: [
            { label: 'Sequentially consistent? (ya/tidak)', a: YA },
            { label: 'Causally consistent? (ya/tidak)', a: YA }],
          ex: 'Urutan global: W1(x)a → R3(x)a → R4(x)a → W2(x)b → R3(x)b → R4(x)b. P3 dan P4 melihat a lalu b. Sequential selalu juga causal.' }
      ],
      ex: 'Definisi dan dua analisis cepat.' + S },
    { type: 'steps', q: 'Latihan UTS Soal No. 7: Analisis Diagram (total 10 poin)',
      steps: [
        { q: 'a. Analisis gambar berikut! (5 poin)', figure: C3,
          fields: [
            { label: 'Sequentially consistent? (ya/tidak)', a: TIDAK },
            { label: 'Causally consistent? (ya/tidak)', a: YA },
            { label: 'Pasangan write yang harus terlihat berurutan sama oleh semua proses', a: 'a c', set: true }],
          ex: 'P3 melihat a lalu b, P4 melihat b lalu a, jadi tidak sequential. W(x)a dan W(x)c ditulis P1 berurutan (kausal), dan keduanya melihat a sebelum c. W(x)b concurrent dengan a dan c, jadi urutan berbeda diizinkan: causally consistent.' },
        { q: 'b. Analisis gambar berikut! (5 poin)', figure: C6,
          fields: [
            { label: 'Sequentially consistent? (ya/tidak)', a: TIDAK },
            { label: 'Causally consistent? (ya/tidak)', a: TIDAK },
            { label: 'Rantai kausal write (urut)', a: 'a b c' }],
          ex: 'P2 membaca a lalu menulis b (a → b); P3 membaca b lalu menulis c (b → c). Rantai a → b → c harus dilihat semua proses. P4 membaca c lalu b, jadi melanggar causal dan sequential. Diperiksa dengan consistency.js.' }
      ],
      ex: 'Dua diagram dengan rantai kausal.' + S },
    { type: 'steps', q: 'Latihan UTS Soal No. 7: Studi Kasus Pengumuman Kampus (total 10 poin). Variabel bersama x menyimpan judul pengumuman di tiga replika. Proses P1 (admin fakultas) menulis nilai a ke x, lalu membaca x dan mendapat b. Proses P2 (admin prodi), hampir bersamaan, menulis nilai b ke x, lalu membaca x dan mendapat a. Proses P3 (mahasiswa) membaca x dua kali dan mendapat a, lalu b.',
      steps: [
        { q: 'a. Gambarkan urutan operasi read (R(x)) dan write (W(x)) ketiga proses pada cerita! (3 poin)',
          points: ['P1: W(x)a lalu R(x)b', 'P2: W(x)b lalu R(x)a', 'P3: R(x)a lalu R(x)b', 'W(x)a dan W(x)b digambar di awal, read sesudahnya'],
          model: 'Gambar tiga garis waktu, satu per proses, dengan waktu berjalan dari kiri ke kanan. Garis P1: W(x)a di awal, lalu R(x)b. Garis P2: W(x)b di awal, lalu R(x)a. Garis P3: R(x)a di tengah, lalu R(x)b di akhir.' },
        { q: 'b. Apakah gambar tersebut sequentially consistent? Jelaskan analisis Anda! (4 poin)', figure: C9,
          fields: [
            { label: 'Sequentially consistent? (ya/tidak)', a: TIDAK },
            { label: 'Dua proses yang syarat urutan write-nya bertentangan', a: 'P1 P2', set: true }],
          ex: 'P1 menulis a lalu membaca b, jadi di urutan global W(x)b harus sesudah W(x)a. P2 menulis b lalu membaca a, jadi W(x)a harus sesudah W(x)b. Keduanya tidak bisa benar sekaligus. Diperiksa dengan consistency.js.' },
        { q: 'c. Apakah gambar yang sama causally consistent? Jelaskan! (3 poin)',
          fields: [
            { label: 'Causally consistent? (ya/tidak)', a: YA },
            { label: 'Hubungan W(x)a dan W(x)b', a: ['concurrent', 'konkuren', 'bersamaan', 'tidak kausal'] }],
          ex: 'Tidak ada proses yang membaca a lalu menulis b, atau sebaliknya, sehingga W(x)a dan W(x)b concurrent. Write concurrent boleh terlihat dalam urutan berbeda oleh proses berbeda, jadi causally consistent.' }
      ],
      ex: 'Soal cerita dengan urutan operasi dalam kalimat, seperti UTS 25/26 nomor 7a.' + S },
    { type: 'steps', q: 'Latihan UTS Soal No. 7: Studi Kasus Bursa Saham Elektronik (total 10 poin). Anda diminta mendesain sistem bursa saham elektronik dengan server replika di Jakarta, Singapura, dan Tokyo. Harga saham x diperbarui terus, dan semua investor harus melihat perubahan harga dalam urutan yang sama agar order beli dan jual adil.',
      steps: [
        { q: 'a. Jenis konsistensi apakah yang Anda gunakan untuk bursa saham elektronik? Jelaskan jawaban dan analisis Anda! (4 poin)',
          points: ['Pilih model kuat: sequential consistency (atau lebih ketat, linearizability)',
            'Semua investor harus melihat satu urutan update harga yang sama',
            'Causal tidak cukup: update concurrent boleh terlihat berbeda urutan, membuat order tidak adil',
            'Eventual tidak cocok karena investor bisa membaca harga usang',
            'Konsekuensi: butuh sinkronisasi (mis. totally ordered multicast), latensi lebih tinggi'],
          model: 'Saya memilih sequential consistency, atau linearizability bila urutan waktu nyata juga penting. Semua investor di Jakarta, Singapura, dan Tokyo harus melihat satu urutan perubahan harga yang sama, karena urutan itu menentukan order mana yang dieksekusi lebih dulu. Causal consistency tidak cukup karena dua update harga yang concurrent boleh terlihat dengan urutan berbeda di replika berbeda. Eventual consistency juga tidak cocok karena investor bisa membaca harga usang. Konsekuensinya, sistem butuh sinkronisasi seperti totally ordered multicast sehingga latensinya lebih tinggi.' },
        { q: 'b. Saat uji coba, tercatat diagram berikut. Analisis gambar tersebut! (3 poin)', figure: C8,
          fields: [
            { label: 'Sequentially consistent? (ya/tidak)', a: YA },
            { label: 'Write yang paling awal dalam urutan global', a: ['w(x)a', 'wa', 'w x a', 'p1 w(x)a'] },
            { label: 'Causally consistent? (ya/tidak)', a: YA }],
          ex: 'Urutan global: W1(x)a → R3(x)a → W2(x)b → R3(x)b → R4(x)b → W2(x)c → R3(x)c → R4(x)c. Semua pembaca melihat a, b, c dalam urutan sama. Sequential selalu juga causal. Diperiksa dengan consistency.js.' },
        { q: 'c. Selain bursa saham, pilih model konsistensi yang paling cocok (sequential, causal, eventual) untuk fitur berikut! (3 poin)',
          fields: [
            { label: 'Transfer saldo antar rekening di banyak replika', a: ['sequential', 'sequential consistency', 'strict', 'linearizability'] },
            { label: 'Komentar balasan tidak boleh muncul sebelum komentar aslinya', a: ['causal', 'causal consistency', 'kausal'] },
            { label: 'Perubahan foto profil boleh menyebar perlahan', a: ['eventual', 'eventual consistency'] }],
          ex: 'Model kuat untuk data finansial, causal untuk percakapan, eventual untuk data yang jarang bertabrakan.' }
      ],
      ex: 'Pola UTS 24/25 nomor 7c (desain stock market) ditambah analisis diagram.' + S },
    { type: 'steps', q: 'Latihan UTS Soal No. 7: Studi Kasus Grup Chat (total 10 poin). Grup chat kelas direplikasi di empat server. P1 menulis pesan a ke x. P2 membaca a, lalu menulis balasan b. P3 membaca a, lalu b. P4 membaca a, lalu b. Terakhir P1 membaca b.', figure: C7,
      steps: [
        { q: 'a. Definisikan sequential consistency dan causal consistency! (4 poin)',
          points: ['Sequential: hasil eksekusi sama seperti semua operasi dijalankan dalam satu urutan sekuensial',
            'Operasi tiap proses muncul sesuai urutan programnya; semua proses melihat interleaving yang sama',
            'Causal: write yang berpotensi berhubungan kausal harus dilihat semua proses dalam urutan sama',
            'Write concurrent boleh dilihat dalam urutan berbeda; sequential ⇒ causal'],
          model: 'Sequential consistency: hasil setiap eksekusi sama dengan jika semua operasi dijalankan dalam suatu urutan sekuensial, dan operasi setiap proses muncul dalam urutan programnya, sehingga semua proses melihat satu interleaving yang sama. Causal consistency lebih lemah: write yang berpotensi berhubungan kausal harus dilihat semua proses dalam urutan sama, sedangkan write concurrent boleh dilihat dalam urutan berbeda.' },
        { q: 'b. Analisis gambar grup chat tersebut! (3 poin)',
          fields: [
            { label: 'Sequentially consistent? (ya/tidak)', a: YA },
            { label: 'Causally consistent? (ya/tidak)', a: YA },
            { label: 'Pasangan write yang berhubungan kausal (urut)', a: 'a b' }],
          ex: 'P2 membaca a lalu menulis b, jadi W(x)a → W(x)b. Semua pembaca melihat a sebelum b. Urutan global: W1(x)a → R2(x)a → R3(x)a → R4(x)a → W2(x)b → R1(x)b → R3(x)b → R4(x)b. Diperiksa dengan consistency.js.' },
        { q: 'c. Misalkan P4 justru membaca b lalu a. Apakah masih causally consistent? Lalu isi benar/salah untuk pernyataan berikut! (3 poin)',
          fields: [
            { label: 'Masih causally consistent? (ya/tidak)', a: TIDAK },
            { label: 'Sequential consistency memperhatikan waktu nyata (real time) operasi', a: ['salah', 'false', 's'] },
            { label: 'Setiap diagram yang sequentially consistent juga causally consistent', a: ['benar', 'true', 'b'] },
            { label: 'Pada causal consistency, write concurrent wajib terlihat dalam urutan sama', a: ['salah', 'false', 's'] }],
          ex: 'W(x)a → W(x)b kausal karena b adalah balasan setelah P2 membaca a. P4 yang membaca b lalu a melihat balasan sebelum pesan aslinya, jadi causal dilanggar. Sequential hanya menuntut satu interleaving yang sama, bukan urutan waktu nyata.' }
      ],
      ex: 'Soal cerita grup chat dengan variasi pelanggaran kausal.' + S }
  ]);
})();
