import React from 'react'
import mainLoginImg from '../../../app_images/main-login-img.png'
import appLogo from '../../../app_images/network.png'
import googleLogo from '../../../app_images/google.svg'
import facebookLogo from '../../../app_images/facebook.svg'

export const Login = () => {
  return (
    <div className="md:flex md:flex-wrap bg-gray-300">
      <div className="flex-1 bg-white p-10 self-center flex content-center flex-wrap md:h-screen md:p-20">
        
        <div className="flex md:mb-20 mb-10 w-full">
          <img src={appLogo} 
          className="h-8 w-8 mt-1"
          alt="appLogo"/>
          <p className="ml-2 tracking-wide text-3xl font-extrabold my-auto">StudyNode</p> 
        </div>
        <p className="mt-1 font-sen text-gray-700 text-xl w-full font-semibold">Log in via email</p>
        <p className="mt-1 text-gray-500 text italic">(no password needed, we’ll email you a secure link to log in)</p>

        <form className="mt-4 flex w-full">
          <input 
          className="
          flex-1
          py-2
          px-2
          border-gray-300
          focus:outline-none
          rounded-l-md
          border
          focus:border-blue-600
          "
          placeholder="Enter your email address"
          type="email"/>
          <input 
          className="
          text-white
          app-color
          py-2
          px-8
          focus:outline-none
          rounded-r-md
          text-base
          cursor-pointer
          "
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
        className="mx-auto w-2/3 object-cover h-96"
        src={mainLoginImg} alt="main-login-image"/>
        <p className="font-sen text-black text-xl md:text-2xl font-medium mt-8">Personalize your Hashnode experience, log in to your account.</p>
        <p className="text-gray-700">Hashnode is the easiest way to connect with the best developers from around the world and grow your career!</p>
        
      </div>

    </div>
  )
}
