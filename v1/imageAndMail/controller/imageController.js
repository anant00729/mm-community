const Image = require('../model/Image')
const moment = require('moment')

/* 
 * @route  v1/image/upload 
 * @type   POST 
 * @access private
 */
exports.uploadImage = async (req,res) => {
  //const addImage =  addImage()
  res.json({status : true , filePath : req.file.location, fileName : req.file.key})
}


