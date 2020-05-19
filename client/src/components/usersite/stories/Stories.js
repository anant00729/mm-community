import React, {useEffect} from 'react'
import {CREATE_STORY_ROUTE} from '../../utils/constants';
import { Link, Redirect } from 'react-router-dom';
import StoryItem from './adapter/StoryItem'
import { connect } from 'react-redux';



const Stories = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  return (
    <div className="md:px-16 px-2 bg-gray-200 min-h-screen pb-6">
      <div className="md:flex-row -mx-2 flex flex-col">
        <div className="md:w-1/4 px-2 w-full">
          <div className="sticky top-story">
            <div className="bg-white rounded p-4 mt-4">
              <p className="font-sen text-black text-xl md:text-2xl font-bold">Popular Stories</p> 
              <p className="text-gray-700 mb-4">Learnt something new recently? Write about it on Hi-Story and showcase your knowledge.</p>
              <Link to={`${CREATE_STORY_ROUTE}/0`}to={CREATE_STORY_ROUTE} className="app-color hover:text-white rounded text-white py-2 px-4 focus:outline-none hover:shadow-md shadow transition duration-500 ease-in-out">
                New Story
              </Link>
            </div>
          </div>
        </div>
        <div className="md:w-3/4 px-2 w-full">
          {/* Tab Section */}
          {/* <div className="sticky top-story-data bg-gray-200">
            <div className="w-full h-4 bg-gray-200"></div>
            <div className="bg-white rounded mt-4 md:mt-0 flex flex-wrap text-sm text-gray-700">
              <button
              className="px-4 h-10 app-font-color border-b-2 app-border-bottom font-extrabold">
                <span className="font-semibold">POPULAR</span>
              </button>
              <button
              className="px-4 h-10"
              >
                <span className="font-semibold">FEATURED</span>
              </button>
              <button
              className="px-4 h-10">
                <span className="font-semibold">RECENT</span>
              </button>
            </div>
          </div> */}

          {/* Story List Section */}
          {/* <div className="mx-auto loader mt-56"></div> */}
          {/* {storyList} */}
          <StoryItem/>
          

        </div>
      </div>
    </div>
  )
}


Stories.propTypes = {
  // getAllStories: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

const allActions = {
  
}

export default connect(mapStateToProps, allActions)(Stories);