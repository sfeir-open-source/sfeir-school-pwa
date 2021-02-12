# Network Only (Appels serveurs)

1. Mettre en place une stratégie network only pour la partie Apis.
1. Les Appels d'APIs sont commencent tous par '/api'
1. Vérifier à l’aide de votre navigateur que tout s’est bien passé.

# Tips

- Utilisez les devtools de chrome, onglet network pour analyser les fichiers appelés au démarrage de l'application
- Mettez en cache dans l'événement d'installation
- N'oubliez pas de redonner la main au service worker après la mise en cache
- Pour cet exercice, laissez passer les autres appels http
- Pour cet exercice, on va s'insérer dans l'événement 'fetch'
