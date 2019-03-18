<!-- .slide: class="quote" data-background="#fb8c00" -->

<p class="quotation">
treat the very first time a service worker install differently from how you treat all future updates
</p>

##==##

<br>

<!-- .slide: class="with-code" data-background="#fb8c00" -->

```javascript
const wb = new Workbox('/sw.js');

wb.addEventListener('installed', event => {
  if (!event.isUpdate) {
    // First-installed code goes here...
  }
});

wb.register();
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code flex-row" -->

# Explanation

```javascript
const register = async () => {
  const isUpdate = Boolean(navigator.serviceWorker.controller);
  const registration = await navigator.serviceWorker.register('sw.js');
  ...
};

register();
```

<!-- .element: class="big-code" -->

SW.controller returns a ServiceWorker object if its state is activated

or null if the request is a force refresh (Shift + refresh)

**or if there is no active worker**

##==##

<!-- .slide: class="with-code flex-row" -->

# Explanation

## filtering

```javascript
const register = async () => {
  ...
  registration.addEventListener('updatefound', () => {
    onUpdateFound(registration.installing, isUpdate);
  });
};

register();
```

<!-- .element: class="big-code" -->

<br>

If the service worker hasn't changed since the last time it was registered

than the updatefound event will not be fired.

##==##

# Explanation

## state change

<br>

<!-- .slide: class="with-code flex-row" -->

```javascript
const onUpdateFound = (installingSW, isUpdate) => {
  installingSW.addEventListener('statechange', e => {
    onStateChange(e, isUpdate);
  });
};
```

<!-- .element: class="big-code" -->

##==##

# Explanation

## final handling

<br>

<!-- .slide: class="with-code" -->

```javascript
const onStateChange = (originalEvent, isUpdate) => {
  const { state } = originalEvent.target;
  if (state === 'installed' && !isUpdate) {
    // First-installed code goes here...
  }
};
```

<!-- .element: class="big-code" -->
