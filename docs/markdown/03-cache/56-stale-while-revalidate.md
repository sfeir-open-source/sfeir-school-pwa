<!-- .slide: class="transition bg-green" -->

# Stale While Revalidate

##==##

# Stratégies de cache : Stale-While-Revalidate

![center h-800](./assets/images/cache-strategy-stale-while-revalidate.png)

Notes:
Proche de la version Cache-Then-Network
Si il existe une version en cache, on l'utilise, puis on telecharge la nouvelle version pour la prochaine fois
La différence avec le cache first, est qu'en cache first, on ne cherche pas à mettre à jour le cache avec les données distantes !

##==##

<!-- .slide: class="with-code max-height" -->

# Stale-While-Revalidate : example

service-worker.js

```javascript
self.addEventListener('fetch', event => {
  event.respondWith(







    ...
    )
  );
});
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code max-height" -->

# Stale-While-Revalidate : example

service-worker.js

```javascript
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open('dynamic').then(cache =>
      cache.match(event.request).then(response => {




        ...
      })
    )
  );
});
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code max-height" -->

# Stale-While-Revalidate : example

service-worker.js

```javascript
/*self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open('dynamic').then(cache =>
      cache.match(event.request).then(response => {*/
        const fetchPromise = fetch(event.request).then(networkResponse => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
        ...
      })
    /*)
  );
});*/
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code max-height" -->

# Stale-While-Revalidate : example

service-worker.js

```javascript
//self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open('dynamic').then(cache =>
      cache.match(event.request).then(response => {
        /*const fetchPromise = fetch(event.request).then(networkResponse => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });*/
        return response || fetchPromise;
      })
    )
  );
});
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code max-height" -->

# Stale-While-Revalidate : example

service-worker.js

```javascript
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open('dynamic').then(cache =>
      cache.match(event.request).then(response => {
        const fetchPromise = fetch(event.request).then(networkResponse => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
        return response || fetchPromise;
      })
    )
  );
});
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="exercice" data-type-show="prez" -->

# Stale While Revalidate

## Lab

<br>

1. Utiliser la stratégie Stale While Revalidate sur la home page pour afficher l'heure actuelle via l'api mock : `http://worldtimeapi.org/api/timezone/Europe/Paris`
1. A ne mettre en place uniquement que pour cette url !

### Step: cs-stale-while-revalidate-1

##==##

<!-- .slide: class="with-code" -->

# Stale While Revalidate : Avec Workbox

service-worker.js

```javascript
//import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

registerRoute(
  ..., //
  new StaleWhileRevalidate()
);
```

<!-- .element: class="big-code" -->

Notes:
Toujours aussi simple à mettre en oeuvre

##==##

<!-- .slide: class="exercice" data-type-show="prez" -->

# Cache Then Network avec Workbox

## Lab

<br>

1. Utiliser la stratégie Stale While Revalidate sur la home page pour afficher l'heure actuelle via l'api mock : `http://worldtimeapi.org/api/timezone/Europe/Paris`
1. A ne mettre en place uniquement que pour cette url !

### Step: cs-stale-while-revalidate-2

##==##

<!-- .slide: class="transition bg-white" -->

# Avec les frameworks

##==##

<!-- .slide: class="with-code" -->

# Avec Angular - que pour les urls type api

Non applicable pour les ressources (en même temps, ça n'a pas trop de sens)

```json
{
  "dataGroups": [
    {
      //"name": "api",
      //"urls": "/myAPI/*",
      "cacheConfig": {
        "strategy": "freshness",
        "timeout": 0
      }
    }
  ]
}
```

<!-- .element: class="big-code" -->

Notes:
La combinaison d'un timeout à 0 permet de forcer à redonner le cache en premier.

1. Try to fetch from the network first.
2. If the network request does not complete after 0ms (i.e. immediately), fall back to the cache (ignoring cache age).
3. Once the network request completes, update the cache for future requests.
4. If the resource does not exist in the cache, wait for the network request anyway.
