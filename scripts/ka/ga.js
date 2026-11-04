// GA helpers used to compute every key in the generated question files.
const sum = a => a.reduce((s, x) => s + x, 0);
const round = (x, d) => Math.round(x * 10 ** d) / 10 ** d;
// Indonesian number text: decimal comma, dot thousands for integers.
function id(x, d) {
  if (d == null) {
    if (Number.isInteger(x)) return String(x).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    d = 4;
  }
  const s = round(x, d).toFixed(d);
  const [i, f] = s.split('.');
  const ii = i.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return f ? ii + ',' + f : ii;
}
function decode(bits, lo, hi) {
  const d = parseInt(bits, 2);
  return { d, x: lo + (hi - lo) / (2 ** bits.length - 1) * d };
}
function wheel(fits) {
  const tot = sum(fits);
  const p = fits.map(f => f / tot);
  let c = 0;
  const cum = p.map(v => (c += v));
  cum[cum.length - 1] = 1;
  return { tot, p, cum };
}
// First individual whose cumulative probability reaches r.
const pick = (cum, r) => cum.findIndex(c => c >= r - 1e-12);
// Single-point crossover after gene k (strings or arrays).
function cross1(a, b, k) {
  return [a.slice(0, k).concat(b.slice(k)), b.slice(0, k).concat(a.slice(k))];
}
function cross2(a, b, i, j) { // swap genes i..j (1-based, inclusive)
  const A = a.split(''), B = b.split('');
  const o1 = A.slice(), o2 = B.slice();
  for (let k = i - 1; k < j; k++) { o1[k] = B[k]; o2[k] = A[k]; }
  return [o1.join(''), o2.join('')];
}
function uniform(a, b, mask, oneFrom) { // oneFrom = 'P1' | 'P2': which parent a 1 takes from, for offspring 1
  const o1 = [], o2 = [];
  for (let k = 0; k < a.length; k++) {
    const one = mask[k] === '1';
    const fromA = oneFrom === 'P1' ? one : !one;
    o1.push(fromA ? a[k] : b[k]); o2.push(fromA ? b[k] : a[k]);
  }
  return [o1.join(''), o2.join('')];
}
const flip = (bits, g) => bits.slice(0, g - 1) + (bits[g - 1] === '1' ? '0' : '1') + bits.slice(g);
const setGene = (arr, g, v) => { const o = arr.slice(); o[g - 1] = v; return o; };

// Order crossover as in the slides: copy P1[a..b], read P2 from position b+1 (wrapping),
// skip genes already copied, fill positions b+1..n then 1..a-1.
function ox(p1, p2, a, b) {
  const n = p1.length, child = new Array(n).fill(null);
  for (let k = a - 1; k < b; k++) child[k] = p1[k];
  const seg = p1.slice(a - 1, b);
  const read = [];
  for (let k = 0; k < n; k++) read.push(p2[(b + k) % n]);
  const rest = read.filter(g => !seg.includes(g));
  const slots = [];
  for (let k = 0; k < n; k++) { const pos = (b + k) % n; if (child[pos] === null) slots.push(pos); }
  slots.forEach((pos, k) => { child[pos] = rest[k]; });
  return { child, read, rest };
}
// Partially mapped crossover as in the slides: copy P1[a..b]; outside it take P2's gene,
// and while that gene is already in the segment, replace it through the mapping P1seg[i] -> P2seg[i].
function pmx(p1, p2, a, b) {
  const n = p1.length, child = new Array(n).fill(null);
  const s1 = p1.slice(a - 1, b), s2 = p2.slice(a - 1, b);
  for (let k = a - 1; k < b; k++) child[k] = p1[k];
  const chains = [];
  for (let k = 0; k < n; k++) {
    if (child[k] !== null) continue;
    let v = p2[k];
    const path = [v];
    while (s1.includes(v)) { v = s2[s1.indexOf(v)]; path.push(v); }
    child[k] = v;
    if (path.length > 1) chains.push({ pos: k + 1, path });
  }
  return { child, map: s1.map((g, i) => [g, s2[i]]), chains };
}
function tourLen(tour, D) {
  let L = 0;
  for (let k = 0; k < tour.length; k++) L += D[tour[k]][tour[(k + 1) % tour.length]];
  return L;
}
// Symmetric distance table from 'AB 12' style lines.
function dist(lines) {
  const D = {};
  for (const l of lines) {
    const [pair, w] = l.split(' ');
    const [u, v] = pair.split('');
    (D[u] = D[u] || {})[v] = +w; (D[v] = D[v] || {})[u] = +w;
  }
  return D;
}
function distTable(cities, D) {
  return { head: [''].concat(cities), rows: cities.map(u => [u].concat(cities.map(v => (u === v ? '-' : D[u][v])))) };
}
// Timetable conflicts: pairs [exam1, exam2, students]; slots is a string or array, one slot per exam in exam order.
function clashes(slots, exams, pairs) {
  const s = typeof slots === 'string' ? slots.split('') : slots;
  return sum(pairs.filter(([u, v]) => s[exams.indexOf(u)] === s[exams.indexOf(v)]).map(p => p[2]));
}
function clashList(slots, exams, pairs) {
  const s = typeof slots === 'string' ? slots.split('') : slots;
  return pairs.filter(([u, v]) => s[exams.indexOf(u)] === s[exams.indexOf(v)]);
}
const swap = (t, i, j) => { const o = t.slice(); [o[i - 1], o[j - 1]] = [o[j - 1], o[i - 1]]; return o; };
const invert = (t, i, j) => t.slice(0, i - 1).concat(t.slice(i - 1, j).reverse(), t.slice(j));
const insert = (t, from, to) => { const o = t.slice(); const [g] = o.splice(from - 1, 1); o.splice(to - 1, 0, g); return o; };
function edges(t) {
  const s = new Set();
  for (let k = 0; k < t.length; k++) { const e = [t[k], t[(k + 1) % t.length]].sort().join(''); s.add(e); }
  return s;
}
const broken = (a, b) => [...edges(a)].filter(e => !edges(b).has(e)).length;
const fact = n => (n <= 1 ? 1 : n * fact(n - 1));

module.exports = { sum, round, id, decode, wheel, pick, cross1, cross2, uniform, flip, setGene, ox, pmx, tourLen, dist, distTable, clashes, clashList, swap, invert, insert, edges, broken, fact };
