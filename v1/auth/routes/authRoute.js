const express = require('express')
const {login, register} = require('../controller/authController')
const _r = express.Router()

/*
 * Authentication routes
 */
_r.post('/login', login)
_r.post('/register', register)


module.exports = _r