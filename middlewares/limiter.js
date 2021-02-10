const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 1000 * 60 * 10,
  max: 100,
});

module.exports = limiter;
