
import Sequelize from 'sequelize'
import dbConfig from '../../../config/db/'
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig.options);


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('../users/model')(sequelize, Sequelize);
db.oinks = require('../oinks/model')(sequelize, Sequelize);

// db.users.sync({force:true});
// db.oinks.sync({force:true});

db.users.hasMany(db.oinks);
db.oinks.belongsTo(db.users);


export default db
