self.addEventListener('install', _ => console.log('event install'));

self.addEventListener('activate', _ => console.log('event activate'));

self.addEventListener('message', event => {
  console.log('SW Received Message: ' + event.data);
  event.ports[0].postMessage('Ok, message received');
});
