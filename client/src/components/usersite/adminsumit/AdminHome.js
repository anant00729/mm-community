import React, {useState, useEffect} from 'react'
import axios from 'axios'

export const AdminHome = () => {

  const [progress , setProgress] = useState(0)
  const [file , setFile] = useState('')
  const [fileName , setFileName] = useState('')
  const [fileUploadResponse , setFileUploadResponse] = useState({ status : false})
  const [message , setMessage] = useState('Choose File')

  // const tick = () => {
  //   setProgress(progress + 5)
  // }

  // useEffect(() => {
  //     let interval = setInterval(tick, 1000)
  //     if(progress == 100){
  //       //setProgress(0)
  //       clearInterval(interval)
  //     }
  //   return () => {
  //     clearInterval(interval)
  //   }
  // }, [progress])


  const onChange = e => {
    let _f = e.target.files[0]
    if(_f){
      setFile(_f)
      setFileName(_f.name)
      setProgress(0)
      setMessage('Choose File')
    }
  }

  const onSubmit = async e => {
    e.preventDefault()
    setMessage('Uploading Image...')
    const formData = new FormData()
    formData.append('image' , file)

  
    try {
      const res = await axios.post('/uploadImage', formData , {
        headers : {
          'Content-Type' : 'multipart/form-data'
        },
        onUploadProgress : progressEvent => {
          console.log('progressEvent.loaded :', progressEvent.loaded);
          console.log('progressEvent.total :', progressEvent.total);
          let progressPer = parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total))
          console.log('progressPer :', progressPer);
          setProgress(progressPer)
        }
      })
      let result = res.data
      console.log('result :', result);
      setFileUploadResponse(result)
      setMessage('File Uploaded')
    } catch (error) {
      setFileUploadResponse({status : false , message : error.message})
    }
  }

  let displayImage = fileUploadResponse.status && (
    <img 
      className="mt-4 w-2/3 mx-auto object-contain h-80"
      src={fileUploadResponse.filePath} alt="image_file_uploaded"/>
  )


    return (
      <div className="px-20">
        <p className="text-3xl text-center mt-8">React File Upload</p>
        <p className="text-2xl text-center mt-8">{message}</p>
        <p className="text-white text-xl w-full h-8">{progress !== 100 ? 'Uploading...' : 'File Uploaded'}</p>
        <form 
        
        className="mt-4 flex w-full mt-8">
          <input 
          className="flex-1 py-2 px-2 border-gray-300 focus:outline-none rounded-l-md border focus:border-blue-600"
          placeholder="Enter your email address"
          type="email"/>
          <input 
          onChange={onChange}
          className="text-white app-color py-2 px-8 focus:outline-none rounded-r-md text-base cursor-pointer"
          type="file"/>
        </form>
        <div className="relative h-8 mt-8">
          <div className="absolute bg-gray-500 w-full rounded-full h-8"></div>
          <div className="absolute app-color rounded-full h-8" style={{width : `${progress}%`, transition: 'width 1s linear'}}></div>
          <p className="absolute text-white text-center mt-1 text-md w-full h-8 progress-trans">{progress !== 100 ? `${progress}% Uploaded...` : 'File Uploaded'}</p>
        </div>
        
        <button 
        onClick={onSubmit}
        className="w-full app-color rounded px-4 py-2 text-white mt-8">Submit</button>

        <div className="bg-gray-400">
          {displayImage}
        </div>
      </div>
    )
}
