const User = require('../model/User')
const UserSession = require('../model/UserSession')



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
    res.json(userSessionResulte)
    
}

/* 
 * @route  v1/auth/register 
 * @type   POST 
 * @access public
 */
exports.register = async (req,res) => {

  const email = req.body.email || ''
    const password = req.body.password || ''
    let user = new User()
    let emailStatus = await user.findUserByEmail(email)
    
    if(emailStatus.status){
      res.json({status : false , message : 'user already exist'})  
      return 
    }

    let addStatus = await user.addEmailAndPassword(email, password)
    if(!addStatus){
      res.json(addStatus)  
      return
    }

    let userSession = new UserSession()
    let userSessionResulte = await userSession.createUserSession(addStatus.data.id)
    res.json(userSessionResulte)
}