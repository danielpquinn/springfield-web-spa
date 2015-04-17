/*global spa */

'use strict';

function App() {
  var self = this;
  var headerView = new spa.View('header', '<a href="/">Home</a> <a href="/posts/1">Post 1</a> <a href="/posts/2">Post 2</a>');
  var homeView = new spa.View('main', '<h1>Welcome</h1>');
  var postsView = new spa.View('main', '<h1>Post {{id}}</h1>');

  self.router = new spa.Router();

  var postsController = function (params) {
    headerView.render();
    postsView.render(params);
  };

  var homeController = function (params) {
    headerView.render();
    homeView.render(params);
  };

  self.router.addRoute('/posts/:id', postsController);
  self.router.addRoute('/', homeController);

  self.router.navigate(window.location.pathname);

  headerView.on('navigate', function (path) {
    self.router.navigate(path);
  });
}