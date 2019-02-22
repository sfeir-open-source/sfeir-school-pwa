<!-- .slide: class="exercice sfeir-bg-pink" -->

# Near me

## Exercice

<br>

Ajouter un bouton pour filtrer les profils en fonction de la position de l’utilisateur.

<br>

💡 Utilisez la méthode getNearestAgency(coord) pour récupérer le nom de l’agence la plus proche de la position


### Step: device-1

##==##

<!-- .slide: data-background="./assets/images/fullscreen_api.jpg" class="transition-white" -->

# API

##==##

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

<!-- .slide: class="with-code" -->

# Damn you, vendor prefixes!

```javascript
div.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
div.mozRequestFullScreen();
div.msRequestFullscreen();
div.requestFullscreen(); // standard
document.webkitExitFullscreen();
document.mozCancelFullScreen();
document.msExitFullscreen();
document.exitFullscreen(); // standard
```
<!-- .element: class="big-code" -->

<br>

##==##

# Cross-browser libs


<br>

![center h-350](./assets/images/fullscreen_screenfull.png)
![center h-350](./assets/images/fullscreen_fscreen.png)

Notes:
sceenfull.js -> google developers
fscreen -> MDN


##==##

<!-- .slide: class="with-code" -->

# Passer votre page en plein écran

```javascript
<button id="goFS">Go fullscreen</button>
<script>
  var goFS = document.getElementById("goFS");
  goFS.addEventListener("click", function() {
      document.body.requestFullscreen();
  }, false);
</script>
```
<!-- .element: class="big-code" -->

<br>

Notes:
https://developers.google.com/web/fundamentals/native-hardware/fullscreen/

##==##

<!-- .slide: class="with-code" -->

# Et avec les préfixes 🙇


```javascript
function toggleFullScreen() {
  var doc = window.document;
  var docEl = doc.documentElement;

  var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
  var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

  if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
    requestFullScreen.call(docEl);
  }
  else {
    cancelFullScreen.call(doc);
  }
}
```
##==##

<!-- .slide: class="two-column-layout" -->

# CSS pseudo-selectors

##--##

<!-- .slide: class="with-code" -->

```css
div:-webkit-full-screen {
  width: 100% !important;
}
div:-moz-full-screen {
  width: 100% !important;
}
div:-ms-fullscreen {
  width: 100% !important;
}
div:fullscreen {
  width: 100% !important;
}
```
<!-- .element: class="big-code" -->

##--##

<!-- .slide: class="with-code" -->

```css
:-webkit-full-screen .tohide {
  display: none;
}
:-moz-full-screen .tohide {
  display: none;
}
:-ms-fullscreen .tohide {
  display: none;
}
:fullscreen .tohide {
  display: none;
}
```
<!-- .element: class="big-code" -->

<br>

Notes:
While in fullscreen, hide any children with class 'tohide'

##==##

<!-- .slide: class="flex-row with-code" -->

# Full-Fullscreen

<p>
<span>body</span>
<img class="w-300" src="./assets/images/fullscreen_body.png">
<img class="w-300" src="./assets/images/fullscreen_documentElement.png">
<span>DocumentElement</span>
</p>

<br>
```javascript
document.documentElement.requestFullscreen();
```
<!-- .element: class="big-code" -->

<br>

Notes:
It is natural to think that you take the body element fullscreen, but if you are on a WebKit or Blink based rendering engine you will see it has an odd effect of shrinking the body width to the smallest possible size that will contain all the content. (Mozilla Gecko is fine.)


##==##

# Laisser le choix !

![center h-700](./assets/images/power_to_the_people.png)

Notes:
There is nothing more annoying to the user than a website doing something unexpected. When a user navigates to your site don't try and trick them into fullscreen.
Don't intercept the first touch event and call requestFullscreen().
It is annoying.
Browsers may decided to prompt the user at some point in the future about allowing the app to take up the fullscreen.
If you want to launch apps fullscreen think about using the install experiences for each platform.

