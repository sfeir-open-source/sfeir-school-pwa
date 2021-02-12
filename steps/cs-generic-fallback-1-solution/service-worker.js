console.log('Service worker ok =D');

const cacheAppShellStatic = [
  '/',
  '/index.html',
  '/mdl/material.min.css',
  '/mdl/material.min.js',
  '/css/app.css',
  '/css/material-icons.css',
  '/css/md-overwrite.css',
  '/css/font/MaterialIcons-Regular.woff2',
  '/img/logo-app.png',
  '/img/cat.jpg',
  '/img/favicon.ico',
  '/home',
  '/people',
  '/bundle.js'
];

self.addEventListener('install', event => {
  console.log('event install');
  event.waitUntil(
    caches
      .open('cache-static')
      .then(cache => cache.addAll(cacheAppShellStatic))
      .then(_ => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  console.log('event activate');
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  if (event.request.url.endsWith('jpg')) {
    event.respondWith(
      caches
        .match(event.request) //
        .then(response => response || fetch(event.request)) //
        .catch(_ => caches.match('/img/cat.jpg'))
    );
  } else {
    event.respondWith(
      caches
        .open('cache-dynamic') //
        .then(cache =>
          cache.match(event.request).then(response => {
            return (
              response ||
              fetch(event.request).then(fetchResponse => {
                const clonedResponse = fetchResponse.clone();
                cache.put(event.request, clonedResponse);
                return fetchResponse;
              })
            );
          })
        )
    );
  }
});
