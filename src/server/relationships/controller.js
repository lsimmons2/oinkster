
import express from 'express'
import util from 'util'
import logger from '../loggers/logger'
import db from '../db/'



function createRelationship(req, res){
  db.users
    .findAll({
      where: {
        $or: [ {id: req.user.id}, {id: req.body.followeeId} ]
      }
    })
    .then( users => {
      let follower = users[0];
      let followee = users[1];
      return followee.addFollower(follower);
    })
    .then( () => {
      return res.status(200).end();
    })
    .catch( err => {
      logger.error('Error creating relationship', {error: err.message});
      return res.status(500).send(err);
    })
}


export { createRelationship }
