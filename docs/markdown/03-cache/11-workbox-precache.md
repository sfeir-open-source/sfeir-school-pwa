<!-- .slide: class="with-code" data-background="#fb8c00" -->

# Precache

<!-- .element: style="color:white" -->

```javascript
workbox.precaching.precacheAndRoute([
  '/styles/example.ac29.css',
  { url: '/index.html', revision: 'abcd1234' }
  // ... other entries ...
]);
const cache = await caches.open(workbox.core.cacheNames.precache);
const response = await cache.match(workbox.precaching.getCacheKeyForURL('/index.html'));
```

<!-- .element: class="big-code" -->

Notes:

- Ajoutes les fichiers dans un pendant la phase d'install
- cache-first strategie
