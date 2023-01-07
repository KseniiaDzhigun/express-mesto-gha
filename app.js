const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');

const mongoose = require('mongoose');
const router = require('./routes');
const { INTERNAL_SERVER_ERROR, INTERNAL_SERVER_ERROR_MESSAGE } = require('./utils/constants');

const PORT = 3000;

const app = express();
app.use(cookieParser());

app.use(express.json());
app.use('/', router);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = INTERNAL_SERVER_ERROR, message } = err;

  return res
    .status(statusCode)
    .json({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === INTERNAL_SERVER_ERROR
        ? INTERNAL_SERVER_ERROR_MESSAGE
        : message,
    });
});

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
}, () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`);
  });
});
