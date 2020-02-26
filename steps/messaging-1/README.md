# Jouons avec les messages (messaging-1)

1. Ajouter une fonction qui va permettre d'envoyer un message au SW, et d'en écouter la réponse.
2. Lors de l’event “message”, afficher le message dans la console et répondez 'Hello All !' à toutes les instances.
3. Afficher le message retour dans une alert sur toutes les pages.

# Tips

- Bien penser à lever les événements au bon moment dans le cycle de vie

# API Concernée

## Page web -> Service Worker : Envoie

```javascript
navigator.serviceWorker.controller.postMessage('Client says ' + message);
```

## Page web -> Service Worker : Réception

```javascript
self.addEventListener('message', function(event) {
  console.log('SW Received Message: ' + event.data);
});
```

## Service Worker -> Page Web : Envoie

```javascript
self.clients.matchAll().then(clients => clients.map(client => client.postMessage('Hello All !')));
```

## Service Worker -> Page Web : Réception

```javascript
navigator.serviceWorker.addEventListener('message', event => {
  console.log(event.data);
});
```
