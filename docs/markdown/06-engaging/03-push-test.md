<!-- .slide: class="exercice" -->

# Implémenter la Push API

## Exercice

<br>

1. Vérifiez que vous n’avez pas encore souscrit à la push API.
2. Si vous n’avez pas encore souscrit, enregistrez vous.
3. Dans le service worker, ajouter un nouveau listener sur l’event “push”. Afficher une notification de votre choix avec un titre, un corps et une image.

<br>
Pensez à utiliser event.waitUntil ;) !

### Step: push-1

##==##

<!-- .slide: class="exercice" -->

# Tester la Push API

## Exercice

Utiliser Chrome devtools pour tester le push

<br>

![center h-500](./assets/images/devtools_test_push.png)

##==##

![center h-800](./assets/images/push_companion.png)

https://web-push-codelab.glitch.me/

<!-- .element: class="center" -->

<br>

Notes:
Special (but standard) format
Bunch of ways to generate
Protect private key

There are a bunch of different ways to create the application server keys. You can create it yourself with something like crypto.createECDH('prime256v1'). You can use the web-push library - which is my recommendation for simplifying web push. Or, you can also hit web-push-codelab dot glitch dot me. One reminder, keep your private key PRIVATE. Don't accidentally check it into your code repository or anything like that!

##==##

<!-- .slide: class="exercice" -->

# Tester la Push API

## Exercice

<br>

Utiliser Push Companion pour tester le push
