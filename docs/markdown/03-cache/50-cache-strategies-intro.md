<!-- .slide: class="transition bg-blue" -->

# Strategies de cache

##==##

<!-- .slide: class="flex-row" -->

# Stratégies de cache

<br><br>

- Cache-Only
- Network-Only
- Cache-First
- Network-First
- Cache-Then-Network
- Stale-While-Revalidate
- Generic-Fallback

Notes:
Certaines stratégies ne sont pas à utiliser toutes seules, en général, on va choisir une partie de son app qui suivra une de ces stratégies

##==##

# Stratégies de cache : Cache-only

![center h-800](./assets/images/cache-strategy-cache-only.png)
Notes:
Ideal pour tout ce qui est considéré comme static a une version du site.

Ideal for: Anything you'd consider static to that "version" of your site.
You should have cached these in the install event, so you can depend on them being there.

##==##

# Stratégies de cache : Network-only

![center h-800](./assets/images/cache-strategy-network-only.png)

Notes:
on ne veut pas de cache car l'opération est critique/ne peut pas fonctionner hors ligne.

Si ce n'est qu'une partie de l'application, il est important d'expliquer clairement au niveau de l'interface pourquoi la fonctionnalité n'est pas disponible.

##==##

# Stratégies de cache : Cache-first

![center h-800](./assets/images/cache-strategy-cache-first.png)
Notes:
D'abord le cache, et si pas trouvé, network

##==##

# Stratégies de cache : Network-first

![center h-800](./assets/images/cache-strategy-network-first.png)
Notes:
D'abord le réseau, et si erreur, le cache
Donne au utilisateurs en ligne une version fraiche, et en offline une version en cache qui peut être périmée
Peu être génant sur un reseau lent, dû à l'attente d'une erreur réseau pour afficher le caches
Avatars, classement,

##==##

# Stratégies de cache : Cache-Then-Network

![center h-800](./assets/images/cache-strategy-cache-then-network.png)

Notes:
Ici, on récupère le cache, et en même temps, on va chercher le network. Quand le résultat du network est là, alors on rafraichit de façon pro-active la page

##==##

# Stratégies de cache : Stale-While-Revalidate

![center h-800](./assets/images/cache-strategy-stale-while-revalidate.png)

Notes:
Proche de la version Cache-Then-Network
Si il existe une version en cache, on l'utilise, puis on telecharge la nouvelle version pour la prochaine fois

##==##

# Stratégies de cache : Generic-Fallback

![center h-800](./assets/images/cache-strategy-generic-fallback.png)

Notes:
Si il existe une version en cache, on l'utilise, sinon, on prend celle du serveur, sinon, on prend un résultat par défaut

##==##

# Comment faire avec Workbox en cas de besoins spécifiques ?

1. Créer son propre service worker
1. Générer le service worker avec Workbox
1. Inclure le service worker de workbox dans son service worker
1. Surcharger les éventuels étapes que l'on souhaite mettre en place

##==##

<!-- .slide: class="with-code" -->

# Comment faire avec Workbox en cas de besoins spécifiques ?

### my-service-worker.js

```javascript
/*******************************/
/****IMPORT WORKBOX******/
importScripts('./service-worker.js')

// Override every event we need
self.addEventListener('activate', event => event.waitUntil( ...))
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="transition bg-white" -->

# Avec les frameworks

##==##

# Avec les frameworks

<br>

> ⚠️ Dans tous les cas, vos tests PWA ne pourront se faire qu'en mode de production ! Aucun des systèmes prévus par les frameworks n'a pour vocation de fonctionner en mode dev.

##==##

<!-- .slide: class="with-code" -->

# Avec Angular

En utilisant la schematics `@angular/pwa` et en configurant le `ngsw-worker.js`

```json
{
  "index": "/index.html",
  "assetGroups": [
    {
      "name": "cacheOnly",
      "installMode": "prefetch",
      "updateMode": "prefetch",
      "resources": {
        "files": ["**"]
      }
    }
  ]
}
```

<!-- .element: class="big-code" -->

Notes:
Ce mode là n'est prévu que pour des choses fonctionnant sans appels serve

##==##

<!-- .slide: class="with-code" -->

# Comment faire du spécifique avec Angular ?

Tout comme pour Workbox, on va importer le service worker généré dans notre service worker et référencer notre service worker au sein de l'application

<br><br>

### my-service-worker.js

```javascript
/****IMPORT ANGULAR WORKER******/
importScripts('./ngsw-worker.js')

// Override every event we need
self.addEventListener('activate', event => event.waitUntil( ...))
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code" -->

# Comment faire du spécifique avec Angular ?

### app.module.ts

```javascript
import { ServiceWorkerModule } from '@angular/service-worker'
@NgModule({
  ...
  imports: [
    ServiceWorkerModule.register('/my-service-worker.js', {
      enabled: environment.production,
    }),
  ],
  ...
})
export class AppModule {}
```

<!-- .element: class="big-code" -->

##==##

# Avec React

> Starting with Create React App 4, you can add a src/service-worker.js file to your project to use the built-in support for Workbox's InjectManifest plugin, which will compile your service worker and inject into it a list of URLs to precache.

<br><br>
**En résumé : Comme avec Workbox**

##==##

# Avec VueJS

<!-- .slide: class="with-code" -->

En utilisant aussi Workbox dans le fichier de config de vue

vue.config.js

```javascript
module.exports = {
  // ...other vue-cli plugin options...
  pwa: {
    //....
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'dev/sw.js'
      // ...other Workbox options...
    }
  }
};
```

<!-- .element: class="big-code" -->
