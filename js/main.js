
// Main application

import * as spa from './spa/index'
import XHR from './spa/lib/xhr'

class App {

  constructor() {

    // Header view

    var headerView = new spa.View('header', '<a href="/">Home</a> {{#each slides}}<a href="/slides/{{this.id}}" title="{{this.title}}">{{this.title}}</a> {{/each}}')

    // Home view

    var homeView = new spa.View('main', '<h1>Welcome</h1>')

    // Slide view

    var slideView = new spa.View('main', '<h1>{{title}}</h1><p>{{body}}</p>')

    // Slide model

    class Slide extends spa.Model {}
    Slide.config = {
      baseUrl: 'http://localhost:8000/json/slides',
      defaults: {
        id: 0,
        title: 'Slide Title',
        body: 'Slide body.'
      }
    }

    // Override list function for demo purposes

    Slide.list = function () {
      return new XHR().get('http://localhost:8000/json/slides.json')
        .then(response => { return JSON.parse(response) })
        .catch(console.log)
    }

    // Application router

    var router = new spa.Router()

    // Home controller

    function homeController(params) {
      homeView.render(params)
    }

    // Slide controller

    function slideController(params) {
      var slide = new Slide({
        id: `${params.id}.json`
      })

      slide.fetch().then(() => {
        slideView.render(slide.toObject())
      })
      .catch(console.log)
    }

    // Route definitions

    router.addRoute('/slides/:id', slideController)
    router.addRoute('/', homeController)

    // Fetch nav and render header
    
    Slide.list().then(slides => {
      headerView.render({ slides })
    })

    // Initial navigation

    router.navigate(window.location.pathname)

    // Events

    headerView.on('navigate', path => {
      router.navigate(path)
    })

  }
}

// Initialization

document.addEventListener('DOMContentLoaded', (e) => {
  var app = new App()
})