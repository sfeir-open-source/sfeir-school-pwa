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
  console.log(event.request.url, new URL(event.request.url));
  if (new URL(event.request.url).pathname.startsWith('/api')) {
    event.respondWith(fetch(event.request));
  } else {
    event.respondWith(
      caches
        .open('cache-static') //
        .then(cache => cache.match(event.request))
    );
  }
});
