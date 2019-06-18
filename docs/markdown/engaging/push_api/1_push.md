<!-- .slide: class="flex-row" -->

# ⚠ Ne pas confondre

<br><br>

<p>
    <span>
    Notification API<br>
    ⇒ Notification “Native”<br>
    ⇒ Intégration
    </span>
    <span>
    Push API<br>
    ⇒ server to browser<br>
    ⇒ (re-)engagement
    </span>
</p>

<br>

Complémentaires

##==##

<!-- .slide: data-background="#dcdee0" class="transition no-margin" -->

![center h-800](./assets/images/notification_icon.png)

# Notification API

Notes:
https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API/Using_the_Notifications_API

##==##

# Des notifications intégrées

<br>

## Permet d'afficher des notifications natives

![center h-600](./assets/images/notifications.png)

Notes:
The Notifications API lets a web page or app send notifications that are displayed outside the page at the system level; this lets web apps send information to a user even if the application is idle or in the background. This article looks at the basics of using this API in your own apps.

##==##

<!-- .slide: class="flex-row" -->

# Qu'est ce qu'une bonne notification ?

<br><br>

![w-600](./assets/images/car_notification.png)
![w-600](./assets/images/good_notification.svg)

Notes:
It’s timely, my car has arrived.
It’s precise, I need to act on it and get into my car.
And it’s relevant - something I should be interested in.

##==##

<!-- .slide: class="flex-row" -->

# Qu'est ce qu'une bonne notification ?

<br><br>

![w-600](./assets/images/bad_app_notification.png)
![w-600](./assets/images/bad_notification.svg)

Notes:
You’ll have opportunities to monetize the user experience once they’re in your app. [CLICK] Don’t blow it by spamming your users when they’re not. If you spam your users with notifications, they may stop allowing them altogether.

##==##

<!-- .slide: class="with-code" -->

# L’objet Notification

```javascript
function notifyMe() {
  // Let's check if the browser supports notifications
  if (!('Notification' in window)) {
    alert('This browser does not support desktop notification');
  }
  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === 'granted') {
    // If it's okay let's create a notification
    var notification = new Notification('Hi there!');
  }
  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function(permission) {
      // If the user accepts, let's create a notification
      if (permission === 'granted') {
        var notification = new Notification('Hi there!');
      }
    });
  }
}
```

Notes:
At last, if the user has denied notifications, there is no need to bother them any more.
The Notification interface of the Notifications API is used to configure and display desktop notifications to the user. These notifications' appearance and specific functionality vary across platforms but generally they provide a way to asynchronously provide information to the user.

Assume this basic HTML:
<button onclick="notifyMe()">Notify me!</button>
It's possible to send a notification as follows — here we present a fairly verbose and complete set of code you could use if you wanted to first check whether notifications are supported, then check if permission has been granted for the current origin to send notifications, then request permission if required, before then sending a notification.

##==##

<!-- .slide: class="with-code" -->

# Fermer une notification

<br><br>

```javascript
setTimeout(notification.close.bind(notification), 4000);
```

<!-- .element: class="big-code" -->

<br>

Notes:
Firefox and Safari close notifications automatically after a few moments (around four seconds). This may also happen at the operating system level. Some browsers don't however, such as Chrome. To make sure that the notifications close in all browsers, you can call the Notification.close function inside a setTimeout() function to close the notification after 4 seconds. Also note the use of bind() to make sure the close() call is associated with the notification.

Note: When you receive a "close" event, there is no guarantee that it's the user who closed the notification. This is in line with the specification, which states: "When a notification is closed, either by the underlying notifications platform or by the user, the close steps for it must be run."

##==##

# Réengageante

![center h-700](./assets/images/rengaging.png)

##==##

# Support

![center h-800](./assets/images/caniuse_notification.png)

Notes:
MAJ: 2019-06-18

##==##

<!-- .slide: data-background="#dcdee0" class="transition no-margin" -->

![center h-800](./assets/images/cloud_messaging.svg)

# Push API

Notes:
https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API/Using_the_Notifications_API

##==##

<!-- .slide: class="flex-row" -->

# Partie client

<br>

