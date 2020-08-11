// todo : exercice => create the Broadcast instance
const broadcast = new BroadcastChannel('install-channel');

broadcast.onmessage = event => {
  if (event.data.action === 'SKIP_WAITING') {
    self.skipWaiting();
    // todo : exercice => postMessage to the broadcast instance
    broadcast.postMessage({ action: 'RELOAD_WINDOW' });
  }
};

self.addEventListener('install', _ => {
  // todo : exercice => postMessage to the broadcast instance
  broadcast.postMessage({ action: 'DISPLAY_DIALOG' });
});
