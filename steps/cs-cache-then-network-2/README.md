# Cache Then Network

1. Utiliser la stratégie Cache Then Network sur la home page pour afficher l'heure actuelle via l'api mock : `http://worldtimeapi.org/api/timezone/Europe/Paris`
2. A ne mettre en place uniquement que pour cette url !
3. Mettre en place un timeout dans la chaine d'appel pour avoir le temps d'afficher le résultat du cache

# Tips

- Pour mettre en standby et simuler la latence une latence réseau l'appel, mettez en place un timeout sur le résultat du fetch

```javascript
fetch(myUrl) //
  .then(response => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(response.json());
      }, 5000);
    });
  }) //
  .then(json => json);
```

- N'oubliez pas de récupérer en parallèle depuis votre script applicatif les données du cache en utilisant l'api `caches`.

# API Concernée

Formalisme d'un fichier à mettre en precache

```javascript
// Charger les stratégies de caches
workbox.loadModule('workbox-strategies');

// Méthode de routage
workbox.routing.registerRoute(matchCB, handlerCB);

// Stratégie cache first
new workbox.strategies.NetworkFirst();
```
