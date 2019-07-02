## Devtools

# Jouer avec le cycle de vie

![h-600](./assets/images/lifecycle-console.png)

Notes:
Montrer à quoi sert le "update on reload" & "unregister" & "update" & numéro de l'identifiant du service worker

##==##

<!-- .slide: class="with-code" -->

# Event API

### Elle permet d'étendre la durée de vie de l'évènement

```javascript
self.addEventListener('install', function(event) {
  event
    .waitUntil
    //Promise
    ();
});
```

<!-- .element: class="big-code" -->

Notes: Un event est asynchrone, il se termine avant que la Promise ne soit fullfiled
Se termine avant que l'on ai fini les actions a faire
Fixé avec waitUntil, qui va attendre la résolution de la dernière promise a l'interieur avant de terminer l'event
##==##

# Installation

![center h-600](./assets/images/sw_life_cycle_installing.png)

##==##

<!-- .slide: class="with-code" -->

# skipWaiting

### Force le service en attente à devenir le service worker actif

```javascript
self.addEventListener('install', function(event) {
  // The promise that skipWaiting() returns
  // can be safely ignored.
  self.skipWaiting();
  // Perform any other actions required for your
  // service worker to install, potentially inside
  // of event.waitUntil();
});
```

<!-- .element: class="big-code" -->

<br>
<a target="_blank" href="https://cdn.rawgit.com/jakearchibald/80368b84ac1ae8e229fc90b3fe826301/raw/ad55049bee9b11d47f1f7d19a73bf3306d156f43/index-v3.html" >Demo</a>
<!-- .element: class="center" -->

Notes:
forces the waiting service worker to become the active service worker.

The claim() method of the of the Clients interface allows an active Service Worker to set itself as the active worker for a client page when the worker and the page are in the same scope. This triggers an oncontrollerchange event on any client pages within the Service Worker's scope.

**DEMO**: u should see a picture of a cow without having to navigate away. Like clients.claim() it's a race, so you'll only see the cow if the new service worker fetches, installs and activates before the page tries to load the image.

**Caution**: skipWaiting() means that your new service worker is likely controlling pages that were loaded with an older version. This means some of your page's fetches will have been handled by your old service worker, but your new service worker will be handling subsequent fetches. If this might break things, don't use skipWaiting().

##==##

# Activation

![center h-600](./assets/images/sw_life_cycle_activating.png)

##==##

<!-- .slide: class="with-code" -->

# claim

### Force l’activation du service worker en attente ⇢ qui devient le worker actif de la page

```javascript
self.addEventListener('activate', function(event) {
  event.waitUntil(self.clients.claim());
});
```

<!-- .element: class="big-code" -->

<br>

Notes:
forces the waiting service worker to become the active service worker.

The claim() method of the of the Clients interface allows an active Service Worker to set itself as the active worker for a client page when the worker and the page are in the same scope. This triggers an oncontrollerchange event on any client pages within the Service Worker's scope.
