const db = require('../../../config/database')
const isEmpty = require('../../../utils/is-empty')

class Story {

  async addStory(
    title,
    content,
    cover_image,
    visit_count,
    read_time,
    created_at,
    updated_at,
    user_id,
    story_status,
    like_count){

    let q1 = `
    INSERT INTO public.story(
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
      VALUES (
      (:title),
      (:content),
      (:cover_image),
      (:visit_count),
      (:read_time),
      (:created_at),
      (:updated_at),
      (:user_id),
      (:story_status),
      (:like_count)
    );` 
        
     try {
      let res_d = await db.query(q1,{ replacements : { 
        title,
        content : JSON.stringify(content),
        cover_image,
        visit_count,
        read_time,
        created_at,
        updated_at,
        user_id,
        story_status,
        like_count
      } })
      return { status : true , message : 'Story Added Successfully', data: res_d[0][0] }
    } catch (error) {
      return { status : false , message : error.message }
    }
  }


  async findStoryByStoryId(storyId){
    let q1 = `SELECT 
      *
      from story WHERE id = (:id)`
    try {
        let res_d = await db.query(q1,{ replacements : { id : storyId } })
        if(res_d[0].length === 0){
          return { status : false , message : 'Story not Found'  }
        }else {
          return { status : true , message : 'Story Found' , data : res_d[0][0] }
        }
      } catch (error) {
        return { status : false , message : error.message }
      }
  }

  async findStoryByBannerImage(cover_image){
    let q1 = `SELECT 
      *
      from story WHERE cover_image = (:cover_image)`
    try {
        let res_d = await db.query(q1,{ replacements : { cover_image } })
        if(res_d[0].length === 0){
          return { status : true }
        }else {
          return { status : false, message : 'Story aleady added' }
        }
      } catch (error) {
        return { status : false , message : error.message }
      }
  }

  async findStoryAllStories(isForUser , pageLimit = 15, pageNumber = 1){
    let skipCount = pageLimit * (pageNumber - 1)


    
    let q1 = `SELECT
    *
    FROM
    public.story a
    INNER JOIN public.user u ON  a.user_id = u.id LIMIT (:pageLimit) OFFSET (:skipCount);`
    try {
        let res_d = await db.query(q1,{replacements : {pageLimit, skipCount}})
        if(res_d[0].length === 0){
          return { status : false , message : 'Stories not Found'  }
        }else {
          return { status : true , message : 'Stories Found' , data : res_d[0] }
        }
      } catch (error) {
        return { status : false , message : error.message }
      }
  }
}

module.exports = Story