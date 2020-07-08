console.log('Service worker ok =D');

const cacheAppShellStatic = [
  '/',
  '/index.html',
  '/mdl/material.min.css',
  '/mdl/material.min.js',
  '/css/material-icons.css',
  '/css/md-overwrite.css',
  '/css/font/MaterialIcons-Regular.woff2',
  '/img/logo-app.png',
  '/offline.html'
];

self.addEventListener('install', event => {
  console.log('event install');
  event.waitUntil(
    caches
      .open('cache-static')
      .then(cache => {
        return cache.addAll(cacheAppShellStatic);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

self.addEventListener('activate', event => {
  console.log('event activate');
  event.waitUntil(
    // exercice 5-5: update this section and add your code here
    self.clients.claim()
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return (
        response ||
        fetch(event.request)
          .then(responseFetch => {
            return caches.open('cache-dynamic').then(cache => {
              cache.put(event.request, responseFetch.clone());
              return responseFetch;
            });
          })
          .catch(() => {
            return event.respondWith(caches.match(new Request('offline.html')));
          })
      );
    })
  );
});
