<!-- .slide: class="transition-white sfeir-bg-blue" -->

# Push API

##==##

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

# Réengageante

![center h-700](./assets/images/rengaging.png)

##==##

# Support

![center h-800](./assets/images/caniuse_push.png)

Notes:
MAJ: 2018-08-31

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
