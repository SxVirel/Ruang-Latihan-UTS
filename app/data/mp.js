// Manajemen Proyek — Manpro 1-6 (Schwalbe, IT Project Management)
BANK.isian('mp', 'intro', 'Pengantar & PMBOK', [
  { type: 'fill', q: 'Definisi proyek menurut PMBOK: "a temporary endeavor undertaken to accomplish a ... product or service". Isi kata yang hilang, dan sebutkan beda utama proyek dengan operasional.',
    fields: [{ label: 'Kata yang hilang', a: ['unique', 'unik'] }, { label: 'Operasional bersifat', a: ['tetap dan berulang', 'berulang', 'rutin', 'ongoing repetitive', 'repetitive'] }],
    ex: 'Proyek bersifat sementara dan unik, operasional berlangsung tetap dan berulang.' },
  { type: 'fill', q: 'Triple constraint (tiga batasan) manajemen proyek.',
    fields: [{ label: '1', a: ['scope', 'ruang lingkup', 'lingkup'] }, { label: '2', a: ['time', 'waktu'] }, { label: '3', a: ['cost', 'biaya'] }],
    ex: 'Sasaran proyek: scope goals (apa), time goals (berapa lama), cost goals (berapa biaya). Kualitas sering ditaruh di tengah segitiga.' },
  { type: 'fill', q: 'PMBOK berisi berapa kelompok proses dan berapa knowledge area?',
    fields: [{ label: 'Process groups', a: 5, tol: 0 }, { label: 'Knowledge areas', a: 10, tol: 0 }, { label: 'Total proses (PMBOK 5)', a: 47, tol: 0 }],
    ex: '10 area: 4 inti (scope, time, cost, quality), 4 fasilitas (SDM, komunikasi, risiko, pengadaan), integrasi, stakeholder.' },
  { type: 'fill', q: 'Lima process groups (urut).',
    fields: [{ label: '1', a: ['initiating', 'inisiasi'] }, { label: '2', a: ['planning', 'perencanaan'] }, { label: '3', a: ['executing', 'eksekusi', 'pelaksanaan'] }, { label: '4', a: ['monitoring and controlling', 'controlling', 'monitoring', 'pengawasan', 'pengontrolan'] }, { label: '5', a: ['closing', 'penutupan'] }] },
  { type: 'fill', q: 'CHAOS Report Standish Group 1994: persentase proyek IT yang sukses, gagal, dan bermasalah (challenged).',
    fields: [{ label: 'Succeeded (%)', a: 16, tol: 0.5 }, { label: 'Failed (%)', a: 31, tol: 0.5 }, { label: 'Challenged (%)', a: 53, tol: 0.5 }],
    ex: 'Tahun 2009: sukses 32%, gagal 24%, challenged 44%.' },
  { type: 'essay', q: 'Bedakan portfolio, program, dan project.',
    points: ['Project: tujuan terdefinisi, cakupan dielaborasi progresif, sukses diukur kualitas, waktu, anggaran, kepuasan', 'Program: kelompok proyek terkait yang dikoordinasi untuk manfaat lebih besar', 'Portfolio: kumpulan proyek, program, dan operasi untuk tujuan strategis organisasi', 'Sukses portfolio diukur dari performa investasi dan realisasi keuntungan'] },
  { type: 'essay', q: 'Sebutkan karakteristik proyek dan perbedaan proyek IT dengan non-IT.',
    points: ['Sementara, hasil unik, memerlukan perencanaan, sumber daya terbatas, penuh ketidakpastian, tugas tidak rutin', 'Proyek IT terhubung fungsi bisnis/sistem organisasi', 'Scope proyek IT lemah penetapannya dan mudah berubah', 'Stakeholder IT sulit diidentifikasi', 'Risiko IT sulit diidentifikasi dengan dampak besar', 'Estimasi anggaran dan jadwal IT lemah'] }
]);

