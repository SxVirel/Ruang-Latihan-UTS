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
  blurb: 'Soal asli UTS 24/25 dan 25/26, latihan per nomor kisi-kisi 2026, dan materinya',
  about: 'Disusun dari kisi-kisi UTS 2026, soal UTS Genap 24/25 dan Ganjil 25/26, dokumen SOAL (Chord dengan hashing ASCII), serta buku Distributed Systems (van Steen & Tanenbaum). Topik Soal Asli UTS 24/25 dan 25/26 memuat soal ujian aslinya dengan gambar digambar ulang. Topik 1 sampai 7 mengikuti nomor kisi-kisi 2026; tiap topik punya paket soal a/b/c bergaya UTS dan latihan singkat. Kunci di luar soal asli disusun sendiri dan perlu dicek. Lab interaktif melatih vector clock, Chord, dan konsistensi.',
  materiLead: 'Materi disusun per nomor kisi-kisi UTS 2026. Setiap bab memuat ringkasan, tabel perbandingan, dan contoh soal beserta pembahasannya. Ketuk satu bab untuk membukanya.',
  notes: [
    '1. Sistem terdistribusi: centralized, decentralized, distributed; skalabilitas; transparansi.',
    '2. Arsitektur: teori dasar, RESTful architecture, publish-subscribe architecture (tabel koordinasi referentially/temporally decoupled).',
    '3. Proses: teori dasar dan container (Docker) vs virtual machine: definisi, contoh, kelebihan, kekurangan. Tanpa hitungan.',
    '4. Komunikasi: transient/persistent × synchronous/asynchronous dan cara kerja RPC.',
    '5. Koordinasi: logical clock (situasi yang membutuhkannya) dan vector clock, mengisi timestamp dari diagram berbentuk berbeda.',
    '6. Penamaan: name, identifier, address; Chord: total ASCII mod 2^m, successor, finger table, lookup.',
    '7. Konsistensi: mengapa diperlukan, analisis diagram P1-P4 sequentially dan causally consistent.'
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
