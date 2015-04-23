var spa = window.spa || {};

(function () {

  'use strict';

  /*global Handlebars */

  // View
  // Renders html and overrides default link behavior

  function View() {}

  // Initialize view

  View.prototype.initialize = function (el, template) {
    this.el = document.getElementById(el);
    this.template = Handlebars.compile(template);
  };

  // Render template using handlebars and supplied view data

  View.prototype.render = function (data) {
    var self = this;
    var i = 0;
    var links;

    var handleClick = function (e) {
      e.preventDefault();
      self.trigger('navigate', [e.target.attributes.href.value]);
    };

    self.el.innerHTML = self.template(data);
    links = self.el.querySelectorAll('a[href]');
    for (i; i < links.length; i += 1) {
      links[i].addEventListener('click', handleClick);
    }
  };

  // Mixin events

  for (var key in spa.event) {
    View.prototype[key] = spa.event[key];
  }

  // Export

  spa.View = View;

}());