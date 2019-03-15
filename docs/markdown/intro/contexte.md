<!-- .slide: class="transition-white sfeir-bg-blue" -->

# Contexte

##==##

# Le mobile aujourd'hui

![center w-1000](./assets/images/dileme_app_mobile.png)

Notes:
Les applications natives ont l'avantage d'être présentent dans les shops respectifs de leur plateforme (google play ou apple store), et peuvent exploiter à fond la puissance des téléphones : accès aux données internes telles que le répertoire, la caméra, et les mouvements pour les terminaux compatibles.
Malheureusement, ces applications sont aussi très chères : langage de développement spécifique par plateforme, ce qui fait que l'application doit être faite deux fois, tout comme les modifications et la maintenance.
Les applications Web, de leur côté, sont bien moins chères, multiplateforme, et ont l'avantage d'être mise à jour sans intervention de l'utilisateur.
Elles sont en revanche limite dans leurs interactions avec le téléphone, car le Javascript et HTML5 ne sont pas encore tout à fait matures pour exploiter pleinement les terminaux mobiles. De plus, ne pas etre dans les shops peut être un inconvénient pour la visibilité.

##==##

# Les débuts : Juin 2015

[Progressive Web Apps: Escaping Tabs Without Losing Our Soul by Alex Russell](https://infrequently.org/2015/06/progressive-apps-escaping-tabs-without-losing-our-soul/)

![center](./assets/images/alex_russel.png)

Notes:
Chrome, Blink, and the Web Platform at Google
W3C archi group member

Invente le nom PWA, qu’il présente comme un nouveau type d’app, en opposition à l’hybrid / natif.

Une progressive web app utilise les nouvelles technologies web pour délivrer une expérience utilisateur très proche d’une vraie application. Elles évoluent à partir des pages dans des onglets du navigateur à immersifs , des applications de haut niveau , en conservant une faible friction du web à tout moment .

Instant loading
Clear identity
Served over TLS
Offline support
Web App Manifest
Can run without browser chrome

##==##

- “There is now another way. An **evolution** has taken place in browsers.”
- “**Just websites** that took all the right vitamins.”
- “Sites [..] have to earn [some] right[s] over time as you use them more and more. They **progressively** become “apps”.
- “Thoughtful application design and construction will give early movers a **major advantage**”
