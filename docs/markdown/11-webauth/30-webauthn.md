<!-- .slide: class="transition" -->

# WebAuthN

##==##

# WebAuthN ou FIDO Authentication

FIDO = Fast IDentity Online.

C'est un consortium qui a pour but de développer des standards d'authentification forte. Il est composé de plusieurs acteurs majeurs du web (Google, Microsoft, Mozilla, Apple, Facebook, etc.).

Leur but est de proposer des standards d'authentification forte qui soient à la fois sécurisés et simples d'utilisation.

##==##

# WebAuthN Pourquoi ?

- Les mots de passe sont souvent faibles et réutilisés.
- Resistant aux attaques par phishing.
- Pas de stockage de mot de passe côté serveur.
- UX d'authentification simple et rapide.

##==##

# WebAuthN Fonctionnement ?

![full-center h-800](./assets/images/webAuthN-how.svg)

Notes:

1. User initiates device setup on device
2. Web server generates a challenge key for registration (one time use)
3. Web server sends the following to the web app: Challenge Key, User Info
4. Web app adds authoritative domain name to information to be sent to authenticator
5. Authenticator asks for user consent
6. Once consent is given, authenticator stores Credential ID, Public/Private Key, User info, Domain
   name
7. Web app forwards the following to web server: Credential ID, Public Key, and Signature
8. Challenge Key is invalidated, and device is registered

##==##

# Pourquoi WebAuthN est resistant au phishing ?

## Exemple de phishing

![full-center h-800](./assets/images/webAuthN-phishing.svg)

##==##

# Pourquoi WebAuthN est resistant au phishing ?

![full-center h-800](./assets/images/webAuthN-phishing-check.svg)

Notes:
Lorsque le défi est reçu, l'authentificateur vérifie le nom de domaine d'où provient le défi.
est à l'origine. Comme indiqué ci-dessus, les attaques de phishing classiques redirigent généralement l'utilisateur final vers un faux site web où il saisit ses informations d'identification, qui sont ensuite utilisées pour la prise de contrôle du compte.
où il saisit ses informations d'identification, qui sont ensuite utilisées pour la prise de contrôle du compte. Avec l'utilisation de WebAuthn, ce risque est impossible car l'authentificateur (ou le téléphone dans ce cas) vérifiera le nom de domaine de l'utilisateur.

##==##

# WebAuthN, quels moyens d'authentification ?

![full-center h-800](./assets/images/webAuthN-authenticators.svg)

##==##

<!-- .slide: class="transition" -->

# WebAuthN - L'enregistrement

##==##

# WebAuthN - L'enregistrement

## Step 1 : Récupérer le challenge (Client Side)

```javascript
const rawGetResponse = await fetch('https://mybackend/api/webauthn/challenge', {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});
const response = await rawGetResponse.json();
```

##==##

# WebAuthN - L'enregistrement

## Les options pour l'API

```javascript
{
  "challenge": "...", // Mandatory
  "timeout": 1800000, // Optionnal
  "rpId": "webauthn-codelab.glitch.me", // Optionnal
  "userVerification": "required", // Optionnal
  "allowCredentials": [ // Optionnal
    {
      "id": "...",
      "type": "public-key",
      "transports": [
        "internal"
      ]
    }
  ]
}
```

Notes:

- challenge, of type BufferSource

This member represents a challenge that the selected authenticator signs, along with other data, when producing an authentication assertion. See the § 13.4.3 Cryptographic Challenges security consideration.

- timeout, of type unsigned long

This OPTIONAL member specifies a time, in milliseconds, that the caller is willing to wait for the call to complete. The value is treated as a hint, and MAY be overridden by the client.

- rpId, of type USVString

This OPTIONAL member specifies the relying party identifier claimed by the caller. If omitted, its value will be the CredentialsContainer object’s relevant settings object's origin's effective domain.

- allowCredentials, of type sequence<PublicKeyCredentialDescriptor>, defaulting to []