![border-circle blue w-300](./assets/images/permission_logo.png)
![border-circle blue w-300](./assets/images/subscription_logo.png)
![border-circle blue w-300](./assets/images/pubsub_logo.png)

<p>
<span class="center">Obtenir la permission<br>pour envoyer des<br>notifications</span>
<span class="center">Souscrire et obtenir<br><strong>PushSubscription</strong></span>
<span class="center">Envoyer<br><strong>PushSubscription</strong> à<br>votre serveur</span>
</p>

##==##

<!-- .slide: class="flex-row" -->

# Envoyer un message

<br>

![border-circle blue w-300](./assets/images/message_server_logo.png)
![border-circle blue w-300](./assets/images/http_logo.png)
![border-circle blue w-300](./assets/images/airplane_logo.png)
![border-circle blue w-300](./assets/images/to_device_logo.png)

<p>
<span class="center">Créer un<br>message sur<br>votre serveur</span>
<span class="center">Envoyer au<br>service de Push</span>
<span class="center">Le Push service<br>délivre le<br>message</span>
<span class="center">Le message<br>arrive sur vos<br>appareils</span>
</p>

##==##

<!-- .slide: class="flex-row" -->

# Recevoir un message

<br>

![border-circle blue w-300](./assets/images/download_logo.png)
![border-circle blue w-300](./assets/images/light_logo.png)
![border-circle blue w-300](./assets/images/ring_logo.png)

<p>
<span class="center">Le message arrive sur<br>votre appareil</span>
<span class="center">Le navigateur réveil le<br>service worker</span>
<span class="center">Capture l'événement<br><strong>push</strong> et montre la<br>notification</span>
</p>

##==##

<!-- .slide: class="with-code" -->

# Vérifier les souscriptions

```javascript
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(function(reg) {
      reg.pushManager.getSubscription()
        .then(function(sub) {
          console.log('Subscription Info', sub);
        });
    });
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code" -->

# S'abonner

```javascript
function subscribe() {
  navigator.serviceWorker.getRegistration().then(function(reg) {
    reg.pushManager.subscribe({userVisibleOnly: true})

```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code" -->

# S'abonner

```javascript
function subscribe() {
  navigator.serviceWorker.getRegistration().then(function(reg) {
    reg.pushManager.subscribe({userVisibleOnly: true})
    .then(function(sub) {
        console.log('Update Server with End Point', sub);
      }).catch(function(error) {
        console.log('Unable to subscribe user', error);
      });

```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code" -->

# Se désabonner

```javascript
reg.pushManager.getSubscription().then(function(sub) {
  if (sub) {
    sub.unsubscribe();
    console.log('Unsubscribe - user has been unsubscribed!');
  }
});
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code" -->

# Traiter une notification

```javascript
self.addEventListener('push', function(event) {...}
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code" -->

# Traiter une notification

```javascript
self.addEventListener('push', function(event) {
    ...
    self.registration.showNotification('Title', {
        body: 'I\'m the message body',
        icon: 'images/icons.png',
        tag: 'tag'
      })
}
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code" -->

# De vrais données

```javascript
fetch('/notification.json').then(function(response) {
  return response.json();
});
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code" -->

# De vrais données

```javascript
fetch('/notification.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.avatar,
      tag: data.mail
    });
  });
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code" -->

# Proposer des actions

```javascript
self.registration.showNotification(data.title, {
  body: data.body,
  icon: data.icons,
  tag: data.tag,
  actions: [{ action: 'open', title: 'Show me more details' }, { action: 'cancel', title: 'No thanks' }]
});
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code" -->

# Gérer l'action

```javascript
self.addEventListener('notificationclick', function(event) {...});
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code" -->

# Gérer l'action

```javascript
self.addEventListener('notificationclick', function(event) {
  var url;
  event.notification.close();
  if (event.action === 'open') {
    url = 'http://localhost:8080/#/people/' + event.notification.tag;
  }
});
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code" -->

# Gérer l'action

```javascript
self.addEventListener('notificationclick', function(event) {
    var url;
    ...
    clients.openWindow(url);
});
```

<!-- .element: class="big-code" -->

##==##

# Support

![center h-800](./assets/images/caniuse_push.png)

Notes:
MAJ: 2018-08-31
