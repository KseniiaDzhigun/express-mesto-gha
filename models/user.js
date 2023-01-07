const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 2,
      maxLength: 30,
      default: 'Жак-Ив Кусто',
    },
    about: {
      type: String,
      minLength: 2,
      maxLength: 30,
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: (email) => validator.isEmail(email),
        message: (props) => `${props.value} не валидный email!`,
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      select: false,
    },
  },
  { versionKey: false },
);

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
