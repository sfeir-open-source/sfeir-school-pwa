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
  if (event.request.url.endsWith('Paris')) {
    event.respondWith(
      caches.open('dynamic').then(cache =>
        fetch(event.request).then(response => {
          cache.put(event.request, response.clone());
          return response;
        })
      )
    );
  } else {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  }
});
