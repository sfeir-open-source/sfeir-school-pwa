console.log('Service worker ok =D');

var cacheAppShellStatic = [
  "css/font/bold.eot",
  "css/font/bold.ttf",
  "css/font/bold.woff",
  "css/font/light.eot",
  "css/font/light.ttf",
  "css/font/light.woff",
  "css/font/regular.eot",
  "css/font/regular.ttf",
  "css/font/regular.woff",
  "img/404.png",
  "img/bg_left.png",
  "img/bg_right.png",
  "img/cat.jpg",
  "img/favicon.ico",
  "img/icons/icon-128x128.png",
  "img/icons/icon-144x144.png",
  "img/icons/icon-152x152.png",
  "img/icons/icon-192x192.png",
  "img/icons/icon-256x256.png",
  "img/icons/icon-32x32.png",
  "img/logo-sfeir.svg",
  "img/md-cellphone.svg",
  "img/md-email.svg",
  "img/md-github.svg",
  "img/md-install.svg",
  "img/md-linkedin.svg",
  "img/md-map.svg",
  "img/md-phone.svg",
  "img/md-slack.svg",
  "img/md-subscribe.svg",
  "img/md-twitter.svg",
  "img/md-unsubscribe.svg",
  "img/offline.jpg",
  "img/profile.svg",
  "img/randomuser/1.jpg",
  "img/randomuser/10.jpg",
  "img/randomuser/13.jpg",
  "img/randomuser/14.jpg",
  "img/randomuser/16.jpg",
  "img/randomuser/19.jpg",
  "img/randomuser/2.jpg",
  "img/randomuser/20.jpg",
  "img/randomuser/22.jpg",
  "img/randomuser/23.jpg",
  "img/randomuser/25.jpg",
  "img/randomuser/27.jpg",
  "img/randomuser/29.jpg",
  "img/randomuser/3.jpg",
  "img/randomuser/30.jpg",
  "img/randomuser/31.jpg",
  "img/randomuser/32.jpg",
  "img/randomuser/34.jpg",
  "img/randomuser/35.jpg",
  "img/randomuser/37.jpg",
  "img/randomuser/38.jpg",
  "img/randomuser/40.jpg",
  "img/randomuser/41.jpg",
  "img/randomuser/42.jpg",
  "img/randomuser/44.jpg",
  "img/randomuser/46.jpg",
  "img/randomuser/47.jpg",
  "img/randomuser/48.jpg",
  "img/randomuser/49.jpg",
  "img/randomuser/5.jpg",
  "img/randomuser/50.jpg",
  "img/randomuser/51.jpg",
  "img/randomuser/52.jpg",
  "img/randomuser/53.jpg",
  "img/randomuser/54.jpg",
  "img/randomuser/55.jpg",
  "img/randomuser/57.jpg",
  "img/randomuser/58.jpg",
  "img/randomuser/59.jpg",
  "img/randomuser/6.jpg",
  "img/randomuser/60.jpg",
  "img/randomuser/61.jpg",
  "img/randomuser/62.jpg",
  "img/randomuser/63.jpg",
  "img/randomuser/64.jpg",
  "img/randomuser/65.jpg",
  "img/randomuser/66.jpg",
  "img/randomuser/67.jpg",
  "img/randomuser/68.jpg",
  "img/randomuser/69.jpg",
  "img/randomuser/7.jpg",
  "img/randomuser/70.jpg",
  "img/randomuser/73.jpg",
  "img/randomuser/74.jpg",
  "img/randomuser/75.jpg",
  "img/randomuser/77.jpg",
  "img/randomuser/78.jpg",
  "img/randomuser/79.jpg",
  "img/randomuser/80.jpg",
  "img/randomuser/81.jpg",
  "img/randomuser/82.jpg",
  "img/randomuser/83.jpg",
  "img/randomuser/84.jpg",
  "img/randomuser/85.jpg",
  "img/randomuser/86.jpg",
  "img/randomuser/87.jpg",
  "img/randomuser/88.jpg",
  "img/randomuser/9.jpg",
  "img/randomuser/90.jpg",
  "img/randomuser/91.jpg",
  "img/randomuser/92.jpg",
  "img/randomuser/93.jpg",
  "img/randomuser/94.jpg",
  "img/randomuser/95.jpg",
  "img/randomuser/96.jpg",
  "img/randomuser/97.jpg",
  "img/randomuser/98.jpg",
  "img/randomuser/99.jpg",
  "img/search.svg",
  "index.html",
  "/",
  "offline.html",
  "manifest/manifest.json",
  "mocks/notification.json",
  "mocks/people.json"
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

  if (url.pathname.endsWith('jpg')) {
    event.respondWith(caches.match(new Request('img/cat.jpg')));
  }
  else {
    if(url.pathname.includes('socket.io')
        || url.origin.startsWith('chrome-extension')){
      return false;
    }
    event.respondWith(
      caches.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function (responseFetch) {
            return caches.open('cache-dynamic').then(function (cache) {
              cache.put(event.request, responseFetch.clone());
              return responseFetch;
            })
          }).catch(function() {
            return event.respondWith(caches.match(new Request('offline.html')));
          })
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
