<!-- .slide: class="transition-white sfeir-bg-blue" -->

# Push API

##==##

<!-- .slide: class="flex-row" -->

# ⚠ Ne pas confondre

<br><br>
<p>
    <span>
    Notification API<br>
    ⇒ Notification “Native”<br>
    ⇒ Intégration
    </span>
    <span>
    Push API<br>
    ⇒ server to browser<br>
    ⇒ (re-)engagement
    </span>
</p>

<br>

Complémentaires

##==##

# Réengageante

![center h-700](./assets/images/rengaging.png)

##==##

# Support

![center h-800](./assets/images/caniuse_push.png)

Notes:
MAJ: 2018-08-31

##==##

<!-- .slide: class="flex-row" -->

# Partie client

<br>

![border-circle blue w-300](./assets/images/permission_logo.png)
![border-circle blue w-300](./assets/images/subscription_logo.png)
![border-circle blue w-300](./assets/images/pubsub_logo.png)

<p>
<span class="center">Obtenir la permission<br>pour envoyer des<br>notifications</span>
<span class="center">Souscrire et obtenir<br><strong>PushSubscription</strong></span>
<span class="center">Envoyer<br><strong>PushSubscription</strong> à<br>votre serveur</span>
</p>


##==##

<!-- .slide: class="flex-row" -->

# Envoyer un message

<br>

![border-circle blue w-300](./assets/images/message_server_logo.png)
![border-circle blue w-300](./assets/images/http_logo.png)
![border-circle blue w-300](./assets/images/airplane_logo.png)
![border-circle blue w-300](./assets/images/to_device_logo.png)

<p>
<span class="center">Créer un<br>message sur<br>votre serveur</span>
<span class="center">Envoyer au<br>service de Push</span>
<span class="center">Le Push service<br>délivre le<br>message</span>
<span class="center">Le message<br>arrive sur vos<br>appareils</span>
</p>


##==##

<!-- .slide: class="flex-row" -->

# Recevoir un message

<br>

![border-circle blue w-300](./assets/images/download_logo.png)
![border-circle blue w-300](./assets/images/light_logo.png)
![border-circle blue w-300](./assets/images/ring_logo.png)


<p>
<span class="center">Le message arrive sur<br>votre appareil</span>
<span class="center">Le navigateur réveil le<br>service worker</span>
<span class="center">Capture l'événement<br><strong>push</strong> et montre la<br>notification</span>
</p>

