const express = require('express');
const path = require('path');
const router = require('./router');
// const morgan = require('morgan');
// const cors = require('cors');

const app = express();
const port = 3434;

// app.get('/', (req, res) => res.send('hello from server'));

app.listen(port, () => console.log(`listening on port ${port}`));

app.use(express.static(path.join(__dirname, '../client/dist')));

app.use('/api', router);