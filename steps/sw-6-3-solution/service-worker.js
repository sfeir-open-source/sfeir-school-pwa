let getVersionPort;
let count = 0;

self.addEventListener('message', event => {
  if (event.data.action === 'INIT_PORT') {
    getVersionPort = event.ports[0];
  }

  if (event.data.action === 'SKIP_WAITING') {
    self.skipWaiting();
    getVersionPort.postMessage({ action: 'RELOAD_WINDOW' });
  }
});

self.addEventListener('install', _ => {
  getVersionPort.postMessage({ action: 'DISPLAY_DIALOG' });
});
