// Registry for question data. Data files call these before app.js runs.
(function (root) {
  var bank = { courses: {}, mcq: [], isian: [] };

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
  function isian(courseId, topicId, topic, items) {
    items.forEach(function (it, i) {
      bank.isian.push(Object.assign({
        id: courseId + '-' + topicId + '-' + (i + 1),
        course: courseId,
        topic: topic
      }, it));
    });
  }

  var api = { data: bank, course: course, mcq: mcq, isian: isian };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.BANK = api;
})(this);
