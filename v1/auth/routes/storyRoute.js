const express = require("express");
const {
  addStory,
  getStory,
  getAllStories,
  incrementStoryCount,
  getUserStories,
  updateStoryStatusByStoryId,
  getAllAdminStories,
} = require("../controller/storyController");
const { authorizeUser } = require("../../middleware/CheckUserPresent");
const _r = express.Router()

/*
 * Authentication required
 */
_r.post("/addStory", authorizeUser, addStory);
_r.post("/getStory", getStory);
_r.post("/incrementStoryCount", incrementStoryCount);
_r.post("/getAllStories", getAllStories);
_r.post("/getUserStories", authorizeUser, getUserStories);

/**
 * All Routes for Admin Only
 */
_r.post("/updateStoryStatusByStoryId", authorizeUser,updateStoryStatusByStoryId);
_r.post("/getAllAdminStories", authorizeUser, getAllAdminStories);

module.exports = _r;
