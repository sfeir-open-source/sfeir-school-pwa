<!-- .slide: class="center" -->

# Channel Messaging API

<br><br>

Communicate directly

<!-- .element: class="center" -->

<br>
Between two separate scripts
<!-- .element: class="center" -->

<br>
running in different browsing contexts
<!-- .element: class="center" -->

<br>
attached to the same document
<!-- .element: class="center" -->

<br><br>
two-way channels (or pipes) with a port at each end

<!-- .element: class="center" -->

<br><br>
Notes: Par exemple, une application peut être ouverte dans plusieurs onglets du navigateur.
Un SW peut être utilisé pour mettre à jour le contenu d'un onglet en réponse à un événement déclenché dans un autre
ou pour mettre à jour le contenu dans tous les onglets en réponse à un message envoyé du serveur.
##==##

<!-- .slide: class="with-code" -->

# Envoyer un message au SW

main.js

<!-- .element: class="center" -->

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

<!-- .element: class="center" -->

```javascript
self.addEventListener('message', function(event) {
  console.log('SW Received Message: ' + event.data);
  self.clients.matchAll().then(clients => clients.map(client => client.postMessage('Hello All !')));
});
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code" -->

# Écouter les messages provenant du SW

main.js

<!-- .element: class="center" -->

```javascript
navigator.serviceWorker.addEventListener('message', event => {
  alert(event.data);
});
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code" -->

# MessageChannel pour la communication direct

main.js

<!-- .element: class="center" -->

```javascript
function send_direct_message_to_sw(message) {
  return new Promise((resolve, reject) => {
    // Create a Message Channel
    var msg_chan = new MessageChannel();
    // Handler for recieving message reply from service worker
    msg_chan.port1.onmessage = event => {
      if (event.data.error) {
        reject(event.data.error);
      } else {
        resolve(event.data);
      }
    };
    // Send message to service worker along with port for reply
    navigator.serviceWorker.controller.postMessage(message, [msg_chan.port2]);
  });
}
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code" -->

# Répondre directement

service-worker.js

<!-- .element: class="center" -->

```javascript
self.addEventListener('message', event => {
  console.log('SW Received Message: ' + event.data);
  event.ports[0].postMessage('Ok, message received');
});
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code" data-background="#fb8c00" -->

# Avec Workbox

<!-- .element: style="color:white" -->

in the window context

```javascript
const wb = new Workbox('/sw.js');
wb.register();

const swVersion = await wb.messageSW({ type: 'GET_VERSION' });
console.log('Service Worker version:', swVersion);
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code" data-background="#fb8c00" -->

# Avec Workbox

<!-- .element: style="color:white" -->

service-worker.js

```javascript
const SW_VERSION = '1.0.0';

addEventListener('message', event => {
  if (event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage(SW_VERSION);
  }
});
```

<!-- .element: class="big-code" -->
