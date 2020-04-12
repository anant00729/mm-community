import React , {useState, useEffect, useCallback} from 'react'
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
export const ImageDialog = () => {

  const [upImg, setUpImg] = useState();
  const [imgRef, setImgRef] = useState(null);
  const [crop, setCrop] = useState({ 
    unit: '%', // default, can be 'px' or '%'
    x: 0,
    y: 0,
    width: 100,
    aspect: 1 });
  const [previewUrl, setPreviewUrl] = useState();

  const onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setUpImg(reader.result));
      console.log('e.target.files[0]', e.target.files[0])
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onLoad = useCallback(img => {
    console.log('img', img)
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
        blob.name = fileName;
        window.URL.revokeObjectURL(previewUrl);
        
        setPreviewUrl(window.URL.createObjectURL(blob));
      }, 'image/jpeg');
    });
  };



  function escFunction(event){
    if(event.keyCode === 27) {
      // dismissImageDialog()
    }
  }

  useEffect(()=> {
    document.addEventListener("keydown", escFunction, false);
  }, [])


  console.log('upImg', upImg)


  return (
    <>
    {/* <!--Modal--> opacity-0 pointer-events-none*/}
  
  <div className={`modal fixed w-full h-full top-0 left-0 flex items-center justify-center `}>
    <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
    <div className="modal-container bg-white max-w-2xl mx-auto rounded shadow-lg z-50 overflow-y-auto">

      <div 
      // onClick={dismissImageDialog} 
      className="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50">
        <svg className="fill-current text-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
          <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
        </svg>
        <span className="text-sm">(Esc)</span>
      </div>

      {/* <!-- Add margin if you want to see some of the overlay behind the modal--> */}
      <div className="modal-content py-4 text-left px-6">
        {/* <!--Title--> */}
        <div className="flex justify-between items-center pb-3">
          <p className="text-2xl font-bold">{'Title'}</p>
          <div 
          // onClick={dismissImageDialog} 
          className="modal-close cursor-pointer z-50">
            <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
              <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
            </svg>
          </div>
        </div>
        
        <div className="App">
          <div>
            <input type="file" accept="image/*" onChange={onSelectFile} />
          </div>

          <div >
          <ReactCrop
            src={upImg}
            onImageLoaded={onLoad}
            crop={crop}
            onChange={c => setCrop(c)}
            onComplete={makeClientCrop}
          />
          </div>
          
          {previewUrl && <img alt="Crop preview" src={previewUrl} />}
        </div>
        
      </div>
    </div>
  </div>
      
    </>
    
  )
}
