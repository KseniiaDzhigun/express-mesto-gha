const User = require('../models/user');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json(users);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Произошла ошибка' });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Произошла ошибка' });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;
    const user = await User.create({ name, about, avatar });
    return res.status(201).json(user);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Произошла ошибка' });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
};
