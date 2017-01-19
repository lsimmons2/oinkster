
import express from 'express'
import bcrypt from 'bcryptjs'
const pgp = require('pg-promise')();
import jwt from 'jsonwebtoken'
import db from '../db'
import logger from '../loggers/logger'



function hashPass(password){
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err){
        logger.error('Error generating salt', {error:err.message})
        return reject(err);
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err){
          logger.error('Error hashing password', {error:err.message})
          return reject(err);
        }
        return resolve({ salt, hash });
      })
    })
  })
}


function comparePass(password, correctHash, salt){
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, correctHash, (err, res) => {
      if (err){
        logger.error('Error comparing password', {error:err.message})
        return reject(err);
      }
      return resolve(res);
    })
  })
}


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


function signUp(req, res, next){

  if (!checkSignUpData(req.body)){
    return res.status(400).json({
      message: 'Missing required field for signing up.'
    });
  }

  let username = req.body.username;
  let email = req.body.email;

  findUser(username, email)
    .then( user => {
      if (user){
        // user already exists - check password and
        // either log in or prompt for password again
        return res.status(409).json({
          message: 'User already exists',
          user
        });
      }
      return createUser(req, res);
    })
    .catch( err => {
      logger.error('Error signing up', {error:err.message})
      res.status(500).send(err);
    })
}


function logIn(req, res, next){

  let usernameEmail = req.body.usernameEmail;
  let password = req.body.password;

  if (typeof usernameEmail !== 'string' || typeof password !== 'string'){
    logger.error('Missing required field for logging in', {user:usernameEmail})
    return res.status(400).json({
      message: 'Missing required field for logging in'
    });
  }

  let userProm = findUser(usernameEmail);
  let validatedProm = userProm
    .then( user => {
      if (!user){
        return new Promise(resolve => resolve(null))
      }
      return comparePass(password, user.password, user.salt);
    });

  Promise.all([userProm, validatedProm])
    .then( data => {
      let user = data[0];
      let validated = data[1];
      if (!user){
        return res.status(404).json({
          message: 'User not found'
        })
      }
      if (validated){
        let token = jwt.sign(user, 'sah');
        return res.status(200).json({
          'message': 'User successfully authenticated',
          userId: user.id,
          token
        });
      } else {
        return res.status(403).json({
          message: 'Authentication failed'
        })
      }
    })
    .catch( err => {
      logger.error('Error logging in', {error:err.message});
      return res.status(500).send();
    })

}


export {
  hashPass,
  comparePass,
  findUser,
  // createUser,
  // checkSignUpData,
  signUp,
  logIn
}
