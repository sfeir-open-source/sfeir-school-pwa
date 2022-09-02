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

fallback-on-error-plugin.js - Création d'un plugin

```javascript
class FallbackOnErrorPlugin {












  ...
}
```

<!-- .element: class="big-code" -->

Notes:
On créé un Plugin de fallback qui va gérer notre cas

##==##

<!-- .slide: class="with-code max-height" -->

# Generic Fallback : Avec Workbox

fallback-on-error-plugin.js - Création d'un plugin

```javascript
class FallbackOnErrorPlugin {
  constructor(fallbackURL) {
    this.fallbackURL = fallbackURL;
  }







  ...
}
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code max-height" -->

# Generic Fallback : Avec Workbox

fallback-on-error-plugin.js - Création d'un plugin

```javascript
class FallbackOnErrorPlugin {
  /*constructor(fallbackURL) {
    this.fallbackURL = fallbackURL;
  }*/
  fetchDidSucceed({ response }) {
    if (response.ok)
      return response;
    throw new Error(`Error response (${response.status})`);
  }


  ...
}
```

<!-- .element: class="big-code" -->

Notes:
On créé un Plugin de fallback qui va gérer notre cas

##==##

<!-- .slide: class="with-code max-height" -->

# Generic Fallback : Avec Workbox

fallback-on-error-plugin.js - Création d'un plugin

```javascript
class FallbackOnErrorPlugin {
  /*constructor(fallbackURL) {
    this.fallbackURL = fallbackURL;
  }
  fetchDidSucceed({ response }) {
    if (response.ok) 
      return response;
    throw new Error(`Error response (${response.status})`);
  }*/
  handlerDidError() {
    return caches.match(this.fallbackURL, { ignoreSearch: true });
  }
}
```

<!-- .element: class="big-code" -->

Notes:
On créé un Plugin de fallback qui va gérer notre cas

##==##

<!-- .slide: class="with-code max-height" -->

# Generic Fallback : Avec Workbox

service-worker.js - Utilisation

```javascript
//import { registerRoute } from 'workbox-routing';
import { NetworkOnly } from 'workbox-strategies';
import { FallbackOnErrorPlugin } from './fallback-on-error-plugin.js';

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
import { NetworkOnly } from 'workbox-strategies';
import { FallbackOnErrorPlugin } from './fallback-on-error-plugin.js';

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
import { NetworkOnly } from 'workbox-strategies';
import { FallbackOnErrorPlugin } from './fallback-on-error-plugin.js';

registerRoute(
  ({ request }) => request.mode === 'navigate',
  new NetworkFirst({
    plugins: [new FallbackOnErrorPlugin('/fallback.html')]
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
