console.log('Service worker ok =D');

const cacheAppShellStatic = [
  '/',
  'mocks/notification.json',
  'http://localhost:3000/api/people',
  'manifest/manifest.json',
  '/index.html',
  '/css/app.css',
  '/img/bg_left.png',
  '/img/bg_right.png',
  '/img/cat.jpg',
  '/img/logo-sfeir.svg',
  '/img/offline.jpg',
  '/img/search.svg',
  '/mdl/material.min.css',
  '/mdl/material.min.js',
  '/css/material-icons.css',
  '/css/md-overwrite.css',
  '/css/font/MaterialIcons-Regular.woff2',
  '/offline.html',
  '/home',
  '/people'
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
  event.waitUntil(self.clients.claim().then(_ => caches.delete('cache-dynamic')));
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  const catImage = 'img/cat.jpg';
  const offlineFile = 'offline.html';

  if (url.pathname.includes('socket.io') || url.origin.startsWith('chrome-extension')) {
    return false;
  } else {
    if (url.pathname.endsWith('jpg')) {
      event.respondWith(caches.match(new Request(catImage)));
      return false;
    }

    event.respondWith(
      caches.match(event.request).then(response => {
        return (
          response ||
          fetch(event.request)
            .then(responseFetch =>
              caches.open('cache-dynamic').then(cache => {
                cache.put(event.request, responseFetch.clone());
                return responseFetch;
              })
            )
            .catch(_ => event.respondWith(caches.match(new Request(offlineFile))))
        );
      })
    );
  }
});

self.addEventListener('push', event => {
  event.waitUntil(
    self.registration.showNotification('Coucou !', {
      body: 'Je suis un chat !',
      icon: 'img/cat.jpg',
      tag: 'tag'
    })
  );
});
