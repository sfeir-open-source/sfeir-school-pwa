<!-- .slide: class="with-code" -->

# Recap : Fonctionnement des promises

### Une promise est utilisée pour réaliser des traitements de façon asynchrone.

```javascript
var promise1 = new Promise(function(resolve, reject) {
  setTimeout(function() {
    resolve('foo');
  }, 300);
});
promise1
  .then(function(value) {
    console.log(value);
  })
  .catch(function(e) {
    console.log(e);
  });
```

<!-- .element: class="big-code" -->
