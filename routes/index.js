const router = require('express').Router();
const movies = require('./movies');
const users = require('./users');
const NotFoundError = require('../errors/NotFoundError');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');

app.post('/signin', login);
app.post('/signup', createUser);

router.use(auth);

router.use('/movies', movies);
router.use('/users', users);
router.use('/*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
