const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const ReqError = require('../errors/ReqError');
const ConflictError = require('../errors/ConflictError');

const { NODE_ENV, JWT_SECRET } = process.env;

function getUser(req, res, next) {
  User.findById(req.user._id)
    .orFail(new NotFoundError('Такой пользователь не найден'))
    .then((user) => res.status(200).send(user))
    .catch(next);
}

function createUser(req, res, next) {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.status(200).send({
      _id: user._id,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ReqError('Введены некорректные данные');
      } else if (err.code === 11000 && err.name === 'MongoError') {
        throw new ConflictError('Такой пользователь уже зарегистрирован');
      }
      throw err;
    })
    .catch(next);
}

function updateUser(req, res, next) {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, {
    new: true,
    runValidators: true,
  })
    .orFail(new NotFoundError('Нет юзера с таким id'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ReqError('Введите корректные данные');
      }
      throw err;
    })
    .catch(next);
}

function login(req, res, next) {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'vodka-bear-balalayka',
        { expiresIn: '7d' },
      );
      res.status(200).send({ token });
    })
    .catch(next);
}

module.exports = {
  getUser,
  createUser,
  updateUser,
  login,
};
