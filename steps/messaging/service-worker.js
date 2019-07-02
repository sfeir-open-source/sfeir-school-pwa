self.addEventListener('install', function(event) {
  console.log('event install');
});

self.addEventListener('activate', function(event) {
  console.log('event activate');
});

// Listen message event and answer back.
