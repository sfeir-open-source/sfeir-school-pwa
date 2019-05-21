# Near me

Ajouter un bouton pour filtrer les profils en fonction de la position de l’utilisateur.

💡 Utilisez la méthode getNearestAgency(coord) pour récupérer le nom de l’agence la plus proche de la position

# Tips

- Tout se passe dans /app/components/PeopleListComponent.js
- Nous avons mis à dispo une méthode getNearestAgency(coord{lat,long}) qui renvoie l'agence la plus proche
- Afin de forcer un re-render du composant, il faut appeler la méthode `this.requestUpdate()`

# API Concernée

Dans PeopleListComponent

```javascript
// Api d'accès à la géoloc
navigator.geolocation.getCurrentPosition(
  success => {
    // success.coords = {latitude, longitude}
  },
  error => {},
  {
    enableHighAccuracy: true // Pour garantir une précision maximale
  }
);
```
