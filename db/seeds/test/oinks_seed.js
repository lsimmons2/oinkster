
exports.seed = function(knex, Promise) {
  return knex('Oinks').del()
    .then(function() {
      return knex('Oinks').insert({
        text: 'bob',
        asset: null,
        user: 'i enjoy running!'
      });
    }).then(function () {
      return knex('Oinks').insert({
        text: 'my fav show is GOT',
        asset: 'https://got-website.com/pic_of_jon_snow',
        user: 'Fantasy'
      });
    }).then(function () {
      return knex('Oinks').insert({
        text: 'i like to study!',
        asset: null,
        user: 'sally'
      });
    }).then(function () {
      return knex('Oinks').insert({
        text: 'i like to party!',
        asset: 'https://some_domain.com/some_asset',
        user: 'barbara'
      });
    });
};
