import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import {setAlert} from '../../../../actions/alert'
import {
  IMAGE_BASE_URL,
  PARAGRAPH,
  IMAGE,
  QUOTE,
  SUBTITLE,
  POINT
} from '../../../utils/constants'


const StoryPreview = ({singleStory, setAlert}) => {
  //let story = singleStory.find(story=> story.selectType === 'BannerImage')

    if(singleStory.lenght !== 0){
      return ( 
        singleStory.map((item, index)=> {
        switch(item.selectType){
          case PARAGRAPH:
            return (
            <p key={index} className="text-xl text-gray-800 py-1">{item.input}</p>
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
                <p className="text-xl">{`"${item.input}"`}</p>
              </div>
            )
          case SUBTITLE:
            return (
              <h1 key={index} className="w-full md:text-4xl text-3xl input-add-title py-1">{item.input}</h1>
            )  
          case POINT:
            return (
              <ul key={index} className="text-xl text-gray-800 ml-10 py-8 px-10" style={{listStyle : 'disc'}}>
                    <li>{item.input}</li>
              </ul>                
            )  
        }
      })
      )

    }else {
      return <div>No Data Found</div>
    }
}


StoryPreview.propTypes = {
  isAuthenticated: PropTypes.bool,
  singleStory : PropTypes.array
};

const mapStateToProps = state => ({
  logout: PropTypes.func.isRequired,
  isAuthenticated: state.auth.isAuthenticated,
  singleStory : state.story.singleStory
});

const allActions = {
   setAlert
}

export default connect(mapStateToProps, allActions)(withRouter(StoryPreview));

