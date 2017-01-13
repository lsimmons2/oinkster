
import express from 'express'
import util from 'util'
import dbLogger from '../loggers/db-logger'
import db from '../db'


function getUser(req, res){
  let queryString = `SELECT * FROM "Users" WHERE id='${req.params.id}'`;
  db.oneOrNone(queryString)
    .then( user => {
      if (!user){
        return res.status(404).json({message: 'User not found'});
      }
      dbLogger.info('User retrieved', {user});
      res.status(200).send(user);
    })
    .catch( err => {
      dbLogger.error('Error retrieving user', {error: err.message})
      res.status(500).send(err);
    })
}

function getUserSettings(req, res){
  let queryString = `
  SELECT firstname, lastname, username, email
  FROM "Users"
  WHERE id='${req.params.id}'
  `;
  db.oneOrNone(queryString)
    .then( user => {
      if (!user){
        return res.status(404).json({message: 'User not found'});
      }
      dbLogger.info('User retrieved', {user});
      res.status(200).send(user);
    })
    .catch( err => {
      dbLogger.error('Error retrieving user', {error: err.message})
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
        return res.status(404).json({message: 'User summary not found'});
      }
      dbLogger.info('User summary retrieved', {user, oinks});
      res.status(200).json({user, oinks});
    })
    .catch( err => {
      dbLogger.error('Error retrieving user summary', {error: err.message})
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
  SET firstname='${req.body.firstName}', lastname='${req.body.lastName}', username='${req.body.username}', email='${req.body.email}'
  WHERE id='${req.params.id}'
  `;
  db.none(queryString)
    .then( () => {
      res.status(200).json({});
    })
    .catch( err => {
      res.status(500).json({});
    })
}

export { getUser, getUserSettings, getUserSummary, updateUserSettings }
