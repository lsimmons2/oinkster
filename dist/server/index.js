'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = process.env.PORT || 3000;
var env = process.env.NODE_ENV || 'dev';
var app = (0, _express2.default)();

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  res.sendFile(_path2.default.join(__dirname, '../client/index.html'));
});

app.use('/oinks', _routes2.default);

if (env !== 'test') {
  app.listen(port, function () {
    console.log('listening on port ' + port);
  });
} else {
  module.exports = app;
}