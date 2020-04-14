const db = require('../../../config/database')
const isEmpty = require('../../../utils/is-empty')

class User {
  
  async findUserByEmailAndPassword(email,password){
    let q1 = `SELECT * from public."user"	WHERE email = (:email) AND password = (:password)`
    try {
        let res_d = await db.query(q1,{ replacements : { email, password } })
        if(res_d[0].length === 0){
          return { status : false , message : 'User not Found'  }
        }else {
          return { status : true , message : 'User Found' , data : res_d[0][0] }
        }
      } catch (error) {
        return { status : false , message : error.message }
      }
  }

  async findUserByEmail(email){
    let q1 = `SELECT * from public."user"	WHERE email = (:email)`
    try {
        let res_d = await db.query(q1,{ replacements : { email } })
        if(res_d[0].length === 0){
          return { status : false , message : 'User not Found'  }
        }else {
          return { status : true , message : 'User Found' , data : res_d[0][0] }
        }
        
      } catch (error) {
        return { status : false , message : error.message }
      }
  }


  async addEmailAndPassword(email , password){
     let q1 = `INSERT INTO public."user"( "email", "password") VALUES ((:email),(:password)) RETURNING id;`    
     try {
      let res_d = await db.query(q1,{ replacements : { email , password} })
      return { status : true , message : 'User Added Successfully', data: res_d[0][0] }
    } catch (error) {
      return { status : false , message : error.message }
    }
  }
}

module.exports = User