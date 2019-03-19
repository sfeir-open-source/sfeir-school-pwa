<!-- .slide: data-background="black" class="full-center mariane" -->

<p style="font-size:2em;font-weight:bold;color:white">
Credential Management API
</p>

##==##

<!-- .slide: data-background="./assets/images/webauthn/ease.jpg" class="full-center" -->

Removes Friction from sign-in flow

<!-- .element class="shadow-title" -->

Notes:
Users can be automatically signed back into a site even if their session has expired or they saved credentials on another device.

##==##

<!-- .slide: data-background="./assets/images/webauthn/tap.jpg" class="full-center" -->

Allows one tap sign in with account chooser

<!-- .element class="shadow-title" -->

Notes:
Users can choose an account in a native account chooser.

##==##

<!-- .slide: data-background="./assets/images/webauthn/store.jpg" class="full-center" -->

Stores credentials

<!-- .element class="shadow-title" -->

Notes:
Your application can store either a username and password combination or even federated account details. These credentials can be synced across devices by the browser.

##==##

<!-- .slide: data-background="./assets/images/webauthn/secure.jpg" class="full-center" -->

Require a secure context

<!-- .element class="shadow-title" -->

Notes:
Using the Credential Management API requires the page be served from a secure origin.
Cf https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts

##==##

<!-- .slide: class="with-code" data-background="black"-->

<br><br><br>

```javascript
window.PasswordCredential;
```

<!-- .element: class="big-code" -->

<br><br>

```javascript
window.FederatedCredential;
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code"-->

# Sign in

```javascript
if (window.PasswordCredential || window.FederatedCredential) {
  if (!user.isSignedIn()) {
    navigator.credentials
      .get({
        password: true,
        federated: {
          providers: ['https://accounts.google.com']
        },
        mediation: 'silent'
      })
      .then(c => {
        if (c) {
          switch (c.type) {
            case 'password':
              return sendRequest(c);
              break;
            case 'federated':
              return gSignIn(c);
              break;
          }
        } else {
          return Promise.resolve();
        }
      })
      .then(profile => {
        if (profile) {
          updateUI(profile);
        }
      })
      .catch(error => {
        showError('Sign-in Failed');
      });
  }
}
```

<!-- .element: class="big-code" -->
