# Mettons en place du background Sync

1. Remplacer le système de longpolling mis en place pour la syncrhonisation offline par le background sync

# Tips

- Editer le fichier service worker pour rajouter l'inscription à l'événement 'sync' et ajouter les méthodes nécessaire à la lecture dans indexedDB
- Editer le fichier longpolling pour s'enregister au background sync à la place de faire appel au setTimeout

# Api concernée

## main.js

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

## service-worker.js

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

## IndexedDB dans le service worker

```javascript
self.importScripts('https://cdn.jsdelivr.net/npm/idb@4.0.5/build/iife/with-async-ittr-min.js');

// Ouverture d'une base
const db = await idb.openDB('myDataBase', 1, {
  upgrade: upgrade
});

// Création d'un store
db.createObjectStore('myStore');
// Suppression d'un enregistrement
db.delete('myStore', id);

// Récupération d'un enregistrement
let cursor = await db.transaction('myStore').store.openCursor();
while (cursor) {
  // Do some stuff
  cursor = await cursor.continue();
}
```
