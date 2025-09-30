<!-- .slide: class="transition bg-blue" data-type-show="on-stage" -->

# Syncrhonisation de données

##==##

<!-- .slide: class="full-center" data-type-show="on-stage" -->

# Avant le Background-sync

1. Sortir le téléphone de la poche
1. Envoyer quelque chose sur internet
1. Réessayer de renvoyer à intervals réguliers la données
1. Mettre en place un mécanisme de relance au démarrage de l'application au cas où

<br><br><br><br>
![](./assets/images/wifi_no-wifi.png 'h-300')
Connexion toujours disponible ?

Notes:

##==##

<!-- .slide: class="full-center" data-type-show="on-stage" -->

# Background-sync

1. Sortir le téléphone de la poche
1. Envoyer quelque chose sur internet
1. Remettre le téléphone dans la poche
1. Reprendre la vie
1. Recommencer 🙃

<br><br><br><br>
![](./assets/images/wifi_no-wifi.png 'h-300')
Connexion toujours disponible ?

Notes:

##==##

<!-- .slide: class="with-code" data-type-show="on-stage" -->

# Background-sync

main.js

```javascript
navigator.serviceWorker.ready.then(swRegistration => swRegistration.sync.register('myFirstSync'));
```

<!-- .element: class="big-code" -->

service-worker.js

```javascript
self.addEventListener('sync', event => {
  if (event.tag === 'myFirstSync') {
    event.waitUntil(doSomeStuff());
  }
});
```

<!-- .element: class="big-code" -->

Notes:
Et c'est tout.
doSomeStuff return Promise indique success/fail<br/>
Si fail, programme un autre essai, delai exponentiel<br/>
tag = unique sinon ecrase

##==##

<!-- .slide: class="with-code" data-type-show="on-stage" -->

# Real World Code

main.js

```javascript
try{
  const options = {method: POST, body: content};
  await fetch('server/api', options);
}catch(404Error){
  storeInIndexDB({uri: 'server/api', options});
  // Ask to service worker to sync when available
  navigator.serviceWorker.ready
  .then(swRegistration => swRegistration.sync.register('myFirstSync');
}
```

<!-- .element: class="big-code" -->

Notes:

##==##

<!-- .slide: class="with-code" data-type-show="on-stage" -->

# Real World Code

service-worker.js

```javascript
self.addEventListener('sync', event => {
  if (event.tag === 'myFirstSync')) {
    event.waitUntil(
      new Promise(async (resolve, reject) => {
        const dataStored = await getStoreDataFromIndexedDB();
        await fetch(dataStored.uri, dataStored.options);
        resolve();
      }) );  }
});
```

<!-- .element: class="big-code" -->

Notes:

##==##

<!-- .slide: class="with-code"  data-background="#fb8c00" data-type-show="on-stage" -->

# BackgroundSync - Wokrbox

<!-- .element: style="color:white" -->

service-worker.js

```javascript
import { BackgroundSyncPlugin } from 'workbox-background-sync';
import { registerRoute } from 'workbox-routing';
import { NetworkOnly } from 'workbox-strategies';
const bgSyncPlugin = new BackgroundSyncPlugin('myQueueName', {
  maxRetentionTime: 24 * 60 // Retry for max of 24 Hours (specified in minutes)
});
registerRoute(
  /\/api\/.*\/*.json/,
  new NetworkOnly({
    plugins: [bgSyncPlugin]
  }),
  'POST'
);
```

Notes:

##==##

<!-- .slide: data-type-show="on-stage" -->

# Utilisabilité

![](./assets/images/caniuse-background-sync.png 'h-600')

Notes: 03/07/2019

##==##

<!-- .slide: class="exercice" data-type-show="on-stage"-->

# Mettons en place du background Sync

## Lab

<br>

1. Remplacer le système de longpolling mis en place pour la syncrhonisation offline par le background sync

### Step: sync-1

##==##

<!-- .slide: class="transition bg-blue" data-type-show="on-stage" -->

# Periodic Background Sync

##==##

<!-- .slide: data-type-show="on-stage" -->

## PBS: Periodic Background Sync

> Periodic Background Sync enables web applications to periodically synchronize data in the background, bringing web apps closer to the behavior of a native app.

Notes:
Infos du 03/09/20

##==##

<!-- .slide: class="with-code" data-type-show="on-stage" -->

# Demander l'autorisation

main.js

```javascript
const status = await navigator.permissions.query({
  name: 'periodic-background-sync'
});
if (status.state === 'granted') {
  // Periodic background sync can be used.
} else {
  // Periodic background sync cannot be used.
}
```

<!-- .element: class="big-code" -->

Notes:
Toujours demander l'autorisation !!

##==##

<!-- .slide: class="with-code" data-type-show="on-stage" -->

## Enregistrement du PBS

main.js

```javascript
const registration = await navigator.serviceWorker.ready;
if ('periodicSync' in registration) {
  try {
    await registration.periodicSync.register('content-sync', {
      // An interval of one day.
      minInterval: 24 * 60 * 60 * 1000
    });
  } catch (error) {} // Periodic background sync cannot be used.
}
```

<!-- .element: class="big-code" -->

Notes:
Attention, il est bien question de temps minimum d'enregistrement !!
En général, pas plus d'une syncrho par jour !

##==##

<!-- .slide: class="with-code" data-type-show="on-stage" -->

## Désinscription du PBS

main.js

```javascript
const registration = await navigator.serviceWorker.ready;
if ('periodicSync' in registration) {
  await registration.periodicSync.unregister('content-sync');
}
```

<!-- .element: class="big-code" -->

Notes:

##==##

<!-- .slide: class="with-code" data-type-show="on-stage" -->

## Réponse à un pbs event

serviceworker.js

```javascript
self.addEventListener('periodicsync', event => {
  if (event.tag === 'content-sync') {
    // See the "Think before you sync" section for
    // checks you could perform before syncing.
    event.waitUntil(syncContent());
  }
  // Other logic for different tags as needed.
});
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: data-type-show="on-stage" -->

# Utilisabilité

![](./assets/images/caniuse_pbs.png 'h-600')

Notes: 03/09/2020
