import React from 'react'
import aboutImg1 from '../../../app_images/about-img-1.png'

export const About = () => {
  return (
    <div className="md:flex md:flex-wrap">
      <div className="flex-1 bg-white p-10 self-center flex content-center flex-wrap md:h-screen md:p-20">
        <p className="mt-1 font-sen text-gray-700 text-lg w-full font-semibold">ABOUT STUDYNODE</p>
        <p className="text-4xl font-bold font-sen text-black">The most loved developers' community on the internet!</p> 
        <p className="text-xl">We're on a mission to empower developers to tell their stories and help them grow in their career.</p>
      </div>
      <div className="flex-1 p-10 self-center flex content-center flex-wrap md:h-screen md:p-20">
        <img 
        className="mx-auto w-1/2 object-cover h-96"
        src={aboutImg1} alt="main-login-image"/>
      </div>
    </div>
  )
}
