
import express from 'express'
import util from 'util'
import logger from '../loggers/logger'
import db from '../db/'


function getOinks(req, res){
  db.oinks
    .findAll({
      order: [
        ['createdAt', 'DESC']
      ],
      include: [
        {
          model: db.users,
          attributes: ['id', 'username', 'picture']
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
      return db.oinks.findById(oink.id, {
        include: [{ model: db.users, attributes: ['username', 'id'] }]
      })
    })
    .then( oink => {
      return res.status(200).send(oink);
    })
    .catch( err => {
      logger.error('Error inserting oink', {error: err.message});
      return res.status(500).send(err);
    })
}


export { getOinks, insertOink }
