<!-- .slide: data-background="black" class="full-center mariane" -->

<p style="font-size:2em;font-weight:bold">
What's new?
</p>

##==##

<!-- .slide: data-background="./assets/images/webauthn/cryptokey.jpg" class="full-center" -->

##==##

<!-- .slide: class="full-center" -->

![](./assets/images/webauthn/U2F-USB-Token.jpg)

##==##

<!-- .slide: data-background="black" class="full-center mariane" -->

![h-600](./assets/images/webauthn/key-prompt.png)

##==##

<!-- .slide: data-background="./assets/images/webauthn/2fa-new.png" class="full-center" -->

##==##

<!-- .slide: data-background="black" class="full-center mariane" -->

![h-600](./assets/images/webauthn/fingerprint.jpg)

##==##

<!-- .slide: class="with-code" -->

# Registration

<br>

```javascript
let credential = await navigator.credentials.create({
  publicKey: {
    challenge: Uint8Array(32) [117, 61, 252, 231, 191, 241,…]
    rp: { id: "acme.com", name: "ACME Corporation" },
    user: {
      id: Uint8Array(8) [79, 252, 83, 72, 214, 7, 89, 26]
      name: "jamiedoe",
      displayName: "Jamie Doe"
    },
    pubKeyCredParams: [ {type: "public-key", alg: -7} ]
  }
});
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code" -->

# Authentication

<br>

```javascript
let credential = await navigator.credentials.get({
  publicKey: {
    challenge: Uint8Array(32) [139, 66, 181, 87, 7, 203,…]
    rpId: "acme.com",
    allowCredentials: [{
      type: "public-key",
      id: Uint8Array(80) [64, 66, 25, 78, 168, 226, 174,…]
    }],
    userVerification: "required",
  }
});
```

<!-- .element: class="big-code" -->
