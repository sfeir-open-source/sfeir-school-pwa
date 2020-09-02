import { openDB, deleteDB, wrap, unwrap } from 'idb';

function upgrade(db) {
  db.createObjectStore('request');
}

async function cleanRequest(id) {
  const db = await openDB('failedRequestDB', 1, {
    upgrade: upgrade
  });

  await db.delete('request', id);
}

async function storeRequestDB(url, options) {
  const db = await openDB('failedRequestDB', 1, {
    upgrade: upgrade
  });

  await db.put('request', { url, options }, `failedRequest${Date.now()}`);
}

async function getFailedRequest() {
  const db = await openDB('failedRequestDB', 1, {
    upgrade: upgrade
  });

  let cursor = await db.transaction('request').store.openCursor();

  const requestArray = [];
  while (cursor) {
    console.log(cursor.key, cursor.value);
    requestArray.push({ id: cursor.key, value: cursor.value });
    cursor = await cursor.continue();
  }
  return requestArray;
}

async function recursiveLongPolling() {
  const requestArray = await getFailedRequest();
  if (requestArray) {
    let error = false;
    for (let request of requestArray) {
      try {
        await fetch(request.value.url, request.value.options);
        await cleanRequest(request.id);
      } catch (e) {
        console.error(e);
        error = true;
      }
    }
    if (error) {
      setTimeout(recursiveLongPolling, 10 * 1000);
    }
  }
}

function registerBackgroundSync() {
  if (!navigator.serviceWorker) {
    return console.error('Service Worker not supported');
  }

  navigator.serviceWorker.ready
    .then(registration => registration.sync.register(`testSync${Date.now()}`))
    .then(() => console.log('Registered background sync'))
    .catch(err => console.error('Error registering background sync', err));
}

export async function longPolling(url, options) {
  await storeRequestDB(url, options);
  registerBackgroundSync();
  //setTimeout(recursiveLongPolling, 10 * 1000);
}
