<!-- .slide: class="transition bg-green" -->

# Cache First

##==##

# Stratégies de cache : Cache-first

![center h-800](./assets/images/cache-strategy-cache-first.png)
Notes:
D'abord le cache, et si pas trouvé, network

##==##

<!-- .slide: class="with-code" -->

# Cache-first : récupération

service-worker.js

```javascript
self.addEventListener('fetch', event => {
  event.respondWith(
    caches
      .match(event.request) //
      .then(response => response || fetch(event.request))
  );
});
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code" -->

# Cache-first : mise en cache

service-worker.js

```javascript
self.addEventListener('fetch', event => {
  event.respondWith(
    // caches.match...
    fetch(event.request).then(responseFetch =>
      caches.open('cache-dynamic').then(cache => {
        cache.put(event.request, responseFetch.clone());
        return responseFetch;
      })
    )
  );
});
```

##==##

<!-- .slide: class="exercice" -->

# Cache First

## Exercice

<br>

1. Mettre en place une stratégie cache first.
1. On va utiliser cette stratégie pour tout appel à des images de type "jpg"

### Step: cs-cache-first-1

##==##

<!-- .slide: class="with-code" -->

# Cache-first : Avec Workbox

service-worker.js

```javascript
import { registerRoute } from 'workbox-routing';
import { CacheFirst } from 'workbox-strategies';

// Cache images with a Cache First strategy
registerRoute(
  // Check to see if the request's destination is style for an image
  ({ request }) => request.destination === 'image',
  // Use a Cache First caching strategy
  new CacheFirst({
    // Put all cached files in a cache named 'images'
    cacheName: 'images'
  })
);
```

<!-- .element: class="big-code" -->

Notes:
On va en général dédié ça à une stratégie bien particulière exemple les images

##==##

<!-- .slide: class="exercice" -->

# Cache First avec Workbox

## Exercice

<br>

1. Mettre en place une stratégie cache first.
1. On va utiliser cette stratégie pour tout appel à des images de type "jpg"

### Step: cs-cache-first-2

##==##

<!-- .slide: class="transition bg-white" -->

# Avec les frameworks

##==##

<!-- .slide: class="with-code" -->

# Avec Angular

En utilisant la schematics `@angular/pwa` et en configurant le `ngsw-worker.js`

```json
{
  "index": "/index.html",
  "assetGroups": [
    {
      "name": "images",
      "installMode": "lazy",
      "updateMode": "prefetch",
      "resources": {
        "files": ["**.jpg"]
      }
    }
  ]
}
```

<!-- .element: class="big-code" -->

Notes:
Ce mode là n'est prévu que pour des choses fonctionnant sans appels serve
