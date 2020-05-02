const db = require('../../../config/database')
const isEmpty = require('../../../utils/is-empty')

class User {
  
  async findUserByEmailAndPassword(email,password){
    let q1 = `SELECT 
      id,
      name,
      email,
      type,
      profile_image,
      year,
      class_student,
      dob,
      gender
      from public."user"	WHERE email = (:email) AND password = (:password)`
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


  async addUserDetails(
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
  ){

    let q1 = `
      INSERT INTO public."user"(
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
        user_active)
        VALUES (
          (:name),
          (:email),
          (:type),
          (:profile_image),
          (:year),
          (:class_student),
          (:dob),
          (:gender),
          (:password),
          (:created_at),
          (:updated_at),
          (:social_user_type),
          (:user_active)
        ) RETURNING id,
        name,
        email,
        type,
        profile_image,
        year,
        class_student,
        dob,
        gender
        ;` 
        
     try {
      let res_d = await db.query(q1,{ replacements : { 
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
      } })
      return { status : true , message : 'User Added Successfully', data: res_d[0][0] }
    } catch (error) {
      return { status : false , message : error.message }
    }
  }

  async getAllUsers(){
    let q1 = `SELECT * from public."user"`
    try {
        let res_d = await db.query(q1)
        if(res_d[0].length === 0){
          return { status : false , message : 'User not Found'  }
        }else {
          return { status : true , message : 'User Found' , data : res_d[0] }
        }
        
      } catch (error) {
        return { status : false , message : error.message }
      }
  }
}

module.exports = User