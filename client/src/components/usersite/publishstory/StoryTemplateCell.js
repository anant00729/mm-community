import React from 'react'
import {IMAGE_BASE_URL} from '../../utils/constants';


const StoryTemplateCell = ({story, index, inputChannelCell, updateDropDownCell, removeImageContent, removeStoryCell, onFileUpdate}) => {
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
                src={`${IMAGE_BASE_URL}${story.input}`} alt="image_logo"/>
              </div>
            )}
          </div>
        )

        if(story.loading){
          bottomWidget = (
            <div className="bg-blue-500 mt-4 w-full h-40 animate text-center flex text-gray-500">
              <p className="self-center w-full">Uploading Image...</p>
            </div>
          )
        }

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
              }else {
                removeStoryCell(index)
              }
            }else {
              removeStoryCell(index)
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
}


export default StoryTemplateCell;

