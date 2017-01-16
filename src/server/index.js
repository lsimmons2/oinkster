
import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import morgan from 'morgan'

import routes from './routes'
import feedback from './feedback'

const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'dev';
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
if (env !== 'test'){
  let morganFormat = env === 'dev' ? 'dev' : 'combined';
  app.use(morgan(morganFormat));
}

if (env !== 'production'){
  let imagesPath = path.join(__dirname, '../../images');
  app.use('/images', express.static(imagesPath));
}

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
