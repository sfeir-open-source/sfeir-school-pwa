<!-- .slide: class="transition bg-green" data-type-show="prez-cache on-stage"-->

# Cache Then Network

##==##

<!-- .slide: data-type-show="prez-cache on-stage" -->

# Stratégies de cache : Cache-Then-Network

![](./assets/images/cache-strategy-cache-then-network.png 'center h-800')

Notes:
Ici, on récupère le cache, et en même temps, on va chercher le network. Quand le résultat du network est là, alors on rafraichit de façon pro-active la page. Nécessite une approche en plusieurs étape

##==##

<!-- .slide: class="with-code max-height" data-type-show="prez-cache on-stage"-->

# Cache-Then-Network : example

service-worker.js

```javascript [1-2,10|3-4,7-9|5-7]
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open('dynamic').then(cache =>
      fetch(event.request).then(response => {
        cache.put(event.request, response.clone());
        return response;
      })
    )
  );
});
```

<!-- .element: class="big-code" -->

Notes:
C'est quasiment la même chose que du network first !
On ne renvoie pas directement le résultat du network !! On met en cache le résultat puis on le retourne en vue d'une prochaine mise à jour

##==##

<!-- .slide: class="with-code max-height" data-type-show="prez-cache on-stage"-->

# Cache-Then-Network : example (suite)

main.js

```javascript [1-2|3-7]
let networkDataReceived = false;
const networkUpdate = fetch('data.json')
  .then(response => response.json())
  .then(data => {
    networkDataReceived = true;
    updatePage(data);
  });
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code max-height" data-type-show="prez-cache on-stage"-->

# Cache-Then-Network : example (suite)

main.js

```javascript [1-2|3-6|7-9|10]
caches
  .match('data.json')
  .then(response => {
    if (!response) throw Error('No data');
    return response.json();
  })
  .then(data => {
    if (!networkDataReceived) updatePage(data);
  })
  .catch(_ => networkUpdate);
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="exercice" data-type-show="on-stage" -->

# Cache Then Network

## Lab

<br>

1. Utiliser la stratégie Cache Then Network sur la home page pour afficher l'heure actuelle via l'api mock : `http://worldtimeapi.org/api/timezone/Europe/Paris`
1. A ne mettre en place uniquement que pour cette url !
1. Mettre en place un timeout dans la chaine d'appel pour avoir le temps d'afficher le résultat du cache

### Step: cs-cache-then-network-1

##==##

<!-- .slide: class="with-code max-height" data-type-show="prez-cache on-stage"-->

# Cache-Then-Network : Avec Workbox

service-worker.js

```javascript [4-9]
import { registerRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';

registerRoute(
  ...,
  new NetworkFirst({
    cacheName: 'NetworkFirst'
  })
);
```

<!-- .element: class="big-code" -->

Notes:
On reste en Network first car l'objectif est d'aller sur le serveur, par contre on garde le même code front !

##==##

<!-- .slide: class="exercice" data-type-show="on-stage" -->

# Cache Then Network avec Workbox

## Lab

<br>

1. Utiliser la stratégie Cache Then Network sur la home page pour afficher l'heure actuelle via l'api mock : `http://worldtimeapi.org/api/timezone/Europe/Paris`
1. A ne mettre en place uniquement que pour cette url !
1. Mettre en place un timeout dans la chaine d'appel pour avoir le temps d'afficher le résultat du cache

### Step: cs-cache-then-network-2

##==##

<!-- .slide: class="transition bg-white" data-type-show="prez-cache on-stage"-->

# Avec les frameworks

##==##

<!-- .slide: class="with-code" data-type-show="prez-cache on-stage"-->

# Avec Angular

Comme pour la strategie network First. La clé réside dans la partie front et donc dans notre appel avec le client httpClient.

<!-- .element: class="big-code" -->

Notes:
