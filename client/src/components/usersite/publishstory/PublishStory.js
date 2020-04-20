import React , { useState, useEffect, useReducer } from 'react'
import appLogo from '../../../app_images/network.png'
import { Link , Redirect} from 'react-router-dom'
import {HOME_ROUTE} from '../../utils/constants';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import {logout} from '../../../actions/auth'
import { withRouter } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { setAlert } from '../../../actions/alert';
import {addStoryCell, removeImageContent, removeStoryCell, updateDropDownCell, inputChannelCell} from '../../../actions/story'

const PublishStory = ({
  setAlert, isAuthenticated , history , logout,
  addStoryCell, removeImageContent, removeStoryCell, updateDropDownCell, inputChannelCell, singleStory
}) => {
  const [title, setTitle] = useState('')
  const [titleHeight, setTitleHeight] = useState(1)
  const [profileVisible , isProfileVisible] =  useState(false)
  const [inBetween , setInBetween] =  useState(1)
  
  
  useEffect(() => {
    const rows = Math.floor(title.length / 55) + 1
    setTitleHeight(rows)
  }, [title])

  const onFileUpdate = (e, index) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.addEventListener('load', () => {
        //setStoryList({type: "inputChange", value : {iValue : reader.result, itemIndex : index}})
        inputChannelCell({iValue : reader.result, itemIndex : index})
      });
    }
  }

  const [storyList , setStoryList] = useReducer((storyList, { type , value}) => {
    console.log('storyList :', storyList);
    switch(type){
      case "add" : 
        let { defaultValue , defaultIndex } = value
        let updateList = [...storyList]
        updateList.splice(defaultIndex, 0, defaultValue);
        return updateList
      case "removeImage":
        let { r_index } = value
        storyList[r_index].input = ''
        return [...storyList]
      case "remove":
        return storyList.filter((story, index) => index !== value)  
      case "dropdown":
        let { dValue , index } = value
        storyList[index].input = ''
        storyList[index].selectType = dValue
        return [...storyList]
      case "inputChange":
        let { iValue , itemIndex } = value
        storyList[itemIndex].input = iValue
        return [...storyList]                
      default: 
        return storyList
    }
  }, [])


  let storyListJSX = singleStory.map((story, index) => {
    let bottomWidget = ''
    switch (story.selectType) {
      case "Image":
        bottomWidget = (
          <div className="text-center">
            {story.input.length == 0 ? (
              <div className="p-20">
                <p>Please select an Image</p>
                <div className="upload-btn-wrapper mt-4 cursor-pointer">
                  <button
                  className="border border-gray-300 bg-white rounded-lg p-2 focus:outline-none hover:shadow-md transition duration-500 ease-in-out flex text-gray-700 cursor-pointer">
                    Upload a file
                    <input type="file" accept="image/*" 
                    onChange={(e) => onFileUpdate(e, index)}/>
                  </button>
                </div>
              </div>
            )
             :
            (
              <div className="p-6">
                <img 
                accept="image/x-png,image/gif,image/jpeg"
                multiple={false}
                className="h-64 mx-auto mt-4 object-contain"
                src={story.input} alt="image_logo"/>
              </div>
            )}
          </div>
        )
        break;
      case "Quote":
      case "Point":
      case "Paragraph":
      case "Subtitle":
        bottomWidget = (
          <textarea
          value={story.input}
          onChange={(e) => 
            inputChannelCell({iValue : e.target.value, itemIndex : index})
            //setStoryList({type: "inputChange", value : {iValue : e.target.value, itemIndex : index}})
          }
          rows="5"
          className="d-block w-full mt-2 md:text-xl text-md focus:outline-none input-add-p"
          placeholder={`Enter ${story.selectType}...`}
          type="text"/>  
        )
          break;
      default:
        bottomWidget = (
          <div className="text-center p-20">
            <p>Please select type</p>
          </div>
        )  
        break;

    }
    return (<li key={index + 1}
      className="border-b border-gray-300">
      <div 
      className="mt-4">
        <div className="flex w-full">
          <select 
              name="selectType"
              value={story.selectType}
              //value={story.type}
              onChange={(e) => 
                updateDropDownCell({dValue : e.target.value, dIndex : index})
                //setStoryList({type: "dropdown", value : })
            }
              className="self-center w-1/2
              mt-2 block appearance-none bg-white 
              border py-3 px-4 pr-8 rounded leading-tight 
              outline-none  hover:border-blue-500">
                    <option>Select type</option>
                    <option value="Paragraph">Paragraph</option>
                    <option value="Image">Image</option>
                    <option value="Quote">Quote</option>
                    <option value="Subtitle">Subtitle</option>
                    <option value="Point">Point</option>
          </select>
        <div className="ml-auto self-center h-full">
          <button 
          onClick={() => {
            if(story.selectType === "Image"){
              if(story.input.length !== 0){
                removeImageContent({r_index :index})
                //setStoryList({type: "removeImage", value : })
              }else {
                removeStoryCell(index)
                //setStoryList({type: "remove", value : index})
              }
            }else {
              removeStoryCell(index)
              //setStoryList({type: "remove", value : index})
            }
          }}
          className="flex hover:bg-gray-200 text-gray-700 py-3 px-4">
            <i className="fa fa-trash text-sm ml-1 text-lg self-center "></i>
            <p className="self-center ml-2 text-sm font-semibold">Delete</p>
          </button>
        </div>
      </div>
      </div>
      {bottomWidget}
        
    </li>)
  })

  

  const onAddOrRemoveAt = (isForAdd) => {
    let value = inBetween - 1
    if(inBetween > 0 && value <= singleStory.length) {
      setAlert(`${isForAdd ? 'Added' : 'Removed' } at ${inBetween}` , 'green')
      if(isForAdd){
        addStoryCell({defaultValue : {id : uuidv4() , selectType : 'default', input: '' }, defaultIndex : value})
        //setStoryList()
      }else {
        removeStoryCell(value)
        //setStoryList({type : "remove" , value : value})
      }
      
    }else {
      setAlert(`Invalid value provided` , 'red')
    }
  }

 

  if(!isAuthenticated){
    return <Redirect to={HOME_ROUTE}/>;
  }

  

  return (
    <div>
      <div className="flex md:px-20 px-8 py-4 bg-gray-100 border boder-b-1">
        <img
          src={appLogo} 
          className="md:h-10 md:w-10 w-8 h-8 self-center"
          alt="appLogo"/>
        <h1 className="self-center ml-2 md:text-xl text-lg text-gray-700">New Story</h1>     
        <Link to={HOME_ROUTE} className="self-center ml-auto text-md text-gray-700 px-8 py-2 hover:bg-gray-300 hover:rounded-lg">
          Home
        </Link>
        <div className="md:w-12 md:h-12 w-10 h-10 self-center">
          
          <div 
          onClick={() => isProfileVisible(profileVisible => !profileVisible)} 
          className="relative">
            <img 
              className="w-full h-full rounded-full border-white border-2 shadow-lg ml-2 cursor-pointer"
              src="https://hashnode.imgix.net/res/hashnode/image/upload/v1584181566095/yFdLG8gjE.png?w=200&h=200&fit=crop&crop=faces&auto=format&q=60" 
              alt="profile_image"/>
            <div 
              className={`w-48 absolute appbar-drop-down border border-gray-400 rounded shadow-lg z-10 bg-white app-bar-dropdown-right ${profileVisible ? '' : 'hidden'}`}>
              <div 
              onClick={() => {}} 
              className="flex px-4 py-3 hover:bg-gray-200 cursor-pointer tracking-wide w-full text-left text-gray-700">
                <i className="fa fa-user-circle text-xl self-center"></i>
                <span className="ml-2 text-base font-sen">Profile</span>
              </div>
              <div 
              onClick={() => {
                history.push(HOME_ROUTE);
                logout()}} 
              className="flex px-4 py-3 hover:bg-gray-200 cursor-pointer tracking-wide w-full text-left text-gray-700">
                <i className="fa fa-sign-out text-xl self-center"></i>
                <span className="ml-2 text-base font-sen">Log Out</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="">
        <div className="flex flex-wrap">
          <div className="md:w-2/3 lg:w-3/4 w-full md:px-20
            px-6">
            <textarea
            onChange={(e)=> setTitle(e.target.value)}
            className="d-block w-full md:mt-12 mt-8 md:text-4xl text-3xl input-add-title focus:outline-none"
            rows={titleHeight}
            placeholder="Title..."
            type="text"/>
            <div className="bg-white rounded mt-6 flex flex-wrap text-sm
            text-gray-700 sticky top-0 border-t border-b border-gray-300 z-20">
              <button
              className="px-4 h-10 app-font-color border-b-2 app-border-bottom font-extrabold font-sen hover:bg-gray-200">
                <i className="fa fa-pencil self-center"></i>
                <span className="ml-2 font-semibold">Write</span>
              </button>
              <button
              className="px-4 h-10 hover:bg-gray-200"
              >
                <i className="fa fa-eye self-center"></i>
                <span className="ml-2 font-semibold">Preview</span>
              </button>
              <button
              className="px-4 h-10 hover:bg-gray-200">
                <i className="fa fa-info self-center"></i>
                <span className="ml-2 font-semibold">Help</span>
              </button>
 
              <button 
              onClick={() => 
                addStoryCell({defaultValue : {id : uuidv4() , selectType : 'default', input: '' }, defaultIndex : storyList.length})}
              className="ml-auto px-4 h-10 hover:bg-gray-200">
                <i className="fa fa-plus self-center"></i>
                <span className="ml-2 font-semibold">Add</span>
              </button>
              <button
              onClick={() => 
                removeStoryCell(singleStory.length-1)
                //setStoryList({type : "remove" , value : storyList.length-1})
              }
              className="px-4 h-10 hover:bg-gray-200">
                <i className="fa fa-minus self-center"></i>
                <span className="ml-2 font-semibold">Remove</span>
              </button>
            </div>
            <ul>
              {storyListJSX}
            </ul>
            {/*  */}
          </div>
          <div className="md:w-1/3 lg:w-1/4 w-full text-gray-600">
            <div className="border-l border-gray-300 sticky top-0">
              {/* Publish Section */}
              <div className="border-b border-gray-300 p-8">
                <div className="flex">
                  <i className="fa fa-check self-center"></i>
                  <p className="ml-1 text-black">Draft Saved</p>
                </div>
                <button className="mt-2 app-color hover:text-white rounded text-white py-2 px-4 focus:outline-none hover:shadow-md shadow transition duration-500 ease-in-out cursor-pointer">
                  Publish Story
                </button>
              </div>

              {/* Add/Remove In between  */}
              <div className="border-b border-gray-300 p-8">
                <div className="flex flex-wrap">
                  <i className="fa fa-image self-center"></i>
                  <p className="ml-1 text-black">Add/Remove At</p>
                </div>
                <div className="flex justify-between mt-2" >
                  <button 
                  onClick={() => onAddOrRemoveAt(true)}
                  className="border border-gray-300 bg-white rounded-lg p-2 focus:outline-none hover:shadow-md transition duration-500 ease-in-out flex text-gray-700 cursor-pointer">
                    <i className="fa fa-plus self-center"></i>
                    <span className="ml-1 text-sm">Add</span>
                  </button>
                  <input 
                    onChange={(e) => setInBetween(e.target.value)}
                    maxLength={4}
                    value={inBetween}
                    type="number"
                    min="1" max="100"
                    className="w-16 h-10 border-gray-300 focus:outline-none rounded border focus:border-blue-600 self-center px-2 text-center"
                  />  
                  <button 
                  onClick={() => onAddOrRemoveAt(false)}
                  className="border border-gray-300 bg-white rounded-lg p-2 focus:outline-none hover:shadow-md transition duration-500 ease-in-out flex text-gray-700 cursor-pointer">
                    <i className="fa fa-minus self-center"></i>
                    <span className="ml-1 text-sm">Remove</span>
                  </button>
                </div>
              </div>

              {/* Tags Section */}
              <div className="border-b border-gray-300 p-8">
                <div className="flex">
                  <i className="fa fa-tags self-center"></i>
                  <p className="ml-1 text-black">Tags</p>
                </div>
                <p className="text-sm mt-2 text-gray-900">Select upto 5 tags. Enter the tag name and select from the suggestions.</p>
                <button className="border border-gray-300 mt-2 bg-white rounded-lg p-2 focus:outline-none hover:shadow-md transition duration-500 ease-in-out flex text-gray-700 cursor-pointer">
                  <i className="fa fa-plus self-center"></i>
                  <span className="ml-1 text-sm">Add tags</span>
                </button>
              </div>
              {/* Cover Image Section */}
              <div className="border-b border-gray-300 p-8">
                <div className="flex">
                  <i className="fa fa-image self-center"></i>
                  <p className="ml-1 text-black">Select a cover for this story</p>
                </div>
                <button className="border border-gray-300 mt-2 bg-white rounded-lg p-2 focus:outline-none hover:shadow-md transition duration-500 ease-in-out flex text-gray-700 cursor-pointer">
                  <i className="fa fa-plus self-center"></i>
                  <span className="ml-1 text-sm">Add cover</span>
                </button>
              </div>
              {/* Back Date Section */}
              <div className="border-b border-gray-300 p-8">
                <div className="flex">
                  <i className="fa fa-image self-center"></i>
                  <p className="ml-1 text-black">Backdate this post</p>
                </div>
                <button className="border border-gray-300 mt-2 bg-white rounded-lg p-2 focus:outline-none hover:shadow-md transition duration-500 ease-in-out flex text-gray-700 cursor-pointer">
                  <i className="fa fa-plus self-center"></i>
                  <span className="ml-1 text-sm">Set Custom Date</span>
                </button>
              </div>

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