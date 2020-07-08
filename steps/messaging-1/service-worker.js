self.addEventListener('install', event => {
  console.log('event install');
});

self.addEventListener('activate', event => {
  console.log('event activate');
});

// TODO Listen message event and answer back.
