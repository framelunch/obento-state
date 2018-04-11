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
  console.log('fc');
}

state.listen('add:a', fc);
state.publisb('/a/b');

// will call 'fc'
```




