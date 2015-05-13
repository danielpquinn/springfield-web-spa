
// Main application

import * as spa from './spa/index'

class App {

  constructor() {

    // Header view

    var headerView = new spa.View('header', '<h1><a href="/">Single Page App Demo</a></h1>')

    // Home view

    var homeView = new spa.View('main', '<a href="/posts">View posts</a>')

    // Posts view

    var postsView = new spa.View('main', '<ul>{{#each posts}}<li><a href="/posts/{{this.id}}" title="{{this.title}}">{{this.title}}</a></li>{{/each}}</ul>')

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
      headerView.render()
      homeView.render(params)
    }

    // Posts controller

    function postsController(params) {
      headerView.render()
      Post.list().then(posts => {
        postsView.render({ posts })
      })
      .catch(console.log)
    }

    // Post controller

    function postController(params) {
      var post = new Post({
        id: `${params.id}`
      })

      post.fetch().then(() => {
        headerView.render()
        postView.render(post.toObject())
      })
      .catch(console.log)
    }

    // Route definitions

    router.addRoute('/posts/:id', postController)
    router.addRoute('/posts', postsController)
    router.addRoute('/', homeController)

    // Initial navigation

    router.navigate(window.location.pathname)

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