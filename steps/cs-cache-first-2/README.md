# Cache first

1. Mettre en place une stratégie cache first.
2. On va utiliser cette stratégie pour tout appel à des images
3. On fait cela en utilsant Workbox !

# Tips

- On peut continuer de mettre en cache les données statiques comme dans la solution du cache only

# API Concernée

Formalisme d'un fichier à mettre en precache

```javascript
// Charger les stratégies de caches
workbox.loadModule('workbox-strategies');

// Méthode de routage
workbox.routing.registerRoute(matchCB, handlerCB);

// Stratégie cache first
new workbox.strategies.CacheFirst();
```
