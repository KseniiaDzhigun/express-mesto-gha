const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes');

const PORT = 3000;

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '63a0b7eca87a7048e473bc68',
  };

  next();
});
app.use('/', router);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
}, () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`);
  });
});
