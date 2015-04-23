/*global spa */

'use strict';

function App() {}

App.prototype.initialize = function () {
  var headerView, homeView, slideView, router, homeController, slideController, handleNavigate;

  // Header view

  headerView = new spa.View();
  headerView.initialize('header', '<a href="/">Home</a> <a href="/slides/1">Slide 1</a> <a href="/slides/2">Slide 2</a>');

  // Home view

  homeView = new spa.View();
  homeView.initialize('main', '<h1>Welcome</h1>');

  // Slide view

  slideView = new spa.View();
  slideView.initialize('main', '<h1>{{title}}</h1><p>{{body}}</p>');

  // Slide model

  function Slide() {}
  Slide.prototype = new spa.Model();
  Slide.prototype.config = {
    baseUrl: 'http://localhost:8000/api/slides',
    defaults: {
      title: 'Slide Title',
      body: 'Slide body.'
    }
  };

  // Application router

  router = new spa.Router();
  router.initialize();

  // Home controller

  homeController = function (params) {
    headerView.render();
    homeView.render(params);
  };

  // Slide controller

  slideController = function (params) {
    var slide = new Slide();
    slide.initialize({
      title: 'Slide' + params.id,
      body: 'Slide ' + params.id + ' body.'
    });

    headerView.render();
    slideView.render(slide.toObject());
  };

  // Route definitions

  router.addRoute('/slides/:id', slideController);
  router.addRoute('/', homeController);

  // Initial navigation

  router.navigate(window.location.pathname);

  // Events

  handleNavigate = function (path) {
    router.navigate(path);
  };

  headerView.on('navigate', handleNavigate);
};