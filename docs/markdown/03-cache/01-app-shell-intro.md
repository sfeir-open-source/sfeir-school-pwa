<!-- .slide: data-type-show="on-stage" -->

# L’app shell

<br>
<p class="center">
L’interface minimale<br><br>
en cache<br><br>
affichée instantanément<br><br>
en attendant le contenu<br>
</p>

<br>

[Instant Loading Web Apps with an application shell architecture](https://medium.com/google-developers/instant-loading-web-apps-with-an-application-shell-architecture-7c0c2f10c73#.9zdkbt2ww)

<!-- .element: class="center" -->
<br>

https://github.com/GoogleChrome/application-shell/

<!-- .element: class="center" -->

<br>
Notes: catégorie "Performance"

##==##

<!-- .slide: data-type-show="on-stage" -->

![](./assets/images/app_shell.png 'center h-800')

##==##

<!-- .slide: data-background="./assets/images/polaroid.png" class="transition transition" data-type-show="on-stage" -->

# Instant loading

##==##

<!-- .slide: data-type-show="on-stage" -->

# 1ère étape : le besoin

Demandez vous :
<br><br><br>

- Qu’est ce qui doit apparaître à l’écran immédiatement ?
  <br><br>
- Quels sont les composants clés de votre app ?
  <br><br>
- Quelles sont les ressources dont vous avez besoin ? (images, css, js, etc …)

##==##

<!-- .slide: data-type-show="on-stage" -->

# 2ème étape : Le cache

- **Premier chargement** : Mettre les fichiers dans le cache.
- **Prochain chargements** : Recupérer directement les fichiers du cache :
  - Si les fichiers ne sont plus à jour, mettre les nouveaux fichiers dans le cache et supprimer les anciens.
  - **chargement N+1** : utiliser les fichiers mis à jour.

![](./assets/images/minifig.png 'center h-500')

##==##

<!-- .slide: data-type-show="on-stage" -->

# On install

![](./assets/images/sw_install.png 'center h-700')

##==##

<!-- .slide: class="with-code" data-type-show="on-stage" -->

# Cache API

Ouvrir un cache et ajouter un ensemble de fichiers

<!-- .element: class="center" -->

<br>

```javascript
caches.open('cache-name').then(cache => cache.addAll(/* Array of files path */));
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code" data-type-show="on-stage" -->

# Cache API

Chercher une requête dans les caches

<!-- .element: class="center" -->

<br>

```javascript
caches.match(event.request).then(response => {
  //Do stuff
});
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code" data-type-show="on-stage" -->

# Cache API

Exécuter une requête et mettre le résultat dans le cache

<!-- .element: class="center" -->

<br>

```javascript
fetch(event.request).then(response =>
  caches.open('dynamic-cache').then(cache => {
    cache.put(event.request, response.clone());
    return response;
  })
);
```

<!-- .element: class="big-code" -->
