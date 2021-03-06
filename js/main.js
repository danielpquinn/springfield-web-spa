
// Main application

import * as spa from './spa/index'

class App {

  constructor() {

    // Header view

    class HeaderView extends spa.View {}
    var headerView = new HeaderView('header', () => { return '<h1><a href="/">Single Page App Demo</a></h1>' })

    // Home view

    class HomeView extends spa.View {}
    var homeView = new HomeView('main', () => { return '<p>Welcome</p>' })

    // Posts view

    class PostsView extends spa.View {}
    var postsView = new PostsView('sidebar', data => {
      var template = '<ul>'
      data.forEach(item => { template += `<li><a href="/posts/${item.id}" title="${item.title}">${item.title}</a></li>` })
      template += '</ul>'
      return template
    })

    // Post detail view

    class PostView extends spa.View {}
    var postView = new PostView('main', data => { return `<h1>${data.title}</h1><p>${data.body}</p>` })

    // Post model

    class Post extends spa.Model {}
    Post.config = {
      baseUrl: 'http://localhost:3000/api/posts',
      defaults: {
        id: 0,
        title: 'Post Title',
        body: 'Post body.'
      }
    }

    // Application router

    var router = new spa.Router()

    // Home controller

    function homeController() {
      homeView.render()
    }

    // Post controller

    function postController(params) {
      var post = new Post({
        id: params.id
      })

      post.fetch().then(() => {
        postView.render(post.toObject())
      })
      .catch(console.log)
    }

    // Route definitions

    router.addRoute('/posts/:id', postController)
    router.addRoute('/', homeController)

    // Initial navigation

    router.navigate(window.location.pathname)

    // Initial render

    Post.list().then(posts => {
      headerView.render()
      postsView.render(posts)
    })

    // Events

    headerView.on('navigate', path => {
      router.navigate(path)
    })

  }
}

// Initialization

document.addEventListener('DOMContentLoaded', e => {
  var app = new App()
})