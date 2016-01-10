'use strict';

const User = require('../models/User');

module.exports = function (app) {
  app.post('/api/v1/users', (req, res) => {
    User
      .query()
      .insert(req.body)
      .then((user) => res.send(user));
  });

  app.get('/api/v1/users', (req, res) => {
    User
      .query()
      .then((users) => res.send(users));
  });

  app.get('/api/v1/users/:id', (req, res, next) => {
    User
      .query()
      .findById(req.params.id)
      .then((user) => {
        if(!user) {
          res.status(404).send({message: 'User not found!'});
        } else {
          res.send(user);
        }
      });
  });

  app.patch('/api/v1/users/:id', (req, res) => {
    User
      .query()
      .patchAndFetchById(req.params.id, req.body)
      .then((user) => res.send(user));
  });
}
