'use strict';

// Dependencies

var Hapi = require('hapi');

// Declarations

var addDummyPost;
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

addDummyPost = function (index) {
  server.route({
    method: 'GET',
    path: '/api/posts/' + index,
    handler: function (request, reply) {
      reply({
        'id': index,
        'title': 'Post ' + index + ' Title',
        'body': 'Post ' + index + ' content.'
      });
    }
  });
};

// Add dummy posts

for (var i = 0; i < 10; i += 1) {
  posts.push({ id: i, title: 'Post ' + i + ' Title'});
  addDummyPost(i);
}

// Start server

server.start();