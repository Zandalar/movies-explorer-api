const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const ForbiddenError = require('../errors/ForbiddenError');

function getMovies(req, res, next) {
  Movie.find({}).select('+owner')
    .orFail(new NotFoundError('Фильмы не найдены'))
    .then((movies) => res.status(200).send(movies))
    .catch(next);
}

function createMovie(req, res, next) {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => res.status(200).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError('Введите корректные данные');
      }
      throw err;
    })
    .catch(next);
}

function deleteMovie(req, res, next) {
  Movie.findById(req.params.movieId).select('+owner')
    .orFail(new NotFoundError('Фильма с таким id не существует'))
    .then((movie) => {
      if (req.user._id === movie.owner.toString()) {
        Movie.findByIdAndRemove(req.params.movieId)
          .then((deletedMovie) => res.status(200).send(deletedMovie))
          .catch(next);
      } else {
        throw new ForbiddenError('Нет доступа');
      }
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        throw new ValidationError('Не передан корректный id');
      }
      throw err;
    })
    .catch(next);
}

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
