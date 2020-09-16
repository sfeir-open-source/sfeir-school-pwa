<!-- .slide: class="with-code" data-background="#fb8c00" -->

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

- Routing with a string, with a Regex, with a callback function

##==##

<!-- .slide: class="with-code" data-background="#fb8c00" -->

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

# Routing

Plusieurs façon de le faire :
<br><br><br>

- Requêtes de routes :
  1. string.
  2. regular expression.
  3. callback function.
     <br><br>
- Traîtement de la requête
  1. Stratégie Workbox
  2. callback function

##==##

<!-- .slide: class="with-code" data-background="#fb8c00" -->

# Routing - Stratégies Workbox

<!-- .element: style="color:white" -->

```javascript
import { registerRoute } from 'workbox-routing';
import * as strategies from 'workbox-strategies';

registerRoute(match, new strategies.StaleWhileRevalidate());

registerRoute(match, new strategies.NetworkFirst());

registerRoute(match, new strategies.CacheFirst());

registerRoute(match, new strategies.NetworkOnly());

registerRoute(match, new strategies.CacheOnly());
```

<!-- .element: class="big-code" -->

##==##

# Autres méthodes

- En ligne de commande

  - installation en global

  ```
  npm install workbox-cli --global
  ```

    <!-- .element: class="big-code" -->

  - paquet npm

  ```
  npm install workbox-build --save-dev
  ```

  ```javascript
  workbox.generateSW();
  ```

    <!-- .element: class="big-code" -->

  ```javascript
  workbox.injectManifest();
  ```

    <!-- .element: class="big-code" -->

  - ajouter au préalable :

  ```javascript
  precacheAndRoute(self.__WB_MANIFEST);
  ```

    <!-- .element: class="big-code" -->

- Bundler : Webpack, Rollup, Gulp...

Notes:

##==##

<!-- .slide: class="with-code" data-background="#fb8c00" -->

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
