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

# In the window context

## **TODO**

Ajouter un exemple de code pour montrer comment communiquer en vanillaJS entre le index.js & le serviceworker.js

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
