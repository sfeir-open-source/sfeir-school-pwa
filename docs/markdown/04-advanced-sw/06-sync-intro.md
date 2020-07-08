<!-- .slide: class="transition bg-blue" -->

# Background Sync

##==##

<!-- .slide: class="full-center" -->

# Background-sync

<ol>
  <li>Sortir le téléphone de la poche</li>
  <li>Envoyer quelque chose sur internet</li>
  <li>Remettre le téléphone dans la poche</li>
  <li>Reprendre la vie</li>
  <li>Recommencer 🙃</li>
<ol>

<br /><br /><br /><br />
![h-300](./assets/images/wifi_no-wifi.png)
Connexion toujours disponible ?

##==##

<!-- .slide: class="with-code" -->

# Background-sync

main.js

```javascript
navigator.serviceWorker.ready.then(swRegistration => {
  return swRegistration.sync.register('myFirstSync');
});
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

# Utilisabilité

![h-600](./assets/images/caniuse-background-sync.png)

Notes: 03/07/2019
