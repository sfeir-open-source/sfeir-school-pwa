self.addEventListener('install', event => {
  console.log('event install');
});

self.addEventListener('activate', event => {
  console.log('event activate');
});

self.addEventListener('message', event => {
  console.log('SW Received Message: ', event.data);
  self.clients.matchAll().then(clients => clients.map(client => client.postMessage('Hello back !')));
});
