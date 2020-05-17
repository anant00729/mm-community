import React, {useEffect} from 'react'
import aboutImg1 from '../../../app_images/about-img-1.png'

export const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div>
      <div className="md:flex md:flex-wrap justify-center d-block h-screen">
      <div className="md:w-5/12">
        <div className="flex h-full">
          <div className="self-center p-8 md:p-0">
            <p className="mt-1 font-sen text-gray-700 text-lg font-semibold">ABOUT HI-STORY</p>
            <p className="text-4xl font-bold font-sen text-black">The most loved student's community on the internet!</p> 
            <p className="text-lg text-gray-600 mt-2">We're on a mission to empower students to tell their stories and help them grow in their career.</p>
          </div>
        </div>
      </div>
      <div className="md:w-1/3 w-full self-center">
        <img 
        className="mx-auto md:w-6/12 object-cover h-96 mt-4"
        src={aboutImg1} alt="main-login-image"/>
      </div>
      </div>

      <div className="md:flex md:flex-wrap justify-center d-block h-screen bg-accent-blue-500 pt-16">
      <div className="md:w-1/3 mx-auto w-1/2 self-center rounded-lg bg-white shadow-xl p-2 hover:shadow-2xl transition duration-500 ease-in-out">
        <img 
        className="mx-auto md:w-6/12 object-cover h-96"
        src={aboutImg1} alt="main-login-image"/>
      </div>
      <div className="md:w-5/12 md:mr-20">
        <div className="flex h-full">
          <div className="self-center p-8 md:p-0">
            
            <p className="text-4xl font-bold font-sen text-black">A truly global community of students!</p> 
            <p className="text-lg text-gray-600 mt-2">Hi-Story is one of the enriching community where students share, ask and help other students.</p>
          </div>
        </div>
      </div>
      </div>
    
      
    </div>
    
  )
}
