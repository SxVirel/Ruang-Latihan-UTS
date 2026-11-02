// Session composition for courses with a fixed exam shape (see mix in courses.js).
// Pure functions, shared by the app and the tests.
(function (root) {
  // How many items of each type the pool holds.
  function counts(pool) {
    var out = {};
    pool.forEach(function (it) { out[it.type] = (out[it.type] || 0) + 1; });
    return out;
  }

  // True when the pool can fill every type the course asks for.
  function ready(course, pool) {
    if (!course || !course.mix) return false;
    var have = counts(pool);
    return Object.keys(course.mix).every(function (type) {
      return (have[type] || 0) >= course.mix[type];
    });
  }

  // One session: course.mix[type] items of each type, shuffled together so the
  // order no longer follows the type. Returns null when the pool is too small.
  function compose(course, pool, shuffle) {
    if (!ready(course, pool)) return null;
    var picked = [];
    Object.keys(course.mix).forEach(function (type) {
      var of = pool.filter(function (it) { return it.type === type; });
      picked = picked.concat(shuffle(of).slice(0, course.mix[type]));
    });
    return shuffle(picked);
  }

  // Seconds a whole session should get, used for the exam-mode timer preview.
  function seconds(course, secsOf) {
    return Object.keys(course.mix).reduce(function (sum, type) {
      return sum + course.mix[type] * secsOf(type);
    }, 0);
  }

  var api = { counts: counts, ready: ready, compose: compose, seconds: seconds };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.Session = api;
})(this);
