# Workbox

1. Intégrer workbox au service worker
   `importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');`
2. Changer le service worker pour simplifier l’écriture des stockages en cache

# Tips

- On va précacher des fichiers (https://developers.google.com/web/tools/workbox/reference-docs/latest/workbox.precaching)

- Regex images : new RegExp('.\*\.(?:png|jpg|jpeg|svg|gif)')
- Regex css : new RegExp('.\*\.css')
