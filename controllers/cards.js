const Card = require('../models/card');
const User = require('../models/user');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    return res.status(200).json(cards);
  } catch (e) {
    return res.status(500).json({ message: 'Произошла ошибка' });
  }
};

const deleteCardById = async (req, res) => {
  try {
    const { id } = req.params;
    const card = await Card.findById(id);

    if (!card) {
      return res.status(404).json({ message: 'Карточка не найдена' });
    }

    await Card.findByIdAndRemove(id);

    return res.status(200).json({ message: 'Пост удалён' });
  } catch (e) {
    if (e.name === 'CastError') {
      return res.status(400).send({ message: 'Передан невалидный id карточки' });
    }
    return res.status(500).json({ message: 'Произошла ошибка' });
  }
};

const createCard = async (req, res) => {
  try {
    const cardOwner = await User.findById(req.user._id);
    const card = await Card.create({ owner: cardOwner, ...req.body });
    return res.status(201).json(card);
  } catch (e) {
    if (e.name === 'ValidationError') {
      const errors = Object.values(e.errors).map((err) => err.message);
      return res.status(400).json({ message: errors.join(', ') });
    }
    return res.status(500).json({ message: 'Произошла ошибка' });
  }
};

const putLike = async (req, res) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findById(cardId);

    if (!card) {
      return res.status(404).json({ message: 'Карточка не найдена' });
    }

    const cardWithLike = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
      { new: true }, // обработчик then получит на вход обновлённую запись
    );
    return res.status(201).json(cardWithLike);
  } catch (e) {
    if (e.name === 'ValidationError') {
      const errors = Object.values(e.errors).map((err) => err.message);
      return res.status(400).json({ message: errors.join(', ') });
    }
    if (e.name === 'CastError') {
      return res.status(400).send({ message: 'Передан невалидный id карточки' });
    }
    return res.status(500).json({ message: 'Произошла ошибка' });
  }
};

const removeLike = async (req, res) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findById(cardId);

    if (!card) {
      return res.status(404).json({ message: 'Карточка не найдена' });
    }
    const cardWithoutLike = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: req.user._id } }, // убрать _id из массива
      { new: true }, // обработчик then получит на вход обновлённую запись
    );
    return res.status(200).json(cardWithoutLike);
  } catch (e) {
    if (e.name === 'ValidationError') {
      const errors = Object.values(e.errors).map((err) => err.message);
      return res.status(400).json({ message: errors.join(', ') });
    }
    if (e.name === 'CastError') {
      return res.status(400).send({ message: 'Передан невалидный id пользователя' });
    }
    return res.status(500).json({ message: 'Произошла ошибка' });
  }
};

module.exports = {
  getCards,
  deleteCardById,
  createCard,
  putLike,
  removeLike,
};
