class FallbackOnErrorPlugin {
  constructor(fallbackURL) {
    this.fallbackURL = fallbackURL;
  }

  // This is called whenever there's a network response,
  // but we want special behavior for non-2xx statuses.
  fetchDidSucceed({ response }) {
    if (response.ok) {
      // If it's a 2xx, it can be used as-is.
      return response;
    }

    // This will trigger handlerDidError.
    throw new Error(`Invalid response status (${response.status})`);
  }

  // This callback is new in Workbox v6, and is triggered whenever
  // an error (including a NetworkError) is thrown when a handler runs.
  handlerDidError() {
    return caches.match(this.fallbackURL, {
      // Use ignoreSearch as a shortcut to work with precached URLs
      // that have _WB_REVISION parameters.
      ignoreSearch: true
    });
  }
}
