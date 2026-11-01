// Course list. Order and labels used across the app.
BANK.course('ks', {
  name: 'Keamanan Siber', code: 'KS', kind: 'mcq',
  blurb: 'Pilihan ganda dari Kuis 1-7, Latihan 1, dan kisi-kisi UTS, pilih 25 sampai 100 soal',
  about: 'Bank soal dari tujuh kuis LMS, Latihan 1, dan topik kisi-kisi UTS: konsep dasar, autentikasi & access control, etika & hukum, software security, OWASP, kriptografi simetris, dan kriptografi kunci publik. Topik kisi-kisi melatih soal skenario desain dan analisis skema kriptografi seperti pada soal uraian. Tab Materi merangkum slide minggu 1-7, dan tab Uraian & Isian berisi prediksi soal.'
});
BANK.course('ka', {
  name: 'Kecerdasan Artifisial', code: 'KA', kind: 'isian', secsPerItem: 150,
  blurb: 'GA kombinatorial, NSGA-II, dasar machine learning',
  about: 'Isian dan hitungan dari minggu 5-7: operator permutasi (PMX, OX, mutasi), constraint, Tabu Search, dominance dan crowding distance NSGA-II, generalisasi, baseline, serta precision dan recall.'
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
  blurb: 'Prinsip, framework, akuisisi, dead & memory forensics',
  about: 'Isian dan esai dari tujuh slide: Locard, ACPO, ISO/IEC 27037, tahapan forensik, hashing dan timestamp, imaging, write blocker, disk sanitation, serta memory forensics dengan Volatility.'
});
BANK.course('mp', {
  name: 'Manajemen Proyek', code: 'MP', kind: 'isian', secsPerItem: 180, labs: ['cpm'],
  blurb: 'PMBOK, organisasi, integrasi, scope, waktu',
  about: 'Isian dan hitungan dari Manpro 1-6: proyek vs operasional, struktur organisasi, process groups, project charter, NPV/ROI/payback, WBS, jalur kritis, dan PERT.'
});
