self.addEventListener('install', function(event) {
  console.log('event install');
});

self.addEventListener('activate', function(event) {
  console.log('event activate');
});

self.addEventListener('message', function(event) {
  console.log('SW Received Message: ', event.data);
  self.clients.matchAll().then(clients => clients.map(client => client.postMessage('Hello back !')));
});
