// Komputasi Awan (Distributed Systems, van Steen & Tanenbaum) — disusun dari kisi-kisi dosen.
BANK.isian('ca', 'arsi', 'Arsitektur & Jenis Sistem', [
  { type: 'essay', q: 'Jelaskan perbedaan shared memory dan private (distributed) memory pada sistem multiprosesor/multikomputer.',
    points: ['Shared memory (multiprocessor): semua CPU mengakses satu ruang memori bersama', 'Komunikasi lewat baca/tulis memori bersama, perlu sinkronisasi (lock)', 'Private memory (multicomputer): tiap node punya memori sendiri', 'Komunikasi lewat message passing melalui jaringan', 'Shared memory sulit diskalakan (bus/memori jadi bottleneck); private memory lebih mudah diskalakan'],
    model: 'Shared memory: banyak prosesor memakai satu memori fisik, data cukup ditulis lalu dibaca prosesor lain. Mudah diprogram, tapi bus dan memori menjadi bottleneck saat prosesor bertambah.\nPrivate memory: setiap komputer punya memori sendiri, pertukaran data lewat pesan (message passing). Skalabel sampai ribuan node, contohnya cluster dan cloud.' },
  { type: 'essay', q: 'Sebutkan tiga kelompok sistem terdistribusi beserta contohnya, dan bedakan cluster, grid, dan cloud computing.',
    points: ['Distributed computing systems: cluster, grid, cloud', 'Distributed information systems: transaction processing, enterprise application integration (EAI)', 'Pervasive systems: ubiquitous, mobile, sensor networks', 'Cluster: node homogen, satu jaringan LAN, satu administrasi', 'Grid: node heterogen lintas organisasi (virtual organization)', 'Cloud: sumber daya virtual on-demand (IaaS, PaaS, SaaS), bayar sesuai pakai'] },
  { type: 'fill', q: 'Jenis transparansi dalam sistem terdistribusi: isi nama transparansi yang menyembunyikan hal berikut.',
    fields: [
      { label: 'Di mana objek berada', a: ['location', 'location transparency', 'lokasi'] },
      { label: 'Objek bisa dipindah saat sedang dipakai', a: ['relocation', 'relocation transparency'] },
      { label: 'Ada beberapa salinan objek', a: ['replication', 'replication transparency', 'replikasi'] },
      { label: 'Kegagalan dan pemulihan komponen', a: ['failure', 'failure transparency', 'kegagalan'] }],
    ex: 'Lainnya: access (representasi data dan cara akses), migration (objek pindah), concurrency (objek dipakai bersama).' },
  { type: 'essay', q: 'Dalam gaya arsitektur, apa yang dimaksud component, interface, dan connector? Sebutkan empat gaya arsitektur utama.',
    points: ['Component: unit modular dengan interface yang jelas dan bisa diganti', 'Interface: kontrak layanan yang disediakan/dibutuhkan komponen', 'Connector: mekanisme komunikasi/koordinasi antar komponen (RPC, message passing, streaming)', 'Layered architecture', 'Object-based / service-oriented', 'Resource-based (REST)', 'Publish-subscribe (event-based)'] },
  { type: 'fill', q: 'Lengkapi tabel koordinasi publish-subscribe (coupling referensial × temporal).',
    table: { head: ['', 'Temporally coupled', 'Temporally decoupled'], rows: [['Referentially coupled', '(1)', '(2)'], ['Referentially decoupled', '(3)', '(4)']] },
    fields: [
      { label: '(1)', a: ['direct', 'direct coordination', 'langsung'] },
      { label: '(2)', a: ['mailbox'] },
      { label: '(3)', a: ['event based', 'event-based', 'event based coordination', 'publish subscribe'] },
      { label: '(4)', a: ['shared data space', 'shared dataspace', 'tuple space'] }],
    ex: 'Referentially decoupled = tidak perlu tahu identitas pihak lain. Temporally decoupled = tidak harus aktif bersamaan. Publish-subscribe murni = event-based; jika event disimpan (shared data space, mis. JavaSpaces), pihak tidak perlu online bersamaan.' },
  { type: 'essay', q: 'Jelaskan cara kerja publish-subscribe dan bedakan topic-based dengan content-based subscription. Beri contoh.',
    points: ['Publisher mengirim event/notifikasi tanpa tahu siapa subscriber', 'Subscriber mendaftarkan minat; middleware (broker) mencocokkan dan mengirim event', 'Topic-based: berlangganan berdasarkan topik/subjek tertentu (mis. "berita/olahraga")', 'Content-based: berlangganan berdasarkan isi/atribut event (mis. harga saham > 100)', 'Contoh: MQTT, Kafka, Google Pub/Sub, notifikasi aplikasi', 'Kelebihan decoupling, tantangan skalabilitas pencocokan'] }
]);

