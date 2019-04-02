<!-- .slide: class="transition-white sfeir-bg-blue" -->

# Entry Point & App Shell

##==##

# Minimal Entrypoint

<p class="center">
Should it include the main navigation UI?
</p>

<br>

![center](./assets/images/PRPL/prpl_loading-appshell_html-vs-js.png)

Notes:
left: application shell is in html -> heavy entry point
right: application shell in PeopleApp -> light entry point = better first paint and T.T.I.

The App Entrypoint should have minimal static dependencies, in other words, not much beyond the app-shell itself.

##==##

# Shell

<p class="center">
include everything needed for first paint
</p>

![center h-800](./assets/images/app_shell.png)

<p class="copyright">
© [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/) [Google](https://developers.google.com/web/fundamentals/architecture/app-shell)
</p>

##==##

<!-- .slide: class="flex-row"-->

# Conditionally loads polyfills

<br><br>

## Example: webcomponents-loader

```html
<!-- load the webcomponents loader, which injects the necessary polyfill bundle -->
<script src="node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js"></script>

<!-- load the element -->
<script type="module" src="my-element.js"></script>

<!-- use the element -->
<my-element></my-element>
```

Notes:
see the [webcomponentsjs README](https://github.com/webcomponents/webcomponentsjs#using-webcomponents-loaderjs)
other polyfills (like fetch) needs a "custom" approach
see [Loading Polyfills only when needed](https://philipwalton.com/articles/loading-polyfills-only-when-needed/) for example
or even the (deprecated) npm package [dynamic-polyfill](https://github.com/PascalAOMS/dynamic-polyfill)
