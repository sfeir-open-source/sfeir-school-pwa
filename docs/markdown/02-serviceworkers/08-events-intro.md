<!-- .slide: data-background="./assets/images/event_bg.jpg" data-type-show="on-stage" -->

Notes:

##==##

<!-- .slide: class="with-code" data-type-show="on-stage"-->

# Service Worker : AddEventListener

```javascript
self.addEventListener('event-name', event => {
  ...
});
```

<!-- .element: class="big-code" -->

<br>

##==##

<!-- .slide: data-type-show="on-stage" -->

# Service Worker : Events

![](./assets/images/events_sw.png 'center h-500')

Notes:
install =>

##==##

<!-- .slide: class="with-code" data-type-show="on-stage" -->

# Service Worker : AddEventListener

```javascript
self.addEventListener('install', event => ... );
```

<!-- .element: class="big-code" -->

```javascript
self.addEventListener('activate', event =>  ... );
```

<!-- .element: class="big-code" -->

```javascript
self.addEventListener('message', event => ... );
```

<!-- .element: class="big-code" -->

```javascript
self.addEventListener('fetch', event => ... );
```

<!-- .element: class="big-code" -->

```javascript
self.addEventListener('push', event =>  ... );
```

<!-- .element: class="big-code" -->

```javascript
self.addEventListener('sync', event => ... );
```

<!-- .element: class="big-code" -->