BANK.isian('ca', 'proc', 'Proses, Thread & Virtualisasi', [
  { type: 'essay', q: 'Mengapa server multithread dapat melayani lebih banyak client dibanding server single-thread?',
    points: ['Single-thread: saat menunggu I/O (disk/jaringan) dengan blocking call, seluruh server ikut berhenti', 'Multithread: dispatcher menerima request dan menyerahkannya ke worker thread', 'Saat satu thread blocking, thread lain tetap melayani client lain', 'Memanfaatkan paralelisme multi-core', 'Pembuatan thread lebih ringan daripada proses dan berbagi address space'],
    model: 'Model dispatcher/worker: dispatcher membaca request dan memberikan ke worker. Worker yang menunggu disk/jaringan diblokir, tapi thread lain tetap berjalan. Server single-thread memproses satu request sampai selesai sehingga client lain menunggu. Tanenbaum: multithreading = paralel + blocking call; single-thread = tidak paralel + blocking; finite-state machine = paralel + non-blocking (sulit diprogram).' },
  { type: 'fill', q: 'Tiga cara membangun server (Tanenbaum). Isi karakteristiknya: "paralel" atau "tidak paralel", "blocking" atau "nonblocking".',
    fields: [
      { label: 'Multithreading', a: ['paralel blocking', 'parallelism blocking', 'paralel, blocking'] },
      { label: 'Single-threaded process', a: ['tidak paralel blocking', 'no parallelism blocking', 'tidak paralel, blocking'] },
      { label: 'Finite-state machine', a: ['paralel nonblocking', 'parallelism nonblocking', 'paralel, nonblocking', 'paralel non blocking'] }],
    ex: 'Finite-state machine memakai satu thread dengan system call non-blocking dan menyimpan state tiap request, efisien tapi rumit.' },
  { type: 'essay', q: 'Jelaskan fungsi container dan virtual machine, beri contoh, serta kelebihan dan kekurangan container.',
    points: ['VM: virtualisasi hardware lewat hypervisor; tiap VM punya OS tamu lengkap', 'Contoh VM: VMware, VirtualBox, KVM, Hyper-V, Xen', 'Container: virtualisasi level OS; berbagi kernel host, isolasi via namespaces dan cgroups', 'Contoh container: Docker, LXC, Podman, dikelola Kubernetes', 'Kelebihan container: ringan, start dalam detik, overhead kecil, portabel, cocok microservices', 'Kekurangan container: isolasi lebih lemah (kernel dipakai bersama), harus OS kernel sama, risiko keamanan kernel'],
    model: 'VM menjalankan OS lengkap di atas hypervisor sehingga isolasinya kuat dan bisa beda OS, tapi berat (GB, boot menit). Container mengemas aplikasi beserta dependensinya dan berbagi kernel host, jadi ringan (MB) dan cepat dijalankan. Kekurangannya isolasi lebih lemah dan tidak bisa menjalankan kernel OS berbeda.' },
  { type: 'fill', q: 'Hypervisor tipe berapa?',
    fields: [{ label: 'Berjalan langsung di hardware (VMware ESXi, Xen, Hyper-V)', a: ['1', 'tipe 1', 'type 1', 'native', 'bare metal'] }, { label: 'Berjalan di atas OS host (VirtualBox, VMware Workstation)', a: ['2', 'tipe 2', 'type 2', 'hosted'] }] }
]);

