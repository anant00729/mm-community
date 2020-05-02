const Image = require('../model/Image')
const config = require('config')
const IMAGE_BASE_URL = config.get('imageBaseUrl')

/* 
 * @route  v1/image/upload 
 * @type   POST 
 * @access private
 */
exports.uploadImage = async (req,res) => {

  const type = req.body.type || ''
  
  if(!req.file.key){
    res.json({status : false , message : 'Error while uploading image to bucket'})
    return 
  }

  const imageObj = new Image()
  const imageStatus = await imageObj.addImage(req.file.key, type)
  res.json(imageStatus)
}


