
module.exports = function(sequelize, Sequelize){
  return sequelize.define('relationships',
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
  );
}
