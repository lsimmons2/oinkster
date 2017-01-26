
module.exports = function(sequelize, Sequelize){
  return sequelize.define('oink',
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
      },
      userId: {
        type: Sequelize.UUID
      },
      text: {
        type: Sequelize.STRING
      },
      asset: {
        type: Sequelize.STRING,
        allowNull: true
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
