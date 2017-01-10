
import express from 'express'
import bcrypt from 'bcryptjs'
const pgp = require('pg-promise')();
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
          return resolve(user);
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
  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  let password = req.body.password;
  hashPass(password)
  .then( passData => {
    let salt = passData.salt;
    let hash = passData.hash;
    let queryString = 'INSERT INTO "Users"(firstname, lastname, username, email, salt, password) values($1, $2, $3, $4, $5, $6) returning id';
    return db.one(queryString, [firstname, lastname, username, email, salt, hash])
  })
  .then( data => {
    return res.status(200).json({
      message: 'User created',
      id: data.id
    });
  })
  .catch( err => {
    return res.status(500).send(err);
  })
}


function signUp(req, res, next){
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
  findUser(usernameEmail)
    .then( user => {
      if (!user){
        return res.status(302).redirect('/signup');
      }
      comparePass(password, user.password, user.salt)
        .then( validated => {
          if (validated){
            return res.status(200).send('logged in!');
          }
          return res.status(403).send('you exist but wrong password');
        })
        .catch (err => {
          return res.status(500).send(err);
        })
    })
    .catch( err => {
      console.log('no user:');
      console.log(err);
    })
}


export { signUp, logIn }
