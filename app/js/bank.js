// Registry for question data. Data files call these before app.js runs.
(function (root) {
  var bank = { courses: {}, mcq: [], isian: [], materi: {} };

  function course(id, meta) {
    bank.courses[id] = Object.assign({ id: id }, meta);
  }

  // items: { q, a, w: [wrong...], ex }
  function mcq(courseId, topicId, topic, items) {
    items.forEach(function (it, i) {
      bank.mcq.push(Object.assign({
        id: courseId + '-' + topicId + '-' + (i + 1),
        course: courseId,
        topic: topic,
        type: 'mcq'
      }, it));
    });
  }

  // items: { type: 'short'|'num'|'essay'|'tool', q, ... } (see isian.js)
  // A null entry keeps the slot of a removed item, so the ids after it stay the same.
  function isian(courseId, topicId, topic, items) {
    items.forEach(function (it, i) {
      if (!it) return;
      bank.isian.push(Object.assign({
        id: courseId + '-' + topicId + '-' + (i + 1),
        course: courseId,
        topic: topic
      }, it));
    });
  }

  // Items in the course's Uraian & Isian tab, kept out of the normal practice pool.
  function uraian(courseId, topicId, topic, items) {
    isian(courseId, topicId, topic, items.map(function (it) {
      return Object.assign({ section: 'uraian' }, it);
    }));
  }

  // weeks: { minggu, judul, hlm, ringkas, label?, bagian: [{ h, poin?, tabel?, ingat?, soal?, wbs?, net? }] }
  function materi(courseId, weeks) {
    bank.materi[courseId] = weeks;
  }

  var api = { data: bank, course: course, mcq: mcq, isian: isian, uraian: uraian, materi: materi };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.BANK = api;
})(this);
