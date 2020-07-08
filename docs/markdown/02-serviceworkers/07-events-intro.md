<!-- .slide: data-background="./assets/images/event_bg.jpg" -->

Notes:

##==##

<!-- .slide: class="with-code" -->

# Service Worker : AddEventListener

```javascript
self.addEventListener('event-name', event => {
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
self.addEventListener('install', event => { ... });
```

<!-- .element: class="big-code" -->

```javascript
self.addEventListener('activate', event => { ... });
```

<!-- .element: class="big-code" -->

```javascript
self.addEventListener('message', event => { ... });
```

<!-- .element: class="big-code" -->

```javascript
self.addEventListener('fetch', event => { ... });
```

<!-- .element: class="big-code" -->

```javascript
self.addEventListener('push', event => { ... });
```

<!-- .element: class="big-code" -->

```javascript
self.addEventListener('sync', event => { ... });
```

<!-- .element: class="big-code" -->
