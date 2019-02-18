console.log('Service worker ok =D');

self.addEventListener('install', function (event) {
  console.log('event install');
});

self.addEventListener('activate', function (event) {
  console.log('event activate');
});
