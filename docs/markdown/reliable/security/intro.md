<!-- .slide: class="flex-row" -->

# HTTPS

<br><br>

![center](./assets/images/secure_https.png)

<br><br>

<div class="https flex-row">
    <div class="flex-col">
        <h2>Identité</h2>
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

Et enfin, l'intégrité. Le navigateur et le serveur ont la garantie, sous HTTPS, que, lorsqu’ils envoient des données de l’un à l’autre, les données qu’ils envoient sont celles que l’autre partie reçoit. Ainsi, un intermédiaire du réseau ne peut ni modifier ni altérer les données envoyées. Seuls le navigateur et le serveur peuvent. Il s’agit donc des trois propriétés de sécurité fournies par HTTPS.
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
