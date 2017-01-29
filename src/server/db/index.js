
import Sequelize from 'sequelize'
import dbConfig from '../../../config/db/'
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig.options);


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('../../../db/models/user-model')(sequelize, Sequelize);
db.oinks = require('../../../db/models/oink-model')(sequelize, Sequelize);
db.relationships = require('../../../db/models/relationship-model')(sequelize, Sequelize);

db.users.sync();
db.oinks.sync();
db.relationships.sync();

db.users.belongsToMany(db.users, {
  as: 'followers',
  foreignKey: 'followeeId',
  through: db.relationships
});

db.users.belongsToMany(db.users, {
  as: 'followees',
  foreignKey: 'followerId',
  through: db.relationships
});

db.users.hasMany(db.oinks,
  {
    onDelete: 'cascade',
    onUpdate: 'cascade'
  }
);

db.oinks.belongsTo(db.users,
  {
    onDelete: 'cascade',
    onUpdate: 'cascade'
  }
);

module.exports = db;
