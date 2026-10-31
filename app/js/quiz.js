// Session runner for multiple choice, fill-in and essay items.
// Practice mode gives feedback per item; exam mode grades everything at the end, with a timer.
(function (root) {
  var h = UI.h;
  var LETTERS = 'ABCDE';

  function prepare(it) {
    if (it.type === 'mcq') return { order: UI.shuffle([it.a].concat(it.w)), pick: -1, done: false, score: 0 };
    if (it.type === 'fill') return { inputs: it.fields.map(function () { return ''; }), marks: null, done: false, score: 0 };
    return { text: '', ticks: it.points.map(function () { return false; }), revealed: false, done: false, score: 0 };
  }

  function isOk(it, st) { return it.type === 'essay' ? st.score >= 0.6 : st.score >= 0.999; }

  function answered(it, st) {
    if (it.type === 'mcq') return st.pick >= 0;
    if (it.type === 'fill') return st.inputs.some(function (v) { return String(v).trim() !== ''; });
    return st.text.trim() !== '';
  }

  function grade(it, st) {
    if (it.type === 'mcq') st.score = st.pick >= 0 && st.order[st.pick] === it.a ? 1 : 0;
    if (it.type === 'fill') {
      st.marks = it.fields.map(function (f, i) { return Check.checkField(f, st.inputs[i]); });
      st.score = st.marks.filter(Boolean).length / it.fields.length;
    }
    if (it.type === 'essay') st.score = st.ticks.filter(Boolean).length / it.points.length;
    st.done = true;
  }

  function table(t) {
    return h('div', { class: 'table-wrap' }, h('table', { class: 'grid' },
      h('thead', null, h('tr', null, t.head.map(function (c) { return h('th', null, c); }))),
      h('tbody', null, t.rows.map(function (r) { return h('tr', null, r.map(function (c) { return h('td', null, String(c)); })); }))));
  }

  // opts: { course, items, mode: 'practice'|'exam', kind, limit (sec), title, onDone(action, payload) }
  function start(container, opts) {
    var S = {
      items: opts.items, st: opts.items.map(prepare), idx: 0, flags: {},
      mode: opts.mode, started: Date.now(), limit: opts.mode === 'exam' ? opts.limit || 0 : 0,
      confirming: false, grading: false, finished: false, result: null
    };
    var timerId = null, timerEl = null;

    function n() { return S.items.length; }
    function cur() { return S.items[S.idx]; }
    function st() { return S.st[S.idx]; }

    function remaining() { return S.limit - (Date.now() - S.started) / 1000; }

    function tick() {
      if (!timerEl) return;
      var r = remaining();
      timerEl.textContent = UI.clock(r);
      timerEl.className = 'timer' + (r < 60 ? ' low' : '');
      if (r <= 0) { clearInterval(timerId); timerId = null; submitExam(true); }
    }

    function render() {
      container.textContent = '';
      timerEl = null;
      if (S.finished) return container.appendChild(results());
      if (S.grading) return container.appendChild(gradingView());
      container.appendChild(bar());
      container.appendChild(card());
      if (S.mode === 'exam') container.appendChild(ljk());
      var focus = container.querySelector('[data-autofocus]');
      if (focus) focus.focus();
    }

    function bar() {
      var done = S.st.filter(function (x, i) { return S.mode === 'exam' ? answered(S.items[i], x) : x.done; }).length;
      var right = S.mode === 'practice' ? S.st.filter(function (x, i) { return x.done && isOk(S.items[i], x); }).length : null;
      var box = h('div', { class: 'qbar' },
        h('div', { class: 'qprog' },
          h('div', { class: 'row between small muted' },
            h('span', null, opts.title + (S.mode === 'exam' ? ' · mode ujian' : ' · mode latihan')),
            h('span', { class: 'num' }, done + '/' + n() + (right != null ? ' · benar ' + right : ''))),
          h('div', { class: 'bar' }, h('i', { style: 'width:' + (done / n() * 100) + '%' }))),
        S.mode === 'exam' && S.limit ? (timerEl = h('span', { class: 'timer' }, UI.clock(remaining()))) : null,
        h('button', { class: 'btn ghost sm', type: 'button', onclick: S.mode === 'exam' ? askSubmit : finishPractice },
          S.mode === 'exam' ? 'Kumpulkan' : 'Akhiri sesi'));
      return box;
    }

    function card() {
      var it = cur(), s = st();
      var sec = h('section', { class: 'sheet stack' },
        h('div', { class: 'row between' },
          h('span', { class: 'qnum' }, 'Soal ' + (S.idx + 1)),
          h('span', { class: 'chip' }, it.topic)),
        h('p', { class: 'qtext' }, it.q),
        it.table ? table(it.table) : null);
      if (it.type === 'mcq') sec.appendChild(mcqBody(it, s));
      else if (it.type === 'fill') sec.appendChild(fillBody(it, s));
      else sec.appendChild(essayBody(it, s));
      if (S.confirming) sec.appendChild(confirmBox());
      return sec;
    }

    function mcqBody(it, s) {
      var showKey = S.mode === 'practice' && s.done;
      var box = h('div', { class: 'stack' });
      var opts_ = h('div', { class: 'opts' });
      s.order.forEach(function (text, i) {
        var cls = 'opt';
        if (s.pick === i) cls += ' picked';
        if (showKey && text === it.a) cls += ' right';
        else if (showKey && s.pick === i) cls += ' wrong';
        opts_.appendChild(h('button', { type: 'button', class: cls, disabled: showKey, onclick: function () { pick(i); } },
          h('span', { class: 'bubble' }, LETTERS[i]), h('span', null, text)));
      });
      box.appendChild(opts_);
      if (showKey) {
        box.appendChild(h('div', { class: 'explain' },
          h('strong', null, s.score ? 'Benar. ' : 'Belum tepat. '), it.ex || ''));
      }
      box.appendChild(nav(showKey));
      return box;
    }

    function fillBody(it, s) {
      var showKey = S.mode === 'practice' && s.done;
      var box = h('div', { class: 'stack' });
      var grid = h('div', { class: 'fields' });
      it.fields.forEach(function (f, i) {
        var cls = 'input' + (showKey ? (s.marks[i] ? ' ok' : ' bad') : '');
        var input = h('input', {
          class: cls, id: 'f-' + it.id + '-' + i, type: 'text', autocomplete: 'off', spellcheck: 'false',
          placeholder: f.ph || (typeof f.a === 'number' ? 'angka' : 'jawaban'),
          value: s.inputs[i], readonly: showKey, 'data-autofocus': i === 0 && !showKey ? 'true' : null,
          oninput: function () { s.inputs[i] = this.value; }
        });
        grid.appendChild(h('label', { class: 'fieldbox', for: 'f-' + it.id + '-' + i },
          h('span', { class: 'field-label' }, f.label || 'Jawaban'),
          input,
          showKey && !s.marks[i] ? h('span', { class: 'key' }, 'Kunci: ' + Check.display(f)) : null));
      });
      box.appendChild(grid);
      if (showKey && it.ex) box.appendChild(h('div', { class: 'explain' }, h('strong', null, s.score >= 0.999 ? 'Benar. ' : 'Pembahasan. '), it.ex));
      if (S.mode === 'practice' && !s.done) {
        box.appendChild(h('div', { class: 'row' },
          h('button', { class: 'btn', type: 'button', onclick: checkFill }, 'Periksa'),
          h('button', { class: 'btn ghost', type: 'button', onclick: function () { s.inputs = s.inputs.map(function () { return ''; }); checkFill(); } }, 'Tidak tahu, lihat kunci'),
          h('span', { class: 'small muted' }, 'Desimal boleh pakai koma. Urutan huruf boleh berspasi.')));
      } else {
        box.appendChild(nav(showKey));
      }
      return box;
    }

    function essayBody(it, s) {
      var box = h('div', { class: 'stack' });
      var reveal = S.mode === 'practice' && s.revealed;
      box.appendChild(h('textarea', {
        class: 'textarea', id: 'e-' + it.id, placeholder: 'Tulis jawabanmu dulu, lalu buka kunci untuk menilai sendiri.',
        readonly: s.done, 'data-autofocus': !s.revealed ? 'true' : null,
        oninput: function () { s.text = this.value; }
      }, s.text));
      if (S.mode === 'practice' && !s.revealed) {
        box.appendChild(h('div', { class: 'row' },
          h('button', { class: 'btn', type: 'button', onclick: function () { s.revealed = true; render(); } }, 'Lihat kunci jawaban'),
          h('span', { class: 'small muted' }, 'Kamu akan menilai sendiri berdasarkan poin kunci.')));
        return box;
      }
      if (reveal) {
        box.appendChild(pointsList(it, s, s.done));
        if (it.model) box.appendChild(h('div', { class: 'model' }, it.model));
        if (it.ex) box.appendChild(h('div', { class: 'explain' }, it.ex));
        if (!s.done) {
          box.appendChild(h('div', { class: 'row' },
            h('button', { class: 'btn', type: 'button', onclick: function () { grade(it, s); Store.recordItem(it.id, isOk(it, s)); render(); } }, 'Simpan nilai'),
            h('span', { class: 'small muted' }, 'Centang poin yang sudah kamu tulis.')));
          return box;
        }
        box.appendChild(h('div', { class: 'explain' }, h('strong', null, 'Nilai: ' + UI.pct(s.score) + '. '), isOk(it, s) ? 'Cukup lengkap.' : 'Ulangi lagi nanti, soal masuk bank salah.'));
      }
      box.appendChild(nav(s.done));
      return box;
    }

    function pointsList(it, s, locked) {
      var list = h('div', { class: 'points' });
      it.points.forEach(function (p, i) {
        var lab = h('label', { class: s.ticks[i] ? 'on' : null },
          h('input', { type: 'checkbox', checked: s.ticks[i], disabled: locked, onchange: function () { s.ticks[i] = this.checked; lab.className = this.checked ? 'on' : ''; } }),
          h('span', null, p));
        list.appendChild(lab);
      });
      return list;
    }

    function nav(answeredPractice) {
      var last = S.idx === n() - 1;
      if (S.mode === 'practice') {
        if (!answeredPractice) return h('span');
        return h('div', { class: 'row' },
          h('button', { class: 'btn hl', type: 'button', 'data-autofocus': 'true', onclick: next }, last ? 'Lihat hasil' : 'Lanjut'),
          h('span', { class: 'small muted' }, h('span', { class: 'kbd' }, 'Enter'), ' untuk lanjut'));
      }
      var flagged = !!S.flags[S.idx];
      return h('div', { class: 'row between' },
        h('div', { class: 'row' },
          h('button', { class: 'btn ghost sm', type: 'button', disabled: S.idx === 0, onclick: function () { go(S.idx - 1); } }, 'Sebelumnya'),
          h('button', { class: 'btn sm', type: 'button', onclick: function () { last ? askSubmit() : go(S.idx + 1); } }, last ? 'Kumpulkan' : 'Berikutnya')),
        h('label', { class: 'check' }, h('input', { type: 'checkbox', checked: flagged, onchange: function () { S.flags[S.idx] = this.checked; render(); } }), 'Ragu-ragu'));
    }

    function ljk() {
      var grid = h('div', { class: 'ljk', 'aria-label': 'Lembar jawaban' });
      S.items.forEach(function (it, i) {
        var cls = [];
        if (answered(it, S.st[i])) cls.push('done');
        if (S.flags[i]) cls.push('flag');
        if (i === S.idx) cls.push('cur');
        grid.appendChild(h('button', { type: 'button', class: cls.join(' '), title: 'Soal ' + (i + 1), onclick: function () { go(i); } }, String(i + 1)));
      });
      return h('section', { class: 'sheet flat stack' },
        h('div', { class: 'row between' }, h('h3', null, 'Lembar jawaban'),
          h('span', { class: 'small muted' }, 'Kuning = ragu-ragu. ', h('span', { class: 'kbd' }, '←'), ' ', h('span', { class: 'kbd' }, '→'), ' pindah soal')),
        grid);
    }

    function confirmBox() {
      var empty = S.items.filter(function (it, i) { return !answered(it, S.st[i]); }).length;
      var flagged = Object.keys(S.flags).filter(function (k) { return S.flags[k]; }).length;
      return h('div', { class: 'confirm' },
        h('span', null, 'Kumpulkan sekarang? ' + (empty ? empty + ' soal masih kosong. ' : '') + (flagged ? flagged + ' soal ditandai ragu-ragu.' : '')),
        h('button', { class: 'btn sm', type: 'button', onclick: function () { submitExam(false); } }, 'Ya, kumpulkan'),
        h('button', { class: 'btn ghost sm', type: 'button', onclick: function () { S.confirming = false; render(); } }, 'Batal'));
    }

    function pick(i) {
      var it = cur(), s = st();
      if (S.mode === 'practice') {
        if (s.done) return;
        s.pick = i; grade(it, s);
        Store.recordItem(it.id, isOk(it, s));
      } else {
        s.pick = i;
      }
      render();
    }

    function checkFill() {
      var it = cur(), s = st();
      grade(it, s);
      Store.recordItem(it.id, isOk(it, s));
      render();
    }

    function go(i) { if (i >= 0 && i < n()) { S.idx = i; S.confirming = false; render(); } }

    function next() {
      if (S.idx < n() - 1) return go(S.idx + 1);
      finalize();
    }

    function finishPractice() {
      if (!S.st.some(function (x) { return x.done; })) { destroy(); return opts.onDone('back'); }
      finalize();
    }

    function askSubmit() { S.confirming = true; render(); }

    function submitExam(timeUp) {
      S.confirming = false;
      S.timeUp = timeUp;
      if (timerId) { clearInterval(timerId); timerId = null; }
      S.items.forEach(function (it, i) { if (it.type !== 'essay') grade(it, S.st[i]); });
      if (S.items.some(function (it) { return it.type === 'essay'; })) { S.grading = true; render(); return; }
      finalize();
    }

    function gradingView() {
      var box = h('div', { class: 'stack' },
        h('div', { class: 'head' }, h('span', { class: 'eyebrow' }, 'Langkah terakhir'), h('h2', null, 'Nilai sendiri jawaban esai'),
          h('p', { class: 'lead' }, 'Bandingkan jawabanmu dengan poin kunci. Centang poin yang sudah kamu tulis.')));
      S.items.forEach(function (it, i) {
        if (it.type !== 'essay') return;
        var s = S.st[i];
        box.appendChild(h('section', { class: 'sheet stack' },
          h('div', { class: 'row between' }, h('span', { class: 'qnum' }, 'Soal ' + (i + 1)), h('span', { class: 'chip' }, it.topic)),
          h('p', { class: 'qtext' }, it.q),
          h('div', { class: 'model' }, s.text.trim() || '(kosong)'),
          pointsList(it, s, false),
          it.model ? h('details', null, h('summary', null, 'Contoh jawaban lengkap'), h('div', { class: 'model' }, it.model)) : null));
      });
      box.appendChild(h('div', { class: 'row' }, h('button', { class: 'btn hl', type: 'button', onclick: function () {
        S.items.forEach(function (it, i) { if (it.type === 'essay') grade(it, S.st[i]); });
        S.grading = false; finalize();
      } }, 'Lihat hasil')));
      return box;
    }

    function finalize() {
      if (timerId) { clearInterval(timerId); timerId = null; }
      var idx = S.items.map(function (_, i) { return i; }).filter(function (i) { return S.mode === 'exam' || S.st[i].done; });
      var topics = {}, total = 0, right = 0;
      idx.forEach(function (i) {
        var it = S.items[i], s = S.st[i];
        if (S.mode === 'exam') Store.recordItem(it.id, isOk(it, s));
        total += s.score;
        if (isOk(it, s)) right++;
        var t = topics[it.topic] || (topics[it.topic] = [0, 0]);
        t[0] += s.score; t[1] += 1;
      });
      S.result = { idx: idx, score: idx.length ? total / idx.length : 0, right: right, topics: topics, secs: Math.round((Date.now() - S.started) / 1000) };
      Store.recordSession({ course: opts.course, mode: S.mode, kind: opts.kind || 'normal', n: idx.length, right: right, score: S.result.score, topics: topics, secs: S.result.secs });
      S.finished = true;
      render();
      window.scrollTo(0, 0);
    }

    function results() {
      var R = S.result;
      var wrong = R.idx.filter(function (i) { return !isOk(S.items[i], S.st[i]); });
      var box = h('div', { class: 'stack' });
      box.appendChild(h('section', { class: 'sheet stack' },
        h('span', { class: 'eyebrow' }, opts.title + (S.timeUp ? ' · waktu habis' : '')),
        h('div', { class: 'score' }, h('strong', null, Math.round(R.score * 100)), h('span', null, 'dari 100 · ' + R.right + ' dari ' + R.idx.length + ' benar · ' + UI.clock(R.secs))),
        h('div', { class: 'stack' }, Object.keys(R.topics).map(function (t) {
          var v = R.topics[t][0] / R.topics[t][1];
          return h('div', { class: 'topic-row' },
            h('div', null, h('div', { class: 'small' }, t), h('div', { class: 'bar' + (v < 0.6 ? ' hl' : '') }, h('i', { style: 'width:' + v * 100 + '%' }))),
            h('span', { class: 'num small' }, UI.pct(v)));
        })),
        h('div', { class: 'row' },
          wrong.length ? h('button', { class: 'btn hl', type: 'button', onclick: function () { destroy(); opts.onDone('retry', wrong.map(function (i) { return S.items[i]; })); } }, 'Ulangi ' + wrong.length + ' soal yang salah') : null,
          h('button', { class: 'btn', type: 'button', onclick: function () { destroy(); opts.onDone('again'); } }, 'Sesi baru'),
          h('button', { class: 'btn ghost', type: 'button', onclick: function () { destroy(); opts.onDone('back'); } }, 'Kembali'))));
      if (wrong.length) {
        box.appendChild(h('h2', null, 'Pembahasan soal yang salah'));
        var list = h('div', { class: 'review' });
        wrong.forEach(function (i) { list.appendChild(reviewItem(S.items[i], S.st[i], i)); });
        box.appendChild(list);
      }
      return box;
    }

    function reviewItem(it, s, i) {
      var body = h('div', { class: 'review-item' },
        h('div', { class: 'row between' }, h('span', { class: 'qnum' }, 'Soal ' + (i + 1)), h('span', { class: 'chip bad' }, UI.pct(s.score))),
        h('p', null, it.q), it.table ? table(it.table) : null);
      if (it.type === 'mcq') {
        body.appendChild(h('p', { class: 'ans' }, 'Jawabanmu: ', s.pick >= 0 ? h('s', null, s.order[s.pick]) : '(kosong)'));
        body.appendChild(h('p', { class: 'ans' }, 'Kunci: ', h('b', null, it.a)));
      } else if (it.type === 'fill') {
        it.fields.forEach(function (f, k) {
          body.appendChild(h('p', { class: 'ans' }, (f.label ? f.label + ': ' : ''),
            s.marks[k] ? h('b', null, s.inputs[k]) : [h('s', null, s.inputs[k] || '(kosong)'), ' → ', h('b', null, Check.display(f))]));
        });
      } else {
        body.appendChild(h('ul', { class: 'small' }, it.points.map(function (p, k) { return h('li', null, (s.ticks[k] ? '✓ ' : '✗ ') + p); })));
      }
      if (it.ex) body.appendChild(h('div', { class: 'explain' }, it.ex));
      return body;
    }

    function onKey(e) {
      if (S.finished || S.grading || !container.isConnected) return;
      var tag = (e.target.tagName || '').toLowerCase();
      var it = cur(), s = st();
      if (tag === 'textarea') return;
      if (tag === 'input' && e.target.type === 'text') {
        if (e.key === 'Enter' && S.mode === 'practice' && it.type === 'fill' && !s.done) { e.preventDefault(); checkFill(); }
        else if (e.key === 'Enter' && S.mode === 'exam') { e.preventDefault(); go(S.idx + 1); }
        return;
      }
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (it.type === 'mcq') {
        var k = e.key.toLowerCase();
        var i = '12345'.indexOf(k) >= 0 ? '12345'.indexOf(k) : 'abcde'.indexOf(k);
        if (i >= 0 && i < s.order.length) { e.preventDefault(); pick(i); return; }
      }
      if (S.mode === 'exam' && e.key === 'ArrowRight') go(S.idx + 1);
      if (S.mode === 'exam' && e.key === 'ArrowLeft') go(S.idx - 1);
      if (e.key === 'Enter' && S.mode === 'practice' && s.done && tag !== 'button') { e.preventDefault(); next(); }
    }

    function destroy() {
      if (timerId) clearInterval(timerId);
      timerId = null;
      document.removeEventListener('keydown', onKey);
    }

    document.addEventListener('keydown', onKey);
    if (S.limit) timerId = setInterval(tick, 1000);
    render();
    return { destroy: destroy };
  }

  root.Quiz = { start: start };
})(this);
