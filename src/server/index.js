
import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'

import routes from './routes'
import feedback from './feedback'

const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'dev';
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  if (env === 'dev'){
    console.log(req.method, req.url);
  }
  next();
});

app.get('/thick-logo', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../../images/thick-logo.png'))
});
app.get('/generic-avatar', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../../images/generic-avatar.png'))
});
app.get('/pig', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../../images/pig.jpg'))
});
app.get('/profile-pic-pig', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../../images/profile-pic-pig.jpg'))
});

app.use('/feedback', feedback);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../src/client/index.html'));
});


app.use('/', routes);

app.all('*', (req, res) => {
  res.redirect('/');
})

if (env !== 'test'){
  app.listen(port, () => {
   console.log(`listening on port ${port} in ${env} environment`);
  })
} else {
  module.exports = app;
}
