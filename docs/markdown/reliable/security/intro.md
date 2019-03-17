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
