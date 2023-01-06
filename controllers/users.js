const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

const {
  BAD_REQUEST,
  BAD_REQUEST_MESSAGE,
  NOT_FOUND,
  NOT_FOUND_MESSAGE_USER,
  INTERNAL_SERVER_ERROR,
  INTERNAL_SERVER_ERROR_MESSAGE,
  OK,
  CREATED,
  UNAUTHORIZED,
  UNAUTHORIZED_MESSAGE_LOGIN,
} = require('../utils/constants');

const login = async (req, res) => {
  try {
    const {
      email, password,
    } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(UNAUTHORIZED).json({ message: UNAUTHORIZED_MESSAGE_LOGIN });
    }
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      return res.status(UNAUTHORIZED).json({ message: UNAUTHORIZED_MESSAGE_LOGIN });
    }
    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      { expiresIn: '7d' },
    );

    return res
      .cookie('jwt', token, {
        // token - наш JWT токен, который мы отправляем
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      })
      .send({ message: 'Токен записан' });
  } catch (e) {
    if (e.name === 'ValidationError') {
      const errors = Object.values(e.errors).map((err) => err.message);
      return res.status(BAD_REQUEST).json({ message: errors.join(', ') });
    }
    return res.status(INTERNAL_SERVER_ERROR).json({ message: INTERNAL_SERVER_ERROR_MESSAGE });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(OK).json(users);
  } catch (e) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: INTERNAL_SERVER_ERROR_MESSAGE });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(NOT_FOUND).json({ message: NOT_FOUND_MESSAGE_USER });
    }

    return res.status(OK).json(user);
  } catch (e) {
    if (e.name === 'CastError') {
      return res.status(BAD_REQUEST).send({ message: BAD_REQUEST_MESSAGE });
    }
    return res.status(INTERNAL_SERVER_ERROR).json({ message: INTERNAL_SERVER_ERROR_MESSAGE });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(NOT_FOUND).json({ message: NOT_FOUND_MESSAGE_USER });
    }

    return res.status(OK).json(user);
  } catch (e) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: INTERNAL_SERVER_ERROR_MESSAGE });
  }
};

const createUser = async (req, res) => {
  try {
    const {
      name, about, avatar, email, password,
    } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name, about, avatar, email, password: hash,
    });
    return res.status(CREATED).json(user);
  } catch (e) {
    if (e.name === 'ValidationError') {
      const errors = Object.values(e.errors).map((err) => err.message);
      return res.status(BAD_REQUEST).json({ message: errors.join(', ') });
    }
    return res.status(INTERNAL_SERVER_ERROR).json({ message: INTERNAL_SERVER_ERROR_MESSAGE });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, { name, about }, {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    });

    if (!user) {
      return res.status(NOT_FOUND).json({ message: NOT_FOUND_MESSAGE_USER });
    }

    return res.status(OK).json(user);
  } catch (e) {
    if (e.name === 'ValidationError') {
      const errors = Object.values(e.errors).map((err) => err.message);
      return res.status(BAD_REQUEST).json({ message: errors.join(', ') });
    }
    return res.status(INTERNAL_SERVER_ERROR).json({ message: INTERNAL_SERVER_ERROR_MESSAGE });
  }
};

const updateAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, { avatar }, {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    });

    if (!user) {
      return res.status(NOT_FOUND).json({ message: NOT_FOUND_MESSAGE_USER });
    }

    return res.status(OK).json(user);
  } catch (e) {
    if (e.name === 'ValidationError') {
      const errors = Object.values(e.errors).map((err) => err.message);
      return res.status(BAD_REQUEST).json({ message: errors.join(', ') });
    }
    return res.status(INTERNAL_SERVER_ERROR).json({ message: INTERNAL_SERVER_ERROR_MESSAGE });
  }
};

module.exports = {
  login,
  getUsers,
  getUserById,
  getCurrentUser,
  createUser,
  updateUser,
  updateAvatar,
};
