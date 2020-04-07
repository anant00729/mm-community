import React from 'react'
import membersBanner from '../../../app_images/members-img-1.png'

export const Members = () => {


  let memeberList = []

  for(let i = 0 ; i < 20 ; ++ i){
      memeberList.push(
        <div className="md:w-1/3 w-1/2 px-2 mt-4">
          <div className="rounded bg-white text-center py-6">
            <img 
                className="w-20 h-20 rounded-full mx-auto"
                src="https://hashnode.imgix.net/res/hashnode/image/upload/v1584181566095/yFdLG8gjE.png?w=200&h=200&fit=crop&crop=faces&auto=format&q=60" 
                alt="profile_image"/>
            <p className="font-sen text-md font-bold mt-4">Bolaji Ayodeji</p>
            <p className="font-sen text-gray-700">Dev Evangelist, Outreach at Hashnode</p>
            <p className="font-sen mt-1">Joined: <strong>May 17, 2019</strong></p>
          </div>
        </div>
      )
  }


  return (
    <div className="relative md:px-16 px-6 px-2 bg-gray-200 min-h-screen pb-6">
      <div className="bg-gray-200 h-6 w-full sticky top-0"></div>
      <div className="md:flex-row -mx-2 flex flex-col-reverse">
        <div className="md:w-1/4 px-2 w-full mt-6 md:mt-0">
          <div className="bg-white rounded p-4 sticky top-6">
            <p className="font-sen text-black text-xl md:text-2xl font-bold">Community Members</p> 
            <p className="text-gray-700">Browser Hashnode community members and follow them to see their posts on your feed.</p>
            <img 
            className="md:w-4/5 mx-auto my-4 w-2/4"
            src={membersBanner} 
            alt="members_banner"/>
          </div>
        </div>
        <div className="md:w-3/4 px-2 w-full">
          {/* Tab Section */}
          <div className="bg-white rounded md:mt-0 flex flex-wrap text-sm text-gray-700 sticky top-6">
            <button
            className="px-4 h-10 app-font-color border-b-2 app-border-bottom font-extrabold">
              <span className="font-semibold">STUDENTS</span>
            </button>
            <button
            className="px-4 h-10"
            >
              <span className="font-semibold">TEACHERS</span>
            </button>
            <button
            className="px-4 h-10">
              <span className="font-semibold">RECENTLY JOINED</span>
            </button>
          </div>

          {/* Story List Section */}
          <div className="">
            <div className="flex -mx-2 flex-wrap">
              {memeberList}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
