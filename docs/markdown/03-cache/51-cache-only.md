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

##==##

<!-- .slide: class="transition bg-green" -->

# Avec les frameworks

##==##

# Avec les frameworks

<br>

> ⚠️ Dans tous les cas, vos tests PWA ne pourront se faire qu'en mode de production ! Aucun des systèmes prévus par les frameworks n'a pour vocation de fonctionner en mode dev.

##==##

<!-- .slide: class="with-code" -->

# Avec Angular

En utilisant la schematics `@angular/pwa` et en configurant le `ngsw-worker.js`

```json
{"index": "/index.html",
  "assetGroups": [{
      name:'cacheOnly',
      installMode: 'prefetch',
      updateMode: 'prefetch',
      resources: {
        files: ['**']
        urls: ['/myApi/**']
      } } ] }
```

<!-- .element: class="big-code" -->

##==##

# Avec React

> Starting with Create React App 4, you can add a src/service-worker.js file to your project to use the built-in support for Workbox's InjectManifest plugin, which will compile your service worker and inject into it a list of URLs to precache.

<br><br>
**En résumé : Comme avec Workbox**

##==##

# Avec VueJS

<!-- .slide: class="with-code" -->

En utilisant aussi Workbox dans le fichier de config de vue

vue.config.js

```javascript
module.exports = {
  // ...other vue-cli plugin options...
  pwa: {
    //....
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'dev/sw.js'
      // ...other Workbox options...
    }
  }
};
```

<!-- .element: class="big-code" -->
