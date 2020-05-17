import React from 'react'
import { v4 as uuidv4 } from 'uuid';

export default function StoryTopPanel({setTitle , addStoryCell, removeStoryCell, singleStory, titleHeight,
    onTabItemChange, tabIndex
}) {
  return (
    <>
    <textarea
      onChange={(e)=> setTitle(e.target.value)}
      className="d-block w-full md:mt-12 mt-8 md:text-4xl text-3xl input-add-title focus:outline-none"
      rows={titleHeight}
      placeholder="Title..."
      type="text"/>
      <div className="bg-white rounded mt-6 flex flex-wrap text-sm
      text-gray-700 sticky top-0 border-t border-b border-gray-300 z-20">
        <button
        onClick={() => onTabItemChange(0)}
        className={`px-4 h-10 hover:bg-gray-200 ${tabIndex == 0 ? 'app-font-color border-b-2 app-border-bottom font-extrabold font-sen' : ''}`} 
        >
          <i className="fa fa-pencil self-center"></i>
          <span className="ml-2 font-semibold">Write</span>
        </button>
        <button
        onClick={() => onTabItemChange(1)}
        className={`px-4 h-10 hover:bg-gray-200 ${tabIndex == 1 ? 'app-font-color border-b-2 app-border-bottom font-extrabold font-sen' : ''}`} 
        >
          <i className="fa fa-eye self-center"></i>
          <span className="ml-2 font-semibold">Preview</span>
        </button>
        {/* <button
        onClick={() => onTabItemChange(2)}
        className={`px-4 h-10 hover:bg-gray-200 ${tabIndex == 2 ? 'app-font-color border-b-2 app-border-bottom font-extrabold font-sen' : ''}`} 
        >
          <i className="fa fa-info self-center"></i>
          <span className="ml-2 font-semibold">Help</span>
        </button> */}

        <button 
        onClick={() => 
          addStoryCell({defaultValue : {id : uuidv4() , selectType : 'default', input: '' }, defaultIndex : singleStory.length})}
        className="sm:ml-auto px-4 h-10 hover:bg-gray-200">
          <i className="fa fa-plus self-center"></i>
          <span className="ml-2 font-semibold">Add</span>
        </button>
        <button
        onClick={() => removeStoryCell(singleStory.length-1)}
        className="px-4 h-10 hover:bg-gray-200">
          <i className="fa fa-minus self-center"></i>
          <span className="ml-2 font-semibold">Remove</span>
        </button>
      </div>
      
    </>
  )
}
