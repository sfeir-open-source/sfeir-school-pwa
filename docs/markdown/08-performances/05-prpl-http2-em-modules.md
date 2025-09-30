<!-- .slide: class="transition bg-blue" data-type-show="on-stage" -->

# HTTP/2 Multiplexing

##==##

<!-- .slide: data-type-show="on-stage" -->

# HTTP/2 Multiplexing

<br><br>

![](./assets/images/PRPL/multiplexing01.svg 'center')

© [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/) [Google](https://developers.google.com/web/fundamentals/performance/http2/)

<!-- .element: class="copyright" -->

##==##

<!-- .slide: data-type-show="on-stage" -->

# ES Modules

![](./assets/images/PRPL/es_module.png 'center h-800')

© [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/) [Mozilla](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/)

<!-- .element: class="copyright" -->

##==##

<!-- .slide: data-type-show="on-stage"-->

# Performance

![](./assets/images/PRPL/renderer-main-thread-time-breakdown.png 'center h-800')

© [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/) [Google](https://developers.google.com/web/fundamentals/primers/modules)

<!-- .element: class="copyright" -->

##==##

<!-- .slide: data-type-show="on-stage" -->

# Bundling

![](./assets/images/PRPL/app-build-bundles.png 'center h-800')

© [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/) [Google](https://developers.google.com/web/fundamentals/performance/prpl-pattern/)

<!-- .element: class="copyright" -->

##==##

<!-- .slide: data-type-show="on-stage" -->

# Dynamic import

![](./assets/images/PRPL/dynamic_import_graph.png 'center h-800')

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
