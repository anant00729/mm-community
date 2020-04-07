import React, {useState} from 'react'
import appLogo from '../../app_images/network.png'
import {connect} from 'react-redux'
import {openAppBarDropdown , closeAppBarDropdown} from '../globalstates/actions/appBarActions'

 const AppBar = () => {
  const [dropDownVisible , isDropDownVisible] =  useState(false)
  return (
    <nav className="bg-white border-b border-gray-300 md:text-base text-sm">
        <div className="pt-5 md:px-16 px-6">
          <div className="flex">
            <div className="flex">
              <img src={appLogo} 
              className="h-8 w-8 mt-1"
              alt="appLogo"/>
              <p className="ml-2 tracking-wide app-logo font-extrabold my-auto">StudyNode</p> 
            </div>
            <div className="md:ml-4 
            md:bg-gray-100
            md:border 
            md:border-gray-300 md:rounded-md md:text-gray-900
            md:flex
            md:h-10
            md:visible
            hidden
            flex-grow
            ">
              <div className="pointer-events-none pl-4 flex items-center">
                <svg className="fill-current pointer-events-none text-gray-600 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path></svg>
              </div>
              <input className="
                ml-4
                bg-gray-100
                md:flex-grow
                pr-2
                focus:outline-none" 
              type="text"
              placeholder="Search Study Node"
              />
            </div>
            
            <button className="ml-auto text-gray-700 my-auto font-bold py-2 cursor-pointer md:px-8 px-4 focus:outline-none">
              Login
            </button>
            <button className="app-color px-4 my-auto text-white rounded flex flex-wrap content-center py-2 font-bold cursor-pointer focus:outline-none">
              <i className="fa fa-user self-center"></i>
              <p className="ml-2 self-center">
                <span className="register-lg-txt">Create an account</span>
                <span className="register-sm-txt">Sign Up</span>
                </p> 
            </button>
          </div>
          <div className="mt-4 flex flex-wrap">
            <div className="flex flex-wrap">
              <button className="px-4 py-2 hover:bg-gray-200 cursor-pointer tracking-wide">Home</button>
              <button className="px-4 py-2 hover:bg-gray-200 cursor-pointer tracking-wide">Stories</button>
              <div 
              onMouseEnter={() => isDropDownVisible(true)}
              onMouseLeave={() => isDropDownVisible(false)}
              className="visible md:hidden d-block relative">
                <button 
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer tracking-wide">
                   <span>More</span> 
                   <i className="fa fa-chevron-down text-xs ml-2"></i>
                </button>
                <div 
                className={`absolute appbar-drop-down rounded shadow-lg z-10 bg-white ${dropDownVisible ? '' : 'hidden'}`}>
                  <button className="px-4 py-2 hover:bg-gray-200 cursor-pointer tracking-wide w-full text-left">Search</button>
                  <button className="px-4 py-2 hover:bg-gray-200 cursor-pointer tracking-wide w-full text-left">Discussion</button>
                  <button className="px-4 py-2 hover:bg-gray-200 cursor-pointer tracking-wide w-full text-left">Members</button>
                  <button className="px-4 py-2 hover:bg-gray-200 cursor-pointer tracking-wide w-full text-left">About</button>
              </div>
              </div>
              <div className="hidden md:visible md:flex md:flex-wrap">
                <button className="px-4 py-2 hover:bg-gray-200 cursor-pointer tracking-wide">Discussion</button>
                <button className="px-4 py-2 hover:bg-gray-200 cursor-pointer tracking-wide">Members</button>
                <button className="px-4 py-2 hover:bg-gray-200 cursor-pointer tracking-wide">About</button>
              </div>
            </div>
            <button className="ml-auto text-gray-700 px-4 my-auto font-bold py-2 hover:bg-gray-200 cursor-pointer app-font-color flex">
              <i className="fa fa-plus-circle self-center text-xl"></i>
              <span className="ml-2">New Post</span>  
            </button>
          </div>
        </div>
      </nav>
  )
}


export default connect(null , {openAppBarDropdown , closeAppBarDropdown})(AppBar)