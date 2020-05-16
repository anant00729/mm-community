const express = require("express");
const {
  addStory,
  getStory,
  getAllStories,
  incrementStoryCount,
  getUserStories,
  getPublishedStory,
  getPendingStories,
  publishStoryByID,
} = require("../controller/storyController");
const { authorizeUser } = require("../../middleware/CheckUserPresent");
const _r = express.Router();

/*
 * Authentication required
 */
_r.post("/addStory", authorizeUser, addStory);
_r.post("/getStory", getStory);
_r.post("/incrementStoryCount", incrementStoryCount);
_r.post("/getAllStories", getAllStories);
_r.post("/getUserStories", authorizeUser, getUserStories);
_r.post("/getPublishedStory", authorizeUser, getPublishedStory);
_r.post("/getPendingStories", authorizeUser, getPendingStories);
_r.post("/publishStoryByID", authorizeUser, publishStoryByID);

module.exports = _r;
