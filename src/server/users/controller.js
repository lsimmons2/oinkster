
import express from 'express'
import util from 'util'
import logger from '../loggers/logger'
import db from '../db'
import jwt from 'jsonwebtoken'
import { hashPass } from '../auth/controller'
import jwtConfig from '../../../config/jwt'
const jwtSecret = jwtConfig.secret;


// =============================================
// ============ HELPER FUNCTIONS ===============
// =============================================

function findUser(username, email){
  return new Promise((resolve, reject) => {
    if (!email){
      // only one identifier passed in, so don't know if it's username or email
      let usernameEmail = username;
      let queryString = 'SELECT * from "Users" WHERE username=$1 OR email=$1';
      db.oneOrNone(queryString, [usernameEmail])
        .then( user => {
          return resolve(user);
        })
        .catch( err => {
          logger.error('Error finding user', {query: queryString, error:err})
          return reject(err);
        });
    } else {
      let queryString = 'SELECT * from "Users" WHERE username=$1 OR email=$2';
      db.oneOrNone(queryString, [username, email])
        .then( user => {
          if (!user){
            return resolve(null);
          }
          if (user.username === username){
            return resolve({
              conflictType: 'username',
              username
            });
          }
          if (user.email === email){
            return resolve({
              conflictType: 'email',
              email
            });
          }
        })
        .catch( err => {
          logger.error('Error finding user', {error:err.message})
          return reject(err);
        });
    }
  })
}

function checkSignUpData(data){
  if (typeof data.firstName !== 'string'){
    return false;
  }
  if (typeof data.lastName !== 'string'){
    return false;
  }
  if (typeof data.username !== 'string'){
    return false;
  }
  if (typeof data.email !== 'string'){
    return false;
  }
  if (typeof data.password !== 'string'){
    return false;
  }
  return true;
}



// =============================================
// ============ POST /users ====================
// =============================================

function createUser(req, res){


  if (!checkSignUpData(req.body)){
    return res.status(400).json({
      message: 'Missing required field for signing up.'
    });
  }

  const newUser = req.body;
  let username = req.body.username;
  let email = req.body.email;

  findUser(username, email)
    .then( user => {
      if (user){
        return res.status(409).json({
          message: 'User already exists',
          user
        });
      }
      return hashPass(req.body.password);
    })
    .then( passData => {
      let salt = passData.salt;
      let hash = passData.hash;
      let firstName = req.body.firstName;
      let lastName = req.body.lastName;
      let username = req.body.username;
      let email = req.body.email;
      let queryString = 'INSERT INTO "Users"("firstName", "lastName", username, email, salt, password) values($1, $2, $3, $4, $5, $6) returning id';
      return db.one(queryString, [firstName, lastName, username, email, salt, hash])
    })
    .then( user => {
      let token = jwt.sign(user, jwtSecret, {
        expiresIn: '48h'
      });
      res.status(200).json({
        message: 'User created',
        userId: user.id,
        token
      });
    })
    .catch( err => {
      logger.error('Error creating user', {error:err.message})
      return res.status(500).send({err:err.message});
    })

}


// =============================================
// ============ GET /users/:id/summary =========
// =============================================

function getUserSummary(req, res){
  let oinksQuery = `
  SELECT id, text, asset, created
  FROM "Oinks"
  WHERE "user"='${req.params.id}'
  ORDER BY "created"`;
  let userQuery = `
  SELECT "id", "firstName", "lastName", "username", "bio"
  FROM "Users"
  WHERE id='${req.params.id}'`;
  let oinksProm = db.any(oinksQuery);
  let userProm = db.oneOrNone(userQuery);
  Promise.all([oinksProm, userProm])
    .then( data => {
      let oinks = data[0];
      let user = data[1];
      if (!user){
        logger.info('User not found', {query:userQuery});
        return res.status(404).json({message: 'User summary not found'});
      }
      // need to set oinks property because it could be null
      logger.info('User summary retrieved', {user: user, oinks: oinks});
      res.status(200).json({user: user, oinks: oinks});
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

// =============================================
// ============ GET /users/:id/board ===========
// =============================================

function getUserBoardProfile(req, res){
  let queryString = `SELECT "firstName", "lastName", "username", "bio" FROM "Users" WHERE id='${req.params.id}'`;
  db.oneOrNone(queryString)
    .then( user => {
      if (!user){
        logger.info('User not found', {query:queryString});
        return res.status(404).json({message: 'User not found'});
      }
      logger.info('User retrieved', {user: user});
      res.status(200).json({user: user});
    })
    .catch( err => {
      logger.error('Error retrieving user', {error: err.message})
      res.status(500).send(err);
    })
}

// =============================================
// ============ GET /users/:id/settings ========
// =============================================


function getUserSettings(req, res){
  let queryString = `
  SELECT "firstName", "lastName", username, email, bio
  FROM "Users"
  WHERE id='${req.params.id}'
  `;
  db.oneOrNone(queryString)
    .then( user => {
      if (!user){
        logger.info('User not found', {query:queryString});
        return res.status(404).json({message: 'User not found'});
      }
      logger.info('User retrieved', {user: user});
      res.status(200).send(user);
    })
    .catch( err => {
      logger.error('Error retrieving user', {error: err.message})
      res.status(500).send(err);
    })
}

// =============================================
// ============ PUT /users/:id/settings ========
// =============================================

function updateUserSettings(req, res){
  let queryString = `
  UPDATE "Users"
  SET "firstName"='${req.body.firstName}', "lastName"='${req.body.lastName}', username='${req.body.username}', email='${req.body.email}', bio='${req.body.bio}'
  WHERE id='${req.params.id}'
  `;
  db.none(queryString)
    .then( () => {
      logger.info('User found', {query:queryString});
      res.status(200).json({});
    })
    .catch( err => {
      logger.error('Error updating user settings', {query: queryString, error:err});
      res.status(500).json({});
    })
}

export {
  checkSignUpData,
  createUser,
  getUserSettings, getUserSummary, updateUserSettings, getUserBoardProfile }
