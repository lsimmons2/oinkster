
import Sequelize from 'sequelize'
import dbConfig from '../../../config/db/'
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig.options);


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('../../../db/models/user-model')(sequelize, Sequelize);
db.oinks = require('../../../db/models/oink-model')(sequelize, Sequelize);

db.users.sync();
db.oinks.sync();

db.users.hasMany(db.oinks);
db.oinks.belongsTo(db.users);


export default db
