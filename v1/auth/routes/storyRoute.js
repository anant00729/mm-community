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
  getPublishedStories,
} = require("../controller/storyController");
const { authorizeUser } = require("../../middleware/CheckUserPresent");

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
_r.post("/getPublishedStories", getPublishedStories);

module.exports = _r;
