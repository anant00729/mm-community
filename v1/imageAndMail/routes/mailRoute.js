const express = require('express')
const {sendMailToAll} = require('../controller/mailController')
const _r = express.Router()

/*
 *  Send Mail Routes
 */
_r.get('/sendMailToAll', sendMailToAll)

module.exports = _r