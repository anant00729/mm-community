import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import {setAlert} from '../../../actions/alert'
import {getStoryById} from '../../../actions/story'
import {
  IMAGE_BASE_URL,
  PARAGRAPH,
  IMAGE,
  QUOTE,
  SUBTITLE,
  POINT
} from '../../utils/constants'


const ShowStory = ({getStoryById, showStoryById}) => {
  useEffect(()=> {
    getStoryById(38)
  }, [])


  console.log('showStoryById :>> ', showStoryById);
  let {cover_image , title , profile_image, name , content } = showStoryById

  let contentJSX = []
  if(content){
    contentJSX = content.map((item, index)=> {
      switch(item.selectType){
        case PARAGRAPH:
          return (
          <p className="text-xl text-gray-800 py-1">{item.input}</p>
          )
        case IMAGE:
          return (
            <img className="post-cover bg-cover bg-center mx-auto my-2" 
            src={`${IMAGE_BASE_URL}${item.input}`}
            />
          )  
        case QUOTE:
          return (
            <div class="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 my-2" role="alert">
              <p className="text-xl">{`"${item.input}"`}</p>
            </div>
          )
        case SUBTITLE:
          return (
            <h1 className="w-full md:text-4xl text-3xl input-add-title py-1">{item.input}</h1>
          )  
        case POINT:
          return (
            <ul className="text-xl text-gray-800 ml-10 py-8 px-10" style={{listStyle : 'disc'}}>
                  <li>{item.input}</li>
            </ul>                
          )  
      }
    })    
  }

  

  return (
    <div className="px-2">
      <div className="md:w-2/3 mx-auto">
        <img className="post-cover bg-cover bg-center mx-auto" 
        src={`${IMAGE_BASE_URL}${cover_image}`}
        />
      </div>
      
      <div className="flex -mx-2 justify-center mt-4">
        <div className="w-1/6 px-2 hidden">
          {/* <div className="bg-gray-400 h-12"></div> */}
        </div>
        <div className="w-full md:w-4/6 px-2">
          <div className="">
            <h1 className="text-4xl font-sen font-bold">
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
          <div>
              {/* Paragraph , Image , Quote , Subtitle , Point */}
              {contentJSX}            
          </div>
        </div>
        <div className="w-1/6 px-2 hidden">
          {/* <div className="bg-gray-400 h-12">
          
          </div> */}
        </div>
      </div>
    </div>
  )
}


ShowStory.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  logout: PropTypes.func.isRequired,
  getStoryById: PropTypes.func.isRequired,
  isAuthenticated: state.auth.isAuthenticated,
  showStoryById : state.story.showStoryById
});

const allActions = {
   setAlert, getStoryById
}

export default connect(mapStateToProps, allActions)(withRouter(ShowStory));

