const express = require('express')
const {sendMail} = require('../controller/mailController')
const _r = express.Router()

/*
 *  Send Mail Routes
 */
_r.post('/sendMail', sendMail)

module.exports = _r