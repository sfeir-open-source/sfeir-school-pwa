# Implémenter la Push API (Push-1)

1. Vérifiez que vous n’avez pas encore souscrit à la push API.
2. Si vous n’avez pas encore souscrit, enregistrez vous.
3. Dans le service worker, ajouter un nouveau listener sur l’event “push”. Afficher une notification de votre choix avec un titre, un corps et une image.

Pensez à utiliser event.waitUntil ;) !

# Tips

- Comme on va utiliser le Push Companion pour tester le push, nous avons besoin de logguer les informations de souscription clients (https://web-push-codelab.glitch.me/) avec `console.log(JSON.stringify(subscription))`
- Si l'utilisateur n'est pas enregistré, il faut le souscrire
- L'événement push dans le service worker doit respecter les promesses des services workers

# API Concernée

Dans le fichier HTML au moment de la récupération du service worker :

```javascript
// Récupération des subscriptions push
swRegistration.pushManager.getSubscription().then(subscription => {
  !(subscription === null); // True si le user est déjà souscris
});

// Récupération d'une clé d'api via la méthode utilitaire dispo dans le fichier html urlB64ToUint8Array
const applicationServerKey = urlB64ToUint8Array('PublicKeyFromCompanionApp');

// Enregistrement de l'utilisateur
swRegistration.pushManager
  .subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey
  })
  .then(subscription => ... )
  .catch(err => ... );

// Désinscription de l'utilisateur (sur l'objet subscription)
subscription.unsubscribe();
```

Dans le fichier Service Worker

```javascript
// Nouvel événement
self.addEventListener('push', event => ... )

// Affichage d'une notification (return une promise)
self.registration.showNotification('Title', {
      body: 'Content',
      icon: 'urlImage',
      tag: 'tag'
    })

// Interraction avec une notification (nouvel événement)
self.addEventListener('notificationclick', event => {

// Fermeture d'une notification depuis le service worker
event.notification.close();


```
