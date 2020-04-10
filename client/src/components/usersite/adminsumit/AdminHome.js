import React from 'react'

export const AdminHome = () => {

  let list = []

  for(let i = 0 ; i < 20 ; ++i){
    let buttonSymptomsList = []

    for(let j = 0 ; j < Math.floor(Math.random() * 20) + 1   ; ++j){
      buttonSymptomsList.push(
        <button className="mt-3 mr-2 self-center bg-gray-200 rounded-full px-6 py-2 focus:outline-none transition duration-500 ease-in-out flex text-gray-700 cursor-pointer">
          <span className="font-black text-sm">Symptom 1</span>
        </button>
      )
    }
      

    list.push(
        <div class="bg-white rounded-lg border-radius-card mt-2">
          <div class="flex -mx-2 flex-wrap">
            <div class="w-full md:w-2/3 lg:w-3/4 px-2">
              <div className="py-8 pl-8">
                <h2 className="text-2xl input-add-title">James Allison (42 Years)</h2>
                <p className="mt-2 text-base text-gray-700">SYMPTOMS</p>
                <div className="md:w-2/3 md:w-3/4 flex flex-wrap">
                  {buttonSymptomsList}
                </div>
                <div className="md:w-2/3 md:w-3/4 w-full flex flex-wrap text-white mt-4 justify-center md:justify-start pr-8">
                  <button className="bg-gray-200 text-blue-500 flex py-2 px-3 rounded-md text-xl  mt-4">
                  <i class="fas fa-video"></i>
                    <i className="fa fa-play self-center"></i>
                    <p className="ml-2">2 VIDEOS</p>
                  </button>
                  <button className="bg-gray-200 text-blue-500 flex py-2 px-3 rounded-md text-xl ml-4  mt-4">
                    <i className="fa fa-volume-up self-center"></i>
                    <p className="ml-2">2 VIDEOS</p>
                  </button>
                  <button className="bg-blue-500 flex py-2 px-3 rounded-md text-xl ml-4  mt-4">
                    <p className="ml-2">FULL REPORT</p>
                  </button>
                </div>
              </div>
            </div>
            <div class="w-full md:w-1/3 lg:w-1/4 px-2">
              <div class="border-t md:border-l border-gray-300 text-center p-8 md:h-full">
                <p className="flex-1">STATUS</p>
                <div className="flex-1 mt-8">
                  <div className="w-8 h-8 mx-auto rounded-full bg-red-500"></div>
                  <p className="mt-2 text-red-500">Awaiting Diagnosis</p>
                </div>
                <button className="rounded-xl bg-blue-500 rounded-lg flex-1 mt-8">
                  <i className="fa fa-edit self-center text-white p-2"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
    )
  }

  return (
    <div className="bg-gray-200 min-h-screen px-10 py-10">
      <h2 className="text-3xl input-add-title">Today's Case</h2>
      <div className="flex items-baseline">
        <p className="self-center text-lg text-gray-600 mt-3">MON 24/12/2020</p>
        <button className="ml-auto self-center border border-gray-300 bg-white rounded-full px-8 py-3  focus:outline-none shadow-md  transition duration-500 ease-in-out flex text-gray-700 cursor-pointer">
          <span className="font-black text-sm">SELECT</span>
          <i className="fa fa-check self-center ml-1 text-blue-500"></i>
        </button>
        <button className="ml-4 self-center border border-gray-300 bg-white rounded-full px-8 py-3  focus:outline-none shadow-md  transition duration-500 ease-in-out flex text-gray-700 cursor-pointer">
          <span className="font-extrabold text-sm">FILTER</span>
          <i className="fa fa-filter self-center ml-1 text-blue-500"></i>
        </button>
      </div>
      <ul className="mt-4">
        {list}
      </ul>

      {/* <div className="flex">
        <button className="bg-blue-500">
          <i className="fa fa-user self-center"></i>
          <p>2 VIDEOS</p>
        </button> */}
        {/* <button className="app-color px-4 my-auto text-white rounded flex flex-wrap content-center py-2 font-bold cursor-pointer focus:outline-none">
          
          <span className="self-center">Create an account</span>
        </button>
        <button className="app-color px-4 my-auto text-white rounded flex flex-wrap content-center py-2 font-bold cursor-pointer focus:outline-none">
          <i className="fa fa-user self-center"></i>
          <span className="self-center">Create an account</span>
        </button>
        <button className="app-color px-4 my-auto text-white rounded flex flex-wrap content-center py-2 font-bold cursor-pointer focus:outline-none">
          <i className="fa fa-user self-center"></i>
          <span className="self-center">Create an account</span>
        </button> */}
      {/* </div> */}
    </div>
  )
}
