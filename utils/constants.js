const BAD_REQUEST = 400;
const BAD_REQUEST_MESSAGE = 'Передан невалидный id';
const NOT_FOUND = 404;
const NOT_FOUND_MESSAGE_USER = 'Пользователь не найден';
const NOT_FOUND_MESSAGE_CARD = 'Карточка не найдена';
const INTERNAL_SERVER_ERROR = 500;
const INTERNAL_SERVER_ERROR_MESSAGE = 'Произошла ошибка';
const OK = 200;
const OK_MESSAGE = 'Пост удалён';
const CREATED = 201;
const UNAUTHORIZED = 401;
const UNAUTHORIZED_MESSAGE_LOGIN = 'Неправильные почта или пароль';
const UNAUTHORIZED_MESSAGE_AUTH = 'Необходима авторизация';
const FORBIDDEN = 403;
const FORBIDDEN_MESSAGE = 'Вы не можете удалять карточки других пользователей';

module.exports = {
  BAD_REQUEST,
  BAD_REQUEST_MESSAGE,
  NOT_FOUND,
  NOT_FOUND_MESSAGE_USER,
  NOT_FOUND_MESSAGE_CARD,
  INTERNAL_SERVER_ERROR,
  INTERNAL_SERVER_ERROR_MESSAGE,
  OK,
  OK_MESSAGE,
  CREATED,
  UNAUTHORIZED,
  UNAUTHORIZED_MESSAGE_LOGIN,
  UNAUTHORIZED_MESSAGE_AUTH,
  FORBIDDEN,
  FORBIDDEN_MESSAGE,
};
