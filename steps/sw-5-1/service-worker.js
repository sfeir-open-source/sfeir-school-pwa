console.log('Service worker ok =D');

const cacheAppShellStatic = [
  // exercice 5-1: add files here
];

self.addEventListener('install', event => {
  console.log('event install');
  event.waitUntil(
    // exercice 5-1: update this section and add your code here
    self.skipWaiting()
  );
});

self.addEventListener('activate', event => {
  console.log('event activate');
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  console.log('fetch:' + url);
});
