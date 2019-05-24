# Rafraichir votre service worker

1. Lors de l’event “install”, implémentez le skipwaiting() comme dans l’exemple.
2. Lors de l’event “activate”, implémentez le claim() comme dans l’exemple.

# API concernée

Dans le fichier Service Worker

```javascript
// Attente d'un événement
event.waitUntil(Promise);

// Demande au service worker de ne plus attendre
self.skipWaiting();

// Demande aux services workers présent de prendre la main
self.clients.claim();
```
