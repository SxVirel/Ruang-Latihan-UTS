// Simple diagrams for the Materi tab: a WBS chart, an activity network (AOA or AON),
// chromosome rows, and a roulette wheel bar.
(function (root) {
  var h = root.UI.h, s = root.UI.s;

  // WBS node: 'label' or [label, [children]]. Codes follow the outline numbering 1, 1.1, 1.1.1.
  function label(n) { return typeof n === 'string' ? n : n[0]; }
  function kids(n) { return typeof n === 'string' ? [] : n[1] || []; }
  function code(parent, i) { return parent ? parent + '.' + (i + 1) : String(i + 1); }

  function wbs(spec) {
    function branch(list, parent, depth) {
      return h('ul', { class: 'wbs-l' + depth }, list.map(function (n, i) {
        var c = code(parent, i);
        return h('li', null,
          h('div', { class: 'wbs-box' }, h('b', null, c), ' ', label(n)),
          kids(n).length ? branch(kids(n), c, depth + 1) : null);
      }));
    }
    function outline(list, parent) {
      return list.reduce(function (out, n, i) {
        var c = code(parent, i);
        out.push(h('li', { class: 'wbs-o' + c.split('.').length }, h('b', null, c), ' ', label(n)));
        return out.concat(outline(kids(n), c));
      }, []);
    }
    return h('div', { class: 'stack' },
      h('div', { class: 'diagram-scroll' }, h('div', { class: 'wbs' },
        h('div', { class: 'wbs-root' }, spec.root), branch(spec.items, '', 1))),
      h('details', { class: 'wbs-outline' },
        h('summary', null, 'Bentuk daftar pustaka (cara menulis di lembar jawaban)'),
        h('ul', null, outline(spec.items, ''))));
  }

  // Activities for Tools.cpm.compute. AOA rows: [id, initial node, final node, duration];
  // an activity follows every activity that ends at its initial node. AON rows: [id, 'A, B' or '-', duration].
  function activities(spec) {
    if (spec.type === 'aon') {
      return spec.rows.map(function (r) { return { id: r[0], d: r[2], pre: r[1] === '-' ? [] : String(r[1]).split(/,\s*/) }; });
    }
    return spec.rows.map(function (r) {
      return { id: r[0], d: r[3], i: r[1], j: r[2], pre: spec.rows.filter(function (q) { return q[2] === r[1]; }).map(function (q) { return q[0]; }) };
    });
  }

  // Point where the segment from a toward b leaves the shape around a.
  function clip(a, b, shape) {
    var dx = b[0] - a[0], dy = b[1] - a[1], len = Math.sqrt(dx * dx + dy * dy);
    var t = shape.r ? shape.r / len : Math.min(shape.w / Math.abs(dx || 1e-9), shape.h / Math.abs(dy || 1e-9));
    return [a[0] + dx * t, a[1] + dy * t];
  }

  function arrow(from, to, crit, text) {
    var dx = to[0] - from[0], dy = to[1] - from[1], len = Math.sqrt(dx * dx + dy * dy);
    var ux = dx / len, uy = dy / len, bx = to[0] - ux * 9, by = to[1] - uy * 9;
    var cls = crit ? ' crit' : '';
    var g = s('g', null,
      s('line', { class: 'dg-edge' + cls, x1: from[0], y1: from[1], x2: bx, y2: by }),
      s('polygon', { class: 'dg-head' + cls, points: [to, [bx - uy * 4.5, by + ux * 4.5], [bx + uy * 4.5, by - ux * 4.5]].join(' ') }));
    // Labels sit just above the middle of the arrow.
    if (text) g.appendChild(s('text', { class: 'dg-label' + cls, x: (from[0] + to[0]) / 2 + uy * 10, y: (from[1] + to[1]) / 2 - ux * 10 + 4, 'text-anchor': 'middle' }, text));
    return g;
  }

  function net(spec) {
    var aon = spec.type === 'aon';
    var acts = activities(spec), r = root.Tools.cpm.compute(acts), res = r.res;
    var col = aon ? 150 : 120, row = aon ? 84 : 80, pad = aon ? 60 : 40;
    var keys = Object.keys(spec.pos), maxC = 0, maxR = 0;
    keys.forEach(function (k) { maxC = Math.max(maxC, spec.pos[k][0]); maxR = Math.max(maxR, spec.pos[k][1]); });
    var at = function (k) { return [pad + spec.pos[k][0] * col, pad + spec.pos[k][1] * row]; };
    var w = pad * 2 + maxC * col, ht = pad * 2 + maxR * row;
    var svg = s('svg', { class: 'dg', viewBox: '0 0 ' + w + ' ' + ht, width: w, height: ht, role: 'img',
      'aria-label': 'Network diagram, critical path ' + r.critical.map(function (p) { return p.join('-'); }).join(' dan ') });

    if (aon) {
      var box = { w: 50, h: 26 };
      acts.forEach(function (a) {
        a.pre.forEach(function (p) {
          var crit = !res[a.id].slack && !res[p].slack && res[p].ef === res[a.id].es;
          svg.appendChild(arrow(clip(at(p), at(a.id), box), clip(at(a.id), at(p), box), crit));
        });
      });
      acts.forEach(function (a) {
        var c = at(a.id), x = res[a.id], crit = x.slack === 0 ? ' crit' : '';
        svg.appendChild(s('g', null,
          s('rect', { class: 'dg-node' + crit, x: c[0] - 50, y: c[1] - 26, width: 100, height: 52, rx: 6 }),
          s('line', { class: 'dg-rule', x1: c[0] - 50, y1: c[1], x2: c[0] + 50, y2: c[1] }),
          s('text', { class: 'dg-num', x: c[0] - 44, y: c[1] - 9 }, x.es),
          s('text', { class: 'dg-name', x: c[0], y: c[1] - 9, 'text-anchor': 'middle' }, a.id + ' (' + a.d + ')'),
          s('text', { class: 'dg-num', x: c[0] + 44, y: c[1] - 9, 'text-anchor': 'end' }, x.ef),
          s('text', { class: 'dg-num', x: c[0] - 44, y: c[1] + 17 }, x.ls),
          s('text', { class: 'dg-small', x: c[0], y: c[1] + 17, 'text-anchor': 'middle' }, 'slack ' + x.slack),
          s('text', { class: 'dg-num', x: c[0] + 44, y: c[1] + 17, 'text-anchor': 'end' }, x.lf)));
      });
    } else {
      var circle = { r: 17 }, early = {}, late = {};
      acts.forEach(function (a) {
        early[a.j] = Math.max(early[a.j] || 0, res[a.id].ef);
        late[a.i] = Math.min(late[a.i] == null ? Infinity : late[a.i], res[a.id].ls);
        if (early[a.i] == null) early[a.i] = 0;
        if (late[a.j] == null) late[a.j] = r.duration;
      });
      acts.forEach(function (a) {
        svg.appendChild(arrow(clip(at(a.i), at(a.j), circle), clip(at(a.j), at(a.i), circle), res[a.id].slack === 0, a.id + ' = ' + a.d));
      });
      keys.forEach(function (k) {
        var c = at(k), crit = early[k] === late[k] ? ' crit' : '';
        svg.appendChild(s('g', null,
          s('circle', { class: 'dg-node' + crit, cx: c[0], cy: c[1], r: circle.r }),
          s('text', { class: 'dg-name', x: c[0], y: c[1] + 4, 'text-anchor': 'middle' }, k),
          s('text', { class: 'dg-small', x: c[0], y: c[1] - 23, 'text-anchor': 'middle' }, early[k] + ' | ' + late[k])));
      });
    }

    var cp = r.critical.map(function (p) { return p.join('-'); }).join(' dan ');
    return h('figure', { class: 'diagram' },
      h('div', { class: 'diagram-scroll' }, svg),
      h('figcaption', { class: 'small muted' }, 'Garis tebal = critical path ' + cp + ', durasi ' + r.duration + '. ' +
        (aon ? 'Isi kotak: ES dan EF di atas, LS dan LF di bawah.' : 'Angka di atas lingkaran: waktu paling awal | waktu paling lambat node itu.')));
  }

  // Chromosome rows, e.g. parents and offspring of a crossover.
  // spec: { pos?: true, rows: [{ label, genes: 'ABCDEF' | [...], mark?: [positions], mark2?: [positions], note? }], caption? }
  // mark highlights genes (a copied segment, a mutated bit); mark2 is a second colour (genes from the other parent).
  function genes(spec) {
    var list = function (g) { return typeof g === 'string' ? g.split('') : g; };
    var n = Math.max.apply(null, spec.rows.map(function (r) { return list(r.genes).length; }));
    var rows = spec.rows.map(function (r) {
      return h('div', { class: 'gene-row' }, h('span', { class: 'gene-label' }, r.label),
        list(r.genes).map(function (g, i) {
          var on = r.mark && r.mark.indexOf(i + 1) >= 0, alt = r.mark2 && r.mark2.indexOf(i + 1) >= 0;
          return h('span', { class: 'gene' + (on ? ' on' : alt ? ' alt' : '') }, String(g));
        }),
        r.note ? h('span', { class: 'gene-note small muted' }, r.note) : null);
    });
    if (spec.pos) {
      var nums = [];
      for (var i = 1; i <= n; i++) nums.push(h('span', { class: 'gene' }, String(i)));
      rows.unshift(h('div', { class: 'gene-row gene-pos' }, h('span', { class: 'gene-label' }, 'posisi'), nums));
    }
    return h('figure', { class: 'diagram' },
      h('div', { class: 'diagram-scroll' }, h('div', { class: 'genes' }, rows)),
      spec.caption ? h('figcaption', { class: 'small muted' }, spec.caption) : null);
  }

  // Roulette wheel drawn as one bar: each slice is as wide as its probability, arrows mark the random numbers r.
  // spec: { items: [{ label, p }], r?: [numbers] }
  function wheel(spec) {
    var W = 640, x0 = 20, len = 600, y = 44, bh = 30;
    var svg = s('svg', { class: 'dg', viewBox: '0 0 ' + W + ' 112', width: W, height: 112, role: 'img', 'aria-label': 'Roulette wheel' });
    var at = 0, dec = function (v) { return v.toFixed(4).replace('.', ','); };
    spec.items.forEach(function (it, i) {
      var w = it.p * len, x = x0 + at * len;
      svg.appendChild(s('rect', { class: 'wh wh' + (i % 4), x: x, y: y, width: w, height: bh }));
      if (w > 44) svg.appendChild(s('text', { class: 'dg-name', x: x + w / 2, y: y + 19, 'text-anchor': 'middle' }, it.label));
      at += it.p;
      svg.appendChild(s('text', { class: 'dg-small', x: x0 + at * len, y: y + bh + 16, 'text-anchor': i === spec.items.length - 1 ? 'end' : 'middle' }, dec(at)));
    });
    svg.appendChild(s('text', { class: 'dg-small', x: x0, y: y + bh + 16, 'text-anchor': 'start' }, '0'));
    (spec.r || []).forEach(function (r, i) {
      var x = x0 + r * len, ty = i % 2 ? 14 : 28;
      svg.appendChild(s('line', { class: 'dg-edge', x1: x, y1: ty + 4, x2: x, y2: y - 2 }));
      svg.appendChild(s('polygon', { class: 'dg-head', points: [[x, y], [x - 4, y - 7], [x + 4, y - 7]].join(' ') }));
      svg.appendChild(s('text', { class: 'dg-small', x: x, y: ty, 'text-anchor': 'middle' }, 'r = ' + r.toFixed(2).replace('.', ',')));
    });
    return h('figure', { class: 'diagram' },
      h('div', { class: 'diagram-scroll' }, svg),
      h('figcaption', { class: 'small muted' }, 'Lebar irisan = probabilitas seleksi. Angka di bawah = kumulatif; kromosom terpilih adalah irisan tempat r jatuh.'));
  }

  root.Diagram = { wbs: wbs, net: net, genes: genes, wheel: wheel };
})(this);
