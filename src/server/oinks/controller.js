
import express from 'express'
import util from 'util'
import logger from '../loggers/logger'
import db from '../db/'

const Oink = db.import('./model')

function getOinks(req, res){
  Oink
    .findAll()
    .then( oinks => {
      logger.info('Oinks retrieved', {oinks: oinks});
      res.status(200).send(oinks);
    })
    .catch( err => {
      logger.error('Error retrieving oinks', {error: err.message});
      res.status(500).send(err);
    })
}


function insertOink(req, res){
  Oink
    .create({
      user: req.body.user,
      text: req.body.text,
      asset: req.body.asset
    })
    .then( oink => {
      return res.status(200).send(oink)
    })
    .catch( err => {
      return res.status(500).send(err);
    })
}


export { getOinks, insertOink }
