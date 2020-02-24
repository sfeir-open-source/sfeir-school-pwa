<!-- .slide: class="transition-white sfeir-bg-blue" -->

# Entry Point & App Shell

##==##

<!-- .slide: data-type-show="hide" -->

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
