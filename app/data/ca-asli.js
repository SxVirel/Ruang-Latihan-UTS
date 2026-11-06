// Komputasi Awan — soal asli UTS Genap 2024/2025 dan Ganjil 2025/2026, satu soal bertahap per nomor.
// Teks soal disalin dari PDF ujian (ejaan asli dipertahankan). Gambar digambar ulang sebagai diagram SVG
// atau tabel. PDF tidak memuat kunci, jadi semua kunci dan contoh jawaban disusun sendiri.
// Vector/Lamport clock dihitung dengan app/js/tools/clocks.js, konsistensi diperiksa dengan consistency.js.
(function () {
  var S = ' Kunci disusun sendiri — perlu dicek.';

  BANK.isian('ca', 'uts2425', 'Soal Asli UTS 24/25', [
    { type: 'steps',
      q: 'Soal No. 1: Sistem Terdistribusi (total 15 poin)',
      steps: [
        { q: 'a. Sistem terdistribusi memiliki sifat Transparency, jelaskan maksud sifat Transparency tersebut! Setidaknya ada 8 jenis Transparency, sebutkan 3 jenis saja dan jelaskan! (5 poin)',
          points: ['Transparency: menyembunyikan fakta bahwa proses dan sumber daya tersebar di banyak komputer, sehingga sistem tampak sebagai satu komputer',
            'Access: menyembunyikan perbedaan representasi data dan cara akses',
            'Location: menyembunyikan di mana objek berada',
            'Replication: menyembunyikan bahwa objek punya beberapa salinan',
            'Jenis lain: relocation, migration, concurrency, failure, persistence'],
          model: 'Transparency berarti sistem terdistribusi menyembunyikan dari pengguna bahwa proses dan sumber dayanya tersebar secara fisik. Tiga contohnya: access transparency menyembunyikan perbedaan format data dan cara aksesnya; location transparency menyembunyikan lokasi objek, misalnya URL tidak menunjukkan server fisiknya; replication transparency menyembunyikan bahwa objek disalin ke beberapa server.' },
        { q: 'b. Suatu sistem terdistribusi memiliki aspek scalability, apa maksudnya? Scalability tersebut dibagi menjadi size scalability, geographical scalability dan administrative scalability. Uraikan maksudnya (cukup pilih salah satu, bebas)! (5 poin)',
          points: ['Scalability: sistem tetap bekerja baik saat ukuran, jarak, atau jumlah organisasinya bertambah',
            'Size: mudah menambah pengguna dan sumber daya; masalahnya komponen terpusat menjadi bottleneck',
            'Geographical: pengguna dan sumber daya berjauhan; masalahnya latensi WAN',
            'Administrative: melintasi banyak organisasi; masalahnya kebijakan keamanan dan pengelolaan berbeda',
            'Cukup satu dimensi diuraikan lengkap dengan contoh'],
          model: 'Scalability adalah kemampuan sistem tetap berfungsi baik saat bertumbuh. Saya memilih size scalability: sistem harus mudah menampung lebih banyak pengguna dan sumber daya tanpa penurunan performa berarti. Masalah utamanya komponen terpusat, misalnya satu server database, yang akan menjadi bottleneck CPU, storage, dan jaringan; solusinya partisi dan replikasi.' },
        { q: 'c. Klasifikasi jenis sistem tersebar secara sederhana adalah High performance distributed computing, cluster computing, grid computing, sistem informasi terdistribusi, Pervasive computing dan ubiquitous computing. Berikanlah satu contoh teknologi dari klasifikasi itu (cukup pilih salah satu, bebas), uraikan secara umum dan analisalah mengapa teknologi itu termasuk sistem tersebar berdasar tiga properti (No global clock, komunikasi antar proses, dan sharing resource)! (5 poin)',
          points: ['Pilih satu teknologi, mis. cloud computing atau cluster',
            'Uraian umum teknologi tersebut',
            'No global clock: tiap mesin punya jam sendiri, perlu sinkronisasi/logical clock',
            'Komunikasi antar proses: lewat jaringan (pesan, RPC, REST), bukan memori bersama',
            'Sharing resource: CPU, storage, jaringan dipakai bersama'],
          model: 'Contoh: cloud computing, yang menyediakan server, storage, dan aplikasi secara on-demand dari banyak data center. Tidak ada jam global, karena setiap server memakai jamnya sendiri dan disinkronkan dengan NTP. Proses berkomunikasi lewat jaringan, misalnya REST API dan message queue. Sumber daya dipakai bersama banyak pelanggan lewat virtualisasi. Ketiga properti terpenuhi, jadi cloud termasuk sistem tersebar.' }
      ],
      ex: 'Soal asli UTS Genap 2024/2025 nomor 1.' + S },

    { type: 'steps',
      q: 'Soal No. 2: Arsitektur Sistem (total 15 poin)',
      steps: [
        { q: 'a. Gambarkan salah satu contoh Arsitektur sistem yang kalian ketahui? (5 poin)',
          points: ['Gambar kotak dan panah satu arsitektur, mis. three-tier client-server',
            'User interface (browser) → application server → database server',
            'Beri label peran tiap komponen',
            'Tunjukkan arah request dan balasan'],
          model: '[Browser] --request--> [Application server] --query--> [Database server]\n[Browser] <--HTML/JSON-- [Application server] <--hasil-- [Database server]\nBrowser adalah lapisan user interface, application server menjalankan logika, database server menyimpan data. Setiap lapisan bisa ditambah servernya sendiri.' },
        { q: 'b. Hybrid system architectures diklaim sebagai kombinasi paling baik dan ramai untuk saat ini, sebutkan dan jelaskan apa saja jenisnya? (5 poin)',
          points: ['Hybrid = gabungan client-server dan P2P',
            'Edge-server systems: server di tepi jaringan dekat pengguna (CDN, edge/fog)',
            'Collaborative distributed systems: bergabung lewat server, bertukar data P2P',
            'Contoh kolaboratif: BitTorrent (tracker terpusat, unduh antar peer)'],
          model: 'Arsitektur hybrid menggabungkan server terpusat dan pertukaran antar peer. Jenis pertama, edge-server systems: server ditempatkan di tepi jaringan, misalnya node CDN di ISP, agar konten dilayani dekat pengguna. Jenis kedua, collaborative distributed systems seperti BitTorrent: peer menghubungi tracker untuk mendapat daftar peer, lalu mengunduh potongan file langsung dari peer lain.' },
        { q: 'c. Salah satu isu karakteristik dari Blockchain adalah immutable, tidak dapat diubah, dan keamanan. Jelaskan menurut anda kenapa bisa begitu! (5 poin)',
          points: ['Ledger disalin di banyak node P2P tanpa pusat',
            'Tiap blok menyimpan hash blok sebelumnya; ubah satu blok, rantai sesudahnya tidak valid',
            'Blok baru diterima lewat konsensus (proof of work/stake)',
            'Penyerang harus menguasai mayoritas node',
            'Transaksi ditandatangani kriptografi kunci publik'],
          model: 'Setiap blok berisi hash blok sebelumnya. Jika satu transaksi lama diubah, hash blok itu berubah dan rantai sesudahnya putus, sehingga perubahan langsung terdeteksi. Ledger juga disalin di banyak node, dan blok baru hanya diterima lewat konsensus, sehingga penyerang harus mengalahkan mayoritas node. Ditambah tanda tangan digital pada setiap transaksi, data blockchain praktis tidak dapat diubah dan aman.' }
      ],
      ex: 'Soal asli UTS Genap 2024/2025 nomor 2.' + S },

    { type: 'steps',
      q: 'Soal No. 3: Proses (total 15 poin)',
      steps: [
        { q: 'a. Jelaskan 4 perbedaan Proses dan Thread? (5 poin)',
          points: ['Address space: proses sendiri, thread berbagi',
            'Biaya buat dan context switch: proses mahal, thread murah',
            'Komunikasi: proses lewat IPC, thread lewat variabel bersama',
            'Isolasi: crash satu proses tidak merusak yang lain; crash satu thread bisa mematikan proses'],
          model: 'Pertama, proses memiliki address space sendiri, sedangkan thread berbagi memori proses induknya. Kedua, membuat dan berpindah antar proses lebih mahal daripada thread. Ketiga, proses berkomunikasi lewat IPC, sedangkan thread cukup memakai variabel bersama sehingga perlu sinkronisasi. Keempat, proses saling terisolasi, sedangkan kesalahan satu thread dapat menghentikan seluruh proses.' },
        { q: 'b. Salah satu karakteristik sistem terdistribusi adalah kerjasama antara Thread dan Kernel. Jelaskan dan berikan contoh penggunaan kerjasamaThread dan Kernel yang kamu ketahui! (5 poin)',
          points: ['Library thread menjadwalkan user thread di atas lightweight process (LWP)',
            'Kernel menjadwalkan LWP/kernel thread ke CPU',
            'Thread blocking hanya memblokir LWP-nya; LWP lain menjalankan thread lain',
            'Scheduler activation: kernel memberi tahu library lewat upcall',
            'Contoh: web server dispatcher/worker'],
          model: 'Thread dibuat dan dijadwalkan library di ruang pengguna, sedangkan kernel menjadwalkan lightweight process atau kernel thread ke CPU. Ketika satu thread melakukan system call yang blocking, kernel hanya memblokir LWP pembawanya, dan LWP lain melanjutkan thread lain. Contoh: web server multithread, satu worker menunggu disk sementara worker lain tetap melayani request.' },
        { q: 'c. Buatlah contoh aplikasi sederhana menghitung Luas dan Keliling Lingkaran dengan penggunaan Thread! (5 poin)',
          points: ['Fungsi luas = π·r²', 'Fungsi keliling = 2·π·r', 'Dua objek thread, satu per fungsi', 'start() lalu join(), lalu cetak hasil'],
          model: 'import threading, math\nr = 7\nhasil = {}\ndef luas():\n    hasil["luas"] = math.pi * r**2\ndef keliling():\n    hasil["keliling"] = 2 * math.pi * r\nt1 = threading.Thread(target=luas)\nt2 = threading.Thread(target=keliling)\nt1.start(); t2.start()\nt1.join(); t2.join()\nprint("Luas =", hasil["luas"], "Keliling =", hasil["keliling"])' }
      ],
      ex: 'Soal asli UTS Genap 2024/2025 nomor 3.' + S },

    { type: 'steps',
      q: 'Soal No. 4: Komunikasi (total 15 poin)',
      steps: [
        { q: 'a. Sebutkan dan jelaskan secara ringkas dua protokol standar pada lapisan Transport! (5 poin)',
          points: ['TCP: connection-oriented, three-way handshake', 'TCP: andal, berurutan, ada retransmisi dan flow control', 'UDP: connectionless, datagram tanpa jaminan sampai', 'UDP: ringan dan cepat (DNS, VoIP, streaming)'],
          model: 'TCP adalah protokol connection-oriented: koneksi dibuka dengan three-way handshake, lalu data dijamin sampai lengkap dan berurutan lewat acknowledgment dan retransmisi; cocok untuk web dan transfer file. UDP adalah protokol connectionless: data dikirim sebagai datagram tanpa jaminan sampai, sehingga ringan dan cepat; cocok untuk DNS, VoIP, dan streaming.' },
        { q: 'b. Jelaskan secara ringkas tipe komunikasi transient dan persistent! (5 poin)',
          points: ['Persistent: pesan disimpan middleware sampai diterima', 'Persistent: pengirim dan penerima tidak perlu aktif bersamaan (email, message queue)', 'Transient: pesan hanya disimpan selama pengirim dan penerima aktif', 'Transient: pesan hilang jika penerima tidak aktif (UDP, RPC)', 'Boleh ditambah kombinasi synchronous/asynchronous'],
          model: 'Pada komunikasi persistent, middleware menyimpan pesan sampai penerima mengambilnya, sehingga penerima tidak harus aktif saat pesan dikirim; contohnya email dan message queue. Pada komunikasi transient, pesan hanya ada selama pengirim dan penerima sama-sama berjalan; jika penerima tidak aktif, pesan hilang; contohnya UDP dan RPC.' },
        { q: 'c. Jelaskan secara ringkas mengenai Message Broker dan sebutkan fungsi utamanya! (5 poin)',
          points: ['Perantara dalam message-oriented middleware', 'Fungsi utama: konversi format pesan antar aplikasi', 'Merutekan pesan berdasarkan aturan atau topik', 'Menyimpan di antrean (persistent asynchronous)', 'Contoh: RabbitMQ, Kafka'],
          model: 'Message broker adalah perantara dalam message-queuing system yang menerima pesan dari pengirim dan meneruskannya ke penerima. Fungsi utamanya mengubah format pesan agar aplikasi yang berbeda saling memahami, serta merutekan pesan berdasarkan aturan atau topik. Contohnya RabbitMQ dan Apache Kafka.' }
      ],
      ex: 'Soal asli UTS Genap 2024/2025 nomor 4.' + S },

    { type: 'steps',
      q: 'Soal No. 5: Koordinasi (total 15 poin)',
      figure: { type: 'clock', procs: 3,
        events: [
          { id: 'b', p: 0, t: 12 }, { id: 'c', p: 0, t: 29 }, { id: 'd', p: 0, t: 45, box: true }, { id: 'e', p: 0, t: 79 },
          { id: 'a', p: 1, t: 4, below: true }, { id: 'f', p: 1, t: 37, below: true }, { id: 'g', p: 1, t: 62 },
          { id: 'h', p: 2, t: 71 }, { id: 'i', p: 2, t: 95 }],
        msgs: [{ from: 'a', to: 'b', label: 'm1' }, { from: 'c', to: 'f', label: 'm3' }, { from: 'e', to: 'i', label: 'm2' }, { from: 'g', to: 'h', label: 'm4' }],
        caption: 'Digambar ulang dari soal. d (kotak) adalah event lokal di P1. Urutan event di P1: b, c, d, e; di P2: a, f, g; di P3: h, i.' },
      steps: [
        { q: 'a. Apa itu Election algorithm dan untuk apa? Pilihlah salah satu contoh election algorithm dan jelaskan secara singkat cara kerjanya! (5 poin)',
          points: ['Election: memilih satu proses sebagai koordinator yang disepakati semua proses', 'Dipakai saat koordinator lama crash atau saat sistem mulai', 'Bully: kirim ELECTION ke ID lebih tinggi; ada OK berhenti; tak ada jawaban menang', 'Pemenang mengirim COORDINATOR ke semua proses', 'Atau Ring: daftar ID beredar, ID tertinggi dipilih, COORDINATOR diedarkan'],
          model: 'Election algorithm dipakai untuk memilih satu proses sebagai koordinator, misalnya untuk mutual exclusion, saat koordinator lama gagal. Contoh Bully: proses yang menyadari kegagalan mengirim ELECTION ke semua proses ber-ID lebih tinggi. Jika ada yang membalas OK, ia berhenti dan yang lebih tinggi melanjutkan; jika tidak ada balasan, ia menang dan mengirim COORDINATOR ke semua proses. Proses ber-ID tertinggi yang hidup selalu menang.' },
        { q: 'b. Gunakan vector clock untuk menentukan timestamp semua event (8 poin). Tulis dengan format (P1,P2,P3), mis. 1,0,0.',
          fields: [
            { label: 'a', a: '0 1 0' }, { label: 'b', a: '1 1 0' }, { label: 'c', a: '2 1 0' },
            { label: 'd', a: '3 1 0' }, { label: 'e', a: '4 1 0' }, { label: 'f', a: '2 2 0' },
            { label: 'g', a: '2 3 0' }, { label: 'h', a: '2 3 1' }, { label: 'i', a: '4 3 2' }],
          ex: 'a = (0,1,0). b menerima m1: max((0,0,0), a) lalu naikkan P1 → (1,1,0). c = (2,1,0), d = (3,1,0), e = (4,1,0). f menerima m3 dari c: max((0,1,0), (2,1,0)) → (2,2,0). g = (2,3,0). h menerima m4: max((0,0,0), g) → (2,3,1). i menerima m2: max(h, e) = (4,3,1) → (4,3,2). Dihitung dengan clocks.js.' },
        { q: 'c. Berdasarkan hasil di (b), apakah m2 dan m4 saling bergantung secara kausal? (2 poin)',
          fields: [
            { label: 'Vector clock saat m2 dikirim (event e)', a: '4 1 0' },
            { label: 'Vector clock saat m4 dikirim (event g)', a: '2 3 0' },
            { label: 'Bergantung secara kausal? (ya/tidak)', a: ['tidak', 'no', 'concurrent', 'tidak bergantung'] }],
          ex: '(4,1,0) dan (2,3,0) tidak saling ≤: komponen P1 4 > 2, komponen P2 1 < 3. Jadi pengiriman m2 dan m4 concurrent, tidak saling bergantung secara kausal.' }
      ],
      ex: 'Soal asli UTS Genap 2024/2025 nomor 5.' + S },

    { type: 'steps',
      q: 'Soal No. 6: Penamaan (total 15 poin)',
      steps: [
        { q: 'a. Jelaskan perbedaan-perbedaan antara flat naming, structured naming dan attribute-based naming! (5 poin)',
          points: ['Flat: identifier tanpa struktur, tidak terbaca manusia; resolusi dengan broadcasting, forwarding pointer, home-based, DHT', 'Structured: name space hierarkis, mudah dibaca, diselesaikan per tingkat', 'Attribute-based: entitas dicari lewat pasangan atribut-nilai (directory service)', 'Perbedaan utama: bentuk nama dan cara pencarian'],
          model: 'Flat naming memakai identifier tanpa struktur, seperti hasil hash, sehingga tidak memberi petunjuk lokasi dan diselesaikan dengan teknik seperti DHT. Structured naming menyusun nama secara hierarkis dalam name space sehingga mudah dibaca dan diselesaikan tingkat demi tingkat. Attribute-based naming mencari entitas berdasarkan atributnya, bukan namanya.' },
        { q: 'b. Sebutkan satu contoh aplikasi untuk setiap skema penamaan (flat naming, structured naming dan attribute-based naming)! (5 poin)',
          fields: [
            { label: 'Flat naming', a: ['chord', 'dht', 'alamat mac', 'mac address', 'bittorrent', 'mobile ip'] },
            { label: 'Structured naming', a: ['dns', 'sistem file', 'file system', 'url'] },
            { label: 'Attribute-based naming', a: ['ldap', 'active directory', 'x.500', 'directory service'] }],
          ex: 'Jawaban lain yang tepat juga benar; kunci menerima contoh yang paling umum.' },
        { q: 'c. Jelaskan perbedaan iterative dan recursive name resolution! (5 poin)',
          points: ['Iterative: client menghubungi root, menerima alamat server berikutnya, lalu menghubunginya sendiri', 'Recursive: client hanya bertanya ke satu server; server meneruskan ke server berikutnya', 'Recursive: caching lebih efektif, komunikasi bisa lebih hemat', 'Recursive: beban name server lebih besar; iterative lebih ringan bagi server'],
          model: 'Pada iterative name resolution, resolver menanyakan root server, menerima alamat server untuk bagian nama berikutnya, lalu resolver sendiri yang menghubungi server itu, dan seterusnya. Pada recursive name resolution, resolver cukup bertanya ke satu server, dan server itu yang meneruskan ke server di bawahnya lalu mengembalikan hasil akhir. Recursive membuat caching lebih efektif, tetapi membebani name server.' }
      ],
      ex: 'Soal asli UTS Genap 2024/2025 nomor 6.' + S },

    { type: 'steps',
      q: 'Soal No. 7: Konsistensi dan Fault Tolerant (total 15 poin)',
      steps: [
        { q: 'a. Apakah gambar di bawah sequentially consistent? Jelaskan analisis Anda? (5 poin)',
          figure: { type: 'ops', rows: [
            ['P1', '', 'R(x)a', '', 'W(x)c', '', ''],
            ['P2', 'W(x)a', '', 'W(x)b', '', '', ''],
            ['P3', '', '', '', '', 'R(x)c', 'R(x)b'],
            ['P4', '', '', '', '', 'R(x)c', 'R(x)b']] },
          fields: [
            { label: 'Sequentially consistent? (ya/tidak)', a: ['ya', 'yes'] },
            { label: 'Urutan nilai yang dilihat semua pembaca', a: ['c b', 'c lalu b', 'c kemudian b'] }],
          ex: 'Urutan global: W2(x)a → R1(x)a → W1(x)c → R3(x)c → R4(x)c → W2(x)b → R3(x)b → R4(x)b. Urutan program tiap proses terjaga, dan P3 serta P4 sama-sama melihat c lalu b. Waktu nyata tidak dipersoalkan. Diperiksa dengan consistency.js.' },
        { q: 'b. Apakah gambar di bawah casually consistent? Jelaskan analisis Anda? (5 poin)',
          figure: { type: 'ops', rows: [
            ['P1', '', 'R(x)a', '', 'W(x)c', '', ''],
            ['P2', 'W(x)a', '', 'W(x)b', '', '', ''],
            ['P3', '', '', '', '~R(x)a', 'R(x)b', 'R(x)c'],
            ['P4', '', '', '', '~R(x)a', 'R(x)c', 'R(x)b']], caption: 'Digambar ulang dari soal. R(x)a pada P3 dan P4 tercetak abu-abu seperti di soal asli. Waktu bergerak ke kanan.' },
          fields: [
            { label: 'Causally consistent? (ya/tidak)', a: ['ya', 'yes'] },
            { label: 'Pasangan write yang concurrent', a: ['b c', 'w(x)b w(x)c', 'b dan c'], set: true },
            { label: 'Sequentially consistent? (ya/tidak)', a: ['tidak', 'no'] }],
          ex: 'Hubungan kausal: W(x)a → W(x)c (P1 membaca a lalu menulis c) dan W(x)a → W(x)b (urutan program P2). W(x)b dan W(x)c concurrent. P3 dan P4 sama-sama melihat a lebih dulu, lalu b dan c dalam urutan berbeda; itu diizinkan causal consistency. Karena urutan b dan c berbeda antar pembaca, tidak sequential.' },
        { q: 'c. Anda diminta untuk mendesain stock market. Jenis konsistensi apakah yang akan Anda gunakan untuk mengimplementasikan electronic stock market? Jelaskan jawaban dan analisis Anda! (5 poin)',
          points: ['Pilih model kuat: sequential consistency (atau linearizability)', 'Semua replika harus melihat urutan order beli/jual yang sama', 'Urutan berbeda bisa membuat saham terjual dua kali atau harga salah', 'Implementasi: totally ordered multicast atau primary-based', 'Konsekuensi: latensi lebih tinggi, dapat diterima demi ketepatan'],
          model: 'Saya memilih sequential consistency, bahkan linearizability untuk eksekusi order. Setiap order beli dan jual harus diproses dalam urutan yang sama di semua replika karena urutan menentukan harga dan siapa yang mendapat saham; jika replika melihat urutan berbeda, satu saham bisa terjual dua kali. Implementasinya memakai totally ordered multicast atau satu primary yang mengurutkan order. Biayanya latensi lebih tinggi, tetapi ketepatan lebih penting.' }
      ],
      ex: 'Soal asli UTS Genap 2024/2025 nomor 7. Gambar 7a dan 7b digambar ulang dengan posisi operasi seperti di soal.' + S }
  ]);

  BANK.isian('ca', 'uts2526', 'Soal Asli UTS 25/26', [
    { type: 'steps',
      q: 'Soal No. 1: Sistem Terdistribusi (total 10 poin)',
      steps: [
        { q: 'a. Apa yang dimaksud sistem centralized, decentralized, dan distributed? (3 poin)',
          points: ['Centralized: satu titik pusat mengendalikan proses dan sumber daya', 'Decentralized: kendali dibagi ke beberapa pusat lokal (hub)', 'Distributed: tidak ada pusat, node setara bekerja sama dan tampak sebagai satu sistem', 'Contoh atau dampak single point of failure'],
          model: 'Centralized: satu node pusat memegang data dan keputusan, misalnya aplikasi di satu server; jika server mati, layanan berhenti. Decentralized: kendali dibagi ke beberapa pusat lokal, misalnya email yang tiap domainnya punya mail server sendiri. Distributed: tidak ada pusat; node-node setara bekerja sama dan tampak sebagai satu sistem, misalnya jaringan P2P atau cluster.' },
        { q: 'b. Jelaskan definisi Distribution Transparency dan sebutkan tipe-tipenya! (4 poin)',
          points: ['Definisi: menyembunyikan bahwa proses dan sumber daya tersebar di banyak komputer', 'Access, location, relocation, migration', 'Replication, concurrency, failure', 'Persistence pada daftar 8 tipe'],
          model: 'Distribution transparency adalah sifat sistem terdistribusi yang menyembunyikan dari pengguna bahwa proses dan sumber dayanya tersebar secara fisik. Tipenya: access, location, relocation, migration, replication, concurrency, dan failure transparency; daftar lama menambahkan persistence.' },
        { q: 'c. Jelaskan sistem Shared Memory dan Private Memory pada Parallel Computing berikut! (3 poin)',
          figure: { type: 'memory' },
          points: ['Shared memory (multiprocessor): beberapa prosesor mengakses memori bersama lewat interconnect', 'Komunikasi lewat baca/tulis memori bersama, perlu sinkronisasi', 'Private memory (multicomputer): tiap prosesor punya memori sendiri', 'Komunikasi lewat message passing melalui interconnect; lebih mudah diskalakan'],
          model: 'Pada shared memory, semua prosesor terhubung ke modul memori yang sama melalui interconnect, sehingga data cukup ditulis satu prosesor dan dibaca prosesor lain; mudah diprogram, tetapi interconnect dan memori menjadi bottleneck saat prosesor bertambah. Pada private memory, setiap prosesor memiliki memorinya sendiri, dan pertukaran data dilakukan lewat pesan melalui interconnect; lebih sulit diprogram tetapi bisa diskalakan sampai ribuan node.' }
      ],
      ex: 'Soal asli UTS Ganjil 2025/2026 nomor 1. Gambar 1c digambar ulang.' + S },

    { type: 'steps',
      q: 'Soal No. 2: Arsitektur Sistem (total 10 poin)',
      steps: [
        { q: 'a. Arsitektur klien-server (C-S) sering digambarkan "sangat tersentralisasi", sementara sistem peer-to-peer (P2P) "terdesentralisasi". Secara konseptual, apa perbedaan mendasar dilihat dari sisi pembagian peran dan kepemilikan sumber daya kedua gaya arsitektur ini, dan bagaimana perbedaan ini memengaruhi ketahanan sistem? (5 poin)',
          points: ['C-S: peran asimetris, server melayani dan client meminta', 'C-S: sumber daya dimiliki dan dikelola server', 'P2P: peran simetris, tiap peer client sekaligus server', 'P2P: sumber daya tersebar di banyak peer', 'Ketahanan: server C-S single point of failure; P2P tetap jalan saat sebagian peer keluar'],
          model: 'Pada client-server, perannya tidak setara: server memiliki dan mengelola sumber daya, client hanya meminta. Akibatnya, jika server gagal, seluruh layanan berhenti, dan server bisa menjadi bottleneck. Pada P2P, setiap peer setara dan menyediakan sumber dayanya sendiri. Sistem tetap berjalan walau sebagian peer keluar, sehingga lebih tahan gagal, tetapi data bisa tidak tersedia jika peer penyimpannya offline.' },
        { q: 'b. Sistem P2P (peer to peer) mengorganisasikan proses ke dalam jaringan overlay. Bandingkan perbedaan konseptual utama antara jaringan overlay terstruktur dan jaringan overlay tak terstruktur, dengan fokus pada bagaimana masing-masing pendekatan tersebut menangani masalah penempatan sumber daya (item data) tertentu. (5 poin)',
          points: ['Terstruktur: topologi mengikuti aturan (ring, tree)', 'Terstruktur: item data ditempatkan deterministik, key = hash(data) di node tertentu (DHT)', 'Terstruktur: lookup efisien O(log N), pasti ketemu (Chord)', 'Tak terstruktur: tetangga acak, item data di node mana saja', 'Tak terstruktur: pencarian dengan flooding atau random walk, tidak pasti ketemu (Gnutella)'],
          model: 'Pada overlay terstruktur, misalnya Chord, setiap item data diberi key hasil hash dan wajib disimpan di node tertentu, yaitu succ(key). Karena tempatnya pasti, pencarian cukup O(log N) hop dan selalu berhasil. Pada overlay tak terstruktur, node terhubung secara acak dan data disimpan di mana saja, sehingga query disebar dengan flooding atau random walk; boros pesan dan tidak menjamin ketemu.' }
      ],
      ex: 'Soal asli UTS Ganjil 2025/2026 nomor 2.' + S },

    { type: 'steps',
      q: 'Soal No. 3: Proses (total 10 poin)',
      steps: [
        { q: 'a. Jelaskan perbedaan utama antara many-to-one dan one-to-one threading model dalam sistem operasi. (4 poin)',
          points: ['Many-to-one: banyak user thread ke satu kernel thread', 'Many-to-one: satu blocking call memblokir semua; tidak paralel di multicore', 'One-to-one: tiap user thread punya kernel thread sendiri', 'One-to-one: blocking tidak menular, bisa paralel, tetapi operasi thread lebih mahal'],
          model: 'Pada many-to-one, banyak thread level pengguna berbagi satu kernel thread: operasi thread murah, tetapi jika satu thread blocking, seluruh proses ikut berhenti dan tidak bisa paralel di beberapa core. Pada one-to-one, setiap thread punya kernel thread sendiri, sehingga thread lain tetap jalan saat satu thread blocking dan multicore bisa dimanfaatkan; kelemahannya, pembuatan dan switching thread lebih mahal.' },
        { q: 'b. Sebuah aplikasi multithreaded memiliki maksimum 4 thread aktif (N=4) dengan distribusi waktu: 0 = 0.10, 1 = 0.40, 2 = 0.35, 3 = 0.10, 4 = 0.05 . Hitung nilai Thread-Level Parallelism (TLP). (3 poin)',
          fields: [
            { label: 'Σ i·ci (i = 1..4)', a: 1.6, tol: 0.005 },
            { label: '1 − c0', a: 0.9, tol: 0.005 },
            { label: 'TLP (2 desimal)', a: 1.78, tol: 0.01 }],
          ex: 'Σ i·ci = 1×0,40 + 2×0,35 + 3×0,10 + 4×0,05 = 1,60. Rumus van Steen & Tanenbaum: TLP = 1,60 / (1 − 0,10) = 1,78. Jika dosen memakai rata-rata tertimbang tanpa pembagi, jawabannya 1,60; tulis rumus yang dipakai.' },
        { q: 'c. Mengapa multithreaded client dapat bekerja lebih cepat dibanding single-threaded client dalam mengakses halaman web? (3 poin)',
          points: ['Halaman web berisi banyak objek (gambar, CSS, script)', 'Single-thread mengambil objek satu per satu dan menunggu', 'Multithread membuka beberapa koneksi sekaligus, satu thread per objek', 'Latensi jaringan tumpang tindih; halaman tampil bertahap; bisa dibagi ke replika server'],
          model: 'Halaman web memuat banyak objek. Client single-thread harus menunggu satu objek selesai sebelum meminta objek berikutnya, sehingga waktu tunggu jaringan menumpuk. Client multithread menjalankan beberapa thread yang mengambil objek secara bersamaan, sehingga waktu tunggu saling menutupi dan halaman tampil lebih cepat; jika server direplikasi, unduhan dapat dibagi ke beberapa replika.' }
      ],
      ex: 'Soal asli UTS Ganjil 2025/2026 nomor 3.' + S },

    { type: 'steps',
      q: 'Soal No. 4: Komunikasi (total 10 poin)',
      steps: [
        { q: 'a. Terdapat tipe-tipe dalam cara komunikasi pada sistem terdistribusi, sebutkkan dan jelaskan masing-masing tipe! (4 poin)',
          points: ['Persistent: pesan disimpan middleware sampai diterima', 'Transient: pesan hilang jika penerima tidak aktif', 'Synchronous: pengirim diblokir (sampai submission, delivery, atau response)', 'Asynchronous: pengirim langsung lanjut', 'Kombinasi dan contoh: email (persistent async), RPC (transient sync), UDP (transient async)'],
          model: 'Persistent: pesan disimpan middleware sampai diambil, contohnya email. Transient: pesan hanya ada selama kedua pihak aktif, contohnya UDP. Synchronous: pengirim menunggu sampai pesan diterima middleware, diterima penerima, atau selesai diproses, contohnya RPC. Asynchronous: pengirim langsung melanjutkan setelah mengirim. Kombinasinya persistent asynchronous, persistent synchronous, transient asynchronous, dan transient synchronous.' },
        { q: 'b. Tipe apakah yang umumnya digunakan pada komunikasi client/server? Jelaskan! (3 poin)',
          points: ['Buku: transient synchronous (request-reply)', 'Client diblokir sampai server membalas', 'Server harus aktif, pesan tidak disimpan', 'Kisi-kisi dosen: contoh client-server minggu 4 digolongkan transient asynchronous'],
          model: 'Komunikasi client/server umumnya transient synchronous: client mengirim request lalu menunggu balasan, seperti pada RPC atau HTTP, dan pesan tidak disimpan sehingga server harus aktif saat itu. Catatan: kisi-kisi dosen menggolongkan contoh client-server minggu 4 sebagai transient asynchronous karena client tidak menunggu balasan; sebutkan konteks yang dipakai.' },
        { q: 'c. Jelaskan metode/teknik pada Multicast memungkinkan pengiriman pesan dari satu pengirim ke banyak penerima secara bersamaan (3 poin)',
          points: ['IP multicast: router menyalin paket untuk alamat grup', 'Application-level multicast: overlay tree/mesh, node meneruskan ke anaknya', 'Kualitas overlay: link stress dan stretch', 'Flooding dan gossip (epidemic) sebagai alternatif'],
          model: 'Multicast mengirim satu pesan ke sekelompok penerima. Di lapisan jaringan, IP multicast membuat router menyalin paket untuk semua anggota grup. Di lapisan aplikasi, node membentuk pohon overlay dan setiap node meneruskan pesan ke anaknya; kualitasnya diukur dengan link stress dan stretch. Alternatifnya flooding ke semua tetangga atau gossip ke tetangga acak.' }
      ],
      ex: 'Soal asli UTS Ganjil 2025/2026 nomor 4.' + S },

    { type: 'steps',
      q: 'Soal No. 5: Koordinasi (total 10 poin)',
      figure: { type: 'clock', procs: 3,
        events: [
          { id: 'a', p: 0, t: 8 }, { id: 'b', p: 0, t: 22 },
          { id: 'c', p: 1, t: 35, below: true }, { id: 'd', p: 1, t: 90 },
          { id: 'e', p: 2, t: 10 }, { id: 'f', p: 2, t: 68 }, { id: 'g', p: 2, t: 78 }],
        msgs: [{ from: 'a', to: 'c' }, { from: 'e', to: 'c' }, { from: 'b', to: 'f' }, { from: 'g', to: 'd' }],
        caption: 'Digambar ulang dari soal. Pesan: a→c, e→c, b→f, g→d.' },
      steps: [
        { q: 'a. Algoritma election sangat penting dalam sistem terdistribusi. Apa masalah utama yang diselesaikan oleh algoritma election? Terdapat algoritma pemilihan Bully dan Ring, pilih salah satu algoritma dan jelaskan cara kerjanya langkah demi langkah hingga informasi mengenai koordinator baru tersebut diketahui oleh seluruh proses. (4 poin)',
          points: ['Masalah: memilih tepat satu koordinator yang disepakati semua proses setelah koordinator lama gagal', 'Ring: pemrakarsa mengirim ELECTION berisi ID-nya ke penerus, proses mati dilewati', 'Tiap proses menambahkan ID-nya lalu meneruskan', 'Saat kembali ke pemrakarsa, ID tertinggi dipilih', 'Pesan COORDINATOR diedarkan satu putaran agar semua proses tahu'],
          model: 'Algoritma election menyelesaikan masalah pemilihan satu koordinator yang disepakati semua proses setelah koordinator lama gagal. Ring: proses disusun dalam ring logis. Proses yang menyadari kegagalan mengirim pesan ELECTION berisi ID-nya ke penerus, melewati proses yang mati. Setiap proses menambahkan ID-nya lalu meneruskan. Ketika pesan kembali ke pemrakarsa, ID tertinggi dipilih, lalu pesan COORDINATOR diedarkan satu putaran sehingga semua proses tahu koordinator baru.' },
        { q: 'b. Kita telah mempelajari Vector’s clock dan Lamport’s clock. Apa masalah utama yang dimiliki oleh Lamport’s clock? (2 poin)',
          points: ['Lamport menjamin: a → b maka L(a) < L(b)', 'Tetapi L(a) < L(b) tidak berarti a → b', 'Tidak bisa membedakan event kausal dan concurrent', 'Vector clock mengatasinya'],
          model: 'Lamport clock hanya menjamin satu arah: jika a terjadi sebelum b, maka L(a) < L(b). Sebaliknya tidak berlaku; L(a) < L(b) tidak berarti a mendahului b, karena keduanya bisa concurrent. Jadi Lamport clock tidak menangkap kausalitas, dan vector clock dipakai untuk itu.' },
        { q: 'c. Gunakan Vektor’s clock untuk menentukan timestamp dari semua event. (4 poin) Tulis dengan format (P1,P2,P3), mis. 1,0,0.',
          fields: [
            { label: 'a', a: '1 0 0' }, { label: 'b', a: '2 0 0' }, { label: 'c', a: '1 1 1' }, { label: 'd', a: '2 2 3' },
            { label: 'e', a: '0 0 1' }, { label: 'f', a: '2 0 2' }, { label: 'g', a: '2 0 3' }],
          ex: 'c menerima dari a (1,0,0) dan e (0,0,1): max = (1,0,1), naikkan P2 → (1,1,1). f menerima dari b: max((0,0,1), (2,0,0)) = (2,0,1) → (2,0,2). g = (2,0,3). d: max((1,1,1), g) = (2,1,3) → (2,2,3). Lamport: a 1, b 2, c 2, d 5, e 1, f 3, g 4. Dihitung dengan clocks.js; diagram ini juga ada di lab Timestamp.' }
      ],
      ex: 'Soal asli UTS Ganjil 2025/2026 nomor 5.' + S },

    { type: 'steps',
      q: 'Soal No. 6: Penamaan (total 10 poin)',
      steps: [
        { q: 'a. Jelaskan apa yang kamu ketahui tentang "The Principle Mobile IP"? (4 poin)',
          points: ['Contoh home-based approach untuk entitas bergerak', 'Host punya home address tetap dan home agent di jaringan asal', 'Di jaringan tamu host mendapat care-of address (lewat foreign agent) dan mendaftarkannya', 'Home agent meneruskan paket lewat tunnel ke care-of address', 'Kekurangan: triangle routing, home agent harus selalu aktif'],
          model: 'Prinsip Mobile IP: setiap host bergerak memiliki home address tetap dan home agent di jaringan asalnya. Ketika host pindah ke jaringan lain, ia memperoleh care-of address, biasanya lewat foreign agent, lalu mendaftarkannya ke home agent. Pengirim tetap mengirim ke home address; home agent menangkap paket dan meneruskannya lewat tunnel ke care-of address, lalu memberi tahu pengirim alamat terbaru. Alamat yang dikenal aplikasi tidak berubah walau lokasi berubah.' },
        { q: 'b. Soal cerita Kasus "The Principle Mobile IP":\nImmanuel seorang warga negara Indonesia dan tinggal di Jakarta selalu menggunakan teknologi VOIP Whatsapp untuk berkomunikasi dengan koleganya, beliau menggunakan Telkomsel sebagai provider internetnya.\nPada saat Immanuel mengunjungi Singapore, beliau menggunakan jaringan data yang berbeda (misalnya dari Telkomsel roaming ke SingaporeTelecom(Singtel)).\nTetapi Immanuel tetap ingin memiliki satu IP "tetap" (Home IP) meskipun secara fisik atau jaringan berubah, agar panggilan tidak terputus dan koneksi tetap stabil.\nPertanyaannya: Bagaimana sistem "Mobile IP" menangani kasus ini? (6 poin)',
          points: ['Home address = IP dari Telkomsel; home agent di jaringan Telkomsel', 'Di Singapura, jaringan Singtel (foreign agent) memberi care-of address', 'Perangkat mendaftarkan care-of address ke home agent (registration)', 'Kolega tetap mengirim paket suara ke home address', 'Home agent mencegat dan meneruskan lewat tunnel (IP-in-IP) ke care-of address', 'Aplikasi melihat IP yang sama sehingga panggilan tidak putus; latensi bertambah (triangle routing)'],
          model: 'Perangkat Immanuel tetap memiliki home address dari Telkomsel, dan home agent berada di jaringan Telkomsel. Saat tersambung ke Singtel, perangkat memperoleh care-of address dari jaringan Singtel (foreign agent) lalu mendaftarkannya ke home agent. Kolega tetap mengirim paket WhatsApp ke home address; home agent mencegat paket itu dan membungkusnya dalam tunnel ke care-of address di Singapura. Immanuel membalas langsung ke koleganya. Karena IP yang dilihat aplikasi tidak berubah, panggilan tetap tersambung, dengan tambahan latensi karena jalur segitiga.' }
      ],
      ex: 'Soal asli UTS Ganjil 2025/2026 nomor 6.' + S },

    { type: 'steps',
      q: 'Soal No. 7: Konsistensi dan Fault Tolerant (total 10 poin)',
      steps: [
        { q: 'a. Gambarkan yang menampilkan urutan operasi read (R(x)) dan write (W(x)) terhadap variabel bersama x yang dilakukan oleh empat proses (P1, P2, P3, dan P4):\nProses P1: Pertama membaca nilai a dari x, kemudian menulis nilai b ke x.\nProses P2: Menulis nilai a ke x lalu menulis nilai c ke x.\nProses P3: Membaca nilai b , kemudian membaca nilai c.\nProses P4: Sama seperti P3, membaca nilai b lalu membaca nilai c. (3 poin)',
          points: ['Satu baris per proses, waktu bergerak ke kanan', 'P1: R(x)a lalu W(x)b', 'P2: W(x)a (paling awal) lalu W(x)c', 'P3 dan P4: R(x)b lalu R(x)c, ditempatkan setelah kedua write', 'Penempatan masuk akal: W(x)a sebelum R(x)a, W(x)b sebelum R(x)b'],
          model: 'P1:        R(x)a        W(x)b\nP2: W(x)a                        W(x)c\nP3:                                      R(x)b   R(x)c\nP4:                                      R(x)b   R(x)c\nDiagram ini sequentially consistent: urutan W2(x)a, R1(x)a, W1(x)b, R3(x)b, R4(x)b, W2(x)c, R3(x)c, R4(x)c memenuhi urutan program semua proses (diperiksa dengan lab Konsistensi).' },
        { q: 'b. Apakah gambar di bawah sequentially consistent atau casually consistent? Jelaskan analisis Anda! (4 poin)',
          figure: { type: 'ops', rows: [
            ['P1', '', 'R(x)a', '', 'W(x)c', '', ''],
            ['P2', 'W(x)a', '', 'W(x)b', '', '', ''],
            ['P3', '', '', '', '', 'R(x)c', 'R(x)b'],
            ['P4', '', '', '', '', 'R(x)c', 'R(x)b']] },
          fields: [
            { label: 'Sequentially consistent? (ya/tidak)', a: ['ya', 'yes'] },
            { label: 'Causally consistent? (ya/tidak)', a: ['ya', 'yes'] },
            { label: 'Urutan nilai yang dilihat semua pembaca', a: ['c b', 'c lalu b', 'c kemudian b'] }],
          ex: 'Gambar ini sama dengan UTS 24/25 7a. Urutan global W2(x)a → R1(x)a → W1(x)c → R3(x)c → R4(x)c → W2(x)b → R3(x)b → R4(x)b memenuhi sequential consistency. Setiap diagram yang sequentially consistent pasti juga causally consistent.' },
        { q: 'c. Jelaskan bagaimana cara kerja dan fungsi Web proxy melakukan konsep replikasi Web? (3 poin)',
          points: ['Proxy di antara browser dan web server, menyimpan salinan (cache)', 'Cache hit: dilayani dari salinan; miss: ambil dari server asal lalu disimpan', 'Validasi: TTL/Expires, conditional GET (If-Modified-Since), 304 Not Modified', 'Fungsi: kurangi latensi, beban server, bandwidth; client-initiated replication'],
          model: 'Web proxy berada di antara browser dan web server dan menyimpan salinan halaman yang pernah diminta. Jika halaman diminta lagi dan salinannya masih valid, proxy langsung melayaninya; jika tidak ada atau kedaluwarsa, proxy mengambil dari server asal lalu menyimpannya. Kesegaran salinan diperiksa dengan TTL atau conditional GET. Fungsinya mengurangi latensi, beban server, dan bandwidth; ini termasuk client-initiated replication.' }
      ],
      ex: 'Soal asli UTS Ganjil 2025/2026 nomor 7.' + S }
  ]);
  // Nomor soal asli, agar sesi yang hanya berisi soal asli tampil urut 1 sampai 7 (lihat app.js).
  BANK.data.isian.forEach(function (it) {
    var m = /^ca-uts(2425|2526)-(\d+)$/.exec(it.id);
    if (m) { it.paper = m[1] === '2425' ? 'UTS Genap 2024/2025' : 'UTS Ganjil 2025/2026'; it.no = +m[2]; }
  });
})();
