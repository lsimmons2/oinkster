
module.exports = {

  up: function(queryInterface, Sequelize) {
    queryInterface.createTable(
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
        },
        {
          engine: 'MYISAM',
          charset: 'latin1',
          schema: 'public'
        }
    )
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.dropeTable('users')
  }

}
