// Router and pages: home, course setup, labs, wrong-answer bank, statistics.
(function (root) {
  var h = UI.h, s = UI.s;
  var B = BANK.data;
  var ORDER = ['ks', 'ka', 'ca', 'fd', 'mp'];
  var main = document.getElementById('main');
  var active = null; // running quiz controller
  var prefs = { count: 25, mode: 'practice', topics: {}, isianCount: 0 };

  function itemsOf(course) {
    return B.mcq.concat(B.isian).filter(function (it) { return it.course === course; });
  }
  function topicsOf(course) {
    var seen = [];
    itemsOf(course).forEach(function (it) { if (seen.indexOf(it.topic) < 0) seen.push(it.topic); });
    return seen;
  }
  var index = null;
  function byId(id) {
    if (!index) {
      index = {};
      B.mcq.concat(B.isian).forEach(function (it) { index[it.id] = it; });
    }
    return index[id];
  }

  function stop() { if (active) { active.destroy(); active = null; } }

  // Navigating away detaches the running quiz instead of destroying it,
  // so returning to the page it was started from resumes the session.
  function mount() {
    main.textContent = '';
    var wrap = h('div', { class: 'wrap' });
    main.appendChild(wrap);
    window.scrollTo(0, 0);
    return wrap;
  }

  function resume() {
    main.textContent = '';
    main.appendChild(active.el);
    window.scrollTo(0, 0);
  }

  // ---------------------------------------------------------------- nav
  function renderNav() {
    var nav = document.getElementById('nav');
    var hash = location.hash.replace(/^#\/?/, '') || 'home';
    nav.textContent = '';
    function link(href, label, count) {
      var on = hash === href || hash.indexOf(href + '/') === 0;
      return h('a', { href: '#/' + href, class: on ? 'active' : null, 'aria-current': on ? 'page' : null },
        h('span', null, label), count ? h('span', { class: 'count' }, String(count)) : null);
    }
    nav.appendChild(link('home', 'Beranda'));
    nav.appendChild(link('jadwal', 'Jadwal UTS', examsLeft() || null));
    nav.appendChild(h('div', { class: 'nav-label' }, 'Mata kuliah'));
    ORDER.forEach(function (id) { nav.appendChild(link('c/' + id, B.courses[id].name)); });
    nav.appendChild(h('div', { class: 'nav-label' }, 'Progres'));
    nav.appendChild(link('bank', 'Bank soal salah', Store.bankIds().filter(byId).length));
    nav.appendChild(link('stats', 'Statistik'));
  }

  // ---------------------------------------------------------------- home
  function mastery(course) {
    var items = itemsOf(course), right = 0;
    items.forEach(function (it) { var r = Store.item(it.id); if (r && r.right) right++; });
    return { right: right, total: items.length };
  }

  function home() {
    var wrap = mount();
    var bank = Store.bankIds().filter(byId).length;
    wrap.appendChild(h('div', { class: 'head' },
      h('span', { class: 'eyebrow' }, 'UTS ganjil · Oktober 2026'),
      h('h1', null, 'Latihan dulu, baca ', h('span', { class: 'mark' }, 'belakangan'), '.'),
      h('p', { class: 'lead' }, 'Kerjakan soal, lihat pembahasan, lalu ulangi yang salah sampai benar dua kali berturut-turut. Semua progres tersimpan di browser ini.')));

    var sched = schedulePreview();
    if (sched) wrap.appendChild(sched);

    if (bank) {
      wrap.appendChild(h('div', { class: 'sheet flat row between' },
        h('div', null, h('h3', null, bank + ' soal di bank salah'), h('p', { class: 'small muted' }, 'Soal keluar dari bank setelah dijawab benar dua kali berturut-turut.')),
        h('a', { class: 'btn hl', href: '#/bank' }, 'Ulangi sekarang')));
    }

    var list = h('div', { class: 'courses' });
    ORDER.forEach(function (id) {
      var c = B.courses[id], m = mastery(id), hist = Store.history(id).filter(function (x) { return x.mode !== 'lab'; });
      var last = hist[hist.length - 1];
      list.appendChild(h('a', { class: 'course', href: '#/c/' + id },
        h('span', { class: 'course-code' }, c.code),
        h('div', { style: 'min-width:0' },
          h('h3', null, c.name),
          h('p', { class: 'meta' }, c.blurb),
          h('div', { class: 'bar' }, h('i', { style: 'width:' + (m.total ? m.right / m.total * 100 : 0) + '%' })),
          h('p', { class: 'meta num' }, m.right + ' dari ' + m.total + ' soal pernah dijawab benar')),
        h('div', { class: 'side' }, h('strong', null, last ? Math.round(last.score * 100) : '–'), last ? 'skor terakhir' : 'belum dicoba')));
    });
    wrap.appendChild(list);

    wrap.appendChild(h('section', { class: 'stack' },
      h('h2', null, 'Cara belajar yang efektif'),
      h('div', { class: 'tips' },
        tip('Uji diri sebelum membaca', 'Retrieval practice: mengingat jawaban lebih menempel daripada membaca ulang slide. Mulai dari mode latihan.'),
        tip('Ulangi yang salah, berjarak', 'Bank soal salah menyimpan soal yang meleset. Ulangi besok, bukan langsung lima kali hari ini.'),
        tip('Campur topik', 'Pilih semua topik sekaligus (interleaving). Otak terlatih memilih konsep yang tepat, seperti saat ujian.'),
        tip('Simulasi ujian', 'H-1 pakai mode ujian dengan timer. Tidak ada kunci sampai selesai, persis kondisi UTS.'))));
  }

  function tip(t, p) { return h('div', { class: 'tip' }, h('h3', null, t), h('p', null, p)); }

  // ---------------------------------------------------------------- jadwal
  function examDate(dateStr) {
    var p = dateStr.split('-');
    return new Date(+p[0], +p[1] - 1, +p[2]);
  }
  function daysLeft(dateStr) {
    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return Math.round((examDate(dateStr) - today) / 864e5);
  }
  function examsLeft() {
    return SCHEDULE.exams.filter(function (ex) { return daysLeft(ex.date) >= 0; }).length;
  }
  function nextExamIndex() {
    for (var i = 0; i < SCHEDULE.exams.length; i++) { if (daysLeft(SCHEDULE.exams[i].date) >= 0) return i; }
    return -1;
  }
  function examChip(ex) {
    var d = daysLeft(ex.date);
    if (d < 0) return h('span', { class: 'chip ok' }, 'Selesai');
    if (d === 0) return h('span', { class: 'chip hl' }, 'Hari ini');
    return h('span', { class: 'chip' }, 'H-' + d);
  }
  function longDate(ex) {
    return ex.day + ', ' + examDate(ex.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  }
  function shortDate(ex) {
    return ex.day.slice(0, 3) + ' ' + examDate(ex.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
  }

  function examCard(ex, isNext) {
    var d = examDate(ex.date);
    return h('section', { class: 'sheet exam' + (isNext ? ' next' : '') },
      h('div', { class: 'exam-date' },
        h('span', { class: 'exam-dow' }, ex.day),
        h('strong', { class: 'num' }, String(d.getDate())),
        h('span', { class: 'exam-mon' }, d.toLocaleDateString('id-ID', { month: 'short' }))),
      h('div', { class: 'exam-body stack' },
        h('div', { class: 'row between' },
          h('h2', null, ex.name, ' ', isNext ? h('span', { class: 'chip hl' }, 'Berikutnya') : null),
          examChip(ex)),
        h('p', { class: 'small muted' }, ex.kode + ' · ' + ex.kelas + ' · ' + ex.range),
        h('div', { class: 'row' },
          h('p', { class: 'exam-when' }, h('strong', { class: 'mono' }, ex.time), ' · ', longDate(ex)),
          h('span', { class: 'chip' }, ex.jenis)),
        h('p', { class: 'exam-where' }, h('strong', { class: 'mono' }, ex.room), ' ', h('span', { class: 'muted small' }, SCHEDULE.gedung)),
        ex.note ? h('p', { class: 'explain small' }, ex.note) : null,
        h('a', { class: 'btn ghost sm', href: '#/c/' + ex.course }, 'Latihan ' + (B.courses[ex.course] ? B.courses[ex.course].code : ex.name))));
  }

  function jadwal() {
    var wrap = mount();
    var next = nextExamIndex();
    wrap.appendChild(h('div', { class: 'head' },
      h('span', { class: 'eyebrow' }, SCHEDULE.term + ' · ' + SCHEDULE.kelas),
      h('h1', null, 'Jadwal UTS'),
      h('p', { class: 'lead' }, 'Semua ujian onsite tertulis dengan dua pengawas per ruangan. Ruangan di bawah mengikuti nomor absen awal, jadi kamu ada di ruangan pertama tiap kelas.')));
    var list = h('div', { class: 'stack' });
    SCHEDULE.exams.forEach(function (ex, i) { list.appendChild(examCard(ex, i === next)); });
    wrap.appendChild(list);
    wrap.appendChild(h('p', { class: 'small muted' }, 'Nomor absen di paruh kedua kelas masuk ke ruangan cadangan yang tertulis di catatan tiap kartu. Sumber: jadwal resmi FIF 2627-1.'));
  }

  function schedulePreview() {
    var next = nextExamIndex();
    if (next < 0) return null;
    var ex = SCHEDULE.exams[next];
    var d = daysLeft(ex.date);
    return h('section', { class: 'sheet flat schedule-preview' },
      h('div', { class: 'row between' },
        h('div', { class: 'stack', style: 'gap:4px' },
          h('span', { class: 'eyebrow' }, 'Jadwal UTS · 2-7 November 2026'),
          h('h2', null, 'Berikutnya: ', h('span', { class: 'mark' }, ex.name)),
          h('p', { class: 'small muted' }, longDate(ex) + ' · ' + ex.time + ' · ' + ex.room + ' · ' + ex.jenis)),
        h('span', { class: 'count-days num' }, d === 0 ? 'Hari ini' : 'H-' + d)),
      h('div', { class: 'mini-exams' },
        SCHEDULE.exams.map(function (e) {
          return h('a', { class: 'mini-exam' + (daysLeft(e.date) < 0 ? ' past' : ''), href: '#/jadwal' },
            h('span', { class: 'mini-date num' }, shortDate(e)),
            h('span', { class: 'mini-name' }, e.name),
            h('span', { class: 'mini-time mono muted' }, e.time),
            examChip(e));
        })));
  }

  // ---------------------------------------------------------------- course
  function course(id, tab) {
    var c = B.courses[id];
    if (!c) return home();
    var wrap = mount();
    var items = itemsOf(id), topics = topicsOf(id);
    // Essays stay opt-in on multiple choice courses so a random 25 stays pure multiple choice.
    if (!prefs.topics[id]) {
      prefs.topics[id] = {};
      topics.forEach(function (t) {
        prefs.topics[id][t] = c.kind !== 'mcq' || items.some(function (it) { return it.topic === t && it.type === 'mcq'; });
      });
    }
    var chosen = prefs.topics[id];
    var labs = c.labs || [];

    wrap.appendChild(h('div', { class: 'head' },
      h('span', { class: 'eyebrow' }, c.kind === 'mcq' ? 'Pilihan ganda · ' + items.filter(function (it) { return it.type === 'mcq'; }).length + ' soal' + (items.some(function (it) { return it.type === 'essay'; }) ? ' + esai' : '') :'Isian & esai · ' + items.length + ' soal' + (labs.length ? ' · ' + labs.length + ' lab' : '')),
      h('h1', null, c.name),
      h('p', { class: 'lead' }, c.about)));

    if (labs.length) {
      var tabs = h('div', { class: 'tabs', role: 'tablist' });
      [['latihan', 'Latihan soal']].concat(labs.map(function (l) { return [l, Labs[l].name]; })).forEach(function (t) {
        tabs.appendChild(h('button', { role: 'tab', type: 'button', 'aria-selected': String((tab || 'latihan') === t[0]), onclick: function () { location.hash = '#/c/' + id + (t[0] === 'latihan' ? '' : '/' + t[0]); } }, t[1]));
      });
      wrap.appendChild(tabs);
      if (tab && Labs[tab]) {
        var labBox = h('section', { class: 'sheet' });
        wrap.appendChild(labBox);
        Labs[tab].run(labBox);
        return;
      }
    }

    var setup = h('section', { class: 'sheet stack' });
    var countLabel = h('span', { class: 'small muted' });
    var startBtn;

    function pool() { return items.filter(function (it) { return chosen[it.topic]; }); }
    function want() {
      var p = pool().length;
      if (c.kind === 'mcq') return Math.min(prefs.count, p);
      return prefs.isianCount ? Math.min(prefs.isianCount, p) : p;
    }
    function refresh() {
      var p = pool().length, n = want();
      var mins = p ? Math.round(n * limitFor(id, pool()) / p / 60) : 0;
      countLabel.textContent = n + ' soal dari ' + p + ' tersedia' + (prefs.mode === 'exam' ? ' · waktu ' + mins + ' menit' : '');
      if (startBtn) startBtn.disabled = n === 0;
    }

    if (c.kind === 'mcq') {
      setup.appendChild(h('div', { class: 'stack' }, h('span', { class: 'field-label' }, 'Jumlah soal'),
        UI.seg([25, 50, 75, 100], prefs.count, function (v) { prefs.count = v; refresh(); })));
    } else {
      setup.appendChild(h('div', { class: 'stack' }, h('span', { class: 'field-label' }, 'Jumlah soal'),
        UI.seg([10, 20, 0], prefs.isianCount, function (v) { prefs.isianCount = v; refresh(); }, ['10', '20', 'Semua'])));
    }
    setup.appendChild(h('div', { class: 'stack' }, h('span', { class: 'field-label' }, 'Mode'),
      UI.seg(['practice', 'exam'], prefs.mode, function (v) { prefs.mode = v; refresh(); }, ['Latihan (kunci langsung)', 'Ujian (timer, kunci di akhir)'])));

    var checks = h('div', { class: 'checks' });
    topics.forEach(function (t) {
      var count = items.filter(function (it) { return it.topic === t; }).length;
      checks.appendChild(h('label', { class: 'check' },
        h('input', { type: 'checkbox', checked: chosen[t], onchange: function () { chosen[t] = this.checked; refresh(); } }),
        t, h('span', { class: 'muted num' }, ' ' + count)));
    });
    setup.appendChild(h('div', { class: 'stack' },
      h('div', { class: 'row between' }, h('span', { class: 'field-label' }, 'Topik'),
        h('span', { class: 'row' },
          h('button', { class: 'btn ghost sm', type: 'button', onclick: function () { topics.forEach(function (t) { chosen[t] = true; }); course(id); } }, 'Semua'),
          h('button', { class: 'btn ghost sm', type: 'button', onclick: function () { topics.forEach(function (t) { chosen[t] = false; }); course(id); } }, 'Kosongkan'))),
      checks));

    var bankN = Store.bankIds(id).filter(byId).length;
    startBtn = h('button', { class: 'btn hl', type: 'button', onclick: function () {
      var n = want();
      var picked = UI.shuffle(pool()).slice(0, n);
      run(id, picked, prefs.mode, 'normal');
    } }, 'Mulai');
    setup.appendChild(h('div', { class: 'row' }, startBtn,
      bankN ? h('button', { class: 'btn ghost', type: 'button', onclick: function () { runBank(id); } }, 'Ulangi ' + bankN + ' soal salah') : null,
      countLabel));
    wrap.appendChild(setup);
    refresh();

    if (c.notes) {
      wrap.appendChild(h('section', { class: 'stack' },
        h('h2', null, 'Fokus dari dosen'),
        h('div', { class: 'sheet flat stack' }, h('ul', { class: 'stack', style: 'margin:0; padding-left:18px' }, c.notes.map(function (n) { return h('li', null, n); })))));
    }
  }

  function limitFor(courseId, items) {
    var c = B.courses[courseId];
    return items.reduce(function (sum, it) {
      if (c.kind !== 'mcq') return sum + (c.secsPerItem || 180);
      return sum + (it.type === 'essay' ? 900 : 72);
    }, 0);
  }

  function run(courseId, items, mode, kind) {
    stop(); // abandon any detached session before starting a new one
    var wrap = mount();
    var c = B.courses[courseId];
    active = Quiz.start(wrap, {
      course: courseId, items: items, mode: mode, kind: kind,
      limit: limitFor(courseId, items),
      title: c.name + (kind === 'bank' ? ' · bank salah' : ''),
      onDone: function (action, payload) {
        active = null;
        renderNav();
        if (action === 'retry') return run(courseId, payload, 'practice', 'retry');
        if (action === 'again') return kind === 'bank' ? runBank(courseId) : course(courseId);
        var target = kind === 'bank' ? '#/bank' : '#/c/' + courseId;
        if (location.hash === target) route();
        else location.hash = target; // hashchange renders it
      }
    });
    active.el = wrap;
    active.hash = location.hash;
  }

  function runBank(courseId) {
    var items = Store.bankIds(courseId).map(byId).filter(Boolean);
    if (!items.length) { location.hash = '#/bank'; return route(); }
    run(courseId, UI.shuffle(items), 'practice', 'bank');
  }

  // ---------------------------------------------------------------- bank
  function bank() {
    var wrap = mount();
    wrap.appendChild(h('div', { class: 'head' },
      h('span', { class: 'eyebrow' }, 'Spaced repetition sederhana'),
      h('h1', null, 'Bank soal salah'),
      h('p', { class: 'lead' }, 'Soal masuk ke sini saat dijawab salah dan keluar setelah dijawab benar dua kali berturut-turut.')));
    var any = false;
    ORDER.forEach(function (id) {
      var items = Store.bankIds(id).map(byId).filter(Boolean);
      if (!items.length) return;
      any = true;
      wrap.appendChild(h('section', { class: 'sheet stack' },
        h('div', { class: 'row between' },
          h('h2', null, B.courses[id].name, ' ', h('span', { class: 'chip bad' }, items.length + ' soal')),
          h('button', { class: 'btn hl', type: 'button', onclick: function () { runBank(id); } }, 'Latih ulang')),
        h('ul', { class: 'small stack', style: 'margin:0; padding-left:18px' }, items.slice(0, 8).map(function (it) {
          var r = Store.item(it.id);
          return h('li', null, it.q.length > 140 ? it.q.slice(0, 140) + '…' : it.q, ' ', h('span', { class: 'muted' }, '(' + it.topic + ', benar beruntun ' + (r ? r.streak : 0) + '/2)'));
        })),
        items.length > 8 ? h('p', { class: 'small muted' }, 'dan ' + (items.length - 8) + ' soal lain.') : null));
    });
    if (!any) wrap.appendChild(h('div', { class: 'empty' }, 'Bank masih kosong. Soal yang kamu jawab salah akan muncul di sini.'));
  }

  // ---------------------------------------------------------------- stats
  function spark(points) {
    var W = 600, H = 120, pad = 24;
    var X = function (i) { return pad + (points.length === 1 ? (W - 2 * pad) / 2 : i / (points.length - 1) * (W - 2 * pad)); };
    var Y = function (v) { return H - pad - v * (H - 2 * pad); };
    var svg = s('svg', { class: 'spark', viewBox: '0 0 ' + W + ' ' + H, role: 'img', 'aria-label': 'Grafik skor' });
    [0, 0.5, 1].forEach(function (g) {
      svg.appendChild(s('line', { class: 'gl', x1: pad, x2: W - pad, y1: Y(g), y2: Y(g) }));
      svg.appendChild(s('text', { x: 0, y: Y(g) + 3 }, String(g * 100)));
    });
    var d = points.map(function (v, i) { return (i ? 'L' : 'M') + X(i) + ' ' + Y(v); }).join(' ');
    svg.appendChild(s('path', { class: 'area', d: d + ' L' + X(points.length - 1) + ' ' + Y(0) + ' L' + X(0) + ' ' + Y(0) + ' Z' }));
    svg.appendChild(s('path', { class: 'ln', d: d }));
    svg.appendChild(s('circle', { class: 'dot', cx: X(points.length - 1), cy: Y(points[points.length - 1]), r: 4 }));
    return svg;
  }

  function stats() {
    var wrap = mount();
    wrap.appendChild(h('div', { class: 'head' },
      h('span', { class: 'eyebrow' }, 'Tersimpan di browser ini'),
      h('h1', null, 'Statistik progres')));
    var all = Store.history();
    if (!all.length) {
      wrap.appendChild(h('div', { class: 'empty' }, 'Belum ada sesi. Selesaikan satu sesi latihan untuk melihat grafik skor.'));
    }
    ORDER.forEach(function (id) {
      var hist = Store.history(id), quiz = hist.filter(function (x) { return x.mode !== 'lab'; }), labs = hist.filter(function (x) { return x.mode === 'lab'; });
      if (!hist.length) return;
      var sec = h('section', { class: 'sheet stack' });
      var recent = quiz.slice(-5);
      var avg = recent.length ? recent.reduce(function (a, x) { return a + x.score; }, 0) / recent.length : 0;
      sec.appendChild(h('div', { class: 'row between' },
        h('h2', null, B.courses[id].name),
        h('span', { class: 'small muted num' }, quiz.length + ' sesi' + (labs.length ? ' · ' + labs.length + ' percobaan lab' : '') + (recent.length ? ' · rata-rata 5 terakhir ' + UI.pct(avg) : ''))));
      if (quiz.length) sec.appendChild(spark(quiz.slice(-30).map(function (x) { return x.score; })));

      var per = {};
      itemsOf(id).forEach(function (it) {
        var r = Store.item(it.id);
        if (!r) return;
        var t = per[it.topic] || (per[it.topic] = [0, 0]);
        t[0] += r.right; t[1] += r.seen;
      });
      var names = Object.keys(per);
      if (names.length) {
        sec.appendChild(h('div', { class: 'stack' }, h('span', { class: 'field-label' }, 'Akurasi per topik (semua percobaan)'),
          names.map(function (t) {
            var v = per[t][0] / per[t][1];
            return h('div', { class: 'topic-row' },
              h('div', null, h('div', { class: 'small' }, t), h('div', { class: 'bar' + (v < 0.6 ? ' hl' : '') }, h('i', { style: 'width:' + v * 100 + '%' }))),
              h('span', { class: 'num small' }, UI.pct(v)));
          })));
      }
      if (quiz.length) {
        sec.appendChild(h('div', { class: 'table-wrap' }, h('table', { class: 'grid' },
          h('thead', null, h('tr', null, ['Waktu', 'Mode', 'Soal', 'Skor', 'Durasi'].map(function (x) { return h('th', null, x); }))),
          h('tbody', null, quiz.slice(-6).reverse().map(function (x) {
            return h('tr', null, h('td', null, UI.date(x.at)), h('td', null, x.kind === 'bank' ? 'bank salah' : x.mode === 'exam' ? 'ujian' : 'latihan'),
              h('td', null, String(x.n)), h('td', null, UI.pct(x.score)), h('td', null, UI.clock(x.secs || 0)));
          })))));
      }
      wrap.appendChild(sec);
    });

    var zone = h('div', { class: 'row' });
    function askReset() {
      zone.textContent = '';
      zone.appendChild(h('div', { class: 'confirm' },
        h('span', null, 'Hapus semua riwayat, statistik, dan bank soal salah? Tidak bisa dibatalkan.'),
        h('button', { class: 'btn sm', type: 'button', onclick: function () { Store.reset(); renderNav(); stats(); } }, 'Ya, hapus'),
        h('button', { class: 'btn ghost sm', type: 'button', onclick: function () { zone.textContent = ''; zone.appendChild(resetBtn); } }, 'Batal')));
    }
    var resetBtn = h('button', { class: 'btn ghost sm', type: 'button', onclick: askReset }, 'Reset semua progres');
    zone.appendChild(resetBtn);
    wrap.appendChild(zone);
  }

  // ---------------------------------------------------------------- routing
  function route() {
    var parts = location.hash.replace(/^#\/?/, '').split('/');
    renderNav();
    if (active && active.hash === location.hash) return resume();
    if (parts[0] === 'c' && parts[1]) return course(parts[1], parts[2]);
    if (parts[0] === 'jadwal') return jadwal();
    if (parts[0] === 'bank') return bank();
    if (parts[0] === 'stats') return stats();
    return home();
  }

  function initTheme() {
    var btn = document.getElementById('theme');
    var saved = null;
    try { saved = localStorage.getItem('uts-theme'); } catch (e) { /* ignore */ }
    if (saved) document.documentElement.setAttribute('data-theme', saved);
    function label() {
      var dark = document.documentElement.getAttribute('data-theme') === 'dark' ||
        (!document.documentElement.getAttribute('data-theme') && matchMedia('(prefers-color-scheme: dark)').matches);
      btn.textContent = dark ? 'Tema terang' : 'Tema gelap';
      return dark;
    }
    btn.addEventListener('click', function () {
      var next = label() ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('uts-theme', next); } catch (e) { /* ignore */ }
      label();
    });
    label();
    matchMedia('(prefers-color-scheme: dark)').addEventListener('change', label);
  }

  window.addEventListener('hashchange', route);
  window.addEventListener('study-progress', renderNav);
  initTheme();
  route();
})(this);
