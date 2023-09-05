self.addEventListener('message', event => {
  if (event.data.action === 'SKIP_WAITING') {
    self.skipWaiting();
    self.clients.matchAll().then(clients => clients.map(client => client.postMessage({ action: 'RELOAD_WINDOW' })));
  }
});
