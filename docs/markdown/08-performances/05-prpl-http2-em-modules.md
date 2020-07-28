<!-- .slide: class="transition bg-blue" -->

# HTTP/2 Multiplexing

##==##

# HTTP/2 Multiplexing

<br><br>

![center](./assets/images/PRPL/multiplexing01.svg)

© [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/) [Google](https://developers.google.com/web/fundamentals/performance/http2/)

<!-- .element: class="copyright" -->

##==##

# ES Modules

![center h-800](./assets/images/PRPL/es_module.png)

© [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/) [Mozilla](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/)

<!-- .element: class="copyright" -->

##==##

# Performance

![center h-800](./assets/images/PRPL/renderer-main-thread-time-breakdown.png)

© [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/) [Google](https://developers.google.com/web/fundamentals/primers/modules)

<!-- .element: class="copyright" -->

##==##

# Bundling

![center h-800](./assets/images/PRPL/app-build-bundles.png)

© [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/) [Google](https://developers.google.com/web/fundamentals/performance/prpl-pattern/)

<!-- .element: class="copyright" -->

##==##

# Dynamic import

![center h-800](./assets/images/PRPL/dynamic_import_graph.png)

© [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/) [Mozilla](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/)

<!-- .element: class="copyright" -->

<!--

# lazy loading w/ Webpack

<br><br>

```javascript
async function getComponent() {
  let element = document.createElement('div');
  const { default: _ } = await import(/* webpackChunkName: "lodash" */ 'lodash');

  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}
``` -->
