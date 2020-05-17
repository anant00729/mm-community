import React, {useState} from 'react'
import appLogo from '../../app_images/network.png'
import {connect} from 'react-redux'
import {REGISTER_ROUTE , LOGIN_ROUTE, HOME_ROUTE, ALL_STORIES_ROUTE, CREATE_STORY_ROUTE,
  ALL_DISCUSSIONS, ALL_MEMBERS_ROUTE, ABOUT_ROUTE, HOME_FEED_ROUTE} from '../utils/constants';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import {logout} from '../../actions/auth'
import { withRouter } from "react-router-dom";


 const AppBar = (props) => {
  let {isAuthenticated, currentRoute, user} = props
  const [dropDownVisible , isDropDownVisible] =  useState(false)
  const [profileVisible , isProfileVisible] =  useState(false)

  let sideLoginPanel = (
    <div className="ml-auto flex">
    {/* <Link to={LOGIN_ROUTE} className="ml-auto text-gray-700 my-auto font-bold py-2 cursor-pointer md:px-8 px-4 focus:outline-none">
      Login
    </Link> */}
    <Link 
    to={LOGIN_ROUTE}
    className="
    ml-4
    app-color px-4 my-auto text-white rounded flex flex-wrap content-center py-2 font-bold cursor-pointer focus:outline-none">
      <i className="fa fa-user self-center"></i>
      <p className="ml-2 self-center">
        {/* <span className="register-lg-txt">Create an account</span>
        <span className="register-sm-txt">Sign Up</span> */}
        <span className="register-lg-txt">Login</span>
        <span className="register-sm-txt">Login</span>
      </p> 
    </Link>
  </div>
  )

  if(isAuthenticated){
    let profile_image = user.profile_image
    sideLoginPanel = (   
    <div className="ml-auto flex">
      <div className="self-center pl-4 pr-6 hover:bg-gray-200 cursor-pointer py-2 ml-2">
        <i className="fa fa-bell text-xl ml-2 app-font-color"></i>  
      </div>

      <div 
      onClick={() => isProfileVisible(profileVisible => !profileVisible)} 
      className="md:w-12 md:h-12 w-10 h-10 self-center relative ml-2">
        <img 
        className="w-full h-full rounded-full border-white border-2 shadow-lg cursor-pointer"
        src={profile_image} 
        alt="profile_image"/>
        <div 
          className={`w-48 absolute appbar-drop-down border border-gray-400 rounded shadow-lg z-10 bg-white app-bar-dropdown-right ${profileVisible ? '' : 'hidden'}`}>
            {/* <div 
            onClick={() => {}} 
            className="flex px-4 py-3 hover:bg-gray-200 cursor-pointer tracking-wide w-full text-left text-gray-700">
              <i className="fa fa-user-circle text-xl self-center"></i>
              <span className="ml-2 text-base font-sen">Profile</span>
            </div> */}
            <div 
            onClick={() => {props.history.push(HOME_ROUTE);props.logout();}} 
            className="flex px-4 py-3 hover:bg-gray-200 cursor-pointer tracking-wide w-full text-left text-gray-700">
              <i className="fa fa-sign-out text-xl self-center"></i>
              <span className="ml-2 text-base font-sen">Log Out</span>
            </div>
        </div>
      </div>
      
  </div>)
  }
  
  return (
    <nav className="bg-white border-b border-gray-300 md:text-base text-sm fixed w-full z-10 sticky top-0">
        <div className="pt-5 md:px-16 px-0">
          <div className="flex px-4">
            <div className="flex">
              <img src={appLogo} 
              className="h-8 w-8 mt-1"
              alt="appLogo"/>
              <p className="ml-2 tracking-wide app-logo font-extrabold my-auto">Hi-Story</p> 
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
            {sideLoginPanel}
          </div>
          <div className="mt-4 flex flex-wrap">
            <div className="flex flex-wrap">
              <Link to={HOME_ROUTE} 
              className={`px-2 md:px-4 py-2 hover:bg-gray-200 cursor-pointer tracking-wide 
                ${(currentRoute == HOME_ROUTE || currentRoute.includes('/home-feeds/')) ? 'app-font-color border-b-2 app-border-bottom' : ''}`}>
                Home
              </Link>
              <Link 
              className={`px-2 md:px-4 py-2 hover:bg-gray-200 cursor-pointer tracking-wide 
              ${currentRoute == ALL_STORIES_ROUTE ? ' app-font-color border-b-2 app-border-bottom' : ''}`}
              to={ALL_STORIES_ROUTE}>
                Stories
              </Link>
              <div
              onClick={() => isDropDownVisible(downVisible => !downVisible)} 
              className="visible md:hidden d-block relative">
                <button 
                className="px-2 md:px-4 py-2 hover:bg-gray-200 cursor-pointer tracking-wide">
                   <span>More</span> 
                   <i className="fa fa-chevron-down text-xs ml-2"></i>
                </button>
                <div 
                className={`absolute appbar-drop-down rounded shadow-lg z-10 bg-white ${dropDownVisible ? '' : 'hidden'}`}>
                  {/* <button 
                  onClick={() => {
                    console.log('Search')
                  }} 
                  className="px-2 md:px-4 py-2 hover:bg-gray-200 cursor-pointer tracking-wide w-full text-left">Search</button> */}
                  {/* <button 
                  onClick={() => {
                    console.log('Discussion')
                  }} 
                  className="px-2 md:px-4 py-2 hover:bg-gray-200 cursor-pointer tracking-wide w-full text-left">Discussion</button> */}
                  <button 
                  onClick={() => {
                    console.log('Members')
                  }} 
                  className="px-2 md:px-4 py-2 hover:bg-gray-200 cursor-pointer tracking-wide w-full text-left">Members</button>
                  <button 
                  onClick={() => {
                    console.log('About')
                  }} 
                  className="px-2 md:px-4 py-2 hover:bg-gray-200 cursor-pointer tracking-wide w-full text-left">About</button>
              </div>
              </div>
              <div className="hidden md:visible md:flex md:flex-wrap">
                {/* <Link 
                className={`px-2 md:px-4 py-2 hover:bg-gray-200 cursor-pointer tracking-wide 
                ${currentRoute == ALL_DISCUSSIONS ? 'app-font-color border-b-2 app-border-bottom' : ''}`}
                to={ALL_DISCUSSIONS}>Discussion</Link> */}
                <Link 
                className={`px-2 md:px-4 py-2 hover:bg-gray-200 cursor-pointer tracking-wide 
                ${currentRoute == ALL_MEMBERS_ROUTE ? 'app-font-color border-b-2 app-border-bottom' : ''}`}
                to={ALL_MEMBERS_ROUTE}>Members</Link>
                <Link 
                className={`px-2 md:px-4 py-2 hover:bg-gray-200 cursor-pointer tracking-wide 
                ${currentRoute == ABOUT_ROUTE ? 'app-font-color border-b-2 app-border-bottom' : ''}`}
                to={ABOUT_ROUTE}>About</Link>
              </div>
            </div>
            <Link to={CREATE_STORY_ROUTE}
             className="ml-auto text-gray-700 px-4 my-auto font-bold py-2 hover:bg-gray-200 cursor-pointer app-font-color flex">
              <i className="fa fa-plus-circle self-center text-xl"></i>
              <span className="ml-2">New Post</span>  
            </Link>
          </div>
        </div>
      </nav>
  )
}

AppBar.propTypes = {
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  logout: PropTypes.func.isRequired,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps, {logout})(withRouter(AppBar));




