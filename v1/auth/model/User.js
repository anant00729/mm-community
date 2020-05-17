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

  async getAllUsers(type){
    let q1 = `SELECT * from public."user" WHERE type =(:type)`
    try {
        let res_d = await db.query(q1,{replacements : {type}})
        if(res_d[0].length === 0){
          return { status : false , message : 'User not Found'  }
        }else {
          return { status : true , message : 'User Found' , data : res_d[0] }
        }
        
      } catch (error) {
        return { status : false , message : error.message }
      }
  }


  async addMutipleUserDetails(
    dataString
  ){

    let q1 = `
      INSERT INTO public."user"(
        name,
        dob,
        profile_image,
        year,
        class_student,
        password,
        created_at,
        updated_at,
        social_user_type,
        user_active,
        gender,
        email
        )
        VALUES 
          ${dataString}
        RETURNING id,
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
      let res_d = await db.query(q1)
      return { status : true , message : 'User Added Successfully', data: res_d[0]}
    } catch (error) {
      return { status : false , message : error.message }
    }
  }

  async findAll(){
    let q1 = `SELECT * from public."user" WHERE id = '58' OR id = '59' OR id = 83`
    try {
        let res_d = await db.query(q1)
        if(res_d[0].length === 0){
          return { status : false , message : 'User not Found'  }
        }else {
          return { status : true , message : 'User Found' , data : res_d[0]}
        }
        
      } catch (error) {
        return { status : false , message : error.message }
      }
  }

  async updateUserPassword(id , password){
    let q1 = `UPDATE public."user" SET password = (:password) WHERE id = (:id) AND password = '123123123'`
    try {
        await db.query(q1,{replacements : {id , password}})
        return { status : true , message : 'Updated'}
      } catch (error) {
        return { status : false , message : error.message }
      }
  }


}

module.exports = User