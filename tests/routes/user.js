'use strict';

const expect = require('chai').expect
  , supertest = require('supertest')
  , app = require('../../app')
  , Knex = require('knex')
  , knexConfig = require('../../knexfile').test
  , _ = require('lodash')
  , knexCleaner = require('knex-cleaner');

const request = supertest(app);
const knex = Knex(knexConfig);

describe('Users API', function() {
  // Clear the
  // beforeEach(function() {
  //   return knexCleaner.clean(knex);
  // });

  describe('GET', function() {
    beforeEach(function(done) {
      console.log('before:');
      console.log(knex('User').where('email', 'asd').then(function(result) {
        console.log('result', result);
        done();
      }));
    });

    it('should get empty array with no users', function(done) {
      request
        .get('/api/v1/users')
        .end(function(err, res) {
          expect(_.isArray(res.body)).to.eql(true);
          done();
        });
    });
  });
});
