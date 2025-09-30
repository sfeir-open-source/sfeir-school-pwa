<!-- .slide: class="transition bg-blue" data-type-show="on-stage" -->

# Rendre l'application installable

##==##

<!-- .slide: data-type-show="on-stage" -->

# Objectifs

![](./assets/images/devoxx_app.gif 'h-700 float-left')

<!-- .element: style="margin-left:500px; margin-right:50px;" -->

<br><br>

- App Like
  <br><br>
- Engagement
  <br><br>
- Performances

##==##

<!-- .slide: class="transition top mask" data-background="./assets/images/manifest.png" data-type-show="on-stage" -->

# Le Manifest

##==##

<!-- .slide: class="with-code" data-type-show="on-stage" -->

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

<!-- .slide: class="tc-multiple-columns" -->

##++## class="with-code"

# Le fichier

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

##++##
##++##

![](./assets/images/black_phone.png 'center h-600')
##++##

Notes:

##==##

<!-- .slide: class="tc-multiple-columns" -->

##++## class="with-code"

# Icône

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

##++##
##++##

![](./assets/images/pwa_icon.png 'center h-600')

##++##

Notes:
##==##

<!-- .slide: class="tc-multiple-columns" -->

##++## class="with-code"

# Page de garde (splash screen)

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

##++##
##++##

![](./assets/images/pwa_splash.png 'center h-600')
##++##

Notes:
##==##

<!-- .slide: class="tc-multiple-columns" -->

##++## class="with-code"

# Premier écran

```javascript
{
  ...
  "start_url": "index.html",
  ...
}
```

<!-- .element: class="big-code" -->

##++##
##++##

![](./assets/images/pwa_first-screen.png 'center h-600')
##++##

Notes:
##==##

<!-- .slide: class="tc-multiple-columns" -->

##++## class="with-code"

# Premier écran pour l'analytics

```javascript
{
  ...
  "start_url": "index.html?homescreen=1",
  ...
}
```

<!-- .element: class="big-code" -->

##++##
##++##

![](./assets/images/pwa_first-screen.png 'center h-600')
##++##

Notes:
##==##

<!-- .slide: class="tc-multiple-columns" -->

##++## class="with-code"

# Browser

```javascript
{
  ...
  "display": "browser",
  ...
}
```

<!-- .element: class="big-code" -->

##++##
##++##

![](./assets/images/pwa_first-screen-window.png 'center h-600')
##++##

Notes:
##==##

<!-- .slide: class="tc-multiple-columns" -->

##++## class="with-code"

# Standalone

```javascript
{
  ...
  "display": "standalone",
  ...
}
```

<!-- .element: class="big-code" -->

##++##
##++##

![](./assets/images/pwa_first-screen-standalone.png 'center h-600')
##++##

Notes:
##==##

<!-- .slide: class="tc-multiple-columns" -->

##++## class="with-code"

# Minimal-ui

```javascript
{
  ...
  "display": "minimal-ui",
  ...
}
```

<!-- .element: class="big-code" -->

##++##
##++##

![](./assets/images/pwa_first-screen.png 'center h-600')
##++##

Notes:
##==##

<!-- .slide: class="tc-multiple-columns" -->

##++## class="with-code"

# Video Games

```javascript
{
  ...
  "display": "fullscreen",
  "orientation": "portrait",
  ...
}
```

<!-- .element: class="big-code" -->

##++##
##++##

![](./assets/images/pwa_games.png 'center h-600')
##++##

Notes:
##==##

<!-- .slide: class="tc-multiple-columns" -->

##++## class="with-code"

# Video Games

```javascript
{
  ...
  "display": "fullscreen",
  "orientation": "landscape",
  ...
}
```

<!-- .element: class="big-code" -->

##++##
##++##

![](./assets/images/pwa_games_landscape.png 'center h-600')
##++##

Notes:

<br>
##==##

<!-- .slide: data-type-show="on-stage" -->

# Générateur de manifest

![](./assets/images/manifest_generator.png 'center h-700')

<br>

https://app-manifest.firebaseapp.com/

<!-- .element: class="center" -->

<br>

##==##

<!-- .slide: data-type-show="on-stage" -->

# Tester

![](./assets/images/devtools_manifest.png 'center h-800')
