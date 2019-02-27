<!-- .slide: class="transition-white sfeir-bg-blue" -->

<h1>Performance<br>
(Bonus - sujet avancé)
</h1>

<!-- .slide: class="transition-white sfeir-bg-pink" -->

# Chargement


##==##

<!-- .slide: data-background="./assets/images/compression_bg.jpg" class="transition" -->

# Compression

##==##

# Compression

|Library|Size|Compressed size|Compression ratio|
|-----|------|-|----------|
|jquery-1.11.0.js|276 KB|82 KB|70%|
|jquery-1.11.0.min.js|94 KB|33 KB|65%|
|angular-1.2.15.js|729 KB|182 KB|75%|
|angular-1.2.15.min.js|101 KB|37 KB|63%|
|bootstrap-3.1.1.css|118 KB|18 KB|85%|
|bootstrap-3.1.1.min.css|98 KB|17 KB|83%

##==##

# Brotli vs Gzip

## Brotli

* 14% smaller than gzip for JavaScript
* 21% smaller than gzip for HTML
* 17% smaller than gzip for CSS

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

# Gif is 💀

![center h-200](./assets/images/gif_size.png)

<br>

```sh
ffmpeg -i input.gif output.mp4
```
<!-- .element: class="big-code" -->
<br>

```html
<video autoplay loop muted playsinline> </video>
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

* Uniquement le code **nécessaire** : code splitting, lazy loading
* **Minifier** : UglifyJS (ES5) / babel-minify ou uglify-es (ES6+)
* **Compression** : Gzip, Brotli
* **Supprimer** le code superflus : DevTools code coverage, browserlist, webpack bundle analyzer, Tree Shaking
* **Caching** : Http Caching, Service Worker, long term caching (filename hashing)

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

<!-- .slide: class="full-center" -->

![h-800](./assets/images/javascript_parse_cost.png)

##==##

<!-- .slide: class="full-center" -->

![h-800](./assets/images/javascript_parse_cost_phone.png)


##==##

<!-- .slide: class="full-center" -->

![h-800](./assets/images/tti_on_mobile.png)

##==##

<!-- .slide: class="full-center" -->

# Chargement des scrtips tiers

![h-600](./assets/images/load_scrip_order.png)

Notes:
https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/loading-third-party-javascript/#use_async_or_defer



##==##

<!-- .slide: class="full-center" -->

# HTTP2

![h-600](./assets/images/http2_demo.gif)