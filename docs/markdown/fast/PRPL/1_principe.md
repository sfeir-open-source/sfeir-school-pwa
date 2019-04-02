<!-- .slide: class="transition-white sfeir-bg-blue" -->

# Principles

##==##

<!-- .slide: class="flex-row"-->

# P.R.P.L

<br>

![border-circle red w-300](./assets/images/PRPL/push.png)
![border-circle green w-300](./assets/images/PRPL/render.svg)
![border-circle blue w-300](./assets/images/PRPL/precache.png)
![border-circle purple w-300](./assets/images/PRPL/lazy.png)

<p>
<span class="center">**PUSH**</span>
<span class="center">**Render**</span>
<span class="center">**Pre-cache**</span>
<span class="center">**Lazy-load**</span>
</p>

##==##

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

<!-- .slide: class="flex-row"-->

# P.R.P.L

<br>

![border-circle red w-300](./assets/images/PRPL/push.png)
![border-circle green w-300](./assets/images/PRPL/render.svg)
![border-circle blue w-300](./assets/images/PRPL/precache.png)
![border-circle purple w-300](./assets/images/PRPL/lazy.png)

<p>
<span class="center">HTTP/2 Server Push</span>
<span class="center">(simple rendering)</span>
<span class="center">Service Worker<br>(+ rel="preload")</span>
<span class="center">ES Module<br>dynamic imports</span>
</p>

##==##

# App Structure

![center h-800](./assets/images/PRPL/app-build-components.png)

<p class="copyright">
© [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/) [Google](https://developers.google.com/web/fundamentals/performance/prpl-pattern/)
</p>
