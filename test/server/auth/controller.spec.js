
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
