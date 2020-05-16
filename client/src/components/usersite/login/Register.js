import React, {useState} from 'react'
import { Link, Redirect } from 'react-router-dom';
import memberImage from '../../../app_images/members-img-1.png'
import appLogo from '../../../app_images/network.png'
import googleLogo from '../../../app_images/google.svg'
import facebookLogo from '../../../app_images/facebook.svg'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAlert } from '../../../actions/alert';
import { register } from '../../../actions/auth'
import {HOME_FEED_ROUTE, DAILY_FEEDS} from '../../utils/constants'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



export const Register = ({ register, isAuthenticated , setAlert}) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [year, setYear] = useState('2017')
  const [std, setStd] = useState('11')
  const [startDate, setStartDate] = useState(new Date());
  const [gender , setGender] = useState('Select Gender')


  if (isAuthenticated) {
    return <Redirect to={`${HOME_FEED_ROUTE}${DAILY_FEEDS}`}/>;
  }  

  const onSubmit = (e) => {
    e.preventDefault()
    if(name.length == 0){
      setAlert(`Please your name` , 'red')  
    }
    else if(gender == 'Select Gender'){
      setAlert(`Please select your gender` , 'red')
    }
    else if(email.length == 0){
      setAlert(`Please enter your email id` , 'red')
    }
    else if(password.length == 0){
      setAlert(`Please enter password` , 'red')
    }else {
      const req = {name , email , type : 'student' , profile_image : '' , year , class_student : std , dob : startDate, gender , password }
      register(req)
    }
  }


  return (
    <div className="md:flex md:flex-wrap bg-gray-300">
      <div className="flex-1 bg-white p-10 self-center flex content-center flex-wrap md:h-screen md:p-20">
        <div className="flex md:mb-20 mb-10 w-full">
          <img src={appLogo} 
          className="h-8 w-8 mt-1"
          alt="appLogo"/>
          <p className="ml-2 tracking-wide text-3xl font-extrabold my-auto">StudyNode</p> 
        </div>
        <p className="mt-1 font-sen text-gray-700 text-xl w-full font-semibold">Sign up in via email</p>
        <p className="mt-1 text-gray-500 text italic">(Just one step process to sign up)</p>
        <form 
        onSubmit={onSubmit}
        className="mt-4 w-full">
          
          
          <div className="flex mt-4">
            <div className="flex-1 mr-2">
              <p className="text-gray-600">Full Name</p>
              <input 
                onChange={(e) => setName(e.target.value)}
                className="w-full py-2 px-2 border-gray-300 focus:outline-none rounded border focus:border-blue-600"
                type="name"/>
            </div>
            <div className="flex-1">
              <p className="text-gray-600">Year of join</p>
              <input 
                onChange={(e) => setYear(e.target.value)}
                maxLength={4}
                value={year}
                type="number"
                min="2017" max="2030"
                className="w-full py-2 px-2 border-gray-300 focus:outline-none rounded border focus:border-blue-600"
                />  
            </div>
          </div>  

          <div className="flex w-full mt-2">
            <div className="flex-1 mr-2">
              <p className="text-gray-600">Standard</p>
              <input 
              onChange={(e) => setStd(e.target.value)}
              className="w-full py-2 px-2 border-gray-300 focus:outline-none rounded border focus:border-blue-600"
              placeholder="Enter your standard"
              maxLength={4}
              type="number"
              value={std}
              min="10" 
              max="12"
              type="number"/>
            </div>
            
            <div className="flex-1">
              <p className="text-gray-600">Date of birth</p>
              <DatePicker 
              showYearDropdown={true}
              shouldCloseOnSelect={true}
              showMonthDropdown={true}
              className="w-full py-2 px-2 border-gray-300 focus:outline-none rounded border focus:border-blue-600"
              selected={startDate} 
              onChange={date => setStartDate(date)} />
            </div>
          </div>  
          <select 
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="mt-2 block appearance-none w-full bg-white border py-3 px-4 pr-8 rounded leading-tight outline-none  hover:border-blue-500" id="grid-state">
                  <option>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>

          <input 
            onChange={(e) => setEmail(e.target.value)}
            className="mt-4 w-full py-2 px-2 border-gray-300 focus:outline-none rounded border focus:border-blue-600 mr-2"
            placeholder="Enter your email address"
            type="email"/>
          <input 
            onChange={(e) => setPassword(e.target.value)}
            className="mt-4 w-full py-2 px-2 border-gray-300 focus:outline-none rounded border focus:border-blue-600"
            placeholder="Enter your password"
            type="password"/>
          <input 
          className="mt-4 w-full text-white app-color py-2 px-8 focus:outline-none rounded text-base cursor-pointer"
          type="submit"/>
        </form>

        <p className="mt-1 font-sen text-gray-700 text-xl w-full font-semibold mt-8">Or continue with your social account</p>

        <div className="flex mt-4 w-11/12">
          <button 
          className="w-1/2 xl:w-1/3 flex flex-wrap text-gray-700 rounded shadow mr-3 px-3 py-2 focus:outline-none hover:shadow-xl shadow transition duration-500 ease-in-out"
          >
            <img 
            className="w-6 h-6"
            src={googleLogo} alt="google logo"/>
            <span className="self-center ml-2">Google</span>
          </button>

          <button 
          className="w-1/2 xl:w-1/3 flex btn-fb text-white rounded shadow mr-3 px-3 py-2 focus:outline-none hover:shadow-xl shadow transition duration-500 ease-in-out">
            <img 
            className="w-8 h-8 p-1"
            src={facebookLogo} alt="google logo"/>
            <span className="self-center ml-2 pr-8">Facebook</span>
          </button>
        </div>

        
      </div>
      <div className="flex-1 p-10 self-center flex content-center flex-wrap md:h-screen md:p-20">
        <img 
        className="mx-auto w-2/3 object-fit h-96"
        src={memberImage} alt="main-login-image"/>
        <p className="font-sen text-black text-xl md:text-2xl font-medium mt-8">Personalize your Hashnode experience, log in to your account.</p>
        <p className="text-gray-700">Hashnode is the easiest way to connect with the best developers from around the world and grow your career!</p>
        
      </div>

    </div>
  )
}


Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { register, setAlert })(Register);