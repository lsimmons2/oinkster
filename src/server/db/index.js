
const pgp = require('pg-promise')();
const env = process.env.NODE_ENV;
import config from '../../../config/db-config'

let database = 'oinkster-' + env;

let cn = config.connection;
cn['database'] = database;

const db = pgp(cn);


export default db
