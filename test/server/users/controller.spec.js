
// arrow functions in mocha discouraged
// https://mochajs.org/#arrow-functions

import mocha from 'mocha'
import chai from 'chai'
import supertest from 'supertest'

import app from '../../../dist/server/index.js'
import { hashPass } from '../../../dist/server/auth/controller'
import * as ctrl from '../../../dist/server/users/controller'
const agent = supertest.agent(app);
const should = chai.should();


import Sequelize from 'sequelize'
import dbConfig from '../../../config/db/'
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig.options);
const uuid = require('uuid/v1');


import path from 'path'
import db from '../../../src/server/db/'



const knexConfig = require('../../../knexfile.js')['test'];
const knex = require('knex')(knexConfig);


describe('Helper functions', function(){
  describe('checkSignUpData()', function() {

    it('should return true if all of req.body properties are strings', function(){
      let reqBody = {
        firstName: 'firstName',
        lastName: 'lastName',
        username: 'username',
        email: 'email',
        bio: 'bio',
        password: 'password',
        picture: 'picture'
      };
      ctrl.checkSignUpData(reqBody).should.equal(true);
    })

    it('should return false if req.body.firstName is not a string', function(){
      let reqBody = {
        firstName: 1,
        lastName: 'lastName',
        username: 'username',
        email: 'email',
        bio: 'bio',
        password: 'password',
        picture: 'picture'
      };
      ctrl.checkSignUpData(reqBody).should.equal(false);
    })

    it('should return false if req.body.lastName is not a string', function(){
      let reqBody = {
        firstName: 'firstName',
        lastName: 1,
        username: 'username',
        email: 'email',
        bio: 'bio',
        password: 'password',
        picture: 'picture'
      };
      ctrl.checkSignUpData(reqBody).should.equal(false);
    })

    it('should return false if req.body.username is not a string', function(){
      let reqBody = {
        firstName: 'firstName',
        lastName: 'lastName',
        username: 1,
        email: 'email',
        bio: 'bio',
        password: 'password',
        picture: 'picture'
      };
      ctrl.checkSignUpData(reqBody).should.equal(false);
    })

    it('should return false if req.body.email is not a string', function(){
      let reqBody = {
        firstName: 'firstName',
        lastName: 'lastName',
        username: 'username',
        email: 1,
        bio: 'bio',
        password: 'password',
        picture: 'picture'
      };
      ctrl.checkSignUpData(reqBody).should.equal(false);
    })

    it('should return false if req.body.password is not a string', function(){
      let reqBody = {
        firstName: 'firstName',
        lastName: 'lastName',
        username: 'username',
        email: 'email',
        bio: 'bio',
        password: 1,
        picture: 'picture'
      };
      ctrl.checkSignUpData(reqBody).should.equal(false);
    })

  })
})

