var Cp = require('obento-cp');
var loop = require('obento-loop');

var Data = function(value) {
  this.data = this.make(value);
  this.str = `/${this.data}`;
  this.array = this.data === '' ? [''] : this.data.split('/');
};
Data.prototype = {
  make: function() { },
  compare: function() { },
  eq: function() { }
};

var _set = function(prefix, items, pool, cps, arg) {

};
var State = function(def) {

};
State.prototype = {
  change: function(v, arg) {

  },
  _change: function(v, arg) {

  },
  _loop: function() {

  },
  prev: function() {

  },
  next: function() {

  },
  wait: function() {

  },
  notify: function() {

  },
  listen: function(key, func) {

  },
  clear: function(key, func) {

  }
};

module.exports = State;
