# Bye bye le cache

Lors de l’event “activate”, supprimer le cache dynamic !

💡caches.delete(‘cache-name’);

# API Concernée

Dans le fichier service worker

```javascript
// Supprimer un cache
caches.delete('NomDeMonCache');
```
