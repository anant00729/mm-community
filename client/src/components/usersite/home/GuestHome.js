import React, {useEffect} from 'react'
import mainHomeImg from '../../../app_images/main-home-img.png'
import imageOne from '../../../app_images/main-home-i1.png'
import imageTwo from '../../../app_images/main-home-i2.png'
import imageThree from '../../../app_images/main-home-i3.png'
import { Link, Redirect } from 'react-router-dom';
import {REGISTER_ROUTE, LOGIN_ROUTE, HOME_FEED_ROUTE, IMAGE_BASE_URL , SHOW_STORY} from '../../utils/constants';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {getAllStories} from '../../../actions/story'




const GuestHome = ({isAuthenticated, getAllStories, popularStoryList}) => {

  useEffect(() => {getAllStories()}, [])
 
  if (isAuthenticated) {
    return <Redirect to={HOME_FEED_ROUTE}/>;
  }

  let popularStoryListJSX = popularStoryList.map((story, index) => {
    let para = story.content.find(s=> s.selectType === "Paragraph")
    let { title , cover_image , id } = story
    if(para){
      if(para.input.length > 300){
        para.input = `${para.input.substring(1, 300)}...`;
      }
    }
    return (
      <div
      key={index}
       className="md:w-1/2 lg:w-1/3 w-full mb-6 cursor-pointer">
         <Link to={`${SHOW_STORY}/${id}`}>
          <div className="mr-2 border border-gray-200 bg-white border rounded hover:shadow-lg overflow-hidden mr-2 transition duration-500 ease-in-out">
            <div 
              className="h-56 mx-auto mb-4 post-cover w-full block bg-cover bg-center"
              style={{backgroundImage : `url(${IMAGE_BASE_URL}${cover_image})`}}
              alt=""/>
              <div className="py-2 px-4">
                <p className="font-sen text-black text-xl md:text-2xl font-medium">{title}</p>
                <p className="text-gray-700">{para.input}</p>
              </div>
            </div>
          </Link>
      </div>
    )
  })

  return (
    <div>
      <div className="flex flex-col-reverse md:flex-col">
        <div className="text-center mt-10 px-4">
          <p className="text-gray-600 font-sen text-xs md:text-sm">
            FRIENDLY AND INCLUSIVE DEVELOPER COMMUNITY
          </p>
          <p className="mt-2 font-sen text-black text-4xl md:text-5xl">
            Welcome to StudyNode
          </p>
          <p className="text-base md:text-lg">A place to share your life as a developer and connect with 
            <br/>
            the best developers from across the world.</p>
          <div className="mt-4">
            <Link to={REGISTER_ROUTE} className="app-color hover:text-white rounded text-white py-2 px-4  focus:outline-none hover:shadow-xl shadow transition duration-500 ease-in-out">
              Create an account
            </Link>
          </div>
          <div className="mt-4">
            <Link to={LOGIN_ROUTE} className="text-gray-700  hover:text-black px-2 py-4 focus:outline-none">Already have an account?</Link>
          </div>
        </div>
        <div className="w-full mt-6 md:mt-0">
          <img 
          className="lg:w-1/2 mx-auto w-full px-16 mt-4 md:w-3/4 object-cover"
          src={mainHomeImg} alt="mainHomeImg" />
        </div>
      </div>


      <div className="container mx-auto py-8 md:py-10 px-4 mt-2 xl:px-0">

        <div className="md:mt-0 mt-2">
          <p className="text-gray-600 font-sen text-sm md:text-lg font-medium tracking-wide">LEARN. SHARE. CONNECT.</p>
          <p className="font-sen text-black text-3xl md:text-4xl">Helping devs solve real-life issues</p>
          <div className="md:flex md:flex-wrap md:justify-between mt-4">
            <div className="md:w-1/3 w-full mb-6">
              <img 
                className="h-56 mx-auto mb-4"
                src={imageOne} 
                alt=""/>
                <p className="font-sen text-black text-xl md:text-2xl font-medium">Publish stories</p>
                <p className="text-gray-700">Ask a question on StudyNode and get help from the community members. We do not ban users for asking subjective and opinionated questions. Go anonymous, if you are too shy.</p>
            </div>
            <div className="md:w-1/3 w-full mb-6">
              <img 
                className="h-56 mx-auto mb-4"
                src={imageTwo} 
                alt=""/>
                <p className="font-sen text-black text-xl md:text-2xl font-medium">Ask a question</p>
                <p className="text-gray-700">Ask a question on StudyNode and get help from the community members. We do not ban users for asking subjective and opinionated questions. Go anonymous, if you are too shy.</p>
            </div>
            <div className="md:w-1/3 w-full mb-6">
              <img 
                className="h-56 mx-auto mb-4"
                src={imageThree} 
                alt=""/>
                <p className="font-sen text-black text-xl md:text-2xl font-medium">Start your new blog</p>
                <p className="text-gray-700">Build your own brand and start a blog on your domain for free with StudyNode. Write stories on your blog and share them with StudyNode community directly.</p>
            </div>
          </div>
        </div>
        
        {/* Trending Section */}
        <div className="mt-2">
          <p className="text-gray-600 font-sen text-sm md:text-lg font-medium tracking-wide mt-16">DEVELOPER STORIES</p>
          <p className="font-sen text-black text-3xl md:text-4xl">Trending developer stories on StudyNode</p>
          <div className="md:flex md:flex-wrap md:justify-start mt-8">
            {popularStoryListJSX}
          </div>
        </div>
      </div>
    </div>
  )
}

GuestHome.propTypes = {
  isAuthenticated: PropTypes.bool,
  getAllStories: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  popularStoryList: state.story.popularStoryList
});

const allActions = {
  getAllStories
}


export default connect(mapStateToProps, allActions)(GuestHome);


