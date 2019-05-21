# Fullscreen People

Ajouter un bouton sur les PeopleCard permettant d’afficher un people en fullscreen.

# API Concernée

Dans le fichier PeopleCardComponent

```javascript
// Méthodes de fullscreen en fonction du navigateur
const requestFullScreen =
  docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;

// Méthodes d'annulation de fullscreen
const cancelFullScreen =
  doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

// Vérification du fullscreen
!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement;
```
