// Keamanan Siber — soal buatan sendiri untuk tab Uraian & Isian.
// Polanya mengikuti contoh Bagian B dan C Latihan 1 serta kisi-kisi UTS. Ini bukan soal asli dosen,
// jadi semua kunci ditandai sebagai kunci sendiri di ex. Angka hitungan sudah dicek dengan kode.
var KUNCI_SENDIRI = 'Prediksi soal, bukan soal asli dosen. Kunci disusun sendiri dari slide, kisi-kisi, dan pola Latihan 1.';

BANK.uraian('ks', 'u1', 'Prediksi Uraian 1: Autentikasi & Akses (10 poin)', [
  { type: 'essay',
    q: 'ESAI 10 POIN — Portal Akademik Kampus\nPortal akademik dipakai dosen, mahasiswa, dan pengelola. Tiap kelompok punya menu berbeda: dosen mengisi nilai, mahasiswa melihat nilainya sendiri, pengelola mengatur jadwal. Audit menemukan password disimpan sebagai MD5 tanpa salt, dan banyak dosen memakai password yang sama dengan e-mail pribadinya.\n\nA. Jelaskan mengapa cara penyimpanan password saat ini berbahaya, lalu usulkan cara yang aman. (3 poin)\nB. Usulkan satu mekanisme autentikasi tambahan yang feasible untuk dosen, beserta alasannya. (3 poin)\nC. Tentukan model kontrol akses yang paling cocok dan jelaskan keuntungannya. Beri satu contoh pengecekan di sisi server. (4 poin)',
    points: [
      'A: MD5 cepat dan tanpa salt, sehingga rentan offline dictionary attack dan password sama terlihat sama',
      'A: Pakai salt unik per pengguna dan slow hash (bcrypt, scrypt, Argon2, atau PBKDF2)',
      'A: Jangan memakai enkripsi, karena sistem hanya perlu mencocokkan, bukan membaca password',
      'B: MFA dari kategori berbeda, misalnya password (know) + authenticator TOTP (have)',
      'B: Feasible karena dosen punya HP, murah, dan tetap melindungi saat password bocor dari layanan lain',
      'C: RBAC, karena hak akses mengikuti peran dosen, mahasiswa, dan pengelola',
      'C: Keuntungan: hak diatur per peran, mudah dikelola, dan mendukung least privilege',
      'C: Server memeriksa peran dan kepemilikan data pada setiap request, misalnya mahasiswa hanya bisa membaca nilai dengan NIM miliknya'
    ],
    model: 'A. MD5 terlalu cepat dan tanpa salt, jadi penyerang yang mencuri database dapat menebak password massal, dan pengguna dengan password sama punya hash sama. Simpan hash(password + salt) dengan Argon2 atau bcrypt, dengan salt unik per pengguna.\nB. Tambahkan TOTP dari aplikasi authenticator. Faktornya berbeda kategori dengan password, murah, dan tetap melindungi walau password bocor dari layanan lain.\nC. RBAC: hak melekat pada peran, sehingga pengguna baru cukup diberi peran dan setiap peran hanya berisi hak minimal. Server tetap memeriksa peran dan kepemilikan pada setiap request, bukan hanya menyembunyikan menu.',
    ex: KUNCI_SENDIRI },
  { type: 'essay',
    q: 'ESAI 10 POIN — Rekam Medis Rumah Sakit\nDokter hanya boleh membaca dan mengubah rekam medis pasien yang ditanganinya, saat bertugas di rumah sakit tempatnya bekerja, lewat komputer dan jaringan internal, selama jam shift. Saat ini aplikasi hanya memakai peran "dokter", sehingga semua dokter bisa membuka semua rekam medis.\n\nA. Jelaskan mengapa peran saja tidak cukup untuk aturan tersebut. (3 poin)\nB. Identifikasi atribut subjek, objek, dan lingkungan, lalu tulis aturannya. (4 poin)\nC. Berikan dua pengujian beserta hasil yang diharapkan. (3 poin)',
    points: [
      'A: RBAC hanya melihat peran, sedangkan aturan ini bergantung pada relasi pasien dan kondisi akses',
      'A: Akibatnya hak terlalu luas dan melanggar least privilege',
      'B: Subjek: identitas dokter, rumah sakit, jadwal shift, daftar pasien yang ditangani',
      'B: Objek: rekam medis, pasien pemiliknya, rumah sakit',
      'B: Lingkungan: waktu, perangkat rumah sakit, jaringan internal',
      'B: Aturan ABAC: can_access(s, o, e) benar hanya jika semua atribut terpenuhi, selain itu ditolak',
      'C: Dokter penangani saat shift di jaringan internal: akses diizinkan',
      'C: Dokter lain, atau dokter penangani dari luar jaringan atau di luar shift: akses ditolak dan dicatat di log'
    ],
    model: 'A. Peran "dokter" sama untuk semua dokter, padahal izin bergantung pada pasien, waktu, perangkat, dan jaringan.\nB. can_access(s, o, e) ← dokter(s) ∧ pasien(o) ∈ ditangani(s) ∧ RS(s) = RS(o) ∧ perangkat(e) = RS ∧ jaringan(e) = internal ∧ waktu(e) ∈ shift(s).\nC. Uji 1: dokter penangani, saat shift, dari komputer RS: diizinkan. Uji 2: dokter yang sama dari rumah atau dokter lain pada jam yang sama: ditolak, dan percobaan dicatat.',
    ex: KUNCI_SENDIRI },
  { type: 'essay',
    q: 'ESAI 10 POIN — Sesi dan Otorisasi Dompet Digital Kampus\nAplikasi dompet digital kampus memakai token sesi di HP. Evaluasi menemukan: token berlaku 90 hari; setelah logout token lama tetap diterima API; mengubah account_id pada URL menampilkan saldo mahasiswa lain; transfer besar tidak meminta verifikasi tambahan.\n\nA. Jelaskan kelemahan pada token dan logout, serta risikonya. (3 poin)\nB. Usulkan pengelolaan sesi yang aman. (3 poin)\nC. Rancang pemeriksaan akses di sisi server untuk melihat saldo dan transfer, lalu berikan dua pengujian beserta hasilnya. (4 poin)',
    points: [
      'A: Token berumur panjang memperbesar waktu serangan jika token dicuri',
      'A: Logout tidak mencabut token di server, sehingga token lama bisa dipakai ulang',
      'B: Token berumur pendek, ada inactivity timeout dan absolute timeout',
      'B: Logout membatalkan sesi di server, dan token tidak valid ditolak dengan 401',
      'C: Server mengambil identitas dari token, bukan dari account_id kiriman klien, lalu mencocokkan pemilik akun (mencegah IDOR, OWASP A01)',
      'C: Transfer besar meminta autentikasi ulang atau faktor tambahan',
      'C: Uji: akses account_id orang lain menghasilkan 403',
      'C: Uji: token setelah logout menghasilkan 401'
    ],
    model: 'A. Token 90 hari yang tetap valid setelah logout memberi waktu panjang bagi pencuri token.\nB. Pakai access token 15 menit, refresh token yang bisa dicabut, inactivity dan absolute timeout, dan logout yang membatalkan sesi di server.\nC. Server membaca pemilik dari token, memeriksa pemilik sama dengan akun yang diminta, dan meminta faktor tambahan untuk transfer besar. Uji: account_id orang lain ditolak 403, token pascalogout ditolak 401.',
    ex: KUNCI_SENDIRI },
  { type: 'essay',
    q: 'ESAI 10 POIN — Login Terpusat dan Laboratorium\nKampus menyatukan login lima aplikasi lewat SSO. Sebelumnya, pesan gagal login berbunyi "E-mail tidak terdaftar" atau "Password salah". Aplikasi laboratorium ingin alat hanya bisa dipakai pengguna bersertifikat K3 yang punya reservasi aktif pada jam tersebut.\n\nA. Jelaskan peran IdP dan Relying Party, serta apa yang dipercaya RP. (3 poin)\nB. Jelaskan masalah pesan gagal login tersebut dan cara memperbaikinya. (3 poin)\nC. Tentukan model kontrol akses untuk alat laboratorium dan alasannya, lalu berikan dua pengujian. (4 poin)',
    points: [
      'A: IdP menyimpan kredensial dan mengautentikasi pengguna',
      'A: RP meminta verifikasi dan menerima assertion atau token yang ditandatangani IdP, tanpa menyimpan password',
      'B: Pesan berbeda membocorkan e-mail yang terdaftar (account enumeration)',
      'B: Pakai pesan samar yang sama, status 401 yang sama, dan waktu respons yang disamakan',
      'C: ABAC, karena keputusan memakai atribut sertifikat, reservasi, dan waktu',
      'C: Keputusan diambil di server pada setiap perintah alat',
      'C: Uji: sertifikat aktif dan reservasi aktif: diizinkan',
      'C: Uji: sertifikat kedaluwarsa atau reservasi dibatalkan: ditolak'
    ],
    model: 'A. IdP mengautentikasi, RP memercayai token bertanda tangan dari IdP sesuai trust framework.\nB. Pesan berbeda memberi tahu penyerang akun mana yang ada. Gunakan "E-mail atau password salah" dengan status dan waktu respons yang sama.\nC. ABAC: izin = sertifikat aktif ∧ reservasi aktif ∧ waktu dalam reservasi. Server memeriksanya pada setiap perintah. Uji sertifikat dan reservasi aktif: diizinkan; reservasi dibatalkan: ditolak.',
    ex: KUNCI_SENDIRI }
]);

