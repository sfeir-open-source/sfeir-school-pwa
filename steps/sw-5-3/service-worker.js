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

self.addEventListener("activate", function(event) {
  console.log("event activate");
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    // exercice 5-3: add your code here
    // hint: fetch return a promise ;)
  );
});
