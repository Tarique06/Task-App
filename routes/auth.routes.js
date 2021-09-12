const controller = require('../controllers/auth.controller');
const requireAuth = require('../middleware/authenticate')
const auth = require('express').Router();

auth.post('/login', controller.login)
auth.post('/logout', requireAuth, controller.logout)

module.exports = auth