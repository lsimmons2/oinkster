
var uuid = require('uuid/v1');

exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function() {
      return knex('users').insert({
        id: uuid(),
        firstName: 'bob',
        lastName: 'bob',
        username: 'bob',
        email: 'bob@bob.com',
        bio: 'bob',
        picture: null,
        password: 'bob',
        salt: 'bob'
      });
    })
};
