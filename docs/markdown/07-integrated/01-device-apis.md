<!-- .slide: data-type-show="prez" -->

# WebAPIs for your Device

<br><br>

- permettre l’accès à des éléments extérieurs au browser
  <br><br>
- très nombreuses APIs
  <br><br>
- évolution constante

<br>

<div class="flex-row">
<a href="https://developer.chrome.com/apps/api_other" target="_blank">Chrome</a>
<a href="https://developer.mozilla.org/fr/docs/WebAPI" target="_blank">Mozilla (wiki)</a>
<a href="https://developer.microsoft.com/en-us/microsoft-edge/platform/status/?q=category%3Adevice" target="_blank">Edge</a>
</div>

##==##

<!-- .slide: data-type-show="prez" -->

# Demandez (gentiment) la permission !

<br>
* l’utilisateur doit comprendre
  * pourquoi la permission est demandée
  * ce que cela va lui apporter

<br><br>

<div class="flex-row">
    <div>
        <span class="center">✅ Do</span>
        <ul>
            <li>réagir à une interaction</li>
            <li>bénéfice clair & explicite</li>
            <li>gestion des cas d’erreurs</li>
        <ul>
    </div>
    <div>
        <span class="center">❌ don't</span>
        <ul>
            <li>demander automatiquement</li>
            <li>hors contexte</li>
            <li>dépendre strictement de l'autorisation</li>
        <ul>
    </div>
</div>

##==##

<!-- .slide: class="flex-row" data-type-show="prez"-->

![h-800](./assets/images/install_do.png)
![h-800](./assets/images/install_dont.png)

##==##

<!-- .slide: data-background="./assets/images/geolocation.png" class="transition mask" data-type-show="prez"-->

# Geolocation

##==##

<!-- .slide: data-type-show="prez" -->

# Support 🎉

![center h-600](./assets/images/caniuse_geolocation.png)

Notes:
Tous sauf IE8, Safari 4 & Opera Mini

##==##

<!-- .slide: data-background="./assets/images/fullscreen_api.jpg" class="transition bottom" data-type-show="prez"-->

# API

##==##

<!-- .slide: data-type-show="prez" -->

# Support

<br>

![center h-700](./assets/images/caniuse_fullscreen.png)

Notes:
IE 11 doesn't allow going to fullscreen mode when the event that triggers msRequestFullscreen() is a keydown or pointerdown event (keypress and click do work)
Safari blocks access to keyboard events in fullscreen mode (as a security measure).
Safari doesn't support stacking, meaning only one element can be set to full screen. webkitRequestFullScreen() is ignored for other elements and no error event is dispatched.
IE 11 does not allow scrolling when document.documentElement is set to full screen.
IE 11 does not properly support fullscreen when opening from an iframe.
Opera 12.1 uses the older specificaton's :fullscreen-ancestor pseudo-class instead of the the ::backdrop pseudo-element.

##==##

<!-- .slide: class="flex-row" data-type-show="prez"-->

# Appeler un numéro depuis un site web ?

![h-400](./assets/images/call_phone_1.png)
![h-400](./assets/images/call_phone_2.png)
![h-400](./assets/images/call_phone_3.png)

##==##

<!-- .slide: class="with-code" data-type-show="prez"-->

# Click to call

<br>

```html
Appelez SFEIR Nantes
<a href="tel:+33-2-55-59-07-00">
  +33 2 55 59 07 00
</a>
```

<!-- .element: class="big-code" -->

<br>

Notes:
https://developers.google.com/web/fundamentals/native-hardware/click-to-call/

##==##

<!-- .slide: data-type-show="prez" -->

# Support 👌

![center h-800](./assets/images/support_call_phone.png)

##==##

<!-- .slide: data-type-show="prez"-->

# Effectuer un achat en ligne ?

<br><br>

![center h-500](./assets/images/buy_online.png)

Notes:
Buying goods online is a convenient but often frustrating experience, particularly on mobile devices. Although mobile traffic continues to increase, mobile conversions account for only about a third of all completed purchases. In other words, users abandon mobile purchases twice as often as desktop purchases. Why?
Why users abandon mobile purchase forms
Online purchase forms are user-intensive, difficult to use, slow to load and refresh, and require multiple steps to complete. This is because two primary components of online payments—security and convenience—often work at cross-purposes; more of one typically means less of the other.
Most of the problems that lead to abandonment can be directly traced to purchase forms. Each app or site has its own data entry and validation process, and users often find they must enter the same information at every app's purchase point. Also, application developers struggle to create purchase flows that support multiple unique payment methods; even small differences in payment method requirements can complicate the form completion and submission process.
Any system that improves or solves one or more of those problems is a welcome change. We started solving the problem already with Autofill, but now we'd like to talk about a more comprehensive solution.

