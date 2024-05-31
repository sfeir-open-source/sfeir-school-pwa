<!-- .slide: class="transition" -->

# WebOTP

##==##

# WebOTP API

API permettant de récupérer des OTP (One Time Password) envoyés par SMS.

⚠ Cette API n'est pas résistante au phising ! [Video explainer Google IO 2018](https://www.youtube.com/watch?v=kGGMgEfSzMw&t=1133s)

##==##

# WebOTP API

![center h-800](./assets/images/webotp.svg)

##==##

# WebOTP API

## Pourquoi alors ?

- Pas besoin de taper le code
- Pas besoin de changer d'application
- Flow d'authentification plus simple -> Impact UX

##==##

# WebOTP API

## Points d'attention

1. Créer un formulaire compatible
2. Formater le SMS d'une certaine manière
3. Utiliser l'API

##==##

# WebOTP API

## Créer un formulaire compatible

```html
<form action="/verify-otp" method="POST">
  <input type="text" inputmode="numeric" autocomplete="one-time-code" pattern="\d{6}" required />
</form>
```

Notes:
L'utilisation d'un type "text" est volontaire car le type "number" affiche aussi des boutons + et - pouvant ne pas prendre en compte un 0 en début de code. Le inputmode="numeric" quand à lui permettra d'afficher uniquement un pavé numérique dans la saisie.

##==##

# WebOTP API

## Formater le SMS d'une certaine manière

Le message doit à tout prix respecter les contraintes suivantes :

- Le nom de domaine précédé de `@`
- Le code OTP à rentrer précédé par `#`
- Le `@` doit être le premier caractère de la dernière ligne
- Le `@host`et `#code` doivent être séparés par un espace
- Le nom de domaine ne doit pas inclure le protocole ou le path
- Le `@host`et `#code` doivent être sur la dernière ligne

Exemple :

```
Your OTP Code: 123456
@domain.com #123456
```

##==##

# WebOTP API

## Api WebOTP

```js
if ('OTPCredential' in window) {
  navigator.credentials.get({
    otp: { transport: ['sms'] }
  });
}
```

##==##

# WebOTP API

## Api WebOTP - résultat

```js
if ('OTPCredential' in window) {
  navigator.credentials
    .get({
      otp: { transport: ['sms'] }
    })
    .then(otp => {
      console.log(otp.code);
    });
}
```

##==##

# WebOTP API

## Gestion de l'annulation

```js
// Cancel the WebOTP API if the form is submitted manually.
const ac = new AbortController();
// Invoke the WebOTP API
navigator.credentials.get({
  otp: { transport: ['sms'] },
  signal: ac.signal
});
```

##==##

# WebOTP API

## Fonctionnement desktop

<video height="800" controls autoplay class="center">
  <source src="./assets/images/webotp-desktop.mp4" type="video/mp4">
</video>

<br>

Notes:
Ne marche que sur Chrome et si vous êtes connectés avec le même compte !

##==##

# WebOTP API

## /!\ aux URLs

- `@localhost` : ne marche que sur le port 80
- `@domain.com` : ne marche autrement qu'avec le port 80
- `@domain.com` : peut envoyer un code pour `@sub.domain.com` mais il ne sera pas bien reçu

##==##

# Tableau de compatibilité

![](./assets/images/caniuse_webotp.png)
