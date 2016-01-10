'use strict';

const expect = require('chai').expect
  , supertest = require('supertest')
  , app = require('../../app')
  , Knex = require('knex')
  , knexConfig = require('../../knexfile').test
  , _ = require('lodash')

const request = supertest(app);

describe('Users API', function() {
  describe('GET', function() {
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
