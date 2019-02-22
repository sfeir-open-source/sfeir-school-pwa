<!-- .slide: class="transition-white sfeir-bg-blue" -->

# Device Apis

##==##

# WebAPIs for your Device

<br><br>
* permettre l’accès à des éléments extérieurs au browser
<br><br>
* très nombreuses APIs
<br><br>
* évolution constante

<br>

<div class="flex-row">
<a href="https://developer.chrome.com/apps/api_other" target="_blank">Chrome</a>
<a href="https://developer.mozilla.org/fr/docs/WebAPI" target="_blank">Mozilla (wiki)</a>
<a href="https://developer.microsoft.com/en-us/microsoft-edge/platform/status/?q=category%3Adevice" target="_blank">Edge</a>
</div>


##==##

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

<!-- .slide: class="flex-row" -->

![h-800](./assets/images/install_do.png)
![h-800](./assets/images/install_dont.png)

##==##

<!-- .slide: data-background="./assets/images/geolocation.png" class="transition-white"-->

# Geolocation

##==##

# Support 🎉

![center h-600](./assets/images/caniuse_geolocation.png)

Notes:
Tous sauf IE8, Safari 4 & Opera Mini


##==##

<!-- .slide: class="with-code" -->

# Vérifier que l’API est supportée

```javascript
 // check for Geolocation support
if (navigator.geolocation) {
  console.log('Geolocation is supported!');
} else {
  console.log(
    'Geolocation is not supported for this Browser/OS.'
  );
}
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code" -->

# Accéder à la position de l’utilisateur

```javascript
window.onload = function() {
  var startPos;
  var geoSuccess = function(position) {
    startPos = position;
    document.getElementById('startLat')
      .innerHTML = startPos.coords.latitude;
    document.getElementById('startLon')
      .innerHTML = startPos.coords.longitude;
  };
  navigator.geolocation.getCurrentPosition(geoSuccess);
};
```
<!-- .element: class="big-code" -->

<br>

⚠️ permission demandée automatiquement
<!-- .element: class="center" -->

##==##

<!-- .slide: class="with-code" -->

# Gestion des erreurs

```javascript
let startPos;
const geoSuccess = (position) => {
  startPos = position;
  document.getElementById('startLat').innerHTML = startPos.coords.latitude;
  document.getElementById('startLon').innerHTML = startPos.coords.longitude;
};
const geoError = (error) => {
    console.log('Error occurred. Error code: ' + error.code);
    // error.code can be:
    //   0: unknown error
    //   1: permission denied
    //   2: position unavailable (error response from location provider)
    //   3: timed out
  };
  navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
};
```

##==##

<!-- .slide: class="with-code" -->

# Observer en continue la position

```javascript
const watchID = navigator.geolocation
  .watchPosition(position => {
    do_something(
      position.coords.latitude,
      position.coords.longitude
    );
  });
// ...
navigator.geolocation.clearWatch(watchID);
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code" -->

# Timeout

```javascript
  var startPos;
  var geoOptions = {
    maximumAge: 5 * 60 * 1000,
  }

  var geoSuccess = function(position) {
    startPos = position;
    document.getElementById('startLat').innerHTML = startPos.coords.latitude;
    document.getElementById('startLon').innerHTML = startPos.coords.longitude;
  };
  var geoError = function(error) {
    console.log('Error occurred. Error code: ' + error.code);
    // error.code can be:
    //   0: unknown error
    //   1: permission denied
    //   2: position unavailable (error response from location provider)
    //   3: timed out
  };

  navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
```

Notes:
Unless you set a timeout, your request for the current position might never return.


##==##

<!-- .slide: class="with-code" -->

# Améliorer la précision


```javascript
  var startPos;
  var geoOptions = {
    enableHighAccuracy: true
  }

  var geoSuccess = function(position) {
    startPos = position;
    document.getElementById('startLat').innerHTML = startPos.coords.latitude;
    document.getElementById('startLon').innerHTML = startPos.coords.longitude;
  };
  var geoError = function(error) {
    console.log('Error occurred. Error code: ' + error.code);
    // error.code can be:
    //   0: unknown error
    //   1: permission denied
    //   2: position unavailable (error response from location provider)
    //   3: timed out
  };

  navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
```

Notes:
If you want to find the nearest store to a user, it's unlikely that you need 1-meter precision. The API is designed to give a coarse location that returns as quickly as possible.
If you do need a high level of precision, it's possible to override the default setting with the enableHighAccuracy option. Use this sparingly: it's slower to resolve and uses more battery.

##==##

# Emuler la position avec Chrome Dev Tools

<br>

![center h-800](./assets/images/devtools_emulate_position.png)

