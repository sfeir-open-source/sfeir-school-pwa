console.log('Service worker ok =D');

self.addEventListener('install', event => {
  console.log('event install');
});

self.addEventListener('activate', event => {
  console.log('event activate');
});
