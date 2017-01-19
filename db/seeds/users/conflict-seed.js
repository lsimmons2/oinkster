
exports.seed = function(knex, Promise) {
  return knex('Users').del()
    .then(function() {
      return knex('Users').insert({
        firstName: 'bob',
        lastName: 'bob',
        username: 'bob',
        email: 'bob@bob.com',
        bio: 'bob',
        picture: 'bob',
        password: 'bob',
        salt: 'bob'
      });
    })
};
