<!-- .slide: data-background="./assets/images/event_bg.jpg" -->

Notes:

##==##

<!-- .slide: class="with-code" -->

# Service Worker : AddEventListener

```javascript
self.addEventListener('event-name', function(event){
  ...
});
```

<!-- .element: class="big-code" -->

<br>

##==##

# Service Worker : Events

![center h-500](./assets/images/events_sw.png)

Notes:
install =>

##==##

<!-- .slide: class="with-code" -->

# Service Worker : AddEventListener

```javascript
self.addEventListener('install', function (event) { ... });
```

<!-- .element: class="big-code" -->

```javascript
self.addEventListener('activate', function (event) { ... });
```

<!-- .element: class="big-code" -->

```javascript
self.addEventListener('message', function (event) { ... });
```

<!-- .element: class="big-code" -->

```javascript
self.addEventListener('fetch', function (event) { ... });
```

<!-- .element: class="big-code" -->

```javascript
self.addEventListener('push', function (event) { ... });
```

<!-- .element: class="big-code" -->

```javascript
self.addEventListener('sync', function (event) { ... });
```

<!-- .element: class="big-code" -->
