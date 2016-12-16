'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pgp = require('pg-promise')();

var cn = {
  database: 'oinkster'
};

var db = pgp(cn);

function insertOink(req, res) {
  var queryString = 'INSERT INTO oinks("Id", "Text", "Asset", "User") values($1, $2, $3, $4) returning "Text"';
  var id = 4;
  var asset = req.body.asset || null;
  console.log('req.body.text: ', req.body);
  db.one(queryString, [id, req.body.text, asset, req.body.user]).then(function (data) {
    console.log('inserted? ', data);
    res.status(200).send(data);
  }).catch(function (err) {
    console.error('error inserting into db: ', err.message || err);
    res.status(500).send(err);
  });
}

var router = _express2.default.Router();

router.route('/').post(function (req, res) {
  console.log(req.method, req.url);
  return insertOink(req, res);
});

exports.default = router;