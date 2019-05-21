# Fetch API

Lors d'un fetch d'une image, retournez une autre image. Vous pouvez retourner par exemple img/cat.jpg

💡 Pour récupérer l'url de la requête lors de l'event "fetch", vous disposez de event.request.url

# API Concernée

Dans le fichier service worker

```javascript
// Nouvel événement
self.addEventListener('fetch', event => {});

// Url d'un fetch : event.request.url (string)
event.request.url;

// Réponse d'un événement
event.respondWith(/*Blob ou stream ou json*/);

// Fonction fetch disponible dans le service worker
fetch('/img/cat.jpg');
```
