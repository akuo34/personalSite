const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const MongoStoreInstance = new MongoStore({
  url: 'mongodb://localhost:27017/statuskuo',
  // ttl: 10
});
// const sessionHandler = require('./sessionHandler');
const model = require('../database/model');
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./router');
const morgan = require('morgan');
const cors = require('cors');
const basicAuth = require('express-basic-auth');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3434;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser('39hs894k271ef70knf638shanw82n38a9l2nd8sn28s5qef56'));
app.use(session({
  store: MongoStoreInstance,
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 2
  }
}));

MongoStoreInstance.on('create', (sessionId) => {
  model
    .postOrder(sessionId, [])
    .then(() => console.log('started new cart'))
    .catch(err => console.error(err));
});

// MongoStoreInstance.on('disconnect', (sessionId) => {
//   model
//     .deleteOrder(sessionId)
//     .then(() => console.log('deleted cart'))
//     .catch(err => console.error(err));
// });

const auth = basicAuth({
  users: {
    admin: '123'
  }
});

app.get('/authenticate', auth, (req, res) => {
  const options = {
    httpOnly: true,
    signed: true
  }

  if (req.auth.user === 'admin') {
    res.cookie('name', 'admin', options).send({ screen: 'admin' })
  } else {
    res.send({ screen: 'auth' });
  }
});

app.get('/read-cookie', (req, res) => {
  if (req.signedCookies.name === 'admin') {
    res.send({ screen: 'admin' });
  } else {
    res.send({ screen: 'auth' });
  }
});

app.get('/clear-cookie', (req, res) => {
  res.clearCookie('name').end();
});

app.listen(port, () => console.log(`listening on port ${port}`));

app.use('/', express.static(path.join(__dirname, '../client/dist')));

app.use('/admin/api', router);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'))
});



