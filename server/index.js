const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./router');
// const morgan = require('morgan');
const cors = require('cors');

const app = express();
const port = 3434;

app.listen(port, () => console.log(`listening on port ${port}`));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.use(express.static(path.join(__dirname, '../client/dist')));

app.use('/api', router);