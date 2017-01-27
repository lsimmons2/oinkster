
var uuid = require('uuid/v1');
var db = require('../../src/server/db/')


module.exports = {

  up: function(queryInterface, Sequelize) {
    db.users.sync({force:true});
    // return queryInterface.createTable(
    //   'users',
    //   {
    //     id: {
    //       type: Sequelize.UUID,
    //       defaultValue: Sequelize.UUIDV1,
    //       primaryKey: true
    //     },
    //     firstName: {
    //       type: Sequelize.STRING
    //     },
    //     lastName: {
    //       type: Sequelize.STRING
    //     },
    //     username: {
    //       type: Sequelize.STRING
    //     },
    //     email: {
    //       type: Sequelize.STRING
    //     },
    //     bio: {
    //       type: Sequelize.STRING
    //     },
    //     picture: {
    //       type: Sequelize.STRING
    //     },
    //     password: {
    //       type: Sequelize.STRING
    //     },
    //     salt: {
    //       type: Sequelize.STRING
    //     },
    //     createdAt: {
    //       type: Sequelize.DATE
    //     },
    //     updatedAt: {
    //       type: Sequelize.DATE
    //     }
    //   }
    // )
    // .then( function(){
    //   return queryInterface.bulkInsert('users', [
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
    //   ]);
    // })
  },

  down: function(queryInterface, Sequelize) {
    return false;
  }

}
