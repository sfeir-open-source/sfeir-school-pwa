console.log('Service worker ok =D');

self.addEventListener('install', function (event) {
  console.log('event install');
  event.waitUntil(
    self.skipWaiting()
  );
});

self.addEventListener('activate', function (event) {
  console.log('event activate');
  event.waitUntil(
    self.clients.claim()
  );
});

self.addEventListener('fetch', function (event) {
  if (event.request.url.endsWith('jpg')) {
    event.respondWith(fetch('/img/cat.jpg'));
  }
});
