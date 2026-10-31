// Small DOM helpers shared by every view.
(function (root) {
  function append(el, kids) {
    kids.forEach(function (k) {
      if (k == null || k === false) return;
      if (Array.isArray(k)) append(el, k);
      else el.appendChild(typeof k === 'object' ? k : document.createTextNode(String(k)));
    });
  }

  function setProps(el, props) {
    Object.keys(props || {}).forEach(function (k) {
      var v = props[k];
      if (v == null || v === false) return;
      if (k === 'class') el.setAttribute('class', v);
      else if (k === 'text') el.textContent = v;
      else if (k.indexOf('on') === 0) el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v === true ? '' : v);
    });
  }

  function h(tag, props) {
    var el = document.createElement(tag);
    setProps(el, props);
    append(el, [].slice.call(arguments, 2));
    return el;
  }

  function s(tag, props) {
    var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    setProps(el, props);
    append(el, [].slice.call(arguments, 2));
    return el;
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function pct(x) { return Math.round(x * 100) + '%'; }

  function clock(sec) {
    sec = Math.max(0, Math.round(sec));
    var m = Math.floor(sec / 60), r = sec % 60;
    return m + ':' + (r < 10 ? '0' : '') + r;
  }

  function date(ts) {
    var d = new Date(ts);
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }) + ' ' +
      d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  }

  // Segmented control; onPick receives the chosen value.
  function seg(values, current, onPick, labels) {
    var box = h('div', { class: 'seg', role: 'group' });
    values.forEach(function (v, i) {
      box.appendChild(h('button', {
        type: 'button', 'aria-pressed': String(v === current),
        onclick: function () {
          [].forEach.call(box.children, function (b) { b.setAttribute('aria-pressed', 'false'); });
          this.setAttribute('aria-pressed', 'true');
          onPick(v);
        }
      }, labels ? labels[i] : String(v)));
    });
    return box;
  }

  root.UI = { h: h, s: s, shuffle: shuffle, pct: pct, clock: clock, date: date, seg: seg };
})(this);
