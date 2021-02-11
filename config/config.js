const {
  NODE_ENV,
  JWT_SECRET,
  PORT = 3000,
} = process.env;

const mongooseParams = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

module.exports = {
  JWT_SECRET: NODE_ENV === 'production' ? JWT_SECRET : 'vodka-bear-balalayka',
  MONGO_URL: 'mongodb://localhost:27017/moviesdb',
  PORT,
  mongooseParams,
};
