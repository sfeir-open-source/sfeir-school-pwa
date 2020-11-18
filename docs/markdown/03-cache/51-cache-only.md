<!-- .slide: class="transition bg-blue" -->

# Cache Only

##==##

# Stratégies de cache : Cache-only

![center h-800](./assets/images/cache-strategy-cache-only.png)
Notes:
Ideal pour tout ce qui est considéré comme static a une version du site.

Ideal for: Anything you'd consider static to that "version" of your site.
You should have cached these in the install event, so you can depend on them being there.

##==##

<!-- .slide: class="with-code" -->

# Cache-only : Initialisation

service-worker.js

```javascript
const cacheAppShellStatic = ['/', /*...*/];
self.addEventListener('install', event =>
  // We start by caching vitals resources
  event.waitUntil(
    caches.open('cache-static')
      .then(cache => cache.addAll(cacheAppShellStatic))
      .then(_ => self.skipWaiting())
  );
);
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code" -->

# Cache-only : Utilisation

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

<!-- .slide: class="exercice" -->

# Cache Only (ou installation App-Shell)

## Exercice

<br>

1. Mettre en place une stratégie cache only. Le meilleur cas d'utilisation est l'app-shell.
1. Après avoir identifié les fichiers importants pour notre app-shell, ajoutez les dans le cache lors de l’event “install” de votre service worker.
1. Vérifier à l’aide de votre navigateur que tout s’est bien passé.

### Step: cache-only-1

##==##

<!-- .slide: class="with-code" -->

# Cache-only : Avec Workbox (Initialisation et Utilisation)

service-worker.js

```javascript
import {precacheAndRoute} from 'workbox-precaching';

const cacheAppShellStatic = [{
  {url: '/index.html', revision: '383676' },
  {url: '/styles/app.0c9a31.css', revision: null},
  {url: '/scripts/app.0d5770.js', revision: null},
  // ... other entries ...];

precacheAndRoute(cacheAppShellStatic);
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="exercice" -->

# Cache Only avec Workbox

## Exercice

<br>

1. Mettre en place une stratégie cache only. Le meilleur cas d'utilisation est l'app-shell.
1. Après avoir identifié les fichiers importants pour notre app-shell, ajoutez les dans le cache lors de l’event “install” de votre service worker.
1. Vérifier à l’aide de votre navigateur que tout s’est bien passé.
1. Utiliser Workbox

### Step: cache-only-2