BANK.isian('ca', 'kom', 'Komunikasi', [
  { type: 'essay', q: 'Jelaskan komunikasi transient vs persistent dan synchronous vs asynchronous, beserta contoh.',
    points: ['Persistent: pesan disimpan middleware sampai diterima, pengirim/penerima tidak perlu aktif bersamaan (email, message queue)', 'Transient: pesan hanya disimpan selama pengirim dan penerima berjalan; jika penerima tidak aktif pesan hilang (UDP, RPC, socket)', 'Synchronous: pengirim diblokir sampai titik tertentu (request diterima middleware, dikirim ke penerima, atau setelah diproses)', 'Asynchronous: pengirim langsung lanjut setelah mengirim', 'Contoh persistent asynchronous: email / MOM (message-oriented middleware)', 'Contoh transient synchronous: RPC (response-based)'] },
  { type: 'fill', q: 'Klasifikasikan contoh komunikasi berikut.',
    fields: [
      { label: 'Email', a: ['persistent asynchronous', 'persistent async', 'persisten asinkron'] },
      { label: 'RPC biasa (menunggu balasan)', a: ['transient synchronous', 'transient sync', 'transien sinkron'] },
      { label: 'Kirim datagram UDP tanpa menunggu', a: ['transient asynchronous', 'transient async', 'transien asinkron'] },
      { label: 'Client-server minggu 4 (kisi-kisi dosen)', a: ['transient asynchronous', 'transient async', 'transien asinkron'] }],
    ex: 'Persistent = middleware menyimpan pesan. Synchronous = pengirim diblokir sampai submit/delivery/response.' },
  { type: 'fill', q: 'Tiga titik sinkronisasi pada komunikasi synchronous: pengirim diblokir sampai ...',
    fields: [
      { label: '(1) Paling awal', a: ['request submission', 'request diterima middleware', 'submission'] },
      { label: '(2) Tengah', a: ['request delivery', 'delivery', 'diterima penerima'] },
      { label: '(3) Paling akhir', a: ['after processing', 'response', 'setelah diproses', 'selesai diproses'] }],
    ex: 'Receipt-based (submission), delivery-based, dan response-based (RPC).' },
  { type: 'essay', q: 'Apa itu multicasting? Jelaskan application-level multicasting dan gossip-based (epidemic) dissemination.',
    points: ['Multicasting: satu pengirim mengirim data ke banyak penerima dalam satu grup', 'Application-level multicast: node membentuk overlay (tree atau mesh) di atas jaringan, bukan di router', 'Ukuran kualitas overlay: link stress dan stretch (relative delay penalty)', 'Flooding: setiap node meneruskan pesan ke semua tetangga', 'Gossip/epidemic: node menyebarkan update ke tetangga acak (anti-entropy push/pull, rumor spreading)', 'Gossip skalabel dan tahan gagal, tapi tidak menjamin semua node menerima (probabilistik)'] },
  { type: 'essay', q: 'Bandingkan RPC dan Message-Oriented Middleware (MOM).',
    points: ['RPC: memanggil prosedur jarak jauh seperti lokal (client stub, server stub, marshalling)', 'RPC umumnya transient synchronous: client menunggu hasil', 'MOM: komunikasi lewat antrean pesan (queue), persistent asynchronous', 'MOM: pengirim dan penerima tidak perlu aktif bersamaan (contoh: RabbitMQ, IBM MQ, Kafka)', 'Asynchronous RPC: client lanjut setelah server mengonfirmasi penerimaan'] }
]);

