self.addEventListener('install', _ => console.log('event install'));

self.addEventListener('activate', _ => console.log('event activate'));

self.addEventListener('message', event => {
  console.log('SW Received Message: ', event.data);
  self.clients.matchAll().then(clients => clients.map(client => client.postMessage('Hello back !')));
});
