self.addEventListener('message', event => {
  // todo : exercice => renvoyer un message au client
  if (event.data.action === 'SKIP_WAITING') {
    self.skipWaiting();
    self.clients.matchAll().then(clients => clients.map(client => client.postMessage({ action: 'RELOAD_WINDOW' })));
  }
});
