<!-- .slide: class="with-code" -->

# Envoyer un message au SW

main.js

```javascript
function send_message_to_sw(message) {
  navigator.serviceWorker.controller.postMessage('Client says ' + message);
}
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code" -->

# Réceptionner et répondre

service-worker.js

```javascript
self.addEventListener('message', event => {
  console.log('SW Received Message: ' + event.data);
  self.clients.matchAll().then(clients => clients.map(client => client.postMessage('Hello All !')));
});
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code" -->

# Écouter les messages provenant du SW

main.js

```javascript
navigator.serviceWorker.addEventListener('message', event => {
  alert(event.data);
});
```

<!-- .element: class="big-code" -->
