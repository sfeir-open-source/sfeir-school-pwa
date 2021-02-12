const fallbackURL = '/img/cat.jpg';

const fallbackOnErrorPlugin = {
  cachedResponseWillBeUsed: async ({ cacheName, request, matchOptions, cachedResponse, event, state }) => {
    // Return `cachedResponse`, a different `Response` object, or null.
    return (
      cachedResponse ||
      caches.match(fallbackURL, {
        // Use ignoreSearch as a shortcut to work with precached URLs
        // that have _WB_REVISION parameters.
        ignoreSearch: true
      })
    );
  },
  fetchDidFail: async ({ originalRequest, request, error, event, state }) => {
    console.log('fetchDidFail', originalRequest.url);
    throw new Error(`Invalid response status (${response.status})`);
    // No return expected.
    // NOTE: `originalRequest` is the browser's request, `request` is the
    // request after being passed through plugins with
    // `requestWillFetch` callbacks, and `error` is the exception that caused
    // the underlying `fetch()` to fail.
  }
};