BANK.isian('ca', 'koor', 'Koordinasi & Clock', [
  { type: 'fill', q: 'Diagram soal dosen: P1 punya event a, b; P2 punya c, d; P3 punya e, f, g. Pesan: a→c, e→c, b→f, g→d. Isi Lamport timestamp.',
    fields: [{ label: 'a', a: 1, tol: 0 }, { label: 'b', a: 2, tol: 0 }, { label: 'c', a: 2, tol: 0 }, { label: 'd', a: 5, tol: 0 }, { label: 'e', a: 1, tol: 0 }, { label: 'f', a: 3, tol: 0 }, { label: 'g', a: 4, tol: 0 }],
    ex: 'c = max(0, L(a)=1, L(e)=1) + 1 = 2. f = max(L(e)=1, L(b)=2) + 1 = 3. g = 4. d = max(L(c)=2, L(g)=4) + 1 = 5. Latihan diagram lain ada di lab Timestamp.' },
  { type: 'fill', q: 'Diagram yang sama: isi vector clock (format 1,0,0).',
    fields: [{ label: 'a', a: '1 0 0' }, { label: 'b', a: '2 0 0' }, { label: 'c', a: '1 1 1' }, { label: 'd', a: '2 2 3' }, { label: 'e', a: '0 0 1' }, { label: 'f', a: '2 0 2' }, { label: 'g', a: '2 0 3' }],
    ex: 'c menerima dari a (1,0,0) dan e (0,0,1): max = (1,0,1), lalu naikkan P2 → (1,1,1). d: max((1,1,1), g=(2,0,3)) = (2,1,3), naikkan P2 → (2,2,3).' },
  { type: 'fill', q: 'Vector clock: tentukan hubungan dua event (happened-before "→" atau "concurrent").',
    fields: [
      { label: 'V(x) = (1,0,0), V(y) = (2,0,2)', a: ['x → y', 'x->y', 'x happened before y', 'x sebelum y', 'xy'] },
      { label: 'V(x) = (2,0,0), V(y) = (1,1,1)', a: ['concurrent', 'konkuren', 'x || y', 'bersamaan'] }],
    ex: 'x → y jika V(x) ≤ V(y) di semua komponen dan tidak sama. Jika tidak ada yang ≤ yang lain, kedua event concurrent. Lamport clock tidak bisa mendeteksi concurrency, vector clock bisa.' },
  { type: 'essay', q: 'Dalam situasi apa logical clock (Lamport/vector) dipakai, dan kapan perlu sinkronisasi physical clock?',
    points: ['Logical clock dipakai jika yang penting hanya URUTAN kejadian, bukan waktu nyata', 'Totally ordered multicast untuk replikasi database (semua replika update dalam urutan sama)', 'Causally ordered multicast, mis. bulletin board / chat (balasan tidak tampil sebelum pesan asli) pakai vector clock', 'Mutual exclusion terdistribusi (Ricart-Agrawala) pakai Lamport timestamp', 'Physical clock perlu jika butuh waktu nyata: log audit, sertifikat, make, transaksi berwaktu', 'Algoritma physical clock: Cristian/NTP, Berkeley'] },
  { type: 'essay', q: 'Jelaskan algoritma election Bully dan Ring. Kapan election dijalankan?',
    points: ['Election dipakai memilih satu koordinator saat koordinator lama crash atau saat start', 'Bully: proses P mengirim ELECTION ke semua proses dengan ID lebih tinggi', 'Bully: jika ada yang menjawab OK, P berhenti; yang lebih tinggi mengambil alih; jika tidak ada jawaban, P menang dan mengirim COORDINATOR', 'Bully: proses ID tertinggi yang hidup selalu menang', 'Ring: pesan ELECTION berisi daftar ID beredar searah ring, tiap proses menambahkan ID-nya', 'Ring: saat kembali ke pengirim, ID tertinggi dipilih dan pesan COORDINATOR diedarkan'] },
  { type: 'fill', q: 'Bully algorithm, proses 0-7. Koordinator 7 crash, proses 4 yang pertama menyadari.',
    fields: [{ label: 'Proses 4 mengirim ELECTION ke', a: '5 6 7', set: true }, { label: 'Koordinator baru', a: 6, tol: 0 }],
    ex: '4 mengirim ke 5, 6, 7. 5 dan 6 membalas OK. 5 dan 6 memulai election masing-masing, 6 tidak mendapat balasan dari 7, sehingga 6 mengumumkan COORDINATOR.' },
  { type: 'fill', q: 'Algoritma sinkronisasi physical clock.',
    fields: [
      { label: 'Client bertanya ke time server lalu kompensasi delay (RTT/2)', a: ['cristian', 'ntp', 'cristian ntp'] },
      { label: 'Time daemon menanyakan semua mesin lalu merata-rata (tanpa sumber UTC)', a: ['berkeley'] }] }
]);

