<!-- .slide: class="transition" data-background="#fb8c00" -->

# Workbox

##==##

<!-- .slide: class="with-code" data-background="#fb8c00" -->

# Importer Workbox

<!-- .element: style="color:white" -->

```javascript
importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');
if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}
```

<!-- .element: class="big-code" -->

<br />

Pour utiliser workbox :

<!-- .element: style="color:white" -->

```javascript
workbox.???
```

<!-- .element: class="big-code" -->

Notes:

##==##

# Autres utilisations

- Bundler : Webpack, Rollup ou Gulp
  <br /><br />
- En ligne de commande

##==##

# CLI

- installation en global

  ```
  npm install workbox-cli --global
  ```

  <!-- .element: class="big-code" -->

- lancer le wizard
  ```
  workbox wizard
  ```
  <!-- .element: class="big-code" -->
- créer le Manifest

  ```
  workbox injectManifest
  ```

    <!-- .element: class="big-code" -->

  ajouter au préalable :

  ```
  import {precacheAndRoute} from 'workbox-precaching';

  precacheAndRoute(self.__WB_MANIFEST);
  ```

    <!-- .element: class="big-code" -->

  Notes:
