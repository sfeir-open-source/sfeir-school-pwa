# Jouons avec les messages (messaging-2)

1. Ajouter une fonction qui va permettre d'envoyer un message au SW, et d'en écouter la réponse.
2. Lors de l’event “message”, afficher le message dans la console et répondez 'Ok, message received' à la page qui a envoyé le message.
3. Afficher le message retour dans une alert uniquement sur la page émettrice.

# Tips

- Pensez bien à passer le channel de communication (port2) en paramètre

# API Concernée

## Page web -> Service Worker : Envoie

```javascript
const msg_chan = new MessageChannel();
navigator.serviceWorker.controller.postMessage(message, [msg_chan.port2]);
```

## Page web -> Service Worker : Réception

```javascript
self.addEventListener('message', event => console.log('SW Received Message: ' + event.data));
```

## Service Worker -> Page Web : Envoie

```javascript
// event venant de l'event 'message'
event.ports[0].postMessage('Ok, message received');
```

## Service Worker -> Page Web : Réception

```javascript
const msg_chan = new MessageChannel();
msg_chan.port1.onmessage = event => console.log(event.data);
```
