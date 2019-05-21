# Node

## Promises

```javascript
// promises.js

module.exports.promise = new Promise(function(resolve, reject) {
  setTimeout(() => resolve(1), 1000);
});
```
```javascript
// myPromise.js

const { promise } = require('promises');

promise.then(result => console.log(result)).catch(err => console.error(err));
```
```javascript
// asyncAwait.js

const { promise } = require('promises');

async function handlePromise(promise) {
  try {
    const result = await promise;
    console.log(result);
  } catch(err) {
    console.error(err);
  }
}

handlePromise(promise);
```
