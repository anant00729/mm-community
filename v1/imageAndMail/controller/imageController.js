const Image = require('../model/Image')
const moment = require('moment')

/* 
 * @route  v1/image/upload 
 * @type   POST 
 * @access private
 */
exports.uploadImage = async (req,res) => {

  const type = req.body.type || ''
  
  if(!req.file.location){
    res.json({status : false , message : 'Error while uploading image to bucket'})
    return 
  }

  const imageObj = new Image()
  const imageStatus = await imageObj.addImage(req.file.location, type)
  res.json(imageStatus)
}


