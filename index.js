'use strict';

// Dependencies

var Hapi = require('hapi');

// Declarations

var posts = [];

// Create server

var server = new Hapi.Server({ connections: { routes: { cors: true } } });
server.connection({ host: 'localhost', port: 3000 });

// Dummy posts route

server.route({
  method: 'GET',
  path: '/api/posts',
  handler: function (request, reply) {
    reply(posts);
  }
});

// Dummy post route

server.route({
  method: 'GET',
  path: '/api/posts/{id}',
  handler: function (request, reply) {
    reply({
      'id': request.params.id,
      'title': 'Post ' + request.params.id + ' Title',
      'body': 'Post ' + request.params.id + ' content.'
    });
  }
});

// Add dummy posts

for (var i = 0; i < 10; i += 1) {
  posts.push({ id: i, title: 'Post ' + i + ' Title'});
}

// Start server

server.start();