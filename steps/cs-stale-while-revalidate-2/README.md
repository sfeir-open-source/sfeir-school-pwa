# Stale While Revalidate

1. Utiliser la stratégie Stale While Revalidate sur la home page pour afficher l'heure actuelle via l'api mock : `http://worldtimeapi.org/api/timezone/Europe/Paris`
2. A ne mettre en place uniquement que pour cette url !

# Tips

Rien de spécial

# API Concernée

Formalisme d'un fichier à mettre en precache

```javascript
// Charger les stratégies de caches
workbox.loadModule('workbox-strategies');

// Méthode de routage
workbox.routing.registerRoute(matchCB, handlerCB);

// Stratégie cache first
new workbox.strategies.StaleWhileRevalidate();
```
