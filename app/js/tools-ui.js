// Interactive labs: logical clocks, Chord finger tables, sequential consistency, CPM.
(function (root) {
  var h = UI.h, s = UI.s;
  var T = root.Tools;

  function nums(str) { return (String(str).match(/-?\d+/g) || []).map(Number); }
  function same(a, b) { return a.length === b.length && a.every(function (x, i) { return x === b[i]; }); }

  function record(course, kind, right, total) {
    Store.recordSession({ course: course, mode: 'lab', kind: kind, n: total, right: right, score: total ? right / total : 0, topics: {} });
  }

  function verdict(right, total) {
    var all = right === total;
    return h('span', { class: 'chip ' + (all ? 'ok' : 'bad') }, right + '/' + total + ' benar');
  }

  function arrowDefs(id) {
    return s('defs', null, s('marker', { id: id, viewBox: '0 0 10 10', refX: '9', refY: '5', markerWidth: '7', markerHeight: '7', orient: 'auto-start-reverse' },
      s('path', { d: 'M0,0 L10,5 L0,10 z', style: 'fill: var(--indigo)' })));
  }

  // ---------------------------------------------------------------- clocks
  function clocksLab(box) {
    var state = { d: T.clocks.EXAM, shown: false, marks: null };
    var inputs = {};

    function diagram(d) {
      var W = 760, top = 46, gap = 104, H = top + (d.procs - 1) * gap + 56;
      var ts = d.events.map(function (e) { return e.t; });
      var t0 = Math.min.apply(null, ts), t1 = Math.max.apply(null, ts);
      var X = function (t) { return 110 + (t - t0) / ((t1 - t0) || 1) * (W - 190); };
      var Y = function (p) { return top + p * gap; };
      var pos = {};
      d.events.forEach(function (e) { pos[e.id] = { x: X(e.t), y: Y(e.p), p: e.p }; });
      var svg = s('svg', { viewBox: '0 0 ' + W + ' ' + H, role: 'img', 'aria-label': 'Diagram proses dan pesan' }, arrowDefs('clk-arrow'));
      for (var p = 0; p < d.procs; p++) {
        svg.appendChild(s('line', { class: 'svg-line', x1: 70, y1: Y(p), x2: W - 30, y2: Y(p), 'marker-end': 'url(#clk-arrow)' }));
        svg.appendChild(s('text', { class: 'svg-text', x: 24, y: Y(p) + 6 }, 'P' + (p + 1)));
      }
      d.msgs.forEach(function (m) {
        var a = pos[m.from], b = pos[m.to];
        var dx = b.x - a.x, dy = b.y - a.y, len = Math.sqrt(dx * dx + dy * dy);
        svg.appendChild(s('line', { class: 'svg-msg', x1: a.x, y1: a.y, x2: b.x - dx / len * 10, y2: b.y - dy / len * 10, 'marker-end': 'url(#clk-arrow)' }));
      });
      d.events.forEach(function (e) {
        var q = pos[e.id], below = e.p === d.procs - 1;
        svg.appendChild(s('circle', { class: 'svg-dot', cx: q.x, cy: q.y, r: 7 }));
        svg.appendChild(s('text', { class: 'svg-text', x: q.x - 5, y: below ? q.y + 28 : q.y - 14 }, e.id));
      });
      return h('div', { class: 'diagram' }, svg);
    }

    function render() {
      box.textContent = '';
      var d = state.d, L = T.clocks.lamport(d), V = T.clocks.vector(d);
      var rows = d.events.slice().sort(function (a, b) { return a.p - b.p || a.t - b.t; });
      inputs = {};
      var tbody = h('tbody');
      rows.forEach(function (e) {
        var mk = state.marks && state.marks[e.id];
        var li = h('input', { class: 'input' + (mk ? (mk.l ? ' ok' : ' bad') : ''), id: 'clk-l-' + e.id, inputmode: 'numeric', autocomplete: 'off', value: state.shown ? String(L[e.id]) : '' });
        var vi = h('input', { class: 'input' + (mk ? (mk.v ? ' ok' : ' bad') : ''), id: 'clk-v-' + e.id, autocomplete: 'off', placeholder: d.procs === 3 ? '0,0,0' : '0,0,0,0', value: state.shown ? V[e.id].join(',') : '' });
        inputs[e.id] = { l: li, v: vi };
        tbody.appendChild(h('tr', null, h('td', { class: 'mono' }, e.id), h('td', null, 'P' + (e.p + 1)), h('td', null, li), h('td', null, vi)));
      });
      box.appendChild(h('div', { class: 'stack' },
        h('p', { class: 'lead' }, 'Isi timestamp Lamport dan vector clock untuk setiap event. Waktu mengalir dari kiri ke kanan, panah adalah pesan dari pengirim ke penerima.'),
        diagram(d),
        h('div', { class: 'table-wrap' }, h('table', { class: 'grid' },
          h('thead', null, h('tr', null, h('th', null, 'Event'), h('th', null, 'Proses'), h('th', null, 'Lamport'), h('th', null, 'Vector (P1,P2,...)'))),
          tbody)),
        h('div', { class: 'row' },
          h('button', { class: 'btn', type: 'button', onclick: check }, 'Periksa'),
          h('button', { class: 'btn ghost', type: 'button', onclick: function () { state.shown = true; state.marks = null; render(); } }, 'Tunjukkan jawaban'),
          h('button', { class: 'btn ghost', type: 'button', onclick: function () { state = { d: T.clocks.EXAM, shown: false, marks: null }; render(); } }, 'Soal dari dosen'),
          h('button', { class: 'btn hl', type: 'button', onclick: function () { state = { d: T.clocks.randomDiagram(Date.now()), shown: false, marks: null }; render(); } }, 'Diagram acak baru'),
          state.score ? verdict(state.score[0], state.score[1]) : null),
        h('div', { class: 'explain' },
          h('strong', null, 'Aturan. '),
          'Lamport: event lokal atau kirim = nilai sebelumnya + 1. Terima pesan = max(nilai lokal, timestamp pesan) + 1. ',
          'Vector: naikkan komponen proses sendiri. Saat terima, ambil max per komponen dengan vector pengirim, lalu naikkan komponen sendiri. ',
          'Event yang menerima dua pesan (seperti c di soal dosen) mengambil max dari keduanya.')));
    }

    function check() {
      var d = state.d, L = T.clocks.lamport(d), V = T.clocks.vector(d);
      var marks = {}, right = 0, total = 0;
      d.events.forEach(function (e) {
        var lv = nums(inputs[e.id].l.value), vv = nums(inputs[e.id].v.value);
        var m = { l: lv.length === 1 && lv[0] === L[e.id], v: same(vv, V[e.id]) };
        marks[e.id] = m; total += 2; right += (m.l ? 1 : 0) + (m.v ? 1 : 0);
      });
      var keep = {};
      d.events.forEach(function (e) { keep[e.id] = [inputs[e.id].l.value, inputs[e.id].v.value]; });
      state.marks = marks; state.score = [right, total]; state.shown = false;
      record('ca', 'clocks', right, total);
      render();
      d.events.forEach(function (e) { inputs[e.id].l.value = keep[e.id][0]; inputs[e.id].v.value = keep[e.id][1]; });
    }

    render();
  }

  // ---------------------------------------------------------------- chord
  function chordLab(box) {
    var state = { ring: T.chord.SLIDE, node: T.chord.SLIDE.node, showAll: false, reveal: false, res: null };
    var refs = {};

    function ringSvg(r) {
      var size = 1 << r.m, R = 150, C = 190;
      var svg = s('svg', { viewBox: '0 0 380 380', role: 'img', 'aria-label': 'Ring Chord' });
      svg.appendChild(s('circle', { cx: C, cy: C, r: R, style: 'fill:none; stroke: var(--line); stroke-width: 2' }));
      for (var k = 0; k < size; k++) {
        var ang = -Math.PI / 2 + k / size * Math.PI * 2;
        var x = C + R * Math.cos(ang), y = C + R * Math.sin(ang);
        var isNode = r.nodes.indexOf(k) >= 0;
        if (isNode) {
          svg.appendChild(s('circle', { class: 'svg-node' + (k === state.node ? ' on' : ''), cx: x, cy: y, r: 14 }));
          svg.appendChild(s('text', { class: 'svg-text', x: x, y: y + 5, 'text-anchor': 'middle', style: 'font-size:12px' }, String(k)));
        } else {
          svg.appendChild(s('circle', { class: 'svg-tick', cx: x, cy: y, r: 3 }));
          if (size <= 32) svg.appendChild(s('text', { class: 'svg-muted', x: C + (R + 18) * Math.cos(ang), y: C + (R + 18) * Math.sin(ang) + 4, 'text-anchor': 'middle' }, String(k)));
        }
      }
      svg.appendChild(s('text', { class: 'svg-muted', x: C, y: C, 'text-anchor': 'middle' }, 'm = ' + r.m + ' · ID 0..' + (size - 1)));
      return h('div', { class: 'diagram', style: 'max-width:420px' }, svg);
    }

    function render() {
      box.textContent = '';
      var r = state.ring, p = state.node, size = 1 << r.m;
      var ft = T.chord.fingerTable(r.nodes, r.m, p);
      var path = T.chord.lookup(r.nodes, r.m, r.node, r.key);
      var owner = T.chord.succ(r.nodes, r.m, r.key);
      refs = { ft: [] };

      var sel = h('select', { class: 'input', id: 'chord-node', style: 'width:auto', onchange: function () { state.node = Number(this.value); state.res = null; state.reveal = false; render(); } },
        r.nodes.map(function (n) { return h('option', { value: n, selected: n === p }, 'Node ' + n); }));

      var tbody = h('tbody');
      ft.forEach(function (v, i) {
        var mk = state.res && state.res.ft[i];
        var inp = h('input', { class: 'input' + (state.res ? (mk ? ' ok' : ' bad') : ''), id: 'chord-ft-' + i, inputmode: 'numeric', autocomplete: 'off', value: state.reveal ? String(v) : (state.res ? state.res.vals[i] : '') });
        refs.ft.push(inp);
        tbody.appendChild(h('tr', null, h('td', { class: 'mono' }, String(i + 1)),
          h('td', { class: 'mono' }, p + ' + ' + Math.pow(2, i) + ' = ' + ((p + Math.pow(2, i)) % size)), h('td', null, inp)));
      });

      refs.path = h('input', { class: 'input' + (state.res ? (state.res.path ? ' ok' : ' bad') : ''), id: 'chord-path', autocomplete: 'off', placeholder: 'contoh: 1, 18, 20', value: state.reveal ? path.join(', ') : (state.res ? state.res.pathVal : '') });
      refs.owner = h('input', { class: 'input' + (state.res ? (state.res.owner ? ' ok' : ' bad') : ''), id: 'chord-owner', inputmode: 'numeric', autocomplete: 'off', value: state.reveal ? String(owner) : (state.res ? state.res.ownerVal : '') });

      var all = null;
      if (state.showAll) {
        all = h('div', { class: 'table-wrap' }, h('table', { class: 'grid' },
          h('thead', null, h('tr', null, h('th', null, 'Node'), Array.from({ length: r.m }, function (_, i) { return h('th', null, 'FT[' + (i + 1) + ']'); }))),
          h('tbody', null, r.nodes.map(function (n) {
            return h('tr', null, h('td', { class: 'mono' }, String(n)), T.chord.fingerTable(r.nodes, r.m, n).map(function (v) { return h('td', { class: 'mono' }, String(v)); }));
          }))));
      }

      box.appendChild(h('div', { class: 'stack' },
        h('p', { class: 'lead' }, 'Setiap node menyimpan key k dengan pred(p) < k ≤ p, jadi key k ada di succ(k). Finger table: FT_p[i] = succ(p + 2^(i−1)) mod 2^m.'),
        h('div', { class: 'grid2' },
          ringSvg(r),
          h('div', { class: 'stack' },
            h('div', { class: 'row' }, h('span', { class: 'field-label' }, 'Finger table untuk'), sel),
            h('div', { class: 'table-wrap' }, h('table', { class: 'grid' },
              h('thead', null, h('tr', null, h('th', null, 'i'), h('th', null, 'p + 2^(i−1)'), h('th', null, 'succ'))), tbody)))),
        h('div', { class: 'fields' },
          h('label', { class: 'fieldbox', for: 'chord-path' }, h('span', { class: 'field-label' }, 'Jalur lookup key ' + r.key + ' dari node ' + r.node), refs.path),
          h('label', { class: 'fieldbox', for: 'chord-owner' }, h('span', { class: 'field-label' }, 'Key ' + r.key + ' disimpan di node'), refs.owner)),
        h('div', { class: 'row' },
          h('button', { class: 'btn', type: 'button', onclick: check }, 'Periksa'),
          h('button', { class: 'btn ghost', type: 'button', onclick: function () { state.reveal = true; state.res = null; render(); } }, 'Tunjukkan jawaban'),
          h('button', { class: 'btn ghost', type: 'button', onclick: function () { state.showAll = !state.showAll; render(); } }, state.showAll ? 'Sembunyikan semua FT' : 'Lihat FT semua node'),
          h('button', { class: 'btn ghost', type: 'button', onclick: function () { var x = T.chord.SLIDE; state = { ring: x, node: x.node, showAll: false, reveal: false, res: null }; render(); } }, 'Ring dari slide'),
          h('button', { class: 'btn hl', type: 'button', onclick: function () { var x = T.chord.randomRing(Date.now()); state = { ring: x, node: x.node, showAll: false, reveal: false, res: null }; render(); } }, 'Ring acak baru'),
          state.res ? verdict(state.res.right, state.res.total) : null),
        all,
        h('div', { class: 'explain' }, h('strong', null, 'Cara lookup. '),
          'Di node p: jika k ada di (p, FT_p[1]], kirim ke FT_p[1] dan selesai. Jika tidak, kirim ke finger terjauh yang masih sebelum k, yaitu FT_p[j] ≤ k < FT_p[j+1] (melingkar). Ulangi di node berikutnya.')));
    }

    function check() {
      var r = state.ring, ft = T.chord.fingerTable(r.nodes, r.m, state.node);
      var path = T.chord.lookup(r.nodes, r.m, r.node, r.key), owner = T.chord.succ(r.nodes, r.m, r.key);
      var vals = refs.ft.map(function (i) { return i.value; });
      var res = { vals: vals, pathVal: refs.path.value, ownerVal: refs.owner.value };
      res.ft = ft.map(function (v, i) { var x = nums(vals[i]); return x.length === 1 && x[0] === v; });
      res.path = same(nums(res.pathVal), path);
      var o = nums(res.ownerVal); res.owner = o.length === 1 && o[0] === owner;
      res.total = ft.length + 2;
      res.right = res.ft.filter(Boolean).length + (res.path ? 1 : 0) + (res.owner ? 1 : 0);
      state.res = res; state.reveal = false;
      record('ca', 'chord', res.right, res.total);
      render();
    }

    render();
  }

  // ---------------------------------------------------------------- consistency
  function consistencyLab(box) {
    var state = { c: T.consistency.PRESETS[0], answer: null };

    function opsTable(c) {
      var maxCol = 0;
      c.cols.forEach(function (cs) { cs.forEach(function (x) { maxCol = Math.max(maxCol, x); }); });
      return h('div', { class: 'table-wrap' }, h('table', { class: 'grid optable' },
        h('tbody', null, c.procs.map(function (ops, p) {
          var cells = [];
          for (var col = 0; col <= maxCol; col++) {
            var k = c.cols[p].indexOf(col);
            cells.push(h('td', { class: k >= 0 ? 'op' : null }, k >= 0 ? T.consistency.label(ops[k]) : ''));
          }
          return h('tr', null, h('th', null, 'P' + (p + 1)), cells);
        }))));
    }

    function render() {
      box.textContent = '';
      var c = state.c, res = T.consistency.check(c.procs);
      var out = null;
      if (state.answer !== null) {
        var right = state.answer === res.ok;
        var why;
        if (res.ok) {
          why = h('div', { class: 'stack' }, h('p', null, 'Ada satu urutan global yang menjaga urutan program tiap proses dan setiap read membaca write terakhir:'),
            h('p', { class: 'mono' }, res.order.map(function (st) { return T.consistency.label(c.procs[st.p][st.i]).replace('(x)', st.p + 1 + '(x)'); }).join('  →  ')));
        } else if (res.conflict) {
          var k = res.conflict;
          why = h('p', null, 'P' + (k.a + 1) + ' melihat ' + k.first + ' lalu ' + k.second + ', tetapi P' + (k.b + 1) + ' melihat ' + k.second + ' lalu ' + k.first +
            '. Pada sequential consistency semua proses harus melihat urutan write yang sama, jadi tidak ada urutan global yang memenuhi.');
        } else {
          why = h('p', null, 'Tidak ada interleaving yang menjaga urutan program sekaligus membuat setiap read membaca nilai write terakhir.');
        }
        out = h('div', { class: 'explain stack' },
          h('strong', null, (right ? 'Tepat. ' : 'Belum tepat. ') + (res.ok ? 'Sequentially consistent.' : 'Tidak sequentially consistent.')), why);
      }
      box.appendChild(h('div', { class: 'stack' },
        h('p', { class: 'lead' }, 'Baca operasi tiap proses dari kiri ke kanan (kiri lebih dulu). Tentukan apakah ada satu urutan global yang valid.'),
        h('div', { class: 'row' }, h('span', { class: 'chip' }, c.name || 'Soal acak')),
        opsTable(c),
        h('div', { class: 'verdict' },
          h('button', { class: 'btn', type: 'button', disabled: state.answer !== null, onclick: function () { answer(true); } }, 'Ya, sequentially consistent'),
          h('button', { class: 'btn', type: 'button', disabled: state.answer !== null, onclick: function () { answer(false); } }, 'Tidak')),
        out,
        h('div', { class: 'row' },
          T.consistency.PRESETS.map(function (pr) {
            return h('button', { class: 'btn ghost sm', type: 'button', onclick: function () { state = { c: pr, answer: null }; render(); } }, pr.name);
          }),
          h('button', { class: 'btn hl sm', type: 'button', onclick: function () { state = { c: T.consistency.random(Date.now()), answer: null }; render(); } }, 'Soal acak baru')),
        h('div', { class: 'explain' }, h('strong', null, 'Ingat. '),
          'Sequentially consistent: hasil eksekusi sama seperti jika semua operasi dijalankan dalam satu urutan berurutan, dan urutan tiap proses tetap sesuai program. Waktu nyata antar proses tidak penting. Kunci cepat: semua pembaca harus melihat write dalam urutan yang sama.')));
    }

    function answer(v) {
      state.answer = v;
      var ok = v === T.consistency.check(state.c.procs).ok;
      record('ca', 'consistency', ok ? 1 : 0, 1);
      render();
    }

    render();
  }

  // ---------------------------------------------------------------- CPM
  function cpmLab(box) {
    var state = { acts: T.cpm.EXAMPLE, reveal: false, res: null, vals: null };
    var refs = {};
    var COLS = ['es', 'ef', 'ls', 'lf', 'slack'];

    function render() {
      box.textContent = '';
      var r = T.cpm.compute(state.acts);
      refs = { cells: {} };
      var tbody = h('tbody');
      r.order.forEach(function (id) {
        var a = state.acts.filter(function (x) { return x.id === id; })[0];
        var crit = state.reveal && r.res[id].slack === 0;
        refs.cells[id] = {};
        var tds = COLS.map(function (c) {
          var mk = state.res && state.res.cells[id][c];
          var val = state.reveal ? String(r.res[id][c]) : (state.vals ? state.vals[id][c] : '');
          var inp = h('input', { class: 'input' + (state.res ? (mk ? ' ok' : ' bad') : ''), id: 'cpm-' + id + '-' + c, inputmode: 'numeric', autocomplete: 'off', value: val });
          refs.cells[id][c] = inp;
          return h('td', null, inp);
        });
        tbody.appendChild(h('tr', { class: crit ? 'crit' : null }, h('td', { class: 'mono' }, id), h('td', { class: 'num' }, String(a.d)), h('td', { class: 'mono' }, a.pre.join(', ') || '–'), tds));
      });
      refs.dur = h('input', { class: 'input' + (state.res ? (state.res.dur ? ' ok' : ' bad') : ''), id: 'cpm-dur', inputmode: 'numeric', autocomplete: 'off', value: state.reveal ? String(r.duration) : (state.vals ? state.vals.dur : '') });
      refs.path = h('input', { class: 'input' + (state.res ? (state.res.path ? ' ok' : ' bad') : ''), id: 'cpm-path', autocomplete: 'off', placeholder: 'contoh: A-D-F', value: state.reveal ? r.critical[0].join('-') : (state.vals ? state.vals.path : '') });

      box.appendChild(h('div', { class: 'stack' },
        h('p', { class: 'lead' }, 'Hitung forward pass (ES, EF) lalu backward pass (LS, LF). Slack = LS − ES. Aktivitas dengan slack 0 membentuk jalur kritis.'),
        h('div', { class: 'table-wrap' }, h('table', { class: 'grid' },
          h('thead', null, h('tr', null, ['Aktivitas', 'Durasi', 'Pendahulu', 'ES', 'EF', 'LS', 'LF', 'Slack'].map(function (x) { return h('th', null, x); }))),
          tbody)),
        h('div', { class: 'fields' },
          h('label', { class: 'fieldbox', for: 'cpm-dur' }, h('span', { class: 'field-label' }, 'Durasi proyek'), refs.dur),
          h('label', { class: 'fieldbox', for: 'cpm-path' }, h('span', { class: 'field-label' }, 'Jalur kritis'), refs.path)),
        h('div', { class: 'row' },
          h('button', { class: 'btn', type: 'button', onclick: check }, 'Periksa'),
          h('button', { class: 'btn ghost', type: 'button', onclick: function () { state.reveal = true; state.res = null; render(); } }, 'Tunjukkan jawaban'),
          h('button', { class: 'btn ghost', type: 'button', onclick: function () { state = { acts: T.cpm.EXAMPLE, reveal: false, res: null, vals: null }; render(); } }, 'Contoh'),
          h('button', { class: 'btn hl', type: 'button', onclick: function () { state = { acts: T.cpm.random(Date.now()), reveal: false, res: null, vals: null }; render(); } }, 'Jaringan acak baru'),
          state.res ? verdict(state.res.right, state.res.total) : null),
        state.reveal || state.res ? h('div', { class: 'explain' }, h('strong', null, 'Semua jalur. '),
          r.paths.map(function (p) { return p.ids.join('-') + ' = ' + p.length; }).join(' · '),
          '. Jalur terpanjang = jalur kritis = durasi minimum proyek.') : null,
        h('div', { class: 'explain' }, h('strong', null, 'Rumus. '),
          'ES = max(EF pendahulu), EF = ES + durasi. LF = min(LS penerus), atau durasi proyek untuk aktivitas terakhir. LS = LF − durasi. Total slack = LS − ES = LF − EF.')));
    }

    function check() {
      var r = T.cpm.compute(state.acts);
      var vals = { dur: refs.dur.value, path: refs.path.value };
      var res = { cells: {}, right: 0, total: 0 };
      r.order.forEach(function (id) {
        vals[id] = {}; res.cells[id] = {};
        COLS.forEach(function (c) {
          var v = refs.cells[id][c].value; vals[id][c] = v;
          var x = nums(v), ok = x.length === 1 && x[0] === r.res[id][c];
          res.cells[id][c] = ok; res.total++; if (ok) res.right++;
        });
      });
      var d = nums(vals.dur); res.dur = d.length === 1 && d[0] === r.duration;
      var given = (vals.path.toUpperCase().match(/[A-Z]/g) || []);
      res.path = r.critical.some(function (p) { return same(given, p); });
      res.total += 2; res.right += (res.dur ? 1 : 0) + (res.path ? 1 : 0);
      state.res = res; state.vals = vals; state.reveal = false;
      record('mp', 'cpm', res.right, res.total);
      render();
    }

    render();
  }

  var LABS = {
    clocks: { name: 'Timestamp (Lamport & Vector)', run: clocksLab },
    chord: { name: 'Chord finger table', run: chordLab },
    consistency: { name: 'Sequential consistency', run: consistencyLab },
    cpm: { name: 'Critical path (CPM)', run: cpmLab }
  };

  root.Labs = LABS;
})(this);
