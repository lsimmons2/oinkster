
import express from 'express'
import util from 'util'
import dbLogger from './loggers/db-logger'
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
      dbLogger.info('Oink saved', {oink: data});
      res.status(200).send(data);
    })
    .catch( err => {
      let failedOink = {
        user: req.body.user,
        text: req.body.text,
        asset: asset
      };
      dbLogger.error('Error saving oink', {error: err.message, oink: failedOink})
      res.status(500).send(err)
    })
}

const router = express.Router();

router.route('/')
  .post((req, res) => {
    return insertOink(req, res);
  })

export default router
