<!-- .slide: class="transition bg-blue" -->

# Syncrhonisation de données

##==##

# Avant le Background-sync

1. Sortir le téléphone de la poche
1. Envoyer quelque chose sur internet
1. Réessayer de renvoyer à intervals réguliers la données
1. Mettre en place un mécanisme de relance au démarrage de l'application au cas où

<br /><br /><br /><br />
![h-300](./assets/images/wifi_no-wifi.png)
Connexion toujours disponible ?

##==##

<!-- .slide: class="full-center" -->

# Background-sync

1. Sortir le téléphone de la poche
1. Envoyer quelque chose sur internet
1. Remettre le téléphone dans la poche
1. Reprendre la vie
1. Recommencer 🙃

<br /><br /><br /><br />
![h-300](./assets/images/wifi_no-wifi.png)
Connexion toujours disponible ?

##==##

<!-- .slide: class="with-code" -->

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

<!-- .slide: class="with-code" -->

# Real World Code

main.js

```javascript
try{
  const options = {method: POST, body: content};
  await fetch('server/api', options);
}catch(404Error){
  // No network
  // Store in IndexedDB datas
  storeInIndexDB({uri: 'server/api', options});
  // Ask to service worker to sync when available
  navigator.serviceWorker.ready.then(swRegistration => swRegistration.sync.register('myFirstSync');
}
```

Notes:

##==##

<!-- .slide: class="with-code" -->

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
      })
    );
  }
});
```

Notes:

##==##

# Utilisabilité

![h-600](./assets/images/caniuse-background-sync.png)

Notes: 03/07/2019
