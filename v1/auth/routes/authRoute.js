const express = require('express')
const {login, register, getUserData, logout, getAllUsers} = require('../controller/authController')
const _r = express.Router()

/*
 * Authentication routes
 */
_r.post('/login', login)
_r.post('/register', register)
_r.post('/getUserData', getUserData)
_r.post('/logout', logout)
_r.post('/getAllUsers', getAllUsers)



module.exports = _r