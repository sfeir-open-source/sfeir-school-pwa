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
  '/img/cat.jpg',
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
  event.respondWith(fetch(event.request)); // To comment
  // TODO
  //event.respondWith(/* YOUR CODE HERE */);
});
