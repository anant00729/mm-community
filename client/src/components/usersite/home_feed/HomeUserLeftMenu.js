import React, {useState} from 'react'
import {
  CREATE_STORY_ROUTE,
  ALL_HOME_FEEDS,
  USER_STORY_LIST,
  USER_PENDING_STORY_LIST,
  ALL_STUDENT_PENDING_STORY_LIST,
  STUDENT
} from '../../utils/constants';
import { Link, Redirect } from 'react-router-dom';


function HomeUserLeftMenu({setMenuHidden , menuHidden, user,  onHomeLeftMenuChange, homeUserLeftMenu}) {

  if(user.type === STUDENT){
    delete homeUserLeftMenu[2]
  }

  

  let sideMenuJSX = homeUserLeftMenu.map((menu, index) => {
    return (
      <div 
      onClick={() => onHomeLeftMenuChange(index)}
      key={index}
      className={`px-4 py-3 flex cursor-pointer ${menu.selected ? 'app-font-color border-r-2 border-blue-500' : 'text-gray-800'}`}
      >
        <i className="fa fa-home self-center text-xl"></i>
        <p className="self-center ml-4 text-md">{menu.value}</p>
    </div>
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
            <i className="fa fa-home self-center text-xl"></i>
            <p className="self-center ml-4 text-md">New story</p>
          </Link>
          <Link to={CREATE_STORY_ROUTE} className="px-4 py-3 flex cursor-pointer border-b border-gray-200">
            <i className="fa fa-home self-center text-xl"></i>
            <p className="self-center ml-4 text-md">New discussion</p>
          </Link>
          <Link to={CREATE_STORY_ROUTE} className="px-4 py-3 flex cursor-pointer border-b border-gray-200">
            <i className="fa fa-home self-center text-xl"></i>
            <p className="self-center ml-4 text-md">New poll</p>
          </Link>
        </div>
      </div>
    </>
  )
}


export default HomeUserLeftMenu
