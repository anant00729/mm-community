import React , { useState, useEffect } from 'react'
import appLogo from '../../../app_images/network.png'


export const PublishStory = () => {
  const [title, setTitle] = useState('')
  const [titleHeight, setTitleHeight] = useState(1)
  const [dropDownVisible , isDropDownVisible] =  useState(false)
  const [alist , setAlist] =  useState([])
  const dummyList = []
  
  
  useEffect(() => {
    const rows = Math.floor(title.length / 55) + 1
    setTitleHeight(rows)
  }, [title])


  const onAddOrRemoveClick = (isToAdd) => {
    const aTemplate = (
    <li key={alist.length + 1}
    className="border-b border-gray-300">
    <div 
    onMouseEnter={() => isDropDownVisible(true)}
    onMouseLeave={() => isDropDownVisible(false)}
    className="mt-4">
      <div className="flex w-full">
        <p className="self-center">Select Type</p>
        <div className="relative">
          <button 
          className="px-4 py-2 hover:bg-gray-200 cursor-pointer tracking-wide app-font-color">
            <span className="text-xl">Paragraph</span> 
            <i className="fa fa-chevron-down text-sm ml-1"></i>
          </button>
          <div 
          className={`absolute appbar-drop-down rounded shadow-lg z-10 bg-white ${dropDownVisible ? '' : 'hidden'}`}>
            <button 
            onClick={() => isDropDownVisible(false)}
            className="px-4 py-2 hover:bg-gray-200 cursor-pointer tracking-wide w-full text-left">Paragraph</button>
            <button 
            onClick={() => isDropDownVisible(false)}
            className="px-4 py-2 hover:bg-gray-200 cursor-pointer tracking-wide w-full text-left">Quote</button>
            <button 
            onClick={() => isDropDownVisible(false)}
            className="px-4 py-2 hover:bg-gray-200 cursor-pointer tracking-wide w-full text-left">Image</button>
            <button 
            onClick={() => isDropDownVisible(false)}  
            className="px-4 py-2 hover:bg-gray-200 cursor-pointer tracking-wide w-full text-left">About</button>
        </div>
      </div>
      <div className="ml-auto self-center h-full">
        <button className="flex hover:bg-gray-200 text-gray-700 py-3 px-4">
          <i className="fa fa-trash text-sm ml-1 text-lg self-center "></i>
          <p className="self-center ml-2 text-sm font-semibold">Delete</p>
        </button>
        
      </div>
      
    </div>
    </div>
      <textarea
      rows="5"
      className="d-block w-full mt-2 md:text-xl text-md focus:outline-none input-add-p"
      placeholder="Tell your story..."
      type="text"/>  
  </li>)
    setAlist(isToAdd ? alist.concat(aTemplate) : [...alist.filter(item => item.key !== alist[alist.length - 1].key)]) 
  }
  

  return (
    <div>
      <div className="flex md:px-20 px-8 py-4 bg-gray-100 border boder-b-1">
        <img src={appLogo} 
            className="md:h-10 md:w-10 w-8 h-8 self-center"
            alt="appLogo"/>
        <h1 className="self-center ml-2 md:text-xl text-lg text-gray-700">New Story</h1>     
        <button className="self-center ml-auto text-md text-gray-700 px-8 py-2 hover:bg-gray-300 hover:rounded-lg">Home</button>
        <div className="md:w-12 md:h-12 w-10 h-10 self-center">
          <img 
            className="w-full h-full rounded-full border-white border-2 shadow-lg ml-2 cursor-pointer"
            src="https://hashnode.imgix.net/res/hashnode/image/upload/v1584181566095/yFdLG8gjE.png?w=200&h=200&fit=crop&crop=faces&auto=format&q=60" 
            alt="profile_image"/>
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
              onClick={() => onAddOrRemoveClick(true)}
              className="ml-auto px-4 h-10 hover:bg-gray-200">
                <i className="fa fa-plus self-center"></i>
                <span className="ml-2 font-semibold">Add</span>
              </button>
              <button
              onClick={() => onAddOrRemoveClick(false)}
              className="px-4 h-10 hover:bg-gray-200">
                <i className="fa fa-minus self-center"></i>
                <span className="ml-2 font-semibold">Remove</span>
              </button>
            </div>
            <ul>
              {alist}
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
