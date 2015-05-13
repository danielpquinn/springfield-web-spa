
// Main application

import * as spa from './spa/index'

class App {

  constructor() {

    // Header view

    var headerView = new spa.View('header', '<h1><a href="/">Single Page App Demo</a></h1>')

    // Home view

    var homeView = new spa.View('main', '<p>Welcome</p>')

    // Posts view

    var postsView = new spa.View('sidebar', '<nav><ul>{{#each posts}}<li><a href="/posts/{{this.id}}" title="{{this.title}}">{{this.title}}</a></li>{{/each}}</ul></nav>')

    // Post detail view

    var postView = new spa.View('main', '<h1>{{title}}</h1><p>{{body}}</p>')

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

    function homeController(params) {
      homeView.render(params)
    }

    // Post controller

    function postController(params) {
      var post = new Post({
        id: `${params.id}`
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
      postsView.render({ posts })
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