Je pense que pour cette partie, on peut adopter un bon rythme avec la répétition :

1. actuellement: "vous trouvez ça chiant" (comme intro rapide, en passant rapidement dessus)
2. magie: la solution
3. oui mais: le support

##==##

<!-- .slide: data-type-show="prez" -->

# Payment Request API

![center h-800](./assets/images/payment_request_api.png)

##==##

<!-- .slide: data-type-show="prez" -->

# Payment Request API : process

<br>

![center h-700](./assets/images/payment_request_process.png)

Notes:
https://developers.google.com/web/fundamentals/payments/
Using the Payment Request API, the transaction process is made as seamless as possible for both users and merchants.
The process begins when the merchant site creates a new PaymentRequest and passes to the browser all the information required to make the purchase: the amount to be charged, what currency they expect payment in, and what payment methods are accepted by the site. The browser determines compatibility between the accepted payment methods for the site and the methods the user has installed on the target device.
The browser then presents the payments UI to the user, who selects a payment method and authorizes the transaction. A payment method can be as straightforward as a credit card that is already stored by the browser, or as esoteric as third-party application written specifically to deliver payments to the site.

##==##

<!-- .slide: data-type-show="prez" -->

# Support 🚀

![center h-800](./assets/images/caniuse_payment.png)

Notes:
MAJ 2019-05-16

##==##

<!-- .slide: class="flex-row" data-type-show="prez"-->

# Partager un contenu ?

![h-500](./assets/images/url_image.png)
![h-400](./assets/images/sup_share.png)

Notes:
Good news, everybody! In Chrome 61 for Android, we've launched the navigator.share() method, which allows websites to invoke the native sharing capabilities of the host platform.
This method, part of the simple Web Share API—written by Matt Giuca on the Chrome team—allows you easily trigger the native Android share dialog, passing either a URL or text to share. This is an important API as it gives your end-users user control of how and where the data is shared.

##==##

<!-- .slide: class="with-code" data-type-show="prez"-->

# Share API

```javascript
if (navigator.share) {
  navigator
    .share({
      title: 'SFEIR School PWA',
      text: 'Check out the SFEIR School PWA — it rocks!',
      url: 'https://www.sfeir.com/formation/school/'
    })
    .then(() => console.log('Successful share'))
    .catch(error => console.log('Error sharing', error));
}
```

<!-- .element: class="big-code" -->

<br>

Notes:
Good news, everybody! In Chrome 61 for Android, we've launched the navigator.share() method, which allows websites to invoke the native sharing capabilities of the host platform.
This method, part of the simple Web Share API—written by Matt Giuca on the Chrome team—allows you easily trigger the native Android share dialog, passing either a URL or text to share. This is an important API as it gives your end-users user control of how and where the data is shared.

##==##

<!-- .slide: data-type-show="prez"  -->

# Support 🧐

![center h-800](./assets/images/caniuse_webshare.png)

Notes:
Update on 2024-06-10

##==##

<!-- .slide: data-type-show="prez" -->

# What web can do today ?

![center h-900](./assets/images/whatwebcandotoday.png)

Notes:
à reprendre avec une vrais liste qu'on pourra mettre à jour

##==##

<!-- .slide: class="full-center" data-type-show="prez" -->

![](./assets/images/webauthn/good-signup-in_io18.png)

##==##

<!-- .slide: data-background="white" class="full-center" data-type-show="prez"-->

![](./assets/images/webauthn/webauthn-logo.png)

##==##

<!-- .slide: class="transition left underline" data-background="./assets/images/webauthn/bored.jpeg" data-type-show="prez"-->

# Security is boring!

Notes:
ajoute de la friction pour l'utilisateur

##==##

<!-- .slide: class="full-center" data-type-show="prez"-->

![signup-email h-900](./assets/images/webauthn/signup-email.jpg)

##==##

<!-- .slide: class="full-center" data-type-show="prez"-->

![password-strength h-600](./assets/images/webauthn/password-strength-meters.png)

##==##

<!-- .slide: data-background="./assets/images/webauthn/one-tap.png" class="full-center transition" data-type-show="prez"-->

Notes:
un premier pas vers une meilleur UX
mais quid de la sécu ?

##==##

<!-- .slide: data-background="black" class="full-center mariane" data-type-show="prez"-->

What's new?

<!-- .element class="shadow-title" -->

##==##

<!-- .slide: data-background="./assets/images/webauthn/2fa-new.png" class="full-center"  data-type-show="prez"-->
