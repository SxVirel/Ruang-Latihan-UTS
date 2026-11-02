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
  { type: 'fill', q: 'Portfolio, program, atau project? Isi istilah yang tepat.',
    fields: [
      { label: 'Tujuan terdefinisi, cakupan dielaborasi progresif', a: ['project', 'proyek'] },
      { label: 'Kelompok proyek terkait yang dikoordinasi untuk manfaat lebih besar', a: 'program' },
      { label: 'Kumpulan proyek dan program untuk tujuan strategis organisasi', a: ['portfolio', 'portofolio'] },
      { label: 'Suksesnya diukur dari performa investasi dan realisasi keuntungan', a: ['portfolio', 'portofolio'] }],
    ex: 'Diubah dari esai menjadi isian. Project → program → portfolio makin luas cakupannya.' },
  { type: 'fill', q: 'Karakteristik proyek: sementara, menghasilkan sesuatu yang ..., sumber daya ..., dan penuh .... Proyek IT berbeda karena scope-nya mudah ....',
    fields: [
      { label: 'Hasil', a: ['unik', 'unique'] }, { label: 'Sumber daya', a: ['terbatas', 'limited'] },
      { label: 'Penuh', a: ['ketidakpastian', 'uncertainty'] }, { label: 'Scope IT mudah', a: ['berubah', 'change', 'berubah ubah'] }],
    ex: 'Diubah dari esai. Proyek IT: terhubung sistem bisnis, scope mudah berubah, stakeholder dan risiko sulit diidentifikasi, estimasi lemah.' }
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
  { type: 'fill', q: 'Tuliskan tahap yang menghasilkan output berikut: inisiasi, perencanaan, eksekusi, pengontrolan, atau penutupan.',
    fields: [
      { label: 'Project charter dan business case', a: ['inisiasi', 'initiating'] },
      { label: 'Scope statement, WBS, Gantt chart', a: ['perencanaan', 'planning'] },
      { label: 'Status dan progress report', a: ['pengontrolan', 'controlling', 'monitoring and controlling', 'pengawasan'] },
      { label: 'Arsip proyek dan lesson learned', a: ['penutupan', 'closing'] }],
    ex: 'Diubah dari esai. Eksekusi merealisasikan rencana dengan mengoordinasi tim dan sumber daya.' },
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
  { type: 'fill', q: 'PMO disebut "manajer dari manajer ...". Letaknya di antara project manager dan .... Budaya organisasi adalah asumsi, nilai, dan ... bersama.',
    fields: [{ label: 'Manajer dari manajer', a: ['proyek', 'project'] }, { label: 'Di antara PM dan', a: ['chief executive', 'ceo', 'eksekutif'] }, { label: 'Asumsi, nilai, dan', a: ['perilaku', 'tingkah laku', 'behavior', 'behaviors'] }],
    ex: 'Diubah dari esai. Budaya yang mendukung: member identity, group emphasis, unit integration, risk tolerance, reward criteria, conflict tolerance, open-systems focus.' }
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
  { type: 'fill', q: 'Isi project charter: justifikasi proyek (misalnya pengembalian investasi atau ...), manajer proyek dan tingkat ..., ringkasan ..., dan dokumen ini ditandatangani ....',
    fields: [{ label: 'Pengembalian investasi', a: ['roi', 'return on investment'] }, { label: 'Tingkat', a: ['wewenang', 'kewenangan', 'authority'] }, { label: 'Ringkasan', a: ['anggaran', 'budget', 'jadwal', 'milestone'] }, { label: 'Ditandatangani', a: ['stakeholder', 'pemangku kepentingan', 'sponsor'] }],
    ex: 'Diubah dari esai. Isi lain: requirements, deskripsi proyek, stakeholder, asumsi dan kendala.' },
  { type: 'fill', q: 'Metode seleksi proyek (tools project charter).',
    fields: [{ label: 'Comparative approach, kalkulasi sederhana', a: ['benefit measurement model', 'benefit measurement'] }, { label: 'Constrained optimization, perhitungan kompleks', a: ['mathematical model', 'model matematis'] }] },
  { type: 'fill', q: 'Sebutkan empat subsidiary plan dalam project management plan, cukup kata kuncinya (misalnya scope). Jangan mengulang yang sama.',
    fields: [{ label: 'Plan 1', a: ['scope', 'schedule', 'cost', 'quality', 'process improvement', 'staffing', 'communication', 'risk', 'procurement', 'ruang lingkup', 'jadwal', 'biaya', 'kualitas', 'sdm', 'komunikasi', 'risiko', 'pengadaan'] }, { label: 'Plan 2', a: ['scope', 'schedule', 'cost', 'quality', 'process improvement', 'staffing', 'communication', 'risk', 'procurement', 'ruang lingkup', 'jadwal', 'biaya', 'kualitas', 'sdm', 'komunikasi', 'risiko', 'pengadaan'] }, { label: 'Plan 3', a: ['scope', 'schedule', 'cost', 'quality', 'process improvement', 'staffing', 'communication', 'risk', 'procurement', 'ruang lingkup', 'jadwal', 'biaya', 'kualitas', 'sdm', 'komunikasi', 'risiko', 'pengadaan'] }, { label: 'Plan 4', a: ['scope', 'schedule', 'cost', 'quality', 'process improvement', 'staffing', 'communication', 'risk', 'procurement', 'ruang lingkup', 'jadwal', 'biaya', 'kualitas', 'sdm', 'komunikasi', 'risiko', 'pengadaan'] }],
    ex: 'Diubah dari esai. Daftar lengkap: scope, schedule, cost, quality, process improvement, staffing, communication, risk, procurement.' }
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
  { type: 'fill', q: 'Lingkup proyek yang terus bertambah tanpa kendali disebut .... Contoh perusahaan yang bangkrut karenanya: ... Drug. Salah satu cara mencegahnya: user ... deliverable pokok.',
    fields: [{ label: 'Istilah', a: ['scope creep'] }, { label: 'Perusahaan', a: ['foxmeyer', 'fox meyer'] }, { label: 'User', a: ['menandatangani', 'tanda tangan', 'sign off', 'signoff'] }],
    ex: 'Diubah dari esai. Cara lain: user di tim proyek, rapat rutin, jangan janji berlebihan, user dan developer berdekatan.' },
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
  { type: 'fill', q: 'Critical chain scheduling berdasar Theory of ... (Goldratt). Metode ini meminimalkan .... Buffer sebelum due date proyek disebut ... buffer, dan sebelum task di jalur kritis disebut ... buffer.',
    fields: [{ label: 'Theory of', a: ['constraints', 'constraint'] }, { label: 'Meminimalkan', a: ['multitasking', 'multi tasking'] }, { label: 'Sebelum due date', a: 'project' }, { label: 'Sebelum task kritis', a: 'feeding' }],
    ex: 'Diubah dari esai. Critical chain mempertimbangkan keterbatasan resource dan menghapus buffer dari tiap task.' },
  { type: 'fill', q: 'Jalur kritis: jalur paling ... dengan slack paling .... Jika aktivitas kritis terlambat, seluruh proyek .... Jalur kritis bisa lebih dari ... dan bisa berubah.',
    fields: [{ label: 'Jalur paling', a: ['panjang', 'lama', 'longest'] }, { label: 'Slack paling', a: ['kecil', 'sedikit', 'nol', '0'] }, { label: 'Proyek', a: ['mundur', 'terlambat', 'tertunda'] }, { label: 'Lebih dari', a: ['satu', '1'] }],
    ex: 'Diubah dari esai. Jalur kritis soal durasi, bukan soal aktivitas yang paling penting.' }
]);
