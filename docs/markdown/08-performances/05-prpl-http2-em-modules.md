<!-- .slide: class="transition bg-blue" -->

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
