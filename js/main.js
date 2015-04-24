
// Main application

import * as spa from './spa/index'

class App {

  constructor() {

    // Header view

    var headerView = new spa.View('header', '<a href="/">Home</a> <a href="/slides/1">Slide 1</a> <a href="/slides/2">Slide 2</a>')

    // Home view

    var homeView = new spa.View('main', '<h1>Welcome</h1>')

    // Slide view

    var slideView = new spa.View('main', '<h1>{{title}}</h1><p>{{body}}</p>')

    // Slide model

    class Slide extends spa.Model {}
    Slide.prototype.config = {
      baseUrl: 'http://localhost:8000/api/slides',
      defaults: {
        title: 'Slide Title',
        body: 'Slide body.'
      }
    }

    // Application router

    var router = new spa.Router()

    // Home controller

    function homeController(params) {
      headerView.render()
      homeView.render(params)
    }

    // Slide controller

    function slideController(params) {
      var slide = new Slide({
        title: `Slide ${params.id}`,
        body: `Slide ${params.id} body.`
      })

      headerView.render()
      slideView.render(slide.toObject())
    }

    // Route definitions

    router.addRoute('/slides/:id', slideController)
    router.addRoute('/', homeController)

    // Initial navigation

    router.navigate(window.location.pathname)

    // Events

    headerView.on('navigate', (path) => {
      router.navigate(path)
    })
  }
}

// Initialization

document.addEventListener('DOMContentLoaded', (e) => {
  var app = new App()
})