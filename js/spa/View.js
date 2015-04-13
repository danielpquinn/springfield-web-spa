'use strict';

var spa = window.spa || {};

function View(el, template) {
  var self = this;

  self.el = document.getElementById(el);
  self.template = template;

  self.render = function (data) {
    var i = 0;
    var links;

    self.el.innerHTML = self.template;
    links = self.el.querySelectorAll('a[href]');
    for (i; i < links.length; i += 1) {
      links[i].addEventListener('click', function (e) {
        self.trigger('navigate', [e.target.attributes.href.value]);
        e.preventDefault();
      });
    }
  };
}

Object.keys(spa.Event).forEach(function (key) {
  View.prototype[key] = spa.Event[key];
});

spa.View = View;