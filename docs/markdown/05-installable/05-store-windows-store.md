<!-- .slide: class="transition bg-blue" data-type-show="on-stage" -->

# Windows Store

##==##

<!-- .slide: class="tc-multiple-columns" -->

##++##

# A - APPX Manifest

<br>

![](./assets/images/visual-studio-logo.png 'center h-400')
##++##
##++##

<br><br>

1 - Release your Web App on the Web

2 - Create a Windows Application Packaging Project using VS

3 - Generate the appxmanifest.xml

4 - Add infos and assets

5 - Test it (Build & Run)
##++##

Notes:
Cf https://docs.microsoft.com/en-us/microsoft-edge/progressive-web-apps/windows-features#set-up-and-run-your-universal-windows-app
##==##

<!-- .slide: class="tc-multiple-columns" -->

##++##

# B - Create your app

<br>

![](./assets/images/windows-dev-center.jpg 'center h-400')
##++##
##++##

<br><br>

1 - Log into the [Windows Dev Center dashboard](https://developer.microsoft.com/en-us/dashboard/windows/overview)

2 - Overview > Create a New App

3 - Check availability.

4 - Reserve product name.

5 - Update your appxmanifest.xml accordingly
##++##

Notes:
Cf https://docs.microsoft.com/en-us/windows/uwp/publish/create-your-app-by-reserving-a-name
##==##

<!-- .slide: class="tc-multiple-columns" -->

##++##

# C - Build & Submit

<br>

![](./assets/images/pwabuilder-logo.png 'center h-400')
##++##
##++##

<br><br>

1 - Install the [PWABuilder CLI](https://www.npmjs.com/package/pwabuilder)

```bash
$ npm i -g pwabuilder
```

2 - Create the .apx build

```bash
$ pwabuilder package -p windows10 -l debug
```

3 - Test w/ the [Windows App Certification Kit](https://developer.microsoft.com/en-us/windows/develop/app-certification-kit)

4 - Submit through the Windows Dev Center Dashboard

5 - and wait...
##++##

Notes:
Cf https://docs.pwabuilder.com/quickstart/2018/02/03/quick-start-pwa-using-cli-tools.html
##==##

<!-- .slide: data-type-show="on-stage" -->

# OR...

##==##

<!-- .slide: class="flex-row" data-type-show="on-stage" -->

# Automatic PWA importing

<br><br>

![](./assets/images/bing-logo.png 'center')
