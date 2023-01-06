const jwt = require('jsonwebtoken');
const {
  UNAUTHORIZED,
  UNAUTHORIZED_MESSAGE_AUTH,
} = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(UNAUTHORIZED).json({ message: UNAUTHORIZED_MESSAGE_AUTH });
  }
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
  } catch (err) {
    return res.status(UNAUTHORIZED).json({ message: UNAUTHORIZED_MESSAGE_AUTH });
  }
  req.user = payload; // записываем пейлоуд в объект запроса, в нашем случае id

  next(); // пропускаем запрос дальше
};
