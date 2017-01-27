
var uuid = require('uuid/v1');

exports.seed = function(knex, Promise) {
  let newUserId = uuid();
  return knex('users').del()
    .then(function() {
      return knex('users').insert({
        id: '7a150b00-e443-11e6-888f-0548d1a00481',
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
    .then(function() {
      return knex('oinks').del()
        .then(function(){
          return knex('oinks').insert({
            id: '7a150b00-e443-11e6-888f-0548d1a00482',
            text: 'yo soy bob',
            asset: 'some asset',
            userId: '7a150b00-e443-11e6-888f-0548d1a00481'
          })
        })
    })
};

//'7a150b00-e443-11e6-888f-0548d1a00481
