
// arrow functions in mocha discouraged
// https://mochajs.org/#arrow-functions

import mocha from 'mocha'
import chai from 'chai'
import supertest from 'supertest'

import app from '../../../dist/server/index.js'
import * as ctrl from '../../../dist/server/auth/controller'
const agent = supertest.agent(app);
const should = chai.should();

const knexConfig = require('../../../knexfile.js')['test'];
const knex = require('knex')(knexConfig);



describe('hashPass()', function() {

  it('should return a Promise', function() {
    let prom = ctrl.hashPass('somePassword');
    prom.should.be.instanceof(Promise);
  });

  it('should resolve with salt and hash strings', function(done){
    ctrl.hashPass('someOtherPassword')
      .then( function(data){
        data.salt.should.be.a('string');
        data.hash.should.be.an('string');
        done();
      })
      .catch( function(err){
        done(err);
      })
  })

})


describe('comparePass()', function() {

  it('should return a Promise', function() {
    let prom = ctrl.hashPass('somePassword');
    prom.should.be.instanceof(Promise);
  });

  it('promise should resolve to true if correct hash is given', function(done){
    ctrl.hashPass('somePassword')
      .then( function(data){
        let correctHash = data.hash;
        let salt = data.salt;
        return ctrl.comparePass('somePassword', correctHash, salt)
      })
      .then( function(correct){
        correct.should.equal(true);
        done();
      })
      .catch( function(err){
        done(err);
      })
  })

  it('should return false if incorrect hash is given', function(done){
    ctrl.hashPass('aPassword')
      .then( function(data){
        let correctHash = data.hash;
        let salt = data.salt;
        return ctrl.comparePass('notTheSamePassword', correctHash, salt);
      })
      .then( function(correct){
        correct.should.equal(false);
        done();
      })
      .catch( function(err){
        done(err);
      })
  })

})


describe('POST /login', function(){

  before( function(done) {
    agent
      .post('/users')
      .send({
        firstName: 'firstName',
        lastName: 'lastName',
        username: 'username',
        email: 'email',
        password: 'password'
      })
      .end(function(err, res){
        if (err) {
          return done(err);
        }
        done();
      })
  })

  it('should return 200, a token, and a user if correct password is given and usernameEmail is email used to sign up', function(done){
    agent
      .post('/auth/login')
      .send({
        usernameEmail: 'email',
        password: 'password'
      })
      .end(function(err, res){
        if (err) {
          return done(err);
        }
        Object.keys(res.body).length.should.equal(3);
        res.status.should.equal(200);
        res.body.message.should.equal('User successfully authenticated');
        res.body.userId.should.be.a('string');
        // make sure jwt has header, payload, and signature
        res.body.token.split('.').length.should.equal(3);
        done();
      })
  })

  it('should return 200, a token, and a user if correct password is given and usernameEmail is username used to sign up', function(done){
    agent
      .post('/auth/login')
      .send({
        usernameEmail: 'username',
        password: 'password'
      })
      .end(function(err, res){
        if (err) {
          return done(err);
        }
        res.status.should.equal(200);
        res.body.message.should.equal('User successfully authenticated');
        res.body.userId.should.be.a('string');
        // make sure jwt has header, payload, and signature
        res.body.token.split('.').length.should.equal(3);
        done();
      })
  })

  it('should return 403 if incorrect password is given', function(done){
    agent
      .post('/auth/login')
      .send({
        usernameEmail: 'username',
        password: 'wrong'
      })
      .end(function(err, res){
        if (err) {
          return done(err);
        }
        res.status.should.equal(403);
        res.body.message.should.equal('Authentication failed');
        done();
      })
  })

  it('should return 404 if user using a wrong usernameEmail', function(done){
    agent
      .post('/auth/login')
      .send({
        usernameEmail: 'wrong',
        password: 'password'
      })
      .end(function(err, res){
        if (err) {
          return done(err);
        }
        res.status.should.equal(404);
        res.body.message.should.equal('User not found')
        done();
      })
  })

  after( function(done) {
    knex('users').truncate()
      .then( function() {
        done();
      })
  })

})
