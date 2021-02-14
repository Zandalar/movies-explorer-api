const mongoose = require('mongoose');
const validator = require('validator');
const { linkErrorText } = require('../constants/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        return validator.isURL(url);
      },
      message: linkErrorText,
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        return validator.isURL(url);
      },
      message: linkErrorText,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        return validator.isURL(url);
      },
      message: linkErrorText,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
