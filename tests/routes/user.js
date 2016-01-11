'use strict';

const expect = require('chai').expect;
const supertest = require('supertest');
const app = require('../../app');
const Knex = require('knex');
const knexConfig = require('../../knexfile').test;
const _ = require('lodash');

const request = supertest(app);

describe('Users API',() => {
  describe('GET',() => {
    it('should get empty array with no users', (done) => {
      request
        .get('/api/v1/users')
        .end((err, res) => {
          expect(_.isArray(res.body)).to.eql(true);
          done();
        });
    });
  });
});
