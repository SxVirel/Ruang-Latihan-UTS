// Answer checking for fill-in items. Pure functions, shared by the app and tests.
(function (root) {
  function normText(s) {
    return String(s == null ? '' : s)
      .toLowerCase()
      .normalize('NFKD').replace(/[̀-ͯ]/g, '')
      .replace(/[“”"'`’]/g, '')
      .replace(/[\s,;:.\-–—_/()[\]{}→←↔<>=+*|]+/g, ' ')
      .trim();
  }

  // Sequences like "F C B D E A", "f,c,b,d,e,a" and "FCBDEA" compare equal.
  function compact(s) { return normText(s).replace(/ /g, ''); }

  function parseNumber(s) {
    if (typeof s === 'number') return s;
    var t = String(s == null ? '' : s).trim().replace(/\s+/g, '').replace(/%$/, '');
    if (!t) return NaN;
    if (/^-?\d{1,3}(\.\d{3})+(,\d+)?$/.test(t)) t = t.replace(/\./g, '').replace(',', '.'); // 1.234,5
    else if (/^-?\d+,\d+$/.test(t)) t = t.replace(',', '.');                              // 0,9
    else t = t.replace(/,(?=\d{3}\b)/g, '');                                              // 1,234.5
    if (/^-?\d+\/\d+$/.test(t)) { var f = t.split('/'); return Number(f[0]) / Number(f[1]); }
    return t === '' || isNaN(Number(t)) ? NaN : Number(t);
  }

  // "31.623" and "122,000" are ambiguous: try reading either separator as the decimal point.
  function readings(s) {
    var t = String(s == null ? '' : s).trim().replace(/\s+/g, '').replace(/%$/, '');
    var out = [parseNumber(t)];
    if (/^-?[\d.,]+$/.test(t)) {
      out.push(Number(t.replace(/,/g, '')));                     // dot decimal, comma thousands
      out.push(Number(t.replace(/\./g, '').replace(',', '.')));  // comma decimal, dot thousands
    }
    return out.filter(function (x) { return !isNaN(x); });
  }

  // field: { a: number | string | string[], tol? }
  function checkField(field, input) {
    if (typeof field.a === 'number') {
      var tol = field.tol != null ? field.tol : Math.max(0.01, Math.abs(field.a) * 0.005);
      return readings(input).some(function (x) { return Math.abs(x - field.a) <= tol + 1e-9; });
    }
    var accepted = Array.isArray(field.a) ? field.a : [field.a];
    if (field.set) {
      // Unordered list, e.g. a Pareto front "P2, P5, P6".
      var bag = function (s) { return normText(s).split(' ').filter(Boolean).sort().join(' '); };
      var mine = bag(input);
      return !!mine && accepted.some(function (a) { return bag(a) === mine; });
    }
    if (!compact(input)) return false;
    // Multi-part keys ("1 0 0", "inside attack") keep their boundaries; single tokens
    // ("FCBDEA") also accept spaced input like "F C B D E A".
    return accepted.some(function (a) {
      return normText(a).indexOf(' ') >= 0 ? normText(a) === normText(input) : compact(a) === compact(input);
    });
  }

  function display(field) {
    if (typeof field.a === 'number') return String(field.a).replace('.', ',') + (field.unit ? ' ' + field.unit : '');
    return Array.isArray(field.a) ? field.a[0] : field.a;
  }

  var api = { normText: normText, compact: compact, parseNumber: parseNumber, checkField: checkField, display: display };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.Check = api;
})(this);
