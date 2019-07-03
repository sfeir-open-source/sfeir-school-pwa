self.addEventListener('install', function(event) {
  console.log('event install');
});

self.addEventListener('activate', function(event) {
  console.log('event activate');
});

self.addEventListener('message', function(event) {
  console.log('SW Received Message: ' + event.data);
  event.ports[0].postMessage('Ok, message received');
});
