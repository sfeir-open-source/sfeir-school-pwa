<!-- .slide: class="with-code" data-background="#fb8c00" data-type-show="prez" -->

# Routing

<!-- .element: style="color:white" -->

```javascript
const { strategies } = workbox;
```

<!-- .element: class="big-code" -->

```javascript
workbox.routing.registerRoute(
  new RegExp('.*.(?:png|jpg|jpeg|svg|gif)'),
  new workbox.strategies.CacheFirst({
    cacheName: 'image-cache'
  })
);
```

<!-- .element: class="big-code" -->

Notes:

##==##

<!-- .slide: class="with-code" data-background="#fb8c00" data-type-show="prez" -->

# Routing - expiration plugin

<!-- .element: style="color:white" -->

```javascript
cacheName: 'image-cache',
plugins: [
  new workbox.expiration.Plugin({
    maxEntries: 20,
    maxAgeSeconds: 7 * 24 * 60 * 60,
  }),
],
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code" data-background="#fb8c00" data-type-show="prez" -->

# Workbox

<!-- .element: style="color:white" -->
<br />
<br />
Et encore plus de possibilités, configuration, etc...
<!-- .element: class="center" style="color:white"-->
<br />
<br />
https://developers.google.com/web/tools/workbox
<!-- .element: class="center"-->
