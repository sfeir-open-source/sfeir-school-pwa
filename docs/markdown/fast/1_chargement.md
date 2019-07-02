<!-- .slide: class="transition-white sfeir-bg-pink" -->

# Chargement

##==##

<!-- .slide: data-background="./assets/images/compression_bg.jpg" class="transition" -->

# Compression

##==##

# Compression

| Library                 | Size   | Compressed size | Compression ratio |
| ----------------------- | ------ | --------------- | ----------------- |
| jquery-1.11.0.js        | 276 KB | 82 KB           | 70%               |
| jquery-1.11.0.min.js    | 94 KB  | 33 KB           | 65%               |
| angular-1.2.15.js       | 729 KB | 182 KB          | 75%               |
| angular-1.2.15.min.js   | 101 KB | 37 KB           | 63%               |
| bootstrap-3.1.1.css     | 118 KB | 18 KB           | 85%               |
| bootstrap-3.1.1.min.css | 98 KB  | 17 KB           | 83%               |

##==##

# Brotli vs Gzip

## Brotli

- 14% smaller than gzip for JavaScript
- 21% smaller than gzip for HTML
- 17% smaller than gzip for CSS

<br>

and also faster !

<br>
💡 If you use the right compression levels

Notes:
Brotli default compression level is higher than the one in gzip, which is misleading when comparing them.

https://certsimple.com/blog/nginx-brotli
💡difference between static and dynamic content

##==##

<!-- .slide: class="full-center" -->

# Brotli

![h-700](./assets/images/caniuse_brotli.png)

Notes:
MAJ: 2018-08-31

##==##

<!-- .slide: data-background="./assets/images/images_bg.jpg" class="transition-white " -->

# Images

<!-- .element: class="border-orange" -->

<br>

##==##

<!-- .slide: class="full-center" -->

# Quel format choisir

![h-600](./assets/images/decision_tree_images.png)

##==##

# Format modernes

<br>

WebP, JPEG 2000 & JPEG-XR
<br>

Non universellement supportés
<br>

Offrent de meilleures performances et plus de souplesse
<br>

💡Après avoir un choisit le bon format universel, ajouter des variantes en format modernes

##==##

<!-- .slide: class="flex-row"  -->

![h-150](./assets/images/chrome_logo.png)
![h-150](./assets/images/webp_logo.png)

<br>

Les fichiers WebP sont 26% plus petit que les PNG.

Les fichiers WebP sont 25-34% plus petit que les JPEG.

![center h-400](./assets/images/caniuse_webp.png)

Notes:
Update on 2019-05-16
WebAssembly to decode WebP : https://medium.com/@kennethrohde/
on-the-fly-webp-decoding-using-wasm-and-a-service-worker-33e519d8c21e
=> Safari aussi ;) version 11

##==##

<!-- .slide: class="flex-row"  -->

![h-150](./assets/images/safari_logo.png)
![h-150](./assets/images/jpef2000_logo.png)

<br>

PNG reste meilleur avec peu de couleurs (diagrammes)

Performances de compressions similaires mais bien plus souple (ex: compressions différentes par région)

![center h-400](./assets/images/caniuse_jpeg2000.png)

##==##

# JPeg XR

![h-150 center](./assets/images/edge_logo.png)

~35% plus petit que le JPEG

<!-- .element: class="center" -->

<br>

![center h-400](./assets/images/caniuse_jpegxr.png)

##==##

<!-- .slide: class="with-code" -->

# Fallback

```html
<picture>
  <source type="image/webp" srcset="image.webp" />
  <source type="image/jpeg" srcset="image.jpg" />
  <img src="image.jpg" alt="My Image" />
</picture>
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code" -->

# Gif is 💀

![center h-200](./assets/images/gif_size.png)

<br>

```sh
ffmpeg -i input.gif output.mp4
```

<!-- .element: class="big-code" -->
<br>

```html
<video autoplay loop muted playsinline></video>
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: data-background="./assets/images/scripts_bg.jpg" class="transition-white" -->

# Scripts

<!-- .element: class="border-orange" -->

##==##

<!-- .slide: class="full-center" -->

# Download & Excecution cost

![h-700](./assets/images/download_execution_bg.png)

##==##

# Réduire le "poid" de vos scripts

<br>

- Uniquement le code **nécessaire** : code splitting, lazy loading
- **Minifier** : UglifyJS (ES5) / babel-minify ou uglify-es (ES6+)
- **Compression** : Gzip, Brotli
- **Supprimer** le code superflus : DevTools code coverage, browserlist, webpack bundle analyzer, Tree Shaking
- **Caching** : Http Caching, Service Worker, long term caching (filename hashing)

##==##

<!-- .slide: class="full-center" -->

# Devtools Code coverage

![h-700](./assets/images/devtools_code_coverage.png)

Notes:
https://developers.google.com/web/updates/2017/04/devtools-release-notes#coverage

##==##

<!-- .slide: class="full-center" -->

# Parse / Compile

![h-700](./assets/images/parse_compile.png)

##==##

<!-- .slide: class="" -->

![h-800 center](./assets/images/javascript_parse_cost.png)

[The cost of javascript - 2018](https://medium.com/@addyosmani/the-cost-of-javascript-in-2018-7d8950fbb5d4)

<!-- .element: class="center" -->

##==##

<!-- .slide: class="full-center" -->

![h-800](./assets/images/javascript_parse_cost_phone.png)

##==##

<!-- .slide: class="full-center" -->

![h-800](./assets/images/time_to_interactive.png)

##==##

<!-- .slide: class="full-center" -->

![h-800](./assets/images/tti_on_mobile.png)

##==##

<!-- .slide: class="full-center" -->

# Chargement des scripts tiers

![h-600](./assets/images/load_scrip_order.png)

Notes:
https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/loading-third-party-javascript/#use_async_or_defer

##==##

<!-- .slide: class="" -->

# HTTP2

![h-600 center](./assets/images/http2_demo.gif)

[HTTP2 Golang demo](https://http2.golang.org/gophertiles?latency=0)

<!-- .element: class="center" -->

Notes:

- HTTP/1 chargeait les ressources les unes après les autres
- HTTP/2 va vous permettre de gagner du temps au niveau des états d’attente car plusieurs ressources pourront être directement déchargées dans le même flux de réponse HTTP.
  ##==##

<!-- .slide: class="full-center" -->

# HTTP1 Waterfall

![h-800](./assets/images/watefall_http1.jpg)

Notes:

- vert : temps d’attente avant le chargement de la ressource,
- violet : temps d’attente de chargement de la ressource (TTFB - Time To First Byte)
- gris : temps de réception de la ressource.
  ##==##

<!-- .slide: class="full-center" -->

# HTTP2 Waterfall

![h-800](./assets/images/watefall_http2.jpg)

Notes:

- le temps en vert (attendre les ressources) a complètement disparu
- les ressources sont bien chargées “en même temps”, en utilisant le même flux
- Moteurs de recherche se basent de plus en plus sur le temps de chargement des pages pour améliorer leur référencement
- le passage au protocole HTTP/2 est également un gros plus pour le SEO.

##==##

# HTTP n'est pas le futur...

... c'est le présent
![h-600](./assets/images/caniuse-http2.png)

##==##

<!-- .slide: class="with-code" -->

# How to ?

Sur nginx, depuis la version 1.9.5.

```javascript
server {
    listen 443 ssl http2
    ...
}
```

<!-- .element: class="big-code" -->

<br />
and Voilà !
<!-- .element: class="big-text" -->
