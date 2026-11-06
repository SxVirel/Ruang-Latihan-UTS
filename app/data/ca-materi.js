// Komputasi Awan — materi per nomor soal UTS (7 topik yang sama di UTS 24/25 dan 25/26).
// Ringkasan disusun sendiri dari buku Distributed Systems (van Steen & Tanenbaum) dan kisi-kisi dosen.
// Contoh soal memakai pola ujian; kedua PDF ujian tidak memuat kunci, jadi pembahasan di sini disusun sendiri.
BANK.materi('ca', [
  {
    label: 'Pengantar', judul: 'Pola UTS dan cara menjawab', hlm: '-',
    ringkas: 'Bentuk soal UTS 24/25 dan 25/26, bobot tiap nomor, dan pola jawaban esai yang aman.',
    bagian: [
      { h: 'Bentuk ujian', tabel: { head: ['Aspek', 'UTS Genap 24/25', 'UTS Ganjil 25/26'], rows: [
        ['Jumlah soal', '7 nomor, tiap nomor a/b/c', '7 nomor, a/b/c (nomor 2 dan 6 hanya a/b)'],
        ['Bobot', '15 poin per nomor, 5 per sub-soal', '10 poin per nomor, sub-soal 2 sampai 6 poin'],
        ['Gaya', 'Banyak pilihan bebas, analisis terbuka, ada soal membuat kode', 'Lebih ringkas: definisi, perbandingan, satu hitungan (TLP), satu soal cerita (Mobile IP)'],
        ['Hitungan', 'Vector clock semua event, kausalitas m2 dan m4', 'TLP, vector clock semua event, analisis R(x)/W(x)']] } },
      { h: 'Tujuh topik tetap', poin: [
        '1 Sistem Terdistribusi, 2 Arsitektur Sistem, 3 Proses, 4 Komunikasi, 5 Koordinasi, 6 Penamaan, 7 Konsistensi dan Fault Tolerance.',
        'Di Latihan soal, topik Pola UTS 24/25 dan Pola UTS 25/26 berisi soal yang mengikuti sub-soal ujian itu saja.',
        'Topik Pola UTS 24/25 & 25/26 berisi pola yang muncul di kedua ujian (transparansi, tipe komunikasi, election, vector clock, konsistensi).',
        'Untuk fokus ke satu ujian, centang topik ujian itu ditambah topik 24/25 & 25/26.'
      ] },
      { h: 'Pola jawaban esai', poin: [
        'Definisi satu kalimat, lalu poin-poin, lalu contoh nyata.',
        'Soal "bandingkan": buat tabel dua kolom (aspek, A, B).',
        'Soal "analisis": kaitkan contoh ke setiap kriteria satu per satu, lalu tulis kesimpulan.',
        'Soal hitungan: tulis rumus, substitusi angka, hasil. Nilai parsial didapat dari langkah.'
      ], ingat: 'Bobot 25/26 per sub-soal kecil (2 sampai 4 poin): jawab padat, jangan lebih dari setengah halaman.' }
    ]
  },
  {
    label: 'Soal 1', judul: 'Sistem Terdistribusi', hlm: '-',
    ringkas: 'Definisi, centralized vs decentralized vs distributed, distribution transparency, scalability, klasifikasi sistem, shared vs private memory.',
    bagian: [
      { h: 'Definisi', poin: [
        'Sistem terdistribusi: kumpulan komputer otonom yang tampak bagi pengguna sebagai satu sistem yang koheren.',
        'Tiga properti: tidak ada jam global (no global clock), proses berkomunikasi lewat pesan, sumber daya dipakai bersama (sharing resource).',
        'Tujuan desain: sharing resource, distribution transparency, openness, scalability.'
      ] },
      { h: 'Centralized, decentralized, distributed', tabel: { head: ['Bentuk', 'Titik kendali', 'Contoh', 'Kelemahan'], rows: [
        ['Centralized', 'Satu pusat', 'Sistem akademik di satu server', 'Single point of failure, bottleneck'],
        ['Decentralized', 'Beberapa pusat lokal (hub)', 'Email: tiap domain punya mail server', 'Hub yang mati memutus node di bawahnya'],
        ['Distributed', 'Tidak ada pusat, node setara', 'P2P, blockchain, cluster', 'Koordinasi dan konsistensi sulit']] },
        soal: 'UTS 25/26 1a: Apa yang dimaksud sistem centralized, decentralized, dan distributed? (3 poin)',
        ingat: 'Bedakan dari jumlah titik kendali: satu, beberapa, atau tidak ada.' },
      { h: 'Distribution transparency', tabel: { head: ['Tipe', 'Yang disembunyikan'], rows: [
        ['Access', 'Perbedaan representasi data dan cara akses'],
        ['Location', 'Di mana objek berada'],
        ['Relocation', 'Objek dipindah saat sedang dipakai'],
        ['Migration', 'Objek dipindah ke lokasi lain'],
        ['Replication', 'Objek punya beberapa salinan'],
        ['Concurrency', 'Objek dipakai bersama banyak pengguna'],
        ['Failure', 'Kegagalan dan pemulihan objek'],
        ['Persistence (daftar 8 tipe)', 'Objek ada di memori atau di disk']] },
        soal: 'UTS 24/25 1a dan 25/26 1b: Jelaskan maksud transparency dan sebutkan tipe-tipenya (24/25 cukup 3 tipe dengan penjelasan).',
        ingat: 'Definisi: menyembunyikan fakta bahwa proses dan sumber daya tersebar di banyak komputer.' },
      { h: 'Scalability', poin: [
        'Size scalability: mudah menambah pengguna dan sumber daya. Masalah: komponen terpusat menjadi bottleneck.',
        'Geographical scalability: pengguna dan sumber daya berjauhan. Masalah: latensi WAN, komunikasi synchronous lambat.',
        'Administrative scalability: melintasi banyak organisasi. Masalah: kebijakan keamanan dan pengelolaan bertentangan.',
        'Teknik scaling: sembunyikan latensi (asynchronous), partisi dan distribusi (DNS), replikasi dan caching (CDN).'
      ], soal: 'UTS 24/25 1b: Apa maksud scalability? Uraikan salah satu dari size, geographical, atau administrative scalability.' },
      { h: 'Klasifikasi sistem tersebar', poin: [
        'High performance distributed computing: cluster (node homogen, satu LAN), grid (heterogen, lintas organisasi), cloud (IaaS, PaaS, SaaS on-demand).',
        'Distributed information systems: transaction processing, enterprise application integration.',
        'Pervasive dan ubiquitous computing: perangkat mobile, sensor network, smart home.',
        'Contoh analisis cloud: tiap server punya jam sendiri (no global clock); layanan saling memanggil lewat REST/RPC (komunikasi); CPU dan storage dipakai banyak tenant lewat virtualisasi (sharing resource).'
      ], soal: 'UTS 24/25 1c: Pilih satu teknologi dari klasifikasi sistem tersebar, uraikan, lalu analisis berdasarkan no global clock, komunikasi antar proses, dan sharing resource.',
        ingat: 'Nilai penuh hanya jika ketiga properti dibahas satu per satu.' },
      { h: 'Shared memory vs private memory', tabel: { head: ['Aspek', 'Shared memory', 'Private memory'], rows: [
        ['Arsitektur', 'Multiprocessor', 'Multicomputer'],
        ['Pertukaran data', 'Baca tulis memori bersama', 'Message passing lewat jaringan'],
        ['Sinkronisasi', 'Lock, semaphore', 'Pesan'],
        ['Skalabilitas', 'Terbatas (bus dan memori bottleneck)', 'Tinggi, sampai ribuan node']] },
        soal: 'UTS 25/26 1c: Jelaskan sistem shared memory dan private memory pada parallel computing. (3 poin)' }
    ]
  },
  {
    label: 'Soal 2', judul: 'Arsitektur Sistem', hlm: '-',
    ringkas: 'Gaya arsitektur, client-server vs P2P, overlay terstruktur vs tak terstruktur, arsitektur hybrid, blockchain.',
    bagian: [
      { h: 'Gaya arsitektur', tabel: { head: ['Gaya', 'Ciri', 'Contoh'], rows: [
        ['Layered', 'Lapisan memanggil lapisan di bawahnya', 'Tumpukan protokol TCP/IP'],
        ['Object-based / service-oriented', 'Objek remote dipanggil lewat interface', 'Java RMI, microservice'],
        ['Resource-based (REST)', 'Sumber daya diberi URL, operasi GET/PUT/POST/DELETE', 'REST API'],
        ['Publish-subscribe (event-based)', 'Publisher tidak tahu subscriber, broker mencocokkan', 'MQTT, Kafka']] },
        poin: ['Component: unit modular dengan interface jelas. Interface: kontrak layanan. Connector: mekanisme komunikasi antar komponen (RPC, pesan, stream).'] },
      { h: 'Gambar satu arsitektur (three-tier)', poin: [
        '[Browser] → [Application server] → [Database server], balasan kembali ke arah sebaliknya.',
        'User interface di client, logika di application server, data di database server.',
        'Thin client: hampir semua logika di server. Fat client: sebagian logika di client.'
      ], soal: 'UTS 24/25 2a: Gambarkan salah satu contoh arsitektur sistem yang kalian ketahui.',
        ingat: 'Gambar kotak dan panah sederhana, lalu beri label peran tiap kotak.' },
      { h: 'Client-server vs P2P', tabel: { head: ['Aspek', 'Client-server', 'Peer-to-peer'], rows: [
        ['Pembagian peran', 'Asimetris: server melayani, client meminta', 'Simetris: tiap peer client sekaligus server'],
        ['Kepemilikan sumber daya', 'Dimiliki dan dikelola server', 'Tersebar di banyak peer'],
        ['Ketahanan', 'Server = single point of failure dan bottleneck', 'Tidak ada titik gagal tunggal; data hilang jika peer pemiliknya offline']] },
        soal: 'UTS 25/26 2a: Apa perbedaan mendasar client-server dan P2P dari sisi pembagian peran dan kepemilikan sumber daya, dan bagaimana pengaruhnya pada ketahanan sistem? (5 poin)' },
      { h: 'Overlay terstruktur vs tak terstruktur', tabel: { head: ['Aspek', 'Terstruktur', 'Tak terstruktur'], rows: [
        ['Topologi', 'Mengikuti aturan (ring, tree)', 'Tetangga acak (random graph)'],
        ['Penempatan item data', 'Deterministik: key = hash(data) di succ(key)', 'Bebas, di node mana saja'],
        ['Pencarian', 'Routing DHT, O(log N) hop, pasti ketemu', 'Flooding atau random walk, boros dan tidak pasti'],
        ['Contoh', 'Chord, Pastry, Kademlia', 'Gnutella, Freenet']] },
        soal: 'UTS 25/26 2b: Bandingkan overlay terstruktur dan tak terstruktur, fokus pada penempatan sumber daya (item data). (5 poin)' },
      { h: 'Arsitektur hybrid', poin: [
        'Gabungan client-server dan P2P.',
        'Edge-server systems: server di tepi jaringan dekat pengguna (CDN, fog/edge computing).',
        'Collaborative distributed systems: bergabung lewat server, bertukar data secara P2P. Contoh BitTorrent: peer minta daftar peer ke tracker, lalu unduh potongan file langsung dari peer lain.'
      ], soal: 'UTS 24/25 2b: Hybrid system architecture diklaim kombinasi terbaik. Sebutkan dan jelaskan jenisnya.' },
      { h: 'Blockchain: immutable dan aman', poin: [
        'Ledger disalin di banyak node P2P tanpa pusat.',
        'Setiap blok menyimpan hash blok sebelumnya; mengubah satu blok mengubah hash-nya dan memutus rantai sesudahnya.',
        'Blok baru diterima lewat konsensus (proof of work/proof of stake); penyerang harus menguasai mayoritas node.',
        'Transaksi ditandatangani dengan kriptografi kunci publik.'
      ], soal: 'UTS 24/25 2c: Salah satu karakteristik blockchain adalah immutable dan aman. Jelaskan mengapa.',
        ingat: 'Tiga kata kunci: hash berantai, konsensus, replikasi ledger.' }
    ]
  },
  {
    label: 'Soal 3', judul: 'Proses dan Thread', hlm: '-',
    ringkas: 'Proses vs thread, model threading, kerja sama thread dan kernel, TLP, multithreaded client dan server, container vs VM.',
    bagian: [
      { h: 'Proses vs thread', tabel: { head: ['Aspek', 'Proses', 'Thread'], rows: [
        ['Address space', 'Sendiri', 'Bersama dalam satu proses'],
        ['Biaya buat dan context switch', 'Mahal', 'Murah (lightweight)'],
        ['Komunikasi', 'IPC: pipe, socket, pesan', 'Variabel bersama, perlu lock'],
        ['Isolasi', 'Crash satu proses tidak merusak yang lain', 'Crash satu thread bisa mematikan proses']] },
        soal: 'UTS 24/25 3a: Jelaskan 4 perbedaan proses dan thread.' },
      { h: 'Model threading', tabel: { head: ['Model', 'Pemetaan', 'Kelebihan', 'Kelemahan'], rows: [
        ['Many-to-one', 'Banyak user thread ke satu kernel thread', 'Operasi thread cepat (user space)', 'Satu blocking call memblokir semua; tidak paralel di multicore'],
        ['One-to-one', 'Satu user thread ke satu kernel thread', 'Blocking tidak menular, bisa paralel', 'Tiap operasi lewat kernel, mahal'],
        ['Many-to-many', 'User thread di atas sekumpulan LWP', 'Gabungan keduanya', 'Implementasi rumit']] },
        soal: 'UTS 25/26 3a: Jelaskan perbedaan utama many-to-one dan one-to-one threading model. (4 poin)' },
      { h: 'Kerja sama thread dan kernel', poin: [
        'Library thread menjadwalkan user thread di atas lightweight process (LWP); kernel menjadwalkan LWP ke CPU.',
        'Saat satu thread blocking, kernel hanya memblokir LWP-nya; LWP lain menjalankan thread lain.',
        'Scheduler activation: kernel memberi tahu library lewat upcall bahwa thread akan blocking.',
        'Contoh: web server dispatcher/worker; satu worker menunggu disk, worker lain tetap melayani.'
      ], soal: 'UTS 24/25 3b: Jelaskan kerja sama thread dan kernel serta beri contoh penggunaannya.' },
      { h: 'Thread-Level Parallelism (TLP)', poin: [
        'ci = fraksi waktu ketika tepat i thread aktif, i = 0..N.',
        'Rumus buku: TLP = Σ (i·ci) untuk i = 1..N, dibagi (1 − c0).',
        'Contoh: Σ i·ci = 1×0,40 + 2×0,35 + 3×0,10 + 4×0,05 = 0,40 + 0,70 + 0,30 + 0,20 = 1,60.',
        '1 − c0 = 1 − 0,10 = 0,90. TLP = 1,60 / 0,90 = 1,78.',
        'Bila dosen memakai rata-rata tertimbang tanpa pembagi, hasilnya 1,60. Tulis rumus yang dipakai.'
      ], soal: 'UTS 25/26 3b: Aplikasi multithreaded maksimum 4 thread aktif (N = 4), distribusi waktu 0 = 0,10; 1 = 0,40; 2 = 0,35; 3 = 0,10; 4 = 0,05. Hitung TLP. (3 poin)',
        ingat: 'Pembagi (1 − c0) membuang waktu saat tidak ada thread aktif. TLP ≈ rata-rata thread yang berjalan bersamaan.' },
      { h: 'Multithreaded client dan server', poin: [
        'Client: halaman web punya banyak objek; tiap thread mengambil satu objek sehingga latensi jaringan saling tumpang tindih dan halaman tampil bertahap.',
        'Server: dispatcher menerima request, worker memproses dan boleh blocking; client lain tetap dilayani.',
        'Tiga cara membangun server: multithreading (paralel, blocking), single-threaded (tidak paralel, blocking), finite-state machine (paralel, nonblocking).'
      ], soal: 'UTS 25/26 3c: Mengapa multithreaded client lebih cepat dibanding single-threaded client dalam mengakses halaman web? (3 poin)' },
      { h: 'Contoh kode dengan thread', poin: [
        'Pola: buat fungsi per tugas, buat objek Thread per fungsi, start(), lalu join(), lalu cetak hasil.',
        'Python: t1 = threading.Thread(target=luas); t2 = threading.Thread(target=keliling); t1.start(); t2.start(); t1.join(); t2.join().',
        'Lingkaran: luas = π·r², keliling = 2·π·r.'
      ], soal: 'UTS 24/25 3c: Buat contoh aplikasi sederhana menghitung luas dan keliling lingkaran dengan thread.' },
      { h: 'Container vs virtual machine', tabel: { head: ['Aspek', 'Container', 'Virtual machine'], rows: [
        ['Virtualisasi', 'Level OS (namespaces, cgroups), berbagi kernel host', 'Hardware lewat hypervisor, OS tamu lengkap'],
        ['Ukuran dan start', 'MB, detik', 'GB, menit'],
        ['Isolasi', 'Lebih lemah', 'Lebih kuat'],
        ['Contoh', 'Docker, Podman, LXC', 'VMware, VirtualBox, KVM, Hyper-V']] } }
    ]
  },
  {
    label: 'Soal 4', judul: 'Komunikasi', hlm: '-',
    ringkas: 'TCP vs UDP, tipe komunikasi persistent/transient × synchronous/asynchronous, message broker, multicast.',
    bagian: [
      { h: 'Protokol lapisan Transport', tabel: { head: ['Aspek', 'TCP', 'UDP'], rows: [
        ['Koneksi', 'Connection-oriented (three-way handshake)', 'Connectionless'],
        ['Keandalan', 'Terjamin sampai, berurutan, tanpa duplikat', 'Tanpa jaminan'],
        ['Overhead', 'Besar', 'Kecil'],
        ['Contoh', 'HTTP, email, FTP', 'DNS, VoIP, streaming, game']] },
        soal: 'UTS 24/25 4a: Sebutkan dan jelaskan dua protokol standar pada lapisan Transport.' },
      { h: 'Tipe komunikasi', tabel: { head: ['Tipe', 'Arti', 'Contoh'], rows: [
        ['Persistent asynchronous', 'Pesan disimpan middleware, pengirim langsung lanjut', 'Email, message queue'],
        ['Persistent synchronous', 'Pesan disimpan, pengirim menunggu konfirmasi tersimpan', 'Kirim ke queue dengan acknowledgment'],
        ['Transient asynchronous', 'Tidak disimpan, pengirim tidak menunggu', 'Datagram UDP, one-way RPC'],
        ['Transient synchronous', 'Tidak disimpan, pengirim menunggu', 'RPC, HTTP request-response']] },
        poin: [
          'Persistent: penerima tidak perlu aktif saat pesan dikirim. Transient: pesan hilang jika penerima tidak aktif.',
          'Titik sinkronisasi synchronous: setelah request diterima middleware (submission), setelah sampai di penerima (delivery), setelah diproses (response).'
        ], soal: 'UTS 24/25 4b dan 25/26 4a: Sebutkan dan jelaskan tipe-tipe komunikasi (transient dan persistent).' },
      { h: 'Komunikasi client/server', poin: [
        'Buku: umumnya transient synchronous (request-reply); client diblokir sampai server membalas, server harus aktif.',
        'Kisi-kisi dosen: contoh client-server minggu 4 digolongkan transient asynchronous (client tidak menunggu balasan).',
        'Di ujian, sebut kedua sudut pandang beserta alasannya.'
      ], soal: 'UTS 25/26 4b: Tipe apa yang umumnya digunakan pada komunikasi client/server? Jelaskan. (3 poin)' },
      { h: 'Message broker', poin: [
        'Perantara dalam message-oriented middleware (MOM) antara pengirim dan penerima.',
        'Fungsi utama: mengonversi format pesan antar aplikasi heterogen dan merutekan pesan (berdasarkan aturan atau topik).',
        'Pesan disimpan di antrean, jadi komunikasinya persistent asynchronous.',
        'Primitif antrean: PUT (tambah), GET (ambil, blocking), POLL (cek, nonblocking), NOTIFY (handler saat pesan masuk).',
        'Contoh: RabbitMQ, Apache Kafka, IBM MQ.'
      ], soal: 'UTS 24/25 4c: Jelaskan secara ringkas message broker dan sebutkan fungsi utamanya.' },
      { h: 'Multicast', poin: [
        'Satu pengirim ke satu grup penerima sekaligus.',
        'IP multicast: router menyalin paket untuk alamat grup.',
        'Application-level multicast: node membentuk overlay tree atau mesh dan meneruskan pesan; kualitas diukur dengan link stress dan stretch.',
        'Stretch = delay jalur overlay / delay jalur langsung. Contoh 60 ms / 40 ms = 1,50.',
        'Flooding: teruskan ke semua tetangga. Gossip (epidemic): teruskan ke tetangga acak, skalabel tetapi probabilistik.'
      ], soal: 'UTS 25/26 4c: Jelaskan metode multicast yang memungkinkan satu pengirim mengirim ke banyak penerima secara bersamaan. (3 poin)' }
    ]
  },
  {
    label: 'Soal 5', judul: 'Koordinasi', hlm: '-',
    ringkas: 'Election (Bully, Ring), masalah Lamport clock, vector clock semua event, kausalitas pesan, sinkronisasi physical clock.',
    bagian: [
      { h: 'Election: Bully', poin: [
        'Masalah yang diselesaikan: memilih tepat satu koordinator yang disepakati semua proses setelah koordinator lama gagal.',
        'Proses P yang menyadari mengirim ELECTION ke semua proses ber-ID lebih tinggi.',
        'Ada yang membalas OK: P berhenti, yang lebih tinggi melanjutkan. Tidak ada balasan: P menang.',
        'Pemenang mengirim COORDINATOR ke semua proses.',
        'Contoh: proses 1-6, koordinator 6 mati, proses 2 menyadari. 2 kirim ke 3, 4, 5, 6; balasan OK dari 3, 4, 5; koordinator baru 5.'
      ], soal: 'UTS 24/25 5a dan 25/26 5a: Apa masalah yang diselesaikan algoritma election? Pilih Bully atau Ring dan jelaskan langkahnya sampai koordinator baru diketahui semua proses. (4-5 poin)' },
      { h: 'Election: Ring', poin: [
        'Proses tersusun dalam ring logis.',
        'Pemrakarsa mengirim ELECTION berisi ID-nya ke penerus; proses mati dilewati; tiap proses menambahkan ID-nya.',
        'Saat pesan kembali ke pemrakarsa, ID tertinggi dipilih, lalu pesan COORDINATOR diedarkan satu putaran.',
        'Contoh: proses 0-7, koordinator 7 mati, proses 3 memulai. Daftar saat kembali: 3 4 5 6 0 1 2, koordinator baru 6.'
      ], ingat: 'Soal 25/26 meminta sampai semua proses tahu: tulis langkah edaran COORDINATOR.' },
      { h: 'Lamport clock dan masalahnya', poin: [
        'Aturan: tiap event lokal atau kirim, L = L + 1. Saat menerima, L = max(L lokal, L pesan) + 1.',
        'Menjamin: a → b maka L(a) < L(b).',
        'Masalah utama: L(a) < L(b) tidak berarti a → b. Lamport clock tidak bisa membedakan event kausal dan concurrent.',
        'Vector clock mengatasinya: a → b jika dan hanya jika V(a) < V(b).'
      ], soal: 'UTS 25/26 5b: Apa masalah utama yang dimiliki Lamport clock? (2 poin)' },
      { h: 'Vector clock semua event', poin: [
        'Event lokal atau kirim: naikkan komponen proses sendiri.',
        'Terima: ambil max per komponen antara vektor sendiri dan vektor pesan, lalu naikkan komponen proses sendiri.',
        'Contoh di bawah: P1 punya a, b; P2 punya c, d; P3 punya e, f, g. Pesan a→c, e→c, b→f, g→d.',
        'a = (1,0,0), b = (2,0,0), e = (0,0,1).',
        'c = max((0,0,0), a, e) = (1,0,1), naikkan P2 → (1,1,1).',
        'f = max(e, b) = (2,0,1) → (2,0,2). g = (2,0,3).',
        'd = max(c, g) = (2,1,3) → (2,2,3).',
        'Lamport untuk diagram yang sama: a 1, b 2, c 2, d 5, e 1, f 3, g 4.'
      ], soal: 'UTS 24/25 5b dan 25/26 5c: Gunakan vector clock untuk menentukan timestamp semua event. (4-8 poin)',
        ingat: 'Kerjakan event urut waktu dari kiri ke kanan; jangan menghitung event penerima sebelum event pengirimnya.' },
      { h: 'Kausalitas antar pesan', tabel: { head: ['Perbandingan V(x) dan V(y)', 'Kesimpulan'], rows: [
        ['Semua komponen x ≤ y, ada yang <', 'x → y (kausal)'],
        ['Semua komponen y ≤ x, ada yang <', 'y → x'],
        ['Ada komponen x < y dan ada yang x > y', 'Concurrent (tidak bergantung)']] },
        poin: ['Dua pesan dibandingkan lewat vector clock event pengirimnya. Contoh: send(m1) = (1,0,0,0) dan send(m3) = (1,2,3,0) → kausal; (1,2,0,0) dan (0,0,0,1) → concurrent.'],
        soal: 'UTS 24/25 5c: Berdasarkan hasil vector clock, apakah m2 dan m4 saling bergantung secara kausal? (2 poin)' },
      { h: 'Sinkronisasi physical clock', poin: [
        'Cristian/NTP: client bertanya ke time server dan mengompensasi delay.',
        'NTP: offset θ = ((T2 − T1) + (T3 − T4)) / 2, delay δ = ((T4 − T1) − (T3 − T2)) / 2.',
        'Berkeley: time daemon menanyakan semua mesin lalu merata-rata, tanpa sumber UTC.',
        'Logical clock cukup bila hanya urutan yang penting; physical clock diperlukan untuk waktu nyata (log audit, sertifikat).'
      ] }
    ]
  },
  {
    label: 'Soal 6', judul: 'Penamaan', hlm: '-',
    ringkas: 'Flat, structured, attribute-based naming, iterative vs recursive resolution, home-based approach dan Mobile IP, Chord.',
    bagian: [
      { h: 'Tiga skema penamaan', tabel: { head: ['Skema', 'Ciri', 'Contoh aplikasi'], rows: [
        ['Flat naming', 'Identifier tanpa struktur, tidak terbaca manusia', 'Chord/DHT, alamat MAC, BitTorrent'],
        ['Structured naming', 'Name space hierarkis, mudah dibaca', 'DNS, path sistem file'],
        ['Attribute-based naming', 'Dicari lewat pasangan atribut-nilai', 'LDAP, Active Directory']] },
        poin: ['Name merujuk entitas; address adalah access point (bisa berubah); identifier merujuk paling banyak satu entitas dan tidak berubah.'],
        soal: 'UTS 24/25 6a dan 6b: Jelaskan perbedaan flat, structured, dan attribute-based naming, lalu sebut satu contoh aplikasi tiap skema.' },
      { h: 'Iterative vs recursive name resolution', tabel: { head: ['Aspek', 'Iterative', 'Recursive'], rows: [
        ['Yang menghubungi server berikutnya', 'Client (resolver)', 'Name server'],
        ['Beban name server', 'Ringan', 'Lebih berat'],
        ['Caching', 'Kurang efektif', 'Efektif, tiap server menyimpan hasil antara'],
        ['Biaya komunikasi', 'Bisa lebih besar', 'Bisa lebih kecil']] },
        soal: 'UTS 24/25 6c: Jelaskan perbedaan iterative dan recursive name resolution.' },
      { h: 'Home-based approach dan Mobile IP', poin: [
        'Host bergerak punya home address tetap dan home agent di jaringan asal.',
        'Di jaringan tamu, host mendapat care-of address (lewat foreign agent) dan mendaftarkannya ke home agent.',
        'Pengirim tetap mengirim ke home address; home agent mencegat dan meneruskan lewat tunnel (IP-in-IP) ke care-of address.',
        'Home agent memberi tahu pengirim lokasi baru, sehingga paket berikutnya bisa langsung (route optimization).',
        'Kekurangan: triangle routing menambah latensi, home agent harus selalu aktif, kurang cocok bila host pindah permanen.'
      ], soal: 'UTS 25/26 6a: Jelaskan apa yang kamu ketahui tentang "The Principle Mobile IP". (4 poin)' },
      { h: 'Soal cerita Mobile IP', poin: [
        'Petakan tokoh ke peran: IP dari operator asal = home address; router operator asal = home agent.',
        'Jaringan operator di negara tujuan = foreign agent, memberi care-of address.',
        'Perangkat mendaftarkan care-of address ke home agent (registration).',
        'Lawan bicara tetap mengirim paket ke home address; home agent meneruskan lewat tunnel ke care-of address.',
        'Aplikasi melihat IP yang sama sehingga panggilan tidak terputus; kekurangannya latensi bertambah.'
      ], soal: 'UTS 25/26 6b: Pengguna VoIP berpindah dari jaringan operator asal ke jaringan roaming di luar negeri, tetapi ingin tetap memakai satu home IP agar panggilan tidak terputus. Bagaimana Mobile IP menangani kasus ini? (6 poin)',
        ingat: 'Soal cerita bernilai paling besar di nomor 6: sebut kelima istilah (home address, home agent, foreign agent, care-of address, tunneling).' },
      { h: 'Chord', poin: [
        'Ring identifier 0 sampai 2^m − 1. Key k disimpan di succ(k): node terkecil dengan ID ≥ k (melingkar).',
        'Finger table: FT_p[i] = succ(p + 2^(i−1)), i = 1..m.',
        'Lookup di node p: jika k ∈ (p, FT_p[1]] kirim ke FT_p[1]; jika tidak, kirim ke finger terjauh yang belum melewati k.',
        'Contoh m = 5, node {1, 4, 9, 11, 14, 18, 20, 21, 28}: FT_4 = [9, 9, 9, 14, 20]; key 26 dari node 1 lewat 1 → 18 → 20 → 21 → 28.'
      ] }
    ]
  },
  {
    label: 'Soal 7', judul: 'Konsistensi dan Fault Tolerance', hlm: '-',
    ringkas: 'Sequential dan causal consistency dari diagram R(x)/W(x), memilih model konsistensi, web proxy dan replikasi web, fault tolerance.',
    bagian: [
      { h: 'Sequential consistency', poin: [
        'Hasilnya sama seperti semua operasi dijalankan dalam satu urutan global, dan operasi tiap proses muncul sesuai urutan programnya.',
        'Langkah: cari satu urutan global yang menjaga urutan program dan setiap R(x)v membaca write terakhir bernilai v.',
        'Cara cepat: jika dua pembaca melihat dua nilai dalam urutan berlawanan, tidak sequential.'
      ], soal: 'UTS 25/26 7a: P1 membaca a dari x lalu menulis b. P2 menulis a lalu c. P3 membaca b lalu c. P4 sama seperti P3. Gambarkan urutan operasinya, lalu tentukan apakah sequentially consistent.',
        tabel: { head: ['Proses', 'Operasi (kiri lebih dulu)'], rows: [
          ['P1', 'R(x)a   W(x)b'], ['P2', 'W(x)a   W(x)c'], ['P3', 'R(x)b   R(x)c'], ['P4', 'R(x)b   R(x)c']] },
        ingat: 'Pembahasan: urutan W2(x)a → R1(x)a → W1(x)b → R3(x)b → R4(x)b → W2(x)c → R3(x)c → R4(x)c memenuhi semua syarat, jadi sequentially consistent (diperiksa dengan lab Konsistensi).' },
      { h: 'Causal consistency', poin: [
        'Write yang berpotensi berhubungan kausal harus dilihat semua proses dalam urutan yang sama.',
        'Write concurrent boleh dilihat dalam urutan berbeda.',
        'Kausal jika: proses membaca nilai lalu menulis nilai baru, atau dua write oleh proses yang sama.',
        'Contoh: P1 W(x)a; P2 R(x)a W(x)b; P3 R(x)b R(x)a → tidak causal (a → b, tetapi P3 melihat b dulu).',
        'Contoh: P1 W(x)a; P2 W(x)b; P3 R(x)b R(x)a; P4 R(x)a R(x)b → causal ya (a dan b concurrent), sequential tidak.',
        'Sequential consistent selalu causal consistent; tidak sebaliknya.'
      ], soal: 'UTS 24/25 7b dan 25/26 7b: Apakah diagram sequentially consistent atau causally consistent? Jelaskan analisis Anda. (4-5 poin)' },
      { h: 'Memilih model konsistensi', tabel: { head: ['Kasus', 'Model', 'Alasan'], rows: [
        ['Stock market, transfer saldo', 'Sequential (atau linearizability)', 'Urutan order dan transaksi harus sama di semua replika'],
        ['Komentar dan balasan', 'Causal', 'Balasan tidak boleh tampil sebelum komentar asli'],
        ['DNS, CDN', 'Eventual', 'Jarang diubah, boleh menyebar perlahan'],
        ['Pengguna mobile pindah replika', 'Client-centric (read-your-writes, monotonic reads)', 'Konsisten dari sudut pandang satu client']] },
        soal: 'UTS 24/25 7c: Anda diminta mendesain electronic stock market. Jenis konsistensi apa yang Anda gunakan? Jelaskan analisisnya.',
        ingat: 'Stock market: pilih model kuat; implementasi totally ordered multicast atau primary-based; latensi lebih tinggi dapat diterima demi ketepatan.' },
      { h: 'Web proxy dan replikasi web', poin: [
        'Web proxy berada di antara browser dan web server, menyimpan salinan (cache) halaman dan objek.',
        'Cache hit: request dilayani dari salinan. Cache miss atau kedaluwarsa: proxy mengambil dari server asal lalu menyimpannya.',
        'Validasi: TTL/Expires, conditional GET (If-Modified-Since, ETag); server membalas 304 Not Modified jika salinan masih sama.',
        'Fungsi: mengurangi latensi, beban server, dan bandwidth; meningkatkan ketersediaan.',
        'Jenis replika: web proxy = client-initiated; CDN = server-initiated; mirror = permanent replica.'
      ], soal: 'UTS 25/26 7c: Jelaskan cara kerja dan fungsi web proxy dalam konsep replikasi web. (3 poin)' },
      { h: 'Fault tolerance', tabel: { head: ['Kegagalan', 'Replika minimum agar k-fault tolerant'], rows: [
        ['Crash / fail-silent', 'k + 1'],
        ['Byzantine dengan voting mayoritas', '2k + 1'],
        ['Konsensus Byzantine penuh', '3k + 1']] },
        poin: ['Failure model: crash, omission, timing, response, arbitrary (Byzantine).', 'Dependability: availability, reliability, safety, maintainability. Redundancy: information, time, physical.'] }
    ]
  }
]);
