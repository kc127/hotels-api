const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');

const router = require('./routes.js');

const app = express();
const PORT = 4000;

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:true}));

app.use('/', router);

app.listen(PORT, () => {
  console.log(`Server listening at localhost:${PORT}`);
})
