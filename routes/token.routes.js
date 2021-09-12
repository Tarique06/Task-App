const Token = require('../controllers/token.controller')
var tokenRoutes = require("express").Router();

tokenRoutes.post("/", Token.findAll);

module.exports = tokenRoutes