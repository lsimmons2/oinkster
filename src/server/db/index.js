
const pgp = require('pg-promise')();
import config from '../../../config/db-config'


const cn = config.connection;
const db = pgp(cn);


export default db
