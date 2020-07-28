<!-- .slide: class="transition bg-blue" -->

# Strategies de cache

##==##

<!-- .slide: class="flex-row" -->

# Stratégies de cache

<br><br>

- Cache-Only
- Network-Only
- Cache-First
- Network-First
- Cache-Then-Network
- Stale-While-Revalidate
- Generic-Fallback

Notes:
Cache-Only / Network-Only / Cache-First / Network-First / Fallback

##==##

# Stratégies de cache : Cache-only

![center h-800](./assets/images/cache-strategy-cache-only.png)
Notes:
Ideal pour tout ce qui est considéré comme static a une version du site.

Ideal for: Anything you'd consider static to that "version" of your site.
You should have cached these in the install event, so you can depend on them being there.

##==##

<!-- .slide: class="with-code" -->

# Cache-only : example

service-worker.js

```javascript
self.addEventListener('fetch', event => {
  // if a match isn't found in the cache, the response
  // will look like a connection error
  event.respondWith(caches.match(event.request));
});
```

<!-- .element: class="big-code" -->

##==##

# Stratégies de cache : Network-only

![center h-800](./assets/images/cache-strategy-network-only.png)

Notes:
on ne veut pas de cache car l'opération est critique/ne peut pas fonctionner hors ligne.

Si ce n'est qu'une partie de l'application, il est important d'expliquer clairement au niveau de l'interface pourquoi la fonctionnalité n'est pas disponible.

##==##

<!-- .slide: class="with-code" -->

# Network-only : example

service-worker.js

```javascript
self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request));
  // or simply don't call event.respondWith, wich
  // will result in default browser behavior
});
```

<!-- .element: class="big-code" -->

##==##

# Stratégies de cache : Cache-first

![center h-800](./assets/images/cache-strategy-cache-first.png)
Notes:
D'abord le cache, et si pas trouvé, network

##==##

<!-- .slide: class="with-code" -->

# Cache-first : example

service-worker.js

```javascript
self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request).then(response => response || fetch(event.request)));
});
```

<!-- .element: class="big-code" -->

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

##==##

# Stratégies de cache : Cache-Then-Network

![center h-800](./assets/images/cache-strategy-cache-then-network.png)

##==##

<!-- .slide: class="with-code" -->

# Cache-Then-Network : example

service-worker.js

```javascript
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open('dynamic').then(cache =>
      fetch(event.request).then(response => {
        cache.put(event.request, response.clone());
        return response;
      })
    )
  );
});
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code" -->

# Cache-Then-Network : example (suite)

main.js

```javascript
let networkDataReceived = false;
const networkUpdate = fetch('data.json')
  .then(response => response.json())
  .then(data => {
    networkDataReceived = true;
    updatePage(data);
  });
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code" -->

# Cache-Then-Network : example (suite)

main.js

```javascript
caches
  .match('data.json')
  .then(response => {
    if (!response) throw Error('No data');
    return response.json();
  })
  .then(data => {
    if (!networkDataReceived) updatePage(data);
  })
  .catch(_ => networkUpdate);
```

<!-- .element: class="big-code" -->

##==##

# Stratégies de cache : Stale-While-Revalidate

![center h-800](./assets/images/cache-strategy-stale-while-revalidate.png)

Notes:
Proche de la version Cache-Then-Network
Si il existe une version en cache, on l'utilise, puis on telecharge la nouvelle version pour la prochaine fois

##==##

<!-- .slide: class="with-code" -->

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

# Stratégies de cache : Greneric-Fallback

![center h-800](./assets/images/cache-strategy-generic-fallback.png)

Notes:
Si il existe une version en cache, on l'utilise, puis on telecharge la nouvelle version pour la prochaine fois

##==##

<!-- .slide: class="with-code" -->

# Greneric-Fallback : example

service-worker.js

```javascript
self.addEventListener('fetch', event => {
  event.respondWith(
    caches
      .match(event.request)
      .then(response => response || fetch(event.request))
      .catch(_ => caches.match('offline.html'))
  );
});
```

<!-- .element: class="big-code" -->
