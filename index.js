var Data = function(value) {
  this.data = Data.make(value) || '';
  this.str = '/' + this.data;
  this.array = !this.data ? [''] : this.data.split('/');
};
Data.make = function(val) {
  return val ? val.replace(/^\/|\/$/, '') : val;
};
Data.extract = function(arr1, arr2) {
  var arr = [];
  var l = arr1.length;
  var i, a, b;
  for (i = 0; i < l; i++) {
    a = arr1.slice(0, i).join('/');
    b = arr2.slice(0, i).join('/');
    if (a + arr1[i] === b + arr2[i]) continue;

    arr.push(arr1[i]);
  }
  return arr;
};
Data.isEq = function(data1, data2) {
  return Data.make(data1) === Data.make(data2);
};

var Cp = require('obento-cp');
var loop = require('obento-loop');
var State = function(def) {
  this.pool = [];
  this.active = false;
  this.w = 0;
  this.current = new Data(def || '');
  this.cps = { 'state:start': new Cp(), 'state:update': new Cp(), 'state:end': new Cp() };
  this.ite = 0;

  var _this = this;
  this.loop = function() {
    _this._loop();
  };
};
State.set = function(prefix, items, pool, cps, arg) {
  for (var i = 0, l = items.length, name; i < l; i++) {
    name = items[i];
    pool.push({ prefix: prefix, name: name, arg: arg });

    if (!cps[(name = prefix + name)]) {
      cps[name] = new Cp();
    }
  }
};

State.prototype = {
  change: function(val, arg) {
    if (Data.isEq(this.current.data, val)) {
      return false;
    }

    var data = new Data(val);
    State.set(
      'remove:',
      Data.extract(this.current.array, data.array).reverse(),
      this.pool,
      this.cps,
      arg
    );
    State.set(
      'add:',
      Data.extract(data.array, this.current.array),
      this.pool,
      this.cps,
      arg
    );

    this.current = data;

    if (!this.active) {
      this.active = true;
      this.cps['state:start'].update();
      loop.add(this.loop);
    }

    this.cps['state:update'].update([this.current]);
    return true;
  },
  _loop: function() {
    if (this.w) return;

    if (this.pool.length === 0) {
      this.active = false;
      this.cps['state:end'].update();
      loop.remove(this.loop);
      return;
    }

    var o = this.pool[0];
    this.cps[o.prefix + o.name].update(o.arg);
    this.pool.shift();
  },
  wait: function() {
    ++this.w;
  },
  notify: function() {
    --this.w;
  },
  listen: function(key, func) {
    var c = this.cps[key];
    if (!c) c = this.cps[key] = new Cp();
    c.add(func);
    return func;
  },
  clear: function(key, func) {
    var c = this.cps[key];
    if (!c) return;
    c.remove(func);
  },
};

State.Data = Data;
module.exports = State;
