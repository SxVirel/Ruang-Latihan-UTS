// Writes question objects as plain JS in the style of the hand-written data files.
function str(s) {
  return "'" + String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n') + "'";
}
function inline(v) {
  if (v === null) return 'null';
  if (typeof v === 'number') return String(v);
  if (typeof v === 'boolean') return String(v);
  if (typeof v === 'string') return str(v);
  if (Array.isArray(v)) return '[' + v.map(inline).join(', ') + ']';
  return '{ ' + Object.keys(v).filter(k => v[k] !== undefined).map(k => k + ': ' + inline(v[k])).join(', ') + ' }';
}
function lit(v, ind) {
  const one = inline(v);
  if (one.length + ind.length <= 118 || typeof v !== 'object' || v === null) return one;
  const pad = ind + '  ';
  if (Array.isArray(v)) return '[\n' + v.map(x => pad + lit(x, pad)).join(',\n') + '\n' + ind + ']';
  const keys = Object.keys(v).filter(k => v[k] !== undefined);
  return '{ ' + keys.map((k, i) => (i ? pad : '') + k + ': ' + lit(v[k], pad)).join(',\n') + ' }';
}
function topic(course, t) {
  return "BANK.isian('" + course + "', '" + t.id + "', " + str(t.name) + ', [\n' +
    t.items.map(it => '  ' + lit(it, '  ')).join(',\n') + '\n]);\n';
}
module.exports = { topic, lit, str };
