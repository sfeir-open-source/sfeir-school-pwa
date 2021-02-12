# Network Only (ou installation App-Shell)

1. Mettre en place une stratégie network only pour la partie Apis.
2. Les Appels d'APIs sont commencent tous par '/api'
3. Vérifier à l’aide de votre navigateur que tout s’est bien passé.
4. On fait cela en utilsant Workbox !

# Tips

- Pour cet exercice, laissez passer les autres appels http

# API Concernée

Formalisme d'un fichier à mettre en precache

```javascript
{ url: '/index.html', revision: null },

// Méthode de precache workbox
workbox.precaching.precacheAndRoute([...])
```
