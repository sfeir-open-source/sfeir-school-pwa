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

![center h-800](./assets/images/app_shell.png)

##==##

<!-- .slide: data-background="./assets/images/polaroid.png" class="transition transition" -->

# Instant loading

##==##

# 1ère étape : le besoin

Demandez vous :
<br><br><br>

- Qu’est ce qui doit apparaître à l’écran immédiatement ?
  <br><br>
- Quels sont les composants clés de votre app ?
  <br><br>
- Quelles sont les ressources dont vous avez besoin ? (images, css, js, etc …)

##==##

# 2ème étape : Le cache

- **Premier chargement** : Mettre les fichiers dans le cache.
- **Prochain chargements** : Recupérer directement les fichiers du cache :
  - Si les fichiers ne sont plus à jour, mettre les nouveaux fichiers dans le cache et supprimer les anciens.
  - **chargement N+1** : utiliser les fichiers mis à jour.

![center h-500](./assets/images/minifig.png)

##==##

# On install

![center h-700](./assets/images/sw_install.png)

##==##

<!-- .slide: class="with-code" -->

# Cache API

<br><br>

Ouvrir un cache et ajouter un ensemble de fichiers

<!-- .element: class="center" -->

<br>

```javascript
caches.open('cache-name').then(cache => cache.addAll(/* Array of files path */));
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code" -->

# Cache API

<br><br>

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

<!-- .slide: class="with-code" -->

# Cache API

<br><br>

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
