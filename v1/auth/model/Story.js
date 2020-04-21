const db = require('../../../config/database')
const isEmpty = require('../../../utils/is-empty')

class Story {

  async addStory(
    title,
    content,
    cover_image,
    like_count,
    visit_count,
    read_time,
    created_at,
    updated_at,
    user_id,
    story_status){

    let q1 = `
    INSERT INTO public.story(
      title, 
      content, 
      cover_image, 
      like_count, 
      visit_count, 
      read_time, 
      created_at, 
      updated_at, 
      user_id, 
      story_status)
      VALUES (
      (:title),
      (:content),
      (:cover_image),
      (:like_count),
      (:visit_count),
      (:read_time),
      (:created_at),
      (:updated_at),
      (:user_id),
      (:story_status)
    );` 
        
     try {
      let res_d = await db.query(q1,{ replacements : { 
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
      } })
      return { status : true , message : 'Story Added Successfully', data: res_d[0][0] }
    } catch (error) {
      return { status : false , message : error.message }
    }
  }
}

module.exports = Story