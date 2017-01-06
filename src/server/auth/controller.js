
import express from 'express'
import bcrypt from 'bcrypt'
const pgp = require('pg-promise')();
import db from '../db'


// console.log(req.body);
// let hashes = {};
// bcrypt.genSalt(15, (err, salt1) => {
//   bcrypt.hash(req.body.password1, salt1, (err, hash1) => {
//     bcrypt.genSalt(15, (err, salt2) => {
//       bcrypt.hash(req.body.password2, salt1, (err, hash2) => {
//         return res.send({
//           hash1,
//           hash2
//         })
//       })
//     })
//   })
// })

function findUser(username, email){
  return new Promise((resolve, reject) => {
    let queryString = 'SELECT * from "Users" WHERE username=$1 OR email=$2';
    db.oneOrNone(queryString, [username, email])
      .then( user => {
        return resolve(user);
      })
      .catch( err => {
        return reject(err);
      });
  })
}

function createUser(username, email, firstname, lastname){
  return new Promise((resolve, reject) => {
    let queryString = 'INSERT INTO "Users"(firstname, lastname, username, email) values($1, $2, $3, $4) returning id';
    db.one(queryString, [firstname, lastname, username, email])
    .then(data => {
      return resolve(data.id);
    })
    .catch(err => {
      return reject(err);
    })
  })
}


function signUp(req, res, next){
  let username = req.body.username;
  let email = req.body.email;
  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  findUser(username, email)
    .then( user => {
      if (user){
        // user already exists - check password and
        // either log in or prompt for password again
        return res.status(302).send();
      }
      return createUser(username, email, firstname, lastname)
    })
    .then( user => {
      return res.status(200).json({
        message: 'user created',
        user
      })
    })
    .catch( err => {
      res.status(500).send(err);
    })
}


function logIn(req, res, next){
  return res.status(200).send('tryna log in?');
}

export { signUp, logIn }
