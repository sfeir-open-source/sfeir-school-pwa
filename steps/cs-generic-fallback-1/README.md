# Network First

1. Mettre en place une stratégie network first.
2. On va utiliser cette stratégie pour tout appel à des images de type "jpg" avec en fallback l'image de chat `'/img/cat.jpg'`.

# Tips

- L'image de chat n'est peut être pas présente en cache au début ;)
- Dans le network first, il ne faut pas oublier de mettre en cache le résultat obtenu
- N'oubliez pas de traiter les cas classiques (cache pour les infos statiques et fetch pour le reste)

# API Concernée

Dans le fichier Service Worker, on va surcharger la méthode fetch. Mêmes méthodes que pour les exercices précédents
