<!-- .slide: data-background="./assets/images/fetch_bg.png" class="transition transition mask" data-type-show="prez" -->

# Fetch API

##==##

<!-- .slide: data-type-show="prez" -->

# L'API Fetch

![center](./assets/images/fetch_api.svg)

##==##

<!-- .slide: data-type-show="prez" -->

# Retourner une réponse personnalisée

![center](./assets/images/fetch_custom_response.svg)

##==##

<!-- .slide: class="with-code" data-type-show="prez"-->

# L'API Fetch

### L'API Fetch fournit une interface pour la récupération de ressources

```javascript
self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request).then(responseFetch => responseFetch));
});
```

<!-- .element: class="big-code" -->

<br>

Notes:
https://developer.mozilla.org/fr/docs/Web/API/Fetch_API
La méthode fetch() prend un argument obligatoire, le chemin vers la ressource souhaitée. Elle retourne une promesse qui résout la Response de cette requête, qu'elle soit couronnée de succès ou non. Vous pouvez aussi optionnellement lui passer un objet d'options init comme second argument (voir Request.)
