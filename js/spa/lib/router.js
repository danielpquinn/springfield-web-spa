
// Router
// Used to store route definitions, parse paths and execute handlers

export default class Router {

  constructor() {
    this.routes = []

    window.addEventListener('popstate', e => {
      this.navigate(e.state)
    })
  }

  // Get params from route: /users/:id -> ['id']

  _getParams(route) {
    var matches = route.match(/:\w+/g)
    return (matches || []).map(match => {
      return match.substring(1, match.length)
    })
  }

  // Get pattern to test against path

  _getPattern(route) {
    return new RegExp(route.replace(/:\w+/g, '(\\w+)'))
  }

  // Add a new route definition

  addRoute(route, fn) {
    this.routes.push({
      params:  this._getParams(route),
      pattern: this._getPattern(route),
      route,
      fn
    })
  }

  // Match a route, extract params from path, execute controller

  navigate(path) {
    var matches, params

    for (var i = 0; i < this.routes.length; i += 1) {
      matches = path.match(this.routes[i].pattern)

      if (matches) {
        params = {}
        matches = matches.splice(1, matches.length - 1)

        this.routes[i].params.forEach((param, i) => {
          params[param] = matches[i]
        })

        this.routes[i].fn(params)
        window.history.pushState(path, null, path)
        break
      }
    }
  }
}
