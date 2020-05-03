const User = require('../model/User')
const UserSession = require('../model/UserSession')
const moment = require('moment')


/* 
 * @route  v1/auth/login 
 * @type   POST 
 * @access public
 */
exports.login = async (req,res) => {
    const email = req.body.email || ''
    const password = req.body.password || '' 
    let user = new User()
    let emailStatus = await user.findUserByEmailAndPassword(email,password)
    
    if(!emailStatus.status){
      res.json(emailStatus)  
      return 
    }
    let userSession = new UserSession()
    let userSessionResulte = await userSession.createUserSession(emailStatus.data.id)
    emailStatus.data.id = undefined
    userSessionResulte.user = emailStatus.data
    res.json(userSessionResulte)
    
}

/* 
 * @route  v1/auth/register 
 * @type   POST 
 * @access public
 */
exports.register = async (req,res) => {
    const date = moment(new Date()).format('MM/DD/YYYY');
    const name = req.body.name || ''
    const year = req.body.year || ''
    const class_student = req.body.class_student || ''
    const dob = req.body.dob || ''
    const gender = req.body.gender || ''
    const email = req.body.email || ''
    const password = req.body.password || ''
    const social_user_type = 'WEB'
    const type = 'student'
    const profile_image = `https://api.adorable.io/avatars/${email}`
    const user_active = 1
    const created_at = date
    const updated_at = date
    let user = new User()
    let emailStatus = await user.findUserByEmail(email)
    
    if(emailStatus.status){
      res.json({status : false , message : 'user already exist'})  
      return 
    }

    let addStatus = await user.addUserDetails(
      name,
      email,
      type,
      profile_image,
      year,
      class_student,
      dob,
      gender,
      password,
      created_at,
      updated_at,
      social_user_type,
      user_active
    )
    if(!addStatus){
      res.json(addStatus)  
      return
    }

    let userSession = new UserSession()
    let userSessionResulte = await userSession.createUserSession(addStatus.data.id)
    addStatus.data.id = undefined
    userSessionResulte.user = addStatus.data
    res.json(userSessionResulte)
}



/* 
 * @route  v1/auth/getUserData 
 * @type   POST 
 * @access public
 */
exports.getUserData = async (req,res) => {

    const token = req.body.token || ''
    let user = new User()
    let emailStatus = await user.findUserByEmail(email)
    
    if(emailStatus.status){
      res.json({status : false , message : 'user already exist'})  
      return 
    }

    let addStatus = await user.addUserDetails(email, password)
    if(!addStatus){
      res.json(addStatus)  
      return
    }

    let userSession = new UserSession()
    let userSessionResulte = await userSession.createUserSession(addStatus.data.id)
    res.json(userSessionResulte)
}


/* 
 * @route  v1/auth/logout 
 * @type   POST 
 * @access public
 */
exports.logout = async (req,res) => {
  const token = req.body.token || ''
  let userSession = new UserSession()
  let userSessionResulte = await userSession.disposeUserSession(token)
  res.json(userSessionResulte)
}



/* 
 * @route  v1/auth/getAllUsers 
 * @type   POST 
 * @access public
 */
exports.getAllUsers = async (req,res) => {
  const type = req.body.type || 'student'
  let user = new User()
  let userResponse = await user.getAllUsers(type)
  setTimeout(()=> {
    res.json(userResponse)
  }, 1000)
}





