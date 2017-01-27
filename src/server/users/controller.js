
import express from 'express'
import util from 'util'
import logger from '../loggers/logger'
import jwt from 'jsonwebtoken'
import { hashPass } from '../auth/controller'
import jwtConfig from '../../../config/jwt'
const jwtSecret = jwtConfig.secret;
import db from '../db/'



// =============================================
// ============ HELPER FUNCTIONS ===============
// =============================================

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

  db.users
    .findOne({
      where: {
        $or: [ { username: req.body.username }, { email: req.body.email } ]
      }
    })
    .then( user => {
      if (user) {
        let conflict;
        if (user.email === req.body.email){
          conflict = {
            conflictType: 'email',
            email: user.email
          };
        } else {
          conflict = {
            conflictType: 'username',
            username: user.username
          };
        }
        res.status(409).json({
          message: 'User already exists',
          user: conflict
        });
        // would rather throw this specific error to break promise chain
        // than make nested promise chain
        throw new Error('User created');
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
      return db.users
        .create({
          firstName: firstName,
          lastName: lastName,
          username: username,
          email: email,
          salt: salt,
          password: hash
        })
    })
    .then( user => {
      let newUser = user.get();
      let token = jwt.sign(newUser, jwtSecret, {
        expiresIn: '48h'
      });
      res.status(200).json({
        message: 'User created',
        userId: newUser.id,
        token: token
      });
    })
    .catch( err => {
      if (err.message === 'User created'){
        return;
      }
      logger.error('Error creating user', {error:err.message})
      return res.status(500).send({err:err.message});
    })

}


// =============================================
// ============ GET /users/:id/summary =========
// =============================================

function getUserSummary(req, res){
  db.users
    .findById(req.params.id, {
      attributes: ['id', 'firstName', 'lastName', 'username', 'bio'],
      order: [['createdAt', 'DESC']],
      include: [{ model: db.oinks }]
    })
    .then( user => {
      if (!user){
        return res.status(404).json({
          message: 'User summary not found'
        })
      }
      logger.info('User summary retrieved', {user: user.get()});
      res.status(200).json({
        user: user
      })
    })
    .catch( err => {
      logger.error('Error retrieving user summary', {error: err.message});
      res.status(500).json({
        message: 'Error retrieving user summary',
        error: err.message
      })
    })
}

// =============================================
// ============ GET /users/:id/board ===========
// =============================================

function getUserBoardProfile(req, res){
  db.users
    .findById(req.params.id, {
      attributes: ['firstName', 'lastName', 'username', 'bio']
    })
    .then( user => {
      if (!user){
        logger.info('User not found', {id: req.params.id});
        return res.status(404).json({message: 'User not found'});
      }
      logger.info('User retrieved', {user: user.get()});
      return res.status(200).json({user: user.get()});
    })
    .catch( err => {
      logger.error('Error retrieving user', {error: err.message});
      res.status(500).send(err);
    })
}

// =============================================
// ============ GET /users/:id/settings ========
// =============================================


function getUserSettings(req, res){
  db.users
    .findById(req.params.id, {
      attributes: ['firstName', 'lastName', 'username', 'email', 'bio']
    })
    .then( user => {
      if (!user){
        logger.info('User not found', {id:req.params.id});
        return res.status(404).json({message: 'User not found'});
      }
      logger.info('User retrieved', {user: user.get()});
      return res.status(200).send({user: user.get()});
    })
    .catch( err => {
      logger.error('Error retrieving user', {error: err.message});
      res.status(500).send(err);
    })
}

// =============================================
// ============ PUT /users/:id/settings ========
// =============================================

function updateUserSettings(req, res){
  db.users
    .update({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      bio: req.body.bio
    }, {
      where: {
        id: req.params.id
      }
    })
    .then( user => {
      logger.info('User found', {user: user});
      res.status(200).json({});
    })
    .catch( err => {
      logger.error('Error updating user settings', {error:err.message});
      res.status(500).json({});
    })
}



export {
  checkSignUpData,
  createUser,
  getUserSettings, getUserSummary, updateUserSettings, getUserBoardProfile }
