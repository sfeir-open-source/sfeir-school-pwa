<!-- .slide: class="with-code" -->

# MessageChannel pour la communication direct

main.js

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
