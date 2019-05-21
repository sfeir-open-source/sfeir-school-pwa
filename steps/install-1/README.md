# Créer un bouton pour installer l'app

Créer un bouton pour installer votre application et annuler la bannière d’installation.

# Tips

- Penser à intercepter l'événement lancer par le navigateur pour le proposer à l'utilisateur quand il le demande

# API Concernée

Dans le fichier html

```javascript
// Evénement à intercepter
window.addEventListener('beforeinstallprompt', e => {});

// Annuler un événement javascript
e.preventDefault();

// Lancement de l'événement
deferredEvent.prompt();

// Attente de la confirmation de l'utilisateur
deferredEvent.userChoice.then(choiceResult => {
  // Validation de l'utilisateur
  choiceResult.outcome; // String = dismissed (si l'utilisateur refuse)
});
```
