console.log('Service worker ok =D');
self.importScripts('https://cdn.jsdelivr.net/npm/idb@4.0.5/build/iife/with-async-ittr-min.js');

const cacheAppShellStatic = [
  '/',
  'mocks/notification.json',
  //'http://localhost:3000/people',
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
  '/css/font/MaterialIcons-Regular.woff2'
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
  } else if (url.port === '3000') {
    return fetch(event.request);
  } else {
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

function upgrade(db) {
  db.createObjectStore('request');
}

async function cleanRequest(id) {
  const db = await idb.openDB('failedRequestDB', 1, {
    upgrade: upgrade
  });

  await db.delete('request', id);
}

async function getFailedRequest() {
  const db = await idb.openDB('failedRequestDB', 1, {
    upgrade: upgrade
  });

  let cursor = await db.transaction('request').store.openCursor();

  const requestArray = [];
  while (cursor) {
    console.log(cursor.key, cursor.value);
    requestArray.push({ id: cursor.key, value: cursor.value });
    cursor = await cursor.continue();
  }
  return requestArray;
}

self.addEventListener('sync', async function(event) {
  if (event.tag === 'syncUser') {
    event.waitUntil(
      new Promise(async (resolve, reject) => {
        const requestArray = await getFailedRequest();
        let error = undefined;
        if (requestArray) {
          for (let request of requestArray) {
            try {
              await fetch(request.value.url, request.value.options);
              await cleanRequest(request.id);
            } catch (e) {
              error = e;
              console.error(e);
            }
          }
        }
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      })
    );
  }
});