BANK.isian('mp', 'org', 'Organisasi & Proses', [
  { type: 'fill', q: 'Struktur organisasi: wewenang manajer proyek.',
    fields: [
      { label: 'Kecil atau tidak ada', a: ['fungsional', 'functional'] },
      { label: 'Besar sampai hampir total', a: ['projectized', 'proyek'] },
      { label: 'Moderat sampai besar, PM full-time', a: ['strong matrix', 'matriks kuat'] },
      { label: 'Terbatas, PM paruh waktu sebagai koordinator', a: ['weak matrix', 'matriks lemah'] }],
    ex: 'Persentase personel full-time: fungsional ~0, weak 0-25%, balanced 15-60%, strong 50-95%, projectized 85-100%.' },
  { type: 'fill', q: 'Tentukan struktur organisasi dari iklan lowongan (kasus slide).',
    fields: [
      { label: 'Kelola dari awal sampai akhir: pilih tim, estimasi, 6 bulan', a: ['projectized'] },
      { label: 'Bantu development manager, masalah tim dikembalikan ke dia', a: ['fungsional', 'functional'] },
      { label: 'PM pegang jadwal dan anggaran, programming manager pegang personel', a: ['matriks', 'matrix'] },
      { label: 'Kontrak, tiga tim, tanggung jawab penuh anggaran dan waktu', a: ['projectized'] }] },
  { type: 'fill', q: 'Four frames of organizations (Bolman & Deal).',
    fields: [
      { label: 'Peran, tanggung jawab, bagan organisasi', a: ['structural', 'struktural', 'struktur'] },
      { label: 'Harmoni kebutuhan organisasi dan orang', a: ['human resources', 'sdm', 'human resource'] },
      { label: 'Koalisi, konflik, dan kekuasaan', a: ['political', 'politik', 'politis'] },
      { label: 'Simbol, makna, budaya', a: ['symbolic', 'simbolik'] }] },
  { type: 'essay', q: 'Jelaskan tujuan dan output tiap tahap manajemen proyek (inisiasi sampai penutupan).',
    points: ['Inisiasi: tunjuk PM, identifikasi stakeholder, kriteria sukses; output project charter + business case', 'Perencanaan: scope, jadwal, dana, risiko, komunikasi, baseline; output scope statement, WBS, Gantt chart, daftar risiko', 'Eksekusi: merealisasikan rencana, koordinasi tim dan sumber daya', 'Pengontrolan: memastikan sesuai target; output status dan progress report', 'Penutupan: akhiri formal; output arsip proyek dan lesson learned'] },
  { type: 'fill', q: 'Kelompokkan kegiatan ke tahap proyek (inisiasi, perencanaan, eksekusi, monitoring, penutupan).',
    fields: [
      { label: 'Pembuatan project charter', a: ['inisiasi', 'initiating'] },
      { label: 'Mengidentifikasi risiko', a: ['perencanaan', 'planning'] },
      { label: 'Mendistribusikan informasi', a: ['eksekusi', 'executing'] },
      { label: 'Mengontrol jadwal', a: ['monitoring', 'monitoring and controlling', 'pengontrolan'] },
      { label: 'Mengidentifikasi stakeholder', a: ['inisiasi', 'initiating'] },
      { label: 'Memperkirakan durasi aktivitas', a: ['perencanaan', 'planning'] }] },
  { type: 'fill', q: 'Model siklus hidup SDLC.',
    fields: [
      { label: 'Tahap linear yang terdefinisi jelas', a: ['waterfall'] },
      { label: 'Iterasi 30 hari disebut sprint, rapat harian singkat', a: ['scrum'] },
      { label: 'Developer pair programming dan menulis test sendiri', a: ['xp', 'extreme programming'] },
      { label: 'Kategori model untuk scope yang bisa diprediksi', a: ['predictive', 'prediktif'] }] },
  { type: 'essay', q: 'Apa itu PMO dan budaya organisasi yang mendukung proyek?',
    points: ['PMO = "manajer dari manajer proyek", di antara PM dan chief executive', 'PMO memberi pertimbangan, kebijakan, prosedur, dan memformalkan wewenang PM', 'Budaya organisasi: asumsi, nilai, dan perilaku bersama', 'Proyek berhasil jika member identity, group emphasis, unit integration, risk tolerance, reward criteria, conflict tolerance, open-systems focus kuat'] }
]);

