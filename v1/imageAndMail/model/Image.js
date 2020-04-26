const db = require('../../../config/database')

class Image{
  
  async addImage()
  {
    let q1 = `INSERT INTO public.image(
      finalized, 
      image_path, 
      created_at, 
      updated_at, 
      type)
      VALUES (
      (:finalized),
      (:image_path),
      (:created_at),
      (:updated_at),
      (:type)
      );` 
        
     try {
      let res_d = await db.query(q1,{ replacements : { 
        finalized,
        image_path,
        created_at,
        updated_at,
        type
      } })
      return { status : true , message : 'User Added Successfully', data: res_d[0][0] }
    } catch (error) {
      return { status : false , message : error.message }
    }
  }
}


module.exports = Image