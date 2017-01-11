
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



describe('getOinks()', function() {

  before( function() {
    knex.seed.run({directory: './db/seeds/test'})
  })

  it('should return all oinks in db', function(done) {
    agent
      .get('/oinks')
      .expect(201)
      .end(function(err, res) {
        let oinks = res.body;
        oinks.length.should.equal(3);
        done();
      })
  })
})
