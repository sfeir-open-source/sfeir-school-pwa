# Créer votre propre manifest

1. Créez votre manifest.json avec comme icônes celles contenues dans le dossier assets/img/icons (url ./img/icons/…) et avec votre application en mode standalone
2. Placez ce fichier dans un répertoire /manifest-1/manifest/
3. Liez-le à votre application avec landing.html
4. Pensez à ajouter le fichier manifest.json aux fichiers dans le cache static

# API Concernée

Fichier Manifest.json

```javascript
{
  "name": "...",
  "short_name": "...",
  "description": "...",
  "icons": [
    {
      "src": "PathToImg",
      "sizes": "128x128",
      "type": "image/png"
    },
    // ... autre résolutions
  ],
  "start_url": "...",
  "display": "standalone|window|fullscreen",
  "background_color": "...",
  "theme_color": "...",
}
```

Ou : https://app-manifest.firebaseapp.com/

Dans le fichier html (header)

```html
<link rel="manifest" href="pathToManifestFile" />
```
