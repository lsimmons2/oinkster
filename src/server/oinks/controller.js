
import express from 'express'
import util from 'util'
import logger from '../loggers/logger'
import db from '../db'


function getOinks(req, res){
  let queryString = 'SELECT * FROM "Oinks" ORDER BY "created" DESC;';
  db.any(queryString)
    .then( oinks => {
      // logger.info('Oinks retrieved', {oinks: oinks});
      res.status(200).send(oinks);
    })
    .catch( err => {
      logger.error('Error retrieving oinks', {error: err.message});
      res.status(500).send(err);
    })
}


function insertOink(req, res){
  let queryString = 'INSERT INTO "Oinks"("text", "asset", "user", "username", "created") values($1, $2, $3, $4, $5) returning id, text, asset, "user", username, created;';
  let text = req.body.text;
  let asset = req.body.asset || null;
  let user = req.user.id;
  let username = req.user.username;
  let created = new Date();
  let query = {
    text: queryString,
    values: [text, asset, user, username, created]
  };
  db.one(query)
    .then( data => {
      logger.info('Oink saved', {oink: data});
      res.status(200).send(data);
    })
    .catch( err => {
      let failedOink = {
        user: req.body.user,
        text: req.body.text,
        asset: asset
      };
      logger.error('Error saving oink', {error: err.message, oink: failedOink})
      res.status(500).send(err);
    })
}

export { getOinks, insertOink }
