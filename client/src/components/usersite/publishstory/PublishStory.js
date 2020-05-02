import React , { useState, useEffect, useReducer } from 'react'

import { Link , Redirect} from 'react-router-dom'
import {HOME_ROUTE, LOGIN_ROUTE} from '../../utils/constants';
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
import {callInsertStory, uploadImage, clearStoryContent} from '../../../actions/story'



const PublishStory = ({
  setAlert, isAuthenticated , history , logout, token, callInsertStory,
  addStoryCell, removeImageContent, removeStoryCell, updateDropDownCell, inputChannelCell, singleStory, 
  uploadImage, posterImage, user, clearStoryContent
}) => {
  
  const [title, setTitle] = useState('')
  const [titleHeight, setTitleHeight] = useState(1)
  const [profileVisible , isProfileVisible] =  useState(false)
  const [inBetween , setInBetween] =  useState(1)
  const [tabIndex , setTabIndex] = useState(0)
  const [tagArray, setTagArray] = useState([]);
  let [bannerImg , setBannerImg] = useState('')
  const STORY_IMAGE = 'story_image'

  const [publishDate, setPublishDate] = useState(new Date());
  const [dateVisible, isDateVisible] = useState(false);
  
  useEffect(() => {
    const rows = Math.floor(title.length / 55) + 1
    setTitleHeight(rows)
  }, [title])

  useEffect(() => {
    clearStoryContent()
  }, []) 


  useEffect(()=> {
     if(bannerImg.includes('base64') || bannerImg.length == 0) {
        return
     }
  },[bannerImg])

  const onFileUpdate = (e, index) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      uploadImage(e.target.files[0], STORY_IMAGE, index)
    }
  }


 const publishStory = () => {

  // {
  //   "title":"Dev Must-reads on Hashnode: Week #4",
  //   "content":[
  //     {
  //       "id": "10",
  //       "selectType" : "Image",
  //       "input" : "https://cdn.hashnode.com/res/hashnode/image/upload/v1587835300949/4_wwYYN5c.png?w=1600&h=840&fit=crop&crop=entropy&auto=format&q=60"
  //     }
  //     ],
  //   "cover_image":"shdjfgjsdf",
  //   "read_time":"2 min",
  //   "created_at":"12-12-12",
  //   "updated_at":"12-12-12",
  //   "story_status":0,
  //   "token" : "sUmkabQpBSho5DNGI8mZYPp2maG7S"
  // }

  console.log('bannerImg :>> ', bannerImg);

  if(title.length === 0){
    setAlert('Please enter title of your story' , 'red')
  }
  else if(singleStory.length == 0){
    setAlert('Please add story content' , 'red')
  }
  else if (tagArray.length === 0){
    setAlert('Please add tags for the story' , 'red')
  }
  else if(posterImage.length === 0){
    setAlert('Please add a banner image for the story' , 'red')
  }
  else if(!dateVisible){
    setAlert('Please provide publish date' , 'red')
  }
  else {
    let publishStoryObj = {
      title,
      content : singleStory,
      cover_image : posterImage,
      tags : tagArray,
      updated_at : publishDate ,
      story_status : 0,
      token
    }
    callInsertStory(publishStoryObj, history)
  }
 }
  
  let storyListJSX = singleStory.map((story, index) => 
     <StoryTemplateCell 
      key={index}
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
    return <Redirect to={LOGIN_ROUTE}/>;
  }

  let tabLayout = {}

  switch(tabIndex){
    case 0:
      tabLayout = <ul>{storyListJSX}</ul>
      break;
    case 1:
    case 2:  
    default:
      tabLayout = <StoryPreview singleStory={singleStory}/>
      break;
  }

  return (
    <div>
      <div className="flex md:px-20 px-8 py-4 bg-gray-100 border boder-b-1">
        <StoryTopBar
        isProfileVisible={isProfileVisible} 
        profileVisible={profileVisible} 
        onLogoutClick={()=>{history.push(HOME_ROUTE);logout();}}
        profileImage={user.profile_image}
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
            <div className="border-l border-gray-300">
              <StorySidePanel
              inBetween={inBetween}
              onAddOrRemoveAt={onAddOrRemoveAt}
              setInBetween={setInBetween}
              publishStory={publishStory}
              tagArray={tagArray}
              setTagArray={setTagArray}
              bannerImg={bannerImg}
              setBannerImg={setBannerImg}
              publishDate={publishDate} 
              setPublishDate={setPublishDate}
              dateVisible={dateVisible}
              isDateVisible={isDateVisible}
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
  singleStory : PropTypes.array,
  token: PropTypes.string,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  logout: PropTypes.func.isRequired,
  callInsertStory: PropTypes.func.isRequired,
  clearStoryContent : PropTypes.func.isRequired,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  singleStory : state.story.singleStory,
  token : state.auth.token,
  posterImage: state.story.posterImage
});

const allActions = {
  addStoryCell, removeImageContent, removeStoryCell, updateDropDownCell, 
  inputChannelCell, logout, setAlert, callInsertStory, uploadImage, 
  clearStoryContent
}

export default connect(mapStateToProps, allActions)(withRouter(PublishStory));
//https://stackoverflow.com/questions/54770234/updating-an-array-in-react-using-hooks