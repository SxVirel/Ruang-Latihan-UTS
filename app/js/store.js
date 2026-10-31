// Progress storage: session history, per-item record, and the wrong-answer bank.
(function (root) {
  var KEY = 'uts-study-v1';
  var memory = null;

  function empty() { return { history: [], items: {} }; }

  function load() {
    if (memory) return memory;
    try {
      var raw = root.localStorage.getItem(KEY);
      memory = raw ? JSON.parse(raw) : empty();
      if (!memory.history || !memory.items) memory = empty();
    } catch (e) {
      memory = empty();
    }
    return memory;
  }

  function save() {
    try { root.localStorage.setItem(KEY, JSON.stringify(memory)); } catch (e) { /* storage blocked: keep in memory */ }
    if (root.dispatchEvent) root.dispatchEvent(new Event('study-progress'));
  }

  // An item enters the bank when answered wrong and leaves after two correct answers in a row.
  function recordItem(id, ok) {
    var db = load();
    var it = db.items[id] || (db.items[id] = { seen: 0, right: 0, streak: 0, bank: false });
    it.seen++;
    if (ok) {
      it.right++;
      it.streak++;
      if (it.bank && it.streak >= 2) it.bank = false;
    } else {
      it.streak = 0;
      it.bank = true;
    }
    it.last = Date.now();
    save();
  }

  function recordSession(s) {
    var db = load();
    db.history.push(Object.assign({ at: Date.now() }, s));
    if (db.history.length > 400) db.history = db.history.slice(-400);
    save();
  }

  function bankIds(courseId) {
    var db = load();
    return Object.keys(db.items).filter(function (id) {
      return db.items[id].bank && (!courseId || id.indexOf(courseId + '-') === 0);
    });
  }

  function item(id) { return load().items[id] || null; }
  function history(courseId) {
    return load().history.filter(function (h) { return !courseId || h.course === courseId; });
  }

  function reset() {
    memory = empty();
    save();
  }

  root.Store = { load: load, recordItem: recordItem, recordSession: recordSession, bankIds: bankIds, item: item, history: history, reset: reset };
})(this);
