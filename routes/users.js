const users = require('express').Router();
const { getUser, updateUser } = require('../controllers/users');

users.get('/me', getUser);

users.put('/me', updateUser);

module.exports = users;
