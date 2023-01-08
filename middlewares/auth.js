const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');
const {
  UNAUTHORIZED_MESSAGE_AUTH, JWT_SECRET,
} = require('../utils/constants');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(new UnauthorizedError(UNAUTHORIZED_MESSAGE_AUTH));
  }
  let payload;

  try {
    payload = jwt.verify(
      token,
      JWT_SECRET,
    );
  } catch (err) {
    return next(new UnauthorizedError(UNAUTHORIZED_MESSAGE_AUTH));
  }
  req.user = payload; // записываем пейлоуд в объект запроса, в нашем случае id

  next(); // пропускаем запрос дальше
};
