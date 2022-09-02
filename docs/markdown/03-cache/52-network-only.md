<!-- .slide: class="transition bg-green" -->

# Network Only

##==##

# Stratégies de cache : Network-only

![center h-800](./assets/images/cache-strategy-network-only.png)

Notes:
on ne veut pas de cache car l'opération est critique/ne peut pas fonctionner hors ligne.

Si ce n'est qu'une partie de l'application, il est important d'expliquer clairement au niveau de l'interface pourquoi la fonctionnalité n'est pas disponible.

##==##

<!-- .slide: class="with-code" -->

# Network-only : Utilisation

service-worker.js

```javascript
self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request));
  // or simply don't call event.respondWith, wich
  // will result in default browser behavior
});
```

<!-- .element: class="big-code" -->

Notes:
Il n'y a pas ici d'initialisation

##==##

<!-- .slide: class="with-code" -->

# Network-only : Utilisation (Real Life example)

service-worker.js

```javascript
self.addEventListener('fetch', event => {
  if (event.request.url.startsWith('/critialAPI')) {
    event.respondWith(fetch(event.request));
  }
});
```

<!-- .element: class="big-code" -->

Notes:
On va en général réserver ça à certaines requêtes. On notera qu'on ne passe pas du tout par la case cache

##==##

<!-- .slide: class="exercice" data-type-show="prez" -->

# Network Only (Appels serveurs)

## Lab

<br>

1. Mettre en place une stratégie network only pour la partie Apis.
1. Les Appels d'APIs sont commencent tous par '/api'
1. Vérifier à l’aide de votre navigateur que tout s’est bien passé.

### Step: cs-network-only-1

##==##

<!-- .slide: class="with-code max-height" -->

# Network-only : Avec Workbox bis

service-worker.js

```javascript
import { registerRoute } from 'workbox-routing';
import { NetworkOnly } from 'workbox-strategies';







...
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code max-height" -->

# Network-only : Avec Workbox bis

service-worker.js

```javascript
//import { registerRoute } from 'workbox-routing';
import { NetworkOnly } from 'workbox-strategies';

// Let all request going to api passed through network
registerRoute(
  // Check to see if the request's target is an api
  ({ request }) => request.url.startsWith === '/api',
  // Use a Network Only caching strategy
  new NetworkOnly()
);
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="exercice" data-type-show="prez" -->

# Network Only avec Workbox

## Lab

<br>

1. Mettre en place une stratégie network only pour la partie Apis.
1. Les Appels d'APIs sont commencent tous par '/api'
1. Vérifier à l’aide de votre navigateur que tout s’est bien passé.
1. Utiliser Workbox

### Step: cs-cache-only-2

##==##

<!-- .slide: class="transition bg-white" -->

# Avec les frameworks

##==##

<!-- .slide: class="with-code" -->

# Avec Angular

En utilisant la schematics `@angular/pwa` et en configurant le `ngsw-worker.js`

```javascript
// Append ngsw-bypass at the end of the desire request
this.http.get('api/users?ngsw-bypass');


...
```

<!-- .element: class="big-code" -->

Notes:
En fait, il faut dire à angular de ne pas prendre en compte l'url

##==##

<!-- .slide: class="with-code" -->

# Avec Angular

En utilisant la schematics `@angular/pwa` et en configurant le `ngsw-worker.js`

```javascript
// Append ngsw-bypass at the end of the desire request
//this.http.get('api/users?ngsw-bypass');

// Or set in header
this.http.get('api/users', { headers: { 'ngsw-bypass': true } });
```

<!-- .element: class="big-code" -->

Notes:
En fait, il faut dire à angular de ne pas prendre en compte l'url
