
import express from 'express';


const pgp = require('pg-promise')();

let cn = {
    database: 'oinkster'
};

const db = pgp(cn);


function insertOink(req, res){
  let queryString = 'INSERT INTO oinks("text", "asset", "user") values($1, $2, $3) returning id, text, asset, "user";';
  let asset = req.body.asset || null;
  let query = {
    text: queryString,
    values: [req.body.text, asset, req.body.user]
  };
  db.one(query)
    .then( data => {
      res.status(200).send(data);
    })
    .catch( err => {
      console.error('error inserting into db: ', err.message || err);
      res.status(500).send(err)
    })
}

const router = express.Router();

router.route('/')
  .post((req, res) => {
    console.log(req.method, req.url);
    return insertOink(req, res);
  })

export default router
