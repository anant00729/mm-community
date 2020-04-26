const Image = require('../model/Image')
const moment = require('moment')
const ejs = require('ejs')
const transporter = require('../../../config/mailConfig')

/* 
 * @route  v1/image/sendMail 
 * @type   POST 
 * @access private
 */
exports.sendMail = async (req,res) => {
  const _path = `${__dirname}/../../../public/test.ejs`
  const userTemplate = {
    name : 'Sumit'
  }

  console.log('_path :>> ', _path);
  ejs.renderFile(_path, {userTemplate} , (error , result) => {
    if(error){
      console.log('error', error)
      res.json(error)
    }
    const mailOptions = {
      from : 'anantarnav007@gmail.com',
      to : 'anant.awasthy29@gmail.com',
      subject : 'Test Subject',
      html : result
    }
    transporter.sendMail(mailOptions, (error, info) => {
      if(error){
        res.json(error)
        console.log('error', error)
      }
      if(info){
        console.log('info', info)
        res.json(info)
      }
    })
  })
}


