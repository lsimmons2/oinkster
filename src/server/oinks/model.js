
import db from '../db/'

export default function(sequelize, Sequelize){
  return sequelize.define('oink',
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
      },
      user: {
        type: Sequelize.STRING
        // model: User,
        // deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      },
      text: {
        type: Sequelize.STRING,
        field: 'text',
      },
      asset: {
        type: Sequelize.STRING,
        field: 'asset',
        allowNull: true
      }
    }
  );
}
