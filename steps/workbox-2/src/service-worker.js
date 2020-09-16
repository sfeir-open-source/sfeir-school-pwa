importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

workbox.routing.registerRoute(
  new RegExp('.*.(?:png|jpg|jpeg|svg|gif)'),
  new workbox.strategies.CacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 20,
        maxAgeSeconds: 7 * 24 * 60 * 60
      })
    ]
  })
);

workbox.routing.registerRoute(
  new RegExp('.css'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'css-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 20,
        maxAgeSeconds: 7 * 24 * 60 * 60
      })
    ]
  })
);
