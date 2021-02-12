<!-- .slide: class="transition bg-green" -->

# Offline Cookbook - Bonus

##==##

# Offline Cookbook

Ensemble de recettes offline exposées par Jake Archibald (Chrome Engineer et inventeur du service worker) : [Offline Cookbook](https://web.dev/offline-cookbook/)

- On Install - as a dependency
- On Install - not as a dependency
- On Activate
- On user interaction
- On network response = cache first
- On push message
- Cache and network race
- Service worker-side templating

Notes:
Si il existe une version en cache, on l'utilise, sinon, on prend celle du serveur, sinon, on prend un résultat par défaut

##==##

# On Install - as a dependency

![center h-800](./assets/images/cm-on-install-dep.png)

Notes:
Utile pour les données de l'appCache

##==##

<!-- .slide: class="with-code" -->

# On Install - as a dependency : example

service-worker.js

```javascript
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('mysite-static-v3').then(function(cache) {
      return cache.addAll([
        '/css/whatever-v3.css',
        '/css/imgs/sprites-v6.png',
        '/css/fonts/whatever-v8.woff',
        '/js/all-min-v4.js'
        // etc.
      ]);
    })
  );
});
```

<!-- .element: class="big-code" -->

##==##

# On Install - not as a dependency

![center h-800](./assets/images/cm-on-install-not.png)

Notes:
Utile pour précharger des données sans tout attendre ! Genre mise en cache de pleins d'éléments mais on priorise uniquement une certaine mise en cache

##==##

<!-- .slide: class="with-code" -->

# On Install - not as a dependency : example

service-worker.js

```javascript
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('mygame-core-v1').then(function(cache) {
      cache
        .addAll
        // levels 11–20
        ();
      return cache
        .addAll
        // core assets and levels 1–10
        ();
    })
  );
});
```

<!-- .element: class="big-code" -->

##==##

# On Activate

![center h-800](./assets/images/cm-on-activate.png)

Notes:

Stratégie classique de nétoyage de cache sur activation du service worker

##==##

<!-- .slide: class="with-code" -->

# On Activate : example

service-worker.js

```javascript
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames
          .filter(function(cacheName) {
            // Return true if you want to remove this cache,
            // but remember that caches are shared across
            // the whole origin
          })
          .map(function(cacheName) {
            return caches.delete(cacheName);
          })
      );
    })
  );
});
```

<!-- .element: class="big-code" -->

##==##

# On user interaction

![center h-450](./assets/images/cm-on-user-interaction.png)

Notes:
Cas un peu plus original, on se sert d'une interaction utilisateur pour directement mettre en cache certaines données -> une sorte de read it later !

##==##

<!-- .slide: class="with-code" -->

# On user interaction : example

service-worker.js

```javascript
document.querySelector('.cache-article').addEventListener('click', function(event) {
  event.preventDefault();

  var id = this.dataset.articleId;
  caches.open('mysite-article-' + id).then(function(cache) {
    fetch('/get-article-urls?id=' + id)
      .then(function(response) {
        // /get-article-urls returns a JSON-encoded array of
        // resource URLs that a given article depends on
        return response.json();
      })
      .then(function(urls) {
        cache.addAll(urls);
      });
  });
});
```

<!-- .element: class="big-code" -->

##==##

# On push message

![center h-800](./assets/images/cm-on-push.png)

Notes:
Ce qui est intéressant c'est qu'on met en cache les données sur un push avant d'afficher la notification qui amènera l'utilisateur à ouvrir la page avec le résultat déjà présent

##==##

<!-- .slide: class="with-code" -->

# On push message : example

service-worker.js

```javascript
self.addEventListener('push', function(event) {
  if (event.data.text() == 'new-email') {
    event.waitUntil(
      caches
        .open('mysite-dynamic')
        .then(function(cache) {
          return fetch('/inbox.json').then(function(response) {
            cache.put('/inbox.json', response.clone());
            return response.json();
          });
        })
        .then(function(emails) {
          registration.showNotification('New email', {
            body: 'From ' + emails[0].from.name,
            tag: 'new-email'
          });
        })
    );
  }
});

self.addEventListener('notificationclick', function(event) {
  if (event.notification.tag == 'new-email') {
    // Assume that all of the resources needed to render
    // /inbox/ have previously been cached, e.g. as part
    // of the install handler.
    new WindowClient('/inbox/');
  }
});
```

<!-- .element: class="big-code" -->

##==##

# Cache and network race

![center h-800](./assets/images/ss-cache-and-network-race.png)

Notes:
Dans le cas où les disques sont très lent d'accès (antivirus, ...)

##==##

<!-- .slide: class="with-code" -->

# Cache and network race : example

service-worker.js

```javascript
self.addEventListener('fetch', function(event) {
  event.respondWith(Promise.any([caches.match(event.request), fetch(event.request)]));
});
```

<!-- .element: class="big-code" -->

##==##

# Service worker-side templating

![center h-800](./assets/images/ss-sw-side-templating.png)

Notes:
Cas où on va faire du SSR mais côté service worker. On ne solicite plus le serveur que pour les données

##==##

<!-- .slide: class="with-code" -->

# Service worker-side templating : example

service-worker.js

```javascript
importScripts('templating-engine.js');

self.addEventListener('fetch', function(event) {
  var requestURL = new URL(event.request.url);

  event.respondWith(
    Promise.all([
      caches.match('/article-template.html').then(function(response) {
        return response.text();
      }),
      caches.match(requestURL.path + '.json').then(function(response) {
        return response.json();
      })
    ]).then(function(responses) {
      var template = responses[0];
      var data = responses[1];

      return new Response(renderTemplate(template, data), {
        headers: {
          'Content-Type': 'text/html'
        }
      });
    })
  );
});
```

<!-- .element: class="big-code" -->
