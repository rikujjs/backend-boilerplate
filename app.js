'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const Knex = require('knex');
const knexConfig = require('./knexfile');
const Model = require('objection').Model;
const fs = require('fs');

const app = express()
  .use(bodyParser.json())
  .set('json spaces', 2);

if (app.get('env') !== 'test') {
  app.use(morgan('dev'));
}

const knex = Knex(knexConfig[app.get('env')]);
Model.knex(knex);

const routeFiles = fs.readdirSync(__dirname + '/routes');
routeFiles.forEach((file) => {
  let routeFile = require('./routes/' + file);
  routeFile(app);
});

const server = app.listen(3000, () => {
  console.log(`Server running on port ${server.address().port} using "${app.get('env')}" mode!`);
});

module.exports = app;
