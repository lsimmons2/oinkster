
import express from 'express';


const pgp = require('pg-promise')();

let cn = {
    database: 'oinkster'
};

const db = pgp(cn);


function insertOink(req, res){
  let queryString = 'INSERT INTO oinks("Id", "Text", "Asset", "User") values($1, $2, $3, $4) returning "Text"';
  let id = 4;
  let asset = req.body.asset || null;
  console.log('req.body.text: ', req.body);
  db.one(queryString, [id, req.body.text, asset, req.body.user])
    .then( data => {
      console.log('inserted? ', data);
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
