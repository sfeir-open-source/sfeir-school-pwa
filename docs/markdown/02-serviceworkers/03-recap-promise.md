<!-- .slide: class="with-code" -->

# Recap : Fonctionnement des promises

### Une promise est utilisée pour réaliser des traitements de façon asynchrone.

```javascript
let promise1 = new Promise((resolve, reject) => {
  setTimeout(_ => resolve('foo'), 300);
});
promise1.then(value => console.log(value)).catch(e => console.log(e));
```

<!-- .element: class="big-code" -->
