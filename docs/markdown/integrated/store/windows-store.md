<!-- .slide: class="transition-white sfeir-bg-blue" -->

# Windows Store

##==##

<!-- .slide: class="two-column-layout" -->

# A - APPX Manifest

Notes:
Cf https://docs.microsoft.com/en-us/microsoft-edge/progressive-web-apps/windows-features#set-up-and-run-your-universal-windows-app

##--##

<br>

![center h-400](./assets/images/visual-studio-logo.png)

##--##

<br><br>

1 - Release your Web App on the Web

2 - Create a Windows Application Packaging Project using VS

3 - Generate the appxmanifest.xml

4 - Add infos and assets

5 - Test it (Build & Run)

##==##

<!-- .slide: class="two-column-layout" -->

# B - Create your app

Notes:
Cf https://docs.microsoft.com/en-us/windows/uwp/publish/create-your-app-by-reserving-a-name

##--##

<br>

![center h-400](./assets/images/windows-dev-center.jpg)

##--##

<br><br>

1 - Log into the [Windows Dev Center dashboard](https://developer.microsoft.com/en-us/dashboard/windows/overview)

2 - Overview > Create a New App

3 - Check availability.

4 - Reserve product name.

5 - Update your appxmanifest.xml accordingly

##==##

<!-- .slide: class="two-column-layout" -->

# C - Build & Submit

Notes:
Cf https://docs.pwabuilder.com/quickstart/2018/02/03/quick-start-pwa-using-cli-tools.html

##--##

<br>

![center h-400](./assets/images/pwabuilder-logo.png)

##--##

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

##==##

# OR...

##==##

<!-- .slide: class="flex-row" -->

# Automatic PWA importing

<br><br>

![center](./assets/images/bing-logo.png)