BANK.isian('mp', 'integ', 'Integration & Finansial', [
  { type: 'fill', q: 'Proses project integration management (6 proses). Isi yang hilang: membuat project charter, membuat project management plan, ..., mengawasi dan mengendalikan pekerjaan, mengintegrasikan pengendalian perubahan, menutup proyek.',
    fields: [{ label: 'Proses ke-3', a: ['mengarahkan dan mengatur pekerjaan proyek', 'direct and manage project work', 'mengarahkan dan mengatur eksekusi proyek'] }],
    ex: 'Project charter adalah dokumen formal yang mengakui keberadaan proyek dan memberi PM wewenang memakai sumber daya.' },
  { type: 'fill', q: 'Investasi awal 100 (tahun 0), arus kas masuk 60 di tahun 1 dan 60 di tahun 2, discount rate 10%. Hitung NPV (2 desimal).',
    fields: [{ label: 'NPV', a: 4.13, tol: 0.02 }],
    ex: 'NPV = −100 + 60/1,1 + 60/1,1² = −100 + 54,55 + 49,59 = 4,13. NPV positif layak dipertimbangkan, makin tinggi makin baik.' },
  { type: 'fill', q: 'Total discounted benefits 150 juta, total discounted costs 100 juta. Hitung ROI (%).',
    fields: [{ label: 'ROI (%)', a: 50, tol: 0.01 }],
    ex: 'ROI = (benefit − cost) / cost × 100% = 50/100 × 100% = 50%.' },
  { type: 'fill', q: 'Investasi 100 juta, arus kas tetap 40 juta per tahun. Berapa payback period (tahun)?',
    fields: [{ label: 'Payback (tahun)', a: 2.5, tol: 0.01 }],
    ex: 'Arus kas sama: investasi / net cash flow = 100/40 = 2,5 tahun.' },
  { type: 'fill', q: 'Investasi 500 juta. Arus kas: tahun 1 = 150, tahun 2 = 200, tahun 3 = 250 (juta). Hitung payback period dengan rumus n + (a − b)/(c − b).',
    fields: [{ label: 'n', a: 2, tol: 0 }, { label: 'b (kumulatif tahun n)', a: 350, tol: 0 }, { label: 'c (kumulatif tahun n+1)', a: 600, tol: 0 }, { label: 'Payback (tahun)', a: 2.6, tol: 0.01 }],
    ex: 'Kumulatif: 150, 350, 600. n = 2, a = 500, b = 350, c = 600. Payback = 2 + (500−350)/(600−350) = 2 + 150/250 = 2,6 tahun.' },
  { type: 'essay', q: 'Apa isi project charter?',
    points: ['Requirements dan kebutuhan bisnis / deskripsi proyek tingkat tinggi', 'Tujuan atau justifikasi proyek (business case, ROI)', 'Manajer proyek yang ditugaskan dan tingkat wewenangnya', 'Ringkasan jadwal milestone', 'Stakeholder dan pengaruhnya, organisasi fungsional yang terlibat', 'Asumsi dan kendala', 'Ringkasan anggaran', 'Ditandatangani stakeholder penting'] },
  { type: 'fill', q: 'Metode seleksi proyek (tools project charter).',
    fields: [{ label: 'Comparative approach, kalkulasi sederhana', a: ['benefit measurement model', 'benefit measurement'] }, { label: 'Constrained optimization, perhitungan kompleks', a: ['mathematical model', 'model matematis'] }] },
  { type: 'essay', q: 'Sebutkan subsidiary plan dalam project management plan.',
    points: ['Scope management plan', 'Schedule management plan', 'Cost management plan', 'Quality management plan', 'Staffing/HR management plan', 'Communication management plan', 'Risk management plan', 'Procurement management plan', 'Komponen: milestone list, resource calendar, baseline jadwal/biaya/kualitas, risk register'] }
]);

