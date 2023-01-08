const BAD_REQUEST_MESSAGE = 'Передан невалидный id';
const NOT_FOUND_MESSAGE_USER = 'Пользователь не найден';
const NOT_FOUND_MESSAGE_CARD = 'Карточка не найдена';
const INTERNAL_SERVER_ERROR = 500;
const INTERNAL_SERVER_ERROR_MESSAGE = 'Произошла ошибка';
const OK = 200;
const OK_MESSAGE = 'Пост удалён';
const CREATED = 201;
const UNAUTHORIZED_MESSAGE_LOGIN = 'Неправильные почта или пароль';
const UNAUTHORIZED_MESSAGE_AUTH = 'Необходима авторизация';
const FORBIDDEN_MESSAGE = 'Вы не можете удалять карточки других пользователей';
const CONFLICT_MESSAGE = 'Пользователь с таким email уже существует';

const REGEX_URL = /^https?:\/\/(www.)?[\w-.~:/?#[\]@!$&'()*+,;=]+#?$/;

module.exports = {
  BAD_REQUEST_MESSAGE,
  NOT_FOUND_MESSAGE_USER,
  NOT_FOUND_MESSAGE_CARD,
  INTERNAL_SERVER_ERROR,
  INTERNAL_SERVER_ERROR_MESSAGE,
  OK,
  OK_MESSAGE,
  CREATED,
  UNAUTHORIZED_MESSAGE_LOGIN,
  UNAUTHORIZED_MESSAGE_AUTH,
  FORBIDDEN_MESSAGE,
  CONFLICT_MESSAGE,
  REGEX_URL,
};
