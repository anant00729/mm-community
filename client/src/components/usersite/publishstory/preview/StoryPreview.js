import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import {setAlert} from '../../../../actions/alert'


const StoryPreview = ({singleStory, setAlert}) => {
  let story = singleStory.find(story=> story.selectType === 'BannerImage')
  return (
    <div className="px-2">
      <div className="md:w-5/6 mx-auto">
        <img className="post-cover bg-cover bg-center mx-auto" 
        src={story.input}
        />
      </div>
      
      <div className="flex -mx-2 justify-center mt-4">
        <div className="w-full px-2">
          <div className="">
            <h1 className="text-4xl font-sen font-bold">
              Add Copyright or License text to the Source Files Recursively
            </h1>
            <div className="flex">
              <div className="w-full flex flex-wrap py-4">
                <img 
                className="w-14 h-14 rounded-full cursor-pointer"
                src="https://hashnode.imgix.net/res/hashnode/image/upload/v1584181566095/yFdLG8gjE.png?w=200&h=200&fit=crop&crop=faces&auto=format&q=60" 
                alt="profile_image"/>
                <p className="self-center ml-4">Tapas Adhikary published a story Apr 17</p>
              </div>
            </div>
          </div>
          <div>
              <h1 className="w-full md:text-4xl text-3xl input-add-title py-1">Introduction</h1>
              <p className="text-xl text-gray-800 py-1">Recently I was assigned to the task of adding a Copyright text block to all the JavaScript Source Code files. Initially the task was assumed to be an easy one as I thought of using any related VSCode Extensions to achieve it. However it was proved to be hectic when I found, I have to do it for 250 odd files 😲!
              What next? Of course the natural instinct was to, search on web for a tool that does it. I just did that. I found many responses, specially few great directions from StackOverFlow.</p>
              <h1 className="w-full md:text-4xl text-3xl input-add-title py-1">Introduction</h1>
              <p className="text-xl text-gray-800 py-1">Recently I was assigned to the task of adding a Copyright text block to all the JavaScript Source Code files. Initially the task was assumed to be an easy one as I thought of using any related VSCode Extensions to achieve it. However it was proved to be hectic when I found, I have to do it for 250 odd files 😲!
              What next? Of course the natural instinct was to, search on web for a tool that does it. I just did that. I found many responses, specially few great directions from StackOverFlow.</p>
              <h1 className="w-full md:text-4xl text-3xl input-add-title py-1">Introduction</h1>
              <p className="text-xl text-gray-800 py-1">Recently I was assigned to the task of adding a Copyright text block to all the JavaScript Source Code files. Initially the task was assumed to be an easy one as I thought of using any related VSCode Extensions to achieve it. However it was proved to be hectic when I found, I have to do it for 250 odd files 😲!
              What next? Of course the natural instinct was to, search on web for a tool that does it. I just did that. I found many responses, specially few great directions from StackOverFlow.</p>

              <ul className="text-xl text-gray-800 ml-10 py-8 px-10" style={{listStyle : 'disc'}}>
                <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta, aliquam.</li>
                <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta, aliquam.</li>
                <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta, aliquam.</li>
              </ul>

              <p className="text-xl text-gray-800 py-1">Recently I was assigned to the task of adding a Copyright text block to all the JavaScript Source Code files. Initially the task was assumed to be an easy one as I thought of using any related VSCode Extensions to achieve it. However it was proved to be hectic when I found, I have to do it for 250 odd files 😲!
              What next? Of course the natural instinct was to, search on web for a tool that does it. I just did that. I found many responses, specially few great directions from StackOverFlow.</p>

              <img className="post-cover bg-cover bg-center mx-auto my-2" 
              src={"https://i.ytimg.com/vi/wVP9ElVQGa0/maxresdefault.jpg"}
              />


              <div class="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 my-2" role="alert">
                <p className="text-xl">"Something not ideal might be happening."</p>
              </div>

              <p className="text-xl text-gray-800 py-1">Recently I was assigned to the task of adding a Copyright text block to all the JavaScript Source Code files. Initially the task was assumed to be an easy one as I thought of using any related VSCode Extensions to achieve it. However it was proved to be hectic when I found, I have to do it for 250 odd files 😲!
              What next? Of course the natural instinct was to, search on web for a tool that does it. I just did that. I found many responses, specially few great directions from StackOverFlow.</p>



              <div className="py-8 px-10">
                <ul className="text-xl text-gray-800 ml-10" style={{listStyle : 'disc'}}>
                  <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta, aliquam.</li>
                </ul>                
                <ul className="text-xl text-gray-800 ml-10" style={{listStyle : 'disc'}}>
                  <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta, aliquam.</li>
                </ul>
                <ul className="text-xl text-gray-800 ml-10" style={{listStyle : 'disc'}}>
                  <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta, aliquam.</li>
                </ul>  
              </div>

              
                
              
              
              
          </div>
        </div>
        <div className="w-1/6 px-2 hidden">
          {/* <div className="bg-gray-400 h-12">
          
          </div> */}
        </div>
      </div>
    </div>
  )
}


StoryPreview.propTypes = {
  isAuthenticated: PropTypes.bool,
  singleStory : PropTypes.array
};

const mapStateToProps = state => ({
  logout: PropTypes.func.isRequired,
  isAuthenticated: state.auth.isAuthenticated,
  singleStory : state.story.singleStory
});

const allActions = {
   setAlert
}

export default connect(mapStateToProps, allActions)(withRouter(StoryPreview));

