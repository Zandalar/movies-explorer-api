const rateLimit = require('express-rate-limit');
const { limiterErrorText } = require('../config/constants');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { message: limiterErrorText },
});

module.exports = limiter;
