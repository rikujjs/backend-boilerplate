'use strict';

const Model = require('objection').Model;

class User extends Model {

  static get tableName() {
    return 'User';
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: ['email', 'password'],

      properties: {
        id: { type: 'integer' },
        email: { type: 'string', minLength: 1, maxLength: 255 },
        password: { type: 'string' }
      }
    };
  }
}

module.exports = User;
