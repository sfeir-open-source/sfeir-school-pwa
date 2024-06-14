# PostMessage API

Utiliser l'API _postMessage_ pour communiquer avec le service worker :

```javascript
navigator.serviceWorker.controller.postMessage();
```

Côté service worker, utiliser l'énévement _message_ pour répondre :

```javascript
self.addEventListener('message', event => {
  //
});
```
