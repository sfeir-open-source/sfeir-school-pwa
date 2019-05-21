# Cache-cache

1. <del>Ajouter l’ensemble des fichiers du app-shell dans le cache</del> (déjà fait)
2. <del>Lors du fetch d’une ressource connue, renvoyez là sinon fetch</del> (déjà fait).
3. Mettre en cache toutes les autres réponses, dans un cache nommé dynamic, lors de l’événement Fetch

# Tips

- Pensez à ouvrir un nouveau cache pour y stocker les nouvelles réponses

# API Concernée

Dans le fichier Service Worker

```javascript
// Ajout d'une nouvelle entrée dans le cache
cache.put(event.request /* Objet request */, content /* Blob, json, stream*/);

// Récupérer le contenu d'une réponse fetch
responseFetch.clone();
```
