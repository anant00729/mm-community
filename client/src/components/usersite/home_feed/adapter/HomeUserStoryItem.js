import React,{useEffect} from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {getUserStories, getAdminStories} from '../../../../actions/home'
import { IMAGE_BASE_URL } from '../../../utils/constants';
import { Link , withRouter} from 'react-router-dom';
import {SHOW_STORY,
   HOME_FEED_ROUTE,
   PUBLISH_REQUEST,
   PENDING,
   PUBLISHED
  } from '../../../utils/constants'


function HomeUserStoryItem({
  //Redux
  getAdminStories,
  getUserStories, 
  token, 
  homeUserStoryList, 
  location}) {

  let _p = location.pathname 
  let approveBtnJSX = null
  if(_p === `${HOME_FEED_ROUTE}${PUBLISH_REQUEST}${PENDING}`){
    approveBtnJSX = <button className="ml-auto px-4 py-2 
    hover:bg-gray-200 
    hover:border 
    hover:border-blue-500 
    rounded
    app-font-color
    ">APPROVE</button>
  }
  
  useEffect(() => {
    let story_status = 0
    switch(_p){
      case `${HOME_FEED_ROUTE}${PUBLISH_REQUEST}${PENDING}`:
        story_status = -1
        break;
      case `${HOME_FEED_ROUTE}${PUBLISH_REQUEST}${PUBLISHED}`:
        story_status = 1
        break;  
    }
    if(token){
      if(story_status == 0){
        getUserStories(token)
      }else {
        getAdminStories(token, story_status)
      }
      
    }
    window.scrollTo(0, 0)
  }, [])

  if(homeUserStoryList.length === 0){
    // Show loading
    return <div className="mx-auto loader mt-56"></div> 
  }
  else {
    return (
      homeUserStoryList.map((story, index)=> {
        let para = story.content.find(s=> s.selectType === "Paragraph")
        let { title , profile_image , cover_image , id, name } = story
        if(para){
          if(para.input.length > 310){
            para.input = `${para.input.substring(1, 300)}...`;
          }
        }
        return (
          <div 
            key={index}
            className="bg-white rounded mt-4 p-4">
              
              
                <div className="flex">
                <Link className="cursor-pointer flex" to={`${SHOW_STORY}/${id}`}>
                  <img 
                  className="w-12 h-12 rounded-full border-gray-200 border-2"
                  src={profile_image}
                  alt="profile_image"/>
                  <p className="self-center ml-3 text-sm font-semibold md:text-base">{name}'s blog</p>
                </Link>
                  {approveBtnJSX}
                </div>  
              
              
              <div className="md:flex mt-4">

                <div className="md:w-3/4 w-full mr-4">
                <Link to={`${SHOW_STORY}/${id}`} className="cursor-pointer">
                  <p className="font-sen text-black font-bold md:text-2xl text-xl">
                    {title}
                  </p>
                  <p className="mt-2 text-gray-700">
                    {para ? para.input : null}
                  </p>
                </Link>
                </div>
                <div className="md:w-1/4 w-full mt-3 md:mt-0"> 
                  <div 
                      className="h-56 md:h-32 ml-auto post-cover w-full bg-cover bg-center rounded"
                      style={{backgroundImage : `url(${IMAGE_BASE_URL}${cover_image})`}}
                      alt=""/>
                </div>
              </div>
          </div>
        )
      })
    )
  }
}


HomeUserStoryItem.propTypes = {
  getUserStories: PropTypes.func.isRequired,
  getAdminStories: PropTypes.func.isRequired,
};
   
const mapStateToProps = state => ({
  homeUserStoryList: state.home.homeUserStoryList,
  token: state.auth.token,
});

const allActions = {
  getUserStories, getAdminStories
}

export default connect(mapStateToProps, allActions)(withRouter(HomeUserStoryItem));



