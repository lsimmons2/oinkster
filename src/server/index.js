
import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'

import routes from './routes'

const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'dev';
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.get('/thick-logo', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../../images/thick-logo.png'))
})


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../src/client/index.html'));
});


app.use('/', routes);

app.all('*', (req, res) => {
  res.redirect('/');
})

if (env !== 'test'){
  app.listen(port, () => {
   console.log('listening on port ' + port);
  })
} else {
  module.exports = app;
}
