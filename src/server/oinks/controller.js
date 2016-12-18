
import express from 'express'
import util from 'util'
import dbLogger from '../loggers/db-logger'
const pgp = require('pg-promise')();

let cn = {
    database: 'oinkster'
};

const db = pgp(cn);

function getOinks(req, res){
  let queryString = 'SELECT * FROM "Oinks";';
  db.any(queryString)
    .then( oinks => {
      dbLogger.info('Oinks retrieved', {oinks: oinks});
      res.status(200).send(oinks);
    })
    .catch( err => {
      dbLogger.error('Error retrieving oinks', {error: err.message})
      res.status(500).send(err)
    })
}


function insertOink(req, res){
  let queryString = 'INSERT INTO "Oinks"("text", "asset", "user") values($1, $2, $3) returning id, text, asset, "user";';
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

export { getOinks, insertOink }
