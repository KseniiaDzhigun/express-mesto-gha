const Card = require('../models/card');
const User = require('../models/user');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    return res.status(200).json(cards);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Произошла ошибка' });
  }
};

const deleteCardById = async (req, res) => {
  try {
    const { id } = req.params;
    await Card.findByIdAndRemove(id);

    return res.status(200).json({ message: 'Пост удалён' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Произошла ошибка' });
  }
};

const createCard = async (req, res) => {
  try {
    const cardOwner = await User.findById(req.user._id);
    const card = await Card.create({ owner: cardOwner, ...req.body });
    return res.status(201).json(card);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Произошла ошибка' });
  }
};

module.exports = {
  getCards,
  deleteCardById,
  createCard,
};