BANK.isian('mp', 'scope', 'Scope & WBS', [
  { type: 'fill', q: 'Proses project scope management (urut, 6 proses).',
    fields: [{ label: '1', a: ['planning scope', 'plan scope management', 'perencanaan scope'] }, { label: '2', a: ['collecting requirements', 'collect requirements'] }, { label: '3', a: ['defining scope', 'define scope'] }, { label: '4', a: ['creating the wbs', 'create wbs', 'membuat wbs'] }, { label: '5', a: ['validating scope', 'validate scope', 'verifikasi scope'] }, { label: '6', a: ['controlling scope', 'control scope', 'pengendalian scope'] }] },
  { type: 'fill', q: 'Istilah WBS.',
    fields: [
      { label: 'Proses memecah deliverable menjadi bagian lebih kecil', a: ['dekomposisi', 'decomposition'] },
      { label: 'Task level terendah dalam WBS', a: ['work package'] },
      { label: 'Dokumen penjelas rinci tiap item WBS', a: ['kamus wbs', 'wbs dictionary'] },
      { label: 'Scope statement + WBS + kamus yang disetujui', a: ['baseline lingkup', 'scope baseline'] }] },
  { type: 'fill', q: 'Pendekatan pembuatan WBS.',
    fields: [
      { label: 'Mulai dari item terbesar lalu dipecah', a: ['top down', 'top-down'] },
      { label: 'Mulai dari pekerjaan spesifik lalu digabung', a: ['bottom up', 'bottom-up'] },
      { label: 'Memakai WBS proyek sejenis', a: ['analogi', 'analogy'] },
      { label: 'Menulis cabang non-linear lalu disusun', a: ['mind mapping', 'mind-mapping'] }] },
  { type: 'essay', q: 'Apa itu scope creep, beri contoh, dan bagaimana mencegahnya dengan input user?',
    points: ['Scope creep: lingkup bertambah terus tanpa kendali', 'Contoh: FoxMeyer Drug bangkrut karena proyek robotic warehouse', 'Seleksi proyek yang baik dan sponsor dari organisasi user', 'Tempatkan user di tim dengan peran penting', 'Rapat rutin dengan agenda, user menandatangani deliverable', 'Jangan menjanjikan yang tidak bisa disampaikan; tempatkan user dan developer berdekatan'] },
  { type: 'fill', q: 'Metode pengumpulan requirements (sebutkan tiga).',
    fields: [{ label: '1', a: ['interview', 'interviewing', 'wawancara', 'focus group', 'workshop', 'questionnaire', 'kuesioner', 'survey', 'observation', 'observasi', 'prototyping', 'benchmarking'] },
      { label: '2', a: ['interview', 'interviewing', 'wawancara', 'focus group', 'workshop', 'questionnaire', 'kuesioner', 'survey', 'observation', 'observasi', 'prototyping', 'benchmarking'] },
      { label: '3', a: ['interview', 'interviewing', 'wawancara', 'focus group', 'workshop', 'questionnaire', 'kuesioner', 'survey', 'observation', 'observasi', 'prototyping', 'benchmarking'] }],
    ex: 'Interviewing, focus groups/facilitated workshops, group creativity, questionnaires/surveys, observation, prototyping, benchmarking.' }
]);

