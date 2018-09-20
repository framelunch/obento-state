# obento-state
obent-state can manage internal state change like URL

## Installation
Yarn:
```bash
yarn add obento-state
```

npm:
```bash
npm install --save obento-state
```

## Example
```javascript
var state = new require('obento-state')();

var fc = function() {
  state.wait();
  setTimeout(function() {
    state.notify();
  }, 1000);
}

state.listen('add:a', fc);
state.listen('add:b', function() {
  // will call after 1 second from called fc()
});

state.change('/a/b');

// will call 'fc'
```




