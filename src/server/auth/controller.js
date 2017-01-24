
import express from 'express'
import bcrypt from 'bcryptjs'
const pgp = require('pg-promise')();
import jwt from 'jsonwebtoken'
import db from '../db'
import logger from '../loggers/logger'
import jwtConfig from '../../../config/jwt'
const jwtSecret = jwtConfig.secret;


function authenticate(req, res, next){
  if (req.headers['authorization'] === undefined){
    return res.status(400).json({
      message: 'nah'
    });
  }
  let token = req.headers['authorization'].replace('Bearer ', '');
  jwt.verify(token, jwtSecret, (err, user) => {
    if (err){
      return res.status(403).json({
        message: 'Invalid JWT',
        err
      });
    }
    req.user = user;
    next();
  })
}

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


function findUser(usernameEmail){
  return new Promise((resolve, reject) => {
    let queryString = 'SELECT * from "Users" WHERE username=$1 OR email=$1';
    db.oneOrNone(queryString, [usernameEmail])
      .then( user => {
        return resolve(user);
      })
      .catch( err => {
        logger.error('Error finding user', {query: queryString, error:err})
        return reject(err);
      });
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


  let userProm = db.users.findOne(
    {
      where: {
        $or: [ { username: usernameEmail }, { email: usernameEmail } ]
      }
    }
  );

  let validatedProm = userProm
    .then( user => {
      if (!user){
        return new Promise(resolve => resolve(null))
      }
      return comparePass(password, user.password, user.salt);
    });

  Promise.all([userProm, validatedProm])
    .then( data => {
      let user = data[0].get();
      let validated = data[1];
      if (!user){
        return res.status(404).json({
          message: 'User not found'
        })
      }
      if (validated){
        let token = jwt.sign(user, jwtSecret);
        return res.status(200).json({
          message: 'User successfully authenticated',
          userId: user.id,
          token: token
        });
      } else {
        return res.status(403).json({
          message: 'Authentication failed'
        })
      }
    })
    .catch( err => {
      logger.error('Error logging in', {error:err.message});
      return res.status(500).json({message: 'Error logging in', error: err.message});
    })

}


export {
  authenticate,
  hashPass,
  comparePass,
  findUser,
  logIn
}
