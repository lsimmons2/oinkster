
const pgp = require('pg-promise')();
const env = process.env.NODE_ENV;

let database = 'oinkster-' + env;

let cn = {
    database
};

const db = pgp(cn);


export default db
