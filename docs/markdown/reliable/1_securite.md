<!-- .slide: class="transition-white sfeir-bg-blue" -->

# Sécurité

##==##

<!-- .slide: class="flex-row" -->

# HTTPS

<br><br>

![center](./assets/images/secure_https.png)

<br><br>

<div class="https flex-row">
    <div class="flex-col">
        <h2>Indentié</h2>
        <hr class="blue">
        <span>A qui vous parlez</span>
    </div>
    <div class="flex-col">
        <h2>Confidentialité</h2>
        <hr class="red">
        <span>Qui peut lire vos données</span>
    </div>
    <div class="flex-col">
        <h2>Intégrité</h2>
        <hr class="green">
        <span>Qui peut modifier vos données</span>
    </div>
</div>

Notes:
And finally, integrity. The browser and the server, have a guarantee under HTTPS that when they send data from one to the other, the data they send is what the other party receives. So an intermediary on the network can’t modify or tamper with the data that’s being sent. Only the browser and the server can. So these are the three security properties that we get from HTTPS.

##==##

# Solutions

<!-- .slide: class="flex-row" -->

<br>

## Hosting Services

<!-- .element: class="center"-->

![h-100](./assets/images/firebase.png)
![h-100](./assets/images/heroku.png)
![h-100](./assets/images/github.png)
![h-100](./assets/images/appengine.png)

<br>

## Servers

<!-- .element: class="center"-->

![h-100](./assets/images/ngnix.png)
![h-100](./assets/images/apache.png)

<br>

## Certificat Authorities

<!-- .element: class="center"-->

![h-100](./assets/images/letsencrypt.png)
![h-100](./assets/images/comodo.png)

Notes:
Certif : souvent dispo via (votre) registrar / hébergeur (ex: Gandi utilise Comodo)

##==##

# Chrome Devtools

![center h-900](./assets/images/chrome-devtools-secure-screenshot.png)

Notes:
https://developers.google.com/web/tools/chrome-devtools/security

##==##

# Pour le dev

<br><br>

## 127.0.0.1 / localhost

<!-- .element: class="center"-->

<br>

## OK sans HTTPS

<!-- .element: class="center"-->

<br>

![center](./assets/images/secure-lock-icon.png)

##==##

# Service Worker

![center](./assets/images/service_worker_explain.svg)

##==##

<!-- .slide: data-background="./assets/images/grid_background.svg" -->

<div class="grid-worker">
    <div class="cell-1">
        <h1>Non bloquant</h1>
        MAIN THREAD
        <br>≠
        <br>
        SERVICE WORKER
    </div>
    <h1 class="cell-2">Pas accès au dom</h1>
    <h1 class="cell-3">Asynchrone</h1>
    <div class="cell-4">
        <h1>Sécurisé</h1>
        HTTPS uniquement
    </div>
</div>

Notes:
Un service worker fonctionne dans le contexte d'un worker :
Pas d’accès au DOM
Asynchrone (Pas de localstorage ou de XHR synchrone)
Thread différente du script principal donc non-bloquant
https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API

##==##

# Support

![center](./assets/images/caniuse_serviceworker.png)

<br>
<h2 class="center"><a href="https://jakearchibald.github.io/isserviceworkerready/" target="_blank">Is Service Worker Ready ?</a></h2>
<br>

Notes:
MàJ: 2018-09-18 - https://caniuse.com/#feat=serviceworkers

##==##

# **Service Worker :** Souscription

<br>

![center](./assets/images/sw_souscription.png)

##==##

# ⚠️ Scope

<br><br>

![center](./assets/images/sw_scope.png)

<br>

example.com/product/description.html,

<!-- .element: class="center" -->
