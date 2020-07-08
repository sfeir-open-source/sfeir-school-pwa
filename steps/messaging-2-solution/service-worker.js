self.addEventListener('install', event => {
  console.log('event install');
});

self.addEventListener('activate', event => {
  console.log('event activate');
});

self.addEventListener('message', event => {
  console.log('SW Received Message: ' + event.data);
  event.ports[0].postMessage('Ok, message received');
});
