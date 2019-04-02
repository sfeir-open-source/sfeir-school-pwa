<!-- .slide: class="transition-white sfeir-bg-blue" -->

# HTTP/2 Multiplexing

##==##

# HTTP/2 Multiplexing

<br><br>

![center](./assets/images/PRPL/multiplexing01.svg)

<p class="copyright">
© [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/) [Google](https://developers.google.com/web/fundamentals/performance/http2/)
</p>

##==##

# ES Modules

![center h-800](./assets/images/PRPL/es_module.png)

<p class="copyright">
© [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/) [Mozilla](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/)
</p>

##==##

# Performance

![center h-800](./assets/images/PRPL/renderer-main-thread-time-breakdown.png)

<p class="copyright">
© [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/) [Google](https://developers.google.com/web/fundamentals/primers/modules)
</p>

##==##

# Bundling

![center h-800](./assets/images/PRPL/app-build-bundles.png)

<p class="copyright">
© [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/) [Google](https://developers.google.com/web/fundamentals/performance/prpl-pattern/)
</p>

##==##

# Dynamic import

![center h-800](./assets/images/PRPL/dynamic_import_graph.png)

<p class="copyright">
© [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/) [Mozilla](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/)
</p>

##==##

# lazy loading

![center h-800](./assets/images/PRPL/lazy.jpg)

##==##

# pwa-helpers

<br><br>

```javascript
import { installRouter } from 'pwa-helpers/router';

export const navigate = path => {
  // Extract the page name from path.
  const page = path === '/' ? 'home' : path.slice(1);

  switch (page) {
    case 'home':
      import('./home-view.js');
      break;
    case 'details':
      import('./details-view.js');
      break;
    case 'about':
      import('./about-view.js');
      break;
    default:
      page = 'home';
      import('./home-view.js');
  }
};

installRouter(location => navigate(decodeURIComponent(location.pathname)));
```

<!--

# lazy loading w/ Webpack

<br><br>

```javascript
async function getComponent() {
  var element = document.createElement('div');
  const { default: _ } = await import(/* webpackChunkName: "lodash" */ 'lodash');

  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}
``` -->
