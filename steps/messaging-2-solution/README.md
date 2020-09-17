# Client API

> [Caniuse usage](https://caniuse.com/#feat=mdn-api_client) : 78 %

A réception d'un message de type {action: 'SKIP_WAITING'} par le service worker, skip l'attente de mise à jour du service worker actif et renvoyer un message aux clients actifs :

```
    self.skipWaiting();
    self.clients.matchAll().then(clients => clients.map(client => // envoyer un message ));
```

A réception d'une message de type { action: 'RELOAD_WINDOW' } par le client, recharger la page en cours :

```
window.location.reload();
```
