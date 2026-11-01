// Offline copy for the hosted app. Network first, so new questions appear whenever the phone is online.
var CACHE = 'latihan-uts-v1';
var FILES = [
  './', 'index.html', 'css/style.css', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png',
  'js/bank.js', 'js/check.js', 'js/store.js', 'js/ui.js', 'js/quiz.js', 'js/tools-ui.js', 'js/app.js',
  'js/tools/clocks.js', 'js/tools/chord.js', 'js/tools/consistency.js', 'js/tools/cpm.js',
  'data/courses.js', 'data/ks-1.js', 'data/ks-2.js', 'data/ks-3.js', 'data/ks-4.js', 'data/ks-5.js',
  'data/ks-6.js', 'data/ks-7.js', 'data/ks-8.js', 'data/ks-9.js', 'data/ks-10.js', 'data/ks-materi.js',
  'data/ka.js', 'data/ca.js', 'data/fd.js', 'data/mp.js', 'data/schedule.js'
];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(FILES); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  e.respondWith(fetch(e.request).then(function (res) {
    var copy = res.clone();
    if (res.ok) caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
    return res;
  }).catch(function () {
    return caches.match(e.request, { ignoreSearch: true });
  }));
});
