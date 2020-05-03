const express = require('express')
const { addStory, getStory, getAllStories , incrementStoryCount} = require('../controller/storyController')
const { authorizeUser } = require('../../middleware/CheckUserPresent')
const _r = express.Router()

/*
 * Authentication required
 */
_r.post('/addStory', authorizeUser , addStory)
_r.post('/getStory',  getStory)
_r.post('/incrementStoryCount',  incrementStoryCount)
_r.post('/getAllStories',  getAllStories)



module.exports = _r