BANK.uraian('ks', 'u2', 'Prediksi Uraian 2: Rancang Skema Kripto (20 poin)', [
  { type: 'essay',
    q: 'ESAI 20 POIN — Kirim Data Besar dari A ke B\nA mengirim arsip 5 GB ke B lewat jaringan tidak aman. Kemampuan tiap pihak:\nA: RSA, ECC, DES, AES (CBC, GCM), MD5, SHA-1, SHA-256, CSPRNG\nB: RSA, 3DES, AES (GCM), MD5, SHA-256\nKeduanya punya sertifikat dari CA yang sama. Persyaratan: kerahasiaan, integritas, autentikasi pengirim, dan non-repudiation.\n\nA. Petakan setiap persyaratan ke layanan dan mekanismenya. (5 poin)\nB. Pilih algoritma dari tabel, lalu jelaskan algoritma yang tidak dipilih. (5 poin)\nC. Gambarkan skema dan uraikan langkah pengirim serta penerima secara berurutan. (10 poin)',
    points: [
      'A: Kerahasiaan: enkripsi simetris dengan kunci sesi',
      'A: Integritas: hash SHA-256 dan tag GCM',
      'A: Autentikasi dan non-repudiation: tanda tangan digital dengan kunci privat A',
      'B: AES-GCM untuk data, karena cepat untuk data besar dan dimiliki keduanya',
      'B: RSA untuk membungkus kunci dan menandatangani, karena ECC tidak dimiliki B',
      'B: SHA-256; hindari MD5, SHA-1, DES, dan 3DES',
      'C: A membuat kunci sesi Ks dan nonce baru dengan CSPRNG',
      'C: A menghitung S = Sign(privat A, SHA-256(M))',
      'C: A menghitung C = AES-GCM(Ks, M ‖ S) dan EK = RSA-Enc(publik B, Ks), lalu mengirim C, EK, dan sertifikat A',
      'C: B memverifikasi sertifikat A, membuka Ks dengan kunci privat B, lalu mendekripsi dan mengecek tag GCM',
      'C: B memverifikasi S dengan kunci publik A; pesan ditolak jika salah satu cek gagal'
    ],
    model: 'Skema: [M] → SHA-256 → Sign(PR_A) → S. [M ‖ S] → AES-GCM(Ks) → C. Ks → RSA(PU_B) → EK. Kirim C ‖ EK ‖ Cert_A.\nPenerima: cek Cert_A → Ks = RSA(PR_B, EK) → dekripsi C dan cek tag → verifikasi S dengan PU_A.\nData besar memakai simetris karena RSA lambat. Tanda tangan memakai kunci privat A karena hanya A yang memilikinya, sehingga memberi non-repudiation.',
    ex: KUNCI_SENDIRI },
  { type: 'essay',
    q: 'ESAI 20 POIN — Evaluasi Skema Update Firmware IoT\nProdusen kunci pintar mengirim firmware ke 50.000 perangkat lewat server pihak ketiga. Skema saat ini:\n1. Firmware dienkripsi AES-ECB dengan satu kunci yang ditanam sama di semua perangkat.\n2. Server menampilkan MD5 firmware di halaman unduhan.\n3. Perangkat mengunduh lewat HTTP, mendekripsi, lalu langsung memasang.\nPerangkat bisa menyimpan kunci publik, memiliki AES-GCM, ECDSA, dan SHA-256. Hanya produsen yang memiliki CSPRNG yang andal.\n\nA. Identifikasi minimal empat kelemahan beserta dampaknya. (8 poin)\nB. Rancang skema perbaikan, termasuk gambar alur, proses verifikasi perangkat, dan pencegahan pemasangan versi lama. (9 poin)\nC. Jika kunci privat penandatangan bocor, apa yang harus dilakukan produsen? (3 poin)',
    points: [
      'A: ECB membocorkan pola isi firmware',
      'A: Satu kunci di semua perangkat: satu perangkat dibongkar, semua terbuka',
      'A: MD5 lemah terhadap collision dan tanpa kunci, sehingga bisa diganti bersama firmware',
      'A: HTTP tanpa autentikasi server dan integritas saluran; perangkat memasang tanpa verifikasi penerbit',
      'B: Produsen menandatangani hash SHA-256 firmware dan nomor versi dengan kunci privat ECDSA',
      'B: Perangkat menyimpan kunci publik produsen, bukan kunci privat',
      'B: Firmware dienkripsi AES-GCM dengan kunci sesi baru dan dikirim lewat TLS',
      'B: Perangkat memverifikasi tanda tangan sebelum memasang, dan gagal berarti ditolak',
      'B: Perangkat menolak nomor versi lebih rendah untuk mencegah rollback',
      'C: Hentikan pemakaian kunci, buat pasangan baru, dan kirim pergantian kunci lewat kunci cadangan yang sudah tertanam'
    ],
    model: 'Produsen: H = SHA-256(firmware ‖ versi), S = ECDSA(PR, H), C = AES-GCM(Ks, firmware). Unggah C, S, dan versi. Perangkat: unduh lewat TLS, dekripsi, verifikasi S dengan PU, cek versi lebih baru, baru pasang.\nJika kunci bocor: hentikan kunci itu, keluarkan pasangan baru, dan perbarui lewat kunci cadangan. Tanpa kunci cadangan, perangkat perlu perbaikan manual.',
    ex: KUNCI_SENDIRI },
  { type: 'essay',
    q: 'ESAI 20 POIN — Ijazah Digital dengan QR\nKampus menerbitkan 3.000 ijazah digital ber-QR. Perusahaan harus bisa memeriksanya, termasuk tanpa internet. Risiko: pemalsuan QR, perubahan nama atau IPK, penyalahgunaan ijazah yang dicabut, dan kebocoran kunci kampus. Data pribadi dalam QR harus minimal.\n\nA. Pilih mekanisme kriptografi untuk membuktikan penerbit dan integritas. Mengapa hash biasa tidak memadai? (5 poin)\nB. Uraikan proses penerbitan dan verifikasi dari awal sampai keputusan terima atau tolak, termasuk kunci yang dipakai. (7 poin)\nC. Usulkan mekanisme pencabutan dan jelaskan keterbatasannya saat offline. (5 poin)\nD. Jelaskan pengelolaan kunci dan penanganan kebocoran kunci kampus. (3 poin)',
    points: [
      'A: Tanda tangan digital seperti ECDSA atau Ed25519',
      'A: Hash tanpa kunci bisa dihitung ulang penyerang dan tidak membuktikan penerbit',
      'B: Isi QR: ID ijazah acak, data minimal, masa terbit, dan key ID, lalu ditandatangani kunci privat kampus',
      'B: Pemeriksa memegang kunci publik kampus yang dijamin sertifikat CA',
      'B: Verifikasi: baca QR, cek format dan key ID, verifikasi tanda tangan, lalu cek status pencabutan',
      'C: Daftar ijazah dicabut yang ditandatangani kampus, atau pemeriksaan status online',
      'C: Offline hanya sebaik salinan daftar terakhir, jadi ijazah yang baru dicabut bisa lolos',
      'D: Kunci privat disimpan di HSM atau KMS dengan akses terbatas dan rotasi',
      'D: Jika bocor: cabut key ID, terbitkan kunci baru, dan tandatangani ulang ijazah'
    ],
    model: 'A. Pakai tanda tangan digital, karena hanya pemegang kunci privat yang bisa menghasilkannya.\nB. Terbit: data minimal ‖ ID ‖ key ID → Sign(PR_kampus) → QR. Verifikasi: cek struktur → pilih PU sesuai key ID → verifikasi tanda tangan → cek daftar cabut → terima atau tolak.\nC. Daftar cabut bertanda tangan bisa dibawa offline, tetapi hanya sebaru unduhan terakhir.\nD. Simpan di HSM, rotasi berkala. Jika bocor, cabut key ID lalu terbitkan ulang.',
    ex: KUNCI_SENDIRI },
  { type: 'essay',
    q: 'ESAI 20 POIN — Evaluasi Aplikasi Chat Kampus\nDua mahasiswa memakai Diffie-Hellman untuk membuat kunci chat. Nilai publik dikirim lewat server tanpa tanda tangan. Pesan dienkripsi AES-CBC dengan IV tetap dan kunci yang sama selama satu semester. Setiap pesan disertai SHA-256 pesan tersebut, tanpa kunci. Server dikelola pihak lain dan tidak boleh membaca pesan.\n\nA. Jelaskan bagaimana server dapat melakukan man-in-the-middle, langkah demi langkah. (6 poin)\nB. Identifikasi dua kelemahan lain beserta dampaknya. (4 poin)\nC. Rancang skema perbaikan yang memberi kerahasiaan, integritas, autentikasi, dan forward secrecy. Lengkapi dengan gambar alur. (10 poin)',
    points: [
      'A: Server mencegat YA dan YB, lalu mengirim nilai publik miliknya ke masing-masing pihak',
      'A: Terbentuk dua kunci: Alice-server dan server-Bob',
      'A: Server mendekripsi, membaca, lalu mengenkripsi ulang pesan tanpa terdeteksi, karena nilai publik tidak diautentikasi',
      'B: IV tetap dan kunci satu semester: pola berulang terlihat dan satu kebocoran membuka semua pesan',
      'B: SHA-256 tanpa kunci: pesan bisa diganti bersama hash-nya',
      'C: Pakai ECDHE dengan kunci sementara baru untuk setiap sesi',
      'C: Tanda tangani nilai publik sementara dengan kunci privat jangka panjang dan sertifikat dari CA',
      'C: Turunkan kunci sesi dari rahasia bersama',
      'C: Enkripsi pesan dengan AES-GCM dan nonce unik per pesan',
      'C: Hapus kunci sementara setelah sesi agar pesan lama aman walau kunci jangka panjang bocor (forward secrecy)'
    ],
    model: 'Alice: buat a, A = aG, kirim A ‖ Sign(PR_Alice, A) ‖ Cert_Alice. Bob melakukan hal yang sama. Masing-masing memverifikasi sertifikat dan tanda tangan, lalu menghitung S = a·B = b·A dan menurunkan Ks. Pesan: AES-GCM(Ks, nonce, M). Kunci sementara dihapus setelah sesi.',
    ex: KUNCI_SENDIRI },
  { type: 'essay',
    q: 'ESAI 20 POIN — Evaluasi Backup Terenkripsi di Cloud\nStartup menyimpan backup harian data pelanggan di penyimpanan cloud pihak lain. Skema saat ini:\n1. Backup dienkripsi 3DES-ECB dengan satu kunci yang tertulis di file konfigurasi repositori.\n2. Kunci sama dipakai sejak perusahaan berdiri.\n3. Admin membandingkan MD5 backup untuk memastikan berkas utuh.\nPersyaratan: penyedia cloud tidak bisa membaca data, perubahan backup terdeteksi, dan bocornya kunci satu backup tidak membuka backup lain.\n\nA. Identifikasi minimal empat kelemahan beserta dampaknya. (8 poin)\nB. Rancang skema perbaikan, termasuk pembuatan, pembungkusan, dan penyimpanan kunci. Lengkapi dengan gambar alur. (9 poin)\nC. Seorang admin keluar dari perusahaan. Apa yang harus dilakukan? (3 poin)',
    points: [
      'A: 3DES sudah usang dan lebih lemah dari AES',
      'A: ECB membocorkan pola data',
      'A: Kunci di repositori bisa terbaca siapa pun yang punya akses kode',
      'A: Kunci tunggal jangka panjang: sekali bocor, semua backup terbuka',
      'A: MD5 tanpa kunci tidak membuktikan keaslian dan rentan collision',
      'B: Kunci data acak baru dari CSPRNG untuk setiap backup',
      'B: Enkripsi backup dengan AES-256-GCM agar perubahan terdeteksi',
      'B: Bungkus kunci data dengan master key di KMS atau HSM, simpan versi terbungkus bersama backup',
      'C: Cabut akses admin ke KMS dan akun terkait',
      'C: Rotasi master key dan rahasia yang pernah diketahuinya'
    ],
    model: 'Setiap backup: DEK = CSPRNG, C = AES-256-GCM(DEK, backup), W = Wrap(KEK di KMS, DEK). Simpan C ‖ W di cloud. Pemulihan: KMS membuka W sesuai izin, lalu GCM mendekripsi dan mengecek tag. Admin keluar: cabut akses, rotasi KEK, dan audit log akses.',
    ex: KUNCI_SENDIRI }
]);

