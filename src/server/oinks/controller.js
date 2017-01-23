
import express from 'express'
import util from 'util'
import logger from '../loggers/logger'
import db from '../db/'


function getOinks(req, res){
  db.oinks
    .findAll({
      include: [
        { model: db.users,
          attributes: ['id', 'picture']
        }
      ]
    })
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
  db.oinks
    .create({
      userId: req.user.id,
      text: req.body.text,
      asset: req.body.asset
    })
    .then( oink => {
      return res.status(200).send(oink);
    })
    .catch( err => {
      return res.status(500).send(err);
    })
}


export { getOinks, insertOink }
