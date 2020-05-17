import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import {setAlert} from '../../../../actions/alert'
import openBox from '../../../../app_images/shipping-and-delivery.svg'
import {
  IMAGE_BASE_URL,
  PARAGRAPH,
  IMAGE,
  QUOTE,
  SUBTITLE,
  POINT
} from '../../../utils/constants'
import { useEffect } from 'react';


const StoryPreview = ({singleStory, setAlert, posterImage , title , user}) => {
  //let story = singleStory.find(story=> story.selectType === 'BannerImage')
  let { name , profile_image } = user
  //posterImage.image
    

    // console.log('singleStory :>> ', singleStory);
    // console.log('title :>> ', title);
    // console.log('posterImage :>> ', posterImage);

    

    if(singleStory.length !== 0 || title.length !== 0 || posterImage.image.length !== 0){
      // return(
      //   <h1 className="text-4xl font-sen font-bold overflow-y-auto">
      //       {title}
      //   </h1>
      // )
      return ( 
        <div className="px-2">
        <div className="md:w-2/3 mx-auto">
          <h1 className="text-4xl font-sen font-bold word-wrapper">
            {title}
          </h1>
          <div className="flex">
            <div className="w-full flex flex-wrap py-4">
              <img 
              className="w-14 h-14 rounded-full cursor-pointer"
              src={`${profile_image}`} 
              alt="profile_image"/>
              <p className="self-center ml-4">{`${name} published a story Apr 17`}</p>
            </div>
          </div>
        </div>
        <div className="md:w-2/3 mx-auto">
          {posterImage.image && 
          <img className="post-cover bg-cover bg-center mx-auto" 
          src={`${IMAGE_BASE_URL}${posterImage.image}`}
          />
          }
        </div>
        
        <div className="flex -mx-2 justify-center mt-4">
          <div className="w-full md:w-4/6 px-2">
            {/* Paragraph , Image , Quote , Subtitle , Point */}
            { singleStory.map((item, index)=> {
                switch(item.selectType){
                  case PARAGRAPH:
                    return (
                    <p key={index} className="text-xl text-gray-800 py-1 word-wrapper">{item.input}</p>
                    )
                  case IMAGE:
                    return (
                      <img key={index} className="post-cover bg-cover bg-center mx-auto my-2" 
                      src={`${IMAGE_BASE_URL}${item.input}`}
                      />
                    )  
                  case QUOTE:
                    return (
                      <div key={index} className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 my-2" role="alert">
                        <p className="text-xl word-wrapper">{`"${item.input}"`}</p>
                      </div>
                    )
                  case SUBTITLE:
                    return (
                      <h1 key={index} className="w-full md:text-4xl text-3xl input-add-title py-1 word-wrapper">{item.input}</h1>
                    )  
                  case POINT:
                    return (
                      <ul key={index} className="text-xl text-gray-800 ml-10 py-8 px-10" style={{listStyle : 'disc'}}>
                            <li className="word-wrapper">{item.input}</li>
                      </ul>                
                    )  
                }
              })
            }            
          </div>
          <div className="w-1/6 px-2 hidden">
            {/* <div className="bg-gray-400 h-12">
            
            </div> */}
          </div>
        </div>
      </div>
      )

    }else {
      return <div className="flex flex-col mt-20">
              <img 
              className="w-12 h-12 self-center"
              src={openBox} alt="open_box"/>
              <p className="mt-2 text-center">
              <span>Add elements to preview your story.</span>
              </p>
            </div>
    }
}


StoryPreview.propTypes = {
  isAuthenticated: PropTypes.bool,
  singleStory : PropTypes.array
};

const mapStateToProps = state => ({
  logout: PropTypes.func.isRequired,
  isAuthenticated: state.auth.isAuthenticated,
  singleStory : state.story.singleStory,
  user: state.auth.user
});

const allActions = {
   setAlert
}

export default connect(mapStateToProps, allActions)(withRouter(StoryPreview));