BANK.uraian('ks', 'h1', 'Isian Hitungan Kripto', [
  { type: 'fill', q: 'RSA dengan p = 3, q = 11, e = 7, M = 2. Hitung nilainya.',
    fields: [{ label: 'n', a: 33 }, { label: 'φ(n)', a: 20 }, { label: 'd', a: 3 }, { label: 'C', a: 29 }],
    ex: 'n = 33, φ = 2×10 = 20, 3×7 = 21 mod 20 = 1, C = 2^7 mod 33 = 128 mod 33 = 29. ' + KUNCI_SENDIRI },
  { type: 'fill', q: 'RSA dengan p = 7, q = 13, e = 5, M = 10. Hitung nilainya.',
    fields: [{ label: 'n', a: 91 }, { label: 'φ(n)', a: 72 }, { label: 'd', a: 29 }, { label: 'C', a: 82 }],
    ex: '5×29 = 145 = 2×72 + 1. 10^2 mod 91 = 9, 10^4 mod 91 = 81, 10^5 mod 91 = 810 mod 91 = 82. ' + KUNCI_SENDIRI },
  { type: 'fill', q: 'Pakai contoh slide RSA: p = 17, q = 11, e = 7. Berapa d, dan berapa C untuk M = 88?',
    fields: [{ label: 'd', a: 23 }, { label: 'C', a: 11 }],
    ex: '23×7 = 161 = 160 + 1. 88^7 mod 187 = 11. ' + KUNCI_SENDIRI },
  { type: 'fill', q: 'Diffie-Hellman dengan q = 23, α = 5, XA = 6, XB = 15. Hitung YA, YB, dan kunci K.',
    fields: [{ label: 'YA', a: 8 }, { label: 'YB', a: 19 }, { label: 'K', a: 2 }],
    ex: 'YA = 5^6 mod 23 = 8, YB = 5^15 mod 23 = 19, K = 19^6 mod 23 = 8^15 mod 23 = 2. ' + KUNCI_SENDIRI },
  { type: 'fill', q: 'Diffie-Hellman dengan q = 29, α = 2, XA = 5, XB = 7. Hitung YA, YB, dan kunci K.',
    fields: [{ label: 'YA', a: 3 }, { label: 'YB', a: 12 }, { label: 'K', a: 12 }],
    ex: 'YA = 32 mod 29 = 3, YB = 128 mod 29 = 12, K = 12^5 mod 29 = 3^7 mod 29 = 12. ' + KUNCI_SENDIRI },
  { type: 'fill', q: 'ECDH pada y² = x³ + 2x + 2 mod 17, G = (5,1). Kelipatan G: 2G=(6,3), 3G=(10,6), 4G=(3,1), 5G=(9,16), 6G=(16,13), 7G=(0,6), 8G=(13,7). Alice a = 2, Bob b = 3. Berapa rahasia bersama S?',
    fields: [{ label: 'S, koordinat x', a: 16 }, { label: 'S, koordinat y', a: 13 }],
    ex: 'S = ab·G = 6G = (16,13). ' + KUNCI_SENDIRI },
  { type: 'fill', q: 'Isi kunci setara dari tabel NIST SP 800-57 pada slide.',
    fields: [{ label: '128 bit, RSA', a: 3072 }, { label: '128 bit, ECC', a: 256 }, { label: '112 bit, RSA', a: 2048 }, { label: '192 bit, ECC', a: 384 }],
    ex: '128 bit setara RSA 3072 dan ECC 256. 112 bit setara RSA 2048. 192 bit setara ECC 384. ' + KUNCI_SENDIRI },
  { type: 'fill', q: 'LCG dengan X0 = 2, a = 3, c = 1, m = 7, memakai X(n+1) = (a·X(n) + c) mod m. Berapa X1 sampai X3, dan berapa periodenya?',
    fields: [{ label: 'X1', a: 0 }, { label: 'X2', a: 1 }, { label: 'X3', a: 4 }, { label: 'Periode', a: 6 }],
    ex: 'Barisnya 2, 0, 1, 4, 6, 5, lalu kembali ke 2, jadi periodenya 6. ' + KUNCI_SENDIRI },
  { type: 'fill', q: 'Dosen memakai hybrid encryption untuk 40 mahasiswa. Berapa kali berkas besar dienkripsi, dan berapa kunci terbungkus yang dibuat? Jika satu mahasiswa mundur, berapa kunci terbungkus baru yang dibuat?',
    fields: [{ label: 'Enkripsi berkas', a: 1 }, { label: 'Kunci terbungkus', a: 40 }, { label: 'Setelah mundur', a: 39 }],
    ex: 'Berkas dienkripsi sekali, yang digandakan hanya kunci sesi. Setelah mundur, buat Ks baru untuk 39 mahasiswa. Pola ini dari pembahasan kisi-kisi.' }
]);

