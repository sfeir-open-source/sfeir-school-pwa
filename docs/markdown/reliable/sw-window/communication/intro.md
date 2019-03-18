<!-- .slide: class="with-code" data-background="#fb8c00" -->

# In the Service Worker

<!-- .element: style="color:white" -->

```javascript
const SW_VERSION = '1.0.0';

addEventListener('message', event => {
  if (event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage(SW_VERSION);
  }
});
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code" data-background="#fb8c00" -->

# In the Window context

<!-- .element: style="color:white" -->

```javascript
const wb = new Workbox('/sw.js');
wb.register();

const swVersion = await wb.messageSW({ type: 'GET_VERSION' });
console.log('Service Worker version:', swVersion);
```

<!-- .element: class="big-code" -->

##==##

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

##==##

# Receive

<!-- .slide: class="with-code" -->

<br><br>

```javascript
let messageChannel = new MessageChannel();
messageChannel.port1.onmessage = evt => console.log(evt.data);
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code" -->

# Send

<br><br>

```javascript
navigator.serviceWorker.controller.postMessage(message, [messageChannel.port2]);
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code" data-background="#fb8c00" -->

# How it's done

<!-- .element: style="color:white" -->

## messageSW.mjs

```javascript
const messageSW = (sw, data) => {
  return new Promise(resolve => {
    let messageChannel = new MessageChannel();
    messageChannel.port1.onmessage = evt => resolve(evt.data);
    sw.postMessage(data, [messageChannel.port2]);
  });
};
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code" data-background="#fb8c00" -->

# How it's done

<!-- .element: style="color:white" -->

## Workbox.mjs

```javascript
async messageSW(data) {
  const sw = await this.getSW();
  return messageSW(sw, data);
}
```

<!-- .element: class="big-code" -->
