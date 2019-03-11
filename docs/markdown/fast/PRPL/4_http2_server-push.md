<!-- .slide: class="transition-white sfeir-bg-blue" -->

# Server Push

##==##

# HTTP/2 Server Push

<br>

![center](./assets/images/PRPL/push01.svg)

<p class="copyright">
© [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/) [Google](https://developers.google.com/web/fundamentals/performance/http2/)
</p>

##==##

# Push Manifest

```json
{
  "/css/app.css": {
    "type": "style",
    "crossorigin": "anonymous",
    "weight": 1
  },
  "/js/my-app.js": {
    "type": "script",
    "weight": 1
  },
  "/js/default-route.js": {
    "type": "script",
    "weight": 1
  }
}
```

##==##

# multi-file manifest format

```json
{
  "/": {
    "/css/app.css": {
      "type": "style",
      "crossorigin": "anonymous",
      "weight": 1
    },
    "/js/my-app.js": {
      "type": "script",
      "weight": 1
    },
    "/js/default-route.js": {
      "type": "script",
      "weight": 1
    }
    ...
  },
  "/view1": {
    "/css/app.css": {
      "type": "style",
      "crossorigin": "anonymous",
      "weight": 1
    },
    "/js/my-app.js": {
      "type": "script",
      "weight": 1
    }
    ...
  }
}
```

##==##

# Generate

<br><br>

## http2-push-manifest

```sh
$ npm install --save-dev http2-push-manifest
$ http2-push-manifest -f app/index.html -f page.html
```

<br><br>

## Polymer CLI

```json
{
  "builds": [{
    ...
    "addPushManifest": true,
    ...
  }]
}<br><br>
```

<p class="center">
polymer.json
</p>

<br>

Notes:

https://github.com/GoogleChromeLabs/http2-push-manifest
https://polymer-library.polymer-project.org/3.0/docs/tools/polymer-json#addpushmanifest

##==##

# prpl-server

<br>
## install

```sh
$ npm install -g prpl-server
```

<br>
## CLI

```sh
$ prpl-server --root . --config polymer.json
```

##==##

# Differential serving

<br><br>

```json
{
  "entrypoint": "index.html",
  "builds": [{ "name": "modern", "browserCapabilities": ["es2015", "push"] }, { "name": "fallback" }]
}
```

##--##

| Keyword       | Description                                                                                                                  |
| :------------ | :--------------------------------------------------------------------------------------------------------------------------- |
| push          | [HTTP/2 Server Push](https://developers.google.com/web/fundamentals/performance/http2/#server-push)                          |
| serviceworker | [Service Worker API](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers)                 |
| modules       | [JavaScript Modules](https://www.chromestatus.com/feature/5365692190687232) (including dynamic `import()` and `import.meta`) |
| es2015        | [ECMAScript 2015 (aka ES6)](https://developers.google.com/web/shows/ttt/series-2/es2015)                                     |
| es2016        | ECMAScript 2016                                                                                                              |
| es2017        | ECMAScript 2017                                                                                                              |
| es2018        | ECMAScript 2018                                                                                                              |

##==##

# Config polymer.json

```json
{
  "entrypoint": "index.html",
  "shell": "common/app/components/PeopleApp.js",
  "sources": ["img/**/*"],
  "extraDependencies": [
    "node_modules/@webcomponents/webcomponentsjs/**",
    "node_modules/normalize.css/normalize.css",
    "push-manifest.json"
  ],
  "builds": [
    {
      "name": "esm-bundled",
      "browserCapabilities": ["es2015", "modules"],
      "js": {
        "minify": true
      },
      "css": {
        "minify": true
      },
      "html": {
        "minify": true
      },
      "bundle": true,
      "addServiceWorker": true
    },
    {
      "name": "es6-bundled",
      "browserCapabilities": ["es2015"],
      "js": {
        "compile": "es2015",
        "minify": true,
        "transformModulesToAmd": true
      },
      "css": {
        "minify": true
      },
      "html": {
        "minify": true
      },
      "bundle": true,
      "addServiceWorker": true
    },
    {
      "name": "es5-bundled",
      "js": {
        "compile": "es5",
        "minify": true,
        "transformModulesToAmd": true
      },
      "css": {
        "minify": true
      },
      "html": {
        "minify": true
      },
      "bundle": true,
      "addServiceWorker": true
    }
  ],
  "moduleResolution": "node",
  "npm": true
}
```

## API

```js
const prpl = require('prpl-server');
const express = require('express');
const prplConfig = require('./build/polymer.json');

const app = express();

app.get('/*', prpl.makeHandler(path.join(__dirname, '/build'), prplConfig));

app.listen(8080);
```

##==##

# Google App Engine

<br><br>

## [http2push-gae](https://github.com/GoogleChrome/http2push-gae)

```python
class Handler(http2.PushHandler):

  @http2push.push('push_manifest.json')
  def get(self):
    # Resources in push_manifest.json will be server-pushed with this handler.
```
