<!-- .slide: class="transition" -->

# Credentials

##==##

# Credential Management API

Api permettant de stocker de stocker et récupérer des informations d'identification.

- Stockage de passwords
- Stockage d'identitiés fédérées (social logins)

![](./assets/images/credential-management.gif)

##==##

# Flot d'enregistrement

![center h-800](./assets/images/credential-managment-register.svg)

##==##

# Flot Auto Sign-In

![center h-800](./assets/images/credential-managment-auto-sign-in.svg)

##==##

# Détail de l'API : Existence

Vérification de l'existence de l'API :

```js
if (window.PasswordCredential || window.FederatedCredential) {
  // API disponible
}
```

##==##

# Détail de l'API : Enregistrement

```js
navigator.credentials.store(credential);
```

`credential` peut être un objet de type `PasswordCredential` ou `FederatedCredential`

##==##

# Enregistrement d'un password

```js
new PasswordCredential({
  id: 'xxx', // required
  password: 'xxx', // required
  origin: 'https://example.com', // required
  name: 'John Doe', // optional
  iconURL: 'https://example.com/avatar.png' // optional
});
```

##==##

# Enregistrement d'une identité fédérée

```js
new FederatedCredential({
  id: 'xxx', // required
  provider: 'https://accounts.google.com', // required
  origin: 'https://example.com', // required
  name: 'John Doe', // optional
  iconURL: 'https://example.com/avatar.png' // optional
  protocol: 'openidconnect' // optional
});
```

Le `protocol` doit être à `null` si il peut être inéféré par le provider

##==##

# Détail de l'API : Auto Sign-In

Cette API permet de faire de l'auto sign-in sur un site web.

Les étapes nécessaires à l'auto sign-in sont :

1. Récupérer les informations d'identification

2. Faire une requête au serveur avec les informations d'identification

3. Si les informations d'identification sont valides, rafraichir l'UI

On peut "forcer" l'auto sign-in ou le proposer à l'utilisateur.

##==##

# Auto Sign-In : fonctionnement

```js
navigator.credentials.get({
  password: true,
  federated: {
    providers: ['https://accounts.google.com']
  },
  mediation: 'silent'
});
```

- On peut passer les 2 types de credentials en même temps. On récupère en promesse, le type stocké.

- `mediation` permet de forcer l'auto sign-in. Si l'utilisateur n'est pas connecté, une popup s'ouvre pour lui demander de se connecter.

Notes:
Attention, si il y a plusieurs comptes et qu'on est en mode 'silent', ça ne renvera rien car le navigateur ne sait pas quel compte utiliser.

##==##

# Auto Sign-In : médiation

La médiation peut prendre 3 valeurs :

- `silent` : forcer l'auto sign-in

- `optional` : proposer l'auto sign-in

- `required` : forcer l'auto sign-in, si l'utilisateur n'est pas connecté, une popup s'ouvre pour lui demander de se connecter.

##==##

# Auto Sign-In : récupération des credentials

```js
navigator.credentials.get({...}).then((credential) => {
  // On a récupéré les credentials
  switch (credential.type) {
    case 'password':
      // On a récupéré un password
      break;
    case 'federated':
      // On a récupéré une identité fédérée
      break;
  }
});

```

##==##

# Tableau de compatibilité

![center h-800](./assets/images/caniuse_credential-managment.png)
