const User = require('../models/user');
const {
  BAD_REQUEST,
  BAD_REQUEST_MESSAGE,
  NOT_FOUND,
  NOT_FOUND_MESSAGE_USER,
  INTERNAL_SERVER_ERROR,
  INTERNAL_SERVER_ERROR_MESSAGE,
  OK,
  CREATED,
} = require('../utils/constants');

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

const createUser = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;
    const user = await User.create({ name, about, avatar });
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
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
};
