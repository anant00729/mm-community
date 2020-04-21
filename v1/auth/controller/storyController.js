const Story = require('../model/Story')
const moment = require('moment')

/* 
 * @route  v1/auth/login 
 * @type   POST 
 * @access public
 */
exports.addStory = async (req,res) => {
  const title = req.body.title || ''
  const content = req.body.content || ''
  const cover_image = req.body.cover_image || ''
  const like_count = req.body.like_count || ''
  const visit_count = req.body.visit_count || ''
  const read_time = req.body.read_time || ''
  const created_at = req.body.created_at || ''
  const updated_at = req.body.updated_at || ''
  const user_id = req.body.user_id || ''
  const story_status = req.body.story_status || ''
  let story = new Story()
  let storyStatus = await story.addStory(
    title,
    content,
    cover_image,
    like_count,
    visit_count,
    read_time,
    created_at,
    updated_at,
    user_id,
    story_status
  )
  res.json(storyStatus)  
}
