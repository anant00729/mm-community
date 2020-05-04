import React,{useEffect} from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {getUserStories} from '../../../../actions/home'
import { IMAGE_BASE_URL } from '../../../utils/constants';
import { Link } from 'react-router-dom';
import {SHOW_STORY, ALL_HOME_FEEDS, USER_STORY_LIST , USER_PENDING_STORY_LIST} from '../../../utils/constants'


function HomeUserStoryItem({
  selectedMenuItem, 
  //Redux
  getUserStories, token, homeUserStoryList}) {


    console.log('HomeUserStoryItem :>> ', selectedMenuItem);

    // if(token){
    //   getUserStories(token)
    // }

  useEffect(() => {
    if(selectedMenuItem.type === ALL_HOME_FEEDS){
    }
    else if(selectedMenuItem.type === USER_STORY_LIST){
    }
    else if(selectedMenuItem.type === USER_PENDING_STORY_LIST){

    }

    if(token){
      getUserStories(token)
    }
  }, [selectedMenuItem])

    

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
          if(para.input.length > 300){
            para.input = `${para.input.substring(1, 300)}...`;
          }
        }
        return (
          <div 
            key={index}
            className="bg-white rounded mt-4 p-4">
              
              <Link className="cursor-pointer" to={`${SHOW_STORY}/${id}`}>
                <div className="flex">
                  <img 
                  className="w-12 h-12 rounded-full border-gray-200 border-2"
                  src={profile_image}
                  alt="profile_image"/>
                  <p className="self-center ml-3 text-sm font-semibold md:text-base">{name}'s blog</p>
                </div>  
              </Link>
              
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
  getUserStories: PropTypes.func.isRequired
};
   
const mapStateToProps = state => ({
  homeUserStoryList: state.home.homeUserStoryList,
  token: state.auth.token,
});

const allActions = {
  getUserStories
}

export default connect(mapStateToProps, allActions)(HomeUserStoryItem);