BANK.isian('mp', 'time', 'Time Management', [
  { type: 'fill', q: 'Jenis dependency antar aktivitas.',
    fields: [
      { label: 'Melekat pada sifat pekerjaan (hard logic)', a: ['mandatory', 'ketergantungan utama', 'mandatory dependencies'] },
      { label: 'Ditentukan tim proyek (soft logic)', a: ['discretionary', 'discretionary dependencies'] },
      { label: 'Hubungan dengan aktivitas non-proyek', a: ['external', 'eksternal', 'external dependencies'] }] },
  { type: 'fill', q: 'Diagram jaringan.',
    fields: [
      { label: 'Aktivitas dilambangkan panah, hanya finish-to-start', a: ['adm', 'aoa', 'arrow diagramming method', 'activity on arrow'] },
      { label: 'Aktivitas dilambangkan kotak, mendukung berbagai dependency', a: ['pdm', 'precedence diagramming method', 'aon', 'activity on node'] },
      { label: 'Durasi milestone', a: 0, tol: 0 }],
    ex: 'Milestone mengikuti SMART: specific, measurable, assignable, realistic, time-framed.' },
  { type: 'fill', q: 'PERT: optimistic 8 hari, most likely 10 hari, pessimistic 24 hari. Hitung durasi estimasi.',
    fields: [{ label: 'PERT (hari)', a: 12, tol: 0.01 }],
    ex: '(8 + 4×10 + 24) / 6 = 72/6 = 12 hari.' },
  { type: 'fill', q: 'Hitung PERT t = (a + 4m + b)/6 untuk aktivitas berikut (a = optimistic, m = most likely, b = pessimistic).',
    table: { head: ['Aktivitas', 'a', 'm', 'b'], rows: [['E', 1, 4, 7], ['F', 1, 2, 9], ['G', 3, 4, 11]] },
    fields: [{ label: 'E', a: 4, tol: 0.01 }, { label: 'F', a: 3, tol: 0.01 }, { label: 'G', a: 5, tol: 0.01 }],
    ex: 'E = (1+16+7)/6 = 4. F = (1+8+9)/6 = 3. G = (3+16+11)/6 = 5.' },
  { type: 'fill', q: 'Jaringan: A(2) dan B(3) di awal. C(2) dan D(4) setelah A. E(4) setelah B dan C. F(3) setelah D. G(5) setelah E dan F. H(2) setelah G.',
    fields: [{ label: 'Durasi proyek', a: 16, tol: 0 }, { label: 'Jalur kritis', a: ['ADFGH'] }, { label: 'Slack aktivitas C', a: 1, tol: 0 }, { label: 'Jumlah jalur', a: 3, tol: 0 }],
    ex: 'Jalur: A-C-E-G-H = 15, A-D-F-G-H = 16, B-E-G-H = 14. Jalur terpanjang 16 = critical path. Latihan jaringan lain ada di lab CPM.' },
  { type: 'fill', q: 'Teknik memperpendek jadwal.',
    fields: [
      { label: 'Kompresi dengan biaya tambahan paling kecil (tambah resource)', a: ['crashing', 'crash'] },
      { label: 'Aktivitas dikerjakan paralel/overlap', a: ['fast tracking', 'fast track'] }] },
  { type: 'fill', q: 'Slack/float.',
    fields: [
      { label: 'Waktu tunda tanpa menunda aktivitas berikutnya', a: ['free slack', 'free float'] },
      { label: 'Waktu tunda tanpa menunda tanggal selesai proyek', a: ['total slack', 'total float'] },
      { label: 'Slack aktivitas di jalur kritis', a: 0, tol: 0 }] },
  { type: 'essay', q: 'Jelaskan critical chain scheduling.',
    points: ['Penjadwalan yang mempertimbangkan keterbatasan resource', 'Berdasar Theory of Constraints (Goldratt, The Goal)', 'Meminimalkan multitasking', 'Buffer dihapus dari tiap task', 'Project buffer ditambahkan sebelum due date proyek', 'Feeding buffer ditambahkan sebelum task di jalur kritis'] },
  { type: 'essay', q: 'Catatan penting tentang jalur kritis.',
    points: ['Jalur kritis = jalur terpanjang, slack paling kecil, menentukan waktu tercepat proyek selesai', 'Jika aktivitas kritis terlambat, seluruh proyek mundur', 'Jalur kritis bukan berarti semua aktivitasnya paling penting, hanya soal durasi', 'Bisa ada lebih dari satu jalur kritis', 'Jalur kritis bisa berubah selama proyek berjalan'] }
]);
