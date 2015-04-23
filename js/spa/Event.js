var spa = window.spa || {};

(function () {

  'use strict';

  // Event mixin

  spa.event = {

    // Map of event listeners

    events: {},

    // Add event listener

    on: function (name, fn) {
      this.events[name] = this.events[name] || [];
      this.events[name].push(fn);
    },

    // Remove event listener

    off: function (name, fn) {
      var self = this;

      if (!self.events[name]) { return; }
      self.events[name].forEach(function (func, i) {
        if (func === fn) { self.events[name].splice(i, 1); }
      });
    },

    // Trigger an event

    trigger: function (name, args) {
      if (!this.events[name]) { return; }
      this.events[name].forEach(function (fn) { fn.apply(null, args); });
    }
  };

}());