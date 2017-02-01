
import express from 'express'
import util from 'util'
import logger from '../loggers/logger'
import db from '../db/'


function getOinks(req, res){
  let query = {
    order: [
      ['createdAt', 'DESC']
    ],
    include: [
      {
        model: db.users,
        attributes: ['id', 'username', 'picture']
      }
    ]
  };
  if (req.user === undefined){
    db.oinks
      .findAll(query)
      .then( oinks => {
        logger.info('Oinks retrieved', {oinks: oinks});
        res.status(200).send(oinks);
      })
      .catch( err => {
        logger.error('Error retrieving oinks', {error: err.message});
        res.status(500).send(err);
      })
  } else {
    db.relationships
      .findAll({
        where: {
          followerId: req.user.id
        },
        attributes: ['followeeId']
      })
      .then( followees => {
        let followeeIds = [];
        for (let followee in followees){
          followeeIds.push(followees[followee].followeeId);
        }
        query['where'] = {
          userId: {
            $in: followeeIds
          }
        };
        return db.oinks.findAll(query)
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
  // db.oinks
  //   .findAll(query)
  //   .then( oinks => {
  //     logger.info('Oinks retrieved', {oinks: oinks});
  //     res.status(200).send(oinks);
  //   })
  //   .catch( err => {
  //     logger.error('Error retrieving oinks', {error: err.message});
  //     res.status(500).send(err);
  //   })
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
