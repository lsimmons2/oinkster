
// arrow functions in mocha discouraged
// https://mochajs.org/#arrow-functions

import mocha from 'mocha'
import chai from 'chai'
import supertest from 'supertest'

import app from '../../../dist/server/index.js'
const agent = supertest.agent(app);
const should = chai.should();

const knexConfig = require('../../../knexfile.js')['test'];
const knex = require('knex')(knexConfig);



// ======== GET /oinks ========
describe('getOinks()', function(done) {

  before( function(done) {
    knex.seed.run({
      directory: './db/seeds/test'
    })
      .then( function() {
        done();
      })
  })

  it('should return all oinks in db', function(done) {
    agent
      .get('/oinks')
      .end(function(err, res) {
        let status = res.status;
        let oinks = res.body;
        status.should.equal(200)
        oinks.length.should.equal(4);
        done();
      })
  })

  it('should return oinks with all properties', function(done) {
    agent
      .get('/oinks')
      .end( function(err, res) {
        let status = res.status;
        let oinks = res.body;
        status.should.equal(200);
        oinks.forEach( oink => {
          oink.id.should.be.a('string');
          oink.text.should.be.a('string');
          if (oink.asset){
            oink.asset.should.be.a('string');
          } else {
            should.equal(oink.asset, null);
          }
          oink.user.should.be.a('string');
        })
        done();
      })
  })

  after( function(done) {
    knex('Oinks').truncate()
      .then( function() {
        done();
      })
  })

})


// ======== POST /oinks ========
describe('insertOink()', function() {

  before( function(done) {
    knex('Oinks').truncate()
      .then( function() {
        done();
      })
  })

  it('should get 403 if has invalid jwt header', function(done) {
    agent
      .post('/oinks')
      .set('Authorization', 'Bearer not_a_valid_jwt')
      .end(function(err, res) {
        res.status.should.equal(403);
        res.body.message.should.equal('Invalid JWT')
        done();
      })
  })

  it('should get 400 if has no jwt header', function(done) {
    agent
      .post('/oinks')
      .end(function(err, res) {
        res.status.should.equal(400);
        res.body.message.should.equal('nah')
        done();
      })
  })

})
