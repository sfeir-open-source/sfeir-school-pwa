# Cache First

1. Mettre en place une stratégie cache first.
2. On va utiliser cette stratégie pour tout appel à des images

# Tips

- N'oubliez pas de mettre en cache le résultat du fetch.
- N'oubliez pas de traiter les cas classiques (cache pour les infos statiques et fetch pour le reste)

# API Concernée

Dans le fichier Service Worker, on va surcharger la méthode fetch

```javascript
// Cherche dans tous les caches présents
caches.match('NomDeLaRequest'); // => return Promise(result ou null)

// Récupération de l'url appelée
event.request;
```
