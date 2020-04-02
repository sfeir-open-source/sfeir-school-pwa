<!-- .slide: class="exercice" -->

# Créer votre propre manifest

## Exercice

<br>

1. Créez votre manifest.json avec comme icônes celles contenues dans le dossier assets/img/icons (url ./img/icons/…) et avec votre application en mode standalone
2. Placez ce fichier dans un répertoire /manifest-1/manifest/
3. Liez-le à votre application avec landing.html
4. Pensez à ajouter le fichier manifest.json aux fichiers dans le cache static

### Step: manifest-1

##==##

<!-- .slide: data-background="./assets/images/installabilite.png" class="transition transition" -->

# Installabilité

##==##

<!-- .slide: class="two-column-layout" -->

# Ajouter à l’écran d’accueil

##--##

<br><br>

- Support hors-ligne(Service worker)
  <br><br>
- Un manifest correct
  <br><br>
- Utilisateur engagé...

##--##

![center h-600](./assets/images/pwa_add_to_screen.png)

Notes:

##==##

# Et aussi ...

<br><br>

- La manifest doit avoir un `short_name`
  <br><br>
- Une start_url qui peut être chargeable,
  <br><br>
- Au moins une icone PNG `144x144`
  <br><br>
- La déclaration de l’icône doit avoir un type MIME : image/png

##==##

<!-- .slide: class="with-code" -->

# Pour IOS

```html
<!-- Add to home screen for Safari on iOS -->
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
<meta name="apple-mobile-web-app-title" content="MyApp" />
<link rel="apple-touch-icon" href="../img/icons/icon-152x152.png" />
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: data-background="./assets/images/install_banner.png" -->

##==##

# Bannière

![center h-700](./assets/images/banniere.png)

Notes:
https://developers.google.com/web/fundamentals/engage-and-retain/app-install-banners/web-app-install-banners?hl=en

##==##

<!-- .slide: class="with-code" -->

# Bannière : L’évènement beforeinstallprompt

main.js

```javascript
window.addEventListener('beforeinstallprompt', function(e) {
  ...
});
```

<!-- .element: class="big-code"-->

<br>

##==##

<!-- .slide: class="with-code" -->

# Bannière : L’évènement beforeinstallprompt

```javascript
window.addEventListener('beforeinstallprompt', function(e) {
  e.userChoice.then(function(choiceResult) {
    if (choiceResult.outcome == 'dismissed') {
      console.log('User cancelled home screen install');
    } else {
      console.log('User added to home screen');
    }
  });
});
```

<!-- .element: class="big-code"-->

<br>

##==##

<!-- .slide: class="with-code" -->

# Reporter l’installation de la bannière

<br>

```javascript
var deferredPrompt;

window.addEventListener('beforeinstallprompt', function(e) {
  e.preventDefault();
  deferredPrompt = e;
  return false;
});
```

<!-- .element: class="big-code"-->

<br>

##==##

<!-- .slide: class="with-code" -->

# Reporter l’installation de la bannière

<br>

```javascript
btnSave.addEventListener('click', function() {
  if (deferredPrompt !== undefined) {
    deferredPrompt.prompt();
  }
});
```

<!-- .element: class="big-code"-->

<br>

##==##

<!-- .slide: class="with-code" -->

# Reporter l’installation de la bannière

<br>

```javascript
btnSave.addEventListener('click', function() {
  if (deferredPrompt !== undefined) {
    deferredPrompt.prompt();

    deferredPrompt.userChoice.then(function(choiceResult) {
      console.log(choiceResult.outcome);
      deferredPrompt = null;
    });
  }
});
```

<!-- .element: class="big-code"-->

<br>

##==##

<!-- .slide: class="with-code" -->

# Désactiver la bannière

<br>

```javascript
window.addEventListener('beforeinstallprompt', function(e) {
  console.log('beforeinstallprompt Event fired');
  e.preventDefault();
  return false;
});
```

<!-- .element: class="big-code"-->

<br>

##==##

<!-- .slide: class="with-code" -->

# ⚠️ Chrome on Android

<br>
### Chrome [68 on Android](https://developers.google.com/web/updates/2018/06/a2hs-updates) will no longer show the add to home screen banner !

<br><br>

```javascript
let installPromptEvent;

window.addEventListener('beforeinstallprompt', event => {
  // Prevent Chrome <= 67 from automatically showing the prompt
  event.preventDefault();
  // Stash the event so it can be triggered later.
  installPromptEvent = event;
  // Update the install UI to notify the user app can be installed
  document.querySelector('#install-button').disabled = false;
});
```

<br>
