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

##==##

# Autres utilisations

- Bundler : Webpack, Rollup, Gulp...

  ```javascript
  // These JavaScript module imports need to be bundled:
  import { precacheAndRoute } from 'workbox-precaching';
  import { registerRoute } from 'workbox-routing';
  import { CacheFirst } from 'workbox-strategies';

  // Use the imported Workbox libraries to implement caching,
  // routing, and other logic:
  precacheAndRoute(self.__WB_MANIFEST);
  registerRoute(({ request }) => request.destination === 'image', new CacheFirst({ cacheName: 'images' }));

  // Etc.
  ```

  <!-- .element: class="big-code" -->

- En ligne de commande

  - installation en global

  ```
  npm install workbox-cli --global
  ```

  <!-- .element: class="big-code" -->

##==##

# CLI

- lancer le wizard
  ```
  workbox wizard
  ```
  <!-- .element: class="big-code" -->
- créer le Manifest

  ```
  workbox injectManifest
  ```

    <!-- .element: class="big-code" -->

  - ajouter au préalable :

  ```
  import {precacheAndRoute} from 'workbox-precaching';

  precacheAndRoute(self.__WB_MANIFEST);
  ```

  <!-- .element: class="big-code" -->

Notes:
