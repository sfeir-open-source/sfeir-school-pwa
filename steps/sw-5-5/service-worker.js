console.log("Service worker ok =D");

var cacheAppShellStatic = [
  "/",
  "/index.html",
  "/mdl/material.min.css",
  "/mdl/material.min.js",
  "/css/material-icons.css",
  "/css/md-overwrite.css",
  "/css/font/MaterialIcons-Regular.woff2",
  "/img/logo-app.png",
  "/offline.html"
];

self.addEventListener("install", function(event) {
  console.log("event install");
  event.waitUntil(
    caches
      .open("cache-static")
      .then(function(cache) {
        return cache.addAll(cacheAppShellStatic);
      })
      .then(function() {
        return self.skipWaiting();
      })
  );
});


self.addEventListener('activate', function (event) {
  console.log('event activate');
  event.waitUntil(

    // exercice 5-5: update this section and add your code here
    self.clients.claim()
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request).then(function(responseFetch) {

        return caches.open('cache-dynamic').then(function (cache) {
          cache.put(event.request, responseFetch.clone());
          return responseFetch;
        });

      }).catch(function() {
        return event.respondWith(caches.match(new Request('offline.html')));
      });
    })
  );
});
