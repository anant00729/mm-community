import React, { useState, useCallback } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

export default function App() {
  const [upImg, setUpImg] = useState();
  const [imgRef, setImgRef] = useState(null);
  const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 1 });
  const [previewUrl, setPreviewUrl] = useState();

  const onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onLoad = useCallback(img => {
    setImgRef(img);
  }, []);

  const makeClientCrop = async crop => {
    if (imgRef && crop.width && crop.height) {
      createCropPreview(imgRef, crop, 'newFile.jpeg');
    }
  };

  const createCropPreview = async (image, crop, fileName) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(async (blob) => {
        if (!blob) {
          reject(new Error('Canvas is empty'));
          return;
        }
        var reader = new FileReader();
        reader.readAsDataURL(blob); 
        reader.onloadend = async () => {
          var base64data = reader.result.split(';base64,').pop();     
          console.log('base64data', base64data)
          const response = await uploadImageToImgUr(base64data)  
          console.log('response', response)
          //console.log(base64data);
         }
        blob.name = fileName;
        window.URL.revokeObjectURL(previewUrl);
        
        setPreviewUrl(window.URL.createObjectURL(blob));
      }, 'image/jpeg');
    });
  };


  console.log('previewUrl', previewUrl)
  return (
    <div className="App">
      <div>
        <input type="file" accept="image/*" onChange={onSelectFile} />
      </div>
      <ReactCrop
        src={upImg}
        onImageLoaded={onLoad}
        crop={crop}
        onChange={c => setCrop(c)}
        onComplete={makeClientCrop}
      />
      {previewUrl && <img alt="Crop preview" src={previewUrl} />}
    </div>
  );
}


const uploadImageToImgUr = async (url) => {
  let uploadRes = {}
  const data = JSON.stringify({imageUrl : url})
  console.log('data', data)
  try {

    const res_d = await fetch('http://localhost:8081/uploadImage', { 
      method: 'POST', 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: data
    })

    const resData = await res_d.json()
    console.log('resData', resData)
    uploadRes = {...resData}   
    return uploadRes 
    // if(resData.status === 200){
    // }
  } catch (error) {
    uploadRes = {status : false , message : error.message}
  }

  console.log('uploadRes', uploadRes)
  return uploadRes
}
