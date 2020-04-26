const express = require('express')
const {uploadImage} = require('../controller/imageController')
const uploadS3 = require('../../../config/imageConfig')
const _r = express.Router()

/*
 * Upload Image
 */
_r.post('/uploadImage', uploadS3.single('image') , uploadImage)

module.exports = _r