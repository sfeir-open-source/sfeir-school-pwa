console.log('Service worker ok =D');

self.addEventListener('install', event => {
  console.log('event install');

  // your code here
});

self.addEventListener('activate', event => {
  console.log('event activate');

  // your code here
});
