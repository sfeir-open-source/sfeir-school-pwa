# Offline.html

1. Mettre le fichier offline.html dans le cache.
2. Lors d’un fetch rejeté, renvoyer la page offline.html depuis le cache

# Tips

- Catcher une erreur sur un appel http avec la méthode `catch`

# API Concernée

Dans le fichier Service Worker

```javascript
// Chercher dans le cache un fichier
cache.match('NomDuFichierRecherché');
```
