console.log('Service worker ok =D');

self.addEventListener('install', _ => console.log('event install'));

self.addEventListener('activate', _ => console.log('event activate'));
