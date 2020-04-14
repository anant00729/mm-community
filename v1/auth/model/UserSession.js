const db = require('../../../config/database')
const moment = require('moment')

class UserSession {

  async createUserSession(user_id = '', device_type = 'web'){
    const token = this.makeid(29)
    const currentDate = moment().format('YYYY-MM-DD h:mm:ss a');
    let q1 = `INSERT INTO public."user_session"(
      "refresh_token",
      "created_at", 
      "updated_at",
      "user_id",
      "device_type"
    ) VALUES (
      (:refresh_token),
      (:created_at),
      (:updated_at),
      (:user_id),
      (:device_type)
      );`    
    try {
        let res_d = await db.query(q1,{ 
          replacements : { 
            refresh_token: token , 
            created_at : currentDate , 
            updated_at : currentDate, 
            user_id, device_type } })
        return { status : true , message : '' , data : token }
      } catch (error) {
        return { status : false , message : error.message }
      }
  }

  makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  } 

 
}

module.exports = UserSession