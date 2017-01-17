
import express from 'express'
import util from 'util'
import logger from '../loggers/logger'
import db from '../db'


function getUser(req, res){
  let queryString = `SELECT * FROM "Users" WHERE id='${req.params.id}'`;
  db.oneOrNone(queryString)
    .then( user => {
      if (!user){
        logger.info('User not found', {query:queryString});
        return res.status(404).json({message: 'User not found'});
      }
      logger.info('User retrieved', {user});
      res.status(200).send(user);
    })
    .catch( err => {
      logger.error('Error retrieving user', {error: err.message})
      res.status(500).send(err);
    })
}

function getUserSettings(req, res){
  let queryString = `
  SELECT "firstName", "lastName", username, email, bio, picture
  FROM "Users"
  WHERE id='${req.params.id}'
  `;
  db.oneOrNone(queryString)
    .then( user => {
      if (!user){
        logger.info('User not found', {query:queryString});
        return res.status(404).json({message: 'User not found'});
      }
      logger.info('User retrieved', {user});
      res.status(200).send(user);
    })
    .catch( err => {
      logger.error('Error retrieving user', {error: err.message})
      res.status(500).send(err);
    })
}

function getUserSummary(req, res){
  let oinksQuery = `
  SELECT id, text, asset
  FROM "Oinks"
  WHERE "user"='${req.params.id}'`;
  let userQuery = `
  SELECT *
  FROM "Users"
  WHERE id='${req.params.id}'`;
  let oinksProm = db.any(oinksQuery);
  let userProm = db.one(userQuery);
  Promise.all([oinksProm, userProm])
    .then( data => {
      let oinks = data[0];
      let user = data[1];
      if (!user){
        logger.info('User not found', {query:userQuery});
        return res.status(404).json({message: 'User summary not found'});
      }
      logger.info('User summary retrieved', {user, oinks});
      res.status(200).json({user, oinks});
    })
    .catch( err => {
      logger.error('Error retrieving user summary', {oinksQuery, userQuery, error: err.message})
      res.status(500).json(
        {
          message: 'Error retrieving user summary',
          error: err.message
        }
      );
    })
}

function updateUserSettings(req, res){
  let queryString = `
  UPDATE "Users"
  SET "firstName"='${req.body.firstName}', "lastName"='${req.body.lastName}', username='${req.body.username}', email='${req.body.email}', bio='${req.body.bio}',
  picture='${req.body.picture}'
  WHERE id='${req.params.id}'
  `;
  db.none(queryString)
    .then( () => {
      logger.info('User found', {query:userQuery});
      res.status(200).json({});
    })
    .catch( err => {
      logger.error('Error updating user settings', {query: queryString, error:err});
      res.status(500).json({});
    })
}

function getUserBoardProfile(req, res){
  let queryString = `SELECT "firstName", "lastName", "username", "bio" FROM "Users" WHERE id='${req.params.id}'`;
  db.oneOrNone(queryString)
    .then( user => {
      if (!user){
        logger.info('User not found', {query:queryString});
        return res.status(404).json({message: 'User not found'});
      }
      logger.info('User retrieved', {user});
      res.status(200).send(user);
    })
    .catch( err => {
      logger.error('Error retrieving user', {error: err.message})
      res.status(500).send(err);
    })
}

export { getUser, getUserSettings, getUserSummary, updateUserSettings, getUserBoardProfile }
