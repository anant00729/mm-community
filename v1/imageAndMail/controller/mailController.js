const Image = require('../model/Image')
const moment = require('moment')
const ejs = require('ejs')
const transporter = require('../../../config/mailConfig')
const User = require('../../auth/model/User')

/* 
 * @route  v1/image/sendMailToAll 
 * @type   POST 
 * @access private
 */
exports.sendMailToAll = async (req,res) => {
  


  let user = new User()
  let allUsers = await user.findAll()

  let sendMailPromiseArr = []

  for(u of allUsers.data){
    sendMailPromiseArr.push(sendMailPromise(u.name , u.password , u.email))
  }


  Promise.all(sendMailPromiseArr).then(function(values) {
    res.json(values)
    console.log('values :>> ', values);
  }).catch(err => {
    console.log('err :>> ', err.message);
  })
  

  // let updateArray = []

  // for(u of allUsers.data){
  //   let password = makePassword(6)
  //   updateArray.push(user.updateUserPassword(u.id , password))
  // }

  // Promise.all(updateArray).then(function(values) {
  //   console.log('values :>> ', values);
  // })

  //res.json(allUsers)
  

  
  
}


const sendMailPromise = (name, password , email) => {
  const _path = `${__dirname}/../../../public/test.ejs`
  return new Promise((resolve , reject)=> {
    const userTemplate = {
      name,
      pass : password,
      email
    }
    ejs.renderFile(_path, {userTemplate} , (error , result) => {
      if(error){
        reject({status : false , message : error.message})
      }
      const mailOptions = {
        from : 'anantarnav007@gmail.com',
        to : email,
        subject : 'Hi-Story Enrolment - Confidential - DO NOT SHARE',
        html : result
      }
      transporter.sendMail(mailOptions, (error, info) => {
        if(error){
          reject({status : false , message : error.message})
        }
        if(info){
          resolve({status : true , info, password})
        }
      })
    })
  })
}


const makePassword = (length) => {
  var result           = '';
  var characters       = '0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
} 



