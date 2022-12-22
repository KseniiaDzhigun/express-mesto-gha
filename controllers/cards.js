const Card = require('../models/card');
const User = require('../models/user');
const {
  BAD_REQUEST,
  BAD_REQUEST_MESSAGE,
  NOT_FOUND,
  NOT_FOUND_MESSAGE_CARD,
  INTERNAL_SERVER_ERROR,
  INTERNAL_SERVER_ERROR_MESSAGE,
  OK,
  OK_MESSAGE,
  CREATED,
} = require('../utils/constants');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    return res.status(OK).json(cards);
  } catch (e) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: INTERNAL_SERVER_ERROR_MESSAGE });
  }
};

const deleteCardById = async (req, res) => {
  try {
    const { id } = req.params;

    const cardDeleted = await Card.findByIdAndRemove(id);

    if (!cardDeleted) {
      return res.status(NOT_FOUND).json({ message: NOT_FOUND_MESSAGE_CARD });
    }

    return res.status(OK).json({ message: OK_MESSAGE });
  } catch (e) {
    if (e.name === 'CastError') {
      return res.status(BAD_REQUEST).send({ message: BAD_REQUEST_MESSAGE });
    }
    return res.status(INTERNAL_SERVER_ERROR).json({ message: INTERNAL_SERVER_ERROR_MESSAGE });
  }
};

const createCard = async (req, res) => {
  try {
    const cardOwner = await User.findById(req.user._id);
    const card = await Card.create({ owner: cardOwner, ...req.body });
    return res.status(CREATED).json(card);
  } catch (e) {
    if (e.name === 'ValidationError') {
      const errors = Object.values(e.errors).map((err) => err.message);
      return res.status(BAD_REQUEST).json({ message: errors.join(', ') });
    }
    return res.status(INTERNAL_SERVER_ERROR).json({ message: INTERNAL_SERVER_ERROR_MESSAGE });
  }
};

const putLike = async (req, res) => {
  try {
    const { cardId } = req.params;

    const cardWithLike = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
      { new: true }, // обработчик then получит на вход обновлённую запись
    );

    if (!cardWithLike) {
      return res.status(NOT_FOUND).json({ message: NOT_FOUND_MESSAGE_CARD });
    }

    return res.status(CREATED).json(cardWithLike);
  } catch (e) {
    if (e.name === 'CastError') {
      return res.status(BAD_REQUEST).send({ message: BAD_REQUEST_MESSAGE });
    }
    return res.status(INTERNAL_SERVER_ERROR).json({ message: INTERNAL_SERVER_ERROR_MESSAGE });
  }
};

const removeLike = async (req, res) => {
  try {
    const { cardId } = req.params;

    const cardWithoutLike = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: req.user._id } }, // убрать _id из массива
      { new: true }, // обработчик then получит на вход обновлённую запись
    );

    if (!cardWithoutLike) {
      return res.status(NOT_FOUND).json({ message: NOT_FOUND_MESSAGE_CARD });
    }

    return res.status(OK).json(cardWithoutLike);
  } catch (e) {
    if (e.name === 'CastError') {
      return res.status(BAD_REQUEST).send({ message: BAD_REQUEST_MESSAGE });
    }
    return res.status(INTERNAL_SERVER_ERROR).json({ message: INTERNAL_SERVER_ERROR_MESSAGE });
  }
};

module.exports = {
  getCards,
  deleteCardById,
  createCard,
  putLike,
  removeLike,
};
