const express = require('express')
const { addStory, getStory } = require('../controller/storyController')
const { authorizeUser } = require('../../middleware/CheckUserPresent')
const _r = express.Router()

/*
 * Authentication required
 */
_r.post('/addStory', authorizeUser , addStory)
_r.post('/getStory',  getStory)



module.exports = _r