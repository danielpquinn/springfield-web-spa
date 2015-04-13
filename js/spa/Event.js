'use strict';

var spa = window.spa || {};

spa.Event = {
  events: {},
  on: function (name, fn) {
    this.events[name] = this.events[name] || [];
    this.events[name].push(fn);
  },
  off: function (name, fn) {
    var self = this;

    if (!self.events[name]) { return; }
    self.events[name].forEach(function (func, i) {
      if (func === fn) {
        self.events[name] = self.events[name].splice(i, i + 1);
      }
    });
  },
  trigger: function (name, args) {
    if (!this.events[name]) { return; }
    this.events[name].forEach(function (fn) {
      fn.apply(null, args);
    });
  }
};