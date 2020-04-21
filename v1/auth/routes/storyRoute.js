const express = require('express')
const { addStory } = require('../controller/storyController')
const { authorizeUser } = require('../../middleware/CheckUserPresent')
const _r = express.Router()

/*
 * Authentication required
 */
_r.post('/addStory', authorizeUser , addStory)


module.exports = _r