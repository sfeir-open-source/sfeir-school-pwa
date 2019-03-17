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

<br>

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

Notes:
forces the waiting service worker to become the active service worker.

The claim() method of the of the Clients interface allows an active Service Worker to set itself as the active worker for a client page when the worker and the page are in the same scope. This triggers an oncontrollerchange event on any client pages within the Service Worker's scope.

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
