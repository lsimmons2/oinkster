
var uuid = require('uuid/v1');

exports.seed = function(knex, Promise) {
  return knex('oinks').del()
    .then(function() {
      return knex('oinks').insert({
        id: uuid(),
        text: 'bob',
        asset: null,
        userId: uuid()
      });
    }).then(function () {
      return knex('oinks').insert({
        id: uuid(),
        text: 'my fav show is GOT',
        asset: 'https://got-website.com/pic_of_jon_snow',
        userId: uuid()
      });
    }).then(function () {
      return knex('oinks').insert({
        id: uuid(),
        text: 'i like to study!',
        asset: null,
        userId: uuid()
      });
    }).then(function () {
      return knex('oinks').insert({
        id: uuid(),
        text: 'i like to party!',
        asset: 'https://some_domain.com/some_asset',
        userId: uuid()
      });
    });
};
