const { celebrate, Joi } = require('celebrate');
const {
  requiredErrorText,
  emailErrorText,
  passwordErrorText,
  linkErrorText,
  urlRegEx,
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
    duration: Joi.string().required()
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
    image: Joi.string().required().regex(urlRegEx)
      .messages({
        'any.required': requiredErrorText,
        'string.regex': linkErrorText,
      }),
    trailer: Joi.string().required().regex(urlRegEx)
      .messages({
        'any.required': requiredErrorText,
        'string.regex': linkErrorText,
      }),
    thumbnail: Joi.string().required().regex(urlRegEx)
      .messages({
        'any.required': requiredErrorText,
        'string.regex': linkErrorText,
      }),
    owner: Joi.string().required()
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
        'any.required': requiredErrorText,
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

module.exports = {
  moviesAddValidation,
  moviesDeleteValidation,
  registrationValidation,
  loginValidation,
};
