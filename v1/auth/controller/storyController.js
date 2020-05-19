const Story = require("../model/Story");
const moment = require("moment");
const Image = require("../../imageAndMail/model/Image");

/*
 * @route  v1/story/login
 * @type   POST
 * @access public
 */
exports.addStory = async (req, res) => {
  const date = moment(new Date()).format("MM/DD/YYYY");
  const title = req.body.title || "";
  const content = req.body.content || [];
  const cover_image = req.body.cover_image || "";
  const like_count = req.body.like_count || 0;
  const visit_count = req.body.visit_count || 0;
  const read_time = req.body.read_time || "2 min";
  const created_at = date;
  const updated_at = date;
  const user_id = req.user.user_id || "";
  const story_status = req.body.story_status || -1;

  let story = new Story();
  let storyExist = await story.findStoryByBannerImage(cover_image.image);
  if (!storyExist.status) {
    res.json(storyExist);
    return;
  }

  const imageObj = new Image();
  let imgUrls = content.reduce((acc, cur) => {
    return (acc +=
      cur.selectType == "Image" ? `image_path = '${cur.input}' OR ` : acc);
  }, "");
  imgUrls += `image_path = '${cover_image.image}'`;
  imageObj.updateImageByURL(imgUrls, 1);

  let storyStatus = await story.addStory(
    title,
    content,
    cover_image.image,        
    visit_count,
    read_time,
    created_at,
    updated_at,
    user_id,
    story_status,
    like_count
  );
  res.json(storyStatus);
};

/*
 * @route  v1/story/getStory
 * @type   POST
 * @access public
 */
exports.getStory = async (req, res) => {
  const storyId = req.body.storyId || "";
  let story = new Story();
  let storyStatus = await story.findStoryByStoryId(storyId);

  setTimeout(async () => {
    if (storyStatus.status) {
      let visit_count = storyStatus.data.visit_count + 1;
      await story.incrementStoryCount(storyStatus.data.id, visit_count);
    }
    res.json(storyStatus);
  }, 1000);
};

/*
 * @route  v1/story/getAllStories
 * @type   POST
 * @access public
 */
exports.getAllStories = async (req, res) => {
  const isForUser = req.body.isForUser || false;
  let story = new Story();
  let storyStatus = await story.findStoryAllStories(isForUser, 15, 1);
  setTimeout(() => {
    res.json(storyStatus);
  }, 1000);
};

/*
 * @route  v1/story/incrementStoryCount
 * @type   POST
 * @access public
 */
exports.incrementStoryCount = async (req, res) => {
  const storyId = req.body.storyId || false;
  let visit_count = req.body.visit_count || -1;
  visit_count += 1;
  let story = new Story();
  let storyStatus = await story.incrementStoryCount(storyId, visit_count);
  res.json(storyStatus);
};

/*
 * @route  v1/story/incrementStoryCount
 * @type   POST
 * @access public
 */
exports.incrementStoryCount = async (req, res) => {
  const storyId = req.body.storyId || false;
  let visit_count = req.body.visit_count || -1;
  visit_count += 1;
  let story = new Story();
  let storyStatus = await story.incrementStoryCount(storyId, visit_count);
  res.json(storyStatus);
};

/*
 * @route  v1/story/getUserStories
 * @type   POST
 * @access public
 */
exports.getUserStories = async (req, res) => {
  const user_id = req.user.user_id || "";
  let story = new Story();
  let storyStatus = await story.getStoryByUserId(user_id);
  setTimeout(() => {
    res.json(storyStatus);
  }, 1000);
};

/*
 * @route  v1/story/updateStoryStatusByStoryId
 * @type   POST
 * @access public
 */
exports.updateStoryStatusByStoryId = async (req, res) => {
  const storyId = req.body.story_id || 0;
  let story_status = req.body.story_status || -1;
  let story = new Story();
  let publishedStoryByAdmin = await story.updateStoryStatusByStoryId(storyId, story_status);
  res.json(publishedStoryByAdmin);
};


/*
 * @route  v1/story/getAllAdminStories
 * @type   POST
 * @access public
 */
exports.getAllAdminStories = async (req, res) => {
  let story_status = req.body.story_status || -1;
  let story = new Story();
  let storyObj = await story.getAllPublishedOrPendingStories(story_status);
  setTimeout(() => {
    res.json(storyObj);
  }, 1000);
};