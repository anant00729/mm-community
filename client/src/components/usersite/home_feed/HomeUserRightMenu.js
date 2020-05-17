import React from 'react'

function HomeUserRightMenu() {
  return (
    <>
        <div className="h-4 w-full"></div>
        <div className="bg-white rounded">
          <div className="px-4 pt-3">
            <div className="flex">
              <p className="self-center text-md">Top Stories</p>
              <i className="fa fa-cloudversify self-center text-xl text-black"></i>
            </div>
            <p className="text-sm mt-2 text-gray-600">This month's most commented discussions on Hi-Story</p>
          </div>
          <div className="px-1 py-2 flex text-gray-800 cursor-pointer">
            <p className="self-center ml-4 text-sm">LOST CITY OF MOHEN-JO-DARO AND HARRAPA</p>
          </div>
          {/* <div className="px-1 py-2 flex text-gray-800 cursor-pointer">
            <p className="self-center ml-4 text-sm">Next.js Team AMA, Ask us Anything!</p>
          </div> */}
        </div>
        {/* <div className="bg-white rounded mt-4">
          <div className="px-4 py-3">
            <div className="flex">
              <p className="self-center text-md">Top Discussions</p>
              <i className="fa fa-cloudversify self-center text-xl text-black"></i>
            </div>
            <p className="text-sm mt-2 text-gray-600">This month's most commented discussions on Hi-Story</p>
          </div>
          <div className="px-1 py-2 flex text-gray-800 cursor-pointer">
            <p className="self-center ml-4 text-sm">Next.js Team AMA, Ask us Anything!</p>
          </div>
          <div className="px-1 py-2 flex text-gray-800 cursor-pointer">
            <p className="self-center ml-4 text-sm">Next.js Team AMA, Ask us Anything!</p>
          </div>
        </div> */}
    </>
  )
}

export default HomeUserRightMenu