BANK.uraian('ks', 'h2', 'Isian Konsep Singkat', [
  { type: 'fill', q: 'Tentukan model kontrol akses: DAC, MAC, RBAC, atau ABAC.',
    fields: [
      { label: 'Pemilik berkas membagikan aksesnya ke teman', a: 'DAC' },
      { label: 'Dokumen berlabel rahasia dan pengguna punya clearance', a: 'MAC' },
      { label: 'Hak mengikuti jabatan staf keuangan', a: 'RBAC' },
      { label: 'Akses hanya saat jam kerja dari jaringan kantor', a: 'ABAC' }
    ], ex: 'DAC pemilik, MAC label, RBAC peran, ABAC atribut dan kondisi. ' + KUNCI_SENDIRI },
  { type: 'fill', q: 'Tuliskan kode OWASP Top 10:2025 untuk kasus berikut (misalnya A01).',
    fields: [
      { label: 'Mengganti id di URL membuka data orang lain', a: 'A01' },
      { label: 'SQL injection pada kolom pencarian', a: 'A05' },
      { label: 'Password disimpan dengan algoritma lemah', a: 'A04' },
      { label: 'Library pihak ketiga disusupi malware', a: 'A03' }
    ], ex: 'A01 Broken Access Control, A05 Injection, A04 Cryptographic Failures, A03 Software Supply Chain Failures. ' + KUNCI_SENDIRI },
  { type: 'fill', q: 'Tuliskan bab ASVS 5.0 (misalnya V7) untuk topik berikut.',
    fields: [
      { label: 'Inactivity timeout', a: 'V7' }, { label: 'Otorisasi per objek', a: 'V8' },
      { label: 'Validasi JWT', a: 'V9' }, { label: 'Password', a: 'V6' }
    ], ex: 'V6 Authentication, V7 Session Management, V8 Authorization, V9 Self-contained Tokens. ' + KUNCI_SENDIRI },
  { type: 'fill', q: 'Tuliskan mode operasi: ECB, CBC, CTR, OFB, atau GCM.',
    fields: [
      { label: 'Pola gambar tetap terlihat setelah dienkripsi', a: 'ECB' },
      { label: 'Memberi kerahasiaan sekaligus tag integritas', a: 'GCM' },
      { label: 'Blok plaintext di-XOR dengan ciphertext sebelumnya', a: 'CBC' },
      { label: 'Memakai counter terenkripsi untuk kecepatan tinggi', a: 'CTR' }
    ], ex: 'ECB membocorkan pola, GCM adalah AEAD, CBC berantai, CTR memakai counter. ' + KUNCI_SENDIRI },
  { type: 'fill', q: 'Berapa jumlah faktor autentikasi berbeda pada kombinasi berikut?',
    fields: [
      { label: 'Password + PIN', a: 1 }, { label: 'Password + TOTP', a: 2 },
      { label: 'Kartu + sidik jari + PIN', a: 3 }
    ], ex: 'Password dan PIN sama-sama know. TOTP adalah have. Kartu have, sidik jari are, PIN know. ' + KUNCI_SENDIRI }
]);
