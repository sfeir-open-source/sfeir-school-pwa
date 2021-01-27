<!-- .slide: class="transition bg-green" -->

# Network First

##==##

# Stratégies de cache : Network-first

![center h-800](./assets/images/cache-strategy-network-first.png)
Notes:
D'abord le réseau, et si erreur, le cache
Donne au utilisateurs en ligne une version fraiche, et en offline une version en cache qui peut être périmée
Peu être génant sur un reseau lent, dû à l'attente d'une erreur réseau pour afficher le caches
Avatars, classement,

##==##

<!-- .slide: class="with-code" -->

# Network-first : example

service-worker.js

```javascript
self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request).catch(_ => caches.match(event.request)));
});
```

<!-- .element: class="big-code" -->

Notes:
Attention, ici, il n'y a pas de gestion de fallback !

##==##

<!-- .slide: class="exercice" -->

# Network First

## Exercice

<br>

1. Mettre en place une stratégie network first.
1. On va utiliser cette stratégie pour tout appel à des images de type "jpg" avec en fallback l'image de chat `'/img/cat.jpg'`

### Step: cs-network-first-1

##==##

<!-- .slide: class="with-code" -->

# Network-first : Avec Workbox

service-worker.js

```javascript
import { registerRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';

registerRoute(
  ({ request }) => request.destination === 'image',
  new NetworkFirst({
    cacheName: 'images'
  })
);
```

<!-- .element: class="big-code" -->

Notes:
Networkd first sera quand même plus adapté à des urls serveur

##==##

<!-- .slide: class="exercice" -->

# Network First avec Workbox

## Exercice

<br>

1. Mettre en place une stratégie network first.
1. On va utiliser cette stratégie pour tout appel à des images de type "jpg"

### Step: cs-network-first-2

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
      "updateMode": "lazy",
      "resources": {
        "files": ["**.jpg"]
      }
    }
  ]
}
```

<!-- .element: class="big-code" -->

Notes:
Concernant les assets, ça n'est pas non plus du network-first comme dans l'état de l'art !!
Install : lazy does not cache any of the resources up front. Instead, the Angular service worker only caches resources for which it receives requests. This is an on-demand caching mode. Resources that are never requested will not be cached. This is useful for things like images at different resolutions, so the service worker only caches the correct assets for the particular screen and orientation.

Update: lazy tells the service worker to not cache those resources. Instead, it treats them as unrequested and waits until they're requested again before updating them. An updateMode of lazy is only valid if the installMode is also lazy.

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
        "strategy": "freshness"
      }
    }
  ]
}
```

<!-- .element: class="big-code" -->

Notes:
ça sera pas exactement ce qu'il nous faut mais ça fera plutôt bien le job

freshness optimizes for currency of data, preferentially fetching requested data from the network. Only if the network times out, according to timeout, does the request fall back to the cache. This is useful for resources that change frequently; for example, account balances.
