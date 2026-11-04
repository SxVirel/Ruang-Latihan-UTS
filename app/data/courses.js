// Course list. Order and labels used across the app.
BANK.course('ks', {
  name: 'Keamanan Siber', code: 'KS', kind: 'mcq',
  blurb: 'Pilihan ganda dari Kuis 1-7, Latihan 1, dan kisi-kisi UTS, pilih 25 sampai 100 soal',
  about: 'Bank soal dari tujuh kuis LMS, Latihan 1, dan topik kisi-kisi UTS: konsep dasar, autentikasi & access control, etika & hukum, software security, OWASP, kriptografi simetris, dan kriptografi kunci publik. Topik kisi-kisi melatih soal skenario desain dan analisis skema kriptografi seperti pada soal uraian. Tab Materi merangkum slide minggu 1-7, dan tab Uraian & Isian berisi prediksi soal.'
});
BANK.course('ka', {
  name: 'Kecerdasan Artifisial', code: 'KA', kind: 'isian', secsPerItem: 150,
  blurb: 'Uraian bertahap 4 materi UTS: metaheuristik, GA, GA kombinatorial (TSP, PMX, OX), NSGA-II',
  about: 'Latihan soal mengikuti 4 materi UTS dari slide dosen: Introduction to Metaheuristic Search, Genetic Algorithm, GA for Combinatorial Problems, dan Multi-Objective Optimisation. Bentuknya uraian bertahap seperti soal esai: setiap soal dipecah menjadi langkah a, b, c yang dibuka satu per satu. Ada Soal 1 UTS 2025 (sama dengan LKS GA-2) beserta tiga soal mirip, dan NSGA-II dari latihan slide Week 6. Tab Materi berisi pembahasan UTS 2025 dan ringkasan tiap materi dengan diagram kromosom dan roulette. Isian singkat minggu 5-6 dan learning minggu 7 dipisah di tab Di luar format UTS.',
  uraianLabel: 'Di luar format UTS',
  uraianLead: 'Soal isian singkat minggu 5-6 (materinya masuk UTS, tetapi UTS berbentuk esai) dan learning minggu 7 (di luar materi UTS). Untuk latihan tambahan saja; latihan utama ada di tab Latihan soal.',
  materiLead: 'Materi disusun mengikuti 4 materi UTS, diawali pola ujian dan pembahasan Soal 1 UTS 2025. Ketuk satu bab untuk membukanya.'
});
BANK.course('ca', {
  name: 'Komputasi Awan', code: 'CL', kind: 'isian', secsPerItem: 240, labs: ['clocks', 'chord', 'consistency'],
  blurb: 'Sistem terdistribusi: timestamp, Chord, konsistensi',
  about: 'Disusun dari catatan kisi-kisi dosen dan buku Distributed Systems (van Steen & Tanenbaum). Lab interaktif melatih tiga soal hitungan yang pasti keluar.',
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
