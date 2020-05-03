import React, {useEffect,useState} from 'react'
import membersBanner from '../../../app_images/members-img-1.png'
import MemberItem from './adapter/MemberItem'
import {STUDENT , TEACHER} from '../../utils/constants'

export const Members = () => {
  const [type, setType] = useState(STUDENT)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="md:px-16 px-6 px-2 bg-gray-200 min-h-screen pb-6">
      
      <div className="md:flex-row -mx-2 flex flex-col-reverse">
        <div className="md:w-1/4 px-2 w-full mt-6 md:mt-0">
          <div className="sticky top-story">
            <div className="bg-white rounded p-4 mt-4">
              <p className="font-sen text-black text-xl md:text-2xl font-bold">Community Members</p> 
              <p className="text-gray-700">Browser Hashnode community members and follow them to see their posts on your feed.</p>
              <img 
              className="md:w-4/5 mx-auto my-4 w-2/4"
              src={membersBanner} 
              alt="members_banner"/>
            </div>
          </div>
        </div>
        <div className="md:w-3/4 px-2 w-full">
          {/* Tab Section */}
          <div className="bg-white rounded md:mt-0 flex flex-wrap text-sm text-gray-700 sticky top-story-data">
            <div className="w-full h-4 bg-gray-200"></div>
            <button
            onClick={() => setType(STUDENT)}
            className={`px-4 h-10 ${type === STUDENT ? 'font-extrabold app-font-color border-b-2 app-border-bottom' : ''}`}>
              <span className="font-semibold">STUDENTS</span>
            </button>
            <button 
            onClick={() => setType(TEACHER)}
            className={`px-4 h-10 ${type === TEACHER ? 'font-extrabold app-font-color border-b-2 app-border-bottom' : ''}`}>
              <span className="font-semibold">TEACHERS</span>
            </button>
            {/* <button
            className="px-4 h-10">
              <span className="font-semibold">RECENTLY JOINED</span>
            </button> */}
          </div>

          {/* Story List Section */}
          <div className="">
            <div className="flex -mx-2 flex-wrap">
              {
                <MemberItem type={type}/>
              }
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