BANK.isian('ca', 'nama', 'Penamaan & Chord', [
  { type: 'essay', q: 'Jelaskan home-based approach untuk melacak entitas bergerak (mobile entity): cara kerja, kelebihan, dan kekurangannya.',
    points: ['Setiap entitas punya home location (home agent) yang selalu tahu alamat saat ini (care-of address)', 'Saat berpindah, entitas mendaftarkan alamat barunya ke home agent', 'Client menghubungi home; home meneruskan (tunneling) ke alamat sekarang dan memberi tahu alamat baru', 'Komunikasi berikutnya bisa langsung ke alamat sekarang', 'Contoh: Mobile IP', 'Kelebihan: sederhana, home selalu tahu lokasi terkini', 'Kekurangan: home harus selalu ada (single point of failure)', 'Kekurangan: latensi bertambah jika entitas jauh dari home (triangle routing); bermasalah jika entitas pindah permanen'] },
  { type: 'essay', q: 'Bandingkan tiga cara flat naming: broadcasting, forwarding pointers, dan home-based approach.',
    points: ['Broadcasting: kirim pertanyaan "siapa punya ID ini" ke semua mesin (ARP); hanya cocok di LAN', 'Forwarding pointers: saat berpindah, entitas meninggalkan pointer ke lokasi baru; rantai bisa panjang dan rapuh', 'Home-based: lokasi tetap disimpan di home agent', 'Distributed hash table (Chord) untuk skala besar'] },
  { type: 'fill', q: 'Ring Chord m = 5, node aktif {1, 4, 9, 11, 14, 18, 20, 21, 28}. Key berikut disimpan di node mana?',
    fields: [{ label: 'Key 5', a: 9, tol: 0 }, { label: 'Key 14', a: 14, tol: 0 }, { label: 'Key 22', a: 28, tol: 0 }, { label: 'Key 30', a: 1, tol: 0 }],
    ex: 'Key k disimpan di succ(k): node terkecil dengan ID ≥ k. Key 30 melewati 31 lalu kembali ke 1.' },
  { type: 'fill', q: 'Ring Chord yang sama (m = 5). Buat finger table node 4: FT_4[i] = succ(4 + 2^(i−1)).',
    fields: [{ label: 'i = 1 (succ 5)', a: 9, tol: 0 }, { label: 'i = 2 (succ 6)', a: 9, tol: 0 }, { label: 'i = 3 (succ 8)', a: 9, tol: 0 }, { label: 'i = 4 (succ 12)', a: 14, tol: 0 }, { label: 'i = 5 (succ 20)', a: 20, tol: 0 }],
    ex: 'Hasil cocok dengan slide: node 4 = [9, 9, 9, 14, 20]. Latihan node lain dan ring acak ada di lab Chord.' },
  { type: 'fill', q: 'Ring yang sama. Tulis jalur lookup (pisahkan koma).',
    fields: [{ label: 'Resolve key 26 dari node 1', a: '1 18 20 21 28' }, { label: 'Resolve key 12 dari node 28', a: '28 4 9 11 14' }],
    ex: 'Di node p, jika k ∈ (p, FT_p[1]] kirim ke FT_p[1]. Jika tidak, kirim ke finger terjauh yang belum melewati k.' },
  { type: 'essay', q: 'Jelaskan perbedaan name, identifier, dan address, serta flat vs structured vs attribute-based naming.',
    points: ['Name: string untuk merujuk entitas', 'Address: nama access point entitas (bisa berubah)', 'Identifier: merujuk paling banyak satu entitas, tidak dipakai ulang, tidak berubah', 'Flat naming: identifier tanpa struktur (Chord, home-based)', 'Structured naming: name space hierarkis yang mudah dibaca manusia (DNS, file system)', 'Attribute-based naming: cari entitas berdasarkan pasangan atribut-nilai (LDAP, directory service)'] }
]);

