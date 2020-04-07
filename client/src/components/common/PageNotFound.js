import React from 'react'
import pageNotFoundImage from '../../app_images/page-not-found-img.png'

export const PageNotFound = () => {
  return (
    <div className="md:px-16 px-6 px-2 bg-gray-200 min-h-screen py-1 flex">
      <div className="rounded bg-white px-10 py-12 text-center self-center w-full">
        <img 
        className="p-10 md:w-1/2 w-full mx-auto"
        src={pageNotFoundImage} 
        alt="Page not found"/>
        <p className="text-5xl font-black font-sen text-gray-700">404</p>
        <h2 className="text-2xl font-bold text-black mb-4">We can’t find the page you’re looking for!</h2>
        <div className="btn app-font-color btn-lg text-accent-blue-A700 font-bold">Take me home</div>
      </div>
    </div>
  )
}
