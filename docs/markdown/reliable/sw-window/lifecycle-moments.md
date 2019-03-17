<!-- .slide: class="transition-white" data-background="#fb8c00" -->

# Important Lifecycle Moments

Notes:
See [the associated documentation](https://developers.google.com/web/tools/workbox/modules/workbox-window#important_service_worker_lifecycle_moments) for the Workbox solution.

##==##

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

<!-- .slide: class="with-code" -->

<br><br>

```javascript
async register({immediate = false} = {}) {
  ...
  // Set this flag to true if any service worker was controlling the page
  // at registration time.
  this._isUpdate = Boolean(navigator.serviceWorker.controller);
  ...
  this._registration = await this._registerScript();
  ...
}
```

<!-- .element: class="big-code" -->

Notes:
https://github.com/GoogleChrome/workbox/pull/1905/files

##==##

# navigator.serviceWorker.controller

<br><br>

- returns a ServiceWorker object if its state is activated
- returns null
  - if the request is a force refresh (Shift + refresh)
  - or if there is no active worker

##==##
