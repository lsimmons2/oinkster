
var uuid = require('uuid/v1');
// var db = require('../../src/server/db/');

module.exports = {
  up: function (queryInterface, Sequelize) {

    // db.users.sync();

    // return db.users.bulkCreate(
    //   [
    //     {
    //       id: uuid(),
    //       firstName: 'bob',
    //       lastName: 'bob',
    //       username: 'bob',
    //       email: 'bob@bob.com',
    //       bio: 'bob',
    //       picture: 'bob',
    //       password: 'bob',
    //       salt: 'bob'
    //       // createdAt: Date.now(),
    //       // updatedAt: Date.now()
    //     }
    //   ]
    // )

    return queryInterface.bulkInsert('users', [
      {
        id: uuid(),
        firstName: 'bob',
        lastName: 'bob',
        username: 'bob',
        email: 'bob@bob.com',
        bio: 'bob',
        picture: 'bob',
        password: 'bob',
        salt: 'bob'
        // createdAt: Date.now(),
        // updatedAt: Date.now()
      }
    ]);

  },

  down: function (queryInterface, Sequelize) {
    return false;
  }

};
