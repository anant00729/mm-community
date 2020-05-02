import React, {useEffect} from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {getAllStories} from '../../../../actions/story'
import { setAlert } from '../../../../actions/alert';
import {IMAGE_BASE_URL} from '../../../utils/constants';


function StoryItem({type, popularStoryList, getAllStories}) {
  useEffect(() => {getAllStories()}, [])
  console.log('popularStoryList :>> ', popularStoryList);
  if(popularStoryList.length === 0){
    return (
      <div className="mx-auto loader mt-56"></div> 
    )
  }else {
    return (
      <ul>
        {popularStoryList.map((story, index)=> {
          let para = story.content.find(s=> s.selectType === "Paragraph")
          let title = story.title
          let profile_image = story.profile_image
          let cover_image = story.cover_image
          if(para){
            console.log('para.length :>> ', para.input.length);
            if(para.input.length > 300){
              para.input = `${para.input.substring(1, 300)}...`;
            }
          }
          
          
          return (
            <li 
            key={index}
            className="bg-white rounded mt-4 p-4 cursor-pointer">
              <div className="flex">
                <img 
                className="w-12 h-12 rounded-full border-gray-200 border-2"
                src={profile_image}
                alt="profile_image"/>
                <p className="self-center ml-3 text-sm font-semibold md:text-base">{story.name}'s blog</p>
              </div>
              <div className="md:flex mt-4">
                <div className="md:w-3/4 w-full mr-4">
                  <p className="font-sen text-black font-bold md:text-2xl text-xl">
                    {title}
                  </p>
                  <p className="mt-2 text-gray-700">
                    {para ? para.input : null}
                  </p>
                </div>
                <div className="md:w-1/4 w-full mt-3 md:mt-0"> 
                  <div 
                      className="h-56 md:h-32 ml-auto post-cover w-full bg-cover bg-center rounded"
                      style={{backgroundImage : `url(${IMAGE_BASE_URL}${cover_image})`}}
                      alt=""/>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    )
  }

  // storyList.push(
  //   <li className="bg-white rounded mt-4 p-4 cursor-pointer">
  //     <div className="flex">
  //       <img 
  //       className="w-12 h-12 rounded-full"
  //       src="https://hashnode.imgix.net/res/hashnode/image/upload/v1584181566095/yFdLG8gjE.png?w=200&h=200&fit=crop&crop=faces&auto=format&q=60" 
  //       alt="profile_image"/>
  //       <p className="self-center ml-3 text-sm font-semibold md:text-base">Domenico Solazzo's blog</p>
  //     </div>
  //     <div className="md:flex mt-4">
  //       <div className="md:w-3/4 w-full mr-4">
  //         <p className="font-sen text-black font-bold md:text-2xl text-xl">
  //           I GOT THE JOB: 3 Tips On How You Can Get Your Dream Job
  //         </p>
  //         <p className="mt-2 text-gray-700">
  //           I did it! I did it! Finally, I got the job that I really wanted. 🎉🎉🎉 It feels so good! It took some time, but finally, I found the job with the responsibilities that I was looking for. I got a job as Tech Lead! It took so many hours of research an...
  //         </p>
  //       </div>
  //       <div className="md:w-1/4 w-full mt-3 md:mt-0"> 
  //         <div 
  //             className="h-56 md:h-32 ml-auto post-cover w-full bg-cover bg-center rounded"
  //             style={{backgroundImage : `url(${"https://www.apple.com/v/iphone/home/af/images/overview/hero/hero_iphone11_pro_alt__f7h0mlyexoya_large_2x.jpg"})`}}
  //             alt=""/>
  //       </div>
  //     </div>
  //   </li>
  // )

  return (
    <ul>
      {/* {popularStoryList} */}
    </ul>
  )
}


StoryItem.propTypes = {
  getAllStories: PropTypes.func.isRequired
};


   
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  popularStoryList: state.story.popularStoryList,
  featuredStoryList: state.story.featuredStoryList,
  recentStoryList: state.story.recentStoryList,
});

const allActions = {
  getAllStories, setAlert
}

export default connect(mapStateToProps, allActions)(StoryItem);

