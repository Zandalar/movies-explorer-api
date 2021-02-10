const router = require('express').Router();
const movies = require('./movies');
const users = require('./users');
const NotFoundError = require('../errors/NotFoundError');
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const { registrationValidation, loginValidation } = require('../middlewares/validator');

router.post('/signin', loginValidation, login);
router.post('/signup', registrationValidation, createUser);

router.use(auth);

router.use('/movies', movies);
router.use('/users', users);
router.use('/*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
