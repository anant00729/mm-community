import React, {useState} from 'react'
import {
  CREATE_STORY_ROUTE,
  ALL_HOME_FEEDS,
  USER_STORY_LIST,
  USER_PENDING_STORY_LIST,
  ALL_STUDENT_PENDING_STORY_LIST,
  STUDENT,
  PENDING
} from '../../utils/constants';
import { Link, Redirect } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import {HOME_FEED_ROUTE , DAILY_FEEDS, MY_STORIES , PUBLISH_REQUEST} from '../../utils/constants'
import home from '../../../app_images/home.svg'
import userStory from '../../../app_images/user_story.svg'
import review from '../../../app_images/review.svg'
import newImage from '../../../app_images/new.svg'



function HomeUserLeftMenu({setMenuHidden , menuHidden, user, location}) {

  let homeUserLeftMenu = [
    {
    code : `${HOME_FEED_ROUTE}${DAILY_FEEDS}`,
    value : 'Daily Feeds',
    visible : 'all',
    selected : false,
    logo : home
  },
  {
    code : `${HOME_FEED_ROUTE}${MY_STORIES}`,
    value : 'My Stories',
    visible : 'all',
    selected : false,
    logo : userStory
  },
  {
    code : `${HOME_FEED_ROUTE}${PUBLISH_REQUEST}`,
    value : 'Publish Request',
    visible : 'all',
    selected : true,
    logo : review
    }
  ]

  if(user.type === STUDENT){
    delete homeUserLeftMenu[2]
  }

  let sideMenuJSX = homeUserLeftMenu.map((menu, index) => {
    let isSelected = location.pathname.includes(menu.code)
    if(menu.code === `${HOME_FEED_ROUTE}${PUBLISH_REQUEST}`){
      menu.code = `${HOME_FEED_ROUTE}${PUBLISH_REQUEST}${PENDING}`
    }
    return (
      <Link to={menu.code} 
      key={index}
      className={`px-4 py-3 flex cursor-pointer ${isSelected ? 'app-font-color border-r-2 border-blue-500' : 'text-gray-800'}`}
      >
        <img 
        className="w-6 h-6"
        src={menu.logo} alt="menu_logo"/>
        <p className="self-center ml-4 text-md">{menu.value}</p>
    </Link>
    )
  })

  return (
    <>
      <div className="sticky top-app-bar-mdd">
        <div className="h-4 w-full"></div>
        <div className="bg-white rounded">
          {sideMenuJSX}
        </div>
        <button 
        onClick={() => setMenuHidden(menuHidden => !menuHidden)}
        className="app-color hover:text-white rounded text-white py-2 px-4 mt-4 focus:outline-none hover:shadow-md w-full flex justify-center">
          <i className="fa fa-plus self-center text-md"></i>
          <p className="self-center ml-2">New Post</p>
        </button>
        <div 
        className={`bg-white rounded ${menuHidden ? 'hidden' : ''}`}>
          <Link to={CREATE_STORY_ROUTE} className="px-4 py-3 flex cursor-pointer border-b border-gray-200">
            <img 
            className="w-6 h-6"
            src={newImage} alt="menu_logo"/>
            <p className="self-center ml-4 text-md">New story</p>
          </Link>
          {/* <Link to={CREATE_STORY_ROUTE} className="px-4 py-3 flex cursor-pointer border-b border-gray-200">
            <i className="fa fa-home self-center text-xl"></i>
            <p className="self-center ml-4 text-md">New discussion</p>
          </Link>
          <Link to={CREATE_STORY_ROUTE} className="px-4 py-3 flex cursor-pointer border-b border-gray-200">
            <i className="fa fa-home self-center text-xl"></i>
            <p className="self-center ml-4 text-md">New poll</p>
          </Link> */}
        </div>
      </div>
    </>
  )
}


export default withRouter(HomeUserLeftMenu)
