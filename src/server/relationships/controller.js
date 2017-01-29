
import express from 'express'
import util from 'util'
import logger from '../loggers/logger'
import db from '../db/'



function createRelationship(req, res){
  let follower;
  let followee;
  db.users
    .findAll({
      where: {
        $or: [ {id: req.user.id}, {id: req.body.followeeId} ]
      }
    })
    .then( users => {
      if (users[0].get().id === req.user.id){
        follower = users[0];
        followee = users[1];
      } else {
        follower = users[1];
        followee = users[0];
      }
      return follower.addFollowee(followee);
    })
    .then( () => {
      return res.status(200).json({
        follower: {
          id: follower.id,
          username: follower.username
        },
        followee: {
          id: followee.id,
          username: followee.username
        }
      });
    })
    .catch( err => {
      logger.error('Error creating relationship', {error: err.message});
      return res.status(500).send(err);
    })
}


export { createRelationship }
