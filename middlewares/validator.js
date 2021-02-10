const { celebrate, Joi } = require('celebrate');

const moviesAddValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required()
      .messages({
        'any.required': 'Необходимо заполнить это поле',
      }),
    director: Joi.string().required()
      .messages({
        'any.required': 'Необходимо заполнить это поле',
      }),
    duration: Joi.string().required()
      .messages({
        'any.required': 'Необходимо заполнить это поле',
      }),
    year: Joi.string().required()
      .messages({
        'any.required': 'Необходимо заполнить это поле',
      }),
    description: Joi.string().required()
      .messages({
        'any.required': 'Необходимо заполнить это поле',
      }),
    image: Joi.string().required()
      .messages({
        'any.required': 'Необходимо заполнить это поле',
      }),
    trailer: Joi.string().required()
      .messages({
        'any.required': 'Необходимо заполнить это поле',
      }),
    thumbnail: Joi.string().required()
      .messages({
        'any.required': 'Необходимо заполнить это поле',
      }),
    owner: Joi.string().required()
      .messages({
        'any.required': 'Необходимо заполнить это поле',
      }),
    nameRU: Joi.string().required()
      .messages({
        'any.required': 'Необходимо заполнить это поле',
      }),
    nameEN: Joi.string().required()
      .messages({
        'any.required': 'Необходимо заполнить это поле',
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
        'any.required': 'Заполните это поле',
        'string.min': 'Это поле должно содержать не менее 2 символов',
        'string.max': 'Это поле должно содержать не более 30 символов',
      }),
    email: Joi.string().required().email()
      .message('Введите корректный email')
      .messages({
        'any.required': 'Заполните это поле',
      }),
    password: Joi.string().min(5).required().pattern(/^\S+$/)
      .message('Пароль не должен содержать пробелы')
      .messages({
        'any.required': 'Заполните это поле',
        'string.min': 'Это поле должно содержать не менее 5 символов',
      }),
  }),
});

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message('Введите корректный email')
      .messages({
        'any.required': 'Заполните это поле',
      }),
    password: Joi.string().min(5).required().pattern(/^\S+$/)
      .message('Пароль не должен содержать пробелы')
      .messages({
        'any.required': 'Заполните это поле',
        'string.min': 'Это поле должно содержать не менее 5 символов',
      }),
  }),
});

module.exports = {
  moviesAddValidation,
  moviesDeleteValidation,
  registrationValidation,
  loginValidation,
};
