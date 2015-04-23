var spa = window.spa || {};

(function () {

  'use strict';

  // Router
  // Used to store route definitions, parse paths and execute controllers

  function Router() {}

  // Initialize router

  Router.prototype.initialize = function () {
    var self = this;

    self.routes = [];

    window.addEventListener('popstate', function (e) {
      self.navigate(e.state);
    });
  };

  // Get params from route: /users/:id -> ['id']

  Router.prototype._getParams = function (route) {
    var matches = route.match(/:\w+/g);
    return (matches || []).map(function (match) {
      return match.substring(1, match.length);
    });
  };

  // Get pattern to test against path

  Router.prototype._getPattern = function (route) {
    return new RegExp(route.replace(/:\w+/g, '(\\w+)'));
  };

  // Add a new route definition

  Router.prototype.addRoute = function (route, fn) {
    var self = this;

    self.routes.push({
      params: self._getParams(route),
      pattern: self._getPattern(route),
      route: route,
      fn: fn
    });
  };

  // Match a route, extract params from path, execute controller

  Router.prototype.navigate = function (path) {
    var matches, params;
    var self = this;
    var i = 0;

    for (i; i < self.routes.length; i += 1) {
      matches = path.match(self.routes[i].pattern);

      if (matches) {
        params = {};

        matches = matches.splice(1, matches.length - 1);
        self.routes[i].params.forEach(function (param, i) {
          params[param] = matches[i];
        });
        self.routes[i].fn.apply(null, [params]);
        window.history.pushState(path, null, path);
        break;
      }
    }
  };

  // Export

  spa.Router = Router;

}());