const db = require('../../../config/database')
const moment = require('moment')

class Image{
  
  async addImage(image_path, type)
  {

    const finalized = 0
    const date = moment(new Date()).format('MM/DD/YYYY');
    const created_at = date
    const updated_at = date

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
      await db.query(q1,{ replacements : { 
        finalized,
        image_path,
        created_at,
        updated_at,
        type
      } })
      return { status : true , message : 'Image Added Successfully', image_path }
    } catch (error) {
      return { status : false , message : error.message }
    }
  }

  async updateImageByURL(image_path, finalized){
    let q1 = `UPDATE public.image
    SET finalized=(:finalized)
    WHERE image_path=(:image_path);`
    try {
        let res_d = await db.query(q1,{ replacements : {  finalized, image_path } })
        if(res_d[0].length === 0){
          return { status : false , message : 'Image not updated'  }
        }else {
          return { status : true , message : 'Image updated' }
        }
      } catch (error) {
        return { status : false , message : error.message }
      }
  }
}
module.exports = Image