
import Sequelize from 'sequelize'
import dbConfig from '../../../config/db/'
const db = new Sequelize(dbConfig);

export default db
