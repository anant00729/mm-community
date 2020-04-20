import React from 'react'

export default function StorySidePanel({inBetween,onAddOrRemoveAt, setInBetween}) {
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
      
    </>
  )
}
