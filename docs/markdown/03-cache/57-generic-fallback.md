<!-- .slide: class="transition bg-green" -->

# Generic Fallback

##==##

# Stratégies de cache : Generic-Fallback

![center h-800](./assets/images/cache-strategy-generic-fallback.png)

Notes:
Si il existe une version en cache, on l'utilise, sinon, on prend celle du serveur, sinon, on prend un résultat par défaut

##==##

<!-- .slide: class="with-code max-height" -->

# Generic-Fallback : example

service-worker.js

```javascript
self.addEventListener('fetch', event => {
  event.respondWith(



    ...
  );
});
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code max-height" -->

# Generic-Fallback : example

service-worker.js

```javascript
/*self.addEventListener('fetch', event => {
  event.respondWith(*/
    caches
      .match(event.request)

      ...
  );
//});
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code max-height" -->

# Generic-Fallback : example

service-worker.js

```javascript
/*self.addEventListener('fetch', event => {
  event.respondWith(
    caches
      .match(event.request)*/
      .then(response => response || fetch(event.request))
      ...
  );
//});
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code max-height" -->

# Generic-Fallback : example

service-worker.js

```javascript
/*self.addEventListener('fetch', event => {
  event.respondWith(
    caches
      .match(event.request)
      .then(response => response || fetch(event.request))*/
      .catch(_ => caches.match('offline.html'))
  );
});
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code max-height" -->

# Generic-Fallback : example

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

##==##

<!-- .slide: class="exercice" data-type-show="prez" -->

# Generic FallBack

## Lab

<br>

1. Utiliser la stratégie Generic FallBack pour renvoyer une image de chat au cas où on ne trouve pas l'image.

### Step: cs-generic-fallback-1

##==##

<!-- .slide: class="with-code max-height" -->

# Generic Fallback : Avec Workbox

service-worker.js - Utilisation

```javascript
//import { registerRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';
import {PrecacheFallbackPlugin} from 'workbox-precaching';

registerRoute(



  ...
);
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code max-height" -->

# Generic Fallback : Avec Workbox

service-worker.js - Utilisation

```javascript
//import { registerRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';
import {PrecacheFallbackPlugin} from 'workbox-precaching';

registerRoute(
  ({ request }) => request.mode === 'navigate',
  new NetworkFirst({
    ...
  })
);
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code max-height" -->

# Generic Fallback : Avec Workbox

service-worker.js - Utilisation

```javascript
//import { registerRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';
import { PrecacheFallbackPlugin } from 'workbox-precaching';

registerRoute(
  ({ request }) => request.mode === 'navigate',
  new NetworkFirst({
    plugins: [new PrecacheFallbackPlugin('/fallback.html')]
  })
);
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="exercice" data-type-show="prez" -->

# Generic Fallback avec Workbox

## Lab

<br>

1. Utiliser la stratégie Generic FallBack pour renvoyer une image de chat au cas où on ne trouve pas l'image.

### Step: cs-generic-fallback-2

##==##

<!-- .slide: class="transition bg-white" -->

# Avec les frameworks

##==##

<!-- .slide: class="with-code" -->

# Avec Angular

On doit surcharger le service worker pour permettre ce genre de stratégie

Notes:
