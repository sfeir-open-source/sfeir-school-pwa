# Notre premier Service Worker

1. Créer un fichier JS nommé service-worker.js à la racine du dossier.
2. A la fin du fichier index.html, avant les premières balises script, enregistrez votre service worker à l’aide d’un <script></script>
3. Faire un simple console.log dans votre service worker pour voir que tout fonctionne

💡 register renvoie une promise (then, catch)

# API concernée

Dans le fichier HTML

```javascript
// Détection du service worker
if ('serviceWorker' in navigator) {
}

// Enregistrement de mon service worker
navigator.serviceWorker
  .register('../service-worker.js')
  .then(() => {
    console.log('Service worker installed');
  })
  .catch(err => {
    console.error('Error registering Service Worker', err);
  });
```
