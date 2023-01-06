const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');

const mongoose = require('mongoose');
const router = require('./routes');

const PORT = 3000;

const app = express();
app.use(cookieParser());

app.use(express.json());
app.use('/', router);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
}, () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`);
  });
});