This OPTIONAL member contains a list of PublicKeyCredentialDescriptor objects representing public key credentials acceptable to the caller, in descending order of the caller’s preference (the first item in the list is the most preferred credential, and so on down the list).

- userVerification, of type DOMString, defaulting to "preferred"

This OPTIONAL member describes the Relying Party's requirements regarding user verification for the get() operation. The value SHOULD be a member of UserVerificationRequirement but client platforms MUST ignore unknown values, treating an unknown value as if the member does not exist. Eligible authenticators are filtered to only those capable of satisfying this requirement.

- extensions, of type AuthenticationExtensionsClientInputs

This OPTIONAL member contains additional parameters requesting additional processing by the client and authenticator. For example, if transaction confirmation is sought from the user, then the prompt string might be included as an extension.

##==##

# WebAuthN - L'enregistrement

## Step 2-3 ? : Create options with challenge (Server side)

```javascript
{
   challenge: generateRandomBufferStr(64),
   allowCredentials: [
      { type: "public-key", alg: -7, id: credID },
      { type: "public-key", alg: -257, id: credID }
   ],
   rpId: {
      name: rpName
   },
   userVerification: "discouraged"
}
```

##==##

# WebAuthN - L'enregistrement

## Step 5 : Create signature (Client Side)

```javascript
response.challenge = base64url.decode(response.challenge);
const cred = await navigator.credentials.get({
  publicKey: response
});
```

Notes:
On renvoie le challenge au navigateur pour qu'il puisse créer la signature.

##==##

# WebAuthN - L'enregistrement

## Step 6 : Envoie de la signature (Client Side)

```javascript
const credential = {};
credential.id = cred.id;
credential.type = cred.type;
credential.rawId = base64url.encode(cred.rawId);
credential.response = {
  clientDataJSON: base64url.encode(cred.response.clientDataJSON),
  authenticatorData: base64url.encode(cred.response.authenticatorData),
  signature: base64url.encode(cred.response.signature),
  userHandle: base64url.encode(cred.response.userHandle)
};
return await _fetch(`/auth/signinResponse`, credential);
```

##==##

# WebAuthN - L'enregistrement

Par la suite, on va stocker les informations côté serveur et côté client de façon à pouvoir les réutiliser pour l'authentification.

##==##

<!-- .slide: class="transition" -->

# WebAuthN - L'authentification

##==##

# WebAuthN - L'authentification

En fait l'authentification fonctionne de la même manière que l'enregistrement en terme d'étapes.

![full-center h-800](./assets/images/webAuthN-how.svg)

Notes:

1. User initiates device setup on device
2. Web server generates a challenge key for registration (one time use)
3. Web server sends the following to the web app: Challenge Key, User Info
4. Web app adds authoritative domain name to information to be sent to authenticator
5. Authenticator asks for user consent
6. Once consent is given, authenticator stores Credential ID, Public/Private Key, User info, Domain
   name
7. Web app forwards the following to web server: Credential ID, Public Key, and Signature
8. Challenge Key is invalidated, and device is registered

##==##

# WebAuthN - multiples authenticators

Il est important d'avoir en tête que cette authentification est liée à un moyen de double authentification forte et que votre empreinte, quand bien même elle est unique dépend de votre appareil.

Il est donc recommandé d'avoir la possibilité de "stocker" / "associer" plusieurs authenticators à un même compte.

##==##

# WebAuthN - authent sans mot de passe ?

Réélement, même si le mécanisme d'Authentification de WebAuthN nous permet une vrai chaine d'enregistrement / authentification sans mot de passe, il est important de ne pas en faire l'unique moyen. Plusieurs raisons peuvent être à l'origine de cette recommandation :

- Il n'y a pas de moyens d'utiliser une double authent
- L'utilisateur est sur un nouvel appareil
- ...

Il faut donc considérer l'authentification par WebAuthN comme un moyen supplémentaire et non comme un moyen unique.
