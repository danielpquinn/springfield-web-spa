var spa = window.spa || {};

(function () {

  'use strict';

  function Router() {
    var self = this;

    var getParams = function (route) {
      var matches = route.match(/:\w+/g);
      return (matches || []).map(function (match) {
        return match.substring(1, match.length);
      });
    };

    var getPattern = function (route) {
      return new RegExp(route.replace(/:\w+/g, '(\\w+)'));
    };

    self.routes = [];

    self.addRoute = function (route, fn) {
      self.routes.push({
        params: getParams(route),
        pattern: getPattern(route),
        route: route,
        fn: fn
      });
    };

    self.navigate = function (path) {
      var i = 0;
      var matches;
      var params;

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

    window.addEventListener('popstate', function (e) {
      self.navigate(e.state);
    });
  }

  spa.Router = Router;

}());