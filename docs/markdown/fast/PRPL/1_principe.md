<!-- .slide: class="flex-row"-->

# P.R.P.L

<br>

![border-circle red w-300](./assets/images/PRPL/push.png)
![border-circle green w-300](./assets/images/PRPL/render.svg)
![border-circle blue w-300](./assets/images/PRPL/precache.png)
![border-circle purple w-300](./assets/images/PRPL/lazy.png)

<p>
<span class="center">**PUSH**<br/> critical resources<br/> for the initial URL route</span>
<span class="center">**Render**<br/> initial route</span>
<span class="center">**Pre-cache**<br/> remaining routes</span>
<span class="center">**Lazy-load**<br/> and create remaining <br/> routes on demand</span>
</p>

##==##

# App Structure

![center h-800](./assets/images/PRPL/app-build-components.png)

##==##

# Minimal Entrypoint

![center h-600](./assets/images/PRPL/prpl_loading-appshell_html-vs-js.png)

Notes:
left: initial template is in html -> heavy entry point
right: - in PeopleApp -> light entry point = better first paint and T.T.I.
