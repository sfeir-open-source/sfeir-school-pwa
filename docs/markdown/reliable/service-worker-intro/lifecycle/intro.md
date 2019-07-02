# Première installation

<br>
![center h-600](./assets/images/sw_installing.gif)

Notes:

- The install event is the first event a service worker gets, and it only happens once.
- A promise passed to installEvent.waitUntil() signals the duration and success or failure of your install.
- A service worker won't receive events like fetch and push until it successfully finishes installing and becomes "active".
- By default, a page's fetches won't go through a service worker unless the page request itself went through a service worker. So you'll need to refresh the page to see the effects of the service worker.
- clients.claim() can override this default, and take control of non-controlled pages.

##==##

# Mise à jour

<br>
![center h-600](./assets/images/sw_updating.gif)

Notes:
https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle

- update triggered if any of:
  - navigation to an in-scope page.
  - functional events (ex. push or sync) IF last update > 24 hours.
  - Calling .register() & SW URL has changed (not recommended)
- Most browsers, including Chrome 68 and later, default to ignoring caching headers when checking for updates of the registered service worker script. They still respect caching headers when fetching resources loaded inside a service worker via importScripts(). You can override this default behavior by setting the updateViaCache option when registering your service worker.
- SW considered updated if byte-different to the current one.
- The updated service worker is launched alongside the existing one, and gets its own install event.
- If your new worker has a non-ok status code (for example, 404), fails to parse, throws an error during execution, or rejects during install, the new worker is thrown away, but the current one remains active.
- Once successfully installed, the updated worker will wait until the existing worker is controlling zero clients. (Note that clients overlap during a refresh.)
- `self.skipWaiting()` prevents the waiting, meaning the service worker activates as soon as it's finished installing.

##==##

<br>
![center h-700](./assets/images/sw_lifecycle_recap.png)

Notes:
The service worker becomes idle when not in use and restarts when it's next needed. You cannot rely on a global state persisting between events. If there is information that you need to persist and reuse across restarts, you can use IndexedDB databases.
