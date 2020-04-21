import React , { useState, useEffect, useReducer } from 'react'

import { Link , Redirect} from 'react-router-dom'
import {HOME_ROUTE} from '../../utils/constants';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import {logout} from '../../../actions/auth'
import { withRouter } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { setAlert } from '../../../actions/alert';
import {addStoryCell, removeImageContent, removeStoryCell, updateDropDownCell, inputChannelCell} from '../../../actions/story'
import StoryTemplateCell from './StoryTemplateCell';
import StorySidePanel from './StorySidePanel';
import StoryTopPanel from './StoryTopPanel';
import StoryTopBar from './StoryTopBar';
import StoryPreview from './preview/StoryPreview';
import ShowStory from '../stories/ShowStory';

const PublishStory = ({
  setAlert, isAuthenticated , history , logout,
  addStoryCell, removeImageContent, removeStoryCell, updateDropDownCell, inputChannelCell, singleStory
}) => {
  
  const [title, setTitle] = useState('')
  const [titleHeight, setTitleHeight] = useState(1)
  const [profileVisible , isProfileVisible] =  useState(false)
  const [inBetween , setInBetween] =  useState(1)
  const [tabIndex , setTabIndex] = useState(0)
  
  useEffect(() => {
    const rows = Math.floor(title.length / 55) + 1
    setTitleHeight(rows)
  }, [title])

  const onFileUpdate = (e, index) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.addEventListener('load', () => {inputChannelCell({iValue : reader.result, itemIndex : index})});
    }
  }

  const onBannerUpdate = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.addEventListener('load', () => {
        console.log('render.result :', reader.result);
      });
    }
  }

  
  let storyListJSX = singleStory.map((story, index) => 
     <StoryTemplateCell
      story={story}
      index={index}
      inputChannelCell={inputChannelCell}
      updateDropDownCell={updateDropDownCell} 
      removeImageContent={removeImageContent} 
      removeStoryCell={removeStoryCell}
      onFileUpdate={onFileUpdate}
    />)

  const onAddOrRemoveAt = (isForAdd) => {
    let value = inBetween - 1
    if(inBetween > 0 && value <= singleStory.length) {
      setAlert(`${isForAdd ? 'Added' : 'Removed' } at ${inBetween}` , 'green')
      if(isForAdd){
        addStoryCell({defaultValue : {id : uuidv4() , selectType : 'default', input: '' }, defaultIndex : value})
      }else {
        removeStoryCell(value)
      }
    }else {
      setAlert(`Invalid value provided` , 'red')
    }
  }

  if(!isAuthenticated){
    return <Redirect to={HOME_ROUTE}/>;
  }

  let tabLayout = {}

  switch(tabIndex){
    case 0:
      tabLayout = <ul>{storyListJSX}</ul>
      break;
    case 1:
    case 2:  
    default:
      tabLayout = <ShowStory singleStory={singleStory}/>
      break;
  }

  return (
    <div>
      <div className="flex md:px-20 px-8 py-4 bg-gray-100 border boder-b-1">
        <StoryTopBar
        isProfileVisible={isProfileVisible} 
        profileVisible={profileVisible} 
        onLogoutClick={()=>{history.push(HOME_ROUTE);logout();}}
        />
      </div>

      <div className="">
        <div className="flex flex-wrap">
          <div className="md:w-2/3 lg:w-3/4 w-full md:px-20 px-6">
            <StoryTopPanel
            tabIndex={tabIndex}
            addStoryCell={addStoryCell}
            setTitle={setTitle}
            removeStoryCell={removeStoryCell} 
            singleStory={singleStory}
            titleHeight={titleHeight}
            onTabItemChange={(index) => setTabIndex(index)}
            />
          {tabLayout}
          </div>
          <div className="md:w-1/3 lg:w-1/4 w-full text-gray-600">
            <div className="border-l border-gray-300 sticky top-0">
              <StorySidePanel
              inBetween={inBetween}
              onAddOrRemoveAt={onAddOrRemoveAt}
              setInBetween={setInBetween}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



PublishStory.propTypes = {
  isAuthenticated: PropTypes.bool,
  singleStory : PropTypes.array
};

const mapStateToProps = state => ({
  logout: PropTypes.func.isRequired,
  isAuthenticated: state.auth.isAuthenticated,
  singleStory : state.story.singleStory
});

const allActions = {
  addStoryCell, removeImageContent, removeStoryCell, updateDropDownCell, inputChannelCell, logout, setAlert
}

export default connect(mapStateToProps, allActions)(withRouter(PublishStory));




//https://stackoverflow.com/questions/54770234/updating-an-array-in-react-using-hooks