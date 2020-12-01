# Cache Only (ou installation App-Shell)

1. Mettre en place une stratégie cache only. Le meilleur cas d'utilisation est l'app-shell.
2. Après avoir identifié les fichiers importants pour notre app-shell, ajoutez les dans le cache lors de l’event “install” de votre service worker.
3. Vérifier à l’aide de votre navigateur que tout s’est bien passé.
4. On fait cela en utilsant Workbox !

# Tips

- Utilisez les devtools de chrome, onglet network pour analyser les fichiers appelés au démarrage de l'application
- Mettez en cache dans l'événement d'installation
- N'oubliez pas de redonner la main au service worker après la mise en cache
- Pour cet exercice, laissez passer les autres appels http

# API Concernée

Formalisme d'un fichier à mettre en precache

```javascript
{ url: '/index.html', revision: null },

// Méthode de precache workbox
workbox.precaching.precacheAndRoute([...])
```
