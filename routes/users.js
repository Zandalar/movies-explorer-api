const users = require('express').Router();
const { getUser, updateUser } = require('../controllers/users');

users.get('/me', getUser);
users.patch('/me', updateUser);

module.exports = users;
