<!-- .slide: class="transition bg-pink" -->

# Responsive Design

##==##

<!-- .slide: class="" -->

# Responsive Design ?

<br />
**Une application doit pouvoir être disponible sur tout type de périphérique**

- Pas de développement pour une taille d'écran unique / plateforme.
- Éviter la perte d'engagement de l'utilisateur.
- Éviter la perte de confiance de l'utilisateur.

<br />
Par exemple :
- Ne jamais avoir besoin d'un scroll horizontal sur mobile.
- Éviter les tailles fixées en pixel.

##==##

# Comment faire ?

- Utilisez des tailles relatives, em, rem, %.
- Utilisez Flexbox et GridLayout
- Utilisez les media queries

![center h-300](./assets/images/caniuse_flexbox.png)
![center h-300](./assets/images/caniuse_gridlayout.png)

##==##

<!-- .slide: class="with-code" -->

# Le meta tag viewport

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

<!-- .element: class="big-code" -->

<br />

Définit la taille du viewport virtuel.

Sinon le viewport va être définit comme faisant 980px sur la plupart des browsers mobiles.

##==##

# Relative sizing ?

![center h-600](./assets/images/relative-sizing.png)

Notes: Les tailles relatives peuvent aider, mais ne sont pas assez.
Ce type de layout sur mobile va rendre des contenus beaucoup trop petit pour être utilisable

##==##

# Media queries

![center h-600](./assets/images/media-queries.png)

Notes: Utiliser différentes règles CSS pour différentes taille du viewport, basé sur la largeur

##==##

<!-- .slide: class="with-code" -->

# Media queries (exemples)

```css
/* Layout pour téléphones */
@media (min-width: 480px) {
  /* Layout pour tablettes */
}
@media (min-width: 780px) {
  /* Layout pour desktop */
}
```

<!-- .element: class="big-code" -->

Notes: Commencer par le plus petit, et en faire celui par défaut

##==##

<!-- .slide: class="with-code" -->

# Media queries en javascript

```javascript
var media = 'screen and (min-width: 780px)';

if (window.matchMedia(media).matches) {
  // ajouter quelque chose pour les écrans de minimum 780px
}
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code" -->

# Calc() à la rescousse

```css
img {
  margin-right: 20px;
  width: calc((100% - 20px) / 2);
}
img:last-of-type {
  margin-right: 0;
}
```

<!-- .element: class="big-code" -->

Notes: Si vous souhaitez 2 images sur la largeur, avec une marge, calc permet de soustraire la marge de la largeur total

##==##

# ⚠️ Faire attention

<br />

**Évitez de deviner les intentions des utilisateurs en se basant sur la taille du viewport.**

Ne pas amputer la version mobile de certaines fonctionnalités.

Preférez une disposition différente et adaptée à l'écran.

Notes: Ne pas se dire que sur mobile, les utilisateurs veulent moins de fonctionnalités
