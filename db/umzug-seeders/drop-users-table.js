
module.exports = {

  up: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('users');
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.createTable(
      'users',
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV1,
          primaryKey: true
        },
        firstName: {
          type: Sequelize.STRING
        },
        lastName: {
          type: Sequelize.STRING
        },
        username: {
          type: Sequelize.STRING
        },
        email: {
          type: Sequelize.STRING
        },
        bio: {
          type: Sequelize.STRING
        },
        picture: {
          type: Sequelize.STRING
        },
        password: {
          type: Sequelize.STRING
        },
        salt: {
          type: Sequelize.STRING
        },
        createdAt: {
          type: Sequelize.DATE
        },
        updatedAt: {
          type: Sequelize.DATE
        }
      }
    );
  }

}
