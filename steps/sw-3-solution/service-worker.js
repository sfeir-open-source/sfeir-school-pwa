console.log('Service worker ok =D');

self.addEventListener('install', event => {
  console.log('event install');
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', event => {
  console.log('event activate');
  event.waitUntil(self.clients.claim());
});