describe('POST /users', function() {

  describe('should return 200 and a token if user doesn\'t exist', function(){

    before( function(done) {
      knex('users').truncate()
        .then( function() {
          done();
        })
    })

    after( function(done) {
      knex('users').truncate()
        .then( function() {
          done();
        })
    })

    it('should return 200, userId, and a token if user doesn\'t exist', function(done){
      agent
        .post('/users')
        .send({
          firstName: 'name',
          lastName: 'lastName',
          username: 'username',
          email: 'email',
          password: 'password'
        })
        .end(function(err, res){
          if (err) {
            return done(err);
          }
          res.status.should.equal(200);
          res.body.message.should.equal('User created');
          res.body.userId.should.be.a('string');
          res.body.token.split('.').length.should.equal(3);
          done();
        })
    })

  })

  describe('should return 409 if user already exists', function(){

    before( function(done) {
      knex.seed.run({
        directory: './db/knex-seeders/users/409'
      })
        .then( function() {
          done();
        })
    })

    after( function(done) {
      knex('users').truncate()
        .then( function() {
          done();
        })
    })

    it('email already exists', function(done){
      agent
        .post('/users')
        .send({
          firstName: 'name',
          lastName: 'lastName',
          username: 'username',
          email: 'bob@bob.com',
          password: 'password'
        })
        .end(function(err, res){
          if (err) {
            return done(err);
          }
          res.status.should.equal(409);
          res.body.message.should.equal('User already exists')
          done();
        })
    })

    it('username already exists', function(done){
      agent
        .post('/users')
        .send({
          firstName: 'name',
          lastName: 'lastName',
          username: 'bob',
          email: 'email@email.com',
          password: 'password'
        })
        .end(function(err, res){
          if (err) {
            return done(err);
          }
          res.status.should.equal(409);
          res.body.message.should.equal('User already exists')
          done();
        })
    })

  })


  describe('should return 400 if missing a sign up field', function(){

    it ('no firstName', function (done){
      agent
        .post('/users')
        .send({
          lastName: 'bill',
          username: 'bill',
          email: 'bill@bill.com',
          password: 'bill'
        })
        .end(function(err, res){
          if (err) {
            return done(err);
          }
          res.status.should.equal(400);
          res.body.message.should.equal('Missing required field for signing up.');
          done();
        })
    })

    it ('no lastName', function (done){
      agent
        .post('/users')
        .send({
          firstName: 'bill',
          username: 'bill',
          email: 'bill@bill.com',
          password: 'bill'
        })
        .end(function(err, res){
          if (err) {
            return done(err);
          }
          res.status.should.equal(400);
          res.body.message.should.equal('Missing required field for signing up.');
          done();
        })
    })

    it ('no email', function (done){
      agent
        .post('/users')
        .send({
          firstName: 'bill',
          lastName: 'bill',
          username: 'bill',
          password: 'bill'
        })
        .end(function(err, res){
          if (err) {
            return done(err);
          }
          res.status.should.equal(400);
          res.body.message.should.equal('Missing required field for signing up.');
          done();
        })
    })

    it ('no username', function (done){
      agent
        .post('/users')
        .send({
          firstName: 'bill',
          lastName: 'bill',
          email: 'bill@bill.com',
          password: 'bill'
        })
        .end(function(err, res){
          if (err) {
            return done(err);
          }
          res.status.should.equal(400);
          res.body.message.should.equal('Missing required field for signing up.');
          done();
        })
    })

    it ('no password', function (done){
      agent
        .post('/users')
        .send({
          firstName: 'bill',
          lastName: 'bill',
          username: 'bill',
          email: 'bill@bill.com'
        })
        .end(function(err, res){
          if (err) {
            return done(err);
          }
          res.status.should.equal(400);
          res.body.message.should.equal('Missing required field for signing up.');
          done();
        })
    })

  })


})

describe('GET /users/:id/summary', function() {

  before( function(done) {
    knex('users').truncate()
      .then( function() {
        knex('oinks').truncate()
          .then( function() {
            done();
          })
      })
  })

  after( function(done) {
    knex('users').truncate()
      .then( function() {
        knex('oinks').truncate()
          .then( function() {
            done();
          })
      })
  })

  it('should send back user\'s firstName, lastName, username, bio, and oinks if user exists', function(done){
    // using these long, nested supertest calls because I haven't yet set
    // up a way to seed users in a way that hashes passwords properly
    agent
      .post('/users')
      .send({
        firstName: 'bob',
        lastName: 'bobb',
        username: 'bobbb',
        email: 'bob@bob.com',
        password: 'bob?'
      })
      .end(function(err, res){
        if (err) {
          return done(err);
        }
        let newId = res.body.userId;
        let token = res.body.token;
        agent
          .post('/oinks')
          .set('Authorization', 'Bearer ' + token)
          .send({
            text: 'yo soy bob',
            asset: null
          })
          .end(function(err, res){
            if (err) {
              return done(err);
            }
            agent
              .get(`/users/${newId}/summary`)
              .end(function(err, res){
                if (err) {
                  return done(err);
                }
                let user = res.body.user;
                Object.keys(user).length.should.equal(6);
                user.firstName.should.equal('bob');
                user.lastName.should.equal('bobb');
                user.username.should.equal('bobbb');
                should.equal(user.bio, null);
                user.oinks.length.should.equal(1);
                let oink = user.oinks[0];
                oink.userId.should.equal(newId);
                oink.text.should.equal('yo soy bob');
                should.equal(oink.asset, null);
                done();
              })
          })
      })
  })

  it('should send back 404 if wrong id is given', function(done){
    agent
      .post('/users')
      .send({
        firstName: 'bob',
        lastName: 'bobb',
        username: 'bobbb',
        email: 'bob@bob.com',
        password: 'bob?'
      })
      .end(function(err, res){
        if (err) {
          return done(err);
        }
        let newId = res.body.userId;
        let token = res.body.token;
        agent
          .get(`/users/22a62f96-63e2-4962-97b2-3c2ed43dafee/summary`)
          .end(function(err, res){
            if (err) {
              return done(err);
            }
            res.status.should.equal(404);
            res.body.message.should.equal('User summary not found');
            done();
          })
      })
  })

})

