// Course list. Order and labels used across the app.
BANK.course('ks', {
  name: 'Keamanan Siber', code: 'KS', kind: 'mcq',
  blurb: 'Pilihan ganda dari Kuis 1-7, Latihan 1, dan kisi-kisi UTS, pilih 25 sampai 100 soal',
  about: 'Bank soal dari tujuh kuis LMS, Latihan 1, dan topik kisi-kisi UTS: konsep dasar, autentikasi & access control, etika & hukum, software security, OWASP, kriptografi simetris, dan kriptografi kunci publik. Topik kisi-kisi melatih soal skenario desain dan analisis skema kriptografi seperti pada soal uraian. Tab Materi merangkum slide minggu 1-7, dan tab Uraian & Isian berisi prediksi soal.'
});
BANK.course('ka', {
  name: 'Kecerdasan Artifisial', code: 'KA', kind: 'isian', secsPerItem: 150,
  blurb: '23 soal uraian bertahap berpola UTS, dibagi rata ke 4 materi kisi-kisi',
  about: 'Latihan soal hanya berisi soal berpola UTS untuk 4 materi kisi-kisi: Introduction to Metaheuristic Search, Genetic Algorithm, GA for Combinatorial Problems, dan Multi-Objective Optimisation. Setiap materi punya minimal empat soal, dan tiap soal dipecah menjadi langkah a, b, c yang dibuka satu per satu seperti soal esai. Polanya: Soal 1 UTS 2025 (GA untuk TSP) beserta lima soal TSP lain, Hill Climbing dan Simulated Annealing dengan hitungan, satu generasi GA lengkap (biner, minimasi, dan jadwal integer), PMX dan OX, serta NSGA-II dari sort sampai fill N. Tab Materi berisi pembahasan UTS 2025 dan ringkasan tiap materi dengan diagram kromosom dan roulette. Isian singkat minggu 5-6 dipisah di tab Di luar format UTS.',
  uraianLabel: 'Di luar format UTS',
  uraianLead: 'Soal isian singkat minggu 5-6 (materinya masuk UTS, tetapi UTS berbentuk esai). Untuk latihan tambahan saja; latihan utama ada di tab Latihan soal.',
  materiLead: 'Materi disusun mengikuti 4 materi UTS, diawali pola ujian dan pembahasan Soal 1 UTS 2025. Ketuk satu bab untuk membukanya.'
});
BANK.course('ca', {
  name: 'Komputasi Awan', code: 'CL', kind: 'isian', secsPerItem: 240, labs: ['clocks', 'chord', 'consistency'],
  blurb: 'Sistem terdistribusi berpola UTS 24/25 dan 25/26, dengan materi per nomor soal',
  about: 'Disusun dari catatan kisi-kisi dosen, soal UTS Genap 24/25 dan Ganjil 25/26, serta buku Distributed Systems (van Steen & Tanenbaum). Topik Soal Asli UTS 24/25 dan Soal Asli UTS 25/26 memuat soal ujian aslinya, satu soal bertahap per nomor dengan gambar digambar ulang. Topik Pola UTS 24/25 dan Pola UTS 25/26 berisi soal yang mengikuti sub-soal ujian itu; Pola UTS 24/25 & 25/26 berisi pola yang muncul di keduanya. Untuk fokus ke satu ujian, centang topik ujian itu ditambah topik 24/25 & 25/26. Topik lainnya berisi soal kisi-kisi. Lab interaktif melatih tiga soal hitungan yang pasti keluar.',
  materiLead: 'Materi disusun per nomor soal UTS (7 topik yang sama di 24/25 dan 25/26). Setiap bab memuat ringkasan, tabel perbandingan, dan contoh soal ujian beserta pembahasannya. Ketuk satu bab untuk membukanya.',
  notes: [
    'Shared memory vs private memory, dan perbedaan jenis sistem terdistribusi.',
    'Kenapa server multithread melayani lebih banyak client daripada single thread.',
    'Komunikasi transient/persistent × synchronous/asynchronous beserta contohnya. Client-server minggu 4 bersifat transient asynchronous.',
    'Multicasting: satu pengirim ke banyak penerima.',
    'Koordinasi: sinkronisasi clock, algoritma election (Bully, Ring).',
    'Mengisi timestamp Lamport/vector dari diagram panah antar proses (lihat lab Timestamp).',
    'Penamaan: home-based approach (cara kerja, kelebihan, kekurangan) dan Chord: tiap node menyimpan key, cara membuat finger table.',
    'Publish-subscribe dan gaya arsitektur: komponen, interface, connector.',
    'Container vs virtual machine: fungsi, contoh, kelebihan, kekurangan.',
    'Konsistensi: kenapa diperlukan, dan analisis tabel P1-P4 apakah sequentially consistent (dibaca dari kiri ke kanan).'
  ]
});
BANK.course('fd', {
  name: 'Forensik Digital', code: 'FD', kind: 'isian', secsPerItem: 150,
  // Kisi-kisi UTS: 20 pilihan ganda (40 poin) + 5 soal analisis (60 poin), 135 menit.
  // Sesi latihan memakai bentuk yang sama: 20 PG + 5 isian singkat, diacak dan dicampur.
  // Timer ujian dihitung dari campuran ini: 20 x 120 detik + 5 x 300 detik = 65 menit.
  mix: { mcq: 20, fill: 5 }, mixSecs: { mcq: 120, fill: 300 },
  blurb: 'Tiap sesi 20 pilihan ganda + 5 isian, bobot kisi-kisi 28/12/40/20',
  about: 'Bank soal kisi-kisi UTS: prinsip Locard dan tahapan forensik, Daubert, ACPO, ISO/IEC 27037, live dan dead imaging, write blocker, hash, sanitasi media, registry Windows, timestamp, cluster dan slack, serta memory forensics dengan Volatility. Setiap sesi selalu berisi 20 pilihan ganda dan 5 isian singkat yang diacak, seperti bentuk ujian. Tab Materi merangkum tujuh dek slide, dan tab Uraian & Isian memuat soal isian serta esai lama untuk latihan bebas.'
});
BANK.course('mp', {
  name: 'Manajemen Proyek', code: 'MP', kind: 'isian', secsPerItem: 180, labs: ['cpm'],
  blurb: 'Hitungan kisi-kisi, UTS tahun lalu, dan remedial: NPV, ROI, ROA, payback, EV, critical path. WBS di tab Materi',
  about: 'Latihan soal hanya berisi hitungan, dalam bentuk isian seperti UTS, dari kisi-kisi, soal UTS 2026 Genap, dan soal remedial Ganjil 2024/2025. Topik kisi-kisi melatih NPV dan PV, ROI dan ROA, payback period, earned value, jaringan aktivitas, dan PERT. Topik Mirip Soal dan Mirip Soal Remedial memakai narasi soal ujian dengan kasus dan angka berbeda. Tab Materi merangkum tiap butir kisi-kisi dan tiap soal ujian, lengkap dengan diagram WBS dan network diagram dari contoh soal.',
  materiLead: 'Materi disusun per soal ujian dan butir kisi-kisi. Soal WBS dan network diagram ada di sini sebagai contoh bergambar, bukan di latihan soal. Ketuk satu bab untuk membukanya.'
});
