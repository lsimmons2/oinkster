
import express from 'express'
import bcrypt from 'bcryptjs'
const pgp = require('pg-promise')();
import jwt from 'jsonwebtoken'
import db from '../db'



function hashPass(password){
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err){
        return reject(err);
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err){
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
          return reject(err);
        });
    }
  })
}


function createUser(req, res){
  let username = req.body.username;
  let email = req.body.email;
  let firstname = req.body.firstName;
  let lastname = req.body.lastName;
  let password = req.body.password;
  hashPass(password)
  .then( passData => {
    let salt = passData.salt;
    let hash = passData.hash;
    let queryString = 'INSERT INTO "Users"(firstname, lastname, username, email, salt, password) values($1, $2, $3, $4, $5, $6) returning id, firstname, lastname, username, email, salt, password';
    return db.one(queryString, [firstname, lastname, username, email, salt, hash])
  })
  .then( user => {
    let token = jwt.sign(user, 'sah', {
      expiresIn: 864
    });
    return res.status(200).json({
      message: 'User created',
      user,
      token
    });
  })
  .catch( err => {
    return res.status(500).send(err);
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
      res.status(500).send(err);
    })
}


function logIn(req, res, next){

  let usernameEmail = req.body.usernameEmail;
  let password = req.body.password;

  if (typeof usernameEmail !== 'string' || typeof password !== 'string'){
    return res.status(400).json({
      message: 'Missing required field for logging up'
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
          'sah': 'sah',
          user,
          token
        });
      } else {
        return res.status(403).json({
          message: 'Authentication failed'
        })
      }
    })
    .catch( err => {
      return res.status(500).send();
    })

}


export {
  hashPass,
  comparePass,
  findUser,
  createUser,
  checkSignUpData,
  signUp,
  logIn
}
