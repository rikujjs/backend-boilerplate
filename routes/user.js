'use strict';

const User = require('../models/User');

module.exports = function (app) {
  app.post('/users', function(req, res) {
    User
      .query()
      .insert(req.body)
      .then((user) => res.send(user));
  });

  app.get('/users', function(req, res) {
    User
      .query()
      .then((users) => res.send(users));
  });
}
