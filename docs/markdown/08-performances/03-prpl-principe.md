<!-- .slide: class="transition" data-type-show="on-stage"-->

# The PRPL Pattern

##==##

<!-- .slide: class="transition bg-blue" data-type-show="on-stage"-->

# Principles

##==##

<!-- .slide: class="flex-row" data-type-show="on-stage"-->

# P.R.P.L

<br>

![](./assets/images/PRPL/push.png 'border-circle red w-300')
![](./assets/images/PRPL/render.svg 'border-circle green w-300')
![](./assets/images/PRPL/precache.png 'border-circle blue w-300')
![](./assets/images/PRPL/lazy.png 'border-circle purple w-300')

<p>
<span class="center"><strong>PUSH</strong></span>
<span class="center"><strong>Render</strong></span>
<span class="center"><strong>Pre-cache</strong></span>
<span class="center"><strong>Lazy-load</strong></span>
</p>

##==##

<!-- .slide: class="flex-row" data-type-show="on-stage"-->

# P.R.P.L

<br>

![](./assets/images/PRPL/push.png 'border-circle red w-300')
![](./assets/images/PRPL/render.svg 'border-circle green w-300')
![](./assets/images/PRPL/precache.png 'border-circle blue w-300')
![](./assets/images/PRPL/lazy.png 'border-circle purple w-300')

<p>
<span class="center"><strong>PUSH</strong><br/> critical resources<br/> for the initial URL route</span>
<span class="center"><strong>Render</strong><br/> initial route</span>
<span class="center"><strong>Pre-cache</strong><br/> remaining routes</span>
<span class="center"><strong>Lazy-load</strong><br/> and create remaining <br/> routes on demand</span>
</p>

##==##

<!-- .slide: class="flex-row" data-type-show="on-stage"-->

# P.R.P.L

![](./assets/images/prpl.png 'center h-800')

##==##

<!-- .slide: class="flex-row" data-type-show="on-stage"-->

# P.R.P.L

<br>

![](./assets/images/PRPL/push.png 'border-circle red w-300')
![](./assets/images/PRPL/render.svg 'border-circle green w-300')
![](./assets/images/PRPL/precache.png 'border-circle blue w-300')
![](./assets/images/PRPL/lazy.png 'border-circle purple w-300')

<p>
<span class="center">HTTP/2 Server Push</span>
<span class="center">(simple rendering)</span>
<span class="center">Service Worker<br>(+ rel="preload")</span>
<span class="center">ES Module<br>dynamic imports</span>
</p>

##==##

<!-- .slide: data-type-show="on-stage" -->

# App Structure

![](./assets/images/PRPL/app-build-components.png 'center h-800')

© [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/) [Google](https://developers.google.com/web/fundamentals/performance/prpl-pattern/)

<!-- .element: class="copyright" -->
