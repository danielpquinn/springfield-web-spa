var spa = window.spa || {};

(function () {

  'use strict';

  /*global Handlebars */

  function View(el, template) {
    var self = this;

    self.el = document.getElementById(el);
    self.template = Handlebars.compile(template);

    self.render = function (data) {
      var i = 0;
      var links;

      self.el.innerHTML = self.template(data);
      links = self.el.querySelectorAll('a[href]');
      for (i; i < links.length; i += 1) {
        links[i].addEventListener('click', function (e) {
          e.preventDefault();
          self.trigger('navigate', [e.target.attributes.href.value]);
        });
      }
    };
  }

  Object.keys(spa.Event).forEach(function (key) {
    View.prototype[key] = spa.Event[key];
  });

  spa.View = View;

}());