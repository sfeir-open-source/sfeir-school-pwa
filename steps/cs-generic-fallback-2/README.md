# Generic FallBack

1. Mettre l'image de chat en cas de fallback

# Tips

- On va créer un Plugin pour observer l'événment fetch.
- Testez les méthodes du cycle de vie d'un plugin pour voir comment retourner le résultat de chat

# API Concernée

Formalisme d'un fichier à mettre en precache

```javascript
// Charger les stratégies de caches
workbox.loadModule('workbox-strategies');

// Méthode de routage
workbox.routing.registerRoute(matchCB, handlerCB);

// Stratégie cache first
new workbox.strategies.NetworkFirst({plugins[myFallBackPlugin]});

// Toutes les méthodes d'un plugin
const myPlugin = {
  cacheWillUpdate: async ({ request, response, event, state }) => {
    // Return `response`, a different `Response` object, or `null`.
    return response;
  },
  cacheDidUpdate: async ({ cacheName, request, oldResponse, newResponse, event, state }) => {
    // No return expected
    // Note: `newResponse.bodyUsed` is `true` when this is called,
    // meaning the body has already been read. If you need access to
    // the body of the fresh response, use a technique like:
    // const freshResponse = await caches.match(request, {cacheName});
  },
  cacheKeyWillBeUsed: async ({ request, mode, params, event, state }) => {
    // `request` is the `Request` object that would otherwise be used as the cache key.
    // `mode` is either 'read' or 'write'.
    // Return either a string, or a `Request` whose `url` property will be used as the cache key.
    // Returning the original `request` will make this a no-op.
    return request;
  },
  cachedResponseWillBeUsed: async ({ cacheName, request, matchOptions, cachedResponse, event, state }) => {
    // Return `cachedResponse`, a different `Response` object, or null.
    return cachedResponse;
  },
  requestWillFetch: async ({ request, event, state }) => {
    // Return `request` or a different `Request` object.
    return request;
  },
  fetchDidFail: async ({ originalRequest, request, error, event, state }) => {
    // No return expected.
    // NOTE: `originalRequest` is the browser's request, `request` is the
    // request after being passed through plugins with
    // `requestWillFetch` callbacks, and `error` is the exception that caused
    // the underlying `fetch()` to fail.
  },
  fetchDidSucceed: async ({ request, response, event, state }) => {
    // Return `response` to use the network response as-is,
    // or alternatively create and return a new `Response` object.
    return response;
  },
  handlerWillStart: async ({ request, event, state }) => {
    // No return expected.
    // Can set initial handler state here.
  },
  handlerWillRespond: async ({ request, response, event, state }) => {
    // Return `response` or a different `Response` object.
    return response;
  },
  handlerDidRespond: async ({ request, response, event, state }) => {
    // No return expected.
    // Can record final response details here.
  },
  handlerDidComplete: async ({ request, response, error, event, state }) => {
    // No return expected.
    // Can report any data here.
  },
  handlerDidError: async ({ request, event, error, state }) => {
    // Return `response`, a different `Response` object as a fallback, or `null`.
    return response;
  }
};
```
