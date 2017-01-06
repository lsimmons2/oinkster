
const pgp = require('pg-promise')();


let cn = {
    database: 'oinkster'
};

const db = pgp(cn);


export default db
