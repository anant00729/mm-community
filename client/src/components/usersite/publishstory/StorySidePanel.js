import React, {useState, useReducer} from 'react'
import DatePicker from "react-datepicker";
import close from '../../../../src/app_images/close.svg'
import close_black from '../../../../src/app_images/close_black.svg'
import "react-datepicker/dist/react-datepicker.css";


export default function StorySidePanel({inBetween,onAddOrRemoveAt, setInBetween}) {
  const [startDate, setStartDate] = useState(new Date());
  const [dateVisible, isDateVisible] = useState(false);
  let [coverImageVisible, setCoverImageVisible] = useState(0);
  const [tagVisible, isTagImageVisible] = useState(false);
  const [tags, setTags] = useState('');
  const [tagArray, setTagArray] = useState([]);
  let [bannerImg , setBannerImg] = useState('')


  const onBannerUpdate = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.addEventListener('load', () => {
        setBannerImg(reader.result)
      });
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    console.log('tags :', tags);

    setTagArray(tagArray=> {
      let defaultValue = tags
      let defaultIndex = 0
      let updateList = [...tagArray]
      updateList.splice(defaultIndex, 0, `#${defaultValue}`);
      setTags('')
      return updateList
    })
    
  }

  const onRemoveTag = (removeUIndex) => {
    setTagArray(tagArray=> {
      let updateList = tagArray.filter((_, index) => index !== removeUIndex)  
      return updateList
    })
  }

  let lagsArrayJSX = tagArray.map((tag, index) => {
    return (
      <li 
      onClick={() => onRemoveTag(index)}
      className="mt-1 bg-blue-200 text-gray-800 py-1 px-2 rounded-full text-sm border border-gray-200 flex">
      <span
        className="self-center">
          {tag}
      </span> 
      <img 
      className="w-4 h-4 self-center ml-1 cursor-pointer"
      src={close_black} alt="close_image"/>
    </li>
    )
  })


  switch(coverImageVisible){
     case 0: 
     
     coverImageVisible = (
      <button 
      onClick={() => setCoverImageVisible(1)}
      className="border border-gray-300 mt-2 bg-white rounded-lg p-2 focus:outline-none hover:shadow-md transition duration-500 ease-in-out flex text-gray-700 cursor-pointer hover:border-gray-600">
        <i className="fa fa-plus self-center"></i>
        <span className="ml-1 text-sm">Add cover</span>
      </button>
      )
     
    break;
    case 1:
      coverImageVisible = (
        <div className="shadow mt-2 text-center py-4 text-black rounded upload-btn-wrapper w-full">
          <i class="fa fa-cloud-upload text-2xl"></i>
          <p className="text-lg">SELECT AN IMAGE</p>
          <input type="file" accept="image/*" 
            onChange={(e) => {setCoverImageVisible(2);onBannerUpdate(e);}}/>
        </div>
      )
    break;
    case 2:
      coverImageVisible = (
        <div className="relative mt-4">
          <img 
          className="post-cover bg-cover bg-center mx-auto rounded shadow"
          src={bannerImg} alt="banner_image"/>
  
          <div 
          onClick={() => setCoverImageVisible(0)}
          className="absolute bg-white rounded-full w-6 h-6 text-center ic_close shadow border-2 border-white cursor-pointer">
            <img src={close} alt="ic_close"/>
          </div>
        </div>
      )
    break;
  }
  
  return (
    <>
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
        className="border border-gray-300 bg-white rounded-lg p-2 focus:outline-none hover:shadow-md transition duration-500 ease-in-out flex text-gray-700 cursor-pointer hover:border-gray-600">
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
        className="border border-gray-300 bg-white rounded-lg p-2 focus:outline-none hover:shadow-md transition duration-500 ease-in-out flex text-gray-700 cursor-pointer hover:border-gray-600">
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

      {
        tagVisible ? 
        (
          
          <div>
            <form 
              onSubmit={(e) => onSubmit(e)}>
              <input 
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full mt-2 py-2 px-2 focus:outline-none rounded"
              placeholder="add a tag and press enter"
              type="text"/>
            </form>
            <ul className="flex flex-wrap mt-1">
              {lagsArrayJSX}
            </ul>

          </div>
          
        )
        :
        (
          <button 
          onClick={() => isTagImageVisible(true)}
          className="border border-gray-300 mt-2 bg-white rounded-lg p-2 focus:outline-none hover:shadow-md transition duration-500 ease-in-out flex text-gray-700 cursor-pointer hover:border-gray-600">
            <i className="fa fa-plus self-center"></i>
            <span className="ml-1 text-sm">Add tags</span>
          </button>
        )
      }
    </div>
    {/* Cover Image Section */}
    <div className="border-b border-gray-300 p-8">
      <div className="flex">
        <i className="fa fa-image self-center"></i>
        <p className="ml-1 text-black">Select a cover for this story</p>
      </div>
      {
        coverImageVisible
      }
    </div>
    {/* Back Date Section */}
    <div className="border-b border-gray-300 p-8">
      <div className="flex">
        <i className="fa fa-image self-center"></i>
        <p className="ml-1 text-black">Backdate this post</p>
      </div>
      {
       dateVisible ?  (
        <DatePicker 
        showYearDropdown={true}
        shouldCloseOnSelect={true}
        showMonthDropdown={true}
        className="w-full py-2 px-2 mt-2 focus:outline-none rounded"
        selected={startDate} onChange={date => setStartDate(date)} />
       ): 
       (
        <button 
        onClick={() => isDateVisible(true)}
        className="border border-gray-300 mt-2 bg-white rounded-lg p-2 focus:outline-none hover:shadow-md transition duration-500 ease-in-out flex text-gray-700 cursor-pointer hover:border-gray-600">
          <i className="fa fa-plus self-center"></i>
          <span className="ml-1 text-sm">Set Custom Date</span>
        </button>
       )
      }
    </div>
      
    </>
  )
}
