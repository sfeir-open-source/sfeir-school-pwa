self.addEventListener('message', event => {
  console.log(`the service worker received a messaged : ${event.data}`);
});
