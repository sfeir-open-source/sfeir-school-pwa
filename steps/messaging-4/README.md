# Broadcast Channel API

> [Caniuse usage](https://caniuse.com/#feat=broadcastchannel) : 78 %

Créer une instance côté client et service worker:

```javascript
const broadcast = new BroadcastChannel('install-channel');
```

A réception d'un événement _install_ par le service worker, envoyer un message pour afficher la modal :

```javascript
broadcast.postMessage({ action: 'DISPLAY_DIALOG' });
```

Côté client, écouter les événements émis par le service worker :

```
broadcast.onmessage = (event) => {
    dialog.showModal();
};
```

Côté client, envoyer un message au service worker au clic sur la modal :

```
broadcast.postMessage({action: 'SKIP_WAITING'})
```

Côté service worker, skipper la mise en attente du nouveau service worker :

```javascript
self.skipWaiting();
broadcast.postMessage({ action: 'RELOAD_WINDOW' });
```

A réception du dernier message côté lcient, recharger la page :

```javascript
window.location.reload();
```
