const Story = require('../model/Story')
const moment = require('moment')


/* 
 * @route  v1/auth/login 
 * @type   POST 
 * @access public
 */
exports.addStory = async (req,res) => {
  const date = moment(new Date()).format('MM/DD/YYYY');
  const title = req.body.title || ''
  const content = req.body.content || []
  const cover_image = req.body.cover_image || ''
  const like_count = req.body.like_count || 0
  const visit_count = req.body.visit_count || 0
  const read_time = req.body.read_time || '2 min'
  const created_at = date
  const updated_at = date
  const user_id = req.user.user_id || ''
  const story_status = req.body.story_status || -1
  let story = new Story()
  let storyStatus = await story.addStory(
    title,
    content,
    cover_image,
    visit_count,
    read_time,
    created_at,
    updated_at,
    user_id,
    story_status,
    like_count
  )
  res.json(storyStatus)  
}


/* 
 * @route  v1/auth/getStory 
 * @type   POST 
 * @access public
 */
exports.getStory = async (req,res) => {
  const storyId = req.body.storyId || ''
  let story = new Story()
  let storyStatus = await story.findStoryByStoryId(storyId)
  res.json(storyStatus)  
}