BANK.isian('ca', 'kons', 'Konsistensi & Fault Tolerance', [
  { type: 'essay', q: 'Mengapa data direplikasi, dan mengapa konsistensi diperlukan?',
    points: ['Replikasi meningkatkan reliability (tetap jalan jika satu replika gagal)', 'Replikasi meningkatkan performa dan skalabilitas (data dekat pengguna, beban terbagi)', 'Masalah: jika satu replika diubah, replika lain berbeda', 'Konsistensi diperlukan agar semua klien melihat data yang benar/sama sesuai model yang disepakati', 'Trade-off: konsistensi kuat butuh sinkronisasi global yang mahal; model lebih lemah lebih cepat'] },
  { type: 'fill', q: 'Tabel soal UTS. P1: R(x)a, W(x)c. P2: W(x)a, W(x)b. P3: R(x)c, R(x)b. P4: R(x)c, R(x)b. Apakah sequentially consistent?',
    table: { head: ['Proses', 'Operasi (kiri lebih dulu)'], rows: [['P1', 'R(x)a   W(x)c'], ['P2', 'W(x)a   W(x)b'], ['P3', 'R(x)c   R(x)b'], ['P4', 'R(x)c   R(x)b']] },
    fields: [{ label: 'Jawaban (ya/tidak)', a: ['ya', 'yes', 'sequentially consistent', 'konsisten'] }],
    ex: 'Urutan global: W2(x)a → R1(x)a → W1(x)c → R3(x)c → R4(x)c → W2(x)b → R3(x)b → R4(x)b. Urutan program tiap proses terjaga dan semua pembaca melihat c lalu b. Latihan variasi lain di lab Konsistensi.' },
  { type: 'fill', q: 'P1: W(x)a. P2: W(x)b. P3: R(x)b, R(x)a. P4: R(x)a, R(x)b. Apakah sequentially consistent?',
    fields: [{ label: 'Jawaban (ya/tidak)', a: ['tidak', 'no', 'tidak konsisten'] }],
    ex: 'P3 melihat b lalu a, P4 melihat a lalu b. Sequential consistency mewajibkan semua proses melihat urutan write yang sama.' },
  { type: 'essay', q: 'Definisikan sequential consistency dan causal consistency.',
    points: ['Sequential: hasil eksekusi sama dengan jika semua operasi dijalankan dalam suatu urutan sekuensial', 'Sequential: operasi tiap proses muncul sesuai urutan programnya', 'Sequential: semua proses melihat interleaving yang sama; waktu nyata tidak dipersoalkan', 'Causal: write yang berpotensi berhubungan kausal harus dilihat semua proses dalam urutan yang sama', 'Causal: write yang concurrent boleh dilihat dengan urutan berbeda di mesin berbeda'] },
  { type: 'fill', q: 'Client-centric consistency: isi nama modelnya.',
    fields: [
      { label: 'Setelah membaca x, baca berikutnya tidak pernah melihat nilai lebih lama', a: ['monotonic reads', 'monotonic read'] },
      { label: 'Write oleh proses yang sama selesai berurutan', a: ['monotonic writes', 'monotonic write'] },
      { label: 'Hasil write sendiri selalu terlihat oleh read berikutnya', a: ['read your writes', 'read-your-writes'] },
      { label: 'Write setelah read dilakukan pada nilai yang sama atau lebih baru', a: ['writes follow reads', 'writes-follow-reads'] }],
    ex: 'Client-centric dipakai untuk pengguna mobile yang berpindah replika (eventual consistency).' },
  { type: 'essay', q: 'Jelaskan cara kerja dan fungsi web proxy dalam konsep replikasi web.',
    points: ['Web proxy berada di antara browser dan web server, menyimpan salinan (cache) halaman/objek', 'Request client dilayani dari cache jika ada salinan yang masih valid', 'Jika tidak ada atau kedaluwarsa, proxy mengambil dari server asal lalu menyimpannya', 'Validasi konsistensi: TTL/expires, conditional GET (If-Modified-Since), atau invalidasi dari server', 'Fungsi: mengurangi latensi, mengurangi beban server dan bandwidth, meningkatkan ketersediaan', 'Merupakan client-initiated replication (cache), berbeda dengan server-initiated (CDN/mirror)'] },
  { type: 'fill', q: 'Fault tolerance: berapa replika minimum agar sistem k-fault tolerant?',
    fields: [{ label: 'Crash failure, k = 2', a: 3, tol: 0 }, { label: 'Byzantine (arbitrary) failure dengan voting, k = 2', a: 5, tol: 0 }],
    ex: 'Crash/fail-silent: k+1 proses. Byzantine dengan voting mayoritas: 2k+1 proses. Untuk konsensus Byzantine penuh: 3k+1.' },
  { type: 'fill', q: 'Jenis failure model.',
    fields: [
      { label: 'Server berhenti, sebelumnya bekerja benar', a: ['crash', 'crash failure'] },
      { label: 'Server tidak merespons/menerima/mengirim pesan', a: ['omission', 'omission failure'] },
      { label: 'Respons di luar interval waktu yang ditentukan', a: ['timing', 'timing failure'] },
      { label: 'Respons sembarangan, bisa jahat', a: ['arbitrary', 'byzantine', 'arbitrary failure', 'byzantine failure'] }] },
  { type: 'essay', q: 'Sebutkan empat aspek dependability dan tiga jenis redundancy.',
    points: ['Availability: siap dipakai saat dibutuhkan', 'Reliability: berjalan terus tanpa gagal dalam periode tertentu', 'Safety: kegagalan tidak menimbulkan bencana', 'Maintainability: mudah diperbaiki', 'Information redundancy (bit ekstra, Hamming code)', 'Time redundancy (ulangi aksi, transaksi)', 'Physical redundancy (hardware/proses ekstra, TMR)'] }
]);
