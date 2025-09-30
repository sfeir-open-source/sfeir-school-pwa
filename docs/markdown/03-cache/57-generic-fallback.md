<!-- .slide: class="transition bg-green" data-type-show="prez-cache on-stage"-->

# Generic Fallback

##==##

<!-- .slide: data-type-show="prez-cache on-stage" -->

# Stratégies de cache : Generic-Fallback

![](./assets/images/cache-strategy-generic-fallback.png 'center h-800')

Notes:
Si il existe une version en cache, on l'utilise, sinon, on prend celle du serveur, sinon, on prend un résultat par défaut

##==##

<!-- .slide: class="with-code max-height" data-type-show="prez-cache on-stage"-->

# Generic-Fallback : example

service-worker.js

```javascript [1-2,7-8|3-4|5|6|1-8]
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

<!-- .slide: class="exercice" data-type-show="on-stage" -->

# Generic FallBack

## Lab

<br>

1. Utiliser la stratégie Generic FallBack pour renvoyer une image de chat au cas où on ne trouve pas l'image.

### Step: cs-generic-fallback-1

##==##

<!-- .slide: class="with-code max-height" data-type-show="prez-cache on-stage"-->

# Generic Fallback : Avec Workbox

service-worker.js - Utilisation

```javascript [2-5,10|6-7,9|8]
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

<!-- .slide: class="exercice" data-type-show="on-stage" -->

# Generic Fallback avec Workbox

## Lab

<br>

1. Utiliser la stratégie Generic FallBack pour renvoyer une image de chat au cas où on ne trouve pas l'image.

### Step: cs-generic-fallback-2

##==##

<!-- .slide: class="transition bg-white" data-type-show="prez-cache on-stage"-->

# Avec les frameworks

##==##

<!-- .slide: class="with-code" data-type-show="prez-cache on-stage"-->

# Avec Angular

On doit surcharger le service worker pour permettre ce genre de stratégie

Notes:
