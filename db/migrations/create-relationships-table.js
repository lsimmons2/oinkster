
module.exports = {
  up: function(queryInterface, Sequelize) {
    queryInterface.createTable(
      'relationships',
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV1,
          primaryKey: true
        },
        followerId: {
          type: Sequelize.UUID
        },
        followeeId: {
          type: Sequelize.UUID
        },
        createdAt: {
          type: Sequelize.DATE
        },
        updatedAt: {
          type: Sequelize.DATE
        }
      }
    )
  },
  down: function(queryInterface, Sequelize) {
    queryInterface.dropTable('relationships');
  }
}
