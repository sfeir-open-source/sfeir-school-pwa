console.log('Service worker ok =D');

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

var cacheAppShellStatic = [
  "/",
  "mocks/notification.json",
  "mocks/people.json",
  "manifest/manifest.json",
  "/index.html",
  "/css/app.css",
  "/img/bg_left.png",
  "/img/bg_right.png",
  "/img/cat.jpg",
  "/img/logo-sfeir.svg",
  "/img/offline.jpg",
  "/img/search.svg",
  "/mdl/material.min.css",
  "/mdl/material.min.js",
  "/css/material-icons.css",
  "/css/md-overwrite.css",
  "/css/font/MaterialIcons-Regular.woff2",
  "/offline.html"
];


self.addEventListener('install', function (event) {
  console.log('event install');
  event.waitUntil(
    caches.open('cache-static').then(function (cache) {
      return cache.addAll(cacheAppShellStatic);
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', function (event) {
  console.log('event activate');
  event.waitUntil(
    self.clients.claim().then(function() {
      caches.delete('cache-dynamic')
    })
  );
});

self.addEventListener('fetch', function (event) {
  const url = new URL(event.request.url);
  const catImage = 'img/cat.jpg';
  const offlineFile = 'offline.html';

  if(url.pathname.includes('socket.io')
      || url.origin.startsWith('chrome-extension')){
    return false;
  }
  else {

    if (url.pathname.endsWith('jpg')) {
      event.respondWith(caches.match(new Request(catImage)));
      return false;
    }

    event.respondWith(
      caches.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(responseFetch) {
          return caches.open('cache-dynamic').then(function (cache) {
            cache.put(event.request, responseFetch.clone());
            return responseFetch;
          });
        }).catch(function() {
          return event.respondWith(caches.match(new Request(offlineFile)));
        });
      })
    );
  }

});

self.addEventListener('push', function(event) {
  event.waitUntil(
    self.registration.showNotification('Coucou !', {
      body: 'Je suis un chat !',
      icon: 'img/cat.jpg',
      tag: 'tag'
    })
  );
});

self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.');

  event.notification.close();

  event.waitUntil(
    clients.openWindow('https://developers.google.com/web/')
  );
});
