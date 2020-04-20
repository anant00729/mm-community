import React from 'react'
import { Link , Redirect} from 'react-router-dom'
import {HOME_ROUTE} from '../../utils/constants';
import appLogo from '../../../app_images/network.png'

export default function StoryTopBar({isProfileVisible, profileVisible, onLogoutClick}) {
  return (
    <>
      <img
          src={appLogo} 
          className="md:h-10 md:w-10 w-8 h-8 self-center"
          alt="appLogo"/>
        <h1 className="self-center ml-2 md:text-xl text-lg text-gray-700">New Story</h1>     
        <Link to={HOME_ROUTE} className="self-center ml-auto text-md text-gray-700 px-8 py-2 hover:bg-gray-300 hover:rounded-lg">
          Home
        </Link>
        <div className="md:w-12 md:h-12 w-10 h-10 self-center">
          
          <div 
          onClick={() => isProfileVisible(profileVisible => !profileVisible)} 
          className="relative">
            <img 
              className="w-full h-full rounded-full border-white border-2 shadow-lg ml-2 cursor-pointer"
              src="https://hashnode.imgix.net/res/hashnode/image/upload/v1584181566095/yFdLG8gjE.png?w=200&h=200&fit=crop&crop=faces&auto=format&q=60" 
              alt="profile_image"/>
            <div 
              className={`w-48 absolute appbar-drop-down border border-gray-400 rounded shadow-lg z-10 bg-white app-bar-dropdown-right ${profileVisible ? '' : 'hidden'}`}>
              <div 
              onClick={() => {}} 
              className="flex px-4 py-3 hover:bg-gray-200 cursor-pointer tracking-wide w-full text-left text-gray-700">
                <i className="fa fa-user-circle text-xl self-center"></i>
                <span className="ml-2 text-base font-sen">Profile</span>
              </div>
              <div 
              onClick={() => onLogoutClick()} 
              className="flex px-4 py-3 hover:bg-gray-200 cursor-pointer tracking-wide w-full text-left text-gray-700">
                <i className="fa fa-sign-out text-xl self-center"></i>
                <span className="ml-2 text-base font-sen">Log Out</span>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}
