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

registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
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

# Avec Angular - pour les assets

En utilisant la schematics `@angular/pwa` et en configurant le `ngsw-worker.js`

```json
{
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
Concernant les assets, ça n'est pas non plus du cache-first comme dans l'état de l'art !!
Install Lazy : lazy does not cache any of the resources up front. Instead, the Angular service worker only caches resources for which it receives requests. This is an on-demand caching mode. Resources that are never requested will not be cached. This is useful for things like images at different resolutions, so the service worker only caches the correct assets for the particular screen and orientation.

Update Prefetch: prefetch tells the service worker to download and cache the changed resources immediately.

##==##

<!-- .slide: class="with-code" -->

# Avec Angular - pour les urls type api

En utilisant la schematics `@angular/pwa` et en configurant le `ngsw-worker.js`

```json
{
  "dataGroups": [
    {
      "name": "api",
      "urls": "/myAPI/*",
      "cacheConfig": {
        "strategy": "performance"
      }
    }
  ]
}
```

<!-- .element: class="big-code" -->

Notes:
performance, the default, optimizes for responses that are as fast as possible. If a resource exists in the cache, the cached version is used, and no network request is made. This allows for some staleness, depending on the maxAge, in exchange for better performance. This is suitable for resources that don't change often; for example, user avatar images.
