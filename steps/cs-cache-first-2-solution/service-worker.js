importScripts('http://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');

const cacheAppShellStatic = [
  { url: '/', revision: null },
  { url: '/index.html', revision: null },
  { url: '/mdl/material.min.css', revision: null },
  { url: '/mdl/material.min.js', revision: null },
  { url: '/css/app.css', revision: null },
  { url: '/css/material-icons.css', revision: null },
  { url: '/css/md-overwrite.css', revision: null },
  { url: '/css/font/MaterialIcons-Regular.woff2', revision: null },
  { url: '/img/logo-app.png', revision: null },
  { url: '/img/favicon.ico', revision: null },
  { url: '/home', revision: null },
  { url: '/people', revision: null },
  { url: '/bundle.js', revision: null }
];
workbox.setConfig({
  debug: true
});
workbox.precaching.precacheAndRoute(cacheAppShellStatic);

const matchImg = ({ url, event }) => {
  console.log('MatchImg :', url);
  return url.href.endsWith('jpg');
};

workbox.routing.registerRoute(matchImg, new workbox.strategies.CacheFirst());
