import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import {HOME_ROUTE} from '../../utils/constants';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {CREATE_STORY_ROUTE} from '../../utils/constants';


const HomeFeed = ({isAuthenticated}) => {
  const [menuHidden , setMenuHidden] = useState(true)
  if(!isAuthenticated){
    return <Redirect to={HOME_ROUTE}/>;
  }

  const storyList = []

  for(let i = 0 ; i < 20 ; i++ ){
    storyList.push(
      <div className="bg-white rounded mb-4 p-4 cursor-pointer">
        <div className="flex">
          <img 
          className="w-12 h-12 rounded-full"
          src="https://hashnode.imgix.net/res/hashnode/image/upload/v1584181566095/yFdLG8gjE.png?w=200&h=200&fit=crop&crop=faces&auto=format&q=60" 
          alt="profile_image"/>
          <p className="self-center ml-3 text-sm font-semibold md:text-base">Domenico Solazzo's blog</p>
        </div>
        <div className="md:flex mt-4">
          <div className="md:w-3/4 w-full mr-4">
            <p className="font-sen text-black font-bold md:text-2xl text-xl">
              I GOT THE JOB: 3 Tips On How You Can Get Your Dream Job
            </p>
            <p className="mt-2 text-gray-700">
              I did it! I did it! Finally, I got the job that I really wanted. 🎉🎉🎉 It feels so good! It took some time, but finally, I found the job with the responsibilities that I was looking for. I got a job as Tech Lead! It took so many hours of research an...
            </p>
          </div>
          <div className="md:w-1/4 w-full mt-3 md:mt-0"> 
            <div 
                className="h-56 md:h-32 ml-auto post-cover w-full bg-cover bg-center rounded"
                style={{backgroundImage : `url(${"https://www.apple.com/v/iphone/home/af/images/overview/hero/hero_iphone11_pro_alt__f7h0mlyexoya_large_2x.jpg"})`}}
                alt=""/>
          </div>

        </div>
      </div>
    )
  }

  return (
    <div className="md:px-16 px-6 px-2 bg-gray-200 min-h-screen pb-6">
      <div className="flex -mx-2 flex-wrap">
        <div className="w-full lg:w-1/5 px-2">
          <div className="sticky top-app-bar-mdd">
            <div className="h-4 w-full"></div>
            <div className="bg-white rounded">
              <div className="px-4 py-3 flex app-font-color border-r-2 border-blue-500 cursor-pointer">
                <i className="fa fa-home self-center text-xl"></i>
                <p className="self-center ml-4 text-md">My Feeds</p>
              </div>
              <div className="px-4 py-3 flex text-gray-800 cursor-pointer">
                <i className="fa fa-home self-center text-xl"></i>
                <p className="self-center ml-4 text-md">My Stories</p>
              </div>
              <div className="px-4 py-3 flex text-gray-800 cursor-pointer">
                <i className="fa fa-home self-center text-xl"></i>
                <p className="self-center ml-4 text-md">My Discussions</p>
              </div>
            </div>
            <button 
            onClick={() => setMenuHidden(menuHidden => !menuHidden)}
            className="app-color hover:text-white rounded text-white py-2 px-4 mt-4 focus:outline-none hover:shadow-md w-full flex justify-center">
              <i className="fa fa-plus self-center text-md"></i>
              <p className="self-center ml-2">New Post</p>
            </button>
            <div 
            className={`bg-white rounded ${menuHidden ? 'hidden' : ''}`}>
              <Link to={CREATE_STORY_ROUTE} className="px-4 py-3 flex cursor-pointer border-b border-gray-200">
                <i className="fa fa-home self-center text-xl"></i>
                <p className="self-center ml-4 text-md">New story</p>
              </Link>
              <Link to={CREATE_STORY_ROUTE} className="px-4 py-3 flex cursor-pointer border-b border-gray-200">
                <i className="fa fa-home self-center text-xl"></i>
                <p className="self-center ml-4 text-md">New discussion</p>
              </Link>
              <Link to={CREATE_STORY_ROUTE} className="px-4 py-3 flex cursor-pointer border-b border-gray-200">
                <i className="fa fa-home self-center text-xl"></i>
                <p className="self-center ml-4 text-md">New poll</p>
              </Link>
            </div>
          </div>
          

        </div>
        <div className="w-full lg:w-3/5 px-2 mt-4 lg:mt-0">
        <div className="h-4 w-full"></div>
          {storyList}
        </div>
        <div className="w-full lg:w-1/5 px-2 mt-4 lg:mt-0">
          <div className="sticky top-app-bar-mdd">
            <div className="h-4 w-full"></div>
            <div className="bg-white rounded">
              <div className="px-4 py-3">
                <div className="flex">
                  <p className="self-center text-md">Top Stories</p>
                  <i className="fa fa-cloudversify self-center text-xl text-black"></i>
                </div>
                <p className="text-sm mt-2 text-gray-600">This month's most commented discussions on Hashnode</p>
              </div>
              <div className="px-1 py-2 flex text-gray-800 cursor-pointer">
                <p className="self-center ml-4 text-sm">Next.js Team AMA, Ask us Anything!</p>
              </div>
              <div className="px-1 py-2 flex text-gray-800 cursor-pointer">
                <p className="self-center ml-4 text-sm">Next.js Team AMA, Ask us Anything!</p>
              </div>
            </div>
            <div className="bg-white rounded mt-4">
              <div className="px-4 py-3">
                <div className="flex">
                  <p className="self-center text-md">Top Discussions</p>
                  <i className="fa fa-cloudversify self-center text-xl text-black"></i>
                </div>
                <p className="text-sm mt-2 text-gray-600">This month's most commented discussions on Hashnode</p>
              </div>
              <div className="px-1 py-2 flex text-gray-800 cursor-pointer">
                <p className="self-center ml-4 text-sm">Next.js Team AMA, Ask us Anything!</p>
              </div>
              <div className="px-1 py-2 flex text-gray-800 cursor-pointer">
                <p className="self-center ml-4 text-sm">Next.js Team AMA, Ask us Anything!</p>
              </div>
            </div>
          </div>
       
        </div>
      </div>
    </div>

  )
}

HomeFeed.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(HomeFeed);


