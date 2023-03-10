const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');

const mongoose = require('mongoose');
const { errors } = require('celebrate');
const router = require('./routes');
const { NOT_FOUND_MESSAGE_PATH } = require('./utils/constants');
const NotFoundError = require('./errors/not-found-err');
const err = require('./middlewares/err');

const PORT = 3000;

const app = express();
app.use(cookieParser());

app.use(express.json());
app.use('/', router);
app.use('*', (req, res, next) => next(new NotFoundError(NOT_FOUND_MESSAGE_PATH)));

// Обработчик ошибок celebrate
app.use(errors());

// Централизованный обработчик ошибок
app.use(err);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
}, () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`);
  });
});
