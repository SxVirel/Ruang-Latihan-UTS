// Keamanan Siber — ringkasan slide minggu 1-7 (KamSib 01-07). hlm = halaman slide sumber.
BANK.materi('ks', [
  {
    minggu: 1, judul: 'Fondasi Keamanan Siber & Security Mindset', hlm: '1-32',
    ringkas: 'Tujuan keamanan, istilah ancaman, cara memetakan serangan, dan prinsip desain.',
    bagian: [
      { h: 'Tujuan keamanan', tabel: { head: ['Tujuan', 'Pertanyaan kunci', 'Contoh nilai mahasiswa'], rows: [
        ['Confidentiality', 'Siapa boleh membaca?', 'Nilai hanya dilihat pemiliknya'],
        ['Integrity', 'Apakah berubah tanpa izin?', 'Nilai tidak bisa diubah sembarang orang'],
        ['Availability', 'Bisa dipakai saat perlu?', 'Portal nilai tidak down saat dibutuhkan'],
        ['Authenticity', 'Benarkah asli?', 'Nilai benar-benar dari dosen pengampu'],
        ['Accountability', 'Siapa yang melakukan?', 'Log mencatat siapa mengubah nilai']
      ] }, poin: [
        'Confidentiality terbagi data confidentiality dan privacy. Integrity terbagi data integrity dan system integrity.',
        'Keamanan siber melindungi sistem, data, dan layanan dari akses tidak sah, kerusakan, dan penyalahgunaan, termasuk yang tidak disengaja.'
      ] },
      { h: 'Istilah dasar', poin: [
        'Vulnerability: kelemahan. Threat: potensi bahaya pada aset. Attack: threat yang dijalankan. Risk: fungsi dari dampak dan kemungkinan terjadi.',
        'Serangan aktif mengubah sistem. Serangan pasif hanya mempelajari informasi. Asal serangan bisa inside atau outside.',
        'Konsekuensi ancaman (RFC 4949): unauthorized disclosure, deception, disruption, usurpation.',
        'Attack surface: kerentanan yang bisa dijangkau, terbagi hardware, software, network, dan human.',
        'Attack tree: root adalah tujuan penyerang, cabang adalah cara, leaf adalah serangan konkret.',
        'Countermeasure: prevent, detect, respond, recover.'
      ] },
      { h: 'Prinsip desain Saltzer & Schroeder', poin: [
        'Economy of mechanism: desain sesederhana mungkin.',
        'Fail-safe defaults: yang tidak jelas diizinkan, ditolak.',
        'Complete mediation: setiap operasi pada setiap objek diperiksa.',
        'Open design: keamanan tidak bergantung pada rahasianya desain (lawan dari security by obscurity).',
        'Separation of privilege: operasi penting butuh lebih dari satu pihak.',
        'Least privilege: hak sekecil mungkin.',
        'Least common mechanism: kurangi sumber daya bersama antarpihak.',
        'Psychological acceptability: kontrol harus mudah dipakai agar dipakai rutin.'
      ] },
      { h: 'Strategi dan pola pikir', poin: [
        'Strategi: policy (apa), mechanism (bagaimana), assurance (apakah benar berjalan).',
        'Defense in depth: berlapis fisik, administratif, teknis. Satu lapis gagal, lapis lain menahan.',
        'Zero trust: never trust, always verify. Pilar: verify explicitly, least privilege, assume breach.',
        'Security mindset: apa yang bisa rusak. Adversarial thinking: bagaimana cara merusaknya. Systems thinking: dampaknya ke seluruh lingkungan.',
        'Standar Indonesia: PP 71/2019 (PSTE) dan Permenkominfo 4/2016. Sistem strategis dan tinggi memakai SNI ISO/IEC 27001, sistem rendah memakai Indeks KAMI dari BSSN.'
      ], ingat: 'Least privilege = sedikit hak. Separation of privilege = butuh banyak orang. Complete mediation = selalu dicek.' }
    ]
  },
  {
    minggu: 2, judul: 'Autentikasi, Otorisasi, & Kontrol Akses', hlm: '1-47',
    ringkas: 'Materi utama Uraian 1 (10 poin): password, MFA, dan model kontrol akses.',
    bagian: [
      { h: 'Autentikasi', poin: [
        'Identification: mengklaim identitas. Authentication: membuktikan klaim. Authorization: memberi izin. Audit: memeriksa kecukupan kontrol.',
        'Empat cara: know (password, PIN), have (token, kartu), are (sidik jari, wajah), do (suara, ritme ketik).',
        'MFA memakai kategori yang berbeda. Password + PIN tetap satu faktor.',
        'Pesan gagal login harus samar: pesan sama, status 401 sama, dan waktu respons disamarkan dengan dummy hashing.',
        'Remote authentication memakai challenge-response dan harus tahan replay.',
        'Continuous authentication memverifikasi sepanjang sesi lewat skor risiko, biometrik perilaku, dan konteks.'
      ] },
      { h: 'Menyimpan password', poin: [
        'Simpan hash(password + salt), bukan plaintext atau enkripsi. Sistem cukup mencocokkan, tidak perlu membaca password.',
        'Salt unik mencegah password sama terlihat sama, menyulitkan offline dictionary attack, dan menyembunyikan password yang dipakai ulang di sistem lain.',
        'Kisi-kisi: pakai slow hash seperti bcrypt, scrypt, Argon2, atau PBKDF2. Pepper bisa ditambahkan.'
      ], tabel: { head: ['Serangan password', 'Penanggulangan'], rows: [
        ['Offline dictionary', 'Lindungi file password, salt'],
        ['Specific account', 'Account lockout'],
        ['Popular password', 'Larang password umum'],
        ['Workstation hijacking', 'Logout otomatis saat idle'],
        ['Multiple password use', 'Larang password sama atau mirip'],
        ['Electronic monitoring', 'Enkripsi saluran']
      ] } },
      { h: 'Biometrik', poin: [
        'Tahap: enrollment, verification (1 banding 1), identification (1 banding banyak).',
        'Skor s ≥ threshold t dianggap cocok. Menaikkan t mengurangi false match tetapi menambah false nonmatch.'
      ] },
      { h: 'Model kontrol akses', tabel: { head: ['Model', 'Dasar keputusan', 'Ciri di kasus'], rows: [
        ['DAC', 'ID peminta dan aturan akses', 'Pemilik boleh membagi akses (contoh OneDrive)'],
        ['MAC', 'Label keamanan dan clearance', 'Militer, pengguna tidak bisa membagi akses'],
        ['RBAC', 'Peran pengguna', 'Dosen, mahasiswa, pengelola punya menu berbeda'],
        ['ABAC', 'Atribut subjek, objek, lingkungan', 'Syarat waktu, lokasi, jaringan, shift']
      ] }, poin: [
        'Elemen: subject, object, access right. DAC memakai access matrix.',
        'ACL = matrix per kolom (per objek). Capability ticket = per baris (per pengguna).',
        'RBAC0 dasar. RBAC1 tambah hierarki peran. RBAC2 tambah constraint (mutually exclusive, cardinality, prerequisite). RBAC3 gabungan keduanya.',
        'ABAC: can_access(s, o, e) ← f(ATTR(s), ATTR(o), ATTR(e)). Sangat fleksibel tetapi lebih rumit dan berdampak ke performa.'
      ], ingat: 'Banyak orang berperan sama: RBAC. Ada syarat waktu, tempat, atau kondisi: ABAC. Pemilik yang membagi: DAC. Ada label rahasia: MAC.' },
      { h: 'ICAM dan federasi', poin: [
        'ICAM: Identity, Credential, Access Management.',
        'Trust triangle: IdP menyimpan kredensial dan mengautentikasi, Relying Party meminta verifikasi, User pemilik akun.',
        'RP memercayai token atau assertion dari IdP, jadi RP tidak perlu menyimpan password.'
      ] }
    ]
  },
  {
    minggu: 3, judul: 'Keamanan Berpusat Manusia, Hukum, & Etika', hlm: '1-25',
    ringkas: 'Faktor manusia, aturan hukum Indonesia, dan etika profesi.',
    bagian: [
      { h: 'Manusia dan usable security', poin: [
        'Keamanan butuh People, Process, Technology.',
        'Social engineering menipu pengguna agar membantu serangan. Contoh: RSA 2011 lewat lampiran Excel dan penipuan faktur Google-Facebook.',
        'Ancaman manusia: malicious, clueless, unmotivated, dan yang terbatas kemampuan manusiawinya.',
        'Kontinum belajar: awareness (apa), training (apa dan bagaimana), education (untuk profesional keamanan).',
        'Usable security menyesuaikan kontrol dengan pengguna, tujuan dan tugasnya, konteks pemakaian, serta perangkat.'
      ] },
      { h: 'Kejahatan siber', poin: [
        'Kategori DoJ: komputer sebagai target, tempat penyimpanan, atau alat komunikasi.',
        'Konvensi Budapest: pasal 2 illegal access, 3 illegal interception, 4 data interference, 5 system interference, 6 misuse of devices, 7 forgery, 8 fraud.'
      ] },
      { h: 'UU ITE Bab VII', tabel: { head: ['Pasal', 'Kategori'], rows: [
        ['27', 'Konten ilegal (kesusilaan, perjudian)'], ['27A', 'Pencemaran nama baik'], ['27B', 'Pemerasan dan pengancaman'],
        ['28', 'Hoaks, penipuan online'], ['29', 'Ancaman kekerasan'], ['30', 'Illegal access'], ['31', 'Illegal interception'],
        ['32', 'Data interference'], ['33', 'System interference'], ['34', 'Misuse of cyber tools'], ['35', 'Electronic forgery'],
        ['36', 'Tindakan yang menimbulkan kerugian'], ['37', 'Kejahatan lintas negara']
      ] }, poin: [
        'Dasar hukum lain: UU 27/2022 (PDP), UU 1/2023 (KUHP baru), UU 28/2014 (Hak Cipta), PP 71/2019, Perpres 47/2023, Perpres 82/2022.'
      ], ingat: 'Pasal 30, 31, 32, 33: akses, sadap, ubah data, ganggu sistem. Urutannya sama dengan Budapest pasal 2 sampai 5.' },
      { h: 'Etika', poin: [
        'Orang dengan keahlian khusus punya kewajiban etika tambahan.',
        'Saat konflik, aturan tingkat bawah tunduk pada kompas moral tingkat atas di Ethical Hierarchy Pyramid.',
        'Contoh konflik: tenggat kerja melawan pengujian yang cukup, atau konsultan yang punya kepentingan finansial pada vendor.',
        'Kode etik: ACM, IEEE, dan The Rules.'
      ] }
    ]
  },
  {
    minggu: 4, judul: 'Keamanan Perangkat Lunak', hlm: '1-30',
    ringkas: 'Empat area keamanan kode dan praktik pengembangan aman.',
    bagian: [
      { h: 'Empat area keamanan', poin: [
        'Defensive programming: jangan berasumsi, periksa semua kondisi, gagal dengan aman.',
        'Input: periksa ukuran dan makna. Buffer overflow dicegah dengan pemrosesan per blok atau buffer dinamis.',
        'Whitelisting menerima yang diketahui valid dan lebih aman daripada blacklisting. Contoh regex /^\\w+$/ menolak "User_123; rm -rf /".',
        'Kode: algoritma benar, compiler tepercaya, data valid. Masalah terkait: memory leak dan race condition.',
        'OS: variabel lingkungan juga input. Contoh, penyerang mengubah PATH agar skrip menjalankan program miliknya.',
        'Output: asumsi common origin bisa salah. XSS terjadi saat input pengguna ditampilkan ke pengguna lain tanpa disanitasi.'
      ] },
      { h: 'Secure coding (SAFECode)', poin: [
        'Buat coding standard dan pakai fitur keamanan framework, jangan membuat ulang.',
        'Hindari fungsi berbahaya seperti eval. Pakai compiler terbaru dan opsi aman.',
        'Canonicalization: menyeragamkan format. Sanitization: membuang bagian berbahaya. Validation: menolak input, biasanya paling aman.',
        'Pesan error ke pengguna harus generik.',
        'Komponen pihak ketiga (COTS, OSS) harus dievaluasi sebelum dipakai.',
        'Pengujian: SAST, DAST, fuzzing, software composition analysis, code review, penetration testing.'
      ], ingat: 'Canonicalization = seragamkan. Sanitization = buang. Validation = tolak.' }
    ]
  },
  {
    minggu: 5, judul: 'Keamanan Web, Mobile, & IoT', hlm: '1-53',
    ringkas: 'OWASP Top 10 memberi tahu apa yang dikhawatirkan, verification standard memberi tahu apa yang diverifikasi.',
    bagian: [
      { h: 'OWASP Top 10:2025 dan bab ASVS utamanya', tabel: { head: ['Kode', 'Risiko', 'Bab ASVS'], rows: [
        ['A01', 'Broken Access Control', 'V8'], ['A02', 'Security Misconfiguration', 'V13'], ['A03', 'Software Supply Chain Failures', 'V15'],
        ['A04', 'Cryptographic Failures', 'V11, V12'], ['A05', 'Injection', 'V1'], ['A06', 'Insecure Design', 'V2, V15'],
        ['A07', 'Authentication Failures', 'V6, V7'], ['A08', 'Software or Data Integrity Failures', 'V9, V11'],
        ['A09', 'Security Logging & Alerting Failures', 'V16'], ['A10', 'Mishandling of Exceptional Conditions', 'V16']
      ] }, poin: [
        'Pemetaan ini analisis slide, bukan crosswalk resmi OWASP.',
        'Top 10 untuk prioritas dan pelatihan. ASVS, MASVS, dan ISVS untuk daftar syarat saat desain, code review, dan pentest.'
      ] },
      { h: 'ASVS 5.0 (web dan API)', tabel: { head: ['Level', 'Isi', 'Contoh'], rows: [
        ['L1', 'Kontrol dasar, sekitar 20% (70 dari 345)', 'Output encoding kontekstual'],
        ['L2', 'Level untuk kebanyakan aplikasi, sekitar 70%', 'Inactivity timeout sesi'],
        ['L3', 'High assurance, 100%', 'Autentikasi tambahan untuk aksi sensitif']
      ] }, poin: [
        'Level dipilih dari analisis risiko. Startup bisa mulai L1, bank sulit membenarkan kurang dari L3.',
        'Bab: V1 Encoding, V2 Validation & Business Logic, V3 Web Frontend, V4 API, V5 File Handling, V6 Authentication, V7 Session, V8 Authorization, V9 Self-contained Tokens.',
        'Lanjutan: V10 OAuth & OIDC, V11 Cryptography, V12 Secure Communication, V13 Configuration, V14 Data Protection, V15 Secure Coding & Architecture, V16 Logging & Error Handling, V17 WebRTC.',
        'Langkah penerapan versi slide: scope, pilih level, dokumentasikan keputusan, implementasi, verifikasi dan laporkan.',
        'V7: sesi harus unik, tervalidasi di backend, punya timeout, dan dibatalkan saat logout.',
        'V9: verifikasi tanda tangan, waktu, tipe, audience, dan tujuan token sebelum memercayai isinya.'
      ] },
      { h: 'Mobile', poin: [
        'Mobile Top 10 2024: M1 credential, M2 supply chain, M3 auth, M4 input/output, M5 communication, M6 privacy, M7 binary protection, M8 misconfiguration, M9 data storage, M10 cryptography.',
        'MASVS 2.1 punya 8 grup: STORAGE, CRYPTO, AUTH, NETWORK, PLATFORM, CODE, RESILIENCE, PRIVACY.',
        'Kontrol akses tetap tanggung jawab server, bukan aplikasi di HP.',
        'RESILIENCE hanya pelengkap dan tidak menggantikan kontrol MASVS lain.'
      ] },
      { h: 'IoT', poin: [
        'IoT Top 10 2018: I1 password lemah atau hardcoded, I2 layanan jaringan, I3 antarmuka ekosistem, I4 update tidak aman, I5 komponen usang, I6 privasi, I7 transfer dan penyimpanan, I8 manajemen perangkat, I9 default tidak aman, I10 kurang hardening fisik.',
        'ISVS L1 untuk serangan software tanpa data sensitif (lampu pintar), L2 software dan hardware (smart lock), L3 serangan fisik canggih (hardware crypto wallet).'
      ], ingat: 'Top 10 = apa yang dikhawatirkan. xSVS = apa yang diverifikasi.' }
    ]
  },
  {
    minggu: 6, judul: 'Kriptografi Simetris', hlm: '1-52',
    ringkas: 'Enkripsi satu kunci, mode operasi, hash, MAC, dan distribusi kunci.',
    bagian: [
      { h: 'Dasar', poin: [
        'Prinsip Kerckhoffs: keamanan bergantung pada rahasianya kunci, bukan algoritma.',
        'Syarat: algoritma kuat dan kunci dibagikan serta dijaga dengan aman.',
        'Block cipher memproses blok tetap. Stream cipher memproses terus-menerus, biasanya dengan XOR.'
      ], tabel: { head: ['', 'DES', '3DES', 'AES'], rows: [
        ['Blok (bit)', '64', '64', '128'], ['Kunci (bit)', '56', '112 atau 168', '128, 192, 256'],
        ['Struktur', 'Feistel, 16 ronde', 'DES berulang', 'Substitution-permutation']
      ] } },
      { h: 'Mode operasi', tabel: { head: ['Mode', 'Inti', 'Pemakaian'], rows: [
        ['ECB', 'Tiap blok independen, pola terlihat (ECB Penguin)', 'Nilai tunggal pendek'],
        ['CBC', 'XOR dengan ciphertext sebelumnya', 'Transmisi blok, authentication'],
        ['CFB', 'Stream dari ciphertext sebelumnya', 'Transmisi stream'],
        ['OFB', 'Stream dari output enkripsi', 'Kanal berisik, misalnya satelit'],
        ['CTR', 'XOR dengan counter terenkripsi', 'Kecepatan tinggi'],
        ['GCM', 'Authenticated encryption', 'Kerahasiaan dan integritas sekaligus']
      ] }, poin: [
        'RC4 dilarang di TLS (RFC 7465). Pengganti: AES-GCM, ChaCha20-Poly1305, AES-CCM.'
      ] },
      { h: 'Hash dan MAC', poin: [
        'Encryption melawan serangan pasif. Message authentication melawan serangan aktif.',
        'MAC memakai kunci rahasia bersama. Cocok berarti pesan tidak berubah dan berasal dari pengirim yang mengaku.',
        'Hash tidak memakai kunci, sehingga hash saja tidak membuktikan pengirim.',
        'Sifat hash: preimage resistant (x tidak bisa dicari dari h), second preimage resistant (y lain untuk x tertentu), collision resistant (sepasang x dan y apa pun).',
        'MD5 dan SHA-1 tidak lagi aman. Pakai SHA-2 atau SHA-3.'
      ] },
      { h: 'Kunci, data tersimpan, dan serangan', poin: [
        'Distribusi kunci adalah titik kekuatan sistem. Opsi 4 memakai pihak ketiga (KDC) dengan master key dan session key.',
        'Kunci sering diganti membatasi data yang bocor.',
        'Encryption at rest: AES-XTS untuk perangkat penyimpanan, AES-GCM untuk file. Contoh BitLocker, FileVault, LUKS, TDE, S3 SSE-KMS.',
        'Simpan kunci di KMS atau HSM, rotasi kunci, dan enkripsi backup.',
        'Brute force rata-rata butuh x/2 percobaan dari x kunci.',
        'Cryptanalysis: ciphertext only, known plaintext, chosen plaintext, chosen ciphertext, chosen text.'
      ], ingat: 'ECB = pola bocor. GCM = rahasia + utuh. Hash tanpa kunci tidak membuktikan siapa pengirimnya.' }
    ]
  },
  {
    minggu: 7, judul: 'Kriptografi Asimetris', hlm: '1-49',
    ringkas: 'Materi utama Uraian 2 (20 poin): hybrid encryption, tanda tangan, dan sertifikat.',
    bagian: [
      { h: 'Konsep', poin: [
        'Enkripsi dengan kunci publik penerima memberi kerahasiaan.',
        'Tanda tangan dengan kunci privat pengirim memberi autentikasi, integritas, dan non-repudiation.'
      ], tabel: { head: ['Algoritma', 'Tanda tangan', 'Distribusi kunci', 'Enkripsi kunci rahasia'], rows: [
        ['RSA', 'Ya', 'Ya', 'Ya'], ['Diffie-Hellman', 'Tidak', 'Ya', 'Tidak'], ['DSS', 'Ya', 'Tidak', 'Tidak'], ['Elliptic Curve', 'Ya', 'Ya', 'Ya']
      ] } },
      { h: 'RSA', poin: [
        'Pembuatan kunci: pilih prima p dan q, n = p×q, φ(n) = (p−1)(q−1), pilih e dengan gcd(φ(n), e) = 1, cari d dengan d×e mod φ(n) = 1.',
        'Kunci publik {e, n}, kunci privat {d, n}.',
        'Enkripsi C = M^e mod n. Dekripsi M = C^d mod n.',
        'Contoh slide: p=17, q=11, n=187, φ=160, e=7, d=23.',
        'Keamanan bertumpu pada sulitnya faktorisasi. Serangan: brute force, matematis, timing, chosen ciphertext.'
      ] },
      { h: 'Diffie-Hellman', poin: [
        'Tujuan: bertukar kunci rahasia, bukan mengenkripsi pesan. Bertumpu pada logaritma diskret.',
        'YA = α^XA mod q dan YB = α^XB mod q. Kunci K = YB^XA mod q = YA^XB mod q.',
        'Tanpa autentikasi rentan man-in-the-middle: Darth memberi kunci publik palsu ke kedua pihak dan memegang dua kunci.'
      ] },
      { h: 'ECC', poin: [
        'Bertumpu pada ECDLP. Q = dG, dengan d kunci privat, G titik dasar, Q kunci publik.',
        'ECDH: S = a·B = b·A = ab·G.',
        'Contoh slide: y² = x³ + 2x + 2 mod 17, G = (5,1), a = 3, b = 5, S = 15G = (3,16).',
        'Keamanan setara dengan kunci lebih kecil daripada RSA, cocok untuk IoT dan mobile.'
      ], tabel: { head: ['Keamanan simetris', 'RSA', 'ECC', 'Status'], rows: [
        ['80', '1024', '160', 'Usang'], ['112', '2048', '224', 'Minimum lama'], ['128', '3072', '256', 'Paling umum'], ['192', '7680', '384', 'Tinggi'], ['256', '15360', '521', 'Maksimum']
      ] } },
      { h: 'Tanda tangan, sertifikat, dan digital envelope', poin: [
        'Pengirim: hash pesan lalu tanda tangani dengan kunci privatnya. Penerima: verifikasi dengan kunci publik pengirim.',
        'Kunci publik bisa dipalsukan, jadi dipakai sertifikat: kunci publik dan ID pemilik yang ditandatangani CA, lengkap dengan masa berlaku.',
        'Digital envelope: pesan dienkripsi kunci simetris sekali pakai, lalu kunci itu dienkripsi dengan kunci publik penerima.',
        'Dipakai di S/MIME, PGP, TLS 1.2 RSA, PDF terenkripsi, dan DRM.'
      ], ingat: 'Rahasia: kunci PUBLIK penerima. Tanda tangan: kunci PRIVAT pengirim. Data besar: simetris.' },
      { h: 'Skema hybrid untuk Uraian 2', poin: [
        'Pengirim 1: buat kunci sesi Ks dan nonce baru dengan CSPRNG.',
        'Pengirim 2: S = Sign(privat pengirim, SHA-256(M)).',
        'Pengirim 3: C = AES-256-GCM(Ks, M ‖ S).',
        'Pengirim 4: EK = Enc(publik penerima, Ks), lalu kirim C, EK, dan sertifikat.',
        'Penerima 1: verifikasi sertifikat dengan CA.',
        'Penerima 2: buka Ks dengan kunci privatnya, lalu dekripsi C dan cek tag GCM.',
        'Penerima 3: verifikasi S dengan kunci publik pengirim.',
        'Pilih hanya algoritma yang dimiliki kedua pihak, dan hindari DES, ECB, MD5, serta SHA-1.'
      ] },
      { h: 'TLS 1.3, AEAD, dan topik lanjut', poin: [
        'TLS 1.3 hanya memakai suite AEAD, wajib forward secrecy, dan bertukar kunci dengan ECDHE, DHE, atau PSK.',
        'Forward secrecy melindungi sesi lama walau kunci jangka panjang bocor.',
        'AEAD: Encrypt(K, N, P, A) menghasilkan (C, T). A diautentikasi tetapi tidak dienkripsi.',
        'Aturan AEAD: jangan pakai ulang nonce dengan kunci sama, verifikasi tag sebelum melepas plaintext, bandingkan tag dalam waktu konstan.',
        'Bilangan acak harus acak dan tidak bisa ditebak. TRNG memakai sumber nondeterministik. PRNG deterministik, contoh LCG: X(n+1) = (a·X(n) + c) mod m.',
        'Lightweight crypto: Ascon. Post-quantum: lattice, hash-based, code-based. Homomorphic: menghitung langsung di atas ciphertext.'
      ] }
    ]
  }
]);