describe('GET /users/:id/board', function() {

  beforeEach( function(done) {
    knex('users').truncate()
      .then( function() {
        done();
      })
  })

  afterEach( function(done) {
    knex('users').truncate()
      .then( function() {
        done();
      })
  })

  it('should send back user\'s firstName, lastName, username, and bio if user exists', function(done){
    agent
      .post('/users')
      .send({
        firstName: 'bob',
        lastName: 'bobb',
        username: 'bobbb',
        email: 'bob@bob.com',
        password: 'bob?'
      })
      .end(function(err, res){
        if (err) {
          return done(err);
        }
        let newId = res.body.userId;
        let token = res.body.token;
        agent
          .get(`/users/${newId}/board`)
          .end(function(err, res){
            if (err) {
              return done(err);
            }
            let user = res.body.user;
            Object.keys(user).length.should.equal(4);
            user.firstName.should.equal('bob');
            user.lastName.should.equal('bobb');
            user.username.should.equal('bobbb');
            should.equal(user.bio, null);
            done();
          })
      })
  })

  it('should send back 404 if wrong id is given', function(done){
    agent
      .post('/users')
      .send({
        firstName: 'bob',
        lastName: 'bobb',
        username: 'bobbb',
        email: 'bob@bob.com',
        password: 'bob?'
      })
      .end(function(err, res){
        if (err) {
          return done(err);
        }
        let newId = res.body.userId;
        let token = res.body.token;
        agent
          .get(`/users/22a62f96-63e2-4962-97b2-3c2ed43dafee/board`)
          .end(function(err, res){
            if (err) {
              return done(err);
            }
            res.status.should.equal(404);
            res.body.message.should.equal('User not found');
            done();
          })
      })
  })

})

