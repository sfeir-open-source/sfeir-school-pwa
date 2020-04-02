<!-- .slide: class="transition bg-blue" -->

# Rendre l'application installable

##==##

# Objectifs

<br><br>

![h-700 float-left](./assets/images/devoxx_app.gif)

<!-- .element: style="margin-left:500px; margin-right:50px;" -->

- App Like
  <br><br>
- Engagement
  <br><br>
- Performances

##==##

<!-- .slide: class="transition top" data-background="./assets/images/manifest.png" -->

# Le Manifest

##==##

<!-- .slide: class="with-code" -->

# Manifest : lier à l'application

<br>

```html
<link rel="manifest" href="manifest.json" />
```

<!-- .element: class="big-code" -->

<br>
Notes:
https://developers.google.com/web/updates/2014/11/Support-for-installable-web-apps-with-webapp-manifest-in-chrome-38-for-Android?hl=en

##==##

<!-- .slide: class="two-column-layout" -->

# Le fichier

##--##

<!-- .slide: class="with-code" -->

```javascript
{
  "name": "Peoples",
  "short_name": "Peoples",
  "icons": [
    {
      "src": "../img/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
   ],
  "start_url": "index.html",
  "display": "standalone",
  "background_color": "#3E4EB8",
  "theme_color": "#2F3BA2",
  "gcm_sender_id": "912272722967"
}
```

##--##

![center h-600](./assets/images/black_phone.png)

Notes:

##==##

<!-- .slide: class="two-column-layout" -->

# Icône

##--##

<!-- .slide: class="with-code" -->

```javascript
{
  ...,
  "icons": [
    {
      "src":
      "../img/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
   ],
  ...
}
```

<!-- .element: class="big-code" -->

Notes:
##--##

![center h-600](./assets/images/pwa_icon.png)

Notes:

##==##

<!-- .slide: class="two-column-layout" -->

# Page de garde (splash screen)

##--##

<!-- .slide: class="with-code" -->

```javascript
{
  "short_name": "Peoples",
  "icons": [
    { "src":
      "../img/icons/icon-192x192.png"}
   ],
  "background_color": "#3E4EB8",
  "theme_color": "#2F3BA2",
}
```

<!-- .element: class="big-code" -->

##--##

![center h-600](./assets/images/pwa_splash.png)

Notes:

##==##

<!-- .slide: class="two-column-layout" -->

# Premier écran

##--##

<!-- .slide: class="with-code" -->

```javascript
{
  ...
  "start_url": "index.html",
  ...
}
```

<!-- .element: class="big-code" -->

##--##

![center h-600](./assets/images/pwa_first-screen.png)

Notes:

##==##

<!-- .slide: class="two-column-layout" -->

# Premier écran pour l'analytics

##--##

<!-- .slide: class="with-code" -->

```javascript
{
  ...
  "start_url": "index.html?homescreen=1",
  ...
}
```

<!-- .element: class="big-code" -->

##--##

![center h-600](./assets/images/pwa_first-screen.png)

Notes:

##==##

<!-- .slide: class="two-column-layout" -->

# Browser

##--##

<!-- .slide: class="with-code" -->

```javascript
{
  ...
  "display": "browser",
  ...
}
```

<!-- .element: class="big-code" -->

##--##

![center h-600](./assets/images/pwa_first-screen-window.png)

Notes:

##==##

<!-- .slide: class="two-column-layout" -->

# Standalone

##--##

<!-- .slide: class="with-code" -->

```javascript
{
  ...
  "display": "standalone",
  ...
}
```

<!-- .element: class="big-code" -->

##--##

![center h-600](./assets/images/pwa_first-screen-standalone.png)

Notes:

##==##

<!-- .slide: class="two-column-layout" -->

# Minimal-ui

##--##

<!-- .slide: class="with-code" -->

```javascript
{
  ...
  "display": "minimal-ui",
  ...
}
```

<!-- .element: class="big-code" -->

##--##

![center h-600](./assets/images/pwa_first-screen.png)

Notes:

##==##

<!-- .slide: class="two-column-layout" -->

# Video Games

##--##

<!-- .slide: class="with-code" -->

```javascript
{
  ...
  "display": "fullscreen",
  "orientation": "portrait",
  ...
}
```

<!-- .element: class="big-code" -->

##--##

![center h-600](./assets/images/pwa_games.png)

Notes:

##==##

<!-- .slide: class="two-column-layout" -->

# Video Games

##--##

<!-- .slide: class="with-code" -->

```javascript
{
  ...
  "display": "fullscreen",
  "orientation": "landscape",
  ...
}
```

<!-- .element: class="big-code" -->

##--##

![center h-600](./assets/images/pwa_games_landscape.png)

Notes:

##==##

# Validateur

![center h-700](./assets/images/manifest_validator.png)

<br>

https://manifest-validator.appspot.com/

<!-- .element: class="center" -->

<br>

##==##

# Générateur de manifest

![center h-700](./assets/images/manifest_generator.png)

<br>

https://app-manifest.firebaseapp.com/

<!-- .element: class="center" -->

<br>

##==##

# Tester

![center h-800](./assets/images/devtools_manifest.png)
