const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const {
  requiredErrorText,
  emailErrorText,
  passwordErrorText,
  linkErrorText,
  passRegEx,
} = require('../config/constants');

const moviesAddValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required()
      .messages({
        'any.required': requiredErrorText,
      }),
    director: Joi.string().required()
      .messages({
        'any.required': requiredErrorText,
      }),
    duration: Joi.number().required()
      .messages({
        'any.required': requiredErrorText,
      }),
    year: Joi.string().required()
      .messages({
        'any.required': requiredErrorText,
      }),
    description: Joi.string().required()
      .messages({
        'any.required': requiredErrorText,
      }),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message(linkErrorText);
    })
      .messages({
        'any.required': requiredErrorText,
      }),
    trailer: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message(linkErrorText);
    })
      .messages({
        'any.required': requiredErrorText,
      }),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message(linkErrorText);
    })
      .messages({
        'any.required': requiredErrorText,
      }),
    nameRU: Joi.string().required()
      .messages({
        'any.required': requiredErrorText,
      }),
    nameEN: Joi.string().required()
      .messages({
        'any.required': requiredErrorText,
      }),
  }),
});

const moviesDeleteValidation = celebrate({
  body: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
});

const registrationValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.required': requiredErrorText,
        'string.min': 'Это поле должно содержать не менее 2 символов',
        'string.max': 'Это поле должно содержать не более 30 символов',
      }),
    email: Joi.string().required().email()
      .messages({
        'string.email': emailErrorText,
        'any.required': requiredErrorText,
      }),
    password: Joi.string().min(5).required().regex(passRegEx)
      .messages({
        'any.required': requiredErrorText,
        'string.min': 'Это поле должно содержать не менее 5 символов',
        'string.regex': passwordErrorText,
      }),
  }),
});

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages({
        'string.email': emailErrorText,
        'any.required': requiredErrorText,
      }),
    password: Joi.string().min(5).required().regex(passRegEx)
      .messages({
        'any.required': requiredErrorText,
        'string.min': 'Это поле должно содержать не менее 5 символов',
        'string.regex': passwordErrorText,
      }),
  }),
});

const userValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.required': requiredErrorText,
        'string.min': 'Это поле должно содержать не менее 2 символов',
        'string.max': 'Это поле должно содержать не более 30 символов',
      }),
    email: Joi.string().required().email()
      .messages({
        'string.email': emailErrorText,
        'any.required': requiredErrorText,
      }),
  }),
});

module.exports = {
  moviesAddValidation,
  moviesDeleteValidation,
  registrationValidation,
  loginValidation,
  userValidation,
};
