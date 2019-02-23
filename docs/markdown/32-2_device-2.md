<!-- .slide: class="exercice sfeir-bg-pink" -->

# Fullscreen People

## Exercice


<br>

Ajouter un bouton ![](./assets/images/fullscreen_icon.png) sur les PeopleCard permettant d’afficher un people en fullscreen.


### Step: device-2

##==##

<!-- .slide: data-background="#dcdee0" class="transition no-margin" -->

![center h-800](./assets/images/notification_icon.png)

# Notification API

Notes:
https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API/Using_the_Notifications_API



##==##

# Des notifications intégrées

<br>

## Permet d'afficher des notifications natives


![center h-600](./assets/images/notifications.png)

Notes:
The Notifications API lets a web page or app send notifications that are displayed outside the page at the system level; this lets web apps send information to a user even if the application is idle or in the background. This article looks at the basics of using this API in your own apps.


##==##

<!-- .slide: class="flex-row" -->

# Qu'est ce qu'une bonne notification ?

<br><br>

![w-600](./assets/images/car_notification.png)
![w-600](./assets/images/good_notification.svg)

Notes:
It’s timely, my car has arrived.
It’s precise, I need to act on it and get into my car.
And it’s relevant - something I should be interested in.

##==##

<!-- .slide: class="flex-row" -->

# Qu'est ce qu'une bonne notification ?

<br><br>

![w-600](./assets/images/bad_app_notification.png)
![w-600](./assets/images/bad_notification.svg)

Notes:
You’ll have opportunities to monetize the user experience once they’re in your app. [CLICK] Don’t blow it by spamming your users when they’re not. If you spam your users with notifications, they may stop allowing them altogether.


##==##

<!-- .slide: class="with-code" -->

# L’objet Notification

```javascript
function notifyMe() {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }
  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification("Hi there!");
  }
  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification("Hi there!");
      }
    });
  }
}
```

Notes:
At last, if the user has denied notifications, there is no need to bother them any more.
The Notification interface of the Notifications API is used to configure and display desktop notifications to the user. These notifications' appearance and specific functionality vary across platforms but generally they provide a way to asynchronously provide information to the user.

Assume this basic HTML:
<button onclick="notifyMe()">Notify me!</button>
It's possible to send a notification as follows — here we present a fairly verbose and complete set of code you could use if you wanted to first check whether notifications are supported, then check if permission has been granted for the current origin to send notifications, then request permission if required, before then sending a notification.


##==##

<!-- .slide: class="with-code" -->

# Fermer une notification

<br><br>

```javascript
setTimeout(
    notification.close.bind(notification)
, 4000);
```
<!-- .element: class="big-code" -->

<br>

Notes:
Firefox and Safari close notifications automatically after a few moments (around four seconds). This may also happen at the operating system level. Some browsers don't however, such as Chrome. To make sure that the notifications close in all browsers, you can call the Notification.close function inside a setTimeout() function to close the notification after 4 seconds. Also note the use of bind() to make sure the close() call is associated with the notification.

Note: When you receive a "close" event, there is no guarantee that it's the user who closed the notification. This is in line with the specification, which states: "When a notification is closed, either by the underlying notifications platform or by the user, the close steps for it must be run."

##==##

<!-- .slide: data-background="./assets/images/buzz_light_bg.jpg" class="transition-white" -->

# To device integration and beyond!

##==##

<!-- .slide: class="flex-row" -->

# Appeler un numéro depuis un site web ?


<br>

![h-450](./assets/images/call_phone_1.png)
![h-450](./assets/images/call_phone_2.png)
![h-450](./assets/images/call_phone_3.png)

##==##

<!-- .slide: class="with-code" -->

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

# Support 👌

![center h-800](./assets/images/support_call_phone.png)

##==##

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
1) actuellement: "vous trouvez ça chiant" (comme intro rapide, en passant rapidement dessus)
2) magie: la solution
3) oui mais: le support

##==##

# Payment Request API

![center h-800](./assets/images/payment_request_api.png)


##==##

# Payment Request API : process

<br>

![center h-700](./assets/images/payment_request_process.png)


Notes:
https://developers.google.com/web/fundamentals/payments/
Using the Payment Request API, the transaction process is made as seamless as possible for both users and merchants.
The process begins when the merchant site creates a new PaymentRequest and passes to the browser all the information required to make the purchase: the amount to be charged, what currency they expect payment in, and what payment methods are accepted by the site. The browser determines compatibility between the accepted payment methods for the site and the methods the user has installed on the target device.
The browser then presents the payments UI to the user, who selects a payment method and authorizes the transaction. A payment method can be as straightforward as a credit card that is already stored by the browser, or as esoteric as third-party application written specifically to deliver payments to the site.


##==##

# Support 🚀

![center h-800](./assets/images/caniuse_payment.png)

Notes:
MAJ 2018-08-30

##==##

<!-- .slide: class="flex-row" -->

# Partager un contenu ?


![h-500](./assets/images/url_image.png)
![h-400](./assets/images/sup_share.png)

Notes:
Good news, everybody! In Chrome 61 for Android, we've launched the navigator.share() method, which allows websites to invoke the native sharing capabilities of the host platform.
This method, part of the simple Web Share API—written by Matt Giuca on the Chrome team—allows you easily trigger the native Android share dialog, passing either a URL or text to share. This is an important API as it gives your end-users user control of how and where the data is shared.

##==##

<!-- .slide: class="with-code" -->

# Share API

```javascript
if (navigator.share) {
  navigator.share({
      title: 'SFEIR School PWA',
      text: 'Check out the SFEIR School PWA — it rocks!',
      url: 'https://www.sfeir.com/formation/school/',
  })
    .then(() => console.log('Successful share'))
    .catch((error) => console.log('Error sharing', error));
}
```
<!-- .element: class="big-code" -->

<br>

Notes:
Good news, everybody! In Chrome 61 for Android, we've launched the navigator.share() method, which allows websites to invoke the native sharing capabilities of the host platform.
This method, part of the simple Web Share API—written by Matt Giuca on the Chrome team—allows you easily trigger the native Android share dialog, passing either a URL or text to share. This is an important API as it gives your end-users user control of how and where the data is shared.

##==##

# Support 🧐

![center h-800](./assets/images/caniuse_webshare.png)

##==##

<!-- .slide: data-background="./assets/images/more_integration_bg.png" -->

<br>

Notes:
à reprendre avec une vrais liste qu'on pourra mettre à jour