describe('GET /users/:id/settings', function() {

  beforeEach( function(done) {
    knex('users').truncate()
      .then( function() {
        done();
      })
  })

  afterEach( function(done) {
    knex('users').truncate()
      .then( function() {
        done();
      })
  })

  it('should send 403 if wrong token given', function(done){
    agent
      .get('/users/22a62f96-63e2-4962-97b2-3c2ed43dafee/settings')
      .set('Authorization', 'Bearer wrongToken')
      .end(function(err, res){
        if (err) {
          return done(err);
        }
        res.status.should.equal(403);
        done();
      })
  })

  it('should send 400 if no token given', function(done){
    agent
      .get('/users/22a62f96-63e2-4962-97b2-3c2ed43dafee/settings')
      .end(function(err, res){
        if (err) {
          return done(err);
        }
        res.status.should.equal(400);
        done();
      })
  })

  it('should send back 404 if wrong id is given', function(done){
    agent
      .post('/users')
      .send({
        firstName: 'bob',
        lastName: 'bobb',
        username: 'bobbb',
        email: 'bob@bob.com',
        password: 'bob?'
      })
      .end(function(err, res){
        if (err) {
          return done(err);
        }
        let newId = res.body.userId;
        let token = res.body.token;
        agent
          .get(`/users/22a62f96-63e2-4962-97b2-3c2ed43dafee/summary`)
          .end(function(err, res){
            if (err) {
              return done(err);
            }
            res.status.should.equal(404);
            res.body.message.should.equal('User summary not found');
            done();
          })
      })
  })

  it('should send back user\'s firstName, lastName, username, email, and bio if user exists and has correct token', function(done){
    // using these long, nested supertest calls because I haven't yet set
    // up a way to seed users in a way that hashes passwords properly
    agent
      .post('/users')
      .send({
        firstName: 'bob',
        lastName: 'bobb',
        username: 'bobbb',
        email: 'bob@bob.com',
        password: 'bob?'
      })
      .end(function(err, res){
        if (err) {
          return done(err);
        }
        let newId = res.body.userId;
        let token = res.body.token;
        agent
          .get(`/users/${newId}/settings`)
          .set('Authorization', 'Bearer ' + token)
          .end(function(err, res){
            if (err) {
              return done(err);
            }
            let user = res.body.user;
            Object.keys(user).length.should.equal(5);
            user.firstName.should.equal('bob');
            user.lastName.should.equal('bobb');
            user.username.should.equal('bobbb');
            should.equal(user.bio, null);
            done();
          })
      })
  })

})

describe('PUT /users/:id/settings', function() {

  beforeEach( function(done) {
    knex('users').truncate()
      .then( function() {
        done();
      })
  })

  afterEach( function(done) {
    knex('users').truncate()
      .then( function() {
        done();
      })
  })

  it('should send 403 if wrong token given', function(done){
    agent
      .put('/users/22a62f96-63e2-4962-97b2-3c2ed43dafee/settings')
      .set('Authorization', 'Bearer wrongToken')
      .send({
        firstName: 'Leo',
        lastName: 'Simmons',
        username: 'sah',
        email: 'sah@sah.com',
        bio: 'sahh',
        picture: 'sah?'

      })
      .end(function(err, res){
        if (err) {
          return done(err);
        }
        res.status.should.equal(403);
        done();
      })
  })

  it('should send 400 if no token given', function(done){
    agent
      .put('/users/22a62f96-63e2-4962-97b2-3c2ed43dafee/settings')
      .end(function(err, res){
        if (err) {
          return done(err);
        }
        res.status.should.equal(400);
        done();
      })
  })

  it('should send back user\'s firstName, lastName, username, email, and bio if user exists and has correct token', function(done){
    // using these long, nested supertest calls because I haven't yet set
    // up a way to seed users in a way that hashes passwords properly
    agent
      .post('/users')
      .send({
        firstName: 'bob',
        lastName: 'bobb',
        username: 'bobbb',
        email: 'bob@bob.com',
        password: 'bob?'
      })
      .end(function(err, res){
        if (err) {
          return done(err);
        }
        let newId = res.body.userId;
        let token = res.body.token;

        agent
          .put(`/users/${newId}/settings`)
          .set('Authorization', 'Bearer ' + token)
          .send({
            firstName: 'bill',
            lastName: 'bill',
            username: 'bill',
            email: 'bill',
            bio: 'yo soy bill'
          })
          .end(function(err, res){
            if (err) {
              return done(err);
            }
            agent
              .get(`/users/${newId}/settings`)
              .set('Authorization', 'Bearer ' + token)
              .end(function(err, res){
                if (err) {
                  return done(err);
                }
                let user = res.body.user;
                Object.keys(user).length.should.equal(5);
                user.firstName.should.equal('bill');
                user.lastName.should.equal('bill');
                user.username.should.equal('bill');
                should.equal(user.bio, 'yo soy bill');
                done();
              })
          })
      })
  })

})
