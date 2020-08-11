// todo : exercice => écouter les messages reçus
self.addEventListener('message', event => {
  console.log(`the service worker received a message : ${event.data}`);
});
